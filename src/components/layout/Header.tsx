"use client";
import React, { useState } from "react";
import Link from "next/link";
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
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FAF3EF] shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 lg:h-20 flex items-center justify-between">

          {/* Logo — text only using Fraunces */}
          <Link
            href="/"
            className={`font-heading font-semibold text-xl lg:text-2xl transition-colors duration-300 ${
              scrolled ? "text-[#2C2C2C]" : "text-white"
            }`}
          >
            {clientConfig.name}
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4 ${
                  scrolled
                    ? "text-[#2C2C2C] hover:text-[#8BAB8D]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Book Now CTA — hidden on mobile */}
          <div className="hidden lg:block">
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
                  scrolled ? "bg-[#2C2C2C]" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-[#2C2C2C]" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-[#2C2C2C]" : "bg-white"
                }`}
              />
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
