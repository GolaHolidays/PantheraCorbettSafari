/**
 * DataSourceClient
 * Pure TypeScript import-based data client — no fs, no JSON parsing, no runtime guesswork.
 *
 * @data alias resolves to the data_source/ symlink inside the web project root,
 * so Turbopack can follow the module graph without leaving the project boundary.
 *
 * Zod `.parse()` validates every data file at BUILD TIME — any schema mismatch
 * becomes a hard build error before deployment.
 */
import {
  SiteConfigSchema,
  ZonesSchema,
  SafariTypesSchema,
  PackagesSchema,
  RestHousesSchema,
  SecondaryServicesDataSchema,
  TestimonialsSchema,
  FaqsSchema,
  TrustMetricsSchema,
  BlogPostsSchema,
} from "../schemas";

import { siteConfig } from "@data/site-config";
import { zones } from "@data/zones";
import { safariTypes } from "@data/safari-types";
import { packages } from "@data/packages";
import { restHouses } from "@data/rest-houses";
import { secondaryServices } from "@data/secondary-services";
import { testimonials } from "@data/testimonials";
import { faqs } from "@data/faqs";
import { trustMetrics } from "@data/trust-metrics";
import { blogPosts } from "@data/blog-posts";

export type {
  SiteConfig,
  SafariZone,
  SafariType,
  SafariPackage,
  ForestRestHouse,
  SecondaryServicesData,
  Testimonial,
  FaqItem,
  TrustMetrics,
  BlogPost,
  BlogCategory,
  ContentSection,
} from "../schemas";

/**
 * DataSourceClient — Singleton that exposes fully-validated, Zod-parsed static data.
 * `z.parse()` runs at BUILD TIME so bad data never reaches the deployed site.
 */
class DataSourceClient {
  public getSiteConfigRaw() {
    return SiteConfigSchema.parse(siteConfig);
  }

  public getZonesRaw() {
    return ZonesSchema.parse(zones);
  }

  public getSafariTypesRaw() {
    return SafariTypesSchema.parse(safariTypes);
  }

  public getPackagesRaw() {
    return PackagesSchema.parse(packages);
  }

  public getRestHousesRaw() {
    return RestHousesSchema.parse(restHouses);
  }

  public getSecondaryServicesRaw() {
    return SecondaryServicesDataSchema.parse(secondaryServices);
  }

  public getTestimonialsRaw() {
    return TestimonialsSchema.parse(testimonials);
  }

  public getFaqsRaw() {
    return FaqsSchema.parse(faqs);
  }

  public getTrustMetricsRaw() {
    return TrustMetricsSchema.parse(trustMetrics);
  }

  public getBlogPostsRaw() {
    return BlogPostsSchema.parse(blogPosts);
  }
}

export const dataSourceClient = new DataSourceClient();
