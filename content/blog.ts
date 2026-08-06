/**
 * Blog types and the category list. Deliberately free of any `fs` or
 * `node:` import so client components ("use client") can import from here
 * without dragging the filesystem reader — or every post body — into the
 * browser bundle. Anything that touches disk lives in `lib/blog.ts`.
 */

/**
 * The allowed categories, in the order the filter bar shows them.
 * Adding one here is all it takes; validation and the UI both read this list.
 * Give it a colour and an icon in components/blog/CategoryVisual.tsx too —
 * without one it still works, but its generated covers fall back to grey.
 */
export const BLOG_CATEGORIES = [
  'Missed calls',
  'Booking and scheduling',
  'Running the business',
  'Operations',
  'On the tools',
  'Customer experience',
  'Product',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPost = {
  /** Filename without the extension. Also the URL. */
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Always 'YYYY-MM-DD'. Normalized on read so writers can leave it unquoted. */
  date: string;
  author: string;
  /** Pins the post to the hero slot on /blog. At most one should set it. */
  featured: boolean;
  /**
   * Banner picture: the post header, the card on /blog, and the link preview
   * when the post is shared. Already resolved to a usable URL on read, so
   * writers can put a bare filename in the frontmatter. Absent when the post
   * has no banner, or when the named file is not in public/blog.
   */
  image?: string;
  /** One sentence describing the banner, for screen readers and search. */
  imageAlt?: string;
  /** Derived from the body by `reading-time`, never hand-written. */
  readingMinutes: number;
  /**
   * Raw MDX source. Omitted by `getAllPosts()` — list pages never render it,
   * and shipping every body as serialized props would balloon the payload.
   */
  content?: string;
};

/** A post as it appears in listings: same shape, guaranteed no body. */
export type BlogPostMeta = Omit<BlogPost, 'content'>;

/** Where writers put pictures, and where the site serves them from. */
export const BLOG_IMAGE_URL_PREFIX = '/blog/images/';

/**
 * Pictures are uploaded to `content/blog/images` and named by filename alone —
 * `dispatch-board.jpg`. A build step copies that folder to
 * `public/blog/images`, which is what this maps a filename onto. Absolute
 * paths and full URLs are passed through untouched.
 */
export function resolveBlogImage(src: string): string {
  const value = src.trim();
  if (value === '') return '';
  if (isRemoteImage(value) || value.startsWith('/')) return value;
  // Any folder a writer typed is dropped: the folder is fixed, and this also
  // means a path pasted from their computer still finds the right file.
  const filename = value.split(/[\\/]/).pop() ?? '';
  return filename === '' ? '' : `${BLOG_IMAGE_URL_PREFIX}${filename}`;
}

/** Remote images skip next/image: only whitelisted hosts may be optimized. */
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//i.test(src.trim());
}

export function formatDate(iso: string) {
  // Format in UTC. A bare 'YYYY-MM-DD' parses as midnight UTC, so formatting
  // it in a behind-UTC timezone would render the previous day.
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}
