import React from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

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
      className={`mb-10 sm:mb-14 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}
    >
      {badgeText && (
        <div className="mb-3">
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${
              isDark
                ? "bg-[#37482E] text-[#E8E0CC] border-[#8A9468]/40"
                : "bg-[#E8E0CC]/60 text-[#37482E] border-[#8A9468]/30"
            }`}
          >
            {badgeText}
          </span>
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] ${
          isDark ? "text-[#FBF8F0]" : "text-[#17211A]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3.5 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-[#E8E0CC]/80" : "text-[#17211A]/80"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
