/**
 * gtm.ts — Google Tag Manager & DataLayer Helper
 *
 * Provides type-safe interaction with window.dataLayer for custom event tracking
 * (conversions, WhatsApp clicks, call clicks, package enquiries).
 */

import { GOOGLE_TAG_MANAGER_ID } from "../utils/seo";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export { GOOGLE_TAG_MANAGER_ID };

/**
 * Safely pushes an event to Google Tag Manager dataLayer.
 * Safe to call in both client and server environments (no-op on server).
 */
export function sendGTMEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

/**
 * Tracks a user click on any WhatsApp contact / booking link.
 */
export function trackWhatsAppClick(label: string, context?: Record<string, unknown>): void {
  sendGTMEvent("whatsapp_click", {
    click_label: label,
    channel: "whatsapp",
    ...context,
  });
}

/**
 * Tracks a user click on direct phone call links.
 */
export function trackPhoneCallClick(phoneNumber: string, context?: Record<string, unknown>): void {
  sendGTMEvent("phone_call_click", {
    phone_number: phoneNumber,
    channel: "phone",
    ...context,
  });
}

/**
 * Tracks package inquiry initiation.
 */
export function trackPackageInquiry(packageTitle: string, priceDisplay?: string): void {
  sendGTMEvent("package_inquiry", {
    package_title: packageTitle,
    package_price: priceDisplay,
  });
}
