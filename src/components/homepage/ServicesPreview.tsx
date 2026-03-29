/**
 * ServicesPreview — 4-category service card grid with links to /services/[slug].
 *
 * Server Component — no "use client".
 * Category data from serviceCategories in the content layer.
 * 4 inline SVGs matching each category iconName.
 * Cards use FadeUp with staggered delay.
 */

import React from "react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { serviceCategories } from "@/content/services";

// ---------------------------------------------------------------------------
// Inline SVG icons — keyed to category iconName values
// ---------------------------------------------------------------------------

function SparklesIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17Z" />
      <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75L19 3Z" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function GiftIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <SparklesIcon className="w-8 h-8 text-brand-primary" />,
  leaf: <LeafIcon className="w-8 h-8 text-brand-primary" />,
  shield: <ShieldIcon className="w-8 h-8 text-brand-primary" />,
  gift: <GiftIcon className="w-8 h-8 text-brand-primary" />,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ServicesPreview() {
  return (
    <SectionWrapper bg="white" padding="lg">
      {/* Section header */}
      <FadeUp>
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-4">
            Our Services
          </h2>
          <p className="text-brand-dark/65 text-lg leading-relaxed">
            From brows to Brazilians, we&apos;ve got you covered.
          </p>
        </div>
      </FadeUp>

      {/* Category card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceCategories.map((category, i) => (
          <FadeUp key={category.slug} delay={i * 0.1}>
            <div className="group relative flex flex-col bg-white rounded-2xl border border-brand-primary/12 p-6 gap-4 hover:border-brand-primary/40 hover:shadow-md transition-all duration-200">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/18 transition-colors duration-200">
                {iconMap[category.iconName] ?? iconMap["sparkles"]}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="font-heading text-lg font-semibold text-brand-dark">
                  {category.name}
                </h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed">
                  {category.tagline}
                </p>
              </div>

              {/* Link */}
              <Link
                href={`/services/${category.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors duration-200 mt-auto"
                aria-label={`View ${category.name} services`}
              >
                View Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
