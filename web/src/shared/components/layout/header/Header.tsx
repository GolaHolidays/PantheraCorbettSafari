"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../../ui/button/Button";

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

  const navLinks = [
    { label: "Jeep Safari", href: "/jeep-safari" },
    { label: "Canter Safari", href: "/canter-safari" },
    { label: "Safari Prices", href: "/safari-price" },
    { label: "Delhi Packages", href: "/delhi-to-jim-corbett-package" },
    { label: "Safari Zones", href: "/#zones" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#17211A] text-[#FBF8F0] border-b border-[#37482E]">
      {/* Top trust strip */}
      <div className="bg-[#37482E]/60 border-b border-[#37482E] py-1.5 px-4 text-center text-xs text-[#E8E0CC] flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C99A3D] animate-pulse"></span>
        <span className="font-semibold text-white">Forest Dept Authorized Booking Desk</span>
        <span className="hidden sm:inline text-[#8A9468]">|</span>
        <span className="hidden sm:inline">Daily Core Zone Gypsy Quota Capped at 30 Jeeps</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — text only, no box/icon */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#FBF8F0] tracking-tight">
              Panthera Corbett Safari
            </span>
            <span className="text-[10px] font-sans text-[#8A9468] tracking-widest uppercase mt-0.5">
              Jim Corbett · Ramnagar
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#E8E0CC]/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${phoneRaw}`}
              className="text-sm font-medium text-[#E8E0CC] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-[#C99A3D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
              </svg>
              {phoneDisplay}
            </a>
            <Button variant="primary" size="sm" href={whatsAppLink} isExternal>
              Book Safari
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="primary"
              size="sm"
              href={`tel:${phoneRaw}`}
              className="sm:hidden text-xs px-3"
            >
              Call Now
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[4px] text-[#E8E0CC] hover:bg-[#37482E] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#17211A] border-b border-[#37482E] px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-medium text-[#E8E0CC] hover:text-white border-b border-[#37482E]/50"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="primary" size="md" href={whatsAppLink} isExternal className="w-full text-center">
              WhatsApp Booking
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
