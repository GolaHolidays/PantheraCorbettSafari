import React from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

/**
 * SectionHeader
 *
 * Optical typography system:
 *   - h2 uses .section-heading CSS class (letter-spacing: -0.016em, line-height: 1.12)
 *     defined in globals.css — single source, applied uniformly site-wide.
 *   - Badge eyebrow uses tracked uppercase at 11px — Apple editorial pattern.
 *   - Mobile-first: 28px base → clamps up to 48px on large screens.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badgeText,
  align = "left",
  theme = "light",
  className = "",
}) => {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`mb-8 sm:mb-11 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}
    >
      {badgeText && (
        <p className="mb-2.5">
          <span
            className={`inline-block text-[11px] font-semibold tracking-[0.16em] uppercase px-3 py-0.5 rounded-none border ${
              isDark
                ? "text-[#C99A3D] border-[#C99A3D]/30 bg-[#C99A3D]/10"
                : "text-[#37482E] border-[#8A9468]/30 bg-[#E8E0CC]/60"
            }`}
          >
            {badgeText}
          </span>
        </p>
      )}

      {/* section-heading: optical CSS class from globals.css */}
      <h2
        className={`section-heading font-serif text-[1.55rem] sm:text-[2.05rem] lg:text-[2.6rem] font-semibold ${
          isDark ? "text-[#FBF8F0]" : "text-[#17211A]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-[#E8E0CC]/80" : "text-[#17211A]/75"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
