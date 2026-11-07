import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { WorkflowShowcase } from './components/WorkflowShowcase';
import { Shortcuts } from './components/Shortcuts';
import { DownloadMatrix } from './components/DownloadMatrix';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <WorkflowShowcase />
        <Shortcuts />
        <DownloadMatrix />
      </main>
      <Footer />
    </div>
  );
};

export default App;
