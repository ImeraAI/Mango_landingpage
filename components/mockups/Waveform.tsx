'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Animated voice waveform. Bars pulse on a staggered loop to suggest a
 * live call. Deterministic heights (no Math.random) keep SSR stable.
 */
const HEIGHTS = [0.45, 0.8, 1, 0.6, 0.9, 0.5, 0.75, 1, 0.55, 0.85, 0.65, 0.95];

export function Waveform({
  className,
  active = true,
  bars = 12,
  tone = 'brand',
}: {
  className?: string;
  active?: boolean;
  bars?: number;
  tone?: 'brand' | 'slate' | 'white';
}) {
  const colorClass =
    tone === 'brand'
      ? 'bg-brand-500'
      : tone === 'white'
        ? 'bg-white/80'
        : 'bg-slate-300';

  return (
    <div className={cn('flex h-6 items-center gap-[3px]', className)}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = HEIGHTS[i % HEIGHTS.length];
        return (
          <span
            key={i}
            className={cn(
              'w-[3px] origin-center rounded-full',
              colorClass,
              active && 'animate-sound-bar'
            )}
            style={{
              height: `${Math.round(h * 100)}%`,
              animationDelay: `${(i % HEIGHTS.length) * 0.09}s`,
              animationDuration: `${1 + (i % 4) * 0.15}s`,
            }}
          />
        );
      })}
    </div>
  );
}
