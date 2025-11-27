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
}

export interface NavItem {
  label: string;
  view: ViewState;
  icon?: React.ReactNode;
}
