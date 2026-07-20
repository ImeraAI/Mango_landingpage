import * as React from 'react';
import { ShieldCheck, CalendarCheck, CreditCard, PhoneForwarded } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Concrete, verifiable reassurances: the things a shop owner actually
 * hesitates over before signing up. Deliberately promises only what the
 * product guarantees today (no metrics, no claims we can't back).
 */
const GUARANTEES = [
  { icon: CalendarCheck, label: 'Answering calls in a day' },
  { icon: PhoneForwarded, label: 'Keep your own number' },
  { icon: CreditCard, label: 'No contract, cancel anytime' },
  { icon: ShieldCheck, label: 'Calls encrypted, never sold' },
];

export function TrustStrip({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5',
        className
      )}
    >
      {GUARANTEES.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600"
        >
          <Icon className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.25} />
          {label}
        </li>
      ))}
    </ul>
  );
}
