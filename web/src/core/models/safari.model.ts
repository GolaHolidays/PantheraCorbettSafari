export interface SafariShift {
  name: string;
  timing: string;
}

export interface SafariType {
  id: string;
  name: string;
  slug: string;
  vehicle: string;
  capacity: string;
  duration: string;
  permittedZones: string[];
  startingPriceINR: number;
  priceBasis: string;
  description: string;
  shifts: SafariShift[];
  inclusions: string[];
  permitNotice: string;
  ctaText: string;
  isPopular: boolean;
}
