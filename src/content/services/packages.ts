import type { Service } from "@/lib/types";

// ---------------------------------------------------------------------------
// Package Service Slugs — import these in other files for relatedServices
// ---------------------------------------------------------------------------

export const PACKAGE_SLUGS = {
  firstTimer: "first-timer-package",
  smoothAllOver: "smooth-all-over-package",
} as const;

// ---------------------------------------------------------------------------
// Package Services
// ---------------------------------------------------------------------------

export const packageServices: Service[] = [
  // --- First-Timer Package ---
  {
    slug: PACKAGE_SLUGS.firstTimer,
    categorySlug: "packages",
    name: "First-Timer Package",
    shortDescription:
      "Your complete first-waxing experience — Brazilian + eyebrow shaping + a complimentary aftercare kit, bundled at a savings of $17 off a-la-carte pricing. Everything you need to feel confident walking in and glowing walking out.",
    heroHeadline: "Your First Wax, Done Right",
    heroSubheadline:
      "Brazilian + eyebrow shaping + complimentary aftercare kit. Designed specifically for first-timers — because your first experience should be a good one.",
    coverImage: "/images/services/first-timer-package.jpg",
    duration: "50–70 minutes",
    price: 70,
    priceDisplay: "$70",
    sensitiveSkintSafe: true,
    painLevel: 4,
    preparation: [
      "For the Brazilian portion: hair should be at least 1/4 inch long (about 3 weeks of growth after your last shave). Longer is fine — we'll trim if needed.",
      "For the eyebrow portion: let your brows grow naturally for at least 2 weeks — don't pluck or thread in that time.",
      "Take an OTC pain reliever (ibuprofen) 30–45 minutes before if you're anxious about the Brazilian.",
      "Come with a clean face and fresh, product-free skin in both areas.",
      "Eat something beforehand — an empty stomach can increase sensitivity.",
      "Wear loose, comfortable clothes you can step out of easily. We'll handle the rest.",
    ],
    aftercare: [
      "We'll send you home with a complimentary aftercare kit that includes everything you need for the first 72 hours.",
      "For the Brazilian area: avoid tight clothing, pools, and the gym for 24 hours.",
      "For your brows: skip makeup on the brow area for the rest of the day.",
      "Begin gentle exfoliation on the bikini area at the 48-hour mark — 2–3 times per week going forward.",
      "Use the soothing serum from your aftercare kit on any areas that feel sensitive or irritated.",
      "Contact us if anything feels off — we want your first experience to be a great one and we're here to help.",
    ],
    ingredients: [
      "Raw honey (core formula used across both services in this package)",
      "Hard wax blend (low-temperature, gentle on sensitive facial and intimate skin)",
      "Chamomile and aloe blend (soothing post-wax application)",
      "Vitamin E oil (included in your take-home aftercare kit)",
      "Fragrance-free soothing serum (take-home, applied day-of and day-after)",
    ],
    whatToExpect:
      "We designed the First-Timer Package because we know that walking into your first waxing appointment — especially for a Brazilian — takes courage. This package is our way of welcoming you properly. We'll start with your eyebrows (the gentlest service we offer) so you get used to the sensation and the environment before moving to the Brazilian. By the time we start the Brazilian, you'll know what to expect and be much more relaxed than if you walked in cold. You'll leave with shaped brows, a smooth bikini area, and a little take-home aftercare kit so you know exactly how to care for your skin over the next 72 hours. Most clients tell us the first wax was nothing like they feared — we hope you'll say the same.",
    faqs: [
      {
        question: "Why does this package start with eyebrows before the Brazilian?",
        answer:
          "Intentional design. Eyebrow waxing is the gentlest service we offer — it lets you experience the warmth of the wax and the sensation of removal in a very mild way before moving to a more sensitive area. By the time we start the Brazilian, you already know what waxing feels like and you'll be much calmer for it.",
        category: "first-timer",
      },
      {
        question: "What's in the aftercare kit?",
        answer:
          "Your complimentary kit includes a travel-size soothing serum for the bikini area, an ingrown hair prevention serum to start using after 48 hours, and a simple one-page care card with day-by-day instructions. Everything you need for the first few days.",
        category: "aftercare",
      },
      {
        question: "What if I decide I want to stop during the Brazilian?",
        answer:
          "You can stop at any time, no questions asked. We'll never pressure you to continue if you're not comfortable. That said, most first-timers push through and are genuinely glad they did — but the choice is always yours.",
        category: "first-timer",
      },
    ],
    relatedServices: [
      "brazilian-wax",
      "eyebrow-wax",
      "extended-bikini-wax",
      "smooth-all-over-package",
    ],
    metaTitle: "First-Timer Wax Package in Omaha | Honey & Bloom",
    metaDescription:
      "First-timer wax package in Omaha — Brazilian + eyebrow shaping + aftercare kit for $70. Save $17 vs. a-la-carte. Book at Honey & Bloom Wax Studio today.",
  },

  // --- Smooth All Over Package ---
  {
    slug: PACKAGE_SLUGS.smoothAllOver,
    categorySlug: "packages",
    name: "Smooth All Over Package",
    shortDescription:
      "The head-to-toe smoothness package — Brazilian, full leg, underarms, and eyebrow shaping all in one session. Our best value for clients who want everything done at once.",
    heroHeadline: "Head to Toe Smooth in One Session",
    heroSubheadline:
      "Brazilian + full legs + underarms + brows — everything done in one appointment at our best bundle price.",
    coverImage: "/images/services/smooth-all-over-package.jpg",
    duration: "2–2.5 hours",
    price: 165,
    priceDisplay: "$165",
    sensitiveSkintSafe: false,
    painLevel: 4,
    preparation: [
      "All areas must have at least 1/4 inch of hair growth — plan for 2–3 weeks of no shaving across your legs, underarms, and bikini area.",
      "Exfoliate your legs and underarms gently 2–3 days before — not the day of.",
      "Come with clean, product-free skin across all areas (no lotion, deodorant, or sunscreen).",
      "Take an OTC pain reliever 30–45 minutes before if you're sensitive.",
      "Wear loose, easy-to-remove clothing — we'll be working on multiple areas over the session.",
      "Eat something beforehand — this is a longer session and you'll want steady energy.",
    ],
    aftercare: [
      "Avoid tight clothing, deodorant, and swimwear for the first 24 hours.",
      "No gym, hot tubs, pools, or saunas for 24 hours across all waxed areas.",
      "Begin gentle exfoliation on legs and the bikini area at 48 hours — maintain 2–3 times per week.",
      "Moisturize your legs and underarms daily starting 24 hours post-wax.",
      "Book your next appointment in 4–5 weeks to maintain results across all areas.",
    ],
    ingredients: [
      "Raw honey (base formula across all service areas in this package)",
      "Hard wax blend (intimate area application — low-temperature, precise)",
      "Strip wax blend (leg application — larger surface coverage)",
      "Arnica extract (reduces soreness on legs and back in extended sessions)",
      "Aloe and vitamin E finishing serum (applied post-service to all waxed areas)",
    ],
    whatToExpect:
      "The Smooth All Over Package is our marathon appointment — and clients who book it regularly absolutely love the payoff. We'll move through your body systematically, starting with your eyebrows (gentlest), then underarms, legs, and finishing with the Brazilian. The entire session runs 2–2.5 hours. We'll check in with you between areas to make sure you're comfortable and staying hydrated. This is a popular pre-vacation service — book it 2–3 days before you travel so your skin has time to settle beautifully.",
    faqs: [
      {
        question: "Is this package good for first-timers?",
        answer:
          "We'd recommend first-timers start with the First-Timer Package (Brazilian + eyebrows) to get comfortable with the process before doing a full-body session. Once you've had your first wax and know what to expect, the Smooth All Over Package is a fantastic next step. If you're set on going all-in from day one, we'll make it work — just let us know it's your first time.",
        category: "first-timer",
      },
      {
        question: "How much do I save vs. booking everything separately?",
        answer:
          "Booking everything a-la-carte (Brazilian $65 + full leg $72 + underarm $25 + eyebrow $22) comes to $184. The Smooth All Over Package is $165 — a savings of $19. Plus you only have to make one appointment and get everything done in a single visit.",
        category: "first-timer",
      },
    ],
    relatedServices: [
      "first-timer-package",
      "brazilian-wax",
      "full-leg-wax",
      "underarm-wax",
    ],
    metaTitle: "Full Body Wax Package in Omaha | Honey & Bloom",
    metaDescription:
      "Full body wax package in Omaha — Brazilian, full legs, underarms, and brows for $165. Save $19 vs. a-la-carte. Book at Honey & Bloom Wax Studio today.",
  },
];
