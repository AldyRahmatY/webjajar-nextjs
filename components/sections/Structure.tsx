'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
// import OrgChart from '@/components/OrgChart'
// GANTI dengan Dynamic Import ini:
import dynamic from 'next/dynamic';

const OrgChart = dynamic(
  () => import('@/components/OrgChart'), // Sesuaikan path folder Anda
  { 
    ssr: false, // <--- INI KUNCINYA. Mematikan render server.
    loading: () => <p>Memuat Struktur Organisasi...</p> // Tampilan saat loading
  }
);

export default function StructureSection() {
  return (
    <section id="orgchart" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center">
          <h4 className="font-bold uppercase tracking-wider mb-2 text-emerald-500">Pemerintahan</h4>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Struktur Organisasi <br className="md:hidden" /> Desa Jajar
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10"></div>
          
          {/* Panggil Komponen Chart di sini */}
          <OrgChart />
        </ScrollReveal>
      </div>
    </section>
  )
}