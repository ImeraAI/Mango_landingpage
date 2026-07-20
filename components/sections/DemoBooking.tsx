'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  Gauge,
  CalendarCheck,
  Check,
  ArrowRight,
  Star,
  ShieldCheck,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Waveform } from '@/components/mockups/Waveform';

const EXPECT = [
  {
    icon: PhoneCall,
    title: 'Hear Mango answer a live call',
    description: 'A real intake for your trade, booked, dispatched, and invoiced in front of you.',
  },
  {
    icon: Gauge,
    title: 'Get a custom ROI estimate',
    description: 'We’ll model the savings against your current front-desk or answering-service costs.',
  },
  {
    icon: CalendarCheck,
    title: 'A 20-minute walkthrough',
    description: 'No slides, no pressure. See exactly how it fits your operation before you decide.',
  },
];

const TRADES = ['Plumbing', 'HVAC', 'Electrical', 'Fire & Safety', 'Other'];
const TEAM_SIZES = ['1–5', '6–15', '16–50', '51–200', '200+'];
const CALL_VOLUMES = [
  'Under 100 / mo',
  '100–500 / mo',
  '500–1,000 / mo',
  '1,000+ / mo',
];

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  trade: string;
  teamSize: string;
  volume: string;
  goal: string;
};

const EMPTY: Fields = {
  name: '',
  email: '',
  company: '',
  phone: '',
  trade: '',
  teamSize: '',
  volume: '',
  goal: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoBooking() {
  const [fields, setFields] = React.useState<Fields>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = 'Please enter your name.';
    if (!fields.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(fields.email))
      next.email = 'Enter a valid email address.';
    if (!fields.company.trim()) next.company = 'Please enter your company.';
    if (!fields.trade) next.trade = 'Select your trade.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    // Front-end demo: no backend wired yet. Simulate the request round-trip,
    // then show confirmation. Swap this for a POST to your CRM / booking API.
    await new Promise((r) => setTimeout(r, 1100));
    setStatus('success');
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-36">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_60%)]"
      />
      <div className="container">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Value column */}
          <div>
            <span className="eyebrow">Book a demo</span>
            <h1 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
              See Mango answer your calls, live.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              In 20 minutes you’ll watch a real call flow through Mango for your
              trade. Answered, qualified, booked, dispatched, and invoiced. No
              slides, no commitment.
            </p>

            <div className="mt-10 space-y-5">
              {EXPECT.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
                <span className="ml-2 text-sm font-semibold text-slate-700">
                  4.9/5 from 500+ teams
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                “Every emergency is answered, booked, and dispatched while I
                sleep.”
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                David Chen, Owner, AquaPlumb Services
              </p>
            </div>
          </div>

          {/* Form / success column */}
          <div className="lg:pt-2">
            <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lifted sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="relative">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand-200/60" />
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white">
                        <Check className="h-8 w-8" />
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-900">
                      You’re on the list, {fields.name.split(' ')[0] || 'there'}.
                    </h2>
                    <p className="mt-3 max-w-sm text-slate-600">
                      Thanks for reaching out. A product specialist will email{' '}
                      <span className="font-medium text-slate-900">
                        {fields.email}
                      </span>{' '}
                      within one business day to schedule your live demo.
                    </p>
                    <div className="mt-6 flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                      <Waveform tone="brand" bars={10} className="h-4" />
                      Meanwhile, Mango never stops answering.
                    </div>
                    <Button variant="outline" className="mt-8" asChild>
                      <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                      </Link>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900">
                      Tell us about your business
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      We’ll tailor the demo to your trade and call volume.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" required error={errors.name} className="sm:col-span-2">
                        <Input
                          value={fields.name}
                          onChange={set('name')}
                          placeholder="Jordan Rivera"
                          aria-invalid={!!errors.name}
                          autoComplete="name"
                        />
                      </Field>

                      <Field label="Work email" required error={errors.email}>
                        <Input
                          type="email"
                          value={fields.email}
                          onChange={set('email')}
                          placeholder="jordan@company.com"
                          aria-invalid={!!errors.email}
                          autoComplete="email"
                        />
                      </Field>

                      <Field label="Phone" error={errors.phone}>
                        <Input
                          type="tel"
                          value={fields.phone}
                          onChange={set('phone')}
                          placeholder="(555) 012-3456"
                          autoComplete="tel"
                        />
                      </Field>

                      <Field label="Company" required error={errors.company}>
                        <Input
                          value={fields.company}
                          onChange={set('company')}
                          placeholder="Apex Plumbing"
                          aria-invalid={!!errors.company}
                          autoComplete="organization"
                        />
                      </Field>

                      <Field label="Trade" required error={errors.trade}>
                        <Select
                          value={fields.trade}
                          onChange={set('trade')}
                          aria-invalid={!!errors.trade}
                          required
                        >
                          <option value="" disabled>
                            Select your trade
                          </option>
                          {TRADES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Select>
                      </Field>

                      <Field label="Team size">
                        <Select value={fields.teamSize} onChange={set('teamSize')}>
                          <option value="" disabled>
                            Select size
                          </option>
                          {TEAM_SIZES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Select>
                      </Field>

                      <Field label="Monthly call volume">
                        <Select value={fields.volume} onChange={set('volume')}>
                          <option value="" disabled>
                            Select volume
                          </option>
                          {CALL_VOLUMES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Select>
                      </Field>

                      <Field
                        label="What would you like to solve?"
                        className="sm:col-span-2"
                      >
                        <Textarea
                          value={fields.goal}
                          onChange={set('goal')}
                          placeholder="e.g. We miss too many after-hours emergency calls on weekends."
                        />
                      </Field>
                    </div>

                    <Button
                      type="submit"
                      variant="brand"
                      size="lg"
                      className="mt-6 w-full"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Booking your demo…
                        </>
                      ) : (
                        <>
                          Book my demo
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                      We’ll never share your information. Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center gap-1">
        <Label>{label}</Label>
        {required ? <span className="text-brand-600">*</span> : null}
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
