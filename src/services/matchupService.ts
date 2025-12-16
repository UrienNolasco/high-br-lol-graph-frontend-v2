import api from "./api";
import { MatchupResponse } from "@/types";

export type RoleMapping = "MIDDLE" | "TOP" | "UTILITY" | "JUNGLE" | "BOTTOM";

export const roleMap: Record<string, RoleMapping> = {
  Mid: "MIDDLE",
  Top: "TOP",
  Support: "UTILITY",
  Jungle: "JUNGLE",
  Adc: "BOTTOM",
};

export const matchupService = {
  /**
   * Busca dados de matchup entre dois campeões
   * @param championA Nome do primeiro campeão
   * @param championB Nome do segundo campeão
   * @param patch Patch do jogo (ex: "15.20")
   * @param role Role do jogo (MIDDLE, TOP, UTILITY, JUNGLE, BOTTOM)
   */
  async getMatchup(
    championA: string,
    championB: string,
    patch: string,
    role: RoleMapping
  ): Promise<MatchupResponse> {
    const response = await api.get<MatchupResponse>(
      `/api/v1/stats/matchups/${championA}/${championB}`,
      {
        params: {
          patch,
          role,
        },
      }
    );
    return response.data;
  },
};
