import * as React from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Vertical rhythm. */
  spacing?: 'sm' | 'md' | 'lg';
  /** Surface tone behind the section. */
  tone?: 'white' | 'muted' | 'transparent';
  children: React.ReactNode;
};

const spacingMap = {
  sm: 'py-16 sm:py-20',
  md: 'py-20 sm:py-28',
  lg: 'py-24 sm:py-32',
};

const toneMap = {
  white: 'bg-white',
  muted: 'bg-slate-50/70',
  transparent: '',
};

export function Section({
  id,
  className,
  containerClassName,
  spacing = 'md',
  tone = 'white',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24',
        spacingMap[spacing],
        toneMap[tone],
        className
      )}
    >
      <div className={cn('container relative', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
