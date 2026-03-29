# Phase 4: Homepage - Research

**Researched:** 2026-03-29
**Domain:** Next.js App Router homepage — composing section components from the established waxing template stack
**Confidence:** HIGH

---

## Summary

Phase 4 replaces the placeholder `src/app/page.tsx` (currently the Next.js default scaffold) with the full homepage. Every infrastructure dependency is already in place from Phases 1–3: the design token system, UI primitives, layout chrome, and the complete data layer. This phase is entirely a composition and component-authoring task — no new libraries, no new infrastructure.

The CONTEXT.md section flow is locked: Hero → Trust Bar → What to Expect → First-Timer Spotlight → Services Preview → Testimonials → Esthetician Intro → Final CTA. Each section maps to a dedicated component in `src/components/homepage/`. The homepage `page.tsx` is a Server Component that imports those section components and composes them in order.

The critical implementation concern is the hero: the Header is `position: fixed; transparent over hero` — the hero must be full-viewport-height (`min-h-screen`) with a dark or rich image background so the white header text reads. The `pt-16 lg:pt-20` offset is already applied to `<main>` in `layout.tsx`, which means the hero must handle its own top offset or use negative margin to extend under the header.

**Primary recommendation:** Build all homepage section components as Server Components (no "use client") except where scroll/animation interactivity requires it. Use `FadeUp` from `@/components/ui` for entrance animations. Import all data from `@/content/` — never hardcode business values.

---

## Standard Stack

### Core (all already installed — zero new packages needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | App Router, `page.tsx`, `generateMetadata`, `next/image` | Project stack |
| react | 19.2.4 | Component authoring | Project stack |
| motion | ^12.38.0 | FadeUp entrance animations on scroll | Already used in Phase 1 FadeUp.tsx |
| tailwindcss | ^4 | @theme tokens, utility classes | Project stack |

### Supporting — available from prior phases

| Import path | What it provides | Phase origin |
|-------------|-----------------|--------------|
| `@/components/ui` — `Button`, `BookingLink`, `Badge`, `SectionWrapper`, `FadeUp`, `StarRating` | Core UI primitives | Phase 1 |
| `@/components/ui` — `PhoneLink` | Click-to-call link | Phase 1 |
| `@/content/client.config` — `clientConfig` | All business data: name, phone, reviewCount, reviewAverage, yearsInBusiness, bookingUrl, waxFormula | Phase 1 |
| `@/content/services/index` — `serviceCategories`, `getServiceBySlug` | 4 category cards for Services Preview; First-Timer Package data | Phase 3 |
| `@/content/services/packages` — `PACKAGE_SLUGS` | `firstTimer` slug for spotlight lookup | Phase 3 |
| `@/content/staff` — `staff` | Maya Chen profile for Esthetician Intro | Phase 3 |
| `@/content/testimonials` — `testimonials` | 3-card static grid | Phase 3 |
| `@/lib/metadata` — `generatePageMetadata` | Homepage `<head>` metadata | Phase 1 |
| `@/lib/schema` — `generateWaxingBusinessSchema` | Already injected via layout.tsx; homepage may add WebPage schema | Phase 1 |

**Installation:**
```bash
# No installation needed — all dependencies exist
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── page.tsx                        # Server Component — composes homepage sections
└── components/
    └── homepage/
        ├── HomepageHero.tsx             # "use client" — scroll parallax / full-viewport hero
        ├── TrustBar.tsx                 # Server Component — 4-stat horizontal bar
        ├── WhatToExpect.tsx             # Server Component — icon card grid
        ├── FirstTimerSpotlight.tsx      # Server Component — full-width package section
        ├── ServicesPreview.tsx          # Server Component — 4 category cards
        ├── TestimonialsGrid.tsx         # Server Component — static 3-card grid
        ├── EstheticianIntro.tsx         # Server Component — photo + bio split
        ├── FinalCTA.tsx                 # Server Component — booking bar section
        └── index.ts                     # Barrel export
```

**Why a `homepage/` folder:** Section components are homepage-specific and will not be reused on other pages. Placing them in `components/homepage/` rather than `components/ui/` or `components/layout/` keeps the component namespace clean and signals intent.

---

### Pattern 1: Server Component default

Every homepage section should be a Server Component (`no "use client"` directive) unless it needs:
- Browser events (onClick, onScroll)
- React state
- motion/react hooks (`useScroll`, `useMotionValueEvent`)

`FadeUp` is "use client" already — wrap static server content in it freely. The wrapping pattern is safe and established.

**Example — section composed from server + client primitives:**
```tsx
// src/components/homepage/TrustBar.tsx
// Server Component — no "use client"
import { SectionWrapper } from "@/components/ui";
import { clientConfig } from "@/content/client.config";

export function TrustBar() {
  const stats = [
    { value: `${clientConfig.reviewAverage}★`, label: "Google Rating" },
    { value: `${clientConfig.yearsInBusiness}`, label: "Years in Business" },
    { value: `${clientConfig.reviewCount}+`, label: "Happy Clients" },
    { value: "Licensed", label: "Esthetician" },
  ];
  return (
    <SectionWrapper bg="dark" padding="sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-heading text-3xl font-semibold text-brand-gold">{s.value}</p>
            <p className="text-white/70 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

### Pattern 2: Hero with transparent header accommodation

The Header is `position: fixed` and transparent over the hero. `<main>` in layout.tsx has `pt-16 lg:pt-20` — this pushes the hero DOWN by the header height.

**The hero must undo this offset to fill the viewport edge-to-edge:**
```tsx
// Negate the main padding so the hero starts at the very top of the viewport
// -mt-16 on mobile, -mt-20 on desktop matches the pt values in layout.tsx
<section className="relative min-h-screen -mt-16 lg:-mt-20">
  {/* full-bleed image or color background here */}
  {/* hero content with pt-16 lg:pt-20 added back for text positioning */}
</section>
```

This is the established pattern for transparent-header + hero pages. Without it, there is a visible gap between the viewport top and the hero image.

### Pattern 3: Smooth-scroll anchor for "First-Timer Guide" CTA

The secondary hero CTA `First-Timer Guide` must smooth-scroll to the `#what-to-expect` section. Since `globals.css` sets `html { scroll-behavior: smooth; }`, a plain anchor href is sufficient — no JavaScript needed.

```tsx
// Hero secondary CTA — no onClick, just a hash href
<Button variant="outline" href="#what-to-expect">
  First-Timer Guide
</Button>

// WhatToExpect section anchor target
<SectionWrapper id="what-to-expect" bg="light" padding="lg">
  ...
</SectionWrapper>
```

`SectionWrapper` already accepts an `id` prop — confirmed in the component source.

### Pattern 4: page.tsx as thin composer

`page.tsx` should contain no layout logic — it imports sections and lists them:

```tsx
// src/app/page.tsx — Server Component
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import {
  HomepageHero,
  TrustBar,
  WhatToExpect,
  FirstTimerSpotlight,
  ServicesPreview,
  TestimonialsGrid,
  EstheticianIntro,
  FinalCTA,
} from "@/components/homepage";

export const metadata: Metadata = generatePageMetadata({
  title: "Waxing Studio in Omaha | Honey & Bloom Wax Studio",
  description: "First-timer friendly waxing studio in Omaha. Honey-based hard wax. 4.9 stars, 247+ reviews. Book the First-Timer Package online today.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomepageHero />
      <TrustBar />
      <WhatToExpect />
      <FirstTimerSpotlight />
      <ServicesPreview />
      <TestimonialsGrid />
      <EstheticianIntro />
      <FinalCTA />
    </>
  );
}
```

### Pattern 5: Section background rhythm (Claude's discretion — recommendation)

Alternating backgrounds create visual separation without dividers. Recommended rhythm using SectionWrapper bg variants:

| Section | bg variant | Hex / Effect |
|---------|-----------|-------------|
| HomepageHero | custom (image overlay) | dark forest green or rich photo |
| TrustBar | `dark` | #333333 charcoal — sharp contrast after hero |
| WhatToExpect | `light` | #FAF3EF cream — soft reset |
| FirstTimerSpotlight | `blush` | #FAF3EF at 60% — slightly warmer than light |
| ServicesPreview | `white` | #FFFFFF — clean, grid reads clearly |
| TestimonialsGrid | `light` | #FAF3EF — warm again before final push |
| EstheticianIntro | `white` | #FFFFFF — neutral for photo split layout |
| FinalCTA | `primary` | #D4A574 honey gold — warm, high-energy close |

The `dark` Trust Bar immediately after the hero creates a strong "anchor" moment — the visitor lands, sees the hero, immediately sees the 4.9 stars and 247+ clients. This is the highest-converting placement for trust signals.

The `primary` (honey gold) Final CTA creates a warm, inviting close — it reads as positive energy, not pressured. On dark CTA sections, use `text-white` and white button variants.

### Anti-Patterns to Avoid

- **"use client" on section components that don't need it.** FadeUp is already client-side. The section components themselves can be Server Components; FadeUp wraps their contents client-side. Do not escalate the whole section to client unnecessarily.
- **Hardcoded business data.** All star ratings, review counts, years in business, phone numbers, names, and prices must come from `clientConfig` or `content/` files. Never inline "4.9" or "$70" as literal strings in component JSX.
- **Not negating the main padding in the hero.** Without `-mt-16 lg:-mt-20`, the hero will have a visible gap at the top — the transparent header will float over empty cream background instead of a photo.
- **Carousels or sliders on testimonials.** The CONTEXT.md decision is a static 3-card grid — no carousel. Carousels require "use client", have accessibility issues, and hide reviews from visitors who don't swipe.
- **Putting `id="what-to-expect"` on the wrong element.** The `id` must be on the `SectionWrapper`, not a div inside it, or the scroll position will be wrong (content will scroll past the section heading).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll to anchor | JavaScript scroll handler | `html { scroll-behavior: smooth }` already in globals.css + plain `href="#what-to-expect"` | Already handled at CSS level |
| Star rating display | Custom SVG star component | `StarRating` from `@/components/ui` | Already built in Phase 1, supports half-stars, showValue, reviewCount |
| Book Now button | New anchor tag | `BookingLink` from `@/components/ui` with `variant="cta"` | Already built, reads bookingUrl from clientConfig, correct tap target |
| Trust badge in hero | Custom pill component | `Badge` from `@/components/ui` with `variant="trust"` | Already built |
| Fade-in animations | New motion.div setup | `FadeUp` from `@/components/ui` with `delay` prop | Already built with correct easing |
| Section padding/max-width | Inline div className repetition | `SectionWrapper` from `@/components/ui` | Already built, has 5 bg variants + id prop |
| Page metadata | Manual `<head>` tags | `generatePageMetadata` from `@/lib/metadata` | Already built, generates OG + Twitter + canonical |
| Service category data | Props / constants in component | `serviceCategories` from `@/content/services` | Phase 3 data layer — already populated |
| First-Timer Package data | Hardcoded price/name | `getServiceBySlug(PACKAGE_SLUGS.firstTimer)` | Phase 3 data layer |
| Staff bio | Props / hardcoded text | `staff[0]` from `@/content/staff` | Phase 3 data layer — Maya Chen's full profile |

**Key insight:** Every display primitive and every piece of content already exists. Phase 4 is composition, not construction.

---

## Common Pitfalls

### Pitfall 1: Hero gap due to main padding
**What goes wrong:** The hero renders with a visible cream gap at the top (equal to header height) because `layout.tsx` applies `pt-16 lg:pt-20` to `<main>` to prevent content from starting under the fixed header. The hero is the one page section that should visually start at the viewport top edge (under the transparent header).
**Why it happens:** The pt offset is correct for interior sections but the hero intentionally extends under the transparent header.
**How to avoid:** Apply `-mt-16 lg:-mt-20` to the hero section element and add `pt-16 lg:pt-20` back inside the hero as padding on the content container so text doesn't collide with the header.
**Warning signs:** On local dev, if you see the cream `#FAF3EF` body color behind the transparent header before the hero image appears, the offset is missing.

### Pitfall 2: "use client" cascade from FadeUp
**What goes wrong:** A developer marks the entire section component as "use client" because it wraps content in `FadeUp`, which is itself "use client". This unnecessarily moves data fetching to the client.
**Why it happens:** React's "use client" boundary propagates up — but only the component that directly uses client APIs needs the directive.
**How to avoid:** `FadeUp` is already "use client". The section component importing it does NOT need "use client" — React handles the boundary correctly. Only add "use client" to a section if it directly calls hooks like `useState`, `useEffect`, or `useScroll`.

### Pitfall 3: Anchor scroll offset (sticky header collision)
**What goes wrong:** Clicking "First-Timer Guide" scrolls to `#what-to-expect` but the heading appears underneath the fixed 64px header — it lands in the right position but the content is clipped.
**Why it happens:** Browser native anchor scroll positions the element at the viewport top, not accounting for a fixed header.
**How to avoid:** Add `scroll-mt-20` (Tailwind — equivalent to 80px, slightly more than the 64–80px header) to the target element: `<SectionWrapper id="what-to-expect" className="scroll-mt-20" ...>`. This is the Tailwind v4 compatible approach — no JavaScript offset calculation needed.
**Warning signs:** After clicking the CTA, the "What to Expect" heading is partially hidden under the header nav.

### Pitfall 4: Importing from "framer-motion" instead of "motion/react"
**What goes wrong:** TypeScript compiles but the animation library mismatch causes either bundle duplication or runtime errors.
**Why it happens:** The package was renamed; Claude's training data predates the rename.
**How to avoid:** All motion imports in this project use `import { motion, AnimatePresence, useScroll } from "motion/react"` — confirmed in FadeUp.tsx and Header.tsx. Never import from "framer-motion".

### Pitfall 5: Testimonial slice — using all 9 testimonials
**What goes wrong:** The testimonials.ts file has 9 entries. Passing the full array to a 3-card grid renders 9 cards.
**Why it happens:** `testimonials` export is the full array.
**How to avoid:** Slice in the component: `testimonials.slice(0, 3)`. Pick the first 3 which are all first-timer stories — most relevant for homepage conversion. Or create a `getFeaturedTestimonials()` helper in content/testimonials.ts.

### Pitfall 6: First-Timer Package data might be null
**What goes wrong:** `getServiceBySlug(PACKAGE_SLUGS.firstTimer)` returns `Service | undefined`. Accessing `.price` or `.name` without a null check crashes the build.
**Why it happens:** The accessor is typed to return `undefined` when no match.
**How to avoid:** Destructure with fallback or assert: `const pkg = getServiceBySlug(PACKAGE_SLUGS.firstTimer)!` — the First-Timer Package is guaranteed to exist in the data layer. Or `if (!pkg) return null` as a guard. The `!` assertion is acceptable here since the data is co-located and controlled.

---

## Code Examples

Verified patterns from prior phases and confirmed available APIs:

### Hero Section with header offset correction
```tsx
// Source: layout.tsx (pt-16 lg:pt-20 on main) + Header.tsx (fixed + transparent)
// The -mt negates main's padding so hero fills viewport edge-to-edge
<section className="relative min-h-screen -mt-16 lg:-mt-20 bg-brand-dark overflow-hidden">
  {/* Background image placeholder */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-secondary/60" />
  {/* Content layer — restore the header offset for text positioning */}
  <div className="relative z-10 pt-32 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* hero content */}
  </div>
</section>
```

### Anchor scroll with sticky header offset
```tsx
// Source: Tailwind v4 docs / scroll-margin utility
// scroll-mt-20 = 80px scroll margin — prevents fixed header from covering heading
<SectionWrapper id="what-to-expect" bg="light" padding="lg" className="scroll-mt-20">
  ...
</SectionWrapper>
```

### Accessing First-Timer Package data safely
```tsx
// Source: src/content/services/index.ts + src/content/services/packages.ts
import { getServiceBySlug, PACKAGE_SLUGS } from "@/content/services";

// In Server Component (no async needed — synchronous array lookup)
const firstTimerPkg = getServiceBySlug(PACKAGE_SLUGS.firstTimer)!;
// firstTimerPkg.price === 70
// firstTimerPkg.name === "First-Timer Package"
// firstTimerPkg.shortDescription === "..."
```

### Static testimonial grid (3 cards)
```tsx
// Source: src/content/testimonials.ts — 9 total, first 3 are first-timer stories
import { testimonials } from "@/content/testimonials";
import { StarRating } from "@/components/ui";

const featured = testimonials.slice(0, 3);

// Render as 3-column grid on desktop, single column on mobile
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {featured.map((t) => (
    <div key={t.author} className="bg-white rounded-2xl p-6 shadow-sm">
      <StarRating rating={t.rating} size="sm" />
      <p className="mt-3 text-brand-dark leading-relaxed">"{t.quote}"</p>
      <div className="mt-4">
        <p className="font-semibold text-brand-dark text-sm">{t.author}</p>
        {t.service && <p className="text-gray-500 text-xs mt-0.5">{t.service}</p>}
      </div>
    </div>
  ))}
</div>
```

### FadeUp stagger pattern for icon grids
```tsx
// Source: src/components/ui/FadeUp.tsx — delay prop in seconds
import { FadeUp } from "@/components/ui";

{steps.map((step, i) => (
  <FadeUp key={step.title} delay={i * 0.1}>
    <div className="text-center p-6">
      {step.icon}
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  </FadeUp>
))}
```

### What to Expect — recommended 4 steps (Claude's discretion)
Based on the content in `packages.ts` (whatToExpect field) and anxiety categories in `types.ts`:

1. **Before You Arrive** — Hair growth, loose clothing, skip lotion (addresses "prep" anxiety)
2. **When You Walk In** — Warm greeting, private room, Maya walks you through everything (addresses "privacy" anxiety)
3. **During Your Service** — Honey-based wax explained, quick application, she talks you through each step (addresses "pain" anxiety)
4. **After You Leave** — Aftercare kit, what to expect in 24–48 hours, when to rebook (addresses "aftercare" anxiety)

These map to the `FAQ.category` anxiety types in `types.ts` and align with the First-Timer Package's `whatToExpect` narrative.

### SectionWrapper bg variant reference
```tsx
// Source: src/components/ui/SectionWrapper.tsx
// bg="white"   → "bg-white"
// bg="light"   → "bg-brand-light"         // #FAF3EF cream
// bg="dark"    → "bg-brand-dark text-white" // #333333 charcoal
// bg="primary" → "bg-brand-primary text-white" // #D4A574 honey gold
// bg="blush"   → "bg-brand-light/60"      // softer cream

// padding="sm"  → py-8
// padding="md"  → py-12 lg:py-16
// padding="lg"  → py-16 lg:py-24
```

---

## Section-by-Section Implementation Notes

### HomepageHero
- Needs "use client" if using `useScroll` for parallax. If using static background only, no "use client" needed.
- Hero badge for trust: use `<Badge variant="trust">★ 4.9 — {clientConfig.reviewCount}+ happy clients</Badge>`
- Primary CTA: `<BookingLink variant="cta">Book Now</BookingLink>` — reads bookingUrl from clientConfig
- Secondary CTA: `<Button variant="outline" href="#what-to-expect">First-Timer Guide</Button>` — plain anchor, smooth scroll from CSS
- Headline (Claude's discretion): Should address first-timer anxiety directly. Suggested: "Your First Wax Should Feel Good" — positions the studio as the answer to a feared experience. Subheadline: "Honey-based wax. A patient, judgment-free esthetician. And a First-Timer Package designed to make your first visit the best one."

### TrustBar
- Data from clientConfig: `reviewAverage`, `reviewCount`, `yearsInBusiness`
- 4th stat: "Licensed Esthetician" (from `staff[0].certifications[0]`) or "Sensitive Skin Safe" — both work
- bg="dark" immediately after hero — highest-contrast trust signal placement
- `<StarRating>` from UI primitives; or just display "4.9★" as text in the Fraunces heading font

### WhatToExpect
- 4 icon cards (see recommended content above)
- Icon approach: inline SVG or a simple emoji-to-SVG mapping — no icon library needed (avoid adding lucide-react or heroicons for 4 icons)
- id="what-to-expect" + className="scroll-mt-20" on the SectionWrapper — required for hero CTA scroll target
- bg="light"

### FirstTimerSpotlight
- Data: `getServiceBySlug(PACKAGE_SLUGS.firstTimer)` — returns name, price ($70), shortDescription, aftercare (for checklist)
- Savings display: The data shows price=$70. A-la-carte is $87 (Brazilian $65 + eyebrow $22). The packages.ts copy says "Save $17" — use that figure directly from the shortDescription or hardcode the savings as a display string (this is acceptable since it's a marketing display, not a computed value)
- Visual checklist: "Brazilian Wax", "Eyebrow Shaping", "Aftercare Kit" — these are known from the package data
- bg="blush"

### ServicesPreview
- Data: `serviceCategories` — 4 categories, each has `slug`, `name`, `tagline`, `iconName`
- iconName values: "sparkles" (face), "leaf" (body), "shield" (intimate), "gift" (packages)
- "View Services" links to `/services/[category.slug]` — links exist conceptually but the pages aren't built yet (Phase 5+). Use Next.js `Link` with the correct href anyway.
- bg="white"

### TestimonialsGrid
- `testimonials.slice(0, 3)` — first 3 are all first-timer stories, highest relevance for homepage
- Static grid — no "use client"
- Use `StarRating` component from UI primitives
- bg="light"

### EstheticianIntro
- `staff[0]` — Maya Chen, headshot at `/images/staff/maya-chen.jpg` (placeholder), bio paragraphs, title, specialties, certifications
- Photo placeholder: `next/image` with a placeholder or the `/images/staff/maya-chen.jpg` path
- Layout: photo left on desktop, text right — or Claude's discretion. Photo left is the more natural reading order (face → text)
- bg="white"

### FinalCTA
- Simple: "Ready to experience waxing done right?" + `<BookingLink variant="cta">`
- Trust reinforcement: star rating + review count adjacent to the button (use `StarRating showValue reviewCount`)
- bg="primary" (honey gold) — warm, positive close

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` import | `motion/react` import | motion v11+ | **Breaking** — wrong import causes silent failure or bundle issues |
| Tailwind config in tailwind.config.js | `@theme {}` block in globals.css | Tailwind v4 | No JS config file — tokens are pure CSS |
| next/image with `layout="fill"` | next/image with `fill` prop (boolean) | Next.js 13 | `layout="fill"` is deprecated in Next.js 16 |
| `useState` + `useEffect` for scroll detection | `useScroll` + `useMotionValueEvent` from motion/react | motion v10+ | More performant, no manual event listeners |
| Carousel/slider for testimonials | Static 3-card grid | (design decision) | No "use client" needed, no interaction required, accessible |

**Deprecated/outdated:**
- `next/image layout="fill"`: use `<Image fill className="object-cover" alt="..." />` instead
- `import { motion } from "framer-motion"`: use `import { motion } from "motion/react"`

---

## Open Questions

1. **Icon library for What to Expect cards**
   - What we know: `serviceCategories` uses `iconName` strings ("sparkles", "leaf", "shield", "gift") — but no icon library is installed. The Phase 1 RESEARCH.md and Phase 2 components use inline SVGs only.
   - What's unclear: Should we install `lucide-react` or `@heroicons/react` for the 4 icons, or write inline SVGs?
   - Recommendation: Write 4 inline SVGs directly in the WhatToExpect component. Adding a full icon library for 4 icons is disproportionate overhead. The ServicesPreview `iconName` field is a string identifier for future use — it does not imply an icon library is installed.

2. **Hero image placeholder**
   - What we know: No `/public/images/` directory exists yet. The hero needs a full-bleed image or a fallback.
   - What's unclear: Should the hero use a CSS gradient fallback, or should we create a `/public/images/hero-placeholder.jpg`?
   - Recommendation: Use a rich CSS gradient (dark forest green to sage) as the hero background with `bg-gradient-to-br from-[#2C3E2D] via-brand-dark to-brand-secondary`. The placeholder communicates the visual intent to the client without requiring an image asset. Add a comment: `{/* Replace with: <Image fill src="/images/hero.jpg" className="object-cover" alt="" priority /> */}`.

3. **WebPage schema on homepage**
   - What we know: `generateWaxingBusinessSchema` is already injected globally in `layout.tsx`. The schema covers `LocalBusiness + BeautyBusiness`.
   - What's unclear: Should `page.tsx` also export a separate `WebPage` schema?
   - Recommendation: No additional schema needed on the homepage. The `LocalBusiness` + `BeautyBusiness` schema in layout.tsx is the correct schema for the homepage. Do not duplicate it.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase reading — `src/app/layout.tsx`, `src/components/ui/SectionWrapper.tsx`, `src/components/ui/FadeUp.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/StarRating.tsx`, `src/components/ui/BookingLink.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/BookingBar.tsx`
- Direct codebase reading — `src/content/client.config.ts`, `src/content/staff.ts`, `src/content/testimonials.ts`, `src/content/services/categories.ts`, `src/content/services/packages.ts`, `src/content/services/index.ts`
- Direct codebase reading — `src/lib/types.ts`, `src/lib/metadata.ts`, `src/lib/schema.ts`, `src/app/globals.css`
- Direct codebase reading — `package.json` (confirmed versions: next 16.2.1, motion ^12.38.0, tailwindcss ^4)
- Prior phase research — `.planning/phases/01-foundation/01-RESEARCH.md`, `.planning/phases/02-layout-shell/02-RESEARCH.md`, `.planning/phases/03-data-layer/03-RESEARCH.md`

### Secondary (MEDIUM confidence)
- Tailwind v4 `scroll-mt-*` utility — consistent with how `scroll-margin-top` works in CSS; same pattern used in prior template research

### Tertiary (LOW confidence)
- None — all findings verified directly from codebase

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package.json read directly; no new packages needed
- Architecture: HIGH — all prior phase components read directly; composition patterns are verified
- Pitfalls: HIGH — hero offset pattern confirmed from layout.tsx + Header.tsx; import pattern confirmed from FadeUp.tsx
- Content data: HIGH — all content files read directly; data shapes confirmed against types.ts

**Research date:** 2026-03-29
**Valid until:** Stable — depends only on internal codebase, not external package versions. Re-research only if new UI primitives are added to Phase 1 or data schema changes.
