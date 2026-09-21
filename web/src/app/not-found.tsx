import React from "react";
import Link from "next/link";
import { SiteConfigRepository } from "../core/database/repositories";

export default function NotFound() {
  const config = SiteConfigRepository.getConfig();
  const contact = config.contact;
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink(
    "Hello Panthera Corbett Safari, I couldn't find a page on your website. Could you please help me with safari booking and details?"
  );

  const quickLinks = [
    { label: "Jeep Safari", href: "/jeep-safari" },
    { label: "Canter Safari", href: "/canter-safari" },
    { label: "Forest Rest Houses", href: "/forest-rest-houses" },
    { label: "Delhi Packages", href: "/delhi-to-jim-corbett-package" },
    { label: "Safari Prices", href: "/safari-price" },
    { label: "Delhi Cabs", href: "/delhi-corbett-cab" },
  ];

  return (
    <div className="relative min-h-[88vh] flex items-center justify-center bg-[#17211A] text-[#FBF8F0] px-4 sm:px-6 py-20 overflow-hidden">
      {/* Cinematic misty Corbett Sal forest background with soft vignette */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-35 pointer-events-none"
        style={{
          backgroundImage: "url('/corbett-404-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/80 to-[#17211A]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#17211A_85%)]" />
      </div>

      {/* Main Content: Clean, Iconic Big 404, Natural & Mature */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Iconic Big 404 Monolith in Fraunces */}
        <div className="select-none">
          <span className="font-serif text-8xl sm:text-9xl lg:text-[11rem] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FBF8F0] via-[#E8E0CC] to-[#8A9468]/30 drop-shadow-[0_12px_35px_rgba(0,0,0,0.8)]">
            404
          </span>
        </div>

        {/* Elegant Editorial Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FBF8F0] tracking-tight mt-2 sm:mt-4 leading-[1.15]">
          You&apos;ve wandered off the trail.
        </h1>

        {/* Natural, Simple Language Copy */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#E8E0CC]/80 font-normal leading-relaxed max-w-lg mx-auto">
          The page you are looking for doesn&apos;t exist or has moved deeper into the forest. Let&apos;s get you back on the right path.
        </p>

        {/* Focused, Purposeful CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          {/* Primary Ember Pill */}
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B84C1E] hover:bg-[#8F3B16] text-white text-sm font-semibold transition-all duration-150 shadow-[0_4px_20px_rgba(184,76,30,0.35)] active:scale-[0.98]"
          >
            Back to Home
          </Link>

          {/* Direct Phone Assistance */}
          <a
            href={`tel:${contact.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#37482E]/40 hover:bg-[#37482E] text-[#FBF8F0] border border-[#8A9468]/60 text-sm font-medium transition-all duration-150 backdrop-blur-sm active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 text-[#C99A3D]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
            </svg>
            <span>Call: {contact.phoneDisplay}</span>
          </a>

          {/* WhatsApp Assistance */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-all duration-150 shadow-sm active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Clean, Minimalist Quick Links */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#37482E]/60 w-full max-w-xl">
          <p className="text-xs font-medium text-[#8A9468] tracking-widest uppercase mb-3 text-center">
            Popular Safari Links
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#E8E0CC]/85">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Quiet Office Notice */}
        <p className="mt-8 text-xs text-[#8A9468]">
          Panthera Corbett Safari · Ramnagar, Uttarakhand · Open daily 6:00 AM – 9:30 PM
        </p>
      </div>
    </div>
  );
}
