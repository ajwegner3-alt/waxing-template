# Roadmap: Honey & Bloom Wax Studio

## Overview

A complete Next.js website template for waxing studios, built to make first-time clients feel safe enough to book. The build progresses in strict dependency order: design tokens and types first, layout shell second, data layer third, then page-by-page from highest conversion value (homepage) to SEO infrastructure (blog, service areas), ending with a manual QA pass on a live Vercel deployment.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Design tokens, TypeScript types, UI primitives, and client config ✓
- [x] **Phase 2: Layout Shell** - Header, footer, mobile nav, sticky booking bar ✓
- [x] **Phase 3: Data Layer** - Service catalog, FAQs, staff, testimonials, service areas ✓
- [x] **Phase 4: Homepage** - Full homepage with first-timer pathway and trust signals ✓
- [x] **Phase 5: Service Pages** - Service menu and individual service detail pages ✓
- [ ] **Phase 6: Trust Pages** - About page and FAQ page
- [ ] **Phase 7: Booking Flow** - 4-step front-end booking UI
- [ ] **Phase 8: Contact and SEO** - Contact page, sitemap, schema validation, Open Graph
- [ ] **Phase 9: Blog and Service Areas** - Blog pipeline and Omaha neighborhood pages
- [ ] **Phase 10: Manual QA** - Live verification, Core Web Vitals, mobile review

## Phase Details

### Phase 1: Foundation
**Goal**: All brand tokens, TypeScript interfaces, and UI primitives exist so every component downstream can be built consistently without backtracking.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. The warm cream palette (#FBF8F3), sage, and forest green are defined as `@theme` tokens in globals.css and accessible as Tailwind utility classes
  2. Fraunces and Plus Jakarta Sans load via next/font with zero layout shift (CLS 0)
  3. A single `client.config.ts` file contains all business info and a change there propagates through metadata and schema helpers
  4. TypeScript interfaces exist for Service, ServiceCategory, Staff, FAQ, ServiceArea, and Testimonial with no compile errors
  5. Button, Badge, SectionWrapper, BookingButton, PhoneLink, and SchemaScript primitives render correctly with the brand tokens applied
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffold, globals.css @theme tokens, font setup, and client.config.ts
- [x] 01-02-PLAN.md — TypeScript interfaces (lib/types.ts), schema/metadata helpers, and UI primitives

### Phase 2: Layout Shell
**Goal**: Header, footer, mobile nav, sticky booking bar, and breadcrumb shell are present on every route so pages can be previewed as real pages from the start.
**Depends on**: Phase 1
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05
**Success Criteria** (what must be TRUE):
  1. Header shows logo, up to 5 nav items, and a "Book Now" CTA button on desktop
  2. Mobile nav drawer opens and closes smoothly; tap targets are minimum 44px
  3. Sticky booking bar (Book Now + Call) is visible without scrolling on a 390px viewport and hidden on desktop
  4. Footer displays contact info, hours, quick links, social links, and cancellation policy
  5. Interior pages show breadcrumbs via the consistent page layout shell
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — NavContext, scroll-aware Header (transparent-to-solid), desktop nav, Book Now CTA, root layout.tsx wiring
- [x] 02-02-PLAN.md — MobileNav AnimatePresence drawer, StickyBookingBar, 4-column dark Footer, Breadcrumbs shell

### Phase 3: Data Layer
**Goal**: All content data exists as typed TypeScript files so every downstream page and component can pull real content with no placeholder text.
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05
**Success Criteria** (what must be TRUE):
  1. 12+ services are defined across face, body, intimate, and package categories with pricing, description, duration, sensitivity level, preparation, and aftercare fields
  2. 15+ FAQs are organized by anxiety category (pain, prep, privacy, hygiene, aftercare) with no TypeScript errors
  3. Staff/esthetician profiles exist with all required fields populated
  4. 8+ testimonials exist with service, star rating, and quote fields
  5. 5+ Omaha neighborhood service area records exist with localized descriptions
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md — Service catalog: 14 services across 4 categories, slug constants, categories.ts, index.ts with accessor functions
- [x] 03-02-PLAN.md — FAQs (16+), staff profile (Maya Chen), testimonials (9), service areas (6 Omaha neighborhoods)

### Phase 4: Homepage
**Goal**: First-time visitors land on a page that immediately communicates warmth, addresses waxing anxiety, presents the First-Timer Package, and delivers a clear path to booking.
**Depends on**: Phases 2, 3
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08
**Success Criteria** (what must be TRUE):
  1. The hero section acknowledges first-timers above the fold with a comfort-first headline and two CTAs (Book Now, First-Timer Guide)
  2. The First-Timer Package spotlight is prominent on the homepage with price, benefits, and a dedicated CTA
  3. A "What to Expect" section walks through first-visit steps before any booking ask
  4. Google aggregate rating, years in business, client count, and certifications appear as a trust signals bar
  5. A testimonials section shows 3+ reviews with reviewer name and service, placed adjacent to a booking CTA
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md — HomepageHero, TrustBar, WhatToExpect, FirstTimerSpotlight (top-of-page conversion funnel)
- [x] 04-02-PLAN.md — ServicesPreview, TestimonialsGrid, EstheticianIntro, FinalCTA, barrel export, page.tsx composer

### Phase 5: Service Pages
**Goal**: Prospective clients can browse services by category, see transparent pricing with descriptions, and drill into individual service pages that address prep, aftercare, and sensitivity — the highest-intent conversion pages on the site.
**Depends on**: Phases 2, 3
**Requirements**: SVC-01, SVC-02, SVC-03, SVC-04, SVC-05, SVC-06
**Success Criteria** (what must be TRUE):
  1. The service menu page shows all services organized by category with pricing, duration, and 2-3 sentence descriptions (not a flat price list)
  2. Individual pages exist for Brazilian wax, bikini wax, eyebrow wax, full leg wax, underarm wax, and facial wax (6 minimum) with unique URLs
  3. Each service page shows sensitivity badges, prep instructions, aftercare tips, and an inline FAQ
  4. A natural-ingredients section appears on applicable service pages explaining the honey-based formula and what is NOT used
  5. A "Related Services" component at the bottom of each service page links to at least 2 other relevant services
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — Service menu page with sticky category pills and 14 service cards
- [x] 05-02-PLAN.md — Service detail components + /services/[slug] dynamic route with 14 static pages

### Phase 6: Trust Pages
**Goal**: Visitors who need more reassurance before booking can read the studio's full story, meet the esthetician, and get every first-timer anxiety question answered before committing.
**Depends on**: Phases 2, 3
**Requirements**: TRUST-01, TRUST-02, TRUST-03, TRUST-04, TRUST-05, TRUST-06
**Success Criteria** (what must be TRUE):
  1. The About page tells the studio's origin story, states the comfort-first philosophy, and introduces the esthetician with a photo placeholder and personal narrative
  2. The FAQ page displays 15+ questions organized by anxiety category (first-timer, prep, aftercare, sensitive skin, hygiene) with accordion UI
  3. A hygiene and safety protocols section appears on the site explaining single-use applicators and sanitization practices
  4. Google reviews display with aggregate rating, review count, and at least 3 individual review cards
  5. Trust signals (rating, certifications, hygiene badges) appear within visual proximity of every form and CTA on these pages
**Plans**: 2 plans

Plans:
- [ ] 06-01-PLAN.md — Trust components barrel + About page (brand story, esthetician profile, philosophy, hygiene, reviews, CTA)
- [ ] 06-02-PLAN.md — FAQ page with 7 anxiety category sections and accordion UI

### Phase 7: Booking Flow
**Goal**: A prospective client can walk through a 4-step booking UI that feels warm and guided — not clinical — demonstrating the front-end handoff pattern to an external booking system.
**Depends on**: Phases 2, 3, 4
**Requirements**: BOOK-01, BOOK-02, BOOK-03, BOOK-04, BOOK-05, BOOK-06
**Success Criteria** (what must be TRUE):
  1. The /book page presents a 4-step flow: service selection, esthetician preference, date/time, confirmation
  2. Service selection step pulls from the live service catalog data and shows pricing
  3. The date/time step displays a calendar and time slot grid (static/mock data)
  4. The confirmation step shows appointment summary, prep reminders, cancellation policy, and frames the external booking redirect warmly
  5. A step progress indicator is visible at all times and the visual aesthetic matches the rest of the site (warm, not clinical)
**Plans**: TBD

Plans:
- [ ] 07-01: BookingFlow client component — ServiceSelector and DateTimePicker steps
- [ ] 07-02: ClientInfoForm and ConfirmationScreen steps, progress indicator, /book page

### Phase 8: Contact and SEO
**Goal**: Every page has complete SEO scaffolding (meta, schema, canonical, Open Graph), the contact page is live, and the site is ready for indexing.
**Depends on**: Phases 4, 5, 6, 7
**Requirements**: TRUST-03, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-07, CONV-01, CONV-02, CONV-03, CONV-04, CONV-05
**Success Criteria** (what must be TRUE):
  1. The contact page has a 3-field form (name, phone, message), map placeholder, hours, address, and phone with click-to-call
  2. Every page has a unique title tag in "[Service] in [City] | [Company]" format and a unique meta description under 155 characters
  3. JSON-LD schema is present on homepage (LocalBusiness), service pages (Service), FAQ page (FAQPage), and all interior pages (BreadcrumbList)
  4. Open Graph and Twitter meta tags are set on every page
  5. sitemap.xml and robots.txt are generated and accessible at /sitemap.xml and /robots.txt
**Plans**: TBD

Plans:
- [ ] 08-01: Contact page, SEO metadata audit across all pages, generateMetadata implementation
- [ ] 08-02: JSON-LD schema pass, sitemap.ts, robots.ts, canonical URLs, internal linking audit

### Phase 9: Blog and Service Areas
**Goal**: The blog infrastructure and Omaha neighborhood pages are live with seed content, giving the template an operational local SEO foundation a real client can extend without code changes.
**Depends on**: Phase 8
**Requirements**: SEO-06, BLOG-01, BLOG-02, BLOG-03, BLOG-04
**Success Criteria** (what must be TRUE):
  1. The /blog index page displays cards with title, excerpt, date, and category for all posts
  2. Individual blog post pages render with proper typography, reading time, and related service links
  3. 2-3 seed blog posts exist with localized Omaha angles and internal links to relevant service pages
  4. Service area pages exist for 5+ Omaha neighborhoods with genuinely localized content (not city-name swaps)
**Plans**: TBD

Plans:
- [ ] 09-01: Blog pipeline (gray-matter, remark, rehype), blog index, post page, 2-3 seed posts
- [ ] 09-02: Service area template, dynamic routes, 5+ Omaha neighborhood pages

### Phase 10: Manual QA and Verification
**Goal**: The complete template is verified on a live Vercel deployment across real devices, Core Web Vitals pass, and every conversion path is confirmed functional before the template is considered production-ready.
**Depends on**: Phase 9
**Requirements**: (Verification of all prior phases)
**Success Criteria** (what must be TRUE):
  1. All pages render correctly on a real mobile device at 390px viewport with no layout overflow or hidden content
  2. Sticky booking bar and click-to-call are reachable without scrolling on mobile
  3. Core Web Vitals pass (LCP under 2.5s, CLS under 0.1, INP under 200ms) on the Vercel deployment
  4. Google Rich Results Test validates schema on homepage, one service page, and the FAQ page with no errors
  5. All internal links resolve (no 404s), all CTAs route to the correct destination
**Plans**: TBD

Plans:
- [ ] 10-01: Live deployment verification checklist (mobile, CTAs, links, schema, Core Web Vitals)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete ✓ | 2026-03-28 |
| 2. Layout Shell | 2/2 | Complete ✓ | 2026-03-29 |
| 3. Data Layer | 2/2 | Complete ✓ | 2026-03-29 |
| 4. Homepage | 2/2 | Complete ✓ | 2026-03-29 |
| 5. Service Pages | 2/2 | Complete ✓ | 2026-03-30 |
| 6. Trust Pages | 0/2 | Not started | - |
| 7. Booking Flow | 0/2 | Not started | - |
| 8. Contact and SEO | 0/2 | Not started | - |
| 9. Blog and Service Areas | 0/2 | Not started | - |
| 10. Manual QA | 0/1 | Not started | - |
