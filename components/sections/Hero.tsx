'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star, TrendingUp, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridBackground } from '@/components/primitives/GridBackground';
import { TrustStrip } from '@/components/primitives/TrustStrip';
import { CallCard } from '@/components/mockups/CallCard';

const EASE = [0.16, 1, 0.3, 1] as const;

function FloatingChip({
  className,
  icon: Icon,
  label,
  value,
  delay = 0,
}: {
  className?: string;
  icon: React.ElementType;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 shadow-lifted backdrop-blur animate-float">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <div className="text-2xs uppercase tracking-wide text-slate-400">
            {label}
          </div>
          <div className="text-sm font-semibold tabular-nums text-slate-900">
            {value}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36">
      <GridBackground />
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14),transparent_65%)]"
      />

      <div className="container flex flex-col items-center text-center">
        <motion.a
          href="#platform"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 py-1 pl-1 pr-3 text-sm shadow-xs backdrop-blur transition-colors hover:border-brand-200"
        >
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            New
          </span>
          <span className="font-medium text-slate-600">
            Emergency after-hours intake, fully automated
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
          className="mt-7 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tightest text-slate-900 sm:text-6xl md:text-[4.25rem]"
        >
          Never miss another
          <br className="hidden sm:block" /> service call.{' '}
          <span className="text-gradient-brand">Ever.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
        >
          Mango is the AI receptionist for home service teams. It answers every
          call, qualifies the lead, dispatches a tech, books the job, drafts the
          invoice, and follows up, 24/7, in your company&apos;s voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button variant="brand" size="lg" asChild>
            <Link href="/demo">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#how-it-works">
              <Play className="h-4 w-4 text-brand-600" />
              See how a call flows
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-2 text-sm text-slate-500 sm:flex-row sm:gap-4">
            <span className="inline-flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-1 font-semibold text-slate-800">4.9/5</span>
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span>
              Trusted by{' '}
              <span className="font-semibold text-slate-800">500+</span> home
              service teams
            </span>
          </div>

          <TrustStrip />
        </motion.div>
      </div>

      {/* Product visual: scroll-unfold + Apple-style mirror */}
      <div ref={ref} className="container relative mt-16 pb-24 sm:mt-20">
        <div className="perspective-2000 mx-auto max-w-3xl">
          <motion.div
            style={{ rotateX, scale }}
            className="preserve-3d relative origin-top"
          >
            {/* main surface: opaque so the console stays crisp */}
            <div className="relative rounded-[1.75rem] border border-slate-200/70 bg-white p-2.5 shadow-lifted">
              <div className="rounded-[1.35rem] bg-slate-50 p-3 sm:p-5">
                <CallCard />
              </div>
            </div>

            {/*
              Grounding shadow. This used to be a second <CallCard /> flipped
              with `scale-y-[-1] origin-top`, but that mirrors about the top
              edge, so the copy rendered *upward* over the real card instead of
              below it, which is what produced the washed-out double image.
              A gradient reads the same at a glance and costs one div.
            */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-full h-24 rounded-[50%] bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.16),transparent_70%)] blur-xl"
            />
          </motion.div>
        </div>

        {/* floating stat chips */}
        <motion.div
          style={{ y: chipY }}
          className="pointer-events-none absolute inset-0"
        >
          <FloatingChip
            className="absolute -left-2 top-10 hidden sm:block lg:left-10"
            icon={Clock}
            label="Avg. answer"
            value="1.2s"
            delay={0.5}
          />
          <FloatingChip
            className="absolute -right-2 top-24 hidden sm:block lg:right-8"
            icon={TrendingUp}
            label="Calls handled"
            value="+24%"
            delay={0.65}
          />
          <FloatingChip
            className="absolute bottom-40 left-6 hidden md:block lg:left-24"
            icon={FileText}
            label="Invoice drafted"
            value="$418.00"
            delay={0.8}
          />
        </motion.div>
      </div>
    </section>
  );
}
