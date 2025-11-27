import React from 'react';
import { Database } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CHART_DATA_1, CHART_DATA_2, CHART_DATA_BAN } from '@/utils/constants';
import { Badge, GlassCard } from '@/components/ui';

export const InsightsSection = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Meta Snapshot</h2>
        <p className="text-textMuted">Key performance between the patches.</p>

        <Dropdown
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Top Champ Performance */}
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-hextech/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-textMuted text-sm font-medium">Top Performer</h3>
                <div className="text-2xl font-bold text-white mt-1">Camille</div>
              </div>
              <Badge variant="success">+2.4%</Badge>
            </div>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA_1}>
                  <Line type="monotone" dataKey="value" stroke="#0AC8B9" strokeWidth={3} dot={false} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                     itemStyle={{ color: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="text-xs text-hextech hover:underline">View Build</button>
            </div>
          </div>
        </GlassCard>

        {/* Card 2: Matchup Volatility */}
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-textMuted text-sm font-medium">Top Volatility</h3>
                <div className="text-lg font-bold text-white mt-1">Aatrox vs Renekton</div>
              </div>
            </div>
            <div className="h-24 w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA_2} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1A1A1A', border: 'none' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {CHART_DATA_2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-textDark mt-4">Aatrox leads with 65% lane prio.</p>
           </div>
        </GlassCard>

        {/* Card 3: Patch Stats */}
        <GlassCard className="relative overflow-hidden">
           <div className="relative z-10 flex flex-col justify-between h-full">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-surfaceLight rounded-lg text-white">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-white font-bold">Patch 15.20</h3>
                   <span className="text-xs text-green-400">Live Server</span>
                </div>
             </div>
             <div>
                <div className="text-3xl font-bold text-white">12,400</div>
                <div className="text-sm text-textMuted">Matches Analyzed (Master+)</div>
             </div>
             <div className="mt-4 h-1 w-full bg-surfaceLight rounded-full overflow-hidden">
                <div className="h-full bg-hextech w-[75%]" />
             </div>
           </div>
        </GlassCard>

        {/* Card 4: Ban Rate */}
        <GlassCard>
           <h3 className="text-textMuted text-sm font-medium mb-4">Ban Rate Trends</h3>
           <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={CHART_DATA_BAN}>
                    <Bar dataKey="value" fill="#333" radius={[4, 4, 0, 0]}>
                      {CHART_DATA_BAN.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#333'} />
                      ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <p className="text-xs text-center text-textDark mt-2">Zed remains top ban</p>
        </GlassCard>
      </div>
    </section>
  );
};

