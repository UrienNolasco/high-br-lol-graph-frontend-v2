import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
  action,
}) => {
  return (
    <div
      className={`glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,200,185,0.15)] hover:border-hextech/30 group ${className}`}
    >
      {(title || action) && (
        <div className="flex justify-between items-start mb-4">
          <div>
            {title && (
              <h3 className="text-xl font-semibold text-white group-hover:text-hextech transition-colors">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#8A8A8A] mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
