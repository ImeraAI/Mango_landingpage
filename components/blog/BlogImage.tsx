import Image from 'next/image';
import { isRemoteImage } from '@/content/blog';

/**
 * Every picture in the blog — banners and body images alike — goes through
 * here, so resizing, modern formats and lazy loading are automatic and a
 * writer never has to think about dimensions.
 *
 * Uploaded pictures get next/image. A picture hosted somewhere else falls back
 * to a plain <img>: next/image refuses any host not listed in next.config.ts,
 * and a build that dies because someone pasted a URL is a worse outcome than
 * an unoptimized image.
 */
export function BlogImage({
  src,
  alt,
  className,
  priority = false,
  sizes = '(min-width: 768px) 42rem, 100vw',
}: {
  src: string;
  alt: string;
  className?: string;
  /** Set on the banner: it is above the fold, so it should not lazy-load. */
  priority?: boolean;
  sizes?: string;
}) {
  if (isRemoteImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      // A stated aspect ratio the CSS then overrides — this only tells the
      // browser how much space to reserve so the page does not jump.
      width={1600}
      height={900}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
