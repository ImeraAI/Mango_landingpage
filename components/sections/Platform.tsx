'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  CalendarClock,
  Route,
  ReceiptText,
  MessagesSquare,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { CallPlayer } from '@/components/mockups/CallPlayer';

function Tile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function IconChip({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
      <Icon className="h-5 w-5" />
    </span>
  );
}

export function Platform() {
  return (
    <Section id="platform" tone="muted">
      <SectionHeading
        eyebrow="The platform"
        title="One AI workforce for the entire front office."
        description="This is not a chatbot bolted onto your phone line. It is a complete operations layer that answers, books, dispatches, bills, and follows up, purpose-built for the trades."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {/* Voice AI spotlight */}
        <Tile className="lg:col-span-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md">
              <IconChip icon={PhoneCall} />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-slate-900">
                Voice AI that sounds unmistakably human
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">
                Conversational models that pause, breathe, and handle
                interruptions naturally. They are trained on your services,
                pricing, and emergency protocols so every answer is on-brand.
              </p>
            </div>
            <CallPlayer />
          </div>
        </Tile>

        {/* Uptime stat */}
        <Tile className="lg:col-span-2">
          <IconChip icon={ShieldCheck} />
          <div className="mt-5">
            <div className="font-display text-4xl font-semibold tracking-tight text-slate-900">
              0
            </div>
            <div className="mt-1 text-sm font-medium text-slate-900">
              Missed calls
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Every call answered on the first ring. Nights, weekends, and
              holidays included.
            </p>
          </div>
        </Tile>

        {/* Scheduling */}
        <Tile className="lg:col-span-2">
          <IconChip icon={CalendarClock} />
          <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-slate-900">
            Smart scheduling
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Reads live availability and books the right slot, with emergency
            jobs triaged to the front of the line.
          </p>
        </Tile>

        {/* Dispatch */}
        <Tile className="lg:col-span-2">
          <IconChip icon={Route} />
          <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-slate-900">
            Instant dispatch
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Matches each job to the best tech by skill, location, and rating,
            then sends the route automatically.
          </p>
        </Tile>

        {/* Invoicing + follow-up combined */}
        <Tile className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <IconChip icon={ReceiptText} />
            <IconChip icon={MessagesSquare} />
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-slate-900">
            Invoices & follow-ups
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Drafts itemized invoices from the transcript and runs review
            requests and rebooking reminders on autopilot.
          </p>
        </Tile>
      </div>

      <Reveal className="mt-6" delay={0.1}>
        <p className="text-center text-sm text-slate-500">
          Works alongside the tools you already run, like ServiceTitan,
          Housecall Pro, Jobber, and your calendar.
        </p>
      </Reveal>
    </Section>
  );
}
