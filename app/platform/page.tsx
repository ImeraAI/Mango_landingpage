import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Platform } from '@/components/sections/Platform';
import { CommandCenterSection } from '@/components/sections/CommandCenterSection';
import { Integrations } from '@/components/sections/Integrations';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'Everything Mango does for your shop — an AI receptionist, a live command center, and integrations that fit your existing tools.',
  openGraph: {
    title: 'Platform · Mango',
    description:
      'The AI receptionist, command center, and integrations that run your phones.',
  },
};

export default function PlatformPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white pt-[68px]">
        <Platform />
        <CommandCenterSection />
        <Integrations />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
