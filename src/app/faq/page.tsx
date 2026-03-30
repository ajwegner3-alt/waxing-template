/**
 * /faq — FAQ Page
 *
 * Server Component — no "use client".
 * 7 anxiety-category sections, each with H2 heading, intro paragraph, and FAQAccordion.
 * Alternating white/light backgrounds. TrustCTA at bottom.
 *
 * FAQ_CATEGORIES is defined here (page-level presentation metadata, not in faqs.ts).
 */

import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { FAQCategorySection, TrustCTA } from "@/components/trust";
import { SectionWrapper, FadeUp } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ | Honey & Bloom Wax Studio Omaha",
  description:
    "Answers to every first-timer waxing question — pain, prep, privacy, hygiene, aftercare, and sensitive skin. Read before your appointment.",
  path: "/faq",
});

// Presentation metadata for each FAQ category — page-level only, not in faqs.ts
const FAQ_CATEGORIES = [
  {
    key: "first-timer" as const,
    heading: "First-Timer Questions",
    intro:
      "Never been waxed before? You're in the right place. Here's everything you need to know before your first appointment.",
  },
  {
    key: "pain" as const,
    heading: "Pain & Comfort",
    intro:
      "Yes, waxing involves a quick sting — but it's usually far less than people expect. Here's the honest truth about what it feels like.",
  },
  {
    key: "prep" as const,
    heading: "How to Prepare",
    intro:
      "A little prep goes a long way for your comfort and results. Here's what to do (and skip) before you come in.",
  },
  {
    key: "privacy" as const,
    heading: "Privacy & Comfort",
    intro:
      "Every service happens in a fully private room. Here's exactly what to expect so nothing catches you off guard.",
  },
  {
    key: "hygiene" as const,
    heading: "Hygiene & Safety",
    intro:
      "Your skin's safety is non-negotiable. Here's how we keep every appointment clean and professional.",
  },
  {
    key: "aftercare" as const,
    heading: "Aftercare",
    intro:
      "What you do after your wax matters just as much as the wax itself. These tips will keep your skin smooth and happy.",
  },
  {
    key: "sensitive-skin" as const,
    heading: "Sensitive Skin",
    intro:
      "Reactive skin is welcome here. Our honey-based hard wax is formulated specifically for clients who've had trouble elsewhere.",
  },
] satisfies Array<{
  key: (typeof faqs)[number]["category"];
  heading: string;
  intro: string;
}>;

export default function FAQPage() {
  return (
    <>
      {/* TODO Phase 8: Add FAQPage schema via SchemaScript */}

      {/* Page header */}
      <SectionWrapper bg="light" padding="md">
        <Breadcrumbs
          items={[{ label: "FAQ", href: "/faq" }]}
          className="mb-6"
        />
        <FadeUp>
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
              Your Questions, Answered
            </h1>
            <p className="text-brand-dark/65 text-lg leading-relaxed">
              First-timer nerves are real. We've answered the questions we hear
              most — organized by exactly what's on your mind.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* 7 category sections — alternating white/light */}
      {FAQ_CATEGORIES.map((cat, i) => {
        const categoryFaqs = faqs.filter((f) => f.category === cat.key);
        if (categoryFaqs.length === 0) return null;
        return (
          <FAQCategorySection
            key={cat.key}
            heading={cat.heading}
            intro={cat.intro}
            faqs={categoryFaqs}
            bg={i % 2 === 0 ? "white" : "light"}
          />
        );
      })}

      {/* Warm booking CTA + trust badges */}
      <TrustCTA page="faq" />
    </>
  );
}
