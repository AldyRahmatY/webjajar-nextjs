import Link from 'next/link'
import Image from 'next/image'
import Parser from 'rss-parser'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server';

const parser = new Parser();

async function getLiveNews() {
  try {
    // URL Feed baru
    const res = await fetch('https://jajar-gandusari.trenggalekkab.go.id/index.php/feed', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 86400 } // Tetap jeda 1 hari (86400 detik)
    });

    if (!res.ok) throw new Error("Gagal mengambil data");

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    // Filter Kategori "Berita Desa"
    const filteredItems = feed.items.filter(item => {
      const categories = item.categories || [];
      return categories.some(cat => cat.includes('Berita Desa'));
    });

    const newsData = filteredItems.slice(0, 9).map((item) => {
      // 1. Ekstrak Gambar dari Deskripsi (menggunakan Regex)
      // Karena formatnya: <img src="..." /> Teks berita...
      const imgRegex = /<img[^>]+src="([^">]+)"/;
      const imgMatch = item.contentSnippet?.match(imgRegex) || item.content?.match(imgRegex);
      const imageUrl = imgMatch ? imgMatch[1] : '/assets/user/img/berita/placeholder.jpg';

      // 2. Bersihkan Deskripsi dari tag HTML dan ambil teksnya saja
      // Kita hapus tag <img> dan sisa tag lainnya agar rapi
      let cleanDesc = (item.contentSnippet || "")
        .replace(/<img[^>]*>/g, "") // Hapus tag img
        .replace(/\[\.\.\.\]/g, "...") // Rapikan simbol [...]
        .trim();

      // Filter tambahan: Hanya tampilkan jika deskripsi bukan cuma spasi kosong
      if (cleanDesc.length < 10) cleanDesc = "Klik selengkapnya untuk membaca detail berita desa...";

      return {
        id: item.guid,
        title: item.title,
        date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }) : '',
        img: imageUrl,
        excerpt: cleanDesc,
        externalLink: item.link
      };
    });

    return newsData;
  } catch (error) {
    console.error("Error news scraping:", error);
    return [];
  }
}

export default async function NewsGallerySection() {
  const newsData = await getLiveNews();
  const t = await getTranslations('NewsSection');

  if (newsData.length === 0) return null;

  return (
    <section id="berita" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('title')}</h2>
          <p className="text-emerald-500">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <Card key={index} className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col">
              <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-gray-100">
                <Image 
                  src={item.img} 
                  alt={item.title || "Berita"} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                <CardTitle className="text-lg line-clamp-2 hover:text-emerald-600">
                  <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </CardContent>
              <CardFooter className="justify-center pb-6">
                <Button variant="outline" size="sm" asChild className="border-emerald-500 text-emerald-700 hover:bg-emerald-50">
                  <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                    Selengkapnya
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}