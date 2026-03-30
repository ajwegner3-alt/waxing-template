---
phase: "06"
plan: "01"
subsystem: trust-pages
tags: [about-page, server-components, trust-signals, esthetician-profile, hygiene, reviews, faq-accordion]

dependency-graph:
  requires:
    - "02-layout-shell"     # SectionWrapper, FadeUp, Breadcrumbs
    - "03-data-layer"       # staff.ts, testimonials.ts, client.config.ts
    - "05-service-pages"    # FAQAccordion reused from services components
  provides:
    - /about route (static)
    - 8 trust/* Server Components
    - FAQCategorySection reusable block for Phase 7 (FAQ page)
    - TrustCTA reusable for about/faq pages
  affects:
    - "06-02"  # FAQ page will use FAQCategorySection + TrustCTA page="faq"
    - "08"     # BreadcrumbList schema to be wired into AboutHero

tech-stack:
  added: []
  patterns:
    - Server Component + FadeUp wrapper (established in Phase 4, applied consistently)
    - Barrel export at src/components/trust/index.ts
    - Thin page composer pattern (only metadata + section order in page.tsx)
    - Inline SVG icons (no new npm dependency)
    - Staggered FadeUp delays on card grids (0.1s per card)

key-files:
  created:
    - src/components/trust/AboutHero.tsx
    - src/components/trust/BrandStory.tsx
    - src/components/trust/EstheticianProfile.tsx
    - src/components/trust/PhilosophyValues.tsx
    - src/components/trust/HygieneProtocols.tsx
    - src/components/trust/AboutReviews.tsx
    - src/components/trust/FAQCategorySection.tsx
    - src/components/trust/TrustCTA.tsx
    - src/components/trust/index.ts
    - src/app/about/page.tsx
  modified: []

decisions:
  - id: "06-01-a"
    decision: "FAQCategorySection accepts generic FAQ[] + heading/intro/bg — no category filtering inside component"
    rationale: "Keeps the component reusable for Phase 7 FAQ page where caller controls which FAQs to pass in"
  - id: "06-01-b"
    decision: "TrustCTA trust badges are hardcoded strings derived from clientConfig at render — not a prop array"
    rationale: "Badge content is stable across deployments; avoids over-engineering a simple inline row"
  - id: "06-01-c"
    decision: "EstheticianProfile image is a styled placeholder div (not next/image) since /images/staff/maya-chen.jpg does not exist yet"
    rationale: "Real headshot is a manual asset delivery step; placeholder prevents broken img tags in production"

metrics:
  duration: "5 min"
  completed: "2026-03-30"
---

# Phase 6 Plan 01: Trust Pages — About Page Summary

**One-liner:** 8 Server Components + /about route — origin story, full esthetician profile (all 3 bio paragraphs), philosophy cards, hygiene checklist, Google reviews, and honey-gold CTA with inline trust badges.

## What Was Built

### Task 1: First 5 trust components (committed bddb2fc)

| Component | Description |
|---|---|
| `AboutHero` | Breadcrumb + eyebrow "Our Story" + H1 + tagline, max-w-2xl |
| `BrandStory` | 3-paragraph Maya / Honey & Bloom origin story, max-w-3xl prose |
| `EstheticianProfile` | Two-column, ALL bio paragraphs, specialties pills, cert badges, years badge |
| `PhilosophyValues` | 4 value cards on blush bg — Comfort First, Natural Ingredients, Transparency, Judgment-Free |
| `HygieneProtocols` | 6-item checkmark list — single-use, fresh wax, hospital-grade sanitization, gloves, linens, licensed |

### Task 2: Remaining 3 components + barrel + page route (committed 2e2b830)

| Component | Description |
|---|---|
| `AboutReviews` | Aggregate rating row, Google Maps link, 3 testimonial cards matching homepage style |
| `FAQCategorySection` | Reusable heading + intro + FAQAccordion block, accepts bg prop |
| `TrustCTA` | page-variant CTA, BookingLink + PhoneLink, 3 inline trust badges (rating, licensed, single-use) |
| `index.ts` | Barrel export for all 8 components |
| `app/about/page.tsx` | Thin composer — 7 sections, generatePageMetadata |

## Verification

- `npx tsc --noEmit` — zero errors after both tasks
- `npm run build` — /about compiles as static route, 20/20 pages pass
- All must-haves confirmed:
  - About page tells origin story — BrandStory 3 paragraphs
  - Full esthetician profile — all 3 bio paragraphs (no slice), all 4 specialties, both certifications
  - Hygiene protocols — 6-item icon checklist
  - Google reviews — aggregate rating + reviewCount + Google link + 3 individual cards
  - Trust signals inline adjacent to CTA — rating, licensed, single-use in TrustCTA badge row

## Deviations from Plan

None — plan executed exactly as written.

## Next Phase Readiness

Phase 6 Plan 02 (FAQ page) can import:
- `FAQCategorySection` from `@/components/trust` — ready for grouped FAQ rendering
- `TrustCTA` with `page="faq"` — already has FAQ-specific copy
- `FAQAccordion` from `@/components/services` — unchanged

No blockers. Ready for 06-02.
