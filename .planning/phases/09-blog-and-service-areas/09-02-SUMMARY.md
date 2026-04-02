---
phase: 09-blog-and-service-areas
plan: 02
subsystem: ui
tags: [nextjs, typescript, service-areas, schema-org, sitemap, local-seo]

# Dependency graph
requires:
  - phase: 09-01
    provides: blog pipeline, stub schema generators (generateBlogPostSchema, generateServiceAreaSchema)
  - phase: 03-data-layer
    provides: service-areas.ts with 6 ServiceArea objects, allServices
  - phase: 08-contact-and-seo
    provides: sitemap.ts foundation, SchemaScript, schema generators pattern
provides:
  - 6 neighborhood service area pages at /service-areas/[slug] with genuinely localized content
  - /service-areas index page listing all 6 neighborhoods as cards
  - Full generateBlogPostSchema (mainEntityOfPage, dateModified, normalized imageUrl)
  - Full generateServiceAreaSchema (areaServed City with containedInPlace county, telephone, PostalAddress)
  - Updated sitemap with 31 total routes covering all blog + service area URLs
  - 5 service area components (Server Components): ServiceAreaHero, LocalContextSection, ServiceHighlights, LocalHighlightCard, CoverageArea
affects: [phase-10-manual-qa, sitemap-verification, local-seo-audit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Service area component tree: all Server Components, no use client escalation"
    - "CoverageArea slug-matching: slugify nearbyArea names, check against serviceAreas Set — links only for pages that exist"
    - "Testimonial city-match: split area.city on space, match against testimonial.location — handles multi-word city names"
    - "Highlight service selection: static HIGHLIGHT_SLUGS const (brazilian-wax, eyebrow-wax, full-leg-wax) — 1 intimate + 1 face + 1 body"
    - "Sitemap async pattern: export default async function sitemap() — required when including getAllPosts()"

key-files:
  created:
    - src/components/service-areas/ServiceAreaHero.tsx
    - src/components/service-areas/LocalContextSection.tsx
    - src/components/service-areas/ServiceHighlights.tsx
    - src/components/service-areas/LocalHighlightCard.tsx
    - src/components/service-areas/CoverageArea.tsx
    - src/components/service-areas/index.ts
    - src/app/service-areas/[slug]/page.tsx
    - src/app/service-areas/page.tsx
  modified:
    - src/lib/schema.ts
    - src/app/sitemap.ts

key-decisions:
  - "SectionWrapper bg='cream' does not exist — plan used incorrect variant name; used bg='light' (which IS the cream color #FAF3EF)"
  - "Testimonials from testimonials.ts all use 'Omaha, NE' location — Papillion and Bellevue area pages will have no testimonials section (correct behavior: section omitted when empty)"
  - "HIGHLIGHT_SLUGS static const in page.tsx — same 3 services shown on all area pages; no area-to-service mapping needed at this scale"
  - "ServiceAreaHero uses SectionWrapper innerClassName for pt-32 lg:pt-40 — negative margin -mt-16 lg:-mt-20 on className prop"

patterns-established:
  - "Service area pages: Breadcrumbs > Hero > LocalContext > ServiceHighlights > LocalHighlight > Testimonials (conditional) > CoverageArea > CTA"
  - "CoverageArea cross-linking: only link to areas with existing pages, render unmatched as plain text"

# Metrics
duration: 4min
completed: 2026-04-02
---

# Phase 9 Plan 02: Service Area Pages Summary

**6 Omaha neighborhood pages with genuine local content, full schema generators replacing Plan 01 stubs, and a 31-route sitemap covering all blog + service area URLs**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-04-02T23:02:11Z
- **Completed:** 2026-04-02T23:05:51Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- 5 service area Server Components built (ServiceAreaHero, LocalContextSection, ServiceHighlights, LocalHighlightCard, CoverageArea) plus barrel export
- 6 neighborhood detail pages at /service-areas/[slug] with genuinely distinct localized content pulled from service-areas.ts
- /service-areas index page with responsive 3-column card grid
- CoverageArea cross-links only to neighborhoods with actual pages — unmatched nearbyAreas render as plain text (prevents broken links)
- generateBlogPostSchema upgraded with dateModified, mainEntityOfPage, normalized imageUrl
- generateServiceAreaSchema upgraded with areaServed City + containedInPlace county, telephone, full PostalAddress
- sitemap.ts converted to async, now emits 31 routes (8 static + 14 services + 3 blog + 6 service areas)

## Task Commits

1. **Task 1: Service area components, dynamic route, index page** - `094aab6` (feat)
2. **Task 2: Schema generators full implementation and sitemap update** - `851c991` (feat)

**Plan metadata:** `[tbd]` (docs: complete plan)

## Files Created/Modified
- `src/components/service-areas/ServiceAreaHero.tsx` — full-width primary bg hero with negative margin pattern
- `src/components/service-areas/LocalContextSection.tsx` — neighborhood pills, localContext, weatherContext callout
- `src/components/service-areas/ServiceHighlights.tsx` — 3-service card grid linking to /services/[slug]
- `src/components/service-areas/LocalHighlightCard.tsx` — blush bg landmark card with neighborhood label
- `src/components/service-areas/CoverageArea.tsx` — slug-matched cross-links for nearby areas
- `src/components/service-areas/index.ts` — barrel export for all 5 components
- `src/app/service-areas/[slug]/page.tsx` — dynamic route, generateStaticParams, generateMetadata, full section layout
- `src/app/service-areas/page.tsx` — index page listing 6 neighborhoods
- `src/lib/schema.ts` — replaced generateBlogPostSchema + generateServiceAreaSchema stubs with full implementations
- `src/app/sitemap.ts` — async function, added blog + service area routes, 31 total URLs

## Decisions Made
- `bg="cream"` in the plan spec does not exist in SectionWrapper — the five valid variants are "white", "light", "dark", "primary", "blush". Used `bg="light"` for LocalContextSection (light IS the cream color #FAF3EF).
- Testimonials in testimonials.ts all carry `location: "Omaha, NE"` — the city-match logic for Papillion and Bellevue returns no matches, so those area pages omit the testimonials section entirely (correct behavior).
- HIGHLIGHT_SLUGS static const shows the same 3 services (Brazilian, Eyebrow, Full Leg) on every area page — sufficient coverage without over-engineering a mapping layer.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed incorrect bg variant name "cream" → "light"**
- **Found during:** Task 1 (LocalContextSection.tsx authoring)
- **Issue:** Plan specified `bg="cream"` but SectionWrapper only accepts "white" | "light" | "dark" | "primary" | "blush". The cream color (#FAF3EF) maps to `bg="light"`.
- **Fix:** Used `bg="light"` in LocalContextSection
- **Files modified:** src/components/service-areas/LocalContextSection.tsx
- **Verification:** Build passes, no TypeScript errors
- **Committed in:** 094aab6

---

**Total deviations:** 1 auto-fixed (1 bug — incorrect prop value in plan spec)
**Impact on plan:** Trivial. bg="light" is the correct variant for the cream color the plan intended.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- All 6 service area pages live and building correctly
- Blog + service area routes confirmed in sitemap output (31 total)
- Phase 10 (Manual QA) can now verify all service area pages, blog pages, schema, and sitemap
- Potential improvement: Add area-specific testimonials to testimonials.ts with Papillion/Bellevue locations to populate those area pages' testimonials sections

---
*Phase: 09-blog-and-service-areas*
*Completed: 2026-04-02*
