import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SafariPackage } from "../../../core/models";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface PackageCardProps {
  pkg: SafariPackage;
  whatsAppLink: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, whatsAppLink }) => {
  const packageInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
    `Hello! I want to enquire about the "${pkg.title}" package (${pkg.duration}).`
  )}`;

  return (
    <article className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[4px] overflow-hidden flex flex-col justify-between hover:border-[#8A9468] transition-all duration-200 hover:shadow-md">
      <div>
        {/* Photo with Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-[#17211A]">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211A]/85 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <Badge variant="gold" size="sm">
              {pkg.badge}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#37482E]/90 text-[#E8E0CC]">
              {pkg.duration}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17211A] leading-snug">
            {pkg.title}
          </h3>
          <p className="text-xs text-[#8A9468] font-medium mt-1">
            {pkg.subtitle}
          </p>

          {/* Key scannable parameters in under 5 seconds */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-y border-[#E8E0CC] py-3 text-[#17211A]">
            <div>
              <span className="text-[#8A9468] block">Zone:</span>
              <strong className="font-semibold">{pkg.zone}</strong>
            </div>
            <div>
              <span className="text-[#8A9468] block">Safaris:</span>
              <strong className="font-semibold">{pkg.safariCount}</strong>
            </div>
            <div className="col-span-2 pt-1">
              <span className="text-[#8A9468] block">Stay:</span>
              <span className="font-medium text-[#37482E] truncate block">
                {pkg.accommodation}
              </span>
            </div>
          </div>

          {/* Honest Scarcity Alert */}
          <p className="mt-3 text-[11px] text-[#B84C1E] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B84C1E] inline-block" />
            <span>{pkg.scarcityText}</span>
          </p>
        </div>
      </div>

      {/* Footer with Price and Pill CTA */}
      <div className="p-5 pt-0 border-t border-[#E8E0CC]/60 mt-2">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <span className="text-[11px] text-[#8A9468] uppercase font-semibold block">
              Package Price
            </span>
            <span className="font-serif text-2xl font-bold text-[#17211A] font-tabular">
              {pkg.priceDisplay}
            </span>
          </div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-xs font-semibold text-[#37482E] hover:underline"
          >
            View Itinerary →
          </Link>
        </div>

        <Button
          variant="primary"
          size="md"
          href={packageInquiryUrl}
          isExternal
          className="w-full text-center"
        >
          Enquire This Package
        </Button>
      </div>
    </article>
  );
};
