export interface TrustHighlight {
  title: string;
  subtitle: string;
  badge: string;
}

export interface TrustMetrics {
  rating: number;
  reviewCount: number;
  safarisCompleted: string;
  licensedGypsies: number;
  registeredGuides: number;
  yearsServing: number;
  trustHighlights: TrustHighlight[];
  scarcityWarning: string;
}
