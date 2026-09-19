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
    <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[4px] p-6 sm:p-8 flex flex-col justify-between hover:border-[#8A9468] transition-all duration-200">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <Badge variant="moss" size="sm">
            {safari.vehicle}
          </Badge>
          <span className="text-xs font-medium text-[#8A9468]">
            Capacity: {safari.capacity}
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mb-3">
          {safari.name}
        </h3>

        <p className="text-sm text-[#17211A]/85 leading-relaxed mb-6">
          {safari.description}
        </p>

        {/* Shift Timings */}
        <div className="mb-6 space-y-2 bg-[#E8E0CC]/40 p-4 rounded-[3px] border border-[#E8E0CC]">
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
