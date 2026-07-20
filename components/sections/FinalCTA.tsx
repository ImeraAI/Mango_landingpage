'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Waveform } from '@/components/mockups/Waveform';

const ASSURANCES = [
  '14-day free trial',
  'No credit card required',
  'Live in a day',
];

export function FinalCTA() {
  return (
    <section id="demo" className="scroll-mt-24 px-4 pb-24 pt-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-700 px-6 py-16 text-center shadow-[0_40px_100px_-40px_rgba(5,150,105,0.7)] sm:px-12 sm:py-24"
      >
        {/* subtle texture + glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <div className="rounded-2xl bg-white/10 p-2.5 ring-1 ring-inset ring-white/20 backdrop-blur">
            <Waveform tone="white" bars={16} className="h-8 w-40 justify-center" />
          </div>

          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Ready to answer every call?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-50/90">
            Join hundreds of home service teams who never miss a call, never
            lose a lead, and never work a front desk again. Set up in a day.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 active:scale-[0.98]"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/0 px-7 text-[0.95rem] font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              Book a demo
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {ASSURANCES.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-50/90"
              >
                <Check className="h-4 w-4" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
