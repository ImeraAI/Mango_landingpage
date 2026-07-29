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
  /** Two or three words for the mobile tile, under the plan name. */
  short: string;
  monthly: number | null;
  annual: number | null;
  note?: string;
  featured?: boolean;
  cta: string;
  features: string[];
  /**
   * The same facts as `features`, but keyed so the mobile view can show one
   * plan's column at a time. A bullet list only answers "what do I get?";
   * these answer "how does this differ from the one next to it?", which is
   * the question you cannot see the answer to on a phone where the plans
   * can't sit side by side.
   */
  specs: Record<SpecKey, string>;
};

type SpecKey =
  | 'bestFor'
  | 'calls'
  | 'extraCalls'
  | 'calendars'
  | 'dispatch'
  | 'invoicing'
  | 'followUps'
  | 'enterprise'
  | 'support';

const SPEC_ROWS: { key: SpecKey; label: string }[] = [
  { key: 'bestFor', label: 'Best for' },
  { key: 'calls', label: 'Calls included' },
  { key: 'extraCalls', label: 'Extra calls' },
  { key: 'calendars', label: 'Calendar syncs' },
  { key: 'dispatch', label: 'Live dispatch board' },
  { key: 'invoicing', label: 'Automated invoicing' },
  { key: 'followUps', label: 'Reviews & follow-ups' },
  { key: 'enterprise', label: 'Multi-location & SSO' },
  { key: 'support', label: 'Support' },
];

/** Rendered muted rather than as a value, the way an empty cell reads. */
const NOT_INCLUDED = '—';

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For solo operators and small shops.',
    short: 'Solo shops',
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
    specs: {
      bestFor: 'Solo operators',
      calls: 'Pay per call',
      extraCalls: '$0.50 each',
      calendars: '1',
      dispatch: NOT_INCLUDED,
      invoicing: NOT_INCLUDED,
      followUps: NOT_INCLUDED,
      enterprise: NOT_INCLUDED,
      support: 'Email',
    },
  },
  {
    name: 'Pro',
    tagline: 'For growing teams that live on the phones.',
    short: 'Growing teams',
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
    specs: {
      bestFor: 'Growing teams',
      calls: '500 / month',
      extraCalls: '$0.40 each',
      calendars: 'Unlimited',
      dispatch: 'Included',
      invoicing: 'Included',
      followUps: 'Included',
      enterprise: NOT_INCLUDED,
      support: 'Priority',
    },
  },
  {
    name: 'Enterprise',
    tagline: 'For multi-location operators.',
    short: 'Multi-site',
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
    specs: {
      bestFor: 'Multi-location operators',
      calls: 'Custom volume',
      extraCalls: 'Custom rate',
      calendars: 'Unlimited',
      dispatch: 'Included',
      invoicing: 'Included',
      followUps: 'Included',
      enterprise: 'Included',
      support: 'Dedicated manager',
    },
  },
];

export function Pricing() {
  const [annual, setAnnual] = React.useState(true);
  const [selected, setSelected] = React.useState(
    PLANS.find((p) => p.featured)?.name ?? PLANS[0].name
  );
  const cardRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const tileRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const selectedPlan = PLANS.find((p) => p.name === selected) ?? PLANS[0];

  /**
   * Roving focus across the plan cards, as a radio group expects. Both the
   * mobile tiles and the desktop cards are wired to this; the off-breakpoint
   * group is `display:none`, which is not focusable, so calling focus on both
   * lands on whichever one the visitor can actually see.
   */
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
    tileRefs.current[PLANS[next].name]?.focus();
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

      {/*
        Phones get a tile row plus one plan's spec sheet, rather than three
        full cards stacked head to tail. Stacked cards force you to scroll a
        screen and a half between "Pro" and "Enterprise" and remember what
        the last one said; picking a tile swaps the table in place, so any
        two plans are one tap and zero scrolling apart.
      */}
      <div className="mt-10 lg:hidden">
        <div
          role="radiogroup"
          aria-label="Choose a plan"
          className="flex items-end gap-2"
        >
          {PLANS.map((plan, i) => {
            const isSelected = selected === plan.name;
            return (
              <button
                key={plan.name}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(plan.name)}
                onKeyDown={(e) => handleCardKeys(e, i)}
                ref={(el) => {
                  tileRefs.current[plan.name] = el;
                }}
                className="min-w-0 flex-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2"
              >
                {/* the badge caps the tile, so the row bottom-aligns */}
                <span
                  className={cn(
                    'block rounded-t-xl px-1 py-1 text-[0.65rem] font-semibold text-white',
                    plan.featured ? 'bg-brand-600' : 'invisible'
                  )}
                >
                  Most popular
                </span>
                <span
                  className={cn(
                    'relative flex h-[4.5rem] flex-col justify-center gap-0.5 rounded-b-xl border px-2.5 text-left transition-colors',
                    plan.featured ? '' : 'rounded-t-xl',
                    isSelected
                      ? 'border-transparent bg-brand-sheen text-white'
                      : 'border-slate-200 bg-white text-slate-900'
                  )}
                >
                  <span className="truncate text-sm font-semibold">
                    {plan.name}
                  </span>
                  <span
                    className={cn(
                      'truncate text-[0.7rem]',
                      isSelected ? 'text-white/80' : 'text-slate-500'
                    )}
                  >
                    {plan.short}
                  </span>
                  {isSelected ? (
                    <span
                      aria-hidden
                      className="absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-brand-600"
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={4} />
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {/* the chosen plan's column, one fact per row */}
        <dl className="mt-8">
          <div className="flex items-baseline justify-between gap-6 border-b border-slate-200 pb-3">
            <dt className="text-sm text-slate-500">
              {annual ? 'Annual price' : 'Monthly price'}
            </dt>
            <dd className="font-display text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
              {selectedPlan.monthly === null ? (
                'Custom'
              ) : (
                <>
                  ${annual ? selectedPlan.annual : selectedPlan.monthly}
                  <span className="text-sm font-medium text-slate-500">
                    /mo
                  </span>
                </>
              )}
            </dd>
          </div>
          {SPEC_ROWS.map((row) => {
            const value = selectedPlan.specs[row.key];
            const missing = value === NOT_INCLUDED;
            return (
              <div
                key={row.key}
                className="flex items-baseline justify-between gap-6 border-b border-slate-200 py-3"
              >
                <dt className="text-sm text-slate-500">{row.label}</dt>
                <dd
                  className={cn(
                    'text-right text-sm font-semibold',
                    missing ? 'text-slate-300' : 'text-slate-900'
                  )}
                >
                  {value}
                </dd>
              </div>
            );
          })}
        </dl>

        <Button variant="brand" size="lg" className="mt-6 w-full" asChild>
          <Link href="/demo">
            {selectedPlan.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <p className="mt-3 text-center text-xs text-slate-500">
          {selectedPlan.note ??
            (annual && selectedPlan.annual ? 'Billed annually' : '')}
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Choose a plan"
        className="mx-auto mt-12 hidden max-w-5xl items-start gap-6 lg:grid lg:grid-cols-3"
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
