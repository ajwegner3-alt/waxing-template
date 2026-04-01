# Phase 8: Contact and SEO - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Contact page with form, map placeholder, hours, and click-to-call. Complete SEO scaffolding across all pages: JSON-LD schema (LocalBusiness, Service, FAQPage, BreadcrumbList), sitemap.xml, robots.txt, canonical URLs, Open Graph/Twitter meta tags. Makes the site ready for indexing.

</domain>

<decisions>
## Implementation Decisions

### Contact Page Layout
- Two-column split: form on left, contact info (address, phone, hours, map) on right
- Form: 3 fields (name, phone, message) — UI-only, simulated success state on submit ("Thanks! We'll be in touch")
- Map: static styled placeholder div with address text + "View on Google Maps" link — no API key needed
- Business hours displayed on contact page AND footer (both locations)
- Click-to-call phone number prominent in the contact info column

### Schema Markup Strategy
- Schema injection method: Claude's discretion (SchemaScript component or inline)
- BreadcrumbList schema on every interior page (all pages except homepage)
- Per-page schema types: LocalBusiness (homepage — already exists), Service (service detail pages), FAQPage (FAQ page), BreadcrumbList (all interior)

### Meta Tags & Open Graph
- Default brand OG image as fallback for pages without specific cover images — social shares always look polished
- Verify + fix gaps: audit all pages, fix any missing or incorrect title/description/canonical
- Title format: "[Page/Service] in [City] | [Company]" — already established in prior phases

### Sitemap & Robots
- /book page included in sitemap — indexed for "book waxing Omaha" searches
- Noindex pages: Claude's discretion (standard SEO practice)
- All content pages included in sitemap

### Claude's Discretion
- Schema injection pattern (SchemaScript vs inline per-page)
- Noindex policy (which utility pages if any)
- Default OG image design/placeholder approach
- Internal linking audit scope and fixes
- robots.txt crawl directives

</decisions>

<specifics>
## Specific Ideas

- The contact form simulates success to demonstrate full UX — real client adds their own backend handler
- Static map placeholder avoids API key dependency while still showing the studio location concept
- BreadcrumbList on every interior page maximizes structured data coverage for Google rich results

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-contact-and-seo*
*Context gathered: 2026-04-01*
