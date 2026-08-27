import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Clock3, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { LIVE, COMING_SOON } from '@/content/integrations';

const DESCRIPTION =
  'What Mango connects to today — your existing phone number, WhatsApp, SMS, calendar invites, email summaries and job sheets — and the direct syncs with ServiceTitan, Housecall Pro, Jobber, QuickBooks and Stripe that are still in build.';

export const metadata: Metadata = {
  alternates: { canonical: '/integrations' },
  title: 'Integrations',
  description: DESCRIPTION,
  openGraph: { title: 'Integrations · Mango', description: DESCRIPTION },
};

const linkClass =
  'font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500';

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd
        id="ld-integrations"
        schema={webPageSchema({
          title: 'Mango integrations',
          description: DESCRIPTION,
          path: '/integrations',
        })}
      />
      <JsonLd
        id="ld-breadcrumb"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Integrations', path: '/integrations' },
        ])}
      />
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Section className="pt-32 sm:pt-36">
          <SectionHeading
            eyebrow="Integrations"
            title="Works with the phone you already have."
            description="Mango does not ask you to rip anything out. It sits in front of the line you already advertise and hands the results to the tools your team already opens."
          />

          <div className="mx-auto mt-6 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-slate-600">
              This page is split into what works today and what is still being
              built, and we keep it that way deliberately — a &ldquo;coming
              soon&rdquo; dressed up as a feature is the fastest way to lose an
              operator&rsquo;s trust in the first week.
            </p>
          </div>

          {/* Live */}
          <Reveal className="mx-auto mt-16 max-w-5xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                <Check className="h-4 w-4" />
                Working today
              </span>
              <span className="text-sm text-slate-500">
                Available on every plan
              </span>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {LIVE.map(({ name, icon: Icon, description }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6"
                >
                  <dt className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-lg font-semibold text-slate-900">
                      {name}
                    </span>
                  </dt>
                  <dd className="mt-3 leading-relaxed text-slate-600">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Planned */}
          <Reveal className="mx-auto mt-16 max-w-5xl" delay={0.05}>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                <Clock3 className="h-4 w-4" />
                In build
              </span>
              <span className="text-sm text-slate-500">
                Not available yet — no date promised
              </span>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {COMING_SOON.map(({ name, icon: Icon, description, href }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-6"
                >
                  <dt className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-lg font-semibold text-slate-900">
                      {name}
                    </span>
                    {/*
                      Outbound links to the vendors themselves. An audit found
                      zero external citations on this site; pointing at the
                      software an operator already runs is both the most useful
                      link we can give them and the most natural one to earn.
                    */}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-brand-700"
                    >
                      Site
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </dt>
                  <dd className="mt-3 leading-relaxed text-slate-600">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* How it actually connects */}
          <Reveal className="mx-auto mt-16 max-w-3xl" delay={0.1}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              How connecting actually works
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                Setup is a forward, not a migration. You point your existing
                number at Mango — the same forwarding setting every phone
                system has — and Mango starts answering. Nothing is ported,
                nothing is replaced, and switching it back is the same setting
                in reverse.
              </p>
              <p>
                Before it takes a call it is trained on your services, your
                pricing, your service area, and the protocols that decide what
                counts as an emergency.{' '}
                <Link href="/how-it-works" className={linkClass}>
                  Follow a call end to end
                </Link>{' '}
                to see what happens between the ring and the booking, or read{' '}
                <Link href="/platform" className={linkClass}>
                  what the platform does
                </Link>{' '}
                once a job exists.
              </p>
              <p>
                Until the direct syncs above ship, bookings reach your team as
                calendar invites, email summaries and job sheets — which is why
                those are on the &ldquo;working today&rdquo; list rather than
                treated as a stopgap. Most shops run this way indefinitely and
                do not miss the API.
              </p>
              <p>
                Not sure whether your setup fits?{' '}
                <Link href="/contact" className={linkClass}>
                  Ask us
                </Link>{' '}
                — tell us what you run and we will tell you plainly whether it
                works today, or whether it is on the list above.
              </p>
            </div>

            <div className="mt-10 rounded-3xl border border-brand-100 bg-brand-50/60 p-8 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
                See it answer a call for your trade.
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
                Twenty minutes, no slides. We run a real intake through Mango
                and connect it the way your shop would run it.
              </p>
              <Button variant="brand" size="lg" className="mt-6" asChild>
                <Link href="/demo">
                  Book a demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
