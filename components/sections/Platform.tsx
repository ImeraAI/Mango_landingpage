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
        Every tile shares one anatomy — icon chip, headline, one payoff line —
        so the grid reads as a set rather than four unrelated layouts. The
        supporting four are one-span each: a clean 2x2 on phones, a single row
        of four on desktop. Nothing is left orphaned across a half row.
      */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
        {/* Voice AI spotlight */}
        <Tile className="col-span-2 lg:col-span-3">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="max-w-md">
              <IconChip icon={PhoneCall} />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-xl">
                Your callers will never know it isn’t a person
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                It pauses, breathes, and handles interruptions like a top
                dispatcher on their best day.
                <span className="hidden sm:inline">
                  {' '}
                  Trained on your services, your pricing, and your emergency
                  protocols, so every answer is on-brand.
                </span>
              </p>
            </div>
            <CallPlayer />
          </div>
        </Tile>

        {/* Headline stat */}
        <Tile className="col-span-2 lg:col-span-1">
          <IconChip icon={ShieldCheck} />
          <div className="mt-4 flex items-baseline gap-2 sm:mt-5">
            <span className="font-display text-4xl font-semibold leading-none tracking-tight text-brand-600 sm:text-5xl">
              0
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
              missed calls
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Every ring answered — nights, weekends and holidays included.
          </p>
        </Tile>

        {/* Scheduling */}
        <Tile className="col-span-1">
          <IconChip icon={CalendarClock} />
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            Booked on the spot
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
            Reads your live calendar and grabs the right slot.
            <span className="hidden sm:inline">
              {' '}
              Emergencies jump the queue automatically.
            </span>
          </p>
        </Tile>

        {/* Dispatch */}
        <Tile className="col-span-1">
          <IconChip icon={Route} />
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            Right tech, right away
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
            Matched by skill and location, routed in seconds.
            <span className="hidden sm:inline">
              {' '}
              They get the job, the address, and the ETA.
            </span>
          </p>
        </Tile>

        {/* Invoicing */}
        <Tile className="col-span-1">
          <IconChip icon={ReceiptText} />
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            Paid without chasing
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
            Itemized invoices drafted straight from the job.
            <span className="hidden sm:inline">
              {' '}
              Sent before the van is off the driveway.
            </span>
          </p>
        </Tile>

        {/* Follow-ups */}
        <Tile className="col-span-1">
          <IconChip icon={MessagesSquare} />
          <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 sm:mt-5 sm:text-lg">
            One job becomes the next
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
            Review requests and rebooking reminders on autopilot.
            <span className="hidden sm:inline">
              {' '}
              Next season’s calendar fills itself.
            </span>
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
