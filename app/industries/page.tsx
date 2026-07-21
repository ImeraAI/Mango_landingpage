import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Industries } from '@/components/sections/Industries';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Mango is tuned for the trades — HVAC, plumbing, electrical, and more. See how it fits the way your shop takes calls.',
  openGraph: {
    title: 'Industries · Mango',
    description:
      'Built for the trades. See how Mango fits your shop, whatever you run.',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white pt-[68px]">
        <Industries />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
