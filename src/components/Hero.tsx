import React, { useState } from "react";
import {
  ArrowRight,
  Swords,
  Database,
  TrendingUp,
  Activity,
  Shield,
  Zap,
} from "lucide-react";
import { ViewState } from "@/types";
import { Badge, HexButton, GlassCard } from "@/components/ui";

interface HeroProps {
  setView: (v: ViewState) => void;
}

interface HeroStats {
  totalMatches: number;
  mostPickedChampion: string;
  mostPickedPickRate: number;
  averageWinRate: number;
  mostBannedChampion: string;
  mostBannedBanRate: number;
}

export const Hero = ({ setView }: HeroProps) => {
  const [stats, setStats] = useState<HeroStats>({
    totalMatches: 12400,
    mostPickedChampion: "Lee Sin",
    mostPickedPickRate: 22.1,
    averageWinRate: 50.2,
    mostBannedChampion: "Zed",
    mostBannedBanRate: 18.0,
  });

  // TODO: Replace with real API call when available
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const response = await fetch('/api/stats/hero');
  //       const data = await response.json();
  //       setStats(data);
  //     } catch (error) {
  //       console.error('Error fetching stats:', error);
  //     }
  //   };
  //   fetchStats();
  // }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(10,200,185,0.08),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-hextech/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px]" />

      {/* Floating Elements - 4 corners */}
      <div className="absolute top-32 left-[10%] hidden lg:block animate-float">
        <GlassCard className="flex items-center gap-3 !p-3">
          <div className="w-10 h-10 rounded-lg bg-hextech/20 flex items-center justify-center text-hextech">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-textMuted">Matches Analyzed</div>
            <div className="font-bold text-white">
              {stats.totalMatches.toLocaleString()}
            </div>
            <div className="text-xs text-textDark">Master+</div>
          </div>
        </GlassCard>
      </div>

      <div
        className="absolute top-32 right-[10%] hidden lg:block animate-float"
        style={{ animationDelay: "1s" }}
      >
        <GlassCard className="flex items-center gap-3 !p-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-textMuted">Most Picked</div>
            <div className="font-bold text-white">
              {stats.mostPickedChampion}
            </div>
            <div className="text-xs text-blue-400">
              {stats.mostPickedPickRate}%
            </div>
          </div>
        </GlassCard>
      </div>

      <div
        className="absolute bottom-32 left-[10%] hidden lg:block animate-float"
        style={{ animationDelay: "2s" }}
      >
        <GlassCard className="flex items-center gap-3 !p-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-textMuted">Avg Win Rate</div>
            <div className="font-bold text-green-400">
              {stats.averageWinRate}%
            </div>
            <div className="text-xs text-textDark">Global (Master+)</div>
          </div>
        </GlassCard>
      </div>

      <div
        className="absolute bottom-32 right-[10%] hidden lg:block animate-float"
        style={{ animationDelay: "3s" }}
      >
        <GlassCard className="flex items-center gap-3 !p-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-textMuted">Most Banned</div>
            <div className="font-bold text-white">
              {stats.mostBannedChampion}
            </div>
            <div className="text-xs text-red-400">
              {stats.mostBannedBanRate}%
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <Badge
          variant="outline"
          className="mb-6 inline-flex items-center gap-1 border-hextech/30 text-hextech bg-hextech/5"
        >
          <Zap className="w-3 h-3 fill-current" /> Patch 15.20 Live
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          One-click for <br /> Asset Defense
        </h1>

        <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
          Dive into the art assets, where innovative blockchain technology meets
          financial expertise. Wait, that's the prompt text. Let's fix it:
          <br />
          <br />
          <span className="text-white">
            Dominate the Brazilian High-Elo.
          </span>{" "}
          Real-time win rates, matchup data, and meta analysis derived
          exclusively from Challenger, Grandmaster, and Master tiers in BR1.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <HexButton
            onClick={() => setView(ViewState.TIER_LIST)}
            icon={ArrowRight}
          >
            Analyze Meta
          </HexButton>
          <HexButton
            variant="secondary"
            onClick={() => setView(ViewState.MATCHUP)}
            icon={Swords}
          >
            Search Matchup
          </HexButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-10 flex items-center gap-2 text-xs text-textDark animate-pulse-slow">
        <div className="w-6 h-10 border border-white/10 rounded-full flex justify-center pt-2">
          <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
        </div>
        01 / 03 . Scroll down
      </div>
    </section>
  );
};
