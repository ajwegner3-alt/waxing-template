import type { Service } from "@/lib/types";
import { BODY_SLUGS } from "./body";
import { INTIMATE_SLUGS } from "./intimate";
import { PACKAGE_SLUGS } from "./packages";

// ---------------------------------------------------------------------------
// Face Service Slugs — import these in other files for relatedServices
// ---------------------------------------------------------------------------

export const FACE_SLUGS = {
  eyebrow: "eyebrow-wax",
  upperLip: "upper-lip-wax",
  chin: "chin-wax",
  fullFace: "full-face-wax",
} as const;

// ---------------------------------------------------------------------------
// Face Waxing Services
// ---------------------------------------------------------------------------

export const faceServices: Service[] = [
  // --- Eyebrow Wax ---
  {
    slug: FACE_SLUGS.eyebrow,
    categorySlug: "face",
    name: "Eyebrow Wax",
    shortDescription:
      "Clean, defined brows that frame your face beautifully. Our honey-based wax removes even the finest hairs with precision — no irritation, no guesswork.",
    heroHeadline: "Perfectly Shaped Brows, Every Time",
    heroSubheadline:
      "Professional eyebrow shaping with gentle honey-based wax. Your brows, just better.",
    coverImage: "/images/services/eyebrow-wax.jpg",
    duration: "15–20 minutes",
    price: 22,
    priceDisplay: "$22",
    sensitiveSkintSafe: true,
    painLevel: 1,
    preparation: [
      "Let your brow hair grow out at least 1/4 inch (about 2 weeks of growth) so the wax has something to grip.",
      "Come with a clean, makeup-free brow area — skip the brow pencil or powder on appointment day.",
      "If you're on retinol or any exfoliating skincare, avoid applying it to the brow area 48 hours before your visit.",
      "Let us know if you've recently had a brow tint or lamination — timing matters.",
    ],
    aftercare: [
      "Avoid touching or rubbing the freshly waxed area for at least 4 hours.",
      "Skip heavy makeup over the brow area on appointment day to reduce clogged pore risk.",
      "No direct sun exposure or tanning beds for 24 hours — freshly waxed skin is more sensitive.",
      "A light fragrance-free moisturizer is fine after 24 hours if the area feels dry.",
      "Book your next appointment every 3–4 weeks to maintain the shape.",
    ],
    ingredients: [
      "Raw honey (soothing and naturally antibacterial)",
      "Beeswax (firm hold, gentle on delicate facial skin)",
      "Chamomile extract (calms redness)",
      "Vitamin E oil (post-wax skin conditioning)",
    ],
    whatToExpect:
      "Eyebrow waxing is one of the gentlest services we offer — most clients describe it as a quick, barely-noticeable snap. You'll lie back while we shape your brows to complement your natural bone structure. The whole service takes about 15 minutes, and you'll walk out with clean, defined arches that look intentional, not overdone.",
    faqs: [
      {
        question: "Will you decide the shape, or do I have input?",
        answer:
          "You have total input. We'll chat about your preferences before we start — whether you want a bold arch, a softer natural shape, or just a cleanup of your existing look. We work with your natural brow growth, not against it.",
        category: "first-timer",
      },
      {
        question: "How long does eyebrow waxing last?",
        answer:
          "Most clients see clean results for 3–4 weeks. Hair grows at different rates, so your schedule may vary a little — but once you're on a regular waxing cycle, growth comes in softer and sparser over time.",
        category: "prep",
      },
    ],
    relatedServices: [FACE_SLUGS.upperLip, FACE_SLUGS.chin, FACE_SLUGS.fullFace],
    metaTitle: "Eyebrow Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Professional eyebrow shaping with gentle honey-based wax in Omaha. Clean, defined brows in 15 minutes. Book your appointment at Honey & Bloom Wax Studio today.",
  },

  // --- Upper Lip Wax ---
  {
    slug: FACE_SLUGS.upperLip,
    categorySlug: "face",
    name: "Upper Lip Wax",
    shortDescription:
      "Smooth, hair-free skin above your lip in under 10 minutes. Our gentle honey formula is safe for sensitive facial skin and won't leave you red.",
    heroHeadline: "Smooth Skin Above Your Lip — No Razor, No Cream",
    heroSubheadline:
      "Fast, precise upper lip waxing with our gentle honey-based formula. Gone in minutes.",
    coverImage: "/images/services/upper-lip-wax.jpg",
    duration: "10 minutes",
    price: 12,
    priceDisplay: "$12",
    sensitiveSkintSafe: true,
    painLevel: 1,
    preparation: [
      "Hair should be at least 1/4 inch long — typically 2–3 weeks of growth after shaving or threading.",
      "Don't apply any lip balm or moisturizer to the upper lip area before your appointment.",
      "Avoid retinol or chemical exfoliants on the lip area for 48 hours prior.",
      "Let us know if you've recently had lip filler — wait at least 2 weeks after injections before waxing this area.",
    ],
    aftercare: [
      "Skip lip products (balms, lipstick, gloss) for at least 4 hours after waxing.",
      "Avoid sun exposure on the area for 24 hours — SPF is your friend on the days after.",
      "Don't exfoliate the upper lip for 48 hours post-wax.",
      "A tiny bit of aloe vera gel can calm any redness right after the service.",
    ],
    ingredients: [
      "Raw honey (gentle on thin lip-area skin)",
      "Beeswax (low-temperature formula for delicate skin)",
      "Lavender oil (anti-inflammatory, soothing)",
      "Vitamin E oil (skin-conditioning)",
    ],
    whatToExpect:
      "The upper lip is one of the quickest services we offer — we're usually done in under 10 minutes. The wax is applied warm, allowed to set, then removed in one smooth motion. You may feel a brief sting, but it fades in seconds. Any light redness typically clears up within an hour, leaving your skin smooth and fresh.",
    faqs: [
      {
        question: "Will waxing my upper lip make the hair grow back thicker?",
        answer:
          "No — that's a myth. Waxing removes hair at the root, and over time regular waxing actually makes hair grow back finer and sparser. Unlike shaving, which cuts the blunt tip of the hair shaft, waxing removes the whole follicle.",
        category: "first-timer",
      },
      {
        question: "What if my skin turns red after?",
        answer:
          "Light redness right after waxing is completely normal and usually fades within 30–60 minutes. We'll apply a soothing post-wax serum before you leave. If you have a big event, plan your wax appointment at least a day beforehand.",
        category: "sensitive-skin",
      },
    ],
    relatedServices: [FACE_SLUGS.eyebrow, FACE_SLUGS.chin, FACE_SLUGS.fullFace],
    metaTitle: "Upper Lip Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Smooth upper lip waxing with gentle honey formula in Omaha. Fast 10-minute service, sensitive-skin safe. Book at Honey & Bloom Wax Studio — results last 3–4 weeks.",
  },

  // --- Chin Wax ---
  {
    slug: FACE_SLUGS.chin,
    categorySlug: "face",
    name: "Chin Wax",
    shortDescription:
      "Get rid of unwanted chin hair quickly and cleanly. Our honey wax grips even the finest peach fuzz without irritating the skin around your jaw.",
    heroHeadline: "Clean Chin, Confident You",
    heroSubheadline:
      "Gentle waxing for chin hair — fine hairs, coarse strays, and everything in between.",
    coverImage: "/images/services/chin-wax.jpg",
    duration: "10–15 minutes",
    price: 12,
    priceDisplay: "$12",
    sensitiveSkintSafe: true,
    painLevel: 2,
    preparation: [
      "Hair should be at least 1/4 inch long — if you've been plucking, let the area grow out for 2–3 weeks.",
      "Skip moisturizer and sunscreen on the chin area on appointment day.",
      "Avoid retinol or acids on the chin for 48 hours before your visit.",
      "Mention any hormonal changes or medications — some can affect skin sensitivity.",
    ],
    aftercare: [
      "Avoid touching or picking at the waxed area for the rest of the day.",
      "Skip makeup on the chin for at least 4 hours to prevent clogged pores.",
      "SPF is important the following day — waxed skin is temporarily more sun-sensitive.",
      "If you notice any ingrown hairs forming in the weeks after, use a gentle exfoliating scrub 2–3 times per week starting 48 hours post-wax.",
    ],
    ingredients: [
      "Raw honey (grips fine and coarse hair equally well)",
      "Beeswax (firm hold without over-adhering to skin)",
      "Tea tree oil (antibacterial, helps prevent post-wax breakouts)",
      "Jojoba oil (balancing, non-comedogenic)",
    ],
    whatToExpect:
      "Chin waxing is quick and straightforward — we'll apply warm honey wax in sections, let it set, and remove hair cleanly. You might feel a brief sting, which is completely normal. The area can look a little pink immediately after, but it settles within the hour. The whole service takes about 10–15 minutes.",
    faqs: [
      {
        question: "Can waxing help with hormonal chin hair?",
        answer:
          "Yes — waxing is one of the most effective ways to manage hormonal chin hair because it removes hair from the root. While it won't change your hormones, consistent waxing keeps the area clean and over time may cause the hair to grow back finer.",
        category: "first-timer",
      },
      {
        question: "I have sensitive skin — is chin waxing safe for me?",
        answer:
          "Our honey-based formula is specifically designed to be gentle on sensitive skin. That said, if you're on certain medications (like Accutane) or have a skin condition in the area, please let us know before your appointment so we can advise you properly.",
        category: "sensitive-skin",
      },
    ],
    relatedServices: [FACE_SLUGS.eyebrow, FACE_SLUGS.upperLip, FACE_SLUGS.fullFace],
    metaTitle: "Chin Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Professional chin waxing with gentle honey formula in Omaha. Removes fine and coarse hair cleanly. Book your appointment at Honey & Bloom Wax Studio today.",
  },

  // --- Full Face Wax ---
  {
    slug: FACE_SLUGS.fullFace,
    categorySlug: "face",
    name: "Full Face Wax",
    shortDescription:
      "The complete facial hair removal experience — brows, lip, chin, and cheeks all in one session. Walk out with a smooth, polished finish that lasts weeks.",
    heroHeadline: "Your Smoothest Face, Head to Toe",
    heroSubheadline:
      "Brows, lip, chin, and cheeks — all in one gentle, honey-wax session.",
    coverImage: "/images/services/full-face-wax.jpg",
    duration: "30–40 minutes",
    price: 55,
    priceDisplay: "$55",
    sensitiveSkintSafe: true,
    painLevel: 3,
    preparation: [
      "All facial hair should be at least 1/4 inch long — plan for 2–3 weeks of growth after any prior waxing or shaving.",
      "Come with a completely clean, product-free face — no moisturizer, sunscreen, or makeup.",
      "Avoid retinol, glycolic acid, or other chemical exfoliants for 48–72 hours before your appointment.",
      "If you're on prescription skincare (especially tretinoin or Accutane), check with your provider before booking.",
      "Plan your appointment at least 2 days before any major event — your skin will look best 24–48 hours after.",
    ],
    aftercare: [
      "Keep your face product-free for the first 4 hours after your appointment.",
      "Avoid active skincare (retinol, acids, vitamin C serums) for 48 hours post-wax.",
      "Wear SPF every day for the week following your wax — freshly waxed skin is more photosensitive.",
      "Resist the urge to exfoliate for 48 hours, then resume your normal routine to help prevent ingrown hairs.",
      "If you experience any breakouts in the days after, that's normal and usually resolves quickly — don't pick.",
    ],
    ingredients: [
      "Raw honey (soothing base for multiple facial zones)",
      "Beeswax (firm hold with adjustable temperature for different areas)",
      "Aloe vera extract (calms full-face redness)",
      "Chamomile and lavender blend (anti-inflammatory for extended service)",
      "Vitamin E oil (post-service skin conditioning)",
    ],
    whatToExpect:
      "A full face wax is a thorough but relaxing service once you settle in. We work methodically from brows to upper lip, chin, sides of the face, and any peach fuzz on your cheeks and forehead. Each area uses a fresh application of warm honey wax. The sensation varies — brows and lip feel the mildest, while cheek peach fuzz is barely noticeable. Most clients love how clean and bright their skin looks afterward.",
    faqs: [
      {
        question: "Does a full face wax include my eyebrows?",
        answer:
          "Yes — full face includes eyebrow shaping, upper lip, chin, cheeks, and the sides of the face. We'll shape your brows as part of the service, so come ready to discuss the look you're going for.",
        category: "first-timer",
      },
      {
        question: "My skin is sensitive — should I do a patch test first?",
        answer:
          "If you've never had a professional wax before and have known skin sensitivities, a patch test is a great idea. Just let us know when you book and we'll schedule a few minutes for that before starting.",
        category: "sensitive-skin",
      },
    ],
    relatedServices: [FACE_SLUGS.eyebrow, FACE_SLUGS.upperLip, FACE_SLUGS.chin],
    metaTitle: "Full Face Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Complete full face waxing in Omaha — brows, lip, chin, and cheeks in one session. Honey-based formula, gentle results. Book at Honey & Bloom Wax Studio today.",
  },
];
