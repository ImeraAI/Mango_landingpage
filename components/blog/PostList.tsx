'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, LayoutGrid, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PostCover } from '@/components/blog/PostCover';
import {
  ALL_CHIP_ACTIVE,
  CategoryPill,
  categoryStyle,
} from '@/components/blog/CategoryVisual';
import {
  formatDate,
  formatReadingTime,
  type BlogPostMeta,
} from '@/content/blog';

/**
 * The only client component in the blog. Filtering is local state over posts
 * that are already on the page — no refetch, no URL round-trip — so these are
 * real <button>s with aria-pressed rather than links styled to look like tabs.
 * Only categories that actually have posts get a button; empty filters are
 * dead ends.
 */
export function PostList({ posts }: { posts: BlogPostMeta[] }) {
  const [active, setActive] = React.useState<string>('All');

  const categories = React.useMemo(() => {
    const present: string[] = [];
    for (const post of posts) {
      if (!present.includes(post.category)) present.push(post.category);
    }
    return ['All', ...present];
  }, [posts]);

  const visible =
    active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {categories.length > 2 && (
        <div
          role="group"
          aria-label="Filter posts by category"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const isActive = category === active;
            const style = categoryStyle(category);
            const Icon = category === 'All' ? LayoutGrid : style.icon;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(category)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2',
                  isActive
                    ? cn(
                        'border-transparent',
                        category === 'All' ? ALL_CHIP_ACTIVE : style.chipActive
                      )
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {category}
              </button>
            );
          })}
        </div>
      )}

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              // h-full so a short excerpt does not leave a stubby card beside
              // a tall one — every card in a row ends on the same line.
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <PostCover
                post={post}
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                className="aspect-[16/10] w-full border-b border-slate-200/70 object-cover"
              />

              <div className="flex flex-1 flex-col p-5">
                <CategoryPill category={post.category} className="self-start" />

                <h2 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
                  {post.title}
                </h2>
                {/* line-clamp keeps the meta row on the same line across cards. */}
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>

                {/* mt-auto pins the meta row to the bottom of every card. */}
                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                  <div className="min-w-0 space-y-1.5 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {formatReadingTime(post.readingMinutes)}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{post.author}</span>
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="py-10 text-center text-slate-500">
          Nothing here yet. Try another category.
        </p>
      )}
    </div>
  );
}
