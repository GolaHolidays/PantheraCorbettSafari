export interface ZonePermitQuota {
  jeep?: number;
  canter?: number;
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
}
