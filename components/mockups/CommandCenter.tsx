'use client';

import * as React from 'react';
import {
  LayoutDashboard,
  PhoneCall,
  CalendarDays,
  Navigation,
  FileText,
  Users,
  Settings,
  Search,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoMark } from '@/components/primitives/Logo';
import { MiniMap } from './MiniMap';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: PhoneCall, label: 'Calls' },
  { icon: CalendarDays, label: 'Schedule' },
  { icon: Navigation, label: 'Dispatch' },
  { icon: FileText, label: 'Invoices' },
  { icon: Users, label: 'Customers' },
];

const KPIS = [
  { label: 'Calls answered', value: '128', delta: '+24%' },
  { label: 'Jobs booked', value: '96', delta: '+18%' },
  { label: 'Revenue booked', value: '$18.2k', delta: '+31%' },
  { label: 'Avg. answer', value: '1.2s', delta: 'Live' },
];

const JOBS = [
  { job: 'Burst pipe', who: 'D. Reyes', tech: 'Mike R.', status: 'En route', tone: 'brand' },
  { job: 'AC tune-up', who: 'J. Miller', tech: 'Sarah K.', status: 'Scheduled', tone: 'slate' },
  { job: 'Panel upgrade', who: 'T. Okoye', tech: 'John D.', status: 'On site', tone: 'amber' },
  { job: 'Drain clog', who: 'L. Nguyen', tech: 'Unassigned', status: 'New', tone: 'slate' },
];

const ACTIVITY = [
  { text: 'Call answered · Burst pipe', time: 'now' },
  { text: 'Invoice #1042 drafted', time: '2m' },
  { text: 'Mike R. dispatched', time: '5m' },
  { text: 'Review received · 5★', time: '12m' },
];

const statusTone: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
};

export function CommandCenter({ className }: { className?: string }) {
  return (
    <div className={cn('flex min-h-[520px] bg-slate-50/60 text-left', className)}>
      {/* sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-100 bg-white/80 p-4 lg:flex">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <LogoMark className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
            Mango
          </span>
        </div>
        <nav className="mt-6 space-y-1">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium',
                item.active
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-500'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-2xs font-semibold text-white">
            AP
          </span>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-slate-800">
              Apex Plumbing
            </div>
            <div className="truncate text-2xs text-slate-400">Pro plan</div>
          </div>
          <Settings className="ml-auto h-4 w-4 text-slate-400" />
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 overflow-hidden p-5 sm:p-6">
        {/* top bar */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="font-display text-lg font-semibold tracking-tight text-slate-900">
              Command Center
            </div>
            <div className="text-xs text-slate-500">Thursday, July 17 · Live</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-400 sm:flex">
              <Search className="h-3.5 w-3.5" />
              Search jobs, calls…
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1.5 text-2xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
              Live
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-slate-200/70 bg-white p-3.5"
            >
              <div className="text-2xs uppercase tracking-wide text-slate-400">
                {kpi.label}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-xl font-semibold tabular-nums text-slate-900">
                  {kpi.value}
                </span>
                <span className="inline-flex items-center gap-0.5 text-2xs font-semibold text-brand-600">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* content grid */}
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          {/* jobs table */}
          <div className="rounded-2xl border border-slate-200/70 bg-white lg:col-span-3">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <span className="text-sm font-semibold text-slate-800">
                Active jobs
              </span>
              <span className="text-2xs text-slate-400">4 in progress</span>
            </div>
            <div className="divide-y divide-slate-50">
              {JOBS.map((j) => (
                <div
                  key={j.job}
                  className="grid grid-cols-[1.4fr_1fr_auto] items-center gap-2 px-4 py-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-slate-800">
                      {j.job}
                    </div>
                    <div className="truncate text-2xs text-slate-400">
                      {j.who}
                    </div>
                  </div>
                  <div className="truncate text-xs text-slate-500">{j.tech}</div>
                  <span
                    className={cn(
                      'justify-self-end rounded-full border px-2 py-0.5 text-2xs font-semibold',
                      statusTone[j.tone]
                    )}
                  >
                    {j.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* right rail */}
          <div className="space-y-4 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white">
              <MiniMap className="h-36 w-full rounded-none border-0" />
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
              <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-brand-600" /> Live activity
              </div>
              <div className="space-y-2.5">
                {ACTIVITY.map((a) => (
                  <div
                    key={a.text}
                    className="flex items-center gap-2.5 text-xs"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="flex-1 truncate text-slate-600">
                      {a.text}
                    </span>
                    <span className="tabular-nums text-slate-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
