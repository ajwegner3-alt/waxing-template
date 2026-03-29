# Requirements: Honey & Bloom Wax Studio

**Defined:** 2026-03-28
**Core Value:** The website must feel comforting and approachable — not clinical or intimidating — so first-time waxing clients feel safe enough to book.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Design token system with warm botanical palette (cream #FBF8F3, sage, forest green) in Tailwind v4 config
- [x] **FOUND-02**: Typography system using Fraunces (display) + Plus Jakarta Sans (body) via next/font
- [x] **FOUND-03**: Reusable UI primitives: buttons, cards, badges, section containers with consistent spacing
- [x] **FOUND-04**: Client config file (client.config.ts) with all business info, colors, and booking URL
- [x] **FOUND-05**: TypeScript interfaces for all content types (Service, ServiceCategory, Staff, FAQ, ServiceArea, Testimonial)

### Layout

- [x] **LAYOUT-01**: Responsive header with logo, navigation (max 5 items), and "Book Now" CTA button
- [x] **LAYOUT-02**: Mobile navigation drawer with smooth open/close transitions
- [x] **LAYOUT-03**: Footer with contact info, hours, quick links, social media links, and cancellation policy
- [x] **LAYOUT-04**: Sticky mobile CTA bar (Book Now + Call) visible on all pages, hidden on desktop
- [x] **LAYOUT-05**: Consistent page layout shell with breadcrumbs on interior pages

### Data Layer

- [x] **DATA-01**: Service catalog with 12+ services across categories (face, body, intimate, packages) with pricing, descriptions, duration, and sensitivity level
- [x] **DATA-02**: FAQ dataset with 15+ questions organized by anxiety category (pain, prep, privacy, hygiene, aftercare)
- [x] **DATA-03**: Staff/esthetician profiles with name, photo placeholder, bio, specialties, and philosophy
- [x] **DATA-04**: Testimonial dataset with 8+ reviews including name, service, star rating, and quote
- [x] **DATA-05**: Service area data for 5+ Omaha neighborhoods with localized descriptions

### Homepage

- [x] **HOME-01**: Hero section with comfort-first headline, subheadline, primary CTA (Book Now), and secondary CTA (First-Timer Guide)
- [x] **HOME-02**: First-Timer Package spotlight section with benefits, pricing, and dedicated CTA
- [x] **HOME-03**: Services preview grid showing top service categories with icons and "View Menu" link
- [x] **HOME-04**: Trust signals bar (Google rating, years in business, number of clients, certifications)
- [x] **HOME-05**: Testimonials carousel/section with 3+ featured reviews
- [x] **HOME-06**: "What to Expect" preview section walking through first visit steps
- [x] **HOME-07**: Esthetician introduction section with photo placeholder and brief story
- [x] **HOME-08**: Final CTA section with booking prompt and trust reinforcement

### Service Pages

- [ ] **SVC-01**: Service menu page with full pricing grid, category tabs/filters, duration, and descriptions
- [ ] **SVC-02**: Individual service pages for Brazilian wax, bikini wax, eyebrow wax, full leg wax, underarm wax, and facial wax (6 minimum)
- [ ] **SVC-03**: Each service page includes: description, pricing, duration, prep instructions, aftercare tips, FAQ, and CTA
- [ ] **SVC-04**: Sensitivity badges on applicable services (gentle formula, sensitive-skin friendly, first-timer recommended)
- [ ] **SVC-05**: Ingredient transparency section on service pages (natural honey-based formula, what's NOT used)
- [ ] **SVC-06**: Related services component linking to other relevant service pages

### Booking Flow

- [ ] **BOOK-01**: 4-step booking flow UI: service selection > esthetician preference > date/time selection > confirmation
- [ ] **BOOK-02**: Service selection step pulls from service catalog data with pricing displayed
- [ ] **BOOK-03**: Date/time step with calendar UI and time slot grid (static/mock data)
- [ ] **BOOK-04**: Confirmation step with appointment summary, prep reminders, and cancellation policy
- [ ] **BOOK-05**: Booking flow maintains warm brand aesthetic (not clinical step-form feel)
- [ ] **BOOK-06**: Progress indicator showing current step in the flow

### Trust & Content

- [ ] **TRUST-01**: About page with brand story (comfort-first philosophy), natural ingredients commitment, and team introduction
- [ ] **TRUST-02**: FAQ page with 15+ questions organized by category with accordion UI
- [ ] **TRUST-03**: Contact page with 3-field form (name, phone, message), map placeholder, hours, address, and phone
- [ ] **TRUST-04**: Google reviews display component with aggregate rating, review count, and 3+ individual reviews
- [ ] **TRUST-05**: Hygiene and safety protocols section (single-use applicators, no double-dipping, sanitization practices)
- [ ] **TRUST-06**: Trust signals placed adjacent to every CTA and booking entry point (not isolated in own section)

### SEO

- [ ] **SEO-01**: Unique title tags, meta descriptions, and H1 on every page following "[Service] in [City] | [Company]" format
- [ ] **SEO-02**: JSON-LD schema markup: LocalBusiness on homepage, Service on service pages, FAQPage on FAQ, BreadcrumbList on all interior pages
- [ ] **SEO-03**: Open Graph and Twitter meta tags on every page
- [ ] **SEO-04**: Canonical URLs on all pages
- [ ] **SEO-05**: Sitemap.xml and robots.txt configured for Vercel
- [ ] **SEO-06**: Service area pages for 5+ Omaha neighborhoods with genuinely localized content
- [ ] **SEO-07**: Internal linking strategy: service pages link to related services + service areas, FAQ links to relevant service pages

### Blog

- [ ] **BLOG-01**: Blog index page with card layout showing title, excerpt, date, category
- [ ] **BLOG-02**: Individual blog post page with proper typography, reading time, and related posts
- [ ] **BLOG-03**: 2-3 seed blog posts (e.g., "How to Prepare for Your First Brazilian Wax", "Waxing vs. Shaving: What's Better for Sensitive Skin", "Aftercare Tips for Smooth Skin")
- [ ] **BLOG-04**: Blog posts link to relevant service pages for internal SEO

### Conversion Optimization

- [ ] **CONV-01**: Click-to-call phone number in header, sticky on mobile, using tel: links with 48x48px minimum tap target
- [ ] **CONV-02**: CTA placement above the fold on every page, repeated after key content sections
- [ ] **CONV-03**: Social proof (reviews, trust badges) within visual proximity of every form and CTA
- [ ] **CONV-04**: Forms limited to 3 fields maximum (name, phone, message)
- [ ] **CONV-05**: Page speed optimized: Next.js Image component, font preloading, minimal JS bundles

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Interactive Features

- **QUIZ-01**: Skin type quiz / service recommender ("Not sure which wax is right for you?")
- **QUIZ-02**: Quiz results page with personalized service recommendations

### Retention Features

- **RET-01**: Loyalty program UI showing points accumulation and rewards
- **RET-02**: Gift card / certificate purchase page
- **RET-03**: Referral program landing page ("Refer a friend, both get $10 off")
- **RET-04**: Package / membership pricing page with subscription options

### Content Expansion

- **CONT-01**: Seasonal promotions banner system on homepage
- **CONT-02**: Video content integration (studio tour, "what happens during a wax" explainer)
- **CONT-03**: Before/after gallery for facial waxing services
- **CONT-04**: Expanded blog with 10+ posts covering full waxing education funnel

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend booking system | Template is front-end only — booking flow is UI demonstration |
| Payment processing (Stripe) | No transactions needed for template |
| User authentication / accounts | Not needed for template showcase |
| Email sending / form backend | Forms are UI-only; client would add their own backend |
| CMS / dynamic content | Static content in TypeScript files — easy to swap for real client data |
| Dark mode | Warm cream aesthetic IS the brand identity; dark mode would destroy it |
| Live chat widget | Looks low-budget on small studio sites; clean contact form is better |
| Social media feed embeds | Slows page, often breaks, cluttered — link instead |
| Aggressive popups | Jarring for trust-focused service business |
| Intimate area before/after photos | Crosses privacy/comfort line — text descriptions only |
| Complex tiered pricing by esthetician level | Confuses clients, creates doubt — single-tier pricing |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| LAYOUT-01 | Phase 2 | Complete |
| LAYOUT-02 | Phase 2 | Complete |
| LAYOUT-03 | Phase 2 | Complete |
| LAYOUT-04 | Phase 2 | Complete |
| LAYOUT-05 | Phase 2 | Complete |
| DATA-01 | Phase 3 | Complete |
| DATA-02 | Phase 3 | Complete |
| DATA-03 | Phase 3 | Complete |
| DATA-04 | Phase 3 | Complete |
| DATA-05 | Phase 3 | Complete |
| HOME-01 | Phase 4 | Complete |
| HOME-02 | Phase 4 | Complete |
| HOME-03 | Phase 4 | Complete |
| HOME-04 | Phase 4 | Complete |
| HOME-05 | Phase 4 | Complete |
| HOME-06 | Phase 4 | Complete |
| HOME-07 | Phase 4 | Complete |
| HOME-08 | Phase 4 | Complete |
| SVC-01 | Phase 5 | Pending |
| SVC-02 | Phase 5 | Pending |
| SVC-03 | Phase 5 | Pending |
| SVC-04 | Phase 5 | Pending |
| SVC-05 | Phase 5 | Pending |
| SVC-06 | Phase 5 | Pending |
| TRUST-01 | Phase 6 | Pending |
| TRUST-02 | Phase 6 | Pending |
| TRUST-04 | Phase 6 | Pending |
| TRUST-05 | Phase 6 | Pending |
| TRUST-06 | Phase 6 | Pending |
| BOOK-01 | Phase 7 | Pending |
| BOOK-02 | Phase 7 | Pending |
| BOOK-03 | Phase 7 | Pending |
| BOOK-04 | Phase 7 | Pending |
| BOOK-05 | Phase 7 | Pending |
| BOOK-06 | Phase 7 | Pending |
| TRUST-03 | Phase 8 | Pending |
| SEO-01 | Phase 8 | Pending |
| SEO-02 | Phase 8 | Pending |
| SEO-03 | Phase 8 | Pending |
| SEO-04 | Phase 8 | Pending |
| SEO-05 | Phase 8 | Pending |
| SEO-07 | Phase 8 | Pending |
| CONV-01 | Phase 8 | Pending |
| CONV-02 | Phase 8 | Pending |
| CONV-03 | Phase 8 | Pending |
| CONV-04 | Phase 8 | Pending |
| CONV-05 | Phase 8 | Pending |
| SEO-06 | Phase 9 | Pending |
| BLOG-01 | Phase 9 | Pending |
| BLOG-02 | Phase 9 | Pending |
| BLOG-03 | Phase 9 | Pending |
| BLOG-04 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 57 total
- Mapped to phases: 57
- Unmapped: 0

---
*Requirements defined: 2026-03-28*
*Last updated: 2026-03-28 after roadmap creation — phase assignments finalized*
