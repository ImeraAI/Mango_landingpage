import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Marquee } from '@/components/primitives/Marquee';
import { Wordmark } from '@/components/primitives/Wordmark';
import { Reveal } from '@/components/primitives/Reveal';
// One list, shared with /integrations and with the FAQ answer, so "coming
// soon" can never be contradicted by a "yes we integrate" elsewhere.
import { LIVE, COMING_SOON } from '@/content/integrations';

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
            {/*
              Linked to the vendors themselves rather than rendered as inert
              names. The homepage carried no outbound citations at all, and
              the software an operator already runs is the most natural thing
              on the page to point at.
            */}
            {COMING_SOON.map(({ name, icon, accent, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} (opens in a new tab)`}
                className="transition-opacity hover:opacity-100"
              >
                <Wordmark name={name} icon={icon} accent={accent} />
              </a>
            ))}
          </Marquee>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            See every integration, live and planned
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
