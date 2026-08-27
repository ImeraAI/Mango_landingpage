import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

// Single source of truth, shared with metadataBase and every canonical tag.
// This file used to hardcode a different domain than the one serving it.
const siteUrl = SITE_URL;

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
  '/integrations',
  '/contact',
  '/privacy',
  '/terms',
];

/** Pages that are the reason the site exists rank above the boilerplate. */
const PRIORITY: Record<string, number> = {
  '': 1,
  '/platform': 0.9,
  '/pricing': 0.9,
  '/how-it-works': 0.9,
  '/industries': 0.8,
  '/integrations': 0.8,
  '/blog': 0.8,
  '/demo': 0.8,
  '/about': 0.7,
  '/contact': 0.7,
  '/security': 0.6,
  '/careers': 0.5,
  '/status': 0.4,
  '/privacy': 0.3,
  '/terms': 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Posts come from the same folder scan as the routes, so a new .mdx file
  // shows up here without anyone remembering to add it. Reading the full post
  // rather than just the slug gets us a real `lastModified` from the post's
  // own date, instead of the build time every URL would otherwise share.
  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: route === '' || route === '/blog' ? ('weekly' as const) : ('monthly' as const),
      priority: PRIORITY[route] ?? 0.6,
    })),
    ...posts,
  ];
}
