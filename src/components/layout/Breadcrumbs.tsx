import Link from "next/link";
import { clientConfig } from "@/content/client.config";
import { SchemaScript } from "@/components/ui";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /** Interior items only — "Home" is prepended automatically */
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs — text trail with "/" separators.
 *
 * Server component (no "use client").
 * "Home" is prepended automatically — consumers pass only interior items.
 * BreadcrumbList JSON-LD is auto-injected via SchemaScript.
 *
 * Usage: <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Brazilian Wax", href: "/services/brazilian-wax" }]} />
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const all = [{ label: "Home", href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${clientConfig.siteUrl}${item.href}`,
    })),
  };

  return (
    <>
      <SchemaScript schema={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center flex-wrap gap-1 text-sm text-[#2C2C2C]/60">
          {all.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1">
              {index < all.length - 1 ? (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-[#8BAB8D] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-[#2C2C2C]/30">/</span>
                </>
              ) : (
                <span className="text-[#2C2C2C] font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
