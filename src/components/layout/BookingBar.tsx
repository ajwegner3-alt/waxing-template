"use client";
import { clientConfig } from "@/content/client.config";
import { BookingLink, PhoneLink } from "@/components/ui";

/**
 * BookingBar — fixed-bottom mobile booking bar.
 *
 * Always visible on mobile (lg:hidden hides on desktop).
 * Two conversion paths side by side: Call + Book Now.
 * z-40 sits below MobileNav drawer (z-50) so the drawer always renders on top.
 * env(safe-area-inset-bottom) inline style prevents iPhone home bar overlap.
 */
export function BookingBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FAF3EF] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] border-t border-[#8BAB8D]/20"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-4 py-3 min-h-[72px]">
        <PhoneLink
          phone={clientConfig.phone}
          variant="cta"
          className="flex-[2] justify-center text-sm"
        />
        <BookingLink
          variant="cta"
          className="flex-[3] justify-center text-sm"
        />
      </div>
    </div>
  );
}
