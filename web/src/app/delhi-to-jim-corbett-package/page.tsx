import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  PackageRepository,
  SiteConfigRepository,
  FaqRepository,
} from "../../core/database/repositories";
import {
  LANDING_PAGE_SEO,
  SITE_URL,
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
  { label: "Distance", value: "~250–260 km", icon: "📍" },
  { label: "Drive Time", value: "5–6 hours", icon: "🚗" },
  { label: "Train Option", value: "Overnight Ramnagar Express", icon: "🚂" },
  { label: "Cab (Sedan)", value: "₹4,500 one-way", icon: "🚕" },
  { label: "Cab (Innova)", value: "₹6,500 one-way", icon: "🚙" },
  { label: "Nearest Airport", value: "Pantnagar (70 km)", icon: "✈️" },
];

const PACKAGES_HIGHLIGHTS = [
  {
    id: "weekend-bijrani",
    badge: "Most Popular",
    badgeVariant: "ember" as const,
    title: "Bijrani Weekend Package",
    duration: "1 Night / 2 Days",
    price: "From ₹11,500",
    priceSuffix: "/couple",
    safaris: "2 Jeep Safaris",
    zone: "Bijrani Core Zone",
    tag: "Best Delhi Weekend Trip",
    highlights: [
      "Morning + evening jeep safari in Bijrani",
      "River-view jungle resort stay",
      "All meals: dinner + breakfast included",
      "Delhi to Ramnagar cab option available",
      "Guide, permit & private 4x4 Gypsy included",
    ],
    ctaSlug: "bijrani-weekend-safari",
    isPopular: true,
  },
  {
    id: "dhikala-2n3d",
    badge: "Flagship",
    badgeVariant: "gold" as const,
    title: "Dhikala FRH Immersion",
    duration: "2 Nights / 3 Days",
    price: "From ₹28,500",
    priceSuffix: "/couple",
    safaris: "4 Private Gypsy Safaris",
    zone: "Dhikala Core Zone",
    tag: "Overnight Inside the Core Zone",
    highlights: [
      "Stay inside Dhikala Forest Rest House",
      "4 private Gypsy safaris — morning & evening",
      "All meals at FRH canteen included",
      "After 4:30 PM — no day visitors, only you",
      "Ramganga reservoir at your doorstep",
    ],
    ctaSlug: "dhikala-frh-2n-3d",
    isPopular: false,
  },
  {
    id: "double-zone",
    badge: "Best Value",
    badgeVariant: "moss" as const,
    title: "Double Zone Safari",
    duration: "Day Trip / 1 Day",
    price: "From ₹12,800",
    priceSuffix: "/jeep",
    safaris: "2 Safaris, 2 Zones",
    zone: "Bijrani + Garjiya",
    tag: "Maximum Sighting Odds",
    highlights: [
      "Morning safari in Bijrani (highest tiger index)",
      "Afternoon safari in Garjiya (Kosi riverbed)",
      "Private 4x4 Gypsy for your group",
      "Two different ecosystems, same day",
      "Ideal if you can only do 1 full day in Corbett",
    ],
    ctaSlug: "corbett-double-zone-safari",
    isPopular: false,
  },
];

const WHY_BOOK = [
  { icon: "🏛️", title: "Licensed since 2009", text: "UK-FOREST-CTR-2009-8842 — Uttarakhand Forest Dept registered. 15+ years of permit management." },
  { icon: "🎫", title: "We handle your permits", text: "Forest Department quota checked and locked in your name. No portal confusion, no middlemen." },
  { icon: "🚐", title: "Delhi cab service", text: "From ₹4,500 sedan / ₹6,500 Innova Crysta. Pickup from Delhi Airport, Gurgaon, Noida, Ghaziabad." },
  { icon: "📞", title: "Desk open 6 AM – 9:30 PM", text: "Same team you book with picks you up, handles permits, and guides you. One point of contact throughout." },
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
            "url('https://images.unsplash.com/photo-1623159350808-54c8ce62d0b2?auto=format&fit=crop&w=1600&q=80')",
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

          <Badge variant="ember" size="md" className="mb-5">
            📍 250 km from Delhi · 5–6 hrs Drive
          </Badge>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] leading-[1.1] mb-5 max-w-3xl">
            Delhi to Jim Corbett Package
          </h1>
          <p className="text-[#E8E0CC]/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Weekend trips, 2 night 3 day packages, honeymoon & family tours — all with jeep safari permits, private 4x4 Gypsy, and experienced guide. We handle everything from Delhi cab to Dhikala permit.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal>
              📲 WhatsApp for Package Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="text-white border-[#8A9468]/60 hover:border-[#E8E0CC]"
            >
              📞 {contact.phoneDisplay}
            </Button>
          </div>

          {/* Quick stats strip */}
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-3 gap-4 max-w-lg">
            {[
              { val: "₹11,500", sub: "Starting price / couple" },
              { val: "2N 3D", sub: "Most popular duration" },
              { val: "15+", sub: "Years operating" },
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Jim Corbett Packages from Delhi"
            subtitle="Choose by trip length and zone. All include permits, guide, and private 4x4 Gypsy."
            badgeText="Select Your Package"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES_HIGHLIGHTS.map((pkg) => (
              <Card
                key={pkg.id}
                className={`flex flex-col ${pkg.isPopular ? "ring-2 ring-[#B84C1E]/40" : ""}`}
              >
                {pkg.isPopular && (
                  <div className="bg-[#B84C1E] text-white text-xs font-bold text-center py-1.5 tracking-wider uppercase">
                    ⭐ Most Popular for Delhi Weekends
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
                        <span className="text-[#37482E] font-bold mt-0.5 shrink-0">✓</span>
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
            <Button variant="primary" size="md" href={whatsAppLink} isExternal>
              📲 WhatsApp Your Requirements
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
                className="bg-white border border-[#E8E0CC] rounded-[4px] p-4 text-center"
              >
                <div className="text-2xl mb-2">{fact.icon}</div>
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
              <Button variant="primary" size="sm" href={whatsAppLink} isExternal>
                Book Delhi–Ramnagar Cab
              </Button>
              <Button variant="outline" size="sm" href={`tel:${contact.phoneRaw}`}>
                Call for Cab Rates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY BOOK ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Book Through Us"
            subtitle="Licensed Uttarakhand Forest Department operator since 2009. 28 jeeps, 34 guides, one desk."
            badgeText="Our Track Record"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_BOOK.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]"
              >
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
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
            WhatsApp us your dates, group size, and budget. We'll share availability and a quote within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal>
              📲 WhatsApp for Package Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="text-white border-[#8A9468]/50 hover:border-[#E8E0CC]"
            >
              📞 Call {contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
