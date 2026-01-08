'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion' // Ubah ke 'motion/react' jika perlu
import { Button } from '@/components/ui/button'
import GradientText from '@/components/GradientText' // <--- 1. Import ini
import ShinyText from '@/components/ShinyText'
import { useTranslations } from 'next-intl'


const slides = [
  {
    id: 0,
    image: '/assets/img/banner1.jpg',
    // subtitle: 'Selamat Datang Di Website Desa',
    // title: 'Jajar Gumregah',
    // desc: 'Tempat di Mana Alam, Budaya, dan Kehangatan Penduduk Berpadu.',
  },
  {
    id: 1,
    image: '/assets/img/banner2.jpg',
    // subtitle: 'Wisata Alam dan Edukasi',
    // title: 'Pesona Alam',
    // desc: 'Jelajahi keindahan alam sambil menambah wawasan wisata edukasi.',
  },
  {
    id: 2,
    image: '/assets/img/banner3.jpg', 
    // subtitle: 'Suasana Desa Yang Menenangkan',
    // title: 'Jajar Gumregah',
    // desc: 'Nikmati Udara Segar dan Pemandangan Hijau yang Menyegarkan di Desa Jajar Gumregah.',
  },
]

export default function HeroSection() {
  const t = useTranslations('HeroSection')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 15000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary font-bold tracking-[0.2em] uppercase mb-4"
            >
              {t(`slides.${index}.subtitle`)}
            </motion.p>

            {/* --- IMPLEMENTASI REACT BITS DISINI --- */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
            <ShinyText
              delay={0.5}
              color="#ffffff"
              shineColor="oklch(69.6% 0.17 162.48)"
              className="text-4xl md:text-8xl font-bold drop-shadow-2xl px-4 py-2" // Class Font size ada di sini
              text={t(`slides.${index}.title`)} // Pass the text prop instead of children
            />

            </motion.div>
            {/* -------------------------------------- */}

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              {t(`slides.${index}.desc`)}
            </motion.p>

            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 1.1 }}
            >
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg bg-emerald-500 transition-all hover:scale-105">
                <Link href="#about">{t('button')}</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}