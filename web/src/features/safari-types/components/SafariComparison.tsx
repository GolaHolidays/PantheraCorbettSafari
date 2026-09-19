import React from "react";
import { SafariType } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { SafariTypeCard } from "./SafariTypeCard";

interface SafariComparisonProps {
  safariTypes: SafariType[];
  whatsAppLink: string;
}

export const SafariComparison: React.FC<SafariComparisonProps> = ({
  safariTypes,
  whatsAppLink,
}) => {
  return (
    <section id="safari-types" className="py-16 sm:py-24 bg-[#E8E0CC]/20 border-b border-[#E8E0CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Jeep Safari vs Canter Safari"
          subtitle="Understanding vehicle types is key to planning your Corbett safari. Exclusive 4x4 Gypsies navigate private trails across all zones, while 16-seater Canters grant day-safari access into the protected grasslands of Dhikala."
          badgeText="Vehicle Comparison"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {safariTypes.map((type) => (
            <SafariTypeCard
              key={type.id}
              safari={type}
              whatsAppLink={whatsAppLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
