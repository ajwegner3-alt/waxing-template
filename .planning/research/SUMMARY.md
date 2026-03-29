# Project Research Summary

**Project:** Honey & Bloom Wax Studio — Next.js Website Template
**Domain:** Waxing studio / beauty service website (local service business)
**Researched:** 2026-03-28
**Confidence:** HIGH (stack), MEDIUM-HIGH (features + pitfalls), HIGH (architecture)

## Executive Summary

Honey & Bloom is a waxing studio website template targeting first-time clients and sensitive-skin consumers — a distinct positioning that elevates standard beauty site conventions into a focused anxiety-reduction product. The research is unambiguous: every feature, visual decision, copy choice, and interaction pattern should be evaluated against a single question — does it make a first-timer feel safe enough to book? The most dangerous failure mode is not a technical bug; it is a warm, capable studio that loses clients because their website feels cold or clinical. The recommended approach is a static-first Next.js site built on the established NSI template architecture (medspa-template conventions), with purpose-built first-timer content, waxing-specific service data structures, and a front-end booking flow that demonstrates the warm handoff pattern.

The stack is directly inherited from the active NSI workspace: Next.js 16.2.1, React 19.2.x, Tailwind CSS v4, Motion, and Embla Carousel — all verified from live deployed projects. The architecture mirrors medspa-template exactly: a single `client.config.ts` operator file, TypeScript data files as the content layer, RSC-first pages with minimal client component islands, and `generateStaticParams` on all dynamic routes. No backend, no database, no API routes. This is a static site that deploys to Vercel at build time.

The most critical risks are aesthetic drift toward clinical/cold presentation (which triggers abandonment in first-time beauty clients), missing the first-timer entry pathway entirely (building for existing customers instead of new ones), and booking CTA friction at the moment of commitment. All three are preventable if established early in the build — they become expensive to retrofit. The secondary risk cluster is SEO: service pages without local signals, aftercare content buried or absent, and an unlocalized blog will leave the template invisible in local search despite technically correct implementation.

---

## Key Findings

### Recommended Stack

The entire stack is verified from live NSI workspace packages — no guesswork. Next.js 16.2.1 with React 19.2.x is the standard across nsi-website, medspa-template, and roofing-template. Tailwind CSS v4 with `@theme` block tokens is the established pattern for brand token management. Motion (^12.34.3) handles scroll animations and micro-interactions; Embla Carousel (^8.6.0) handles testimonial carousels with mobile-friendly swipe. The markdown pipeline (gray-matter, remark, rehype) is identical across all three NSI templates and can be copied verbatim.

Font selection is intentional and differentiating: Fraunces (variable serif, 300–700) for headings to convey warmth over precision, Plus Jakarta Sans for body/UI to stay humanist without defaulting to Inter/Roboto/Arial. Both load via `next/font/google` with CSS custom property variables in `@theme`, which is the zero-CLS pattern used in medspa-template.

**Core technologies:**
- Next.js 16.2.1: App Router, RSC, generateStaticParams, built-in metadata API — all required features present
- React 19.2.x: Server Components, concurrent features — matches Next.js 16 peer requirement
- TypeScript ^5: Template customization error prevention — NSI non-negotiable
- Tailwind CSS v4: `@theme` design tokens for brand color management — critical for operator white-labeling
- Motion ^12.34.3: Subtle scroll fade-ins and hover states only — warmth, not spectacle
- Embla Carousel ^8.6.0: Headless, touch-capable testimonial rotation — proven in medspa-template
- Fraunces + Plus Jakarta Sans via next/font: Warm, personality-driven typography — not generic system fonts
- clsx + tailwind-merge: Standard NSI conditional class utilities

**Do not add:** Stripe, Supabase, Resend, react-hook-form, next-themes, shadcn/ui, @headlessui/react, or any dark mode support.

### Expected Features

The feature landscape is shaped by one overriding insight: waxing involves physical vulnerability and social anxiety in ways most beauty services do not. Every feature prioritizes reducing that anxiety before it reduces decision friction.

**Must have (table stakes for this positioning):**
- Service menu with transparent pricing — hiding prices kills conversions immediately
- Online booking CTA (links to external system: Vagaro, Booksy, etc.) — clients expect to book online
- "What to Expect" first-timer guide — direct response to the primary booking barrier
- Pain management and sensitive skin messaging — on homepage and service pages, not buried
- FAQ page focused on anxiety topics (pain, prep, privacy, aftercare) — not just logistics
- Staff/esthetician profiles with human story — trust is personal in this service category
- Photo gallery showing the physical studio space — "Is this place safe and clean?"
- Google reviews with specific reviewer details — generic star ratings do not convert
- Mobile-first layout with sticky booking CTA — 70%+ of beauty searches are mobile
- Prep and aftercare instructions on individual service pages

**Should have (competitive differentiators):**
- Multi-step booking flow UI (front-end demo) — signals premium quality vs. raw redirect to Vagaro
- Hygiene/safety protocol section — single-use applicators, no double-dipping — clients care
- Ingredient transparency page — honey-based, natural formula, what's NOT in the wax
- Esthetician philosophy/story section — "why I became an esthetician" emotional resonance
- Blog with localized education content — "Sensitive Skin Waxing Tips for Omaha's Dry Winters"
- Individual specialty service pages (Brazilian, full leg, brow shaping) — high-intent search targets
- Service area / neighborhood pages — local SEO for Omaha neighborhoods
- Seasonal promotions homepage banner slot

**Defer to post-MVP:**
- Skin type quiz / service recommender — complex JS, validate simpler flows first
- Package/membership UI — retention play, not acquisition
- Gift card section — add once core flow is polished
- Blog content population — structure it so posts can be added later; initial shell only
- Full service area pages — set up the template, generate 1–2 examples only

### Architecture Approach

The waxing-template follows the same static-first, content-driven architecture as medspa-template: a unidirectional data flow from TypeScript content files through data access functions to RSC page components that compose stateless section components. The single most important convention is `src/content/client.config.ts` — one file an operator edits to white-label the entire site. All schema generation, metadata, and layout shell configuration flows from this file. The only client components are the mobile nav context, testimonial carousel, contact form, and the multi-step booking flow. Everything else is RSC.

The service data structure is waxing-specific (`Service` type, not `Treatment`) with fields for `sensitiveSkintSafe`, `painLevel`, `preparation[]`, and `aftercare[]` that do not exist in the medspa-template. This structure must be defined in `lib/types.ts` before any page or component work begins.

**Major components:**
1. Layout Shell (Header, Footer, MobileNav, StickyBookingBar, NavContext) — present on every route, fed by clientConfig
2. Data Layer (services, staff, faqs, testimonials, service-areas in TypeScript files) — content layer, no API calls
3. Page Routes (RSC, 15+ pages) — compose section components, generate metadata and schema
4. Section Components — stateless, prop-driven, reusable (HomepageHero, ServiceCard, FirstTimerSection, TestimonialCarousel, etc.)
5. UI Primitives (Button, Badge, SectionWrapper, SchemaScript, BookingButton, PhoneLink) — atomic, no business logic
6. BookingFlow (client component island) — 4-step UI demo: ServiceSelector, DateTimePicker, ClientInfoForm, ConfirmationScreen

**Key patterns:**
- `generateStaticParams` + `dynamicParams = false` on all dynamic routes (prevents Vercel SSR fallback)
- Schema on every page via `<SchemaScript>` server component
- `SectionWrapper` with bg token prop for consistent vertical rhythm
- No data fetching inside section components — pages own the data, sections render props
- Dual-change pattern: brand colors require updating both `client.config.ts` AND `globals.css @theme`

### Critical Pitfalls

1. **Clinical/cold aesthetic triggering first-timer flight** — Warm cream base (#FBF8F3), Fraunces serif, conversational copy, and approachable photography must be locked in design tokens before any component work. If a page could pass the "dentist website" test, it fails.

2. **Missing first-timer pathway** — The homepage must acknowledge first-timers above the fold. Service pages must include emotional framing, prep and aftercare. FAQ must address anxiety topics (pain, embarrassment, what to wear) — not just logistics. This is not optional content; it is the core product promise.

3. **Booking CTA friction at the moment of commitment** — The multi-step booking flow UI must maintain visual and tonal continuity with the rest of the site. Even as a front-end demo that links out to Vagaro, it must feel warm and guided, not like an abrupt redirect to a corporate scheduler. Frame the external link: "You'll be redirected to our secure booking system — it takes 2 minutes."

4. **Service menu that reads like a price list** — Every service needs a 2–3 sentence description, a sensitivity indicator badge, and guidance on who it's best for. A flat name/price table does not support first-timer decision-making.

5. **Trust signals misplaced** — Reviews must appear adjacent to booking CTAs, not only in a dedicated testimonials section at the bottom of the homepage. First-timer-specific review excerpts ("My esthetician made me feel completely comfortable — Sarah M., Midtown") should be prominently placed near the primary conversion moments.

6. **Desktop-first development** — Mobile-first CSS is a constraint from the first component, not a retrofit. Sticky booking bar must be visible without scrolling on a 390px viewport. 44px minimum touch targets on all interactive elements.

---

## Implications for Roadmap

Based on the combined research, the build has a clear dependency chain. The data layer must precede pages. The design tokens must precede components. The first-timer content framework must be established in Phase 1 and applied to every subsequent phase — it cannot be added retroactively.

Suggested phase structure based on architecture build order and feature dependencies:

### Phase 1: Foundation — Design Tokens, Types, and Config

**Rationale:** Every component depends on brand tokens, TypeScript interfaces, and the client config. Building in the wrong order creates expensive rework. The warm aesthetic (cream palette, Fraunces typography, `@theme` tokens) must be established before a single component is designed. PITFALL 1 (clinical aesthetic drift) is a Phase 1 problem.

**Delivers:** Project scaffold, globals.css with `@theme` tokens, `lib/types.ts` (all interfaces), `content/client.config.ts`, `lib/schema.ts`, `lib/metadata.ts`, UI primitives (Button, Badge, SectionWrapper, BookingButton, SchemaScript, PhoneLink)

**Addresses:** Brand identity foundation, NSI template conventions, anti-clinical aesthetic
**Avoids:** Pitfall 1 (clinical aesthetic drift), Pitfall 10 (image performance) — establish Next.js Image standard here

**Research flag:** Skip deep research — this is pure NSI convention application (copy from medspa-template patterns).

---

### Phase 2: Layout Shell and Global Navigation

**Rationale:** Header, Footer, MobileNav, StickyBookingBar, and NavContext are present on every route. They must exist before any page can be previewed meaningfully. The sticky mobile CTA (PITFALL 6 prevention) is here.

**Delivers:** Root `layout.tsx`, Header with desktop nav and "Book Now" CTA, MobileNav drawer, StickyBookingBar with click-to-call and booking link, Footer with hours/address/social/service area links, NavContext

**Addresses:** Mobile sticky CTA (table stakes), click-to-call pattern, phone number in header
**Avoids:** Pitfall 6 (desktop-first development — mobile bar is built here, not retrofitted), Pitfall 12 (hours/contact buried in footer only)

**Research flag:** Skip — well-documented NSI pattern, medspa-template is a direct reference.

---

### Phase 3: Data Layer — Services, FAQs, Staff, Testimonials

**Rationale:** The FEATURES.md critical path is explicit — service catalog must exist before service pages, booking flow, FAQ, or any content pages. This is the content foundation. Defining all TypeScript data structures here validates the `lib/types.ts` decisions from Phase 1.

**Delivers:** `data/services/` (all categories + individual service files + index.ts accessors), `data/faqs/index.ts` (with anxiety-focused categories), `data/staff/index.ts`, `data/testimonials/index.ts`, `data/service-areas/` (index + Omaha neighborhood files)

**Addresses:** Service catalog (critical path item for all downstream features)
**Avoids:** Pitfall 4 (price-list-only menus) — description and sensitivity fields are built into the `Service` type, not bolted on later

**Research flag:** Skip — data structures are fully defined in ARCHITECTURE.md; no external research needed.

---

### Phase 4: Homepage

**Rationale:** The homepage is the highest-visibility page and the primary vehicle for first-timer acquisition. Building it early validates the design direction and forces all the anxiety-reduction content into place. PITFALLS 2, 5, and 6 are all homepage problems.

**Delivers:** HomepageHero with first-timer headline, ServicePreviewGrid (4–6 category cards), FirstTimerSection (what to expect, pain/sensitivity reassurance, first-timer package CTA), TestimonialCarousel (with first-timer specific reviews adjacent to CTA), TrustSignals (Google reviews, natural formula badge, years in business), CTABanner

**Addresses:** First-timer pathway, pain management messaging, trust signals adjacent to CTAs, sticky mobile CTA
**Avoids:** Pitfall 2 (no first-timer pathway), Pitfall 5 (trust signals misplaced), Pitfall 11 (generic CTA language)

**Research flag:** Skip — patterns are fully specified. Validate aesthetics against warm/approachable reference (Verdana Wellness).

---

### Phase 5: Service Menu and Service Detail Pages

**Rationale:** Highest-intent pages after the homepage. These drive booking decisions. Service pages are also the primary SEO asset for high-volume searches like "Brazilian wax Omaha." PITFALLS 4, 7, and 8 are all service page problems.

**Delivers:** `/services` (pricing grid with categories and descriptions), `/services/[category]` (category hub pages), `/services/[category]/[slug]` (individual service pages with prep, aftercare, FAQs, related services, local schema), ServiceCard, ServiceDetailHero, ServiceDetailBody, ServiceQuickStats, ServiceFAQAccordion, RelatedServices

**Addresses:** Transparent pricing with descriptions (table stakes), sensitivity badges, prep/aftercare on service pages, FAQ section per service, individual specialty pages for Brazilian/facial/brow, local SEO signals in meta and schema
**Avoids:** Pitfall 4 (price list without narrative), Pitfall 7 (SEO thin content), Pitfall 8 (aftercare buried), Pitfall 9 (typography hierarchy collapse on service menu)

**Research flag:** May benefit from light research on which service pages rank best in the waxing category for Omaha (when WebSearch is available). Otherwise, skip.

---

### Phase 6: FAQ Page and About Page

**Rationale:** Both pages serve conversion by building trust before the booking. The FAQ page is a first-timer conversion driver (directly addresses the anxiety that blocks booking). The About page gives the studio a human face — "who is touching me?" is a real question.

**Delivers:** `/faq` (accordion, organized by anxiety category: first-timer, preparation, aftercare, sensitive skin), `/about` (BrandStorySection, PhilosophySection, StaffCard profiles)

**Addresses:** Anxiety-focused FAQ (table stakes for this positioning), esthetician philosophy/story (differentiator), sensitive skin reassurance
**Avoids:** Pitfall 2 (FAQ only covering logistics, not anxiety), Pitfall 5 (trust signals absent near CTAs)

**Research flag:** Skip — content is well-specified; structure is standard.

---

### Phase 7: Booking Flow UI

**Rationale:** The multi-step booking flow is the most complex client-side component and a major template differentiator. It belongs after core pages are built so the visual language is established — the flow must feel continuous with the site tone (PITFALL 3). It is front-end only; no backend integration.

**Delivers:** `/book` page with 4-step client component: ServiceSelector → DateTimePicker (mock) → ClientInfoForm (3 required fields: name, phone, service) → ConfirmationScreen with external booking link framing

**Addresses:** Multi-step booking flow UI (differentiator), warm handoff to external booking system
**Avoids:** Pitfall 3 (booking friction at commitment moment), Pitfall 13 (forms asking too much — max 3 required fields)

**Research flag:** Consider researching whether Vagaro/GlossGenius/Booksy embed options have changed — may affect the external handoff link pattern. Low priority since this is a front-end demo.

---

### Phase 8: Contact Page and SEO Scaffolding

**Rationale:** Contact page is table stakes (basic business validation). SEO scaffolding (sitemap, robots, schema validation) should be completed before the template is considered production-ready.

**Delivers:** `/contact` (form with max 3 required fields, map placeholder, hours, phone), `sitemap.ts`, `robots.ts`, schema validation pass across all pages, Open Graph meta on all pages

**Addresses:** Contact info in accessible location, form friction prevention, full SEO scaffolding
**Avoids:** Pitfall 12 (contact info buried), Pitfall 13 (form over-asking), Pitfall 7 (missing schema/meta)

**Research flag:** Skip — Next.js App Router metadata API patterns are well-documented.

---

### Phase 9: Blog Structure and Service Area Pages

**Rationale:** High SEO value but deferred from MVP because they are content-intensive. The blog structure (markdown pipeline) can be scaffolded with 2–3 seed posts. Service area pages can be templated with 2–3 Omaha neighborhood examples. Both set up patterns a client can scale without code changes.

**Delivers:** `/blog` index + `/blog/[slug]` post pages (with gray-matter/remark pipeline), 2–3 seed blog posts (localized: "Sensitive Skin Waxing Tips for Omaha's Dry Winters", "How to Prep for Your First Brazilian"), `/service-areas` index + 2–3 Omaha neighborhood pages (Midtown, West Omaha, Benson)

**Addresses:** Blog content structure (SEO differentiator), service area pages (local SEO), localized content (first-timer search terms)
**Avoids:** Pitfall 14 (generic unlocalized blog content — seed posts have local angle from day one)

**Research flag:** Validate specific Omaha neighborhood keyword opportunities when WebSearch is available. Blog topic research would strengthen seed post selection.

---

### Phase 10: Manual QA and Verification

**Rationale:** Per NSI standards, all manual checks are grouped in a final phase. The project is not complete until this phase is signed off.

**Delivers:** Mobile responsiveness verification on real device, booking flow walkthrough, all CTAs confirmed functional, Core Web Vitals check (LCP, CLS, INP), schema validation via Google Rich Results Test, meta tag review, live Vercel deployment confirmation

**Addresses:** Mobile-first validation (PITFALL 6), image performance check (PITFALL 10), trust signal placement audit
**Avoids:** Shipping a template that passes desktop review but fails on the 390px viewport where actual clients browse

**Research flag:** No research needed — this is manual verification.

---

### Phase Ordering Rationale

- Phases 1–3 are strictly sequential: tokens → layout shell → data layer. No component can be fully built without the prior layer.
- Phases 4–8 follow feature dependency order from FEATURES.md: homepage → services → supporting pages → booking → contact + SEO cleanup.
- Phase 9 is deliberately deferred: blog and service area pages are content-intensive and don't block the core conversion flow. They add SEO value but a client can use the template without them.
- Phase 10 is always last — manual QA cannot happen until all pages exist.
- First-timer content is a thread through Phases 4–7, not a single phase. It must be scaffolded in the homepage and reinforced in service pages, FAQ, and booking flow.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 5 (Service Pages):** If WebSearch is available, validate which service page topics have the highest search volume for Omaha waxing market — affects page prioritization.
- **Phase 7 (Booking Flow):** If WebSearch is available, check current state of Vagaro/GlossGenius/Booksy embed options — may offer a better integration pattern than raw link redirect.
- **Phase 9 (Blog/Service Areas):** Local keyword research for Omaha neighborhoods and first-timer search terms would directly improve seed content quality.

Phases with standard patterns (skip research-phase):
- **Phase 1** (Foundation): Pure NSI convention; medspa-template is the direct reference.
- **Phase 2** (Layout Shell): Documented NSI header/footer/mobile nav pattern.
- **Phase 3** (Data Layer): Fully specified in ARCHITECTURE.md.
- **Phase 6** (FAQ + About): Standard content structure; no novel technical questions.
- **Phase 8** (Contact + SEO): Next.js App Router metadata API is well-documented.
- **Phase 10** (Manual QA): Checklist-driven, no research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified from live deployed NSI workspace packages (medspa-template, nsi-website, roofing-template). No version guesses. |
| Features | MEDIUM-HIGH | Well-established beauty service website patterns; franchise studio analysis (EWC, Waxing the City). WebSearch unavailable — competitor URL analysis and booking platform market share not validated. |
| Architecture | HIGH | Direct inspection of medspa-template codebase + Next.js App Router documentation patterns. Same owner, same stack, same conventions. |
| Pitfalls | MEDIUM-HIGH | Anxiety-reduction psychology for waxing services is well-supported by beauty conversion literature generally; mobile traffic percentage (70%+ claim) and booking abandonment rates not validated with external data. |

**Overall confidence:** HIGH for build decisions; MEDIUM for market/competitor validation

### Gaps to Address

- **Booking platform market share:** Which platform (Vagaro vs. GlossGenius vs. Booksy vs. Fresha) do Omaha waxing studios actually use? This affects the external handoff framing copy. Handle during Phase 7 research if WebSearch becomes available; otherwise use generic `clientConfig.bookingUrl` approach.
- **Omaha neighborhood keyword data:** Which neighborhoods have the highest search volume for waxing services? Affects Phase 9 service area page prioritization. Validate before writing service area content.
- **First-timer search term volume:** "Does Brazilian waxing hurt the first time?" — confirm this is a real search term with volume before building a blog post around it. High confidence it is, but unvalidated.
- **Skin type quiz adoption:** Research whether service recommender quizzes are genuinely used on high-converting waxing sites or just appealing in theory. Decision deferred to post-MVP, but validate before adding in v2.
- **"First Wax Free" offer impact:** European Wax Center's first-wax-free model is referenced in FEATURES.md at MEDIUM confidence. Validate real conversion lift before recommending to clients.

---

## Sources

### Primary (HIGH confidence)
- `medspa-template/package.json`, `nsi-website/package.json`, `roofing-template/package.json` — stack versions verified 2026-03-28
- `medspa-template/src/app/layout.tsx` — font loading pattern
- `medspa-template/src/app/globals.css` — Tailwind v4 @theme token pattern
- `medspa-template/next.config.ts` — image optimization config
- `medspa-template/src/lib/schema.ts` — JSON-LD schema pattern
- Next.js App Router documentation (generateStaticParams, dynamicParams, generateMetadata)
- `waxing-template/.planning/PROJECT.md` — project constraints and positioning

### Secondary (MEDIUM confidence)
- Beauty service website conversion patterns — training knowledge of franchise waxing studio conventions (EWC, Waxing the City)
- General beauty/wellness conversion optimization research — anxiety reduction, trust signal placement
- Local SEO best practices for service businesses — schema types, title tag formats, service area pages

### Tertiary (LOW confidence — validate when WebSearch available)
- Mobile traffic percentage (70%+ claim) for beauty service searches — directionally correct, needs verification
- Booking platform abandonment rates (Pitfall 3) — qualitative pattern, no quantitative source
- Skin type quiz adoption rates on waxing studio sites — inferred from adjacent domains
- Omaha-specific keyword data for waxing services

---

*Research completed: 2026-03-28*
*Ready for roadmap: yes*
