/**
 * JSON-LD builders.
 *
 * Deliberate omissions, and why:
 *
 *   • No `aggregateRating` or `Review` nodes. Google's structured data policy
 *     forbids a site marking up reviews of itself, and we have no third-party
 *     rating to point at. The testimonials stay on the page as readable,
 *     attributed text — they just don't claim machine-verifiable status they
 *     don't have. Add real ratings here only when they come from a platform
 *     with a public URL (G2, Capterra, Google Business Profile).
 *
 *   • No `LocalBusiness`, `address` or `telephone` until those are real. An
 *     invented NAP is worse than a missing one: it is the first field a search
 *     engine cross-checks against other sources.
 *
 * Everything below describes something a visitor can actually see on the page,
 * which is the line that separates structured data from spam.
 */
import { SITE_URL, SITE_NAME, LEGAL_NAME, absoluteUrl } from '@/lib/site';
import { FAQS } from '@/content/faq';
import { PLANS } from '@/content/pricing';
import { CONTACT } from '@/content/contact';
import type { BlogPostMeta } from '@/content/blog';

/** Stable @id nodes, so pages can reference the org rather than restate it. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

const DESCRIPTION =
  'Mango is a 24/7 AI receptionist for home service businesses. It answers every call, qualifies the lead, dispatches a technician, books the job, drafts the invoice, and follows up automatically.';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon.png'),
      width: 512,
      height: 512,
    },
    description: DESCRIPTION,
    // Contact details appear here only when content/contact.ts actually holds
    // them. An invented NAP is worse than a missing one — see the note at the
    // top of this file — so the spread is conditional rather than a
    // placeholder waiting to be forgotten.
    ...(contactPoints().length ? { contactPoint: contactPoints() } : {}),
    ...(CONTACT.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: CONTACT.address.street,
            addressLocality: CONTACT.address.locality,
            addressRegion: CONTACT.address.region,
            postalCode: CONTACT.address.postalCode,
            addressCountry: CONTACT.address.country,
          },
        }
      : {}),
    ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
    ...(CONTACT.supportEmail ? { email: CONTACT.supportEmail } : {}),
  };
}

/** One ContactPoint per channel that is real. Empty until they are. */
function contactPoints() {
  const points: Record<string, unknown>[] = [];
  if (CONTACT.supportEmail) {
    points.push({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT.supportEmail,
      availableLanguage: 'English',
      ...(CONTACT.hours ? { hoursAvailable: CONTACT.hours } : {}),
    });
  }
  if (CONTACT.salesEmail) {
    points.push({
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT.salesEmail,
      availableLanguage: 'English',
    });
  }
  if (CONTACT.phone) {
    points.push({
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: CONTACT.phone,
      availableLanguage: 'English',
      ...(CONTACT.hours ? { hoursAvailable: CONTACT.hours } : {}),
    });
  }
  return points;
}

export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absoluteUrl('/contact')}#webpage`,
    url: absoluteUrl('/contact'),
    name: `Contact ${SITE_NAME}`,
    description:
      'Book a walkthrough for your trade, or reach the Mango team directly.',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: DESCRIPTION,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

/**
 * The product itself, with the real plan prices as Offers. These are the most
 * quotable facts on the site — an assistant answering "what does Mango cost?"
 * can lift them straight out of here.
 */
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'AI receptionist and field service dispatch',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: DESCRIPTION,
    publisher: { '@id': ORG_ID },
    audience: {
      '@type': 'Audience',
      audienceType:
        'Plumbing, HVAC, electrical, and fire & safety service businesses',
    },
    featureList: [
      '24/7 AI call answering',
      'Emergency versus routine call triage',
      'Automated job scheduling and calendar sync',
      'Technician dispatch board',
      'Automated invoice drafting',
      'Post-job follow-up and review requests',
    ],
    offers: PLANS.filter((plan) => plan.monthly !== null).map((plan) => ({
      '@type': 'Offer',
      name: `${SITE_NAME} ${plan.name}`,
      description: plan.tagline,
      price: plan.monthly,
      priceCurrency: 'USD',
      url: absoluteUrl('/pricing'),
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.monthly,
        priceCurrency: 'USD',
        unitCode: 'MON',
        // The metered part of the bill, stated rather than buried in a note.
        ...(plan.perCall
          ? {
              description: plan.perCall.included
                ? `${plan.perCall.included} calls included, then $${plan.perCall.rate.toFixed(2)} per call`
                : `$${plan.perCall.rate.toFixed(2)} per call`,
            }
          : {}),
      },
    })),
  };
}

/**
 * Built from the same array the accordion renders, so every marked-up answer
 * is visible on the page — the condition Google actually enforces.
 */
export function faqSchema(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    // The same accordion is rendered on the homepage and on /pricing, so the
    // node is keyed by the page it appears on — two FAQPage entities sharing
    // one @id would be a contradiction, not a duplicate.
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** A plain page whose value is its prose — /about, /security, /privacy. */
export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

export function blogSchema(posts: BlogPostMeta[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    url: absoluteUrl('/blog'),
    name: `${SITE_NAME} blog`,
    description:
      'Practical advice on running the phones at a home service business: intake, after-hours cover, and what missed calls really cost.',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(`/blog/${post.slug}`)}#post`,
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      author: { '@type': 'Organization', name: post.author, '@id': ORG_ID },
    })),
  };
}

export function blogPostingSchema(post: BlogPostMeta & { wordCount?: number }) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.date,
    // Falls back to the publish date so the field is always present, but a
    // revised post reports the revision — which is the only version of this
    // field that carries information.
    dateModified: post.updated ?? post.date,
    articleSection: post.category,
    inLanguage: 'en-US',
    // The byline is the company, which is what the page says. When named
    // authors land, swap this for a Person node with a `sameAs` profile link —
    // the single highest-value E-E-A-T change still available to this site.
    author: { '@type': 'Organization', name: post.author, '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': `${SITE_URL}/blog#blog` },
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.image
      ? {
          image: {
            '@type': 'ImageObject',
            url: absoluteUrl(post.image),
            ...(post.imageAlt ? { caption: post.imageAlt } : {}),
          },
        }
      : {}),
  };
}
