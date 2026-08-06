import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  User,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { Button } from '@/components/ui/button';
import { mdxComponents } from '@/components/blog/mdx-components';
import { PostCover } from '@/components/blog/PostCover';
import { CategoryPill } from '@/components/blog/CategoryVisual';
import { formatDate, formatReadingTime } from '@/content/blog';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';

type Params = { params: Promise<{ slug: string }> };

// Built off the same folder the reader uses, so a new .mdx file is a new
// static route with nothing else to register.
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} · Mango`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      // The banner doubles as the link preview on LinkedIn, Slack and the rest.
      // metadataBase in app/layout.tsx turns the relative path absolute.
      ...(post.image
        ? { images: [{ url: post.image, alt: post.imageAlt || post.title }] }
        : {}),
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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

            <div className="mt-8">
              <CategoryPill category={post.category} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatReadingTime(post.readingMinutes)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {post.excerpt}
            </p>

            <PostCover
              post={post}
              priority
              size="lg"
              className="mt-8 aspect-[2/1] w-full rounded-3xl border border-slate-200/80 object-cover"
            />

            <div className="mt-8 border-t border-slate-200/80 pt-2">
              <MDXRemote
                source={post.content ?? ''}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            <p className="mt-10 text-sm text-slate-500">
              Written by {post.author}
            </p>

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
