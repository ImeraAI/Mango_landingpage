'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Phone,
  CalendarCheck,
  Navigation,
  MessageSquare,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { CallCard } from '@/components/mockups/CallCard';
import { ScheduleCard } from '@/components/mockups/ScheduleCard';
import { DispatchBoard } from '@/components/mockups/DispatchBoard';
import { FollowUpCard } from '@/components/mockups/FollowUpCard';

type Stage = {
  time: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  Mockup: React.ComponentType<{ className?: string }>;
};

const STAGES: Stage[] = [
  {
    time: '9:47 PM',
    label: 'Reception',
    title: 'The call gets answered on the first ring.',
    description:
      'A pipe bursts after hours. Instead of voicemail, Mango picks up in a warm, natural voice, calms the customer, and starts working the problem.',
    bullets: ['Human-like conversation', '24/7/365 availability', 'Speaks in your company’s voice'],
    icon: Phone,
    Mockup: CallCard,
  },
  {
    time: '9:47 PM',
    label: 'Qualify & book',
    title: 'The lead is qualified and scheduled.',
    description:
      'Mango captures the address, gauges urgency, confirms it’s an emergency, checks live availability, and locks in the earliest slot. No back-and-forth.',
    bullets: ['Structured, trade-aware intake', 'Real-time calendar availability', 'Automatic emergency triage'],
    icon: CalendarCheck,
    Mockup: ScheduleCard,
  },
  {
    time: '9:48 PM',
    label: 'Dispatch',
    title: 'The right technician is on the way.',
    description:
      'It matches the job to the best available tech by skill, location, and rating, then notifies them instantly with the full context and a live route.',
    bullets: ['Skill & location-based routing', 'Live ETA and map', 'Technician auto-notified'],
    icon: Navigation,
    Mockup: DispatchBoard,
  },
  {
    time: 'Next day',
    label: 'Follow-up',
    title: 'The relationship keeps working.',
    description:
      'Mango checks in, earns a five-star review, and schedules the next maintenance reminder, quietly filling next season’s calendar while you sleep.',
    bullets: ['Automated review requests', 'Maintenance rebooking reminders', 'Customer record kept in sync'],
    icon: MessageSquare,
    Mockup: FollowUpCard,
  },
];

export function CallFlow() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index
            );
            setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ActiveMockup = STAGES[active].Mockup;

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Follow the call"
          title="One phone call, handled end to end."
          description="Watch a single after-hours emergency flow through Mango, from the first ring to a five-star review. Nobody on your team has to lift a finger."
        />

        <div className="mt-10 grid min-w-0 gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative rounded-[1.75rem] border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lifted">
                {/* progress dots */}
                <div className="mb-5 flex items-center justify-center gap-2">
                  {STAGES.map((s, i) => (
                    <span
                      key={s.label}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-500',
                        i === active
                          ? 'w-8 bg-brand-600'
                          : 'w-1.5 bg-slate-200'
                      )}
                    />
                  ))}
                </div>
                <div className="relative min-h-[440px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ActiveMockup />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/*
            Scrolling steps. `min-w-0` matters: a grid item defaults to
            min-width:auto, so the widest mockup's min-content was stretching
            the track past the viewport on small phones and pushing every card
            off-screen to the right.
          */}
          <div className="relative min-w-0">
            {/* vertical rail */}
            <div className="absolute left-[19px] top-3 hidden h-[calc(100%-2rem)] w-px bg-slate-200 lg:block">
              <motion.div
                className="w-px bg-brand-500"
                animate={{
                  height: `${(active / (STAGES.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/*
              Below lg the stages are a sticky stack: each card parks under the
              header and the next one slides up over it, so only one step is on
              screen at a time. Desktop keeps the plain flow next to the sticky
              visual.
            */}
            <div className="space-y-0 lg:space-y-24">
              {STAGES.map((stage, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={stage.label}
                    data-index={i}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    style={{ zIndex: i + 1 }}
                    className="relative min-w-0 pb-5 max-lg:sticky max-lg:top-16 lg:pb-0 lg:pl-16"
                  >
                    {/* node */}
                    <div
                      className={cn(
                        'absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-500 lg:flex',
                        isActive
                          ? 'border-brand-500 text-brand-600 shadow-glow'
                          : 'border-slate-200 text-slate-400'
                      )}
                    >
                      <stage.icon className="h-4 w-4" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        'transition-opacity duration-500',
                        isActive ? 'opacity-100' : 'lg:opacity-45'
                      )}
                    >
                      {/*
                        Below lg each stage is one self-contained, opaque card
                        so the stack reads as one step replacing the previous.
                      */}
                      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-lifted sm:p-5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                        <div className="flex items-center gap-2.5 text-sm font-semibold text-brand-700">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 lg:hidden">
                            <stage.icon className="h-4 w-4" />
                          </span>
                          <span className="tabular-nums">{stage.time}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs uppercase tracking-wide lg:text-sm">
                            {stage.label}
                          </span>
                        </div>
                        <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl lg:mt-3 lg:text-[1.75rem]">
                          {stage.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-[0.95rem] lg:mt-3 lg:text-[1.05rem]">
                          {stage.description}
                        </p>

                        {/* chips below lg, checklist on desktop */}
                        <ul className="mt-3 flex flex-wrap gap-1.5 lg:mt-5 lg:block lg:space-y-2.5">
                          {stage.bullets.map((b) => (
                            <li
                              key={b}
                              className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-[0.7rem] text-slate-700 lg:flex lg:gap-3 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:text-sm"
                            >
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 lg:h-5 lg:w-5">
                                <Check className="h-2.5 w-2.5 lg:h-3 lg:w-3" />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>

                        {/* inline mockup below lg */}
                        <div className="mt-4 min-w-0 rounded-2xl bg-slate-50 p-2 sm:mt-5 lg:hidden">
                          <stage.Mockup />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
