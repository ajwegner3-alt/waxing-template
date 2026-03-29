---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [nextjs, tailwind-v4, typescript, next-font, fraunces, plus-jakarta-sans, design-tokens]

# Dependency graph
requires: []
provides:
  - Tailwind v4 @theme design tokens (9 color + 2 font tokens)
  - WaxingClientConfig TypeScript interface
  - client.config.ts with Honey & Bloom placeholder data
  - layout.tsx with Fraunces + Plus Jakarta Sans font loading
  - globals.css with blush cream base styles and noise-texture utility
affects:
  - 01-02 (UI primitives — imports tokens from globals.css)
  - All downstream phases (components consume clientConfig and brand token classes)

# Tech tracking
tech-stack:
  added:
    - next@16.2.1
    - react@19.2.4
    - tailwindcss@^4
    - "@tailwindcss/postcss@^4"
    - motion@^12.38.0
    - typescript@^5
  patterns:
    - Tailwind v4 @theme CSS-first tokens (no tailwind.config.js)
    - next/font/google variable font loading (zero layout shift)
    - Dual-change client.config.ts / globals.css color sync pattern

key-files:
  created:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/content/client.config.ts
    - src/lib/types.ts
  modified:
    - package.json (name, motion added)
    - postcss.config.mjs (already using @tailwindcss/postcss from scaffold)

key-decisions:
  - "Tailwind v4 @theme over tailwind.config.js — CSS-first, no JS config needed"
  - "Fraunces loaded as variable font (no weight array) for full SOFT/WONK axis access"
  - "Dual-change warning comments in both globals.css and client.config.ts for color sync"
  - "motion package installed now (not at component phase) — available for Plan 02 animations"
  - "No Header/Footer in this layout — minimal shell per plan scope"

patterns-established:
  - "Pattern 1: @theme tokens — all brand colors as --color-brand-* CSS variables, auto-generates Tailwind utilities"
  - "Pattern 2: Dual-change — color values duplicated intentionally in globals.css @theme AND client.config.ts colors{}"
  - "Pattern 3: next/font — all fonts loaded via next/font/google with variable prop matching @theme references"
  - "Pattern 4: clientConfig — all business data flows from src/content/client.config.ts, never hardcoded in components"

# Metrics
duration: 9min
completed: 2026-03-29
---

# Phase 1 Plan 01: Foundation Scaffold Summary

**Next.js 16.2.1 project scaffolded with Tailwind v4 @theme tokens (9 colors, 2 fonts), Fraunces + Plus Jakarta Sans via next/font, and a typed client.config.ts pre-populated with Honey & Bloom Wax Studio data**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-29T01:42:40Z
- **Completed:** 2026-03-29T01:51:54Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Scaffolded greenfield Next.js 16.2.1 app with Tailwind v4, TypeScript, and motion installed
- Wrote globals.css with full @theme block (9 brand color tokens + 2 font tokens), blush cream base styles, noise-texture utility, and DUAL-CHANGE WARNING comment mapping every token to its client.config.ts field
- Created WaxingClientConfig TypeScript interface, client.config.ts with Honey & Bloom placeholder data, and layout.tsx loading Fraunces as variable font and Plus Jakarta Sans — all wired together with correct CSS variable names

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js project and configure Tailwind v4** - `c149b2f` (chore)
2. **Task 2: Write globals.css with @theme design tokens and base styles** - `ce98f79` (feat)
3. **Task 3: Create layout.tsx with font loading and client.config.ts with Honey & Bloom data** - `09c5edf` (feat)

## Files Created/Modified

- `src/app/globals.css` - Tailwind v4 @theme with 9 color + 2 font tokens, blush cream body, noise-texture utility, prose-custom class
- `src/app/layout.tsx` - Fraunces (variable font) + Plus Jakarta Sans via next/font, metadata wired to clientConfig
- `src/content/client.config.ts` - Honey & Bloom placeholder data typed as WaxingClientConfig, DUAL-CHANGE warning
- `src/lib/types.ts` - WaxingClientConfig interface (Plan 01 subset; full content interfaces come in Plan 02)
- `package.json` - Named waxing-template, motion@^12.38.0 added
- `postcss.config.mjs` - @tailwindcss/postcss plugin (already configured by create-next-app)
- `tsconfig.json` - @/* path alias to ./src/*

## Decisions Made

- **Fraunces as variable font:** Loaded without explicit weight array so the full SOFT and WONK variable axes are accessible. Passing specific weights would restrict axis interpolation.
- **Dual-change pattern:** Color hex values appear in both globals.css @theme and client.config.ts colors{} intentionally. The DUAL-CHANGE WARNING comment in each file maps every token to its counterpart field so operators know to update both.
- **Minimal layout shell:** Header, Footer, and SchemaScript are excluded from this layout — those belong to Phase 2 (Layout Shell). Keeping Plan 01 scope tight prevents dependency chains.
- **motion installed in Task 1:** Although not used until Plan 02+, installing now keeps the package available and avoids a mid-phase install.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] create-next-app blocked by existing .planning directory**

- **Found during:** Task 1 (project scaffold)
- **Issue:** `create-next-app` refused to scaffold into the waxing-template directory because `.planning/` already existed. Error: "directory contains files that could conflict"
- **Fix:** Scaffolded into a temp subdirectory (`temp-scaffold`), then copied all files to the parent directory, removed the temp directory, and applied name fix in package.json
- **Files modified:** package.json (name: "temp-scaffold" → "waxing-template"), all scaffold files moved to root
- **Verification:** `npm run build` exits 0 from waxing-template root
- **Committed in:** c149b2f (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Scaffold workaround was purely procedural. All deliverables identical to what direct scaffolding would have produced. No scope creep.

## Issues Encountered

None beyond the scaffold blocking issue documented in Deviations.

## User Setup Required

None — no external service configuration required for this plan. All configuration is file-based.

## Next Phase Readiness

- Tailwind brand token classes (`bg-brand-primary`, `text-brand-secondary`, `bg-brand-light`, etc.) are available for all component work in Plan 02
- `clientConfig` is importable from `@/content/client.config` in any component
- Fraunces renders on headings and Plus Jakarta Sans on body via CSS variable fonts
- `motion` package installed and ready for `whileInView` scroll animations in Plan 02
- No blockers for Plan 01-02 (UI primitives)

---
*Phase: 01-foundation*
*Completed: 2026-03-29*
