import * as React from 'react';
import Link from 'next/link';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { AnimatedNumber } from '@/components/primitives/AnimatedNumber';
import { ROI_PLAN } from '@/content/pricing';

/**
 * These are modelled figures, not a measured average across customers, and the
 * section says so in as many words.
 *
 * The previous version presented them as outcomes operators had felt, with no
 * source and no method — the exact pattern Google's "How was it created?"
 * guidance is aimed at, and the reason an audit scored this page's
 * trustworthiness down. Two things fix that without deleting anything useful:
 * name the basis of each number, and label the set as illustrative. A reader
 * can now check the arithmetic, which is worth more than an unsourced claim.
 *
 * `basis` is the sentence that makes each number checkable. Keep it literal:
 * if a number stops being derivable from what is written there, change the
 * number.
 */
const MONTHLY = ROI_PLAN.monthly ?? 99;
const PER_CALL = ROI_PLAN.perCall?.rate ?? 0.5;
const MODEL_CALLS = 500;
const MODEL_DESK = 4000;
const MODEL_SAVING = MODEL_DESK - (MONTHLY + MODEL_CALLS * PER_CALL);

const STATS = [
  {
    value: <AnimatedNumber value={MODEL_SAVING} prefix="$" />,
    label: 'saved a month',
    sub: `A ${formatUsd(MODEL_DESK)}/mo front desk versus ${ROI_PLAN.name} at ${MODEL_CALLS} calls`,
  },
  {
    value: <>24/7</>,
    label: 'hours covered',
    sub: 'Nights, weekends and holidays, with no rota to fill',
  },
  {
    value: <AnimatedNumber value={1} />,
    label: 'day to go live',
    sub: 'Keep your existing number; no new hardware',
  },
  {
    value: <AnimatedNumber value={0} />,
    label: 'calls to voicemail',
    sub: 'Every call is answered, triaged and logged',
  },
];

function formatUsd(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export function Metrics() {
  return (
    <Section tone="muted" spacing="sm">
      <Reveal>
        <p className="text-center text-sm font-medium uppercase tracking-[0.14em] text-slate-400">
          What Mango changes about the phones
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={i}
            delay={i * 0.08}
            className="border-slate-200 px-2 text-center lg:border-l lg:first:border-l-0"
          >
            <div className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              <span className="text-gradient-brand">{stat.value}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-900">
              {stat.label}
            </div>
            <div className="mt-1 text-sm text-slate-500">{stat.sub}</div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          The savings figure is an illustration, not a measured customer
          average: it is{' '}
          {formatUsd(MODEL_DESK)} a month for someone answering the phone,
          minus {ROI_PLAN.name} at {formatUsd(MONTHLY)} plus{' '}
          {PER_CALL.toFixed(2).replace('0.', '')}¢ a call over {MODEL_CALLS}{' '}
          calls. Put your own numbers in{' '}
          <Link
            href="/#roi"
            className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
          >
            the calculator
          </Link>{' '}
          to see where you land.
        </p>
      </Reveal>
    </Section>
  );
}
