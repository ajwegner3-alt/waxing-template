import type { ServiceArea } from "@/lib/types";
import { SectionWrapper, FadeUp } from "@/components/ui";

interface LocalHighlightCardProps {
  highlight: ServiceArea["localHighlight"];
}

/**
 * LocalHighlightCard — Showcase a local landmark or neighborhood highlight.
 *
 * This section grounds the page in genuine local identity — a specific
 * cultural institution, shopping destination, military base, or recreation
 * hub that is authentically tied to that neighborhood.
 *
 * bg="blush" matches the waxing template's alternating warm section pattern.
 */
export function LocalHighlightCard({ highlight }: LocalHighlightCardProps) {
  return (
    <SectionWrapper bg="blush">
      <FadeUp>
        <div className="max-w-3xl mx-auto">
          {/* Neighborhood label */}
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-brand-secondary/20 text-brand-secondary mb-4">
            {highlight.neighborhood}
          </span>

          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-4">
            {highlight.title}
          </h2>

          <p className="text-brand-dark/75 leading-relaxed text-base lg:text-lg">
            {highlight.description}
          </p>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
