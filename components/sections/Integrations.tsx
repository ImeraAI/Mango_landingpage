import * as React from 'react';
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
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Marquee } from '@/components/primitives/Marquee';
import { Wordmark, type Accent } from '@/components/primitives/Wordmark';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * Shipping today. Kept to one short line each: this section is a reassurance
 * on the way to pricing, not a feature tour, so it should scan in seconds.
 */
const LIVE: { name: string; icon: LucideIcon; detail: string }[] = [
  {
    name: 'Your phone number',
    icon: PhoneForwarded,
    detail: 'Keep the number on your truck',
  },
  { name: 'WhatsApp', icon: MessageCircle, detail: 'Replies, quotes and books' },
  { name: 'Text messages', icon: MessageSquare, detail: 'Texts back in seconds' },
  { name: 'Calendar invites', icon: CalendarPlus, detail: 'Every job, on your calendar' },
  { name: 'Email summaries', icon: Mail, detail: 'A recap of every call' },
  { name: 'Job sheets', icon: FileText, detail: 'Job details, written up' },
];

/** Not built yet. Labelled as such rather than implied. */
const COMING_SOON: { name: string; icon: LucideIcon; accent: Accent }[] = [
  { name: 'ServiceTitan', icon: Wrench, accent: 'blue' },
  { name: 'Housecall Pro', icon: House, accent: 'emerald' },
  { name: 'Jobber', icon: Briefcase, accent: 'amber' },
  { name: 'Google Calendar', icon: CalendarDays, accent: 'sky' },
  { name: 'QuickBooks', icon: Calculator, accent: 'emerald' },
  { name: 'Stripe', icon: CreditCard, accent: 'violet' },
  { name: 'Zapier', icon: Workflow, accent: 'amber' },
];

export function Integrations() {
  return (
    <Section id="integrations" tone="muted" spacing="sm">
      <SectionHeading
        eyebrow="How it fits in"
        title="Works with the phone you already have."
        description="Nothing to rip out and nothing to learn. Point your number at Mango and it starts answering."
        titleClassName="text-3xl sm:text-4xl md:text-4xl"
      />

      <Reveal className="mt-10" delay={0.1}>
        {/*
          One group label instead of a "Live" badge per card. Six repeated
          badges was noise, and a bare dot would not have said what it meant.
        */}
        <p className="mb-4 text-center text-sm font-semibold text-slate-700">
          Working today
        </p>
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE.map(({ name, icon: Icon, detail }) => (
            <li
              key={name}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-slate-900">
                  {name}
                </span>
                <span className="block truncate text-sm text-slate-500">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-10" delay={0.15}>
        <p className="text-center text-sm text-slate-500">
          <span className="font-semibold text-slate-700">Coming soon:</span>{' '}
          direct sync with the software most shops already run.
        </p>
        <div className="mt-5 scale-90 opacity-60 grayscale">
          <Marquee duration="52s">
            {COMING_SOON.map((item) => (
              <Wordmark key={item.name} {...item} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </Section>
  );
}
