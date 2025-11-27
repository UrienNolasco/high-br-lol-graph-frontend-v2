import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HexButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  icon?: LucideIcon;
}

export const HexButton = ({ children, variant = 'primary', onClick, className = '', icon: Icon }: HexButtonProps) => {
  const base = "relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group";
  const styles = {
    primary: "bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    secondary: "bg-surfaceLight text-white border border-border hover:border-hextech hover:text-hextech",
    ghost: "bg-transparent text-textMuted hover:text-white"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
};

