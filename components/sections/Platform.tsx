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
        'group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-card sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function IconChip({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 sm:h-11 sm:w-11 sm:rounded-2xl">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    </span>
  );
}

export function Platform() {
  return (
    <Section id="platform" tone="muted">
      <SectionHeading
        eyebrow="The platform"
        title="One AI workforce for the entire front office."
        description="Not a chatbot bolted onto your phone line. A complete operations layer that answers, books, dispatches, bills, and follows up, purpose-built for the trades."
      />

      {/*
        Mobile stacked every tile full-width with its own paragraph, which read
        as one long block of prose. Below sm the three supporting tiles drop to
        a two-up icon+label grid and their copy is deferred to wider screens.
      */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-6">
        {/* Voice AI spotlight */}
        <Tile className="col-span-2 lg:col-span-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="max-w-md">
              <IconChip icon={PhoneCall} />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-xl">
                Voice AI that sounds unmistakably human
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                Conversational models that pause, breathe, and handle
                interruptions naturally.
                <span className="hidden sm:inline">
                  {' '}
                  They are trained on your services, pricing, and emergency
                  protocols so every answer is on-brand.
                </span>
              </p>
            </div>
            <CallPlayer />
          </div>
        </Tile>

        {/* Uptime stat */}
        <Tile className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-4 sm:block">
            <IconChip icon={ShieldCheck} />
            <div className="sm:mt-5">
              <div className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                0
              </div>
              <div className="mt-0.5 text-sm font-medium text-slate-900 sm:mt-1">
                Missed calls
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:mt-2">
                Every call answered on the first ring.
                <span className="hidden sm:inline">
                  {' '}
                  Nights, weekends, and holidays included.
                </span>
              </p>
            </div>
          </div>
        </Tile>

        {/* Scheduling */}
        <Tile className="col-span-1 lg:col-span-2">
          <IconChip icon={CalendarClock} />
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            Smart scheduling
          </h3>
          <p className="mt-2 hidden text-sm leading-relaxed text-slate-600 sm:block">
            Reads live availability and books the right slot, with emergency
            jobs triaged to the front of the line.
          </p>
        </Tile>

        {/* Dispatch */}
        <Tile className="col-span-1 lg:col-span-2">
          <IconChip icon={Route} />
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            Instant dispatch
          </h3>
          <p className="mt-2 hidden text-sm leading-relaxed text-slate-600 sm:block">
            Matches each job to the best tech by skill, location, and rating,
            then sends the route automatically.
          </p>
        </Tile>

        {/* Invoicing + follow-up combined */}
        <Tile className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <IconChip icon={ReceiptText} />
            <IconChip icon={MessagesSquare} />
          </div>
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            Invoices &amp; follow-ups
          </h3>
          <p className="mt-2 hidden text-sm leading-relaxed text-slate-600 sm:block">
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
