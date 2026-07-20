import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { Button } from '@/components/ui/button';
import { POSTS, getPost, formatDate } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: `${post.title} · Mango`, description: post.excerpt },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Section className="pt-32 sm:pt-36">
          <article className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <span className="font-semibold text-brand-700">
                {post.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.readingTime}</span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {post.excerpt}
            </p>

            <div className="mt-8 border-t border-slate-200/80 pt-8">
              {post.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-6 text-lg leading-relaxed text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="text-sm text-slate-500">Written by {post.author}</p>

            <div className="mt-12 rounded-3xl border border-brand-100 bg-brand-50/60 p-8 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
                Stop losing the calls you already paid for.
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
                Mango answers every call, books the job, and texts the customer
                back. Live in a day, no contract.
              </p>
              <Button variant="brand" size="lg" className="mt-6" asChild>
                <Link href="/demo">
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </>
  );
}
