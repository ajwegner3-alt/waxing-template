/**
 * FAQCategorySection — Reusable FAQ section block with heading, intro, and accordion.
 *
 * Server Component — no "use client".
 * Accepts a heading, intro text, FAQ array, and optional bg variant.
 * Delegates accordion rendering to the existing FAQAccordion component.
 *
 * Usage:
 *   <FAQCategorySection
 *     heading="First Visit Questions"
 *     intro="Everything you need to know before your first appointment."
 *     faqs={firstTimerFaqs}
 *     bg="light"
 *   />
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { FAQAccordion } from "@/components/services/FAQAccordion";
import type { FAQ } from "@/lib/types";

type SectionBg = "white" | "light" | "dark" | "primary" | "blush";

interface FAQCategorySectionProps {
  heading: string;
  intro?: string;
  faqs: FAQ[];
  bg?: SectionBg;
}

export function FAQCategorySection({
  heading,
  intro,
  faqs,
  bg = "white",
}: FAQCategorySectionProps) {
  if (faqs.length === 0) return null;

  return (
    <SectionWrapper bg={bg} padding="md">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="mb-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-3">
              {heading}
            </h2>
            {intro && (
              <p className="text-brand-dark/60 leading-[1.7]">{intro}</p>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <FAQAccordion faqs={faqs} />
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
