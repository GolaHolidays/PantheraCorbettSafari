"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SafariPackage } from "../../../core/models";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";
import { trackPackageInquiry, trackWhatsAppClick } from "@/core/analytics/gtm";

interface PackageCardProps {
  pkg: SafariPackage;
  whatsAppLink: string;
}

/**
 * PackageCard — Light surface card for the Packages section.
 *
 * Key upgrades (Phase 5):
 *   - Radius: rounded-[4px] → rounded-[var(--radius-card)] (20px squircle approx.)
 *   - Concentric rule: inner image has overflow:hidden clipped by parent radius.
 *   - hover-lift CSS class: translateY(-3px) + shadow bloom from globals.css.
 *   - spring-press via Button component.
 *   - Info pills replace 2×2 grid: Zone · Safaris · Duration — scannable in <3s.
 *   - Scarcity badge: amber pill instead of red dot + text.
 *   - Context-aware WhatsApp pre-fill (already correct — preserved).
 */
export const PackageCard: React.FC<PackageCardProps> = ({ pkg, whatsAppLink }) => {
  const packageInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
    `Hello! I want to enquire about the "${pkg.title}" package (${pkg.duration}).`
  )}`;

  return (
    <article className="hover-lift bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] overflow-hidden flex flex-col justify-between">
      {/* ── Photo ───────────────────────────────────────────────────────── */}
      <div className="relative h-[44vw] sm:h-48 w-full overflow-hidden bg-[#17211A] flex-shrink-0">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17211A]/80 via-transparent to-transparent" />

        {/* Gold badge top-left */}
        <div className="absolute top-3 left-3">
          <Badge variant="gold" size="sm">{pkg.badge}</Badge>
        </div>

        {/* Duration chip bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-none bg-[#37482E]/90 text-[#E8E0CC] backdrop-blur-sm">
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#17211A] leading-snug section-heading">
            {pkg.title}
          </h3>
          <p className="text-xs text-[#8A9468] font-medium mt-1 mb-4">
            {pkg.subtitle}
          </p>

          {/* Package Itinerary Specs — clean 2-column key-value grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs mb-3.5 py-2.5 px-3 rounded-[var(--radius-chip)] bg-[#F4EFE6] border border-[#E8E0CC]/80">
            <div>
              <span className="text-[#8A9468] block text-[10px] uppercase font-semibold tracking-wider">Zone</span>
              <span className="font-semibold text-[#17211A] text-[11px] leading-snug block truncate">{pkg.zone}</span>
            </div>
            <div>
              <span className="text-[#8A9468] block text-[10px] uppercase font-semibold tracking-wider">Safaris</span>
              <span className="font-semibold text-[#17211A] text-[11px] leading-snug block truncate">{pkg.safariCount}</span>
            </div>
            <div className="col-span-2 pt-1.5 border-t border-[#E8E0CC]/70">
              <span className="text-[#8A9468] block text-[10px] uppercase font-semibold tracking-wider">Stay</span>
              <span className="font-semibold text-[#17211A] text-[11px] leading-snug block line-clamp-1">{pkg.accommodation}</span>
            </div>
          </div>

          {/* Scarcity — amber badge, strictly sharp */}
          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#B84C1E] bg-[#B84C1E]/8 border border-[#B84C1E]/20 px-2.5 py-1 rounded-none">
              <span className="w-1.5 h-1.5 rounded-none bg-[#B84C1E] flex-shrink-0" />
              {pkg.scarcityText}
            </span>
          </div>
        </div>

        {/* ── Footer: price + CTA ─────────────────────────────────────────── */}
        <div className="pt-4 mt-4 border-t border-[#E8E0CC]/70">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-[#8A9468] uppercase font-semibold tracking-wide block">
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
            onClick={() => {
              trackPackageInquiry(pkg.title, pkg.priceDisplay);
              trackWhatsAppClick(`Package Enquiry: ${pkg.title}`, { package_slug: pkg.slug });
            }}
            className="w-full text-center"
          >
            Enquire This Package
          </Button>
        </div>
      </div>
    </article>
  );
};
