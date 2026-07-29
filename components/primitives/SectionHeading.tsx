import * as React from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div
      className={cn(
        'flex flex-col',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'mt-4 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-slate-900 sm:mt-5 sm:text-4xl md:text-[2.75rem] md:leading-[1.08]',
            isCenter ? 'max-w-3xl' : 'max-w-2xl',
            titleClassName
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'mt-3.5 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg',
              isCenter ? 'max-w-2xl' : 'max-w-xl'
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
