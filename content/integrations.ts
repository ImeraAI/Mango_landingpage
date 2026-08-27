/**
 * What Mango connects to, and what it does not connect to yet.
 *
 * The split between LIVE and COMING_SOON is load-bearing and must stay
 * honest: the homepage FAQ used to answer "does it integrate with my
 * software?" with "yes, like ServiceTitan, Housecall Pro and Jobber" while
 * the section directly above it labelled those same three "coming soon".
 * A reader who notices that contradiction has learned something worse about
 * the site than the missing integration would have told them. One list, read
 * by the section, the /integrations page and the FAQ answer alike.
 *
 * `href` points at the vendor's own site — the outbound citations an audit
 * found entirely absent. Every URL here was checked to resolve before it was
 * added; keep that habit when adding more.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Wrench,
  House,
  Briefcase,
  CalendarDays,
  Calculator,
  CreditCard,
  Workflow,
  MessageCircle,
  MessageSquare,
  Mail,
  CalendarPlus,
  PhoneForwarded,
  FileText,
} from 'lucide-react';
import type { Accent } from '@/components/primitives/Wordmark';

export type LiveIntegration = {
  name: string;
  icon: LucideIcon;
  /** One short line for the homepage tile. */
  detail: string;
  /** A fuller explanation, used on the /integrations page. */
  description: string;
};

export type PlannedIntegration = {
  name: string;
  icon: LucideIcon;
  accent: Accent;
  /** The vendor's own site. Opens in a new tab via the shared link styles. */
  href: string;
  /** What the connection will do once it ships. */
  description: string;
};

/** Shipping today. Kept to one short line each on the homepage. */
export const LIVE: LiveIntegration[] = [
  {
    name: 'Your phone number',
    icon: PhoneForwarded,
    detail: 'Keep the number on your truck',
    description:
      'Forward your existing line to Mango and keep the number that is on your vans, your invoices and every listing you have ever paid for. No porting, no new hardware, and you can point the forwarding back at yourself whenever you want.',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    detail: 'Replies, quotes and books',
    description:
      'Mango answers on WhatsApp the way it answers the phone: it qualifies the job, quotes from your price list, and puts the booking on the calendar without a human touching the thread.',
  },
  {
    name: 'Text messages',
    icon: MessageSquare,
    detail: 'Texts back in seconds',
    description:
      'Missed-call text-back, appointment confirmations, and on-the-way messages. A caller who hangs up gets a text before they have finished dialling your competitor.',
  },
  {
    name: 'Calendar invites',
    icon: CalendarPlus,
    detail: 'Every job, on your calendar',
    description:
      'Every booked job arrives as a standard calendar invite, so it lands in whatever calendar your team already runs — Google, Outlook, Apple — with the address, the fault and the caller in the body.',
  },
  {
    name: 'Email summaries',
    icon: Mail,
    detail: 'A recap of every call',
    description:
      'A written recap of every call: who rang, what they needed, how it was triaged and what was booked. Useful as a paper trail, and as the thing you skim on a Monday morning.',
  },
  {
    name: 'Job sheets',
    icon: FileText,
    detail: 'Job details, written up',
    description:
      'The intake written up as a job sheet a technician can actually work from, rather than three words on a sticky note.',
  },
];

/**
 * Not built yet, and labelled as such rather than implied. Moving one of
 * these into LIVE is the only way it should ever appear as available.
 */
export const COMING_SOON: PlannedIntegration[] = [
  {
    name: 'ServiceTitan',
    icon: Wrench,
    accent: 'blue',
    href: 'https://www.servicetitan.com/',
    description:
      'Push booked jobs and captured customer details straight into ServiceTitan, so dispatch works from one board.',
  },
  {
    name: 'Housecall Pro',
    icon: House,
    accent: 'emerald',
    href: 'https://www.housecallpro.com/',
    description:
      'Create the job and the customer record in Housecall Pro at the moment the call is booked.',
  },
  {
    name: 'Jobber',
    icon: Briefcase,
    accent: 'amber',
    href: 'https://www.jobber.com/',
    description:
      'Sync bookings, client records and job details into Jobber without re-keying anything.',
  },
  {
    name: 'Google Calendar',
    icon: CalendarDays,
    accent: 'sky',
    href: 'https://support.google.com/calendar/answer/37118',
    description:
      'Direct two-way sync, so Mango books into real availability instead of sending an invite and hoping.',
  },
  {
    name: 'QuickBooks',
    icon: Calculator,
    accent: 'emerald',
    href: 'https://quickbooks.intuit.com/',
    description:
      'Turn a completed job into a drafted invoice in QuickBooks, ready for you to review and send.',
  },
  {
    name: 'Stripe',
    icon: CreditCard,
    accent: 'violet',
    href: 'https://stripe.com/',
    description:
      'Take deposits and payments on the invoices Mango drafts, without a separate checkout step.',
  },
  {
    name: 'Zapier',
    icon: Workflow,
    accent: 'amber',
    href: 'https://zapier.com/',
    description:
      'A catch-all for everything not on this list: fire a Zap on a booked job, a missed call, or a completed follow-up.',
  },
];
