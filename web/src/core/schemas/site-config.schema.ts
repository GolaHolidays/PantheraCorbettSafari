import { z } from "zod";

export const OfficeAddressSchema = z.object({
  line1: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  country: z.string().min(1),
});

export const SiteContactSchema = z.object({
  phone: z.string().min(1),
  phoneDisplay: z.string().min(1),
  phoneRaw: z.string().regex(/^\+?\d{10,14}$/, "Invalid phone number"),
  whatsapp: z.string().regex(/^\d{10,14}$/, "WhatsApp must be digits only, 10-14 chars"),
  whatsappDisplay: z.string().min(1),
  email: z.email("Invalid email address"),
  officeAddress: OfficeAddressSchema,
});

export const SiteHoursSchema = z.object({
  bookingDesk: z.string().min(1),
  safariMorningShift: z.string().min(1),
  safariEveningShift: z.string().min(1),
});

export const SiteSocialSchema = z.object({
  googleBusinessProfile: z.url("Invalid Google Business Profile URL"),
  instagram: z.url("Invalid Instagram URL"),
  facebook: z.url("Invalid Facebook URL"),
});

export const SiteConfigSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  foundedYear: z.number().int().min(1900).max(new Date().getFullYear()),
  experienceYears: z.number().int().min(0),
  licenseNumber: z.string().min(1),
  registeredAuthority: z.string().min(1),
  contact: SiteContactSchema,
  hours: SiteHoursSchema,
  social: SiteSocialSchema,
});

/** Inferred TypeScript type — single source of type truth */
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type SiteContact = z.infer<typeof SiteContactSchema>;
export type SiteHours = z.infer<typeof SiteHoursSchema>;
export type SiteSocial = z.infer<typeof SiteSocialSchema>;
export type OfficeAddress = z.infer<typeof OfficeAddressSchema>;
