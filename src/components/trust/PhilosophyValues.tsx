/**
 * PhilosophyValues — 4 brand value cards on a blush background.
 *
 * Server Component — no "use client".
 * Values: Comfort First, Natural Ingredients, Transparency, Judgment-Free.
 * Inline SVGs for icons — no icon library dependency.
 * Staggered FadeUp for the cards.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";

// Heart icon — Comfort First
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  );
}

// Leaf icon — Natural Ingredients
function LeafIcon({ className }: { className?: string }) {
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
        d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.545 3.75 3.75 0 0 1 3.255 3.717Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Eye icon — Transparency
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path
        fillRule="evenodd"
        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Shield icon — Judgment-Free
function ShieldIcon({ className }: { className?: string }) {
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
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: ValueCard[] = [
  {
    icon: <HeartIcon className="w-7 h-7 text-brand-primary" />,
    title: "Comfort First",
    description:
      "Every appointment is paced around you. We explain each step before doing it, check in throughout, and never rush — because your comfort isn't optional.",
  },
  {
    icon: <LeafIcon className="w-7 h-7 text-brand-secondary" />,
    title: "Natural Ingredients",
    description:
      "Our honey-based hard wax formula is gentle on sensitive skin. No synthetic resins, no unnecessary additives — just clean ingredients that work.",
  },
  {
    icon: <EyeIcon className="w-7 h-7 text-brand-primary" />,
    title: "Transparency",
    description:
      "Pricing is straightforward and posted clearly. No hidden add-ons, no upsells. What you see is what you pay — before you book or walk through the door.",
  },
  {
    icon: <ShieldIcon className="w-7 h-7 text-brand-secondary" />,
    title: "Judgment-Free",
    description:
      "This studio is a no-judgment zone. Whatever your skin, your body, or your experience level — you belong here. First-timers especially welcome.",
  },
];

export function PhilosophyValues() {
  return (
    <SectionWrapper bg="blush" padding="lg">
      {/* Section header */}
      <FadeUp className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-4">
          What We Believe
        </h2>
        <p className="text-brand-dark/65 leading-relaxed">
          These aren&apos;t taglines. They&apos;re the actual principles Maya built this
          studio around — and the standard every appointment is held to.
        </p>
      </FadeUp>

      {/* Value cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div className="bg-white rounded-2xl p-6 border border-brand-primary/10 shadow-sm h-full flex flex-col gap-4">
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                {value.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-heading font-semibold text-brand-dark text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-brand-dark/65 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
