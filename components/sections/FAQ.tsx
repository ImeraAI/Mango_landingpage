import * as React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { Button } from '@/components/ui/button';
import { FaqList } from '@/components/sections/FaqList';
import { FAQS } from '@/content/faq';

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
              For the full feature list see{' '}
              <Link
                href="/platform"
                className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
              >
                the platform
              </Link>
              , or read{' '}
              <Link
                href="/how-it-works"
                className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
              >
                how a call flows end to end
              </Link>
              . Still unsure? Talk to a specialist.
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
                    We&rsquo;ll walk you through it.
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/contact">Talk to a specialist</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FaqList faqs={FAQS} />
        </Reveal>
      </div>
    </Section>
  );
}
