import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  children,
  className = "",
  ...props
}) => {
  /**
   * Premium button system — informed by Linear, Vercel, Stripe, Apple HIG
   *
   * SHAPE: rounded-xl (12px) — not pill, not sharp.
   *   Pill = generic SaaS. Sharp = legacy enterprise. rounded-xl = confident & modern.
   *
   * PRIMARY:
   *   - Gradient fill: top-to-bottom warm ember (lighter → darker)
   *   - 1px inner border (via box-shadow inset) creates depth without border flicker
   *   - Hover: subtle lift (translateY -1px) + shadow bloom
   *   - letter-spacing: slightly tight — premium brands don't scream
   *
   * OUTLINE / GHOST (for hero overlay context):
   *   - Thin 1px border, no fill, slight backdrop-blur
   *   - Hover: barely-there fill + border brightens
   *   - Avoids the "input-field" look of full-dark-pill outlines
   *
   * SECONDARY: muted forest green fill — editorial, not loud
   *
   * WHATSAPP: flat #25D366 with lifted hover, slightly rounded
   *
   * SIZE: sm / md / lg with consistent min-height tap targets (40 / 44 / 50px)
   *   44px is Apple's recommended minimum tap target for mobile.
   */

  const baseStyles = [
    "inline-flex items-center justify-center",
    "font-semibold tracking-[-0.01em] leading-none",
    "transition-all duration-200 ease-out",
    "select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B84C1E]/60",
    "active:scale-[0.97] active:translate-y-0",
  ].join(" ");

  const sizeStyles: Record<string, string> = {
    sm: "h-9 px-4 text-[12px] gap-1.5 rounded-[10px]",
    md: "h-11 px-5 text-[13px] gap-2 rounded-xl",
    lg: "h-12 px-6 text-[14px] gap-2 rounded-xl",
  };

  const variantStyles: Record<string, string> = {
    /**
     * PRIMARY — Ember border + ember text on transparent bg.
     * Hover: barely-there ember wash (8% opacity) bleeds in.
     * Lift + subtle glow on hover for tactile feedback.
     */
    primary: [
      "bg-transparent",
      "text-[#C75420]",
      "border border-[#C75420]/70",
      "hover:bg-[#C75420]/8",
      "hover:border-[#C75420]",
      "hover:-translate-y-[1px]",
      "hover:shadow-[0_4px_16px_rgba(199,84,32,0.18)]",
      "backdrop-blur-sm",
    ].join(" "),

    /**
     * SECONDARY — Forest green border + sand text on transparent bg.
     */
    secondary: [
      "bg-transparent",
      "text-[#8A9468]",
      "border border-[#37482E]/70",
      "hover:bg-[#37482E]/10",
      "hover:border-[#37482E]",
      "hover:-translate-y-[1px]",
    ].join(" "),

    /**
     * OUTLINE — White border + white text, for dark/video backgrounds.
     * Hover: barely-there white wash (10%).
     */
    outline: [
      "bg-transparent",
      "text-[#FBF8F0]",
      "border border-white/30",
      "hover:bg-white/10",
      "hover:border-white/55",
      "hover:-translate-y-[1px]",
      "backdrop-blur-sm",
    ].join(" "),

    /**
     * GHOST — Fully transparent, minimal. For light page backgrounds.
     */
    ghost: [
      "bg-transparent",
      "text-[#37482E]",
      "border border-transparent",
      "hover:bg-[#E8E0CC]/60",
      "rounded-[10px]",
    ].join(" "),

    /**
     * WHATSAPP — WhatsApp green border + green text on transparent bg.
     * Hover: subtle green wash.
     */
    whatsapp: [
      "bg-transparent",
      "text-[#1DB954]",
      "border border-[#1DB954]/60",
      "hover:bg-[#1DB954]/10",
      "hover:border-[#1DB954]",
      "hover:-translate-y-[1px]",
      "hover:shadow-[0_4px_16px_rgba(29,185,84,0.18)]",
      "backdrop-blur-sm",
    ].join(" "),
  };

  const combinedClasses = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  ].join(" ");

  if (href) {
    if (
      isExternal ||
      href.startsWith("tel:") ||
      href.startsWith("https://wa.me") ||
      href.startsWith("http")
    ) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
