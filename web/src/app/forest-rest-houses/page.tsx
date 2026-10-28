import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  RestHouseRepository,
  SiteConfigRepository,
} from "../../core/database/repositories";
import {
  LANDING_PAGE_SEO,
  generatePageMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "../../core/utils/seo";
import { Button, Badge, SectionHeader } from "../../shared";
import { formatCurrencyINR } from "../../core/utils/formatters";
import { HugeiconsIcon } from "@hugeicons/react";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import AlertCircleIcon from "@hugeicons/core-free-icons/AlertCircleIcon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["forest-rest-houses"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: [
    ...SEO.keywords,
    "dhikala night stay booking",
    "gairal rest house tariff",
    "bijrani forest rest house permit",
    "jim corbett core lodge booking online",
  ],
});

// ─── Static Data ──────────────────────────────────────────────────────────────

const FRH_FAQS = [
  {
    category: "Forest Rest House",
    question: "How do I book a night stay at Dhikala or Bijrani Forest Rest House?",
    answer:
      "All Forest Rest House permits are released by the Uttarakhand Forest Department online portal exactly 45 days in advance at 10:00 AM (for Indian citizens) and 90 days in advance (for foreign nationals). Quotas for Dhikala, Gairal, and Bijrani fill within seconds. Panthera Corbett Safari provides permit booking assistance, document pre-validation, and registered Gypsy driver coordination.",
  },
  {
    category: "Forest Rest House",
    question: "What is included in a Forest Rest House booking?",
    answer:
      "Government FRH room permits cover your accommodation inside the core tiger reserve. A registered 4x4 Gypsy and authorized nature guide must accompany you throughout your stay for gate entry, morning safari, evening safari, and exit transfer. All meals (strictly vegetarian) are provided by the Forest Department canteen at fixed departmental tariffs.",
  },
  {
    category: "Forest Rest House",
    question: "Are non-vegetarian food and alcohol allowed inside Forest Rest Houses?",
    answer:
      "No. Non-vegetarian food and alcohol are strictly prohibited inside Jim Corbett National Park and all Forest Rest Houses. The in-house forest canteens serve simple, hygienic, freshly prepared North Indian vegetarian buffet meals.",
  },
  {
    category: "Forest Rest House",
    question: "Is electricity available 24/7 inside Dhikala and Gairal lodges?",
    answer:
      "Solar electricity and generator backup are operational during specified daytime and evening hours (generally 5:00 PM to 10:00 PM) for room lighting, hot water, and camera/mobile charging. Air conditioners are not permitted inside core forest lodges to maintain the natural wilderness environment.",
  },
  {
    category: "Forest Rest House",
    question: "How many Gypsy safaris are permitted per day during an FRH stay?",
    answer:
      "Guests staying inside a core Forest Rest House are entitled to exclusive morning and afternoon Gypsy safaris within that zone's restricted tracks, plus the entry drive from the park gate and exit drive on checkout day.",
  },
];

export default function ForestRestHousesIndexPage() {
  const restHouses = RestHouseRepository.getAllRestHouses();
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett Safari, I want to enquire about booking a night stay at Jim Corbett Forest Rest Houses (Dhikala / Gairal / Bijrani)."
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Forest Rest Houses", href: "/forest-rest-houses/" },
  ]);
  const faqSchema = buildFaqSchema(FRH_FAQS);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Jim Corbett National Park Forest Rest Houses",
    description: "Official core zone heritage lodges for overnight wildlife stays.",
    numberOfItems: restHouses.length,
    itemListElement: restHouses.map((lodge, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: lodge.name,
      url: `${SITE_URL}/forest-rest-houses/${lodge.slug}/`,
      image: lodge.image.startsWith("http") ? lodge.image : `${SITE_URL}${lodge.image}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ─── HERO BANNER ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#17211A] text-[#FBF8F0] py-16 sm:py-24 overflow-hidden border-b border-[#37482E]">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/image/photo-1547471080-7cc2caa01a7e.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/85 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="mb-6 flex justify-center items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FBF8F0]">Forest Rest Houses</span>
          </nav>

          <Badge variant="gold" size="md" className="mb-4">
            Core Zone Heritage Lodges
          </Badge>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] tracking-tight leading-tight mb-4">
            Jim Corbett Forest Rest Houses
          </h1>
          <p className="text-sm sm:text-lg text-[#E8E0CC]/85 max-w-2xl mx-auto leading-relaxed mb-6">
            Stay overnight deep inside the tiger reserve at Dhikala, Gairal, and Bijrani. Experience morning and evening Gypsy safaris with zero commuting and genuine jungle sounds.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#B84C1E]/20 border border-[#B84C1E]/40 px-4 py-2 rounded-full text-xs text-[#E8E0CC] mb-8">
            <HugeiconsIcon icon={AlertCircleIcon} size={16} className="text-[#B84C1E]" />
            <span>Permits release strictly 45 days in advance at 10:00 AM. Advance registration strongly recommended.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center justify-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>Check FRH Permit Availability</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="text-[#FBF8F0] border-[#8A9468]/50 hover:border-[#E8E0CC] inline-flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={Call02Icon} size={18} />
              <span>Call Ramnagar Desk: {contact.phoneDisplay}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── LODGE CARDS GRID ──────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Official Core Zone Forest Lodges"
            subtitle="Government-administered heritage rest houses offering exclusive overnight access inside Jim Corbett National Park."
            badgeText="Core Stays"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {restHouses.map((lodge) => {
              const lodgeInquiryUrl = `${whatsAppLink}&text=${encodeURIComponent(
                `Hello! I want to check night stay permits for ${lodge.name} (${lodge.zone}).`
              )}`;

              return (
                <article
                  key={lodge.id}
                  className="bg-white border border-[#E8E0CC] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-[#17211A]">
                      <Image
                        src={lodge.image}
                        alt={lodge.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="gold" size="sm">
                          {lodge.zone}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-baseline">
                        <span className="text-xs text-[#E8E0CC]/90">Season: {lodge.season}</span>
                        <span className="text-xs bg-[#37482E]/90 px-2 py-0.5 rounded text-[#C99A3D] font-bold">
                          {lodge.roomsAvailable} Rooms
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h2 className="font-serif text-xl font-bold text-[#17211A] group-hover:text-[#37482E] transition-colors mb-2">
                        {lodge.name}
                      </h2>
                      <p className="text-xs text-[#17211A]/75 leading-relaxed line-clamp-3 mb-4">
                        {lodge.description}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {lodge.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#37482E]">
                            <span className="font-bold">✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 rounded bg-[#F4EFE6] border border-[#E8E0CC] text-xs text-[#17211A]">
                        <span className="text-[#8A9468] block font-semibold text-[11px] uppercase">Permit Window:</span>
                        <span>{lodge.permitWindow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#E8E0CC]/80 mt-2">
                    <div className="flex items-baseline justify-between mb-3 pt-3">
                      <div>
                        <span className="text-[10px] text-[#8A9468] uppercase font-semibold block">
                          Govt Tariff From
                        </span>
                        <span className="font-serif text-2xl font-bold text-[#17211A] font-tabular">
                          {formatCurrencyINR(lodge.startingPriceINR)}
                        </span>
                        <span className="text-[10px] text-[#8A9468]"> / night</span>
                      </div>
                      <Link
                        href={`/forest-rest-houses/${lodge.slug}/`}
                        className="text-xs font-bold text-[#B84C1E] hover:underline"
                      >
                        Lodge Details →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        href={lodgeInquiryUrl}
                        isExternal
                        className="w-full text-center text-xs"
                      >
                        Check Quota
                      </Button>
                      <Link
                        href={`/forest-rest-houses/${lodge.slug}/`}
                        className="inline-flex items-center justify-center text-xs font-semibold px-3 py-2 border border-[#37482E] text-[#37482E] rounded hover:bg-[#37482E] hover:text-white transition-colors"
                      >
                        View Rooms
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ESSENTIAL FRH STAY RULES ─────────────────────────────────────── */}
      <section className="py-14 bg-white border-y border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Important Forest Rest House Protocols"
            subtitle="Key regulations established by the Uttarakhand Forest Department for all guests residing inside the core zone."
            badgeText="Rules & Guidelines"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
              <div className="w-9 h-9 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] font-bold mb-3">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">Strict Booking Window</h3>
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                Permits open exactly 45 days in advance at 10:00 AM IST for Indian nationals and 90 days for foreigners. Bookings cannot be transferred or rescheduled once issued.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
              <div className="w-9 h-9 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] font-bold mb-3">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">Mandatory Registered Gypsy</h3>
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                Private cars are prohibited inside the core zone. Guests must hire a registered 4x4 Gypsy and forest guide for the entire duration of their stay.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
              <div className="w-9 h-9 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] font-bold mb-3">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">100% Vegetarian Dining</h3>
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                Non-veg food and alcohol are strictly prohibited. In-house forest canteens prepare delicious, nutritious vegetarian buffet meals at government rates.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
              <div className="w-9 h-9 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] font-bold mb-3">
                4
              </div>
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">Electric Fence Curfew</h3>
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                All FRH compounds are protected by solar electric fencing. Stepping outside the fenced compound after sunset (gate closure) is illegal and punishable by law.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
              <div className="w-9 h-9 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] font-bold mb-3">
                5
              </div>
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">Zero Plastic &amp; Sound Zone</h3>
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                Single-use plastic bottles and music players are strictly forbidden. Quiet observation allows predators and deer to move naturally near the lodge perimeter.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
              <div className="w-9 h-9 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] font-bold mb-3">
                6
              </div>
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">Exclusive Wildlife Safaris</h3>
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                Night stay guests enjoy morning and afternoon safaris in the zone before and after day tourists arrive, providing unparalleled photography opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPIDER-WEB MESH: CORBETT PLANNING HUB ────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A9468]">Corbett Planning Hub</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mt-1">Explore More Safari Services &amp; Resources</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/canter-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Dhikala Day Safari</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Canter Safari (Dhikala)</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Couldn&apos;t get a night stay permit? Book the 16-seater sharing Canter into Dhikala grassland at ₹2,299.</p>
            </Link>

            <Link
              href="/jeep-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Day Gypsy Tours</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Jeep Safari Booking</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Book private 4x4 Gypsies across Bijrani, Jhirna, Garjiya, and Dhela with expert local drivers.</p>
            </Link>

            <Link
              href="/safari-price/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Tariff Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Prices 2026–27</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Official government rates for permits, vehicles, and guide charges across all zones.</p>
            </Link>

            <Link
              href="/safari-timings/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Shift Schedules</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Gate Timings</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Official seasonal sunrise and afternoon shift timings and entry cutoff regulations.</p>
            </Link>

            <Link
              href="/delhi-to-jim-corbett-package/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">NCR Tour Packages</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Delhi 2N3D Packages</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Round-trip private cab from Delhi NCR, luxury resort stay & guaranteed core jeep safari.</p>
            </Link>

            <Link
              href="/delhi-corbett-cab/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Private Transfers</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Delhi to Corbett Cab</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Sedan & Innova Crysta transfers from Delhi Airport & NCR starting ₹4,500 with tolls included.</p>
            </Link>

            <Link
              href="/zones/dhikala-zone/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Core Zone Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Dhikala Zone Info</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Explore Dhikala grasslands, Ramganga river reservoir, and elephant herd migration trails.</p>
            </Link>

            <Link
              href="/zones/bijrani-zone/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Core Zone Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Bijrani Zone Info</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Read about Bijrani Sal forests, Machaan trails, and highest predator encounter density.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQS ──────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Forest Rest House — Common Questions"
            subtitle="Everything you need to know about permit release, room conditions, food, and safety."
            badgeText="FRH FAQ"
            align="center"
          />

          <div className="space-y-3 mt-8">
            {FRH_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-[#E8E0CC] rounded-[4px] bg-[#FBF8F0] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-serif font-semibold text-sm sm:text-base text-[#17211A] select-none">
                  {faq.question}
                  <span className="ml-4 text-[#37482E] text-lg font-bold shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[#17211A]/85 leading-relaxed border-t border-[#E8E0CC]/60 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#17211A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF8F0] mb-3">
            Secure Your Forest Rest House Stay
          </h2>
          <p className="text-[#8A9468] text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Dhikala, Gairal, and Bijrani FRH permits require rapid coordination on the opening day. Contact our Ramnagar desk to register your dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              href={whatsAppLink}
              isExternal
              className="inline-flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>WhatsApp FRH Booking Desk</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="text-white border-[#8A9468]/50 hover:border-[#E8E0CC] inline-flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={Call02Icon} size={18} />
              <span>Call {contact.phoneDisplay}</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
