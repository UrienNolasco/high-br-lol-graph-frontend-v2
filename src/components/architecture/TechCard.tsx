import React, { useState } from "react";
import { TechData } from "@/utils/techData";

interface TechCardProps {
  tech: TechData;
  draggable?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({ tech, draggable = true }) => {
  const [isDragging, setIsDragging] = useState(false);
  const Icon = tech.icon;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggable) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "copy";
    // Passar apenas o ID, não o objeto completo (componentes não podem ser serializados)
    e.dataTransfer.setData("text/plain", tech.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={draggable ? handleDragEnd : undefined}
      className={`
        glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3 
        hover:bg-white/5 transition-all duration-200 group
        ${draggable ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
        ${isDragging ? "opacity-60" : "opacity-100"}
      `}
    >
      <Icon
        className={`w-6 h-6 ${tech.color} group-hover:scale-110 transition-transform`}
      />
      <span className="text-xs font-medium text-gray-400">{tech.label}</span>
    </div>
  );
};

