import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "moss" | "ember" | "gold" | "forest" | "sand" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "moss",
  size = "sm",
  className = "",
}) => {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-semibold tracking-wide",
    md: "px-3.5 py-1 text-sm font-semibold tracking-wide",
  };

  const variantStyles = {
    moss: "bg-[#8A9468]/15 text-[#37482E] border border-[#8A9468]/30",
    ember: "bg-[#B84C1E]/10 text-[#B84C1E] border border-[#B84C1E]/30",
    gold: "bg-[#C99A3D]/15 text-[#8F6616] border border-[#C99A3D]/40",
    forest: "bg-[#37482E] text-[#FBF8F0] border border-[#37482E]",
    sand: "bg-[#E8E0CC] text-[#17211A] border border-[#D5C9AE]",
    neutral: "bg-[#17211A]/5 text-[#17211A] border border-[#17211A]/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-none uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
