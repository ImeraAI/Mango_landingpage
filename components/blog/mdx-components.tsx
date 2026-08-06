import * as React from 'react';
import Link from 'next/link';
import { BlogImage } from '@/components/blog/BlogImage';
import { resolveBlogImage } from '@/content/blog';

/**
 * The MDX element map. Hand-written rather than a typography plugin so posts
 * inherit the same slate/brand rhythm as the rest of the site — writers get
 * native-looking pages without ever touching a class name.
 */
export const mdxComponents = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2
      className="mt-12 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-xl font-semibold tracking-tight text-slate-900"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mt-6 text-lg leading-relaxed text-slate-700" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul
      className="mt-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-slate-700 marker:text-brand-500"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol
      className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-slate-700 marker:text-slate-400"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<'li'>) => <li className="pl-1" {...props} />,
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-slate-900" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="mt-8 border-l-2 border-brand-300 bg-brand-50/50 py-1 pl-6 pr-4 text-lg italic leading-relaxed text-slate-700 [&>p]:mt-3 [&>p:first-child]:mt-0"
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<'hr'>) => (
    <hr className="my-12 border-slate-200/80" {...props} />
  ),
  // Internal links keep client-side navigation; external ones open safely.
  a: ({ href = '', ...props }: React.ComponentProps<'a'>) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const className =
      'font-medium text-brand-700 underline underline-offset-4 decoration-brand-300 transition-colors hover:decoration-brand-600';

    if (isInternal) {
      return <Link href={href} className={className} {...props} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      />
    );
  },
  // Images live in public/blog/, so a bare filename in the post is enough.
  // The alt text doubles as the printed caption — an empty one (`![](x.png)`)
  // means the picture is decorative and gets no caption.
  img: ({ src = '', alt = '' }: React.ComponentProps<'img'>) => {
    const resolved = resolveBlogImage(typeof src === 'string' ? src : '');
    if (resolved === '') return null;

    return (
      <figure className="mt-8">
        <BlogImage
          src={resolved}
          alt={alt}
          className="w-full rounded-2xl border border-slate-200/80 object-cover"
        />
        {alt !== '' && (
          <figcaption className="mt-3 text-sm leading-relaxed text-slate-500">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  code: (props: React.ComponentProps<'code'>) => (
    <code
      className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-950 p-5 text-sm leading-relaxed text-slate-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/80">
      <table className="w-full border-collapse text-left text-[0.95rem]" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th
      className="border-b border-slate-200/80 bg-slate-50/70 px-4 py-3 font-semibold text-slate-900"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td
      className="border-b border-slate-200/60 px-4 py-3 align-top text-slate-700"
      {...props}
    />
  ),
};
