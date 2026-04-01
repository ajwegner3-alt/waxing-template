# Phase 8: Contact and SEO — Research

**Researched:** 2026-03-31
**Domain:** Next.js 16 App Router SEO APIs, JSON-LD schema, contact form (UI-only), sitemap/robots
**Confidence:** HIGH — all findings verified against node_modules/next/dist/docs/ and existing codebase

---

## Summary

Phase 8 completes two tracks: a contact page with a UI-only 3-field form and an SEO scaffolding pass across every existing page. The codebase is already well-prepared — `generatePageMetadata` is in use on every page from Phases 4–7, `SchemaScript` already exists as a reusable component, and `Breadcrumbs` is already wired in but was explicitly deferred its BreadcrumbList schema injection to this phase. The main work is: (1) building the `/contact` page to spec, (2) adding the BreadcrumbList schema injection to the `Breadcrumbs` component, (3) adding `Service` schema to service detail pages and `FAQPage` schema to `/faq`, (4) generating `sitemap.ts` and `robots.ts` via Next.js file conventions, and (5) a metadata audit pass to verify no gaps.

Next.js 16 provides first-class TypeScript-typed file conventions for sitemap and robots — use `sitemap.ts` and `robots.ts` in the `app/` root rather than any static XML files. These are programmatic Route Handlers that auto-read `clientConfig` for the base URL.

**Primary recommendation:** Use Next.js `sitemap.ts` + `robots.ts` file conventions. Inject all per-page schema via existing `SchemaScript` placed below the page's `<main>` content, co-located in each `page.tsx`. Use `generatePageMetadata` already in place — the audit only needs to patch the `/book` page noindex decision and verify title character counts.

---

## Standard Stack

All tools are already installed and in use — no new dependencies for Phase 8.

### Core (already in codebase)
| Tool | Version | Purpose | Status |
|------|---------|---------|--------|
| `next` | 16.2.1 | `MetadataRoute.Sitemap`, `MetadataRoute.Robots` typed conventions | Already installed |
| `SchemaScript` | n/a | Injects `<script type="application/ld+json">` | Already at `src/components/ui/SchemaScript.tsx` |
| `generatePageMetadata` | n/a | Generates canonical, OG, Twitter, robots per page | Already at `src/lib/metadata.ts`, used everywhere |
| `generateWaxingBusinessSchema` | n/a | LocalBusiness/BeautyBusiness JSON-LD | Already at `src/lib/schema.ts`, used in layout.tsx |
| `Breadcrumbs` | n/a | UI nav trail — schema deferred to Phase 8 | Already at `src/components/layout/Breadcrumbs.tsx` |

### What Phase 8 Adds
| New File | Purpose |
|----------|---------|
| `src/app/sitemap.ts` | Typed sitemap.xml generator |
| `src/app/robots.ts` | robots.txt generator |
| `src/app/contact/page.tsx` | Contact page |
| `src/components/contact/ContactForm.tsx` | 3-field controlled form ("use client") |
| `src/components/contact/ContactInfo.tsx` | Address, phone, hours, map placeholder |
| Schema generators in `src/lib/schema.ts` | `generateServiceSchema`, `generateFAQPageSchema`, `generateBreadcrumbSchema` |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Recommended Project Structure Additions
```
src/
├── app/
│   ├── contact/
│   │   └── page.tsx              # Contact page (Server Component)
│   ├── sitemap.ts                # Next.js sitemap file convention
│   └── robots.ts                 # Next.js robots file convention
├── components/
│   └── contact/
│       ├── ContactForm.tsx       # "use client" — 3-field form with simulated submit
│       ├── ContactInfo.tsx       # Server Component — address/hours/map placeholder
│       └── index.ts              # Barrel export
└── lib/
    └── schema.ts                 # Extend with Service, FAQPage, BreadcrumbList generators
```

### Pattern 1: sitemap.ts — Programmatic Route Handler

Next.js 16 `sitemap.ts` placed at `app/sitemap.ts` auto-serves at `/sitemap.xml`. Use the typed `MetadataRoute.Sitemap` return type. Build the URL list from `clientConfig.siteUrl` + `allServices` slugs.

```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md
import type { MetadataRoute } from "next";
import { clientConfig } from "@/content/client.config";
import { allServices } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clientConfig.siteUrl;
  const serviceUrls = allServices.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...serviceUrls,
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
```

### Pattern 2: robots.ts — File Convention

```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
import type { MetadataRoute } from "next";
import { clientConfig } from "@/content/client.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${clientConfig.siteUrl}/sitemap.xml`,
  };
}
```

**Noindex decision (Claude's discretion):** The `/book` page should remain indexed — it is a primary conversion destination (a customer searching "book waxing omaha" should find it). The only page with a noindex rationale would be a thank-you/confirmation page if one existed. There is none (booking confirmation is an inline step, not a separate route). Recommended: no disallow entries — all content pages are indexable.

### Pattern 3: BreadcrumbList Schema — Inject in Breadcrumbs Component

The `Breadcrumbs` component at `src/components/layout/Breadcrumbs.tsx` is a Server Component that already receives the full `items` array. Phase 8 adds inline `SchemaScript` rendering inside `Breadcrumbs`, building the BreadcrumbList from the `items` prop (with "Home" prepended, matching current UI logic). This is cleaner than per-page manual injection because the schema stays co-located with the UI element it describes.

```typescript
// Source: codebase — src/components/layout/Breadcrumbs.tsx pattern
// BreadcrumbList schema built from same `all` array as UI renders
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: all.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: `${siteUrl}${item.href}`,
  })),
};
```

The `Breadcrumbs` component needs `clientConfig.siteUrl` imported to build absolute URLs (schema requires full URLs, not relative paths). It remains a Server Component.

### Pattern 4: Service Schema — Extend schema.ts

Add `generateServiceSchema(service, config)` to `src/lib/schema.ts`. Call it in `src/app/services/[slug]/page.tsx` below the page markup, passing to `SchemaScript`.

```typescript
// Source: codebase pattern — schema.ts generateWaxingBusinessSchema signature
export function generateServiceSchema(
  service: Service,
  config: WaxingClientConfig
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": ["LocalBusiness", "BeautyBusiness"],
      name: config.name,
      url: config.siteUrl,
    },
    url: `${config.siteUrl}/services/${service.slug}`,
    ...(service.price != null && { offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
    }}),
  };
}
```

### Pattern 5: FAQPage Schema — Extend schema.ts

```typescript
// Source: codebase pattern
export function generateFAQPageSchema(
  faqs: FAQ[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
```

### Pattern 6: Contact Page Layout

Two-column split. Left: `ContactForm` (controlled, "use client"). Right: `ContactInfo` (Server Component — reads clientConfig directly). The form has three fields: name, phone, message. Simulated submit state (no API call) using `useState` for a "Thank you" confirmation. Map placeholder is a styled `div` with address text and a `<a href="...google.com/maps...">View on Google Maps</a>` link.

The contact page does NOT use `/book` — it's an inquiry form for general questions. This is a meaningful distinction: the BookingBar/BookingLink CTAs remain the primary booking path.

### Anti-Patterns to Avoid

- **Do not hand-edit XML for sitemap.** The `sitemap.ts` file convention generates syntactically valid XML automatically. A static `sitemap.xml` in `/public` bypasses Next.js's canonical URL handling and won't pick up dynamic service slugs.
- **Do not duplicate the LocalBusiness schema on every page.** It lives in `layout.tsx` via `SchemaScript` — that is correct; it renders once per page in the `<body>`. Per-page schema (Service, FAQPage, BreadcrumbList) is added as additional `SchemaScript` in each page.tsx, not replacing the layout one.
- **Do not use relative URLs in JSON-LD.** All schema `item`, `url`, and `image` fields require absolute URLs. Always prefix with `clientConfig.siteUrl`.
- **Do not put the BreadcrumbList schema on the homepage.** Breadcrumbs are an interior-page pattern — the homepage has no breadcrumb trail. The existing `Breadcrumbs` component is not rendered on the homepage, so no special guard is needed beyond not calling it there.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| sitemap.xml | Static file in /public | `app/sitemap.ts` file convention | Dynamic — picks up all service slugs automatically; typed `MetadataRoute.Sitemap` |
| robots.txt | Static file in /public | `app/robots.ts` file convention | Reads `clientConfig.siteUrl` at build time; typed; no sync risk |
| OG tags per page | Manual `<meta>` tags | `generatePageMetadata` (already done) | Already handles OG, Twitter, canonical, robots in one call |
| Form submission handling | API route + email | Simulated success state | Phase 8 scope is UI-only per CONTEXT.md decisions |
| Google Maps embed | `<iframe>` with API key | Styled placeholder div + "View on Google Maps" link | No API key needed, no CORS issues, matches CONTEXT.md spec exactly |

**Key insight:** Next.js 16's file conventions for sitemap and robots are Route Handlers cached at build time. They generate zero client-side JS and are the idiomatic approach. Using `/public/sitemap.xml` is an anti-pattern in the App Router.

---

## Common Pitfalls

### Pitfall 1: Schema URL fields use relative paths
**What goes wrong:** JSON-LD validators reject relative URLs like `/services/brazilian-wax`. Google's Rich Results Test will fail. `item` fields in BreadcrumbList and `url` fields in Service schema must be absolute.
**Why it happens:** Developers copy the UI path pattern (which is relative) into schema.
**How to avoid:** Always concatenate `clientConfig.siteUrl` before any path string in schema generators.
**Warning signs:** Rich Results Test shows "Invalid URL" errors.

### Pitfall 2: Multiple LocalBusiness schemas on a page
**What goes wrong:** Two LocalBusiness JSON-LD blocks on the same page (one from layout.tsx, one accidentally added in page.tsx) confuse crawlers and may cause GSC warnings.
**Why it happens:** Developers add page-level schema and forget the root layout already emits LocalBusiness via SchemaScript.
**How to avoid:** Service pages get `Service` schema only. FAQ page gets `FAQPage` schema only. BreadcrumbList is additive and fine alongside other schemas. Never repeat LocalBusiness in a page.tsx.

### Pitfall 3: sitemap.ts / robots.ts placed in wrong directory
**What goes wrong:** File placed at `src/app/sitemap.ts` works. File placed at project root or `src/sitemap.ts` is ignored entirely — no 404, just silently missing.
**Why it happens:** Convention requires the file to be in the `app/` directory root, not the project root.
**How to avoid:** `app/sitemap.ts` and `app/robots.ts` — exactly inside the app router directory. Verify by checking `next build` output for `/sitemap.xml` route.

### Pitfall 4: Contact form "use client" escalation creeps upward
**What goes wrong:** If `ContactForm` ("use client") is imported directly into the page Server Component incorrectly, it can escalate the page to a client component.
**Why it happens:** "use client" marks a boundary — the component itself and its imports become client-side, but the parent (page.tsx) stays server if it only imports the component reference, not re-exports.
**How to avoid:** Follow the Phase 7 pattern — the page.tsx remains a Server Component. `ContactForm` is "use client" for its own state. `ContactInfo` is a Server Component. Both are imported into `page.tsx` as child components, which is correct (Server Components can render Client Components as children).

### Pitfall 5: FAQPage schema includes all 7 categories worth of FAQs (too many)
**What goes wrong:** Including all 50+ FAQs in a single FAQPage schema block creates enormous JSON-LD. Google recommends only including FAQs that are directly visible on the page in the schema.
**Why it happens:** Developers pass the entire `faqs` array without filtering.
**How to avoid:** The FAQ page renders all FAQs, so including all of them in FAQPage schema is actually correct here. The concern is only if a single service page has a FAQAccordion with 3-5 items — include only those items in that page's FAQPage schema, not the full global FAQ list.

### Pitfall 6: Title tags over 60 characters truncate in SERPs
**What goes wrong:** Google truncates titles at ~60 characters. The current patterns like "Waxing Services & Pricing in Omaha | Honey & Bloom Wax Studio" are at 60+ chars. The metadata audit should flag any title over 60 chars.
**Why it happens:** Title format "[Page/Service] in [City] | [Company]" compounds to long strings for verbose service names.
**How to avoid:** During the metadata audit pass, count characters and shorten where needed. Abbreviating "Honey & Bloom Wax Studio" to "Honey & Bloom" in some titles is acceptable.

---

## Code Examples

### ContactForm — Simulated Submit Pattern
```typescript
// Source: Phase 7 pattern (booking sub-components as "use client" children)
// ContactForm.tsx
"use client";
import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI-only — no API call per CONTEXT.md
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="font-heading text-2xl text-brand-dark mb-2">Got it!</p>
        <p className="text-brand-dark/70">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 3 fields: name, phone, message */}
    </form>
  );
}
```

### Breadcrumbs — BreadcrumbList Schema Injection
```typescript
// Source: src/components/layout/Breadcrumbs.tsx + schema pattern
// Add to Breadcrumbs component — remains Server Component
import { clientConfig } from "@/content/client.config";
import { SchemaScript } from "@/components/ui";

// Inside Breadcrumbs function body, after const all = [...]
const schema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: all.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: `${clientConfig.siteUrl}${item.href}`,
  })),
};

return (
  <>
    <SchemaScript schema={schema} />
    <nav aria-label="Breadcrumb" ...>
      {/* existing UI unchanged */}
    </nav>
  </>
);
```

### generateServiceSchema in page.tsx
```typescript
// Source: src/app/services/[slug]/page.tsx pattern — add below return statement
import { generateServiceSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/ui";

// In page component render:
return (
  <>
    <SchemaScript schema={generateServiceSchema(service, clientConfig)} />
    {/* existing page sections */}
  </>
);
```

### generatePageMetadata — Audit Checklist Pattern
```typescript
// All existing pages already use this. Audit confirms:
// - title: under 60 chars ideally, 70 max
// - description: 150–155 chars with keyword + CTA
// - path: matches actual route exactly (canonical correctness)
// - image: defaults to /images/og-default.jpg (does not exist yet — needs placeholder or skip)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static `/public/sitemap.xml` | `app/sitemap.ts` Route Handler | Next.js 13.3 | Dynamic, typed, cached at build |
| Static `/public/robots.txt` | `app/robots.ts` Route Handler | Next.js 13.3 | Typed object, reads config |
| Manual `<meta>` in `<head>` | `generateMetadata` / `metadata` export | Next.js 13 | Auto-deduped, type-safe |
| Schema in `<Head>` component | `SchemaScript` below `<main>` content | Phase 1 | Already correct in this codebase |

**Deprecated/outdated:**
- `next/head` with `<Head>`: Pages Router pattern. This project is App Router — never use it.
- `sitemap.xml` in `/public`: Still works but bypasses Next.js's URL resolution and caching. Don't use.

---

## Open Questions

1. **Default OG image `/images/og-default.jpg` does not exist in `/public`**
   - What we know: `generatePageMetadata` defaults to `${siteUrl}/images/og-default.jpg` when no `image` prop is passed. The file does not exist in `/public`.
   - What's unclear: Should Phase 8 create a branded placeholder, or should `generatePageMetadata` conditionally omit the `images` field when no image is provided?
   - Recommendation: Create a minimal 1200x630 branded placeholder as `/public/images/og-default.jpg` (can be a simple SVG-generated PNG or a solid brand-color rectangle with studio name). This prevents broken OG image references when pages are shared. Alternatively, update `generatePageMetadata` to omit the `images` field when no `image` prop is passed. Either approach is valid — the planner should pick one and commit to it.

2. **`SchemaScript` accepts `Record<string, unknown>` — multiple schemas per page**
   - What we know: The existing `SchemaScript` takes a single schema object. Pages needing both BreadcrumbList (from `Breadcrumbs`) and Service schema (from page.tsx) will have two `SchemaScript` renders.
   - What's unclear: Is two separate `<script type="application/ld+json">` tags per page acceptable?
   - Recommendation: Yes — multiple separate JSON-LD `<script>` blocks is the recommended approach per Google. Do NOT merge them. Two distinct scripts is correct and passes structured data validation.

---

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` — sitemap.ts API, MetadataRoute.Sitemap type, version history
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md` — robots.ts API, MetadataRoute.Robots type
- `src/lib/schema.ts` — existing schema generator patterns, BeautyBusiness type decision
- `src/lib/metadata.ts` — generatePageMetadata signature, OG/Twitter/canonical/robots output
- `src/components/ui/SchemaScript.tsx` — existing injection component API
- `src/components/layout/Breadcrumbs.tsx` — deferred schema note, existing items prop shape
- `src/app/layout.tsx` — LocalBusiness schema placement in root layout
- `src/content/client.config.ts` — siteUrl, address, hours, phone field names

### Secondary (MEDIUM confidence)
- Codebase pattern cross-reference: Phase 7 "use client" child component pattern (booking sub-components) informs ContactForm isolation approach
- Schema.org BreadcrumbList, Service, FAQPage specs (well-established, unchanged for years)

### Tertiary (LOW confidence — not needed for this phase)
- None — all findings are directly verifiable in local Next.js docs or codebase source

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tools already in codebase, Next.js docs read directly from node_modules
- Architecture: HIGH — patterns derived from existing codebase conventions (SchemaScript, generatePageMetadata, Phase 7 client/server split)
- Pitfalls: HIGH for schema URL absoluteness and schema duplication (common, documented); MEDIUM for title length (general SEO practice)
- Sitemap/robots file conventions: HIGH — read directly from Next.js 16 docs in node_modules

**Research date:** 2026-03-31
**Valid until:** 2026-06-01 (Next.js sitemap API is stable since v13.3; schema.org specs are stable)

---

## Pages Inventory (for Planner Reference)

All routes that need metadata verification + schema assignment:

| Route | Type | generatePageMetadata | Schema (layout) | Schema (page) | Breadcrumbs |
|-------|------|---------------------|-----------------|---------------|-------------|
| `/` | homepage | Yes (via metadata export) | LocalBusiness (layout.tsx) | none additional | No |
| `/services` | index | Yes | LocalBusiness | none | Yes → BreadcrumbList via Breadcrumbs |
| `/services/[slug]` | detail (14 pages) | Yes (generateMetadata) | LocalBusiness | Service | Yes → BreadcrumbList |
| `/about` | trust | Yes | LocalBusiness | none | Yes → BreadcrumbList |
| `/faq` | trust | Yes | LocalBusiness | FAQPage | Yes → BreadcrumbList |
| `/book` | booking | Yes | LocalBusiness | none | Yes → BreadcrumbList |
| `/contact` | NEW | Needs adding | LocalBusiness | none | Yes → BreadcrumbList |

**Service slug count:** 4 (face) + 5 (body) + 3 (intimate) + 2 (packages) = 14 service pages in sitemap.
