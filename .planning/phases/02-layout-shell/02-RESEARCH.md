# Phase 2: Layout Shell - Research

**Researched:** 2026-03-28
**Domain:** Next.js App Router layout components — Header, Footer, MobileNav, BookingBar, Breadcrumbs
**Confidence:** HIGH

## Summary

Phase 2 builds the persistent chrome (header, footer, mobile nav, sticky booking bar, breadcrumbs) that wraps every page. The medspa-template at `../medspa-template/src/components/layout/` is a complete, production-quality reference implementation for the exact same component set. It was read in full during this research session and its patterns are directly applicable to the waxing template.

The waxing template departs from the medspa-template in two important ways: (1) the header is transparent over the hero and transitions to solid on scroll — the medspa-template has a plain sticky white header, so scroll behavior must be added; (2) the mobile nav uses `motion/react` for animations per the CONTEXT.md decision, whereas the medspa-template uses CSS class toggling only. Everything else (NavContext pattern, BookingBar, Footer structure, layout wiring in `layout.tsx`) translates directly.

The motion package installed is `motion@12.38.0`, which re-exports from `framer-motion`. The import path used in Phase 1's `FadeUp.tsx` is `import { motion } from "motion/react"` — this must be used consistently. `useScroll`, `useMotionValueEvent`, and `AnimatePresence` are all confirmed available from `motion/react`.

**Primary recommendation:** Copy the medspa-template layout structure (NavContext + NavProvider + Header + MobileNav + Footer + BookingBar wired in root layout.tsx), then adapt for waxing-specific decisions: transparent-to-solid header via `useScroll`/`useMotionValueEvent`, drawer animation via `AnimatePresence` + `motion.div`, waxing nav items, and cancellation policy in footer sub-bar.

---

## Standard Stack

### Core (all already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | App Router layout, Link, navigation | Project stack |
| motion | ^12.38.0 | Header scroll animation, drawer animation | Project decision (CONTEXT.md) |
| react | 19.2.4 | Client components for interactive chrome | Project stack |
| tailwindcss | ^4 | Styling via @theme tokens | Project stack |

### Supporting (from Phase 1 — already available)

| Import | Purpose | Notes |
|--------|---------|-------|
| `@/components/ui` — BookingLink | Book Now CTA button | Use `variant="header"` in header, `variant="cta"` in drawer + bar |
| `@/components/ui` — PhoneLink | Click-to-call link | Use `variant="header"` in header, `variant="cta"` in bar |
| `@/content/client.config` — clientConfig | Name, phone, hours, address, social URLs, bookingUrl | Single source of truth |
| `@/lib/types` — WaxingClientConfig | TypeScript types | For type safety |

### No new installations needed

All required libraries are installed. No `npm install` step for this phase.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── layout.tsx              # Wire NavProvider + Header + MobileNav + Footer + BookingBar + SchemaScript
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # "use client" — scroll-aware transparent/solid header
│   │   ├── MobileNav.tsx        # "use client" — AnimatePresence drawer
│   │   ├── Footer.tsx           # Server component — 4-column dark footer
│   │   ├── BookingBar.tsx       # "use client" — fixed bottom mobile bar
│   │   ├── Breadcrumbs.tsx      # Server or client — text + chevron trail
│   │   ├── NavContext.tsx       # "use client" — React Context for open/close state
│   │   └── index.ts             # Barrel exports
│   └── ui/
│       └── (Phase 1 components — no changes)
```

### Pattern 1: NavContext for Open/Close State

**What:** A React Context that holds `isMobileNavOpen: boolean` + `setIsMobileNavOpen`. Shared between Header (hamburger button) and MobileNav (reads state and renders drawer).

**When to use:** Whenever two sibling components need to share toggle state without prop drilling through `layout.tsx`.

**Example (from medspa-template):**
```typescript
// Source: medspa-template/src/components/layout/NavContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface NavContextValue {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <NavContext.Provider value={{ isMobileNavOpen, setIsMobileNavOpen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav(): NavContextValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside NavProvider");
  return ctx;
}
```

**Waxing template:** Copy exactly. NavProvider wraps Header + MobileNav + children in `layout.tsx`.

### Pattern 2: Scroll-Aware Transparent Header

**What:** The header starts transparent (over the hero section) and transitions to solid blush cream (`bg-brand-light`) with a shadow on scroll. This requires a `"use client"` component.

**When to use:** Any header that overlays a full-bleed hero section.

**Implementation with motion/react:**
```typescript
// Source: motion/react confirmed exports — useScroll + useMotionValueEvent
"use client";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

// Inside Header component:
const { scrollY } = useScroll();
const [scrolled, setScrolled] = useState(false);

useMotionValueEvent(scrollY, "change", (latest) => {
  setScrolled(latest > 60); // 60px threshold — past hero safe area
});

// Then in JSX:
<header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-brand-light shadow-sm"
      : "bg-transparent"
  }`}
>
```

**Threshold:** 60px is Claude's discretion per CONTEXT.md. This clears the hero badge/eyebrow text before the transition triggers.

**Note:** Use `fixed` (not `sticky`) on the header because the transparent effect requires the header to sit above the hero image. With `sticky`, the header would push hero content down.

**Body offset:** Because the header is `fixed`, the main content below it needs `pt-16` or `pt-20` to prevent content from hiding under the header. Apply on `<main>` in `layout.tsx`.

### Pattern 3: Mobile Nav Drawer with AnimatePresence

**What:** A right-to-left (or full-screen) slide-in drawer with a backdrop. CONTEXT.md gives Claude's discretion on overlay vs panel style. Research recommendation: **right-side slide-in panel (w-80 max-w-full)** — same as medspa-template. Full-screen overlays can feel claustrophobic on longer nav lists; a right-panel gives spatial clarity and feels spa-like when combined with a warm backdrop.

**Recommendation for aesthetic:** Use a blush cream / warm white panel background, not white. Matches the warm brand palette.

**Example with motion/react AnimatePresence:**
```typescript
// Source: motion/react AnimatePresence confirmed available
import { AnimatePresence, motion } from "motion/react";

// Backdrop + Drawer inside AnimatePresence
<AnimatePresence>
  {isMobileNavOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={closeNav}
        className="fixed inset-0 z-40 bg-brand-dark/40 lg:hidden"
        aria-hidden="true"
      />
      {/* Drawer */}
      <motion.div
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-brand-light shadow-2xl lg:hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* ... content ... */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Easing:** `[0.22, 1, 0.36, 1]` — same ease-out-expo used in FadeUp. Consistent motion language.

**Body scroll lock:** Add `useEffect` that sets `document.body.style.overflow = "hidden"` when open, clears on close. Same as medspa-template pattern.

**Animated hamburger-to-X:** CONTEXT.md locks this. Use CSS transform: two approaches work — (a) SVG path morphing via motion/react, (b) three divs with absolute positioning that rotate/translate. Recommendation: use motion/react with two `motion.span` bars that rotate to form an X. This is simpler than SVG morphing and performs well.

### Pattern 4: Sticky Mobile BookingBar

**What:** Fixed bottom bar on mobile only, hidden on desktop (`lg:hidden`). Two buttons: Book Now (primary) + Call (secondary). Z-index must be below the mobile nav drawer.

**Key decisions from CONTEXT.md:**
- Z-index: `z-40` on bar, `z-50` on nav drawer — nav always wins
- Always visible — no scroll-triggered show/hide
- `env(safe-area-inset-bottom)` padding for iPhone notch compatibility
- Page content needs `pb-20` (or similar) on body/main to prevent sticky bar from overlapping last section

**Example (from medspa-template BookingBar.tsx):**
```typescript
// Source: medspa-template/src/components/layout/BookingBar.tsx
<div
  className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-brand-light shadow-[0_-2px_10px_rgba(0,0,0,0.08)] border-t border-brand-primary-light"
  style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
>
  <div className="flex items-stretch gap-2 px-4 py-3 min-h-[72px]">
    <PhoneLink phone={clientConfig.phone} variant="cta" className="flex-[2] justify-center text-sm" />
    <BookingLink variant="cta" className="flex-[3] justify-center text-sm" />
  </div>
</div>
```

**Waxing adaptation:** Change `bg-white` → `bg-brand-light`, `border-gray-100` → `border-brand-primary-light` for brand consistency.

### Pattern 5: Footer — 4-Column Dark Grid

**What:** Server component with `bg-brand-dark text-white`. Four columns: (1) Logo + tagline + contact info + social icons, (2) Quick Links, (3) Services, (4) Hours + Address. Sub-bar at bottom for cancellation policy. Copyright bar.

**Services column links (waxing-specific):** `/services/face`, `/services/body`, `/services/intimate`, `/services/packages` — placeholder routes wired now, built in Phase 5.

**Quick Links column:** `/`, `/first-visit`, `/about`, `/faq`, `/contact`, `/blog`

**Social icons needed:** Instagram, Facebook, TikTok — all in `clientConfig`. SVG icons available from medspa-template (copy verbatim).

**Cancellation policy sub-bar pattern:**
```typescript
// Below main footer grid, above copyright bar
<div className="border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <p className="text-xs text-white/50 text-center leading-relaxed max-w-3xl mx-auto">
      <span className="font-semibold text-white/70">Cancellation Policy: </span>
      We require 24-hour notice for cancellations. Late cancellations or no-shows may
      be charged 50% of the service price.
    </p>
  </div>
</div>
```

**Note:** No `hipaaNotice` field exists in `WaxingClientConfig` — this is a medspa-template field. The waxing template uses a cancellation policy instead, hardcoded in the Footer component.

### Pattern 6: Breadcrumbs Shell

**What:** Text trail showing current location: `Home > Services > Brazilian Wax`. Chevron (`>` or `/`) separators. Only shown on interior pages (not homepage).

**CONTEXT.md decision:** Standard text-only with chevron separators.

**Implementation:** Server component. The breadcrumb data must be passed as props or derived from the page path. Two approaches:

Option A (recommended): Breadcrumbs as a server component accepting `items: { label: string; href: string }[]` prop, rendered per-page.

Option B: Auto-derive from `usePathname()` — requires client component, more complex, less control over display labels.

**Use Option A** — explicit props give full control over labels ("Services" not "services"), match the medspa-template pattern of explicit data.

**Schema:** Each breadcrumb page needs `BreadcrumbList` schema — wire the Breadcrumbs component to accept an optional `withSchema?: boolean` prop that renders a `<SchemaScript>` via the existing `@/components/ui/SchemaScript` component.

```typescript
// Breadcrumbs component signature
interface BreadcrumbItem {
  label: string;
  href: string;
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[]; // excludes "Home" — component adds it automatically
  className?: string;
}
```

### Pattern 7: Root Layout Wiring

**What:** `layout.tsx` wraps all components. NavProvider must be the outermost wrapper so both Header and MobileNav can access context.

**Structure:**
```typescript
// src/app/layout.tsx (adapted from medspa-template)
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased noise-texture">
        <NavProvider>
          <Header />
          <MobileNav />
          <main className="pt-20 pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <BookingBar />
        </NavProvider>
        <SchemaScript schema={generateWaxingBusinessSchema(clientConfig)} />
      </body>
    </html>
  );
}
```

**`pt-20`** offsets fixed header (desktop and mobile). **`pb-20 lg:pb-0`** offsets sticky booking bar on mobile only. Verify exact header height after building — adjust if header is taller/shorter than 80px.

### Anti-Patterns to Avoid

- **`sticky` instead of `fixed` on the transparent header:** `sticky` top-0 means the header takes up space in flow — content won't appear under it, but the transparent overlay effect breaks. Use `fixed`.
- **Hardcoding nav links as plain strings inside each component:** Define nav links as a typed constant array at the top of the file, same as medspa-template pattern, so they're easy to update.
- **Putting NavProvider inside the Header component:** NavProvider must wrap the whole app in `layout.tsx`, not inside a single component.
- **Using `framer-motion` import directly:** Always import from `motion/react` per Phase 1 convention (FadeUp.tsx comment confirms this is the locked import path).
- **Missing `aria-expanded` on hamburger button:** The hamburger button must track `isMobileNavOpen` state and pass it to `aria-expanded`. The medspa-template omits this — the waxing template should fix it.
- **Forgetting `env(safe-area-inset-bottom)` on BookingBar:** iPhones with home indicator will clip the bar without this.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll position detection | Manual `window.addEventListener("scroll", ...)` | `useScroll` + `useMotionValueEvent` from motion/react | Auto-cleanup, React lifecycle safe, passive listeners |
| Drawer mount/unmount animation | CSS opacity toggle + setTimeout to defer unmount | `AnimatePresence` from motion/react | Handles exit animation before DOM removal automatically |
| Phone number href formatting | Custom regex function | Copy `formatPhoneHref()` from existing PhoneLink.tsx | Already solved in Phase 1 |
| Social icon SVGs | Custom SVG authoring | Copy from medspa-template Footer.tsx (Instagram, Facebook, TikTok already there) | Pixel-tested SVGs, correct viewBox |

**Key insight:** The medspa-template layout folder is a full working reference — copy structures and adapt, don't rewrite from scratch. The waxing-specific changes are: scroll behavior on header, motion/react animations on drawer, waxing nav items, cancellation policy sub-bar, and brand color adjustments.

---

## Common Pitfalls

### Pitfall 1: Fixed Header Hides Content Without Offset

**What goes wrong:** Header is `position: fixed` — it sits above the document flow. Page content starts at top: 0, so the first section hides under the header.

**Why it happens:** `fixed` removes the element from document flow.

**How to avoid:** Add `pt-16` or `pt-20` to `<main>` in `layout.tsx`. Exact value depends on header height. Desktop header: ~80px (`h-20`). Mobile header: ~64px (`h-16`). Use `pt-16 lg:pt-20` or a unified `pt-20`.

**Warning signs:** Homepage hero section appears clipped at the top when scrolling to top of page.

### Pitfall 2: Z-Index Stack Collision

**What goes wrong:** BookingBar (`z-40`) appears above MobileNav drawer (`z-50`) on some devices, or dropdown menus appear under the sticky bar.

**How to avoid:** Use explicit z-index ladder:
- `z-30`: floating page elements, tooltips
- `z-40`: BookingBar (persistent bottom bar)
- `z-50`: MobileNav backdrop + drawer

**Warning signs:** Booking bar shows above nav overlay on mobile.

### Pitfall 3: Body Scroll Lock Leaks

**What goes wrong:** `document.body.style.overflow = "hidden"` is set when drawer opens but not cleared if component unmounts before close (e.g., fast navigation). Page becomes permanently unscrollable.

**How to avoid:** Use `useEffect` cleanup function (same as medspa-template):
```typescript
useEffect(() => {
  if (isMobileNavOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => { document.body.style.overflow = ""; }; // cleanup on unmount
}, [isMobileNavOpen]);
```

**Warning signs:** Page stops scrolling after opening and quickly closing the mobile nav.

### Pitfall 4: Transparent Header Flickers on SSR

**What goes wrong:** `scrolled` state initializes to `false` on server (transparent). On hydration, if the page is scrolled past the threshold, there's a flash before the client-side scroll state kicks in.

**How to avoid:** This is an acceptable trade-off for most cases — users landing mid-page is rare. If needed, add `suppressHydrationWarning` to the header element. Do not try to read scroll position during SSR.

**Warning signs:** Brief color flash on the header when navigating back to a page.

### Pitfall 5: Mobile Nav Links Don't Close Drawer

**What goes wrong:** User taps a nav link — page navigates — but the drawer stays open because `closeNav()` wasn't called on the Link's `onClick`.

**How to avoid:** Add `onClick={closeNav}` to every nav `<Link>` inside the mobile drawer. Same pattern as medspa-template MobileNav.tsx.

**Warning signs:** After tapping a mobile nav link, the drawer remains visible on the new page.

### Pitfall 6: `BookingLink` consultationType Prop Mismatch

**What goes wrong:** The medspa-template's `BookingLink` accepts a `consultationType` prop. The waxing template's `BookingLink` (Phase 1) does NOT have this prop — it uses only `variant`, `className`, and `children`.

**How to avoid:** When adapting medspa-template code, remove `consultationType="..."` calls. The waxing `BookingLink` reads URL directly from `clientConfig.bookingUrl`.

**Warning signs:** TypeScript error "Property 'consultationType' does not exist on type BookingLinkProps".

---

## Code Examples

### Scroll-Aware Header (verified pattern)

```typescript
// Source: motion/react confirmed exports + medspa-template structural pattern
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "motion/react";
import { clientConfig } from "@/content/client.config";
import { BookingLink } from "@/components/ui";
import { useNav } from "./NavContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/first-visit", label: "First Visit" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { setIsMobileNavOpen } = useNav();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-light shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — text only per CONTEXT.md decision */}
          <Link
            href="/"
            className={`font-heading font-semibold text-xl lg:text-2xl transition-colors duration-300 ${
              scrolled ? "text-brand-dark" : "text-white"
            }`}
          >
            {clientConfig.name}
          </Link>
          {/* Desktop nav + Book Now CTA */}
          {/* Mobile hamburger */}
        </div>
      </div>
    </header>
  );
}
```

### AnimatePresence Drawer (verified pattern)

```typescript
// Source: motion/react AnimatePresence + framer-motion confirmed
import { AnimatePresence, motion } from "motion/react";

// Wrapper pattern for mount/unmount animations
<AnimatePresence>
  {isMobileNavOpen && (
    <motion.div
      key="drawer"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-brand-light shadow-2xl lg:hidden"
    >
      {/* content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Breadcrumbs Component

```typescript
// Source: Next.js App Router convention — Link + aria-label
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const all = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1 text-sm text-brand-dark/60">
        {all.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index < all.length - 1 ? (
              <>
                <Link
                  href={item.href}
                  className="hover:text-brand-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
                <span aria-hidden="true" className="text-brand-dark/30">/</span>
              </>
            ) : (
              <span className="text-brand-dark font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### layout.tsx Wiring

```typescript
// Source: medspa-template/src/app/layout.tsx — adapted for waxing template
import { NavProvider } from "@/components/layout/NavContext";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { BookingBar } from "@/components/layout/BookingBar";
import { SchemaScript } from "@/components/ui";
import { generateWaxingBusinessSchema } from "@/lib/schema";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased noise-texture">
        <NavProvider>
          <Header />
          <MobileNav />
          <main className="pt-16 lg:pt-20 pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <BookingBar />
        </NavProvider>
        <SchemaScript schema={generateWaxingBusinessSchema(clientConfig)} />
      </body>
    </html>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| CSS transition class toggling for drawers | `AnimatePresence` from motion/react | Exit animations work cleanly without manual setTimeout |
| `window.addEventListener("scroll")` in useEffect | `useScroll` + `useMotionValueEvent` from motion/react | Passive listener, auto-cleanup, reactive |
| `framer-motion` direct imports | `motion/react` import path | motion package v12 re-exports framer-motion — use `motion/react` per Phase 1 convention |

**Deprecated/outdated:**
- Importing from `"framer-motion"` directly: The motion package wraps it. Phase 1's FadeUp.tsx sets the convention: always import from `"motion/react"`.
- `useAnimation()` imperative controls for scroll-based effects: `useScroll` + `useMotionValueEvent` is the declarative pattern.

---

## Open Questions

1. **Header height precision**
   - What we know: CONTEXT.md defers exact height to Claude's discretion; 44px+ tap targets required; medspa-template uses `h-16 lg:h-20`
   - What's unclear: Whether a taller header (h-20 on mobile too) looks proportional with Fraunces display text
   - Recommendation: Build with `h-16 lg:h-20` (matching medspa-template), adjust in review if text feels cramped

2. **`generateWaxingBusinessSchema` in layout.tsx**
   - What we know: `@/lib/schema` exists from Phase 1 and exports schema helpers
   - What's unclear: Whether a root-level business schema is already exported from `@/lib/schema` or needs to be added
   - Recommendation: Check `src/lib/schema.ts` before writing layout.tsx — if a suitable function exists, use it; if not, create `generateWaxingBusinessSchema` in that file as part of this phase's layout wiring task

3. **Hamburger animation approach**
   - What we know: CONTEXT.md locks animated hamburger-to-X; motion/react is available
   - What's unclear: Whether to use `motion.span` div-based morphing or SVG path morphing
   - Recommendation: Use three `motion.span` divs — middle bar fades + scales to 0, top and bottom bars rotate ±45deg. Simpler, performs well, pure CSS transforms.

---

## Sources

### Primary (HIGH confidence)
- medspa-template/src/components/layout/ — read all 6 files in full: Header.tsx, MobileNav.tsx, Footer.tsx, BookingBar.tsx, NavContext.tsx, index.ts
- medspa-template/src/app/layout.tsx — layout wiring pattern verified
- waxing-template/src/components/ui/ — all Phase 1 components read: BookingLink.tsx, PhoneLink.tsx, Button.tsx, FadeUp.tsx, SectionWrapper.tsx
- waxing-template/src/content/client.config.ts — confirmed fields: name, phone, hours, address, social URLs, bookingUrl
- waxing-template/src/lib/types.ts — WaxingClientConfig interface confirmed (no hipaaNotice field)
- waxing-template/package.json — motion@12.38.0, next@16.2.1 confirmed

### Secondary (MEDIUM confidence)
- waxing-template/node_modules/motion/dist/react.d.ts — confirmed re-exports from framer-motion
- waxing-template/node_modules/framer-motion/dist/framer-motion.js — confirmed: `AnimatePresence`, `useScroll`, `useMotionValueEvent` all present

### Tertiary (LOW confidence)
- None — all claims verified from source code or installed packages

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package.json and Phase 1 components verified directly
- Architecture: HIGH — medspa-template is a complete working reference, read in full
- Pitfalls: HIGH — consultationType mismatch verified from actual component signatures; others verified from medspa-template code

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable — layout patterns don't change fast; motion API is stable)
