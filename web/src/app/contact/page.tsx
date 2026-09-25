import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import Mail01Icon from "@hugeicons/core-free-icons/Mail01Icon";
import MapPinIcon from "@hugeicons/core-free-icons/MapPinIcon";
import Clock01Icon from "@hugeicons/core-free-icons/Clock01Icon";
import ShieldCheckIcon from "@hugeicons/core-free-icons/ShieldCheckIcon";

import { SiteConfigRepository } from "../../core/database/repositories";
import {
  generatePageMetadata,
  SITE_URL,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from "../../core/utils/seo";
import { Badge } from "../../shared/components/ui/badge/Badge";
import { GoogleMapEmbed } from "../../shared/components/ui/map-embed/GoogleMapEmbed";
import { ContactForm } from "./components/ContactForm";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Panthera Corbett Safari | Official Ramnagar Desk & Office Map",
  description:
    "Contact Panthera Corbett Safari official booking desk in Ramnagar. Call +91 99974 88004 or WhatsApp for instant Jim Corbett jeep & canter permits, packages, and resort stays. Patkote, Ramnagar office map & directions.",
  canonicalPath: "/contact/",
  keywords: [
    "panthera corbett safari contact",
    "jim corbett safari booking office ramnagar",
    "jim corbett safari phone number",
    "jim corbett safari whatsapp booking",
    "corbett tiger reserve office address",
    "ramnagar safari desk contact",
    "dhikala safari office contact",
    "bijrani safari permit office",
  ],
});

// ─── Static Structured Data ───────────────────────────────────────────────────

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Contact Us", href: "/contact/" },
]);

const contactFaqs = [
  {
    category: "Contact & Booking",
    question: "Where is Panthera Corbett Safari office located in Ramnagar?",
    answer:
      "Our main booking office is located at Patkote, Ramnagar, Nainital District, Uttarakhand 244715, near the southern access corridor of Corbett Tiger Reserve. You can navigate directly using our Google Maps location: https://maps.app.goo.gl/YrBbDtW9tSNNbBKr8.",
  },
  {
    category: "Contact & Booking",
    question: "What are your booking desk opening hours?",
    answer:
      "Our Ramnagar central safari desk operates daily from 6:00 AM to 9:30 PM (IST) 365 days a year, including government holidays. You can call +91 99974 88004 or message on WhatsApp for immediate support.",
  },
  {
    category: "Permits",
    question: "Do I need to visit the office in person to collect my safari permit?",
    answer:
      "No in-person visit is mandatory before safari. Once you send us your government ID details online via WhatsApp or email, our team secures official Forest Department permits and assigns your registered 4x4 Gypsy and naturalist guide. Your Gypsy driver picks you up directly from your Ramnagar resort.",
  },
  {
    category: "Permits",
    question: "What documents must I carry for Corbett tiger safari?",
    answer:
      "Every traveller must carry the original Government Photo ID (Aadhaar Card, Passport, Voter ID, or Driving Licence) whose details were submitted at permit booking time. Forest Department gate guards physically verify original IDs before entry.",
  },
];

const faqSchema = buildFaqSchema(contactFaqs);

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  const config = SiteConfigRepository.getConfig();
  const contact = config.contact;

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Panthera Corbett Safari — Ramnagar Booking Desk",
    description:
      "Official contact page for Panthera Corbett Safari desk in Ramnagar, Uttarakhand. Direct phone, WhatsApp, email, and Google Maps office navigation.",
    mainEntity: {
      "@type": "LocalBusiness",
      name: config.name,
      telephone: contact.phoneRaw,
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.officeAddress.line1,
        addressLocality: contact.officeAddress.city,
        addressRegion: contact.officeAddress.state,
        postalCode: contact.officeAddress.pincode,
        addressCountry: "IN",
      },
      hasMap: config.social.googleBusinessProfile,
    },
  };

  const localBusinessSchema = buildLocalBusinessSchema({
    name: config.name,
    description: config.description,
    telephone: contact.phoneRaw,
    email: contact.email,
    streetAddress: contact.officeAddress.line1,
    city: contact.officeAddress.city,
    state: contact.officeAddress.state,
    pincode: contact.officeAddress.pincode,
    instagram: config.social.instagram,
    facebook: config.social.facebook,
    googleBusinessProfile: config.social.googleBusinessProfile,
  });

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="bg-[#FBF8F0] min-h-screen">
        {/* ── Hero Section ─────────────────────────────────────────────────── */}
        <section className="bg-[#17211A] text-[#FBF8F0] pt-12 pb-16 border-b border-[#37482E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="text-xs text-[#8A9468] mb-6 flex items-center gap-2 font-medium"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#C99A3D]">Contact Us</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#C99A3D]/20 text-[#E8B84A] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#C99A3D]/30">
                <HugeiconsIcon icon={ShieldCheckIcon} size={14} />
                <span>Authorized Ramnagar Safari Desk</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Contact Panthera Corbett Safari
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#E8E0CC]/85 leading-relaxed">
                Connect directly with our local Ramnagar booking office. Whether you need urgent
                Dhikala canter permits, private Gypsy safaris, heritage forest rest house stays, or
                Delhi cab transfers, our team is available 365 days a year.
              </p>

              {/* Quick stats strip */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#37482E]/60 text-xs text-[#E8E0CC]/90">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A9468] block font-semibold">
                    Support Desk
                  </span>
                  <span className="font-bold text-white text-sm">6 AM – 9:30 PM Daily</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A9468] block font-semibold">
                    Office Base
                  </span>
                  <span className="font-bold text-white text-sm">Patkote, Ramnagar</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A9468] block font-semibold">
                    CTR Liaison
                  </span>
                  <span className="font-bold text-white text-sm">Govt. Verified Guides</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A9468] block font-semibold">
                    WhatsApp Replies
                  </span>
                  <span className="font-bold text-[#25D366] text-sm">&lt; 15 Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 Direct Contact Channels Cards ────────────────────────────── */}
        <section className="py-12 bg-[#F4EFE6] border-b border-[#E8E0CC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Phone */}
              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-none bg-[#B84C1E]/10 text-[#B84C1E] flex items-center justify-center mb-3">
                    <HugeiconsIcon icon={Call02Icon} size={20} />
                  </div>
                  <h2 className="font-serif text-base font-bold text-[#17211A]">
                    Helpdesk Phone
                  </h2>
                  <p className="text-xs text-[#8A9468] mt-1 mb-3">
                    Immediate telephone assistance for permit booking &amp; pricing.
                  </p>
                  <p className="font-mono text-sm font-bold text-[#17211A] tracking-tight">
                    {contact.phoneDisplay}
                  </p>
                  <p className="text-[11px] text-[#8A9468] mt-0.5">
                    Hours: {config.hours.bookingDesk}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E0CC]/70">
                  <a
                    href={`tel:${contact.phoneRaw}`}
                    className="text-xs font-bold text-[#B84C1E] hover:underline flex items-center gap-1"
                  >
                    Call Now ↗
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-none bg-[#1E8A4E]/10 text-[#1E8A4E] flex items-center justify-center mb-3">
                    <HugeiconsIcon icon={WhatsappIcon} size={20} />
                  </div>
                  <h2 className="font-serif text-base font-bold text-[#17211A]">
                    WhatsApp Booking
                  </h2>
                  <p className="text-xs text-[#8A9468] mt-1 mb-3">
                    Share ID proofs, check live quota availability &amp; get instant confirmations.
                  </p>
                  <p className="font-mono text-sm font-bold text-[#17211A] tracking-tight">
                    {contact.whatsappDisplay}
                  </p>
                  <p className="text-[11px] text-[#1E8A4E] font-medium mt-0.5">
                    Fastest response channel
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E0CC]/70">
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#1E8A4E] hover:underline flex items-center gap-1"
                  >
                    Chat on WhatsApp ↗
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-none bg-[#C99A3D]/10 text-[#8A5A12] flex items-center justify-center mb-3">
                    <HugeiconsIcon icon={Mail01Icon} size={20} />
                  </div>
                  <h2 className="font-serif text-base font-bold text-[#17211A]">
                    Official Email
                  </h2>
                  <p className="text-xs text-[#8A9468] mt-1 mb-3">
                    For corporate retreats, institutional groups &amp; customized itineraries.
                  </p>
                  <p className="font-mono text-xs font-bold text-[#17211A] break-all">
                    {contact.email}
                  </p>
                  <p className="text-[11px] text-[#8A9468] mt-0.5">
                    Response within 6 hours
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E0CC]/70">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-xs font-bold text-[#8A5A12] hover:underline flex items-center gap-1"
                  >
                    Send Email ↗
                  </a>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-none bg-[#37482E]/10 text-[#37482E] flex items-center justify-center mb-3">
                    <HugeiconsIcon icon={MapPinIcon} size={20} />
                  </div>
                  <h2 className="font-serif text-base font-bold text-[#17211A]">
                    Office Address
                  </h2>
                  <p className="text-xs text-[#8A9468] mt-1 mb-3">
                    Physical reception desk in Ramnagar near Corbett Tiger Reserve.
                  </p>
                  <p className="text-xs font-semibold text-[#17211A] leading-snug">
                    {contact.officeAddress.line1}, {contact.officeAddress.city},{" "}
                    {contact.officeAddress.state} - {contact.officeAddress.pincode}
                  </p>
                  <p className="text-[11px] text-[#8A9468] mt-0.5">
                    Nainital District, Uttarakhand
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E0CC]/70">
                  <a
                    href={config.social.googleBusinessProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#37482E] hover:underline flex items-center gap-1"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Interactive Inquiry & Operating Guidelines ───────────────────── */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm
                whatsAppRaw={contact.whatsapp}
                phoneRaw={contact.phoneRaw}
                phoneDisplay={contact.phoneDisplay}
              />
            </div>

            {/* Right: Operational Info & Guidelines (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Timing Card */}
              <div className="bg-white border border-[#E8E0CC] rounded-[var(--radius-card)] p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[#17211A] font-serif font-bold text-lg mb-3">
                  <HugeiconsIcon icon={Clock01Icon} size={18} className="text-[#C99A3D]" />
                  <span>Safari &amp; Desk Timings</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#17211A]">
                  <li className="flex justify-between py-1.5 border-b border-[#E8E0CC]/60">
                    <span className="text-[#8A9468] font-medium">Booking Desk</span>
                    <span className="font-bold">{config.hours.bookingDesk}</span>
                  </li>
                  <li className="flex justify-between py-1.5 border-b border-[#E8E0CC]/60">
                    <span className="text-[#8A9468] font-medium">Morning Safari Shift</span>
                    <span className="font-bold">{config.hours.safariMorningShift}</span>
                  </li>
                  <li className="flex justify-between py-1.5 border-b border-[#E8E0CC]/60">
                    <span className="text-[#8A9468] font-medium">Evening Safari Shift</span>
                    <span className="font-bold">{config.hours.safariEveningShift}</span>
                  </li>
                  <li className="flex justify-between py-1.5">
                    <span className="text-[#8A9468] font-medium">FRH Check-in / Out</span>
                    <span className="font-bold">12:00 PM / 10:00 AM</span>
                  </li>
                </ul>
              </div>

              {/* Important Forest Rules Card */}
              <div className="bg-[#17211A] text-[#E8E0CC] border border-[#37482E] rounded-[var(--radius-card)] p-6">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-base mb-3">
                  <HugeiconsIcon icon={ShieldCheckIcon} size={18} className="text-[#C99A3D]" />
                  <span>CTR Forest Permit Protocol</span>
                </div>
                <div className="space-y-2.5 text-xs text-[#E8E0CC]/85 leading-relaxed">
                  <p>
                    • <strong className="text-white">Government ID:</strong> Carry the exact original photo ID
                    (Aadhaar, Passport, Voter ID) used for permit generation. Copies on phone are strictly rejected at entry gates.
                  </p>
                  <p>
                    • <strong className="text-white">Non-Transferable:</strong> Permits issued under visitor names
                    cannot be transferred, rescheduled, or cancelled under CTR Forest Department bylaws.
                  </p>
                  <p>
                    • <strong className="text-white">Entry Quotas:</strong> Only 30 Gypsies per shift are permitted
                    in core zones like Bijrani and Jhirna. Book at least 30–45 days in advance for peak season dates.
                  </p>
                  <p>
                    • <strong className="text-white">Registered Gypsies:</strong> Only Forest Department registered
                    green 4x4 Maruti Gypsies with commercial yellow plates and certified guides are permitted inside the reserve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Google Map & Directions Section ─────────────────────────────── */}
        <section className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#E8E0CC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="gold" size="sm">Office Map &amp; Directions</Badge>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17211A] mt-2 mb-3">
                Visit or Navigate to Our Ramnagar Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#8A9468] font-medium leading-relaxed">
                Located in Patkote, Ramnagar, near the official entry corridors of Corbett Tiger Reserve.
                Click below to launch turn-by-turn navigation in Google Maps directly to our office.
              </p>
            </div>

            {/* Embedded Google Map Component */}
            <div className="max-w-5xl mx-auto">
              <GoogleMapEmbed
                variant="full"
                height={440}
                mapsUrl={config.social.googleBusinessProfile}
                embedUrl={config.social.googleMapsEmbed}
                title="Panthera Corbett Safari Ramnagar Office Google Maps Location"
              />
            </div>

            {/* Transport & Access Info Grid */}
            <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5">
                <h3 className="font-serif text-base font-bold text-[#17211A] mb-2">
                  🚗 By Road (Delhi to Ramnagar)
                </h3>
                <p className="text-xs text-[#8A9468] leading-relaxed">
                  245 km (~5 to 6 hrs) via NH-9 / NH-309 through Hapur, Gajraula, Moradabad bypass, and Kashipur.
                  Excellent 4-lane highway up to Moradabad. Private cabs start at ₹4,500 one-way.
                </p>
                <Link
                  href="/delhi-corbett-cab"
                  className="mt-3 inline-block text-xs font-bold text-[#37482E] hover:underline"
                >
                  Book Delhi to Corbett Cab →
                </Link>
              </div>

              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5">
                <h3 className="font-serif text-base font-bold text-[#17211A] mb-2">
                  🚆 By Train (Direct to Ramnagar)
                </h3>
                <p className="text-xs text-[#8A9468] leading-relaxed">
                  Daily direct trains from Old Delhi Station (DLI): <strong>Ranikhet Express (15013)</strong> departs Delhi at 10:05 PM,
                  arriving Ramnagar at 04:55 AM. <strong>Corbett City Express (25013)</strong> daytime link. Station is in central Ramnagar.
                </p>
              </div>

              <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-5">
                <h3 className="font-serif text-base font-bold text-[#17211A] mb-2">
                  ✈️ By Air (Pantnagar / Delhi)
                </h3>
                <p className="text-xs text-[#8A9468] leading-relaxed">
                  Nearest airport is <strong>Pantnagar (PGH)</strong>, 80 km (~2 hrs by taxi). Daily flights from Delhi (Alliance Air).
                  International visitors can land at <strong>IGI Delhi (DEL)</strong> (260 km, 5.5 hrs).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ─────────────────────────────────────────────────── */}
        <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#8A9468] mt-1">
              Common questions about contacting our Ramnagar safari desk.
            </p>
          </div>

          <div className="space-y-4">
            {contactFaqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white border border-[#E8E0CC] rounded-[var(--radius-card)] p-5"
              >
                <h3 className="font-serif text-base font-bold text-[#17211A] mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#8A9468] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
