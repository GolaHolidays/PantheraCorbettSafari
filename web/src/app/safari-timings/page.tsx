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
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SEO = LANDING_PAGE_SEO["safari-timings"];

export const metadata: Metadata = generatePageMetadata({
  title: SEO.title,
  description: SEO.description,
  canonicalPath: SEO.canonicalPath,
  keywords: SEO.keywords,
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SafariTimingsPage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett! I would like to check safari gate timings and permit availability for my dates."
  );

  const activeSchedule = SafariTimingRepository.getActiveSchedule();
  const dhikalaSchedule = SafariTimingRepository.getDhikalaSchedule();

  // Curate 6 high-intent FAQs related to safari timings & gate rules
  const allFaqs = FaqRepository.getAll();
  const timingFaqs = allFaqs
    .filter((f) => {
      const q = f.question.toLowerCase();
      const a = f.answer.toLowerCase();
      return (
        q.includes("timing") ||
        q.includes("shift") ||
        q.includes("schedule") ||
        q.includes("how far ahead") ||
        q.includes("same day") ||
        q.includes("tatkal") ||
        a.includes("gate") ||
        a.includes("morning") ||
        a.includes("afternoon")
      );
    })
    .slice(0, 6);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Safari Timings", href: "/safari-timings/" },
  ]);

  const faqSchema = buildFaqSchema(timingFaqs);

  return (
    <>
      {/* ─── Structured Data ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#17211A] py-16 sm:py-24"
        style={{
          backgroundImage: "url('/image/photo-1549366021-9f761d450615.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#17211A]/85 via-[#17211A]/70 to-[#17211A]/95" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-[#E8E0CC] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Safari Timings</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#37482E]/40 border border-[#8A9468]/40 text-[#E8E0CC] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Currently Active: {activeSchedule.seasonName} ({activeSchedule.label})</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF8F0] leading-[1.1] mb-5 max-w-3xl">
            Jim Corbett Safari Timings 2026–27
          </h1>
          <p className="text-[#E8E0CC]/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
            Official Uttarakhand Forest Department shift timings, morning &amp; afternoon gate hours, and strict last-entry cutoffs across all Jim Corbett core &amp; buffer zones.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              variant="primary"
              size="lg"
              href={whatsAppLink}
              isExternal
              className="inline-flex items-center gap-2"
            >
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
              <span>Book Safari Shift on WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${contact.phoneRaw}`}
              className="text-white border-[#8A9468]/60 hover:border-[#E8E0CC] inline-flex items-center gap-2"
            >
              <HugeiconsIcon icon={Call02Icon} size={18} />
              <span>Call Ramnagar Desk: {contact.phoneDisplay}</span>
            </Button>
          </div>

          {/* Quick timing highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            <div className="bg-white/5 border border-white/10 rounded-[4px] p-3.5 backdrop-blur-xs">
              <span className="text-[10px] font-bold text-[#8A9468] uppercase tracking-wider block">
                Morning Shift
              </span>
              <span className="font-serif font-bold text-lg text-white font-tabular block mt-0.5">
                {activeSchedule.morning.shiftSummary}
              </span>
              <span className="text-[11px] text-[#E8E0CC]/70 block mt-0.5">
                Cutoff: {activeSchedule.morning.lastEntry}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[4px] p-3.5 backdrop-blur-xs">
              <span className="text-[10px] font-bold text-[#8A9468] uppercase tracking-wider block">
                Afternoon Shift
              </span>
              <span className="font-serif font-bold text-lg text-white font-tabular block mt-0.5">
                {activeSchedule.afternoon.shiftSummary}
              </span>
              <span className="text-[11px] text-[#E8E0CC]/70 block mt-0.5">
                Cutoff: {activeSchedule.afternoon.lastEntry}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[4px] p-3.5 backdrop-blur-xs">
              <span className="text-[10px] font-bold text-[#C99A3D] uppercase tracking-wider block">
                Dhikala Canter
              </span>
              <span className="font-serif font-bold text-lg text-white font-tabular block mt-0.5">
                {dhikalaSchedule.winter.morning.split("–")[0].trim()} / {dhikalaSchedule.winter.afternoon.split("–")[0].trim()}
              </span>
              <span className="text-[11px] text-[#E8E0CC]/70 block mt-0.5">
                Season: {dhikalaSchedule.openSeason}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE TIMINGS WIDGET ───────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FBF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Official Seasonal Gate Schedule"
            subtitle="Corbett shift hours change 4 times each year based on solar daylight angles. Use the interactive switcher below to inspect your travel dates."
            badgeText="Seasonal Timings"
            align="center"
          />

          <div className="bg-white border border-[#E8E0CC] rounded-xl p-5 sm:p-8 shadow-sm">
            <SafariGateTimingsWidget showCanterSection={true} />
          </div>
        </div>
      </section>

      {/* ─── SHIFT COMPARISON: MORNING VS AFTERNOON ───────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Morning vs Afternoon Safari: Which Should You Book?"
            subtitle="Both shifts offer unique advantages depending on the season, wildlife behavior, and your photography goals."
            badgeText="Shift Guide"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Morning card */}
            <div className="bg-white border border-[#E8E0CC] rounded-xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="moss" size="md">
                    Morning Shift (Dawn)
                  </Badge>
                  <span className="text-xs font-bold text-[#8A9468] font-tabular">4.0 Hours</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#17211A] mb-3">
                  Early Dawn Patrol &amp; Tracking
                </h3>
                <p className="text-sm text-[#17211A]/85 leading-relaxed mb-4">
                  The morning shift starts right at sunrise. It offers the freshest tiger pugmarks, crisp mountain air, and highest auditory alarm calls (deer and langurs barking) as predators return from night hunts.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#17211A]/85 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Freshest Pugmarks:</strong> Tracks made overnight are sharp and unblurred by vehicle traffic.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Territorial Patrols:</strong> Tigers frequently walk directly on dirt roads at first light.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Bird Activity:</strong> Peak chirping and canopy feeding in Sal forests.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#E8E0CC]">
                <p className="text-xs text-[#8A9468]">
                  <strong>Pro-Tip:</strong> Dress in 2–3 layers in winter (Nov–Feb); open Gypsy rides at 06:30 AM can be brisk.
                </p>
              </div>
            </div>

            {/* Afternoon card */}
            <div className="bg-white border border-[#E8E0CC] rounded-xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="ember" size="md">
                    Afternoon Shift (Dusk)
                  </Badge>
                  <span className="text-xs font-bold text-[#8A9468] font-tabular">4.0 Hours</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#17211A] mb-3">
                  Waterhole Action &amp; River Crossings
                </h3>
                <p className="text-sm text-[#17211A]/85 leading-relaxed mb-4">
                  The afternoon shift takes you deep into the park as temperatures warm. Large herds of Asian elephants emerge from dense bamboo thickets toward the Ramganga and Kosi riverbeds to bathe and drink.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#17211A]/85 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Elephant Herds:</strong> Spectacular family herd sightings along grasslands and rivers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Golden Hour Lighting:</strong> Warm, gentle lighting ideal for wildlife telephoto photography.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Reptile Basking:</strong> Mugger crocodiles and Gharials basking along rocky river banks.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#E8E0CC]">
                <p className="text-xs text-[#8A9468]">
                  <strong>Pro-Tip:</strong> Highly recommended if visiting with young children or elders who prefer warmer temperatures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GATE PROTOCOLS & CUTOFF RULES ────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#E8E0CC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="gold" size="md" className="mb-2">Official Enforcement</Badge>
            <h2 className="font-serif text-3xl font-bold text-[#17211A]">
              Jim Corbett Gate Cutoff &amp; Entry Protocol
            </h2>
            <p className="text-sm text-[#8A9468] max-w-xl mx-auto mt-2">
              The Uttarakhand Forest Department enforces electronic RFID gate logs with zero tolerance for delays.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-[#FBF8F0] border-l-4 border-[#B84C1E] rounded-r-[4px]">
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">
                1. Strict Last Entry Gate Lock
              </h3>
              <p className="text-xs sm:text-sm text-[#17211A]/85 leading-relaxed">
                Gates close strictly at the designated Last Entry time (typically 1 hour 30 minutes after opening). If a visitor arrives even 2 minutes past this deadline, entry is automatically denied by the forest checkpoint system without exception or refund.
              </p>
            </div>

            <div className="p-5 bg-[#FBF8F0] border-l-4 border-[#37482E] rounded-r-[4px]">
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">
                2. Mandatory Identity Verification
              </h3>
              <p className="text-xs sm:text-sm text-[#17211A]/85 leading-relaxed">
                All guests must present their original government-issued photo ID (Aadhaar Card, Passport, Voter ID, or Driving License) matching the exact details submitted during permit booking. Digital scans or photocopies are not accepted at core gate barriers.
              </p>
            </div>

            <div className="p-5 bg-[#FBF8F0] border-l-4 border-[#C99A3D] rounded-r-[4px]">
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">
                3. Compulsory Exit Audits &amp; Heavy Fines
              </h3>
              <p className="text-xs sm:text-sm text-[#17211A]/85 leading-relaxed">
                All safari gypsies and canters must cross back through the exit gate before the Mandatory Exit cutoff. Staying inside the park past sunset incurs immediate vehicle blacklisting and steep statutory penalties under the Wildlife Protection Act.
              </p>
            </div>

            <div className="p-5 bg-[#FBF8F0] border-l-4 border-[#8A9468] rounded-r-[4px]">
              <h3 className="font-serif font-bold text-base text-[#17211A] mb-1">
                4. Mandatory Hotel Pickup Buffer
              </h3>
              <p className="text-xs sm:text-sm text-[#17211A]/85 leading-relaxed">
                Our drivers arrive at your hotel 30–45 minutes prior to gate opening. This provides adequate time for permit stamp endorsement, driver allocation, and mandatory forest guide pairing at the barrier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORBETT PLANNING HUB / INTERNAL LINKS ──────────────────────── */}
      <section className="py-12 bg-[#FBF8F0] border-t border-[#E8E0CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A9468]">Corbett Planning Hub</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] mt-1">Explore Safari Options &amp; Packages</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/jeep-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Private Gypsy</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Jeep Safari Booking</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Book a 4x4 Gypsy across Bijrani, Jhirna, Garjiya, or Dhela with certified local drivers.</p>
            </Link>

            <Link
              href="/canter-safari/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Dhikala Grassland</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Canter Safari (Dhikala)</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">16-person sharing safari bus into Dhikala core zone at ₹2,299/person. Opens 15 Nov.</p>
            </Link>

            <Link
              href="/safari-price/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Tariff Guide</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Safari Prices 2026–27</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Official government rates for all core &amp; buffer zones with zero hidden costs.</p>
            </Link>

            <Link
              href="/delhi-to-jim-corbett-package/"
              className="p-4 rounded-[4px] bg-white border border-[#E8E0CC] hover:border-[#37482E] hover:shadow-md transition-all group"
            >
              <p className="text-xs font-semibold text-[#8A9468] uppercase tracking-wider mb-1">Delhi Transfers</p>
              <h3 className="font-serif font-bold text-base text-[#17211A] group-hover:text-[#37482E] transition-colors mb-1">Delhi 2N3D Packages</h3>
              <p className="text-xs text-[#17211A]/75 leading-relaxed">Round-trip private cab from NCR, resort stay, meals &amp; guaranteed core jeep safari.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      {timingFaqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-t border-[#E8E0CC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Safari Timings — Frequently Asked Questions"
              subtitle="Practical answers about shift schedules, gate rules, and pickup protocols."
              badgeText="Timings FAQ"
              align="center"
            />
            <div className="space-y-3">
              {timingFaqs.map((faq, idx) => (
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
      )}

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#17211A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF8F0] mb-3">
            Book Your Jim Corbett Safari Shift
          </h2>
          <p className="text-[#8A9468] text-base mb-8">
            Tell us your preferred date and shift (Morning or Afternoon). Our Ramnagar safari desk will verify live permit quota and secure your booking.
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
              <span>Check Shift Availability on WhatsApp</span>
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
