import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteConfigRepository } from "../../core/database/repositories";
import { generatePageMetadata, SITE_URL, buildBreadcrumbSchema, buildFaqSchema } from "../../core/utils/seo";
import { Button } from "../../shared/components/ui/button/Button";
import { Badge } from "../../shared/components/ui/badge/Badge";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: "Delhi to Jim Corbett Cab Service | Private Car ₹4,500 | Panthera Corbett",
  description:
    "Book Delhi to Jim Corbett (Ramnagar) private cab from ₹4,500. Sedan or Innova Crysta. Pickup from Delhi Airport, Gurgaon, Noida & Ghaziabad. Tolls & driver allowance included. Fixed price, no hidden costs.",
  canonicalPath: "/delhi-corbett-cab",
  keywords: [
    "delhi to jim corbett cab",
    "delhi to ramnagar taxi",
    "delhi to corbett cab service",
    "delhi to jim corbett distance by road",
    "delhi to ramnagar cab price",
    "delhi corbett innova crysta",
    "delhi to jim corbett cab booking",
    "ramnagar taxi from delhi",
    "delhi to corbett national park by car",
    "pantnagar airport transfer",
    "kathgodam station pickup corbett",
  ],
});

// ─── Static structured data ───────────────────────────────────────────────────

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Services", href: "/#secondary-services" },
  { name: "Delhi to Jim Corbett Cab", href: "/delhi-corbett-cab" },
]);

const cabFaqs = [
  {
    category: "Transport",
    question: "How much does a Delhi to Jim Corbett cab cost?",
    answer:
      "Our Delhi to Ramnagar (Jim Corbett) private cab starts at ₹4,500 for a Sedan (Dzire/Etios) and ₹6,500 for an Innova Crysta (6+1 seater). Toll charges and driver night allowance are fully included in the fixed price. No hidden costs, no surcharges.",
  },
  {
    category: "Transport",
    question: "How far is Delhi to Jim Corbett by road?",
    answer:
      "Delhi to Jim Corbett (Ramnagar) is approximately 250–260 km by road. The journey takes 5 to 6 hours depending on traffic. The fastest route goes via NH-9 through Gajraula, Moradabad, and Kashipur. We recommend leaving Delhi by 5 AM or 6 PM to avoid peak-hour traffic.",
  },
  {
    category: "Transport",
    question: "Do you offer pickup from Delhi Airport?",
    answer:
      "Yes. We provide pickup from Delhi Airport (T1, T2, T3), Gurgaon, Noida, and Ghaziabad. Just share your terminal or address and preferred departure time. Our driver meets you at the arrival gate with a name board.",
  },
  {
    category: "Transport",
    question: "Do you offer Pantnagar Airport and Kathgodam Station transfer?",
    answer:
      "Yes. We offer private Pantnagar Airport transfer and Kathgodam Railway Station pickup directly to your Ramnagar hotel from ₹1,800. Pantnagar Airport is 80 km from Ramnagar (approximately 1.5 hours). Kathgodam is 62 km from Ramnagar (approximately 1.5 hours).",
  },
  {
    category: "Transport",
    question: "Which is the best way to reach Jim Corbett from Delhi?",
    answer:
      "By road is the most flexible option — our private cab from Delhi to Ramnagar takes 5–6 hours and lets you set your own departure time. By train, the Ranikhet Express (12039) and Corbett Link Express (05013) are popular overnight options from Delhi to Ramnagar station. Both options are available; we can also arrange pickup from Ramnagar station.",
  },
];

const faqSchema = buildFaqSchema(cabFaqs);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Delhi to Jim Corbett Private Cab Service",
  description:
    "Private cab booking from Delhi to Jim Corbett (Ramnagar). Sedan from ₹4,500, Ertiga from ₹6,000, and Innova Crysta from ₹8,500. Pickup from Delhi Airport, Gurgaon, Noida. Tolls included.",
  provider: {
    "@type": "LocalBusiness",
    name: "Panthera Corbett Safari",
    url: SITE_URL,
    telephone: "+919997488004",
  },
  areaServed: [
    { "@type": "City", name: "Delhi" },
    { "@type": "City", name: "Gurgaon" },
    { "@type": "City", name: "Noida" },
    { "@type": "City", name: "Ghaziabad" },
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Sedan (Dzire / Etios) — Delhi to Ramnagar",
      price: "4500",
      priceCurrency: "INR",
      description: "One-way: ₹4,500 | Round-trip: ₹9,000. Tolls, state tax & driver allowance included.",
    },
    {
      "@type": "Offer",
      name: "New Ertiga (6+1 MUV) — Delhi to Ramnagar",
      price: "6000",
      priceCurrency: "INR",
      description: "One-way: ₹6,000 | Round-trip: ₹12,000. Dual AC, tolls & driver allowance included.",
    },
    {
      "@type": "Offer",
      name: "Innova Crysta (6+1 SUV) — Delhi to Ramnagar",
      price: "8500",
      priceCurrency: "INR",
      description: "One-way: ₹8,500 | Round-trip: ₹17,000. Luxury SUV, tolls & driver allowance included.",
    },
  ],
};

// ─── Vehicle options ──────────────────────────────────────────────────────────

const vehicleOptions = [
  {
    name: "Sedan",
    subtitle: "Swift Dzire / Etios / Similar",
    capacity: "4 passengers + driver",
    priceDisplay: "₹4,500",
    priceNote: "One-way (Round-trip: ₹9,000) — tolls & allowance included",
    features: [
      "AC cabin",
      "Spacious boot for 2–3 bags",
      "Ideal for 2–4 travellers",
      "All highway tolls & driver fees included",
    ],
    badge: "Most Popular",
    badgeVariant: "forest" as const,
  },
  {
    name: "New Ertiga",
    subtitle: "6+1 Seater MUV",
    capacity: "6 passengers + driver",
    priceDisplay: "₹6,000",
    priceNote: "One-way (Round-trip: ₹12,000) — tolls & allowance included",
    features: [
      "Dual AC with rear blower",
      "Spacious 6-passenger cabin",
      "Ideal for families & small groups",
      "All highway tolls & driver fees included",
    ],
    badge: "Best for Families",
    badgeVariant: "moss" as const,
  },
  {
    name: "Innova Crysta",
    subtitle: "6+1 Luxury SUV",
    capacity: "6 passengers + driver",
    priceDisplay: "₹8,500",
    priceNote: "One-way (Round-trip: ₹17,000) — tolls & allowance included",
    features: [
      "Premium captain seats & luxury ride",
      "Large boot space for 4–5 suitcases",
      "Superior highway stability & legroom",
      "All highway tolls & driver fees included",
    ],
    badge: "Premium Comfort",
    badgeVariant: "gold" as const,
  },
  {
    name: "Tempo Traveller",
    subtitle: "12–16 Seater",
    capacity: "12–16 passengers",
    priceDisplay: "On Request",
    priceNote: "Price depends on departure point and group size",
    features: [
      "Ideal for large group tours & corporate outings",
      "Push-back seats & full AC",
      "Dedicated luggage carrier",
      "Driver experienced on Delhi–Corbett highway",
    ],
    badge: "Group Travel",
    badgeVariant: "moss" as const,
  },
];

const pickupPoints = [
  { location: "Delhi Airport (T1/T2/T3)", distance: "258 km", time: "5–6 hrs" },
  { location: "Gurgaon (DLF / Cyber Hub)", distance: "270 km", time: "5.5–6.5 hrs" },
  { location: "Noida (Sectors 18, 62, 137)", distance: "240 km", time: "4.5–5.5 hrs" },
  { location: "Ghaziabad (Vaishali / Indirapuram)", distance: "232 km", time: "4.5–5 hrs" },
  { location: "Pantnagar Airport", distance: "80 km", time: "1.5 hrs" },
  { location: "Kathgodam Railway Station", distance: "62 km", time: "1.5 hrs" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DelhiCorbettCabPage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello! I want to book a Delhi to Jim Corbett cab. Please share availability and prices."
  );

  return (
    <div className="bg-[#FBF8F0] min-h-screen">
      {/* Structured data */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#17211A] text-[#FBF8F0] pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#secondary-services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Delhi to Jim Corbett Cab</span>
          </nav>

          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#37482E] text-xs font-semibold text-[#C99A3D] uppercase tracking-wider">
            Private Cab Service
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] leading-tight mb-4">
            Delhi to Jim Corbett<br className="hidden sm:block" />
            <span className="text-[#C99A3D]"> Cab Service</span>
          </h1>

          <p className="text-lg text-[#E8E0CC]/85 max-w-2xl leading-relaxed mb-8">
            Private car from Delhi, Gurgaon, Noida, or Ghaziabad to your Corbett resort.
            Fixed price, no haggling. Sedan from <strong className="text-white">₹4,500</strong> or
            Innova Crysta from <strong className="text-white">₹6,500</strong> — tolls and
            driver allowance fully included.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal>
              WhatsApp for Cab Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="border-[#8A9468] text-white hover:bg-[#37482E]"
            >
              Call Cab Desk: {contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Key Stats Strip ── */}
      <section className="bg-[#37482E] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-[#FBF8F0]">
          {[
            { label: "Delhi → Ramnagar", value: "250–260 km" },
            { label: "Travel Time", value: "5–6 Hours" },
            { label: "Sedan from", value: "₹4,500" },
            { label: "Innova Crysta from", value: "₹6,500" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-xl font-bold text-[#C99A3D]">{stat.value}</div>
              <div className="text-xs text-[#E8E0CC]/70 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Vehicle Options ── */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-[#17211A] mb-2">
            Choose Your Vehicle
          </h2>
          <p className="text-[#17211A]/70 mb-8">
            All prices are one-way, fixed-rate. Tolls and driver night allowance included. No hidden costs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicleOptions.map((v) => (
              <div
                key={v.name}
                className="bg-white border border-[#E8E0CC] rounded-[4px] p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-serif text-xl font-bold text-[#17211A]">{v.name}</div>
                    <div className="text-sm text-[#8A9468]">{v.subtitle}</div>
                  </div>
                  <Badge variant={v.badgeVariant} size="sm">{v.badge}</Badge>
                </div>

                <div className="mb-4">
                  <div className="font-serif text-3xl font-bold text-[#37482E]">{v.priceDisplay}</div>
                  <div className="text-xs text-[#8A9468] mt-0.5">{v.priceNote}</div>
                </div>

                <div className="text-xs text-[#8A9468] mb-4">
                  Capacity: <span className="font-semibold text-[#17211A]">{v.capacity}</span>
                </div>

                <ul className="space-y-1.5 flex-1 mb-5">
                  {v.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#17211A]/80">
                      <span className="text-[#37482E] font-bold">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" size="sm" href={whatsAppLink} isExternal className="w-full text-center border-[#37482E] text-[#17211A] hover:bg-[#37482E] hover:text-white">
                  Book {v.name}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pickup Points & Route ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#17211A] mb-2">
              Pickup Locations
            </h2>
            <p className="text-sm text-[#17211A]/70 mb-6">
              Door-to-door pickup from any location in Delhi NCR. We also cover
              Pantnagar Airport and Kathgodam Station.
            </p>

            <div className="space-y-3">
              {pickupPoints.map((point) => (
                <div
                  key={point.location}
                  className="flex items-center justify-between bg-white border border-[#E8E0CC] rounded-[4px] px-4 py-3"
                >
                  <div>
                    <div className="font-semibold text-sm text-[#17211A]">{point.location}</div>
                    <div className="text-xs text-[#8A9468] mt-0.5">Distance: {point.distance}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#37482E]">{point.time}</div>
                    <div className="text-xs text-[#8A9468]">approx.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[#17211A] mb-2">
              Delhi to Corbett Route
            </h2>
            <p className="text-sm text-[#17211A]/70 mb-6">
              The fastest route to Jim Corbett (Ramnagar) from Delhi via NH-9.
            </p>
            <div className="bg-[#17211A] text-[#FBF8F0] rounded-[4px] p-6 space-y-3">
              {[
                { stop: "Delhi / Noida / Gurgaon", km: "Start", note: "Departure point" },
                { stop: "Gajraula (NH-9)", km: "~120 km", note: "Expressway exit, chai break" },
                { stop: "Moradabad Bypass", km: "~160 km", note: "Toll plaza" },
                { stop: "Kashipur", km: "~210 km", note: "Last major town before Corbett" },
                { stop: "Ramnagar (Jim Corbett)", km: "~250 km", note: "Final destination" },
              ].map((stop, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C99A3D] mt-1 shrink-0" />
                    {idx < 4 && <div className="w-px h-6 bg-[#37482E] mt-1" />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{stop.stop}</div>
                    <div className="text-xs text-[#8A9468]">{stop.km} · {stop.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]">
              <p className="text-xs text-[#17211A]/80 leading-relaxed">
                <strong>Best departure times from Delhi:</strong> 5:00 AM to 7:00 AM for a clear
                expressway run. Or depart at 8:00 PM to arrive by midnight and wake up fresh for
                your morning safari.
              </p>
            </div>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section className="bg-[#17211A] rounded-[4px] p-8 sm:p-12 text-[#FBF8F0]">
          <h2 className="font-serif text-3xl font-bold mb-2">
            What is Included in the Cab Price
          </h2>
          <p className="text-[#E8E0CC]/70 text-sm mb-8">
            All prices are fully all-inclusive — nothing billed extra at the end.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
            {[
              "Door-to-door pickup from your location",
              "All National Highway and state toll charges",
              "Driver night allowance (for overnight transfers)",
              "Experienced driver familiar with Corbett route",
              "AC cabin (sedan, Innova Crysta, Tempo Traveller)",
              "Return drop available (same fixed pricing applies)",
              "Ramnagar station and hotel drop included",
              "WhatsApp contact for live tracking and updates",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-[#E8E0CC]/85">
                <span className="text-[#C99A3D] font-bold shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content Block ── */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-[#17211A] mb-6">
            About Delhi to Jim Corbett Cab Service
          </h2>
          <div className="prose prose-sm max-w-none text-[#17211A]/80 space-y-4">
            <p>
              Delhi to Jim Corbett distance by road is approximately 250 to 260 km via NH-9 through
              Gajraula and Moradabad, with an estimated travel time of 5 to 6 hours depending on
              traffic. Our private Delhi to Ramnagar cab service runs from all major Delhi NCR pickup
              points — Delhi Airport (T1, T2, T3), Gurgaon, Noida, and Ghaziabad — directly to your
              hotel or resort in Ramnagar, the gateway town to Jim Corbett National Park.
            </p>
            <p>
              We offer a sedan cab (Dzire, Etios, or similar) from ₹4,500 one-way (₹9,000 round-trip), an
              Ertiga MUV from ₹6,000 one-way (₹12,000 round-trip), and an Innova Crysta from ₹8,500 one-way
              (₹17,000 round-trip). All toll charges on the Delhi–Ramnagar route, state taxes, and driver allowances
              are included in the fixed price. For groups of 8 to 16 passengers, a Tempo Traveller is available
              on request. All vehicles are well-maintained, air-conditioned, and driven by experienced drivers who
              know the Corbett route well.
            </p>
            <p>
              For guests arriving by air or train, we also offer Pantnagar Airport transfer and
              Kathgodam Station pickup from ₹2,000 — your driver waits with a name board at arrival
              and brings you directly to your Ramnagar resort. This is the easiest way to begin a
              Jim Corbett safari trip without navigating unfamiliar public transport.
            </p>
            <p>
              Our Delhi to Jim Corbett packages combine doorstep cab service with resort stay and safari bookings —
              making us a single-point contact for your entire Corbett trip from Delhi. Many guests
              choose our Delhi to Jim Corbett All-Inclusive Package (from ₹20,999/couple with round-trip cab,
              resort stay &amp; core safari) or our Bijrani Weekend Package (from ₹11,999/couple ex-Ramnagar)
              for a completely hassle-free door-to-door experience.
            </p>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-[#17211A] mb-8">
            Delhi to Jim Corbett Cab — FAQs
          </h2>
          <div className="space-y-4">
            {cabFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-[#E8E0CC] rounded-[4px] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm text-[#17211A] hover:bg-[#F4EFE6] transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="text-[#8A9468] text-lg ml-3 shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-[#17211A]/80 leading-relaxed border-t border-[#E8E0CC] bg-[#F4EFE6]/30">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px] p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-2">
            Book Your Delhi to Corbett Cab
          </h2>
          <p className="text-sm text-[#17211A]/70 mb-6 max-w-lg mx-auto">
            WhatsApp us with your pickup location, travel date, and group size.
            We confirm within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal>
              WhatsApp Cab Booking
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="border-[#37482E] text-[#17211A] hover:bg-[#37482E] hover:text-white"
            >
              Call: {contact.phoneDisplay}
            </Button>
          </div>
          <p className="mt-4 text-xs text-[#8A9468]">
            Also look at our{" "}
            <Link href="/delhi-to-jim-corbett-package" className="underline hover:text-[#17211A]">
              Delhi to Jim Corbett tour packages
            </Link>{" "}
            — safari + resort + cab in one booking.
          </p>
        </section>

      </div>
    </div>
  );
}
