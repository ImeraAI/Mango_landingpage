import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-400/15',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
