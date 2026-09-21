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
import {
  SITE_URL,
  ZONE_SEO_MAP,
  buildZoneSchema,
  buildBreadcrumbSchema,
} from "../../../core/utils/seo";
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

  // Read from ZONE_SEO_MAP — falls back to a sensible default for any future zone
  const seoEntry = ZONE_SEO_MAP[slug] ?? {
    title: `${zone.name} Safari Booking — Jim Corbett`,
    description: `Book ${zone.name} safari with Panthera Corbett Safari. ${zone.season}. Starting ₹${zone.startingPriceINR.toLocaleString("en-IN")}. ${zone.description.slice(0, 100)}...`,
    keywords: [`${zone.name.toLowerCase()} booking`, "jim corbett safari booking"],
  };

  const canonical = `${SITE_URL}/zones/${zone.slug}`;
  const ogImage = zone.image.startsWith("http") ? zone.image : `${SITE_URL}${zone.image}`;

  return {
    title: seoEntry.title,
    description: seoEntry.description,
    keywords: seoEntry.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: seoEntry.title,
      description: seoEntry.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${zone.name} — Jim Corbett Tiger Reserve` }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoEntry.title,
      description: seoEntry.description,
      images: [ogImage],
    },
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

  // Build JSON-LD schemas via pure seo.ts functions — no inline objects here
  const zoneSchema = buildZoneSchema(zone);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Safari Zones", href: "/#zones" },
    { name: zone.name, href: `/zones/${zone.slug}` },
  ]);

  return (
    <div className="py-12 sm:py-20 bg-[#FBF8F0]">
      {/* Zone structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zoneSchema) }}
      />
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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

            {/* Pricing Breakdown & Inclusions Box */}
            <div className="p-6 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-serif text-lg font-bold text-[#17211A]">
                  All-Inclusive Safari Tariff &amp; Inclusions
                </h3>
                <span className="text-[11px] font-semibold text-[#37482E] bg-[#E8E0CC] px-2.5 py-1 rounded-full">
                  No Hidden Costs
                </span>
              </div>

              {/* Dhikala Pricing Breakdown */}
              {zone.id === "dhikala" && (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded border border-[#E8E0CC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <div className="font-bold text-[#17211A] text-base">Day Visit Canter Safari</div>
                      <div className="text-xs text-[#8A9468]">16 Person Sharing Open Safari Bus</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold font-serif text-[#B84C1E] font-tabular">₹2,299</div>
                      <div className="text-[11px] text-[#8A9468]">per person / seat</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#17211A]/85 space-y-2 bg-white/70 p-3.5 rounded border border-[#E8E0CC]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#37482E] font-bold">✓</span>
                      <span><strong>Pickup / Drop:</strong> Ramnagar / Dhangarhi Gate included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#37482E] font-bold">✓</span>
                      <span><strong>Season:</strong> 15 November to 15 June (closed during monsoon)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B84C1E]">
                      <span className="font-bold">⚠</span>
                      <span><strong>Advance Booking:</strong> Book at least 15 to 20 days in advance for better availability</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Core Zones Pricing Breakdown */}
              {["bijrani", "jhirna", "dhela", "garjiya", "durga-devi"].includes(zone.id) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded border-2 border-[#37482E]/30 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#37482E] bg-[#E8E0CC]/80 px-2 py-0.5 rounded">
                        Pre-Booking Rate
                      </span>
                      <h4 className="font-bold text-[#17211A] text-sm mt-1.5 mb-1">Booked &gt; 5 Days Ahead</h4>
                      <p className="text-[11px] text-[#17211A]/75 mb-3">
                        Includes complimentary hotel transfer within 10 km radius.
                      </p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-serif text-[#37482E] font-tabular">₹7,999</div>
                      <div className="text-[11px] text-[#8A9468]">per personal jeep (up to 6 guests)</div>
                      <div className="text-[11px] text-[#37482E] font-medium mt-2 pt-2 border-t border-[#E8E0CC]">
                        ✓ Guide + Permit + Personal Jeep + Jeep Cost + Complimentary pickup/drop up to 10 km from Ramnagar
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded border border-[#E8E0CC] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B84C1E] bg-[#B84C1E]/10 px-2 py-0.5 rounded">
                        Current Zone Booking
                      </span>
                      <h4 className="font-bold text-[#17211A] text-sm mt-1.5 mb-1">Booked Within 5 Days</h4>
                      <p className="text-[11px] text-[#17211A]/75 mb-3">
                        Last-minute slot confirmation subject to gate availability.
                      </p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-serif text-[#17211A] font-tabular">₹8,499</div>
                      <div className="text-[11px] text-[#8A9468]">per personal jeep (up to 6 guests)</div>
                      <div className="text-[11px] text-[#17211A]/80 font-medium mt-2 pt-2 border-t border-[#E8E0CC]">
                        ✓ Guide + Permit + Personal Jeep + Jeep Cost
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Buffer & Reserve Zones Breakdown */}
              {(zone.id === "phato" || zone.id === "hathidangar") && (
                <div className="p-4 bg-white rounded border border-[#E8E0CC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#37482E] bg-[#E8E0CC]/80 px-2 py-0.5 rounded">
                      Standard Rate (Pre &amp; Current)
                    </span>
                    <h4 className="font-bold text-[#17211A] text-base mt-1">Personal 4x4 Gypsy Safari</h4>
                    <p className="text-xs text-[#17211A]/75 mt-1">
                      Includes guide + permit + personal jeep + jeep cost + complimentary pickup/drop up to 10 km radius from Ramnagar.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold font-serif text-[#B84C1E] font-tabular">₹6,499</div>
                    <div className="text-[11px] text-[#8A9468]">per jeep (up to 6 guests)</div>
                  </div>
                </div>
              )}

              {zone.id === "sitabani" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white rounded border border-[#E8E0CC]">
                      <div className="font-bold text-[#17211A] text-sm">Teda Gate &amp; Bhandarpani Gate</div>
                      <div className="text-xs text-[#8A9468] mb-2">Pre &amp; Current Booking</div>
                      <div className="text-xl font-bold font-serif text-[#37482E] font-tabular">₹5,999 / jeep</div>
                    </div>
                    <div className="p-3.5 bg-white rounded border border-[#E8E0CC]">
                      <div className="font-bold text-[#17211A] text-sm">Pawalgarh Gate</div>
                      <div className="text-xs text-[#8A9468] mb-2">Pre &amp; Current Booking</div>
                      <div className="text-xl font-bold font-serif text-[#B84C1E] font-tabular">₹6,499 / jeep</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#17211A]/80 bg-white/70 p-3 rounded border border-[#E8E0CC]">
                    <strong>Inclusions on all gates:</strong> Authorized guide + forest permit + personal jeep + jeep cost + complimentary pickup/drop up to 10 km radius from Ramnagar.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#17211A] text-[#FBF8F0] border border-[#37482E] rounded-[4px] p-6 shadow-lg">
              <div className="text-xs text-[#C99A3D] font-bold uppercase tracking-wider mb-1">
                {zone.id === "dhikala" ? "Per Person Tariff" : "Personal Jeep Booking"}
              </div>
              <div className="font-serif text-3xl font-bold text-[#FBF8F0] font-tabular">
                {formatCurrencyINR(zone.startingPriceINR)}
              </div>
              <p className="text-xs text-[#E8E0CC]/80 mt-1 mb-6 leading-relaxed">
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
