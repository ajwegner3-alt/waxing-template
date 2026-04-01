# Phase 7: Booking Flow - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

4-step front-end booking UI at /book that demonstrates the service selection → esthetician → date/time → confirmation flow. UI-only — no backend, no real availability. External handoff to clientConfig.bookingUrl.

</domain>

<decisions>
## Implementation Decisions

### Step Flow & Navigation
- Back allowed, no skip — can go back to previous steps but must proceed in order
- Single /book page with client-side step transitions (React state) — not separate routes
- Numbered circles + line progress indicator (1-2-3-4 connected by line, filled for completed steps)
- Warm intro section before step 1 — brief welcome message ("Let's book your appointment") with note about 2-minute process

### Service Selection Step (Step 1)
- Multiple services selectable in one booking (e.g., Brazilian + eyebrow)
- Running total price updates dynamically as services are added/removed
- Service presentation UI: Claude's discretion (category-grouped or flat list)

### Esthetician Step (Step 2)
- Auto-select Maya Chen — since there's only 1 esthetician, show her profile card and auto-select
- Step exists to demonstrate the pattern for studios that may add staff later

### Date/Time Step (Step 3)
- Monthly calendar grid — traditional month view with clickable dates (static mock data)
- Time slots displayed as a grid of time buttons (9:00 AM, 9:30 AM, 10:00 AM...) after date selection

### Confirmation & Handoff (Step 4)
- Full appointment summary: selected services + total price + date + time + esthetician + service-specific prep reminders + cancellation policy
- Prep reminders pulled from the selected service(s) data — personalized, not generic
- Warm redirect message framing the external handoff: "Almost done! Click below to confirm your appointment on our secure booking system."
- Handoff button links to clientConfig.bookingUrl

### Claude's Discretion
- Service selection UI layout (category-grouped vs flat list)
- Calendar visual style and mock data (which dates are "available")
- Time slot intervals and available times
- Esthetician step visual design (profile card layout)
- Animation/transitions between steps
- Cancellation policy display format

</decisions>

<specifics>
## Specific Ideas

- The warm intro before step 1 reduces booking anxiety — first-timers should feel guided, not processed
- Multi-service selection with running total showcases the template's capability for real booking scenarios
- Auto-selecting the single esthetician keeps the 4-step structure intact while being honest about the 1-person studio
- Service-specific prep reminders on confirmation show the data layer's depth and help the visitor prepare

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-booking-flow*
*Context gathered: 2026-03-31*
