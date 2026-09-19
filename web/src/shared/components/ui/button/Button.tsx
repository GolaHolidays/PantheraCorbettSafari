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
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus:outline-none active:scale-[0.98]";

  // Design philosophy: CTA is rounded-full (pill) in Ember; secondary is 6px; structure is sharp
  const sizeStyles = {
    sm: "min-h-[40px] px-4 py-1.5 text-xs font-semibold tracking-wide",
    md: "min-h-[44px] px-6 py-2.5 text-sm font-semibold tracking-wide",
    lg: "min-h-[48px] px-8 py-3.5 text-base font-bold tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-[#B84C1E] text-white hover:bg-[#8F3B16] rounded-full shadow-sm hover:shadow-md border border-transparent",
    secondary:
      "bg-[#37482E] text-[#FBF8F0] hover:bg-[#25321F] rounded-[6px] border border-[#37482E]",
    outline:
      "bg-transparent text-[#17211A] border border-[#8A9468] hover:border-[#17211A] hover:bg-[#17211A]/5 rounded-full",
    ghost:
      "bg-transparent text-[#37482E] hover:bg-[#E8E0CC]/50 rounded-[6px]",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded-full shadow-sm",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal || href.startsWith("tel:") || href.startsWith("https://wa.me") || href.startsWith("http")) {
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
