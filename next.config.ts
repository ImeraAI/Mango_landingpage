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
  /**
   * `/customers` is linked from the footer but has no page of its own — the
   * customer stories live in a section of the homepage. A 301 to that section
   * beats both a 404 and a thin standalone page built out of three quotes.
   * Give it a real page the moment there are real case studies to put on it,
   * and delete this entry.
   */
  async redirects() {
    return [
      { source: '/customers', destination: '/#testimonials', permanent: true },
    ];
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
