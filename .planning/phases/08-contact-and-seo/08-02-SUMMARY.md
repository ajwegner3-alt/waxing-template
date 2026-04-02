---
phase: "08"
plan: "02"
subsystem: seo
tags: [schema, json-ld, sitemap, robots-txt, breadcrumbs, structured-data]

dependency-graph:
  requires: ["08-01"]
  provides: ["BreadcrumbList schema on all interior pages", "Service schema on detail pages", "FAQPage schema on FAQ", "sitemap.xml", "robots.txt"]
  affects: ["09-performance", "10-manual-qa"]

tech-stack:
  added: []
  patterns: ["Next.js MetadataRoute file conventions", "Schema.org JSON-LD injection via SchemaScript"]

file-tracking:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/lib/schema.ts
    - src/components/layout/Breadcrumbs.tsx
    - src/app/services/[slug]/page.tsx
    - src/app/faq/page.tsx

decisions:
  - "Service type has shortDescription (not description) — generateServiceSchema uses shortDescription for schema.org description field"
  - "BreadcrumbList schema injected directly in Breadcrumbs component so it is auto-applied to every interior page that uses the component"
  - "sitemap.ts lists 20 URLs: homepage + 5 static routes + 14 service detail pages"
  - "robots.ts blanket allow-all, no disallow entries"

metrics:
  duration: "~3 min"
  completed: "2026-04-02"
---

# Phase 8 Plan 02: Schema + Sitemap + Robots Summary

**One-liner:** JSON-LD structured data (BreadcrumbList, Service, FAQPage) auto-injected on all page types, plus programmatic sitemap.xml and robots.txt via Next.js MetadataRoute conventions.

## What Was Built

### Task 1: Schema generators + BreadcrumbList injection + per-page wiring
Commit: `5b3c65e`

**src/lib/schema.ts** — two new exported generators added below the existing `generateWaxingBusinessSchema`:

- `generateServiceSchema(service, config)` — returns `@type: "Service"` with name, shortDescription, url, provider (LocalBusiness + BeautyBusiness), and conditional `offers` block when `service.price != null`
- `generateFAQPageSchema(faqs)` — returns `@type: "FAQPage"` with `mainEntity` array mapping each FAQ to Question/Answer pairs

**src/components/layout/Breadcrumbs.tsx** — BreadcrumbList JSON-LD auto-injected. The component now builds the schema from its `items` prop (with Home prepended automatically) and renders `<SchemaScript>` before the `<nav>`. Every interior page that renders Breadcrumbs automatically gets a BreadcrumbList. Remains a Server Component.

**src/app/services/[slug]/page.tsx** — `<SchemaScript schema={generateServiceSchema(service, clientConfig)} />` inserted before the hero section. No duplicate LocalBusiness (that stays in layout.tsx).

**src/app/faq/page.tsx** — `<SchemaScript schema={generateFAQPageSchema(faqs)} />` inserted at the top of the return. Passes the complete `faqs` array so all questions are covered in the schema.

### Task 2: sitemap.ts + robots.ts
Commit: `34473b2`

**src/app/sitemap.ts** — Next.js `MetadataRoute.Sitemap` function generating 20 URLs:
- `/` (priority 1.0, weekly)
- `/services` (0.9, weekly)
- `/book` (0.8, monthly)
- `/about` (0.7, monthly)
- `/faq` (0.7, monthly)
- `/contact` (0.6, monthly)
- 14 service detail pages via `allServices.map()` (0.8, monthly)

**src/app/robots.ts** — Next.js `MetadataRoute.Robots` function: blanket `Allow: /` for `User-agent: *`, plus `Sitemap:` directive pointing to `/sitemap.xml`.

Both routes appear in the build output (`/sitemap.xml`, `/robots.txt`) as static prerendered routes.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| `service.shortDescription` in schema | `Service` type has no `.description` field; `shortDescription` is defined as "1-2 sentences for service cards and meta" — semantically correct for schema.org description |
| BreadcrumbList in Breadcrumbs component | Single injection point — any page using the component automatically gets schema without per-page wiring |
| All 14 service slugs in sitemap via `allServices.map()` | Dynamic enumeration prevents sitemap drift when services are added/removed |
| No disallow entries in robots.txt | All routes are indexable per RESEARCH.md — booking and contact pages included |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] `service.description` does not exist on Service type**

- **Found during:** Task 1 — TypeScript build error
- **Issue:** Plan instructed `description: service.description` but the `Service` interface defines `shortDescription` (not `description`)
- **Fix:** Changed to `service.shortDescription` — semantically identical for schema purposes ("1-2 sentences for service cards and meta")
- **Files modified:** `src/lib/schema.ts`
- **Commit:** `5b3c65e`

## Verification Results

- `npx next build` passes with zero errors
- `/sitemap.xml` and `/robots.txt` appear as static routes in build output
- 14 service detail pages build successfully (SSG via generateStaticParams)
- FAQ page and all interior pages compile cleanly with new schema injections

## Next Phase Readiness

Phase 9 (Performance) can begin. No blockers. Schema infrastructure is complete:
- Search engines will generate breadcrumb rich results for all interior pages
- Service pages eligible for Service rich results
- FAQ page eligible for FAQ rich results in SERPs
- All 20 routes discoverable via sitemap
