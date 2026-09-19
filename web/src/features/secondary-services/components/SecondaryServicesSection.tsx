import React from "react";
import { SecondaryServicesData } from "../../../core/models";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface SecondaryServicesSectionProps {
  data: SecondaryServicesData;
  whatsAppLink: string;
}

export const SecondaryServicesSection: React.FC<SecondaryServicesSectionProps> = ({
  data,
  whatsAppLink,
}) => {
  return (
    <section
      id="secondary-services"
      className="py-16 sm:py-24 bg-[#FBF8F0] border-b border-[#E8E0CC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
          badgeText="Convenience Add-Ons"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((service) => {
            const serviceInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
              `Hello! I would like to enquire about: ${service.title}.`
            )}`;

            return (
              <div
                key={service.id}
                className="bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px] p-6 flex flex-col justify-between hover:border-[#8A9468] transition-all"
              >
                <div>
                  <Badge variant="moss" size="sm" className="mb-3">
                    {service.category}
                  </Badge>

                  <h3 className="font-serif text-xl font-bold text-[#17211A] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#17211A]/80 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-1 text-xs text-[#37482E] mb-4">
                    <span className="font-semibold block text-[#17211A]">
                      Available Options:
                    </span>
                    {service.vehicleOptions.map((opt, idx) => (
                      <span key={idx} className="inline-block mr-2 text-[11px] bg-white/70 px-2 py-0.5 rounded border border-[#E8E0CC]">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E8E0CC] pt-4 mt-2">
                  <div className="mb-3">
                    <span className="text-[11px] text-[#8A9468] block">
                      {service.priceNote}
                    </span>
                    <span className="font-serif text-xl font-bold text-[#17211A] font-tabular">
                      From {formatCurrencyINR(service.startingPriceINR)}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    href={serviceInquiryUrl}
                    isExternal
                    className="w-full text-center border-[#37482E] text-[#37482E] hover:bg-[#37482E] hover:text-white"
                  >
                    {service.actionText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
