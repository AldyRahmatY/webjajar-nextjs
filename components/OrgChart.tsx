'use client';

import React from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  Position,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import Image from 'next/image';

// ----- DATA STRUKTUR ORGANISASI (Bisa dipindah ke file data terpisah) -----
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'IMAM MUKARYANTO EDY', role: 'Kepala Desa' }, // Ganti path gambar
    position: { x: 400, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { name: 'RIFQI DIAN SOFYANA', role: 'Sekretaris Desa'},
    position: { x: 800, y: 150 },
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'SUTAJI', role: 'Kasi Pelayanan' },
    position: { x: -150, y: 150 },
  },
  {
    id: '4',
    type: 'custom',
    data: { name: 'MUYANTI', role: 'Kasi Pemerintahan'},
    position: { x: 50, y: 150 },
  },
  {
    id: '5',
    type: 'custom',
    data: { name: 'YANTO HOLI', role: 'Kasi Kesra' },
    position: { x: 250, y: 150 },
  },
  {
    id: '6',
    type: 'custom',
    data: { name: 'MURWITO', role: 'Kaur Umum' },
    position: { x: 600, y: 270 },
  },
  {
    id: '7',
    type: 'custom',
    data: { name: 'DIAN ASTRIANA DEWI', role: 'Kaur Keuangan' },
    position: { x: 800, y: 270 },
  },
  {
    id: '8',
    type: 'custom',
    data: { name: 'PRIYANTO', role: 'Kaur Perencanaan'},
    position: { x: 1000, y: 270 },
  },
  // --- Kepala Dusun (Di Bawah Kasi/Kaur) ---
  {
    id: '9',
    type: 'custom',
    data: { name: 'MUJIANTO', role: 'Kepala Dusun Kebon'},
    position: { x: 0, y: 270 },
  },
  {
    id: '10',
    type: 'custom',
    data: { name: 'ALWI SYAHRONI', role: 'Kepala Dusun Krajan'},
    position: { x: 200, y: 270 },
  },
  {
    id: '11',
    type: 'custom',
    data: { name: 'WANWIONO', role: 'Kepala Dusun Belik'},
    position: { x: 400, y: 270 },
  },
  {
    id: '12',
    type: 'invisible',
    position: { x: 478, y: 200 }, // X di tengah kades, Y di antara baris 1 dan 2
    data: { name: '-', role: '-'},
  },
  {
    id: '13',
    type: 'invisible',
    position: { x: 478, y: 270 }, // X di tengah kades, Y di antara baris 1 dan 2
    data: { name: '-', role: '-'},
  },
];

// --- HUBUNGAN ANTAR NODE (GARIS) ---
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'step', targetHandle: 'top' },
  { id: 'e2-6', source: '2', target: '6', type: 'step' },
  { id: 'e2-7', source: '2', target: '7', type: 'step' },
  { id: 'e2-8', source: '2', target: '8', type: 'step' },

  { id: 'e1-12', source: '1', target: '12', type: 'step' },
  { id: 'e1-13', source: '1', target: '13', type: 'step' },
  { id: 'e12-10', source: '12', target: '10', type: 'step' },
  { id: 'e12-11', source: '12', target: '11', type: 'step' },
  { id: 'e12-9', source: '12', target: '9', type: 'step' },

  { id: 'e1-4', source: '1', target: '4', type: 'step' },
  { id: 'e1-5', source: '1', target: '5', type: 'step' },
  { id: 'e1-3', source: '1', target: '3', type: 'step' },
];

// ----- CUSTOM NODE COMPONENT (Tampilan Kotak Nama) -----
const CustomNode = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md border-2 border-emerald-500 overflow-hidden w-40 transition-all hover:scale-105 hover:shadow-xl">
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-emerald-500" />
      {/* Nama & Jabatan */}
      <div className="p-2 text-center bg-emerald-50 w-full flex-grow">
        <h3 className="font-bold text-xs text-gray-800 line-clamp-2">{data.name}</h3>
        <p className="text-[10px] font-medium text-emerald-600 uppercase mt-1 bg-white inline-block px-2 py-0.5 rounded-full border border-emerald-200">
          {data.role}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-emerald-500" />
    </div>
  );
};

const InvisibleNode = ({ data }: any) => {
  return (
    <div className="w-1 h-1 relative">
      {/* Handle tetap harus ada agar garis bisa nyambung, tapi kita buat transparan */}
      <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: 'transparent', border: 'none' }} />
    </div>
  );
};

const nodeTypes = { 
  custom: CustomNode,
  invisible: InvisibleNode
};

// ----- KOMPONEN UTAMA ORG CHART -----
export default function OrgChart() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] w-full bg-gray-50 rounded-3xl border border-gray-200 shadow-inner relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.5} // Agar di HP tidak terlalu kecil
      >
        <Controls className="bg-white border-gray-200 shadow-sm rounded-md" />
        <Background color="#aaa" gap={16} size={1} />
        
        {/* Label Tambahan untuk Mobile */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-gray-500 shadow-sm pointer-events-none md:hidden">
          👈 Geser atau Cubit untuk Zoom 👉
        </div>
      </ReactFlow>
    </div>
  );
}