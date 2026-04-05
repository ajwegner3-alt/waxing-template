"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { clientConfig } from "@/content/client.config";
import { BookingLink } from "@/components/ui";
import { useNav } from "./NavContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/first-visit", label: "First Visit" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useNav();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  // Only use white/transparent text on the homepage (dark hero).
  // All other pages use dark text at all times.
  const useLightText = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useLightText ? "bg-transparent" : "bg-[#FAF3EF] shadow-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="h-16 lg:h-20 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">

          {/* Logo — left-aligned */}
          <Link
            href="/"
            className={`font-heading font-semibold text-xl lg:text-2xl transition-colors duration-300 ${
              useLightText ? "text-white" : "text-[#2C2C2C]"
            }`}
          >
            {clientConfig.name}
          </Link>

          {/* Desktop nav — centered via grid column */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4 ${
                  useLightText
                    ? "text-white/90 hover:text-white"
                    : "text-[#2C2C2C] hover:text-[#8BAB8D]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Book Now CTA — right-aligned */}
          <div className="hidden lg:flex justify-end">
            <BookingLink variant="header" />
          </div>

          {/* Mobile hamburger — hidden on desktop */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  useLightText ? "bg-white" : "bg-[#2C2C2C]"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  useLightText ? "bg-white" : "bg-[#2C2C2C]"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  useLightText ? "bg-white" : "bg-[#2C2C2C]"
                }`}
              />
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
