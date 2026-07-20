'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Button } from '@/components/ui/button';

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  annual: number | null;
  note?: string;
  featured?: boolean;
  cta: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For solo operators and small shops.',
    monthly: 99,
    annual: 79,
    note: '+ $0.50 per call',
    cta: 'Start free trial',
    features: [
      '24/7 AI call reception',
      'Smart scheduling & booking',
      'SMS confirmations',
      '1 calendar sync',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    tagline: 'For growing teams that live on the phones.',
    monthly: 299,
    annual: 239,
    note: '500 calls included, then $0.40',
    featured: true,
    cta: 'Start free trial',
    features: [
      'Everything in Starter',
      'Live dispatch board & map',
      'Automated invoicing',
      'Review & follow-up automation',
      'All integrations',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For multi-location operators.',
    monthly: null,
    annual: null,
    cta: 'Contact sales',
    features: [
      'Everything in Pro',
      'Multi-location routing',
      'Custom voice & scripts',
      'SSO & advanced security',
      'Dedicated success manager',
      'SLA & guided onboarding',
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = React.useState(true);
  const [selected, setSelected] = React.useState(
    PLANS.find((p) => p.featured)?.name ?? PLANS[0].name
  );
  const cardRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  /** Roving focus across the plan cards, as a radio group expects. */
  function handleCardKeys(e: React.KeyboardEvent, index: number) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setSelected(PLANS[index].name);
      return;
    }

    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;

    e.preventDefault();
    const next =
      (index + (forward ? 1 : -1) + PLANS.length) % PLANS.length;
    setSelected(PLANS[next].name);
    cardRefs.current[PLANS[next].name]?.focus();
  }

  return (
    <Section id="pricing" tone="muted">
      <SectionHeading
        eyebrow="Pricing"
        title="Pricing that pays for itself the first weekend."
        description="One missed emergency call can cost more than a month of Mango. Start free, and only scale up when the jobs start rolling in."
      />

      {/*
        Segmented control rather than a sliding switch. The switch sat in a
        flex row without `shrink-0`, so the track compressed while the
        absolutely-positioned knob stayed pinned at `translate-x-6` and
        spilled out over the "Annual" label. Two buttons in a padded pill
        size to their own content and cannot come apart.
      */}
      <div className="mt-10 flex justify-center">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white p-1 shadow-xs"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!annual}
            onClick={() => setAnnual(false)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50',
              !annual
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={annual}
            onClick={() => setAnnual(true)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50',
              annual
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Annual
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
                annual ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-700'
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Choose a plan"
        className="mx-auto mt-12 grid max-w-5xl items-start gap-6 lg:grid-cols-3"
      >
        {PLANS.map((plan, i) => {
          const price = annual ? plan.annual : plan.monthly;
          const isSelected = selected === plan.name;
          return (
            <motion.div
              key={plan.name}
              ref={(el) => {
                cardRefs.current[plan.name] = el;
              }}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${plan.name} plan`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(plan.name)}
              onKeyDown={(e) => handleCardKeys(e, i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className={cn(
                'relative flex cursor-pointer flex-col rounded-3xl border bg-white p-7 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2',
                plan.featured ? 'lg:-mt-4 lg:mb-4' : '',
                isSelected
                  ? 'border-brand-500 shadow-glow ring-1 ring-brand-500'
                  : 'border-slate-200/80 shadow-card hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lifted'
              )}
            >
              {/* selected tick, top-right */}
              <span
                aria-hidden
                className={cn(
                  'absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all',
                  isSelected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-slate-200 bg-white text-transparent'
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>

              {plan.featured ? (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </span>
              ) : null}

              <div className="pr-10">
                <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                {price !== null ? (
                  <>
                    <span className="font-display text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                      ${price}
                    </span>
                    <span className="text-sm text-slate-500">/mo</span>
                  </>
                ) : (
                  <span className="font-display text-4xl font-semibold tracking-tight text-slate-900">
                    Custom
                  </span>
                )}
              </div>
              <div className="mt-1 h-5 text-xs text-slate-400">
                {plan.note ?? (annual && price ? 'billed annually' : '')}
              </div>

              <Button
                variant={isSelected ? 'brand' : 'outline'}
                className="mt-6 w-full"
                asChild
              >
                {/* the card is the radio; the CTA must not re-trigger it */}
                <Link href="/demo" onClick={(e) => e.stopPropagation()}>
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-slate-600">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* The trial/no-card/cancel line lived here; it now has its own
          treatment in <Guarantees />, immediately below. */}
    </Section>
  );
}
