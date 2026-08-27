import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';
import { Button } from '@/components/ui/button';
import {
  CALL_HANDLING_OPTIONS,
  COMPARISON_CAPTION,
  COMPARISON_FOOTNOTE,
  COMPARISON_ROWS,
  type CellState,
  type ComparisonCell,
} from '@/content/comparison';

/**
 * The alternatives table.
 *
 * A real <table> with a <caption> and scoped headers, rendered on the server —
 * not a grid of divs, and not a client component. Three reasons, in order of
 * how much they cost to get wrong:
 *
 *   • A table is the shape assistants lift cleanly. Row/column semantics are
 *     what let an extractor say "Mango: $99/mo; answering service: ~$1–$2 per
 *     minute" without re-deriving the association from visual position. Divs
 *     styled to look like a table read as a wall of fragments.
 *   • It has to be in the HTML. No 'use client', no animation on the rows —
 *     the whole comparison is present in the first response, which is all a
 *     crawler that doesn't execute JS ever sees.
 *   • Screen readers get the same wiring for free.
 *
 * The Mango column is tinted end to end rather than highlighted cell by cell,
 * so the eye can run down one band instead of hunting for the good news. The
 * criterion column is sticky: on a phone the grid scrolls sideways, and a tick
 * with no visible row label in front of it is worse than no tick at all.
 *
 * Narrow screens scroll rather than re-flowing into a card stack. A stack
 * would mean two copies of every claim in the DOM, and the duplicate is
 * exactly the kind of thing that gets quoted back at you out of context.
 */

/** Ticks and crosses carry meaning here, so they are labelled, not decorative. */
const STATE_LABEL: Record<CellState, string> = {
  yes: 'Yes',
  partial: 'Partly',
  no: 'No',
};

/**
 * One solid disc per verdict, white glyph, same size and weight across all
 * three — a traffic light, read by colour before it is read by shape. The
 * first pass gave the yes a filled disc and left the other two as pale tinted
 * outlines, which made every "no" look like a rendering artefact rather than
 * a deliberate answer. A comparison is only trustworthy if the bad news is
 * drawn as confidently as the good news.
 */
function Verdict({ state }: { state: CellState }) {
  const Icon = state === 'yes' ? Check : state === 'no' ? X : Minus;
  return (
    <span
      className={cn(
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white shadow-xs',
        state === 'yes' && 'bg-brand-600',
        state === 'partial' && 'bg-amber-400',
        state === 'no' && 'bg-slate-300'
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={3.25} />
      <span className="sr-only">{STATE_LABEL[state]}</span>
    </span>
  );
}

function Cell({
  cell,
  emphasis,
  isMango,
}: {
  cell: ComparisonCell;
  emphasis?: 'price' | 'text';
  isMango?: boolean;
}) {
  if (emphasis === 'price') {
    return (
      <>
        <span
          className={cn(
            'block text-center font-display text-[0.95rem] font-semibold leading-snug tracking-tight',
            isMango ? 'text-brand-700' : 'text-slate-900'
          )}
        >
          {cell.text}
        </span>
        {cell.sub ? (
          <span className="mt-1 block text-center text-xs leading-snug text-slate-500">
            {cell.sub}
          </span>
        ) : null}
      </>
    );
  }

  if (!cell.state) {
    return (
      <span
        className={cn(
          'block text-center text-sm leading-snug',
          isMango ? 'font-medium text-brand-800' : 'text-slate-600'
        )}
      >
        {cell.text}
      </span>
    );
  }

  /* Icon over caption, both centred, so the verdict column reads as a single
     vertical run of discs. Side-by-side put every disc at a different x
     depending on how long its qualifier was, which is what made the icons
     look scattered. */
  return (
    <span className="flex flex-col items-center gap-1.5 text-center">
      <Verdict state={cell.state} />
      {cell.text ? (
        <span className="text-xs leading-snug text-slate-500">{cell.text}</span>
      ) : null}
    </span>
  );
}

export function Comparison() {
  return (
    <Section id="alternatives" tone="muted">
      <SectionHeading
        eyebrow="Alternatives"
        title={
          <>
            Four ways to answer the phone.{' '}
            <span className="text-brand-600">One of them books the job.</span>
          </>
        }
        description="Mango isn’t really competing with other AI. It’s competing with the answering service you’re paying now, the cell phone you forward to, and the dispatcher you’ve been meaning to hire."
      />

      <div className="mx-auto mt-12 max-w-6xl">
        {/* White card on the muted surface, the same way the pricing cards sit
            on theirs — it keeps the grid from dissolving into the section
            background at the edges of a sideways scroll. */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-2 shadow-card sm:p-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-separate border-spacing-0 text-left">
              <caption className="sr-only">{COMPARISON_CAPTION}</caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-[19%] bg-white px-4 pb-4 pt-5 align-bottom"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Compare
                    </span>
                  </th>
                  {CALL_HANDLING_OPTIONS.map((option) => (
                    <th
                      key={option.name}
                      scope="col"
                      className={cn(
                        'w-[20.25%] px-4 pb-4 text-center align-bottom',
                        option.isMango
                          ? 'rounded-t-2xl bg-brand-50/70 pt-4'
                          : 'pt-5'
                      )}
                    >
                      {option.isMango ? (
                        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                          <Sparkles className="h-3 w-3" />
                          Recommended
                        </span>
                      ) : null}
                      <span
                        className={cn(
                          'block font-display text-[0.95rem] font-semibold leading-snug tracking-tight',
                          option.isMango ? 'text-brand-700' : 'text-slate-900'
                        )}
                      >
                        {option.name}
                      </span>
                      <span className="mt-1 block text-xs font-normal leading-snug text-slate-500">
                        {option.how}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, rowIndex) => {
                  const isLast = rowIndex === COMPARISON_ROWS.length - 1;
                  /* Zebra striping does the work cell borders used to: it
                     groups a row across five columns without adding four
                     vertical rules the eye has to climb over. */
                  const striped = rowIndex % 2 === 1;
                  return (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className={cn(
                          'sticky left-0 z-10 border-t border-slate-100 px-4 py-4 text-left align-middle text-sm font-medium text-slate-600',
                          striped ? 'bg-slate-50/80' : 'bg-white',
                          isLast && 'rounded-bl-2xl'
                        )}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, i) => {
                        const option = CALL_HANDLING_OPTIONS[i];
                        const lastColumn = i === row.cells.length - 1;
                        return (
                          <td
                            key={option.name}
                            className={cn(
                              'border-t border-slate-100 px-4 py-4 text-center align-middle',
                              option.isMango
                                ? 'bg-brand-50/70'
                                : striped && 'bg-slate-50/80',
                              isLast && option.isMango && 'rounded-b-2xl',
                              isLast && lastColumn && 'rounded-br-2xl'
                            )}
                          >
                            <Cell
                              cell={cell}
                              emphasis={row.emphasis}
                              isMango={option.isMango}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* The key. Ticks that mean three different things need one. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Verdict state="yes" />
            Included
          </span>
          <span className="flex items-center gap-1.5">
            <Verdict state="partial" />
            Only sometimes
          </span>
          <span className="flex items-center gap-1.5">
            <Verdict state="no" />
            Not possible
          </span>
          <span className="md:hidden">Scroll sideways to see all four.</span>
        </div>

        {/*
          The caveat sits with the table, not in a legal footer. Every number
          in the cost row except ours is a market range, and a reader — or a
          model quoting this page — should hit that sentence in the same
          glance as the figures.
        */}
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500">
          {COMPARISON_FOOTNOTE}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="brand" size="lg" asChild>
            <Link href="/demo">
              See it answer a live call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/pricing">Compare plans</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
