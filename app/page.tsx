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
        {/* Product story: follow one call end to end */}
        <CallFlow />
        {/* Capabilities & proof */}
        <Platform />
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
