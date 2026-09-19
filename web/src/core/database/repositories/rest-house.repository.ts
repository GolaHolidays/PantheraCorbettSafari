import { dataSourceClient } from "../client";
import type { ForestRestHouse } from "../../models";

export class RestHouseRepository {
  public static getAllRestHouses(): ForestRestHouse[] {
    return dataSourceClient.getRestHousesRaw();
  }

  public static getFeaturedRestHouses(): ForestRestHouse[] {
    return this.getAllRestHouses().filter((r) => r.isFeatured);
  }

  public static getRestHouseBySlug(slug: string): ForestRestHouse | undefined {
    return this.getAllRestHouses().find((r) => r.slug === slug);
  }

  public static getAvailableSlugs(): string[] {
    return this.getAllRestHouses().map((r) => r.slug);
  }
}
