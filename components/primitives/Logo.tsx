import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import logoSrc from '@/public/mango-logo.png';

type LogoProps = {
  className?: string;
  /**
   * Preload the image. Set this on the header logo only — it is the topmost
   * above-the-fold element. The copy inside the mobile menu must NOT set it,
   * or the page emits a preload for something that starts unmounted.
   */
  priority?: boolean;
};

/**
 * Mango brandmark: an emerald rounded-square containing a voice waveform,
 * a nod to "answers every call." Used in the header, footer, and mockups.
 * Mango is the product; IMERA AI is the parent company.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-sheen shadow-[0_4px_12px_-4px_rgba(5,150,105,0.6)]',
        className
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-[11px] ring-1 ring-inset ring-white/25" />
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="relative"
      >
        {[
          { x: 1.5, h: 5 },
          { x: 5, h: 10 },
          { x: 8.5, h: 16 },
          { x: 12, h: 10 },
          { x: 15.5, h: 5 },
        ].map((bar) => (
          <rect
            key={bar.x}
            x={bar.x - 0.75}
            y={9 - bar.h / 2}
            width="1.6"
            height={bar.h}
            rx="0.8"
            fill="white"
          />
        ))}
      </svg>
    </span>
  );
}

/**
 * The full brand lockup (hard hat + "MANGO"). The artwork is a static import,
 * so Next reads its intrinsic size at build time: the aspect ratio is
 * reserved before the bitmap arrives, giving zero layout shift, and a wrong
 * path fails the build instead of 404-ing silently in the header.
 *
 * Sizing sets height only and lets width follow, preserving the 3.14:1 ratio.
 * The wordmark is near-black, so this needs a light surface.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src={logoSrc}
      alt="Mango"
      priority={priority}
      className={cn('h-10 w-auto', className)}
    />
  );
}
