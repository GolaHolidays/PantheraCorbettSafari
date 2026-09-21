import { z } from "zod";

export const ResortCategorySchema = z.enum(["3-star", "4-star", "5-star"]);

export const ResortPriceRangeSchema = z.object({
  minPriceINR: z.number().int().min(0),
  maxPriceINR: z.number().int().min(0),
  priceDisplay: z.string().min(1),
  priceNote: z.string().min(1),
});

export const ResortLocationSchema = z.object({
  area: z.string().min(1),
  address: z.string().min(1),
  distanceFromStation: z.string().min(1),
  nearestSafariGates: z.array(z.string().min(1)).min(1),
  riverFront: z.boolean(),
  riverProximity: z.string().optional(),
});

export const ResortSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  name: z.string().min(1),
  category: ResortCategorySchema,
  starRating: z.number().int().min(1).max(5),
  priceRange: ResortPriceRangeSchema,
  location: ResortLocationSchema,
  tagline: z.string().min(1),
  overview: z.string().min(1),
  amenities: z.array(z.string().min(1)).min(1),
  roomTypes: z.array(z.string().min(1)).min(1),
  checkInTime: z.string().min(1),
  checkOutTime: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  websiteUrl: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).optional(),
  image: z.string().min(1),
  isFeatured: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
});

export const ResortsSchema = z.array(ResortSchema).min(1);

export type ResortCategory = z.infer<typeof ResortCategorySchema>;
export type ResortPriceRange = z.infer<typeof ResortPriceRangeSchema>;
export type ResortLocation = z.infer<typeof ResortLocationSchema>;
export type Resort = z.infer<typeof ResortSchema>;
