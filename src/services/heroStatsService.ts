import { HeroStats } from "@/types";
import api from "./api";

export const heroStatsService = {
  async getHeroStats(): Promise<HeroStats> {
    try {
      const patchResponse = await api.get("/api/v1/champions/current-patch");
      const { patch, fullVersion } = patchResponse.data;

      // Depois, fazer as requisições usando o patch obtido
      const [totalMatchesResponse, mostPickedResponse, biggestWinRateResponse] =
        await Promise.all([
          api.get("/api/v1/stats/processed-matches"),
          api.get(
            `/api/v1/stats/champions?order=desc&sortBy=gamesPlayed&limit=1&page=1&patch=${patch}`
          ),
          api.get(
            `/api/v1/stats/champions?order=desc&sortBy=winRate&limit=1&page=1&patch=${patch}`
          ),
        ]);

      const totalMatches = totalMatchesResponse.data.count;
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
