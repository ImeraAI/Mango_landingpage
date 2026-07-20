'use client';

import * as React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { cn, formatUSD } from '@/lib/utils';

const LINES = [
  { label: 'Emergency call-out (after hours)', amount: 149 },
  { label: 'Water heater diagnostic', amount: 89 },
  { label: 'Labor · 1.5 hrs', amount: 180 },
];

export function InvoiceCard({ className }: { className?: string }) {
  const subtotal = LINES.reduce((sum, l) => sum + l.amount, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Invoice #1042
            </div>
            <div className="text-xs text-slate-500">Dana Reyes · 128 Cedar St.</div>
          </div>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-2xs font-semibold text-amber-700">
          Draft
        </span>
      </div>

      <div className="px-5 py-4">
        <div className="space-y-2.5">
          {LINES.map((line) => (
            <div
              key={line.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-600">{line.label}</span>
              <span className="tabular-nums font-medium text-slate-800">
                {formatUSD(line.amount)}
              </span>
            </div>
          ))}
        </div>

        <div className="my-4 h-px bg-slate-100" />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatUSD(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Tax (8%)</span>
            <span className="tabular-nums">{formatUSD(tax)}</span>
          </div>
          <div className="flex items-baseline justify-between pt-1.5 font-display text-lg font-semibold text-slate-900">
            <span>Total</span>
            <span className="tabular-nums">{formatUSD(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700">
          <Sparkles className="h-3.5 w-3.5" /> Drafted from call transcript
        </span>
        <button className="rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800">
          Send to customer
        </button>
      </div>
    </div>
  );
}
