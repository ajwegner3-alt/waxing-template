"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBookingDrawer } from "./BookingDrawerContext";
import { BookingFlow } from "./BookingFlow";
import { allServices } from "@/content/services";
import { staff } from "@/content/staff";

// ---------------------------------------------------------------------------
// Close button icon
// ---------------------------------------------------------------------------

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-5 h-5"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// BookingDrawer
// ---------------------------------------------------------------------------

/**
 * BookingDrawer — slide-in panel from the right side.
 *
 * z-index: backdrop z-50, drawer panel z-50 (above BookingBar z-40 and
 * MobileNav backdrop z-40). Body scroll is locked while open.
 *
 * Width: full on mobile, 440px on sm+.
 * Must be rendered as a sibling of main content in root layout.
 */
export function BookingDrawer() {
  const { isOpen, closeDrawer } = useBookingDrawer();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/40 z-50"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Book your appointment"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-dark/10 flex-shrink-0">
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-dark leading-tight">
                  Book an appointment
                </h2>
                <p className="text-brand-dark/50 text-xs mt-0.5">Takes about 2 minutes</p>
              </div>
              <button
                onClick={closeDrawer}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-brand-dark/60 hover:text-brand-dark hover:bg-brand-dark/5 transition-colors duration-150"
                aria-label="Close booking drawer"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable booking flow content */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <BookingFlow services={allServices} esthetician={staff[0]} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
