import * as React from 'react';
import { Droplets, Fan, Zap, ShieldCheck, Mountain, Waves } from 'lucide-react';
import { Wordmark, type Accent } from '@/components/primitives/Wordmark';
import { Reveal } from '@/components/primitives/Reveal';
import { Marquee } from '@/components/primitives/Marquee';

const COMPANIES: { name: string; icon: typeof Droplets; accent: Accent }[] = [
  { name: 'AquaPlumb', icon: Droplets, accent: 'sky' },
  { name: 'AirPro HVAC', icon: Fan, accent: 'cyan' },
  { name: 'VoltElectric', icon: Zap, accent: 'amber' },
  { name: 'SafeGuard', icon: ShieldCheck, accent: 'emerald' },
  { name: 'Summit Mechanical', icon: Mountain, accent: 'violet' },
  { name: 'BlueLine', icon: Waves, accent: 'blue' },
];

export function LogoCloud() {
  return (
    <div className="border-y border-slate-100 bg-white/50 py-12">
      <div className="container">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.14em] text-slate-400">
            Built for modern service operations
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <Marquee className="mt-8" duration="30s">
          {COMPANIES.map((c) => (
            <Wordmark key={c.name} name={c.name} icon={c.icon} accent={c.accent} />
          ))}
        </Marquee>
      </Reveal>
    </div>
  );
}
