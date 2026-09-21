export interface ZonePermitQuota {
  jeep?: number;
  canter?: number;
}

export interface GatePricing {
  gate: string;
  priceINR: number;
}

export interface ZonePricing {
  preBookingPriceINR?: number;
  currentBookingPriceINR?: number;
  perPersonPriceINR?: number;
  sharingCapacity?: string;
  bookingWindowNotice?: string;
  pickupDropNote?: string;
  inclusions?: string[];
  gatePricing?: GatePricing[];
}

export interface SafariZone {
  id: string;
  slug: string;
  name: string;
  zoneType: string;
  status: string;
  tagline: string;
  description: string;
  gate: string;
  season: string;
  isOpenNow: boolean;
  safariModes: string[];
  permitQuotaPerShift: ZonePermitQuota;
  sightingIndex: string;
  startingPriceINR: number;
  priceNote: string;
  highlights: string[];
  bestFor: string[];
  image: string;
  isFeatured: boolean;
  pricing?: ZonePricing;
}

