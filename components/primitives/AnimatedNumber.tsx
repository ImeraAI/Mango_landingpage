'use client';

import * as React from 'react';
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  motion,
} from 'framer-motion';

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Group thousands with commas. */
  grouping?: boolean;
  className?: string;
};

function format(
  value: number,
  decimals: number,
  grouping: boolean,
  prefix: string,
  suffix: string
) {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  const formatted = grouping
    ? Number(rounded).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : rounded;
  return `${prefix}${formatted}${suffix}`;
}

/**
 * Counts up to `value` once it scrolls into view.
 *
 * The resting value is what renders on the server and on the first client
 * paint; the count-up only starts after mount. That ordering is the whole
 * point of this component's shape. Driving the text from a MotionValue that
 * starts at 0 — the obvious way to write this — meant the server HTML said
 * `0%`, `0s`, `$0`, `0+`, so anything reading the page without executing
 * JavaScript (every crawler, every LLM fetcher) saw a company advertising
 * zero results. The animation is decoration; the number is the content, and
 * the content ships in the HTML.
 *
 * Gating on `mounted` rather than rendering the MotionValue immediately also
 * keeps hydration clean: server and first client render produce identical
 * text.
 */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  grouping = true,
  className,
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 90,
    damping: 22,
    mass: 1,
  });

  const resting = format(value, decimals, grouping, prefix, suffix);
  const display = useTransform(spring, (latest) =>
    format(latest, decimals, grouping, prefix, suffix)
  );

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  // Someone who asked their OS for less motion gets the number, not the count.
  if (!mounted || reduceMotion) {
    return (
      <span ref={ref} className={className}>
        {resting}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {/* The accessible value stays the final one throughout the count, so a
          screen reader announces the fact rather than a stream of digits. */}
      <motion.span aria-hidden>{display}</motion.span>
      <span className="sr-only">{resting}</span>
    </span>
  );
}
