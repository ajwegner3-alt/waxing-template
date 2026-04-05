import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { serviceAreas } from "@/content/service-areas";
import { clientConfig } from "@/content/client.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionWrapper, FadeUp } from "@/components/ui";

export const metadata: Metadata = {
  title: `Waxing Service Areas in Omaha | ${clientConfig.name}`,
  description:
    "Honey & Bloom Wax Studio serves Midtown Omaha, West Omaha, South Omaha, North Omaha, Papillion, and Bellevue. Book a waxing appointment near you.",
  alternates: {
    canonical: `${clientConfig.siteUrl}/service-areas`,
  },
  openGraph: {
    title: `Waxing Service Areas in Omaha | ${clientConfig.name}`,
    description:
      "Professional waxing for every Omaha-area neighborhood. Book online today.",
    url: `${clientConfig.siteUrl}/service-areas`,
    siteName: clientConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Waxing Service Areas in Omaha | ${clientConfig.name}`,
    description:
      "Professional waxing for every Omaha-area neighborhood. Book online today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServiceAreasIndexPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <SectionWrapper bg="light" padding="sm" className="mb-0">
        <Breadcrumbs
          items={[{ label: "Service Areas", href: "/service-areas" }]}
        />
      </SectionWrapper>

      {/* Hero image banner */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        <Image
          src="/images/pages/service-areas-hero.jpg"
          alt="Omaha and surrounding area neighborhoods served by Honey & Bloom"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Header */}
      <SectionWrapper bg="light" padding="md">
        <FadeUp>
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">
              Omaha Area Waxing Services
            </h1>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              Honey &amp; Bloom serves neighborhoods across the Omaha metro
              and southern Sarpy County. Find your area below and learn what
              makes each community unique — then book your appointment in
              minutes.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Neighborhood card grid */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceAreas.map((area, i) => (
            <FadeUp key={area.slug} delay={i * 0.05}>
              <Link
                href={`/service-areas/${area.slug}`}
                className="group block rounded-2xl border border-brand-light bg-brand-light/40 p-6 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-200 h-full"
              >
                {/* State/county label */}
                <span className="inline-block text-xs text-brand-dark/50 mb-3 font-medium uppercase tracking-wide">
                  {area.county}
                </span>

                <h2 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors duration-200">
                  {area.city}
                </h2>

                <p className="text-brand-dark/65 text-sm leading-relaxed mb-4">
                  {area.heroSubheadline}
                </p>

                <div className="flex items-center justify-between text-xs text-brand-dark/50">
                  <span>Pop. {area.population}</span>
                  <span className="text-brand-primary font-medium group-hover:underline">
                    View area &rarr;
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
