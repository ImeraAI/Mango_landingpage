'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Users, Smartphone } from 'lucide-react';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { BrowserFrame } from '@/components/primitives/BrowserFrame';
import { CommandCenter } from '@/components/mockups/CommandCenter';

const POINTS = [
  {
    icon: Eye,
    title: 'Real-time visibility',
    description:
      'Every call, job, and invoice updates live. No refresh, no guessing where things stand.',
  },
  {
    icon: Users,
    title: 'One board for the whole team',
    description:
      'Dispatchers, owners, and office staff work from a single source of truth.',
  },
  {
    icon: Smartphone,
    title: 'Techs stay in sync',
    description:
      'Assignments, routes, and job details reach the field the moment they change.',
  },
];

export function CommandCenterSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <section
      id="command-center"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      {/* soft top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]"
      />
      <div className="container">
        <SectionHeading
          eyebrow="Command Center"
          title="Your entire operation, visible at a single glance."
          description="Calls, schedule, dispatch, invoices, and revenue. Every part of the front office on one calm, real-time dashboard your whole team can trust."
        />

        <motion.div ref={ref} style={{ y, scale }} className="mt-16">
          <div className="relative mx-auto max-w-5xl">
            <BrowserFrame url="app.mango.ai/dashboard" bodyClassName="overflow-hidden">
              <CommandCenter />
            </BrowserFrame>

            {/*
              Grounding shadow. This was a second BrowserFrame flipped with
              `scale-y-[-1] origin-top`, which mirrors about the top edge, so
              the duplicate rendered upward across the real dashboard instead
              of below it. That double image is what made the section look
              smudged. A soft gradient gives the same lift for one div.
            */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-12 top-full hidden h-24 rounded-[50%] bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.18),transparent_70%)] blur-xl lg:block"
            />
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {POINTS.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
