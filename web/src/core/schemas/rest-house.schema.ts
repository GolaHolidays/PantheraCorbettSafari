import { z } from "zod";

export const ForestRestHouseSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  name: z.string().min(1),
  zone: z.string().min(1),
  season: z.string().min(1),
  roomsAvailable: z.number().int().min(1),
  roomTypes: z.array(z.string().min(1)).min(1),
  startingPriceINR: z.number().int().min(0),
  priceNote: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  permitWindow: z.string().min(1),
  image: z.string().min(1),
  isFeatured: z.boolean(),
});

export const RestHousesSchema = z.array(ForestRestHouseSchema).min(1);

export type ForestRestHouse = z.infer<typeof ForestRestHouseSchema>;
