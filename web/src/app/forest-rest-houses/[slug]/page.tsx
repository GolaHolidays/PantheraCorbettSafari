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
import {
  SITE_URL,
  buildRestHouseSchema,
  buildBreadcrumbSchema,
} from "../../../core/utils/seo";
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

  const canonical = `${SITE_URL}/forest-rest-houses/${slug}/`;
  const ogImage = lodge.image.startsWith("http") ? lodge.image : `${SITE_URL}${lodge.image}`;

  // Rich, keyword-dense titles per FRH
  const titleMap: Record<string, string> = {
    "dhikala-forest-rest-house":
      "Dhikala Forest Rest House Booking | Inside Corbett Core Zone | ₹9,500/night",
    "gairal-forest-rest-house":
      "Gairal Forest Rest House Booking | Ramganga River | Jim Corbett",
    "bijrani-forest-rest-house":
      "Bijrani Forest Rest House Booking | Core Zone Stay | Jim Corbett",
  };
  const descMap: Record<string, string> = {
    "dhikala-forest-rest-house":
      "Book Dhikala Forest Rest House stay — government tariff from ₹9,500/room/night. Includes morning and evening Gypsy safaris, all vegetarian meals, inside the core zone. Permit window opens 45 days ahead.",
    "gairal-forest-rest-house":
      "Book Gairal Forest Rest House stay inside Jim Corbett core zone. On the Ramganga riverbank, with private morning and evening Gypsy safaris included. Government tariff, all meals.",
    "bijrani-forest-rest-house":
      "Book Bijrani Forest Rest House inside Jim Corbett. Exclusive inside-core-zone stay with morning and evening jeep safaris, all meals, government tariff. Book 45 days in advance.",
  };

  const title = titleMap[slug] ?? `${lodge.name} Booking | Jim Corbett Core Stay`;
  const description = descMap[slug] ?? lodge.description;

  return {
    title,
    description,
    keywords: [
      `${lodge.name.toLowerCase()} booking`,
      "jim corbett forest rest house booking",
      "dhikala frh booking",
      "corbett core zone overnight stay",
      "jim corbett overnight safari stay",
      "forest rest house jim corbett price",
    ],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${lodge.name} — Jim Corbett Tiger Reserve` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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

  const lodgeSchema = buildRestHouseSchema({
    name: lodge.name,
    description: lodge.description,
    image: lodge.image,
    slug,
    zone: lodge.zone,
    tariffPerNightINR: lodge.startingPriceINR,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Forest Rest Houses", href: "/#night-stays" },
    { name: lodge.name, href: `/forest-rest-houses/${slug}/` },
  ]);

  return (
    <div className="py-12 sm:py-20 bg-[#FBF8F0]">
      {/* Lodge structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgeSchema) }}
      />
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
