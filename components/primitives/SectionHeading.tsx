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
            'mt-5 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.08]',
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
              'mt-5 text-lg leading-relaxed text-slate-600',
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
