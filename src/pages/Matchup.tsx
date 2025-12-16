import React, { useState, useEffect } from "react";
import { Search, ArrowLeftRight } from "lucide-react";
import { Badge, GlassCard } from "@/components/ui";
import { patchService } from "@/services/patchService";
import {
  matchupService,
  roleMap,
  RoleMapping,
} from "@/services/matchupService";
import { PatchInfo, MatchupResponse } from "@/types";

const ROLES = ["Mid", "Top", "Support", "Jungle", "Adc"] as const;

export const Matchup = () => {
  const [championA, setChampionA] = useState("Orianna");
  const [championB, setChampionB] = useState("Syndra");
  const [selectedRole, setSelectedRole] = useState<string>("Mid");
  const [patch, setPatch] = useState<PatchInfo | null>(null);
  const [matchupData, setMatchupData] = useState<MatchupResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar patch automaticamente ao montar o componente
  useEffect(() => {
    const fetchPatch = async () => {
      try {
        const patchInfo = await patchService.getPatchWithData();
        setPatch(patchInfo);
      } catch (err) {
        console.error("Erro ao buscar patch:", err);
        setError("Erro ao buscar patch");
      }
    };
    fetchPatch();
  }, []);

  // Buscar dados de matchup quando champions, role ou patch mudarem
  useEffect(() => {
    const fetchMatchup = async () => {
      if (!championA || !championB || !selectedRole || !patch) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const roleMapping = roleMap[selectedRole] as RoleMapping;
        const data = await matchupService.getMatchup(
          championA,
          championB,
          patch.patch,
          roleMapping
        );
        setMatchupData(data);
      } catch (err: any) {
        console.error("Erro ao buscar matchup:", err);
        setError(
          err?.response?.data?.message || "Erro ao buscar dados de matchup"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatchup();
  }, [championA, championB, selectedRole, patch]);

  const handleSwapChampions = () => {
    const temp = championA;
    setChampionA(championB);
    setChampionB(temp);
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header / Champion Selection */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-surfaceLight mb-12">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/bg/1200/400"
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            {/* Champ A Input */}
            <div className="w-full">
              <label className="text-xs text-textMuted uppercase tracking-widest mb-2 block">
                Champion A
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={championA}
                  onChange={(e) => setChampionA(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border border-blue-500/30 rounded-lg leading-5 bg-black/50 text-blue-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg font-bold shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                />
              </div>
            </div>

            {/* VS Swap */}
            <button
              onClick={handleSwapChampions}
              className="p-3 rounded-full bg-surface border border-border hover:border-hextech hover:text-hextech transition-all hover:rotate-180"
            >
              <ArrowLeftRight className="w-6 h-6" />
            </button>

            {/* Champ B Input */}
            <div className="w-full">
              <label className="text-xs text-textMuted uppercase tracking-widest mb-2 block text-right">
                Champion B
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={championB}
                  onChange={(e) => setChampionB(e.target.value)}
                  className="block w-full text-right pr-10 pl-3 py-4 border border-red-500/30 rounded-lg leading-5 bg-black/50 text-red-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-lg font-bold shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-surface rounded-full p-1 border border-border">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRole === role
                      ? "bg-white text-black shadow-lg"
                      : "text-textMuted hover:text-white"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-400 text-sm">{error}</div>
          )}
          {loading && (
            <div className="mt-4 text-center text-textMuted text-sm">
              Carregando dados...
            </div>
          )}
        </div>
      </div>

      {/* The Visual Comparison */}
      {matchupData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16">
          {/* Champ A Visual */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-b from-blue-500 to-transparent mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <img
                src={matchupData.championA.images.square}
                alt={matchupData.championA.name}
                className="w-full h-full object-cover rounded-full border-4 border-black"
              />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {matchupData.championA.name}
            </h2>
            <Badge
              variant="default"
              className="mt-2 bg-blue-900/20 text-blue-400 border-blue-900"
            >
              Win Rate {matchupData.championA.winRate.toFixed(1)}%
            </Badge>
          </div>

          {/* The Bar */}
          <div className="flex flex-col items-center w-full px-4">
            <div className="text-xs text-textDark uppercase tracking-widest mb-2">
              Lane Win Rate
            </div>
            <div className="text-4xl font-black text-white mb-6">
              {matchupData.championA.winRate.toFixed(1)}%{" "}
              <span className="text-textDark text-lg font-normal">vs</span>{" "}
              {matchupData.championB.winRate.toFixed(1)}%
            </div>

            <div className="w-full h-4 bg-surfaceLight rounded-full overflow-hidden flex relative">
              <div
                className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10"
                style={{ width: `${matchupData.championA.winRate}%` }}
              />
              <div
                className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                style={{ width: `${matchupData.championB.winRate}%` }}
              />

              {/* Center Marker */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white z-20 opacity-50" />
            </div>

            <div className="flex justify-between w-full mt-2 text-xs font-mono text-textMuted">
              <span>
                Based on {matchupData.gamesPlayed.toLocaleString()} Matches
              </span>
              <span>Patch {matchupData.patch}</span>
            </div>
          </div>

          {/* Champ B Visual */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-b from-red-500 to-transparent mb-4 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <img
                src={matchupData.championB.images.square}
                alt={matchupData.championB.name}
                className="w-full h-full object-cover rounded-full border-4 border-black"
              />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {matchupData.championB.name}
            </h2>
            <Badge
              variant="default"
              className="mt-2 bg-red-900/20 text-red-400 border-red-900"
            >
              Win Rate {matchupData.championB.winRate.toFixed(1)}%
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
