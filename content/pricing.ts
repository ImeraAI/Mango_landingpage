/**
 * Plan facts, in one place.
 *
 * These numbers are quoted in three separate surfaces — the pricing table, the
 * ROI calculator, and the Offer nodes in JSON-LD. When they lived only inside
 * the pricing component the calculator drifted to its own hardcoded rate, and
 * an audit caught the site quoting two different Starter prices. Everything
 * now reads from here, so a price change is a one-line change.
 *
 * Free of any client/server-only import so both the "use client" pricing table
 * and the server-rendered schema builder can use it.
 */

export type SpecKey =
  | 'bestFor'
  | 'calls'
  | 'extraCalls'
  | 'calendars'
  | 'dispatch'
  | 'invoicing'
  | 'followUps'
  | 'enterprise'
  | 'support';

export type Plan = {
  name: string;
  tagline: string;
  /** Two or three words for the mobile tile, under the plan name. */
  short: string;
  /** Month-to-month price in USD. `null` means "talk to sales". */
  monthly: number | null;
  /** Per-month price when billed annually. `null` means "talk to sales". */
  annual: number | null;
  /** Metered usage on top of the base fee, when the plan has any. */
  perCall?: { included: number; rate: number };
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

export const SPEC_ROWS: { key: SpecKey; label: string }[] = [
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
export const NOT_INCLUDED = '—';

export const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For solo operators and small shops.',
    short: 'Solo shops',
    monthly: 99,
    annual: 79,
    perCall: { included: 0, rate: 0.5 },
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
    perCall: { included: 500, rate: 0.4 },
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

/** The plan the ROI calculator models. Named rather than indexed so the
 *  calculator keeps modelling Starter if the display order ever changes. */
export const ROI_PLAN =
  PLANS.find((p) => p.name === 'Starter' && p.monthly !== null) ?? PLANS[0];
