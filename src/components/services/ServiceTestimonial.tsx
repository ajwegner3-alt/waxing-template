import type { Testimonial } from "@/lib/types";
import { FadeUp, StarRating } from "@/components/ui";

interface ServiceTestimonialProps {
  testimonial: Testimonial | null;
}

/**
 * ServiceTestimonial — Server Component
 *
 * Inline testimonial quote card for service detail pages.
 * Returns null when no matching testimonial exists for this service.
 * Wrapped in FadeUp for entrance animation on scroll.
 */
export function ServiceTestimonial({ testimonial }: ServiceTestimonialProps) {
  if (testimonial === null) return null;

  return (
    <FadeUp>
      <blockquote className="bg-brand-light rounded-3xl p-8 md:p-10 relative shadow-warm border border-brand-primary/6">
        {/* Decorative opening quote mark */}
        <span
          className="absolute top-4 left-6 text-6xl leading-none text-brand-primary/15 font-serif select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <div className="relative">
          <p className="italic text-brand-dark/80 leading-relaxed text-base md:text-lg pt-4">
            {testimonial.quote}
          </p>

          <footer className="mt-4 flex items-center gap-3">
            <div>
              <cite className="not-italic font-semibold text-brand-dark text-sm">
                {testimonial.author}
              </cite>
              {testimonial.location && (
                <p className="text-xs text-brand-dark/50 mt-0.5">
                  {testimonial.location}
                </p>
              )}
            </div>
            <div className="ml-auto">
              <StarRating rating={testimonial.rating} size="sm" />
            </div>
          </footer>
        </div>
      </blockquote>
    </FadeUp>
  );
}
