import React from "react";

export interface Champion {
  id: string;
  name: string;
  role: "Top" | "Jungle" | "Mid" | "Bot" | "Support";
  tier: "S+" | "S" | "A" | "B" | "C";
  winRate: number;
  pickRate: number;
  banRate: number;
  matches: number;
  image: string;
}

export interface Matchup {
  championA: Champion;
  championB: Champion;
  winRateA: number;
  matches: number;
  laneWinRate: number;
  goldDiff15: number;
}

export enum ViewState {
  HOME = "HOME",
  TIER_LIST = "TIER_LIST",
  MATCHUP = "MATCHUP",
  ARCHITECTURE = "ARCHITECTURE",
}

export interface NavItem {
  label: string;
  view: ViewState;
  icon?: React.ReactNode;
}

export interface HeroProps {
  setView: (v: ViewState) => void;
}

export interface HeroStats {
  totalMatches: number;
  mostPickedChampion: string;
  mostPickedPickRate: number;
  averageWinRate: number;
  biggestWinRateChampion: string;
  mostBannedChampion: string;
  mostBannedBanRate: number;
  patch: string;
  fullVersion: string;
}

// Patch types
export interface PatchInfo {
  patch: string;
  fullVersion: string;
}

// Champion Stats API Response
export interface ChampionStatsData {
  championId: number;
  championName: string;
  winRate: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  images: {
    square: string;
    loading: string;
    splash: string;
  };
  kda: number;
  dpm: number;
  cspm: number;
  gpm: number;
  banRate: number;
}

export interface ChampionStatsResponse {
  data: ChampionStatsData[];
  total: number;
  page: number;
  limit: number;
}

// Matchup API Response
export interface MatchupChampionData {
  name: string;
  images: {
    square: string;
    loading: string;
    splash: string;
  };
  wins: number;
  winRate: number;
}

export interface MatchupResponse {
  championA: MatchupChampionData;
  championB: MatchupChampionData;
  gamesPlayed: number;
  patch: string;
  role: string;
}

export interface GeneralChampionsData {
  championId: number;
  championName: string;
  winRate: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  images: {
    square: string;
    loading: string;
    splash: string;
  };
  kda: number;
  dpm: number;
  cspm: number;
  gpm: number;
  banRate: number;
  tier: string;
  rank: number;
  primaryRole?: string;
}

export interface GeneralChampionsResponse {
  data: GeneralChampionsData[];
  total: number;
  page: number;
  limit: number;
}

export interface GetGeneralChampionsParams {
  page?: number;
  limit?: number;
  patch: string;
  order?: "asc" | "desc";
  sortBy?:
    | "winRate"
    | "gamesPlayed"
    | "championName"
    | "banRate"
    | "kda"
    | "dpm"
    | "cspm"
    | "gpm";
}
