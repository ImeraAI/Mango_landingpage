'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Droplets,
  Fan,
  Zap,
  Sparkles,
  Home,
  WashingMachine,
  Bug,
  Check,
  PhoneCall,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type Industry = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  scenarios: string[];
  calls: string[];
};

const INDUSTRIES: Industry[] = [
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: Droplets,
    headline: 'Fluent in leaks, water heaters, and 2 a.m. emergencies.',
    description:
      'Mango understands leak severity, recognizes water-heater models, and follows your emergency dispatch protocols so the flooding calls never wait.',
    scenarios: [
      'Burst pipes & active flooding',
      'Water heater failure & replacement',
      'Sewer backups & drain clogs',
      'Fixture & repipe quotes',
    ],
    calls: [
      'My water heater is leaking everywhere',
      'The upstairs toilet won’t stop running',
      'No hot water since this morning',
    ],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    icon: Fan,
    headline: 'Built for no-heat nights and peak-season demand.',
    description:
      'From no-cool emergencies to seasonal maintenance and part inquiries, Mango triages by urgency and keeps your board full through the busy months.',
    scenarios: [
      'No-heat / no-cool emergencies',
      'Seasonal tune-ups & memberships',
      'Thermostat & airflow issues',
      'Refrigerant & parts questions',
    ],
    calls: [
      'The AC is blowing warm air',
      'Furnace won’t turn on and it’s freezing',
      'I’d like to book my fall tune-up',
    ],
  },
  {
    id: 'electrical',
    label: 'Electrical & Fire',
    icon: Zap,
    headline: 'Qualifies hazards, upgrades, and inspections with real precision.',
    description:
      'Mango triages panel upgrades, short circuits, and safety hazards, and keeps alarm and sprinkler compliance on the calendar. It flags the true emergencies and books the routine work.',
    scenarios: [
      'Power outages & sparking outlets',
      'Panel & service upgrades',
      'Alarm & detector inspections',
      'Sprinkler & extinguisher compliance',
    ],
    calls: [
      'There’s a burning smell from an outlet',
      'Half my house lost power suddenly',
      'Our sprinkler cert expires next month',
    ],
  },
  {
    id: 'exterior',
    label: 'Cleaning & Lawn',
    icon: Sparkles,
    headline: 'Quotes the property and books the recurring slot.',
    description:
      'Whether it is a move-out deep clean or a season of mowing, Mango captures the home size and address, quotes from your rate card, and fills the route before the truck rolls.',
    scenarios: [
      'Move-in & move-out deep cleans',
      'Weekly & biweekly recurring plans',
      'Mowing & seasonal contracts',
      'Spring / fall cleanup quotes',
    ],
    calls: [
      'How much for a 3-bed move-out clean?',
      'What would you charge to mow weekly?',
      'Can we switch to every other week?',
    ],
  },
  {
    id: 'roofing',
    label: 'Roofing',
    icon: Home,
    headline: 'Catches storm leads the moment the weather turns.',
    description:
      'Mango logs the leak location, roof age, and whether insurance is involved, then gets an inspection on the calendar while the caller is still worried.',
    scenarios: [
      'Active leaks & emergency tarping',
      'Storm & hail damage inspections',
      'Full replacement estimates',
      'Insurance claim coordination',
    ],
    calls: [
      'Water is coming through the ceiling',
      'Hail hit us last night, can you look?',
      'How long does a full reroof take?',
    ],
  },
  {
    id: 'appliance',
    label: 'Appliance & Garage',
    icon: WashingMachine,
    headline: 'Gets the make, model, and symptom before you drive out.',
    description:
      'Mango captures brand, model number, and what the machine or door is actually doing, and knows a snapped spring is a same-day call. Your tech arrives with the right part instead of making a second trip.',
    scenarios: [
      'Fridge, washer, dryer & oven faults',
      'Broken springs, cables & openers',
      'Make, model & serial capture',
      'Warranty & service plan checks',
    ],
    calls: [
      'My fridge stopped getting cold',
      'My car is stuck inside the garage',
      'Is my Whirlpool still under warranty?',
    ],
  },
  {
    id: 'pest',
    label: 'Pest Control',
    icon: Bug,
    headline: 'Identifies the pest and books the treatment window.',
    description:
      'Mango asks what was seen and where, flags the urgent infestations, and schedules treatment plus the follow-up visit in one call.',
    scenarios: [
      'Rodent, roach & ant infestations',
      'Termite inspections & letters',
      'Quarterly treatment plans',
      'Bed bug & wasp emergencies',
    ],
    calls: [
      'There are mice in the kitchen',
      'I need a termite letter for closing',
      'Wasp nest right by the front door',
    ],
  },
];

export function Industries() {
  const [active, setActive] = React.useState('plumbing');
  const current = INDUSTRIES.find((i) => i.id === active)!;

  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Built for your trade"
        title="Custom-trained on the way your trade actually works."
        description="Not a generic assistant. Mango speaks the terminology, follows the workflows, and knows the emergency protocols specific to your industry."
      />

      {/*
        Standalone chips that wrap, rather than one pill bar. A single
        rounded container wrapping ragged rows reads as broken; individual
        bordered chips read as intentional. max-w keeps the rows balanced
        instead of one long row plus an orphan.
      */}
      <Tabs value={active} onValueChange={setActive}>
        {/* Seven merged trades fit one row above ~56rem; below that they
            wrap to two centred rows rather than scrolling off. */}
        <TabsList className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5 rounded-none border-0 border-transparent bg-transparent p-0 shadow-none backdrop-blur-none">
          {INDUSTRIES.map((ind) => (
            <TabsTrigger
              key={ind.id}
              value={ind.id}
              className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-xs transition-colors hover:border-brand-200 hover:text-slate-900 data-[state=active]:border-brand-600 data-[state=active]:bg-brand-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              {ind.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/*
          The panel lives inside <Tabs> so Radix mounts it with the id the
          active trigger's aria-controls points at. Previously the triggers
          referenced ids that never existed.
        */}
        <TabsContent value={active} className="mt-12">
          <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-10 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                <current.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {current.headline}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {current.description}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.scenarios.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 text-sm font-medium text-slate-700"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-600 shadow-xs">
                  <PhoneCall className="h-4 w-4" />
                </span>
                Calls Mango handles tonight
              </div>
              <div className="mt-5 space-y-3">
                {current.calls.map((call, i) => (
                  <motion.div
                    key={call}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-700 shadow-xs"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="italic">“{call}”</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white">
                <span>All answered, booked & dispatched</span>
                <Check className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </Section>
  );
}
