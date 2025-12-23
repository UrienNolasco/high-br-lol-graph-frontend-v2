import React, { useState, useRef } from "react";
import { TechData, getTechById } from "@/utils/techData";

interface TechDropZoneProps {
  selectedTech: TechData | null;
  onTechDropped: (tech: TechData) => void;
  onTechRemoved: () => void;
}

export const TechDropZone: React.FC<TechDropZoneProps> = ({
  selectedTech,
  onTechDropped,
  onTechRemoved,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Verificar se realmente saiu da área de drop
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const techId = e.dataTransfer.getData("text/plain");
      if (techId) {
        const techData = getTechById(techId);
        if (techData) {
          onTechDropped(techData);
        }
      }
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
  };

  const Icon = selectedTech ? selectedTech.icon : null;

  return (
    <div
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        glass-panel rounded-xl p-6 transition-all duration-300 min-h-[300px]
        flex flex-col items-center justify-center relative
        ${
          isDragOver
            ? "border-2 border-hextech border-dashed bg-hextech/10 shadow-[0_0_30px_rgba(10,200,185,0.3)]"
            : "border-2 border-dashed border-gray-600/30"
        }
        ${selectedTech ? "border-solid border-hextech/50" : ""}
      `}
    >
      {selectedTech ? (
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3 w-full max-w-[120px] group">
          {Icon && (
            <Icon
              className={`w-6 h-6 ${selectedTech.color} group-hover:scale-110 transition-transform`}
            />
          )}
          <span className="text-xs font-medium text-gray-400">
            {selectedTech.label}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          {/* Quadrado placeholder do mesmo tamanho do card */}
          <div
            className={`
              glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3
              border-2 border-dashed transition-all duration-300
              ${
                isDragOver
                  ? "border-hextech bg-hextech/20 scale-105 shadow-[0_0_20px_rgba(10,200,185,0.4)]"
                  : "border-gray-600/50 bg-transparent"
              }
              w-full max-w-[120px] min-h-[100px]
            `}
          >
            <div
              className={`
                text-3xl transition-transform duration-300
                ${isDragOver ? "scale-110" : "scale-100"}
              `}
            >
            </div>
          </div>
          <p className="text-sm font-medium text-gray-400 mt-4">
            Arraste aqui a tecnologia
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Solte o card no quadrado acima
          </p>
        </div>
      )}
    </div>
  );
};

