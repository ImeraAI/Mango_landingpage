import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicPage } from '@/components/layout/BasicPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';

const DESCRIPTION =
  'Mango builds the AI front office for home service businesses, so no call goes unanswered. Who we build for, how the product is set up, and why it exists.';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description: DESCRIPTION,
  openGraph: { title: 'About · Mango', description: DESCRIPTION },
};

/** Inline link styling, repeated enough on this page to be worth naming. */
const linkClass =
  'font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500';

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="ld-about"
        schema={webPageSchema({
          title: 'About Mango',
          description: DESCRIPTION,
          path: '/about',
        })}
      />
      <JsonLd
        id="ld-breadcrumb"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <BasicPage
        eyebrow="About"
        title="Built for the people who answer the phone."
        description="Mango is the AI front office for home service businesses."
      >
        {/*
          Structured against the three questions Google's own guidance asks of
          a page — who made this, how, and why. This page used to answer only
          the third, in three paragraphs with no outbound path. The headings
          are real <h2>s so each answer is addressable on its own, which is
          also what makes a passage quotable by an assistant.
        */}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
          Why Mango exists
        </h2>
        <p>
          Every trade business loses work the same way: the phone rings while
          everyone is already on a job, and the caller dials the next name on
          the list. It is not a marketing problem or a pricing problem. It is a
          capacity problem at the exact moment a customer is ready to buy — and
          it bites hardest at the hours that matter most, because a burst pipe
          or a dead furnace does not wait for opening time. We write about what
          that actually costs{' '}
          <Link href="/blog" className={linkClass}>
            on the blog
          </Link>
          .
        </p>
        <p>
          Mango answers every call the way your best office manager would. It
          qualifies the lead, follows your emergency protocols, books the job
          into your calendar, and follows up afterwards. It works nights,
          weekends, and the middle of a busy Tuesday.
        </p>

        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
          How it is built and set up
        </h2>
        <p>
          Mango is not a generic voice bot pointed at a phone line. Before it
          takes a call it is trained on the specifics of one business: the
          services you offer, what you charge, the area you cover, and the
          protocols that decide what counts as an emergency. That last part is
          the difference between a booking and a callout —{' '}
          <Link href="/industries" className={linkClass}>
            a burst pipe, a no-heat call, an exposed conductor
          </Link>{' '}
          each route differently, and the rules are yours, not ours.
        </p>
        <p>
          From there it connects to the tools you already run — your calendar,
          your field service software, your messaging — so a booking lands
          where your team already looks.{' '}
          <Link href="/how-it-works" className={linkClass}>
            Follow a single call end to end
          </Link>{' '}
          to see the sequence, or read{' '}
          <Link href="/platform" className={linkClass}>
            what the platform does
          </Link>{' '}
          once a call is answered. When a call goes somewhere Mango should not
          handle alone, it hands off to a human fallback number rather than
          improvising.
        </p>

        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
          Who we are
        </h2>
        <p>
          Mango AI, Inc. builds and runs the product. We are a small team, and
          we would rather talk to you than sell to you. Calls and customer
          records are encrypted in transit and at rest and you keep ownership
          of your data —{' '}
          <Link href="/security" className={linkClass}>
            how we handle it is written down
          </Link>
          , as is{' '}
          <Link href="/status" className={linkClass}>
            our uptime record
          </Link>
          .
        </p>
        <p>
          The clearest way to judge whether this works for your trade is to
          watch it try.{' '}
          <Link href="/contact" className={linkClass}>
            Get in touch
          </Link>{' '}
          and we will run a real call through it for your business — emergency
          triage included — and show you the arithmetic against what you pay to
          answer the phone today.
        </p>
      </BasicPage>
    </>
  );
}
