import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import MapPinIcon from "@hugeicons/core-free-icons/MapPinIcon";

export interface GoogleMapEmbedProps {
  /** Visual variant: 'compact' (footer/sidebar) | 'full' (contact page) | 'card' */
  variant?: "compact" | "full" | "card";
  /** Optional custom CSS classes */
  className?: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Google Maps embed URL (defaults to Panthera Corbett Safari embed) */
  embedUrl?: string;
  /** Direct link to open in Google Maps app/web */
  mapsUrl?: string;
  /** Whether to show a direct "Get Directions" link badge */
  showDirectionsButton?: boolean;
  /** Optional custom height (e.g. 240 or '380px') */
  height?: number | string;
}

const DEFAULT_MAPS_URL = "https://maps.app.goo.gl/YrBbDtW9tSNNbBKr8";
const DEFAULT_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34800.0!2d79.2592105!3d29.4488845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a0f9e35d709c5%3A0xff6fab1e5d016981!2sPanthera%20Corbett%20Safari!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

/**
 * GoogleMapEmbed — Accessible, performant Google Maps component.
 *
 * Supports compact (footer) and full-size (contact page) layouts with
 * direct deep-linking to Google Maps navigation for mobile & desktop.
 */
export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  variant = "compact",
  className = "",
  title = "Panthera Corbett Safari Location",
  embedUrl = DEFAULT_EMBED_URL,
  mapsUrl = DEFAULT_MAPS_URL,
  showDirectionsButton = true,
  height,
}) => {
  if (variant === "compact") {
    const compactHeight = height ?? 160;

    return (
      <div
        className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-[#37482E]/80 bg-[#111913] ${className}`}
      >
        {/* Compact Header Strip */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#0D1610] border-b border-[#37482E]/60 text-xs">
          <div className="flex items-center gap-1.5 text-[#E8E0CC] font-medium truncate">
            <HugeiconsIcon
              icon={MapPinIcon}
              size={13}
              className="text-[#C99A3D] flex-shrink-0"
            />
            <span className="truncate text-[11px]">Patkote, Ramnagar</span>
          </div>
          {showDirectionsButton && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase font-semibold tracking-wider text-[#C99A3D] hover:text-white transition-colors flex-shrink-0"
              aria-label="Open Panthera Corbett Safari location in Google Maps"
            >
              Directions ↗
            </a>
          )}
        </div>

        {/* Map iframe */}
        <div className="relative w-full" style={{ height: compactHeight }}>
          <iframe
            src={embedUrl}
            title={title}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    );
  }

  // Full / Contact page variant
  const fullHeight = height ?? 420;

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-card)] border border-[#E8E0CC] bg-[#FBF8F0] shadow-[0_12px_32px_rgba(23,33,26,0.08)] ${className}`}
    >
      {/* Top Details Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 bg-[#17211A] text-[#FBF8F0] border-b border-[#37482E]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={MapPinIcon}
              size={18}
              className="text-[#C99A3D] flex-shrink-0"
            />
            <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
              Panthera Corbett Safari Office
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#8A9468] font-medium">
            Patkote, Ramnagar, Nainital, Uttarakhand 244715 · Jim Corbett Tiger Reserve
          </p>
        </div>

        {showDirectionsButton && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spring-press inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-gradient-to-b from-[#C99A3D] to-[#A07B30] text-[#17211A] text-xs sm:text-sm font-bold shadow-[0_2px_8px_rgba(201,154,61,0.3)] hover:brightness-110 transition-all flex-shrink-0"
            aria-label="Open Panthera Corbett Safari in Google Maps for directions"
          >
            <HugeiconsIcon icon={MapPinIcon} size={15} />
            <span>Get Directions on Google Maps ↗</span>
          </a>
        )}
      </div>

      {/* Map iframe */}
      <div className="relative w-full" style={{ height: fullHeight }}>
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>

      {/* Bottom travel landmark chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E0CC] bg-[#F4EFE6] border-t border-[#E8E0CC] text-center text-xs">
        <div className="p-3">
          <span className="text-[10px] uppercase font-bold text-[#8A9468] block">From Delhi</span>
          <span className="font-semibold text-[#17211A] text-[12px]">~245 km (5-6 hrs)</span>
        </div>
        <div className="p-3">
          <span className="text-[10px] uppercase font-bold text-[#8A9468] block">Ramnagar Rly Stn</span>
          <span className="font-semibold text-[#17211A] text-[12px]">Central Ramnagar</span>
        </div>
        <div className="p-3">
          <span className="text-[10px] uppercase font-bold text-[#8A9468] block">Pantnagar Airport</span>
          <span className="font-semibold text-[#17211A] text-[12px]">~80 km (2 hrs)</span>
        </div>
        <div className="p-3">
          <span className="text-[10px] uppercase font-bold text-[#8A9468] block">Dhikala Gate (Dhangarhi)</span>
          <span className="font-semibold text-[#17211A] text-[12px]">18 km North</span>
        </div>
      </div>
    </div>
  );
};
