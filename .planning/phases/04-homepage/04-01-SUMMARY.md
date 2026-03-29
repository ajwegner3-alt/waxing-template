---
phase: 04-homepage
plan: 01
subsystem: ui
tags: [next.js, react, tailwind, fraunces, motion, server-components]

# Dependency graph
requires:
  - phase: 03-data-layer
    provides: getServiceBySlug, PACKAGE_SLUGS, Service type with price/shortDescription
  - phase: 02-layout-shell
    provides: SectionWrapper, FadeUp, BookingLink, Button, Badge, fixed Header with pt-16 lg:pt-20 on main
  - phase: 01-foundation
    provides: clientConfig (reviewAverage, reviewCount, yearsInBusiness), brand tokens, Fraunces font
provides:
  - HomepageHero: full-viewport hero with gradient, comfort-first headline, two CTAs, trust badge
  - TrustBar: 4-stat dark section (Google rating, years, clients, certified)
  - WhatToExpect: 4 icon-card step grid, scroll anchor target for hero CTA
  - FirstTimerSpotlight: First-Timer Package card with dynamic pricing, savings badge, visual checklist
affects:
  - 04-homepage/04-02 and later plans that assemble the full homepage
  - Any page using these 4 components as building blocks

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "FadeUp from motion/react wraps static server content for entrance animation without use client on the section itself"
    - "Hero uses -mt-16 lg:-mt-20 to negate layout padding, pt-32 lg:pt-40 on inner content to clear fixed header"
    - "Nullable price fields handled with ?? fallback — types are authoritative, data is trusted at build time"
    - "Inline SVGs preferred over icon library dependency for small icon sets"
    - "scroll-mt-20 on anchor sections prevents fixed header clipping on smooth scroll"

key-files:
  created:
    - src/components/homepage/HomepageHero.tsx
    - src/components/homepage/TrustBar.tsx
    - src/components/homepage/WhatToExpect.tsx
    - src/components/homepage/FirstTimerSpotlight.tsx
  modified: []

key-decisions:
  - "Hero uses CSS gradient placeholder — photo swap is a one-line Image component replacement; comment left in file"
  - "price nullable — used ?? 70 fallback in FirstTimerSpotlight; the First-Timer Package always has a concrete price"
  - "Inline SVGs for WhatToExpect icons — 4 icons does not justify adding an icon library dependency"
  - "TrustBar uses bg=dark (charcoal) not blush — contrast differentiation from blush FirstTimerSpotlight"
  - "FadeUp wraps entire TrustBar stat grid as one unit; WhatToExpect cards use staggered per-card delay"

patterns-established:
  - "Homepage section: Server Component + FadeUp wrapper = animation without escalating to use client"
  - "Data-driven pricing: always getServiceBySlug, never hardcode prices in UI components"
  - "Comfort-first copy: headlines address anxiety, not features (Your First Wax Should Feel Good, not Brazilian Wax Services)"

# Metrics
duration: 3min
completed: 2026-03-29
---

# Phase 4 Plan 01: HomepageHero + TrustBar + WhatToExpect + FirstTimerSpotlight Summary

**Four anxiety-reducing homepage sections built as Server Components — hero fills edge-to-edge under transparent header, trust bar shows live clientConfig stats, step cards guide first-timers, and package spotlight pulls $70 pricing dynamically from the data layer.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T20:36:25Z
- **Completed:** 2026-03-29T20:39:46Z
- **Tasks:** 2
- **Files modified:** 4 created

## Accomplishments

- HomepageHero fills the full viewport with a gradient background, comfort-first headline ("Your First Wax Should Feel Good"), Book Now + First-Timer Guide CTAs, and a live trust badge from clientConfig
- TrustBar displays 4 stats (Google rating, years, client count, certified) directly from clientConfig with no hardcoded values
- WhatToExpect renders 4 inline-SVG icon cards with id="what-to-expect" and scroll-mt-20 so the hero CTA smooth-scrolls correctly without header clipping
- FirstTimerSpotlight pulls price via getServiceBySlug(PACKAGE_SLUGS.firstTimer) — $70 + $17 savings computed dynamically; visual checklist and dedicated BookingLink CTA

## Task Commits

Each task was committed atomically:

1. **Task 1: HomepageHero + TrustBar** - `b881522` (feat)
2. **Task 2: WhatToExpect + FirstTimerSpotlight** - `621d276` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/components/homepage/HomepageHero.tsx` — Full-viewport hero with gradient placeholder, trust badge, two CTAs; -mt-16 lg:-mt-20 edge-to-edge fill
- `src/components/homepage/TrustBar.tsx` — 4-stat dark trust bar reading from clientConfig
- `src/components/homepage/WhatToExpect.tsx` — 4 step icon cards; id="what-to-expect" anchor with scroll-mt-20
- `src/components/homepage/FirstTimerSpotlight.tsx` — First-Timer Package card with dynamic price, savings badge, checklist, CTA

## Decisions Made

- **Hero gradient placeholder:** Photo swap is a one-line replacement — comment left in file marking exact location. No placeholder image needed in dev.
- **price ?? fallback:** TypeScript type marks `price` as `number | null`; First-Timer Package always has a price, so `?? 70` is a safe fallback rather than a conditional render that hides pricing.
- **No icon library:** 4 inline SVGs for WhatToExpect is the right tradeoff — no `npm install`, no tree-shaking complexity, icons designed for their specific step contexts.
- **TrustBar bg="dark":** Charcoal immediately below the dark hero creates a visual band that separates hero from the cream content below without an abrupt jump.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Nullable price field in FirstTimerSpotlight**

- **Found during:** Task 2 (FirstTimerSpotlight implementation)
- **Issue:** TypeScript type defines `Service.price` as `number | null`; using `pkg.price` directly in JSX caused `TS18047: 'pkg.price' is possibly 'null'`
- **Fix:** Added `const price: number = pkg.price ?? 70` — uses ?? fallback so the known package price is always displayed; price computations (savings display) use the non-nullable local variable
- **Files modified:** src/components/homepage/FirstTimerSpotlight.tsx
- **Verification:** `npx tsc --noEmit` passes with zero errors
- **Committed in:** 621d276 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug: nullable type handling)
**Impact on plan:** Minimal — single line added to handle TypeScript strictness. No scope creep.

## Issues Encountered

None beyond the nullable price type, which was auto-fixed inline.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 4 components are Server Components (except FadeUp wrapper which is "use client" — established pattern)
- Components are ready to be assembled into the homepage page file in the next plan
- Hero photo slot is pre-marked for easy replacement once client provides `/images/hero.jpg`
- No blockers

---
*Phase: 04-homepage*
*Completed: 2026-03-29*
