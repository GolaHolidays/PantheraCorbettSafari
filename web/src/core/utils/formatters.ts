/**
 * Formatting utilities (like Angular Pipes) for numbers, currency, and communication channels.
 */
export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function buildWhatsAppLink(rawPhone: string, message: string): string {
  const cleanPhone = rawPhone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildCallLink(rawPhone: string): string {
  return `tel:${rawPhone.replace(/\s+/g, "")}`;
}
