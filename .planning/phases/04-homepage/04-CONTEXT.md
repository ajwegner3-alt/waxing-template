# Phase 4: Homepage - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Full homepage with hero, services preview, first-timer pathway, trust signals, testimonials, esthetician intro, and final CTA. First-time visitors must feel safe enough to book. This is the highest-conversion page on the site.

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- Full-width hero image placeholder with text overlay — real client swaps in their studio photo
- Two CTAs: primary "Book Now" + secondary "First-Timer Guide" (scrolls to What to Expect section on same page)
- Small trust badge in the hero area (e.g., "★ 4.9 — 200+ happy clients") — instant credibility before scrolling
- Headline approach: Claude's discretion — must serve the core value of making first-timers feel safe

### Section Flow (top to bottom)
- Hero → Trust Bar → What to Expect → First-Timer Spotlight → Services Preview → Testimonials → Esthetician Intro → Final CTA
- This is a trust-first flow — builds credibility before showing the service menu

### Services Preview
- 4 category cards (Face, Body, Intimate, Packages) — one card per category with icon, name, tagline, and "View Services" link
- NOT individual service cards — this is a teaser, not the full menu

### What to Expect
- Icon cards format (NOT numbered steps) — visual icons with short descriptions in a grid
- Should address what happens at a first visit, reducing unknowns

### First-Timer Package Spotlight
- Dedicated full-width section (NOT just a card in the services grid)
- Show price upfront: "$70 — Save $17"
- Visual checklist of included items: "✓ Brazilian Wax ✓ Eyebrow Shaping ✓ Aftercare Kit"
- Dedicated CTA button

### Trust Bar
- Horizontal stat bar with 4 stats in a row: Google rating, years in business, client count, certifications
- Compact and scannable — not large icon cards

### Testimonials
- Static 3-card grid — 3 testimonial cards visible at once
- No carousel or slider — works on all devices without interaction

### Esthetician Intro
- Photo + text split layout — photo placeholder on one side, name/title/short bio on the other
- Pulls data from Maya Chen's staff profile

### Final CTA
- Simple booking bar — "Ready to book?" + Book Now button
- Clean, minimal — assumes trust is built by this point in the scroll

### Section Backgrounds
- Claude's discretion on background color rhythm using SectionWrapper bg variants (cream, white, sage, blush, dark)

### Claude's Discretion
- Hero headline and subheadline copy
- Background color alternation pattern across sections
- What to Expect icon card content (which steps to show)
- Number of "What to Expect" steps (3-5 is typical)
- Exact layout of esthetician intro (left/right photo placement)

</decisions>

<specifics>
## Specific Ideas

- The secondary hero CTA "First-Timer Guide" smooth-scrolls to the What to Expect section — keeps visitors on the homepage funnel rather than linking away
- First-Timer Package spotlight is transparent about price ($70) and savings ($17 off a-la-carte) — transparency builds trust for this audience
- Trust-first section ordering deliberately builds credibility before showing services or asking for a booking

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-homepage*
*Context gathered: 2026-03-29*
