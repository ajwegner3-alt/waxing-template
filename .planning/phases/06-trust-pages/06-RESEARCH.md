# Phase 6: Trust Pages - Research

**Researched:** 2026-03-30
**Domain:** Next.js 16 App Router static pages, trust page UX, FAQ accordion reuse, Google reviews display
**Confidence:** HIGH — all findings verified against actual codebase. No new dependencies. All patterns established in Phases 4-5.

## Summary

Phase 6 builds two static pages: `/about` and `/faq`. Both are thin Server Component page files that compose new section components from a `src/components/trust/` directory. The work is entirely component construction and content assembly — no new routing complexity, no new npm dependencies, and no new data infrastructure.

All content sources already exist: `src/content/staff.ts` has Maya's full 3-paragraph bio, all specialties, and all certifications. `src/content/faqs.ts` has 16 FAQs across all 7 anxiety categories. `src/content/testimonials.ts` has 9 testimonials. `src/content/client.config.ts` has `reviewAverage`, `reviewCount`, and `googleBusinessUrl`. The phase is purely composition work.

The reuse map is straightforward: `FAQAccordion` from `@/components/services` handles all FAQ rendering unchanged. `TestimonialsGrid`'s card style (from `@/components/homepage`) is the visual target for the About page reviews section — replicate that card structure. All entrance animations use `FadeUp`. All layouts use `SectionWrapper`. The page-level structure follows the thin-composer pattern established in `app/page.tsx`.

**Primary recommendation:** Build all new components in `src/components/trust/` as Server Components. The only potential `"use client"` candidate is a FAQ text filter — skip it (recommendation below). Both pages end with a warm CTA section (`bg="primary"`) matching `FinalCTA`'s honey-gold pattern.

## Standard Stack

All libraries are installed. No new dependencies for this phase.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | Static page routing, `generateMetadata` | Project framework — locked |
| motion/react | installed | `FadeUp` entrance animations | Convention from Phase 1 — import from `motion/react`, never `framer-motion` |
| tailwindcss | v4 | Styling via `@theme` tokens | Project convention — locked |

### Existing UI Primitives (all reused, zero new installs)
| Component | Location | What it provides for Phase 6 |
|-----------|----------|------------------------------|
| `SectionWrapper` | `@/components/ui` | All section containers — 5 bg variants |
| `FadeUp` | `@/components/ui` | Entrance animation wrapper |
| `Badge` | `@/components/ui` | Trust/info variant pills for certifications |
| `BookingLink` | `@/components/ui` | CTA buttons on both pages |
| `PhoneLink` | `@/components/ui` | Phone CTA in final CTA sections |
| `StarRating` | `@/components/ui` | Aggregate rating display, testimonial card stars |
| `FAQAccordion` | `@/components/services` | Reused unchanged on FAQ page for all 16 FAQs |
| `generatePageMetadata` | `@/lib/metadata` | Metadata generation for both pages |

### New Components to Build (all in `src/components/trust/`)
| Component | What it does | Server/Client |
|-----------|-------------|--------------|
| `AboutHero` | Branded page header (image placeholder + name + eyebrow label) | Server |
| `BrandStory` | Origin story section — Maya's narrative prose | Server |
| `EstheticianProfile` | Full bio (all 3 paragraphs), all specialties + certifications as badges | Server |
| `PhilosophyValues` | 3-4 brand value icon cards in a grid | Server |
| `HygieneProtocols` | Icon checklist of sanitation practices | Server |
| `AboutReviews` | Aggregate rating bar + 3 testimonial cards (same card style as TestimonialsGrid) | Server |
| `FAQCategorySection` | One stacked category block: H3 + intro paragraph + FAQAccordion | Server |
| `TrustCTA` | Warm booking CTA section + inline badge row (reusable on both pages) | Server |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<details>`/`<summary>` (via FAQAccordion) | JS-powered accordion | FAQAccordion already built; native details is accessible without JS — no reason to change |
| Static testimonial card grid | Carousel/slider | Static grid is already built in TestimonialsGrid — carousels add JS complexity with no SEO benefit |
| Skip FAQ text filter | Add text filter `"use client"` | 16 FAQs across 7 labeled sections is navigable by scrolling — filter adds complexity for marginal UX gain. Recommendation: skip. |

**Installation:** No `npm install` needed for this phase.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── about/
│   │   └── page.tsx              # Thin composer — Server Component
│   └── faq/
│       └── page.tsx              # Thin composer — Server Component
├── components/
│   └── trust/                    # New barrel for Phase 6 components
│       ├── AboutHero.tsx
│       ├── BrandStory.tsx
│       ├── EstheticianProfile.tsx
│       ├── PhilosophyValues.tsx
│       ├── HygieneProtocols.tsx
│       ├── AboutReviews.tsx
│       ├── FAQCategorySection.tsx
│       ├── TrustCTA.tsx
│       └── index.ts              # Barrel export
```

### Pattern 1: Static Page with generatePageMetadata
**What:** Both `/about` and `/faq` are static Server Component pages. `export const metadata` at the top, then a default function returning composed sections.
**When to use:** Every page in this project. Static = no `generateStaticParams` needed since there's no dynamic segment.

```typescript
// Source: established in src/app/page.tsx and src/app/services/page.tsx
// app/about/page.tsx

import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import {
  AboutHero,
  BrandStory,
  EstheticianProfile,
  PhilosophyValues,
  HygieneProtocols,
  AboutReviews,
  TrustCTA,
} from "@/components/trust";

export const metadata: Metadata = generatePageMetadata({
  title: "About Honey & Bloom | Wax Studio in Omaha",
  description:
    "Meet Maya Chen, Omaha's first-timer waxing specialist. Learn about our honey-based wax formula, comfort-first philosophy, and hygiene standards.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BrandStory />
      <EstheticianProfile />
      <PhilosophyValues />
      <HygieneProtocols />
      <AboutReviews />
      <TrustCTA page="about" />
    </>
  );
}
```

### Pattern 2: FAQ Page with Category Sections
**What:** FAQ page maps over the 7 anxiety categories, rendering `FAQCategorySection` for each. FAQs filtered by category via inline logic at page level.
**When to use:** This page — 7 stacked sections with H3 + intro + accordion per section.

```typescript
// Source: faqs.ts structure verified — each FAQ has category field
// app/faq/page.tsx

import { faqs } from "@/content/faqs";
import { FAQCategorySection, TrustCTA } from "@/components/trust";
import { SectionWrapper, FadeUp } from "@/components/ui";

// Category metadata — labels and intro copy live here, not in faqs.ts
const FAQ_CATEGORIES = [
  {
    key: "first-timer" as const,
    heading: "First-Timer Questions",
    intro: "Never been waxed before? You're in the right place. Here's everything you need to know before your first appointment.",
  },
  {
    key: "pain" as const,
    heading: "Pain & Comfort",
    intro: "Waxing does involve a quick sting — but it's usually far less than people expect. Here's the honest truth about what it feels like.",
  },
  {
    key: "prep" as const,
    heading: "How to Prepare",
    intro: "A little prep makes a big difference in your results and comfort. Here's what to do (and skip) before you come in.",
  },
  {
    key: "privacy" as const,
    heading: "Privacy & Comfort",
    intro: "Every service happens in a fully private room. Here's exactly what to expect so nothing catches you off guard.",
  },
  {
    key: "hygiene" as const,
    heading: "Hygiene & Safety",
    intro: "Your skin's safety is non-negotiable. Here's how we keep every appointment clean and professional.",
  },
  {
    key: "aftercare" as const,
    heading: "Aftercare",
    intro: "What you do after your wax matters for your results. These answers will keep your skin smooth and happy.",
  },
  {
    key: "sensitive-skin" as const,
    heading: "Sensitive Skin",
    intro: "Reactive skin is welcome here. Our honey-based hard wax is formulated specifically for clients who have had trouble elsewhere.",
  },
] as const;

export default function FAQPage() {
  return (
    <>
      {/* Page header */}
      <SectionWrapper bg="light" padding="lg">
        <FadeUp>
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
              Your Questions, Answered
            </h1>
            <p className="text-brand-dark/65 text-lg leading-relaxed">
              First-timer nerves are real. Read through these before your
              appointment — or search for whatever's on your mind.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Stacked category sections */}
      {FAQ_CATEGORIES.map((cat, i) => {
        const categoryFaqs = faqs.filter((f) => f.category === cat.key);
        if (categoryFaqs.length === 0) return null;
        return (
          <FAQCategorySection
            key={cat.key}
            heading={cat.heading}
            intro={cat.intro}
            faqs={categoryFaqs}
            bg={i % 2 === 0 ? "white" : "light"}
          />
        );
      })}

      <TrustCTA page="faq" />
    </>
  );
}
```

### Pattern 3: EstheticianProfile — Full Bio + Badge Pills
**What:** Shows all 3 bio paragraphs (vs. 2 on homepage), all specialties as pills, and certifications as badge pills. Extends the pattern from `EstheticianIntro.tsx`.
**When to use:** About page only — the homepage uses the abbreviated `EstheticianIntro`.

```typescript
// Source: src/components/homepage/EstheticianIntro.tsx — extend this pattern
// src/components/trust/EstheticianProfile.tsx

import { staff } from "@/content/staff";
import { Badge } from "@/components/ui/Badge";

const esthetician = staff[0];

// Bio: show ALL paragraphs (esthetician.bio — all 3)
// Specialties: same pill style as EstheticianIntro (bg-brand-primary/10 rounded-full)
// Certifications: Badge component with variant="trust"
{esthetician.certifications.map((cert) => (
  <Badge key={cert} variant="trust">{cert}</Badge>
))}
```

### Pattern 4: TestimonialsGrid Card Style (About Reviews Section)
**What:** The About reviews section replicates the exact card structure from `TestimonialsGrid.tsx` — `<figure>` with `StarRating`, blockquote, figcaption. Add an aggregate rating header above the 3 cards.
**When to use:** `AboutReviews` component.

```typescript
// Source: src/components/homepage/TestimonialsGrid.tsx — exact card pattern
// Aggregate header pattern from src/components/homepage/FinalCTA.tsx

// Aggregate rating row:
<div className="flex items-center gap-3 mb-8">
  <StarRating
    rating={clientConfig.reviewAverage}
    size="lg"
    showValue
    reviewCount={clientConfig.reviewCount}
  />
  <a
    href={clientConfig.googleBusinessUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-brand-primary text-sm font-medium hover:underline"
  >
    See all reviews on Google
  </a>
</div>

// Card grid: same 3-column grid as TestimonialsGrid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {featured.map((testimonial, i) => (
    <FadeUp key={i} delay={i * 0.1}>
      <figure className="flex flex-col bg-white rounded-2xl border border-brand-primary/10 p-6 gap-4 h-full shadow-sm">
        {/* EXACT same card structure as TestimonialsGrid */}
      </figure>
    </FadeUp>
  ))}
</div>
```

### Pattern 5: HygieneProtocols Icon Checklist
**What:** Scannable icon checklist with inline SVG checkmark + short label per item. `bg="blush"` or `bg="white"` SectionWrapper. Not clinical paragraphs — brief trust assertions.
**Recommendation:** Place on About page between PhilosophyValues and AboutReviews. Also include a condensed version in the Hygiene FAQ category section as reinforcement (link back to About page for full detail).

```typescript
// Source: design convention — inline SVG preferred (from Phase 4 research)
// Icon checklist items (static array, no content type needed):
const HYGIENE_ITEMS = [
  "Single-use applicators — never double-dipped",
  "Fresh wax per client, every time",
  "Hospital-grade surface sanitization between appointments",
  "Gloves changed for each client",
  "Linens changed after every service",
];

{HYGIENE_ITEMS.map((item) => (
  <div key={item} className="flex items-start gap-3">
    <CheckIcon className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
    <span className="text-brand-dark/80 text-sm leading-relaxed">{item}</span>
  </div>
))}
```

### Pattern 6: TrustCTA — Reusable Warm CTA Section
**What:** Both About and FAQ pages end with the same warm CTA section. Accept a `page` prop to customize the headline copy. Inline badge row directly adjacent to the booking button.
**When to use:** Both `app/about/page.tsx` and `app/faq/page.tsx`.

```typescript
// Source: src/components/homepage/FinalCTA.tsx — extend this pattern
// TrustCTA uses bg="primary" (honey gold), white text, BookingLink white override

interface TrustCTAProps {
  page: "about" | "faq";
}

// Inline badge row adjacent to CTA button:
<div className="flex flex-wrap items-center justify-center gap-3 mt-4">
  <span className="text-white/70 text-sm flex items-center gap-1.5">
    <StarIcon className="w-4 h-4" />
    {clientConfig.reviewAverage} stars · {clientConfig.reviewCount}+ reviews
  </span>
  <span className="text-white/40 text-xs">·</span>
  <span className="text-white/70 text-sm">Licensed Esthetician</span>
  <span className="text-white/40 text-xs">·</span>
  <span className="text-white/70 text-sm">Single-use applicators</span>
</div>
```

### Pattern 7: PhilosophyValues Icon Cards
**What:** 3-4 brand value cards in a responsive grid. Each card has an inline SVG icon, a short value name (H3), and 1-2 sentence description.
**Claude's Discretion — Recommended Values:**
- Comfort First — Every detail is designed around reducing first-timer anxiety.
- Natural Ingredients — Honey-based hard wax, free of parabens and harsh resins.
- Transparency — Maya talks you through every step — no surprises, ever.
- Judgment-Free — All bodies welcome, all experience levels, no awkwardness.

**Recommended Icons (inline SVG):** Heart (Comfort), Leaf (Natural), Eye (Transparency), Shield (Judgment-Free) — all available as simple Heroicons-style paths.

```typescript
// 4-column grid on desktop, 2-column on tablet, 1-column on mobile
// bg="blush" or "light" for the section — soft contrast
// Cards: bg-white, rounded-2xl, border border-brand-primary/10, p-6
// Icon: w-10 h-10 text-brand-primary bg-brand-primary/10 rounded-xl p-2.5
```

### Anti-Patterns to Avoid
- **Importing EstheticianIntro from homepage for the About page:** The About page needs all 3 bio paragraphs and certifications. `EstheticianIntro` uses `bio.slice(0, 2)` — it's intentionally abbreviated. Build `EstheticianProfile` as a separate, full-detail component.
- **Using TestimonialsGrid directly on About page:** `TestimonialsGrid` is self-contained with a hardcoded "What Our Clients Say" headline. The About page needs a different heading with the aggregate rating bar above it. Build `AboutReviews` as a distinct component that replicates the card pattern.
- **Putting category metadata in faqs.ts:** The intro paragraph for each category is page-specific presentation copy, not content data. Keep it in the FAQ page component as a static `FAQ_CATEGORIES` array.
- **Adding "use client" for FAQ text filter:** 16 FAQs across 7 clearly labeled sections with headings is scannable without filtering. A `"use client"` filter saves maybe 5 seconds of scrolling but adds JS, hydration cost, and a focus trap risk. Skip it.
- **Nesting SectionWrapper inside SectionWrapper:** Each component wraps itself in its own `SectionWrapper`. The page composer renders them sequentially — never wrap the entire page in an outer SectionWrapper.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Metadata | Custom `<head>` | `generatePageMetadata()` | Already handles canonical, OG, Twitter, metadataBase |
| FAQ expand/collapse | Any custom accordion | `FAQAccordion` from `@/components/services` | Already built, accessible native details/summary |
| Booking CTA links | `<a href={...}>` | `<BookingLink>` component | 48px tap target, target="_blank", variant styling |
| Section containers | Custom div | `<SectionWrapper>` | Consistent padding, max-w-7xl, bg variants |
| Entrance animations | CSS keyframes | `<FadeUp delay={n * 0.1}>` | Consistent easing, once-only viewport trigger |
| Testimonial cards | New card design | Replicate TestimonialsGrid card structure | Exact same markup = visual consistency across pages |
| Star display | Custom stars | `<StarRating>` | Already built with brand-gold, showValue and reviewCount props |
| Phone CTA | `<a href="tel:...">` | `<PhoneLink>` | Handles tel: link, tap target, variant styling |

**Key insight:** This phase is almost entirely composition work. The primitives are fully built. The main creative work is authoring the category intro copy and deciding which icon shapes to use for PhilosophyValues.

## Common Pitfalls

### Pitfall 1: Forgetting the Breadcrumbs component on these pages
**What goes wrong:** About and FAQ are interior pages — they need breadcrumbs for UX navigation and SEO hierarchy, matching the pattern on service detail pages.
**Why it happens:** The homepage and service pages use Breadcrumbs but it's easy to overlook on simple static pages.
**How to avoid:** Add `<Breadcrumbs items={[{ label: "About", href: "/about" }]} />` at the top of the About page hero section and `<Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />` on the FAQ page header. Use `Breadcrumbs` from `@/components/layout`.

### Pitfall 2: Bio paragraph count mismatch
**What goes wrong:** `EstheticianIntro.tsx` uses `esthetician.bio.slice(0, 2)` — two paragraphs. Copy-pasting that pattern for the About page gives an incomplete profile.
**Why it happens:** The homepage abbreviates the bio intentionally. The About page is the full-detail destination.
**How to avoid:** In `EstheticianProfile`, use `esthetician.bio` (all 3 paragraphs) — no `.slice()`.

### Pitfall 3: TestimonialsGrid "What Our Clients Say" heading conflict
**What goes wrong:** If `TestimonialsGrid` is dropped directly on the About page, you get a heading that says "What Our Clients Say" with no aggregate rating bar and no link to Google. The About page reviews section needs its own heading context.
**Why it happens:** `TestimonialsGrid` is self-contained and doesn't accept a custom heading prop.
**How to avoid:** Build `AboutReviews` as its own component. Copy the card pattern from `TestimonialsGrid.tsx` but write a new heading block with the aggregate rating + Google link.

### Pitfall 4: FAQ categories rendering empty sections
**What goes wrong:** If `faqs.filter(f => f.category === key)` returns an empty array for a category, rendering a `FAQCategorySection` with no accordions looks broken.
**Why it happens:** Faqs.ts currently has 16 FAQs — 2-3 per category — but all 7 categories are populated, so this shouldn't happen. Still guard for it.
**How to avoid:** In the FAQ page's category map, add `if (categoryFaqs.length === 0) return null;` before rendering the section. Already shown in Pattern 2 example above.

### Pitfall 5: "use client" creep from BookingLink
**What goes wrong:** `BookingLink` is `"use client"` (reads `clientConfig.bookingUrl` and renders a link). Using it inside a Server Component is fine — Next.js handles this automatically by treating it as a leaf node. However, if you accidentally add `"use client"` to the parent component, you escalate the entire subtree.
**Why it happens:** Developers sometimes add `"use client"` to components that use `BookingLink`, thinking the client directive must cascade up.
**How to avoid:** Never add `"use client"` to trust components that only render static content + BookingLink. Server Components can render Client Component children with no issues.

### Pitfall 6: TrustCTA vs FinalCTA — don't copy-paste without adapting
**What goes wrong:** Copy-pasting `FinalCTA.tsx` creates a duplicate component that drifts from the original and confuses future maintainers.
**Why it happens:** FinalCTA is specific to the homepage (its copy references "switching studios"). The trust pages need slightly different copy.
**How to avoid:** Build `TrustCTA` as a new component in `@/components/trust/` with a `page` prop for copy variants. Do not modify `FinalCTA.tsx`. Both are intentionally separate.

## Code Examples

### About page section order (verified against CONTEXT.md decisions)
```typescript
// Source: 06-CONTEXT.md — "Story-first flow" decision
// app/about/page.tsx

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero — image placeholder or branded header */}
      <AboutHero />
      {/* 2. Brand origin story — Maya's narrative */}
      <BrandStory />
      {/* 3. Full esthetician profile — all bio, specialties, certifications */}
      <EstheticianProfile />
      {/* 4. Philosophy — 4 value icon cards */}
      <PhilosophyValues />
      {/* 5. Hygiene protocols — icon checklist */}
      <HygieneProtocols />
      {/* 6. Google reviews — aggregate rating + 3 cards */}
      <AboutReviews />
      {/* 7. Warm booking CTA + inline trust badges */}
      <TrustCTA page="about" />
    </>
  );
}
```

### FAQCategorySection component
```typescript
// Source: FAQAccordion in src/components/services/FAQAccordion.tsx — reused unchanged
// src/components/trust/FAQCategorySection.tsx

import type { FAQ } from "@/lib/types";
import { SectionWrapper, FadeUp } from "@/components/ui";
import { FAQAccordion } from "@/components/services";

interface FAQCategorySectionProps {
  heading: string;
  intro: string;
  faqs: FAQ[];
  bg?: "white" | "light";
}

export function FAQCategorySection({
  heading,
  intro,
  faqs,
  bg = "white",
}: FAQCategorySectionProps) {
  return (
    <SectionWrapper bg={bg} padding="md">
      <FadeUp>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-3">
            {heading}
          </h2>
          <p className="text-brand-dark/65 leading-relaxed mb-6">{intro}</p>
          <FAQAccordion faqs={faqs} />
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
```

### Certifications as Badge pills
```typescript
// Source: src/components/ui/Badge.tsx — variant="trust" = sage green bg
// src/components/trust/EstheticianProfile.tsx

import { staff } from "@/content/staff";
import { Badge } from "@/components/ui";

const esthetician = staff[0];

// Specialties — existing pill style from EstheticianIntro
<div className="flex flex-wrap gap-2">
  {esthetician.specialties.map((specialty) => (
    <span
      key={specialty}
      className="text-sm bg-brand-primary/10 text-brand-dark/75 font-medium px-3 py-1 rounded-full"
    >
      {specialty}
    </span>
  ))}
</div>

// Certifications — Badge with trust variant (sage green)
<div className="flex flex-wrap gap-2">
  {esthetician.certifications.map((cert) => (
    <Badge key={cert} variant="trust">{cert}</Badge>
  ))}
</div>
// esthetician.certifications = ["Licensed Esthetician — Nebraska", "Advanced Hard Wax Certification"]
```

### Aggregate rating + Google link (AboutReviews)
```typescript
// Source: src/content/client.config.ts — reviewAverage: 4.9, reviewCount: 247
// Source: src/components/ui/StarRating.tsx — showValue + reviewCount props

import { clientConfig } from "@/content/client.config";
import { StarRating } from "@/components/ui";

<div className="flex flex-wrap items-center gap-4 mb-10">
  <StarRating
    rating={clientConfig.reviewAverage}
    size="lg"
    showValue
    reviewCount={clientConfig.reviewCount}
  />
  <a
    href={clientConfig.googleBusinessUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-brand-primary font-semibold text-sm hover:text-brand-primary-dark hover:underline transition-colors"
  >
    Read all reviews on Google &rarr;
  </a>
</div>
```

### AboutHero — branded header (Claude's Discretion recommendation)
```typescript
// Recommendation: branded page header with gradient background — NOT a full hero image.
// The About page is text-heavy; a tall image hero competes with the story content.
// Use a compact branded header: eyebrow label + H1 + short tagline.
// bg="light" (cream) keeps it warm and on-brand without overwhelming the page.

<SectionWrapper bg="light" padding="md">
  <Breadcrumbs items={[{ label: "About", href: "/about" }]} className="mb-6" />
  <FadeUp>
    <div className="max-w-2xl">
      <div className="text-brand-secondary font-semibold text-sm tracking-wide uppercase mb-3">
        Our Story
      </div>
      <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
        A Studio Built Around You
      </h1>
      <p className="text-brand-dark/65 text-lg leading-relaxed">
        {clientConfig.tagline} — and everything at Honey & Bloom is designed
        to make that true from the moment you walk in.
      </p>
    </div>
  </FadeUp>
</SectionWrapper>
```

## Claude's Discretion — Firm Recommendations

### FAQ search/filter: Skip it
**Decision: Skip the text filter.**
16 FAQs organized under 7 headings that describe the exact anxiety category is navigable by scrolling. The H2/H3 headings act as an implicit table of contents. A text filter would require `"use client"`, adds hydration overhead, and solves a problem that doesn't meaningfully exist at this scale. If the FAQ grows to 40+ questions, reconsider.

### Hygiene section placement: About page only (primary), FAQ hygiene section (secondary)
**Decision: HygieneProtocols is a full section on the About page.** The FAQ page's "Hygiene & Safety" category already addresses these questions in detail. A separate section on the FAQ page would be redundant. The hygiene FAQs link to the About page for full protocols if needed.

### Brand value icons: 4 values with simple inline SVG
**Decision: Use 4 values — Comfort First, Natural Ingredients, Transparency, Judgment-Free.** Use simple Heroicons-style paths (heart, leaf, eye, shield). All inline SVG — no icon library dependency. This matches Phase 4's pattern of 4 inline SVGs.

### About page hero style: Compact branded header (not image placeholder)
**Decision: Compact text-only header with `bg="light"` and breadcrumbs.** The About page is primarily text/story content. A tall image hero forces users to scroll past decoration before reaching the story. Compact header with warm cream background gets them to the content immediately.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` import | `motion/react` import | motion v12 | All FadeUp usage imports from `motion/react` — locked convention |
| Sync `params` access | `await params` | Next.js 15 | Not relevant to Phase 6 (no dynamic routes) |
| Building custom accordions | Native `<details>`/`<summary>` | Established in Phase 5 | FAQAccordion is already built — reuse it |

**Deprecated in this project:**
- `framer-motion` package: import path is `motion/react` in this project.
- Any JS-powered accordion: `FAQAccordion` uses native `<details>` — no state needed.

## Open Questions

1. **BreadcrumbList schema for About and FAQ pages**
   - What we know: `Breadcrumbs` component is Phase 8 deferred for BreadcrumbList schema (from STATE.md: "Breadcrumbs defers BreadcrumbList schema to Phase 8")
   - What's unclear: Phase 6 adds two new pages with breadcrumbs — Phase 8 will need to know they exist
   - Recommendation: Use `<Breadcrumbs>` as-is in Phase 6 (UI only, no schema). Phase 8 handles schema injection.

2. **FAQPage schema for FAQ page**
   - What we know: The FAQ page has 16 Q&A pairs — prime candidate for `FAQPage` schema
   - What's unclear: Phase 8 is listed as "SEO & Schema" — should Phase 6 stub this or defer entirely?
   - Recommendation: Defer to Phase 8. Add a TODO comment in `app/faq/page.tsx`: `{/* TODO Phase 8: Add FAQPage schema via SchemaScript */}`. Do not block Phase 6.

## Sources

### Primary (HIGH confidence)
- `src/content/faqs.ts` — 16 FAQs verified, all 7 categories populated (3+3+2+2+2+2+2 distribution)
- `src/content/staff.ts` — Maya's full profile verified (3 bio paragraphs, 4 specialties, 2 certifications, 6 years experience)
- `src/content/testimonials.ts` — 9 testimonials verified; first 3 are first-timer relief stories (appropriate for About page)
- `src/content/client.config.ts` — reviewAverage (4.9), reviewCount (247), googleBusinessUrl verified
- `src/components/services/FAQAccordion.tsx` — component signature and props verified (`faqs: FAQ[]`)
- `src/components/homepage/TestimonialsGrid.tsx` — card markup pattern verified (figure/blockquote/figcaption structure)
- `src/components/homepage/EstheticianIntro.tsx` — bio.slice(0,2) pattern verified — About page must NOT replicate this
- `src/components/homepage/FinalCTA.tsx` — TrustCTA pattern origin (bg="primary", white override BookingLink)
- `src/components/ui/Badge.tsx` — trust/urgency/info variants verified
- `src/components/ui/StarRating.tsx` — showValue, reviewCount props verified
- `src/lib/metadata.ts` — generatePageMetadata signature verified
- `src/lib/types.ts` — FAQ.category union type verified (7 values)
- `.planning/STATE.md` — confirmed: import from `motion/react`, Server Components + FadeUp wrapper pattern, FAQAccordion uses native details/summary

### Secondary (MEDIUM confidence)
- `node_modules/next/dist/docs/` — static page metadata pattern (`export const metadata`) established from prior phases; no new API patterns needed for Phase 6

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified installed; no new dependencies
- Architecture: HIGH — patterns directly established by Phases 4 and 5; no new Next.js API surface needed
- Component reuse map: HIGH — verified each reused component's signature and props
- Claude's Discretion recommendations: MEDIUM — design judgment calls (skip filter, compact About hero, 4 values), all well-reasoned and defensible
- FAQ category intro copy: MEDIUM — authored based on faqs.ts content; planner will refine in task actions

**Research date:** 2026-03-30
**Valid until:** 2026-04-29 (stable — no external API changes relevant)
