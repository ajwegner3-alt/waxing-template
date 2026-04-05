/**
 * AboutHero — Compact branded header for the /about page.
 *
 * Server Component — no "use client".
 * Breadcrumb, eyebrow, H1, and tagline. Max-w-2xl content constraint.
 */

import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { clientConfig } from "@/content/client.config";

export function AboutHero() {
  return (
    <>
      <SectionWrapper bg="light" padding="md">
        <Breadcrumbs
          items={[{ label: "About", href: "/about" }]}
          className="mb-6"
        />
        <FadeUp className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-brand-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Our Story
          </p>

          {/* H1 */}
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark leading-tight mb-4">
            A Studio Built Around You
          </h1>

          {/* Tagline */}
          <p className="text-brand-dark/65 text-lg leading-relaxed">
            {clientConfig.tagline}
          </p>
        </FadeUp>
      </SectionWrapper>

      {/* Full-width hero image banner */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        <Image
          src="/images/pages/about-hero.jpg"
          alt="Honey & Bloom Wax Studio — warm, welcoming, professional"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
    </>
  );
}
