import { dataSourceClient } from "../client";
import type { SafariZone } from "../../models";

export class ZoneRepository {
  public static getAllZones(): SafariZone[] {
    return dataSourceClient.getZonesRaw();
  }

  public static getFeaturedZones(): SafariZone[] {
    return this.getAllZones().filter((z) => z.isFeatured);
  }

  public static getZoneBySlug(slug: string): SafariZone | undefined {
    return this.getAllZones().find((z) => z.slug === slug);
  }

  public static getZoneById(id: string): SafariZone | undefined {
    return this.getAllZones().find((z) => z.id === id);
  }

  public static getAvailableSlugs(): string[] {
    return this.getAllZones().map((z) => z.slug);
  }
}
