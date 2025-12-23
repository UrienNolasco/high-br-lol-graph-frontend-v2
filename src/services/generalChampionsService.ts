import { GeneralChampionsResponse, GetGeneralChampionsParams } from "@/types";
import api from "./api";

export const generalChampionsService = {
  /**
   * Busca todos os campeões com filtros e paginação
   * @param params - Parâmetros de busca
   * @returns Promise<GeneralChampionsResponse>
   */
  async getGeneralChampions(
    params: GetGeneralChampionsParams
  ): Promise<GeneralChampionsResponse> {
    const {
      page = 1,
      limit = 20,
      patch,
      order = "desc",
      sortBy = "winRate",
    } = params;

    const response = await api.get<GeneralChampionsResponse>(
      "/api/v1/stats/champions",
      {
        params: {
          page,
          limit,
          patch,
          order,
          sortBy,
        },
      }
    );

    return response.data;
  },
};
