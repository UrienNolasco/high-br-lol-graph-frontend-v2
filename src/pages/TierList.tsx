import React, { useState, useEffect, useMemo } from "react";
import { Search, Shield, Filter } from "lucide-react";
import { patchService } from "@/services/patchService";
import { PatchInfo, GeneralChampionsData } from "@/types";
import { generalChampionsService } from "@/services/generalChampionsService";

// Função para mapear roles do frontend para o formato do backend
const mapRoleToBackend = (role: string): string | null => {
  if (role === "All") {
    return null;
  }

  const roleMap: Record<string, string> = {
    Top: "TOP",
    Jungle: "JUNGLE",
    Mid: "MIDDLE",
    Bot: "BOTTOM",
    Support: "UTILITY",
  };

  return roleMap[role] ?? null;
};

export const TierList = () => {
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [patch, setPatch] = useState<PatchInfo | null>(null);
  const [champions, setChampions] = useState<GeneralChampionsData[]>([]);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchChampions = async () => {
      if (!patch) return;

      try {
        setLoading(true);
        const response = await generalChampionsService.getGeneralChampions({
          patch: patch.patch,
          limit: 200,
          order: "desc",
          sortBy: "winRate",
        });

        setChampions(response.data);
        // Calcular total de jogos para calcular pickRate
        const total = response.data.reduce(
          (sum, champ) => sum + champ.gamesPlayed,
          0
        );
        setTotalGames(total);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar campeões:", err);
        setError("Erro ao buscar campeões");
        setChampions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChampions();
  }, [patch]);

  // Filtrar campeões baseado na role selecionada e termo de busca
  const filteredChampions = useMemo(() => {
    let filtered = champions;

    // Filtrar por role
    if (roleFilter !== "All") {
      const backendRole = mapRoleToBackend(roleFilter);
      if (backendRole) {
        filtered = filtered.filter(
          (champ) => champ.primaryRole === backendRole
        );
      }
    }

    // Filtrar por termo de busca (case-insensitive)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((champ) =>
        champ.championName.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [champions, roleFilter, searchTerm]);

  // Recalcular totalGames baseado nos campeões filtrados
  const filteredTotalGames = useMemo(() => {
    return filteredChampions.reduce((sum, champ) => sum + champ.gamesPlayed, 0);
  }, [filteredChampions]);

  // Agrupar campeões por tier e ordenar por rank dentro de cada tier
  const championsByTier = useMemo(() => {
    const grouped: Record<string, GeneralChampionsData[]> = {};

    filteredChampions.forEach((champ) => {
      const tier = champ.tier || "Unknown";
      if (!grouped[tier]) {
        grouped[tier] = [];
      }
      grouped[tier].push(champ);
    });

    // Ordenar campeões dentro de cada tier por rank
    Object.keys(grouped).forEach((tier) => {
      grouped[tier].sort((a, b) => (a.rank || 0) - (b.rank || 0));
    });

    // Ordenar tiers: S+ primeiro, depois S, depois A, B, C, etc.
    const tierOrder = ["S+", "S", "A", "B", "C", "D", "E", "F"];
    const sortedTiers = Object.keys(grouped).sort((a, b) => {
      const indexA = tierOrder.indexOf(a);
      const indexB = tierOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return sortedTiers.map((tier) => ({
      tier,
      champions: grouped[tier],
    }));
  }, [filteredChampions]);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Controls & Grid */}
        <div className="w-full lg:w-[30%] space-y-6">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Champion Tier List</h2>
              <p className="text-sm text-textMuted">
                Explore the meta hierarchy.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textDark" />
              <input
                type="text"
                placeholder="Search champion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surfaceLight border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-hextech/50 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Top", "Jungle", "Mid", "Bot", "Support"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    roleFilter === role
                      ? "bg-hextech/10 border-hextech text-hextech"
                      : "bg-transparent border-border text-textMuted hover:border-textDark"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="bg-surfaceLight/30 rounded-xl p-4 border border-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-textMuted uppercase">
                  Champions
                </span>
              </div>
              <div className="space-y-4">
                {championsByTier.map(({ tier, champions }) => (
                  <div key={tier} className="flex gap-3">
                    {/* Letra do Tier à esquerda */}
                    <div className="flex-shrink-0 w-8 flex items-start justify-center pt-1">
                      <span className="text-lg font-bold text-textMuted uppercase">
                        {tier}
                      </span>
                    </div>
                    {/* Grid de campeões à direita (máximo 6 por linha) */}
                    <div className="flex-1 grid grid-cols-6 gap-2">
                      {champions.map((c) => (
                        <div
                          key={c.championId}
                          className="flex flex-col items-center gap-1 p-1 rounded-lg bg-surface/50 border border-border hover:border-hextech/50 transition-colors cursor-pointer group"
                        >
                          <img
                            src={c.images.square}
                            alt={c.championName}
                            className="w-full aspect-square rounded bg-gray-800 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                          <span className="text-[10px] text-textMuted text-center truncate w-full">
                            {c.championName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Table */}
        <div className="w-full lg:w-[70%]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-white bg-surfaceLight px-3 py-1.5 rounded border border-border">
                <Shield className="w-4 h-4 text-hextech" /> Master+
              </div>
              <div className="flex items-center gap-2 text-sm text-white bg-surfaceLight px-3 py-1.5 rounded border border-border">
                BR1 Region
              </div>
            </div>
            <button className="text-sm text-hextech flex items-center gap-1">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="bg-surface/50 border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surfaceLight/50 text-xs text-textMuted uppercase tracking-wider">
                  <th className="p-4 font-medium">Rank</th>
                  <th className="p-4 font-medium">Champion</th>
                  <th className="p-4 font-medium">Tier</th>
                  <th className="p-4 font-medium">Win Rate</th>
                  <th className="p-4 font-medium">Pick Rate</th>
                  <th className="p-4 font-medium">Ban Rate</th>
                  <th className="p-4 font-medium text-right">Matches</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-textMuted">
                      Carregando campeões...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-red-400">
                      {error}
                    </td>
                  </tr>
                ) : filteredChampions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-textMuted">
                      Nenhum campeão encontrado
                    </td>
                  </tr>
                ) : (
                  filteredChampions.map((champ, idx) => (
                    <tr
                      key={champ.championId}
                      className="border-b border-border/50 hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-4 text-textDark font-mono">
                        #{champ.rank || idx + 1}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={champ.images.square}
                            alt={champ.championName}
                            className="w-8 h-8 rounded bg-gray-800"
                          />
                          <span className="font-semibold text-white">
                            {champ.championName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded hexagon border ${
                            champ.tier.includes("S")
                              ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
                              : champ.tier === "A"
                              ? "border-blue-500/50 text-blue-500 bg-blue-500/10"
                              : "border-gray-500/50 text-gray-500"
                          } font-bold`}
                        >
                          {champ.tier}
                        </div>
                      </td>
                      <td
                        className={`p-4 font-medium ${
                          champ.winRate >= 52
                            ? "text-hextech"
                            : champ.winRate < 48
                            ? "text-red-400"
                            : "text-textMuted"
                        }`}
                      >
                        {champ.winRate.toFixed(2)}%
                      </td>
                      <td className="p-4 text-textMuted">
                        {filteredTotalGames > 0
                          ? (
                              (champ.gamesPlayed / filteredTotalGames) *
                              100
                            ).toFixed(2)
                          : "0.00"}
                        %
                      </td>
                      <td className="p-4 text-textMuted">
                        {champ.banRate.toFixed(2)}%
                      </td>
                      <td className="p-4 text-right text-textDark">
                        {champ.gamesPlayed.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
