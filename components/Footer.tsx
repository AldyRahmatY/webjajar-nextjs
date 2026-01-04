'use client' // Wajib karena menggunakan state dan effect

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, Instagram, Phone, Mail, Users, Activity, Calendar } from 'lucide-react'
import { db } from '@/lib/firebase'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'

export default function Footer() {
  const [stats, setStats] = useState({
    today: 0,
    yesterday: 0,
    total: 0
  })

useEffect(() => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    
    // Hitung tanggal kemarin
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toLocaleDateString('en-CA');

    // 1. Listen Total secara Real-time
    const unsubTotal = onSnapshot(doc(db, "stats", "total_counter"), (doc) => {
      setStats(prev => ({ ...prev, total: doc.data()?.count || 0 }))
    })

    // 2. Listen Hari Ini secara Real-time
    const unsubToday = onSnapshot(doc(db, "stats", "daily_stats", "days", todayStr), (doc) => {
      setStats(prev => ({ ...prev, today: doc.data()?.count || 0 }))
    })

    // 3. Ambil data Kemarin (Cukup ambil sekali, tidak perlu real-time)
    const getYesterday = async () => {
      const snap = await getDoc(doc(db, "stats", "daily_stats", "days", yesterdayStr))
      if (snap.exists()) {
        setStats(prev => ({ ...prev, yesterday: snap.data().count }))
      }
    }
    getYesterday()

    return () => {
      unsubTotal()
      unsubToday()
    }
  }, [])

  return (
    <footer className="bg-[#222] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Kolom 1: Info Desa */}
          <div>
            <Link href="/" className="mb-4 block">
              <Image 
                src="/assets/img/logo.png" 
                alt="Logo Footer" 
                width={150} 
                height={65}
                className="brightness-0 invert"
              />
            </Link>
            <h6 className="font-bold text-lg mb-4">
              "JAJAR GUMREGAH TIJI TIBEH" <br/> 
              <span className="text-sm font-normal">Mukti Siji Mukti Kabeh</span>
            </h6>
          </div>
          {/* Kolom 2: Spacer */}
          <div className="hidden lg:block"></div>

          {/* Kolom 3: Social Media */}
          <div>
            <h6 className="font-bold text-lg mb-4">Media Sosial Kami</h6>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/kantor.membangun.3" target="_blank" className="hover:text-emerald-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.youtube.com/@JAJARGUMREGAH" target="_blank" className="hover:text-emerald-500 transition-colors">
                <Youtube size={24} />
              </a>
              <a href="https://www.instagram.com/desawisatajajargumregah/" target="_blank" className="hover:text-emerald-500 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h6 className="font-bold text-lg mb-4">Kontak Kami</h6>
            <div className="flex items-center gap-3 mb-3 text-gray-400">
              <Phone size={20} />
              <span>0822-3231-3546 - Rifqi</span>
            </div>
            <div className="flex items-center gap-3 mb-6 text-gray-400">
              <Mail size={20} />
              <span>dewijargum@gmail.com</span>
            </div>
            
            <p className="text-xs text-gray-500 mt-8 border-t border-gray-700 pt-4">
              Copyright &copy; {new Date().getFullYear()} | Made By KKN UM 2024
            </p>
          </div>
        </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-800 pt-8">
            <div className="flex items-center gap-3 bg-[#333] p-4 rounded-2xl border border-gray-700">
              <Activity className="text-emerald-500" size={20} />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Hari Ini</p>
                <p className="text-lg font-bold">{stats.today.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#333] p-4 rounded-2xl border border-gray-700">
              <Calendar className="text-blue-500" size={20} />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Kemarin</p>
                <p className="text-lg font-bold">{stats.yesterday.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#333] p-4 rounded-2xl border border-gray-700">
              <Users className="text-orange-500" size={20} />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Total Pengunjung</p>
                <p className="text-lg font-bold">{stats.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
      </div>
    </footer>
  )
}