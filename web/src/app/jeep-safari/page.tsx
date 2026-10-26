import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SiteConfigRepository,
  FaqRepository,
  SafariTimingRepository,
} from "../../core/database/repositories";
import {
  LANDING_PAGE_SEO,
  generatePageMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "../../core/utils/seo";
import { Button, Badge, SectionHeader } from "../../shared";
import { SafariGateTimingsWidget } from "../../features/safari-types";
import { HugeiconsIcon } from "@hugeicons/react";
import Ticket01Icon from "@hugeicons/core-free-icons/Ticket01Icon";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import Clock01Icon from "@hugeicons/core-free-icons/Clock01Icon";
import AlertCircleIcon from "@hugeicons/core-free-icons/AlertCircleIcon";
import CheckmarkBadge01Icon from "@hugeicons/core-free-icons/CheckmarkBadge01Icon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["jeep-safari"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: [
    ...SEO.keywords,
    "current booking corbett safari ramnagar",
    "tatkal safari booking jim corbett",
    "same day jim corbett safari booking",
    "last minute corbett safari permit",
  ],
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

export default function JeepSafariPage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett! I want to book a Jim Corbett jeep safari. Please share availability and pricing."
  );
  const safariFaqs = FaqRepository.getByCategory("Safari Types");
  const bookingFaqs = FaqRepository.getByCategory("Booking and Permits").filter(
    (f) =>
      f.question.includes("same day") ||
      f.question.includes("Tatkal") ||
      f.question.includes("full")
  );
  const faqs = [...safariFaqs, ...bookingFaqs];
  const activeSchedule = SafariTimingRepository.getActiveSchedule();
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
            badgeText="Safari Price Guide 2026–27"
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

            {/* Quick Live Shift Glance */}
            <div className="bg-white border border-[#E8E0CC] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#37482E]">
                <HugeiconsIcon icon={Clock01Icon} size={18} className="text-[#C99A3D]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A9468]">
                  Current Season Shift Timings
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#17211A] mb-4">
                Active Gate Shifts ({activeSchedule.label})
              </h3>
              <div className="space-y-3 mb-5">
                <div className="p-3.5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#17211A] uppercase tracking-wide">
                      Morning Shift
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#37482E]/10 text-[#37482E]">
                      Recommended
                    </span>
                  </div>
                  <div className="text-sm font-bold font-tabular text-[#17211A]">
                    {activeSchedule.morning.shiftSummary}
                  </div>
                  <div className="text-[11px] text-[#8A9468] mt-1 font-medium">
                    Gate Opens: {activeSchedule.morning.gateOpens} • Cutoff: {activeSchedule.morning.lastEntry} • Exit: {activeSchedule.morning.mandatoryExit}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FBF8F0] border border-[#E8E0CC]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#17211A] uppercase tracking-wide">
                      Afternoon Shift
                    </span>
                  </div>
                  <div className="text-sm font-bold font-tabular text-[#17211A]">
                    {activeSchedule.afternoon.shiftSummary}
                  </div>
                  <div className="text-[11px] text-[#8A9468] mt-1 font-medium">
                    Gate Opens: {activeSchedule.afternoon.gateOpens} • Cutoff: {activeSchedule.afternoon.lastEntry} • Exit: {activeSchedule.afternoon.mandatoryExit}
                  </div>
                </div>
              </div>

              <a
                href="#official-gate-timings"
                className="text-xs font-bold text-[#B84C1E] hover:underline inline-flex items-center gap-1.5"
              >
                <span>View All 4 Seasonal Schedules &amp; Cutoff Rules</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFICIAL GATE TIMINGS & POLICIES ──────────────────────────────── */}
      <section id="official-gate-timings" className="py-14 sm:py-20 bg-[#FBF8F0] border-b border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Official Safari Gate Timings & Policies"
            subtitle="Live Uttarakhand Forest Department schedule for Jim Corbett safari gates with automated entry cutoffs."
            badgeText="Government Schedule"
          />
          <SafariGateTimingsWidget showCanterSection={true} />
        </div>
      </section>

      {/* ─── SAME-DAY & CURRENT BOOKING (TATKAL QUOTA) ────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#17211A] text-[#FBF8F0] border-b border-[#37482E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#C99A3D]/15 border border-[#C99A3D]/40 text-[#C99A3D] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <HugeiconsIcon icon={AlertCircleIcon} size={14} />
                <span>Urgent / Last-Minute Travel</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF8F0]">
                Need a Same-Day Safari? How Current Booking Works
              </h2>
              <p className="text-[#8A9468] text-sm sm:text-base mt-2 max-w-2xl">
                When the official government portal shows “Sold Out” for core zones, you still have legitimate on-ground options through cancellation releases and buffer zone quotas.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="primary"
                size="md"
                href={`https://wa.me/919997488004?text=${encodeURIComponent("Hello! I am looking for a same-day or current booking safari permit for Jim Corbett today/tomorrow.")}`}
                isExternal
                className="inline-flex items-center gap-2"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={16} />
                <span>Check Today&apos;s Open Shifts</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1D2B22] border border-[#37482E] rounded-[6px] p-6 hover:border-[#8A9468]/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#B84C1E]/20 text-[#B84C1E] flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FBF8F0] mb-2">
                Cancellation Quota (Tatkal Shifts)
              </h3>
              <p className="text-xs text-[#E8E0CC]/80 leading-relaxed mb-4">
                Core zone permits (Bijrani, Garjiya, Jhirna) frequently reopen 2 to 7 days before the safari date due to traveller itinerary changes. We monitor these releases in real time to lock permits for you.
              </p>
              <span className="text-[11px] text-[#C99A3D] font-mono tracking-wide">
                • Lead time: 24–48 hours notice
              </span>
            </div>

            <div className="bg-[#1D2B22] border border-[#37482E] rounded-[6px] p-6 hover:border-[#8A9468]/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#C99A3D]/20 text-[#C99A3D] flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FBF8F0] mb-2">
                100% Guaranteed Buffer Gypsies
              </h3>
              <p className="text-xs text-[#E8E0CC]/80 leading-relaxed mb-4">
                Phato Zone and Sitabani Reserve Forest operate all 365 days with open vehicle quotas. Even on peak weekends, we can confirm a private 4x4 Gypsy with a registered guide on 2 hours&apos; notice.
              </p>
              <span className="text-[11px] text-[#C99A3D] font-mono tracking-wide">
                • Same-day confirmation guaranteed
              </span>
            </div>

            <div className="bg-[#1D2B22] border border-[#37482E] rounded-[6px] p-6 hover:border-[#8A9468]/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#37482E]/40 text-[#8A9468] flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FBF8F0] mb-2">
                Direct Ramnagar Desk Verification
              </h3>
              <p className="text-xs text-[#E8E0CC]/80 leading-relaxed mb-4">
                Avoid unregistered road touts or fake booking slips. Our physical desk in Patkote verifies government gate manifests directly, ensuring your Gypsy and driver are official CTR registrants.
              </p>
              <span className="text-[11px] text-[#C99A3D] font-mono tracking-wide">
                • Zero counterfeit permit risk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERNAL LINKING / HELPFUL SAFARI GUIDES ───────────────────── */}
      <section className="py-12 bg-white border-t border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A9468]">Corbett Planning Hub</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mt-1">Explore Other Safari Options & Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/canter-safari/"
              className="p-4 rounded-[4px] bg-[#FBF8F0] border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Dhikala Day Trip</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Canter Safari (Dhikala)</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">The only day visit option for Dhikala grassland at ₹2,299/seat. 16-seater sharing bus.</p>
            </Link>

            <Link
              href="/safari-price/"
              className="p-4 rounded-[4px] bg-[#FBF8F0] border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Tariff Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Prices 2026–27</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Official government rates for all core & buffer zones. Zero hidden surcharges.</p>
            </Link>

            <Link
              href="/forest-rest-houses/"
              className="p-4 rounded-[4px] bg-[#FBF8F0] border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Core Lodges</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Forest Rest Houses</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Night stays inside Dhikala, Bijrani, Gairal & Jhirna. Midnight booking guidance.</p>
            </Link>

            <Link
              href="/delhi-to-jim-corbett-package/"
              className="p-4 rounded-[4px] bg-[#FBF8F0] border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Delhi Transfers</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Delhi Tour Packages</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Round-trip private cab from NCR, resort stay, meals & core jeep safari from ₹20,999.</p>
            </Link>
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
