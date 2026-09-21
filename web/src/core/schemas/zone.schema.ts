import { z } from "zod";

export const ZonePermitQuotaSchema = z.object({
  jeep: z.number().int().min(1).optional(),
  canter: z.number().int().min(1).optional(),
});

export const GatePricingSchema = z.object({
  gate: z.string().min(1),
  priceINR: z.number().int().min(0),
});

export const ZonePricingSchema = z.object({
  preBookingPriceINR: z.number().int().optional(),
  currentBookingPriceINR: z.number().int().optional(),
  perPersonPriceINR: z.number().int().optional(),
  sharingCapacity: z.string().optional(),
  bookingWindowNotice: z.string().optional(),
  pickupDropNote: z.string().optional(),
  inclusions: z.array(z.string()).optional(),
  gatePricing: z.array(GatePricingSchema).optional(),
}).optional();

export const SafariZoneSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  name: z.string().min(1),
  zoneType: z.string().min(1),
  status: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  gate: z.string().min(1),
  season: z.string().min(1),
  isOpenNow: z.boolean(),
  safariModes: z.array(z.string().min(1)).min(1),
  permitQuotaPerShift: ZonePermitQuotaSchema,
  sightingIndex: z.string().min(1),
  startingPriceINR: z.number().int().min(0),
  priceNote: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  bestFor: z.array(z.string().min(1)).min(1),
  image: z.string().min(1),
  isFeatured: z.boolean(),
  pricing: ZonePricingSchema,
});

export const ZonesSchema = z.array(SafariZoneSchema).min(1);

export type SafariZone = z.infer<typeof SafariZoneSchema>;
export type ZonePermitQuota = z.infer<typeof ZonePermitQuotaSchema>;
export type ZonePricing = z.infer<typeof ZonePricingSchema>;

