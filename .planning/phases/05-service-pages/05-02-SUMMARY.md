---
phase: 05-service-pages
plan: 02
subsystem: ui
tags: [next.js, react, tailwind, server-components, static-generation, ssg]

# Dependency graph
requires:
  - phase: 05-01
    provides: ServiceCard, CategorySection, CategoryPills, /services page
  - phase: 03-data-layer
    provides: Service type, allServices, getServiceBySlug, testimonials, FAQ type, Testimonial type
  - phase: 02-layout-shell
    provides: SectionWrapper, FadeUp, BookingLink, PhoneLink, StarRating, Breadcrumbs
provides:
  - 14 static service detail pages at /services/[slug]
  - PainLevelBadge with color-coded pain levels (green/amber/rose)
  - IngredientCallout with what-we-use / never-use two-column layout
  - FAQAccordion using native details/summary (no JS state)
  - ServiceTestimonial inline quote card with null guard
  - RelatedServices grid reusing ServiceCard from Plan 01
affects:
  - 06-first-visit (may link to service pages)
  - 08-seo-schema (BreadcrumbList schema for service detail pages)
  - 10-qa (manual verification of all 14 service detail pages)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - generateStaticParams + dynamicParams=false for strict 404 on unknown slugs
    - params is Promise<{slug}> — must await in both generateMetadata and page component
    - native details/summary for accordion (zero JS, accessible by default)
    - testimonial matched at render time via find() on service.name — no data duplication
    - related services resolved at render time via map/filter/slice — pure functions, no store

key-files:
  created:
    - src/components/services/PainLevelBadge.tsx
    - src/components/services/IngredientCallout.tsx
    - src/components/services/FAQAccordion.tsx
    - src/components/services/ServiceTestimonial.tsx
    - src/components/services/RelatedServices.tsx
    - src/app/services/[slug]/page.tsx
  modified:
    - src/components/services/index.ts

key-decisions:
  - "dynamicParams = false makes unknown slugs 404 at request time (not just build time)"
  - "FAQAccordion uses native details/summary — no use client, no framer-motion, fully accessible"
  - "ServiceTestimonial wraps FadeUp internally so page.tsx does not need to wrap it"
  - "IngredientCallout uses bg-brand-secondary/8 — requires Tailwind to have this opacity step available"
  - "Prep and aftercare use numbered circles with different brand colors (primary vs secondary) to visually distinguish the two lists"
  - "Alternating FAQ section bg depends on whether a testimonial is present — avoids two consecutive light sections"

patterns-established:
  - "Null/empty guards: all conditional components return null internally — page.tsx stays clean"
  - "Promise params pattern: both generateMetadata and page component await params before accessing slug"
  - "Anxiety-first layout order: hero CTA → What to Expect → Prep → Aftercare → Ingredients → Testimonial → FAQ → Related → CTA"

# Metrics
duration: 3min
completed: 2026-03-30
---

# Phase 5 Plan 02: Service Detail Pages Summary

**14 static service detail pages generated via generateStaticParams, each with anxiety-first layout (hero/prep/aftercare/FAQ/related) and 5 new server components including a native-details/summary FAQAccordion**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-30T22:57:32Z
- **Completed:** 2026-03-30T23:00:58Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- 5 new service detail components (PainLevelBadge, IngredientCallout, FAQAccordion, ServiceTestimonial, RelatedServices) — all Server Components, all with graceful null/empty handling
- /services/[slug] dynamic route generating all 14 service pages statically; unknown slugs 404 via dynamicParams=false
- Full anxiety-first section composition: hero with booking CTA above fold, always-visible prep/aftercare lists, conditional testimonial/ingredients, FAQ accordion, related services grid

## Task Commits

1. **Task 1: Service detail components** - `d1fdff9` (feat)
2. **Task 2: /services/[slug] dynamic route** - `5ea75c8` (feat)

**Plan metadata:** (committed after this summary)

## Files Created/Modified

- `src/components/services/PainLevelBadge.tsx` - Pain level pill (green 1-2, amber 3, rose 4-5) + sensitive-skin pill
- `src/components/services/IngredientCallout.tsx` - Two-column what-we-use/never-use callout box
- `src/components/services/FAQAccordion.tsx` - Native details/summary accordion, chevron rotation via group-open
- `src/components/services/ServiceTestimonial.tsx` - Quote card with StarRating, FadeUp, null guard
- `src/components/services/RelatedServices.tsx` - ServiceCard grid in SectionWrapper, empty guard
- `src/app/services/[slug]/page.tsx` - Async server component, generateStaticParams, generateMetadata, full page composition
- `src/components/services/index.ts` - Barrel updated from 3 to 8 exports

## Decisions Made

- **dynamicParams = false**: Unknown slugs 404 at request time, not just missing from build output. This is the correct behavior for a content-driven site.
- **Native details/summary for FAQ**: Avoids any client-side JS for expand/collapse. Fully accessible by default, works without JavaScript. group-open Tailwind class rotates the chevron SVG.
- **Testimonial matched at render time**: `testimonials.find(t => t.service?.toLowerCase() === service.name.toLowerCase())`. No data duplication, no pre-computed mapping needed.
- **Prep vs aftercare visual distinction**: Prep uses brand-primary/15 circles, aftercare uses brand-secondary/20 circles — different colors signal "before" vs "after" without text labels.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 14 service detail pages render correctly with full anxiety-first layout
- /services/[slug] ready for Phase 8 SEO/schema additions (BreadcrumbList, Service schema)
- RelatedServices reuses ServiceCard — consistent with /services menu page
- Phase 6 (First Visit page) can link directly to individual service pages
- Only remaining item in Phase 5: phase is now complete (2/2 plans done)

---
*Phase: 05-service-pages*
*Completed: 2026-03-30*
