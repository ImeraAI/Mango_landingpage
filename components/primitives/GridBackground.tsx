import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Decorative background layer: a faint slate grid with a soft emerald
 * radial glow. Purely presentational; always aria-hidden.
 */
export function GridBackground({
  className,
  fade = true,
  glow = true,
}: {
  className?: string;
  fade?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
    >
      <div
        className={cn(
          'absolute inset-0 bg-grid-slate bg-grid',
          fade &&
            '[mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]'
        )}
      />
      {glow ? (
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-radial-fade blur-2xl" />
      ) : null}
    </div>
  );
}
