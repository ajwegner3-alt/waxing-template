import Link from "next/link";
import type { ServiceArea } from "@/lib/types";
import { serviceAreas } from "@/content/service-areas";
import { SectionWrapper, FadeUp } from "@/components/ui";

interface CoverageAreaProps {
  area: ServiceArea;
}

/**
 * CoverageArea — "Also Serving Nearby Areas" cross-linking section.
 *
 * Renders nearbyAreas as Links ONLY when a matching service area page exists.
 * Unmatched names (e.g. "Benson", "Downtown Omaha") render as plain text
 * to prevent broken links.
 *
 * Slug matching: slugify each nearbyArea name (toLowerCase, spaces → hyphens)
 * and check against serviceAreas array.
 */
export function CoverageArea({ area }: CoverageAreaProps) {
  const existingSlugs = new Set(serviceAreas.map((a) => a.slug));

  function toSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <SectionWrapper bg="white">
      <FadeUp>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">
            Also Serving Nearby Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {area.nearbyAreas.map((nearbyName) => {
              const slug = toSlug(nearbyName);
              const hasPage = existingSlugs.has(slug);

              return hasPage ? (
                <Link
                  key={nearbyName}
                  href={`/service-areas/${slug}`}
                  className="inline-block px-4 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-sm font-medium hover:bg-brand-primary hover:text-white transition-all duration-200"
                >
                  {nearbyName}
                </Link>
              ) : (
                <span
                  key={nearbyName}
                  className="inline-block px-4 py-2 rounded-full border border-brand-dark/15 text-brand-dark/60 text-sm"
                >
                  {nearbyName}
                </span>
              );
            })}
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
