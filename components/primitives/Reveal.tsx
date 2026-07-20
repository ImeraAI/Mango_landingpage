'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** Vertical offset the element travels from (px). */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Scroll-triggered fade + rise. The workhorse entrance animation
 * used across every section for a calm, Stripe-like reveal cadence.
 */
export function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Staggered container. Pair with <RevealItem> children. */
export function RevealStagger({
  children,
  className,
  amount = 0.2,
  once = true,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'ref'> & {
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'ref'>) {
  return (
    <motion.div className={cn(className)} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}
