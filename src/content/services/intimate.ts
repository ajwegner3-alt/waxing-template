import type { Service } from "@/lib/types";
import { BODY_SLUGS } from "./body";
import { PACKAGE_SLUGS } from "./packages";

// ---------------------------------------------------------------------------
// Intimate Service Slugs — import these in other files for relatedServices
// ---------------------------------------------------------------------------

export const INTIMATE_SLUGS = {
  bikini: "bikini-wax",
  extendedBikini: "extended-bikini-wax",
  brazilian: "brazilian-wax",
} as const;

// ---------------------------------------------------------------------------
// Intimate Waxing Services
// ---------------------------------------------------------------------------

export const intimateServices: Service[] = [
  // --- Bikini Wax ---
  {
    slug: INTIMATE_SLUGS.bikini,
    categorySlug: "intimate",
    name: "Bikini Wax",
    shortDescription:
      "Clean up the bikini line for a neat, polished look. We remove hair outside your underwear line so you stay comfortable all season long.",
    heroHeadline: "Clean Lines, Zero Razor Burn",
    heroSubheadline:
      "Bikini line waxing that keeps everything neat — gentle, precise, and done in minutes.",
    coverImage: "/images/services/bikini-wax.jpg",
    duration: "20–25 minutes",
    price: 38,
    priceDisplay: "$38",
    sensitiveSkintSafe: true,
    painLevel: 4,
    preparation: [
      "Hair should be at least 1/4 inch long — resist shaving for 2–3 weeks before your appointment.",
      "Wear underwear you're comfortable with — we work just outside the line, so standard underwear is fine.",
      "Gently exfoliate the bikini area 2 days before your appointment to lift dead skin.",
      "Avoid scheduling during your period if you have sensitivity concerns — the area is more tender at that time.",
      "Come with clean, dry skin — skip lotion or oil on the bikini line on appointment day.",
    ],
    aftercare: [
      "Avoid tight waistbands, leggings, or swimwear for 24 hours after waxing.",
      "No hot tubs, pools, or the ocean for 24 hours — open follicles are vulnerable to bacteria.",
      "Skip the gym and any activity that creates friction or sweat in the area for 24 hours.",
      "Start gentle exfoliation 48 hours post-wax and continue 2–3 times per week to prevent ingrown hairs.",
      "A light, fragrance-free moisturizer is fine to apply after the first 24 hours.",
    ],
    ingredients: [
      "Raw honey (gentle base for sensitive bikini area skin)",
      "Beeswax (precise hold for defined line work)",
      "Chamomile extract (anti-inflammatory, calms redness)",
      "Tea tree oil (antibacterial, prevents post-wax irritation)",
    ],
    whatToExpect:
      "Bikini waxing removes hair outside the underwear line — nothing inside or underneath. You'll stay in your underwear for the whole service. The wax is applied warm in small sections and removed quickly. The bikini line is one of the more sensitive areas on the body, so there is some sting, but the service is quick and most clients say they feel fine within a few minutes of it being done.",
    faqs: [
      {
        question: "What's the difference between bikini and Brazilian?",
        answer:
          "A bikini wax only removes hair outside your underwear line — it's a 'cleanup' of what would show in a bathing suit. A Brazilian removes most or all hair from the front, between the legs, and the back. The bikini wax is a great starting point if you're new to intimate waxing.",
        category: "first-timer",
      },
      {
        question: "I've never had a bikini wax — what should I wear?",
        answer:
          "Wear underwear you feel comfortable in — regular bikini-cut underwear works great. We'll keep you covered throughout the service and only work outside your underwear line. You don't need to do anything special.",
        category: "privacy",
      },
    ],
    relatedServices: [
      "extended-bikini-wax",
      "brazilian-wax",
      "underarm-wax",
      "half-leg-wax",
    ],
    metaTitle: "Bikini Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Professional bikini waxing in Omaha — clean lines, no razor burn, results last 3–4 weeks. Gentle honey formula. Book at Honey & Bloom Wax Studio today.",
  },

  // --- Extended Bikini Wax ---
  {
    slug: INTIMATE_SLUGS.extendedBikini,
    categorySlug: "intimate",
    name: "Extended Bikini Wax",
    shortDescription:
      "More coverage than a standard bikini wax — we remove hair a little further inside the bikini line and clean up the top. A great middle ground before going full Brazilian.",
    heroHeadline: "More Coverage, Still Comfortable",
    heroSubheadline:
      "Extended bikini waxing — more than a cleanup, less than a Brazilian. Your call, your comfort level.",
    coverImage: "/images/services/extended-bikini-wax.jpg",
    duration: "25–35 minutes",
    price: 50,
    priceDisplay: "$50",
    sensitiveSkintSafe: true,
    painLevel: 4,
    preparation: [
      "Hair should be at least 1/4 inch long — 2–3 weeks of growth after shaving.",
      "Gently exfoliate the bikini area 2 days before your appointment.",
      "Wear comfortable underwear — we'll work both inside and just outside the line.",
      "Skip the gym and heavy sweating 24 hours before your appointment.",
      "Avoid waxing during your period if you have elevated sensitivity.",
    ],
    aftercare: [
      "Avoid tight clothing, swimwear, and anything that creates friction for 24 hours.",
      "No pools, hot tubs, or saunas for 24 hours — skin needs time to close up after waxing.",
      "Begin exfoliating the area gently at the 48-hour mark and keep it up 2–3 times per week.",
      "Use a fragrance-free, gentle lotion on the area after 24 hours.",
      "Avoid sexual activity for 24 hours — the skin needs time to calm down.",
    ],
    ingredients: [
      "Raw honey (core formula — gentle enough for sensitive intimate skin)",
      "Beeswax (controlled hold for precise extended-line work)",
      "Witch hazel (astringent — tightens pores post-wax)",
      "Aloe vera extract (cooling and anti-inflammatory)",
      "Tea tree oil (antibacterial protection)",
    ],
    whatToExpect:
      "Extended bikini waxing goes a step further than the standard bikini line — we remove hair slightly inside the bikini area and can reduce coverage at the top based on your preference. Think of it as a customizable option between the bikini and Brazilian. You'll be partially undressed for this service and covered with a towel throughout. The area is sensitive, but the process is methodical and we move through it quickly.",
    faqs: [
      {
        question: "How is extended bikini different from Brazilian?",
        answer:
          "Extended bikini removes more hair than a basic bikini wax — going further inside the line and reducing coverage on top — but doesn't remove all the hair the way a Brazilian does. It's a great option if you want more coverage than a basic cleanup but aren't ready for the full Brazilian experience.",
        category: "first-timer",
      },
      {
        question: "Is this service more painful than a regular bikini wax?",
        answer:
          "Slightly, since we're working further into a more sensitive area. But the technique is the same — warm honey wax applied in small sections and removed quickly. Most clients find the extended service very manageable, especially if they've already had a standard bikini wax before.",
        category: "pain",
      },
    ],
    relatedServices: ["bikini-wax", "brazilian-wax", "half-leg-wax"],
    metaTitle: "Extended Bikini Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Extended bikini waxing in Omaha — more coverage than a standard bikini, gentle honey formula. Book at Honey & Bloom Wax Studio. Results last 3–4 weeks.",
  },

  // --- Brazilian Wax ---
  {
    slug: INTIMATE_SLUGS.brazilian,
    categorySlug: "intimate",
    name: "Brazilian Wax",
    shortDescription:
      "The complete intimate waxing experience — everything removed, front to back, for that clean, confident feeling that lasts weeks. Our most requested service.",
    heroHeadline: "The Brazilian That Doesn't Feel Like a Big Deal",
    heroSubheadline:
      "Clean, complete intimate waxing by a professional who's done this a thousand times. You're in good hands.",
    coverImage: "/images/services/brazilian-wax.jpg",
    duration: "35–50 minutes",
    price: 65,
    priceDisplay: "$65",
    sensitiveSkintSafe: true,
    painLevel: 4,
    preparation: [
      "Hair must be at least 1/4 inch long (about 3 weeks of growth after shaving). Longer is fine — we can trim if needed.",
      "Gently exfoliate the bikini area 2–3 days before — not the day of — to lift dead skin and improve wax adhesion.",
      "Take an over-the-counter pain reliever (like ibuprofen) 30–45 minutes before if you're nervous about discomfort.",
      "Skip the gym and avoid being sweaty before your appointment — come clean and fresh.",
      "Avoid waxing during your period if possible — hormone changes increase skin sensitivity. However, if you use a tampon or menstrual cup, we can still proceed if you're comfortable.",
      "Eat something beforehand — don't come in on an empty stomach.",
      "Wear comfortable, loose-fitting underwear or pants you can easily step out of.",
    ],
    aftercare: [
      "Avoid tight clothing, thongs, and restrictive underwear for 24–48 hours.",
      "No pools, hot tubs, saunas, or the ocean for 24 hours — the area needs to close up first.",
      "Skip the gym and any intense activity for 24 hours.",
      "Avoid sexual activity for 24 hours after waxing.",
      "Begin gentle exfoliation 48 hours post-wax and continue 2–3 times per week to prevent ingrown hairs.",
      "Use a fragrance-free, gentle moisturizer on the area (not inside) after 24 hours.",
      "Avoid sun exposure to the waxed area for 48 hours.",
    ],
    ingredients: [
      "Raw honey (core formula — antibacterial and soothing for intimate skin)",
      "Beeswax (low-temperature hard wax for precise removal with minimal skin trauma)",
      "Chamomile and calendula blend (calms inflammation in sensitive areas)",
      "Vitamin E oil (accelerates skin recovery post-service)",
      "Witch hazel (post-wax pore tightening and astringent)",
    ],
    whatToExpect:
      "Your first Brazilian can feel intimidating — that's completely normal, and we hear it every day. Here's the honest truth: we see this all day, every day, and there's nothing to feel embarrassed about. You'll undress from the waist down and be covered with a towel throughout. We work in small sections using a hard wax that wraps around each hair and removes it cleanly from the root. Yes, there are moments of real sensation — especially in the most sensitive areas — but each strip is done in seconds. Most first-timers are shocked by how manageable it is. Many clients feel the second and third wax is dramatically easier than the first, as hair grows back finer over time.",
    faqs: [
      {
        question: "I'm nervous about my first Brazilian — what should I know?",
        answer:
          "Being nervous is completely normal and we expect it. A few things that help: don't shave beforehand (we need length to wax), take ibuprofen 30 minutes before if you want, and know that we're total professionals who do this every single day. You can stop at any time and we won't pressure you. Most first-timers walk out wondering why they waited so long.",
        category: "first-timer",
      },
      {
        question: "How long does a Brazilian wax last?",
        answer:
          "Your first Brazilian typically lasts 3–4 weeks. As you get on a regular waxing schedule, hair grows back finer and sparser, and many regular clients extend to 5–6 weeks between appointments. Consistency is key — the more regularly you wax, the better your results get.",
        category: "prep",
      },
      {
        question: "Does it hurt the whole time?",
        answer:
          "Not at all. The discomfort is limited to the actual removal of each wax strip — which takes only a second. Between strips, there's no pain at all. The most sensitive spots are the inner areas, which we get to toward the end of the service when you're already settled in. Breathing through each strip helps a lot.",
        category: "pain",
      },
    ],
    relatedServices: [
      "extended-bikini-wax",
      "bikini-wax",
      "half-leg-wax",
      "underarm-wax",
    ],
    metaTitle: "Brazilian Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Professional Brazilian waxing in Omaha with gentle honey-based wax. First-timer friendly, results last 3–5 weeks. Book at Honey & Bloom Wax Studio today.",
  },
];
