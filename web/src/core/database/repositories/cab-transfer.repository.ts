import { dataSourceClient } from "../client";
import type { CabTransferRoute, CabVehicleFare } from "../../models";

export class CabTransferRepository {
  /**
   * Retrieves all verified cab transfer routes (Delhi, Kathgodam, Lalkuan to/from Ramnagar).
   */
  public static getAllRoutes(): CabTransferRoute[] {
    return dataSourceClient.getCabTransfersRaw();
  }

  /**
   * Finds a specific cab route by its unique ID (e.g., 'delhi-ramnagar').
   */
  public static getRouteById(id: string): CabTransferRoute | undefined {
    return this.getAllRoutes().find((route) => route.id === id);
  }

  /**
   * Finds a specific cab route by slug (e.g., 'delhi-to-ramnagar').
   */
  public static getRouteBySlug(slug: string): CabTransferRoute | undefined {
    return this.getAllRoutes().find((route) => route.slug === slug);
  }

  /**
   * Returns a specific vehicle fare for a route.
   */
  public static getVehicleFare(
    routeId: string,
    vehicleId: string
  ): CabVehicleFare | undefined {
    const route = this.getRouteById(routeId);
    if (!route) return undefined;
    return route.vehicles.find((v) => v.vehicleId === vehicleId);
  }

  /**
   * Calculate pricing when creating or bundling a safari package with cab transfers.
   *
   * @param routeId - "delhi-ramnagar" | "kathgodam-ramnagar" | "lalkuan-ramnagar"
   * @param vehicleId - "swift-dzire" | "new-ertiga" | "innova-crysta"
   * @param isRoundTrip - boolean (default true for holiday packages with pickup & return drop)
   */
  public static getTransferPriceForPackage(
    routeId: string,
    vehicleId: string,
    isRoundTrip: boolean = true
  ): {
    minPriceINR: number;
    maxPriceINR: number;
    priceDisplay: string;
    vehicleName: string;
    routeTitle: string;
  } | null {
    const vehicle = this.getVehicleFare(routeId, vehicleId);
    const route = this.getRouteById(routeId);
    if (!vehicle || !route) return null;

    if (isRoundTrip && vehicle.roundTripPriceRange) {
      return {
        minPriceINR: vehicle.roundTripPriceRange.minPriceINR,
        maxPriceINR: vehicle.roundTripPriceRange.maxPriceINR,
        priceDisplay: vehicle.roundTripPriceRange.priceDisplay,
        vehicleName: vehicle.name,
        routeTitle: route.shortTitle,
      };
    }

    return {
      minPriceINR: vehicle.priceRange.minPriceINR,
      maxPriceINR: vehicle.priceRange.maxPriceINR,
      priceDisplay: vehicle.priceRange.priceDisplay,
      vehicleName: vehicle.name,
      routeTitle: route.shortTitle,
    };
  }

  /**
   * Calculate total package price including cab transfer.
   */
  public static calculatePackageTotal(
    basePackageMinINR: number,
    basePackageMaxINR: number,
    routeId: string,
    vehicleId: string,
    isRoundTrip: boolean = true
  ) {
    const transfer = this.getTransferPriceForPackage(routeId, vehicleId, isRoundTrip);
    if (!transfer) {
      return {
        minTotalINR: basePackageMinINR,
        maxTotalINR: basePackageMaxINR,
        priceDisplay: `₹${basePackageMinINR.toLocaleString("en-IN")} – ₹${basePackageMaxINR.toLocaleString("en-IN")}`,
        transfer: null,
      };
    }

    const minTotalINR = basePackageMinINR + transfer.minPriceINR;
    const maxTotalINR = basePackageMaxINR + transfer.maxPriceINR;

    return {
      minTotalINR,
      maxTotalINR,
      priceDisplay: `₹${minTotalINR.toLocaleString("en-IN")} – ₹${maxTotalINR.toLocaleString("en-IN")}`,
      transfer,
    };
  }
}
