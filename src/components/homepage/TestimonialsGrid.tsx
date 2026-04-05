/**
 * TestimonialsGrid — Static 3-card testimonial grid.
 *
 * Server Component — no "use client".
 * Displays the first 3 testimonials from the content layer.
 * No carousel — static grid only. Clean, high-trust layout.
 * Cards use FadeUp with staggered delay.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/content/testimonials";

const featured = testimonials.slice(0, 3);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TestimonialsGrid() {
  return (
    <SectionWrapper bg="light" padding="lg" className="wave-divider-white">
      {/* Section header */}
      <FadeUp>
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <div className="ornament-divider text-brand-primary mb-6">
            <span className="text-brand-primary/40 text-xl">&#10045;</span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-4">
            What Our Clients Say
          </h2>
          <p className="text-brand-dark/65 text-lg leading-relaxed">
            Real stories from real first-timers — and the regulars who never
            looked back.
          </p>
        </div>
      </FadeUp>

      {/* Testimonial card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map((testimonial, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <figure className="flex flex-col bg-white rounded-3xl border border-brand-primary/8 p-8 gap-4 h-full shadow-warm hover:shadow-warm-lg transition-shadow duration-300">
              {/* Decorative quote mark */}
              <div className="font-heading text-4xl text-brand-primary/15 leading-none -mb-2">&ldquo;</div>

              {/* Star rating */}
              <StarRating rating={testimonial.rating} size="sm" />

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="text-brand-dark/70 text-[15px] leading-relaxed italic">
                  {testimonial.quote}
                </p>
              </blockquote>

              {/* Author */}
              <figcaption className="border-t border-brand-primary/8 pt-4 mt-auto">
                <div className="font-semibold text-brand-dark text-sm">
                  {testimonial.author}
                </div>
                <div className="text-brand-dark/45 text-xs mt-0.5">
                  {testimonial.service}
                </div>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
