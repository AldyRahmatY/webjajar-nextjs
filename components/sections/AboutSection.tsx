'use client'
import { useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { MapPin, Users, Home, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const t = useTranslations('AboutSection')
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Modern Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="font-bold uppercase tracking-wider mb-2 text-emerald-500">{t('section')}</h4>
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </ScrollReveal>
    
        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6 h-auto">
          
          {/* Box 1: Deskripsi Utama (Large) */}
          <ScrollReveal direction='left' className="md:col-span-2 bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">{t('header')}</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
                <span className="text-emerald-500 font-semibold">Desa Wisata Jajar</span> {t('paragraf1')}
                {/* terletak di Kecamatan Gandusari, Kabupaten Trenggalek. Dikelilingi oleh hamparan perbukitan hijau dan persawahan yang asri, desa ini menjadi tempat yang ideal untuk wisatawan yang ingin merasakan ketenangan. */}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t.rich('paragraf2', {
                strong: (chunks) => <span className="text-emerald-500 font-extrabold">{chunks}</span>
              })}
                {/* Di bawah naungan perbukitan hijau Trenggalek, <strong>"tradisi Tiban"</strong>  menghidupkan legenda pemanggil hujan melalui atraksi cambuk yang menggetarkan sukma. Jelajahi Desa Wisata Jajar, tempat di mana kemurnian alam dan keagungan budaya leluhur menyatu dalam sebuah pelarian yang tak terlupakan. */}
            </p>
          </ScrollReveal>

          {/* Box 2: Video Player (Visual) */}
          <ScrollReveal direction='right' delay={0.2} className="md:col-span-2 min-h-[300px] relative rounded-3xl overflow-hidden shadow-lg bg-black">
            
            {/* Logika: Jika isPlaying TRUE tampilkan IFRAME, jika FALSE tampilkan COVER */}
            {isPlaying ? (
              <iframe
                className="w-full h-full absolute inset-0 rounded-3xl"
                src="https://www.youtube.com/embed/qREgRNzEGeE?autoplay=1&rel=0" 
                title="Profil Desa Jajar"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              // Tampilan Awal (Thumbnail + Tombol Play)
              <div 
                onClick={() => setIsPlaying(true)} 
                className="group cursor-pointer relative w-full h-full"
              >
                {/* Background Image - Saya ambil langsung dari Thumbnail YouTube agar otomatis */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('https://img.youtube.com/vi/qREgRNzEGeE/maxresdefault.jpg')" }}
                ></div>
                
                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  {/* Tombol Play */}
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all shadow-xl ring-1 ring-white/50 scale-100 group-hover:scale-110 duration-300">
                    <Play fill="currentColor" className="ml-1 w-6 h-6" />
                  </div>
                </div>

                {/* Teks Info */}
                <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                  <p className="font-bold text-lg drop-shadow-md">{t('video_profile')}</p>
                  <p className="text-xs opacity-90 drop-shadow-md">{t('click_to_play')}</p>
                </div>
              </div>
            )}

          </ScrollReveal>

          {/* Box 3, 4, 5, 6: Statistik (Kecil-kecil) */}
          <StatCard delay={0.3} icon={<MapPin />} value="531 Ha" label={t('luas')}/>
          <StatCard delay={0.4} icon={<Users />} value="2,971" label={t('penduduk')} />
          <StatCard delay={0.5} icon={<Home />} value="3" label={t('dusun')} />
          <StatCard delay={0.6} icon={<Home />} value="21" label={t('rt')} />

          {/* Box 7: Maps (Wide) */}
          <ScrollReveal delay={0.4} className="md:col-span-4 h-64 rounded-3xl overflow-hidden shadow-md border border-gray-200 mt-4">
             <iframe 
                src="https://maps.google.com/maps?q=Desa%20Jajar%20Trenggalek&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" height="100%" loading="lazy" style={{ border: 0, filter: 'grayscale(0%)' }}
             ></iframe>
          </ScrollReveal>
        </div>

      </div>
    </section>

  )
}

function StatCard({ icon, value, label, delay }: any) {
    return (
        <ScrollReveal delay={delay} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center group">
            <div className="mb-3 p-3 bg-primary/10 text-emerald-500 rounded-full group-hover:bg-primary group-hover:text-zinc-900 transition-colors shadow-md">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
        </ScrollReveal>
    )
}