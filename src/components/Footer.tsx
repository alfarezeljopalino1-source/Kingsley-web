import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090b] py-12 text-xs text-zinc-500 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Creator info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <img
              src="/kingsley-icon.png"
              alt="Kingsley Icon"
              className="w-7 h-7 rounded-lg object-contain shadow-md shadow-cyan-500/20"
            />
            <div>
              <p className="text-zinc-300 font-semibold font-sans text-sm">
                Kingsley Terminal Multiplexer
              </p>
              <p className="text-zinc-500 text-xs">
                Crafted by <strong className="text-zinc-300 font-medium">Alfarezel Jopalino</strong> (Bro Jopal) &{' '}
                <span className="text-zinc-300 font-medium">Ben</span>
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Global Edge CDN Active</span>
            <span className="text-zinc-600">•</span>
            <span>100% Free & Open Source</span>
          </div>

          {/* Quick External Links */}
          <div className="flex items-center gap-6 text-zinc-400">
            <a
              href="https://github.com/alfarezeljopalino1-source/Kingsley"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
            <a
              href="https://github.com/alfarezeljopalino1-source/Kingsley/issues"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition-colors"
            >
              Issues
            </a>
            <a
              href="https://github.com/alfarezeljopalino1-source/Kingsley/releases"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200 transition-colors"
            >
              Releases
            </a>
            <span className="text-zinc-600">MIT License</span>
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} Kingsley Multiplexer. Designed with strict Anti-AI-Slop engineering standards.</p>
        </div>
      </div>
    </footer>
  );
};
