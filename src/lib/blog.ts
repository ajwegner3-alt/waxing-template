/**
 * Blog utility functions — accessor layer for MDX blog content.
 *
 * Pattern mirrors src/content/services/index.ts:
 *   getAllPosts() → sorted list of BlogPost metadata
 *   getPostBySlug() → single post metadata (or undefined)
 *
 * MDX files export `metadata` as a TypeScript const (not YAML frontmatter).
 *
 * NOTE: Dynamic template literal imports fail in Turbopack because the bundler
 * cannot statically analyze `import(\`@/content/blog/${slug}.mdx\`)`.
 * We use explicit static imports here instead, collected into a map.
 */

import type { BlogPost } from "@/lib/types";

// Explicit static imports — required for Turbopack/webpack static analysis
import * as post1 from "@/content/blog/first-brazilian-wax-what-to-expect.mdx";
import * as post2 from "@/content/blog/waxing-vs-shaving-sensitive-skin.mdx";
import * as post3 from "@/content/blog/how-long-does-hair-need-to-be-for-waxing.mdx";

// ---------------------------------------------------------------------------
// Canonical slug list — add new posts here when content is created
// ---------------------------------------------------------------------------

export const POST_SLUGS = [
  "first-brazilian-wax-what-to-expect",
  "waxing-vs-shaving-sensitive-skin",
  "how-long-does-hair-need-to-be-for-waxing",
] as const;

// ---------------------------------------------------------------------------
// Internal slug → module map (static, for getPostBySlug)
// ---------------------------------------------------------------------------

const postModules: Record<string, { metadata: BlogPost }> = {
  "first-brazilian-wax-what-to-expect": post1 as unknown as { metadata: BlogPost },
  "waxing-vs-shaving-sensitive-skin": post2 as unknown as { metadata: BlogPost },
  "how-long-does-hair-need-to-be-for-waxing": post3 as unknown as { metadata: BlogPost },
};

// ---------------------------------------------------------------------------
// Accessor Functions
// ---------------------------------------------------------------------------

/**
 * Returns all blog posts sorted by date descending (newest first).
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = POST_SLUGS.map((slug) => postModules[slug].metadata);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Returns a single blog post metadata by slug, or undefined if not found.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return postModules[slug]?.metadata;
}
