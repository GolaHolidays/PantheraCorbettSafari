import React from "react";
import { Button } from "../../../shared/components/ui/button/Button";
import { HeroVideoBackground } from "./HeroVideoBackground";

interface HeroBannerProps {
  phoneDisplay: string;
  phoneRaw: string;
  whatsAppLink: string;
  scarcityWarning: string;
}

/**
 * HeroBanner — Mobile-first cinematic hero
 *
 * MOBILE LAYOUT (default):
 *   - Section is flex-col justify-end → content anchors to the bottom
 *   - Top 55% of the viewport shows the video clearly (no text blocking it)
 *   - Content is compact: label + headline + single CTA only
 *   - Body copy, scarcity note, second CTA: hidden on mobile
 *   - The sticky call bar at the bottom handles the phone CTA on mobile
 *   - No scroll cue on mobile (wastes space)
 *
 * DESKTOP LAYOUT (sm+):
 *   - Section is flex-row items-center → content is vertically centred
 *   - Content left-anchored in max-w-[520px] zone
 *   - Full content visible: label + headline + body + scarcity + 2 CTAs
 *   - Scroll cue appears at bottom-center
 *
 * HEIGHT:
 *   - Uses min-h-[100dvh] (dynamic viewport height) on mobile to correctly
 *     fill the screen accounting for the mobile browser address bar.
 */
export const HeroBanner: React.FC<HeroBannerProps> = ({
  phoneDisplay,
  phoneRaw,
  whatsAppLink,
  scarcityWarning,
}) => {
  return (
    <section
      className="relative flex flex-col sm:flex-row sm:items-center bg-[#17211A] text-[#FBF8F0] sm:min-h-[100dvh] overflow-hidden"
    >
      {/* Dedicated landscape video on mobile, full-bleed cinematic background on desktop */}
      <HeroVideoBackground />

      {/*
       * Content block
       * Mobile:  stacked below the video (no overlapping), clean padding, full readability
       * Desktop: left-anchored max-w-[520px], generous padding, full content
       */}
      <div className="relative z-10 w-full px-5 pt-5 pb-9 sm:pt-0 sm:pb-0 sm:px-12 lg:px-20 xl:px-28 sm:py-32">
        <div className="max-w-[520px]">

          {/* ── Pre-headline label ───────────────────────────────────────── */}
          {/* Mobile: short form; Desktop: full form */}
          <p className="font-semibold tracking-[0.20em] uppercase text-[#C99A3D] mb-3 sm:mb-5"
             style={{ fontSize: "10px" }}>
            <span className="sm:hidden">Official Permits · Jim Corbett</span>
            <span className="hidden sm:inline">Jim Corbett Tiger Reserve — Official Permits</span>
          </p>

          {/* ── Headline ─────────────────────────────────────────────────── */}
          {/* Mobile: 2.1rem; Desktop: scales up to 4.5rem                   */}
          <h1
            className="font-serif font-bold text-[#FBF8F0] leading-[1.05] tracking-tight text-[2.1rem] sm:text-[3.75rem] lg:text-[4.5rem]"
            style={{
              textShadow:
                "0 2px 20px rgba(23,33,26,0.70), 0 1px 4px rgba(23,33,26,0.45)",
            }}
          >
            The Real Wild of Jim&nbsp;Corbett
          </h1>

          {/* ── Thin gold rule ───────────────────────────────────────────── */}
          <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 w-8 h-[1.5px] bg-[#C99A3D]" />

          {/* ── Body copy — HIDDEN on mobile ────────────────────────────── */}
          {/* On mobile the text would block the video; sticky bar has CTA   */}
          <p
            className="hidden sm:block text-[1.0625rem] text-[#E8E0CC]/85 font-normal leading-[1.75]"
            style={{ textShadow: "0 1px 8px rgba(23,33,26,0.55)" }}
          >
            Official Forest Department jeep permits and heritage night stays
            inside Dhikala, Bijrani &amp; Jhirna core zones — guided by
            native trackers and registered nature guides.
          </p>

          {/* ── Scarcity note — HIDDEN on mobile ────────────────────────── */}
          <p className="hidden sm:block mt-3 text-xs text-[#8A9468] tracking-wide">
            {scarcityWarning}
          </p>

          {/* ── CTAs ─────────────────────────────────────────────────────── */}
          {/*
           * Mobile: single full-width primary CTA.
           *   The "Call Desk" button is hidden — the sticky call bar at the
           *   bottom of the page handles the phone conversion on mobile.
           * Desktop: two inline CTAs side by side.
           */}
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-start gap-2.5 sm:gap-3">
            <Button
              variant="primary"
              size="lg"
              href={whatsAppLink}
              isExternal
              className="text-sm font-semibold tracking-wide shadow-lg px-6 sm:px-8 py-3 sm:py-3.5"
            >
              Check Permit Availability
            </Button>

            {/* Call CTA */}
            <Button
              variant="outline"
              size="lg"
              href={`tel:${phoneRaw}`}
              className="flex text-[#FBF8F0] border-[#FBF8F0]/25 hover:border-[#FBF8F0]/50 hover:bg-[#FBF8F0]/8 backdrop-blur-sm"
            >
              <svg
                className="w-3.5 h-3.5 mr-2 text-[#C99A3D] flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
              </svg>
              <span>{phoneDisplay}</span>
            </Button>
          </div>

        </div>
      </div>

      {/* ── Scroll cue — desktop only ────────────────────────────────────── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex hero-scroll-cue flex-col items-center gap-2">
        <div className="w-[1px] h-9 bg-gradient-to-b from-[#FBF8F0]/30 to-transparent" />
      </div>
    </section>
  );
};
