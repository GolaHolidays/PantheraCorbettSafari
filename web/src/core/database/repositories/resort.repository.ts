import { dataSourceClient } from "../client";
import type { Resort, ResortCategory } from "../../models";

export class ResortRepository {
  /**
   * Retrieves all Corbett resorts validated through Zod schema.
   */
  public static getAllResorts(): Resort[] {
    return dataSourceClient.getResortsRaw();
  }

  /**
   * Retrieves featured resorts highlighted for packages and hero sections.
   */
  public static getFeaturedResorts(): Resort[] {
    return this.getAllResorts().filter((resort) => resort.isFeatured);
  }

  /**
   * Retrieves a resort by its unique kebab-case slug.
   */
  public static getResortBySlug(slug: string): Resort | undefined {
    return this.getAllResorts().find((resort) => resort.slug === slug);
  }

  /**
   * Filter resorts by category: "3-star" | "4-star" | "5-star".
   */
  public static getResortsByCategory(category: ResortCategory): Resort[] {
    return this.getAllResorts().filter((resort) => resort.category === category);
  }

  /**
   * Convenience getter for 3-star budget/boutique resorts (₹4k–₹6k).
   */
  public static get3StarResorts(): Resort[] {
    return this.getResortsByCategory("3-star");
  }

  /**
   * Convenience getter for 4-star premium resorts (₹6k–₹10k).
   */
  public static get4StarResorts(): Resort[] {
    return this.getResortsByCategory("4-star");
  }

  /**
   * Convenience getter for 5-star luxury resorts (₹8k–₹19k).
   */
  public static get5StarResorts(): Resort[] {
    return this.getResortsByCategory("5-star");
  }

  /**
   * Retrieves resorts whose minimum price fits within the given maximum budget.
   */
  public static getResortsByBudget(maxBudgetINR: number): Resort[] {
    return this.getAllResorts().filter(
      (resort) => resort.priceRange.minPriceINR <= maxBudgetINR
    );
  }

  /**
   * Retrieves riverfront resorts on the Kosi or Ramganga rivers.
   */
  public static getRiverfrontResorts(): Resort[] {
    return this.getAllResorts().filter((resort) => resort.location.riverFront);
  }

  /**
   * Retrieves resorts associated with a specific safari zone or area.
   */
  public static getResortsByArea(areaKeyword: string): Resort[] {
    const term = areaKeyword.toLowerCase();
    return this.getAllResorts().filter(
      (resort) =>
        resort.location.area.toLowerCase().includes(term) ||
        resort.location.address.toLowerCase().includes(term) ||
        resort.location.nearestSafariGates.some((gate) =>
          gate.toLowerCase().includes(term)
        )
    );
  }

  /**
   * Returns all available slugs for static paths / dynamic routing.
   */
  public static getAvailableSlugs(): string[] {
    return this.getAllResorts().map((resort) => resort.slug);
  }
}
