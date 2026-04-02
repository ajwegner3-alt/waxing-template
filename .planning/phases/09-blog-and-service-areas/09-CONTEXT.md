# Phase 9: Blog and Service Areas - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Blog index page, individual blog post pages with 2-3 seed posts, and service area pages for 6 Omaha neighborhoods. Gives the template an operational local SEO foundation a real client can extend.

</domain>

<decisions>
## Implementation Decisions

### All Decisions — Claude's Discretion

The user deferred all gray areas to Claude with the directive: **"Optimize for SEO and conversion."**

All decisions below are Claude's recommendations, made to maximize local SEO value and first-timer conversion.

### Blog Content & Storage
- Claude decides: MDX vs TypeScript array for post storage
- Claude decides: Seed post topics (should target high-intent local search queries related to waxing)
- Claude decides: Post length and tone (should match the warm, conversational voice established in the data layer)
- Claude decides: Category/tag system if any

### Blog Page Layout
- Claude decides: /blog index card grid layout and density
- Claude decides: Individual post page typography, reading time display, and related service links
- Claude decides: Whether posts link back to specific service pages (yes — per SEO-07 internal linking)

### Service Area Pages
- Claude decides: /service-areas/[slug] page template structure
- Claude decides: How localized content, service callouts, local highlights, and weather context are displayed
- Claude decides: CTA placement and trust signals on area pages
- Data already exists: 6 neighborhoods in src/content/service-areas.ts (Midtown, West Omaha, South Omaha, North Omaha, Papillion, Bellevue)

### Guiding Principle
Every decision should serve: (1) local SEO value — unique content per page, internal links to service pages, location-specific keywords, (2) conversion — CTA on every page, trust signals adjacent, anxiety-reducing tone.

</decisions>

<specifics>
## Specific Ideas

- Blog posts should target searches like "how to prepare for your first Brazilian wax" and "waxing vs shaving sensitive skin" — high-intent educational content that links to service pages
- Service area pages must NOT be city-name swaps — each has genuinely distinct localContext, localHighlight, and neighborhoods in the data layer
- Internal linking is critical: blog posts link to relevant service pages, service area pages link to services popular in that neighborhood

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 09-blog-and-service-areas*
*Context gathered: 2026-04-01*
