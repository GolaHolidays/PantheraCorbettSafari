import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  PackageRepository,
  SiteConfigRepository,
} from "../../../core/database/repositories";
import {
  SITE_URL,
  buildPackageSchema,
  buildBreadcrumbSchema,
} from "../../../core/utils/seo";
import { Button } from "../../../shared/components/ui/button/Button";
import { Badge } from "../../../shared/components/ui/badge/Badge";

// SSG: Pre-generate all package static pages at build time
export function generateStaticParams() {
  const slugs = PackageRepository.getAvailableSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = PackageRepository.getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };

  const title = pkg.seoTitle ?? `${pkg.title} | Jim Corbett Safari Package`;
  const description = pkg.seoDescription ?? pkg.overview;
  const canonical = `${SITE_URL}/packages/${slug}`;

  return {
    title,
    description,
    ...(pkg.seoKeywords?.length ? { keywords: pkg.seoKeywords } : {}),
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [{ url: pkg.image.startsWith("http") ? pkg.image : `${SITE_URL}${pkg.image}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = PackageRepository.getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    `Hello! I want to enquire about the "${pkg.title}" safari tour package.`
  );

  const packageSchema = buildPackageSchema({
    title: pkg.seoTitle ?? pkg.title,
    overview: pkg.seoDescription ?? pkg.overview,
    image: pkg.image,
    slug,
    duration: pkg.duration,
    zone: pkg.zone,
    priceFromINR: pkg.startingPriceINR,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Tour Packages", href: "/#packages" },
    { name: pkg.title, href: `/packages/${slug}` },
  ]);

  const packageResorts = PackageRepository.getResortsForPackage(pkg);

  return (
    <div className="py-12 sm:py-20 bg-[#FBF8F0]">
      {/* Package structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }}
      />
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/#packages" className="hover:underline">
            Tour Packages
          </Link>
          <span>/</span>
          <span className="text-[#17211A] font-semibold">{pkg.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative h-72 sm:h-96 w-full rounded-[4px] overflow-hidden bg-[#17211A] mb-8">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/40 to-transparent" />

          <div className="absolute top-4 left-4">
            <Badge variant="gold" size="md">
              {pkg.badge}
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs text-[#E8E0CC] font-semibold uppercase tracking-wider block mb-1">
              {pkg.duration} · {pkg.zone}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FBF8F0]">
              {pkg.title}
            </h1>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-3">
                Tour Overview
              </h2>
              <p className="text-base text-[#17211A]/85 leading-relaxed">
                {pkg.overview}
              </p>
            </div>

            {/* Itinerary Highlights */}
            <div className="bg-[#E8E0CC]/40 p-6 rounded-[4px] border border-[#E8E0CC]">
              <h3 className="font-serif text-lg font-bold text-[#17211A] mb-3">
                Itinerary Schedule
              </h3>
              <ul className="space-y-3 text-sm text-[#17211A]/90">
                {pkg.itineraryHighlights.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#37482E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 bg-white border border-[#E8E0CC] rounded-[4px]">
                <h4 className="font-serif font-bold text-sm text-[#37482E] uppercase mb-3">
                  Package Inclusions
                </h4>
                <ul className="space-y-1.5 text-xs text-[#17211A]/90">
                  {pkg.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#37482E] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]">
                <h4 className="font-serif font-bold text-sm text-[#8A9468] uppercase mb-3">
                  Exclusions
                </h4>
                <ul className="space-y-1.5 text-xs text-[#17211A]/80">
                  {pkg.exclusions.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B84C1E] font-bold">×</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Associated / Available Resort Accommodations */}
            {packageResorts.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E8E0CC]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-serif text-xl font-bold text-[#17211A]">
                    Available Resort Accommodations
                  </h3>
                  <span className="text-xs text-[#8A9468] font-medium">
                    {packageResorts.length} curated options available for this package
                  </span>
                </div>
                <p className="text-xs text-[#17211A]/80 leading-relaxed">
                  Choose your preferred stay tier when booking this package. We partner with top Corbett wildlife resorts ranging from 3-star boutique retreats to 5-star luxury estates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {packageResorts.map((resort) => {
                    const badgeVariant =
                      resort.category === "5-star"
                        ? "gold"
                        : resort.category === "4-star"
                        ? "ember"
                        : "moss";

                    return (
                      <div
                        key={resort.id}
                        className="bg-white border border-[#E8E0CC] rounded-[4px] overflow-hidden flex flex-col hover:border-[#37482E] transition-all shadow-xs"
                      >
                        <div className="relative h-40 w-full bg-[#17211A]">
                          <Image
                            src={resort.image}
                            alt={resort.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                            <Badge variant={badgeVariant} size="sm">
                              {resort.category.toUpperCase()}
                            </Badge>
                            {resort.location.riverFront && (
                              <Badge variant="forest" size="sm">
                                Riverfront
                              </Badge>
                            )}
                          </div>
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-baseline justify-between text-white text-xs">
                            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-medium text-[#FBF8F0]">
                              {resort.priceRange.priceDisplay} / night
                            </span>
                            <span className="bg-[#37482E]/90 px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#C99A3D]">
                              ★ {resort.rating ?? 4.5}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#17211A] leading-snug mb-1">
                              {resort.name}
                            </h4>
                            <p className="text-xs text-[#8A9468] mb-2 font-medium">
                              {resort.location.area} · {resort.location.distanceFromStation}
                            </p>
                            <p className="text-xs text-[#17211A]/75 line-clamp-2 leading-relaxed mb-3">
                              {resort.tagline}
                            </p>
                          </div>

                          <div className="pt-2.5 border-t border-[#E8E0CC]/60 flex items-center justify-between text-[11px]">
                            <span className="text-[#37482E] font-medium truncate max-w-[180px]">
                              {resort.amenities.slice(0, 2).join(" · ")}
                            </span>
                            <a
                              href={SiteConfigRepository.getWhatsAppLink(
                                `Hello! I would like to book the "${pkg.title}" with a stay at ${resort.name}.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B84C1E] hover:underline font-semibold text-xs whitespace-nowrap"
                            >
                              Choose Stay →
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#17211A] text-[#FBF8F0] border border-[#37482E] rounded-[4px] p-6 shadow-lg">
              <span className="text-xs text-[#8A9468] uppercase block">
                Total Tour Price
              </span>
              <div className="font-serif text-3xl font-bold text-[#FBF8F0] font-tabular mt-1">
                {pkg.priceDisplay}
              </div>
              <p className="text-xs text-[#8A9468] mt-1 mb-6">
                {pkg.priceNote}
              </p>

              <div className="text-xs text-[#B84C1E] bg-[#B84C1E]/10 p-3 rounded-[3px] border border-[#B84C1E]/30 mb-6">
                <strong>Government Notice:</strong> {pkg.scarcityText}
              </div>

              <Button
                variant="primary"
                size="lg"
                href={whatsAppLink}
                isExternal
                className="w-full text-center mb-3"
              >
                Enquire This Package
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
