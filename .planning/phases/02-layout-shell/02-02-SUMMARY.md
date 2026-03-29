---
phase: 02-layout-shell
plan: 02
subsystem: ui
tags: [next.js, react, motion, tailwindcss, mobile-nav, footer, booking-bar, breadcrumbs]

# Dependency graph
requires:
  - phase: 02-layout-shell/02-01
    provides: NavContext (useNav hook), Header, layout/index.ts barrel, layout.tsx with NavProvider + pt offsets

provides:
  - MobileNav.tsx — AnimatePresence right-panel drawer with body scroll lock, PhoneLink + BookingLink CTAs
  - BookingBar.tsx — fixed bottom mobile bar with Call + Book Now, env(safe-area-inset-bottom) iPhone support
  - Footer.tsx — 4-column dark charcoal footer with social icons and cancellation policy sub-bar
  - Breadcrumbs.tsx — server component text trail with "/" separators, auto-prepends Home
  - Updated layout/index.ts — complete barrel: NavProvider, useNav, Header, MobileNav, Footer, BookingBar, Breadcrumbs
  - Updated layout.tsx — full layout shell wired with all chrome components

affects:
  - All future phases — full layout chrome now present on every page
  - Phase 3+ page builds — Footer links to /services/face, /services/body, /services/intimate, /services/packages
  - Phase 8 — BreadcrumbList schema added per-page via SchemaScript (Breadcrumbs defers schema)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - AnimatePresence from motion/react for mobile drawer (x: 100% → 0 slide + backdrop fade)
    - useEffect body scroll lock pattern (cleanup in return function to prevent leaks)
    - env(safe-area-inset-bottom) inline style for iPhone home bar safe area (not a Tailwind class)
    - z-index layering: BookingBar z-40, MobileNav backdrop z-40, MobileNav drawer z-50

key-files:
  created:
    - src/components/layout/MobileNav.tsx
    - src/components/layout/BookingBar.tsx
    - src/components/layout/Footer.tsx
    - src/components/layout/Breadcrumbs.tsx
  modified:
    - src/components/layout/index.ts
    - src/app/layout.tsx

key-decisions:
  - "Social fields are top-level on clientConfig (instagramUrl, facebookUrl, tiktokUrl) — not nested in social{} — plan template used social.instagram but actual type has instagramUrl"
  - "Footer is a server component — reads clientConfig directly, no client-side state needed"
  - "Breadcrumbs defers BreadcrumbList schema to Phase 8 — component is pure UI, schema added per-page"
  - "BookingBar z-40 matches backdrop z-40; drawer z-50 ensures drawer always renders above bar"

patterns-established:
  - "Pattern: env(safe-area-inset-bottom) as inline style — Tailwind cannot interpolate CSS env() functions in arbitrary values"
  - "Pattern: Social icons as inline SVG in Footer — no external icon library dependency"
  - "Pattern: Layout barrel complete — all layout components imported from @/components/layout"

# Metrics
duration: 3min
completed: 2026-03-29
---

# Phase 02 Plan 02: Layout Shell — MobileNav + BookingBar + Footer + Breadcrumbs Summary

**AnimatePresence mobile drawer, fixed-bottom iPhone-safe booking bar, 4-column dark footer with social SVGs, and server-component breadcrumb trail completing the full waxing template layout shell**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T17:01:36Z
- **Completed:** 2026-03-29T17:04:53Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- MobileNav renders an AnimatePresence right-panel drawer with x: 100% → 0 slide, backdrop fade, body scroll lock, and PhoneLink + BookingLink CTAs always visible at drawer bottom
- BookingBar is fixed z-40 at screen bottom on mobile, hidden on desktop, with `env(safe-area-inset-bottom)` iPhone home bar safety
- Footer is a server component with 4-column dark charcoal layout, inline SVG social icons (Instagram/Facebook/TikTok), cancellation policy sub-bar, and auto-year copyright
- Breadcrumbs auto-prepends Home — consumers pass only interior items, schema deferred to Phase 8
- Full layout shell: NavProvider → Header → MobileNav → main → Footer → BookingBar + SchemaScript — production build passes cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: MobileNav — AnimatePresence drawer with body scroll lock** - `b39d6b5` (feat)
2. **Task 2: BookingBar + Footer + Breadcrumbs** - `c34371b` (feat)
3. **Task 3: Wire MobileNav + Footer + BookingBar into layout shell** - `743e444` (feat)

## Files Created/Modified
- `src/components/layout/MobileNav.tsx` — AnimatePresence right-panel drawer, backdrop, body scroll lock, nav links, PhoneLink + BookingLink CTAs
- `src/components/layout/BookingBar.tsx` — fixed bottom mobile bar, z-40, lg:hidden, iPhone safe area
- `src/components/layout/Footer.tsx` — 4-column server component, social icons, cancellation policy, copyright
- `src/components/layout/Breadcrumbs.tsx` — server component text trail, "/" separators, auto-prepends Home
- `src/components/layout/index.ts` — complete barrel export for all 6 layout components
- `src/app/layout.tsx` — full layout shell wired: NavProvider + Header + MobileNav + main + Footer + BookingBar + SchemaScript

## Decisions Made
- **Social field names:** `clientConfig.social.instagram` in the plan template would have caused TypeScript errors — the actual `WaxingClientConfig` type uses top-level `instagramUrl`, `facebookUrl`, `tiktokUrl`. Used the correct field names. [Rule 1 - Bug fix applied proactively]
- **Footer as server component:** No client state needed — clientConfig is static data. Keeping it a server component avoids unnecessary bundle weight.
- **Breadcrumbs schema deferral:** BreadcrumbList schema is page-specific (each page has different items) — adding it to the Breadcrumbs component would require per-page schema config. Deferred to Phase 8 where SchemaScript is added per page.
- **env(safe-area-inset-bottom) inline style:** Tailwind cannot process CSS environment variables in utility classes — must be applied as inline style on the BookingBar container div.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected social media field names in Footer**
- **Found during:** Task 2 (Footer.tsx implementation)
- **Issue:** Plan template used `clientConfig.social.instagram`, `clientConfig.social.facebook`, `clientConfig.social.tiktok` — but `WaxingClientConfig` in `src/lib/types.ts` defines these as top-level fields: `instagramUrl`, `facebookUrl`, `tiktokUrl`
- **Fix:** Used correct field names: `clientConfig.instagramUrl`, `clientConfig.facebookUrl`, `clientConfig.tiktokUrl`
- **Files modified:** `src/components/layout/Footer.tsx`
- **Verification:** `npx tsc --noEmit` passed with zero errors
- **Committed in:** `c34371b` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — incorrect field names from plan template)
**Impact on plan:** Fix was necessary for TypeScript correctness. No scope creep.

## Issues Encountered

None — aside from the social field name correction handled as a deviation.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Full layout shell is complete: NavContext, Header, MobileNav, BookingBar, Footer, Breadcrumbs all wired into layout.tsx
- Phase 2 goal is complete — every page now renders with full chrome: fixed header, mobile drawer, bottom booking bar, dark footer
- Phase 3 can begin immediately — layout.tsx is stable, no further layout changes expected
- Footer Services links (/services/face, /services/body, /services/intimate, /services/packages) are placeholder routes — Phase 5 builds the actual service pages

---
*Phase: 02-layout-shell*
*Completed: 2026-03-29*
