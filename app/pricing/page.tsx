import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Pricing } from '@/components/sections/Pricing';
import { Guarantees } from '@/components/sections/Guarantees';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for Mango. See plans, guarantees, and answers to the questions shops ask most.',
  openGraph: {
    title: 'Pricing · Mango',
    description:
      'Transparent plans with a guarantee. Find the plan that fits your shop.',
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white pt-[68px]">
        <Pricing />
        <Guarantees />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
