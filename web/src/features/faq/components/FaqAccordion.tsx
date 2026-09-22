"use client";

import React, { useState } from "react";
import { FaqItem } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";

interface FaqAccordionProps {
  faqs: FaqItem[];
  whatsAppLink: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs, whatsAppLink }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FBF8F0] border-b border-[#E8E0CC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Forest Rules & Permit Guidelines"
          subtitle="Everything you need to know about official government quotas, ID requirements, child policies, and seasonal gate openings."
          badgeText="Safari Knowledge Base"
          align="center"
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-[#E8E0CC] rounded-none bg-[#F4EFE6]/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#17211A]">
                    {faq.question}
                  </span>
                  <span className="text-xl text-[#37482E] font-bold shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-[#17211A]/85 leading-relaxed border-t border-[#E8E0CC]/70 pt-3 bg-white/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Micro CTA at end of FAQ */}
        <div className="mt-10 text-center p-6 bg-[#E8E0CC]/50 rounded-[4px] border border-[#E8E0CC]">
          <h4 className="font-serif text-lg font-bold text-[#17211A]">
            Have specific dates in mind?
          </h4>
          <p className="text-xs sm:text-sm text-[#17211A]/80 mt-1 mb-4">
            Our safari coordination desk checks real-time Forest Department permit availability daily.
          </p>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold text-sm bg-[#B84C1E] text-white px-6 py-2.5 rounded-full hover:bg-[#8F3B16] transition-colors"
          >
            Ask Us Anything on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
