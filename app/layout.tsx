import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mango: The AI Receptionist for Home Service Businesses',
    template: '%s · Mango',
  },
  description:
    'Mango answers every call, qualifies leads, dispatches technicians, schedules jobs, drafts invoices, and follows up automatically. It is a 24/7 AI front office for plumbing, HVAC, electrical, and fire & safety teams.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: SITE_NAME,
    locale: 'en_US',
    title: 'Mango: The AI Receptionist for Home Service Businesses',
    description:
      'Never miss another service call. Mango is the 24/7 AI front office that answers, books, dispatches, invoices, and follows up. Built for the trades.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mango: The AI Receptionist for Home Service Businesses',
    description:
      'The 24/7 AI front office for plumbing, HVAC, electrical, and fire & safety teams.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, interTight.variable)}
    >
      <body>
        {/*
          Sitewide identity. Rendered in the layout so every route carries it,
          including the ones that are plain prose. `@id` is a stable URL so the
          per-page schemas can point back at this node instead of restating it.
        */}
        <JsonLd id="ld-organization" schema={organizationSchema()} />
        <JsonLd id="ld-website" schema={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
