import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoBooking } from '@/components/sections/DemoBooking';

export const metadata: Metadata = {
  title: 'Book a demo',
  description:
    'See Mango answer your calls live. Book a 20-minute walkthrough tailored to your trade and get a custom ROI estimate. No commitment.',
  openGraph: {
    title: 'Book a demo · Mango',
    description:
      'Watch a real call flow through Mango for your trade. Answered, booked, dispatched, and invoiced.',
  },
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-white">
        <DemoBooking />
      </main>
      <Footer />
    </>
  );
}
