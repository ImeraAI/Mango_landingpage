import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        // Primary emerald CTA: the brand's "go" action.
        brand:
          'bg-brand-600 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_10px_24px_-10px_rgba(5,150,105,0.55)] hover:bg-brand-700 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_14px_30px_-10px_rgba(5,150,105,0.6)]',
        // Sophisticated dark action.
        default:
          'bg-slate-900 text-white shadow-sm hover:bg-slate-800',
        outline:
          'border border-slate-200 bg-white text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-50',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200/80',
        ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        link: 'text-brand-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-[0.95rem]',
        xl: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
