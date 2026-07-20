'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Ambient backdrop for the auth pages: a static grid, a pair of drifting
 * brand blooms, and a few travelling "call" pulses along the grid lines.
 *
 * Purely decorative — `aria-hidden` throughout, and `pointer-events-none` so
 * it never intercepts a click meant for the form sitting on top of it.
 * Honours `prefers-reduced-motion` by rendering the same composition frozen.
 */
export function AuthBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid. Masked to fade out toward the edges so it never collides with
          the footer or the header border. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(15 23 42 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 88% 70% at 50% 40%, #000 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 88% 70% at 50% 40%, #000 55%, transparent 100%)',
        }}
      />

      {/* Drifting brand blooms. Large, heavily blurred, low opacity — they
          read as light rather than as shapes. */}
      <motion.div
        className="absolute -left-24 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-400/20 blur-3xl"
        animate={
          reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 bottom-[-15%] h-[38rem] w-[38rem] rounded-full bg-brand-300/20 blur-3xl"
        animate={
          reduceMotion ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Signal pulses: thin brand traces running the grid, a quiet nod to
          calls routing through. Skipped entirely under reduced motion. */}
      {!reduceMotion ? (
        <>
          <motion.span
            className="absolute left-0 top-1/3 h-px w-56 bg-gradient-to-r from-transparent via-brand-500 to-transparent"
            animate={{ x: ['-10rem', '100vw'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 0.5 }}
          />
          <motion.span
            className="absolute left-0 top-2/3 h-px w-44 bg-gradient-to-r from-transparent via-brand-400/85 to-transparent"
            animate={{ x: ['-8rem', '100vw'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 3 }}
          />
          <motion.span
            className="absolute left-1/4 top-0 h-36 w-px bg-gradient-to-b from-transparent via-brand-400/75 to-transparent"
            animate={{ y: ['-6rem', '100vh'] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear', delay: 1.8 }}
          />
        </>
      ) : null}

      {/* Vignette: keeps contrast under the card so text stays legible. */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />
    </div>
  );
}
