// middleware.ts
import createMiddleware from 'next-intl/middleware';


export default createMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'always'
});

export const config = {
  // Matcher ini akan mengabaikan folder _next, api, dan file yang memiliki ekstensi (seperti .png, .css, .ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};