'use client';

import * as React from 'react';
import {
  useInView,
  useMotionValue,
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

/**
 * Counts up to `value` once it scrolls into view, using a spring for a
 * natural settle. Formatting stays deterministic for SSR hydration
 * (renders the resting value on the server).
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
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 90,
    damping: 22,
    mass: 1,
  });

  const display = useTransform(spring, (latest) => {
    const rounded =
      decimals > 0
        ? latest.toFixed(decimals)
        : Math.round(latest).toString();
    const asNumber = Number(rounded);
    const formatted = grouping
      ? asNumber.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : rounded;
    return `${prefix}${formatted}${suffix}`;
  });

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
}
