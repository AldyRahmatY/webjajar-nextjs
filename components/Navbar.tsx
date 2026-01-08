'use client'

import * as React from 'react'
import Image from 'next/image'
import { Menu, X, Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslations, useLocale } from 'next-intl'

// PENTING: Import dari file navigation yang baru kita buat di langkah 1
// Jangan import Link dari 'next/link'
import { Link, usePathname, useRouter } from '@/i18n/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  
  const t = useTranslations('Navbar')
  
  // 1. Ambil locale aktif dari URL (misal: 'id' atau 'en')
  const locale = useLocale(); 
  
  // 2. Setup router dan pathname untuk fitur ganti bahasa
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('home'), href: '/#home', key: 'home' },
    { name: t('about'), href: '/#about', key: 'about' },
    { name: t('orgchart'), href: '/#orgchart', key: 'orgchart' },
    { name: t('service'), href: '/#wisata', key: 'wisata' },
    { name: t('berita'), href: '/#berita', key: 'news' },
  ];

  // 3. Fungsi Ganti Bahasa yang Benar (Mengubah URL)
  const handleLanguageChange = (newLocale: string) => {
    // Router replace akan mengubah URL dari /id/... ke /en/... (atau sebaliknya)
    // dan tetap mempertahankan halaman yang sedang dibuka (pathname)
    router.replace(pathname, { locale: newLocale });
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
              key={link.key} 
              href={link.href}
              className="text-sm font-semibold text-white transition-colors uppercase hover:text-emerald-400"
            >
              {link.name}
            </Link>
          ))}

          {/* Tombol Pemesanan - Gunakan <a> biasa karena link eksternal */}
          <Button asChild variant="default" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <a href="https://forms.gle/xAx52tMegwhmGk7BA" target="_blank" rel="noopener noreferrer">
              {t('booking')}
            </a>
          </Button>

          {/* Fitur Bahasa Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex text-white items-center gap-2 px-2 hover:bg-white/10 hover:text-white">
                <Globe className="w-4 h-4" />
                <span className="font-semibold uppercase">{locale}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('id')}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>Bahasa Indonesia</span>
                {locale === 'id' && <Check className="w-4 h-4 text-green-600" />}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>English</span>
                {locale === 'en' && <Check className="w-4 h-4 text-green-600" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Toggle & Lang Switcher */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Tombol Bahasa Mobile */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleLanguageChange(locale === 'id' ? 'en' : 'id')}
            className="text-sm font-semibold flex items-center gap-1 text-white hover:bg-white/10"
          >
            <Globe className="w-4 h-4" /> <span className="uppercase">{locale}</span>
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
              key={link.key} 
              href={link.href}
              className="text-sm font-semibold text-center text-gray-800 hover:text-emerald-500 uppercase block py-2 border-b border-gray-100 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://forms.gle/xAx52tMegwhmGk7BA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-semibold text-center bg-emerald-500 text-white py-3 rounded-md mt-2 block hover:bg-emerald-600"
          >
            PEMESANAN
          </a>
        </div>
      )}
    </header>
  )
}