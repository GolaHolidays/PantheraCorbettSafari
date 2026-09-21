/**
 * models/index.ts — legacy compatibility barrel.
 * All types are now Zod-inferred from core/schemas.
 * This re-export keeps existing repository imports unchanged.
 */
export type {
  SiteConfig,
  SiteContact,
  SiteHours,
  SiteSocial,
  OfficeAddress,
  SafariZone,
  ZonePermitQuota,
  SafariType,
  SafariShift,
  SafariPackage,
  ForestRestHouse,
  SecondaryServicesData,
  SecondaryServiceItem,
  Testimonial,
  FaqItem,
  TrustMetrics,
  TrustHighlight,
  BlogPost,
  BlogCategory,
  ContentSection,
} from "../schemas";

