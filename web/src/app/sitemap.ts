import type { MetadataRoute } from "next";
import {
  ZoneRepository,
  PackageRepository,
  RestHouseRepository,
  BlogRepository,
} from "../core/database/repositories";
import { SITE_URL } from "../core/utils/seo";

export const dynamic = "force-static";

// ─── High-priority static landing pages ──────────────────────────────────────
// Adding a new page: append one entry to this array. Sitemap auto-includes it.

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  // Phase 2 — High-intent landing pages
  { url: `${SITE_URL}/delhi-to-jim-corbett-package`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  { url: `${SITE_URL}/jeep-safari`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.92 },
  { url: `${SITE_URL}/canter-safari`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.92 },
  { url: `${SITE_URL}/safari-price`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.90 },
  // Phase 3 — Supporting service pages
  { url: `${SITE_URL}/delhi-corbett-cab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  // Phase 4 — Blog hub
  { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const zoneSlugs = ZoneRepository.getAvailableSlugs();
  const packageSlugs = PackageRepository.getAvailableSlugs();
  const restHouseSlugs = RestHouseRepository.getAvailableSlugs();
  const blogSlugs = BlogRepository.getAvailableSlugs();

  const zoneEntries: MetadataRoute.Sitemap = zoneSlugs.map((slug) => ({
    url: `${SITE_URL}/zones/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const packageEntries: MetadataRoute.Sitemap = packageSlugs.map((slug) => ({
    url: `${SITE_URL}/packages/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.80,
  }));

  const restHouseEntries: MetadataRoute.Sitemap = restHouseSlugs.map((slug) => ({
    url: `${SITE_URL}/forest-rest-houses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.70,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.80,
  }));

  return [
    ...STATIC_PAGES,
    ...zoneEntries,
    ...packageEntries,
    ...restHouseEntries,
    ...blogEntries,
  ];
}
