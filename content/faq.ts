/**
 * The homepage FAQ, as data.
 *
 * Shared by the rendered accordion and the FAQPage JSON-LD so the two can
 * never disagree — Google treats structured data that isn't visible on the
 * page as a policy violation, and the only reliable way to keep them in sync
 * is to render both from the same array.
 *
 * Answers are plain strings, not JSX, for the same reason: JSON-LD needs text.
 */
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'How human-like does the AI sound?',
    a: 'Mango’s voice models are engineered to sound indistinguishable from a person. It pauses, breathes, and reacts naturally to interruptions. No robotic scripts, no awkward hold music. Most callers never realize they’re speaking with AI.',
  },
  {
    // This answer used to promise direct sync with ServiceTitan, Housecall Pro
    // and Jobber — the same three the integrations section labels "coming
    // soon" two screens further up the page. Contradicting yourself on one
    // page costs more trust than the missing integration ever would, so the
    // answer now matches the list in content/integrations.ts.
    q: 'Does it integrate with my existing software?',
    a: 'It works with the phone number you already advertise: you forward your line to Mango, nothing is ported, and nothing is replaced. Bookings reach your team today as calendar invites that land in Google, Outlook or Apple calendars, plus email summaries and written job sheets, and Mango handles WhatsApp and SMS alongside the phone. Direct two-way sync with ServiceTitan, Housecall Pro, Jobber, QuickBooks, Stripe and Zapier is still in build, and we list exactly what is live versus planned on the integrations page rather than implying it already ships.',
  },
  {
    q: 'What happens if the AI can’t answer a question?',
    a: 'If a call gets complex or a customer is upset, Mango smoothly hands off to a designated human fallback number, or takes a detailed message for your team to review. The customer is never left stranded.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Most teams are live within a day. We train Mango on your services, pricing, service area, and emergency protocols, then connect your calendar and phone number. No new hardware, no disruption to your current line.',
  },
  {
    q: 'Can it tell an emergency from routine work?',
    a: 'Absolutely. Triage is core to how Mango works. It recognizes urgent situations like burst pipes, no-heat calls, or electrical hazards and prioritizes dispatch, while quoting and scheduling routine jobs into open slots.',
  },
  {
    q: 'Is my customer data secure?',
    a: 'Your data is encrypted in transit and at rest, access is tightly controlled, and you always own your records. Enterprise plans add SSO, audit logging, and additional compliance controls.',
  },
];
