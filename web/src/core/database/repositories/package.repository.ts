import { dataSourceClient } from "../client";
import type { SafariPackage } from "../../models";

export class PackageRepository {
  public static getAllPackages(): SafariPackage[] {
    return dataSourceClient.getPackagesRaw();
  }

  public static getFeaturedPackages(): SafariPackage[] {
    return this.getAllPackages().filter((p) => p.isFeatured);
  }

  public static getPackageBySlug(slug: string): SafariPackage | undefined {
    return this.getAllPackages().find((p) => p.slug === slug);
  }

  public static getAvailableSlugs(): string[] {
    return this.getAllPackages().map((p) => p.slug);
  }

  public static getResortsForPackage(pkg: SafariPackage): import("../../models").Resort[] {
    if (!pkg.resortSlugs || pkg.resortSlugs.length === 0) return [];
    const allResorts = dataSourceClient.getResortsRaw();
    return allResorts.filter((r) => pkg.resortSlugs?.includes(r.slug));
  }
}
