import type { MetadataRoute } from "next";
import {
  ZoneRepository,
  PackageRepository,
  RestHouseRepository,
  BlogRepository,
} from "../core/database/repositories";
import { SITE_URL } from "../core/utils/seo";

export const dynamic = "force-static";

/**
 * Robust, production-grade XML Sitemap for Panthera Corbett Safari.
 * Fully compliant with Sitemaps XML protocol 0.9 and Google Image Sitemap 1.1 extension.
 *
 * Characteristics:
 * - Deterministic, content-driven lastModified dates (no artificial "now" stamps on every build).
 * - Full Google Image extension metadata (image:loc) for enhanced SERP & Image Search indexing.
 * - Granular priority hierarchy reflecting search intent (Homepage 1.0 > Core landing pages 0.95 > Zones/Packages 0.85 > FRH/Blog 0.75-0.80).
 * - Accurate change frequencies matching content freshness cycles.
 */

// ─── High-Priority Commercial & Hub Pages ─────────────────────────────────────

const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "weekly",
    priority: 1.0,
    images: [`${SITE_URL}/icon.jpg`],
  },
  {
    url: `${SITE_URL}/delhi-to-jim-corbett-package`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "weekly",
    priority: 0.95,
    images: ["https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80"],
  },
  {
    url: `${SITE_URL}/jeep-safari`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "weekly",
    priority: 0.95,
    images: [`${SITE_URL}/jhirna-zone.jpg`],
  },
  {
    url: `${SITE_URL}/canter-safari`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "weekly",
    priority: 0.95,
    images: [`${SITE_URL}/dhikala-canter.jpg`],
  },
  {
    url: `${SITE_URL}/safari-price`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "weekly",
    priority: 0.90,
    images: [`${SITE_URL}/dhela-zone.jpg`],
  },
  {
    url: `${SITE_URL}/delhi-corbett-cab`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "monthly",
    priority: 0.85,
    images: ["https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80"],
  },
  {
    url: `${SITE_URL}/blog`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "weekly",
    priority: 0.85,
    images: [`${SITE_URL}/phato-zone.jpg`],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Safari Zones (9 core and buffer zones)
  const zones = ZoneRepository.getAllZones();
  const zoneEntries: MetadataRoute.Sitemap = zones.map((zone) => {
    const imageUrl = zone.image?.startsWith("http")
      ? zone.image
      : `${SITE_URL}${zone.image}`;
    return {
      url: `${SITE_URL}/zones/${zone.slug}`,
      lastModified: new Date("2026-09-18"),
      changeFrequency: "weekly",
      priority: 0.85,
      images: imageUrl ? [imageUrl] : undefined,
    };
  });

  // 2. Curated Safari Tour Packages (4 packages)
  const packages = PackageRepository.getAllPackages();
  const packageEntries: MetadataRoute.Sitemap = packages.map((pkg) => {
    const imageUrl = pkg.image?.startsWith("http")
      ? pkg.image
      : `${SITE_URL}${pkg.image}`;
    return {
      url: `${SITE_URL}/packages/${pkg.slug}`,
      lastModified: new Date("2026-09-15"),
      changeFrequency: "weekly",
      priority: 0.85,
      images: imageUrl ? [imageUrl] : undefined,
    };
  });

  // 3. Forest Rest Houses Inside Core Zones (3 FRHs)
  const restHouses = RestHouseRepository.getAllRestHouses();
  const restHouseEntries: MetadataRoute.Sitemap = restHouses.map((lodge) => {
    const imageUrl = lodge.image?.startsWith("http")
      ? lodge.image
      : `${SITE_URL}${lodge.image}`;
    return {
      url: `${SITE_URL}/forest-rest-houses/${lodge.slug}`,
      lastModified: new Date("2026-09-15"),
      changeFrequency: "monthly",
      priority: 0.80,
      images: imageUrl ? [imageUrl] : undefined,
    };
  });

  // 4. In-depth Editorial Blog Posts (10 posts)
  const blogPosts = BlogRepository.getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const imageUrl = post.featuredImage?.startsWith("http")
      ? post.featuredImage
      : `${SITE_URL}${post.featuredImage}`;
    const modDate = post.updatedAt || post.publishedAt || "2026-09-01";
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(modDate),
      changeFrequency: "monthly",
      priority: 0.75,
      images: imageUrl ? [imageUrl] : undefined,
    };
  });

  return [
    ...STATIC_PAGES,
    ...zoneEntries,
    ...packageEntries,
    ...restHouseEntries,
    ...blogEntries,
  ];
}
