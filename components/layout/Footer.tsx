import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/primitives/Logo';

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'AI reception', href: '/#platform' },
      { label: 'Scheduling', href: '/#platform' },
      { label: 'Dispatch', href: '/#platform' },
      { label: 'Invoicing', href: '/#platform' },
      { label: 'Follow-ups', href: '/#platform' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Plumbing', href: '/#industries' },
      { label: 'HVAC', href: '/#industries' },
      { label: 'Electrical', href: '/#industries' },
      { label: 'Fire & Safety', href: '/#industries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Customers', href: '/#testimonials' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/demo' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pricing', href: '/#pricing' },
      { label: 'ROI calculator', href: '/#roi' },
      { label: 'Integrations', href: '/#integrations' },
      { label: 'Blog', href: '/blog' },
      { label: 'Security', href: '/security' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              The intelligent front office for modern field service companies.
              Every call answered, booked, and followed up, 24/7.
            </p>
            <Link
              href="/demo"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 Mango AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link
              href="/privacy"
              className="transition-colors hover:text-slate-900"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-slate-900"
            >
              Terms
            </Link>
            <Link
              href="/status"
              className="transition-colors hover:text-slate-900"
            >
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
