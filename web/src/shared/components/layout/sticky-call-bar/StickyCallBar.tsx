"use client";

import React from "react";
import { Button } from "../../ui/button/Button";

interface StickyCallBarProps {
  phoneRaw: string;
  phoneDisplay: string;
  whatsAppLink: string;
}

export const StickyCallBar: React.FC<StickyCallBarProps> = ({
  phoneRaw,
  whatsAppLink,
}) => {
  return (
    <aside
      aria-label="Quick Booking Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f1a12]/90 backdrop-blur-xl border-t border-[#37482E]/60 px-3 py-2.5 shadow-2xl safe-area-pb"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* Call Desk — primary variant, transparent ember border */}
        <Button
          variant="primary"
          size="md"
          href={`tel:${phoneRaw}`}
          className="w-full"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
          </svg>
          <span>Call Desk</span>
        </Button>

        {/* WhatsApp — whatsapp variant, transparent green border */}
        <Button
          variant="whatsapp"
          size="md"
          href={whatsAppLink}
          isExternal
          className="w-full"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>WhatsApp</span>
        </Button>
      </div>
    </aside>
  );
};
