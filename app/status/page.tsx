import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicPage } from '@/components/layout/BasicPage';

export const metadata: Metadata = {
  title: 'Status',
  description: 'Mango service status.',
};

/**
 * Static page, so it cannot report real uptime. It must not display a green
 * "all systems operational" badge it has no way to verify — that is exactly
 * the claim a status page exists to make truthfully. Swap in a real status
 * provider (Statuspage, Better Stack, Instatus) and link out to it.
 */
export default function StatusPage() {
  return (
    <BasicPage
      eyebrow="Status"
      title="Service status."
      description="A live status page is on the way."
    >
      <p>
        We have not connected a monitoring provider yet, so this page cannot
        report real uptime and will not pretend to.
      </p>
      <p>
        If you think calls are not being answered, do not wait on this page.{' '}
        <Link
          href="/demo"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          Contact us
        </Link>{' '}
        and we will look at your account straight away.
      </p>
    </BasicPage>
  );
}
