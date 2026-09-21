/**
 * faqs.ts — Safari knowledge base for Jim Corbett National Park.
 *
 * Each entry targets a specific question-format keyword from SEO research.
 * These are rendered by FaqAccordion and injected as FAQPage JSON-LD via buildFaqSchema().
 *
 * Categories (used by FaqRepository.getByCategory()):
 *   Booking and Permits | Pricing & Inclusions | Documents | Safari Types |
 *   Seasons | Children and Families | Tiger Sightings | Payments | What to Carry |
 *   Dhikala Zone | Delhi Packages | Zones | Transport
 */

export const faqs = [
  // ─── Booking and Permits ───────────────────────────────────────────────────
  {
    category: "Booking and Permits",
    question: "How far ahead should I book a Jim Corbett safari?",
    answer:
      "For Dhikala Day Canter safari, book at least 15 to 20 days in advance — only 4 canters enter per shift during the 15 Nov – 15 Jun open season. For Core Zone jeep safaris (Bijrani, Jhirna, Dhela, Garjiya, Durga Devi), booking more than 5 days ahead secures our ₹7,999/jeep pre-booking rate with complimentary hotel pickup/drop up to 10 km from Ramnagar. Bookings within 5 days are ₹8,499/jeep. Buffer zones (Phato, Hathidangar, Sitabani) can be booked with shorter lead times.",
  },
  {
    category: "Booking and Permits",
    question: "How to book Jim Corbett safari online?",
    answer:
      "To book with us, WhatsApp or call our safari desk at +91 99974 88004. Share your preferred dates, zone, and number of guests. We check real-time Forest Department permit availability, confirm your slot, and collect a partial advance to lock the booking. You receive a written confirmation with permit details. We handle the Forest Department portal on your behalf — no app or form needed.",
  },
  {
    category: "Booking and Permits",
    question: "Can I book Jim Corbett safari on the same day?",
    answer:
      "Same-day bookings are possible for buffer and reserve zones: Phato, Hathidangar, Sitabani, and Jhirna (open all year). Core zones like Bijrani and Garjiya are subject to quota — same-day slots exist but fill quickly on weekends and peak season (November to February). Dhikala canter safari requires 15–20 days advance booking; same-day is generally not possible for Dhikala.",
  },
  // ─── Pricing & Inclusions ─────────────────────────────────────────────────
  {
    category: "Pricing & Inclusions",
    question: "What are your exact safari prices and what is included?",
    answer:
      "All prices are 100% all-inclusive with zero hidden costs. Dhikala Day Canter Safari (16 person sharing): ₹2,299/person, includes Ramnagar/Dhangarhi Gate pickup & drop (open 15 Nov – 15 Jun). Core Zone Jeep Safaris (Bijrani, Jhirna, Dhela, Garjiya, Durga Devi): ₹7,999/jeep pre-booking (>5 days, includes complimentary 10 km pickup/drop) or ₹8,499/jeep current booking (within 5 days). Buffer & Reserve Zones: Phato and Hathidangar at ₹6,499/jeep; Sitabani Pawalgarh at ₹6,499/jeep; Sitabani Teda & Bhandarpani at ₹5,999/jeep. Every jeep booking includes guide, forest permit, personal 4x4 Gypsy, and vehicle cost.",
  },
  {
    category: "Pricing & Inclusions",
    question: "What is the price of Dhikala canter safari per person?",
    answer:
      "The Dhikala day Canter safari is ₹2,299 per person per seat — fully all-inclusive. This covers your Dhikala core zone entry permit, a confirmed seat on the 16-person sharing open Canter bus, a government-appointed wildlife guide and driver, and pickup/drop at Ramnagar or Dhangarhi Gate. Only 4 Canters are allowed per shift. Book at least 15 to 20 days in advance.",
  },
  {
    category: "Pricing & Inclusions",
    question: "What is Jim Corbett safari price for Indians vs foreigners?",
    answer:
      "Our all-inclusive prices are uniform regardless of nationality. Dhikala Canter: ₹2,299/person. Core Zone Jeep (Bijrani, Jhirna, Garjiya, Dhela, Durga Devi): ₹7,999/jeep pre-booking or ₹8,499/jeep current booking (up to 6 guests). Buffer zones (Phato, Hathidangar): ₹6,499/jeep. Sitabani: ₹5,999–₹6,499/jeep. All include guide, permit, personal 4x4 Gypsy, and pickup/drop where applicable.",
  },
  // ─── Documents ────────────────────────────────────────────────────────────
  {
    category: "Documents",
    question: "What ID do I need to book a safari?",
    answer:
      "Any government-issued photo ID works — Aadhaar, Voter ID, Passport, or Driving Licence for Indian nationals. Foreign nationals need a valid passport and Indian visa. The same physical ID used for booking must be carried on safari day. The forest checkpost verifies it before entry.",
  },
  // ─── Safari Types ─────────────────────────────────────────────────────────
  {
    category: "Safari Types",
    question: "What is the difference between a Jeep Safari and a Canter Safari?",
    answer:
      "A Jeep Safari gives you an exclusive open-top 4x4 Gypsy for your group (up to 6 adults) in most zones — Bijrani, Jhirna, Garjiya, Dhela, and others. A Canter is a shared 16-seat open bus available only in Dhikala core zone at ₹2,299/person. If you want privacy and flexibility, choose jeep. If Dhikala is your priority and you are comfortable sharing, choose canter.",
  },
  {
    category: "Safari Types",
    question: "How many people can sit in a jeep safari in Jim Corbett?",
    answer:
      "A jeep safari accommodates up to 6 adults and 2 children in an exclusive private 4x4 Gypsy. You get the entire vehicle — no strangers join your group. The price is per jeep, not per person, making it very economical for groups of 4–6.",
  },
  {
    category: "Safari Types",
    question: "What are Jim Corbett safari timings for morning and evening shifts?",
    answer:
      "Morning shift: 06:00 AM – 09:30 AM (winter) or 05:45 AM – 09:15 AM (summer). Evening shift: 02:00 PM – 05:30 PM (winter) or 03:00 PM – 06:30 PM (summer). Dhikala Canter morning shift: 05:45 AM – 10:30 AM; afternoon shift: 11:30 AM – 04:30 PM. Pickup is arranged 30–45 minutes before gate opening time.",
  },
  // ─── Seasons ──────────────────────────────────────────────────────────────
  {
    category: "Seasons",
    question: "What is the best time to visit Jim Corbett National Park?",
    answer:
      "November to June is the best time. November to February offers cool weather, lush greenery, and active wildlife. March to June is best for tiger sightings — animals gather around waterholes and river banks in the heat. July to September is monsoon; most core zones close but Jhirna, Dhela, Phato, and Sitabani stay open all year.",
  },
  {
    category: "Seasons",
    question: "Which zones are open during monsoon (July to September)?",
    answer:
      "Jhirna Zone, Dhela Zone, Phato Zone, and Sitabani Reserve Forest are open all 12 months including monsoon. Bijrani and Garjiya close around 30 June. Dhikala closes 15 June and reopens 15 November. Durga Devi closes in mid-June. Monsoon safaris in Jhirna are particularly atmospheric — green forests, full waterholes, and high sloth bear activity.",
  },
  {
    category: "Seasons",
    question: "Is Jim Corbett open in July, August, and September?",
    answer:
      "Yes — partially. Jhirna, Dhela, Phato, and Sitabani zones remain open through monsoon (July, August, September). Core zones Bijrani, Garjiya, and Durga Devi close in late June. Dhikala closes 15 June to 15 November. For monsoon travel, we recommend Jhirna or Phato — quiet, green, and scenic.",
  },
  // ─── Dhikala Zone ─────────────────────────────────────────────────────────
  {
    category: "Dhikala Zone",
    question: "Can I visit Dhikala zone without staying at the Forest Rest House?",
    answer:
      "Yes. Day visitors access Dhikala via the 16-person sharing Canter safari at ₹2,299/person — the only way to enter without an overnight FRH booking. The Canter runs on morning and afternoon shifts from Ramnagar / Dhangarhi Gate. Jeep safaris inside Dhikala are only for guests staying at the Dhikala or Gairal Forest Rest Houses.",
  },
  {
    category: "Dhikala Zone",
    question: "How to book Dhikala canter safari — step by step?",
    answer:
      "Step 1: WhatsApp us at +91 99974 88004 with your dates and number of seats. Step 2: We check canter quota availability on the Forest Department portal. Step 3: Confirm seats and pay a partial advance via UPI/NEFT. Step 4: Receive written confirmation with permit details. Step 5: Be at Ramnagar or Dhangarhi Gate at the pickup time (around 05:30 AM for morning shift). Book at least 15–20 days ahead — only 4 canters are allowed per shift.",
  },
  {
    category: "Dhikala Zone",
    question: "What is the season for Dhikala zone canter safari?",
    answer:
      "Dhikala zone is open 15 November to 15 June every year. It closes during monsoon (mid-June to mid-November) for wildlife breeding and infrastructure maintenance. Day Canter safari operates only during this open season. If visiting between July and October, consider Jhirna or Phato zones — both open all year.",
  },
  // ─── Delhi Packages ───────────────────────────────────────────────────────
  {
    category: "Delhi Packages",
    question: "Do you offer 2 night 3 day Jim Corbett packages from Delhi?",
    answer:
      "Yes. Our Dhikala FRH Immersion Package is 2 nights / 3 days — 4 private Gypsy safaris, all meals, and Forest Rest House stay inside the core zone, from ₹28,500/couple. For a resort-based 2N3D stay with Bijrani or Garjiya safaris, we customize packages from approximately ₹15,000/couple. WhatsApp us for a tailored itinerary.",
  },
  {
    category: "Delhi Packages",
    question: "What are the best Jim Corbett packages from Delhi?",
    answer:
      "Our most popular packages: (1) Bijrani Weekend Package — 1 night resort + 2 jeep safaris from ₹11,500/couple, perfect for a Delhi weekend. (2) Dhikala FRH Immersion — 2 nights inside the core zone + 4 private Gypsies from ₹28,500/couple. (3) Double Zone Day Safari — 2 safaris in different zones, same day, from ₹12,800/jeep. All include permits, guide, and jeep. Delhi to Ramnagar is 250 km, about 5–6 hours by road.",
  },
  {
    category: "Delhi Packages",
    question: "Do you offer honeymoon packages for Jim Corbett?",
    answer:
      "Yes. Our Bijrani Weekend Package and Dhikala FRH Immersion Package are popular with couples. The FRH stay is especially memorable — after 4:30 PM, day visitors leave and you have the Dhikala core zone to yourselves, with the Ramganga flowing below and the jungle settling into night. We also arrange river-view resort stays with private safaris, candlelight dinners, and room decoration on request.",
  },
  // ─── Zones ────────────────────────────────────────────────────────────────
  {
    category: "Zones",
    question: "Which is the best zone for tiger sighting in Jim Corbett?",
    answer:
      "Bijrani zone has the most consistent tiger sighting record (9.1/10 index), especially on morning shifts. Garjiya along the Kosi river is close second (8.9/10). Dhikala has the highest activity (9.4/10) but requires a Canter safari or FRH stay. For best chances, we recommend a morning safari in Bijrani and an afternoon safari in Garjiya or Jhirna on the same day.",
  },
  {
    category: "Zones",
    question: "How many zones are there in Jim Corbett National Park?",
    answer:
      "We operate across 9 zones: Dhikala (Core, Canter only for day visitors), Bijrani (Core, Jeep), Jhirna (Core, Jeep, open all year), Dhela (Core, Jeep, open all year), Garjiya (Core, Jeep), Durga Devi (Core, Jeep), Phato (Buffer, Jeep, open all year), Hathidangar (Eco-Tourism, Jeep, open all year), and Sitabani (Reserve Forest, 3 gates, open all year).",
  },
  {
    category: "Zones",
    question: "What is the difference between Dhikala, Bijrani, and Jhirna zones?",
    answer:
      "Dhikala is the deepest core zone (32 km inside Dhangarhi Gate), famous for tigers and elephant herds in open grasslands — day visitors use a shared 16-person Canter, open 15 Nov–15 Jun. Bijrani is the closest core zone to Ramnagar (1 km from Amdanda Gate), highest tiger sighting record, accessed by private jeep. Jhirna is open all 365 days, best for sloth bears and monsoon visitors, accessible by private jeep. All three are excellent — choice depends on your dates and priorities.",
  },
  // ─── Tiger Sightings ──────────────────────────────────────────────────────
  {
    category: "Tiger Sightings",
    question: "Will I definitely see a tiger?",
    answer:
      "No one can guarantee it — Corbett covers 1,288 sq km of unfenced forest and tigers move freely. We take you to the zones and times with the best odds. Bijrani and Garjiya on morning shifts have the most consistent sighting record. Booking two shifts across two zones (morning + afternoon) significantly improves your chances. Most guests who stay 2 nights see a tiger at least once.",
  },
  // ─── Transport ────────────────────────────────────────────────────────────
  {
    category: "Transport",
    question: "How far is Delhi to Jim Corbett and how to reach?",
    answer:
      "Delhi to Jim Corbett (Ramnagar) is approximately 250–260 km, about 5–6 hours by road via NH-9 through Gajraula and Moradabad. By train, Ranikhet Express or Corbett Link Express from Delhi reaches Ramnagar overnight. We offer a Delhi to Ramnagar private cab from ₹4,500 (Sedan) or ₹6,500 (Innova Crysta), including tolls, with pickup from Delhi Airport, Gurgaon, Noida, or Ghaziabad.",
  },
  // ─── Children and Families ────────────────────────────────────────────────
  {
    category: "Children and Families",
    question: "Can I bring young children or elderly family members?",
    answer:
      "Yes. Children under 5 travel free but must be listed on the permit. Forest tracks are bumpy and unpaved — toddlers and elderly guests with back issues may find the ride challenging. For elderly guests, we recommend the Canter safari (rides higher and is more stable) or requesting a slower route. Families regularly do these safaris — pack water and a light jacket for morning shifts.",
  },
  // ─── Payments ─────────────────────────────────────────────────────────────
  {
    category: "Payments",
    question: "How do I pay and confirm a booking?",
    answer:
      "We take a partial advance to confirm the permit booking and collect the balance before the safari date. Payments are accepted via UPI, NEFT, or bank transfer. You receive written confirmation with permit details once the Forest Department quota is secured in your name.",
  },
  // ─── What to Carry ────────────────────────────────────────────────────────
  {
    category: "What to Carry",
    question: "What should I wear and bring on safari?",
    answer:
      "Wear neutral or earthy colours — khaki, olive, grey, or brown. Avoid bright colours and white. Carry a light jacket for morning shifts even in summer. Binoculars make a big difference, especially for birds. A camera with a long lens is helpful. Bring sunscreen, a hat, and a water bottle. Leave strong perfume at the resort — scent travels far in the forest.",
  },
];
