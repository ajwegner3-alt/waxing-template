"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { clientConfig } from "@/content/client.config";
import { BookingLink, PhoneLink } from "@/components/ui";
import { useNav } from "./NavContext";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/first-visit", label: "First Visit" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileNav() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useNav();

  // Body scroll lock — prevents background scrolling when drawer is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-[#2C2C2C]/40 lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            id="mobile-nav"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-[#FAF3EF] shadow-2xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Top bar: studio name + close button */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2C2C2C]/10">
              <Link
                href="/"
                onClick={() => setIsMobileNavOpen(false)}
                className="font-heading font-semibold text-xl text-[#2C2C2C]"
              >
                {clientConfig.name}
              </Link>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                aria-label="Close navigation menu"
                className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
              >
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <span className="absolute block w-6 h-0.5 bg-[#2C2C2C] rotate-45" />
                  <span className="absolute block w-6 h-0.5 bg-[#2C2C2C] -rotate-45" />
                </span>
              </button>
            </div>

            {/* Nav links — scrollable area */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className="block py-3 px-2 text-lg font-medium text-[#2C2C2C] hover:text-[#8BAB8D] hover:bg-[#2C2C2C]/5 rounded-lg transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA area — always visible, outside scroll region */}
            <div className="px-6 pb-8 pt-4 border-t border-[#2C2C2C]/10 space-y-3">
              <PhoneLink
                phone={clientConfig.phone}
                variant="cta"
                className="w-full justify-center"
              />
              <BookingLink
                variant="cta"
                className="w-full justify-center"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
