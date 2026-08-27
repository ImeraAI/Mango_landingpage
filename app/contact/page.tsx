import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Reveal } from '@/components/primitives/Reveal';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, contactPageSchema } from '@/lib/schema';
import { CONTACT, HAS_DIRECT_CONTACT, telHref } from '@/content/contact';

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact',
  description:
    'Get in touch with Mango. Book a walkthrough for your trade, or reach the team directly.',
  openGraph: {
    title: 'Contact · Mango',
    description:
      'Book a walkthrough for your trade, or reach the Mango team directly.',
  },
};

/** One reachable channel. Rendered only when the detail behind it is real. */
function Channel({
  icon: Icon,
  label,
  value,
  href,
  note,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </div>
        <div className="mt-1 break-words font-medium text-slate-900">
          {href ? (
            <a
              href={href}
              className="underline decoration-slate-300 underline-offset-4 transition-colors hover:decoration-brand-500"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </div>
        {note ? (
          <div className="mt-1 text-sm text-slate-500">{note}</div>
        ) : null}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { supportEmail, salesEmail, phone, hours, address } = CONTACT;

  return (
    <>
      <JsonLd id="ld-contact" schema={contactPageSchema()} />
      <JsonLd
        id="ld-breadcrumb"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Section className="pt-32 sm:pt-36">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to someone who knows the trades."
            description="The fastest way to get an answer is to book a walkthrough — we will run a real call for your trade and you can ask everything while it happens."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* Primary path: the thing that actually gets someone an answer. */}
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-brand-100 bg-brand-50/60 p-8 sm:p-10">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-600 shadow-xs">
                    <CalendarCheck className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-slate-900">
                    Book a walkthrough
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    Twenty minutes, no slides. We put a real intake through
                    Mango for your trade — emergency triage, booking, dispatch,
                    invoice — and model the cost against what you pay now.
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      No commitment, and no card to book.
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      Most teams are answering calls within a day of signing up.
                    </li>
                  </ul>
                </div>
                <Button variant="brand" size="lg" className="mt-8" asChild>
                  <Link href="/demo">
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-4">
                {/*
                  Direct channels render only when content/contact.ts actually
                  holds them. Publishing a support address nobody reads is
                  worse than publishing none, and a fabricated phone number or
                  postal address is the first thing a search engine will
                  cross-check against other sources and fail.
                */}
                {supportEmail ? (
                  <Channel
                    icon={Mail}
                    label="Support"
                    value={supportEmail}
                    href={`mailto:${supportEmail}`}
                    note={hours ?? undefined}
                  />
                ) : null}

                {salesEmail ? (
                  <Channel
                    icon={Mail}
                    label="Sales"
                    value={salesEmail}
                    href={`mailto:${salesEmail}`}
                  />
                ) : null}

                {phone ? (
                  <Channel
                    icon={Phone}
                    label="Phone"
                    value={phone}
                    href={telHref(phone)}
                    note={hours ?? undefined}
                  />
                ) : null}

                {address ? (
                  <Channel
                    icon={MapPin}
                    label="Office"
                    value={`${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`}
                  />
                ) : null}

                {!HAS_DIRECT_CONTACT ? (
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
                    <h2 className="font-display text-lg font-semibold text-slate-900">
                      Other ways through
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Every enquiry — support, sales, press, partnerships —
                      comes through the booking form above, and reaches a
                      person on the team. Tell us what it is about in the
                      message field and we will route it.
                    </p>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-slate-200/80 bg-white p-6">
                  <h2 className="font-display text-lg font-semibold text-slate-900">
                    Looking for something specific?
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <Link
                        href="/security"
                        className="text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
                      >
                        Security and data handling
                      </Link>{' '}
                      <span className="text-slate-500">
                        — encryption, access control, compliance
                      </span>
                    </li>
                    <li>
                      <Link
                        href="/status"
                        className="text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
                      >
                        System status
                      </Link>{' '}
                      <span className="text-slate-500">
                        — uptime and incident history
                      </span>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
                      >
                        Pricing
                      </Link>{' '}
                      <span className="text-slate-500">
                        — plans, per-call rates, what is included
                      </span>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
                      >
                        Careers
                      </Link>{' '}
                      <span className="text-slate-500">— open roles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
