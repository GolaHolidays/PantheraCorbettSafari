export interface ForestRestHouse {
  id: string;
  slug: string;
  name: string;
  zone: string;
  season: string;
  roomsAvailable: number;
  roomTypes: string[];
  startingPriceINR: number;
  priceNote: string;
  tagline: string;
  description: string;
  features: string[];
  permitWindow: string;
  image: string;
  isFeatured: boolean;
}
