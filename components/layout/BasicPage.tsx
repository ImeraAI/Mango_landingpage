import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/primitives/Section';
import { SectionHeading } from '@/components/primitives/SectionHeading';

/**
 * Shared shell for the simple standalone pages (About, Careers, Security,
 * Privacy, Terms, Status). Keeps each route file to just its content.
 */
export function BasicPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-white">
        <Section className="pt-32 sm:pt-36">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {children ? (
            <div className="mx-auto mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-slate-600">
              {children}
            </div>
          ) : null}
        </Section>
      </main>
      <Footer />
    </>
  );
}
