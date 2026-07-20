'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';

function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white',
        className
      )}
    >
      {initials}
    </span>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

const SUPPORTING = [
  {
    quote:
      'We used to miss calls every weekend and lose thousands. Now every emergency is answered, booked, and dispatched while I sleep.',
    name: 'David Chen',
    role: 'Owner, AquaPlumb Services',
    initials: 'DC',
    metric: '+41% weekend revenue',
  },
  {
    quote:
      'Mango qualifies the job before my team ever picks up. Our dispatchers finally got their day back.',
    name: 'Marcus Webb',
    role: 'GM, VoltElectric',
    initials: 'MW',
    metric: '6 hrs/day saved',
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Loved by operators"
        title="The people who run the phones swear by it."
        description="Owners, operations managers, and dispatchers across the trades trust Mango with their most important customer moment: the first call."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-5">
        {/* Featured */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lifted sm:p-10 lg:col-span-3"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_70%)]"
          />
          <div className="relative">
            <Stars />
            <blockquote className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight text-slate-900 sm:text-[1.75rem]">
              “The dashboard feels like Stripe, but built for HVAC. Our techs
              love the automated updates, and our customers are genuinely
              blown away that they never reach a machine.”
            </blockquote>
          </div>
          <figcaption className="relative mt-8 flex items-center gap-4">
            <Avatar initials="SJ" className="bg-brand-600" />
            <div>
              <div className="font-semibold text-slate-900">Sarah Jenkins</div>
              <div className="text-sm text-slate-500">
                Operations Manager, AirPro HVAC
              </div>
            </div>
            <div className="ml-auto hidden rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 sm:block">
              0 missed calls
            </div>
          </figcaption>
        </motion.figure>

        {/* Supporting */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {SUPPORTING.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="flex flex-1 flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card"
            >
              <blockquote className="text-[0.95rem] leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar initials={t.initials} className="h-9 w-9 text-xs" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {t.name}
                  </div>
                  <div className="truncate text-xs text-slate-500">{t.role}</div>
                </div>
                <div className="ml-auto shrink-0 text-xs font-semibold text-brand-700">
                  {t.metric}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
