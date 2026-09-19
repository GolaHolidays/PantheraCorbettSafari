"use client";

import React, { useState } from "react";
import { SafariZone } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { ZoneCard } from "./ZoneCard";

interface ZoneGridProps {
  zones: SafariZone[];
  whatsAppLink: string;
}

export const ZoneGrid: React.FC<ZoneGridProps> = ({ zones, whatsAppLink }) => {
  const [filter, setFilter] = useState<"all" | "core" | "all-weather">("all");

  const filteredZones = zones.filter((zone) => {
    if (filter === "core") return zone.zoneType.includes("Core");
    if (filter === "all-weather") return zone.season.includes("365 Days");
    return true;
  });

  return (
    <section id="zones" className="py-16 sm:py-24 bg-[#E8E0CC]/35 border-b border-[#E8E0CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeader
            title="Corbett Safari Zones & Gates"
            subtitle="Permits are issued strictly zone-by-zone. Core zones feature prime tiger territories, while all-weather zones ensure uninterrupted safari access throughout the year."
            badgeText="Official Forest Gates"
            className="mb-0"
          />

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-[#FBF8F0] border border-[#E8E0CC] rounded-full self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#37482E] text-white shadow-xs"
                  : "text-[#17211A] hover:bg-[#E8E0CC]/50"
              }`}
            >
              All Zones ({zones.length})
            </button>
            <button
              onClick={() => setFilter("core")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === "core"
                  ? "bg-[#37482E] text-white shadow-xs"
                  : "text-[#17211A] hover:bg-[#E8E0CC]/50"
              }`}
            >
              Core Habitats
            </button>
            <button
              onClick={() => setFilter("all-weather")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === "all-weather"
                  ? "bg-[#37482E] text-white shadow-xs"
                  : "text-[#17211A] hover:bg-[#E8E0CC]/50"
              }`}
            >
              Open 365 Days
            </button>
          </div>
        </div>

        {/* Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredZones.map((zone) => (
            <ZoneCard
              key={zone.id}
              zone={zone}
              whatsAppLink={whatsAppLink}
            />
          ))}
        </div>

        {/* Honest Scarcity Notice Callout */}
        <div className="mt-12 p-5 bg-[#FBF8F0] border-l-4 border-[#B84C1E] rounded-[3px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-[#17211A] text-base">
              Limited Vehicle Quotas Apply Daily
            </h4>
            <p className="text-xs sm:text-sm text-[#17211A]/80 mt-1">
              Uttarakhand Forest Department allows only 30 gypsies per shift in Bijrani and Jhirna, and 4 canters in Dhikala. Advance verification guarantees your gate slot.
            </p>
          </div>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold text-[#B84C1E] uppercase hover:underline"
          >
            Check Tomorrow&apos;s Slots &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
