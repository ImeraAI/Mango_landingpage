'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { Faq } from '@/content/faq';

/**
 * Controlled on purpose. Every panel is now mounted (see AccordionContent), so
 * this component has to know which one is open in order to mark the rest
 * `inert` — otherwise a closed answer would still take tab stops and still be
 * read aloud. Radix keeps the roving focus and the aria wiring; we only own
 * the open value.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = React.useState('item-0');

  return (
    <Accordion
      type="single"
      collapsible
      value={open}
      onValueChange={setOpen}
    >
      {faqs.map((faq, i) => {
        const value = `item-${i}`;
        const isOpen = open === value;
        return (
          <AccordionItem key={faq.q} value={value}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent inert={!isOpen}>{faq.a}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
