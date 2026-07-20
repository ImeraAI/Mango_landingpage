import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicPage } from '@/components/layout/BasicPage';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Mango privacy policy.',
};

/**
 * Deliberately NOT a drafted policy. Publishing invented legal text would be
 * worse than publishing none: it reads as binding, and it is not reviewed.
 * Replace this whole page with the real policy before taking signups.
 */
export default function PrivacyPage() {
  return (
    <BasicPage
      eyebrow="Privacy"
      title="Privacy policy."
      description="Our full policy is being prepared with counsel and is not published yet."
    >
      <p>
        In the meantime, here is plainly what we do: we process the calls made
        to your business so we can answer, book, and follow up on them. We do
        not sell that data or share it for advertising.
      </p>
      <p>
        If you need our data handling in writing before you sign up, or you want
        to know what we hold about you,{' '}
        <Link
          href="/demo"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          contact us
        </Link>{' '}
        and we will answer directly.
      </p>
      <p className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-base text-amber-900">
        <strong className="font-semibold">Note:</strong> this page is a
        placeholder, not a policy. It does not describe your legal rights in
        full and should not be relied on as though it did.
      </p>
    </BasicPage>
  );
}
