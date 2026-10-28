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
import AlertCircleIcon from "@hugeicons/core-free-icons/AlertCircleIcon";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["canter-safari"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: SEO.keywords,
});

// ─── Static data ──────────────────────────────────────────────────────────────

const CANTER_INCLUSIONS = [
  "Dhikala core zone entry permit",
  "Confirmed seat on 16-person sharing open-roof Canter bus",
  "Government-appointed wildlife guide and driver",
  "Pickup & drop at Ramnagar or Dhangarhi Gate",
  "Dhangarhi Gate entry pass and all park fees",
];

const dhikalaSchedule = SafariTimingRepository.getDhikalaSchedule();

const CANTER_SHIFTS = [
  {
    name: "Morning Expedition",
    winterTime: dhikalaSchedule.winter.morning,
    summerTime: dhikalaSchedule.summer.morning,
    duration: dhikalaSchedule.winter.tag,
    note: "Best for tiger and elephant sightings in Dhikala chaur grasslands. Early dawn departure.",
    highlight: true,
  },
  {
    name: "Afternoon Expedition",
    winterTime: dhikalaSchedule.winter.afternoon,
    summerTime: dhikalaSchedule.summer.afternoon,
    duration: "6.0h Loop",
    note: "Longer, quieter — excellent for wild elephant herds crossing Ramganga river and birding.",
    highlight: false,
  },
];

const BOOKING_STEPS = [
  { step: "01", title: "WhatsApp us", detail: "Send your preferred dates and number of seats to +91 99974 88004" },
  { step: "02", title: "We check quota", detail: "We verify Canter seat availability on the Forest Department portal in real-time" },
  { step: "03", title: "Pay advance", detail: "Partial advance via UPI or NEFT confirms your seat in your name" },
  { step: "04", title: "Written confirmation", detail: "Receive permit details and pickup time confirmation on WhatsApp" },
  { step: "05", title: "Safari day", detail: "Reach Ramnagar / Dhangarhi Gate at pickup time (around 05:30 AM for morning shift)" },
];

const COMPARISON_ROWS = [
  { feature: "Vehicle Type", canter: "16-person sharing open Canter bus", jeep: "Private 4x4 Gypsy (exclusive)" },
  { feature: "Zone", canter: "Dhikala core zone only", jeep: "Bijrani, Jhirna, Garjiya, Dhela & others" },
  { feature: "Price", canter: "₹2,299/person", jeep: "₹7,999/jeep (up to 6 guests)" },
  { feature: "Season", canter: "15 Nov – 15 Jun only", jeep: "Year-round (zone-dependent)" },
  { feature: "Quota", canter: "4 canters/shift (very limited)", jeep: "10–15 jeeps/shift per zone" },
  { feature: "Advance Needed", canter: "15–20 days minimum", jeep: ">5 days for pre-booking rate" },
  { feature: "Pickup", canter: "Ramnagar / Dhangarhi Gate", jeep: "Up to 10 km from Ramnagar" },
  { feature: "Best for", canter: "Dhikala grasslands & elephant herds", jeep: "Tiger sightings, flexibility, privacy" },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CanterSafariPage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett! I want to book Dhikala canter safari seats. Please share availability."
  );
  const faqs = FaqRepository.getByCategory("Dhikala Zone");
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Canter Safari", href: "/canter-safari/" },
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
            "url('/image/photo-1549366021-9f761d450615.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#17211A]/80 via-[#17211A]/60 to-[#17211A]/92" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-[#E8E0CC] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Canter Safari</span>
          </nav>

          {/* Scarcity badge */}
          <div className="inline-flex items-center gap-2 bg-[#B84C1E]/20 border border-[#B84C1E]/40 text-[#E8734A] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <HugeiconsIcon icon={AlertCircleIcon} size={14} />
            <span>Opens 15 November 2026 · Only 4 Canters (64 Seats) per Shift</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] leading-[1.1] mb-5 max-w-3xl">
            Jim Corbett Canter Safari — Dhikala Zone Booking Online
          </h1>
          <p className="text-[#E8E0CC]/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-3">
            The only official way day visitors can access the legendary{" "}
            <Link href="/zones/dhikala-zone/" className="text-white underline underline-offset-2 font-semibold hover:text-[#C99A3D]">
              Dhikala zone
            </Link>{" "}
            — India&apos;s most celebrated tiger grassland, located 32 km deep inside Corbett&apos;s core reserve. Open-roof 16-seater safari canter with pickup from Ramnagar.
          </p>
          <p className="text-[#C99A3D] text-sm font-semibold mb-8">
            Season 2026–27: 15 November 2026 – 15 June 2027 · ₹2,299/seat all-inclusive · 45-day advance booking recommended
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>Check Dhikala Seat Availability</span>
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

          {/* Key facts strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {[
              { val: "₹2,299", sub: "Per seat / all-inclusive" },
              { val: "16 Seats", sub: "Per canter (shared)" },
              { val: "4 Canters", sub: "Total per shift" },
              { val: "Nov–Jun", sub: "Operating season" },
            ].map((s) => (
              <div key={s.val} className="text-center bg-white/5 border border-white/10 rounded-[4px] p-3">
                <div className="font-serif text-lg font-bold text-[#FBF8F0] font-tabular">{s.val}</div>
                <div className="text-[9px] text-[#8A9468] uppercase tracking-wider mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHIFTS ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Dhikala Canter Safari Timings"
            subtitle="Two shifts daily. Morning shift highly recommended for tiger and elephant activity in the chaur grasslands."
            badgeText="Shift Schedule"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {CANTER_SHIFTS.map((shift) => (
              <div
                key={shift.name}
                className={`p-6 rounded-xl border ${shift.highlight ? "bg-[#17211A] border-[#37482E]" : "bg-white border-[#E8E0CC]"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-serif font-bold text-lg ${shift.highlight ? "text-[#FBF8F0]" : "text-[#17211A]"}`}>
                    {shift.name}
                  </span>
                  {shift.highlight && <Badge variant="ember" size="sm">Recommended</Badge>}
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className={`text-xs font-semibold ${shift.highlight ? "text-[#E8E0CC]/80" : "text-[#8A9468]"}`}>
                      Winter (Nov 15 – Mar 31):
                    </span>
                    <span className={`text-base font-tabular font-bold ${shift.highlight ? "text-[#FBF8F0]" : "text-[#17211A]"}`}>
                      {shift.winterTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className={`text-xs font-semibold ${shift.highlight ? "text-[#E8E0CC]/80" : "text-[#8A9468]"}`}>
                      Summer (Apr 01 – Jun 15):
                    </span>
                    <span className={`text-base font-tabular font-bold ${shift.highlight ? "text-[#FBF8F0]" : "text-[#17211A]"}`}>
                      {shift.summerTime}
                    </span>
                  </div>
                </div>
                <div className={`text-xs font-semibold ${shift.highlight ? "text-[#C99A3D]" : "text-[#37482E]"}`}>
                  Duration: {shift.duration}
                </div>
                <p className={`text-xs mt-3 italic ${shift.highlight ? "text-[#E8E0CC]/70" : "text-[#8A9468]"}`}>
                  {shift.note}
                </p>
              </div>
            ))}
          </div>

          <SafariGateTimingsWidget showCanterSection={true} />
        </div>
      </section>

      {/* ─── INCLUSIONS ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F4EFE6] border-y border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <SectionHeader
                title="What's Included in ₹2,299/Seat"
                subtitle="All-inclusive — no hidden costs, no extra charges at the gate."
                badgeText="Inclusions"
              />
              <ul className="space-y-3">
                {CANTER_INCLUSIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#17211A]/90">
                    <span className="w-5 h-5 rounded-full bg-[#37482E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking steps */}
            <div>
              <SectionHeader
                title="How to Book — 5 Steps"
                subtitle="We handle the Forest Department portal. You just need to WhatsApp us."
                badgeText="Booking Process"
              />
              <ol className="space-y-4">
                {BOOKING_STEPS.map((step) => (
                  <li key={step.step} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#17211A] text-[#FBF8F0] flex items-center justify-center text-xs font-bold shrink-0 font-tabular">
                      {step.step}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-[#17211A]">{step.title}</p>
                      <p className="text-xs text-[#8A9468] mt-0.5">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CANTER vs JEEP COMPARISON ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Canter Safari vs Jeep Safari"
            subtitle="Not sure which to choose? Here's the key difference at a glance."
            badgeText="Comparison"
          />
          <div className="overflow-x-auto rounded-[4px] border border-[#E8E0CC]">
            <table className="w-full text-sm">
              <thead className="bg-[#17211A] text-[#FBF8F0]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-1/3">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold bg-[#B84C1E]/90">Canter Safari (16-Seater)</th>
                  <th className="text-center px-4 py-3 font-semibold bg-[#37482E]/90">Jeep Safari (Private 4x4)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={row.feature} className={`border-t border-[#E8E0CC] ${idx % 2 === 0 ? "bg-white" : "bg-[#FBF8F0]"}`}>
                    <td className="px-4 py-3 font-medium text-[#17211A]">{row.feature}</td>
                    <td className="px-4 py-3 text-center text-[#17211A]/85 text-xs">{row.canter}</td>
                    <td className="px-4 py-3 text-center text-[#17211A]/85 text-xs">{row.jeep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#B84C1E]/5 border border-[#B84C1E]/20 rounded-[4px]">
              <p className="text-sm font-semibold text-[#B84C1E] mb-1">Choose Canter if…</p>
              <p className="text-xs text-[#17211A]/80">Dhikala grasslands are your priority. You don&apos;t need a private vehicle. Season is Nov–Jun. You&apos;re comfortable with a shared bus experience.</p>
            </div>
            <div className="p-4 bg-[#37482E]/5 border border-[#37482E]/20 rounded-[4px]">
              <p className="text-sm font-semibold text-[#37482E] mb-1">Choose Jeep if…</p>
              <p className="text-xs text-[#17211A]/80">You want privacy and full control over your experience. Visiting in monsoon (Jhirna/Phato). Group of 4–6 people. You prioritize tiger sightings in Bijrani or Garjiya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERNAL LINKING / HELPFUL SAFARI GUIDES ───────────────────── */}
      <section className="py-12 bg-[#FBF8F0] border-t border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A9468]">Corbett Planning Hub</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mt-1">Explore Other Safari Options & Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/zones/dhikala-zone/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Core Zone Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Dhikala Zone Guide</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Comprehensive overview of Dhikala grasslands, Ramganga reservoir &amp; wildlife.</p>
            </Link>

            <Link
              href="/forest-rest-houses/dhikala-forest-rest-house/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Night Stay</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Dhikala Forest Lodge</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Stay deep inside core tiger habitat. 45-day lottery booking window.</p>
            </Link>

            <Link
              href="/safari-timings/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Shift Schedules</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Gate Timings</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Official seasonal sunrise &amp; afternoon shift opening hours and last entry rules.</p>
            </Link>

            <Link
              href="/jeep-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Private Gypsy</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Jeep Safari Booking</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Exclusive 4x4 Gypsy for Bijrani, Jhirna, Garjiya &amp; Dhela zones from ₹5,999.</p>
            </Link>

            <Link
              href="/safari-price/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Tariff Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Prices 2026–27</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Official entry fees, guide charges, vehicle permits, and zone comparisons.</p>
            </Link>

            <Link
              href="/delhi-to-jim-corbett-package/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Delhi Transfers</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Delhi 2N3D Packages</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">All-inclusive resort stays, core jeep safari, and private sedan/SUV cab from Delhi.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#E8E0CC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Dhikala Canter Safari — FAQ"
              subtitle="Common questions about booking, season, timings, and what to expect."
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
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF8F0] mb-2">
            Book Dhikala Canter Safari
          </h2>
          <p className="text-[#C99A3D] font-semibold text-sm mb-2">
            ₹2,299/seat · All-inclusive · Season: 15 Nov – 15 Jun
          </p>
          <p className="text-[#8A9468] text-sm mb-8">
            Only 4 canters per shift. Share your dates and number of seats — we check quota immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={whatsAppLink} isExternal className="inline-flex items-center justify-center gap-2">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>Check Dhikala Seat Availability</span>
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
