import type { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/blog';

// Keep in sync with metadataBase in app/layout.tsx.
const siteUrl = 'https://mango.ai';

const staticRoutes = [
  '',
  '/platform',
  '/how-it-works',
  '/industries',
  '/pricing',
  '/about',
  '/careers',
  '/security',
  '/status',
  '/demo',
  '/blog',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Posts come from the same folder scan as the routes, so a new .mdx file
  // shows up here without anyone remembering to add it.
  const posts = getAllPostSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...posts,
  ];
}
