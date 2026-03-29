/**
 * TrustBar — 4-stat horizontal trust bar immediately below the hero.
 *
 * Server Component — no "use client".
 * Stats pulled directly from clientConfig — no hardcoded values.
 *
 * Stat layout: 2-col mobile, 4-col desktop.
 * Uses Fraunces (font-heading) for stat values per template convention.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { clientConfig } from "@/content/client.config";

function StarIcon({ className }: { className?: string }) {
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
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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

interface StatItemProps {
  value: React.ReactNode;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="font-heading text-3xl lg:text-4xl font-semibold text-white">
        {value}
      </div>
      <div className="text-sm text-white/70 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <SectionWrapper bg="dark" padding="sm">
      <FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Stat 1: Google rating */}
          <StatItem
            value={
              <span className="inline-flex items-center gap-1.5">
                <StarIcon className="w-6 h-6 text-brand-gold flex-shrink-0" />
                {clientConfig.reviewAverage}
              </span>
            }
            label="Google Rating"
          />

          {/* Stat 2: Years in business */}
          <StatItem
            value={`${clientConfig.yearsInBusiness}+`}
            label="Years of Experience"
          />

          {/* Stat 3: Review / client count */}
          <StatItem
            value={`${clientConfig.reviewCount}+`}
            label="Happy Clients"
          />

          {/* Stat 4: Licensed & certified */}
          <StatItem
            value={
              <span className="inline-flex items-center gap-1.5">
                <ShieldIcon className="w-6 h-6 text-brand-secondary flex-shrink-0" />
                <span className="text-2xl lg:text-3xl">✓</span>
              </span>
            }
            label="Licensed &amp; Certified"
          />
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
