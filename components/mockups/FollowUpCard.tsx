'use client';

import * as React from 'react';
import { MessageSquare, Star, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FollowUpCard({ className }: { className?: string }) {
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
            <MessageSquare className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Follow-up · SMS
            </div>
            <div className="text-xs text-slate-500">Dana Reyes · +1 (555) 0143</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-2xs font-semibold text-brand-700">
          Automated
        </span>
      </div>

      <div className="space-y-3 px-5 py-5">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-sm leading-relaxed text-white">
            Hi Dana, this is Apex Plumbing. Mike wrapped up the repair. How&apos;d
            everything go? Reply here anytime.
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-slate-100 px-4 py-2.5 text-sm leading-relaxed text-slate-700">
            Incredible. Fast, professional, saved our basement. Thank you!
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-sm leading-relaxed text-white">
            So glad to hear it! Mind sharing a quick review? It really helps.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 bg-slate-50/70 px-4 py-3.5">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-3 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          </span>
          <div>
            <div className="text-[0.8rem] font-medium text-slate-800">
              5-star review
            </div>
            <div className="text-2xs text-slate-500">Posted to Google</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-3 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <RefreshCw className="h-3.5 w-3.5" />
          </span>
          <div>
            <div className="text-[0.8rem] font-medium text-slate-800">
              Maintenance
            </div>
            <div className="text-2xs text-slate-500">Reminder in 6 mo.</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-5 py-3 text-xs font-medium text-slate-500">
        <Check className="h-3.5 w-3.5 text-brand-600" />
        Customer record updated automatically
      </div>
    </div>
  );
}
