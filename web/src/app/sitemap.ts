import type { MetadataRoute } from "next";
import {
  ZoneRepository,
  PackageRepository,
  RestHouseRepository,
} from "../core/database/repositories";

const SITE_URL = "https://pantheracorbettsafari.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const zoneSlugs = ZoneRepository.getAvailableSlugs();
  const packageSlugs = PackageRepository.getAvailableSlugs();
  const restHouseSlugs = RestHouseRepository.getAvailableSlugs();

  const zoneEntries = zoneSlugs.map((slug) => ({
    url: `${SITE_URL}/zones/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const packageEntries = packageSlugs.map((slug) => ({
    url: `${SITE_URL}/packages/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const restHouseEntries = restHouseSlugs.map((slug) => ({
    url: `${SITE_URL}/forest-rest-houses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...zoneEntries,
    ...packageEntries,
    ...restHouseEntries,
  ];
}
