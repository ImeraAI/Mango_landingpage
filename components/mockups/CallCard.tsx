'use client';

import * as React from 'react';
import { Phone, ShieldCheck, MapPin, Wrench, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoMark } from '@/components/primitives/Logo';
import { Waveform } from './Waveform';

/**
 * Live AI-intake console. Shows a call in progress: transcript exchange plus
 * the structured fields Mango extracts in real time. Presentational only.
 */
const CAPTURED = [
  { icon: ShieldCheck, label: 'Caller', value: 'Dana Reyes' },
  { icon: AlertTriangle, label: 'Priority', value: 'Emergency' },
  { icon: Wrench, label: 'Job type', value: 'Burst pipe' },
  { icon: MapPin, label: 'Address', value: '128 Cedar St.' },
];

export function CallCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card',
        className
      )}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Phone className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-brand-500" />
            </span>
          </span>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              Live call
              <span className="rounded-full bg-brand-50 px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wide text-brand-700">
                Mango answering
              </span>
            </div>
            <div className="text-xs tabular-nums text-slate-500">
              Incoming · +1 (555) 0198
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Waveform className="h-5" bars={9} />
          <span className="text-xs tabular-nums text-slate-400">01:12</span>
        </div>
      </div>

      {/* transcript */}
      <div className="space-y-3 px-5 py-5">
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-slate-100 px-4 py-2.5 text-sm leading-relaxed text-slate-700">
            Hi, my water heater burst and it&apos;s flooding the basement.
            Can someone come out tonight?
          </div>
        </div>
        <div className="flex items-end justify-end gap-2">
          <div className="max-w-[82%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
            Absolutely, I can help right away. I have an emergency plumber near
            you. What&apos;s the service address?
          </div>
          <LogoMark className="h-7 w-7 rounded-lg" />
        </div>
      </div>

      {/* captured fields */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
          Captured by Mango
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {CAPTURED.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white px-3 py-2"
            >
              <f.icon className="h-4 w-4 shrink-0 text-brand-600" />
              <div className="min-w-0">
                <div className="text-2xs uppercase tracking-wide text-slate-400">
                  {f.label}
                </div>
                <div className="truncate text-[0.8rem] font-medium text-slate-800">
                  {f.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
