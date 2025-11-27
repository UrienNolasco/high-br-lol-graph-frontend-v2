import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const baseStyle = "px-2 py-0.5 rounded text-xs font-medium tracking-wide";
  const variants = {
    default: "bg-surfaceLight text-textMuted border border-border",
    success: "bg-emerald-900/30 text-emerald-400 border border-emerald-900",
    warning: "bg-amber-900/30 text-amber-400 border border-amber-900",
    outline: "bg-transparent text-textMuted border border-border",
  };
  return <span className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</span>;
};

