import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { ViewState } from "@/types";
import { Badge } from "@/components/ui";

interface NavbarProps {
  currentView: ViewState;
  setView: (v: ViewState) => void;
}

export const Navbar = ({ currentView, setView }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ view, label }: { view: ViewState; label: string }) => (
    <button
      onClick={() => setView(view)}
      className={`text-sm font-medium transition-colors hover:text-hextech ${
        currentView === view ? "text-white" : "text-textMuted"
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4">
      <div className="w-full max-w-7xl backdrop-blur-md bg-black/60 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-black/20">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView(ViewState.HOME)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-hextech to-blue-600 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            high-br-lol-graph
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink view={ViewState.HOME} label="Home" />
          <NavLink view={ViewState.TIER_LIST} label="Tier List" />
          <NavLink view={ViewState.MATCHUP} label="Matchup" />
          <NavLink view={ViewState.ARCHITECTURE} label="Architecture" />
          <span className="text-textDark cursor-not-allowed">Pro</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-textDark bg-surfaceLight/50 px-3 py-1.5 rounded-full border border-white/5 text-sm hover:border-hextech/30 transition-colors cursor-pointer group">
            <Search className="w-4 h-4 group-hover:text-hextech" />
            <span>Search Champion...</span>
            <Badge variant="outline" className="ml-2 text-[10px]">
              CMD+K
            </Badge>
          </div>
          <button className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
            Login
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-surface border border-border rounded-xl p-4 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
          <NavLink view={ViewState.HOME} label="Home" />
          <NavLink view={ViewState.TIER_LIST} label="Tier List" />
          <NavLink view={ViewState.MATCHUP} label="Matchup Analysis" />
          <NavLink view={ViewState.ARCHITECTURE} label="Architecture" />
        </div>
      )}
    </nav>
  );
};
