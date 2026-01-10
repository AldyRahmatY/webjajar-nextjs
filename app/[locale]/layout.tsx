import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import "../globals.css";
import Navbar from '@/components/Navbar' // Kita akan buat ini nanti
import Footer from '@/components/Footer' // Kita akan buat ini nanti
import VisitorTracker from '@/components/VisitorTracker'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Jajar Gumregah",
  description: "Website Desa Wisata Jajar",
};

// PERUBAHAN ADA DI SINI
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 1. Ubah tipe data params menjadi Promise
}) {
  
  // 2. Lakukan 'await' pada params sebelum mengambil locale
  const { locale } = await params;

  // Ambil pesan terjemahan
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <VisitorTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}