/**
 * seo.ts — Single source of truth for all SEO logic.
 *
 * Exports:
 *  - SITE_URL               : canonical domain constant
 *  - SITE_KEYWORDS          : master keyword taxonomy (homepage + zone-level)
 *  - ZONE_SEO_MAP           : per-zone title / description / keywords
 *  - generatePageMetadata   : shared Metadata factory for inner pages
 *  - JsonLd builders        : buildFaqSchema, buildBreadcrumbSchema,
 *                             buildZoneSchema, buildLocalBusinessSchema,
 *                             buildWebSiteSchema, buildServiceListSchema
 *
 * Usage rule: Pages import from here — never write inline SEO objects in page files.
 */

import type { Metadata } from "next";
import type { FaqItem, SafariZone } from "../schemas";
import { SiteConfigRepository } from "../database/repositories";

// ─── Constants ────────────────────────────────────────────────────────────────

export const SITE_URL = "https://pantheracorbettsafari.corbettcamp.com";

// ─── Master Keyword Taxonomy ──────────────────────────────────────────────────
// Single array → spread into layout.tsx metadata. No duplication anywhere.

export const SITE_KEYWORDS: string[] = [
  // Core booking (40K–60K/mo) ─ highest-priority cluster
  "Jim Corbett safari booking",
  "Jim Corbett safari booking online",
  "corbett safari booking",
  "book jim corbett safari",
  "jim corbett national park booking",
  "corbett tiger reserve booking",
  "jim corbett online booking",
  // Dhikala zone (12K–18K/mo) ─ most sought-after zone
  "dhikala zone booking",
  "dhikala canter safari booking",
  "dhikala safari booking",
  "dhikala canter safari price",
  "dhikala zone canter safari",
  "book dhikala canter safari",
  "dhikala forest rest house booking",
  // Jeep safari (20K–30K/mo)
  "jim corbett jeep safari",
  "corbett jeep safari booking",
  "jim corbett jeep safari price",
  "gypsy safari jim corbett",
  "jeep safari jim corbett national park",
  "bijrani jeep safari",
  // Canter safari (15K–20K/mo)
  "jim corbett canter safari",
  "canter safari jim corbett booking",
  "jim corbett canter safari price",
  "corbett canter safari",
  // Delhi packages (30K–50K/mo) ─ highest missed cluster
  "delhi to jim corbett package",
  "jim corbett package from delhi",
  "delhi jim corbett tour package",
  "2 night 3 day jim corbett package from delhi",
  "delhi to jim corbett weekend package",
  "jim corbett family package from delhi",
  "jim corbett honeymoon package from delhi",
  // Zone-specific (8K–12K/mo each)
  "bijrani zone booking",
  "bijrani zone jeep safari",
  "jhirna zone booking",
  "dhela zone booking",
  "garjiya zone booking",
  "durgadevi zone booking",
  "sitabani zone booking",
  // Pricing
  "jim corbett safari price",
  "jim corbett safari fee",
  "jim corbett entry fee",
  "jim corbett safari cost",
  // Local & trust
  "ramnagar jim corbett safari",
  "jim corbett tiger reserve permit",
  "forest rest house corbett",
  "Uttarakhand wildlife safari",
  "tiger safari india",
];

// ─── Per-Zone SEO Map ─────────────────────────────────────────────────────────
// Keyed by zone.slug. Add a new zone → add one entry here. Pages read from this.

export interface ZoneSeoEntry {
  title: string;
  description: string;
  keywords: string[];
}

export const ZONE_SEO_MAP: Record<string, ZoneSeoEntry> = {
  "dhikala-zone": {
    title: "Dhikala Zone Canter Safari Booking | ₹2,299/Seat | Jim Corbett",
    description:
      "Book Dhikala zone canter safari online at ₹2,299/person. 16-person sharing open safari bus with pickup from Ramnagar / Dhangarhi Gate. Season: 15 Nov–15 Jun. Only 4 canters/shift — book 15–20 days ahead.",
    keywords: [
      "dhikala zone booking",
      "dhikala canter safari booking",
      "dhikala safari booking",
      "book dhikala canter safari online",
      "dhikala canter safari price",
      "dhikala zone canter safari",
      "dhikala zone day visitor safari",
      "dhikala forest rest house booking",
    ],
  },
  "bijrani-zone": {
    title: "Bijrani Zone Jeep Safari Booking | ₹7,999/Jeep | Jim Corbett",
    description:
      "Book Bijrani zone jeep safari from ₹7,999/jeep (up to 6 guests). Closest core zone to Ramnagar with the highest tiger sighting record. Private 4x4 Gypsy, guide & permit included. Morning & evening shifts available.",
    keywords: [
      "bijrani zone booking",
      "bijrani safari booking",
      "bijrani zone jeep safari",
      "bijrani jeep safari booking online",
      "bijrani zone jim corbett",
      "bijrani zone tiger sighting",
      "bijrani zone entry fee",
    ],
  },
  "jhirna-zone": {
    title: "Jhirna Zone Safari Booking | Open All 365 Days | Jim Corbett",
    description:
      "Book Jhirna zone jeep safari — open all year including monsoon. ₹7,999/jeep (pre-booking). Highest sloth bear density, active tiger corridors. Exclusive 4x4 Gypsy for up to 6 guests with guide & permit.",
    keywords: [
      "jhirna zone booking",
      "jhirna safari booking",
      "jhirna zone jeep safari",
      "jhirna zone jim corbett",
      "jhirna open all year",
      "jhirna monsoon safari",
      "jhirna sloth bear sighting",
    ],
  },
  "dhela-zone": {
    title: "Dhela Zone Safari Booking | Limited 15 Jeeps/Shift | Jim Corbett",
    description:
      "Book Dhela zone jeep safari — strictly capped at 15 jeeps/shift for a quiet, private experience. Open all 365 days. ₹7,999/jeep with guide & permit. Mixed forest, waterholes, and elephant sightings.",
    keywords: [
      "dhela zone booking",
      "dhela safari booking",
      "dhela zone jim corbett",
      "dhela zone jeep safari",
      "dhela zone open all year",
      "quiet safari jim corbett",
    ],
  },
  "garjiya-zone": {
    title: "Garjiya Zone Safari Booking | Kosi River | Jim Corbett",
    description:
      "Book Garjiya zone jeep safari from ₹7,999/jeep. Rugged Kosi riverbed terrain, just 12 km from Ramnagar, with one of the strongest tiger movement records. Private 4x4 Gypsy, guide & all permits included.",
    keywords: [
      "garjiya zone booking",
      "garjiya safari booking",
      "garjiya zone jeep safari",
      "garjiya zone jim corbett",
      "kosi river safari corbett",
      "garjiya zone tiger sighting",
    ],
  },
  "durga-devi-zone": {
    title: "Durgadevi Zone Safari Booking | Birdwatching | Jim Corbett",
    description:
      "Book Durgadevi zone jeep safari from ₹7,999/jeep. Northeastern hilly terrain, river gorges, mahseer pools, and rare raptors. Ideal for birdwatchers and anglers. 28 km from Ramnagar.",
    keywords: [
      "durgadevi zone booking",
      "durga devi safari booking",
      "durgadevi zone birdwatching",
      "durgadevi zone jeep safari",
      "durgadevi zone jim corbett",
      "durga devi zone mahseer angling",
    ],
  },
  "phato-zone": {
    title: "Phato Zone Safari Booking | Buffer Zone Open All Year | Jim Corbett",
    description:
      "Book Phato zone jeep safari at ₹6,499/jeep — fixed price for both pre-booking and same-day. Open 365 days. Forest treehouse stopover, reliable tiger and elephant encounters.",
    keywords: [
      "phato zone booking",
      "phato safari booking",
      "phato zone jim corbett",
      "phato zone jeep safari",
      "phato zone buffer zone",
      "phato zone open monsoon",
    ],
  },
  "hathidangar-zone": {
    title: "Hathidangar Zone Safari | Elephant Corridor | Jim Corbett",
    description:
      "Book Hathidangar zone jeep safari at ₹6,499/jeep. Prime elephant corridor in Ampokhra range, open all year. Private 4x4 Gypsy, guide & permit included. 15 km from Ramnagar.",
    keywords: [
      "hathidangar zone booking",
      "hathidangar safari booking",
      "hathidangar zone jim corbett",
      "hathidangar jeep safari",
      "elephant corridor safari corbett",
      "hathidangar zone open all year",
    ],
  },
  "sitabani-zone": {
    title: "Sitabani Safari Booking | Reserve Forest | From ₹5,999 | Jim Corbett",
    description:
      "Book Sitabani reserve forest jeep safari — 3 gates: Teda & Bhandarpani at ₹5,999/jeep, Pawalgarh at ₹6,499/jeep. No quota cap, easy same-day availability. Open 365 days. Guide & permit included.",
    keywords: [
      "sitabani zone booking",
      "sitabani safari booking",
      "sitabani wildlife reserve",
      "sitabani jeep safari",
      "sitabani buffer zone safari",
      "sitabani same day booking",
    ],
  },
};

// ─── Phase 2 Landing Page SEO Map ────────────────────────────────────────────
// Keyed by route path. Each new landing page reads from here — zero inline metadata.

export interface LandingPageSeo {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogImage?: string;
}

export const LANDING_PAGE_SEO: Record<string, LandingPageSeo> = {
  "delhi-to-jim-corbett-package": {
    title: "Delhi to Jim Corbett Package | 2N3D & Weekend Tour",
    description:
      "Book Delhi to Jim Corbett tour packages from ₹11,500/couple. 2 night 3 day & weekend packages with jeep safari included. Family, honeymoon & group packages. Private Delhi to Ramnagar cab available. Call +91 99974 88004.",
    keywords: [
      "delhi to jim corbett package",
      "jim corbett package from delhi",
      "2 night 3 day jim corbett package from delhi",
      "delhi jim corbett tour package",
      "corbett weekend tour from delhi",
      "jim corbett family package from delhi",
      "jim corbett honeymoon package from delhi",
      "delhi to ramnagar tour package",
      "delhi to corbett national park package",
      "jim corbett package with safari from delhi",
    ],
    canonicalPath: "/delhi-to-jim-corbett-package",
  },
  "jeep-safari": {
    title: "Jim Corbett Jeep Safari Booking | Private 4x4 Gypsy | From ₹5,999",
    description:
      "Book Jim Corbett jeep safari online — exclusive private 4x4 Gypsy for up to 6 guests. Bijrani, Jhirna, Garjiya, Dhela, Durga Devi zones. Morning & evening shifts. Guide + permit + jeep included. Pre-booking from ₹5,999/jeep.",
    keywords: [
      "jim corbett jeep safari",
      "corbett jeep safari booking",
      "jim corbett jeep safari price",
      "gypsy safari jim corbett",
      "jeep safari jim corbett national park",
      "jim corbett jeep safari booking online",
      "bijrani jeep safari booking",
      "jhirna jeep safari",
      "garjiya jeep safari",
      "jim corbett jeep safari timing",
      "morning jeep safari jim corbett",
    ],
    canonicalPath: "/jeep-safari",
  },
  "canter-safari": {
    title: "Jim Corbett Canter Safari | Dhikala Zone Booking | ₹2,299/Seat",
    description:
      "Book Dhikala canter safari online at ₹2,299/seat. 16-person sharing open safari bus with pickup from Ramnagar / Dhangarhi Gate. Season 15 Nov–15 Jun. Only 4 canters per shift — book 15–20 days ahead.",
    keywords: [
      "jim corbett canter safari",
      "dhikala canter safari booking",
      "canter safari dhikala",
      "corbett canter safari price",
      "dhikala zone day visitor safari",
      "16 seat canter safari corbett",
      "jim corbett canter safari price",
      "book dhikala canter safari online",
      "canter safari vs jeep safari jim corbett",
    ],
    canonicalPath: "/canter-safari",
  },
  "safari-price": {
    title: "Jim Corbett Safari Price 2025–26 | All Zone Fees & Inclusions",
    description:
      "Complete Jim Corbett safari price guide 2025–26. Dhikala canter safari ₹2,299/person. Jeep safari from ₹5,999–₹8,499/jeep. All zones: Bijrani, Jhirna, Garjiya, Dhela, Sitabani. Zero hidden costs — guide, permit & jeep included.",
    keywords: [
      "jim corbett safari price",
      "jim corbett safari fee",
      "jim corbett entry fee 2025",
      "jim corbett safari cost per person",
      "dhikala canter safari fee",
      "bijrani jeep safari price",
      "jim corbett safari charges",
      "jim corbett safari price for indians",
      "jim corbett national park entry fee",
      "corbett national park permit fee",
    ],
    canonicalPath: "/safari-price",
  },
};

// ─── Metadata Factory ─────────────────────────────────────────────────────────

export interface PageMetadataProps {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
}

/**
 * generatePageMetadata — DRY factory for all inner pages.
 * Reads site name from SiteConfigRepository; caller supplies page-specific fields.
 */
export function generatePageMetadata({
  title,
  description,
  canonicalPath,
  keywords,
  ogImage,
  ogType = "website",
}: PageMetadataProps): Metadata {
  const config = SiteConfigRepository.getConfig();
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const resolvedImage = ogImage ?? `${SITE_URL}/og-image.jpg`;

  return {
    title: `${title} | ${config.shortName}`,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      siteName: config.name,
      locale: "en_IN",
      type: ogType,
      url: canonicalUrl,
      images: [{ url: resolvedImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
  };
}

// ─── JSON-LD Schema Builders ──────────────────────────────────────────────────
// Each builder is a pure function → easy to test, compose, and reuse.

/** FAQ structured data — enables Google rich result accordion in SERPs */
export function buildFaqSchema(faqs: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema for zone / package / rest-house detail pages */
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildBreadcrumbSchema(crumbs: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.href.startsWith("http") ? crumb.href : `${SITE_URL}${crumb.href}`,
    })),
  };
}

/** TouristAttraction + Offer schema for a single zone detail page */
export function buildZoneSchema(zone: SafariZone): object {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: `${zone.name} — Jim Corbett Tiger Reserve`,
    description: zone.description,
    url: `${SITE_URL}/zones/${zone.slug}`,
    image: zone.image.startsWith("http") ? zone.image : `${SITE_URL}${zone.image}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ramnagar",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: zone.startingPriceINR,
      availability: zone.isOpenNow
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Panthera Corbett Safari" },
    },
    touristType: zone.bestFor,
  };
}

/** LocalBusiness schema — used once in root layout */
export function buildLocalBusinessSchema(config: {
  name: string;
  description: string;
  telephone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  instagram: string;
  facebook: string;
  googleBusinessProfile: string;
}): object {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: config.name,
    description: config.description,
    url: SITE_URL,
    telephone: config.telephone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.streetAddress,
      addressLocality: config.city,
      addressRegion: config.state,
      postalCode: config.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.3931,
      longitude: 79.0506,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "06:00",
      closes: "21:30",
    },
    priceRange: "₹₹",
    image: `${SITE_URL}/og-image.jpg`,
    sameAs: [config.instagram, config.facebook, config.googleBusinessProfile],
  };
}

/** WebSite schema with SearchAction — used once in root layout */
export function buildWebSiteSchema(siteName: string): object {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/zones/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** TouristAttraction schema for the park itself — used once in root layout */
export function buildParkAttractionSchema(): object {
  return {
    "@type": "TouristAttraction",
    "@id": `${SITE_URL}/#attraction`,
    name: "Jim Corbett Tiger Reserve Safari",
    description:
      "Jim Corbett Tiger Reserve is India's oldest national park, covering 1,288 sq km in Uttarakhand. Known for Bengal tigers, Asian elephants, gharials, and over 600 bird species.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ramnagar",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    touristType: ["Wildlife Photography", "Safari", "Birdwatching", "Nature Tourism"],
  };
}

/** ServiceList schema for the homepage — tells Google what services are offered */
export function buildServiceListSchema(): object {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#services`,
    provider: { "@id": `${SITE_URL}/#business` },
    serviceType: "Wildlife Safari Booking",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Jim Corbett Safari Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Dhikala Canter Safari" },
          price: "2299",
          priceCurrency: "INR",
          description: "16-person sharing canter safari into Dhikala core zone",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Jim Corbett Jeep Safari" },
          price: "7999",
          priceCurrency: "INR",
          description: "Exclusive private 4x4 Gypsy safari in core zones",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Delhi to Jim Corbett Package" },
          price: "11500",
          priceCurrency: "INR",
          description: "All-inclusive tour package from Delhi with safari and accommodation",
        },
      ],
    },
  };
}

/**
 * TouristTrip schema for a safari package detail page.
 * Enables rich results for package/tour listings in Google.
 */
export function buildPackageSchema(pkg: {
  title: string;
  overview: string;
  image: string;
  slug: string;
  duration: string;
  zone: string;
  priceFromINR: number;
}): object {
  const imageUrl = pkg.image.startsWith("http") ? pkg.image : `${SITE_URL}${pkg.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.overview,
    image: imageUrl,
    url: `${SITE_URL}/packages/${pkg.slug}`,
    provider: {
      "@type": "Organization",
      name: "Panthera Corbett Safari",
      url: SITE_URL,
    },
    touristType: ["Wildlife Enthusiasts", "Nature Photography", "Family Travel"],
    itinerary: {
      "@type": "ItemList",
      name: `${pkg.title} Itinerary`,
      description: `${pkg.duration} safari tour in ${pkg.zone}`,
    },
    offers: {
      "@type": "Offer",
      price: pkg.priceFromINR,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Panthera Corbett Safari" },
    },
  };
}

/**
 * LodgingBusiness schema for a Forest Rest House detail page.
 * Signals accommodation + wildlife context to Google.
 */
export function buildRestHouseSchema(lodge: {
  name: string;
  description: string;
  image: string;
  slug: string;
  zone: string;
  tariffPerNightINR: number;
}): object {
  const imageUrl = lodge.image.startsWith("http") ? lodge.image : `${SITE_URL}${lodge.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: lodge.name,
    description: lodge.description,
    image: imageUrl,
    url: `${SITE_URL}/forest-rest-houses/${lodge.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jim Corbett Tiger Reserve",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    containedInPlace: {
      "@type": "TouristAttraction",
      name: "Jim Corbett Tiger Reserve",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wildlife Safari Access", value: true },
      { "@type": "LocationFeatureSpecification", name: "Inside Core Zone", value: true },
      { "@type": "LocationFeatureSpecification", name: "Meals Included", value: true },
    ],
    offers: {
      "@type": "Offer",
      price: lodge.tariffPerNightINR,
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
      seller: { "@type": "Organization", name: "Panthera Corbett Safari" },
    },
  };
}
