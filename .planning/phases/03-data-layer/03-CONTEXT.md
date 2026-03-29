# Phase 3: Data Layer - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

All content data exists as typed TypeScript files so every downstream page and component can pull real content with no placeholder text. Covers: service catalog, FAQs, staff profiles, testimonials, and service area records.

</domain>

<decisions>
## Implementation Decisions

### Service Catalog Structure
- 4 categories: Face, Body, Intimate, Packages — no additional categories
- Exact prices on every service (single dollar amount, not ranges)
- Sensitivity displayed as descriptive badges ("Gentle", "Moderate", "Sensitive Area") — NOT a numbered 1-5 scale
- Pain level field uses friendly labels, not clinical numbers

### First-Timer Package
- Claude's discretion on data shape — can be a regular package entry with a featured flag, or a standalone with richer fields (included services, savings amount), whichever best serves the homepage spotlight and service pages downstream

### Content Voice & Copy
- Warm conversational tone throughout — second-person ("you/your"), friendly, approachable
- Service descriptions: short (2-3 sentences) — let prep/aftercare/FAQ sections carry the detail
- FAQs: direct second-person voice ("Most clients feel a quick snap, but you'll be surprised how fast it's over")
- Preparation and aftercare: bullet list format — scannable, actionable, mobile-friendly

### Staff Profiles
- 1 esthetician only (owner-operator model) — solo practitioner who IS the brand
- Bio should feel personal and intimate, matching the boutique studio identity

### Testimonials
- Service-specific — each testimonial ties to a specific service for placement on service pages
- Mix of first-timer relief stories AND loyal repeat-client testimonials
- Attribution: first name + city (e.g., "Sarah M. — Omaha") — Google review style

### Service Areas
- Claude's discretion on which 5-6 Omaha neighborhoods to include
- Each page gets localized service callouts — 2-3 services highlighted per neighborhood based on demographic fit (e.g., bridal packages in suburban areas)

### Claude's Discretion
- First-Timer Package data shape (standalone vs flagged package)
- Neighborhood selection (5-6 Omaha areas)
- Service area localization approach (neighborhood personality, practical logistics, or mix)
- Exact number of services per category (12+ total across 4 categories)
- Testimonial first-timer vs repeat-client ratio

</decisions>

<specifics>
## Specific Ideas

- The core value is "first-time waxing clients must feel safe enough to book" — content tone should consistently reduce anxiety
- Honey & Bloom uses all-natural honey-based formulas — this should appear in service descriptions where relevant
- The owner-operator model means the single esthetician's personality permeates all copy

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-data-layer*
*Context gathered: 2026-03-29*
