import type { Metadata } from "next";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { SectionWrapper, FadeUp } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm, ContactInfo } from "@/components/contact";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us | Honey & Bloom Wax Studio",
  description:
    "Have a question about waxing? Reach out to Honey & Bloom in Omaha. Call, visit, or send a message. We respond within 24 hours.",
  path: "/contact",
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <SectionWrapper bg="light" padding="sm">
        <Breadcrumbs
          items={[{ label: "Contact", href: "/contact" }]}
          className="mb-6"
        />
        <FadeUp>
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
              Get in Touch
            </h1>
            <p className="text-brand-dark/65 text-lg leading-relaxed">
              Questions about a service, nervous before your first appointment, or
              just want to say hi? We&apos;re happy to hear from you.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Hero image banner */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        <Image
          src="/images/pages/contact-hero.jpg"
          alt="Honey & Bloom Wax Studio — get in touch"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Two-column contact section */}
      <SectionWrapper bg="white" padding="md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: form */}
          <FadeUp>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-brand-dark mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </FadeUp>

          {/* Right: contact info */}
          <FadeUp delay={0.08}>
            <ContactInfo />
          </FadeUp>
        </div>
      </SectionWrapper>
    </>
  );
}
