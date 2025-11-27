import React, { useState } from 'react';
import { Search, Shield, Filter } from 'lucide-react';
import { CHAMPIONS } from '@/utils/constants';
import { Badge } from '@/components/ui';

export const TierList = () => {
  const [roleFilter, setRoleFilter] = useState('All');
  
  const filteredChampions = roleFilter === 'All' 
    ? CHAMPIONS 
    : CHAMPIONS.filter(c => c.role === roleFilter);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Controls & Grid */}
        <div className="w-full lg:w-[30%] space-y-6">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Champion Tier List</h2>
              <p className="text-sm text-textMuted">Explore the meta hierarchy.</p>
            </div>

            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textDark" />
               <input 
                 type="text" 
                 placeholder="Search champion..." 
                 className="w-full bg-surfaceLight border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-hextech/50 transition-colors"
               />
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Top', 'Jungle', 'Mid', 'Bot', 'Support'].map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${roleFilter === role ? 'bg-hextech/10 border-hextech text-hextech' : 'bg-transparent border-border text-textMuted hover:border-textDark'}`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="bg-surfaceLight/30 rounded-xl p-4 border border-border">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-xs font-bold text-textMuted uppercase">S+ Tier (Dominant)</span>
               </div>
               <div className="grid grid-cols-4 gap-2">
                 {CHAMPIONS.filter(c => c.tier === 'S+' || c.tier === 'S').slice(0, 8).map(c => (
                   <div key={c.id} className="aspect-square rounded-lg bg-surface border border-border overflow-hidden relative group cursor-pointer hover:border-hextech">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      {c.tier === 'S+' && <div className="absolute top-0 right-0 bg-yellow-500 text-[10px] text-black font-bold px-1">S+</div>}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Table */}
        <div className="w-full lg:w-[70%]">
           <div className="flex items-center justify-between mb-6">
             <div className="flex gap-4">
               <div className="flex items-center gap-2 text-sm text-white bg-surfaceLight px-3 py-1.5 rounded border border-border">
                  <Shield className="w-4 h-4 text-hextech" /> Master+
               </div>
               <div className="flex items-center gap-2 text-sm text-white bg-surfaceLight px-3 py-1.5 rounded border border-border">
                  BR1 Region
               </div>
             </div>
             <button className="text-sm text-hextech flex items-center gap-1">
               <Filter className="w-4 h-4" /> Filters
             </button>
           </div>

           <div className="bg-surface/50 border border-border rounded-xl overflow-hidden">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border bg-surfaceLight/50 text-xs text-textMuted uppercase tracking-wider">
                   <th className="p-4 font-medium">Rank</th>
                   <th className="p-4 font-medium">Champion</th>
                   <th className="p-4 font-medium">Tier</th>
                   <th className="p-4 font-medium">Win Rate</th>
                   <th className="p-4 font-medium">Pick Rate</th>
                   <th className="p-4 font-medium">Ban Rate</th>
                   <th className="p-4 font-medium text-right">Matches</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {filteredChampions.map((champ, idx) => (
                   <tr key={champ.id} className="border-b border-border/50 hover:bg-white/5 transition-colors group">
                     <td className="p-4 text-textDark font-mono">#{idx + 1}</td>
                     <td className="p-4">
                       <div className="flex items-center gap-3">
                         <img src={champ.image} alt={champ.name} className="w-8 h-8 rounded bg-gray-800" />
                         <span className="font-semibold text-white">{champ.name}</span>
                       </div>
                     </td>
                     <td className="p-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded hexagon border ${
                          champ.tier.includes('S') ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' : 
                          champ.tier === 'A' ? 'border-blue-500/50 text-blue-500 bg-blue-500/10' :
                          'border-gray-500/50 text-gray-500'
                        } font-bold`}>
                          {champ.tier}
                        </div>
                     </td>
                     <td className={`p-4 font-medium ${champ.winRate >= 52 ? 'text-hextech' : champ.winRate < 48 ? 'text-red-400' : 'text-textMuted'}`}>
                       {champ.winRate}%
                     </td>
                     <td className="p-4 text-textMuted">{champ.pickRate}%</td>
                     <td className="p-4 text-textMuted">{champ.banRate}%</td>
                     <td className="p-4 text-right text-textDark">{champ.matches.toLocaleString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

