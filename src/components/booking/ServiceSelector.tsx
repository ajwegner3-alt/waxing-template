// ServiceSelector — no "use client" needed (child of BookingFlow client boundary)
// Multi-select service cards grouped by category, with a running total footer.

import type { Service } from "@/lib/types";
import { serviceCategories } from "@/content/services";

interface ServiceSelectorProps {
  services: Service[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
}

// ---------------------------------------------------------------------------
// Selectable service card
// ---------------------------------------------------------------------------

interface SelectableCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}

function SelectableServiceCard({ service, isSelected, onToggle }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      className={[
        "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-brand-primary bg-brand-primary/5 shadow-sm"
          : "border-brand-dark/10 bg-white hover:border-brand-primary/40 hover:bg-brand-primary/5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-brand-dark leading-snug">{service.name}</p>
          <p className="text-sm text-brand-dark/60 mt-1 leading-snug">
            {service.shortDescription}
          </p>
          <p className="text-xs text-brand-dark/40 mt-1">{service.duration}</p>
        </div>

        {/* Price + selection indicator */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="font-semibold text-brand-dark text-sm">
            {service.price !== null ? `$${service.price}` : service.priceDisplay}
          </span>
          <span
            className={[
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
              isSelected
                ? "bg-brand-primary border-brand-primary"
                : "border-brand-dark/20 bg-white",
            ].join(" ")}
            aria-hidden="true"
          >
            {isSelected && (
              <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3">
                <path
                  d="M1 4l3 3 5-6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// ServiceSelector
// ---------------------------------------------------------------------------

export function ServiceSelector({
  services,
  selectedSlugs,
  onToggle,
}: ServiceSelectorProps) {
  // Running total — guard nullable price with ?? 0
  const selectedServices = services.filter((s) => selectedSlugs.includes(s.slug));
  const runningTotal = selectedServices.reduce(
    (sum, s) => sum + (s.price ?? 0),
    0,
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-brand-dark">
          Choose your services
        </h2>
        <p className="text-brand-dark/60 mt-1">
          Select one or more services. You can combine multiple in a single
          appointment.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {serviceCategories.map((category) => {
          const categoryServices = services.filter(
            (s) => s.categorySlug === category.slug,
          );
          if (categoryServices.length === 0) return null;

          return (
            <section key={category.slug} aria-labelledby={`cat-${category.slug}`}>
              <h3
                id={`cat-${category.slug}`}
                className="text-xs font-semibold uppercase tracking-widest text-brand-dark/50 mb-3"
              >
                {category.name}
              </h3>
              <div className="space-y-3">
                {categoryServices.map((service) => (
                  <SelectableServiceCard
                    key={service.slug}
                    service={service}
                    isSelected={selectedSlugs.includes(service.slug)}
                    onToggle={() => onToggle(service.slug)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Running total footer — only visible when at least one service is selected */}
      {selectedSlugs.length > 0 && (
        <div className="mt-6 p-4 bg-brand-light rounded-xl flex items-center justify-between">
          <span className="text-sm text-brand-dark/70">
            {selectedSlugs.length} service{selectedSlugs.length !== 1 ? "s" : ""}{" "}
            selected
          </span>
          <span className="font-bold text-brand-dark text-lg">
            Total: ${runningTotal}
          </span>
        </div>
      )}
    </div>
  );
}
