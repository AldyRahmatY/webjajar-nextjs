'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'

const tourismData = [
  { id: 1, category: 'alam', img: '/assets/img/tebingbelik1.jpg' },
  { id: 2, category: 'alam', img: '/assets/img/airterjun.jpeg' },
  { id: 3, category: 'alam', img: '/assets/img/umbulan.jpg' },
  { id: 4, category: 'alam', img: '/assets/img/ngonthel.jpg' },
  { id: 5, category: 'alam', img: '/assets/img/lanskapbukit.jpg' },
  { id: 21, category: 'alam', img: '/assets/img/tamanjajar.jpg' },

  { id: 6, category: 'edukasi', img: '/assets/img/pandai-besi.jpg' },
  { id: 7, category: 'edukasi', img: '/assets/img/simpai.jpg' },
  { id: 8, category: 'edukasi', img: '/assets/img/tempedebog.jpg' },
  { id: 9, category: 'edukasi', img: '/assets/img/pahat.jpg' },

  { id: 11, category: 'budaya', img: '/assets/img/tiban.jpg' },
  { id: 12, category: 'budaya', img: '/assets/img/salalahuk.jpg' },
  { id: 13, category: 'budaya', img: '/assets/img/karawitan.jpeg' },
  { id: 14, category: 'budaya', img: '/assets/img/bersihdesa.jpg' },

  { id: 16, category: 'kuliner', img: '/assets/img/cukdeh.jpg' },
  { id: 17, category: 'kuliner', img: '/assets/img/cimplung.jpg' },
  { id: 18, category: 'kuliner', img: '/assets/img/wedangsuwuk.jpg' },
  { id: 19, category: 'kuliner', img: '/assets/img/segogegok.jpg' },
  { id: 20, category: 'kuliner', img: '/assets/img/pasebancafe.jpg' },

  { id: 15, category: 'homestay', img: '/assets/img/banner1.jpg' },
]

const categories = [
  { key: 'all', value: '*' },
  { key: 'nature', value: 'alam' },
  { key: 'edu', value: 'edukasi' },
  { key: 'culture', value: 'budaya' },
  { key: 'culinary', value: 'kuliner' },
  { key: 'homestay', value: 'homestay' },
]

export default function TourismSection() {
  const t = useTranslations('TourismSection')
  const [filter, setFilter] = useState('*')

  const filteredItems = filter === '*' 
    ? tourismData 
    : tourismData.filter(item => item.category === filter)

  return (
    <section id="wisata" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 text-gray-800">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
          {t('title')}
          </motion.h2>
          <p className="text-emerald-500">{t('subtitle')}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat.value 
                  ? 'bg-primary text-emerald-500 shadow-lg scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t(`filters.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* Animated Grid */}
        <motion.div layout className="grid md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={t(`items.${item.id}.title`)}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-black shadow-sm">
                    {item.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{t(`items.${item.id}.title`)}</h4>
                  <p className="text-sm text-gray-600">{t(`items.${item.id}.about`)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}