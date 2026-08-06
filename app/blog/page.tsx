import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Sparkles,
  User,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { PostList } from '@/components/blog/PostList';
import { PostCover } from '@/components/blog/PostCover';
import { CategoryPill } from '@/components/blog/CategoryVisual';
import { formatDate, formatReadingTime } from '@/content/blog';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical advice on running the phones at a home service business: intake, after-hours cover, and what missed calls really cost.',
  openGraph: {
    title: 'Blog · Mango',
    description:
      'Practical advice on running the phones at a home service business.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  // The hero slot goes to whatever is pinned with `featured: true`, and falls
  // back to the newest post so the page is never missing its lead.
  const hero = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== hero?.slug);

  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Section className="pt-32 sm:pt-36">
          <SectionHeading
            eyebrow="Blog"
            title="Notes from the front office."
            description="Practical advice on answering the phone, booking more of the jobs you already get, and keeping the calendar full."
          />

          {hero && (
            <Reveal className="mx-auto mt-14 max-w-6xl" delay={0.05}>
              <Link
                href={`/blog/${hero.slug}`}
                className="group grid gap-8 rounded-3xl border border-brand-100 bg-brand-50/50 p-8 transition-colors hover:border-brand-200 hover:bg-brand-50 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
                      <Sparkles className="h-3.5 w-3.5" />
                      Latest
                    </span>
                    <CategoryPill category={hero.category} />
                  </div>

                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-brand-700 sm:text-4xl">
                    {hero.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">
                    {hero.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      <time dateTime={hero.date}>{formatDate(hero.date)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatReadingTime(hero.readingMinutes)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {hero.author}
                    </span>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read it
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <PostCover
                  post={hero}
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  size="lg"
                  className="aspect-[16/10] w-full rounded-2xl border border-white/70 object-cover shadow-sm"
                />
              </Link>
            </Reveal>
          )}

          <Reveal className="mx-auto mt-12 max-w-6xl" delay={0.1}>
            <PostList posts={rest} />
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
