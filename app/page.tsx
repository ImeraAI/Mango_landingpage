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
import { Pricing } from '@/components/sections/Pricing';
import { Guarantees } from '@/components/sections/Guarantees';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Page() {
  return (
    <>
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
        {/* Decision */}
        <Pricing />
        <Guarantees />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
