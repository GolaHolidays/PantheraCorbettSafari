import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  RestHouseRepository,
  SiteConfigRepository,
  FaqRepository,
} from "../../../core/database/repositories";
import { formatCurrencyINR } from "../../../core/utils/formatters";
import {
  SITE_URL,
  buildRestHouseSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
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

  // Rich, keyword-dense titles per FRH (concise so brand is never truncated)
  const titleMap: Record<string, string> = {
    "dhikala-forest-rest-house":
      "Dhikala Forest Rest House Booking | Core Zone Stay",
    "gairal-forest-rest-house":
      "Gairal Forest Rest House Booking | Ramganga River",
    "bijrani-forest-rest-house":
      "Bijrani Forest Rest House Booking | Core Zone Stay",
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
      siteName: "Panthera Corbett Safari",
      locale: "en_IN",
      url: canonical,
      title: `${title} | Panthera Corbett Safari`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${lodge.name} — Jim Corbett Tiger Reserve` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Panthera Corbett Safari`,
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

  // Filter 4-5 relevant FAQs for forest rest house stay
  const allFaqs = FaqRepository.getAll();
  const lodgeNameLower = lodge.name.toLowerCase();
  const lodgeFaqs = allFaqs
    .filter((f) => {
      const qLower = f.question.toLowerCase();
      const aLower = f.answer.toLowerCase();
      return (
        qLower.includes("forest rest house") ||
        qLower.includes("rest house") ||
        qLower.includes("dhikala") ||
        qLower.includes("night stay") ||
        qLower.includes("45-day") ||
        aLower.includes("forest rest house") ||
        aLower.includes(lodgeNameLower)
      );
    })
    .slice(0, 5);

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
  const faqSchema = lodgeFaqs.length > 0 ? buildFaqSchema(lodgeFaqs) : null;

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
      {/* FAQPage structured data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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

        {/* ─── FRH FAQS ───────────────────────────────────────────────────── */}
        {lodgeFaqs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E8E0CC]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A9468]">Night Stay Information</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mt-1">{lodge.name} Stay FAQ</h2>
              </div>
              <div className="space-y-3">
                {lodgeFaqs.map((faq, idx) => (
                  <details key={idx} className="group border border-[#E8E0CC] rounded-[4px] bg-white overflow-hidden shadow-xs">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-serif font-semibold text-sm sm:text-base text-[#17211A] select-none">
                      {faq.question}
                      <span className="ml-4 text-[#37482E] text-lg font-bold shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-[#17211A]/85 leading-relaxed border-t border-[#E8E0CC]/60 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── CORBETT PLANNING HUB / INTERNAL LINKS ──────────────────────── */}
        <div className="mt-16 pt-12 border-t border-[#E8E0CC]">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A9468]">Corbett Planning Hub</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mt-1">Explore Other Core Experiences</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/canter-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Dhikala Day Trip</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Canter Safari</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Can&apos;t get a night stay permit? Book open-roof Canter day safari into Dhikala at ₹2,299.</p>
            </Link>

            <Link
              href="/jeep-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Day Jeep Safari</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Jeep Safari Guide</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Exclusive 4x4 Gypsy across Bijrani, Jhirna, Garjiya and Dhela zones.</p>
            </Link>

            <Link
              href="/safari-price/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Tariff Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Prices 2026–27</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Detailed forest rest house tariffs, gypsy hiring charges, and guide fees.</p>
            </Link>

            <Link
              href="/delhi-to-jim-corbett-package/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">NCR Getaways</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Delhi 2N3D Packages</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Luxury resort stays, round-trip private cab from Delhi & guaranteed core jeep safari.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
