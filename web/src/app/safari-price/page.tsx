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
import { Button, Badge, SectionHeader } from "../../shared";
import { HugeiconsIcon } from "@hugeicons/react";
import Calendar01Icon from "@hugeicons/core-free-icons/Calendar01Icon";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["safari-price"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: SEO.keywords,
});

// ─── Static pricing data ──────────────────────────────────────────────────────
// These match data_source/safari-types.ts and data_source/zones.ts exactly.

const CORE_ZONE_JEEP = [
  { zone: "Dhela", gate: "Dhela Gate", preBooking: 7999, currentBooking: 8499, openYear: true },
  { zone: "Jhirna", gate: "Jhirna Gate", preBooking: 7999, currentBooking: 8499, openYear: true },
  { zone: "Bijrani", gate: "Amdanda Gate", preBooking: 7999, currentBooking: 8499, openYear: false },
  { zone: "Garjiya", gate: "Garjiya Gate", preBooking: 7999, currentBooking: 8499, openYear: false },
  { zone: "Durga Devi", gate: "Durgadevi Gate", preBooking: 7999, currentBooking: 8499, openYear: false },
];

const BUFFER_ZONE_JEEP = [
  { zone: "Phato", gate: "Phato Gate", price: 6499, openYear: true },
  { zone: "Hathidangar", gate: "Hathidangar Gate", price: 6499, openYear: true },
  { zone: "Sitabani (Pawalgarh)", gate: "Pawalgarh Gate", price: 6499, openYear: true },
  { zone: "Sitabani (Teda / Bhandarpani)", gate: "Teda / Bhandarpani Gate", price: 5999, openYear: true },
];

const INCLUSIONS_SHARED = [
  "Forest Department entry permit & gate fees",
  "Registered forest guide / naturalist",
  "All government taxes and park charges",
];

const INCLUSIONS_JEEP = [
  ...INCLUSIONS_SHARED,
  "Exclusive 4x4 Maruti Gypsy (open-top) + driver + fuel",
  "Complimentary hotel pickup/drop up to 10 km from Ramnagar (pre-booking only)",
];

const INCLUSIONS_CANTER = [
  ...INCLUSIONS_SHARED,
  "Confirmed seat on 16-person sharing open-roof Canter bus",
  "Pickup & drop at Ramnagar or Dhangarhi Gate",
];

const PRICING_NOTES = [
  { label: "Pre-booking rate", detail: "Applies when booked more than 5 days in advance. Includes complimentary hotel pickup/drop within 10 km of Ramnagar." },
  { label: "Current booking rate", detail: "Applies within 5 days of safari date. Pickup/drop by prior arrangement only." },
  { label: "Dhikala canter season", detail: "15 November to 15 June only. Core zone Bijrani, Garjiya & Durga Devi also close in late June." },
  { label: "Open all year", detail: "Jhirna, Dhela, Phato, Hathidangar & Sitabani zones operate 365 days including monsoon." },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function SafariPricePage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett! I want to check Jim Corbett safari prices and book a safari. Please share availability."
  );

  // Pull pricing FAQs from data layer
  const faqs = FaqRepository.getByCategory("Pricing & Inclusions");
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Safari Price", href: "/safari-price" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#17211A] py-16 sm:py-20 border-b border-[#37482E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-[#E8E0CC] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Safari Price</span>
          </nav>

          <Badge variant="gold" size="md" className="mb-5 inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={Calendar01Icon} size={14} />
            <span>Updated for 2025–2026 Season</span>
          </Badge>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FBF8F0] leading-[1.1] mb-5 max-w-2xl">
            Jim Corbett Safari Price — All Zones
          </h1>
          <p className="text-[#E8E0CC]/85 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Complete, transparent pricing for Dhikala Canter Safari and all Jeep Safari zones. Every price below is 100% all-inclusive — guide, permit, vehicle, taxes. Zero hidden charges.
          </p>

          {/* Price anchors */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-[#B84C1E]/15 border border-[#B84C1E]/40 rounded-[4px] px-4 py-2 text-center">
              <div className="font-serif text-xl font-bold text-[#FBF8F0] font-tabular">₹2,299</div>
              <div className="text-[9px] text-[#8A9468] uppercase tracking-wide mt-0.5">Canter / seat</div>
            </div>
            <div className="bg-[#37482E]/30 border border-[#37482E]/50 rounded-[4px] px-4 py-2 text-center">
              <div className="font-serif text-xl font-bold text-[#FBF8F0] font-tabular">₹5,999</div>
              <div className="text-[9px] text-[#8A9468] uppercase tracking-wide mt-0.5">Jeep from</div>
            </div>
            <div className="bg-[#37482E]/30 border border-[#37482E]/50 rounded-[4px] px-4 py-2 text-center">
              <div className="font-serif text-xl font-bold text-[#FBF8F0] font-tabular">₹7,999</div>
              <div className="text-[9px] text-[#8A9468] uppercase tracking-wide mt-0.5">Core zone jeep</div>
            </div>
            <div className="bg-[#C99A3D]/10 border border-[#C99A3D]/30 rounded-[4px] px-4 py-2 text-center">
              <div className="font-serif text-xl font-bold text-[#FBF8F0] font-tabular">6 Guests</div>
              <div className="text-[9px] text-[#8A9468] uppercase tracking-wide mt-0.5">Max per jeep</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DHIKALA CANTER PRICE ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Dhikala Canter Safari Price"
            subtitle="The only way day visitors enter India's most celebrated core zone. Fully all-inclusive."
            badgeText="Dhikala Core Zone"
          />

          <div className="bg-[#17211A] rounded-[4px] overflow-hidden">
            {/* Price feature row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#37482E] border-b border-[#37482E]">
              {[
                { label: "Price per Seat", value: "₹2,299", note: "All-inclusive" },
                { label: "Vehicle Capacity", value: "16 Seats", note: "Sharing" },
                { label: "Canters / Shift", value: "4 Only", note: "Government quota" },
                { label: "Season", value: "Nov–Jun", note: "15 Nov – 15 Jun" },
              ].map((item) => (
                <div key={item.label} className="px-4 py-5 text-center">
                  <div className="font-serif text-2xl font-bold text-[#FBF8F0] font-tabular">{item.value}</div>
                  <div className="text-[9px] text-[#C99A3D] uppercase tracking-wider mt-1">{item.note}</div>
                  <div className="text-xs text-[#8A9468] mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-[#8A9468] mb-4">
                Pickup & drop at Ramnagar or Dhangarhi Gate. Government-appointed guide and driver. All gate fees included.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" href={whatsAppLink} isExternal className="inline-flex items-center gap-1.5">
                  <HugeiconsIcon icon={WhatsappIcon} size={16} />
                  <span>Check Dhikala Availability</span>
                </Button>
                <Link href="/canter-safari" className="text-[#8A9468] text-sm underline underline-offset-2 self-center hover:text-[#E8E0CC]">
                  Full Canter Safari Details →
                </Link>
              </div>
            </div>
          </div>

          {/* Canter inclusions */}
          <div className="mt-6 p-5 bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px]">
            <h3 className="font-serif font-bold text-sm text-[#37482E] uppercase mb-3">Canter Safari — What&apos;s Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INCLUSIONS_CANTER.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#17211A]/85">
                  <span className="text-[#37482E] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CORE ZONE JEEP PRICES ────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F4EFE6] border-y border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Core Zone Jeep Safari Price"
            subtitle="Private 4x4 Gypsy for up to 6 adults. Pre-booking >5 days ahead saves ₹500/jeep and includes complimentary hotel pickup."
            badgeText="Core Zone — Jeep"
          />

          <div className="overflow-x-auto rounded-[4px] border border-[#E8E0CC] mb-6">
            <table className="w-full text-sm">
              <thead className="bg-[#17211A] text-[#FBF8F0]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Zone</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Gate</th>
                  <th className="text-right px-4 py-3 font-semibold">
                    Pre-Booking <span className="font-normal text-[#8A9468] text-xs">(&gt;5 days)</span>
                  </th>
                  <th className="text-right px-4 py-3 font-semibold hidden sm:table-cell">
                    Current Rate <span className="font-normal text-[#8A9468] text-xs">(within 5 days)</span>
                  </th>
                  <th className="text-center px-4 py-3 font-semibold hidden md:table-cell">Year-Round?</th>
                </tr>
              </thead>
              <tbody>
                {CORE_ZONE_JEEP.map((row, idx) => (
                  <tr key={row.zone} className={`border-t border-[#E8E0CC] ${idx % 2 === 0 ? "bg-white" : "bg-[#FBF8F0]"}`}>
                    <td className="px-4 py-3 font-medium text-[#17211A]">{row.zone}</td>
                    <td className="px-4 py-3 text-[#8A9468] hidden sm:table-cell">{row.gate}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#17211A] font-tabular">
                      ₹{row.preBooking.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-right text-[#8A9468] font-tabular hidden sm:table-cell">
                      ₹{row.currentBooking.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {row.openYear ? (
                        <span className="text-xs bg-[#37482E] text-white px-2 py-0.5 rounded-full">All Year</span>
                      ) : (
                        <span className="text-xs text-[#8A9468]">Oct/Nov–Jun</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Jeep inclusions */}
          <div className="p-5 bg-white border border-[#E8E0CC] rounded-[4px]">
            <h3 className="font-serif font-bold text-sm text-[#37482E] uppercase mb-3">Jeep Safari — What&apos;s Included in Every Booking</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INCLUSIONS_JEEP.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#17211A]/85">
                  <span className="text-[#37482E] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── BUFFER / RESERVE ZONE PRICES ────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Buffer & Reserve Zone Jeep Price"
            subtitle="More accessible zones — open all year, easier availability, same quality experience."
            badgeText="Buffer & Reserve Zones"
          />
          <div className="overflow-x-auto rounded-[4px] border border-[#E8E0CC]">
            <table className="w-full text-sm">
              <thead className="bg-[#37482E] text-[#FBF8F0]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Zone</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Gate</th>
                  <th className="text-right px-4 py-3 font-semibold">Price / Jeep</th>
                  <th className="text-center px-4 py-3 font-semibold hidden md:table-cell">Season</th>
                </tr>
              </thead>
              <tbody>
                {BUFFER_ZONE_JEEP.map((row, idx) => (
                  <tr key={row.zone} className={`border-t border-[#E8E0CC] ${idx % 2 === 0 ? "bg-white" : "bg-[#FBF8F0]"}`}>
                    <td className="px-4 py-3 font-medium text-[#17211A]">{row.zone}</td>
                    <td className="px-4 py-3 text-[#8A9468] hidden sm:table-cell">{row.gate}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#17211A] font-tabular">
                      ₹{row.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="text-xs bg-[#37482E] text-white px-2 py-0.5 rounded-full">All Year</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── PRICING NOTES ────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#F4EFE6] border-y border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-bold text-[#17211A] mb-5">Important Pricing Notes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRICING_NOTES.map((note) => (
              <div key={note.label} className="p-4 bg-white border border-[#E8E0CC] rounded-[4px]">
                <p className="font-semibold text-sm text-[#37482E] mb-1">{note.label}</p>
                <p className="text-xs text-[#17211A]/80 leading-relaxed">{note.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING FAQ ──────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#FBF8F0]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Pricing — Common Questions"
              subtitle="What's included, what's not, and what actually costs extra."
              badgeText="Price FAQ"
              align="center"
            />
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group border border-[#E8E0CC] rounded-[4px] bg-white overflow-hidden">
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

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#17211A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF8F0] mb-3">
            Ready to Book Your Safari?
          </h2>
          <p className="text-[#8A9468] text-sm mb-8">
            Share your dates, preferred zone, and group size. We check Forest Department availability and confirm within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center justify-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>Check Availability on WhatsApp</span>
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
