import React from "react";
import { TechData } from "@/utils/techData";
import { Layers } from "lucide-react";

interface TechDetailsCardProps {
  tech: TechData | null;
}

export const TechDetailsCard: React.FC<TechDetailsCardProps> = ({ tech }) => {
  if (!tech) {
    return (
      <div className="glass-panel rounded-xl p-6 transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center">
        <div className="text-center space-y-3">
          <Layers className="w-12 h-12 text-gray-600 mx-auto" />
          <p className="text-lg font-medium text-gray-400">
            Selecione uma tecnologia
          </p>
          <p className="text-sm text-gray-500">
            Arraste um card para ver os detalhes aqui
          </p>
        </div>
      </div>
    );
  }

  const { details } = tech;

  return (
    <div className="glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,200,185,0.15)] hover:border-hextech/30 group min-h-[300px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-hextech transition-colors">
            {details.title}
          </h3>
          <p className="text-xs text-[#8A8A8A] mt-1">{details.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-[#C3C3C3] leading-relaxed">
        <div className="flex items-center gap-2 mb-2">
          <tech.icon className={`${tech.color}`} size={18} />
          <span className="text-white font-semibold">Visão Geral</span>
        </div>
        <p>{details.description}</p>

        {details.features && details.features.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-2 mt-4">
              Características Principais
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-[#8A8A8A]">
              {details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {details.codeExample && (
          <div className="mt-4 p-3 bg-black/50 rounded-lg border border-white/5 font-mono text-xs text-green-400">
            {details.codeExample}
          </div>
        )}
      </div>
    </div>
  );
};

