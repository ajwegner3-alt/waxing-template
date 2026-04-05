/**
 * /first-visit — First-Timer Guide Page
 *
 * Server Component — no "use client".
 *
 * A dedicated anxiety-reduction page for first-time waxing clients.
 * Composites existing homepage sections (WhatToExpect, FirstTimerSpotlight)
 * with preparation tips, first-timer FAQs, and a warm CTA.
 *
 * Linked from the main nav ("First Visit") and footer.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { SectionWrapper, FadeUp, BookingLink } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout";
import { WhatToExpect } from "@/components/homepage/WhatToExpect";
import { FirstTimerSpotlight } from "@/components/homepage/FirstTimerSpotlight";
import { FAQAccordion } from "@/components/services/FAQAccordion";
import { faqs } from "@/content/faqs";
import { clientConfig } from "@/content/client.config";
import { PhoneLink } from "@/components/ui/PhoneLink";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = generatePageMetadata({
  title: "Your First Wax Visit | Honey & Bloom",
  description:
    "Everything first-timers need to know about waxing — preparation, what to expect, aftercare, and FAQs. Book your First-Timer Package today.",
  path: "/first-visit",
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const firstTimerFaqs = faqs.filter(
  (f) => f.category === "first-timer" || f.category === "pain" || f.category === "prep"
);

const prepTips = [
  {
    tip: "Let it grow for 2–3 weeks",
    detail:
      "Hair needs to be at least ¼ inch long (about the size of a grain of rice) for the wax to grip it. If you've been shaving, put the razor away now.",
  },
  {
    tip: "Exfoliate gently 24 hours before",
    detail:
      "A light exfoliation the day before helps hair release more cleanly and reduces the chance of ingrown hairs. Avoid anything harsh or abrasive — gentle is plenty.",
  },
  {
    tip: "Wear loose, comfortable clothing",
    detail:
      "Form-fitting waistbands and tight underwear can irritate freshly waxed skin. Loose cotton is your best friend on appointment day.",
  },
  {
    tip: "Take ibuprofen 30–45 minutes before",
    detail:
      "If you're nervous about sensitivity, an over-the-counter pain reliever before your appointment can help take the edge off. Totally optional — most clients skip it entirely.",
  },
  {
    tip: "Skip caffeine and alcohol beforehand",
    detail:
      "Both can make skin more sensitive. If you're already nervous, a coffee beforehand can amplify that feeling. Save the celebratory drink for after.",
  },
  {
    tip: "No need to trim — we handle that",
    detail:
      "You don't need to do any pre-trimming. If your hair is too long, your esthetician will take care of it before the wax goes on. Just come in as you are.",
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FirstVisitPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper
        bg="light"
        padding="md"
        className="-mt-16 lg:-mt-20 pt-32 lg:pt-40"
      >
        <Breadcrumbs
          items={[{ label: "First Visit", href: "/first-visit" }]}
          className="mb-6"
        />
        <FadeUp className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-brand-secondary font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            First-Timer Guide
          </p>

          {/* H1 */}
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark leading-tight mb-4">
            Your First Wax — Everything You Need to Know
          </h1>

          {/* Subheadline */}
          <p className="text-brand-dark/65 text-lg leading-relaxed">
            This is your complete guide to the first appointment — from how to
            prepare at home to what happens in the room. No surprises, no
            guessing. Just everything you need to walk in feeling calm and
            confident.
          </p>
        </FadeUp>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* Hero image banner */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        <Image
          src="/images/pages/first-visit-hero.jpg"
          alt="A welcoming first wax appointment at Honey & Bloom"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* What to Expect — existing homepage section */}
      {/* ------------------------------------------------------------------ */}
      <WhatToExpect />

      {/* ------------------------------------------------------------------ */}
      {/* Preparation Tips */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="white" padding="lg">
        <FadeUp>
          <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-4">
              How to Prepare
            </h2>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              A little preparation goes a long way for your comfort and results.
              Here is everything to do — and not do — before you arrive.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start max-w-5xl mx-auto">
          {/* Tip grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prepTips.map((item, i) => (
              <FadeUp key={item.tip} delay={i * 0.08}>
                <div className="bg-white rounded-3xl p-7 h-full shadow-warm border border-brand-primary/8 hover:shadow-warm-lg transition-shadow duration-300">
                  {/* Number badge */}
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-primary text-white text-sm font-bold mb-5 shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-brand-dark mb-2">
                    {item.tip}
                  </h3>
                  <p className="text-brand-dark/60 text-sm leading-[1.7]">
                    {item.detail}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Side image — hidden on mobile */}
          <FadeUp delay={0.1} className="hidden lg:block">
            <div className="relative w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-warm-lg">
              <Image
                src="/images/pages/preparation.jpg"
                alt="Getting ready for your waxing appointment"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* First-Timer FAQ */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="light" padding="lg">
        <FadeUp>
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-4">
              First-Timer Questions
            </h2>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              The questions we hear most from first-timers — answered honestly,
              without the fluff.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={firstTimerFaqs} />
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* First-Timer Package Spotlight — existing homepage section */}
      {/* ------------------------------------------------------------------ */}
      <FirstTimerSpotlight />

      {/* ------------------------------------------------------------------ */}
      {/* Final CTA */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="primary" padding="lg">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-4">
              Ready to Book Your First Visit?
            </h2>
            <p className="text-brand-dark/75 text-lg leading-relaxed mb-8">
              You now know exactly what to expect. The hardest part is scheduling
              — everything after that, we handle. Our first-timers consistently
              tell us they wish they&rsquo;d come in sooner.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <BookingLink variant="cta" className="!bg-white !text-brand-dark hover:!bg-brand-light">
                Book the First&#8209;Timer Package
              </BookingLink>
              <PhoneLink
                phone={clientConfig.phone}
                variant="inline"
                className="font-semibold text-brand-dark hover:text-brand-dark/70"
              >
                Or call {clientConfig.phone}
              </PhoneLink>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-dark/65">
              <span>Licensed Esthetician · {clientConfig.licenseNumber}</span>
              <span>{clientConfig.yearsInBusiness} Years in Business</span>
              <span>{clientConfig.reviewCount} Five-Star Reviews</span>
            </div>
          </div>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
