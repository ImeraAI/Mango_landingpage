import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import {
  BLOG_CATEGORIES,
  BLOG_IMAGE_URL_PREFIX,
  isRemoteImage,
  resolveBlogImage,
  type BlogCategory,
  type BlogPost,
  type BlogPostMeta,
} from '@/content/blog';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
/** Where writers upload; scripts/sync-blog-images.mjs mirrors it into public/. */
const IMAGE_DIR = path.join(BLOG_DIR, 'images');

/** Slugs come off the URL, so they get gated before they touch a path. */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function listFilenames() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    // The entire drafts mechanism: a leading underscore hides the file.
    .filter((f) => !f.startsWith('_'));
}

/**
 * YAML turns an unquoted 2026-07-14 into a Date. Normalize it back to the
 * plain string the rest of the app expects so writers needn't quote dates.
 */
function normalizeDate(value: unknown, file: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  throw new Error(
    `[blog] ${file}: "date" must be YYYY-MM-DD, got ${JSON.stringify(value)}`
  );
}

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`[blog] ${file}: "${field}" is required and must be text`);
  }
  return value.trim();
}

/**
 * A missing picture is not worth failing a build over: unlike a blank title,
 * the post still reads fine without it. So a banner that names a file nobody
 * uploaded is dropped with a warning and the post publishes plain — matching
 * what the body `![...]()` images do when their file is absent.
 */
function resolveBanner(
  value: unknown,
  filename: string
): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const src = resolveBlogImage(requireString(value, 'image', filename));

  if (!imageExists(src)) {
    console.warn(
      `[blog] ${filename}: image "${src}" is not in content/blog/images — publishing without a banner`
    );
    return undefined;
  }
  return src;
}

/**
 * Shared by the banner and the body: is this picture actually uploaded?
 * Checked against content/blog/images — the folder writers edit — rather than
 * the generated copy under public/, so a stale copy can never make a missing
 * picture look present.
 */
function imageExists(src: string): boolean {
  if (isRemoteImage(src)) return true;
  if (!src.startsWith(BLOG_IMAGE_URL_PREFIX)) return false;
  const name = src.slice(BLOG_IMAGE_URL_PREFIX.length);
  // resolveBlogImage() already stripped any folder, so this cannot escape
  // IMAGE_DIR — belt and braces, since the value came out of a post.
  if (name === '' || name.includes('/') || name.includes('\\')) return false;
  return fs.existsSync(path.join(IMAGE_DIR, name));
}

/**
 * Drop `![alt](file.jpg)` where the file was never uploaded — a typo'd name is
 * the most common mistake, and a broken image icon is worse than no picture.
 * The rest of the post publishes as written.
 */
function stripMissingImages(content: string, filename: string): string {
  return content.replace(
    /!\[([^\]]*)\]\(\s*([^)\s]+)[^)]*\)/g,
    (whole, _alt: string, src: string) => {
      if (imageExists(resolveBlogImage(src))) return whole;
      console.warn(
        `[blog] ${filename}: image "${src}" is not in content/blog/images — leaving it out`
      );
      return '';
    }
  );
}

/**
 * Frontmatter is untrusted input written by hand, so it is validated rather
 * than cast. Throwing fails the build loudly at the offending filename —
 * far better than shipping a post with a blank title or a dead category.
 */
function parseFile(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, '');
  if (!SLUG_RE.test(slug)) {
    throw new Error(
      `[blog] ${filename}: filename must be lowercase letters, numbers and hyphens`
    );
  }

  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
  const { data, content } = matter(raw);

  const category = requireString(data.category, 'category', filename);
  if (!BLOG_CATEGORIES.includes(category as BlogCategory)) {
    throw new Error(
      `[blog] ${filename}: unknown category "${category}". Allowed: ${BLOG_CATEGORIES.join(', ')}`
    );
  }

  const image = resolveBanner(data.image, filename);

  return {
    slug,
    title: requireString(data.title, 'title', filename),
    excerpt: requireString(data.excerpt, 'excerpt', filename),
    category: category as BlogCategory,
    date: normalizeDate(data.date, filename),
    author: requireString(data.author, 'author', filename),
    featured: data.featured === true,
    image,
    imageAlt: image
      ? typeof data.imageAlt === 'string'
        ? data.imageAlt.trim()
        : ''
      : undefined,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content: stripMissingImages(content, filename),
  };
}

/** Every published post, newest first, with bodies stripped for the wire. */
export function getAllPosts(): BlogPostMeta[] {
  return listFilenames()
    .map(parseFile)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Full post including the MDX body, or null when the slug does not exist. */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!SLUG_RE.test(slug)) return null;

  const filename = `${slug}.mdx`;
  if (!listFilenames().includes(filename)) return null;

  return parseFile(filename);
}

/** Drives generateStaticParams() and the sitemap off the same folder. */
export function getAllPostSlugs(): string[] {
  return listFilenames().map((f) => f.replace(/\.mdx$/, ''));
}
