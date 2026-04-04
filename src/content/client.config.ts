/**
 * Client Configuration — Honey & Bloom Wax Studio (Placeholder)
 *
 * This file is the single operator-editable config for a waxing studio deployment.
 * Replace all placeholder values with the actual client's information.
 *
 * DUAL-CHANGE WARNING:
 * Color hex values below MUST stay in sync with the @theme block in:
 *   src/app/globals.css
 *
 * If you update a color here, update the corresponding --color-brand-* token
 * in globals.css. These are two intentionally separate files.
 *
 * Token → field mapping:
 *   --color-brand-primary        → colors.primary       (#D4A574)
 *   --color-brand-primary-dark   → colors.primaryDark   (#B8895A)
 *   --color-brand-primary-light  → colors.primaryLight  (#EDD4B2)
 *   --color-brand-secondary      → colors.secondary     (#7A9E76)
 *   --color-brand-secondary-light→ colors.secondaryLight(#96B592)
 *   --color-brand-dark           → colors.dark          (#333333)
 *   --color-brand-light          → colors.light         (#FAF3EF)
 *   --color-brand-gold           → colors.gold          (#D4A574)
 *   --color-brand-urgency        → colors.urgency       (#F8EAE1)
 */

import type { WaxingClientConfig } from "@/lib/types";

export const clientConfig: WaxingClientConfig = {
  // ---------------------------------------------------------------------------
  // Identity
  // ---------------------------------------------------------------------------
  name: "Honey & Bloom Wax Studio",
  tagline: "Waxing that actually feels good",
  phone: "(402) 555-0140",
  email: "hello@honeyandbloomomaha.com",
  address: {
    street: "4567 Leavenworth Street",
    city: "Omaha",
    state: "Nebraska",
    zip: "68105",
  },

  // ---------------------------------------------------------------------------
  // Trust Signals
  // ---------------------------------------------------------------------------
  yearsInBusiness: 6,
  reviewCount: 247,
  reviewAverage: 4.9,
  licenseNumber: "NE-ESTH-2020-4871",
  googleBusinessUrl: "https://www.google.com/maps/place/honey-bloom-wax-studio-omaha",

  // ---------------------------------------------------------------------------
  // Brand Colors
  // DUAL-CHANGE: These hex values must match @theme tokens in globals.css.
  // ---------------------------------------------------------------------------
  colors: {
    primary: "#D4A574",       // warm honey gold — primary CTA color
    primaryDark: "#B8895A",   // deeper gold for hover states
    primaryLight: "#EDD4B2",  // light gold for subtle backgrounds, ghost states
    secondary: "#7A9E76",     // muted sage green — complementary accent
    secondaryLight: "#96B592",// lighter sage for hover/inactive states
    dark: "#333333",          // charcoal body text (LOCKED by user decision)
    light: "#FAF3EF",         // blush cream — page background
    gold: "#FFC30B",          // bright yellow-gold — trust signals, stars, accents
    urgency: "#F8EAE1",       // soft peach-blush for promo banners
  },

  // ---------------------------------------------------------------------------
  // Typography
  // ---------------------------------------------------------------------------
  fonts: {
    heading: "Fraunces",          // loaded via next/font/google in layout.tsx
    body: "Plus Jakarta Sans",    // loaded via next/font/google in layout.tsx
  },

  // ---------------------------------------------------------------------------
  // Logo & Imagery
  // ---------------------------------------------------------------------------
  logo: "/images/logo.svg", // replace with actual logo

  // ---------------------------------------------------------------------------
  // Geography
  // ---------------------------------------------------------------------------
  primaryCity: "Omaha",
  primaryState: "Nebraska",
  serviceRadius: "Serving the Greater Omaha Area",

  // ---------------------------------------------------------------------------
  // Hours
  // ---------------------------------------------------------------------------
  hours: {
    monday: "10:00 AM \u2013 7:00 PM",
    tuesday: "10:00 AM \u2013 7:00 PM",
    wednesday: "10:00 AM \u2013 7:00 PM",
    thursday: "10:00 AM \u2013 7:00 PM",
    friday: "10:00 AM \u2013 6:00 PM",
    saturday: "9:00 AM \u2013 5:00 PM",
    sunday: "Closed",
  },

  // ---------------------------------------------------------------------------
  // Online Booking
  // External booking system URL — swap to Vagaro/Booksy/etc. for real client
  // ---------------------------------------------------------------------------
  bookingUrl: "https://booking.honeyandbloomomaha.com",

  // ---------------------------------------------------------------------------
  // Social Media
  // ---------------------------------------------------------------------------
  instagramUrl: "https://instagram.com/honeyandbloomomaha",
  facebookUrl: "https://facebook.com/honeyandbloomomaha",
  tiktokUrl: "https://tiktok.com/@honeyandbloomomaha",

  // ---------------------------------------------------------------------------
  // Analytics
  // ---------------------------------------------------------------------------
  googleAnalyticsId: "", // add G-XXXXXXXXXX when ready

  // ---------------------------------------------------------------------------
  // Pricing & Business Identity
  // ---------------------------------------------------------------------------
  showPricing: true,
  priceRange: "$$",
  foundingYear: 2019,
  siteUrl: "https://honeyandbloomomaha.com",

  // ---------------------------------------------------------------------------
  // Waxing Specialties
  // ---------------------------------------------------------------------------
  waxFormula: "honey-based hard wax",
  waxingSpecialties: [
    "Sensitive skin formulas",
    "First-timer friendly",
    "Brazilian wax specialists",
    "Natural honey-based wax",
  ],
};
