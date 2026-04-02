import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
import { getServiceBySlug } from "@/content/services";
import { clientConfig } from "@/content/client.config";
import { generateBlogPostSchema } from "@/lib/schema";
import type { BlogPost } from "@/lib/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  SectionWrapper,
  FadeUp,
  BookingLink,
  PhoneLink,
  SchemaScript,
} from "@/components/ui";

// ---------------------------------------------------------------------------
// Static MDX imports — Turbopack requires explicit static imports
// ---------------------------------------------------------------------------

import Post1, { metadata as meta1 } from "@/content/blog/first-brazilian-wax-what-to-expect.mdx";
import Post2, { metadata as meta2 } from "@/content/blog/waxing-vs-shaving-sensitive-skin.mdx";
import Post3, { metadata as meta3 } from "@/content/blog/how-long-does-hair-need-to-be-for-waxing.mdx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PostMeta = BlogPost & { readingTime: number };

// Map slug → { component, metadata }
const postRegistry: Record<
  string,
  { PostContent: React.ComponentType; postMeta: PostMeta }
> = {
  "first-brazilian-wax-what-to-expect": {
    PostContent: Post1,
    postMeta: meta1 as PostMeta,
  },
  "waxing-vs-shaving-sensitive-skin": {
    PostContent: Post2,
    postMeta: meta2 as PostMeta,
  },
  "how-long-does-hair-need-to-be-for-waxing": {
    PostContent: Post3,
    postMeta: meta3 as PostMeta,
  },
};

// ---------------------------------------------------------------------------
// Static generation — build all blog post pages at compile time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Metadata — unique per post
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = postRegistry[slug];
  if (!entry) return {};
  const { postMeta } = entry;
  return generatePageMetadata({
    title: `${postMeta.title} | Honey & Bloom`,
    description: postMeta.description,
    path: `/blog/${slug}`,
    image: postMeta.image,
  });
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = postRegistry[slug];

  if (!entry) {
    notFound();
  }

  const { PostContent, postMeta } = entry;
  const relatedService = getServiceBySlug(postMeta.serviceSlug);
  const schema = generateBlogPostSchema(postMeta, clientConfig);

  return (
    <>
      <SchemaScript schema={schema} />

      {/* Post header */}
      <SectionWrapper bg="light">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: postMeta.title, href: `/blog/${slug}` },
          ]}
          className="mb-6"
        />
        <FadeUp>
          <div className="max-w-3xl">
            {/* Category tag */}
            {postMeta.tags[0] && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
                {postMeta.tags[0].replace(/-/g, " ")}
              </span>
            )}

            {/* Headline */}
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-dark mb-4 leading-tight">
              {postMeta.title}
            </h1>

            {/* Post meta row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-brand-dark/50">
              <span>By {postMeta.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={postMeta.date}>{formatDate(postMeta.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{postMeta.readingTime} min read</span>
            </div>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Post body */}
      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <article
              className="
                prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:text-brand-dark
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
                prose-p:text-brand-dark/80 prose-p:leading-relaxed
                prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-brand-dark
                prose-ul:text-brand-dark/80 prose-ol:text-brand-dark/80
                prose-li:my-1
                prose-blockquote:border-brand-primary prose-blockquote:text-brand-dark/70
                prose-hr:border-brand-primary/20
              "
            >
              <PostContent />
            </article>
          </FadeUp>

          {/* Related service card */}
          {relatedService && (
            <FadeUp className="mt-12 pt-8 border-t border-brand-primary/20">
              <div className="rounded-2xl bg-brand-light/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">
                  Related Service
                </p>
                <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">
                  {relatedService.name}
                </h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed mb-4">
                  {relatedService.shortDescription}
                </p>
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                  See service details
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeUp>
          )}
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper bg="primary">
        <FadeUp className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready to book your appointment?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            We&apos;d love to take care of you. Book online in minutes or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookingLink variant="cta" className="!bg-white !text-brand-primary hover:!bg-brand-light" />
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
