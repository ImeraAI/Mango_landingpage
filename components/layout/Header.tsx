'use client';

import * as React from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/primitives/Logo';
import { Button } from '@/components/ui/button';

const NAV = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Platform', href: '/#platform' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Pricing', href: '/#pricing' },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-slate-200/70 shadow-[0_1px_0_0_rgba(15,23,42,0.04)]'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="Mango home">
          <Logo priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100/70 hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <Link href="/demo">
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed inset-x-3 top-3 z-50 rounded-3xl border border-slate-200 bg-white p-5 shadow-lifted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
              <Dialog.Title className="sr-only">Navigation</Dialog.Title>
              <div className="flex items-center justify-between">
                <Logo />
                <Dialog.Close asChild>
                  <button
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>
              <nav className="mt-4 flex flex-col">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href="/signin" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button variant="brand" asChild>
                  <Link href="/demo" onClick={() => setOpen(false)}>
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
