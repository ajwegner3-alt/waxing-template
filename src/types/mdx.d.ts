/**
 * MDX module type declarations.
 *
 * Extends the default MDX type to allow named exports (e.g., `metadata`)
 * alongside the default React component export.
 *
 * The `@types/mdx` package provides the base `MDXModule` interface.
 * We augment it here to declare that MDX files may export arbitrary
 * named exports (like `export const metadata = { ... }`).
 */

declare module "*.mdx" {
  import type { ComponentType } from "react";

  // Default export is the MDX React component
  const Component: ComponentType;
  export default Component;

  // Named exports (e.g., `export const metadata = { ... }` in MDX files)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const metadata: any;
}
