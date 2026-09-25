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
import Ticket01Icon from "@hugeicons/core-free-icons/Ticket01Icon";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["jeep-safari"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: SEO.keywords,
});

// ─── Static data ──────────────────────────────────────────────────────────────

const JEEP_ZONES = [
  { zone: "Bijrani", type: "Core Zone", preBooking: 7999, currentBooking: 8499, distance: "1 km from Amdanda Gate", sighting: "9.1/10", openYear: false, season: "Oct–Jun" },
  { zone: "Jhirna", type: "Core Zone", preBooking: 7999, currentBooking: 8499, distance: "16 km from Jhirna Gate", sighting: "8.2/10", openYear: true, season: "All Year" },
  { zone: "Garjiya", type: "Core Zone", preBooking: 7999, currentBooking: 8499, distance: "12 km from Garjiya Gate", sighting: "8.9/10", openYear: false, season: "Nov–Jun" },
  { zone: "Dhela", type: "Core Zone", preBooking: 7999, currentBooking: 8499, distance: "22 km from Dhela Gate", sighting: "8.4/10", openYear: true, season: "All Year" },
  { zone: "Durga Devi", type: "Core Zone", preBooking: 7999, currentBooking: 8499, distance: "28 km from Ramnagar", sighting: "7.8/10", openYear: false, season: "Nov–Jun" },
  { zone: "Phato", type: "Buffer Zone", preBooking: 6499, currentBooking: 6499, distance: "18 km from Phato Gate", sighting: "7.5/10", openYear: true, season: "All Year" },
  { zone: "Hathidangar", type: "Buffer Zone", preBooking: 6499, currentBooking: 6499, distance: "15 km from Ramnagar", sighting: "7.3/10", openYear: true, season: "All Year" },
  { zone: "Sitabani (Teda/Bhandarpani)", type: "Reserve Forest", preBooking: 5999, currentBooking: 5999, distance: "20 km from Ramnagar", sighting: "7.1/10", openYear: true, season: "All Year" },
];

const INCLUSIONS = [
  "Forest Department entry permit & gate fees",
  "Exclusive 4x4 Maruti Gypsy (open-top, 4WD)",
  "Licensed forest guide / naturalist",
  "Driver and all fuel charges",
  "All taxes and park charges",
  "Complimentary pickup/drop up to 10 km from Ramnagar (pre-bookings)",
];

const SHIFTS = [
  {
    label: "Morning Shift",
    winter: "06:00 AM – 09:30 AM",
    summer: "05:45 AM – 09:15 AM",
    tip: "Best for tiger sightings — animals are active at dawn",
    recommended: true,
  },
  {
    label: "Evening Shift",
    winter: "02:00 PM – 05:30 PM",
    summer: "03:00 PM – 06:30 PM",
    tip: "Excellent for predators hunting before dark",
    recommended: false,
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function JeepSafariPage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett! I want to book a Jim Corbett jeep safari. Please share availability and pricing."
  );
  const faqs = FaqRepository.getByCategory("Safari Types");
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Jeep Safari", href: "/jeep-safari/" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#17211A] py-20 sm:py-28"
        style={{
          backgroundImage:
            "url('/image/photo-1547471080-7cc2caa01a7e.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#17211A]/75 via-[#17211A]/55 to-[#17211A]/88" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-[#E8E0CC] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Jeep Safari</span>
          </nav>

          <Badge variant="forest" size="md" className="mb-5 inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={Ticket01Icon} size={14} />
            <span>Private 4x4 Gypsy · Up to 6 Guests</span>
          </Badge>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] leading-[1.1] mb-5 max-w-3xl">
            Jim Corbett Jeep Safari
          </h1>
          <p className="text-[#E8E0CC]/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Exclusive open-top 4x4 Gypsy for your group — no strangers, no shared vehicle. Available in Bijrani, Jhirna, Garjiya, Dhela & more. Guide, permit & jeep all included.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>Check Availability</span>
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

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { val: "₹5,999", sub: "Starting price / jeep" },
              { val: "6 Adults", sub: "Max capacity" },
              { val: "3.5–4 hrs", sub: "Per safari shift" },
            ].map((s) => (
              <div key={s.val} className="text-center">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#FBF8F0] font-tabular">{s.val}</div>
                <div className="text-[9px] sm:text-xs text-[#8A9468] uppercase tracking-wider mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ZONE PRICE TABLE ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Jeep Safari by Zone — Prices & Availability"
            subtitle="Price is per jeep (not per person). Up to 6 adults can share. Guide, permit & jeep included in all prices."
            badgeText="Safari Price Guide 2025–26"
          />

          <div className="overflow-x-auto rounded-[4px] border border-[#E8E0CC]">
            <table className="w-full text-sm">
              <thead className="bg-[#17211A] text-[#FBF8F0]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Zone</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Season</th>
                  <th className="text-right px-4 py-3 font-semibold">Pre-Booking</th>
                  <th className="text-right px-4 py-3 font-semibold hidden sm:table-cell">Current Rate</th>
                  <th className="text-center px-4 py-3 font-semibold hidden lg:table-cell">Sighting Index</th>
                </tr>
              </thead>
              <tbody>
                {JEEP_ZONES.map((row, idx) => (
                  <tr
                    key={row.zone}
                    className={`border-t border-[#E8E0CC] ${idx % 2 === 0 ? "bg-white" : "bg-[#FBF8F0]"}`}
                  >
                    <td className="px-4 py-3 font-medium text-[#17211A]">
                      {row.zone}
                      {row.openYear && (
                        <span className="ml-2 text-[9px] bg-[#37482E] text-white px-1.5 py-0.5 rounded-full uppercase">
                          All Year
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#8A9468] hidden sm:table-cell">{row.type}</td>
                    <td className="px-4 py-3 text-[#8A9468] hidden md:table-cell">{row.season}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#17211A] font-tabular">
                      ₹{row.preBooking.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-right text-[#8A9468] font-tabular hidden sm:table-cell">
                      ₹{row.currentBooking.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className="text-[#37482E] font-semibold">{row.sighting}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#8A9468]">
            <p>• <strong className="text-[#17211A]">Pre-booking rate</strong> applies when booked &gt;5 days ahead. Includes complimentary pickup/drop up to 10 km from Ramnagar.</p>
            <p>• <strong className="text-[#17211A]">Current rate</strong> applies when booked within 5 days. Pickup/drop by prior arrangement.</p>
          </div>
        </div>
      </section>

      {/* ─── INCLUSIONS + SHIFTS ──────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F4EFE6] border-y border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Inclusions */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-6">
                What&apos;s Included in Every Jeep Safari
              </h2>
              <ul className="space-y-3">
                {INCLUSIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#17211A]/90">
                    <span className="w-5 h-5 rounded-full bg-[#37482E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shift timings */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-6">
                Safari Shift Timings
              </h2>
              <div className="space-y-4">
                {SHIFTS.map((shift) => (
                  <div
                    key={shift.label}
                    className={`p-5 rounded-[4px] border ${shift.recommended ? "bg-[#17211A] border-[#37482E] text-[#FBF8F0]" : "bg-white border-[#E8E0CC] text-[#17211A]"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-serif font-bold text-base ${shift.recommended ? "text-[#FBF8F0]" : "text-[#17211A]"}`}>
                        {shift.label}
                      </span>
                      {shift.recommended && (
                        <Badge variant="ember" size="sm">Recommended</Badge>
                      )}
                    </div>
                    <div className={`text-xs space-y-0.5 ${shift.recommended ? "text-[#E8E0CC]/80" : "text-[#8A9468]"}`}>
                      <p>Winter: {shift.winter}</p>
                      <p>Summer: {shift.summer}</p>
                    </div>
                    <p className={`text-xs mt-2 italic ${shift.recommended ? "text-[#8A9468]" : "text-[#8A9468]"}`}>
                      {shift.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#FBF8F0]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Jeep Safari — Common Questions"
              subtitle="Practical details about booking, capacity, zones, and pricing."
              badgeText="FAQ"
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
            Book Your Jim Corbett Jeep Safari
          </h2>
          <p className="text-[#8A9468] text-base mb-8">
            Share your dates and preferred zone. We check permit availability and confirm within the hour.
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
