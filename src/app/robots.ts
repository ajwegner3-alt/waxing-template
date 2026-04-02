import type { MetadataRoute } from "next";
import { clientConfig } from "@/content/client.config";

/**
 * Programmatic robots.txt — Next.js file convention.
 * Blanket allow for all crawlers with sitemap reference.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${clientConfig.siteUrl}/sitemap.xml`,
  };
}
