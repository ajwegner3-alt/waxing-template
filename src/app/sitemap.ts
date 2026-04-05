import type { MetadataRoute } from "next";
import { clientConfig } from "@/content/client.config";
import { allServices } from "@/content/services";
import { getAllPosts } from "@/lib/blog";
import { serviceAreas } from "@/content/service-areas";

/**
 * Programmatic sitemap — Next.js file convention.
 * Generates /sitemap.xml at build time covering all ~31 routes.
 *
 * Route breakdown:
 *   7  static pages (/, /services, /book, /about, /faq, /contact, /first-visit)
 *   2  new static pages (/blog, /service-areas)
 *  14  service detail pages
 *   3  blog post pages
 *   6  service area pages
 * ──────────────────────────
 *  32  total
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = clientConfig.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/first-visit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/service-areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const allPosts = await getAllPosts();

  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceAreaRoutes: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${base}/service-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...serviceAreaRoutes];
}
