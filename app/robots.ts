import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Served at /robots.txt, which previously 404'd — leaving crawlers with no
 * directives and, more importantly, no pointer to the sitemap.
 *
 * The policy is deliberately permissive. Nothing here is a blocklist for AI
 * crawlers: the site's whole goal is to be quotable by assistants, and the
 * routes that genuinely shouldn't be indexed are the authenticated ones and
 * the proxied dashboard, which are the only disallows below.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Proxied third-party app — not ours to index, and it would put
          // duplicate, unrelated content under this domain.
          '/dashboard',
          '/dashboard/',
          '/assets/',
          '/images/',
          // Auth screens have no content worth ranking and only ever
          // dilute the crawl budget.
          '/signin',
          '/signup',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
