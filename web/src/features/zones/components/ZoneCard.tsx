import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SafariZone } from "../../../core/models";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface ZoneCardProps {
  zone: SafariZone;
  whatsAppLink: string;
  /** Hero variant: taller image, larger typography for Bento Grid featured card */
  hero?: boolean;
}

/**
 * ZoneCard — Dark material card for the Bento Grid.
 *
 * Design system integration (all from globals.css):
 *   .card-dark     → dark surface (#1C2920) + border + spring hover transition
 *   .card-rim      → top-edge specular highlight (Apple glass technique)
 *   .spring-press  → haptic-like press via Button component
 *   --radius-card  → 20px continuous squircle approximation
 *   --radius-chip  → 8px for inline season/quota chips
 *
 * Mobile-first responsive image heights:
 *   Standard: h-[44vw]  → sm:h-52 → lg:h-56
 *   Hero:     h-[56vw]  → sm:h-72 → lg:h-80
 *
 * Concentric radius rule: inner image has no own radius (overflow:hidden on parent handles it).
 */
export const ZoneCard: React.FC<ZoneCardProps> = ({ zone, whatsAppLink, hero = false }) => {
  const zoneInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
    `Hello! I want to check safari permit availability for ${zone.name} (${zone.zoneType}).`
  )}`;

  return (
    <article
      className={`relative card-dark overflow-hidden group h-full ${
        hero
          ? "flex flex-col md:flex-row md:items-stretch"
          : "flex flex-col justify-between"
      }`}
    >
      {/* Top-edge specular rim light — single-source .card-rim from globals.css */}
      <div className="card-rim" />

      {/* ── Photography ─────────────────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden flex-shrink-0 ${
          hero
            ? "w-full md:w-[46%] h-60 sm:h-68 md:h-auto min-h-[260px] md:min-h-full"
            : "w-full h-48 sm:h-52"
        }`}
      >
        <Image
          src={zone.image}
          alt={`${zone.name} safari zone, Jim Corbett`}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes={
            hero
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />
        {/* Gradient: dark anchor at bottom for text legibility, transparent top so photo breathes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2920] via-[#1C2920]/25 to-transparent" />

        {/* Zone type + sighting index badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="forest" size="sm">
            {zone.zoneType}
          </Badge>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-none bg-[#17211A]/80 text-[#C99A3D] border border-[#C99A3D]/40 backdrop-blur-sm shadow-sm">
            {zone.sightingIndex}
          </span>
        </div>

        {/* Zone title — section-heading CSS class for optical tracking */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3
            className={`font-serif font-bold text-[#FBF8F0] section-heading drop-shadow-md ${
              hero ? "text-xl sm:text-2xl lg:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {zone.name}
          </h3>
          <p className="text-[11px] text-[#E8E0CC]/80 mt-0.5 font-medium">
            Gate: {zone.gate}
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div
        className={`p-4 sm:p-5 flex-1 flex flex-col justify-between ${
          hero ? "md:w-[54%] md:p-6" : ""
        }`}
      >
        <div>
          <p className="text-xs sm:text-sm text-[#E8E0CC]/80 leading-relaxed line-clamp-2 mb-3">
            {zone.tagline}
          </p>

          {/* Highlights */}
          <ul className="space-y-1.5 mb-3.5">
            {zone.highlights.slice(0, hero ? 3 : 2).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#E8E0CC]/85">
                <span className="text-[#C99A3D] font-bold flex-shrink-0 mt-px">✓</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Season chip — --radius-chip from CSS tokens */}
          <div className="text-xs py-2 px-3 rounded-[var(--radius-chip)] bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-[#8A9468] font-medium text-[11px]">Season Open:</span>
            <span className="font-semibold text-[#FBF8F0] text-[11px] truncate ml-2">{zone.season}</span>
          </div>
        </div>

        {/* ── Footer: price + CTA ─────────────────────────────────────────── */}
        <div className="pt-3.5 mt-3.5 border-t border-white/10">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <div className="text-[10px] text-[#8A9468] uppercase font-semibold tracking-wide">
                {zone.id === "dhikala" ? "Per Person / Seat" : "Starts From"}
              </div>
              <div className="text-xl font-bold font-serif text-[#FBF8F0] font-tabular">
                {formatCurrencyINR(zone.startingPriceINR)}
              </div>
            </div>
            <Link
              href={`/zones/${zone.slug}`}
              className="text-xs font-semibold text-[#C99A3D] hover:text-[#E8B84A] transition-colors"
            >
              Zone Details →
            </Link>
          </div>

          <p className="text-[10px] text-[#E8E0CC]/55 mb-2.5 line-clamp-1 leading-tight">
            {zone.priceNote}
          </p>

          {/* Button: spring-press via Button component, solid ember fill from Phase 2A */}
          <Button
            variant="primary"
            size="md"
            href={zoneInquiryUrl}
            isExternal
            className="w-full text-center"
          >
            Check {zone.name.split(" ")[0]} Permits
          </Button>
        </div>
      </div>
    </article>
  );
};
