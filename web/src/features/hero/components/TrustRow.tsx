import React from "react";
import { TrustMetrics } from "../../../core/models";

interface TrustRowProps {
  metrics: TrustMetrics;
}

/**
 * TrustRow — Mobile-first trust strip
 *
 * MOBILE (default):
 *   A slim single-row strip with 3 key stats separated by thin dividers.
 *   Total height ≈ 52px. Compact, legible, no wasted space.
 *   The 2×2 grid is gone — it was too dominant and felt like a cheap
 *   dashboard widget on a small screen.
 *
 *   Stats shown on mobile (chosen by impact):
 *   - Licensed Gypsies count (social proof number)
 *   - 9 Zones (scope signal)
 *   - 100% Official (trust anchor)
 *   Ramnagar is omitted — it's context for people who already know Corbett;
 *   the label is present in the hero copy.
 *
 * DESKTOP (sm+):
 *   The full 4-column grid, horizontally laid out.
 *   py-7 gives it breathing room.
 */
export const TrustRow: React.FC<TrustRowProps> = ({ metrics }) => {
  return (
    <div className="bg-[#17211A] text-[#E8E0CC] border-y border-[#37482E]">

      {/* ── MOBILE: Compact 3-stat inline strip ─────────────────────────── */}
      <div className="sm:hidden py-3 px-5">
        <div className="flex items-center justify-center gap-0">

          {/* Stat A */}
          <div className="flex-1 text-center px-2">
            <div className="text-base font-bold font-serif text-[#FBF8F0] font-tabular leading-none">
              {metrics.licensedGypsies}
            </div>
            <div className="text-[10px] text-[#8A9468] mt-1 leading-none">Licensed Gypsies</div>
          </div>

          {/* Divider */}
          <div className="w-px h-7 bg-[#37482E] flex-shrink-0" />

          {/* Stat B */}
          <div className="flex-1 text-center px-2">
            <div className="text-base font-bold font-serif text-[#FBF8F0] leading-none">9 Zones</div>
            <div className="text-[10px] text-[#8A9468] mt-1 leading-none">All Corbett</div>
          </div>

          {/* Divider */}
          <div className="w-px h-7 bg-[#37482E] flex-shrink-0" />

          {/* Stat C */}
          <div className="flex-1 text-center px-2">
            <div className="text-base font-bold font-serif text-[#C99A3D] leading-none">100%</div>
            <div className="text-[10px] text-[#8A9468] mt-1 leading-none">Official Permits</div>
          </div>

        </div>
      </div>

      {/* ── DESKTOP: Full 4-column grid ──────────────────────────────────── */}
      <div className="hidden sm:block py-7">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-6 text-center">

            {/* Stat 1 — Ramnagar */}
            <div className="border-r border-[#37482E]/50 px-2">
              <div className="text-2xl lg:text-3xl font-bold font-serif text-[#C99A3D]">Ramnagar</div>
              <div className="text-sm font-medium text-[#FBF8F0] mt-1">Local Booking Desk</div>
              <div className="text-[11px] text-[#8A9468] mt-0.5">Native drivers &amp; trackers</div>
            </div>

            {/* Stat 2 — Licensed Gypsies */}
            <div className="border-r border-[#37482E]/50 px-2">
              <div className="text-2xl lg:text-3xl font-bold font-serif text-[#FBF8F0] font-tabular">{metrics.licensedGypsies}</div>
              <div className="text-sm font-medium text-[#FBF8F0] mt-1">Licensed Gypsies</div>
              <div className="text-[11px] text-[#8A9468] mt-0.5">{metrics.registeredGuides} registered guides</div>
            </div>

            {/* Stat 3 — 9 Zones */}
            <div className="border-r border-[#37482E]/50 px-2">
              <div className="text-2xl lg:text-3xl font-bold font-serif text-[#FBF8F0]">9 Zones</div>
              <div className="text-sm font-medium text-[#FBF8F0] mt-1">All Corbett Zones</div>
              <div className="text-[11px] text-[#8A9468] mt-0.5">Core, buffer &amp; landscape</div>
            </div>

            {/* Stat 4 — 100% Official */}
            <div className="px-2">
              <div className="text-2xl lg:text-3xl font-bold font-serif text-[#C99A3D]">100% Official</div>
              <div className="text-sm font-medium text-[#FBF8F0] mt-1">Forest Dept Permits</div>
              <div className="text-[11px] text-[#8A9468] mt-0.5">Direct CTR gate authorization</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
