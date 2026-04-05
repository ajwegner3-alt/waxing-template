/**
 * WhatToExpect — 4-step icon card grid for first-visit anxiety reduction.
 *
 * Server Component — no "use client".
 *
 * id="what-to-expect" + scroll-mt-20 makes this the anchor target for the
 * hero's "First-Timer Guide" CTA button.
 *
 * Icons: inline SVGs — no icon library dependency.
 * Cards use FadeUp with staggered delay for a gentle reveal.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";

// ---------------------------------------------------------------------------
// Inline SVG icons — purpose-built for each step
// ---------------------------------------------------------------------------

function CalendarCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-12 h-12 text-brand-primary"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="9 16 11 18 15 14" />
    </svg>
  );
}

function DoorOpenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-12 h-12 text-brand-primary"
    >
      <path d="M13 4H6a2 2 0 0 0-2 2v14" />
      <path d="M18 20H2" />
      <path d="M20 4v16" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function HandHeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-12 h-12 text-brand-primary"
    >
      <path d="M11 14H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
      <path d="M15 18c0-1.7 1.3-3 3-3s3 1.3 3 3c0 2-3 4-3 4s-3-2-3-4Z" />
      <path d="M9 10h6" />
    </svg>
  );
}

function SparkleLeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-12 h-12 text-brand-primary"
    >
      <path d="M12 3C12 3 7 8 7 13a5 5 0 0 0 10 0c0-5-5-10-5-10Z" />
      <path d="M12 13v8" />
      <path d="M9 18l3 3 3-3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Step data
// ---------------------------------------------------------------------------

const steps = [
  {
    icon: <CalendarCheckIcon />,
    title: "Before You Arrive",
    description:
      "Skip the razor for 2–3 weeks so hair is at least ¼ inch long. Wear loose, comfortable clothing. Take ibuprofen 30–45 minutes before if you're nervous about sensitivity. That's it — we handle everything else.",
  },
  {
    icon: <DoorOpenIcon />,
    title: "When You Walk In",
    description:
      "You'll be greeted by name and shown to a clean, private room. No waiting in a crowded lobby. We'll walk you through what's happening before we touch anything, so you always know what to expect next.",
  },
  {
    icon: <HandHeartIcon />,
    title: "During Your Service",
    description:
      "Our honey-based hard wax grips the hair, not the skin — it's gentler than strip wax, especially for sensitive skin. Your esthetician narrates every step. If you ever want to pause or stop, just say so. No judgment, ever.",
  },
  {
    icon: <SparkleLeafIcon />,
    title: "After You Leave",
    description:
      "You'll leave with a complimentary aftercare kit and a simple care card with day-by-day instructions. Most clients want to book their next appointment before they reach the car — results last 3–5 weeks.",
  },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function WhatToExpect() {
  return (
    <SectionWrapper
      id="what-to-expect"
      bg="light"
      padding="lg"
      className="scroll-mt-20"
    >
      {/* Section header */}
      <FadeUp>
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          {/* Ornamental divider */}
          <div className="ornament-divider text-brand-primary mb-6">
            <span className="text-brand-primary/40 text-xl">&#10045;</span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-4">
            What to Expect on Your First Visit
          </h2>
          <p className="text-brand-dark/70 text-lg leading-relaxed">
            Walking into your first wax appointment takes courage. Here is
            exactly what happens — step by step — so there are no surprises.
          </p>
        </div>
      </FadeUp>

      {/* Icon card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <FadeUp key={step.title} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center gap-4 bg-white rounded-3xl p-8 shadow-warm border border-brand-primary/8 hover:shadow-warm-lg transition-shadow duration-300">
              {/* Icon */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary/12 to-brand-primary/5">
                {step.icon}
              </div>

              {/* Step number pill */}
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold shadow-sm">
                {i + 1}
              </div>

              <h3 className="font-heading text-lg font-semibold text-brand-dark">
                {step.title}
              </h3>
              <p className="text-brand-dark/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
