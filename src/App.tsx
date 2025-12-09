import React, { useState } from "react";
import { ViewState } from "@/types";
import { Navbar, Footer } from "@/components/layout";
import { Home } from "@/pages/Home";
import { TierList } from "@/pages/TierList";
import { Matchup } from "@/pages/Matchup";
import "@/styles/global.css";
import { Architecture } from "./pages/Architecture";

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col font-sans selection:bg-hextech/30 selection:text-hextech">
      <Navbar currentView={currentView} setView={setCurrentView} />

      <main className="flex-grow">
        {currentView === ViewState.HOME && <Home setView={setCurrentView} />}

        {currentView === ViewState.TIER_LIST && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TierList />
          </div>
        )}

        {currentView === ViewState.MATCHUP && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Matchup />
          </div>
        )}

        {currentView === ViewState.ARCHITECTURE && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Architecture />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
