import { dataSourceClient } from "../client";
import type { SafariType } from "../../models";

export class SafariRepository {
  public static getAllTypes(): SafariType[] {
    return dataSourceClient.getSafariTypesRaw();
  }

  public static getTypeBySlug(slug: string): SafariType | undefined {
    return this.getAllTypes().find((t) => t.slug === slug);
  }

  public static getPopularTypes(): SafariType[] {
    return this.getAllTypes().filter((t) => t.isPopular);
  }
}
