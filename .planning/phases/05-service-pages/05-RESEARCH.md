# Phase 5: Service Pages - Research

**Researched:** 2026-03-29
**Domain:** Next.js 16 App Router dynamic routes, service page UX, waxing-specific content patterns
**Confidence:** HIGH — all findings verified against actual codebase + official Next.js docs in node_modules

## Summary

Phase 5 builds two route trees: `/services` (menu page) and `/services/[slug]` (individual service detail pages). All content data is already fully authored in the Phase 3 data layer — the work here is purely routing, component composition, and UI construction. The data layer exports `allServices` (14 services across 4 categories), `serviceCategories` (4 categories), and accessor functions `getServiceBySlug()` and `getServicesByCategory()`. No new data authoring is needed.

The routing pattern is standard Next.js App Router: `app/services/page.tsx` for the menu, `app/services/[slug]/page.tsx` with `generateStaticParams` for individual pages. Because all slugs are known at build time from the data layer, all service pages can be fully statically generated — no ISR or runtime rendering needed. This is the correct choice for a marketing site where content changes require redeployment anyway.

The individual service page layout follows an anxiety-first UX flow decided in CONTEXT.md: hero with immediate booking CTA, then the "convince me it won't be terrible" content (What to Expect, Prep, Aftercare, Ingredients, FAQ), then cross-sells. The existing `FadeUp`, `SectionWrapper`, `Button`, `Badge`, `BookingLink`, and `Breadcrumbs` components cover the vast majority of composition needs — new components will be domain-specific (pain level pill, ingredient callout box, accordion FAQ, service card for related services).

**Primary recommendation:** Build all service page components as Server Components with `FadeUp` wrappers for entrance animation. The only client interaction needed is the FAQ accordion — isolate that into a single `"use client"` component so everything else stays server-rendered.

## Standard Stack

All libraries are already installed. No new dependencies needed for this phase.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | App Router, `generateStaticParams`, `generateMetadata` | Project framework — locked |
| motion/react | installed | `FadeUp` entrance animations | Convention from Phase 1, all prior phases use it |
| tailwindcss | v4 | Styling via `@theme` tokens | Project convention — locked |

### Existing UI Primitives (already built)
| Component | Location | What it provides |
|-----------|----------|-----------------|
| `SectionWrapper` | `@/components/ui` | 5 bg variants (white/light/dark/primary/blush), max-w-7xl container |
| `FadeUp` | `@/components/ui` | Server+Client scroll entrance animation, `delay` prop for stagger |
| `Badge` | `@/components/ui` | `trust`/`urgency`/`info` variants — extend for pain level pills |
| `Button` | `@/components/ui` | `primary`/`secondary`/`outline`/`ghost` variants, works as link or button |
| `BookingLink` | `@/components/ui` | `header`/`cta`/`inline` variants, reads `clientConfig.bookingUrl` |
| `Breadcrumbs` | `@/components/layout` | Already built, auto-prepends Home, Phase 8 will add BreadcrumbList schema |
| `StarRating` | `@/components/ui` | Star display for testimonial cards |

### New Components Needed (build in Phase 5)
| Component | Location | What it does |
|-----------|----------|-------------|
| `PainLevelBadge` | `@/components/services` | Colored pill: painLevel 1-5 → green/amber/warm-red label |
| `IngredientCallout` | `@/components/services` | Callout box listing ingredients + "what we don't use" |
| `FAQAccordion` | `@/components/services` | `"use client"` expand/collapse FAQ items |
| `ServiceCard` | `@/components/services` | Compact card: name + price + duration + link (reused on menu + related services) |
| `CategorySection` | `@/components/services` | One stacked section per category with heading + ServiceCard grid |
| `CategoryPills` | `@/components/services` | `"use client"` sticky pills that smooth-scroll to category section IDs |

### No New npm Dependencies
All animation, layout, and styling needs are covered by existing stack. Do not add `@radix-ui/react-accordion` or any component library — the project convention is inline SVG + minimal dependencies.

## Architecture Patterns

### Route Structure
```
src/app/
├── services/
│   ├── page.tsx                   # Menu page — static Server Component
│   └── [slug]/
│       └── page.tsx               # Service detail — dynamic, generateStaticParams
src/components/
├── services/                      # New barrel for Phase 5 components
│   ├── ServiceCard.tsx
│   ├── CategorySection.tsx
│   ├── CategoryPills.tsx          # "use client" — scroll behavior
│   ├── PainLevelBadge.tsx
│   ├── IngredientCallout.tsx
│   ├── FAQAccordion.tsx           # "use client" — toggle state
│   ├── ServiceTestimonial.tsx
│   ├── RelatedServices.tsx
│   └── index.ts                   # Barrel export
```

### Pattern 1: Static Menu Page
**What:** `app/services/page.tsx` is a Server Component that renders 4 `CategorySection` components stacked vertically with sticky `CategoryPills` navigation.
**When to use:** Always — content is static, no client state needed at page level.

```typescript
// Source: Next.js App Router — Server Component pattern (verified in codebase)
// app/services/page.tsx
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { serviceCategories, allServices } from "@/content/services";
import { SectionWrapper } from "@/components/ui";
import { CategoryPills, CategorySection } from "@/components/services";

export const metadata: Metadata = generatePageMetadata({
  title: "Waxing Services in Omaha | Honey & Bloom Wax Studio",
  description: "...",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <CategoryPills categories={serviceCategories} />
      {serviceCategories.map((category) => (
        <CategorySection
          key={category.slug}
          category={category}
          services={allServices.filter(s => s.categorySlug === category.slug)}
        />
      ))}
    </>
  );
}
```

### Pattern 2: Static Service Detail Pages with generateStaticParams
**What:** `app/services/[slug]/page.tsx` uses `generateStaticParams` to pre-build all 14 service pages at build time.
**When to use:** All dynamic routes where slug set is known at build time.

```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md
// app/services/[slug]/page.tsx

import { notFound } from "next/navigation";
import { allServices, getServiceBySlug } from "@/content/services";
import { generatePageMetadata } from "@/lib/metadata";

// CRITICAL: params is a Promise in Next.js 15+ — must await it
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.coverImage,
  });
}

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

// Use dynamicParams = false — any unknown slug 404s immediately
export const dynamicParams = false;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  // ... compose sections
}
```

### Pattern 3: Testimonial Lookup by Service Name
**What:** Filter global testimonials array to find one matching the service name.
**When to use:** Inline testimonial card on each service detail page.

```typescript
// Source: src/content/testimonials.ts — Testimonial has optional `service` field
import { testimonials } from "@/content/testimonials";

function getServiceTestimonial(serviceName: string) {
  return testimonials.find(
    (t) => t.service?.toLowerCase() === serviceName.toLowerCase()
  ) ?? null;
}
// Service names in testimonials.ts: "Brazilian Wax", "First-Timer Package",
// "Eyebrow Wax", "Bikini Wax", "Underarm Wax" — check these match data layer.
// If no match found, return null and skip the testimonial card entirely.
```

### Pattern 4: Pain Level Color Mapping (Claude's Discretion)
**What:** Map `PainLevel` (1-5) to badge color and friendly label.
**Recommendation:** Three-tier color system matches brand palette and sets clear expectations.

```typescript
// PainLevel 1-2: green (gentle) — brand-secondary (#7A9E76)
// PainLevel 3:   amber (moderate) — warm amber (#D97706 / amber-600)
// PainLevel 4-5: warm rose (intense) — rose (#E11D48 / rose-600)

const PAIN_CONFIG: Record<PainLevel, { label: string; classes: string }> = {
  1: { label: "Very Gentle",  classes: "bg-brand-secondary/15 text-brand-secondary" },
  2: { label: "Gentle",       classes: "bg-brand-secondary/15 text-brand-secondary" },
  3: { label: "Moderate",     classes: "bg-amber-100 text-amber-700" },
  4: { label: "Intense",      classes: "bg-rose-100 text-rose-600" },
  5: { label: "Very Intense", classes: "bg-rose-100 text-rose-600" },
};
```

### Pattern 5: Prep/Aftercare Display Format (Claude's Discretion)
**Recommendation:** Always-visible ordered lists, not accordions. Prep and aftercare are compliance-critical — clients MUST read them, especially first-timers. Hiding them behind a click adds friction that can lead to bad outcomes (showing up unshaved, wearing tight clothes post-wax). The FAQ accordion is different — it handles curiosity questions, not required reading.

```typescript
// Render as <ol> with numbered items, styled with brand colors
// Distinguish Prep vs Aftercare with different section icons
```

### Pattern 6: Ingredient Callout Box (Claude's Discretion)
**Recommendation:** A distinct callout box with a subtle background (`bg-brand-light` or `bg-brand-secondary/8`), a honey/leaf icon, headline "What We Use", ingredient list, and a "What We Don't Use" counter-list (no parabens, no harsh chemicals, no rosin). Box should feel like a premium product label — this is a key differentiator for sensitive-skin clients.

### Pattern 7: Sticky Category Pills on Menu Page
**What:** A horizontal row of category pills that stick to the top (below the header) and smooth-scroll to section IDs.
**Implementation:** `"use client"` component, uses `useEffect` + scroll listener to highlight active pill. Stick position at `top-16 lg:top-20` to clear the fixed header.

### Section ID Convention for Menu Page
Category sections need anchor IDs for scroll-to behavior:
```
id="category-face"
id="category-body"
id="category-intimate"
id="category-packages"
```

### Anti-Patterns to Avoid
- **Fetching data in components:** All service data is static — import directly from `@/content/services`. Never add a `fetch()` call or API route for this content.
- **Client components at page level:** Only `CategoryPills` and `FAQAccordion` need `"use client"`. Everything else is Server Component.
- **Guessing testimonial service names:** The `service` field in testimonials.ts uses display names like "Brazilian Wax" not slugs. Match on name, not slug.
- **Sync params access:** In Next.js 15+, `params` is a Promise. Always `await params` before accessing `slug`. Synchronous access triggers a deprecation warning.
- **Hardcoding booking URL:** Always use `clientConfig.bookingUrl` via `BookingLink` component — never hardcode the URL.
- **Nullable price without fallback:** `Service.price` is `number | null`. Always use `service.priceDisplay` (always a string) for display, not raw `service.price`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Metadata generation | Custom metadata object | `generatePageMetadata()` from `@/lib/metadata` | Already handles canonical, OG, Twitter, metadataBase |
| Booking CTA links | `<a href={bookingUrl}>` | `<BookingLink>` component | Handles 48px tap target, target="_blank", variant styling |
| Section containers | Custom div with max-width | `<SectionWrapper>` | Consistent padding, max-w-7xl, bg variants |
| FAQ toggle state | `useState` + CSS | `FAQAccordion` (build once) | Reuse across all service pages |
| Service navigation | Manual Link tags | `<Breadcrumbs>` already built | Phase 2 component handles all formatting |
| Entrance animations | CSS @keyframes | `<FadeUp delay={n * 0.1}>` | Consistent easing (0.22, 1, 0.36, 1), once-only |

## Common Pitfalls

### Pitfall 1: Sync params access
**What goes wrong:** Accessing `params.slug` directly (without await) triggers Next.js deprecation warnings in 15+; will break in future version.
**Why it happens:** Next.js 15 changed params to be a Promise; sync access still works but is deprecated.
**How to avoid:** Always use `const { slug } = await params` in async Server Components and `generateMetadata`. In Client Components, use `use(params)` from React.
**Warning signs:** Console warning "params should be awaited before using its properties."

### Pitfall 2: Missing dynamicParams = false
**What goes wrong:** Visiting `/services/made-up-slug` silently generates a 404 page at runtime instead of a build-time 404. More importantly, without `dynamicParams = false`, Next.js may attempt to dynamically render pages for slugs that don't exist.
**How to avoid:** Export `export const dynamicParams = false` from `app/services/[slug]/page.tsx`. This makes the slug set authoritative at build time.

### Pitfall 3: Testimonial service name mismatch
**What goes wrong:** `testimonials.ts` uses display names ("Brazilian Wax") but service slugs are kebab-case ("brazilian-wax"). Filtering by slug will return nothing.
**How to avoid:** Match on `service.name` (display name), not `service.slug`, when looking up testimonials. Verify the 5 service names in testimonials.ts that have a service field.

### Pitfall 4: CategoryPills scroll offset doesn't clear header
**What goes wrong:** Smooth-scroll lands with the section heading hidden under the fixed header (height: `h-16 lg:h-20` per layout.tsx).
**How to avoid:** Use `scroll-margin-top` on category section elements: `className="scroll-mt-16 lg:scroll-mt-20"` (matches layout.tsx header heights). This is a CSS property, apply it to the section element with the anchor ID.

### Pitfall 5: Service card style divergence between menu and related services
**What goes wrong:** Building two slightly different versions of the service card (one for menu, one for related services) creates visual inconsistency and double maintenance.
**How to avoid:** Build one `ServiceCard` component in `@/components/services` with a compact layout (name + price + duration + link). Use it in both `CategorySection` and `RelatedServices`.

### Pitfall 6: Hero section top spacing on service detail pages
**What goes wrong:** The HomepageHero uses `-mt-16 lg:-mt-20` to undercut the header for a full-bleed effect. Service pages should NOT do this — they need standard spacing (the header is solid color, not transparent, on interior pages).
**How to avoid:** Service page hero uses `SectionWrapper` with `bg="light"` or a simple div — no negative margin. The layout.tsx already adds `pt-16 lg:pt-20` on `<main>`, which provides correct clearance.

### Pitfall 7: Accordion accessibility
**What goes wrong:** A div-based accordion toggle is invisible to screen readers.
**How to avoid:** Use proper `<details>`/`<summary>` HTML OR add `aria-expanded`, `aria-controls`, `id` attributes manually. The `<details>` element is the simplest accessible approach and requires no JavaScript state.

## Code Examples

### generateStaticParams from data layer
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md
// + verified against allServices in src/content/services/index.ts

export function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}
// Returns 14 slugs:
// eyebrow-wax, upper-lip-wax, chin-wax, full-face-wax,
// underarm-wax, full-arm-wax, half-leg-wax, full-leg-wax, back-wax,
// bikini-wax, extended-bikini-wax, brazilian-wax,
// first-timer-package, smooth-all-over-package
```

### generateMetadata for service detail page
```typescript
// Source: generatePageMetadata in src/lib/metadata.ts (already built)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.metaTitle,       // pre-authored in data layer
    description: service.metaDescription, // pre-authored in data layer
    path: `/services/${service.slug}`,
    image: service.coverImage,
  });
}
```

### Service detail page — section order
```typescript
// Anxiety-first flow per CONTEXT.md decisions:
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const testimonial = getServiceTestimonial(service.name);
  const relatedServices = service.relatedServices
    .map(getServiceBySlug)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs items={[
        { label: "Services", href: "/services" },
        { label: service.name, href: `/services/${service.slug}` },
      ]} />
      {/* 1. Hero: image placeholder + H1 + price + Book Now */}
      <ServiceHero service={service} />
      {/* 2. What to Expect */}
      {/* 3. Prep (always-visible list) */}
      {/* 4. Aftercare (always-visible list) */}
      {/* 5. Ingredients callout box */}
      {/* 6. Inline testimonial (if found) */}
      {/* 7. FAQ accordion */}
      {/* 8. Related Services */}
      {/* 9. Bottom CTA */}
    </>
  );
}
```

### Accessible FAQ accordion with details/summary
```typescript
// Using native <details>/<summary> — no JS state, built-in accessible
// Source: HTML spec — verified pattern

function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <details key={i} className="group border border-brand-primary/15 rounded-xl overflow-hidden">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-brand-dark list-none">
            {faq.question}
            {/* Chevron rotates via group-open */}
            <ChevronIcon className="w-5 h-5 text-brand-primary group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
          </summary>
          <div className="px-5 pb-4 text-brand-dark/75 leading-relaxed">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
// group-open: requires Tailwind v3.2+ / v4 — verified in use in this project
// No "use client" needed — <details> state is browser-native
```

### Hero image placeholder (Claude's Discretion recommendation)
```typescript
// Gradient placeholder using brand colors — matches HomepageHero pattern
// but lighter/warmer (not the dark forest green from the homepage)
// Service pages use a lighter hero since they're interior pages

<div className="relative aspect-[16/7] lg:aspect-[16/6] bg-gradient-to-br from-brand-primary-light via-brand-light to-brand-secondary/20 rounded-2xl overflow-hidden">
  {/* Replace with: <Image fill src={service.coverImage} className="object-cover" alt="" priority /> */}
  <div className="absolute inset-0 flex items-center justify-center opacity-20">
    {/* Decorative brand pattern or leaf/honey icon */}
  </div>
</div>
```

### scroll-mt to clear fixed header
```typescript
// Source: layout.tsx — header height is h-16 lg:h-20
// Apply to any section with an anchor ID on the services menu page
<section
  id={`category-${category.slug}`}
  className="scroll-mt-[4.5rem] lg:scroll-mt-20"
>
// h-16 = 4rem, h-20 = 5rem. Adding 0.5rem gives breathing room above the section heading.
```

## All Services — Verified Slug List

From `src/content/services/`:

**Face (4):** `eyebrow-wax`, `upper-lip-wax`, `chin-wax`, `full-face-wax`
**Body (5):** `underarm-wax`, `full-arm-wax`, `half-leg-wax`, `full-leg-wax`, `back-wax`
**Intimate (3):** `bikini-wax`, `extended-bikini-wax`, `brazilian-wax`
**Packages (2):** `first-timer-package`, `smooth-all-over-package`
**Total: 14 services**

Requirements specify 6 minimum (Brazilian, Bikini, Eyebrow, Full Leg, Underarm, Facial). All 6 exist; the data layer has 14. The menu page shows all 14; `generateStaticParams` generates all 14 detail pages.

## Testimonials — Service Name Coverage

From `src/content/testimonials.ts`, these service names have matching testimonials:
- "Brazilian Wax" (2 testimonials)
- "First-Timer Package"
- "Eyebrow Wax"
- "Bikini Wax"
- "Underarm Wax"

Services WITHOUT a matching testimonial (return null, skip card): upper-lip-wax, chin-wax, full-face-wax, full-arm-wax, half-leg-wax, full-leg-wax, back-wax, extended-bikini-wax, smooth-all-over-package.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13 | Different function name, same concept |
| Sync params access (`params.slug`) | Async params access (`await params`) | Next.js 15 | Must await — sync is deprecated |
| `framer-motion` import | `motion/react` import | motion v12 | ALL motion imports in this project use `motion/react` |

**Deprecated in this project:**
- `framer-motion`: Do not import from this package. The project uses `motion/react` (locked in Phase 1).
- Sync params: `params.slug` without await works but is deprecated.

## Open Questions

1. **Schema.org for individual service pages**
   - What we know: `schema.ts` has `generateWaxingBusinessSchema` for LocalBusiness but no Service schema generator
   - What's unclear: Phase 8 is listed as "SEO & Schema" — does Phase 5 add Service schema per page, or does Phase 8 handle it?
   - Recommendation: Add a `generateServiceSchema` function to `schema.ts` in Phase 5 and inject it via `SchemaScript` on each detail page. If Phase 8 is dedicated to schema, stub it out now with a TODO comment. Do not block Phase 5 on this.

2. **CategoryPills scroll highlighting**
   - What we know: Sticky pills need to highlight the active category as user scrolls
   - What's unclear: Is IntersectionObserver needed, or is CSS `:target` pseudo-class sufficient?
   - Recommendation: Use `IntersectionObserver` in the `CategoryPills` client component — CSS `:target` only activates on direct navigation (hash changes), not scroll. Keep it simple: observe the first element of each category section.

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md` — dynamic route conventions, params-as-Promise pattern
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` — generateStaticParams API, dynamicParams config
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` — generateMetadata async pattern
- `src/lib/types.ts` — Service interface (verified all fields: preparation[], aftercare[], ingredients[], faqs[], relatedServices[], painLevel, sensitiveSkintSafe)
- `src/content/services/` — all 14 service slugs verified
- `src/content/testimonials.ts` — testimonial service name coverage verified
- `src/components/ui/` — all 8 existing primitives verified
- `src/app/layout.tsx` — header height (h-16 lg:h-20), pt-16 lg:pt-20 on main confirmed
- `src/app/globals.css` — all brand color tokens verified

### Secondary (MEDIUM confidence)
- HTML spec `<details>`/`<summary>` for accessible accordion — standard element, no verification needed beyond HTML spec knowledge

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against installed packages and all prior phases
- Architecture: HIGH — Next.js docs confirm dynamic route and generateStaticParams patterns; App Router patterns match established codebase conventions
- Pitfalls: HIGH — all derived from actual codebase examination (layout heights, params behavior from docs, testimonial data cross-referenced)
- Claude's Discretion recommendations: MEDIUM — design judgment calls, defensible but subjective

**Research date:** 2026-03-29
**Valid until:** 2026-04-29 (Next.js 16.x stable — unlikely to change in 30 days)
