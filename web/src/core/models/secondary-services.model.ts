export interface SecondaryServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  startingPriceINR: number;
  priceNote: string;
  vehicleOptions: string[];
  actionText: string;
}

export interface SecondaryServicesData {
  title: string;
  subtitle: string;
  items: SecondaryServiceItem[];
}
