import api from "./api";
import type { Champion } from "@/types";

export const championService = {
  /**
   * Busca todos os campeões
   */
  getAll: async (): Promise<Champion[]> => {
    const { data } = await api.get<Champion[]>("/champions");
    return data;
  },

  /**
   * Busca um campeão por ID
   */
  getById: async (id: string): Promise<Champion> => {
    const { data } = await api.get<Champion>(`/champions/${id}`);
    return data;
  },

  /**
   * Busca campeões por role
   */
  getByRole: async (role: Champion["role"]): Promise<Champion[]> => {
    const { data } = await api.get<Champion[]>(`/champions/role/${role}`);
    return data;
  },
};
