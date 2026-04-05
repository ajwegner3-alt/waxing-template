import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionWrapper, FadeUp } from "@/components/ui";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = generatePageMetadata({
  title: "Waxing Tips & Guides | Honey & Bloom",
  description:
    "First-timer guides, skin care tips, and waxing education from the team at Honey & Bloom Wax Studio in Omaha, NE.",
  path: "/blog",
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero */}
      <SectionWrapper bg="light">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} className="mb-6" />
        <FadeUp>
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">
              Waxing Tips &amp; Guides
            </h1>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              Honest answers to the questions first-timers are too nervous to ask —
              and practical tips for clients who want to get the most from every
              appointment. Written by your esthetician, for you.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Post cards */}
      <SectionWrapper bg="white">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-3xl border border-brand-primary/8 bg-white shadow-warm hover:shadow-warm-hover transition-all duration-300 overflow-hidden"
              >
                {/* Cover image */}
                {post.image && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Card body */}
                <div className="p-6 flex flex-col gap-3">
                  {/* Category tag */}
                  {post.tags[0] && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                      {post.tags[0].replace(/-/g, " ")}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="font-heading text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-150 leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-brand-dark/65 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* Date + reading time */}
                  <div className="flex items-center gap-2 text-xs text-brand-dark/45 pt-1 mt-auto">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>
                      {(post as typeof post & { readingTime?: number }).readingTime ?? 3} min read
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
