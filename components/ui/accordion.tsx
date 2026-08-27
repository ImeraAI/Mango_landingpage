'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border-b border-slate-200/80 last:border-b-0',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between gap-4 py-5 text-left font-display text-lg font-medium text-slate-900 transition-colors hover:text-brand-700 [&[data-state=open]>svg]:rotate-45',
        className
      )}
      {...props}
    >
      {children}
      <Plus className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-brand-600" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

/**
 * Panel content that is always in the served HTML.
 *
 * Radix unmounts closed content outright — `children: isOpen && children` in
 * the collapsible primitive — so a crawler or an LLM fetcher reading the raw
 * HTML saw only whichever panel happened to be open by default. On the FAQ,
 * that meant one answer out of six was machine-readable and the most citable
 * block on the site was invisible.
 *
 * `forceMount` puts every panel in the DOM, but it also forces Radix's own
 * `isOpen` true, which switches off its height animation and its `hidden`
 * attribute. So the collapse is ours: a `grid-template-rows` transition from
 * `0fr` to `1fr`, driven off the `data-state` Radix still sets correctly.
 * The text is present and styled-hidden rather than conditionally rendered,
 * which is both what the crawler needs and what Google's FAQ guidance asks
 * for. Pass `inert` from the caller so a closed panel stays out of the tab
 * order and off a screen reader's path.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    forceMount
    className="grid text-[0.95rem] leading-relaxed text-slate-600 transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
    {...props}
  >
    {/* The overflow clip has to sit on the grid *child*: a `0fr` track only
        collapses the row, it does not hide what overflows it. */}
    <div className="overflow-hidden">
      <div className={cn('pb-5 pr-10', className)}>{children}</div>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
