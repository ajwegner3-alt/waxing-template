# Technology Stack

**Project:** Honey & Bloom Wax Studio — Next.js Website Template
**Researched:** 2026-03-28
**Confidence:** HIGH (core stack verified from active NSI workspace packages)

---

## Version Source Note

All versions are verified from `package.json` files in the active NSI workspace:
- `medspa-template` → Next.js 16.1.6, React 19.2.3, Motion 12.34.3, Embla 8.6.0
- `nsi-website` → Next.js 16.2.1, React 19.2.4, tailwind-merge 3.5.0, clsx 2.1.1
- `roofing-template` → Next.js 15.5.12, React 19.1.0

These are live, deployed NSI projects. Their versions represent the tested, working baseline for this ecosystem. WebSearch and npm registry were unavailable during this research session, so versions cited below are sourced exclusively from these workspace files. They are current as of 2026-03-28.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (pin to 16.2.1) | App framework | App Router, RSC, next/font, next/image — all needed. Pin to 16.2.1 to match nsi-website (most current in workspace). |
| React | 19.2.x | UI rendering | Concurrent features, Server Components. Matches Next.js 16 peer requirement. |
| TypeScript | ^5 | Type safety | Non-negotiable at NSI; every template uses it. Catches template customization errors early. |
| Tailwind CSS | v4 (^4) | Utility styling | v4's `@theme` block + `@import "tailwindcss"` is the established NSI pattern. Design token system matches the brand token approach used in medspa-template. |

### Font Strategy

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font/google | (built into Next.js) | Font loading | Zero-CLS font loading, automatic self-hosting, no Google Fonts CDN request. Critical for LCP targets. |
| Fraunces | via next/font | Display/heading font | Variable font, serif with warmth and personality. Requested by project owner. Used in Verdana Wellness (aesthetic reference). Loads weights 300–700. |
| Plus Jakarta Sans | via next/font | Body/UI font | Clean but not sterile — humanist sans with warmth. Pairs well with Fraunces. Not Inter/Roboto/Arial. |

**Font loading pattern (from medspa-template):**

```typescript
// layout.tsx
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
```

```css
/* globals.css */
@theme {
  --font-heading: var(--font-fraunces);
  --font-body: var(--font-plus-jakarta-sans);
}
```

### Animation & Interaction

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion | ^12.34.3 | Scroll animations, micro-interactions | Already in medspa-template. Replaces Framer Motion (same API, smaller bundle). Use sparingly — this template prioritizes warmth over flashy animation. |

**Motion usage guidance:** Limit to:
- Fade-in on scroll for service cards
- Subtle scale on hover for booking CTAs
- Smooth accordion open/close for FAQs

Do NOT use for: page transitions, parallax, or anything that might feel clinical or performative. Comfort is the goal.

### Carousel / Slider

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Embla Carousel | ^8.6.0 | Testimonial carousel, service category slider | Headless, zero-dependency, excellent touch support. Already proven in medspa-template. The waxing template needs mobile-friendly swipe carousels for testimonials. |
| embla-carousel-autoplay | ^8.6.0 | Autoplay plugin for testimonials | Pair with Embla core. Used in medspa-template. |

### Utility Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | ^2.1.1 | Conditional class names | Use in any component with conditional Tailwind classes (active states, variants). |
| tailwind-merge | ^3.5.0 | Class conflict resolution | Use in reusable UI components (Button, Badge) that accept className overrides. |

**Pattern (from nsi-website):**

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Markdown / Blog Content

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | ^4.0.3 | Frontmatter parsing | Parse blog post metadata (title, date, slug, description) from .md files. |
| remark | ^15.0.1 | Markdown processing | Convert .md blog content to HTML. |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown | Tables, strikethrough, task lists in blog posts. |
| remark-rehype | ^11.1.2 | Markdown-to-HTML pipeline | Bridge remark and rehype processing. |
| rehype-stringify | ^10.0.1 | HTML output | Serialize rehype AST to HTML string. |
| rehype-slug | ^6.0.0 | Heading anchors | Auto-generate `id` attributes on headings for in-page links. |

This is the exact same markdown stack used across all three NSI templates. Copy it verbatim.

### Image Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/image | built-in | Image optimization | Automatic WebP/AVIF conversion, lazy loading, CLS prevention. Non-negotiable for LCP targets. |

**next.config.ts pattern (from medspa-template):**

```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### SEO & Schema

| Approach | Notes |
|----------|-------|
| `generateMetadata()` | Next.js App Router built-in. Use per-page metadata exports, not next-sitemap or external packages. |
| JSON-LD via inline `<script>` | Inject schema via a `SchemaScript` server component (pattern from medspa-template). Keeps schema close to the component that needs it. |
| Schema types needed | `LocalBusiness` (homepage), `Service` (service pages), `FAQPage` (FAQ + service pages), `BreadcrumbList` (navigation), `AggregateRating` (testimonial sections) |

No additional SEO packages needed. Next.js App Router metadata API handles Open Graph, Twitter cards, canonical URLs, and robots meta natively.

### Development Tooling

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| ESLint | ^9 | Linting | Standard NSI config. Use `eslint-config-next` for Next.js-aware rules. |
| @tailwindcss/postcss | ^4 | PostCSS integration | Required for Tailwind v4 — not the old `tailwindcss` PostCSS plugin. |
| @types/node, @types/react, @types/react-dom | ^20/^19/^19 | TypeScript types | Standard for the stack. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro | Astro is excellent for static content but lacks the RSC/App Router patterns already established at NSI. Familiarity wins here. |
| Styling | Tailwind CSS v4 | CSS Modules | Tailwind v4 @theme tokens are better for brand token management across template customizations. |
| Animation | Motion | GSAP | GSAP requires a license for commercial use. Motion (formerly Framer Motion) is MIT. |
| Fonts | next/font | Google Fonts CDN | CDN adds a network request and blocks CLS. next/font self-hosts with zero layout shift. |
| Carousel | Embla | Swiper | Swiper is heavier and more opinionated. Embla is headless, smaller, and already used across NSI templates. |
| Icons | Inline SVG / heroicons | Lucide React | For a template, inline SVGs or a small curated set is preferable to adding a full icon library dependency. Use Lucide only if more than ~20 icons are needed. |
| Markdown | remark/rehype | Contentlayer | Contentlayer adds complexity without benefit for a static blog section. The raw remark/rehype pipeline is already proven across NSI templates. |
| Type utilities | clsx + tailwind-merge | cx (clsx fork) | The clsx + twMerge combo is the NSI standard. No reason to deviate. |

---

## What NOT to Use

**Do not add:**

- `stripe` or any payment package — this is a front-end-only template. Out of scope.
- `@supabase/supabase-js` — no backend, no database. Out of scope.
- `resend` or any email package — forms are UI-only.
- `recharts` or any data viz library — no dashboard or analytics UI.
- `react-hook-form` or `zod` — forms are decorative UI, not functional. Adding validation implies backend integration that doesn't exist.
- `next-themes` — dark mode is explicitly out of scope. The cream aesthetic is core identity.
- `react-spring` — redundant with Motion already in the stack.
- `@headlessui/react` — Tailwind's headless UI library adds a React dependency that brings complexity. Accordion/tab UI can be built with native HTML + Motion for this project's scope.
- `shadcn/ui` — component-library-generated code reads as template. NSI policy: "no AI slop." Hand-built components with intentional design decisions.

---

## Installation

```bash
# Initialize project
npx create-next-app@latest honey-bloom-wax-studio \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Core runtime dependencies
npm install motion embla-carousel-react embla-carousel-autoplay

# Utility
npm install clsx tailwind-merge

# Markdown pipeline (for blog section)
npm install gray-matter remark remark-gfm remark-rehype rehype-stringify rehype-slug

# Dev dependencies (Tailwind v4 PostCSS)
npm install -D @tailwindcss/postcss
```

**Note:** `next/font` and `next/image` are built into Next.js — no separate install.

---

## Confidence Assessment

| Decision | Confidence | Source |
|----------|------------|--------|
| Next.js 16.2.1 version | HIGH | Verified from nsi-website/package.json (active, deployed project) |
| React 19.2.x | HIGH | Verified from nsi-website/package.json |
| Tailwind CSS v4 | HIGH | Verified from all three workspace packages |
| TypeScript ^5 | HIGH | Verified from all three workspace packages |
| Motion ^12.34.3 | HIGH | Verified from medspa-template/package.json |
| Embla ^8.6.0 | HIGH | Verified from medspa-template/package.json |
| clsx ^2.1.1, tailwind-merge ^3.5.0 | HIGH | Verified from nsi-website/package.json |
| Fraunces + Plus Jakarta Sans fonts | MEDIUM | Specified in PROJECT.md; correct for aesthetic goal; not verified via Context7 (restricted this session) |
| Schema markup approach | HIGH | Pattern copied from medspa-template/src/lib/schema.ts — already implemented and working |
| Markdown pipeline versions | HIGH | Identical across all three NSI templates |

---

## Sources

- `medspa-template/package.json` — NSI workspace, read 2026-03-28
- `nsi-website/package.json` — NSI workspace, read 2026-03-28
- `roofing-template/package.json` — NSI workspace, read 2026-03-28
- `medspa-template/src/app/layout.tsx` — font loading pattern
- `medspa-template/src/app/globals.css` — Tailwind v4 @theme token pattern
- `medspa-template/next.config.ts` — image optimization config
- `waxing-template/.planning/PROJECT.md` — project constraints and stack requirements
