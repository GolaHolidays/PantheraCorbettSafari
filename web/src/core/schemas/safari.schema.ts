import { z } from "zod";

export const SafariShiftSchema = z.object({
  name: z.string().min(1),
  timing: z.string().min(1),
});

export const SafariTypeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  vehicle: z.string().min(1),
  capacity: z.string().min(1),
  duration: z.string().min(1),
  permittedZones: z.array(z.string().min(1)).min(1),
  startingPriceINR: z.number().int().min(0),
  priceBasis: z.string().min(1),
  description: z.string().min(1),
  shifts: z.array(SafariShiftSchema).min(1),
  inclusions: z.array(z.string().min(1)).min(1),
  permitNotice: z.string().min(1),
  ctaText: z.string().min(1),
  isPopular: z.boolean(),
});

export const SafariTypesSchema = z.array(SafariTypeSchema).min(1);

export type SafariType = z.infer<typeof SafariTypeSchema>;
export type SafariShift = z.infer<typeof SafariShiftSchema>;
