# Honey & Bloom Wax Studio

## What This Is

A complete Next.js website template for waxing studios, branded as "Honey & Bloom Wax Studio" — a fictional Omaha-based studio specializing in gentle, sensitive-skin waxing with all-natural honey-based formulas. The template demonstrates a full sales funnel (hero > services > booking UI > trust signals) with a warm, comforting aesthetic inspired by Verdana Wellness. Designed to be reskinned for real waxing studio clients.

## Core Value

The website must feel comforting and approachable — not clinical or intimidating — so that first-time waxing clients feel safe enough to book. Every design decision serves this emotional goal.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage with hero, services preview, trust signals, testimonials, and CTA
- [ ] Dedicated service pages (one per waxing service category) with pricing, descriptions, and FAQ
- [ ] Service menu page with full pricing grid and category navigation
- [ ] About page telling the brand story (comfort-first philosophy, natural ingredients)
- [ ] Contact page with form, map placeholder, hours, and phone
- [ ] Booking flow UI (front-end only) — service selection > date/time > confirmation
- [ ] First-Timer Package feature section (signature offering, prominent on homepage)
- [ ] FAQ page addressing first-timer anxiety (pain, prep, aftercare)
- [ ] Blog/resources section for aftercare tips and waxing education
- [ ] Mobile-first responsive design across all pages
- [ ] Sticky mobile CTA (book now / call) on all pages
- [ ] SEO: schema markup, meta tags, Open Graph, canonical URLs on every page
- [ ] Conversion optimization: trust signals near CTAs, social proof, urgency elements
- [ ] Warm, botanical aesthetic: cream/sage palette, soft typography, organic shapes
- [ ] Google reviews integration (static display with rating and count)
- [ ] Service area pages for local SEO (Omaha neighborhoods)

### Out of Scope

- Backend booking system / database — template is front-end only
- Payment processing — no Stripe or payment integration
- User authentication / client accounts — not needed for template
- Email sending / form submission backend — forms are UI-only
- Blog CMS / dynamic content management — static content is fine
- Dark mode — the warm cream aesthetic is the core identity

## Context

- This is an NSI (North Star Integrations) website template product, meant to demonstrate Andrew's web design capabilities to prospective waxing studio clients
- The existing medspa-template has a luxury/clinical aesthetic; this template deliberately contrasts with a softer, more approachable feel
- Verdana Wellness (a supplement brand site Andrew built previously) is the aesthetic reference — cream backgrounds (#FBF8F3), forest greens, Fraunces + Plus Jakarta Sans typography, soft shadows, botanical accents
- The waxing industry serves clients who are often nervous (especially first-timers) — the design must reduce anxiety through warmth, transparency, and friendly language
- Skills available: roofing-template (conversion patterns), different-styles (UX design system), tailwind-landing-page (component patterns), artifacts-builder (React bundling)
- Hosting: Vercel. Stack: Next.js, Tailwind CSS, TypeScript

## Constraints

- **Tech stack**: Next.js 15+ with App Router, Tailwind CSS v4, TypeScript
- **Hosting**: Vercel deployment
- **Front-end only**: No backend, database, or server-side API routes needed
- **Performance**: LCP under 2.5s, CLS under 0.1, INP under 200ms
- **Accessibility**: WCAG 2.1 AA compliance (4.5:1 contrast, 44px touch targets, semantic HTML)
- **No AI slop**: No purple gradients, no Inter/Roboto/Arial defaults, no cookie-cutter component aesthetics
- **Budget**: $0 — all tools/services must be free tier

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fictional brand "Honey & Bloom" | Template needs to look like a real site, not a template. Honey references waxing naturally, Bloom suggests renewal/self-care | Shipped — full brand identity in client.config.ts |
| Sensitive-skin / first-timer niche | Differentiates from generic waxing sites, creates a clear content angle, matches the comforting aesthetic goal | Shipped — first-timer package, anxiety-category FAQs, comfort-first copy throughout |
| Verdana Wellness aesthetic direction | User specifically requested this — cream/sage palette, organic typography, warm and botanical | Shipped — Fraunces + Plus Jakarta Sans, cream/sage/forest tokens |
| Front-end only booking flow | Template doesn't need working backend, but sales funnel UX must be demonstrable | Shipped — 3-step drawer (Date → Services → Confirm), external handoff at end |
| Omaha, NE as fictional location | Matches NSI's real service area for realistic local SEO demonstration | Shipped — 6 neighborhood service area pages with distinct content |
| Booking drawer (replaces full-page) | User requested calendar visible immediately on "Book Now" click, entire flow in a drawer | Shipped — slide-in drawer from right, 440px desktop / full mobile |
| Stock images from Pexels | Placeholder gradients hurt portfolio impression | Shipped — 24 free stock photos (hero, staff, blog, categories, services) |
| GitHub: ajwegner3-alt/waxing-template | Public repo for portfolio, Vercel auto-deploy from main | Shipped — repo created, Vercel connected |

---
*Last updated: 2026-04-04 after Phase 10 progress*
