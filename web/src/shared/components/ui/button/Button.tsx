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

/**
 * Button Design Principles
 * ─────────────────────────────────────────────────────────────────────────
 * SHAPE:
 *   Uses CSS custom property radii from globals.css @theme tokens.
 *   --radius-btn-lg / --radius-btn-md / --radius-btn-sm.
 *   Not pill (generic SaaS), not sharp (legacy enterprise) — confident & modern.
 *
 * PRIMARY (mobile-first conversion CTA):
 *   Solid filled ember (#B84C1E) — this IS the safari booking button.
 *   It must feel weighty, warm, and irresistible on a thumb-scrolling mobile.
 *   Hover: subtle lift + glow bloom. Letterform: slightly tight tracking.
 *
 * SECONDARY: Forest green bordered — editorial authority signal.
 * OUTLINE:   Thin white border for dark/video overlay contexts.
 * GHOST:     Fully transparent — light page secondary actions.
 * WHATSAPP:  Solid green — instant recognition on mobile.
 *
 * SPRING PHYSICS:
 *   All buttons use .spring-press CSS class (defined in globals.css).
 *   This replaces the scattered active:scale-[0.97] inline Tailwind pattern.
 *   Result: haptic-like 96.8% scale compression → spring snap-back.
 *
 * TOUCH TARGETS:
 *   sm: min-h 36px  md: min-h 44px  lg: min-h 48px
 *   44px is Apple HIG minimum for mobile tap targets.
 */

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  children,
  className = "",
  ...props
}) => {
  // ── Base — shared across all variants ──────────────────────────────────────
  // spring-press: CSS class from globals.css (replaces inline active:scale-[0.97]).
  // transition covers non-transform properties (color, shadow, bg); transform is
  // handled exclusively by .spring-press so the two don't conflict.
  const baseStyles = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold tracking-[-0.012em] leading-none",
    "transition-[background-color,border-color,box-shadow,color] duration-200",
    "select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B84C1E]/60",
    "spring-press",
  ].join(" ");

  // ── Sizes — optical radii from CSS token layer (@theme in globals.css) ──────
  const sizeStyles: Record<string, string> = {
    sm: "h-9 min-w-[80px] px-4 text-[12px]  rounded-[var(--radius-btn-sm)]",
    md: "h-11 min-w-[100px] px-5 text-[13px] rounded-[var(--radius-btn-md)]",
    lg: "h-12 min-w-[120px] px-6 text-[14px] rounded-[var(--radius-btn-lg)]",
  };

  // ── Variants ─────────────────────────────────────────────────────────────────
  const variantStyles: Record<string, string> = {
    /**
     * PRIMARY — Solid filled ember. The safari booking CTA.
     * Must feel weighty and irresistible on a thumb-scrolling mobile screen.
     * Hover: subtle glow bloom + 1px lift.
     */
    primary: [
      "bg-[#B84C1E] text-white",
      "shadow-[0_2px_8px_rgba(184,76,30,0.25)]",
      "hover:bg-[#9E4019]",
      "hover:-translate-y-px",
      "hover:shadow-[0_6px_20px_rgba(184,76,30,0.35)]",
    ].join(" "),

    /**
     * SECONDARY — Forest green bordered, sand text.
     * Authority signal — editorial, not loud.
     */
    secondary: [
      "bg-transparent text-[#8A9468]",
      "border border-[#37482E]/70",
      "hover:bg-[#37482E]/10 hover:border-[#37482E]",
      "hover:-translate-y-px",
    ].join(" "),

    /**
     * OUTLINE — Thin white border + white text.
     * For dark/video backgrounds (hero overlay, dark sections).
     */
    outline: [
      "bg-transparent text-[#FBF8F0]",
      "border border-white/30",
      "hover:bg-white/10 hover:border-white/55",
      "hover:-translate-y-px backdrop-blur-sm",
    ].join(" "),

    /**
     * GHOST — Fully transparent. Light page secondary actions.
     */
    ghost: [
      "bg-transparent text-[#37482E]",
      "border border-transparent",
      "hover:bg-[#E8E0CC]/60",
    ].join(" "),

    /**
     * WHATSAPP — Solid green. Instant recognition on mobile.
     * Solid fill (not bordered) because on the sticky bar it competes with
     * a solid ember call button — symmetry matters for the eye.
     */
    whatsapp: [
      "bg-[#25D366] text-black",
      "shadow-[0_2px_8px_rgba(37,211,102,0.20)]",
      "hover:bg-[#1EBE5D]",
      "hover:-translate-y-px",
      "hover:shadow-[0_6px_20px_rgba(37,211,102,0.30)]",
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
