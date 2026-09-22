import React from "react";
import { TrustMetrics } from "../../../core/models";

interface TrustRowProps {
  metrics: TrustMetrics;
}

/**
 * TrustRow — Compact authority strip between hero and content.
 *
 * Mobile: single-row, 3 stats separated by hairline dividers.
 *   Total height ≈ 44px. Does not compete with the hero.
 * Desktop: 4-column centered grid. Display-heading optical tracking.
 *
 * Design: dark ink surface — stays in the same material family as
 * the header and zones section. No light sand here.
 */
export const TrustRow: React.FC<TrustRowProps> = ({ metrics }) => {
  return (
    <div
      className="bg-[#17211A] text-[#E8E0CC] border-b border-[#37482E]/60"
      style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)" }}
    >

      {/* ── MOBILE: Tight 3-stat strip ───────────────────────────────────── */}
      <div className="sm:hidden">
        <div className="flex items-stretch divide-x divide-[#37482E]/60">

          <div className="flex-1 py-2.5 text-center">
            <div className="display-heading text-[15px] font-bold font-serif text-[#FBF8F0] font-tabular leading-none">
              {metrics.licensedGypsies}
            </div>
            <div className="text-[9px] text-[#8A9468] mt-1 leading-none tracking-wide uppercase">Gypsies</div>
          </div>

          <div className="flex-1 py-2.5 text-center">
            <div className="display-heading text-[15px] font-bold font-serif text-[#FBF8F0] leading-none">9</div>
            <div className="text-[9px] text-[#8A9468] mt-1 leading-none tracking-wide uppercase">Zones</div>
          </div>

          <div className="flex-1 py-2.5 text-center">
            <div className="display-heading text-[15px] font-bold font-serif text-[#C99A3D] leading-none">100%</div>
            <div className="text-[9px] text-[#8A9468] mt-1 leading-none tracking-wide uppercase">Official</div>
          </div>

        </div>
      </div>

      {/* ── DESKTOP: 4-column grid ───────────────────────────────────────── */}
      <div className="hidden sm:block py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-4 divide-x divide-[#37482E]/50 text-center">

            <div className="px-4">
              <div className="display-heading text-xl lg:text-2xl font-bold font-serif text-[#C99A3D]">
                Ramnagar
              </div>
              <div className="w-6 h-px bg-[#C99A3D]/40 mx-auto mt-1.5 mb-1.5" />
              <div className="text-[11px] font-medium text-[#FBF8F0]/90">Local Booking Desk</div>
              <div className="text-[10px] text-[#8A9468] mt-0.5">Native drivers &amp; trackers</div>
            </div>

            <div className="px-4">
              <div className="display-heading text-xl lg:text-2xl font-bold font-serif text-[#FBF8F0] font-tabular">
                {metrics.licensedGypsies}
              </div>
              <div className="text-[11px] font-medium text-[#FBF8F0]/90 mt-1">Licensed Gypsies</div>
              <div className="text-[10px] text-[#8A9468] mt-0.5">{metrics.registeredGuides} registered guides</div>
            </div>

            <div className="px-4">
              <div className="display-heading text-xl lg:text-2xl font-bold font-serif text-[#FBF8F0]">
                9 Zones
              </div>
              <div className="text-[11px] font-medium text-[#FBF8F0]/90 mt-1">All Corbett Zones</div>
              <div className="text-[10px] text-[#8A9468] mt-0.5">Core, buffer &amp; landscape</div>
            </div>

            <div className="px-4">
              <div className="display-heading text-xl lg:text-2xl font-bold font-serif text-[#C99A3D]">
                100% Official
              </div>
              <div className="text-[11px] font-medium text-[#FBF8F0]/90 mt-1">Forest Dept Permits</div>
              <div className="text-[10px] text-[#8A9468] mt-0.5">Direct CTR gate authorization</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
