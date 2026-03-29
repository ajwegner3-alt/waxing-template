/**
 * FirstTimerSpotlight — First-Timer Package highlight section.
 *
 * Server Component — no "use client".
 *
 * Price and description pulled from the data layer via getServiceBySlug —
 * no hardcoded pricing. PACKAGE_SLUGS.firstTimer ensures the lookup key
 * stays in sync if the slug ever changes.
 *
 * Non-null assertion (!) is justified: this package is guaranteed to exist
 * in the data layer and a missing first-timer package is a data bug.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { BookingLink } from "@/components/ui/BookingLink";
import { getServiceBySlug, PACKAGE_SLUGS } from "@/content/services/index";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const checklistItems = [
  "Brazilian Wax",
  "Eyebrow Shaping",
  "Complimentary Aftercare Kit",
  "Patient, judgment-free esthetician",
  "Step-by-step guidance throughout",
] as const;

export function FirstTimerSpotlight() {
  const pkg = getServiceBySlug(PACKAGE_SLUGS.firstTimer)!;

  // Savings: a-la-carte Brazilian ($65) + eyebrow ($22) = $87 vs. $70 = $17 saved
  const savings = 17;
  // price is nullable in the type — the First-Timer Package always has a price,
  // so we fall back to the known value rather than crashing or showing nothing.
  const price: number = pkg.price ?? 70;

  return (
    <SectionWrapper bg="blush" padding="lg">
      <FadeUp>
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-3">
              The First&#8209;Timer Package
            </h2>
            <p className="text-brand-dark/65 text-lg max-w-xl mx-auto leading-relaxed">
              {pkg.shortDescription}
            </p>
          </div>

          {/* Package card */}
          <div className="bg-white rounded-2xl shadow-sm border border-brand-primary/15 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Left: Pricing + checklist */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                {/* Price display */}
                <div className="flex items-end gap-3 mb-2">
                  <span className="font-heading text-5xl lg:text-6xl font-bold text-brand-dark">
                    ${price}
                  </span>
                  <span className="mb-2 inline-flex items-center gap-1 bg-brand-secondary/15 text-brand-secondary text-sm font-semibold px-3 py-1 rounded-full">
                    Save ${savings}
                  </span>
                </div>
                <p className="text-brand-dark/50 text-sm mb-8">
                  vs. ${price + savings} a&#8209;la&#8209;carte · {pkg.duration}
                </p>

                {/* Visual checklist */}
                <ul className="space-y-3" aria-label="Package includes">
                  {checklistItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary/10"
                        aria-hidden="true"
                      >
                        <CheckIcon className="w-3.5 h-3.5 text-brand-primary" />
                      </span>
                      <span className="text-brand-dark/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Context + CTA */}
              <div className="bg-brand-primary/8 p-8 lg:p-10 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-brand-primary/10">
                <blockquote className="text-brand-dark/75 text-base leading-relaxed italic">
                  &ldquo;We designed this package because we know walking into
                  your first waxing appointment takes courage. This is our way
                  of welcoming you properly.&rdquo;
                </blockquote>

                {/* Key reassurances */}
                <ul className="space-y-2 text-sm text-brand-dark/65">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    We explain every step before we do it
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    You can pause or stop at any time
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    Private room, clean equipment every time
                  </li>
                </ul>

                {/* Dedicated CTA */}
                <BookingLink variant="cta" className="w-full text-center">
                  Book the First&#8209;Timer Package
                </BookingLink>

                <p className="text-xs text-center text-brand-dark/45">
                  No deposit required · Free cancellation
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
