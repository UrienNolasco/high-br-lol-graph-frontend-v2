import { PatchInfo, ChampionStatsResponse } from "@/types";
import api from "./api";

export const patchService = {
  /**
   * Busca todos os patches disponíveis
   */
  async getAllPatches(): Promise<PatchInfo[]> {
    const response = await api.get("/api/v1/champions/current-patch");
    return response.data.patches;
  },

  /**
   * Busca o patch mais recente que tem dados de estatísticas disponíveis
   * Se o patch atual não tiver dados, busca o anterior
   */
  async getPatchWithData(): Promise<PatchInfo> {
    const patches = await this.getAllPatches();

    if (!patches || patches.length === 0) {
      throw new Error("Nenhum patch disponível");
    }

    // Tentar cada patch até encontrar um com dados
    for (const patchInfo of patches) {
      console.log(`Verificando dados para o patch ${patchInfo.patch}...`);

      const hasData = await this.checkPatchHasData(patchInfo.patch);

      if (hasData) {
        console.log(`Patch ${patchInfo.patch} tem dados disponíveis`);
        return patchInfo;
      }

      console.log(
        `Patch ${patchInfo.patch} não tem dados, tentando próximo...`
      );
    }

    throw new Error("Nenhum patch tem dados de estatísticas disponíveis");
  },

  /**
   * Verifica se um patch específico tem dados de estatísticas
   */
  async checkPatchHasData(patch: string): Promise<boolean> {
    try {
      const response = await api.get<ChampionStatsResponse>(
        `/api/v1/stats/champions?limit=1&page=1&patch=${patch}`
      );

      return response.data?.data?.length > 0;
    } catch {
      return false;
    }
  },

  /**
   * Busca o patch atual (mais recente)
   */
  async getCurrentPatch(): Promise<PatchInfo> {
    const patches = await this.getAllPatches();

    if (!patches || patches.length === 0) {
      throw new Error("Nenhum patch disponível");
    }

    return patches[0];
  },
};
