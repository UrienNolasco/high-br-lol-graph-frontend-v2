import React from "react";

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const GlassCard = React.forwardRef<
  HTMLDivElement,
  GlassCardProps & React.HTMLAttributes<HTMLDivElement>
>(({ children, className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`glass-panel rounded-xl p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
));

GlassCard.displayName = "GlassCard";
