'use client';

import * as React from 'react';
import { Navigation, BadgeCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MiniMap } from './MiniMap';

export function DispatchBoard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Navigation className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Dispatch
            </div>
            <div className="text-xs text-slate-500">Job #1042 · En route</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-2xs font-semibold text-brand-700">
          <BadgeCheck className="h-3 w-3" /> Tech notified
        </span>
      </div>

      {/* assigned technician */}
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          MR
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            Mike Reyner
            <span className="inline-flex items-center gap-0.5 text-2xs font-medium text-amber-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> 4.9
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Master Plumber · Best match for emergency
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold tabular-nums text-slate-900">
            22 min
          </div>
          <div className="text-2xs uppercase tracking-wide text-slate-400">
            ETA
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <MiniMap className="h-44 w-full" />
      </div>
    </div>
  );
}
