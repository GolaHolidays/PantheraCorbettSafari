"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import CheckmarkBadge01Icon from "@hugeicons/core-free-icons/CheckmarkBadge01Icon";
import { trackWhatsAppClick, trackPhoneCallClick } from "@/core/analytics/gtm";

interface ContactFormProps {
  whatsAppRaw: string;
  phoneRaw: string;
  phoneDisplay: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  whatsAppRaw,
  phoneRaw,
  phoneDisplay,
}) => {
  const [serviceType, setServiceType] = useState("Jeep Safari");
  const [zone, setZone] = useState("Any Core Zone (Best Sighting)");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2 Adults");
  const [guestName, setGuestName] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const zonesList = [
    "Any Core Zone (Best Sighting)",
    "Bijrani Zone (Tiger Hotspot)",
    "Dhikala Zone (Grasslands & River)",
    "Jhirna Zone (Open Year-Round)",
    "Dhela Zone (Eco-Tourism Zone)",
    "Garjiya Zone (High Density)",
    "Phato Zone (Treehouse & Tigers)",
  ];

  const servicesList = [
    "Jeep Safari (Exclusive 4x4)",
    "Canter Safari (Dhikala Day Trip)",
    "Delhi to Corbett Package",
    "Forest Rest House (FRH Overnight)",
    "Delhi to Ramnagar Cab Transfer",
    "Resort + Safari Custom Combo",
  ];

  const buildWhatsAppMessage = () => {
    let msg = `Hello Panthera Corbett Safari Desk!\n\nI want to inquire about safari booking:\n`;
    if (guestName.trim()) msg += `• Name: ${guestName.trim()}\n`;
    msg += `• Service: ${serviceType}\n`;
    msg += `• Preferred Zone: ${zone}\n`;
    if (travelDate) msg += `• Travel Date: ${travelDate}\n`;
    msg += `• Group Size: ${travellers}\n`;
    if (customNotes.trim()) msg += `• Notes: ${customNotes.trim()}\n`;
    msg += `\nPlease let me know availability and permit procedure. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick("Contact Form WhatsApp Submit", {
      service_type: serviceType,
      zone,
      travel_date: travelDate,
      travellers,
    });
    const url = `https://wa.me/${whatsAppRaw}?text=${buildWhatsAppMessage()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[var(--radius-card)] p-6 sm:p-8 shadow-[0_8px_24px_rgba(23,33,26,0.06)]">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#C99A3D]/15 text-[#8A5A12] text-xs font-semibold uppercase tracking-wider mb-2">
          <HugeiconsIcon icon={CheckmarkBadge01Icon} size={13} />
          <span>Instant WhatsApp Safari Assistance</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17211A]">
          Direct Safari Desk Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-[#8A9468] mt-1 font-medium">
          Fill your preferred dates and zone. Connect directly with our Ramnagar desk for live permit quotas.
        </p>
      </div>

      <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
        {/* Service selection */}
        <div>
          <label className="block text-xs font-semibold text-[#17211A] mb-1.5 uppercase tracking-wide">
            Select Service Required *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {servicesList.map((srv) => (
              <button
                type="button"
                key={srv}
                onClick={() => setServiceType(srv)}
                className={`text-left text-xs px-3 py-2 rounded-none border transition-all ${
                  serviceType === srv
                    ? "bg-[#17211A] text-[#FBF8F0] border-[#17211A] font-semibold"
                    : "bg-white text-[#17211A] border-[#E8E0CC] hover:border-[#37482E]/60 font-medium"
                }`}
              >
                {srv}
              </button>
            ))}
          </div>
        </div>

        {/* Zone dropdown */}
        <div>
          <label
            htmlFor="safari-zone"
            className="block text-xs font-semibold text-[#17211A] mb-1.5 uppercase tracking-wide"
          >
            Preferred Corbett Safari Zone
          </label>
          <select
            id="safari-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-none bg-white border border-[#E8E0CC] text-[#17211A] focus:outline-none focus:border-[#C99A3D]"
          >
            {zonesList.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Group size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="travel-date"
              className="block text-xs font-semibold text-[#17211A] mb-1.5 uppercase tracking-wide"
            >
              Planned Safari Date
            </label>
            <input
              id="travel-date"
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-none bg-white border border-[#E8E0CC] text-[#17211A] focus:outline-none focus:border-[#C99A3D]"
            />
          </div>

          <div>
            <label
              htmlFor="travellers-count"
              className="block text-xs font-semibold text-[#17211A] mb-1.5 uppercase tracking-wide"
            >
              Number of Travellers
            </label>
            <select
              id="travellers-count"
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-none bg-white border border-[#E8E0CC] text-[#17211A] focus:outline-none focus:border-[#C99A3D]"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults (Couple)">2 Adults (Couple)</option>
              <option value="Family (3-4 Persons)">Family (3-4 Persons)</option>
              <option value="Full Gypsy (Up to 6 Persons)">Full Gypsy (Up to 6 Persons)</option>
              <option value="Group / Corporate (7+ Persons)">Group / Corporate (7+ Persons)</option>
            </select>
          </div>
        </div>

        {/* Name and notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="guest-name"
              className="block text-xs font-semibold text-[#17211A] mb-1.5 uppercase tracking-wide"
            >
              Your Name (Optional)
            </label>
            <input
              id="guest-name"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-none bg-white border border-[#E8E0CC] text-[#17211A] focus:outline-none focus:border-[#C99A3D]"
            />
          </div>

          <div>
            <label
              htmlFor="custom-notes"
              className="block text-xs font-semibold text-[#17211A] mb-1.5 uppercase tracking-wide"
            >
              Specific Request / Hotel Needs
            </label>
            <input
              id="custom-notes"
              type="text"
              placeholder="e.g. Need Delhi pickup, Morning shift"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-none bg-white border border-[#E8E0CC] text-[#17211A] focus:outline-none focus:border-[#C99A3D]"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
          <button
            type="submit"
            className="spring-press flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-none bg-gradient-to-b from-[#1E8A4E] to-[#156B3A] text-white text-xs sm:text-sm font-bold shadow-[0_2px_8px_rgba(30,138,78,0.3)] hover:brightness-110 transition-all"
          >
            <HugeiconsIcon icon={WhatsappIcon} size={17} />
            <span>Inquire on WhatsApp (Instant Reply)</span>
          </button>

          <a
            href={`tel:${phoneRaw}`}
            onClick={() => trackPhoneCallClick(phoneRaw, { source: "contact_form" })}
            className="spring-press flex items-center justify-center gap-2 h-11 px-4 rounded-none bg-[#17211A] text-white text-xs sm:text-sm font-semibold hover:bg-[#253629] transition-all border border-[#37482E]"
          >
            <HugeiconsIcon icon={Call02Icon} size={15} className="text-[#C99A3D]" />
            <span>Call Desk ({phoneDisplay})</span>
          </a>
        </div>

        <p className="text-[11px] text-[#8A9468] text-center font-medium pt-1">
          🔒 No advance payment required for inquiry · Government ID strictly required for permit issuance
        </p>
      </form>
    </div>
  );
};
