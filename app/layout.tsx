import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

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

const siteUrl = 'https://mango.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mango: The AI Receptionist for Home Service Businesses',
    template: '%s · Mango',
  },
  description:
    'Mango answers every call, qualifies leads, dispatches technicians, schedules jobs, drafts invoices, and follows up automatically. It is a 24/7 AI front office for plumbing, HVAC, electrical, and fire & safety teams.',
  keywords: [
    'AI receptionist',
    'home services software',
    'HVAC dispatch software',
    'plumbing answering service',
    'AI call answering',
    'field service automation',
    'technician dispatch',
  ],
  authors: [{ name: 'Mango' }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Mango',
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
      <body>{children}</body>
    </html>
  );
}
