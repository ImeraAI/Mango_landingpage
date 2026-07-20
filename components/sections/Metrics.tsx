import * as React from 'react';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { AnimatedNumber } from '@/components/primitives/AnimatedNumber';

const STATS = [
  {
    value: <AnimatedNumber value={38} suffix="%" />,
    label: 'more jobs booked',
    sub: 'from calls that used to go to voicemail',
  },
  {
    value: <AnimatedNumber value={8} suffix="s" />,
    label: 'average time to book',
    sub: 'from first ring to a slot on the calendar',
  },
  {
    value: <AnimatedNumber value={3750} prefix="$" />,
    label: 'saved every month',
    sub: 'versus a full-time front desk',
  },
  {
    value: <AnimatedNumber value={500} suffix="+" />,
    label: 'home service teams',
    sub: 'run their front office on Mango',
  },
];

export function Metrics() {
  return (
    <Section tone="muted" spacing="sm">
      <Reveal>
        <p className="text-center text-sm font-medium uppercase tracking-[0.14em] text-slate-400">
          Outcomes operators actually feel
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
    </Section>
  );
}
