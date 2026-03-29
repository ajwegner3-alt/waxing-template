/**
 * Waxing Template — TypeScript Interfaces
 * Single source of truth for all content types.
 *
 * WaxingClientConfig is defined here for Plan 01.
 * All content interfaces (Service, Staff, FAQ, etc.) are added in Plan 02.
 *
 * DUAL-CHANGE WARNING: color values in WaxingClientConfig.colors must match
 * @theme tokens in globals.css.
 */

export interface WaxingClientConfig {
  // --- Identity ---
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  // --- Trust Signals ---
  yearsInBusiness: number;
  reviewCount: number;
  reviewAverage: number;
  googleBusinessUrl: string;

  // --- Brand Colors ---
  /**
   * DUAL-CHANGE: These hex values MUST match @theme tokens in globals.css.
   * primary       → --color-brand-primary
   * primaryDark   → --color-brand-primary-dark
   * primaryLight  → --color-brand-primary-light
   * secondary     → --color-brand-secondary
   * secondaryLight→ --color-brand-secondary-light
   * dark          → --color-brand-dark
   * light         → --color-brand-light
   * gold          → --color-brand-gold
   * urgency       → --color-brand-urgency
   */
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryLight: string;
    dark: string;
    light: string;
    gold: string;
    urgency: string;
  };

  // --- Typography ---
  fonts: {
    heading: string;
    body: string;
  };

  // --- Logo ---
  logo: string;

  // --- Geography ---
  primaryCity: string;
  primaryState: string;
  serviceRadius: string;

  // --- Hours ---
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  // --- Booking ---
  /** External booking system URL — no Vagaro/Booksy hard-coding */
  bookingUrl: string;

  // --- Social Media ---
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;

  // --- Analytics ---
  googleAnalyticsId: string;

  // --- Business Identity ---
  showPricing: boolean;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  foundingYear: number;
  siteUrl: string;

  // --- Waxing Specialties ---
  /** Primary wax formula description, e.g. "honey-based hard wax" */
  waxFormula: string;
  /** Key selling points for first-timer messaging */
  waxingSpecialties: string[];
}
