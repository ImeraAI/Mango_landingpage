import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Accent = 'sky' | 'cyan' | 'amber' | 'emerald' | 'violet' | 'blue';

/**
 * Per-accent class sets. Written as full, static strings so Tailwind's
 * JIT can see (and keep) every utility we reference.
 */
const ACCENTS: Record<Accent, { tile: string; border: string }> = {
  sky: { tile: 'bg-sky-50 text-sky-600', border: 'border-sky-100' },
  cyan: { tile: 'bg-cyan-50 text-cyan-600', border: 'border-cyan-100' },
  amber: { tile: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  emerald: { tile: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
  violet: { tile: 'bg-violet-50 text-violet-600', border: 'border-violet-100' },
  blue: { tile: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
};

/**
 * A logo-cloud lockup: a colored glyph tile + name inside a soft pill,
 * tinted in the brand's accent. These are illustrative placeholder brands
 * drawn from icons. public/ ships no real logos or trademarks.
 */
export function Wordmark({
  name,
  icon: Icon,
  accent = 'emerald',
  className,
}: {
  name: string;
  icon: LucideIcon;
  accent?: Accent;
  className?: string;
}) {
  const a = ACCENTS[accent];
  return (
    <span
      className={cn(
        'inline-flex select-none items-center gap-2.5 rounded-full border bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur',
        a.border,
        className
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lg',
          a.tile
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-slate-700">
        {name}
      </span>
    </span>
  );
}
