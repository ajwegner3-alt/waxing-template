# Phase 2: Layout Shell - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Header, footer, mobile nav, sticky booking bar, and breadcrumb shell. These are the persistent chrome elements that wrap every page. No page content is built here — only the layout skeleton that all Phase 3+ pages will slot into.

</domain>

<decisions>
## Implementation Decisions

### Header & Navigation
- **Logo:** Text-only using Fraunces display serif — "Honey & Bloom" as a styled text logo, no image/SVG needed
- **Nav items (5):** Services, First Visit, About, FAQ, Contact — "First Visit" speaks directly to the first-timer audience (the core value)
- **Header behavior:** Transparent over hero section, becomes solid blush cream on scroll — modern, immersive feel
- **Book Now CTA button:** Filled honey gold (#D4A574) — stands out against cream/transparent header. Always visible in the header on desktop
- **Booking is a CTA button, not a nav link** — keeps nav clean, gives booking visual priority

### Mobile Navigation
- **Drawer style:** Claude's discretion (full-screen overlay vs slide-in panel) — pick what fits the warm aesthetic
- **Drawer content:** Nav links + phone number (click-to-call) + Book Now button — two conversion actions accessible in the drawer
- **Menu icon:** Animated hamburger-to-X — three lines morph to X on open, smooth transition
- **Drawer animation:** Smooth slide + fade — gentle motion matching the soft aesthetic. Use motion/react for the animation

### Sticky Booking Bar
- **Position:** Fixed to bottom of screen on mobile — thumb-friendly, like ride-share app booking bars
- **Content:** Two buttons side by side — Book Now (primary, honey gold) + Call (secondary) — covers both conversion paths equally
- **Visibility:** Always visible on mobile — booking is always one tap away. No scroll-triggered show/hide
- **Desktop:** Hidden — header Book Now CTA is sufficient on desktop
- **Z-index:** Must sit above page content but below mobile nav drawer when open
- **Spacing:** Page content needs bottom padding to prevent the sticky bar from covering the last section

### Footer
- **Layout:** Full-featured 4 columns — Logo + tagline, Quick Links, Services, Contact Info/Hours
- **Background:** Dark charcoal (#333333) — classic dark footer, clear visual separation, white/cream text
- **Social platforms:** Instagram, Facebook, TikTok — the three visual platforms where beauty businesses thrive
- **Cancellation policy:** Small sub-text below main footer content — visible but not prominent, no separate policy page
- **Internal links:** Services column links to individual service pages (Phase 5), Quick Links to About/FAQ/Contact/Blog — good for SEO

### Claude's Discretion
- Mobile nav drawer type (full-screen overlay vs right slide-in) — pick what feels most spa-like
- Exact scroll threshold for header transparency-to-solid transition
- Footer column ordering and responsive collapse behavior
- Breadcrumb visual style (text-only with chevron separators is standard)
- Header height and sticky bar height (ensure 44px+ tap targets throughout)
- Whether the nav items have hover underlines, color changes, or both

</decisions>

<specifics>
## Specific Ideas

- "First Visit" as a nav item is a deliberate conversion choice — it signals to first-timers that the studio anticipates their needs. This page will be built in a later phase but the nav link should be wired now
- The transparent-to-solid header transition should feel seamless — no jarring snap. Consider a smooth opacity/background-color transition
- The sticky booking bar should feel like a natural part of the page, not an aggressive overlay. Keep it slim, well-padded, with brand-consistent styling
- Footer serves dual purpose: conversion (contact info, phone, hours) and SEO (internal links to services and areas)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-layout-shell*
*Context gathered: 2026-03-29*
