import { z } from "zod";

export const TrustHighlightSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  badge: z.string().min(1),
});

export const TrustMetricsSchema = z.object({
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
  safarisCompleted: z.string().min(1),
  licensedGypsies: z.number().int().min(0),
  registeredGuides: z.number().int().min(0),
  yearsServing: z.number().int().min(0),
  trustHighlights: z.array(TrustHighlightSchema).min(1),
  scarcityWarning: z.string().min(1),
});

export type TrustMetrics = z.infer<typeof TrustMetricsSchema>;
export type TrustHighlight = z.infer<typeof TrustHighlightSchema>;
