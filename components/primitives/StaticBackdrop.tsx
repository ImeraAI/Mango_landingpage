import * as React from 'react';

/**
 * A quiet, fully static cousin of {@link AuthBackdrop}: the same masked grid
 * and brand blooms, but no motion and dialled to an even lower prominence so
 * it sits well behind dense content like the demo booking form.
 *
 * Purely decorative — `aria-hidden` and `pointer-events-none` throughout.
 */
export function StaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid — fainter than the auth backdrop and masked to fade at the edges. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(15 23 42 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 90% 65% at 50% 30%, #000 45%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 65% at 50% 30%, #000 45%, transparent 100%)',
        }}
      />

      {/* Brand blooms — large, heavily blurred, very low opacity so they read
          as light rather than shapes. */}
      <div className="absolute -left-24 top-[-8%] h-[34rem] w-[34rem] rounded-full bg-brand-400/10 blur-3xl" />
      <div className="absolute -right-32 bottom-[-12%] h-[38rem] w-[38rem] rounded-full bg-brand-300/10 blur-3xl" />

      {/* Vignette: keeps the surface calm toward the edges. */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
    </div>
  );
}
