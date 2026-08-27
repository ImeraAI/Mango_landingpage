import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, RefreshCw } from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { CategoryPill } from '@/components/blog/CategoryVisual';
import { formatDate, formatReadingTime } from '@/content/blog';
import { getAllPosts } from '@/lib/blog';

/**
 * Latest writing, on the homepage.
 *
 * Two audit findings closed by one section. The homepage had thin internal
 * linking — a handful of destinations across two thousand words, almost all of
 * it navigation chrome rather than links inside the prose — and it carried no
 * date anywhere, so nothing on it signalled the site was still being tended.
 *
 * A dated list of real articles fixes both honestly: the links are editorial
 * rather than another copy of the nav, and the dates are genuine publication
 * dates read off the posts themselves rather than a "last updated" stamp
 * printed from the clock, which is a freshness signal that means nothing.
 */
export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section id="writing" spacing="sm">
      <SectionHeading
        eyebrow="From the blog"
        title="How to run the phones, written down."
        description="Practical pieces on intake, after-hours cover, and what the calls you miss are actually worth."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 transition-colors hover:border-brand-200">
              <CategoryPill category={post.category} />

              <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-brand-700"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formatReadingTime(post.readingMinutes)}
                </span>
                {post.updated ? (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Updated{' '}
                    <time dateTime={post.updated}>
                      {formatDate(post.updated)}
                    </time>
                  </span>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25}>
        <p className="mt-10 text-center text-sm">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Read everything on the blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
