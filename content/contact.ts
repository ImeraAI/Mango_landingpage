/**
 * How to reach the company.
 *
 * Every field starts `null` on purpose. The /contact page and the
 * `contactPoint` / `address` nodes in JSON-LD render only what is filled in
 * here, so the site can never publish a support address nobody reads or a
 * phone number nobody answers. Fill a field in and it appears in both places
 * at once — the page, and the structured data a search engine cross-checks.
 *
 * This is the highest-value thing left on the SEO backlog. A product whose
 * entire pitch is "we answer your phone" having no reachable phone number is
 * the first thing a careful reader notices, and `telephone` is a field search
 * engines actively verify against other sources — which is exactly why it is
 * worth leaving blank until it is right.
 */
export type PostalAddress = {
  street: string;
  locality: string;
  /** Two-letter state code for US addresses. */
  region: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2. */
  country: string;
};

export const CONTACT: {
  supportEmail: string | null;
  salesEmail: string | null;
  phone: string | null;
  /** Human-readable hours, e.g. "Mon–Fri, 8am–6pm ET". */
  hours: string | null;
  address: PostalAddress | null;
} = {
  supportEmail: 'info@imeraai.com',
  salesEmail: null,
  phone: null,
  hours: null,
  address: null,
};

/** True once there is at least one direct channel worth publishing. */
export const HAS_DIRECT_CONTACT = Boolean(
  CONTACT.supportEmail || CONTACT.salesEmail || CONTACT.phone
);

/** `tel:` needs the number stripped to digits and a leading +. */
export function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : `+1${digits}`}`;
}
