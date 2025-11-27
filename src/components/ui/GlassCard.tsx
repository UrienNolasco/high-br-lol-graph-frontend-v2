import React from "react";

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <div className={`glass-panel rounded-xl p-6 ${className}`}>{children}</div>
);
