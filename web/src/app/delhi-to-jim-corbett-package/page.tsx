import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SiteConfigRepository,
  FaqRepository,
} from "../../core/database/repositories";
import {
  LANDING_PAGE_SEO,
  generatePageMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "../../core/utils/seo";
import {
  Button,
  Badge,
  SectionHeader,
  Card,
} from "../../shared";
import { HugeiconsIcon } from "@hugeicons/react";
import Clock01Icon from "@hugeicons/core-free-icons/Clock01Icon";
import Train01Icon from "@hugeicons/core-free-icons/Train01Icon";
import Car01Icon from "@hugeicons/core-free-icons/Car01Icon";
import Bus01Icon from "@hugeicons/core-free-icons/Bus01Icon";
import ShieldCheckIcon from "@hugeicons/core-free-icons/ShieldCheckIcon";
import Ticket01Icon from "@hugeicons/core-free-icons/Ticket01Icon";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import StarIcon from "@hugeicons/core-free-icons/StarIcon";
import CheckmarkBadge01Icon from "@hugeicons/core-free-icons/CheckmarkBadge01Icon";
import MapPinIcon from "@hugeicons/core-free-icons/MapPinIcon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["delhi-to-jim-corbett-package"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: SEO.keywords,
});

// ─── Static data ──────────────────────────────────────────────────────────────

const JOURNEY_FACTS = [
  { label: "Distance", value: "~250–260 km", icon: MapPinIcon },
  { label: "Drive Time", value: "5–6 hours", icon: Clock01Icon },
  { label: "Train Option", value: "Ranikhet Express", icon: Train01Icon },
  { label: "Cab (Sedan)", value: "₹4,500 (Round: ₹9,000)", icon: Car01Icon },
  { label: "Cab (Ertiga)", value: "₹6,000 (Round: ₹12,000)", icon: Bus01Icon },
  { label: "Cab (Innova)", value: "₹8,500 (Round: ₹17,000)", icon: Car01Icon },
];

const PACKAGES_HIGHLIGHTS = [
  {
    id: "delhi-all-inclusive",
    badge: "Most Popular",
    badgeVariant: "ember" as const,
    title: "Delhi to Corbett Package",
    duration: "1 Night / 2 Days (or 2N3D)",
    price: "From ₹20,999",
    priceSuffix: "/couple",
    safaris: "1 Core Jeep Safari",
    zone: "Bijrani / Garjiya Core Zone",
    tag: "All-Inclusive from Delhi NCR",
    highlights: [
      "Round-trip private AC Sedan cab (Swift Dzire) from Delhi doorstep",
      "1 night 3-star jungle resort stay (2N3D from ₹24,999)",
      "1 private 4x4 Gypsy safari in Bijrani/Garjiya core zone",
      "Resort breakfast and dinner (MAP plan) included",
      "All highway tolls, state permits, driver allowance & parking",
    ],
    ctaSlug: "delhi-to-corbett-tour",
    isPopular: true,
  },
  {
    id: "weekend-bijrani",
    badge: "Best Value",
    badgeVariant: "forest" as const,
    title: "Bijrani Weekend (Ex-Ramnagar)",
    duration: "1 Night / 2 Days",
    price: "From ₹11,999",
    priceSuffix: "/couple",
    safaris: "1 Core Jeep Safari",
    zone: "Bijrani Core Zone",
    tag: "For Train & Personal Car Travellers",
    highlights: [
      "1 night stay at a 3-star jungle resort near Ramnagar",
      "1 private Gypsy safari in Bijrani core (2nd safari add-on ₹7,999)",
      "Resort breakfast & dinner included",
      "Complimentary pickup/drop from resort to safari gate",
      "Registered naturalist guide & core permit included",
    ],
    ctaSlug: "bijrani-weekend-safari",
    isPopular: false,
  },
  {
    id: "double-zone",
    badge: "Max Sightings",
    badgeVariant: "moss" as const,
    title: "Double Zone Day Safari",
    duration: "Day Trip / 1 Day",
    price: "From ₹15,999",
    priceSuffix: "/jeep",
    safaris: "2 Core Safaris, 2 Zones",
    zone: "Bijrani + Garjiya",
    tag: "Maximum Sighting Odds",
    highlights: [
      "Morning safari in Bijrani core (highest tiger index)",
      "Afternoon safari in Garjiya core (Kosi riverbed)",
      "Private 4x4 Gypsy for up to 6 guests (~₹2,666/person)",
      "Two distinct ecosystems covered in a single day",
      "Both zone permits, gate fees & guides included",
    ],
    ctaSlug: "corbett-double-zone-safari",
    isPopular: false,
  },
  {
    id: "dhikala-2n3d",
    badge: "Flagship",
    badgeVariant: "gold" as const,
    title: "Dhikala FRH Immersion",
    duration: "2 Nights / 3 Days",
    price: "From ₹35,000",
    priceSuffix: "/couple",
    safaris: "4 Private Gypsy Safaris",
    zone: "Dhikala Core Zone",
    tag: "Overnight Inside the Core Zone",
    highlights: [
      "2 nights stay inside Dhikala or Gairal Forest Rest House",
      "4 private Gypsy safaris with dedicated naturalist",
      "All vegetarian meals at FRH canteen included",
      "After 4:30 PM — no day visitors, only FRH guests",
      "Ramganga reservoir & grasslands at your doorstep",
    ],
    ctaSlug: "dhikala-frh-2n-3d",
    isPopular: false,
  },
];

const WHY_BOOK = [
  {
    icon: ShieldCheckIcon,
    title: "Official Permit Assistance",
    text: "Direct Corbett Tiger Reserve permit assistance with 100% quota verification in your name. Transparent booking with zero hidden charges.",
  },
  {
    icon: Car01Icon,
    title: "Delhi-NCR Doorstep Transfers",
    text: "Comfortable private transfers from Delhi Airport, Gurgaon, Noida, and Ghaziabad directly to your Corbett resort in AC Sedan or Innova Crysta.",
  },
  {
    icon: Ticket01Icon,
    title: "End-to-End Safari Planning",
    text: "Registered 4x4 Gypsy vehicles, mandatory forest guides, and zone selection curated for maximum wildlife sighting odds.",
  },
  {
    icon: Call02Icon,
    title: "Dedicated Ramnagar Desk",
    text: "Local on-ground team available 6:00 AM – 9:30 PM daily. One point of contact to coordinate your permits, stay, and safari shifts.",
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function DelhiToJimCorbettPackagePage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett! I am looking for a Delhi to Jim Corbett package. Please share availability and pricing."
  );
  const faqs = FaqRepository.getByCategory("Delhi Packages");

  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Delhi to Jim Corbett Package", href: "/delhi-to-jim-corbett-package" },
  ]);

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#17211A] py-20 sm:py-28"
        style={{
          backgroundImage:
            "url('/image/photo-1549366021-9f761d450615.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#17211A]/80 via-[#17211A]/60 to-[#17211A]/90" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-[#E8E0CC] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Delhi to Jim Corbett Package</span>
          </nav>

          <Badge variant="ember" size="md" className="mb-5 inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={MapPinIcon} size={14} />
            <span>250 km from Delhi · 5–6 hrs Drive</span>
          </Badge>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] leading-[1.1] mb-5 max-w-3xl">
            Delhi to Jim Corbett Package
          </h1>
          <p className="text-[#E8E0CC]/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Weekend trips, 2 night 3 day packages, honeymoon & family tours — all with jeep safari permits, private 4x4 Gypsy, and experienced guide. We handle everything from Delhi cab to Dhikala permit.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>WhatsApp for Package Quote</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="text-white border-[#8A9468]/60 hover:border-[#E8E0CC] inline-flex items-center gap-2"
            >
              <HugeiconsIcon icon={Call02Icon} size={18} />
              <span>{contact.phoneDisplay}</span>
            </Button>
          </div>

          {/* Quick stats strip */}
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-3 gap-4 max-w-lg">
            {[
              { val: "₹11,999", sub: "Starting price (Ex-Ramnagar)" },
              { val: "₹20,999", sub: "With Delhi AC Cab" },
              { val: "2N 3D", sub: "Most popular duration" },
            ].map((stat) => (
              <div key={stat.val} className="text-center">
                <div className="font-serif text-2xl font-bold text-[#FBF8F0] font-tabular">{stat.val}</div>
                <div className="text-[8px] sm:text-xs text-[#8A9468] uppercase tracking-wider mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FBF8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Jim Corbett Packages from Delhi"
            subtitle="Choose by trip length and zone. All include permits, guide, and private 4x4 Gypsy."
            badgeText="Select Your Package"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_HIGHLIGHTS.map((pkg) => (
              <Card
                key={pkg.id}
                className={`flex flex-col ${pkg.isPopular ? "ring-2 ring-[#B84C1E]/40" : ""}`}
              >
                {pkg.isPopular && (
                  <div className="bg-[#B84C1E] text-white text-xs font-bold text-center py-1.5 tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <HugeiconsIcon icon={StarIcon} size={13} />
                    <span>Most Popular for Delhi Weekends</span>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={pkg.badgeVariant} size="sm">{pkg.badge}</Badge>
                    <span className="text-[10px] text-[#8A9468] uppercase tracking-wide">{pkg.duration}</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#17211A] mb-1">{pkg.title}</h2>
                  <p className="text-xs text-[#8A9468] mb-4">{pkg.zone} · {pkg.safaris}</p>

                  <div className="mb-4">
                    <span className="font-serif text-2xl font-bold text-[#17211A] font-tabular">{pkg.price}</span>
                    <span className="text-xs text-[#8A9468] ml-1">{pkg.priceSuffix}</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#17211A]/85">
                        <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} className="text-[#37482E] mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto space-y-2">
                    <Button variant="primary" size="md" href={whatsAppLink} isExternal className="w-full text-center">
                      Enquire This Package
                    </Button>
                    <Button variant="ghost" size="sm" href={`/packages/${pkg.ctaSlug}`} className="w-full text-center text-[#37482E]">
                      View Full Details →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Custom package CTA */}
          <div className="mt-10 p-6 bg-[#17211A] rounded-[4px] text-center">
            <h3 className="font-serif text-xl font-bold text-[#FBF8F0] mb-2">Need a Custom Package?</h3>
            <p className="text-sm text-[#8A9468] mb-4">
              Family group of 10? Honeymoon with resort decoration? Solo with FRH stay? We build it for you.
            </p>
            <Button variant="primary" size="md" href={whatsAppLink} isExternal className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>WhatsApp Your Requirements</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── JOURNEY INFO ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6] border-y border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Delhi to Jim Corbett — How to Reach"
            subtitle="Ramnagar is the base town for Jim Corbett. 250 km from Delhi, well-connected by road and train."
            badgeText="Journey Information"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {JOURNEY_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="bg-white border border-[#E8E0CC] rounded-[4px] p-4 text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#37482E]/8 flex items-center justify-center text-[#37482E] mb-2.5">
                  <HugeiconsIcon icon={fact.icon} size={20} />
                </div>
                <div className="font-semibold text-sm text-[#17211A] font-tabular">{fact.value}</div>
                <div className="text-xs text-[#8A9468] mt-0.5">{fact.label}</div>
              </div>
            ))}
          </div>

          {/* Route map text box */}
          <div className="bg-white border border-[#E8E0CC] rounded-[4px] p-6">
            <h3 className="font-serif text-lg font-bold text-[#17211A] mb-3">Road Route (Delhi → Ramnagar)</h3>
            <p className="text-sm text-[#17211A]/80 leading-relaxed mb-4">
              Take NH-9 from Delhi toward Ghaziabad → Hapur Bypass → Moradabad Bypass → Rampur → Bilaspur → Ramnagar. The route is well-marked and mostly 4-lane highway. Final 30 km to Ramnagar is state highway — comfortable in sedan or SUV.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm" href={whatsAppLink} isExternal className="inline-flex items-center gap-1.5">
                <HugeiconsIcon icon={WhatsappIcon} size={16} />
                <span>Book Delhi–Ramnagar Cab</span>
              </Button>
              <Button variant="outline" size="sm" href={`tel:${contact.phoneRaw}`} className="inline-flex items-center gap-1.5">
                <HugeiconsIcon icon={Call02Icon} size={16} />
                <span>Call for Cab Rates</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY BOOK ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Book With Panthera Corbett Safari"
            subtitle="Ramnagar-based wildlife specialists handling your permits, registered 4x4 Gypsies, experienced forest guides, and Delhi transfers seamlessly."
            badgeText="The Panthera Advantage"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_BOOK.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]"
              >
                <div className="w-11 h-11 rounded-full bg-[#37482E]/10 flex items-center justify-center text-[#37482E] shrink-0 mt-0.5">
                  <HugeiconsIcon icon={item.icon} size={22} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#17211A] text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-[#17211A]/80 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELHI PACKAGE FAQ ─────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-[#E8E0CC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Delhi Package — Common Questions"
              subtitle="Everything you need to know before planning your Delhi to Jim Corbett trip."
              badgeText="FAQ"
              align="center"
            />
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group border border-[#E8E0CC] rounded-[4px] bg-white overflow-hidden"
                >
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
        </section>
      )}

      {/* ─── STICKY BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#17211A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF8F0] mb-3">
            Ready to Plan Your Corbett Trip?
          </h2>
          <p className="text-[#8A9468] text-base mb-8">
            WhatsApp us your dates, group size, and budget. We&apos;ll share availability and a quote within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center justify-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>WhatsApp for Package Quote</span>
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
