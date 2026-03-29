# Phase 3: Data Layer - Research

**Researched:** 2026-03-29
**Domain:** TypeScript content authoring — static data files for a waxing studio
**Confidence:** HIGH

---

## Summary

Phase 3 is not an API phase or a library integration phase. It is a content-authoring phase. Every interface is already defined and compiling in `src/lib/types.ts` from Phase 1. The task is writing TypeScript `const` arrays that satisfy those interfaces, organized into files under `src/content/`, and exporting index accessor functions so downstream pages have clean, typed lookup helpers.

The primary technical concern is getting the content right — service names, sensitivity fields, FAQ anxiety categories, neighborhood localization — not wiring new infrastructure. The secondary concern is establishing the file organization pattern that Phase 4+ will import from without needing to know internal structure.

The studio brand is Honey & Bloom Wax Studio in Omaha, Nebraska. All-natural honey-based hard wax. Owner-operator (solo esthetician). Core value: first-time waxing clients must feel safe enough to book. Every piece of content should reduce anxiety, not catalog clinical information.

**Primary recommendation:** Write two plans — 03-01 for the service catalog (highest downstream dependencies), 03-02 for the supporting data (FAQs, staff, testimonials, service areas). Both files are pure content — no new libraries, no new components.

---

## Standard Stack

No new packages required. This phase uses only what Phase 1 already installed.

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | ^5 | Interface enforcement | All data files are `.ts`, validated at build time |
| Next.js | 16.x | Build system | `npm run build` confirms zero TypeScript errors |

### No New Installations
This phase adds zero dependencies. `src/content/` already exists and contains `client.config.ts`. New data files follow the same pattern: export typed constants.

**Installation:**
```bash
# No installation needed
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
└── content/
    ├── client.config.ts          # Phase 1 — already exists
    ├── services/
    │   ├── categories.ts         # ServiceCategory[] — 4 categories
    │   ├── face.ts               # Service[] — face waxing services
    │   ├── body.ts               # Service[] — body waxing services
    │   ├── intimate.ts           # Service[] — intimate waxing services
    │   ├── packages.ts           # Service[] — packages incl. First-Timer
    │   └── index.ts              # Barrel + accessor functions
    ├── faqs.ts                   # FAQ[] with anxiety categories
    ├── staff.ts                  # Staff[] — single esthetician
    ├── testimonials.ts           # Testimonial[] — 8+ service-specific
    └── service-areas.ts          # ServiceArea[] — 5-6 Omaha neighborhoods
```

**Why split services by category file:** Each category file stays under ~150 lines. A single `services.ts` with 15+ full Service objects (each with prep[], aftercare[], faqs[], whatToExpect) would exceed 600 lines and be hard to edit. Splitting by category is the same pattern medspa-template would use for treatments.

**Why an index.ts for services:** Downstream pages (Phase 5 dynamic routes) need `getServiceBySlug(slug)`, `getServicesByCategory(categorySlug)`, and `getAllServices()` without importing multiple files. The index.ts provides these and re-exports the raw arrays for pages that need them all.

### Pattern 1: Typed Data File

**What:** Each content file exports a typed constant array. No default exports — named exports only.

**When to use:** All content files in this phase.

**Example:**
```typescript
// src/content/faqs.ts
import type { FAQ } from "@/lib/types";

export const faqs: FAQ[] = [
  {
    question: "Will it hurt?",
    answer: "Most clients feel a quick snap — honestly, you'll be surprised how fast it's over. Our honey-based hard wax grips the hair, not your skin, so it's gentler than strip wax.",
    category: "pain",
  },
  // ...
];
```

### Pattern 2: Services Index with Accessor Functions

**What:** `src/content/services/index.ts` imports all category arrays, merges them, and exports typed lookup helpers.

**When to use:** Any downstream page that needs `getServiceBySlug()` or `getAllServices()`. Dynamic routes (`/services/[slug]`) call `getServiceBySlug(params.slug)` in `generateStaticParams`.

**Example:**
```typescript
// src/content/services/index.ts
import type { Service, ServiceCategory } from "@/lib/types";
import { faceServices } from "./face";
import { bodyServices } from "./body";
import { intimateServices } from "./intimate";
import { packageServices } from "./packages";
import { serviceCategories } from "./categories";

export const allServices: Service[] = [
  ...faceServices,
  ...bodyServices,
  ...intimateServices,
  ...packageServices,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getServicesByCategory(categorySlug: string): Service[] {
  return allServices.filter((s) => s.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

// Re-export for pages that need raw arrays
export { serviceCategories };
```

### Pattern 3: First-Timer Package Data Shape

Per CONTEXT.md this is at Claude's discretion. Recommendation: treat it as a regular package entry with a `featured: boolean` field is NOT the right call — the `Service` interface has no `featured` field and we should not diverge from the established type.

Instead, give the First-Timer Package a slug of `"first-timer-package"` and a `categorySlug` of `"packages"`. Give it richer `shortDescription` and `whatToExpect` content. Downstream components that need to spotlight it can import by slug:

```typescript
// In any component that needs the First-Timer spotlight:
import { getServiceBySlug } from "@/content/services";
const firstTimerPackage = getServiceBySlug("first-timer-package");
```

This avoids adding a field to the Service interface and keeps Phase 3 within its boundary. No interface changes needed.

### Pattern 4: Service Slug Convention

All slugs must be URL-safe, lowercase, hyphen-separated. They appear in:
- `Service.slug` → `/services/[slug]` URLs
- `Service.relatedServices[]` → cross-references between services
- `ServiceCategory.serviceSlugs[]` → category-to-service mapping
- `Testimonial.service` → display string (not a slug — can be human-readable)

The `relatedServices` field is a string array of Service slugs. Since all services are defined in the same phase, these can be filled in after writing all services. Plan the slugs before writing content to keep cross-references consistent.

### Anti-Patterns to Avoid

- **Adding fields not in the interface:** If a field seems useful (e.g., `featured`, `isPopular`), do NOT add it to the data file. That would require a type change and is out of scope for Phase 3. Use slug-based lookups instead.
- **Placeholder text:** Per project requirements, no Lorem Ipsum. Every field must have real content for the Honey & Bloom studio.
- **Clinical pain language:** The `painLevel` field is `PainLevel = 1 | 2 | 3 | 4 | 5`. Do not write "Pain level: 4/5 — moderate discomfort." Display components will convert the number to friendly badges. The data stores the number; the display layer adds the label.
- **Identical prep/aftercare across all services:** Each service should have prep/aftercare tailored to that body area. Brazilian prep differs from eyebrow prep. Generic lists undermine trust.
- **Splitting testimonials from services arbitrarily:** Each testimonial has an optional `service` field. Populate it for all 8+ testimonials so service pages can filter their own testimonials.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Service lookup by slug | A switch/case or find() per page | `getServiceBySlug()` in index.ts | Centralizes null-safety, downstream pages stay thin |
| Category-to-service mapping | Repeated `.filter()` calls | `getServicesByCategory()` in index.ts | One call, one place to update if a service moves categories |
| TypeScript validation of data | Manual runtime checks | `import type { Service }` + `npm run build` | TypeScript enforces the interface; build failure = data error |

**Key insight:** The accessor functions are the only "logic" in this phase. Everything else is content. Keep accessors under 20 lines total.

---

## Common Pitfalls

### Pitfall 1: Slug Mismatches in relatedServices

**What goes wrong:** A `relatedServices` entry references a slug that doesn't exist, or a slug is changed after being referenced elsewhere. TypeScript does NOT catch this — `relatedServices: string[]` is just strings.

**Why it happens:** Slugs are plain strings, not typed unions. A typo ("brazillian-wax" instead of "brazilian-wax") compiles fine.

**How to avoid:** Define all slugs as constants at the top of each category file, then reference those constants in `relatedServices`:
```typescript
// Define slug constants first
export const FACE_SLUGS = {
  eyebrow: "eyebrow-wax",
  upperlip: "upper-lip-wax",
  // ...
} as const;

// Reference in relatedServices arrays
relatedServices: [FACE_SLUGS.eyebrow, FACE_SLUGS.upperlip],
```
This makes TypeScript narrowing catch typos. An alternative is to write all services first, then fill in `relatedServices` and `serviceSlugs` as a final pass.

**Warning signs:** A "Related Services" section on a service page renders zero items despite having `relatedServices` defined — slug mismatch causes `find()` to return undefined.

### Pitfall 2: ServiceCategory.serviceSlugs Out of Sync

**What goes wrong:** `categories.ts` lists slugs in `serviceSlugs[]` that don't match actual Service slugs, or a new service is added without updating the category's `serviceSlugs`.

**Why it happens:** The category array and service arrays are in separate files. There's no TypeScript enforcement between them.

**How to avoid:** Write categories AFTER services. Generate `serviceSlugs` from the actual service array:
```typescript
import { faceServices } from "./face";
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "face",
    serviceSlugs: faceServices.map((s) => s.slug), // derived, never manual
    // ...
  },
];
```

**Warning signs:** Category pages show fewer services than exist, or `getServicesByCategory()` returns fewer than expected.

### Pitfall 3: Omitting Required Fields on Service

**What goes wrong:** TypeScript error on `npm run build` because a service object is missing `heroHeadline`, `metaDescription`, or another required field.

**Why it happens:** The Service interface has 20+ fields. It's easy to miss one when writing 12+ services.

**How to avoid:** Write one complete service object first and confirm it compiles. Use it as a template for all subsequent services. Run `npx tsc --noEmit` after writing each category file, not just at the end.

**Warning signs:** Build fails with "Property X is missing in type."

### Pitfall 4: FAQ Category Misuse

**What goes wrong:** FAQs categorized under the wrong anxiety type (e.g., a hygiene question under "prep"), which breaks the accordion grouping on the FAQ page in Phase 6.

**Why it happens:** The seven categories (`first-timer`, `pain`, `prep`, `privacy`, `hygiene`, `aftercare`, `sensitive-skin`) have overlapping concerns.

**How to avoid:** Use this mental model:
- `first-timer` — "What happens at my first appointment?" (onboarding/orientation questions)
- `pain` — Questions specifically about hurting ("Will it hurt?", "Which services hurt most?")
- `prep` — Things to do/avoid BEFORE the appointment (hair length, avoiding sun, caffeine)
- `privacy` — Comfort and modesty concerns ("Do I have to get fully undressed?", "Is the room private?")
- `hygiene` — Cleanliness and safety ("Do you reuse wax?", "Are applicators single-use?")
- `aftercare` — What to do/avoid AFTER the appointment (ingrown hair prevention, sun exposure)
- `sensitive-skin` — Specific concerns for people who believe their skin is extra-reactive

**Warning signs:** FAQ page accordion has one massively long category and one empty category.

### Pitfall 5: Service Area localContext as City-Name Swap

**What goes wrong:** Every neighborhood page has the same text with only the neighborhood name changed, undermining the local SEO goal and feeling obviously templated.

**Why it happens:** It's faster to write one description and swap city names.

**How to avoid:** Each neighborhood needs 2-4 sentences of genuinely local content referencing actual characteristics: demographic profile, lifestyle indicators, nearby landmarks, housing type, or commuter patterns that connect to why waxing fits this area. See the Neighborhood Selection section below for what distinguishes each Omaha area.

**Warning signs:** All neighborhood `localContext` fields are the same length and sentence structure.

---

## Code Examples

### Service Object — Brazilian Wax (Full Example)
```typescript
// Source: types.ts Service interface (Phase 1)
// This is the most complete example — intimate services have the most content requirements
{
  slug: "brazilian-wax",
  categorySlug: "intimate",
  name: "Brazilian Wax",
  shortDescription:
    "Complete hair removal from the front, back, and everything in between. Our honey-based hard wax makes this the most comfortable Brazilian you've ever had — or your first one.",
  heroHeadline: "Brazilian Wax in Omaha That Actually Feels Good",
  heroSubheadline:
    "Hard wax grips hair, not skin. Most clients are surprised by how fast it goes.",
  coverImage: "/images/services/brazilian-wax.jpg",
  duration: "30–45 minutes",
  price: 65,
  priceDisplay: "$65",
  sensitiveSkintSafe: true,
  painLevel: 4,
  preparation: [
    "Hair should be at least ¼ inch long — about 2–3 weeks of growth",
    "Exfoliate gently 24–48 hours before (not day-of)",
    "Shower and arrive clean — no lotions or oils on the area",
    "Avoid caffeine the day of if you're sensitive to pain",
    "Wear loose, comfortable underwear and pants",
  ],
  aftercare: [
    "Avoid heat (hot tub, sauna, intense exercise) for 24 hours",
    "No tight clothing for 24 hours — friction causes irritation",
    "Avoid sun exposure on the area for 48 hours",
    "Start gentle exfoliation 3–4 days after to prevent ingrown hairs",
    "Moisturize daily with a gentle, fragrance-free lotion",
  ],
  ingredients: [
    "Honey-based hard wax",
    "Chamomile extract (calming)",
    "No rosin — gentler on sensitive skin",
  ],
  whatToExpect:
    "Your esthetician will walk you through exactly what's happening at every step — no surprises. You'll be covered and comfortable the entire time. Hard wax sets on the hair without sticking to skin, so removal feels significantly less harsh than strip wax. Most clients tell us they were dreading it and then wonder what all the fuss was about.",
  faqs: [
    {
      question: "Is my first Brazilian the most painful?",
      answer: "Usually yes — the first time tends to be the most uncomfortable because the hair follicles haven't been conditioned. By your second and third sessions, most clients say it barely registers.",
      category: "pain",
    },
  ],
  relatedServices: ["bikini-wax", "full-leg-wax"],
  metaTitle: "Brazilian Wax in Omaha | Honey & Bloom Wax Studio",
  metaDescription:
    "Comfortable Brazilian waxing in Omaha using honey-based hard wax. First-timers welcome. $65, 30–45 min. Book online at Honey & Bloom Wax Studio.",
},
```

### Testimonial — Service-Specific Example
```typescript
// Source: types.ts Testimonial interface (Phase 1)
{
  quote:
    "I was genuinely terrified for my first Brazilian. My esthetician talked me through every step, and it was so much faster and easier than I expected. I've already booked my next appointment.",
  author: "Jessica M.",
  location: "Omaha, NE",
  rating: 5,
  service: "Brazilian Wax",
},
```

### FAQ — Category-Aware Example
```typescript
// Source: types.ts FAQ interface (Phase 1)
{
  question: "Do you reuse wax between clients?",
  answer:
    "Never. Every client gets fresh wax from a clean container, and we use single-use applicators throughout your entire appointment. No double-dipping — ever. It's a non-negotiable hygiene standard.",
  category: "hygiene",
},
```

### Service Area — Localized Example
```typescript
// Source: types.ts ServiceArea interface (Phase 1)
{
  slug: "midtown-omaha",
  city: "Midtown Omaha",
  state: "Nebraska",
  county: "Douglas County",
  heroHeadline: "Waxing in Midtown Omaha",
  heroSubheadline: "Close to home, close to downtown — Honey & Bloom serves Midtown.",
  localContext:
    "Midtown Omaha is one of the city's most walkable neighborhoods, home to young professionals and long-time residents drawn to its mix of bungalows, coffee shops, and Dundee-area boutiques. The area's active lifestyle crowd — runners, cyclists, and fitness regulars — frequently asks about waxing as part of their grooming routine.",
  population: "~18,000",
  neighborhoods: ["Dundee", "Blackstone", "Field Club"],
  nearbyAreas: ["Benson", "Downtown Omaha", "Aksarben"],
  testimonials: [], // populated from testimonials.ts
  localHighlight: {
    title: "Dundee Dell and the Blackstone District",
    description: "Midtown's Blackstone District has emerged as one of Omaha's most vibrant dining and entertainment neighborhoods.",
    neighborhood: "Blackstone",
  },
  weatherContext:
    "Omaha summers bring humidity that makes waxing — versus daily shaving — a popular low-maintenance choice for Midtown residents heading to Zorinsky Lake or Carter Park.",
  schema: {
    areaServed: "Midtown Omaha, Nebraska",
  },
},
```

---

## Content Decisions (Claude's Discretion)

These items were delegated to Claude in CONTEXT.md and must be resolved before writing.

### Service Count and Distribution
**Recommendation:** 14 services across 4 categories (exceeds the 12+ minimum):

| Category | Services | Slugs |
|----------|----------|-------|
| Face (4) | Eyebrow Wax, Upper Lip Wax, Chin Wax, Full Face Wax | eyebrow-wax, upper-lip-wax, chin-wax, full-face-wax |
| Body (5) | Underarm Wax, Full Arm Wax, Half Leg Wax, Full Leg Wax, Back Wax | underarm-wax, full-arm-wax, half-leg-wax, full-leg-wax, back-wax |
| Intimate (3) | Bikini Wax, Extended Bikini Wax, Brazilian Wax | bikini-wax, extended-bikini-wax, brazilian-wax |
| Packages (2) | First-Timer Package, Smooth All Over Package | first-timer-package, smooth-all-over-package |

**Rationale for distribution:**
- 4 face services gives menu variety without padding (chin is frequently requested alongside lip)
- 5 body services covers the most common requests; back wax rounds out the "can you do my back?" question
- 3 intimate services represents the natural waxing progression from conservative to full; the "extended bikini" bridges the gap between bikini and Brazilian and is commonly requested
- 2 packages keeps the catalog clean; the First-Timer Package is the homepage hero, the second package captures the "regular client" upgrade

### First-Timer Package Data Shape
**Recommendation:** Regular Service entry in the `packages` category with slug `"first-timer-package"`. Use richer `whatToExpect`, longer `shortDescription`, and a `heroHeadline` that speaks directly to anxiety. No new fields on the interface. Include bundled service list in the `shortDescription` copy (e.g., "Brazilian + eyebrow wax + aftercare kit"). The `price` is a discounted bundle price.

The homepage spotlight component in Phase 4 will import `getServiceBySlug("first-timer-package")` directly.

### Neighborhood Selection (5-6 Omaha Areas)
**Recommendation:** 6 neighborhoods offering geographic coverage and demographic variety:

| Slug | Display Name | Why This Neighborhood |
|------|--------------|-----------------------|
| midtown-omaha | Midtown Omaha | Young professional density; active lifestyle; walkable |
| west-omaha | West Omaha | Suburban homeowners; bridal/event market; highest income density |
| south-omaha | South Omaha | Hispanic community concentration; growing young professional base |
| north-omaha | North Omaha | Historically underserved area with growing service demand |
| papillion | Papillion | Suburban family market; commuter corridor; separate suburb |
| bellevue | Bellevue | Military community (Offutt AFB); steady rotation clientele |

**Rationale:**
- Midtown + West + South + North = geographic cross-section of Omaha proper
- Papillion + Bellevue = two separate suburbs that drive significant Google "near me" traffic
- Papillion/Bellevue are technically separate cities, not neighborhoods, which creates more distinct local content
- Military community at Bellevue/Offutt AFB creates a recurring clientele profile (service members and spouses with predictable grooming schedules)

### Service Area Localization Approach
**Recommendation:** Mix of neighborhood personality + practical logistics per neighborhood. The formula: 2 sentences about who lives there and their lifestyle relevance to waxing, 1 sentence about proximity to the studio, optionally 1 sentence about a neighborhood landmark or characteristic that grounds the page.

Avoid:
- Weather-only framing (feels generic)
- Pure demographics (feels like a census page)
- Fake local knowledge (landmarks that don't exist)

### Testimonial Ratio
**Recommendation:** 5 first-timer relief stories + 4 loyal repeat-client testimonials = 9 total (exceeds the 8 minimum).

First-timer stories (5) should:
- Acknowledge pre-booking anxiety explicitly ("I was nervous...")
- Note a specific comfort detail (the talking-through, the speed, the wax type)
- End with a rebooking signal

Repeat-client stories (4) should:
- Mention a specific time period ("I've been coming for 2 years...")
- Reference consistency (smooth results, same esthetician)
- One should be a bridal/event testimonial

Distribute across services: 2 Brazilian, 2 eyebrow, 1 bikini, 1 full leg, 1 underarm, 1 first-timer package, 1 full face.

---

## State of the Art

This phase has no library changes. The relevant "state of the art" is the established project pattern:

| Pattern | Convention | Source |
|---------|-----------|--------|
| Content file location | `src/content/[type].ts` or `src/content/[type]/index.ts` | client.config.ts establishes this location |
| Export style | Named exports only, typed constants | All Phase 1 files use named exports |
| Type import | `import type { X } from "@/lib/types"` | All Phase 1-2 files use this pattern |
| No default exports | Every file uses `export const` | Project convention from Phase 1 |
| Build validation | `npm run build` is the acceptance gate | Established in Phase 1 verification |

---

## Open Questions

1. **Price points for the First-Timer Package**
   - What we know: Packages need `price: number`. Individual services (Brazilian ~$65, eyebrow ~$22) would sum to ~$87. A bundle discount of $10-15 is typical for waxing studios.
   - What's unclear: Whether the package should include an aftercare product in the price or describe it as a free add-on.
   - Recommendation: Price at $70 (Brazilian + eyebrow bundle, $17 savings from a-la-carte). Mention aftercare kit as complimentary in the description, not as a priced item.

2. **Photo placeholder paths**
   - What we know: Service.coverImage and Staff.headshot require paths relative to /public. No actual images exist yet.
   - What's unclear: Whether Phase 3 should create placeholder image files or just write the paths and let Phase 10 (QA) flag missing images.
   - Recommendation: Use consistent placeholder paths like `/images/services/[slug].jpg` and `/images/staff/[slug].jpg`. Do not create actual image files in Phase 3 — the paths just need to exist in the data. Next.js Image component will 404 on missing images, which is visible and acceptable until real photos are provided.

3. **Staff esthetician name**
   - What we know: CONTEXT.md says 1 esthetician, owner-operator. client.config.ts uses "Honey & Bloom Wax Studio" as business name.
   - What's unclear: A human name hasn't been decided for the esthetician character.
   - Recommendation: Use "Maya Chen" as the esthetician name. It's culturally neutral, professional, and fits the boutique studio personality. The owner-operator bio should feel personal: trained in California, moved to Omaha, 6 years in business, specializes in first-timer anxiety reduction.

---

## Sources

### Primary (HIGH confidence)
- `src/lib/types.ts` (directly read in this session) — all interface fields, exact field names, and type constraints
- `src/content/client.config.ts` (directly read in this session) — business name, address, prices range, wax formula, specialties
- `src/lib/schema.ts` (directly read in this session) — schema.org type conventions already set
- `.planning/phases/01-foundation/01-RESEARCH.md` — established project patterns
- `.planning/STATE.md` — all accumulated decisions from Phases 1 and 2
- `.planning/ROADMAP.md` — downstream phase dependencies (confirms what Phase 4-5 will import)
- `.planning/REQUIREMENTS.md` — exact field requirements per DATA-01 through DATA-05

### Secondary (MEDIUM confidence)
- Omaha neighborhood demographics and landmarks: general knowledge of Omaha geography used for neighborhood selection. Specific population figures (~18,000 for Midtown, etc.) are approximations — real operator should verify.
- Waxing pricing ($22 eyebrow, $65 Brazilian, etc.): representative market-rate pricing for a mid-tier Omaha waxing studio. These are placeholder prices — the real operator replaces them.

### Tertiary (LOW confidence)
- "Maya Chen" esthetician name: invented character, no source — real operator replaces with actual name
- Specific Omaha landmarks mentioned in service area localContext (Blackstone District, Zorinsky Lake, Offutt AFB): general knowledge, not verified against current conditions

---

## Metadata

**Confidence breakdown:**
- File structure and patterns: HIGH — directly derived from types.ts and project conventions
- Interface field requirements: HIGH — read directly from types.ts
- Service catalog content (names, slugs, counts): HIGH — locked decisions from CONTEXT.md, distribution is Claude's discretion
- Service area neighborhoods: MEDIUM — logical selection for Omaha coverage, but specific demographics are approximate
- Pricing and esthetician character: LOW — placeholder values, real operator replaces

**Research date:** 2026-03-29
**Valid until:** Entire project lifespan — this phase has no external dependencies that change
