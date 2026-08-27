/**
 * The competitive set, as data.
 *
 * When a shop owner decides how the phone gets answered, Mango is not being
 * compared against other AI vendors — it is being compared against the three
 * things they are already doing: an answering service, forwarding the line to
 * a cell phone, or putting a person in a chair. That is the comparison this
 * table has to win, so it is the one we publish.
 *
 * Shape note: the options are COLUMNS and the criteria are ROWS, which is the
 * axis a reader scans a package comparison on — you pick a criterion you care
 * about and sweep sideways. The first draft had it the other way round and
 * every cell had to be a paragraph to make sense on its own; transposed, a
 * cell can be three words or a tick, and the whole grid is readable at a
 * glance. Anything that needs a paragraph belongs in the FAQ, not here.
 *
 * Three rules this file exists to enforce:
 *
 *   1. Mango's own cost is read from content/pricing.ts, never retyped. A
 *      price change stays a one-line change (see the note at the top of that
 *      file for the drift this prevents).
 *   2. Every other number is a market range, not a measurement. They are
 *      labelled as such here and again in the footnote the table renders, so
 *      no one downstream — including a model quoting the page — can mistake
 *      an orientation figure for a sourced statistic.
 *   3. The failure mode is a required row, not a nice-to-have. A comparison
 *      that only lists what each option does is marketing; what makes this
 *      one worth citing is that it says how each option breaks, Mango
 *      included — and our own cell is not a tick.
 *
 * Plain strings, no JSX: the same reason as content/faq.ts. This is the kind
 * of block that gets lifted verbatim into an AI Overview or a Perplexity
 * answer, and it should read correctly as text.
 */
import { PLANS } from '@/content/pricing';

export type CallHandlingOption = {
  name: string;
  /** One short line under the name: what happens when the phone rings. */
  how: string;
  /** Marks our own column, so the table can tint it and label it as ours. */
  isMango?: boolean;
};

export const CALL_HANDLING_OPTIONS: CallHandlingOption[] = [
  {
    name: 'Mango AI reception',
    how: 'Answers, books, and dispatches inside the call.',
    isMango: true,
  },
  { name: 'Answering service', how: 'A shared operator takes a message.' },
  { name: 'Call forwarding', how: 'The line rings a cell phone.' },
  { name: 'Hiring a dispatcher', how: 'A person on payroll answers.' },
];

/**
 * `yes` / `partial` / `no` render as an icon. `text` renders as the value —
 * on its own, or beside the icon as the qualifier that keeps a tick honest
 * ("yes, if someone can stop what they're doing" is not the same yes).
 */
export type CellState = 'yes' | 'partial' | 'no';

export type ComparisonCell = {
  state?: CellState;
  text?: string;
  /** Small print under the value. Used by the cost row only. */
  sub?: string;
};

export type ComparisonRow = {
  label: string;
  /** Rows whose values are prose rather than a verdict get roomier styling. */
  emphasis?: 'price' | 'text';
  /** Cells in the same order as CALL_HANDLING_OPTIONS. */
  cells: ComparisonCell[];
};

const STARTER = PLANS.find((p) => p.name === 'Starter');

/** e.g. "$99/mo + $0.50/call" — assembled rather than written out. */
const mangoCost =
  STARTER && STARTER.monthly !== null
    ? `$${STARTER.monthly}/mo${
        STARTER.perCall ? ` + $${STARTER.perCall.rate.toFixed(2)}/call` : ''
      }`
    : 'See pricing';

const mangoOverage = STARTER?.perCall
  ? `$${STARTER.perCall.rate.toFixed(2)} per extra call`
  : 'Per call, at the same rate';

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: 'Typical cost',
    emphasis: 'price',
    cells: [
      { text: mangoCost, sub: 'Our published Starter price' },
      { text: '~$1–$2 / minute', sub: 'Plus a monthly minimum' },
      { text: '$0–$20 / mo', sub: 'The carrier line only' },
      { text: '~$45k–$60k / yr', sub: 'Fully loaded, one seat' },
    ],
  },
  {
    label: 'Hours covered',
    emphasis: 'text',
    cells: [
      { text: 'Nights, weekends, holidays' },
      { text: '24/7, on shared agents' },
      { text: 'Only when someone is free' },
      { text: 'One shift, five days' },
    ],
  },
  {
    label: 'Answers on the first ring',
    cells: [
      { state: 'yes' },
      { state: 'partial', text: 'Holds at peak' },
      { state: 'no', text: 'Voicemail if busy' },
      { state: 'partial', text: 'One call at a time' },
    ],
  },
  {
    label: 'Takes several calls at once',
    cells: [
      { state: 'yes' },
      { state: 'partial', text: 'Queued' },
      { state: 'no' },
      { state: 'no' },
    ],
  },
  {
    label: 'Books the job during the call',
    cells: [
      { state: 'yes' },
      { state: 'no', text: 'Message only' },
      { state: 'partial', text: 'If they can stop' },
      { state: 'yes' },
    ],
  },
  {
    label: 'Dispatches and drafts the invoice',
    cells: [
      { state: 'yes' },
      { state: 'no' },
      { state: 'partial', text: 'Later, by hand' },
      { state: 'partial', text: 'By hand' },
    ],
  },
  {
    label: 'Cost when call volume spikes',
    emphasis: 'text',
    cells: [
      { text: mangoOverage },
      { text: 'Per-minute overage' },
      { text: 'Paid in lost jobs' },
      { text: 'Overtime, or a second hire' },
    ],
  },
  {
    label: 'Failure mode',
    emphasis: 'text',
    cells: [
      { text: 'Hands the call to your fallback number' },
      { text: 'A message, hours after the job was lost' },
      { text: 'Voicemail — they dial the next contractor' },
      { text: 'Everything queues behind one person' },
    ],
  },
];

export const COMPARISON_CAPTION =
  'Mango AI reception compared with an answering service, call forwarding, and hiring a dispatcher — cost, coverage, and failure mode for each.';

/**
 * Rendered under the table, and deliberately unavoidable. Everything except
 * our own price is an orientation range, and the page says so.
 */
export const COMPARISON_FOOTNOTE =
  'Cost figures for answering services, phone lines, and dispatcher salaries are typical U.S. market ranges given for orientation — not survey results. Get quotes for your own market before you decide. Mango’s figure is our published Starter price.';
