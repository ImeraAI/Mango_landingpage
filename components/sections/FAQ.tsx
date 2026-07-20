import * as React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'How human-like does the AI sound?',
    a: 'Mango’s voice models are engineered to sound indistinguishable from a person. It pauses, breathes, and reacts naturally to interruptions. No robotic scripts, no awkward hold music. Most callers never realize they’re speaking with AI.',
  },
  {
    q: 'Does it integrate with my existing software?',
    a: 'Yes. Mango connects with the field service tools you already run, like ServiceTitan, Housecall Pro, and Jobber, plus Google and Outlook calendars, QuickBooks, and your messaging stack. Bookings and invoices sync automatically.',
  },
  {
    q: 'What happens if the AI can’t answer a question?',
    a: 'If a call gets complex or a customer is upset, Mango smoothly hands off to a designated human fallback number, or takes a detailed message for your team to review. The customer is never left stranded.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Most teams are live within a day. We train Mango on your services, pricing, service area, and emergency protocols, then connect your calendar and phone number. No new hardware, no disruption to your current line.',
  },
  {
    q: 'Can it tell an emergency from routine work?',
    a: 'Absolutely. Triage is core to how Mango works. It recognizes urgent situations like burst pipes, no-heat calls, or electrical hazards and prioritizes dispatch, while quoting and scheduling routine jobs into open slots.',
  },
  {
    q: 'Is my customer data secure?',
    a: 'Your data is encrypted in transit and at rest, access is tightly controlled, and you always own your records. Enterprise plans add SSO, audit logging, and additional compliance controls.',
  },
];

export function FAQ() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <span className="eyebrow">FAQ</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Everything you need to know about putting Mango on the phones.
              Still unsure? Talk to a specialist.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-xs">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Still have questions?
                  </div>
                  <div className="text-sm text-slate-500">
                    We’ll walk you through it.
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/demo">Talk to a specialist</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
