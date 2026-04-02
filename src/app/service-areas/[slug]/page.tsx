import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceAreas } from "@/content/service-areas";
import { allServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { clientConfig } from "@/content/client.config";
import { generateServiceAreaSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  SectionWrapper,
  FadeUp,
  BookingLink,
  PhoneLink,
  SchemaScript,
} from "@/components/ui";
import {
  ServiceAreaHero,
  LocalContextSection,
  ServiceHighlights,
  LocalHighlightCard,
  CoverageArea,
} from "@/components/service-areas";

// ---------------------------------------------------------------------------
// Static generation — build all 6 neighborhood pages at compile time
// Unknown slugs return 404 (no fallback)
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Metadata — unique per area
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};

  const description = area.heroSubheadline.slice(0, 155);

  return {
    title: `Waxing in ${area.city} | ${clientConfig.name}`,
    description,
    alternates: {
      canonical: `${clientConfig.siteUrl}/service-areas/${area.slug}`,
    },
    openGraph: {
      title: `Waxing in ${area.city} | ${clientConfig.name}`,
      description,
      url: `${clientConfig.siteUrl}/service-areas/${area.slug}`,
      siteName: clientConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Waxing in ${area.city} | ${clientConfig.name}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ---------------------------------------------------------------------------
// Service selection — 1 intimate + 1 face + 1 body for coverage variety
// ---------------------------------------------------------------------------

const HIGHLIGHT_SLUGS = ["brazilian-wax", "eyebrow-wax", "full-leg-wax"];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  // Select 3 highlight services
  const highlightServices = HIGHLIGHT_SLUGS
    .map((s) => allServices.find((svc) => svc.slug === s))
    .filter((svc): svc is NonNullable<typeof svc> => Boolean(svc));

  // Filter testimonials loosely matching this city
  // testimonials.ts stores location as "Omaha, NE" — only Omaha-based testimonials
  // will match for the 4 Omaha neighborhoods; Papillion and Bellevue have none.
  const cityMatch = area.city.split(" ")[0].toLowerCase();
  const areaTestimonials = testimonials.filter(
    (t) => t.location.toLowerCase().includes(cityMatch)
  ).slice(0, 2);

  return (
    <>
      <SchemaScript schema={generateServiceAreaSchema(area, clientConfig)} />

      {/* Breadcrumbs */}
      <SectionWrapper bg="light" padding="sm" className="-mb-2">
        <Breadcrumbs
          items={[
            { label: "Service Areas", href: "/service-areas" },
            { label: area.city, href: `/service-areas/${area.slug}` },
          ]}
        />
      </SectionWrapper>

      {/* Hero */}
      <ServiceAreaHero area={area} />

      {/* Local context — demographics, neighborhoods, weather */}
      <LocalContextSection area={area} />

      {/* Popular services for this area */}
      <ServiceHighlights area={area} services={highlightServices} />

      {/* Local landmark / highlight card */}
      <LocalHighlightCard highlight={area.localHighlight} />

      {/* Testimonials — only render if we found matches */}
      {areaTestimonials.length > 0 && (
        <SectionWrapper bg="white">
          <FadeUp>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-brand-dark">
                What {area.city} Clients Say
              </h2>
              {areaTestimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="rounded-2xl bg-brand-light/60 p-6 border-l-4 border-brand-primary"
                >
                  <p className="text-brand-dark/80 leading-relaxed mb-3 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-brand-dark">{t.author}</span>
                    <span className="text-brand-dark/40">&mdash;</span>
                    <span className="text-brand-dark/60">{t.location}</span>
                    {t.service && (
                      <span className="text-brand-primary text-xs ml-1">
                        ({t.service})
                      </span>
                    )}
                  </footer>
                </blockquote>
              ))}
            </div>
          </FadeUp>
        </SectionWrapper>
      )}

      {/* Nearby areas cross-links */}
      <CoverageArea area={area} />

      {/* Bottom CTA */}
      <SectionWrapper bg="primary">
        <FadeUp className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Serving {area.city} and surrounding areas
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Book online in minutes or give us a call — we&rsquo;d love to see
            you at the studio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookingLink
              variant="cta"
              className="!bg-white !text-brand-primary hover:!bg-brand-light"
            >
              Book Your Appointment
            </BookingLink>
            <PhoneLink
              phone={clientConfig.phone}
              variant="cta"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white/10"
            >
              {clientConfig.phone}
            </PhoneLink>
          </div>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
