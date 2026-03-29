/**
 * Metadata helpers — generates Next.js Metadata objects for individual pages.
 *
 * Usage:
 *   export const metadata = generatePageMetadata({
 *     title: "Brazilian Wax in Omaha | Honey & Bloom Wax Studio",
 *     description: "Comfortable Brazilian waxing in Omaha using honey-based hard wax...",
 *     path: "/services/brazilian-wax",
 *   });
 *
 * The helper reads clientConfig for the siteUrl and business name so
 * individual pages only need to provide the page-specific title, description,
 * and path — not the full URL or site name.
 */

import type { Metadata } from "next";
import { clientConfig } from "@/content/client.config";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Optional OG image path. Defaults to /images/og-default.jpg if not provided. */
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
}: GenerateMetadataOptions): Metadata {
  const url = `${clientConfig.siteUrl}${path}`;
  const ogImage = image ?? `${clientConfig.siteUrl}/images/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(clientConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: clientConfig.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
