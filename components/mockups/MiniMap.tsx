'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * An abstract, on-brand dispatch map: soft blocks, a couple of roads, a
 * dashed emerald route, a destination marker, and a technician van that
 * glides along the route. Intentionally stylized, not cartographic.
 *
 * The moving marker uses SVG <animateMotion> so it shares the exact
 * coordinate system of the route path. No offset-path/pixel mismatch.
 */
const ROUTE = 'M66 205 L66 112 L262 112 L262 60 L330 60';

export function MiniMap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50',
        className
      )}
    >
      <svg
        viewBox="0 0 400 260"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* land blocks */}
        <g fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5">
          <rect x="18" y="20" width="120" height="80" rx="8" />
          <rect x="160" y="14" width="96" height="60" rx="8" />
          <rect x="280" y="24" width="104" height="92" rx="8" />
          <rect x="20" y="130" width="90" height="110" rx="8" />
          <rect x="132" y="100" width="120" height="70" rx="8" />
          <rect x="132" y="192" width="120" height="52" rx="8" />
          <rect x="276" y="140" width="108" height="104" rx="8" />
        </g>

        {/* roads */}
        <g stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" opacity="0.7">
          <path d="M0 112 H400" />
          <path d="M262 0 V260" />
          <path d="M118 0 V260" />
        </g>
        <g
          stroke="#f1f5f9"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
        >
          <path d="M0 112 H400" />
          <path d="M262 0 V260" />
        </g>

        {/* route */}
        <motion.path
          id="imera-route"
          d={ROUTE}
          fill="none"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 7"
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />

        {/* destination marker */}
        <g transform="translate(330 60)">
          <circle r="9" fill="#059669" fillOpacity="0.14" />
          <circle r="4" fill="#059669" />
        </g>

        {/* technician van + pulsing halo, travelling the route */}
        <g>
          <circle r="10" fill="#059669" fillOpacity="0.18">
            <animate
              attributeName="r"
              values="6;12;6"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              values="0.28;0;0.28"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              keyPoints="0;1;0"
              keyTimes="0;0.5;1"
              calcMode="linear"
              path={ROUTE}
            />
          </circle>
          <g>
            <circle r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              keyPoints="0;1;0"
              keyTimes="0;0.5;1"
              calcMode="linear"
              path={ROUTE}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
