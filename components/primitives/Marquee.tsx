import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Seamless, CSS-driven horizontal marquee. Duplicates its children once
 * and translates by -50% so the loop is continuous. Pauses on hover.
 */
export function Marquee({
  children,
  className,
  duration = '40s',
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn('group flex overflow-hidden mask-fade-x', className)}
      style={{ ['--marquee-duration' as string]: duration }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            'flex shrink-0 items-center gap-12 pr-12 animate-marquee group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]'
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
