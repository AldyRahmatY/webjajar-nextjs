import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['id', 'en'];

// Perhatikan: parameternya sekarang 'requestLocale' (bukan locale biasa)
export default getRequestConfig(async ({requestLocale}) => {
  
  // 1. Kita harus 'await' variable requestLocale ini
  let locale = await requestLocale;

  // 2. Validasi: Pastikan locale ada isinya. Jika undefined atau tidak terdaftar, lempar 404.
  if (!locale || !locales.includes(locale as any)) {
      notFound();
  }

  return {
    locale, // Sekarang TypeScript tidak akan error karena 'locale' sudah pasti string
    messages: (await import(`../messages/${locale}.json`)).default
  };
});