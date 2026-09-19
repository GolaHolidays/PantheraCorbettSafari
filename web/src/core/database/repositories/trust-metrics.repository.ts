import { dataSourceClient } from "../client";
import type { TrustMetrics } from "../../models";

export class TrustMetricsRepository {
  public static getMetrics(): TrustMetrics {
    return dataSourceClient.getTrustMetricsRaw();
  }

  public static getHighlights() {
    return this.getMetrics().trustHighlights;
  }

  public static getScarcityWarning(): string {
    return this.getMetrics().scarcityWarning;
  }
}
