import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SafariZone } from "../../../core/models";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface ZoneCardProps {
  zone: SafariZone;
  whatsAppLink: string;
}

export const ZoneCard: React.FC<ZoneCardProps> = ({ zone, whatsAppLink }) => {
  const zoneInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
    `Hello! I want to check safari permit availability for ${zone.name} (${zone.zoneType}).`
  )}`;

  return (
    <article className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[4px] overflow-hidden flex flex-col justify-between hover:border-[#8A9468] transition-all duration-200 hover:shadow-md group">
      <div>
        {/* Card Header & Photo */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#17211A]">
          <Image
            src={zone.image}
            alt={`${zone.name} in Jim Corbett`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211A]/90 via-[#17211A]/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <Badge variant="forest" size="sm">
              {zone.zoneType}
            </Badge>
            <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-[#17211A]/80 text-[#C99A3D] border border-[#C99A3D]/40 backdrop-blur-xs">
              Sightings: {zone.sightingIndex}
            </span>
          </div>

          {/* Zone Title on Image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-serif text-2xl font-bold text-[#FBF8F0] drop-shadow-sm">
              {zone.name}
            </h3>
            <p className="text-xs text-[#E8E0CC]/90 line-clamp-1 mt-0.5">
              Gate: {zone.gate}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-[#17211A]/80 line-clamp-2 leading-relaxed mb-4">
            {zone.tagline}
          </p>

          {/* Key highlights bullet points */}
          <ul className="space-y-1.5 mb-4 text-xs text-[#17211A]/90">
            {zone.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#37482E] font-bold">✓</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Season status */}
          <div className="text-xs py-2 px-3 rounded-[3px] bg-[#E8E0CC]/50 border border-[#E8E0CC] flex items-center justify-between">
            <span className="text-[#37482E] font-medium">Permit Season:</span>
            <span className="font-semibold text-[#17211A]">{zone.season}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Primary CTA */}
      <div className="p-4 sm:p-5 pt-0 border-t border-[#E8E0CC]/60 mt-3">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-[11px] text-[#8A9468] uppercase font-semibold">
              Starts From
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#17211A] font-tabular">
              {formatCurrencyINR(zone.startingPriceINR)}
            </div>
          </div>
          <div className="text-right">
            <Link
              href={`/zones/${zone.slug}`}
              className="text-xs font-semibold text-[#37482E] hover:underline"
            >
              Zone Details →
            </Link>
          </div>
        </div>

        {/* Action Button: Rounded pill in Ember */}
        <Button
          variant="primary"
          size="md"
          href={zoneInquiryUrl}
          isExternal
          className="w-full text-center"
        >
          Check {zone.name.split(" ")[0]} Permits
        </Button>
      </div>
    </article>
  );
};
