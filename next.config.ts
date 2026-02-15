import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.tailwindcss.com", // Just in case, though unlikely for next/image
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // @ts-ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
