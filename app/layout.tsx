import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar' // Kita akan buat ini nanti
import Footer from '@/components/Footer' // Kita akan buat ini nanti
import VisitorTracker from '@/components/VisitorTracker'

// Mengganti Google Fonts link dengan Next.js Font Optimization
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Jajar Gumregah',
  description: 'Website Desa Wisata Jajar Gumregah',
  icons: {
    icon: '/assets/img/iconlogo.png', 
  },
}

export default function RootLayout({ children,}: { children: React.ReactNode}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${poppins.className} antialiased bg-gray-50 text-gray-900`}>
        <VisitorTracker />
        {/* Navbar dipanggil di sini */}
        <Navbar />
        
        {/* Content utama */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer dipanggil di sini */}
        <Footer />
      </body>
    </html>
  )
}