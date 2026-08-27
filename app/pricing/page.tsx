import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Pricing } from '@/components/sections/Pricing';
import { Comparison } from '@/components/sections/Comparison';
import { Guarantees } from '@/components/sections/Guarantees';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
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
      {/* The plan prices in the Offer nodes are read from the same module the
          table renders, so the marked-up price is the displayed price. */}
      <JsonLd id="ld-software" schema={softwareApplicationSchema()} />
      <JsonLd id="ld-faq" schema={faqSchema('/pricing')} />
      <JsonLd
        id="ld-breadcrumb"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />
      <Header />
      <main className="overflow-x-clip bg-white pt-[68px]">
        <Pricing />
        <Guarantees />
        {/* Anyone weighing plans is also weighing whether to hire instead. */}
        <Comparison />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
