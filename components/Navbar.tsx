'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe, Check } from 'lucide-react' // Import ikon Globe & Check
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  
  // State untuk bahasa (Default: ID)
  const [language, setLanguage] = React.useState<'ID' | 'EN'>('ID')

  // Efek scroll navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'BERANDA', href: '/#home' },
    { name: 'TENTANG JAJAR', href: '/#about' },
    { name:  'STRUKTUR DESA', href: '/#orgchart' },
    { name: 'LAYANAN WISATA', href: '/#portfolio' },
    { name: 'BERITA', href: '/#berita' },
  ]

  // Fungsi untuk mengganti bahasa
  const handleLanguageChange = (lang: 'ID' | 'EN') => {
    setLanguage(lang)
    // Di sini nanti Anda bisa tambahkan logika i18n/next-intl untuk mengganti konten
    console.log(`Bahasa diganti ke: ${lang}`)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#222] shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/assets/img/logo.png" 
            alt="Logo Jajar" 
            width={150} 
            height={65} 
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold text-white transition-colors uppercase"
            >
              {link.name}
            </Link>
          ))}

          {/* Tombol Pemesanan */}
          <Button asChild variant="default" size="sm" className="bg-emerald-500 hover:bg-secondary/90 text-white">
            <Link href="https://forms.gle/xAx52tMegwhmGk7BA" target="_blank">
              PEMESANAN
            </Link>
          </Button>

          {/* Fitur Bahasa (Menggantikan Login) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex text-white items-center gap-2 px-2">
                <Globe className="w-4 h-4" />
                <span className="font-semibold">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('ID')}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>Bahasa Indonesia</span>
                {language === 'ID' && <Check className="w-4 h-4 text-green-600" />}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('EN')}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>English</span>
                {language === 'EN' && <Check className="w-4 h-4 text-green-600" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Tombol Bahasa Mobile (Tampil di luar menu hamburger agar mudah diakses) */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleLanguageChange(language === 'ID' ? 'EN' : 'ID')}
            className="text-sm font-bold flex items-center gap-1 text-white"
          >
            <Globe className="w-4 h-4" /> {language}
          </Button>

          <button 
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold text-center hover:text-primary uppercase block py-2 border-b border-gray-100 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="https://forms.gle/xAx52tMegwhmGk7BA" 
            target="_blank" 
            className="text-sm font-bold text-center bg-emerald-500 text-white py-3 rounded-md mt-2 block"
          >
            PEMESANAN
          </Link>
        </div>
      )}
    </header>
  )
}