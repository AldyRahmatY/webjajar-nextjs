import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Daftar bahasa
  locales: ['id', 'en'],
  
  // Bahasa default
  defaultLocale: 'id',
  
  // Opsi prefix (always/as-needed)
  localePrefix: 'always'
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);