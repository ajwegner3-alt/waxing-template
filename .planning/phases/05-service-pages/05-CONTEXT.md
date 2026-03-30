# Phase 5: Service Pages - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Service menu page showing all services organized by category with pricing, plus individual service detail pages with prep, aftercare, sensitivity badges, ingredients, inline FAQ, and related services. These are the highest-intent conversion pages on the site.

</domain>

<decisions>
## Implementation Decisions

### Menu Page Layout (/services)
- Stacked sections — all 4 categories shown as vertical sections on one long page (Face, Body, Intimate, Packages in order)
- Sticky category pills at the top for jumping between sections
- Each service card shows: name + price + duration (compact — drives clicks to detail pages)
- Sensitivity/pain badges NOT shown on menu cards — detail pages only

### Individual Service Page Structure (/services/[slug])
- Above the fold: image placeholder hero + service name as H1 + price prominently displayed + Book Now CTA — high-intent visitors can book immediately
- Below the fold section order (anxiety-first flow): What to Expect → Prep → Aftercare → Ingredients → FAQ → Related Services
- Inline testimonial: one matching testimonial pulled by service name displayed as a quote card
- Bottom CTA section after Related Services — catches visitors who scrolled the full page
- Image placeholder hero for each service page (not text-only header)
- Prep/aftercare display: Claude's discretion on accordion vs always-visible lists
- Service-specific FAQs: accordion UI
- Breadcrumbs at top (already built in Phase 2)

### Sensitivity & Ingredient Display
- Pain level: colored pill badge with friendly label — green for gentle, amber for moderate, warm red for intense
- Sensitive-skin badge: grouped with pain level in a badge row near the top — not a separate callout
- Ingredients: inline callout box listing ingredients + what's NOT used — integrated into the page flow

### Related Services & Cross-Linking
- 2-3 service cards at the bottom (same style as menu page cards — name, price, duration)
- Heading: "You Might Also Like"
- Cards link to related service detail pages

### Claude's Discretion
- Prep/aftercare display format (accordion vs always-visible)
- Pain level color mapping specifics
- Ingredient callout box styling
- Hero image placeholder styling (gradient vs brand color)

</decisions>

<specifics>
## Specific Ideas

- These are the highest-intent pages — visitors searching "Brazilian wax Omaha" land directly on service pages, so above-the-fold CTA is critical
- Anxiety-first section ordering means concerns are addressed before the visitor reaches the booking ask at the bottom
- Menu page sticky category pills help navigate 14 services across 4 categories without endless scrolling

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-service-pages*
*Context gathered: 2026-03-29*
