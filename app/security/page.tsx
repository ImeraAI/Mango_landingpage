import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicPage } from '@/components/layout/BasicPage';

export const metadata: Metadata = {
  title: 'Security',
  description: 'How Mango handles your call data.',
};

export default function SecurityPage() {
  return (
    <BasicPage
      eyebrow="Security"
      title="How we handle your call data."
      description="Call recordings and customer details are sensitive. Here is our position."
    >
      <p>
        Calls are encrypted in transit and at rest. We do not sell call data,
        customer lists, or recordings to anyone, and we do not share them with
        third parties for advertising.
      </p>
      <p>
        You own your data. If you leave, we will export it for you and delete
        our copy on request.
      </p>
      <p className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 text-base">
        <strong className="font-semibold text-slate-900">
          Detail still to come.
        </strong>{' '}
        Our formal certifications, sub-processor list, retention schedule, and
        incident response process are being documented. If you need specifics
        before signing up,{' '}
        <Link
          href="/demo"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          ask us directly
        </Link>{' '}
        and we will answer honestly about where we are.
      </p>
    </BasicPage>
  );
}
