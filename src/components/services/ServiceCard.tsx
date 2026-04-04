import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/types";
import { FadeUp } from "@/components/ui";

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

/**
 * ServiceCard — Server Component
 *
 * Compact card for the /services menu page.
 * Displays service name, priceDisplay (never raw price), duration,
 * and a 2-line truncated shortDescription.
 * Links to the individual service detail page at /services/[slug].
 */
export function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  return (
    <FadeUp delay={delay}>
      <Link
        href={`/services/${service.slug}`}
        className="group block rounded-xl border border-brand-primary/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Cover image — flush with card edges at top and sides */}
        <div className="aspect-[16/10] relative overflow-hidden rounded-t-xl -mx-5 -mt-5 mb-4">
          <Image
            src={service.coverImage}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            alt={service.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-brand-dark text-base leading-snug group-hover:text-brand-primary transition-colors duration-200">
            {service.name}
          </h3>
          <span className="shrink-0 text-sm font-semibold text-brand-primary">
            {service.priceDisplay}
          </span>
        </div>

        {/* Duration */}
        <p className="text-xs text-brand-dark/50 mb-3">{service.duration}</p>

        {/* Short description — clamped to 2 lines */}
        <p className="text-sm text-brand-dark/70 line-clamp-2 mb-4">
          {service.shortDescription}
        </p>

        {/* Learn More hint */}
        <div className="flex items-center gap-1 text-xs font-medium text-brand-primary group-hover:gap-2 transition-all duration-200">
          <span>Learn more</span>
          {/* Inline arrow SVG — no icon dependency */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </Link>
    </FadeUp>
  );
}
