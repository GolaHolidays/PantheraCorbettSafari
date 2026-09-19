import React from "react";
import { Testimonial } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { Badge } from "../../../shared/components/ui/badge/Badge";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#E8E0CC]/35 border-b border-[#E8E0CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Field Stories & Real Sightings"
          subtitle="Genuine feedback from wildlife photographers, families, and international travelers guided by Panthera Corbett on the jungle tracks."
          badgeText="Verified Reviews"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#FBF8F0] border border-[#E8E0CC] rounded-[4px] p-6 flex flex-col justify-between hover:border-[#8A9468] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="text-[#C99A3D] text-sm">
                    {"★".repeat(t.rating)}
                  </div>
                  <Badge variant="moss" size="sm">
                    {t.source}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-[#17211A]/90 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#E8E0CC] pt-3">
                <div className="font-serif font-bold text-sm text-[#17211A]">
                  {t.name}
                </div>
                <div className="text-xs text-[#8A9468]">{t.location}</div>
                <div className="text-[11px] text-[#37482E] font-medium mt-1">
                  Safari: {t.safariZone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
