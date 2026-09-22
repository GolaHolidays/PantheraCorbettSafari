"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import { trackPhoneCallClick, trackWhatsAppClick } from "@/core/analytics/gtm";

interface StickyCallBarProps {
  phoneRaw: string;
  phoneDisplay: string;
  whatsAppLink: string;
}

/**
 * StickyCallBar — Apple iOS Floating Action Dock.
 *
 * Design features:
 * - Floating capsule: Detached from screen edge, inset with safe-area spacing.
 * - Deep forest glassmorphism: Backdrop blur with specular rim highlight.
 * - Mature, refined color palette:
 *   - Call: Deep satin Ember gradient with inner specular bevel.
 *   - WhatsApp: Rich emerald forest gradient with crisp white typography.
 * - Tablet ('tab') optimized:
 *   - Live official desk indicator badge on tablet (sm/md/lg).
 *   - Wide, balanced dual action pills with generous hit targets.
 * - Active motion: .spring-press micro-interaction.
 * - Responsive visibility: xl:hidden (visible on phone and tablet up to 1279px).
 */
export const StickyCallBar: React.FC<StickyCallBarProps> = ({
  phoneRaw,
  phoneDisplay,
  whatsAppLink,
}) => {
  return (
    <aside
      aria-label="Instant safari booking and assistance"
      className="xl:hidden fixed bottom-[calc(10px+env(safe-area-inset-bottom,0px))] inset-x-3 sm:inset-x-6 z-50 pointer-events-none"
    >
      <div className="max-w-md sm:max-w-2xl mx-auto pointer-events-auto">
        <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-none bg-[#111913]/92 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.16)]">

          {/* ── Tablet Branding & Live Status (sm+ only) ────────────────── */}
          <div className="hidden sm:flex items-center gap-3 pl-3 pr-3.5 border-r border-white/10 flex-shrink-0">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-none h-2.5 w-2.5 bg-[#25D366]" />
            </div>
            <div className="text-left">
              <div className="text-[12px] font-semibold text-[#FBF8F0] tracking-tight leading-tight flex items-center gap-1.5">
                <span>Ramnagar Desk</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-none bg-[#C99A3D]/20 text-[#E8B84A] font-semibold uppercase tracking-wider">
                  Official
                </span>
              </div>
              <p className="text-[10px] text-[#8A9468] tracking-wider uppercase font-medium leading-tight mt-0.5">
                Corbett Safari Quotas
              </p>
            </div>
          </div>

          {/* ── Actions Container ────────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0">

            {/* Call Action */}
            <a
              href={`tel:${phoneRaw}`}
              onClick={() => trackPhoneCallClick(phoneRaw, { source: "sticky_call_bar" })}
              aria-label={`Call safari desk at ${phoneDisplay}`}
              className="spring-press flex-1 flex items-center justify-center gap-2 sm:gap-2.5 h-11 sm:h-12 px-3 sm:px-4 rounded-none bg-gradient-to-b from-[#B84C1E] to-[#993A12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_8px_rgba(184,76,30,0.32)] border border-[#C8592A]/40 transition-all group"
            >
              <div className="w-7 h-7 rounded-none bg-black/20 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform">
                <HugeiconsIcon icon={Call02Icon} size={15} className="text-white" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-[12px] sm:text-[13px] font-bold text-white leading-tight tracking-tight whitespace-nowrap">
                  Call Desk
                </div>
                <div className="text-[10px] sm:text-[11px] text-white/80 font-medium font-tabular leading-none whitespace-nowrap mt-0.5">
                  {phoneDisplay}
                </div>
              </div>
            </a>

            {/* WhatsApp Action */}
            <a
              href={whatsAppLink}
              onClick={() => trackWhatsAppClick("Sticky Call Bar WhatsApp", { source: "sticky_call_bar" })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp for instant safari booking"
              className="spring-press flex-1 flex items-center justify-center gap-2 sm:gap-2.5 h-11 sm:h-12 px-3 sm:px-4 rounded-none bg-gradient-to-b from-[#1E8A4E] to-[#156B3A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_8px_rgba(21,107,58,0.32)] border border-[#2EB26A]/40 transition-all group"
            >
              <div className="w-7 h-7 rounded-none bg-black/20 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform">
                <HugeiconsIcon icon={WhatsappIcon} size={15} className="text-white" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-[12px] sm:text-[13px] font-bold text-white leading-tight tracking-tight whitespace-nowrap">
                  WhatsApp
                </div>
                <div className="text-[10px] sm:text-[11px] text-white/80 font-medium leading-none whitespace-nowrap mt-0.5">
                  Instant Reply
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </aside>
  );
};
