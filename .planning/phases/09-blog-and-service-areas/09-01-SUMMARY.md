---
phase: 09-blog-and-service-areas
plan: 01
subsystem: ui
tags: [mdx, next-mdx, tailwindcss-typography, blog, content, seo]

# Dependency graph
requires:
  - phase: 08-contact-and-seo
    provides: schema.ts, metadata utilities, SEO foundation
  - phase: 01-foundation
    provides: types.ts (BlogPost, ServiceArea interfaces), design tokens
provides:
  - MDX compilation pipeline via @next/mdx + createMDX wrapper
  - Blog utility layer (getAllPosts, getPostBySlug, POST_SLUGS)
  - 3 seed MDX blog posts targeting first-timer queries
  - /blog index page with card grid
  - /blog/[slug] post pages with prose typography and related service card
  - generateBlogPostSchema and generateServiceAreaSchema stubs in schema.ts
affects:
  - 09-02 (service areas) — will use generateServiceAreaSchema stub
  - Any future blog expansion — add to POST_SLUGS in blog.ts and postRegistry in [slug]/page.tsx

# Tech tracking
tech-stack:
  added: ["@next/mdx", "@mdx-js/loader", "@mdx-js/react", "@types/mdx", "@tailwindcss/typography"]
  patterns:
    - "Static postRegistry pattern — MDX posts imported explicitly at module scope (not via template literal dynamic imports) for Turbopack/webpack static analysis compatibility"
    - "MDX metadata as TypeScript export — `export const metadata = { ... }` instead of YAML frontmatter"
    - "Custom *.mdx type declaration (src/types/mdx.d.ts) to allow named metadata export alongside default component"

key-files:
  created:
    - src/mdx-components.tsx
    - src/lib/blog.ts
    - src/types/mdx.d.ts
    - src/content/blog/first-brazilian-wax-what-to-expect.mdx
    - src/content/blog/waxing-vs-shaving-sensitive-skin.mdx
    - src/content/blog/how-long-does-hair-need-to-be-for-waxing.mdx
    - src/app/blog/page.tsx
    - src/app/blog/[slug]/page.tsx
  modified:
    - next.config.ts
    - src/app/globals.css
    - src/lib/schema.ts
    - package.json

key-decisions:
  - "Static postRegistry in [slug]/page.tsx — Turbopack cannot statically analyze template literal dynamic imports (`import(\`@/content/blog/${slug}.mdx\`)`); explicit static imports required"
  - "src/types/mdx.d.ts added — @types/mdx base type does not declare named exports; custom declaration needed for `export const metadata` to type-check"
  - "getAllPosts() is synchronous internally but declared async for forward compatibility with future CMS/file-system integrations"
  - "readingTime stored as integer in MDX metadata export alongside BlogPost fields (BlogPost & { readingTime: number })"

patterns-established:
  - "Static MDX registry pattern: new posts require entry in POST_SLUGS (blog.ts), postModules (blog.ts), AND postRegistry ([slug]/page.tsx)"
  - "Blog card reading time: accessed via cast `(post as BlogPost & { readingTime?: number }).readingTime ?? 3` on index page"
  - "Prose overrides: prose-headings:font-heading + prose-a:text-brand-primary pattern for brand-consistent MDX typography"

# Metrics
duration: 6min
completed: 2026-04-02
---

# Phase 9 Plan 01: Blog Pipeline Summary

**MDX blog pipeline with @next/mdx, static postRegistry pattern, 3 seed posts targeting first-timer queries, and /blog index + /blog/[slug] pages with prose typography**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-02T22:53:04Z
- **Completed:** 2026-04-02T22:59:28Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- MDX compilation wired via @next/mdx createMDX wrapper; @tailwindcss/typography registered in globals.css
- 3 seed blog posts in src/content/blog/ targeting high-intent first-timer queries with Omaha local angles
- /blog index page with responsive 1→2→3 column card grid; /blog/[slug] post pages with brand prose overrides
- generateBlogPostSchema and generateServiceAreaSchema stubs added to schema.ts for Plan 02 to replace

## Task Commits

Each task was committed atomically:

1. **Task 1: MDX infrastructure** - `5aba62d` (feat)
2. **Task 2: Seed posts + blog pages** - `ec50334` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `next.config.ts` — Wrapped with createMDX; pageExtensions includes md/mdx
- `src/mdx-components.tsx` — Required MDX component registry for App Router
- `src/app/globals.css` — Added `@plugin "@tailwindcss/typography"` after @import
- `src/lib/blog.ts` — POST_SLUGS, getAllPosts(), getPostBySlug() with static imports
- `src/lib/schema.ts` — Added generateBlogPostSchema and generateServiceAreaSchema stubs
- `src/types/mdx.d.ts` — Custom type declaration allowing named `metadata` export from *.mdx
- `src/content/blog/first-brazilian-wax-what-to-expect.mdx` — Seed post 1, ~700 words
- `src/content/blog/waxing-vs-shaving-sensitive-skin.mdx` — Seed post 2, ~600 words
- `src/content/blog/how-long-does-hair-need-to-be-for-waxing.mdx` — Seed post 3, ~450 words
- `src/app/blog/page.tsx` — Blog index with card grid, FadeUp, SectionWrapper
- `src/app/blog/[slug]/page.tsx` — Post page with prose, related service card, CTA
- `package.json` — @next/mdx, @mdx-js/loader, @mdx-js/react, @types/mdx, @tailwindcss/typography

## Decisions Made

- **Static postRegistry instead of dynamic imports:** Template literal dynamic imports (`import(\`@/content/blog/${slug}.mdx\`)`) fail in Turbopack because the bundler cannot statically analyze arbitrary expressions. Switched to explicit static imports at module scope collected into a registry map. This is a known Next.js 15+ / Turbopack limitation.
- **Custom mdx.d.ts:** `@types/mdx` declares MDX modules as `{ default: ComponentType }` only. Adding `export const metadata: any` in src/types/mdx.d.ts allows TypeScript to accept named exports from MDX files without type errors.
- **readingTime on metadata export:** Added as an extension field (`BlogPost & { readingTime: number }`) rather than modifying the BlogPost interface — keeps the type lean and doesn't affect service area or other non-blog data.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Replaced dynamic template literal imports with static postRegistry**

- **Found during:** Task 2 (npm run build)
- **Issue:** `import(\`@/content/blog/${slug}.mdx\`)` caused `Cannot find module` errors in Turbopack during page data collection. Turbopack requires statically analyzable import paths.
- **Fix:** Created explicit static imports for each MDX file, collected into a `postRegistry` map keyed by slug. Both blog.ts and [slug]/page.tsx updated.
- **Files modified:** src/lib/blog.ts, src/app/blog/[slug]/page.tsx
- **Verification:** `npm run build` succeeds; all 3 blog routes appear in build output
- **Committed in:** ec50334 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added src/types/mdx.d.ts for named MDX exports**

- **Found during:** Task 2 (npx tsc --noEmit after switching to static imports)
- **Issue:** TypeScript error TS2614 — `Module '"*.mdx"' has no exported member 'metadata'`
- **Fix:** Created src/types/mdx.d.ts declaring `export const metadata: any` alongside default export
- **Files modified:** src/types/mdx.d.ts (new file)
- **Verification:** `npx tsc --noEmit` passes with no errors
- **Committed in:** 5aba62d (Task 1 commit, grouped with other infrastructure)

---

**Total deviations:** 2 auto-fixed (1 blocking build error, 1 missing type declaration)
**Impact on plan:** Both fixes necessary for correctness. Static registry pattern is a Turbopack requirement, not scope creep.

## Issues Encountered

- Turbopack static analysis limitation with dynamic MDX imports — resolved by switching to postRegistry pattern. This pattern must be followed for all future blog posts added to this template.

## Next Phase Readiness

- Plan 02 (service area pages) can import generateServiceAreaSchema from schema.ts — stub is in place
- Blog pipeline is extensible: adding a new post requires 3 changes (POST_SLUGS in blog.ts, postModules in blog.ts, postRegistry in [slug]/page.tsx)
- /blog and all 3 /blog/[slug] routes verified as static in build output

---
*Phase: 09-blog-and-service-areas*
*Completed: 2026-04-02*
