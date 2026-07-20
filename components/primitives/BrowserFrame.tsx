import * as React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A macOS-style application/browser window chrome used to frame product
 * mockups. The chrome is deliberately understated so the UI inside leads.
 */
export function BrowserFrame({
  children,
  url = 'app.imera.ai',
  className,
  bodyClassName,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lifted',
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-1.5 rounded-md border border-slate-200/70 bg-white/70 text-xs text-slate-500">
          <Lock className="h-3 w-3 text-brand-600" />
          {url}
        </div>
        <div className="h-4 w-8" />
      </div>
      <div className={cn('bg-white', bodyClassName)}>{children}</div>
    </div>
  );
}
