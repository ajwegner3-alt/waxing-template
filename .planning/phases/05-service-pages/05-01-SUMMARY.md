---
phase: 05-service-pages
plan: 01
subsystem: ui
tags: [nextjs, react, server-components, intersection-observer, tailwind]

# Dependency graph
requires:
  - phase: 03-data-layer
    provides: serviceCategories, allServices, getServicesByCategory, Service types
  - phase: 04-homepage
    provides: SectionWrapper, FadeUp, BookingLink UI primitives, Breadcrumbs component
provides:
  - ServiceCard component — compact card with priceDisplay, duration, line-clamp-2 description
  - CategorySection component — anchor section with scroll-mt, alternating bg, stagger grid
  - CategoryPills component — sticky pill nav with IntersectionObserver active tracking
  - /services route — all 14 services in 4 stacked categories, static page, with metadata
affects: [05-service-pages plan 02, Phase 6 first-visit page]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component + FadeUp wrapper — same as homepage section pattern"
    - "CategoryPills is sole use client in services/ component tree"
    - "IntersectionObserver threshold 0.2, rootMargin -80px 0px -60% 0px for header-aware active section tracking"
    - "Alternating bg via index % 2 in page.tsx — no bg prop on CategorySection default"

key-files:
  created:
    - src/components/services/ServiceCard.tsx
    - src/components/services/CategorySection.tsx
    - src/components/services/CategoryPills.tsx
    - src/components/services/index.ts
    - src/app/services/page.tsx
  modified: []

key-decisions:
  - "CategoryPills uses plain IntersectionObserver — no motion/react needed for pill toggle"
  - "ServiceCard uses priceDisplay (never raw price) — null-safety locked per Phase 4 decision"
  - "Alternating bg computed in page.tsx via index % 2 === 0, not hardcoded in CategorySection"
  - "Bottom CTA uses !bg-white !text-brand-primary Tailwind important override — same pattern as FinalCTA on homepage"

patterns-established:
  - "services/ component barrel: index.ts grows as Plan 02 adds RelatedServices and ServiceDetailHero"
  - "CategorySection anchor id format: category-{slug} — must stay consistent for CategoryPills scroll targeting"

# Metrics
duration: 2min
completed: 2026-03-30
---

# Phase 5 Plan 01: Service Menu Page Summary

**Sticky-pill /services menu page with all 14 waxing services in 4 IntersectionObserver-tracked category sections, built from ServiceCard + CategorySection + CategoryPills Server Component tree**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-30T22:52:42Z
- **Completed:** 2026-03-30T22:54:42Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- ServiceCard, CategorySection, CategoryPills components with clean TypeScript — zero tsc errors
- /services page builds as static Next.js route with full metadata (title, description, OG, canonical)
- CategoryPills sticky bar with IntersectionObserver active-pill tracking (threshold 0.2, rootMargin -80px 0px -60% 0px)

## Task Commits

1. **Task 1: ServiceCard + CategorySection + CategoryPills components** - `c10f189` (feat)
2. **Task 2: /services menu page with metadata** - `2435050` (feat)

**Plan metadata:** (pending docs commit)

## Files Created/Modified

- `src/components/services/ServiceCard.tsx` - Server Component, priceDisplay, line-clamp-2, inline arrow SVG, FadeUp wrapper
- `src/components/services/CategorySection.tsx` - Anchor section with scroll-mt, alternating bg prop, stagger delays on cards
- `src/components/services/CategoryPills.tsx` - use client, sticky z-30, IntersectionObserver active tracking
- `src/components/services/index.ts` - Barrel export; grows in Plan 02
- `src/app/services/page.tsx` - Server Component, generatePageMetadata, Breadcrumbs, CategoryPills + CategorySection map, bottom CTA

## Decisions Made

- CategoryPills uses plain IntersectionObserver — motion/react not needed since pill toggle is a simple state swap, not an entrance animation.
- Alternating bg (`index % 2`) computed in page.tsx rather than baked into CategorySection — keeps the component reusable for edge cases where a different bg sequence might be wanted.
- Bottom CTA uses `!bg-white !text-brand-primary` Tailwind important override — same pattern established in FinalCTA (Phase 4 plan 02), keeps BookingLink composable without a new variant.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- /services page is complete and static-rendered — ready for Plan 02 (service detail pages at /services/[slug])
- ServiceCard is reusable — Plan 02 RelatedServices section can import it directly from `@/components/services`
- CategoryPills anchor format `category-{slug}` is locked — Plan 02 must not rename section IDs

---
*Phase: 05-service-pages*
*Completed: 2026-03-30*
