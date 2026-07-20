import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { POSTS, formatDate } from '@/lib/posts';

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

          <Reveal className="mx-auto mt-14 max-w-3xl" delay={0.1}>
            <ul className="divide-y divide-slate-200/80 border-y border-slate-200/80">
              {POSTS.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-8 transition-colors hover:bg-slate-50/70"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                      <span className="font-semibold text-brand-700">
                        {post.category}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
                      {post.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Read it
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
