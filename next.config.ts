import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin'; // 1. Import plugin ini

const withNextIntl = createNextIntlPlugin('./i18n/request.ts'); // 2. Panggil dengan path ke request config Anda

const nextConfig: NextConfig = {
  /* config options here */  
  reactCompiler: true, // (Ini bawaan config Anda)
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jajar-gandusari.trenggalekkab.go.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['reactflow'],
};

// 3. Bungkus export default dengan withNextIntl
export default withNextIntl(nextConfig);