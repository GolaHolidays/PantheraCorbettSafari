import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  RestHouseRepository,
  SiteConfigRepository,
} from "../../../core/database/repositories";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

// SSG: Pre-generate all FRH static pages at build time
export function generateStaticParams() {
  const slugs = RestHouseRepository.getAvailableSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lodge = RestHouseRepository.getRestHouseBySlug(slug);
  if (!lodge) return { title: "Lodge Not Found" };

  return {
    title: `${lodge.name} Booking & Tariff | Jim Corbett Core Stay`,
    description: lodge.description,
  };
}

export default async function RestHouseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lodge = RestHouseRepository.getRestHouseBySlug(slug);

  if (!lodge) {
    notFound();
  }

  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    `Hello! I want to check forest rest house availability at ${lodge.name} (${lodge.zone}).`
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FBF8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/#night-stays" className="hover:underline">
            Forest Rest Houses
          </Link>
          <span>/</span>
          <span className="text-[#17211A] font-semibold">{lodge.name}</span>
        </nav>

        <div className="relative h-72 sm:h-96 w-full rounded-[4px] overflow-hidden bg-[#17211A] mb-8">
          <Image
            src={lodge.image}
            alt={lodge.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/40 to-transparent" />

          <div className="absolute top-4 left-4">
            <Badge variant="gold" size="md">
              Core Jungle Stay
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs text-[#C99A3D] font-bold uppercase tracking-wider block mb-1">
              {lodge.zone} · Season: {lodge.season}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FBF8F0]">
              {lodge.name}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-3">
                Wilderness Living Experience
              </h2>
              <p className="text-base text-[#17211A]/85 leading-relaxed">
                {lodge.description}
              </p>
            </div>

            {/* Room Categories */}
            <div className="bg-[#E8E0CC]/40 p-6 rounded-[4px] border border-[#E8E0CC]">
              <h3 className="font-serif text-lg font-bold text-[#17211A] mb-3">
                Room Categories & Accommodation
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {lodge.roomTypes.map((room, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white text-xs font-semibold rounded border border-[#E8E0CC] text-[#37482E]"
                  >
                    {room}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#8A9468]">
                Total Room Quota: {lodge.roomsAvailable} Rooms governed by Forest Department rules.
              </p>
            </div>

            {/* Guidelines & Rules */}
            <div className="p-6 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]">
              <h3 className="font-serif text-lg font-bold text-[#17211A] mb-3">
                Core Forest Stay Protocol
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#17211A]/90">
                {lodge.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#37482E] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#17211A] text-[#FBF8F0] border border-[#37482E] rounded-[4px] p-6 shadow-lg">
              <span className="text-xs text-[#8A9468] uppercase block">
                Govt Tariff Starting
              </span>
              <div className="font-serif text-3xl font-bold text-[#FBF8F0] font-tabular mt-1">
                {formatCurrencyINR(lodge.startingPriceINR)}
              </div>
              <p className="text-xs text-[#8A9468] mt-1 mb-6">
                {lodge.priceNote}
              </p>

              <div className="text-xs text-[#C99A3D] bg-[#C99A3D]/10 p-3 rounded-[3px] border border-[#C99A3D]/30 mb-6">
                <strong>Booking Timeline:</strong> {lodge.permitWindow}
              </div>

              <Button
                variant="primary"
                size="lg"
                href={whatsAppLink}
                isExternal
                className="w-full text-center mb-3"
              >
                Check FRH Permits
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
