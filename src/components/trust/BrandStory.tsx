/**
 * BrandStory — Origin story for Honey & Bloom Wax Studio.
 *
 * Server Component — no "use client".
 * 2-3 paragraphs about Maya starting the studio, honey-based wax, Omaha roots.
 * Max-w-3xl prose column for comfortable reading width.
 */

import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";

export function BrandStory() {
  return (
    <SectionWrapper bg="white" padding="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
        {/* Left: text */}
        <FadeUp>
          <div className="ornament-divider text-brand-primary mb-8 justify-start">
            <span className="text-brand-primary/40 text-lg">&#10045;</span>
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-8">
            How It Started
          </h2>

          <div className="space-y-6 text-brand-dark/65 leading-[1.8]">
            <p>
              Honey &amp; Bloom started with a simple frustration. After years working in
              Bay Area waxing studios, Maya kept noticing the same thing: clients —
              especially first-timers — walking through the door visibly tense,
              bracing for something painful and embarrassing. The experience was
              efficient, professional, and completely impersonal. That gap between
              what waxing could feel like and what most studios actually delivered
              became an obsession she couldn&apos;t shake.
            </p>

            <p>
              When she moved to Omaha to be closer to family in 2019, Maya saw
              an opening. She wanted to build a studio where first-timers weren&apos;t
              just tolerated — they were the point. Everything at Honey &amp; Bloom was
              designed around that nervous first-timer: the warm lighting, the
              unhurried pace, the honey-based hard wax formula that&apos;s gentler on
              skin than conventional wax, and a commitment to talking every client
              through each step before doing anything. No surprises, no rushing,
              no judgment.
            </p>

            <p>
              Six years later, the studio has grown entirely through word of mouth.
              The clients who came in nervous and left smiling told their friends.
              Those friends told theirs. That&apos;s still how it works today — and
              it&apos;s still the thing Maya is most proud of. Every appointment is
              designed around the same question: what would make this person feel
              completely taken care of? The answer tends to be pretty simple:
              slow down, communicate, and use great products.
            </p>
          </div>
        </FadeUp>

        {/* Right: brand story image */}
        <FadeUp delay={0.1}>
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-lg">
            <Image
              src="/images/pages/brand-story.jpg"
              alt="Inside Honey & Bloom Wax Studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
