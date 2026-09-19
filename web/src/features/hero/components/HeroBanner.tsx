import React from "react";
import { Button } from "../../../shared/components/ui/button/Button";

interface HeroBannerProps {
  phoneDisplay: string;
  phoneRaw: string;
  whatsAppLink: string;
  scarcityWarning: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  phoneDisplay,
  phoneRaw,
  whatsAppLink,
  scarcityWarning,
}) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center bg-[#17211A] text-[#FBF8F0] overflow-hidden">
      {/* Background Image with warm dusk light as per photography direction */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        {/* Soft dark-to-transparent overlay (Ink at low opacity) as required by design guide */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17211A] via-[#17211A]/65 to-[#17211A]/35" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Honest Scarcity Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17211A]/80 border border-[#B84C1E]/60 text-xs sm:text-sm font-medium text-[#E8E0CC] mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#B84C1E] animate-ping" />
          <span className="text-[#C99A3D] font-semibold">Limited Government Quota:</span>
          <span className="truncate max-w-[260px] sm:max-w-none">
            30 Gypsies Per Zone / Shift
          </span>
        </div>

        {/* Hero Headline in Fraunces */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FBF8F0] leading-[1.08] max-w-4xl mx-auto drop-shadow-sm">
          The Real Wild of Jim Corbett Tiger Reserve
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-[#E8E0CC]/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Official Forest Department jeep permits and heritage night stays inside Dhikala, Bijrani, and Jhirna core zones. Guided by native trackers with 15+ years on the trails.
        </p>

        {/* Conversion Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            href={whatsAppLink}
            isExternal
            className="w-full sm:w-auto px-8 py-3.5 text-base shadow-lg"
          >
            Check Permit Availability
          </Button>

          <Button
            variant="outline"
            size="lg"
            href={`tel:${phoneRaw}`}
            className="w-full sm:w-auto text-[#FBF8F0] border-[#8A9468] hover:bg-[#37482E]/80 backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4 mr-2 text-[#C99A3D]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
            </svg>
            <span>Call Desk: {phoneDisplay}</span>
          </Button>
        </div>

        {/* Secondary notice */}
        <p className="mt-4 text-xs text-[#8A9468]">
          {scarcityWarning}
        </p>
      </div>
    </section>
  );
};
