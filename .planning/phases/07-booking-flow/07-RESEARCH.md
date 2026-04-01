# Phase 7: Booking Flow - Research

**Researched:** 2026-03-31
**Domain:** Multi-step React form UI with client-side state, motion/react animations, calendar grid, service selection with running total
**Confidence:** HIGH

---

## Summary

Phase 7 is a pure front-end, client-side booking UI at `/book`. No backend, no real availability, no external dependencies beyond what is already installed. The entire phase is buildable with React state (`useState`, `useReducer`), the existing `motion` package (v12.38.0 — imported as `motion/react`), and the existing Tailwind v4 design tokens.

The key architectural insight is that the `/book` page must be a Server Component page file that renders a single `"use client"` `BookingFlow` component. This follows the pattern already established in the codebase: Server Component pages + client component trees. The four-step state machine lives entirely inside `BookingFlow` — no URL routing between steps, no React context needed (local state is sufficient).

All five non-trivial design problems (calendar grid, step transitions, service multi-select, running total, esthetician card) have straightforward solutions using existing primitives. No new npm packages are required. The only genuine discretion area involves the calendar grid layout and time slot visual grouping.

**Primary recommendation:** One `BookingFlow` client component holds step state via `useReducer`. Pass data down to four step sub-components. Use `AnimatePresence` + `motion.div` for step transitions. Import everything from `motion/react` — never `framer-motion`.

---

## Standard Stack

This phase introduces NO new packages. Everything needed is already installed.

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | useState, useReducer, client state | Already in project |
| motion | ^12.38.0 | AnimatePresence, step transitions | Already in project; `motion/react` import locked |
| Next.js | 16.2.1 | App Router, Server Component page wrapper | Already in project |
| Tailwind CSS v4 | ^4 | All styling, brand tokens | Already in project |

### Already Available UI Primitives
| Component | Location | Use in Phase 7 |
|-----------|----------|----------------|
| `Button` | `@/components/ui/Button` | Step nav buttons (Back/Continue), time slot buttons |
| `FadeUp` | `@/components/ui/FadeUp` | Intro section animation |
| `SectionWrapper` | `@/components/ui/SectionWrapper` | Page section wrapping |
| `Badge` | `@/components/ui/Badge` | Trust signals in confirmation step |
| `BookingLink` | `@/components/ui/BookingLink` | Final handoff CTA to clientConfig.bookingUrl |
| `Breadcrumbs` | `@/components/layout/Breadcrumbs` | /book breadcrumb |

### No New Installation Needed
```bash
# Nothing to install — all dependencies present
```

---

## Architecture Patterns

### Recommended File Structure
```
src/
├── app/
│   └── book/
│       └── page.tsx              # Server Component page — renders BookingFlow
├── components/
│   └── booking/
│       ├── BookingFlow.tsx       # "use client" — step state machine, AnimatePresence
│       ├── ProgressIndicator.tsx # Step 1-2-3-4 circles + connecting line
│       ├── BookingIntro.tsx      # Warm intro section (Server Component, rendered above BookingFlow)
│       ├── ServiceSelector.tsx   # Step 1 — multi-select, running total
│       ├── EstheticianStep.tsx   # Step 2 — auto-selected Maya Chen profile card
│       ├── DateTimePicker.tsx    # Step 3 — calendar grid + time slot grid
│       ├── ConfirmationStep.tsx  # Step 4 — summary, prep reminders, handoff
│       └── index.ts              # Barrel export
```

### Pattern 1: Server Component Page + Single Client Root

The `/book` page file is a Server Component. It renders a `BookingIntro` (also Server Component) and a single `BookingFlow` client component. This is the identical pattern used by every other page in this codebase.

```typescript
// src/app/book/page.tsx — Server Component, no "use client"
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { allServices } from "@/content/services";
import { staff } from "@/content/staff";
import { SectionWrapper, FadeUp } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout";
import { BookingFlow } from "@/components/booking";

export const metadata: Metadata = generatePageMetadata({
  title: "Book Your Appointment | Honey & Bloom Wax Studio Omaha",
  description:
    "Book a waxing appointment with Maya Chen at Honey & Bloom. Choose your services, date, and time in 2 minutes. Transparent pricing, gentle honey-based wax.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      {/* Warm intro — Server Component section above the interactive flow */}
      <SectionWrapper bg="light" padding="sm">
        <Breadcrumbs items={[{ label: "Book", href: "/book" }]} className="mb-4" />
        <FadeUp>
          <div className="max-w-xl">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-dark mb-3">
              Let's book your appointment
            </h1>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              Takes about 2 minutes. Pick your services, choose a time, and
              we'll take it from there.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Interactive booking flow — client component */}
      <BookingFlow services={allServices} esthetician={staff[0]} />
    </>
  );
}
```

**Why this pattern:** Server Component page passes serializable data (services array, staff member) as props to the client root. No context needed. Matches the codebase convention exactly.

### Pattern 2: Step State Machine with useReducer

A `useReducer` is cleaner than multiple `useState` calls for multi-step forms. It keeps all booking state in one place and makes step transitions explicit.

```typescript
// Inside BookingFlow.tsx
"use client";

import { useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";

type Step = 1 | 2 | 3 | 4;

interface BookingState {
  step: Step;
  selectedServiceSlugs: string[];
  selectedEstheticianSlug: string;   // pre-set to "maya-chen" on init
  selectedDate: string | null;       // "YYYY-MM-DD" format
  selectedTime: string | null;       // "9:00 AM" format
}

type BookingAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "TOGGLE_SERVICE"; slug: string }
  | { type: "SELECT_DATE"; date: string }
  | { type: "SELECT_TIME"; time: string };

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: Math.min(4, state.step + 1) as Step };
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) as Step };
    case "TOGGLE_SERVICE":
      return {
        ...state,
        selectedServiceSlugs: state.selectedServiceSlugs.includes(action.slug)
          ? state.selectedServiceSlugs.filter((s) => s !== action.slug)
          : [...state.selectedServiceSlugs, action.slug],
      };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.date, selectedTime: null };
    case "SELECT_TIME":
      return { ...state, selectedTime: action.time };
    default:
      return state;
  }
}

const INITIAL_STATE: BookingState = {
  step: 1,
  selectedServiceSlugs: [],
  selectedEstheticianSlug: "maya-chen",  // auto-selected
  selectedDate: null,
  selectedTime: null,
};
```

### Pattern 3: AnimatePresence Step Transitions

Use `AnimatePresence` with `mode="wait"` for clean cross-fade between steps. The `key` on the motion div must change with the step number to trigger exit/enter.

```typescript
// Source: motion/react package — verified AnimatePresence export
// Pattern verified in existing MobileNav.tsx in this codebase

<AnimatePresence mode="wait">
  <motion.div
    key={`step-${state.step}`}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* current step component */}
  </motion.div>
</AnimatePresence>
```

**Important:** `mode="wait"` ensures the exiting step fully disappears before the entering step animates in. Without it, both steps render simultaneously and layout breaks.

**Easing note:** `[0.22, 1, 0.36, 1]` is the established easing in this codebase (see FadeUp.tsx). Use the same value for visual consistency.

### Pattern 4: Progress Indicator

Numbered circles connected by a line. Purely decorative SVG/div pattern — no library needed.

```typescript
// ProgressIndicator.tsx — Server Component (no interaction)
// Not "use client" — receives currentStep as prop, purely presentational

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const STEP_LABELS = ["Services", "Esthetician", "Date & Time", "Confirm"];

export function ProgressIndicator({ currentStep, totalSteps = 4 }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-0 mb-8" role="list" aria-label="Booking progress">
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        return (
          <div key={stepNum} className="flex items-center flex-1 last:flex-none" role="listitem">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-300
                  ${isCompleted ? "bg-brand-primary border-brand-primary text-white" : ""}
                  ${isCurrent ? "bg-white border-brand-primary text-brand-primary" : ""}
                  ${!isCompleted && !isCurrent ? "bg-white border-brand-dark/20 text-brand-dark/40" : ""}
                `}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? "✓" : stepNum}
              </div>
              <span className={`text-xs font-medium hidden sm:block
                ${isCurrent ? "text-brand-primary" : "text-brand-dark/40"}
              `}>
                {label}
              </span>
            </div>
            {/* Connector line */}
            {stepNum < totalSteps && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors duration-300
                  ${isCompleted ? "bg-brand-primary" : "bg-brand-dark/15"}
                `}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

### Pattern 5: Service Selection with Running Total

Multi-select via `selectedServiceSlugs` array in state. Running total computed by filtering `allServices` against selected slugs. `Service.price` is nullable — guard with `?? 0`.

```typescript
// ServiceSelector.tsx pattern
// price nullable — guard required (see STATE.md convention)

const selectedServices = services.filter((s) =>
  selectedSlugs.includes(s.slug)
);

const runningTotal = selectedServices.reduce(
  (sum, s) => sum + (s.price ?? 0),
  0
);
```

### Pattern 6: Static Calendar Mock Data

Static list of available dates as an array of `"YYYY-MM-DD"` strings. Month grid built with `Date` arithmetic — no date library needed for a static mock.

```typescript
// MOCK_AVAILABLE_DATES — static, defined in DateTimePicker.tsx
// Use April 2026 to be "current" for the demo
const MOCK_AVAILABLE_DATES = [
  "2026-04-07", "2026-04-08", "2026-04-09",
  "2026-04-10", "2026-04-14", "2026-04-15",
  "2026-04-16", "2026-04-17", "2026-04-21",
  "2026-04-22", "2026-04-23", "2026-04-24",
  "2026-04-28", "2026-04-29",
];

// Static time slots — 30-minute intervals
const MOCK_TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",  "4:00 PM",  "4:30 PM",
];
```

**Calendar grid construction — no date library:**

```typescript
function buildCalendarGrid(year: number, month: number): (string | null)[][] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }),
  ];
  // Chunk into weeks of 7
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}
```

### Pattern 7: Confirmation Step Data Assembly

Pull `preparation[]` and `aftercare[]` from selected services. If multiple services are selected, merge and deduplicate prep reminders.

```typescript
// ConfirmationStep.tsx pattern
const selectedServices = allServices.filter((s) =>
  selectedSlugs.includes(s.slug)
);

// Merge prep from all selected services — deduplicate by text
const allPrep = [
  ...new Set(selectedServices.flatMap((s) => s.preparation)),
];
```

### Anti-Patterns to Avoid

- **Using separate routes for steps:** CONTEXT.md explicitly locks single `/book` page with client-side transitions. Do not create `/book/step-1`, `/book/step-2`, etc.
- **Using `framer-motion` import:** The package is `motion` v12, imported as `motion/react`. The `framer-motion` package is NOT installed. Importing from `framer-motion` will fail at build time.
- **Putting step logic in Server Components:** Any component that reads `useState` or `useReducer` requires `"use client"`. The page wrapper stays Server Component; `BookingFlow` and all four step sub-components are client components.
- **Calling `new Date()` inside Server Components for mock data:** Fine for static arrays defined at module scope, but don't derive "today" dynamically on the server and then hydrate — it will cause hydration mismatch. Use hardcoded April 2026 dates.
- **Forgetting `Service.price` can be null:** Always use `s.price ?? 0` in running total calculations. A service with `price: null` should display its `priceDisplay` string (e.g., "From $65") but contribute 0 to the numeric total.
- **Blocking the Continue button when esthetician step has no user choice:** Step 2 auto-selects Maya Chen. The `selectedEstheticianSlug` is pre-populated in initial state. The Continue button should be immediately active on step 2.
- **Using `mode="sync"` or no mode on AnimatePresence:** Use `mode="wait"`. Without it, entering and exiting steps overlap and the layout collapses.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Step transition animations | Custom CSS transitions | `AnimatePresence` + `motion.div` from `motion/react` | Already installed; handles exit animations which CSS cannot do without JS |
| Service card selection state | Custom checkbox component | `Button` component + `selectedServiceSlugs.includes(slug)` conditional styling | Reuses existing Button primitive |
| Calendar grid layout | Date library (date-fns, dayjs) | Native `Date` arithmetic (see buildCalendarGrid above) | Phase is static mock; no library needed |
| Typography/color styling | Custom CSS variables | Existing Tailwind v4 brand tokens (`text-brand-primary`, `bg-brand-light`, etc.) | All tokens already defined in globals.css |
| Navigation buttons | New button component | Existing `Button` component from `@/components/ui` | Already has `primary`, `outline`, `ghost` variants |
| Handoff CTA | New anchor component | Existing `BookingLink` component | Already reads `clientConfig.bookingUrl` |
| Trust badges on confirmation | Custom badge styles | Existing `Badge` component with `variant="trust"` | Consistent with site-wide trust signal styling |

**Key insight:** This phase is a pure UI assembly task. All visual primitives, animation utilities, data types, and content exist. The work is wiring them together, not building new infrastructure.

---

## Common Pitfalls

### Pitfall 1: Importing from `framer-motion` instead of `motion/react`
**What goes wrong:** Build fails with "Cannot find module 'framer-motion'" because the package is `motion`, not `framer-motion`.
**Why it happens:** Training data has extensive framer-motion examples. The package was renamed.
**How to avoid:** Always `import { motion, AnimatePresence } from "motion/react"` — verified by `node_modules/motion/package.json` exports showing `"./react"` as a named export path.
**Warning signs:** TypeScript error "Cannot find module 'framer-motion'" or "Module not found."

### Pitfall 2: Hydration Mismatch from Dynamic Date Derivation
**What goes wrong:** React hydration error because server-rendered HTML differs from client render if "today's date" is computed inside the render path.
**Why it happens:** Server renders at build/request time; client re-renders after hydration. If dates are relative to "now", they may differ.
**How to avoid:** Use hardcoded static mock dates (April 2026 array). Never call `new Date()` without `useEffect` or `useMemo` inside a component that SSR touches.
**Warning signs:** React console warning "Hydration failed because the server rendered HTML didn't match the client."

### Pitfall 3: `Service.price` Null Without Guard
**What goes wrong:** Running total shows `NaN` or crashes when a package service has `price: null`.
**Why it happens:** Some services use `priceDisplay: "From $65"` with `price: null` per the types spec and STATE.md convention.
**How to avoid:** Always `s.price ?? 0` in reduce. Display `priceDisplay` for the label, compute total with `price ?? 0`.
**Warning signs:** NaN in the running total display, or TypeScript error "Object is possibly null."

### Pitfall 4: BookingFlow as a Server Component
**What goes wrong:** React error "useState/useReducer can only be called in Client Components."
**Why it happens:** Next.js App Router defaults everything to Server Components. The `"use client"` directive must be at the top of every file that uses hooks.
**How to avoid:** Every file that contains `useState`, `useReducer`, `useEffect`, or event handlers (`onClick`, `onChange`) must have `"use client"` as its first line. The page.tsx remains Server Component; it passes serialized data as props to `BookingFlow`.
**Warning signs:** Next.js build error or runtime error mentioning hooks in Server Components.

### Pitfall 5: Continue Button Active Before Required Selection
**What goes wrong:** User can proceed to step 2 without selecting any service, leading to an empty confirmation step.
**Why it happens:** No validation on the step transition.
**How to avoid:** Disable the Continue button on Step 1 when `selectedServiceSlugs.length === 0`. All other steps have pre-populated selections (Step 2 auto-selects Maya; Step 3 requires both date and time).
**Warning signs:** Confirmation step shows no services or $0 total.

### Pitfall 6: AnimatePresence Without `mode="wait"` Causes Layout Collapse
**What goes wrong:** Both the exiting step and entering step render simultaneously, causing content to stack and layout to collapse.
**Why it happens:** Default `mode="sync"` runs enter and exit simultaneously.
**How to avoid:** Always `<AnimatePresence mode="wait">`. Give each step's motion.div a `key={`step-${step}`}` that changes on step transition.
**Warning signs:** Two step UIs visible at once; layout doubles in height briefly during transition.

### Pitfall 7: `params` as Sync Object
**What goes wrong:** TypeScript error if page params are treated synchronously.
**Why it happens:** In Next.js 16, `params` is a Promise (see STATE.md).
**How to avoid:** The `/book` page has no dynamic params (it's a static route), so this pitfall does not apply here. Noted for completeness since it affected service pages.

---

## Code Examples

### Complete BookingFlow Skeleton
```typescript
// src/components/booking/BookingFlow.tsx
"use client";

import { useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Service, Staff } from "@/lib/types";
import { ProgressIndicator } from "./ProgressIndicator";
import { ServiceSelector } from "./ServiceSelector";
import { EstheticianStep } from "./EstheticianStep";
import { DateTimePicker } from "./DateTimePicker";
import { ConfirmationStep } from "./ConfirmationStep";

// ... (bookingReducer and types as in Pattern 2)

interface BookingFlowProps {
  services: Service[];
  esthetician: Staff;
}

export function BookingFlow({ services, esthetician }: BookingFlowProps) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE);

  const canContinue =
    (state.step === 1 && state.selectedServiceSlugs.length > 0) ||
    state.step === 2 ||
    (state.step === 3 && state.selectedDate !== null && state.selectedTime !== null) ||
    state.step === 4;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <ProgressIndicator currentStep={state.step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${state.step}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {state.step === 1 && (
            <ServiceSelector
              services={services}
              selectedSlugs={state.selectedServiceSlugs}
              onToggle={(slug) => dispatch({ type: "TOGGLE_SERVICE", slug })}
            />
          )}
          {state.step === 2 && (
            <EstheticianStep esthetician={esthetician} />
          )}
          {state.step === 3 && (
            <DateTimePicker
              selectedDate={state.selectedDate}
              selectedTime={state.selectedTime}
              onSelectDate={(date) => dispatch({ type: "SELECT_DATE", date })}
              onSelectTime={(time) => dispatch({ type: "SELECT_TIME", time })}
            />
          )}
          {state.step === 4 && (
            <ConfirmationStep
              services={services}
              selectedSlugs={state.selectedServiceSlugs}
              esthetician={esthetician}
              date={state.selectedDate!}
              time={state.selectedTime!}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step navigation */}
      {state.step < 4 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-dark/10">
          {state.step > 1 ? (
            <button
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="text-brand-dark/60 hover:text-brand-dark text-sm font-medium underline-offset-2 hover:underline transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div aria-hidden="true" />
          )}
          <button
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            disabled={!canContinue}
            className="bg-brand-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {state.step === 3 ? "Review Booking" : "Continue"}
          </button>
        </div>
      )}
    </section>
  );
}
```

### Service Card Selection Pattern
```typescript
// ServiceSelector.tsx — multi-select service card pattern
// source: codebase conventions (ServiceCard.tsx as reference)

interface ServiceCardSelectProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}

function SelectableServiceCard({ service, isSelected, onToggle }: ServiceCardSelectProps) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={isSelected}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
        ${isSelected
          ? "border-brand-primary bg-brand-primary/5 shadow-sm"
          : "border-brand-dark/10 bg-white hover:border-brand-primary/40 hover:bg-brand-primary/5"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-brand-dark">{service.name}</h3>
          <p className="text-sm text-brand-dark/60 mt-1">{service.shortDescription}</p>
          <p className="text-xs text-brand-dark/40 mt-1">{service.duration}</p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="font-semibold text-brand-dark">
            {service.price !== null ? `$${service.price}` : service.priceDisplay}
          </span>
          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${isSelected ? "bg-brand-primary border-brand-primary" : "border-brand-dark/20"}
          `}>
            {isSelected && (
              <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </div>
      </div>
    </button>
  );
}
```

### Running Total Display
```typescript
// Running total pattern in ServiceSelector.tsx footer
const selectedServices = services.filter((s) => selectedSlugs.includes(s.slug));
const runningTotal = selectedServices.reduce((sum, s) => sum + (s.price ?? 0), 0);

// Display
{selectedSlugs.length > 0 && (
  <div className="mt-6 p-4 bg-brand-light rounded-xl flex items-center justify-between">
    <span className="text-sm text-brand-dark/70">
      {selectedSlugs.length} service{selectedSlugs.length !== 1 ? "s" : ""} selected
    </span>
    <span className="font-bold text-brand-dark text-lg">
      Total: ${runningTotal}
    </span>
  </div>
)}
```

### Page Metadata Pattern (generatePageMetadata)
```typescript
// src/app/book/page.tsx — follows same pattern as services/page.tsx, faq/page.tsx
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Book Your Appointment | Honey & Bloom Wax Studio Omaha",
  description:
    "Book a waxing appointment with Maya Chen at Honey & Bloom. Choose your services, date, and time in 2 minutes. Transparent pricing, gentle honey-based wax.",
  path: "/book",
});
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Multi-step forms with URL routing (/book/step-1, /book/step-2) | Single page with React state + AnimatePresence | CONTEXT.md locked: single `/book` page with client-side transitions only |
| `framer-motion` import | `motion/react` import (motion v12+) | Build breaks if wrong import used — locked since Phase 1 |
| `useState` for each step field | `useReducer` with explicit action types | Cleaner state transitions, easier to reason about |
| Date library (dayjs, date-fns) for calendar | Native Date arithmetic for static mock | Zero new dependencies; calendar is static mock data |

**Not deprecated but worth noting:**
- `AnimatePresence` from `motion/react`: confirmed available at this exact path via package.json exports inspection
- `FadeUp` wrapper pattern: Server Components + `FadeUp` works because FadeUp uses `whileInView` which only activates client-side after hydration

---

## Open Questions

1. **Service grouping in Step 1**
   - What we know: CONTEXT.md says "Claude's discretion" for service presentation UI (category-grouped vs flat list)
   - Recommendation: Use category tabs/groups (face, body, intimate, packages) matching existing `ServiceCategory` structure. The data model already has categories; this reduces cognitive load when 12+ services are listed.

2. **Cancellation policy text**
   - What we know: CONTEXT.md says "cancellation policy display format" is Claude's discretion. No existing cancellation policy text exists in `client.config.ts` or content files.
   - Recommendation: Inline a simple static policy in `ConfirmationStep.tsx`. Typical waxing studio policy: 24-hour cancellation required. "We ask for at least 24 hours notice to cancel or reschedule. Cancellations with less than 24 hours notice may be subject to a $15 late cancellation fee." Keep it warm, not legalistic.

3. **ProgressIndicator: client or server component**
   - What we know: Step number changes require re-render; `ProgressIndicator` receives `currentStep` as a prop from `BookingFlow`.
   - Recommendation: `ProgressIndicator` can be a regular function component that is imported and used inside the `BookingFlow` client component. It doesn't need its own `"use client"` directive — it inherits the client boundary from its parent `BookingFlow`. This is the correct pattern per Next.js App Router: only the root of a client subtree needs `"use client"`.

---

## Sources

### Primary (HIGH confidence)
- `node_modules/motion/package.json` — version 12.38.0, confirmed `"./react"` export path
- `node_modules/motion/dist/` — confirmed `react-client.d.ts` and `react-m.d.ts` present
- `src/components/layout/MobileNav.tsx` — live codebase example of `AnimatePresence` + `motion` from `motion/react`
- `src/components/ui/FadeUp.tsx` — confirms `import { motion } from "motion/react"` convention and established easing `[0.22, 1, 0.36, 1]`
- `src/lib/types.ts` — confirms `Service.price: number | null`, `preparation: string[]`, `aftercare: string[]` fields
- `src/content/staff.ts` — confirms `maya-chen` slug, `Staff` type shape
- `src/content/services/index.ts` — confirms `allServices` export, accessor functions
- `src/components/ui/Button.tsx` — confirms `primary`/`secondary`/`outline`/`ghost` variants
- `src/components/ui/SectionWrapper.tsx` — confirms `blush`/`light`/`white`/`dark`/`primary` bg variants
- `.planning/STATE.md` — confirms `Service.price nullable`, `import from motion/react`, `Server Components + FadeUp wrapper pattern`
- `.planning/phases/07-booking-flow/07-CONTEXT.md` — locked decisions on step flow, single /book page, progress indicator shape

### Secondary (MEDIUM confidence)
- `package.json` — Next.js 16.2.1, React 19.2.4, motion ^12.38.0, no date libraries installed

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified by direct file inspection; no new installs needed
- Architecture: HIGH — patterns derived from existing codebase conventions, not external examples
- Pitfalls: HIGH — most derived from STATE.md locked conventions and direct package inspection
- Mock data strategy: HIGH — static arrays confirmed correct approach (no hydration issues, no deps)

**Research date:** 2026-03-31
**Valid until:** 2026-05-01 (stable stack; only invalidated by major Next.js or motion version bump)
