"use client";

import React, { useState } from "react";
import { SafariZone } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { ZoneCard } from "./ZoneCard";

interface ZoneGridProps {
  zones: SafariZone[];
  whatsAppLink: string;
}

/**
 * ZoneGrid — Apple-style Asymmetric Bento Grid
 *
 * Layout logic (mobile-first):
 *   Mobile (< md):   All cards stack full-width, no bento logic.
 *   Tablet (md):     2-column grid. Hero card spans full width still.
 *   Desktop (lg+):   3-column bento: hero=col-span-2, rest=col-span-1.
 *
 * The first zone (Dhikala — the premium, most-booked zone) receives
 * hero=true: taller photography, larger title, 3 highlights instead of 2.
 * This mirrors Apple's bento pattern where the highest-value feature gets
 * the largest tile, creating an implicit visual hierarchy without labels.
 *
 * Section background: deep Ink (#17211A) so photography leaps out.
 *   This is the "OLED void" technique — zero-luminance black makes the
 *   photography look physically present rather than framed in a box.
 *
 * Filter pills: Apple segmented-control pattern — compact, pill-shaped,
 *   active state uses Forest fill (#37482E) with white text.
 *
 * Scarcity callout: honest quota notice with amber left-border accent.
 *   No countdown timers. Real forest department numbers only.
 */
export const ZoneGrid: React.FC<ZoneGridProps> = ({ zones, whatsAppLink }) => {
  const [filter, setFilter] = useState<"all" | "core" | "all-weather">("all");

  const filteredZones = zones.filter((zone) => {
    if (filter === "core") return zone.zoneType.includes("Core");
    if (filter === "all-weather") return zone.season.includes("365 Days");
    return true;
  });

  // Pills data — DRY: adding a new filter is one object in this array
  const filterPills: { key: "all" | "core" | "all-weather"; label: string }[] = [
    { key: "all", label: `All Zones (${zones.length})` },
    { key: "core", label: "Core Habitats" },
    { key: "all-weather", label: "Open 365 Days" },
  ];

  return (
    <section
      id="zones"
      className="py-14 sm:py-20 bg-[#17211A] border-b border-[#37482E]/60 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header + filter pills ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeader
            title="Explore the Reserved Zones."
            subtitle="Permits issued zone-by-zone. Core sanctuaries hold prime tiger territory; all-weather zones ensure year-round access."
            badgeText="Core & Buffer Territories"
            theme="dark"
            className="mb-0"
          />

          {/* Filter — Strictly sharp segmented-control style */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-none self-start md:self-auto flex-shrink-0">
            {filterPills.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-none transition-all duration-200 cursor-pointer ${
                  filter === key
                    ? "bg-[#37482E] text-white shadow-sm"
                    : "text-[#E8E0CC]/70 hover:text-white hover:bg-white/8"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bento Grid ────────────────────────────────────────────────── */}
        {/*
          Mobile:  1 column, all cards full-width — photography is paramount.
          Tablet:  2 columns, uniform.
          Desktop: 3-column bento: first card (Dhikala) spans 2 columns (hero).
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredZones.map((zone, index) => {
            // Hero logic: first zone gets the prominent 2-column span on desktop.
            // Only applies when viewing "all" (unfiltered) — filtered views are uniform.
            const isHero = filter === "all" && index === 0;

            return (
              <div
                key={zone.id}
                className={isHero ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
              >
                <ZoneCard
                  zone={zone}
                  whatsAppLink={whatsAppLink}
                  hero={isHero}
                />
              </div>
            );
          })}
        </div>

        {/* ── Honest scarcity notice ─────────────────────────────────── */}
        <div className="mt-10 p-4 sm:p-5 bg-white/5 border border-[#C99A3D]/25 rounded-[var(--radius-card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-[#FBF8F0] text-sm sm:text-base">
              Daily Jeep Quotas Apply — Reserve in Advance
            </h4>
            <p className="text-xs sm:text-sm text-[#E8E0CC]/75 mt-1 leading-relaxed">
              Uttarakhand Forest Department caps entries at{" "}
              <strong className="text-[#C99A3D]">30 jeeps per shift</strong> in Bijrani &amp; Jhirna,
              and <strong className="text-[#C99A3D]">4 canters</strong> in Dhikala.
              Weekend and holiday slots book 30–45 days ahead.
            </p>
          </div>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-xs font-bold text-[#C99A3D] hover:text-[#E8B84A] uppercase tracking-wide transition-colors"
          >
            Check Live Slot Availability →
          </a>
        </div>

      </div>
    </section>
  );
};
