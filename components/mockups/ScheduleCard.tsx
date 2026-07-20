'use client';

import * as React from 'react';
import { CalendarCheck, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const SLOTS = [
  { time: '4:30 PM', title: 'AC tune-up · Miller', tone: 'muted' as const },
  { time: '6:00 PM', title: 'Drain clog · Okoye', tone: 'muted' as const },
  {
    time: '9:15 PM',
    title: 'Emergency: Burst pipe · Reyes',
    meta: '128 Cedar St.',
    tone: 'brand' as const,
  },
];

export function ScheduleCard({ className }: { className?: string }) {
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
            <CalendarCheck className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Today&apos;s schedule
            </div>
            <div className="text-xs text-slate-500">Thursday · 3 jobs</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-2xs font-semibold text-brand-700">
          <Zap className="h-3 w-3" /> Booked in 8s
        </span>
      </div>

      <div className="space-y-2 px-4 py-4">
        {SLOTS.map((slot) => (
          <div
            key={slot.time}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors',
              slot.tone === 'brand'
                ? 'border-brand-200 bg-brand-50/70 ring-1 ring-inset ring-brand-100'
                : 'border-slate-200/70 bg-white'
            )}
          >
            <div
              className={cn(
                'flex w-16 shrink-0 items-center gap-1 text-xs font-semibold tabular-nums',
                slot.tone === 'brand' ? 'text-brand-700' : 'text-slate-500'
              )}
            >
              <Clock className="h-3 w-3" />
              {slot.time}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  'truncate text-sm font-medium',
                  slot.tone === 'brand' ? 'text-slate-900' : 'text-slate-700'
                )}
              >
                {slot.title}
              </div>
              {slot.meta ? (
                <div className="truncate text-xs text-slate-500">
                  {slot.meta}
                </div>
              ) : null}
            </div>
            {slot.tone === 'brand' ? (
              <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-2xs font-semibold text-white">
                New
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
