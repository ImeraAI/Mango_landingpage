/**
 * One source of truth for the site's own identity.
 *
 * Everything that has to name the origin — metadataBase, canonical tags,
 * og:url, the sitemap, robots.txt and every JSON-LD @id — reads from here.
 * The audit that prompted this file found the sitemap advertising a *different*
 * domain than the one serving it, which tells search engines the real home is
 * elsewhere. That can only happen when the origin is written down in more than
 * one place, so now it is written down once.
 *
 * Override per deployment with NEXT_PUBLIC_SITE_URL (no trailing slash) for
 * preview builds; production falls back to the canonical domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mangoaiusa.com'
).replace(/\/+$/, '');

export const SITE_NAME = 'Mango';
export const LEGAL_NAME = 'Mango AI, Inc.';

/** Absolute URL for a site-relative path. Used by JSON-LD, which cannot use
 *  the relative form that Next resolves for canonical/og tags. */
export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Canonical block for a page's `metadata` export. Relative is deliberate:
 * Next resolves it against metadataBase, so the origin still comes from
 * SITE_URL alone and a preview deploy cannot canonicalize to production.
 */
export function canonical(path = '/') {
  return { canonical: path } as const;
}
