import { z } from "zod";

// ─── Content Section Schema (discriminated union for rich content) ─────────────
// Each blog post is composed of typed sections rendered by the blog detail page.
// This avoids raw HTML strings, prevents XSS, and lets the UI apply design tokens.

export const ContentSectionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("h2"), text: z.string().min(1) }),
  z.object({ type: z.literal("h3"), text: z.string().min(1) }),
  z.object({ type: z.literal("p"), text: z.string().min(1) }),
  z.object({ type: z.literal("ul"), items: z.array(z.string().min(1)).min(1) }),
  z.object({ type: z.literal("ol"), items: z.array(z.string().min(1)).min(1) }),
  z.object({
    type: z.literal("table"),
    headers: z.array(z.string().min(1)).min(1),
    rows: z.array(z.array(z.string())).min(1),
  }),
  z.object({
    type: z.literal("callout"),
    variant: z.enum(["tip", "warning", "info", "note"]),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal("cta"),
    text: z.string().min(1),
    action: z.enum([
      "whatsapp",
      "phone",
      "safari-price",
      "zones",
      "canter-safari",
      "jeep-safari",
      "delhi-package",
      "delhi-cab",
    ]),
  }),
]);

export type ContentSection = z.infer<typeof ContentSectionSchema>;

// ─── Blog Category Schema ──────────────────────────────────────────────────────

export const BlogCategorySchema = z.enum([
  "Booking Guide",
  "Safari Types",
  "Zone Guide",
  "Season Guide",
  "Travel Guide",
  "Packages & Trips",
  "Wildlife Guide",
  "Planning Tips",
]);

export type BlogCategory = z.infer<typeof BlogCategorySchema>;

// ─── Blog Post Schema ──────────────────────────────────────────────────────────

export const BlogPostSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  title: z.string().min(1),
  /** Short title for SEO <title> tag — ideally under 60 chars */
  metaTitle: z.string().min(1),
  /** Meta description for SERPs — under 160 chars */
  metaDescription: z.string().min(1),
  /** 2–3 sentence teaser for listing cards */
  excerpt: z.string().min(1),
  category: BlogCategorySchema,
  tags: z.array(z.string().min(1)).min(1),
  publishedAt: z.string().min(1),   // ISO date string YYYY-MM-DD
  updatedAt: z.string().min(1),
  readTimeMinutes: z.number().int().min(1),
  featuredImage: z.string().min(1),
  featuredImageAlt: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(1),
  content: z.array(ContentSectionSchema).min(1),
  isFeatured: z.boolean(),
});

export const BlogPostsSchema = z.array(BlogPostSchema).min(1);

export type BlogPost = z.infer<typeof BlogPostSchema>;
