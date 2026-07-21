import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CallFlow } from '@/components/sections/CallFlow';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Follow one call through Mango end to end — answered, qualified, booked, dispatched, and invoiced automatically.',
  openGraph: {
    title: 'How it works · Mango',
    description:
      'See how Mango handles a call from ring to invoice, without a front desk.',
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white pt-[68px]">
        <CallFlow />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
