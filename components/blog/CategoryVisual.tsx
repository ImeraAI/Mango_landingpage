import {
  CalendarCheck,
  LineChart,
  MessageSquareHeart,
  PhoneCall,
  Route,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogCategory } from '@/content/blog';

/**
 * The cover a post gets when nobody uploaded a picture — so the grid on /blog
 * is never a row of cards where some have an image and some have a hole.
 *
 * One look per category, built out of the site's own palette rather than
 * stock photography: an emerald-anchored gradient tinted toward the category's
 * own hue, a soft wash, two faint rings, and a floating tile with the
 * category's icon. Light mode only, like the rest of the site.
 */

type CategoryStyle = {
  icon: LucideIcon;
  /** The card background: gradient plus the ring colour that sits on it. */
  surface: string;
  ring: string;
  /** The icon tile and the icon inside it. */
  iconColor: string;
  /** The pill on the card and on the post header. */
  pill: string;
  /** The filter chip when it is the active one. */
  chipActive: string;
};

/**
 * Keyed by the exact category strings in BLOG_CATEGORIES. Adding a category
 * there without adding it here still renders — it falls back to NEUTRAL — so a
 * new category can never produce a blank cover.
 */
const STYLES: Record<BlogCategory, CategoryStyle> = {
  'Missed calls': {
    icon: PhoneCall,
    surface: 'from-brand-100 via-brand-50 to-white',
    ring: 'border-brand-200/60',
    iconColor: 'text-brand-600',
    pill: 'bg-brand-100 text-brand-800',
    chipActive: 'bg-brand-600 text-white',
  },
  'Booking and scheduling': {
    icon: CalendarCheck,
    surface: 'from-sky-100 via-sky-50 to-white',
    ring: 'border-sky-200/60',
    iconColor: 'text-sky-600',
    pill: 'bg-sky-100 text-sky-800',
    chipActive: 'bg-sky-600 text-white',
  },
  'Running the business': {
    icon: LineChart,
    surface: 'from-amber-100 via-amber-50 to-white',
    ring: 'border-amber-200/60',
    iconColor: 'text-amber-600',
    pill: 'bg-amber-100 text-amber-800',
    chipActive: 'bg-amber-600 text-white',
  },
  Operations: {
    icon: Route,
    surface: 'from-indigo-100 via-indigo-50 to-white',
    ring: 'border-indigo-200/60',
    iconColor: 'text-indigo-600',
    pill: 'bg-indigo-100 text-indigo-800',
    chipActive: 'bg-indigo-600 text-white',
  },
  'On the tools': {
    icon: Wrench,
    surface: 'from-slate-200 via-slate-100 to-white',
    ring: 'border-slate-300/60',
    iconColor: 'text-slate-600',
    pill: 'bg-slate-200 text-slate-800',
    chipActive: 'bg-slate-800 text-white',
  },
  'Customer experience': {
    icon: MessageSquareHeart,
    surface: 'from-rose-100 via-rose-50 to-white',
    ring: 'border-rose-200/60',
    iconColor: 'text-rose-600',
    pill: 'bg-rose-100 text-rose-800',
    chipActive: 'bg-rose-600 text-white',
  },
  Product: {
    icon: Sparkles,
    surface: 'from-violet-100 via-violet-50 to-white',
    ring: 'border-violet-200/60',
    iconColor: 'text-violet-600',
    pill: 'bg-violet-100 text-violet-800',
    chipActive: 'bg-violet-600 text-white',
  },
};

const NEUTRAL: CategoryStyle = {
  icon: Sparkles,
  surface: 'from-slate-100 via-slate-50 to-white',
  ring: 'border-slate-200/70',
  iconColor: 'text-slate-500',
  pill: 'bg-slate-100 text-slate-700',
  chipActive: 'bg-slate-900 text-white',
};

/** Never throws on an unknown category — a missing entry falls back. */
export function categoryStyle(category: string): CategoryStyle {
  return STYLES[category as BlogCategory] ?? NEUTRAL;
}

/** The 'All' chip has no category of its own, so it borrows the brand green. */
export const ALL_CHIP_ACTIVE = 'bg-brand-600 text-white';

/**
 * The generated cover. Sized entirely by the caller's className (the same
 * aspect-ratio classes an uploaded banner gets), so the two are interchangeable
 * and every card in a row is the same height.
 */
export function CategoryVisual({
  category,
  className,
  size = 'sm',
}: {
  category: string;
  className?: string;
  /**
   * How big the icon tile is. Tile and glyph scale together — growing one
   * without the other leaves a small icon marooned in a large card.
   */
  size?: 'sm' | 'lg';
}) {
  const style = categoryStyle(category);
  const Icon = style.icon;

  return (
    <div
      // Decorative: the category is already written on the card as a pill, so
      // announcing it again here would just be noise.
      aria-hidden
      className={cn(
        'relative isolate overflow-hidden bg-gradient-to-br',
        style.surface,
        className
      )}
    >
      {/* Soft wash toward the top-left, so the gradient does not read as a flat band. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(255,255,255,0.75),transparent_60%)]" />

      {/* Two faint concentric rings, off-centre, for a little depth. */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border',
          style.ring
        )}
      />
      <div
        className={cn(
          'absolute left-1/2 top-1/2 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border',
          style.ring
        )}
      />

      <div className="absolute inset-0 grid place-items-center">
        <span
          className={cn(
            'grid place-items-center bg-white/80 shadow-sm ring-1 ring-white/60 backdrop-blur-sm',
            size === 'lg' ? 'h-24 w-24 rounded-[1.75rem]' : 'h-16 w-16 rounded-2xl'
          )}
        >
          <Icon
            className={cn(
              size === 'lg' ? 'h-11 w-11' : 'h-7 w-7',
              style.iconColor
            )}
            strokeWidth={1.5}
          />
        </span>
      </div>
    </div>
  );
}

/** The coloured category pill, used on cards and at the top of a post. */
export function CategoryPill({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const style = categoryStyle(category);
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        style.pill,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {category}
    </span>
  );
}
