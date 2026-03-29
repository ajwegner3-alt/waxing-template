import type { Service } from "@/lib/types";
import { FACE_SLUGS } from "./face";
import { INTIMATE_SLUGS } from "./intimate";

// ---------------------------------------------------------------------------
// Body Service Slugs — import these in other files for relatedServices
// ---------------------------------------------------------------------------

export const BODY_SLUGS = {
  underarm: "underarm-wax",
  fullArm: "full-arm-wax",
  halfLeg: "half-leg-wax",
  fullLeg: "full-leg-wax",
  back: "back-wax",
} as const;

// ---------------------------------------------------------------------------
// Body Waxing Services
// ---------------------------------------------------------------------------

export const bodyServices: Service[] = [
  // --- Underarm Wax ---
  {
    slug: BODY_SLUGS.underarm,
    categorySlug: "body",
    name: "Underarm Wax",
    shortDescription:
      "Silky-smooth underarms without the daily razor routine. Our honey wax removes even the most stubborn underarm hair cleanly at the root.",
    heroHeadline: "Ditch the Daily Razor",
    heroSubheadline:
      "Smooth underarms for up to 4 weeks with our gentle honey-based wax formula.",
    coverImage: "/images/services/underarm-wax.jpg",
    duration: "15–20 minutes",
    price: 25,
    priceDisplay: "$25",
    sensitiveSkintSafe: true,
    painLevel: 2,
    preparation: [
      "Hair should be at least 1/4 inch long — about 2 weeks of growth after your last shave.",
      "Come with clean, dry underarms — skip deodorant on appointment day.",
      "Avoid applying any lotion or oil to the underarm area before your visit.",
      "If your skin is irritated from shaving, wait until it has fully healed before booking.",
    ],
    aftercare: [
      "Wait 24 hours before applying deodorant or antiperspirant — your pores are open right after waxing.",
      "Wear loose, breathable clothing (natural fabrics like cotton) for the rest of the day.",
      "Avoid the gym and heavy sweating for 24 hours post-wax.",
      "No hot showers, steam rooms, or saunas for the first 24 hours.",
      "After 48 hours, you can gently exfoliate to prevent ingrown hairs.",
    ],
    ingredients: [
      "Raw honey (antibacterial, gentle on thin underarm skin)",
      "Beeswax (strong grip on coarse underarm hair)",
      "Calendula extract (soothes post-wax sensitivity)",
      "Coconut oil (post-wax moisture barrier)",
    ],
    whatToExpect:
      "Underarm waxing takes about 15 minutes and is quicker than most people expect. The wax is applied warm to both underarms and removed in smooth, confident strokes. There's a brief sting when the wax is removed — most clients compare it to a quick snap. You'll walk out with hair-free underarms that stay smooth for 3–4 weeks.",
    faqs: [
      {
        question: "Does underarm waxing hurt a lot?",
        answer:
          "The underarm is one of the more sensitive body areas, but the service itself is so fast that most clients find it very manageable. The discomfort lasts just a split second. After your first few waxes, hair grows back finer and the sensation decreases significantly.",
        category: "pain",
      },
      {
        question: "Can I wax my underarms if I use clinical-strength deodorant?",
        answer:
          "Yes — just make sure you don't apply it on appointment day. Clinical deodorants can leave residue that affects wax adhesion. Come with freshly washed, product-free underarms and you'll be fine.",
        category: "prep",
      },
    ],
    relatedServices: [BODY_SLUGS.fullArm, BODY_SLUGS.halfLeg, INTIMATE_SLUGS.bikini],
    metaTitle: "Underarm Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Smooth underarm waxing in Omaha with honey-based formula. Results last up to 4 weeks. Book your appointment at Honey & Bloom Wax Studio — no razor needed.",
  },

  // --- Full Arm Wax ---
  {
    slug: BODY_SLUGS.fullArm,
    categorySlug: "body",
    name: "Full Arm Wax",
    shortDescription:
      "Smooth arms from shoulder to wrist — a clean, polished look that lasts weeks. Great before a big event or just as part of your regular routine.",
    heroHeadline: "Smooth Arms, Shoulder to Wrist",
    heroSubheadline:
      "Full arm waxing with honey-based wax — clean, even results that last up to 4 weeks.",
    coverImage: "/images/services/full-arm-wax.jpg",
    duration: "35–45 minutes",
    price: 52,
    priceDisplay: "$52",
    sensitiveSkintSafe: false,
    painLevel: 3,
    preparation: [
      "Arm hair should be at least 1/4 inch long for best wax adhesion.",
      "Come with clean, product-free arms — no lotion, oil, or self-tanner.",
      "If you tan or use self-tanner regularly, it won't affect the wax, but freshly applied tanner may smear.",
      "Hydrate your skin in the days leading up to your appointment for cleaner wax removal.",
    ],
    aftercare: [
      "Avoid applying lotion or products to your arms for the first 4 hours.",
      "Skip the gym and heavy sweating for 24 hours — open follicles and sweat don't mix well.",
      "Wear loose, long sleeves if you're heading into direct sunlight on appointment day.",
      "Begin gentle exfoliation after 48 hours to prevent ingrown hairs.",
      "Moisturize your arms daily starting 24 hours post-wax for the smoothest results.",
    ],
    ingredients: [
      "Raw honey (core moisturizing base)",
      "Beeswax (strong grip for denser arm hair)",
      "Sunflower seed oil (lightweight post-wax conditioner)",
      "Green tea extract (antioxidant, reduces redness)",
    ],
    whatToExpect:
      "Full arm waxing covers from your shoulder down to your wrist in sections. We'll work in overlapping strips, removing hair in the direction of growth for the cleanest results. The service takes 35–45 minutes. Your arms will feel noticeably smooth immediately, and you'll likely see stragglers cleared up in your follow-up visit as hair syncs to the same growth cycle.",
    faqs: [
      {
        question: "Will my arm hair grow back thicker after waxing?",
        answer:
          "No — that's a common misconception. Waxing removes hair at the root, and over time consistent waxing causes arm hair to grow back finer, softer, and more sparse. Unlike shaving, which creates a blunt edge that feels stubbly, waxed hair grows back with a tapered tip.",
        category: "first-timer",
      },
      {
        question: "I have fair skin with dark arm hair — will I get stubble quickly?",
        answer:
          "Dark hair is completely normal to wax, and the results are the same regardless of hair color. After the first couple of waxes, you'll settle into a 3–4 week cycle as all the hair synchronizes to the same growth phase.",
        category: "prep",
      },
    ],
    relatedServices: [BODY_SLUGS.underarm, BODY_SLUGS.halfLeg, BODY_SLUGS.fullLeg],
    metaTitle: "Full Arm Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Full arm waxing in Omaha with gentle honey formula — shoulder to wrist, smooth for weeks. Book your appointment at Honey & Bloom Wax Studio today.",
  },

  // --- Half Leg Wax ---
  {
    slug: BODY_SLUGS.halfLeg,
    categorySlug: "body",
    name: "Half Leg Wax",
    shortDescription:
      "Smooth lower legs without committing to a full-leg service. Perfect for maintaining the areas you shave most — clean, precise, and long-lasting.",
    heroHeadline: "Smooth From the Knee Down",
    heroSubheadline:
      "Lower leg waxing that keeps you feeling summer-ready all year — no razor, no stubble.",
    coverImage: "/images/services/half-leg-wax.jpg",
    duration: "30–40 minutes",
    price: 42,
    priceDisplay: "$42",
    sensitiveSkintSafe: false,
    painLevel: 3,
    preparation: [
      "Hair should be at least 1/4 inch long — typically 2 weeks of growth after your last shave.",
      "Arrive with clean, dry legs and no lotion, oil, or self-tanner applied.",
      "Exfoliate your legs gently 2–3 days before your appointment for the cleanest wax.",
      "Avoid tight-fitting clothes on your lower legs after the appointment — wear loose pants or a skirt.",
    ],
    aftercare: [
      "Avoid lotion, oil, or sunscreen on your lower legs for the first 4 hours.",
      "Wear loose, breathable clothing for the rest of the day.",
      "Skip hot showers, baths, or saunas for 24 hours.",
      "Start gentle exfoliation after 48 hours to prevent ingrown hairs — 2–3 times per week going forward.",
      "Moisturize daily once the 24-hour window has passed.",
    ],
    ingredients: [
      "Raw honey (moisturizing base for larger surface area)",
      "Beeswax (even coverage on curved leg surface)",
      "Almond oil (skin-softening post-wax blend)",
      "Arnica extract (reduces post-wax soreness)",
    ],
    whatToExpect:
      "Half leg waxing covers from your ankle to just above the knee. We'll work in sections to make sure every area gets thorough coverage. The service takes about 30–40 minutes. Most clients describe the sensation as a quick sting that fades immediately — the shin area tends to feel slightly more intense than the back of the calf, but nothing that slows us down.",
    faqs: [
      {
        question: "What's included in 'half leg' — is it the upper or lower leg?",
        answer:
          "Half leg covers the lower leg — from ankle to knee. If you want the upper leg (knee to hip) or the full leg, we have services for both. Most clients who shave regularly find the lower leg is where they want the most coverage.",
        category: "first-timer",
      },
      {
        question: "How long does half leg waxing last?",
        answer:
          "Expect smooth legs for 3–4 weeks. After a few regular waxing cycles, hair typically grows back softer and slower, and many clients extend their appointments to every 4–6 weeks.",
        category: "prep",
      },
    ],
    relatedServices: [BODY_SLUGS.fullLeg, BODY_SLUGS.underarm, INTIMATE_SLUGS.bikini],
    metaTitle: "Half Leg Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Half leg waxing in Omaha — smooth lower legs for 3–4 weeks with honey-based wax. Skip the daily razor. Book your appointment at Honey & Bloom Wax Studio.",
  },

  // --- Full Leg Wax ---
  {
    slug: BODY_SLUGS.fullLeg,
    categorySlug: "body",
    name: "Full Leg Wax",
    shortDescription:
      "Complete leg smoothness from ankle to hip in one session. Our honey wax covers every inch cleanly, leaving you silky-smooth for weeks.",
    heroHeadline: "Legs That Feel Amazing From Ankle to Hip",
    heroSubheadline:
      "Full leg waxing with our signature honey-based formula — smooth, clean, and long-lasting.",
    coverImage: "/images/services/full-leg-wax.jpg",
    duration: "55–70 minutes",
    price: 72,
    priceDisplay: "$72",
    sensitiveSkintSafe: false,
    painLevel: 4,
    preparation: [
      "Leg hair should be at least 1/4 inch long — resist shaving for at least 2 weeks before your appointment.",
      "Gently exfoliate your legs 2–3 days before to lift any dead skin and allow cleaner wax adhesion.",
      "Come with clean, dry legs — no lotion, oil, or self-tanner.",
      "Wear or bring loose-fitting clothing you can pull up easily (or a skirt/shorts).",
      "Avoid scheduling your appointment right before or during your period if you have sensitivity concerns — discomfort is often heightened at that time.",
    ],
    aftercare: [
      "Skip lotion and products on your legs for the first 4 hours post-wax.",
      "Wear loose, breathable clothing for the rest of the day.",
      "Avoid exercise, hot baths, and saunas for 24 hours.",
      "Begin exfoliating after 48 hours and maintain a 2–3 times per week exfoliation routine.",
      "Moisturize your legs daily starting 24 hours after your appointment.",
      "Book your next appointment at 4–5 weeks for the smoothest maintenance cycle.",
    ],
    ingredients: [
      "Raw honey (base formula for full-leg coverage)",
      "Beeswax (consistent grip across varying hair textures on upper vs. lower leg)",
      "Arnica extract (reduces post-service soreness on larger areas)",
      "Sweet almond oil (rich post-wax conditioning for full-leg application)",
      "Vitamin E oil (supports skin recovery)",
    ],
    whatToExpect:
      "Full leg waxing is our most comprehensive body service and takes 55–70 minutes as we work methodically from ankle to hip. We'll wax the lower legs first, then move to the upper leg and thigh area. The sensation varies — the inner thigh tends to be the most sensitive spot, while the shin and calf are usually mild. Take a few deep breaths during the service; most clients settle in quickly and find it much more manageable than they expected. You'll love how your legs feel when you leave.",
    faqs: [
      {
        question: "Is the full leg wax worth it vs. half leg?",
        answer:
          "If you shave your whole leg regularly, full leg waxing is usually more cost-effective and satisfying — you get complete smoothness and can stop shaving entirely. If you only shave the lower leg and don't have much upper-leg hair, half leg may be all you need.",
        category: "first-timer",
      },
      {
        question: "How long until my legs are smooth after the first wax?",
        answer:
          "After your first full leg wax, you may see a few hairs appear in the first 1–2 weeks that were in a different growth phase and not caught. That's totally normal. After 2–3 consistent waxes, your leg hair synchronizes to the same cycle and you'll get the full 4–5 weeks of smoothness.",
        category: "prep",
      },
    ],
    relatedServices: [BODY_SLUGS.halfLeg, BODY_SLUGS.underarm, INTIMATE_SLUGS.bikini],
    metaTitle: "Full Leg Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Full leg waxing in Omaha — ankle to hip smoothness with honey-based wax, lasting 4–5 weeks. Book your appointment at Honey & Bloom Wax Studio today.",
  },

  // --- Back Wax ---
  {
    slug: BODY_SLUGS.back,
    categorySlug: "body",
    name: "Back Wax",
    shortDescription:
      "A smooth, clean back that's impossible to achieve on your own. Our honey wax covers the full back surface — upper, lower, and shoulders — in one confident session.",
    heroHeadline: "A Clean Back, Finally",
    heroSubheadline:
      "Professional back waxing that covers every inch — smooth, confident, and lasting up to 5 weeks.",
    coverImage: "/images/services/back-wax.jpg",
    duration: "45–60 minutes",
    price: 65,
    priceDisplay: "$65",
    sensitiveSkintSafe: false,
    painLevel: 5,
    preparation: [
      "Back hair should be at least 1/4 inch long — resist trimming or shaving for 2–3 weeks before your appointment.",
      "Come with a clean back — freshly showered, no lotion, oil, or back acne treatments applied.",
      "If you use topical medications on your back (for acne or other conditions), check with your provider before waxing.",
      "Wear a shirt that's easy to remove — you'll be lying face-down for the service.",
    ],
    aftercare: [
      "Avoid wearing tight shirts or backpacks that rub the area for 24 hours.",
      "Skip the gym and any activity that causes heavy sweating on appointment day.",
      "No hot tubs, steam rooms, or sun exposure on the back for 24 hours.",
      "Wear loose, breathable fabric next to your back (cotton works well).",
      "After 48 hours, a gentle back exfoliator used 2–3 times per week will help prevent ingrown hairs on the back.",
    ],
    ingredients: [
      "Raw honey (soothing base for large surface waxing)",
      "Beeswax (high-grip formula for coarser back hair)",
      "Arnica and calendula blend (reduces soreness and redness over large treatment area)",
      "Jojoba oil (post-wax finishing oil — absorbs quickly)",
      "Menthol-free soothing serum (applied post-service to calm the skin)",
    ],
    whatToExpect:
      "Back waxing is our most intense service — not because it's unbearable, but because the back is a large surface area and the hair there tends to be coarser. You'll lie face-down while we work in sections from the shoulders down to the lower back. There will be moments of real sensation, but each strip is over in seconds and the end result is genuinely transformative. Most guys who come in for back waxing become regulars within a few visits.",
    faqs: [
      {
        question: "Is back waxing painful?",
        answer:
          "Back waxing is the most intense of our services — we won't sugarcoat it. But each strip only takes a second, and the discomfort fades immediately. After your first 2–3 waxes, as hair grows back finer, the sensation decreases significantly. Most clients say it's well worth it.",
        category: "pain",
      },
      {
        question: "How long does back waxing last?",
        answer:
          "Back waxing typically lasts 4–5 weeks. Back hair tends to grow slower than other areas, so many clients find they can stretch appointments out over time, especially after a few consistent waxes.",
        category: "prep",
      },
    ],
    relatedServices: [BODY_SLUGS.underarm, BODY_SLUGS.fullArm, BODY_SLUGS.fullLeg],
    metaTitle: "Back Wax in Omaha | Honey & Bloom Wax Studio",
    metaDescription:
      "Professional back waxing in Omaha — full back coverage with honey-based wax, smooth for 4–5 weeks. Book at Honey & Bloom Wax Studio for clean, confident results.",
  },
];
