"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import Call02Icon from "@hugeicons/core-free-icons/Call02Icon";
import Menu01Icon from "@hugeicons/core-free-icons/Menu01Icon";
import Cancel01Icon from "@hugeicons/core-free-icons/Cancel01Icon";
import WhatsappIcon from "@hugeicons/core-free-icons/WhatsappIcon";
import { Button } from "../../ui/button/Button";
import { trackPhoneCallClick, trackWhatsAppClick } from "@/core/analytics/gtm";

interface HeaderProps {
  phoneDisplay: string;
  phoneRaw: string;
  whatsAppLink: string;
}

export const Header: React.FC<HeaderProps> = ({
  phoneDisplay,
  phoneRaw,
  whatsAppLink,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { label: "Jeep Safari", href: "/jeep-safari" },
    { label: "Canter Safari", href: "/canter-safari" },
    { label: "Safari Prices", href: "/safari-price" },
    { label: "Delhi Packages", href: "/delhi-to-jim-corbett-package" },
    { label: "Zones", href: "/#zones" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={[
        "sticky top-0 z-40 text-[#FBF8F0]",
        "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        isScrolled
          ? "glass-forest-nav"
          : "bg-[#0D1610]",
      ].join(" ")}
    >

      {/* ── Announcement bar — hairline thin with solid background ──────── */}
      <div className="bg-[#080E0A] border-b border-[#37482E]/50 py-1 px-4 text-center overflow-hidden">
        <p className="text-[9px] sm:text-[10px] font-medium tracking-[0.18em] uppercase text-[#8A9468]/90 whitespace-nowrap overflow-hidden text-ellipsis leading-none">
          <span className="text-[#C99A3D]/90">Authorized</span>
          <span className="mx-2 text-[#37482E]">·</span>
          <span>30 Jeeps / Zone</span>
          <span className="mx-2 text-[#37482E]">·</span>
          <span className="hidden sm:inline">Official Forest Dept Permits</span>
          <span className="sm:hidden">Official Permits</span>
          <span className="mx-2 text-[#37482E] hidden sm:inline">·</span>
          <span className="hidden sm:inline">Ramnagar Booking Desk</span>
        </p>
      </div>

      {/* ── Main nav row ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">

          {/* Logo — single line on all breakpoints */}
          <Link href="/" className="flex-shrink-0 flex flex-col leading-none min-w-0">
            <span className="font-serif text-[15px] sm:text-[17px] lg:text-[18px] font-bold text-[#FBF8F0] tracking-[-0.01em] whitespace-nowrap">
              Panthera Corbett Safari
            </span>
            <span className="text-[9px] font-sans text-[#8A9468] tracking-[0.16em] uppercase mt-[2px] leading-none">
              Jim Corbett · Ramnagar
            </span>
          </Link>

          {/* Desktop nav links — lg+ only */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-[#E8E0CC]/75 hover:text-[#FBF8F0] transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions — lg+ */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${phoneRaw}`}
              onClick={() => trackPhoneCallClick(phoneRaw, { source: "header_desktop" })}
              className="text-[12px] font-medium text-[#E8E0CC]/80 hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
              aria-label={`Call: ${phoneDisplay}`}
            >
              <HugeiconsIcon icon={Call02Icon} size={12} className="text-[#C99A3D] flex-shrink-0" />
              <span className="font-tabular">{phoneDisplay}</span>
            </a>
            <Button
              variant="primary"
              size="sm"
              href={whatsAppLink}
              isExternal
              onClick={() => trackWhatsAppClick("Header Desktop Book Safari", { source: "header_desktop" })}
            >
              Book Safari
            </Button>
          </div>

          {/* Mobile & Tablet right actions — lg:hidden ────────────────────────── */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            {/* Tablet phone link (sm to lg) */}
            <a
              href={`tel:${phoneRaw}`}
              onClick={() => trackPhoneCallClick(phoneRaw, { source: "header_tablet" })}
              className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-[#E8E0CC]/80 hover:text-white py-1.5 px-2.5 rounded-[var(--radius-chip)] bg-white/5 border border-white/10 transition-colors whitespace-nowrap"
              aria-label={`Call: ${phoneDisplay}`}
            >
              <HugeiconsIcon icon={Call02Icon} size={13} className="text-[#C99A3D] flex-shrink-0" />
              <span className="font-tabular">{phoneDisplay}</span>
            </a>

            {/* Mobile call button (< sm) */}
            <a
              href={`tel:${phoneRaw}`}
              onClick={() => trackPhoneCallClick(phoneRaw, { source: "header_mobile" })}
              aria-label={`Call ${phoneDisplay}`}
              className="sm:hidden flex items-center gap-1 py-1.5 px-2.5 rounded-[var(--radius-chip)] text-[#FBF8F0] bg-[#B84C1E] spring-press"
            >
              <HugeiconsIcon icon={Call02Icon} size={13} />
              <span className="text-[11px] font-semibold leading-none">Call</span>
            </a>

            {/* Hamburger (mobile & tablet) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-[var(--radius-chip)] text-[#E8E0CC] hover:bg-white/10 focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen
                ? <HugeiconsIcon icon={Cancel01Icon} size={20} />
                : <HugeiconsIcon icon={Menu01Icon} size={20} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      <div
        className={[
          "lg:hidden overflow-hidden",
          "transition-[max-height,opacity] duration-300",
          mobileMenuOpen ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0 pointer-events-none invisible",
        ].join(" ")}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div className="bg-[#0D1610] border-t border-[#37482E]/60 px-4 pt-2 pb-5 space-y-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center py-2.5 text-[14px] font-medium text-[#E8E0CC]/90 hover:text-white border-b border-[#37482E]/30 transition-colors last:border-b-0"
            >
              {link.label}
            </Link>
          ))}

          {/* Drawer CTAs */}
          <div className="pt-4 grid grid-cols-2 gap-2.5">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Header Drawer WhatsApp", { source: "header_drawer" })}
              className="spring-press flex items-center justify-center gap-1.5 h-10 rounded-none bg-gradient-to-b from-[#1E8A4E] to-[#156B3A] text-white text-[13px] font-semibold"
            >
              <HugeiconsIcon icon={WhatsappIcon} size={14} />
              WhatsApp
            </a>
            <a
              href={`tel:${phoneRaw}`}
              onClick={() => trackPhoneCallClick(phoneRaw, { source: "header_drawer" })}
              className="spring-press flex items-center justify-center gap-1.5 h-10 rounded-none bg-gradient-to-b from-[#B84C1E] to-[#993A12] text-white text-[13px] font-semibold"
            >
              <HugeiconsIcon icon={Call02Icon} size={14} />
              {phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
