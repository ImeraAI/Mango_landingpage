import * as React from 'react';

/**
 * Emits one JSON-LD block.
 *
 * A server component on purpose: the whole point of structured data is that it
 * is in the HTML a crawler or an LLM fetcher receives without running any
 * JavaScript, which is exactly what the audit found missing.
 *
 * `JSON.stringify` is the only serializer used — no template interpolation —
 * and `<` is escaped so a stray angle bracket in copy can never close the
 * script tag early.
 */
export function JsonLd({
  id,
  schema,
}: {
  id?: string;
  schema: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Content is built from our own constants, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\u003c'),
      }}
    />
  );
}
