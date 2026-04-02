# Phase 9: Blog and Service Areas - Research

**Researched:** 2026-04-02
**Domain:** Next.js 16 App Router MDX pipeline, Tailwind v4 typography, local SEO schema
**Confidence:** HIGH (all critical findings verified via official Next.js docs in node_modules and live codebase inspection)

---

## Summary

Phase 9 adds two content systems to the template: a blog pipeline and Omaha neighborhood service area pages. Both are primarily SEO-delivery mechanisms — blog posts target first-timer intent queries, service area pages target local "[city] waxing" queries.

The blog decision is **MDX via `@next/mdx` with dynamic imports** (not TypeScript arrays or gray-matter). The official Next.js docs (read directly from `node_modules/next/dist/docs/01-app/02-guides/mdx.md`) confirm that `@next/mdx` supports dynamic imports with `generateStaticParams` + `dynamicParams = false` — the exact same static generation pattern already used by service pages. Frontmatter lives as TypeScript exports inside the `.mdx` files, eliminating gray-matter as a dependency. This is a zero-dependency-add approach (one new package: `@next/mdx`).

Service area pages require NO new routing infrastructure — the data already exists in `src/content/service-areas.ts` with 6 fully populated `ServiceArea` objects. The work is building the dynamic route (`/service-areas/[slug]`) and its page template. The pattern mirrors `/services/[slug]/page.tsx` exactly.

Both systems need `@tailwindcss/typography` for prose rendering, `@next/mdx` for the blog pipeline, and schema generators for `BlogPosting` and service area `LocalBusiness` structured data.

**Primary recommendation:** Use `@next/mdx` dynamic imports for blog posts (exports metadata as TypeScript object inside .mdx files), `@tailwindcss/typography` v4 via `@plugin` CSS directive for prose styles, and mirror the existing service page route pattern for service areas.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@next/mdx` | latest | MDX compilation in Next.js | Official Next.js MDX solution, Server Component compatible, no extra parsing layer |
| `@mdx-js/loader` | latest | Webpack MDX loader (peer dep of @next/mdx) | Required peer dependency |
| `@mdx-js/react` | latest | React MDX context provider | Required peer dependency |
| `@types/mdx` | latest | TypeScript types for .mdx imports | Required for TypeScript |
| `@tailwindcss/typography` | latest | `prose` classes for rendered markdown | Official Tailwind plugin, works with v4 via @plugin directive |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `remark-gfm` | latest | GitHub Flavored Markdown (tables, strikethrough) | If blog posts use tables or task lists — optional for seed posts |

### NOT Needed
| Skipped | Why |
|---------|-----|
| `gray-matter` | Frontmatter parsed as TypeScript exports inside .mdx — no YAML parsing needed |
| `next-mdx-remote` | For remote CMS content; all posts are local files |
| `remark` / `rehype` standalone | Included internally by @next/mdx — no need to install separately |

**Installation:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install -D @tailwindcss/typography
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # /blog index — card grid
│   │   └── [slug]/
│   │       └── page.tsx          # /blog/[slug] — post page
│   └── service-areas/
│       ├── page.tsx              # /service-areas index (optional redirect or list)
│       └── [slug]/
│           └── page.tsx          # /service-areas/[slug] — neighborhood page
├── content/
│   ├── blog/                     # MDX post files
│   │   ├── first-brazilian-wax-what-to-expect.mdx
│   │   ├── waxing-vs-shaving-sensitive-skin.mdx
│   │   └── how-to-prepare-for-waxing.mdx
│   └── service-areas.ts          # ALREADY EXISTS — 6 neighborhoods
├── lib/
│   ├── blog.ts                   # getAllPosts(), getPostBySlug() — mirrors services/index.ts
│   └── schema.ts                 # Add generateBlogPostSchema(), generateServiceAreaSchema()
└── mdx-components.tsx            # REQUIRED by @next/mdx with App Router — root of src/
```

### Pattern 1: MDX with Dynamic Imports (Blog Post Pages)

**What:** Each `.mdx` file exports its frontmatter as a TypeScript const. The `[slug]/page.tsx` dynamically imports the file by slug to get both the React component (body) and the metadata.

**When to use:** All blog post routing in this project.

**Example (from official Next.js docs in node_modules):**
```typescript
// src/app/blog/[slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, metadata } = await import(`@/content/blog/${slug}.mdx`)
  return <Post />
}

export function generateStaticParams() {
  // Returns array of { slug } objects from getAllPosts()
  return [{ slug: 'first-brazilian-wax-what-to-expect' }, ...]
}

export const dynamicParams = false
```

**MDX file structure:**
```mdx
export const metadata = {
  slug: "first-brazilian-wax-what-to-expect",
  title: "Your First Brazilian Wax: What to Expect",
  date: "2026-03-01",
  description: "Nervous about your first Brazilian wax? Here's exactly what happens, how long it takes, and how to prepare so you walk in confident.",
  author: "Jessica Bloom",
  tags: ["first-timer", "brazilian-wax"],
  image: "/images/blog/first-brazilian-wax.jpg",
  serviceSlug: "brazilian-wax",
}

Your first Brazilian wax doesn't have to be scary...
```

**Key constraint:** `metadata` export must match the `BlogPost` interface defined in `src/lib/types.ts`. No new type needed — it already exists.

### Pattern 2: Service Area Pages (Static Dynamic Route)

**What:** Mirrors `/services/[slug]/page.tsx` exactly. `generateStaticParams()` maps `serviceAreas.map(a => ({ slug: a.slug }))`. `dynamicParams = false`. Data comes from the already-populated `service-areas.ts`.

**When to use:** All 6 neighborhood pages.

**Example:**
```typescript
// src/app/service-areas/[slug]/page.tsx
import { serviceAreas } from "@/content/service-areas"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }))
}

export const dynamicParams = false

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = serviceAreas.find((a) => a.slug === slug)
  if (!area) notFound()
  // render using area data
}
```

### Pattern 3: Blog Utility Functions (src/lib/blog.ts)

**What:** A server-only module that provides `getAllPosts()` and `getPostBySlug()` — mirrors `src/content/services/index.ts` accessor pattern. Uses dynamic imports to collect metadata from all MDX files.

**Key implementation note:** Because webpack can't statically analyze fully dynamic import paths, the slug list must be hardcoded in `getAllPosts()` (same pattern as `generateStaticParams` — maintain one array of known slugs). This is the same trade-off the existing codebase accepts: `allServices` is a static array, not a filesystem scan.

```typescript
// src/lib/blog.ts
const POST_SLUGS = [
  "first-brazilian-wax-what-to-expect",
  "waxing-vs-shaving-sensitive-skin",
  "how-to-prepare-for-waxing",
] as const

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    POST_SLUGS.map(async (slug) => {
      const { metadata } = await import(`@/content/blog/${slug}.mdx`)
      return metadata as BlogPost
    })
  )
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}
```

### Pattern 4: Tailwind v4 Typography Plugin

**What:** Add prose classes via `@plugin` directive in `globals.css`. No `tailwind.config.js` needed.

**When to use:** Blog post body wrapper in `[slug]/page.tsx` and MDX components.

**Example (verified via official GitHub README):**
```css
/* src/app/globals.css — ADD after @import "tailwindcss" line */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

```typescript
// mdx-components.tsx usage
<article className="prose prose-lg prose-headings:font-heading prose-headings:text-brand-dark prose-a:text-brand-primary max-w-none">
  <Post />
</article>
```

### Pattern 5: next.config.ts MDX Configuration

**What:** Add `@next/mdx` wrapper to enable .mdx file compilation.

**Key constraint:** The existing `next.config.ts` uses TypeScript (not `.mjs`). The official docs show `.mjs` but it works identically with `.ts` using `createMDX` from `@next/mdx`.

```typescript
// next.config.ts — UPDATED
import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

### Pattern 6: mdx-components.tsx (REQUIRED)

**What:** `@next/mdx` with App Router requires a `mdx-components.tsx` file at the project root (or inside `src/`). Without it, MDX fails to compile.

```typescript
// src/mdx-components.tsx  (must exist at root of src/ given the src/ layout)
import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

### Anti-Patterns to Avoid
- **Using `fs.readdirSync` to discover MDX files at build time:** Does not work reliably in Vercel/Edge environments. Use a hardcoded slug array, mirroring how `allServices` works.
- **Importing MDX metadata via gray-matter:** Not needed — `@next/mdx` exports TypeScript objects natively. Adding gray-matter adds YAML parsing overhead and a second syntax for the same data.
- **Putting mdx-components.tsx in /app:** It must be at the root alongside `app/` or inside `src/` root. Wrong placement silently breaks MDX.
- **Using `import()` with a fully dynamic path like `import(slug + '.mdx'):`** Webpack cannot tree-shake fully dynamic imports. Use template literals with the static part: `` import(`@/content/blog/${slug}.mdx`) ``.
- **City-name-swap service area pages:** All 6 neighborhoods already have genuinely distinct `localContext`, `localHighlight`, and `weatherContext`. The template renders these fields — the page must NOT render them all the same way with only the name swapped.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown rendering | Custom HTML parser | `@next/mdx` | Handles all markdown AST transformation, React component embedding, server components |
| Blog typography | Custom prose CSS | `@tailwindcss/typography` | ~300 lines of carefully tuned typography CSS with responsive modifiers, dark mode, element targeting |
| Blog reading time | Custom word counter | Inline calculation: `Math.ceil(wordCount / 200)` | Trivially simple, no library needed |
| Blog post listing | CMS integration | Static MDX + slug array | Vercel-hosted static site — no headless CMS overhead for 2-3 seed posts |
| Frontmatter parsing | gray-matter | MDX TypeScript exports | @next/mdx supports native TS exports — no YAML syntax needed |

**Key insight:** The blog pipeline for 2-3 seed posts should be as close to zero-infrastructure as possible. The `@next/mdx` + TypeScript exports approach requires one config change and one new file (`mdx-components.tsx`) — not a second content pipeline.

---

## Common Pitfalls

### Pitfall 1: Missing mdx-components.tsx
**What goes wrong:** Build fails with a cryptic error about MDX context or undefined components.
**Why it happens:** `@next/mdx` App Router integration requires this file — it's not optional.
**How to avoid:** Create `src/mdx-components.tsx` as the first step of the blog pipeline setup, before writing any MDX files.
**Warning signs:** Error message mentions `useMDXComponents` not found.

### Pitfall 2: params is a Promise in Next.js 15+
**What goes wrong:** TypeScript error if `params.slug` is accessed directly without awaiting.
**Why it happens:** Next.js 15 made `params` async — `params: Promise<{ slug: string }>`.
**How to avoid:** Match the existing service page pattern exactly: `const { slug } = await params`.
**Warning signs:** Already observed in this codebase — `services/[slug]/page.tsx` uses `await params` correctly.

### Pitfall 3: Tailwind v4 Plugin Registration
**What goes wrong:** `prose` classes have no effect, or PostCSS throws on `@plugin` directive.
**Why it happens:** In Tailwind v4, plugins are registered in CSS (`@plugin "@tailwindcss/typography"`), NOT in `tailwind.config.js`. The `@tailwindcss/postcss` package must be the PostCSS processor.
**How to avoid:** Add `@plugin "@tailwindcss/typography";` in `globals.css` directly after the `@import "tailwindcss";` line.
**Warning signs:** Zero prose styling applied to article content.

### Pitfall 4: Dynamic Import Path with Static Prefix Required
**What goes wrong:** Webpack cannot bundle MDX files if the import path is fully runtime-dynamic.
**Why it happens:** Webpack needs a static prefix to know which directory to scan for code splitting.
**How to avoid:** Always use `` import(`@/content/blog/${slug}.mdx`) `` — the `@/content/blog/` prefix is static. Never do `import(dynamicFullPath)`.
**Warning signs:** Runtime 404 or "Cannot find module" for valid slugs.

### Pitfall 5: Service Area Testimonial Rendering
**What goes wrong:** Testimonial section renders empty or throws on undefined.
**Why it happens:** All 6 `serviceAreas` have `testimonials: []` (empty array per Phase 3 decision — components filter global testimonials at render time).
**How to avoid:** Service area page must filter global testimonials by area/location, identical to how service pages use `testimonials.find()`. Do NOT iterate `area.testimonials` directly.
**Warning signs:** Empty testimonial section when global testimonials with matching city exist.

### Pitfall 6: Sitemap Not Updated
**What goes wrong:** Blog posts and service area pages are not indexed.
**Why it happens:** `src/app/sitemap.ts` currently only covers static routes and services. New routes must be added.
**How to avoid:** Update `sitemap.ts` to add blog post routes (from `getAllPosts()`) and service area routes (from `serviceAreas.map()`).
**Warning signs:** Missing pages in /sitemap.xml output.

---

## Code Examples

### Blog Post Card (index page)
```typescript
// Source: mirror of service card pattern in existing codebase
function BlogCard({ post }: { post: BlogPost }) {
  const readingTime = Math.ceil(post.description.split(' ').length / 200) // rough estimate
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group rounded-2xl overflow-hidden border border-brand-light hover:shadow-md transition-shadow">
        <div className="p-6 space-y-3">
          <div className="text-xs text-brand-primary font-medium uppercase tracking-wide">
            {post.tags[0]}
          </div>
          <h2 className="font-heading text-lg text-brand-dark group-hover:text-brand-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-brand-dark/70 text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-brand-dark/50 pt-2">
            <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
```

### BlogPosting Schema Generator (add to src/lib/schema.ts)
```typescript
// Source: schema.org/BlogPosting + Google's Article structured data guidance
export function generateBlogPostSchema(
  post: BlogPost,
  config: WaxingClientConfig
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": ["LocalBusiness", "BeautyBusiness"],
      name: config.name,
      url: config.siteUrl,
    },
    datePublished: post.date,
    dateModified: post.date,
    image: `${config.siteUrl}${post.image}`,
    url: `${config.siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${config.siteUrl}/blog/${post.slug}`,
    },
  }
}
```

### Service Area Schema Generator (add to src/lib/schema.ts)
```typescript
// Source: schema.org/LocalBusiness areaServed property
export function generateServiceAreaSchema(
  area: ServiceArea,
  config: WaxingClientConfig
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautyBusiness"],
    name: config.name,
    url: config.siteUrl,
    telephone: config.phone,
    areaServed: {
      "@type": "City",
      name: area.schema.areaServed,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: area.county,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: "US",
    },
  }
}
```

### Prose Styling for Blog Posts
```typescript
// Source: @tailwindcss/typography GitHub README — verified v4 @plugin approach
// In mdx-components.tsx: wrap in prose container
// Custom overrides match brand tokens
<div className="prose prose-lg max-w-none
  prose-headings:font-heading prose-headings:text-brand-dark
  prose-p:text-brand-dark/80 prose-p:leading-relaxed
  prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
  prose-strong:text-brand-dark
  prose-ul:text-brand-dark/80 prose-ol:text-brand-dark/80
  prose-blockquote:border-brand-primary prose-blockquote:text-brand-dark/70">
  {children}
</div>
```

### Sitemap Update Pattern
```typescript
// Add to src/app/sitemap.ts after serviceRoutes
const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
  url: `${base}/blog/${post.slug}`,
  lastModified: new Date(post.date),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}))

const serviceAreaRoutes: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
  url: `${base}/service-areas/${area.slug}`,
  lastModified: now,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}))

return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...serviceAreaRoutes]
```

---

## Seed Blog Post Topics

Three posts targeting high-intent first-timer queries with Omaha angles:

### Post 1: First Brazilian Wax Preparation
- **Slug:** `first-brazilian-wax-what-to-expect`
- **Target query:** "what to expect first Brazilian wax" / "how to prepare for first Brazilian wax Omaha"
- **serviceSlug:** `brazilian-wax`
- **Angle:** Anxiety-reducing, step-by-step walkthrough. Addresses the #1 first-timer fear (the unknown).
- **Internal links:** Brazilian Wax service page, First Visit page, Book page
- **Length:** ~600-800 words — thorough but scannable with H2 sections

### Post 2: Waxing vs. Shaving for Sensitive Skin
- **Slug:** `waxing-vs-shaving-sensitive-skin`
- **Target query:** "waxing vs shaving sensitive skin" / "is waxing better than shaving for sensitive skin"
- **serviceSlug:** `bikini-wax` (most sensitivity-driven service)
- **Angle:** Informational comparison targeting people researching their options. Converts to booking by establishing waxing as the less-irritating long-term choice.
- **Internal links:** Sensitive skin note in service pages, FAQ page, booking CTA
- **Length:** ~500-700 words

### Post 3: How Long Hair Needs to Be Before Waxing
- **Slug:** `how-long-does-hair-need-to-be-for-waxing`
- **Target query:** "how long hair needs to be for waxing" / "waxing hair length Omaha"
- **serviceSlug:** `brazilian-wax`
- **Angle:** Ultra-practical question almost every first-timer googles. Ranks well because it's highly specific. Natural upsell to "book when you're ready" CTA.
- **Internal links:** Preparation section of Brazilian Wax page, Book page
- **Length:** ~400-500 words — direct and practical

---

## Service Area Page Template Structure

Based on the rich data already in `service-areas.ts` and the template conventions established in prior phases:

```
[Hero]
  heroHeadline (H1)
  heroSubheadline
  BookingLink CTA + PhoneLink
  Breadcrumbs: Home / Service Areas / [City]

[Local Context Section]
  population + neighborhoods list
  localContext paragraph
  weatherContext sentence

[Services Highlight]
  "Popular services for [city] clients"
  2-3 service cards (filter by area persona — West Omaha = bridal, Bellevue = practical/military)

[Local Highlight]
  localHighlight.title (H2)
  localHighlight.description
  localHighlight.neighborhood

[Testimonials]
  Filter global testimonials by location field matching area.city
  If none, omit section (no empty states)

[Service Coverage Area]
  nearbyAreas list
  Link to other neighborhood pages (internal linking)

[Bottom CTA]
  bg="primary"
  "Serving [city] and surrounding areas"
  BookingLink + PhoneLink
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` plugins array | `@plugin` in CSS | Tailwind v4 (2025) | No config file needed for typography plugin |
| `params.slug` direct access | `await params` then destructure | Next.js 15 (2024) | Async params — must await in all dynamic routes |
| gray-matter YAML frontmatter | TypeScript exports in MDX | @next/mdx support matured | No YAML parsing, full TypeScript type safety |
| `framer-motion` imports | `motion/react` imports | Phase 1 lock | Already established — FadeUp uses motion/react |

**Deprecated/outdated:**
- `next.config.js` (CJS format): This project uses `next.config.ts`. The MDX config uses TypeScript import syntax.
- Pages Router MDX patterns: All examples must use App Router conventions (`generateStaticParams`, async `params`, Server Components).

---

## Open Questions

1. **Reading time calculation accuracy**
   - What we know: Simple word-count estimation (`Math.ceil(words/200)`) is standard
   - What's unclear: Whether to calculate from `description` (short, available at index time) vs. full MDX body (requires importing the file)
   - Recommendation: Calculate at render time in the post page from body word count via a utility function; display on both index cards (estimate from description) and post pages (precise from body)

2. **Service areas index page (`/service-areas`)**
   - What we know: 6 neighborhood pages will exist; no current route for the index
   - What's unclear: Whether the roadmap expects a `/service-areas` listing page or just the dynamic pages
   - Recommendation: Build a minimal `/service-areas/page.tsx` listing all 6 neighborhoods as cards — provides internal linking target for nav/footer and sitemap entry

3. **Tailwind typography color overrides depth**
   - What we know: `prose-headings:` and `prose-a:` modifiers work with Tailwind v4
   - What's unclear: Whether the brand font variable (`var(--font-fraunces)`) propagates correctly through `font-heading` Tailwind token into `prose-headings:font-heading`
   - Recommendation: Test in the first plan execution; fallback is `prose-headings:[font-family:var(--font-heading)]` arbitrary value syntax if token doesn't resolve inside prose modifier

---

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/02-guides/mdx.md` — MDX setup, dynamic imports, frontmatter exports, mdx-components.tsx requirement
- `node_modules/next/dist/docs/01-app/02-guides/json-ld.md` — JSON-LD injection pattern (used by existing SchemaScript component)
- `src/app/services/[slug]/page.tsx` — established `generateStaticParams` + `dynamicParams = false` + async params pattern
- `src/content/service-areas.ts` — 6 ServiceArea objects already fully populated
- `src/lib/types.ts` — BlogPost interface already defined, no changes needed
- `src/lib/schema.ts` — existing schema generator pattern to extend
- `src/components/ui/SectionWrapper.tsx` — 5 bg variants including "blush"
- `src/app/sitemap.ts` — current sitemap to extend
- GitHub: tailwindlabs/tailwindcss-typography — v4 `@plugin` installation confirmed

### Secondary (MEDIUM confidence)
- WebSearch + GitHub README verification: `@tailwindcss/typography` v4 uses `@plugin "@tailwindcss/typography"` in CSS
- WebSearch + official Next.js docs: `@next/mdx` with dynamic imports is the documented approach for blog pages

### Tertiary (LOW confidence)
- None — all critical claims verified with official sources

---

## Metadata

**Confidence breakdown:**
- Standard stack (packages): HIGH — verified against official Next.js docs in node_modules and package.json
- Architecture (routing patterns): HIGH — verified against existing service page route pattern in codebase
- Tailwind typography setup: HIGH — verified via official GitHub README for v4 @plugin approach
- Blog post topics/content: MEDIUM — SEO targeting rationale is sound but not verified against actual Omaha search volume
- Pitfalls: HIGH — derived from direct inspection of codebase conventions and official docs

**Research date:** 2026-04-02
**Valid until:** 2026-07-01 (stable stack — Next.js 16 and Tailwind v4 are current releases)
