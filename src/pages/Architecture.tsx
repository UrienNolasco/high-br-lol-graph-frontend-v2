import { useState } from "react";
import {
  ArrowRight,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  MessageSquare,
  Server,
} from "lucide-react";
import { techData, TechData } from "@/utils/techData";
import { TechCard } from "@/components/architecture/TechCard";
import { TechDropZone } from "@/components/architecture/TechDropZone";
import { TechDetailsCard } from "@/components/architecture/TechDetailsCard";

export const Architecture = () => {
  const [selectedTech, setSelectedTech] = useState<TechData | null>(null);

  const handleTechDropped = (tech: TechData) => {
    setSelectedTech(tech);
  };

  const handleTechRemoved = () => {
    setSelectedTech(null);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hextech/30 bg-hextech/10 mb-6 backdrop-blur-sm">
          <Code size={14} className="text-hextech" />
          <span className="text-xs font-medium text-hextech tracking-wider uppercase">
            Engineering Deep Dive
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          The Architecture Behind <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hextech to-blue-500 text-glow">
            High-Performance Data Ingestion
          </span>
        </h1>
        <p className="text-lg text-[#C3C3C3] max-w-3xl mx-auto leading-relaxed">
          A decoupled, event-driven pipeline designed to ingest, process, and
          analyze high-elo League of Legends matches from the BR1 server in
          real-time.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-20">
        {techData.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>

      {/* Interactive Tech Selection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <TechDropZone
          selectedTech={selectedTech}
          onTechDropped={handleTechDropped}
          onTechRemoved={handleTechRemoved}
        />
        <TechDetailsCard tech={selectedTech} />
      </div>

      {/* Architecture Pipeline Visual */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <GitBranch className="text-hextech" /> Event-Driven Pipeline
        </h2>
        <div className="glass-panel p-8 rounded-2xl overflow-x-auto">
          <div className="min-w-[800px] flex items-start justify-between gap-4 relative">
            {/* Connecting Line - Positioned to align with centers of 64px (h-16) boxes */}
            <div className="absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-hextech/20 to-transparent -z-10" />

            {/* Step 1: Collector */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-hextech/30 flex items-center justify-center shadow-[0_0_20px_rgba(10,200,185,0.1)]">
                <Server className="text-hextech w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Collector</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                  Fetches High-Elo PUUIDs & Match IDs
                </p>
              </div>
            </div>

            <ArrowRight className="text-gray-600 w-6 h-6 mt-5" />

            {/* Step 2: RabbitMQ */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-orange-500/30 flex items-center justify-center">
                <MessageSquare className="text-orange-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">RabbitMQ</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                  Buffers `match.collect` events
                </p>
              </div>
            </div>

            <ArrowRight className="text-gray-600 w-6 h-6 mt-5" />

            {/* Step 3: Workers */}
            <div className="flex flex-col items-center gap-4 text-center relative">
              <div className="absolute -top-6 text-[10px] text-hextech uppercase tracking-widest font-bold">
                Scaling
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-blue-500/30 flex items-center justify-center">
                <Cpu className="text-blue-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Workers (x2)</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                  Fetch details, parse stats, handle logic
                </p>
              </div>
            </div>

            <ArrowRight className="text-gray-600 w-6 h-6 mt-5" />

            {/* Step 4: Database */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
                <Database className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">PostgreSQL</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                  Stores Matches, Stats & Aggregates
                </p>
              </div>
            </div>

            <ArrowRight className="text-gray-600 w-6 h-6 mt-5" />

            {/* Step 5: API */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-green-500/30 flex items-center justify-center">
                <Globe className="text-green-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">HTTP API</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                  Serves Winrates, Matchups & Meta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Structure */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Code className="text-hextech" /> Project Structure
        </h2>
        <div className="glass-panel p-6 rounded-xl font-mono text-sm text-gray-400 overflow-x-auto">
          <pre>{`.
├── champions.json
├── docker-compose.prod.yml
├── docker-compose.yml
├── docker-entrypoint.sh
├── Dockerfile
├── Dockerfile.prod
├── eslint.config.mjs
├── GEMINI.md
├── GEMINI_EN.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20251002034112_init
│   │   │   └── migration.sql
│   │   ├── 20251128173030_add_new_stats_for_champions
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
├── REDIS_RATE_LIMITING.md
├── scripts
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── core
│   │   ├── config
│   │   │   └── config.module.ts
│   │   ├── data-dragon
│   │   │   ├── data-dragon.module.ts
│   │   │   ├── data-dragon.service.spec.ts
│   │   │   └── data-dragon.service.ts
│   │   ├── lock
│   │   │   ├── lock.module.ts
│   │   │   └── lock.service.ts
│   │   ├── prisma
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── queue
│   │   │   ├── queue.module.ts
│   │   │   └── queue.service.ts
│   │   └── riot
│   │       ├── dto
│   │       │   ├── league-entry.dto.ts
│   │       │   ├── league-list.dto.ts
│   │       │   └── match.dto.ts
│   │       ├── match-parser.service.ts
│   │       ├── rate-limiter.service.ts
│   │       ├── retry.service.ts
│   │       ├── riot.module.ts
│   │       └── riot.service.ts
│   ├── main.ts
│   └── modules
│       ├── api
│       │   ├── api.controller.spec.ts
│       │   ├── api.controller.ts
│       │   ├── api.module.ts
│       │   ├── api.service.spec.ts
│       │   ├── api.service.ts
│       │   └── dto
│       │       ├── champion-images.dto.ts
│       │       ├── champion-list.dto.ts
│       │       ├── champion-stats.dto.ts
│       │       ├── current-patch.dto.ts
│       │       ├── get-champion-stats.dto.ts
│       │       ├── matchup-stats.dto.ts
│       │       ├── rate-limit-status.dto.ts
│       │       └── reset-response.dto.ts
│       ├── collector
│       │   ├── collector.module.ts
│       │   ├── collector.service.spec.ts
│       │   └── collector.service.ts
│       └── worker
│           ├── dto
│           │   └── process-match.dto.ts
│           ├── worker.controller.spec.ts
│           ├── worker.controller.ts
│           ├── worker.module.ts
│           ├── worker.service.spec.ts
│           └── worker.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── to-do.md
├── tsconfig.build.json
└── tsconfig.json`}</pre>
        </div>
      </div>
    </div>
  );
};
