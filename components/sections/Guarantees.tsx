import * as React from 'react';
import {
  CalendarCheck,
  CreditCard,
  PhoneForwarded,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { Marquee } from '@/components/primitives/Marquee';

/**
 * Award-badge styling, but every claim here is a promise Mango controls
 * rather than a third-party rating. No borrowed credibility: nothing on
 * this row depends on a review platform, and nothing needs a footnote.
 *
 * If Mango later earns real G2/Capterra badges, they belong in their own
 * row with links to the live profiles — not mixed in with these.
 */
type Guarantee = {
  eyebrow: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  /** Chevron shade. Single-hue brand scale, varied for rhythm. */
  chevron: string;
};

const GUARANTEES: Guarantee[] = [
  {
    eyebrow: 'Free',
    title: '14-Day Trial',
    detail: 'Full product, every feature',
    icon: CalendarCheck,
    chevron: 'bg-brand-600',
  },
  {
    eyebrow: 'Upfront',
    title: 'No Card Required',
    detail: 'Start without billing details',
    icon: CreditCard,
    chevron: 'bg-brand-500',
  },
  {
    eyebrow: 'Setup',
    title: 'Live in 24 Hours',
    detail: 'Guided onboarding included',
    icon: Timer,
    chevron: 'bg-brand-400',
  },
  {
    eyebrow: 'Yours',
    title: 'Keep Your Number',
    detail: 'Port in, or forward as-is',
    icon: PhoneForwarded,
    chevron: 'bg-brand-500',
  },
  {
    eyebrow: 'Always',
    title: 'Cancel Anytime',
    detail: 'No contract, no exit fee',
    icon: ShieldCheck,
    chevron: 'bg-brand-600',
  },
];

/** Pennant silhouette: square top, notched chevron bottom. */
const PENNANT = 'polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)';

export function Guarantees() {
  // Plain tone: Pricing above is `muted`, and two muted bands in a row
  // read as one long section.
  return (
    <Section spacing="sm">
      <Reveal>
        <p className="mx-auto max-w-2xl text-center text-base text-slate-600">
          No risk to try, nothing to sign, nothing to lose.{' '}
          <span className="font-semibold text-slate-900">
            Every promise below is ours to keep
          </span>{' '}
          — not a rating someone else gave us.
        </p>
      </Reveal>

      {/*
        A single continuous lane instead of a wrapping grid: five pennants
        stacked into three ragged rows on a phone, which buried the last two.
        The Marquee duplicates the set so the first pennant re-enters behind
        the last one; hovering pauses it.
      */}
      <Reveal delay={0.1}>
        <Marquee
          className="mt-10 py-2"
          duration="34s"
          gapClassName="gap-4 pr-4 sm:gap-5 sm:pr-5"
        >
          {/* Doubled so the track is wider than a desktop container; a track
              narrower than the lane would leave a visible gap each loop. */}
          {[...GUARANTEES, ...GUARANTEES].map((g, i) => (
            /* Outer clip paints the chevron edge; the inset inner clip
               leaves it showing as a border on all sides. */
            <div
              key={`${g.title}-${i}`}
              style={{ clipPath: PENNANT }}
              className={`${g.chevron} w-[9.5rem] shrink-0 pb-px shadow-card transition-transform duration-300 hover:-translate-y-1 sm:w-[10.5rem]`}
            >
              <div
                style={{ clipPath: PENNANT }}
                className="m-px bg-white px-4 pb-9 pt-5 text-center"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                  <g.icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.25} />
                </span>
                <div className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {g.eyebrow}
                </div>
                <div className="mt-1 font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-slate-900">
                  {g.title}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-slate-500">
                  {g.detail}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </Reveal>
    </Section>
  );
}
