# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-28)

**Core value:** First-time waxing clients must feel safe enough to book — every design decision serves this emotional goal.
**Current focus:** Phase 8 complete — Phase 9 (Performance) next

## Current Position

Phase: 8 of 10 (Contact & SEO) — Complete
Plan: 2 of 2 in current phase — Plan 02 complete
Status: Phase complete
Last activity: 2026-04-02 — Completed 08-02-PLAN.md (schema + sitemap + robots.txt)

Progress: [█████████░] 80%

## Performance Metrics

**Velocity:**
- Total plans completed: 10
- Average duration: 3.6 min
- Total execution time: 0.40 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2/2 | 13 min | 6.5 min |
| 02-layout-shell | 2/2 | 5 min | 2.5 min |
| 03-data-layer | 2/2 | ~4 min | ~2 min |
| 04-homepage | 2/2 | 5 min | 2.5 min |
| 05-service-pages | 2/2 | 5 min | 2.5 min |
| 06-trust-pages | 2/2 | 8 min | 4 min |
| 07-booking-flow | 2/2 | 4 min | 2 min |
| 08-contact-and-seo | 2/2 | 7 min | 3.5 min |

**Recent Trend:**
- Last 5 plans: 3 min, 2 min, 3 min, 2 min, 4 min
- Trend: Stable ~2-4 min

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Phase 1: Aesthetic baseline is cream (#FAF3EF) + sage + forest green with Fraunces + Plus Jakarta Sans — must be locked in tokens before any component work
- Phase 1: client.config.ts is the single operator file; all metadata/schema flows from it (medspa-template convention)
- Phase 1: Fraunces loaded as variable font (no weight array) — full SOFT/WONK axes available
- Phase 1: Dual-change pattern — color hex values in both globals.css @theme AND client.config.ts colors{}, DUAL-CHANGE WARNING comment in each file
- Phase 1: Minimal layout shell — Header/Footer/SchemaScript excluded until Phase 2
- Phase 1: BeautyBusiness schema type — waxing studios use @type ["LocalBusiness","BeautyBusiness"], not MedicalBusiness
- Phase 1: FAQ has 7-value anxiety category union (first-timer, pain, prep, privacy, hygiene, aftercare, sensitive-skin) for accordion grouping
- Phase 1: BlogPost uses serviceSlug (not treatmentSlug) — waxing template naming convention
- Phase 1: BookingLink simplified to single bookingUrl — no consultationType/consultationUrl duality
- Phase 1: SectionWrapper has 5 bg variants including "blush" (bg-brand-light/60)
- Phase 2: Header is fixed (not sticky) — required for transparent-over-hero effect
- Phase 2: Scroll threshold 60px — clears hero badge area before color transition fires
- Phase 2: SchemaScript placed outside NavProvider in layout.tsx — no nav dependency
- Phase 2: NAV_LINKS has 5 items: Services, First Visit, About, FAQ, Contact — no Home in desktop nav
- Phase 2: Import from motion/react (not framer-motion) — locked convention from Phase 1 FadeUp.tsx
- Phase 2: Social fields are top-level on clientConfig (instagramUrl, facebookUrl, tiktokUrl) — NOT nested in social{} object — any plan template using social.instagram is wrong for this template
- Phase 2: env(safe-area-inset-bottom) must be inline style — Tailwind cannot interpolate CSS env() functions
- Phase 2: BookingBar z-40, MobileNav backdrop z-40, MobileNav drawer z-50 — z-index layering established
- Phase 2: Breadcrumbs defers BreadcrumbList schema to Phase 8 — pure UI component
- Phase 3: Service type needs waxing-specific fields (sensitiveSkintSafe, painLevel, preparation[], aftercare[]) — NOW IMPLEMENTED
- Phase 3: Service area testimonials set to empty array [] in data file — components filter global testimonials at render time, no data duplication
- Phase 3: Bellevue service area uses Offutt AFB military angle as primary differentiator — genuinely distinct from suburban Papillion entry
- Phase 7: Booking flow is front-end only; external handoff is a generic clientConfig.bookingUrl — no Vagaro/Booksy hard-coding
  - Phase 7 plan 01: BookingFlow imports sub-components directly (not via barrel) to avoid circular dependency
  - Phase 7 plan 01: buildCalendarGrid called once at module scope as CALENDAR_WEEKS const — not inside render — eliminates SSR/hydration risk
  - Phase 7 plan 01: Booking sub-components inherit client boundary from BookingFlow parent — no "use client" needed in ProgressIndicator, ServiceSelector, EstheticianStep, DateTimePicker
  - Phase 7 plan 01: Explicit (date: string) and (time: string) callback param types required in BookingFlow JSX — TypeScript strict mode won't infer from arrow functions in JSX without annotation
  - Phase 7 plan 02: ConfirmationStep imported directly in BookingFlow.tsx (not via barrel) — consistent with Plan 01 direct-sibling import pattern to avoid circular deps
  - Phase 7 plan 02: Date parsing via new Date(year, month-1, day) to avoid UTC timezone shift that new Date("YYYY-MM-DD") triggers — would display previous day in many timezones
  - Phase 7 plan 02: Cancellation policy as static inline text — $15 fee and 24h notice are universal; can be promoted to clientConfig if operators need customization later

  - Phase 8 plan 01: DAY_LABELS const maps hours object keys to display labels in correct weekday order — Object.entries order matches insertion order in client.config.ts
  - Phase 8 plan 01: Map placeholder is a styled div (not iframe embed) — no API key needed, links to google.com/maps/search with encoded address
  - Phase 8 plan 01: sharp used to generate og-default.jpg (already in devDependencies via Next.js) — no new dependency added
  - Phase 8 plan 01: /services title shortened from 61→47 chars (removed city suffix); /about description trimmed from 156→150 chars
  - Phase 8 plan 02: generateServiceSchema uses service.shortDescription (Service type has no .description field)
  - Phase 8 plan 02: BreadcrumbList schema injected in Breadcrumbs component — auto-applies to every interior page that uses the component
  - Phase 8 plan 02: sitemap.ts enumerates 14 service slugs via allServices.map() — dynamic, won't drift if services added/removed

  - Phase 4 plan 01: Hero uses -mt-16 lg:-mt-20 to negate layout pt-16/pt-20 for edge-to-edge fill; pt-32 lg:pt-40 on inner content restores header clearance
  - Phase 4 plan 01: Homepage sections are Server Components + FadeUp wrapper pattern — no use client escalation needed for entrance animation
  - Phase 4 plan 01: Service.price is nullable — use ?? fallback in components; never rely on price being non-null without a guard
  - Phase 4 plan 01: Inline SVGs preferred over icon library for small icon sets (4 icons); no new npm dependency added
  - Phase 4 plan 02: bio.slice(0, 2) in EstheticianIntro — two paragraphs gives personal context without wall of text on homepage
  - Phase 4 plan 02: BookingLink white override via !bg-white className in FinalCTA — cleaner than a new variant for honey-gold bg inversion
  - Phase 4 plan 02: Barrel export at src/components/homepage/index.ts — all 8 sections importable from single path
  - Phase 4 plan 02: page.tsx thin composer pattern — only metadata + section render order, no layout logic
  - Phase 5 plan 01: CategoryPills is the sole use client in the services/ component tree — all others are Server Components
  - Phase 5 plan 01: CategoryPills IntersectionObserver threshold 0.2, rootMargin "-80px 0px -60% 0px" — header-aware active pill tracking
  - Phase 5 plan 01: Alternating bg computed via index % 2 in page.tsx — CategorySection accepts bg prop, not hardcoded
  - Phase 5 plan 01: Category anchor id format locked as `category-{slug}` — CategoryPills scroll targeting and Plan 02 detail pages must not rename
  - Phase 5 plan 01: services/index.ts barrel grows in Plan 02 (RelatedServices, ServiceDetailHero to be added)
  - Phase 5 plan 02: dynamicParams = false makes unknown slugs 404 at request time — correct for content-driven site
  - Phase 5 plan 02: FAQAccordion uses native details/summary — no use client, group-open Tailwind class rotates chevron SVG
  - Phase 5 plan 02: Testimonial matched at render time via find() on service.name — no data duplication needed
  - Phase 5 plan 02: Prep uses brand-primary/15 circles, aftercare uses brand-secondary/20 — different colors signal before vs after
  - Phase 5 plan 02: Anxiety-first layout order locked — hero CTA → What to Expect → Prep → Aftercare → Ingredients → Testimonial → FAQ → Related → CTA
  - Phase 6 plan 01: FAQCategorySection accepts generic FAQ[] + heading/intro/bg — caller controls which FAQs to pass, no category filtering inside component
  - Phase 6 plan 01: TrustCTA trust badges are hardcoded strings derived from clientConfig at render — not a prop array — keeps it simple for stable content
  - Phase 6 plan 01: EstheticianProfile image is a styled placeholder div (not next/image) since /images/staff/maya-chen.jpg does not exist yet
  - Phase 6 plan 02: FAQ_CATEGORIES defined at page level as a static const — heading/intro is presentation metadata, not content data; faqs.ts stays lean
  - Phase 6 plan 02: satisfies constraint on FAQ_CATEGORIES keys enforces union type correctness at compile time — catches category key typos

### Pending Todos

None.

### Blockers/Concerns

None — Phase 8 complete. All schema deployed, sitemap and robots.txt live. Phase 9 (Performance) ready to start.

## Session Continuity

Last session: 2026-04-02
Stopped at: Completed 08-02-PLAN.md — schema + sitemap + robots.txt
Resume file: None
