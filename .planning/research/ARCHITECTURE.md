# Architecture Patterns

**Project:** Honey & Bloom Wax Studio
**Domain:** Waxing studio website template (beauty/wellness vertical)
**Researched:** 2026-03-28
**Confidence:** HIGH — Based on direct inspection of the medspa-template codebase (same stack, same owner), Next.js 15 App Router documentation patterns, and the established NSI template conventions.

---

## Recommended Architecture

The waxing-template follows the same architectural skeleton as medspa-template: a **static-first, content-driven Next.js site** with App Router, where all content lives in TypeScript data files and flows unidirectionally to RSC (React Server Component) pages.

No backend. No API routes. No database. All pages are statically generated at build time via `generateStaticParams`. Deployed to Vercel as a static export or hybrid static site.

```
Content Layer (TypeScript data files)
        ↓
  Data Access Layer (index.ts helpers)
        ↓
  Page Components (app/*/page.tsx — RSC)
        ↓
  Section Components (components/sections/)
        ↓
  UI Primitives (components/ui/)
        ↓
  Layout Shell (Header, Footer, MobileNav, StickyBar)
```

The **booking flow** is a special case: a multi-step client component that manages local UI state (step selection) but does not submit to any backend. It is a demo/mockup.

---

## Component Boundaries

### Layer 1: Layout Shell

These components wrap every page via `app/layout.tsx`. They render on every route. They must be extremely lean.

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `Header` | Site logo, desktop nav links, "Book Now" CTA button | NavContext (mobile open state), clientConfig (phone, bookingUrl) |
| `MobileNav` | Slide-out drawer with full nav on small screens | NavContext (listens for open state), clientConfig |
| `StickyBookingBar` | Fixed bottom bar on mobile: "Call Now" + "Book Now" buttons | clientConfig (phone, bookingUrl) |
| `Footer` | Hours, address, social links, service area nav, legal links | clientConfig (address, hours, social), service areas data |
| `NavProvider` | React context that manages `isMobileNavOpen` boolean | Provides to Header, MobileNav |

**Decision:** Keep `NavProvider` as a thin context — just the boolean. Do not colocate booking state here. The booking flow manages its own state internally.

### Layer 2: Page Routes

Pages are React Server Components. They import from the data layer, generate metadata, and compose section components.

| Route | Page Component | Primary Data Source |
|-------|---------------|---------------------|
| `/` | `HomepageHero` + `ServicePreviewGrid` + `FirstTimerSection` + `TestimonialCarousel` + `TrustSignals` + `CTABanner` | `clientConfig`, `services`, `testimonials` |
| `/services` | Full service menu with pricing grid, category tabs | `services` (all categories) |
| `/services/[category]` | Category hub: hero + service cards for that category | `getCategoryBySlug()`, `getServicesByCategory()` |
| `/services/[category]/[slug]` | Individual service detail page | `getServiceBySlug()`, `getFAQsByService()` |
| `/about` | Brand story, esthetician profiles, philosophy section | `clientConfig`, `staff` |
| `/contact` | Contact form UI, map placeholder, hours, phone | `clientConfig` |
| `/book` | Multi-step booking flow UI (client component island) | `services` (for service selection step) |
| `/faq` | FAQ accordion, categorized by anxiety topic | `faqs` |
| `/blog` | Blog post grid | blog markdown frontmatter |
| `/blog/[slug]` | Individual post | markdown file content |
| `/service-areas` | Index of all service areas | `serviceAreas` |
| `/service-areas/[slug]` | City landing page | `getServiceAreaBySlug()` |
| `/privacy` | Privacy policy static page | hardcoded prose |

### Layer 3: Section Components

Reusable sections composed inside pages. These accept strongly-typed props — they do not fetch data themselves.

**Homepage sections:**
- `HomepageHero` — hero banner with headline, subheadline, CTA, and mood image
- `ServicePreviewGrid` — 4–6 service category cards with icon, name, short description
- `FirstTimerSection` — signature feature: "First Timer Package" explanation, what to expect, gentle reassurance copy
- `TestimonialCarousel` — client component for review rotation
- `TrustSignals` — Google review count/stars, years in business, "natural honey formula" badge, satisfaction guarantee
- `CTABanner` — full-width section with single CTA ("Book Your First Appointment")

**Service sections:**
- `ServiceCategoryHero` — hero for a category hub page (`/services/[category]`)
- `ServiceCard` — card for the service menu grid (name, price, duration, CTA)
- `ServiceDetailHero` — hero for individual service page
- `ServiceDetailBody` — rich-text body sections (what is it, how it works, preparation)
- `ServiceQuickStats` — duration, price, skin types, recovery
- `ServiceFAQAccordion` — FAQs specific to this service, accordion UI
- `RelatedServices` — "You might also like" section at page bottom

**About sections:**
- `StaffCard` — esthetician name, photo, credentials, specialties
- `BrandStorySection` — "Why Honey & Bloom" narrative prose section
- `PhilosophySection` — "Our approach to sensitive skin" content block

**Contact/Booking:**
- `ContactForm` — client component, `useState` for form fields, no submission handler (UI demo)
- `MapPlaceholder` — static div with embedded Google Maps embed iframe or placeholder image
- `BookingFlow` — client component (see Booking Architecture below)

**Blog:**
- `BlogCard` — post card for the blog index grid
- `BlogHero` — post hero with title, date, author, featured image

**SEO/Utility:**
- `SchemaScript` — injects JSON-LD `<script>` tags (reused from medspa-template pattern)
- `SectionWrapper` — wrapper div with background color, padding, and max-width container
- `BookingButton` — styled CTA link that reads from `clientConfig.bookingUrl` (client component because it reads runtime config)
- `PhoneLink` — `<a href="tel:...">` with min 48px tap target

### Layer 4: UI Primitives

Stateless, generic. Accept style props. No business logic.

| Component | Purpose |
|-----------|---------|
| `Button` | Styled button, variants: primary, secondary, ghost, outline |
| `Badge` | Small pill label (e.g., "Bestseller", "Sensitive Skin Safe") |
| `StarRating` | Renders 1–5 filled stars |
| `SectionWrapper` | Consistent section padding + background color token |
| `SchemaScript` | `<script type="application/ld+json">` injector |
| `PhoneLink` | `<a href="tel:...">` with accessibility and tap target |
| `BookingButton` | CTA link reading from clientConfig, variant-aware |

---

## Data Layer Architecture

### The Single Config File Pattern

This is the most important convention to preserve from medspa-template.

```
src/content/client.config.ts
```

Every piece of operator-editable configuration lives here. When a real waxing studio client buys this template, they edit ONE file to white-label the entire site. This file drives:
- All text in Header, Footer, StickyBar (business name, phone, address, hours)
- All schema.org structured data (via `lib/schema.ts`)
- All `<title>` and `<meta description>` generation (via `lib/metadata.ts`)
- Booking URL destination
- Social media links
- Brand colors (with DUAL-CHANGE note: must also update `globals.css @theme`)

**Critical:** The dual-change pattern (config file + CSS theme tokens must stay in sync) is a known friction point. Document it prominently in both files.

### Service Data Pattern

Mirrors the medspa-template `treatments` pattern exactly.

```
src/data/services/
  categories/
    body-waxing.ts        ← ServiceCategory type
    facial-waxing.ts
    brow-lash.ts
    specialty.ts
  body-waxing/
    legs-full.ts           ← Service type
    legs-half.ts
    bikini-classic.ts
    bikini-brazilian.ts
    back-chest.ts
    arms.ts
    underarms.ts
  facial-waxing/
    upper-lip.ts
    chin.ts
    full-face.ts
    nose-ears.ts
  brow-lash/
    brow-shape.ts
    brow-tint.ts
    lash-tint.ts
    brow-lamination.ts
  specialty/
    first-timer-package.ts
    full-body.ts
  index.ts                 ← All accessor functions
```

**Accessor functions in `index.ts`:**
```typescript
getAllCategories(): ServiceCategory[]
getCategoryBySlug(slug): ServiceCategory | undefined
getAllServices(): Service[]
getServicesByCategory(categorySlug): Service[]
getServiceBySlug(slug): Service | undefined
```

This mirrors the medspa-template `treatments/index.ts` pattern verbatim. Pages import from `@/data/services`, never from individual files.

### Staff Data Pattern

Simpler than medspa-template's `providers` (no medical credentials needed).

```
src/data/staff/
  index.ts
  maya-johnson.ts
  lily-park.ts
```

### FAQ Data Pattern

FAQs are organized by anxiety type — this is a waxing-specific concern:
- First-timer anxiety (does it hurt, how long does it last)
- Preparation questions (how long does hair need to be, when to shave last)
- Aftercare questions (redness, ingrown hairs, timeline)
- Sensitive skin questions (are your products safe, can I wax while pregnant)

```
src/data/faqs/
  index.ts     ← getAllFAQs(), getFAQsByCategory(category)
```

FAQ categories are enums (`"first-timer" | "preparation" | "aftercare" | "sensitive-skin"`), not separate files. All FAQs live in one file, tagged with a category.

### Blog Pattern

Markdown files with frontmatter. No external CMS. The blog reader uses `gray-matter` or a lightweight frontmatter parser.

```
src/content/blog/
  how-to-prep-for-your-first-wax.md
  how-long-does-waxing-last.md
  hard-wax-vs-soft-wax.md
  aftercare-tips-ingrown-hair.md
  is-waxing-safe-sensitive-skin.md
```

### Service Area Data Pattern

Same pattern as medspa-template. Each city is a TypeScript file.

```
src/data/service-areas/
  index.ts
  midtown-omaha.ts
  west-omaha.ts
  benson.ts
  dundee.ts
  papillion.ts
  bellevue.ts
```

---

## Booking Flow Architecture

The booking flow (`/book`) is the most complex client-side component in the project. It is a **UI demo only** — no actual appointments are created.

### Structure

```
BookingFlow (client component — manages step state)
  ├── Step 1: ServiceSelector
  │     └── ServiceOptionCard (select service category, then specific service)
  ├── Step 2: DateTimePicker
  │     └── CalendarGrid (static mock dates, no real availability)
  │     └── TimeSlotGrid (static mock time slots)
  ├── Step 3: ClientInfoForm
  │     └── Controlled inputs: name, phone, email, notes
  └── Step 4: ConfirmationScreen
        └── Summary of selections + "We'll contact you" message
```

### State Shape

```typescript
type BookingStep = "service" | "datetime" | "info" | "confirm";

interface BookingState {
  step: BookingStep;
  selectedService: Service | null;
  selectedDate: string | null;   // ISO date string
  selectedTime: string | null;   // "10:00 AM"
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
}
```

All state lives in `BookingFlow`. Child step components receive slice of state + setter callbacks as props. No global state management library needed.

### Important Constraint

The booking flow must link out to the real booking platform (Vagaro, Square, Acuity, Jane App) via `clientConfig.bookingUrl`. The on-site flow is a **sales UX demonstration** that shows what a guided booking experience could look like — the actual booking happens at the external platform. Add a prominent "Continue to Booking Site" link that uses `clientConfig.bookingUrl`.

---

## Data Flow

All data flows in one direction: downward from data files to pages to components.

```
clientConfig.ts ──────────────────────────────────────────────────────┐
                                                                       ↓
services/index.ts → Page (RSC) → CategoryHero, ServiceCard, etc.    layout.tsx
                                                                       ↓
faqs/index.ts → FAQ Page → FAQAccordion                            Header
                                                                    Footer
staff/index.ts → About Page → StaffCard, BrandStory               StickyBar

service-areas/index.ts → ServiceArea Page → CityPageBody

blog markdown → Blog Page → BlogCard
             → Blog[slug] Page → BlogPostBody
```

**No prop drilling past two levels.** If a primitive like `BookingButton` needs `clientConfig.bookingUrl`, it imports clientConfig directly (since it is a static import, not a runtime fetch). This avoids threading config through every intermediate component.

**The only React Context in the app is `NavContext`** (mobile nav open/close state). The booking flow uses local component state. Everything else is static/server-rendered.

---

## File and Folder Structure

```
src/
  app/
    layout.tsx                    ← Root layout, fonts, NavProvider, Header, Footer
    globals.css                   ← Tailwind @theme tokens, base styles
    page.tsx                      ← Homepage
    about/
      page.tsx
    services/
      page.tsx                    ← Full service menu
      [category]/
        page.tsx                  ← Category hub
        [slug]/
          page.tsx                ← Individual service
    book/
      page.tsx                    ← Booking flow UI
    faq/
      page.tsx
    blog/
      page.tsx
      [slug]/
        page.tsx
    contact/
      page.tsx
    service-areas/
      page.tsx
      [slug]/
        page.tsx
    robots.ts
    sitemap.ts

  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNav.tsx
      StickyBookingBar.tsx
      NavContext.tsx
      index.ts
    sections/
      HomepageHero.tsx
      ServicePreviewGrid.tsx
      FirstTimerSection.tsx
      TestimonialCarousel.tsx
      TrustSignals.tsx
      CTABanner.tsx
      ServiceCategoryHero.tsx
      ServiceCard.tsx
      ServiceDetailHero.tsx
      ServiceDetailBody.tsx
      ServiceQuickStats.tsx
      ServiceFAQAccordion.tsx
      RelatedServices.tsx
      StaffCard.tsx
      BrandStorySection.tsx
      BlogCard.tsx
      CityPageBody.tsx
    ui/
      Button.tsx
      Badge.tsx
      StarRating.tsx
      SectionWrapper.tsx
      SchemaScript.tsx
      PhoneLink.tsx
      BookingButton.tsx
      index.ts
    booking/
      BookingFlow.tsx             ← Top-level client component
      ServiceSelector.tsx
      DateTimePicker.tsx
      ClientInfoForm.tsx
      ConfirmationScreen.tsx

  content/
    client.config.ts              ← THE operator config file
    blog/
      *.md                        ← Blog post markdown files

  data/
    services/
      categories/
        body-waxing.ts
        facial-waxing.ts
        brow-lash.ts
        specialty.ts
      body-waxing/
        *.ts
      facial-waxing/
        *.ts
      brow-lash/
        *.ts
      specialty/
        *.ts
      index.ts
    staff/
      index.ts
      *.ts
    faqs/
      index.ts
    service-areas/
      index.ts
      *.ts
    testimonials/
      index.ts

  lib/
    types.ts                      ← All TypeScript interfaces (single source of truth)
    schema.ts                     ← JSON-LD generator functions
    metadata.ts                   ← Next.js Metadata generator helpers
    blog.ts                       ← Markdown parser / frontmatter reader

  public/
    images/
      hero/
      services/
      staff/
      blog/
```

---

## Key Type Definitions (lib/types.ts)

The waxing-template needs its own `WaxingClientConfig` interface and waxing-specific content types. These are meaningfully different from the medspa-template types.

**`WaxingClientConfig`** — removes: `medicalDirectorName`, `licenseNumber`, `boardCertifications`, `hipaaNotice`, `businessType` medical subtypes. Adds: `estheticianCount`, `waxBrandName` (e.g., "Starpil honey wax"), `acceptsWalkIns`, `parkingInfo`.

**`Service`** — equivalent to medspa-template's `Treatment` but waxing-specific fields:
```typescript
interface Service {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  coverImage: string;
  duration: string;          // e.g. "30–45 min"
  price: number | null;      // null if pricing not shown
  priceDisplay: string;      // e.g. "From $45"
  isPopular: boolean;
  sensitiveSkintSafe: boolean;
  painLevel: 1 | 2 | 3;     // 1 = gentle, 3 = more intense
  body: ServiceBodySection[];
  preparation: string[];     // bulleted prep instructions
  aftercare: string[];       // bulleted aftercare instructions
  faqs: FAQ[];
  relatedServices: string[];
  schema: {
    serviceType: string;     // e.g. "BeautyTreatment"
    bodyLocation: string;    // e.g. "Legs", "Brow"
  };
}
```

**`Staff`** — no medical credentials:
```typescript
interface Staff {
  slug: string;
  name: string;
  title: string;             // e.g. "Lead Esthetician"
  bio: string[];
  specialties: string[];     // e.g. ["Brazilian", "Sensitive Skin", "Brow Design"]
  certifications: string[];  // e.g. ["Starpil Certified Wax Technician"]
  yearsExperience: number;
  headshot: string;
  acceptingNewClients: boolean;
}
```

---

## Patterns to Follow

### Pattern 1: RSC-First with Minimal Client Components

Every page component is a React Server Component by default. Add `"use client"` only when the component needs:
- `useState` / `useEffect`
- Event handlers (onClick, onChange)
- Browser APIs

**Client component locations in this template:**
- `NavContext.tsx` (mobile nav state)
- `TestimonialCarousel.tsx` (auto-rotation)
- `ContactForm.tsx` (controlled inputs)
- `BookingFlow.tsx` and its children (multi-step state)
- `BookingButton.tsx` (reads clientConfig at runtime — can be made RSC if needed)

Everything else is RSC. Section components that just render HTML from props are RSC.

### Pattern 2: generateStaticParams on All Dynamic Routes

Every `[category]`, `[slug]`, and `[areaSlug]` route must export `generateStaticParams` and set `dynamicParams = false`. This ensures the Vercel build generates all pages at build time and 404s on unknown slugs rather than attempting SSR.

```typescript
export function generateStaticParams() {
  return getAllCategories().map(c => ({ category: c.slug }));
}
export const dynamicParams = false;
```

### Pattern 3: Schema on Every Page

Every page component composes `<SchemaScript>` with appropriate JSON-LD. Minimum schema per page type:
- Homepage: `LocalBusiness` + `BeautySalon`
- Service category: `BreadcrumbList` + `Service`
- Service detail: `BreadcrumbList` + `Service` + `FAQPage` (if FAQs present)
- Blog post: `BreadcrumbList` + `Article`
- Service area: `BreadcrumbList` + `LocalBusiness` with `areaServed`
- FAQ page: `FAQPage`

### Pattern 4: SectionWrapper for Consistent Rhythm

All page sections use `SectionWrapper` with a `bg` prop that maps to Tailwind tokens. This keeps vertical rhythm and background transitions consistent without custom CSS in every page.

```tsx
<SectionWrapper bg="cream" padding="lg">
  <TestimonialCarousel testimonials={testimonials} />
</SectionWrapper>
```

Available `bg` values for the waxing template: `"cream" | "white" | "sage" | "honey" | "dark"`.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Data Fetching in Section Components

**What:** Section components that import from `@/data/services` directly.

**Why bad:** Breaks the clean data-flow contract. Pages should own data access; sections render what they receive. Makes components hard to test, reuse, and reason about.

**Instead:** Pass data as props from the page. Pages own `getAllServices()`, sections render the array they receive.

### Anti-Pattern 2: One Giant Page Component

**What:** Putting all homepage sections inline in `app/page.tsx` instead of composing named section components.

**Why bad:** The homepage file becomes 400+ lines, sections cannot be reused across pages, and the build order becomes unclear.

**Instead:** Each major section is its own component in `components/sections/`. The page file is a clean composition of section imports.

### Anti-Pattern 3: Inline Styles Instead of Tailwind Tokens

**What:** Using `style={{ color: '#D4A853' }}` inline instead of `text-brand-honey`.

**Why bad:** Defeats the dual-change pattern. When the operator changes their brand color in `clientConfig.ts` + `globals.css @theme`, they expect every element using the brand color to update. Inline styles break this.

**Instead:** All colors are CSS custom properties mapped to Tailwind tokens via `@theme`. Use `text-brand-*`, `bg-brand-*` utility classes consistently.

### Anti-Pattern 4: Booking Flow as a Full Page Route Hierarchy

**What:** Building the booking steps as separate routes (`/book/step-1`, `/book/step-2`, etc.).

**Why bad:** Complicates back-navigation, requires URL state management, and the flow is a UI demo that doesn't actually persist data between routes.

**Instead:** Single `/book` route with a client component that manages step state locally. Progress is not URL-based.

### Anti-Pattern 5: Skipping `dynamicParams = false`

**What:** Dynamic routes without `dynamicParams = false` set.

**Why bad:** On Vercel, unknown slugs trigger SSR attempts instead of 404s. The template has no server runtime — this causes deploy errors or expensive fallback rendering.

**Instead:** Every `[slug]` route exports both `generateStaticParams` and `dynamicParams = false`.

---

## Build Order (Dependency Implications)

The suggested build sequence respects data layer dependencies:

**Must build first (foundation — everything else depends on these):**
1. `lib/types.ts` — all interfaces; no page or component can be typed without this
2. `content/client.config.ts` — feeds Header, Footer, StickyBar, schema generators
3. `lib/schema.ts` and `lib/metadata.ts` — utility functions used in every page
4. `app/globals.css` — design tokens; all components rely on `brand-*` color tokens
5. Layout components (`Header`, `Footer`, `MobileNav`, `StickyBookingBar`, `NavContext`) — present on every route
6. UI primitives (`Button`, `Badge`, `SectionWrapper`, `BookingButton`, `SchemaScript`) — used by sections

**Build second (data layer):**
7. `data/services/` (categories + individual services + `index.ts`) — core content; service pages depend on this
8. `data/faqs/index.ts`
9. `data/staff/index.ts`
10. `data/testimonials/index.ts`
11. `data/service-areas/` (index + city files)

**Build third (pages — can be parallelized within this tier):**
12. Homepage (`app/page.tsx`) — highest visibility; validates design direction early
13. Service menu (`app/services/page.tsx`)
14. Service category pages (`app/services/[category]/page.tsx`)
15. Service detail pages (`app/services/[category]/[slug]/page.tsx`)
16. About page (`app/about/page.tsx`)
17. FAQ page (`app/faq/page.tsx`)
18. Contact page (`app/contact/page.tsx`)
19. Booking flow (`app/book/page.tsx` + booking components)
20. Blog index + post pages
21. Service area pages
22. `sitemap.ts`, `robots.ts`

---

## Scalability Considerations

This is a static site — scalability concerns are primarily content management, not load handling.

| Concern | Current approach | If it grows |
|---------|-----------------|-------------|
| Adding a new service | Add one `.ts` file, register in `index.ts` | No change needed until 50+ services |
| Adding a new service area city | Add one `.ts` file, register in `index.ts` | Same pattern scales indefinitely |
| Blog post creation | Add one `.md` file | Fine up to ~200 posts; beyond that consider a CMS |
| Operator rebranding | Edit `client.config.ts` + `globals.css @theme` | Remains a two-file change regardless of site size |
| New booking platform | Change `clientConfig.bookingUrl` | Zero code changes needed |
| Multiple location support | Not in scope for v1 — would require multi-config architecture | Major refactor |

---

## Sources

- Direct inspection of `medspa-template/src/` (same owner, same stack, same NSI conventions) — HIGH confidence
- Next.js 15 App Router documentation patterns (RSC, `generateStaticParams`, `dynamicParams`) — HIGH confidence
- NSI project conventions established in `CLAUDE.md` and prior templates — HIGH confidence
- Waxing-specific content structure derived from PROJECT.md requirements — HIGH confidence
