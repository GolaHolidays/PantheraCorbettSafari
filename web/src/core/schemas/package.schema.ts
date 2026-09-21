import { z } from "zod";

export const SafariPackageSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  duration: z.string().min(1),
  zone: z.string().min(1),
  safariCount: z.string().min(1),
  accommodation: z.string().min(1),
  startingPriceINR: z.number().int().min(0),
  priceDisplay: z.string().min(1),
  priceNote: z.string().min(1),
  badge: z.string().min(1),
  scarcityText: z.string().min(1),
  overview: z.string().min(1),
  inclusions: z.array(z.string().min(1)).min(1),
  exclusions: z.array(z.string().min(1)),
  itineraryHighlights: z.array(z.string().min(1)).min(1),
  image: z.string().min(1),
  isFeatured: z.boolean(),
  /** SEO-optimised title for generateMetadata — falls back to title if absent */
  seoTitle: z.string().optional(),
  /** SEO-optimised meta description targeting package-level keywords */
  seoDescription: z.string().optional(),
  /** Package-specific keyword array for metadata.keywords */
  seoKeywords: z.array(z.string()).optional(),
  /** Optional linked resort slugs for packages with resort stays */
  resortSlugs: z.array(z.string()).optional(),
});

export const PackagesSchema = z.array(SafariPackageSchema).min(1);

export type SafariPackage = z.infer<typeof SafariPackageSchema>;
