'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const tourismData = [
  { id: 1, title: 'Tebing Belik Bolu', category: 'alam', img: '/assets/img/tebingbelik1.jpg', about: 'Area tebing karst yang secara topografi cocok untuk pemanjatan. Sering digunakan oleh pecinta alam lokal untuk latihan rock climbing' },
  { id: 2, title: 'Air Terjun Telaga Jarum', category: 'alam', img: '/assets/img/airterjun.jpeg', about: 'Tersembunyi di rimbunnya perkebunan. Suaranya yang menenangkan sangat cocok untuk meditasi atau self-healing' },
  { id: 3, title: 'Bumi Perkemahan Umbulan Karang', category: 'alam', img: '/assets/img/umbulan.jpg', about:'Kawasan sumber air yang dikelilingi pohon-pohon besar. Sangat populer untuk pre-wedding, kemah pramuka, atau acara komunitas' },
  { id: 4, title: 'Ngonthel Keliling Desa', category: 'alam', img: '/assets/img/ngonthel.jpg', about: 'berkeliling Dusun Krajan, Kebon, dan Belik dengan sepeda sambil menikmati hamparan perbukitan hijau dan persawahan yang asri'  },
  { id: 5, title: 'Lanskap Perbukitan Dusun Belik', category: 'alam', img: '/assets/img/lanskapbukit.jpg', about: 'Titik tertinggi untuk melihat pemandangan seluruh desa dan matahari terbenam (sunset) di atas hamparan sawah' },
  { id: 21, title: 'Taman Jajar Gumregah', category: 'alam', img: '/assets/img/tamanjajar.jpg', about: 'Pusat desa, tempat pertunjukan seni terbuka yang luas dengan pemandangan tebing yang indah' },


  { id: 6, title: 'Pande Besi', category: 'edukasi', img: '/assets/img/pandai-besi.jpg', about: 'Melihat proses penempaan besi menjadi alat pertanian atau senjata tajam dengan cara tradisional (menggunakan ububan)' },
  { id: 7, title: 'Kerajinan Anyaman Simpai', category: 'edukasi', img: '/assets/img/simpai.jpg', about: 'Wisatawan dapat belajar membuat berbagai kerajinan anyaman tradisional seperti bakul, tikar, dan topi dari simpai' },
  { id: 8, title: 'Pembuatan Tempe Debog', category: 'edukasi', img: '/assets/img/tempedebog.jpg', about: 'Mempelajari teknik fermentasi tempe yang unik karena tidak menggunakan plastik atau daun pisang biasa, melainkan pelepah pisang (debog)' },
  { id: 9, title: 'Pahat Patung', category: 'edukasi', img: '/assets/img/pahat.jpg', about: 'Wisatawan dapat melihat dan mempelajari mengenai seni pahat tradisional menggunakan alat-alat sederhana' },
  // { id: 10, title: 'Edukasi Pertanian Organik', category: 'edukasi', img: '/assets/img/banner1.jpg', about: 'Tur ke sawah untuk belajar sistem pengairan tradisional dan menanam padi bersama petani lokal' },

  { id: 11, title: 'Kesenian Tiban', category: 'budaya', img: '/assets/img/tiban.jpg', about: 'Pertandingan cambuk janur/lidi antar pria untuk memohon hujan. Wisatawan bisa belajar tentang filosofi di balik tradisi Tiban ini' },
  { id: 12, title: 'Kesenian Jedoran Salalahuk', category: 'budaya', img: '/assets/img/salalahuk.jpg', about: 'Musik perkusi tradisional menggunakan terbang/rebana besar yang sangat ritmik dan magis' },
  { id: 13, title: 'Karawitan & Tari', category: 'budaya', img: '/assets/img/karawitan.jpeg', about: 'Pelatihan langsung menabuh gamelan dan menari tarian lokal bagi wisatawan yang menginap' },
  { id: 14, title: 'Upacara Bersih Desa', category: 'budaya', img: '/assets/img/bersihdesa.jpg', about: 'Acara tahunan besar (biasanya pada bulan Longkang/Sela) yang melibatkan seluruh warga dengan kirab tumpeng hasil bumi' },

  { id: 16, title: 'Cukdeh (Pincuk Lodeh)', category: 'kuliner', img: '/assets/img/cukdeh.jpg', about: 'Sayur lodeh gurih pedas dengan wadah daun, biasanya dinikmati di pinggir sawah' },
  { id: 17, title: 'Cimplung Ketela', category: 'kuliner', img: '/assets/img/cimplung.jpg', about: 'Camilan manis dari singkong yang direbus lama dalam nira kelapa panas saat proses pembuatan gula merah' },
  { id: 18, title: 'Wedang Suwuk', category: 'kuliner', img: '/assets/img/wedangsuwuk.jpg', about: 'Minuman kuno yang terbuat dari kopi murni yang diseduh dengan air ditambah gula aren sebagai pemanisnya, dikatakan suwuk karena proses menyeduhnya seperti orang yang mau nyuwuk (mengobati dalam cara jawa)' },
  { id: 19, title: 'Sego Gegok', category: 'kuliner', img: '/assets/img/segogegok.jpg', about: 'Nasi bungkus daun pisang dengan sambal teri pedas yang dikukus, memberikan aroma yang sangat kuat khas Desa Jajar' },
  { id: 20, title: 'Paseban Cafe', category: 'kuliner', img: '/assets/img/pasebancafe.jpg', about : 'kafe ini menawarkan menu modern dan tradisional dengan pemandangan sawah dan bukit yang menenangkan. Cocok untuk tempat healing sore hari' },

  { id: 15, title: 'Homestay Tradisional', category: 'homestay', img: '/assets/img/banner1.jpg', about: 'Menginap di rumah warga dengan fasilitas lengkap sambil merasakan kehidupan sehari-hari masyarakat desa' },
  
]

const categories = [
  { label: 'Semua', value: '*' },
  { label: 'Alam', value: 'alam' },
  { label: 'Edukasi', value: 'edukasi' },
  { label: 'Budaya', value: 'budaya' },
  { label: 'Kuliner', value: 'kuliner' },
  { label: 'Homestay', value: 'homestay' },
]

export default function TourismSection() {
  const [filter, setFilter] = useState('*')

  const filteredItems = filter === '*' 
    ? tourismData 
    : tourismData.filter(item => item.category === filter)

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 text-gray-800">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Destinasi & Layanan
          </motion.h2>
          <p className="text-emerald-500">Temukan pengalaman terbaik di desa kami</p>
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
              {cat.label}
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
                    alt={item.title}
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
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.about}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}