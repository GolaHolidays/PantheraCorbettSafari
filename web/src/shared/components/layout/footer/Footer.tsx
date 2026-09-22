import React from "react";
import Link from "next/link";
import { SiteConfig, SafariZone } from "@/core/models";
import { GoogleMapEmbed } from "../../ui/map-embed/GoogleMapEmbed";

interface FooterProps {
  config: SiteConfig;
  zones: SafariZone[];
}

export const Footer: React.FC<FooterProps> = ({ config, zones }) => {
  return (
    <footer className="bg-[#17211A] text-[#E8E0CC] border-t border-[#37482E] pb-28 sm:pb-28 xl:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#37482E]">
          {/* Brand & Authority */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-xl font-bold text-[#FBF8F0]">
                {config.name}
              </span>
            </div>
            <p className="text-sm text-[#E8E0CC]/80 leading-relaxed">
              {config.tagline}
            </p>
          </div>

          {/* Corbett Safari Zones */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#FBF8F0] mb-4">
              Corbett Safari Zones
            </h3>
            <ul className="space-y-2 text-sm text-[#E8E0CC]/80">
              {zones.map((zone) => (
                <li key={zone.id}>
                  <Link
                    href={`/zones/${zone.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{zone.name}</span>
                    <span className="text-xs text-[#8A9468]">{zone.zoneType}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Safari Guidelines & Bookings */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#FBF8F0] mb-4">
              Safari Planning
            </h3>
            <ul className="space-y-2 text-sm text-[#E8E0CC]/80">
              <li>
                <Link href="/jeep-safari" className="hover:text-white transition-colors">
                  Jim Corbett Jeep Safari
                </Link>
              </li>
              <li>
                <Link href="/canter-safari" className="hover:text-white transition-colors">
                  Dhikala Canter Safari
                </Link>
              </li>
              <li>
                <Link href="/safari-price" className="hover:text-white transition-colors">
                  Safari Prices 2025–26
                </Link>
              </li>
              <li>
                <Link href="/delhi-to-jim-corbett-package" className="hover:text-white transition-colors">
                  Delhi to Corbett Packages
                </Link>
              </li>
              <li>
                <Link href="/delhi-corbett-cab" className="hover:text-white transition-colors">
                  Delhi to Ramnagar Cab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Desk Location
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Permit &amp; Booking Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Desk & Support */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#FBF8F0] mb-4">
              Direct Safari Desk
            </h3>
            <div className="space-y-3 text-sm text-[#E8E0CC]/80">
              <p>
                <strong className="text-white block">Central Helpdesk:</strong>
                <a
                  href={`tel:${config.contact.phoneRaw}`}
                  className="text-white hover:underline font-tabular"
                >
                  {config.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <strong className="text-white block">WhatsApp Booking:</strong>
                <a
                  href={`https://wa.me/${config.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline"
                >
                  {config.contact.whatsappDisplay}
                </a>
              </p>
              <p>
                <strong className="text-white block">Official Email:</strong>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="text-white hover:underline break-all"
                >
                  {config.contact.email}
                </a>
              </p>
              <p>
                <strong className="text-white block">CTR Reception Office:</strong>
                {config.contact.officeAddress.line1}, {config.contact.officeAddress.city},{" "}
                {config.contact.officeAddress.pincode}
              </p>
              <p className="text-xs text-[#8A9468]">
                Desk Timings: {config.hours.bookingDesk}
              </p>

              {/* Compact Google Map Embed */}
              <div className="pt-2">
                <GoogleMapEmbed
                  variant="compact"
                  mapsUrl={config.social.googleBusinessProfile}
                  embedUrl={config.social.googleMapsEmbed}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8A9468]">
          <p>
            © {new Date().getFullYear()} {config.name}. All safari permits subject to Uttarakhand Forest Department quotas.
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Safari Blog</Link>
            <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/safari-price" className="hover:text-white transition-colors">Safari Prices</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
