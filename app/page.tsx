import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { LogoCloud } from '@/components/sections/LogoCloud';
import { CallFlow } from '@/components/sections/CallFlow';
import { Platform } from '@/components/sections/Platform';
import { CommandCenterSection } from '@/components/sections/CommandCenterSection';
import { Industries } from '@/components/sections/Industries';
import { Metrics } from '@/components/sections/Metrics';
import { ROICalculator } from '@/components/sections/ROICalculator';
import { Integrations } from '@/components/sections/Integrations';
import { Testimonials } from '@/components/sections/Testimonials';
import { Comparison } from '@/components/sections/Comparison';
import { Pricing } from '@/components/sections/Pricing';
import { Guarantees } from '@/components/sections/Guarantees';
import { FAQ } from '@/components/sections/FAQ';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, softwareApplicationSchema } from '@/lib/schema';

export default function Page() {
  return (
    <>
      {/*
        The homepage's own structured data. Organization and WebSite live in
        the layout; these two describe what this page specifically offers —
        the product with its real plan prices, and the six FAQ answers that
        are now all present in the HTML below.
      */}
      <JsonLd id="ld-software" schema={softwareApplicationSchema()} />
      <JsonLd id="ld-faq" schema={faqSchema()} />
      <Header />
      <main className="overflow-x-clip bg-white">
        {/* Hook */}
        <Hero />
        <LogoCloud />
        {/*
          Below lg these two swap: the phone reader gets the Platform overview
          first, then the step-by-step call story. Desktop keeps story-then-
          capabilities. Flex order is used so each section stays a plain
          full-width block in the normal flow.
        */}
        <div className="flex flex-col">
          {/* Product story: follow one call end to end */}
          <div className="order-2 lg:order-1">
            <CallFlow />
          </div>
          {/* Capabilities & proof */}
          <div className="order-1 lg:order-2">
            <Platform />
          </div>
        </div>
        <CommandCenterSection />
        <Industries />
        <Metrics />
        {/* Build the business case */}
        <ROICalculator />
        <Integrations />
        <Testimonials />
        {/* Decision — the competitive set first, then our own plans */}
        <Comparison />
        <Pricing />
        <Guarantees />
        <FAQ />
        {/* Dated, editorial internal links — the homepage had neither. */}
        <LatestPosts />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
