# Phase 6: Trust Pages - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

About page with brand story, esthetician profile, philosophy, hygiene protocols, and reviews. FAQ page with 15+ questions organized by 7 anxiety categories in accordion UI. These pages serve visitors who need more reassurance before booking.

</domain>

<decisions>
## Implementation Decisions

### About Page Story & Layout
- Story-first flow: Brand origin story → Maya's full bio → Philosophy → Hygiene protocols → Reviews → CTA
- Maya's specialties and certifications displayed as visual badges/pills — scannable trust-building
- Google reviews section included: aggregate rating + 3 individual review cards (same testimonials grid style as homepage)
- Philosophy section: dedicated visual callout with 3-4 brand values (Comfort First, Natural Ingredients, Transparency, Judgment-Free) as icon cards

### FAQ Page Organization
- All 7 anxiety categories visible as stacked sections — visitors scroll through, headings orient them
- Each category section: H3 heading + 1-2 sentence intro paragraph before the FAQ accordions
- Reuse the same FAQAccordion component from Phase 5 — consistent look, less code
- Search/filter: Claude's discretion on whether to add a simple text filter for 16 FAQs

### Hygiene & Safety Section
- Placement: Claude's discretion (About page, FAQ page, or both)
- Visual format: icon checklist — "✓ Single-use applicators ✓ Fresh wax per client ✓ Hospital-grade sanitization" — scannable trust signals

### Trust Signals Near CTAs
- Inline badge row directly adjacent to each CTA button — small badges (rating, licensed, hygiene) as last-second reassurance
- Both About and FAQ pages end with a warm booking CTA section + trust badges — every page is a conversion opportunity

### Claude's Discretion
- FAQ search/filter (skip or add based on usability judgment for 16 FAQs)
- Hygiene section placement (About, FAQ, or both)
- Brand value icon card content (which 3-4 values to feature)
- About page hero style (image placeholder vs branded header)

</decisions>

<specifics>
## Specific Ideas

- The About page goes deeper than the homepage EstheticianIntro — full bio (all 3 paragraphs), all specialties, all certifications
- FAQ category intros should address the anxiety before the Q&A answers it — e.g., "Pain" category intro acknowledges waxing hurts, then the FAQs explain why it's manageable
- Hygiene section uses icon checklist format, not clinical paragraphs — builds trust without feeling like a hospital

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-trust-pages*
*Context gathered: 2026-03-30*
