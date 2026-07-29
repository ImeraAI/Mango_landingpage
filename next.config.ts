import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const dashboardUrl = process.env.DASHBOARD_URL || 'https://plumbingimera-production.up.railway.app';
    return [
      {
        source: '/dashboard',
        destination: `${dashboardUrl}`,
      },
      {
        source: '/dashboard/:path*',
        destination: `${dashboardUrl}/:path*`,
      },
      {
        source: '/assets/:path*',
        destination: `${dashboardUrl}/assets/:path*`,
      },
      {
        source: '/images/:path*',
        destination: `${dashboardUrl}/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
