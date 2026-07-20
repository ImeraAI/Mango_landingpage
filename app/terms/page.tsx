import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicPage } from '@/components/layout/BasicPage';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Mango terms of service.',
};

/**
 * Deliberately NOT drafted terms. See the note in app/privacy/page.tsx.
 * Replace with the real agreement before taking signups or payments.
 */
export default function TermsPage() {
  return (
    <BasicPage
      eyebrow="Terms"
      title="Terms of service."
      description="Our terms are being prepared with counsel and are not published yet."
    >
      <p>
        What we can tell you now: plans are month to month, there is no
        contract, and you can cancel at any time. Pricing is as shown on the{' '}
        <Link
          href="/#pricing"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          pricing page
        </Link>
        .
      </p>
      <p>
        If you need the agreement in writing before you start,{' '}
        <Link
          href="/demo"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          ask us
        </Link>{' '}
        and we will send you what we have.
      </p>
      <p className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-base text-amber-900">
        <strong className="font-semibold">Note:</strong> this page is a
        placeholder, not a contract. No agreement is formed by it.
      </p>
    </BasicPage>
  );
}
