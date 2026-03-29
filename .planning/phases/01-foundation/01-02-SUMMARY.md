---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [typescript, nextjs, tailwind-v4, motion, schema-org, beauty-business, fraunces, plus-jakarta-sans]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Tailwind v4 @theme design tokens, WaxingClientConfig interface (Plan 01 subset), client.config.ts with Honey & Bloom data, globals.css with blush cream base and brand tokens, motion package installed"
provides:
  - "Complete waxing template type system — all 8 interfaces including waxing-specific Service fields"
  - "generateWaxingBusinessSchema() — LocalBusiness+BeautyBusiness JSON-LD from clientConfig"
  - "generatePageMetadata() — Next.js Metadata object with canonical, OG, Twitter, robots"
  - "8 UI primitives: Button, Badge, SectionWrapper, BookingLink, PhoneLink, SchemaScript, FadeUp, StarRating"
  - "Barrel export at @/components/ui for all primitives"
affects:
  - "02-layout-shell (needs SchemaScript, BookingLink, PhoneLink, SectionWrapper)"
  - "All downstream phases (import Service, Staff, FAQ, Testimonial, ServiceArea from types.ts)"
  - "Service pages (Phase 3+) need Service interface with waxing-specific fields"
  - "Blog phase needs BlogPost with serviceSlug field"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "BeautyBusiness schema type — waxing studios use LocalBusiness+BeautyBusiness, not MedicalBusiness"
    - "Polymorphic Button pattern — href prop determines anchor vs button element"
    - "Barrel export pattern — all UI primitives imported from @/components/ui"
    - "motion/react import — NOT framer-motion (package renamed at v12+)"
    - "viewport once: true for scroll animations — elements animate once, no repeat on spa/wellness sites"
    - "5-variant SectionWrapper — white/light/dark/primary/blush for alternating section rhythm"

key-files:
  created:
    - src/lib/types.ts
    - src/lib/schema.ts
    - src/lib/metadata.ts
    - src/components/ui/Button.tsx
    - src/components/ui/Badge.tsx
    - src/components/ui/SectionWrapper.tsx
    - src/components/ui/BookingLink.tsx
    - src/components/ui/PhoneLink.tsx
    - src/components/ui/SchemaScript.tsx
    - src/components/ui/FadeUp.tsx
    - src/components/ui/StarRating.tsx
    - src/components/ui/index.ts
  modified: []

key-decisions:
  - "BeautyBusiness schema type — wax studios are personal care businesses, not medical practices. Uses @type ['LocalBusiness', 'BeautyBusiness'] not 'MedicalBusiness'"
  - "FAQ has optional category field with 7 anxiety-type union values — groups FAQs by first-timer concern type (pain, prep, privacy, hygiene, aftercare, sensitive-skin)"
  - "Service.serviceSlug in BlogPost (not treatmentSlug) — explicit naming convention distinguishing waxing template from medspa-template"
  - "SectionWrapper blush variant (bg-brand-light/60) — softer alternating section background distinct from full light variant"
  - "BookingLink simplified to single bookingUrl — removed consultationType/consultationUrl duality from medspa-template (waxing studios use one booking flow)"
  - "StarRating uses max prop (not maxStars) — minor naming simplification vs medspa-template reference"

patterns-established:
  - "Pattern 5: @/components/ui barrel — all UI primitives imported from single barrel, never individual file paths"
  - "Pattern 6: motion/react for animations — FadeUp sets the import convention for all motion work in downstream phases"
  - "Pattern 7: waxing-specific type fields — Service has sensitiveSkintSafe, painLevel, preparation[], aftercare[], ingredients[] not present in any medspa-template type"

# Metrics
duration: 4min
completed: 2026-03-29
---

# Phase 1 Plan 02: Type System and UI Primitives Summary

**8 waxing-specific TypeScript interfaces (including Service with sensitiveSkintSafe/painLevel/preparation/aftercare/ingredients), LocalBusiness+BeautyBusiness JSON-LD schema generator, and 8 UI primitives (Button/Badge/SectionWrapper/BookingLink/PhoneLink/SchemaScript/FadeUp/StarRating) with barrel export**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-29T01:54:15Z
- **Completed:** 2026-03-29T01:58:18Z
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments

- Extended types.ts from Plan 01's minimal WaxingClientConfig to the complete 8-interface type system — ServiceCategory, PainLevel, SkinSensitivity, Service (with 5 waxing-specific fields), Staff, FAQ (with 7-value anxiety category union), Testimonial, ServiceArea, BlogPost
- Created schema.ts with generateWaxingBusinessSchema() that returns @type ["LocalBusiness","BeautyBusiness"] JSON-LD — correctly typed as personal care, not medical
- Created metadata.ts with generatePageMetadata() helper with full OG, Twitter, canonical, and robots support
- Built all 8 UI primitives from medspa-template structural patterns, translated to waxing identity — Button uses rounded-xl (not rounded-lg), SectionWrapper adds "blush" variant, BookingLink simplified to single bookingUrl, FadeUp is new (no medspa equivalent)

## Task Commits

Each task was committed atomically:

1. **Task 1: Complete src/lib/types.ts with all waxing content interfaces** - `d704ada` (feat)
2. **Task 2: Create schema.ts and metadata.ts helpers** - `b78efc8` (feat)
3. **Task 3: Create all UI primitive components and barrel export** - `0b152cc` (feat)

## Files Created/Modified

- `src/lib/types.ts` - Complete waxing type system: WaxingClientConfig + 8 content interfaces, PainLevel and SkinSensitivity types
- `src/lib/schema.ts` - generateWaxingBusinessSchema() — BeautyBusiness JSON-LD from clientConfig
- `src/lib/metadata.ts` - generatePageMetadata() — Next.js Metadata with canonical/OG/Twitter/robots
- `src/components/ui/Button.tsx` - Polymorphic button (href→anchor), rounded-xl, 4 variants
- `src/components/ui/Badge.tsx` - trust/urgency/info variants with brand token classes
- `src/components/ui/SectionWrapper.tsx` - 5 bg variants: white/light/dark/primary/blush
- `src/components/ui/BookingLink.tsx` - Single bookingUrl from clientConfig, 3 display variants
- `src/components/ui/PhoneLink.tsx` - tel: link with formatPhoneHref, 48px tap targets
- `src/components/ui/SchemaScript.tsx` - JSON-LD injection utility
- `src/components/ui/FadeUp.tsx` - motion/react whileInView fade-up, viewport once: true
- `src/components/ui/StarRating.tsx` - brand-gold filled stars with half-star, value + count display
- `src/components/ui/index.ts` - Barrel export for all 8 primitives

## Decisions Made

- **BeautyBusiness schema type:** Waxing studios are personal care businesses, not medical practices. Using `@type: ["LocalBusiness", "BeautyBusiness"]` rather than MedicalBusiness. This ensures correct schema.org categorization and avoids implying medical regulation.
- **FAQ anxiety categories:** Added 7-value union type (first-timer, pain, prep, privacy, hygiene, aftercare, sensitive-skin) to FAQ.category. These map directly to the emotional concerns that first-time waxing clients search for — enables accordion grouping by concern type in Phase 4.
- **BlogPost.serviceSlug naming:** Named `serviceSlug` explicitly (not `treatmentSlug` from medspa-template). Waxing template uses Service not Treatment — keeping names consistent prevents confusion when both templates exist in the same repo.
- **BookingLink simplified:** Removed `consultationType` and `consultationUrl` from medspa-template's BookingLink. Waxing studios don't have a separate "consultation" booking flow — they have one booking URL. The simplification removes a prop that would never be used.
- **SectionWrapper blush variant:** Added `blush: "bg-brand-light/60"` as a fifth bg option. At 60% opacity it creates a visually distinct but related background for alternating sections without introducing a new color token.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- All TypeScript interfaces are available via `@/lib/types` — downstream phases can import Service, Staff, FAQ, Testimonial, ServiceArea, BlogPost without defining their own types
- All UI primitives available via `@/components/ui` barrel — Phase 2 (Layout Shell) can import Button, BookingLink, PhoneLink, SectionWrapper immediately
- SchemaScript ready for layout.tsx in Phase 2
- generateWaxingBusinessSchema() ready to wire into layout.tsx in Phase 2
- generatePageMetadata() ready for page-level metadata in Phase 3+
- FadeUp ready for scroll animations starting in Phase 3 (services pages)
- No blockers for Phase 2

---
*Phase: 01-foundation*
*Completed: 2026-03-29*
