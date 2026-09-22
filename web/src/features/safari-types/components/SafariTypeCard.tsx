import React from "react";
import { SafariType } from "../../../core/models";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface SafariTypeCardProps {
  safari: SafariType;
  whatsAppLink: string;
}

export const SafariTypeCard: React.FC<SafariTypeCardProps> = ({
  safari,
  whatsAppLink,
}) => {
  const inquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
    `Hello! I want to check availability for ${safari.name}.`
  )}`;

  return (
    <div className="hover-lift bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <Badge variant="moss" size="sm">
            {safari.vehicle}
          </Badge>
          <span className="text-xs font-medium text-[#8A9468]">
            Capacity: {safari.capacity}
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mb-3 section-heading">
          {safari.name}
        </h3>

        <p className="text-sm text-[#17211A]/85 leading-relaxed mb-6">
          {safari.description}
        </p>

        {/* Shift Timings */}
        <div className="mb-6 space-y-2 bg-[#E8E0CC]/40 p-4 rounded-[var(--radius-chip)] border border-[#E8E0CC]">
          <span className="text-xs font-bold text-[#37482E] uppercase tracking-wider block">
            Permitted Daily Shifts
          </span>
          {safari.shifts.map((shift, idx) => (
            <div key={idx} className="flex items-baseline justify-between text-xs">
              <span className="font-semibold text-[#17211A]">{shift.name}:</span>
              <span className="text-[#37482E] font-medium font-tabular">{shift.timing}</span>
            </div>
          ))}
        </div>

        {/* Inclusions */}
        <div className="mb-6">
          <span className="text-xs font-bold text-[#37482E] uppercase tracking-wider block mb-2">
            What is Included:
          </span>
          <ul className="space-y-1.5 text-xs text-[#17211A]/90">
            {safari.inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#37482E] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transparent Rates Breakdown */}
        {safari.id === "jeep-safari" && (
          <div className="mb-6 p-4 rounded-[3px] bg-[#F4EFE6] border border-[#E8E0CC] space-y-3">
            <span className="text-xs font-bold text-[#37482E] uppercase tracking-wider block">
              Official Rate Card (All Costs Included)
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#FBF8F0] rounded border border-[#E8E0CC]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-[#17211A]">Core Zones — Pre-Booking (&gt;5 Days)</span>
                  <span className="font-bold text-[#B84C1E] font-tabular text-sm">₹7,999 / jeep</span>
                </div>
                <p className="text-[11px] text-[#17211A]/80">
                  Dhela, Jhirna, Bijrani, Garjiya, Durga Devi. Includes guide + permit + personal jeep + complimentary 10 km pickup/drop from Ramnagar.
                </p>
              </div>

              <div className="p-2.5 bg-[#FBF8F0] rounded border border-[#E8E0CC]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-[#17211A]">Core Zones — Current Booking (≤5 Days)</span>
                  <span className="font-bold text-[#B84C1E] font-tabular text-sm">₹8,499 / jeep</span>
                </div>
                <p className="text-[11px] text-[#17211A]/80">
                  Dhela, Jhirna, Bijrani, Garjiya, Durga Devi. Includes guide + permit + personal jeep + vehicle cost.
                </p>
              </div>

              <div className="p-2.5 bg-[#FBF8F0] rounded border border-[#E8E0CC]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-[#17211A]">Buffer &amp; Reserve Zones (Pre &amp; Current)</span>
                  <span className="font-bold text-[#37482E] font-tabular text-sm">₹5,999 – ₹6,499</span>
                </div>
                <p className="text-[11px] text-[#17211A]/80">
                  ₹6,499: Phato, Hathidangar, Sitabani (Pawalgarh Gate).<br />
                  ₹5,999: Sitabani (Teda Gate &amp; Bhandarpani Gate).<br />
                  Includes guide + permit + personal jeep + complimentary 10 km pickup/drop.
                </p>
              </div>
            </div>
          </div>
        )}

        {safari.id === "canter-safari" && (
          <div className="mb-6 p-4 rounded-[3px] bg-[#F4EFE6] border border-[#E8E0CC] space-y-3">
            <span className="text-xs font-bold text-[#37482E] uppercase tracking-wider block">
              Official Rate Card (All Costs Included)
            </span>
            <div className="p-2.5 bg-[#FBF8F0] rounded border border-[#E8E0CC] text-xs space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#17211A]">Dhikala Day Canter (16 Sharing)</span>
                <span className="font-bold text-[#B84C1E] font-tabular text-sm">₹2,299 / person</span>
              </div>
              <p className="text-[11px] text-[#17211A]/80">
                <strong>Pickup / Drop:</strong> Ramnagar / Dhangarhi Gate included.
              </p>
              <p className="text-[11px] text-[#17211A]/80">
                <strong>Open Season:</strong> 15 November to 15 June.
              </p>
              <p className="text-[11px] text-[#B84C1E] font-medium">
                <strong>Booking Advice:</strong> Book at least 15 to 20 days in advance for confirmed seat availability.
              </p>
            </div>
          </div>
        )}

        {/* Permit Notice */}
        <div className="text-xs text-[#B84C1E] bg-[#B84C1E]/5 p-3 rounded-[3px] border border-[#B84C1E]/20 mb-6">
          <strong className="block mb-0.5">Forest Quota Notice:</strong>
          {safari.permitNotice}
        </div>
      </div>

      <div className="border-t border-[#E8E0CC] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-[#8A9468] uppercase font-semibold block">
            {safari.priceBasis}
          </span>
          <span className="font-serif text-3xl font-bold text-[#17211A] font-tabular">
            {formatCurrencyINR(safari.startingPriceINR)}
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          href={inquiryUrl}
          isExternal
        >
          {safari.ctaText}
        </Button>
      </div>
    </div>
  );
};
