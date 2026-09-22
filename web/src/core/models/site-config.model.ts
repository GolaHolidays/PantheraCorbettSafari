export interface OfficeAddress {
  line1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface SiteContact {
  phone: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  officeAddress: OfficeAddress;
}

export interface SiteHours {
  bookingDesk: string;
  safariMorningShift: string;
  safariEveningShift: string;
}

export interface SiteSocial {
  googleBusinessProfile: string;
  googleMapsEmbed?: string;
  instagram: string;
  facebook: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  foundedYear: number;
  experienceYears: number;
  licenseNumber: string;
  registeredAuthority: string;
  contact: SiteContact;
  hours: SiteHours;
  social: SiteSocial;
}
