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

/**
 * One set of plain-spoken words for every breakpoint. This used to carry a
 * second, more polished desktop voice ("The relationship keeps working"),
 * but figurative copy makes a reader work out what the product actually did.
 * Short literal sentences land the same on a phone and a 27" monitor, and
 * there is only one place to edit them.
 */
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
    label: 'Answers the phone',
    title: 'Someone picks up on the first ring.',
    description:
      'A pipe bursts at ten at night. Mango answers, calms the customer down, and gets to work.',
    bullets: ['Sounds like a real person', 'Answers day and night', 'Never goes to voicemail'],
    icon: Phone,
    Mockup: CallCard,
  },
  {
    time: '9:47 PM',
    label: 'Books the job',
    title: 'The job is booked before they hang up.',
    description:
      'It takes the address, works out how bad it is, checks your calendar, and takes the soonest slot.',
    bullets: ['Asks the right questions', 'Checks your real calendar', 'Emergencies go first'],
    icon: CalendarCheck,
    Mockup: ScheduleCard,
  },
  {
    time: '9:48 PM',
    label: 'Sends a tech',
    title: 'The right tech is already on the way.',
    description:
      'Mango picks whoever is closest and best for the job, then sends them the details and directions.',
    bullets: ['Closest, best-suited tech', 'Directions and arrival time', 'They are told automatically'],
    icon: Navigation,
    Mockup: DispatchBoard,
  },
  {
    time: 'Next day',
    label: 'Checks back in',
    title: 'They hear from you again the next day.',
    description:
      'Mango asks how it went, asks for a review, and reminds them to book the next service.',
    bullets: ['Asks for a review', 'Books the next visit', 'Keeps their details up to date'],
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
          title="What happens when a customer calls you."
          description="One late-night emergency, from the first ring to a five-star review. You don’t have to do any of it."
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
                          <span className="text-xs uppercase tracking-wide lg:hidden">
                            Step {i + 1} of {STAGES.length} · {stage.label}
                          </span>
                          <span className="hidden text-sm uppercase tracking-wide lg:inline">
                            {stage.label}
                          </span>
                        </div>
                        <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl lg:mt-3 lg:text-[1.75rem]">
                          {stage.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-[0.95rem] lg:mt-3 lg:text-[1.05rem]">
                          {stage.description}
                        </p>

                        {/* compact chips below lg, roomy checklist above */}
                        <ul className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
                          {stage.bullets.map((b) => (
                            <li
                              key={b}
                              className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-[0.7rem] text-slate-700"
                            >
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                <Check className="h-2.5 w-2.5" />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>

                        <ul className="mt-5 hidden space-y-2.5 lg:block">
                          {stage.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-3 text-sm text-slate-700"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                <Check className="h-3 w-3" />
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
