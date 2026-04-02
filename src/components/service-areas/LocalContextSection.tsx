import type { ServiceArea } from "@/lib/types";
import { SectionWrapper, FadeUp } from "@/components/ui";

interface LocalContextSectionProps {
  area: ServiceArea;
}

/**
 * LocalContextSection — Genuinely local context for each neighborhood page.
 *
 * Displays population, neighborhood pills, a localContext paragraph,
 * and a weatherContext callout/aside. This section is what differentiates
 * service area pages from each other — the content must be specific to the
 * neighborhood, not just a city-name swap.
 */
export function LocalContextSection({ area }: LocalContextSectionProps) {
  return (
    <SectionWrapper bg="light">
      <FadeUp>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Population + neighborhoods row */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-sm text-brand-dark/60">
              <span className="font-semibold text-brand-dark">Population:</span>{" "}
              {area.population}
            </div>
            <div className="flex flex-wrap gap-2">
              {area.neighborhoods.map((hood) => (
                <span
                  key={hood}
                  className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-brand-primary/15 text-brand-primary"
                >
                  {hood}
                </span>
              ))}
            </div>
          </div>

          {/* Local context paragraph */}
          <p className="text-brand-dark/80 leading-relaxed text-base lg:text-lg">
            {area.localContext}
          </p>

          {/* Weather/lifestyle context callout */}
          <aside className="border-l-4 border-brand-secondary pl-5 py-2">
            <p className="text-brand-dark/70 leading-relaxed italic text-sm lg:text-base">
              {area.weatherContext}
            </p>
          </aside>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
