import { HeroStats, ChampionStatsResponse } from "@/types";
import api from "./api";
import { patchService } from "./patchService";

export const heroStatsService = {
  async getHeroStats(): Promise<HeroStats> {
    try {
      // Buscar o patch correto (com dados disponíveis)
      const patchInfo = await patchService.getPatchWithData();
      const { patch, fullVersion } = patchInfo;

      // Buscar todas as estatísticas em paralelo
      const [totalMatchesResponse, mostPickedResponse, biggestWinRateResponse] =
        await Promise.all([
          api.get("/api/v1/stats/processed-matches"),
          api.get<ChampionStatsResponse>(
            `/api/v1/stats/champions?order=desc&sortBy=gamesPlayed&limit=1&page=1&patch=${patch}`
          ),
          api.get<ChampionStatsResponse>(
            `/api/v1/stats/champions?order=desc&sortBy=winRate&limit=1&page=1&patch=${patch}`
          ),
        ]);

      const totalMatches = totalMatchesResponse.data?.count || 0;
      const mostPicked = mostPickedResponse.data.data[0];
      const biggestWinRate = biggestWinRateResponse.data.data[0];

      return {
        totalMatches,
        mostPickedChampion: mostPicked.championName,
        mostPickedPickRate: mostPicked.gamesPlayed,
        averageWinRate: biggestWinRate.winRate,
        biggestWinRateChampion: biggestWinRate.championName,
        mostBannedChampion: "", // TODO: Implementar quando tiver endpoint
        mostBannedBanRate: 0, // TODO: Implementar quando tiver endpoint
        patch,
        fullVersion,
      };
    } catch (error) {
      console.error("Erro ao buscar estatísticas do Hero:", error);
      throw error;
    }
  },
};
