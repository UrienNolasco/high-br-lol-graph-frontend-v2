import React from 'react';

export const Footer = () => (
  <footer className="border-t border-border mt-auto py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex gap-6 text-sm text-textMuted">
        <a href="#" className="hover:text-white transition-colors">API Docs</a>
        <a href="#" className="hover:text-white transition-colors">Github</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
      </div>
      
      <div className="text-textDark text-sm">
        © high-br-lol-graph · 2024
      </div>
      
      <div className="flex gap-4">
         <div className="w-8 h-8 rounded-full bg-surfaceLight flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
           <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
         </div>
      </div>
    </div>
  </footer>
);

