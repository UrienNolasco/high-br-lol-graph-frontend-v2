import React from 'react';
import { Hero } from '@/components/Hero';
import { InsightsSection } from '@/components/InsightsSection';
import { ViewState } from '@/types';

interface HomeProps {
  setView: (v: ViewState) => void;
}

export const Home = ({ setView }: HomeProps) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero setView={setView} />
      <InsightsSection />
    </div>
  );
};

