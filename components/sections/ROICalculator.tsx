'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { cn, formatUSD } from '@/lib/utils';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const MANGO_BASE = 99;
const PER_CALL = 0.5;

export function ROICalculator() {
  const [salary, setSalary] = React.useState(4000);
  const [calls, setCalls] = React.useState(500);

  const mangoCost = React.useMemo(() => MANGO_BASE + calls * PER_CALL, [calls]);
  const savings = Math.max(0, salary - mangoCost);
  const annual = savings * 12;
  const max = Math.max(salary, mangoCost);
  const traditionalPct = (salary / max) * 100;
  const mangoPct = (mangoCost / max) * 100;

  return (
    <Section id="roi">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* controls */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Check your numbers"
            title="What are you paying to answer the phone?"
            description="Move the sliders to match your business."
          />

          <div className="mt-10 space-y-8">
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <label className="text-sm font-semibold text-slate-800">
                  You pay to answer calls
                </label>
                <span className="font-display text-lg font-semibold tabular-nums text-slate-900">
                  {formatUSD(salary)}
                  <span className="text-sm font-normal text-slate-400">
                    /mo
                  </span>
                </span>
              </div>
              <Slider
                value={[salary]}
                min={1000}
                max={8000}
                step={100}
                onValueChange={([v]) => setSalary(v)}
                aria-label="What you pay someone to answer calls each month"
              />
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <label className="text-sm font-semibold text-slate-800">
                  Calls a month
                </label>
                <span className="font-display text-lg font-semibold tabular-nums text-slate-900">
                  {calls.toLocaleString('en-US')}
                </span>
              </div>
              <Slider
                value={[calls]}
                min={100}
                max={2000}
                step={50}
                onValueChange={([v]) => setCalls(v)}
                aria-label="Calls you get in a month"
              />
            </div>
          </div>
        </div>

        {/* results */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lifted"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14),transparent_70%)]"
          />
          <div className="relative">
            <span className="text-sm font-medium text-slate-500">
              You&apos;d keep
            </span>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-6xl">
                {formatUSD(savings)}
              </span>
              <span className="mb-2 text-sm font-medium text-slate-400">
                a month
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              <TrendingUp className="h-4 w-4" />
              {formatUSD(annual)} a year
            </div>

            {/* comparison bars */}
            <div className="mt-8 space-y-4">
              <BarRow
                label="A person answering"
                value={formatUSD(salary)}
                pct={traditionalPct}
                tone="slate"
              />
              <BarRow
                label="Mango answering"
                value={formatUSD(mangoCost)}
                pct={mangoPct}
                tone="brand"
              />
            </div>

            <Button variant="brand" size="lg" className="mt-8 w-full" asChild>
              <Link href="/demo">
                Try it free for 14 days
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* One line carries the trial terms and the pricing basis. The
                estimate disclaimer has to stay: these are made-up inputs. */}
            <p className="mt-3 text-center text-xs text-slate-400">
              No credit card. {formatUSD(MANGO_BASE)}/mo + 50¢ per call.
              Estimate only.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function BarRow({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: string;
  pct: number;
  tone: 'slate' | 'brand';
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="tabular-nums font-semibold text-slate-900">
          {value}
          <span className="font-normal text-slate-400">/mo</span>
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={cn(
            'h-full rounded-full',
            tone === 'brand'
              ? 'bg-gradient-to-r from-brand-500 to-brand-600'
              : 'bg-slate-300'
          )}
          animate={{ width: `${Math.max(pct, 4)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
