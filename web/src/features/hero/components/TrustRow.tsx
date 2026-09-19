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
          {/* Trust stat 1 */}
          <div className="border-r border-[#37482E]/60 last:border-r-0 px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C99A3D] font-tabular">
              {metrics.rating} ★
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              Google Business Rating
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              {metrics.reviewCount}+ verified reviews
            </div>
          </div>

          {/* Trust stat 2 */}
          <div className="border-r border-[#37482E]/60 last:border-r-0 px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#FBF8F0] font-tabular">
              {metrics.yearsServing}+ Years
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              Corbett Field Experience
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              Est. 2009 in Ramnagar
            </div>
          </div>

          {/* Trust stat 3 */}
          <div className="border-r border-[#37482E]/60 last:border-r-0 px-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#FBF8F0] font-tabular">
              {metrics.safarisCompleted}
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#FBF8F0] mt-0.5">
              Safaris Guided
            </div>
            <div className="text-[11px] text-[#8A9468] hidden sm:block">
              Core & buffer zones
            </div>
          </div>

          {/* Trust stat 4 */}
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
