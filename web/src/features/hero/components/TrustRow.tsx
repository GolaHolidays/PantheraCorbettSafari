import React from "react";
import { TrustMetrics } from "../../../core/models";

interface TrustRowProps {
  metrics: TrustMetrics;
}

export const TrustRow: React.FC<TrustRowProps> = ({ metrics }) => {
  return (
    <div className="bg-[#17211A] text-[#E8E0CC] border-y border-[#37482E] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {/* Stat 1 — Safaris completed */}
          <div className="border-r border-[#37482E]/60 last:border-r-0 px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C99A3D] font-tabular">
              {metrics.safarisCompleted}
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              Safaris Completed
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              Across all Corbett zones
            </div>
          </div>

          {/* Stat 2 — Licensed jeeps */}
          <div className="border-r border-[#37482E]/60 last:border-r-0 px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#FBF8F0] font-tabular">
              {metrics.licensedGypsies}
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              Licensed Jeeps
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              {metrics.registeredGuides} registered guides
            </div>
          </div>

          {/* Stat 3 — All 9 zones */}
          <div className="border-r border-[#37482E]/60 last:border-r-0 px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#FBF8F0] font-tabular">
              9 Zones
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              All Corbett Zones
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              Core, buffer & eco-corridors
            </div>
          </div>

          {/* Stat 4 — Official permits */}
          <div className="px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C99A3D]">
              100% Official
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              Forest Dept Permits
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              Direct CTR gate authorization
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
