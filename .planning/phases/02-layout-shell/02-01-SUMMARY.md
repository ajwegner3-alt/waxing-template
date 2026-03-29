---
phase: 02-layout-shell
plan: 01
subsystem: ui
tags: [next.js, react-context, motion, tailwindcss, header, navigation, scroll-animation]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: BookingLink component, clientConfig, SchemaScript, generateWaxingBusinessSchema, globals.css tokens, layout.tsx font setup

provides:
  - NavContext.tsx — NavProvider + useNav hook for shared mobile nav open/close state
  - Header.tsx — scroll-aware transparent/solid fixed header with desktop nav and hamburger
  - src/components/layout/index.ts — barrel export for all layout components
  - Updated layout.tsx — NavProvider + Header + SchemaScript wired into root layout

affects:
  - 02-02 (MobileNav — consumes useNav and is wired next to Header in layout.tsx)
  - All future phases — every page now has the fixed header and pt-16 lg:pt-20 offset applied

# Tech tracking
tech-stack:
  added: []
  patterns:
    - NavContext pattern — React Context for sibling component state sharing (Header + MobileNav)
    - Scroll-aware header — useScroll + useMotionValueEvent from motion/react (not framer-motion)
    - Fixed header with main pt-16 lg:pt-20 offset to prevent content hiding under header

key-files:
  created:
    - src/components/layout/NavContext.tsx
    - src/components/layout/Header.tsx
    - src/components/layout/index.ts
  modified:
    - src/app/layout.tsx

key-decisions:
  - "Header is fixed (not sticky) — required for transparent-over-hero effect; sticky would push content down"
  - "Scroll threshold is 60px — clears hero badge/eyebrow before transition triggers"
  - "SchemaScript placed outside NavProvider — renders a script tag with no nav dependency"
  - "NAV_LINKS has 5 items: Services, First Visit, About, FAQ, Contact — no Home in desktop nav"
  - "Hamburger bars use hardcoded hex (#2C2C2C, white) matching brand tokens — Tailwind classes for brand colors omitted to avoid potential TW4 token resolution issues at runtime"

patterns-established:
  - "Pattern: Import from motion/react (not framer-motion) — established in Phase 1 FadeUp.tsx, continued here"
  - "Pattern: Layout barrel export — all layout components imported from @/components/layout"
  - "Pattern: NavProvider outermost wrapper in layout.tsx — both Header and MobileNav are consumers"

# Metrics
duration: 2min
completed: 2026-03-29
---

# Phase 02 Plan 01: Layout Shell — NavContext + Header Summary

**Scroll-aware transparent-to-cream fixed header with Fraunces logo, 5 desktop nav links, honey-gold BookingLink CTA, hamburger wired to NavContext, and SchemaScript in root layout**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-29T16:57:27Z
- **Completed:** 2026-03-29T16:59:21Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- NavContext provides isMobileNavOpen/setIsMobileNavOpen to all layout consumers via React Context
- Header is fixed, starts transparent over the hero, transitions to bg-[#FAF3EF] + shadow-sm after 60px scroll using motion/react useScroll + useMotionValueEvent
- Root layout.tsx wires NavProvider + Header + SchemaScript; main has pt-16 lg:pt-20 pb-20 lg:pb-0 offsets
- Zero TypeScript errors, production build passes cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: NavContext — shared mobile nav open/close state** - `aeb147e` (feat)
2. **Task 2: Header — scroll-aware transparent/solid with desktop nav** - `771e58d` (feat)
3. **Task 3: Update layout.tsx and create layout/index.ts barrel** - `72d8af4` (feat)

## Files Created/Modified
- `src/components/layout/NavContext.tsx` — NavProvider + useNav hook, React Context for open/close state
- `src/components/layout/Header.tsx` — fixed scroll-aware header, 5 desktop nav links, BookingLink CTA, hamburger
- `src/components/layout/index.ts` — barrel export: NavProvider, useNav, Header; comments for Plan 02-02 additions
- `src/app/layout.tsx` — updated to wire NavProvider + Header + SchemaScript; main offset classes added

## Decisions Made
- **Fixed vs sticky header:** Plan specified `fixed` — required for transparent-over-hero effect. `sticky` would push content down and break the transparency.
- **60px scroll threshold:** Per plan spec. Clears hero badge area before the color transition fires.
- **SchemaScript outside NavProvider:** SchemaScript renders a bare `<script>` tag with no interaction or nav dependency — placing it outside NavProvider keeps it isolated and matches the 02-RESEARCH.md pattern.
- **NAV_LINKS constant:** 5 links (Services, First Visit, About, FAQ, Contact) — no Home link per plan spec. "First Visit" is a deliberate conversion signal for first-timers.
- **Hamburger color:** Used hardcoded hex values (#2C2C2C, white) rather than Tailwind brand token classes to avoid potential TW4 CSS variable resolution edge cases in conditional class strings.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- NavContext and Header are complete and committed — Plan 02-02 (MobileNav, Footer, BookingBar, Breadcrumbs) can begin immediately
- layout/index.ts barrel has comment placeholders for the 4 components Plan 02-02 will add
- All TypeScript compiles clean; build passes

---
*Phase: 02-layout-shell*
*Completed: 2026-03-29*
