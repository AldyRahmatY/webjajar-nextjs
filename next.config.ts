import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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
};

export default nextConfig;
