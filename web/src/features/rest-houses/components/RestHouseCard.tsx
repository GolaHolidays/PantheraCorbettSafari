import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ForestRestHouse } from "../../../core/models";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface RestHouseCardProps {
  lodge: ForestRestHouse;
  whatsAppLink: string;
}

export const RestHouseCard: React.FC<RestHouseCardProps> = ({
  lodge,
  whatsAppLink,
}) => {
  const lodgeInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
    `Hello! I want to check forest night stay availability at ${lodge.name} (${lodge.zone}).`
  )}`;

  return (
    <div className="bg-[#17211A] text-[#FBF8F0] border border-[#37482E] rounded-[4px] overflow-hidden flex flex-col justify-between hover:border-[#8A9468] transition-all duration-200">
      <div>
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={lodge.image}
            alt={lodge.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/40 to-transparent" />

          <div className="absolute top-3 left-3">
            <Badge variant="gold" size="sm">
              Core Forest Stay
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-xs text-[#C99A3D] font-semibold tracking-wide uppercase">
              {lodge.zone}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#FBF8F0] mt-0.5">
              {lodge.name}
            </h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs sm:text-sm text-[#E8E0CC]/85 line-clamp-3 leading-relaxed mb-4">
            {lodge.description}
          </p>

          <div className="space-y-2 mb-4 text-xs text-[#E8E0CC]/90">
            {lodge.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#C99A3D] font-bold">✓</span>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-[3px] bg-[#37482E]/50 border border-[#37482E] text-xs text-[#E8E0CC]">
            <span className="text-[#C99A3D] font-semibold block">Permit Window:</span>
            <span>{lodge.permitWindow}</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-[#37482E] mt-3">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <span className="text-[11px] text-[#8A9468] uppercase font-semibold block">
              Govt Tariff From
            </span>
            <span className="font-serif text-2xl font-bold text-[#FBF8F0] font-tabular">
              {formatCurrencyINR(lodge.startingPriceINR)}
            </span>
          </div>
          <Link
            href={`/forest-rest-houses/${lodge.slug}`}
            className="text-xs font-semibold text-[#C99A3D] hover:underline"
          >
            Lodge Rules →
          </Link>
        </div>

        <Button
          variant="primary"
          size="md"
          href={lodgeInquiryUrl}
          isExternal
          className="w-full text-center"
        >
          Check Night Stay Permits
        </Button>
      </div>
    </div>
  );
};
