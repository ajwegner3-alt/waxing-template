# Phase 1: Foundation - Research

**Researched:** 2026-03-28
**Domain:** Next.js 16 / Tailwind v4 / TypeScript — design token system, font loading, UI primitives, client config
**Confidence:** HIGH

---

## Summary

This phase creates the non-visual foundation every downstream component depends on. The medspa-template in the same workspace provides a verified, working reference implementation of every pattern needed: Tailwind v4 `@theme` tokens, `next/font/google` variable font loading, a typed client config, and a set of UI primitive components. The waxing template should follow the same structural conventions but with a distinct identity — different palette, different fonts, different personality.

The standard approach is fully established by the reference codebase. No third-party component libraries are needed. All design tokens live in `globals.css` under `@theme`, are mirrored to a TypeScript `clientConfig` object for type-safe runtime access, and are consumed by utility classes throughout components.

The key area requiring original judgment is the color palette: exact hex values for the blush cream background, sage green accent, and the honey gold CTA are Claude's discretion per CONTEXT.md, with charcoal `#333333` for text locked by user decision.

**Primary recommendation:** Mirror the medspa-template's structural patterns exactly, then apply the waxing template's distinct tokens. Don't reinvent — translate.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App framework | Same as medspa-template; established in the workspace |
| react | 19.2.3 | UI runtime | Same as medspa-template |
| tailwindcss | ^4 | Utility CSS + design tokens | v4 CSS-first `@theme` system eliminates JS config |
| @tailwindcss/postcss | ^4 | Tailwind v4 PostCSS integration | Required for v4 compilation |
| typescript | ^5 | Type safety | Enforced by workspace pattern |
| motion | ^12.34.3 | Scroll animations, fade-ups | Already in medspa-template; same package |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google | (built into Next.js) | Zero-layout-shift font loading | All font loading in this template |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 `@theme` | CSS Modules or styled-components | `@theme` is already wired up; changing would break the workspace pattern |
| motion (framer-motion) | CSS animations only | motion is already installed and provides the `whileInView` API the CONTEXT.md specifies |
| next/font/google | Google Fonts CDN link tag | next/font eliminates layout shift and external request; always prefer it |

**Installation:**

This project is greenfield — the stack needs to be initialized from scratch. Based on the medspa-template, the install command is:

```bash
npx create-next-app@latest waxing-template --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install motion
```

Then manually configure postcss for Tailwind v4:
```bash
npm install tailwindcss @tailwindcss/postcss
```

---

## Architecture Patterns

### Recommended Project Structure

The medspa-template structure is the proven pattern for this workspace:

```
src/
├── app/
│   ├── globals.css         # @theme tokens + base styles (single source for Tailwind config)
│   ├── layout.tsx          # Font loading via next/font, html/body, schema injection
│   └── page.tsx            # Homepage (not built in this phase)
├── components/
│   └── ui/                 # Phase 1 deliverable: Button, Card, Badge, SectionWrapper, etc.
│       └── index.ts        # Barrel export
├── content/
│   └── client.config.ts    # Single operator-editable file — all business info + colors
└── lib/
    └── types.ts            # All TypeScript interfaces (single source of truth)
```

### Pattern 1: Tailwind v4 `@theme` as Single Token Source

**What:** All brand colors and font references are declared as CSS custom properties inside an `@theme {}` block in `globals.css`. Tailwind v4 reads these and auto-generates utility classes (`bg-brand-primary`, `text-brand-secondary`, etc.).

**When to use:** For every color, font, shadow, or spacing value that is part of the brand identity.

**Example:**
```css
/* Source: medspa-template/src/app/globals.css — verified working pattern */
@import "tailwindcss";

@theme {
  /* --- Brand Colors (waxing template values) --- */
  --color-brand-primary: #D4A574;        /* honey gold — CTA buttons */
  --color-brand-primary-dark: #B8895A;   /* darker gold — hover states */
  --color-brand-primary-light: #E8C49A;  /* light gold — subtle backgrounds */
  --color-brand-secondary: #7A9B76;      /* sage green — secondary accent */
  --color-brand-secondary-light: #96B492;/* lighter sage — hover/inactive */
  --color-brand-dark: #333333;           /* charcoal — body text (LOCKED by user) */
  --color-brand-light: #FAF3EF;          /* blush cream — page background */
  --color-brand-gold: #D4A574;           /* gold — star ratings, badges */
  --color-brand-urgency: #F9EDE6;        /* warm blush — promo banners */

  /* --- Typography --- */
  --font-heading: var(--font-fraunces);
  --font-body: var(--font-plus-jakarta-sans);
}
```

**Critical rule:** Any hex in `@theme` must also appear in `client.config.ts` under `colors`. These are two separate files that must stay in sync manually — TypeScript cannot enforce it automatically.

### Pattern 2: next/font/google Variable Font Loading

**What:** Fraunces (display/heading) and Plus Jakarta Sans (body) are loaded via `next/font/google` in `layout.tsx`. Each font gets a CSS variable name. Those variable names are then referenced in `@theme`.

**When to use:** All web fonts — always, without exception.

**Example:**
```typescript
// Source: medspa-template/src/app/layout.tsx — adapted for waxing template fonts
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Fraunces is a variable font — omit weight array to load full range
  // Axes available: wght (100-900), SOFT (0-100), WONK (0-1), opsz (9-144)
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Applied to <html> element:
// className={`${fraunces.variable} ${plusJakartaSans.variable}`}
```

**The variable names in the `Fraunces({variable: ...})` call MUST match the CSS var references in `@theme`.** A mismatch causes silent failures where headings fall back to serif.

### Pattern 3: Dual-Change Client Config

**What:** `client.config.ts` is the operator file. Every color value in it mirrors a `--color-brand-*` token in `globals.css`. Business info (name, phone, address, hours, bookingUrl) flows from here into layout metadata, schema, and components.

**When to use:** Any time a component needs business-specific data. Never hardcode strings in components.

**Example:**
```typescript
// Source: medspa-template/src/content/client.config.ts — structural pattern
import type { WaxingClientConfig } from "@/lib/types";

export const clientConfig: WaxingClientConfig = {
  name: "Studio Name",
  phone: "(555) 000-0000",
  bookingUrl: "https://...",
  colors: {
    primary: "#D4A574",       // MUST match --color-brand-primary in globals.css
    primaryDark: "#B8895A",   // MUST match --color-brand-primary-dark
    // ...
  },
  // ...
};
```

### Pattern 4: UI Primitive Component Architecture

**What:** Small, single-responsibility components in `src/components/ui/`. Each handles one UI concern (button, badge, section container, phone link). They accept variant props and apply brand token classes.

**When to use:** Every repeating UI element — never write inline Tailwind variant logic in page/section components.

**The polymorphic Button pattern** (renders as `<a>` or `<button>` depending on `href` prop) is used in the medspa-template and should be replicated. It avoids the `<button>` inside `<a>` antipattern and keeps the component API unified.

### Pattern 5: Motion whileInView for Scroll Fade-Ups

**What:** The CONTEXT.md specifies "subtle fade-ups on scroll." The Motion library (installed as `motion`, imported from `motion/react`) provides `whileInView` on `<motion.div>` elements.

**Example:**
```typescript
// Source: motion.dev/docs/react-use-in-view — verified API
import { motion } from "motion/react";

// Fade-up on scroll entry — standard spa/wellness pattern
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-64px" }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>
```

**Note:** Use `viewport={{ once: true }}` for spa/wellness content — repeated animations feel cheap on this type of site.

### Anti-Patterns to Avoid

- **Hardcoding colors in components:** Always use `text-brand-primary`, never `text-[#D4A574]`. One-off hex bypasses the token system.
- **Loading fonts via `<link>` tags in `layout.tsx`:** next/font is strictly better. CDN font links cause layout shift.
- **Storing business data in components:** Every business string goes through `clientConfig`. No hardcoded phone numbers, addresses, or booking URLs.
- **Forgetting the dual-change:** When adjusting a color, update both `globals.css` `@theme` AND `client.config.ts`. Missing one causes runtime mismatch.
- **Using `motion/react` as `framer-motion`:** The package was renamed. Import from `motion/react`, not `framer-motion`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading with no layout shift | Manual `<link>` tags + FOUT handling | `next/font/google` | Built-in preloading, zero FOUT, automatic CSS variable injection |
| Design token management | JS config + CSS repetition | Tailwind v4 `@theme` | Single source generates both utility classes and CSS variables |
| Scroll-triggered fade animations | IntersectionObserver + manual class toggling | `motion/react` `whileInView` | Hardware-accelerated, declarative, handles cleanup automatically |
| Phone number formatting for `tel:` links | Regex in components | `PhoneLink` primitive (pattern from medspa-template) | Centralizes formatting, ensures 48px tap target |
| Noise texture as raster image | PNG/WebP background-image | Inline SVG filter with `feTurbulence` | ~5-10 lines, zero HTTP request, infinitely scalable |
| Organic blob shapes | Complex SVG paths hand-written | SVG blob generator output as inline SVG or CSS | Blob paths are tedious; generators produce clean output |

**Key insight:** Every problem in the UI primitive layer has a solved, lightweight answer in this stack. Custom solutions here create maintenance debt for operators who aren't developers.

---

## Common Pitfalls

### Pitfall 1: Font Variable Name Mismatch

**What goes wrong:** Headings render in a system serif fallback instead of Fraunces.

**Why it happens:** The `variable:` name passed to `Fraunces({...})` in `layout.tsx` doesn't match the `var(--font-fraunces)` reference in `globals.css @theme`.

**How to avoid:** Define the variable name as a constant and reference it in both places, or add a comment linking the two files.

**Warning signs:** Headings look heavier/different in production but not locally (font may load from cache locally).

### Pitfall 2: Color Token Out of Sync

**What goes wrong:** `clientConfig.colors.primary` is `#D4A574` but `globals.css` still has the old hex. Schema.org or Open Graph images use the config value; Tailwind utilities use the CSS value. Visual mismatch in runtime vs. static contexts.

**Why it happens:** The dual-change pattern requires updating two files. It's easy to update one and forget the other.

**How to avoid:** Put a `DUAL-CHANGE WARNING` comment at the top of both files with a field-to-token mapping table (exactly as medspa-template does).

**Warning signs:** `bg-brand-primary` renders a different color than `style={{ backgroundColor: clientConfig.colors.primary }}`.

### Pitfall 3: Fraunces Weight Axis vs. Weight Property

**What goes wrong:** Fraunces is loaded with specific weight values and certain weights don't render with the optical variation expected.

**Why it happens:** Fraunces has a `SOFT` and `WONK` variable axis in addition to `wght`. When loaded as a variable font (no explicit weights), the browser can interpolate across the full axis range. When specific weights are passed, only those instances are available.

**How to avoid:** Load Fraunces without an explicit `weight` array — let it load as a variable font. Set `display: "swap"`.

**Warning signs:** Thin Fraunces headlines (used for display sizes) look identical to 400-weight text.

### Pitfall 4: Motion Import Path

**What goes wrong:** `import { motion } from "framer-motion"` throws a module not found error.

**Why it happens:** The package was renamed from `framer-motion` to `motion` in 2025. The installed package is `motion`, but old tutorials still show `framer-motion`.

**How to avoid:** Always import from `"motion/react"`.

**Warning signs:** TypeScript shows no error (if `framer-motion` is also installed as a transitive dep) but the bundle size is doubled.

### Pitfall 5: Noise Texture Opacity Too High

**What goes wrong:** The blush cream background looks grainy/dirty rather than subtly textured.

**Why it happens:** Noise textures at opacity above 8-10% become visually dominant on light backgrounds.

**How to avoid:** Start at 4% opacity and increase only until just perceptible. The effect should register subconsciously, not consciously.

**Warning signs:** Users describe the background as "dusty" or "unclean."

---

## Code Examples

### Verified: Tailwind v4 @theme Font Token Pattern

```css
/* Source: medspa-template/src/app/globals.css — exact pattern to follow */
@import "tailwindcss";

@theme {
  --font-heading: var(--font-fraunces);
  --font-body: var(--font-plus-jakarta-sans);
}

body {
  font-family: var(--font-body), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), "Georgia", serif;
}
```

### Verified: SectionWrapper Pattern

```tsx
/* Source: medspa-template/src/components/ui/SectionWrapper.tsx */
/* The waxing template needs a new bg variant: "blush" for pink-tinted sections */

type SectionBg = "white" | "light" | "dark" | "primary" | "blush";

const bgClasses: Record<SectionBg, string> = {
  white: "bg-white",
  light: "bg-brand-light",       // blush cream
  dark: "bg-brand-dark text-white",
  primary: "bg-brand-primary text-white",
  blush: "bg-brand-light/60",    // softer blush for alternating sections
};
```

### Verified: Motion whileInView Fade-Up

```tsx
/* Source: motion.dev/docs/react-use-in-view */
import { motion } from "motion/react";

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Verified: Inline SVG Noise Texture

```css
/* Source: css-tricks.com/grainy-gradients — adapted for blush background */
/* Apply as an ::after pseudo-element or background-image on the body */

.noise-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
```

---

## Color System Decisions (Claude's Discretion)

Per CONTEXT.md, the following values are at Claude's discretion. Based on the established palette direction (warm honey gold CTA, blush cream background, sage green secondary, charcoal text), the recommended values are:

| Token | Recommended Hex | Rationale |
|-------|-----------------|-----------|
| `--color-brand-primary` | `#D4A574` | Warm honey gold — the specified CTA color from CONTEXT.md |
| `--color-brand-primary-dark` | `#B8895A` | ~15% darker for hover, maintains warm undertone |
| `--color-brand-primary-light` | `#EDD4B2` | ~20% lighter for subtle tints, button ghost states |
| `--color-brand-secondary` | `#7A9E76` | Muted sage green — earthy, not minty or olive |
| `--color-brand-secondary-light` | `#96B592` | Lighter sage for inactive/hover states |
| `--color-brand-dark` | `#333333` | Locked by user decision in CONTEXT.md |
| `--color-brand-light` | `#FAF3EF` | Blush cream — warmer/pinker than medspa-template's #FAFAF8 |
| `--color-brand-gold` | `#D4A574` | Same as primary — gold IS the brand in this context |
| `--color-brand-urgency` | `#F8EAE1` | Soft peach-blush for promo banners, warmer than gold |

**Shadow recommendation (Claude's discretion):** Soft, airy shadows appropriate for floating cards:
```css
/* Card shadow — warm-tinted to complement the blush palette */
box-shadow: 0 4px 24px rgba(180, 120, 80, 0.10), 0 1px 4px rgba(180, 120, 80, 0.06);
```

**Animation timing (Claude's discretion):**
- Fade-up duration: `0.5s`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — smooth deceleration, not spring
- Stagger delay for card grids: `0.08s` per item

**Noise texture opacity (Claude's discretion):** `0.05` (5%) — perceptible as texture but not distracting on the light blush background.

---

## TypeScript Interfaces Required (FOUND-05)

The waxing template needs these interfaces in `src/lib/types.ts`. Types are adapted from the medspa-template but simplified for a waxing studio (no medical compliance fields, no before/after gallery, simpler service structure):

| Interface | Purpose | Delta from medspa-template |
|-----------|---------|---------------------------|
| `WaxingClientConfig` | Config shape for `client.config.ts` | Remove medical fields; add `waxingSpecialties` |
| `Service` | Individual service (wax type + body area) | Simpler than `Treatment` — no clinical detail |
| `ServiceCategory` | Category grouping (Body, Face, Brows & Lashes) | Same shape as `TreatmentCategory` |
| `Staff` | Esthetician profile | Simplified `Provider` — no medical credentials |
| `FAQ` | Q&A pair | Identical to medspa-template |
| `ServiceArea` | City/neighborhood landing page | Same as medspa-template |
| `Testimonial` | Client review | Identical to medspa-template |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` JS-based theme | `@theme {}` in CSS | Tailwind v4 (2025) | No JS config file needed; tokens are CSS variables |
| `framer-motion` package import | `motion` package, import from `motion/react` | 2025 | Old import path fails; new path required |
| Google Fonts `<link>` in `<head>` | `next/font/google` | Next.js 13+ | Eliminates layout shift; fonts hosted by Vercel |
| Fixed font weight loading | Variable font (no explicit weights) for Fraunces | Always available | Full axis range accessible; smaller bundle |

**Deprecated/outdated:**
- `tailwind.config.js` with `theme.extend.colors`: Still works in v4 but is the legacy path. New projects should use `@theme` in CSS.
- `import { motion } from "framer-motion"`: Package renamed. Use `motion` npm package + `motion/react` import.

---

## Open Questions

1. **Next.js version for waxing-template**
   - What we know: medspa-template uses 16.1.6; the additional_context says 16.2.1
   - What's unclear: Whether to use 16.1.6 (proven in workspace) or 16.2.1 (newer)
   - Recommendation: Use `create-next-app` with latest to get the freshest stable version; the version difference is minor

2. **Icon strategy**
   - What we know: CONTEXT.md marks icon style as Claude's discretion (inline SVGs, Lucide, or custom)
   - What's unclear: Whether Lucide React is already installed or should be added
   - Recommendation: Inline SVGs for the ~8 icons needed in Phase 1 primitives (phone, calendar, star, check). Add Lucide only if downstream phases need many more icons — don't add a dependency for 8 icons.

3. **Blob shape implementation for organic backgrounds**
   - What we know: CONTEXT.md specifies abstract soft organic shapes (blobs/curves) not botanical
   - What's unclear: Whether blobs are decorative `<div>` elements or SVG elements
   - Recommendation: Inline SVG for hero blobs (scalable, no HTTP request); CSS radial-gradient for simpler soft-edge shapes in section backgrounds

---

## Sources

### Primary (HIGH confidence)
- Medspa-template source files (directly read in this session):
  - `src/app/globals.css` — Tailwind v4 `@theme` pattern, dual-change setup
  - `src/lib/types.ts` — TypeScript interface structure for all content types
  - `src/app/layout.tsx` — next/font loading pattern
  - `src/content/client.config.ts` — client config structure and dual-change convention
  - `src/components/ui/Button.tsx` — polymorphic button pattern
  - `src/components/ui/SectionWrapper.tsx` — section container pattern
  - `src/components/ui/Badge.tsx`, `StarRating.tsx`, `PhoneLink.tsx`, `BookingLink.tsx`
- Tailwind CSS official docs: https://tailwindcss.com/docs/theme (theme variables)
- Motion official docs: https://motion.dev/docs/react-use-in-view

### Secondary (MEDIUM confidence)
- WebSearch: Fraunces variable font axes (SOFT, WONK, opsz, wght) — confirmed by Google Fonts specimen page
- WebSearch: Motion v12 import path change to `motion/react` — confirmed by motion.dev docs
- WebSearch: SVG `feTurbulence` noise texture technique — confirmed by CSS-Tricks

### Tertiary (LOW confidence)
- WebSearch: CSS `clip-path: shape()` for blob shapes — browser support noted as "all major browsers as of February 2026" but not independently verified

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — directly verified from working medspa-template
- Architecture patterns: HIGH — directly read from medspa-template source
- Color system values: MEDIUM — recommended values are judgment calls within the locked constraints; exact hues are discretionary
- Pitfalls: HIGH — all four major pitfalls confirmed from medspa-template dual-change pattern and Motion package rename
- Motion animation API: HIGH — verified against motion.dev official docs

**Research date:** 2026-03-28
**Valid until:** 2026-06-01 (stable stack; Tailwind v4 and Motion v12 are not fast-moving at this point)
