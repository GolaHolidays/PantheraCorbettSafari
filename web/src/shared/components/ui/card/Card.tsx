import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-[#FBF8F0] border border-[#E8E0CC] rounded-[4px] overflow-hidden ${
        hoverEffect ? "transition-all duration-200 hover:border-[#8A9468]/50 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
