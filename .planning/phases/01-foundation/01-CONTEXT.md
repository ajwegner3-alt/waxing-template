# Phase 1: Foundation - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Design tokens, TypeScript types, UI primitives, and client config. This phase locks the aesthetic identity and data structures so every downstream component builds consistently without backtracking. No pages or layout are built here — only the building blocks.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- **Primary CTA color:** Warm honey gold (~#D4A574 or similar) — ties to brand name, warm and inviting
- **Background:** Slightly pinker/blush cream — warmer than Verdana's #FBF8F3, leaning into soft pink undertones for a more feminine feel
- **Secondary accent:** Sage green (Claude's discretion on exact shade) — complements honey gold and blush, keeps the natural/botanical feel
- **Text color:** Charcoal #333333 — neutral, professional, universal
- **Dark sections:** Use charcoal-based dark backgrounds, not green-blacks like Verdana

### Visual Personality
- **Relationship to Verdana:** Loose inspiration — borrow the warmth and softness but build a more distinct visual identity
- **Decorative accents:** Abstract soft organic shapes (blobs, curves) — NOT specifically botanical leaves/circles like Verdana. Spa-like, not garden-like
- **Texture overlay:** Yes, subtle noise texture on backgrounds — adds tactile warmth, prevents flat digital feel
- **Photography style:** Mix — warm lifestyle shots (women relaxing, soft lighting) for hero/emotional sections, studio/space shots (treatment rooms, products, ingredients) for service/trust sections

### Component Feel
- **Button shape:** Softly rounded (border-radius: 12-16px) — modern, slightly more structured than Verdana's full pills
- **Card style:** Floating with soft shadow — white cards on cream/blush background, gentle box-shadow creating slight elevation
- **Spacing:** Generous, spa-like — lots of whitespace, sections feel spacious and unhurried. Matches the calming aesthetic
- **Animations:** Subtle fade-ups on scroll — elements gently fade in as user scrolls. No flashy motion. Hover states on interactive elements

### Content Tone
- **Voice:** Warm best friend — "We get it — your first wax can feel nerve-wracking. We're here to make it easy." Casual, empathetic, first-person
- **Pain messaging:** Honest and reassuring — "Yes, there's a pinch — but our honey formula is designed to minimize discomfort. Most clients say it's way less than they expected."
- **Headline style:** Emotional benefit-first — "Feel confident in your own skin" leads with the feeling, not the service. Interior pages can be more direct
- **Formality:** Casual — first and second person ("you" and "we") throughout. Contractions. Feels like a conversation, not a brochure

### Claude's Discretion
- Exact hex values for the blush cream background and sage green accent (within the described direction)
- Shadow depth and blur radius for cards
- Specific animation timing and easing curves
- Noise texture opacity
- Exact font weights for Fraunces (display) — likely 300-400 for that soft serif feel
- Icon style (inline SVGs, Lucide, or custom) — decide during implementation

</decisions>

<specifics>
## Specific Ideas

- Verdana Wellness is the emotional reference point — the site should evoke the same "oh, this feels nice" reaction, but through a distinct identity that says "waxing studio" not "supplement brand"
- The honey gold primary color is a brand anchor — it connects visually to the "Honey" in "Honey & Bloom" and to the actual honey-based wax formula
- Abstract soft shapes should feel like they could be part of a high-end spa brand — think Aesop, Glossier, or goop aesthetic territory (accessible luxury, not pretentious)
- The generous spacing is intentional — waxing clients are often anxious, and a cramped site adds to that anxiety. Let the design breathe

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-28*
