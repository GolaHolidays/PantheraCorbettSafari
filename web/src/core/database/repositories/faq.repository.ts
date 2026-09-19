import { dataSourceClient } from "../client";
import type { FaqItem } from "../../models";

export class FaqRepository {
  public static getAll(): FaqItem[] {
    return dataSourceClient.getFaqsRaw();
  }

  public static getCategories(): string[] {
    const all = this.getAll();
    return Array.from(new Set(all.map((item) => item.category)));
  }

  public static getByCategory(category: string): FaqItem[] {
    return this.getAll().filter((item) => item.category === category);
  }
}
