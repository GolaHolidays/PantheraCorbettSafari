import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ZoneRepository,
  SiteConfigRepository,
} from "../../../core/database/repositories";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

// SSG: Pre-generate all static params from data_source at build time
export function generateStaticParams() {
  const slugs = ZoneRepository.getAvailableSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const zone = ZoneRepository.getZoneBySlug(slug);
  if (!zone) return { title: "Zone Not Found" };

  return {
    title: `${zone.name} Safari Booking & Permits | Jim Corbett`,
    description: zone.description,
  };
}

export default async function ZoneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const zone = ZoneRepository.getZoneBySlug(slug);

  if (!zone) {
    notFound();
  }

  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    `Hello Panthera Corbett! I want to check availability for ${zone.name}.`
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FBF8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/#zones" className="hover:underline">
            Safari Zones
          </Link>
          <span>/</span>
          <span className="text-[#17211A] font-semibold">{zone.name}</span>
        </nav>

        {/* Hero Photo & Header */}
        <div className="relative h-72 sm:h-96 w-full rounded-[4px] overflow-hidden bg-[#17211A] mb-8">
          <Image
            src={zone.image}
            alt={zone.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/40 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="forest" size="md">
              {zone.zoneType}
            </Badge>
            <Badge variant="gold" size="md">
              Sightings: {zone.sightingIndex}
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs text-[#C99A3D] font-bold uppercase tracking-wider block mb-1">
              Official Forest Gate: {zone.gate}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FBF8F0]">
              {zone.name}
            </h1>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-3">
                Overview & Terrain
              </h2>
              <p className="text-base text-[#17211A]/85 leading-relaxed">
                {zone.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-[#E8E0CC]/40 p-6 rounded-[4px] border border-[#E8E0CC]">
              <h3 className="font-serif text-lg font-bold text-[#17211A] mb-3">
                Key Habitat Highlights
              </h3>
              <ul className="space-y-2 text-sm text-[#17211A]/90">
                {zone.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#37482E] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best for */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#17211A] mb-3">
                Recommended For
              </h3>
              <div className="flex flex-wrap gap-2">
                {zone.bestFor.map((tag, idx) => (
                  <Badge key={idx} variant="moss" size="md">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Shift Rules */}
            <div className="p-6 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]">
              <h3 className="font-serif text-lg font-bold text-[#17211A] mb-2">
                Permit Quota & Shift Limits
              </h3>
              <p className="text-xs sm:text-sm text-[#17211A]/80 leading-relaxed mb-3">
                Uttarakhand Forest Department authorizes strict quotas per shift to preserve wildlife balance:
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#17211A]">
                {zone.permitQuotaPerShift.jeep && (
                  <div className="p-3 bg-white rounded border border-[#E8E0CC]">
                    <span className="text-[#8A9468] block">Jeep Quota:</span>
                    <span className="text-base font-bold text-[#37482E]">
                      {zone.permitQuotaPerShift.jeep} Jeeps / Shift
                    </span>
                  </div>
                )}
                {zone.permitQuotaPerShift.canter && (
                  <div className="p-3 bg-white rounded border border-[#E8E0CC]">
                    <span className="text-[#8A9468] block">Canter Quota:</span>
                    <span className="text-base font-bold text-[#37482E]">
                      {zone.permitQuotaPerShift.canter} Canters / Shift
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#17211A] text-[#FBF8F0] border border-[#37482E] rounded-[4px] p-6 shadow-lg">
              <div className="text-xs text-[#C99A3D] font-bold uppercase tracking-wider mb-1">
                Govt Authorized Booking
              </div>
              <div className="font-serif text-3xl font-bold text-[#FBF8F0] font-tabular">
                {formatCurrencyINR(zone.startingPriceINR)}
              </div>
              <p className="text-xs text-[#8A9468] mt-1 mb-6">
                {zone.priceNote}
              </p>

              <div className="space-y-3 mb-6 text-xs text-[#E8E0CC]/80 border-y border-[#37482E] py-4">
                <div className="flex justify-between">
                  <span>Permit Season:</span>
                  <strong className="text-white">{zone.season}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Entry Gate:</span>
                  <strong className="text-white">{zone.gate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle Options:</span>
                  <strong className="text-white">{zone.safariModes.join(", ")}</strong>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                href={whatsAppLink}
                isExternal
                className="w-full text-center mb-3"
              >
                Check {zone.name.split(" ")[0]} Permits
              </Button>

              <Button
                variant="outline"
                size="md"
                href={`tel:${contact.phoneRaw}`}
                className="w-full text-center text-white border-[#8A9468] hover:bg-[#37482E]"
              >
                Call Desk: {contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
