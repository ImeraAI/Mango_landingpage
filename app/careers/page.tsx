import type { Metadata } from 'next';
import Link from 'next/link';
import { BasicPage } from '@/components/layout/BasicPage';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Open roles at Mango.',
};

export default function CareersPage() {
  return (
    <BasicPage
      eyebrow="Careers"
      title="Come build the front office for the trades."
      description="We are small, and we hire slowly and deliberately."
    >
      <p>
        There are no open roles listed right now. We still want to hear from
        engineers, designers, and people who have actually run a service
        business and know what a dispatch board feels like at 7am.
      </p>
      <p>
        Send us a note about what you would want to work on and we will keep it
        on file.{' '}
        <Link
          href="/demo"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          Get in touch
        </Link>
        .
      </p>
    </BasicPage>
  );
}
