/**
 * Waxing Template — TypeScript Interfaces
 * Single source of truth for all content types.
 *
 * WaxingClientConfig is the operator configuration interface.
 * All content interfaces below it define the data structures for
 * services, staff, FAQs, testimonials, service areas, and blog posts.
 *
 * DUAL-CHANGE WARNING: color values in WaxingClientConfig.colors must match
 * @theme tokens in globals.css.
 */

// ---------------------------------------------------------------------------
// Client Configuration
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Service Content
// ---------------------------------------------------------------------------

/**
 * Top-level grouping for services (e.g. "Face Waxing", "Body Waxing",
 * "Intimate Waxing", "Packages"). Used to generate category landing pages
 * and navigation groupings.
 */
export interface ServiceCategory {
  /** URL-safe slug, e.g. "face", "body", "intimate", "packages" */
  slug: string;
  /** Display name, e.g. "Face Waxing" */
  name: string;
  /** Short marketing phrase for category card */
  tagline: string;
  /** Paragraph description for category page */
  description: string;
  /** Path to category hero/cover image (relative to /public) */
  coverImage: string;
  /** Inline SVG identifier or icon name */
  iconName: string;
  /** Slugs of services belonging to this category */
  serviceSlugs: string[];
}

/**
 * Pain level scale for waxing services.
 * 1 = gentle (eyebrow), 5 = intense (Brazilian).
 * Displayed as a visual badge on service cards and detail pages.
 */
export type PainLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Skin sensitivity descriptor for waxing services.
 * Used to surface "sensitive skin safe" badges on service cards.
 */
export type SkinSensitivity = "all" | "sensitive" | "normal";

/**
 * An individual waxing service.
 * This is the key type that differs from medspa-template Treatment.
 * Waxing-specific fields: sensitiveSkintSafe, painLevel, preparation[],
 * aftercare[], ingredients[] — none of these exist in Treatment.
 */
export interface Service {
  /** URL-safe slug, e.g. "brazilian-wax" */
  slug: string;
  /** Must match a ServiceCategory.slug */
  categorySlug: string;
  /** Display name, e.g. "Brazilian Wax" */
  name: string;
  /** 1-2 sentences for service cards and meta */
  shortDescription: string;
  /** H1 for the service detail page */
  heroHeadline: string;
  /** Supporting subheadline */
  heroSubheadline: string;
  /** Path to hero/cover image (relative to /public) */
  coverImage: string;
  /** Typical session duration, e.g. "30–45 minutes" */
  duration: string;
  /** Base price in dollars, null if showPricing is false in clientConfig */
  price: number | null;
  /** Formatted price string, e.g. "From $65" */
  priceDisplay: string;

  // --- Waxing-specific fields ---
  /** True if the service uses a sensitive-skin formula */
  sensitiveSkintSafe: boolean;
  /** 1 (gentle) to 5 (intense) — displayed as a visual badge */
  painLevel: PainLevel;
  /** Ordered list of pre-appointment preparation instructions */
  preparation: string[];
  /** Ordered list of post-appointment aftercare instructions */
  aftercare: string[];
  /** Key wax formula ingredients displayed on the service page */
  ingredients: string[];

  // --- Content ---
  /** Paragraph: first-visit narrative for this specific service */
  whatToExpect: string;
  /** Service-specific FAQs */
  faqs: FAQ[];
  /** Slugs of related services for "You May Also Like" section (min 2) */
  relatedServices: string[];

  // --- SEO ---
  /** Under 60 chars, "[Service] in [City] | [Studio]" format */
  metaTitle: string;
  /** 150-155 chars, includes primary keyword + CTA */
  metaDescription: string;
}

// ---------------------------------------------------------------------------
// Staff
// ---------------------------------------------------------------------------

/**
 * An esthetician or staff member profile.
 * Simplified from medspa-template Provider — no medical credentials,
 * no NPI numbers, no board certifications for medical procedures.
 */
export interface Staff {
  /** URL-safe slug, e.g. "jessica-bloom" */
  slug: string;
  /** Full display name, e.g. "Jessica Bloom" */
  name: string;
  /** Professional title, e.g. "Lead Esthetician & Studio Owner" */
  title: string;
  /** Multi-paragraph bio (each string is one paragraph) */
  bio: string[];
  /** Waxing specialties, e.g. ["Brazilian waxing", "Sensitive skin"] */
  specialties: string[];
  /** Certifications, e.g. ["Licensed Esthetician", "Honey Wax Certified"] */
  certifications: string[];
  /** Total years of esthetics experience */
  yearsExperience: number;
  /** Path to headshot image (relative to /public) */
  headshot: string;
  /** Optional Instagram handle — shown on profile card if provided */
  instagramHandle?: string;
  /** Whether this staff member is currently accepting new clients */
  acceptingNewClients: boolean;
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

/**
 * A question-and-answer pair for FAQ sections.
 * The optional category field groups FAQs by anxiety type in accordion UIs,
 * specifically addressing the emotional concerns first-time waxing clients have.
 */
export interface FAQ {
  question: string;
  answer: string;
  /**
   * Anxiety category for accordion grouping.
   * Helps first-timers find answers to their specific concerns quickly.
   */
  category?:
    | "first-timer"
    | "pain"
    | "prep"
    | "privacy"
    | "hygiene"
    | "aftercare"
    | "sensitive-skin";
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

/**
 * A single client testimonial.
 * Used on the homepage, service area pages, and service detail pages.
 */
export interface Testimonial {
  /** Full quote text */
  quote: string;
  /** First name and last initial only, e.g. "Sarah M." */
  author: string;
  /** City only (no full address), e.g. "Omaha, NE" */
  location: string;
  /** Star rating (1–5) */
  rating: number;
  /** Optional — which service the testimonial is about */
  service?: string;
}

// ---------------------------------------------------------------------------
// Service Areas
// ---------------------------------------------------------------------------

/**
 * A city/neighborhood service area landing page.
 * Maps to /service-areas/[slug].
 * Content must be genuinely localized — not just city-name swaps.
 */
export interface ServiceArea {
  /** URL-safe slug, e.g. "midtown-omaha" */
  slug: string;
  /** City display name, e.g. "Midtown Omaha" */
  city: string;
  /** State abbreviation or full name */
  state: string;
  /** County name for schema.org areaServed */
  county: string;
  /** H1 headline for this area page */
  heroHeadline: string;
  /** Supporting subheadline */
  heroSubheadline: string;
  /**
   * 2–4 sentences of genuinely local context: demographics, lifestyle,
   * nearby landmarks, or community characteristics.
   */
  localContext: string;
  /** Population estimate as a display string, e.g. "~25,000" */
  population: string;
  /** Notable neighborhoods within this city */
  neighborhoods: string[];
  /** Adjacent cities/communities to mention for geo coverage */
  nearbyAreas: string[];
  /** 1–3 testimonials from clients in this area */
  testimonials: Testimonial[];
  /** A local landmark, event, or neighborhood highlight for authenticity */
  localHighlight: {
    title: string;
    description: string;
    neighborhood: string;
  };
  /**
   * 1–2 sentences about local lifestyle and how it connects to waxing/self-care.
   * Makes service area pages feel genuinely local rather than templated.
   */
  weatherContext: string;
  /** Schema.org structured data fields */
  schema: {
    /** Value for schema.org areaServed property */
    areaServed: string;
  };
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

/**
 * Blog post metadata (frontmatter).
 * Full body content is stored in MDX/markdown files.
 * Maps to /blog/[slug].
 */
export interface BlogPost {
  /** URL-safe slug matching the markdown filename */
  slug: string;
  /** Post title */
  title: string;
  /** ISO date string, e.g. "2025-03-15" */
  date: string;
  /** 150–155 character meta description (also used as card excerpt) */
  description: string;
  /** Author display name */
  author: string;
  /** Topic tags for filtering and related post suggestions */
  tags: string[];
  /** Path to featured/hero image (relative to /public) */
  image: string;
  /**
   * Service slug this post is primarily about.
   * Used for internal linking: post → service page.
   * Named "serviceSlug" (not "treatmentSlug") — waxing template uses Service, not Treatment.
   */
  serviceSlug: string;
}
