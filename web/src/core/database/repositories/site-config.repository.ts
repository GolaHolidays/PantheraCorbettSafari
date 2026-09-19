import { dataSourceClient } from "../client";
import type { SiteConfig } from "../../models";

export class SiteConfigRepository {
  public static getConfig(): SiteConfig {
    return dataSourceClient.getSiteConfigRaw();
  }

  public static getContact() {
    return this.getConfig().contact;
  }

  public static getPhoneRaw(): string {
    return this.getConfig().contact.phoneRaw;
  }

  public static getWhatsAppNumber(): string {
    return this.getConfig().contact.whatsapp;
  }

  public static getWhatsAppLink(customMessage?: string): string {
    const phone = this.getWhatsAppNumber().replace(/\D/g, "");
    const msg = encodeURIComponent(
      customMessage ||
        "Hello Panthera Corbett Safari! I would like to enquire about safari permits and availability."
    );
    return `https://wa.me/${phone}?text=${msg}`;
  }

  public static getCallLink(): string {
    return `tel:${this.getPhoneRaw()}`;
  }

  public static getEmail(): string {
    return this.getConfig().contact.email;
  }

  public static getEmailLink(subject?: string): string {
    const email = this.getEmail();
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    return `mailto:${email}${query}`;
  }
}
