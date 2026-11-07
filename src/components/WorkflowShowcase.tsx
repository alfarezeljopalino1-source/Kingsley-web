import React, { useState } from 'react';
import { Palette, GitCompare, Command, FileText } from 'lucide-react';

interface ThemePreset {
  id: string;
  name: string;
  accent: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  keyword: string;
  promptColor: string;
  glow: string;
}

export const WorkflowShowcase: React.FC = () => {
  const themes: ThemePreset[] = [
    {
      id: 'obsidian',
      name: 'Kingsley Obsidian',
      accent: '#00d2d3',
      bg: '#0c0e12',
      surface: '#12161f',
      border: 'rgba(0, 210, 211, 0.4)',
      text: '#f1f5f9',
      keyword: '#00d2d3',
      promptColor: '#00d2d3',
      glow: '0 0 20px rgba(0, 210, 211, 0.25)',
    },
    {
      id: 'tokyo-night',
      name: 'Tokyo Night',
      accent: '#7aa2f7',
      bg: '#1a1b26',
      surface: '#24283b',
      border: 'rgba(122, 162, 247, 0.4)',
      text: '#c0caf5',
      keyword: '#bb9af7',
      promptColor: '#7dcfff',
      glow: '0 0 20px rgba(122, 162, 247, 0.25)',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      accent: '#fcee0a',
      bg: '#070814',
      surface: '#0f1123',
      border: 'rgba(252, 238, 10, 0.4)',
      text: '#e0f2fe',
      keyword: '#ff0055',
      promptColor: '#00f0ff',
      glow: '0 0 20px rgba(252, 238, 10, 0.25)',
    },
    {
      id: 'dracula',
      name: 'Dracula Pro',
      accent: '#bd93f9',
      bg: '#1e1f29',
      surface: '#282a36',
      border: 'rgba(189, 147, 249, 0.4)',
      text: '#f8f8f2',
      keyword: '#ff79c6',
      promptColor: '#50fa7b',
      glow: '0 0 20px rgba(189, 147, 249, 0.25)',
    },
    {
      id: 'matrix',
      name: 'Matrix Core',
      accent: '#00ff41',
      bg: '#030a04',
      surface: '#081409',
      border: 'rgba(0, 255, 65, 0.4)',
      text: '#c6f6d5',
      keyword: '#00ff41',
      promptColor: '#00ff41',
      glow: '0 0 20px rgba(0, 255, 65, 0.25)',
    },
    {
      id: 'rose-pine',
      name: 'Rosé Pine',
      accent: '#eb6f92',
      bg: '#191724',
      surface: '#1f1d2e',
      border: 'rgba(235, 111, 146, 0.4)',
      text: '#e0def4',
      keyword: '#eb6f92',
      promptColor: '#f6c177',
      glow: '0 0 20px rgba(235, 111, 146, 0.25)',
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>(themes[0]);

  return (
    <section id="themes" className="py-20 border-t border-zinc-800/80 bg-[#0c0c11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-[#00d2d3] border border-cyan-800/50">
            THEME STUDIO &amp; ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Crafted for Developer Flow
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Kingsley isn't just a terminal multiplexer. It's an entire developer workspace with handcrafted palettes, integrated git diffs, and instant command fuzzy search.
          </p>
        </div>

        {/* 1. Interactive Theme Studio Playground */}
        <div className="rounded-2xl border border-zinc-800 bg-[#09090d] p-6 sm:p-8 shadow-2xl mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <Palette className="w-4 h-4 text-[#00d2d3]" />
                <span>Theme Studio: 26 Handcrafted Palettes</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Click a palette to see Kingsley adapt its shell colors, hairline borders, and ambient glow in real time:
              </p>
            </div>

            {/* Theme Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {themes.map((t) => {
                const isActive = selectedTheme.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTheme(t)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      isActive
                        ? 'bg-zinc-800 text-white border shadow-md'
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                    style={{
                      borderColor: isActive ? t.accent : undefined,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: t.accent }}
                    />
                    <span>{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Theme Preview Card */}
          <div
            className="rounded-xl p-5 border font-mono text-xs transition-all duration-300"
            style={{
              backgroundColor: selectedTheme.bg,
              borderColor: selectedTheme.border,
              boxShadow: selectedTheme.glow,
            }}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px]">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: selectedTheme.accent }}
                />
                <span style={{ color: selectedTheme.text }} className="font-bold">
                  {selectedTheme.name}
                </span>
                <span className="text-zinc-500">• 24-bit TrueColor Active</span>
              </div>
              <span
                className="px-2 py-0.5 rounded text-[10px]"
                style={{
                  backgroundColor: selectedTheme.surface,
                  color: selectedTheme.accent,
                }}
              >
                ConPTY Engine
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <p>
                <span style={{ color: selectedTheme.promptColor }} className="font-semibold">
                  kingsley@machine
                </span>
                <span className="text-zinc-500">:</span>
                <span className="text-blue-400">~/workspace</span>
                <span className="text-zinc-500"> (main)</span>
              </p>
              <p style={{ color: selectedTheme.text }}>$ cargo run --release --features=conpty</p>
              <p style={{ color: selectedTheme.keyword }}>&gt; Compiling kingsley-core v1.0.0</p>
              <p className="text-emerald-400">✓ Optimized build target ready [0.18ms latency]</p>
              <p style={{ color: selectedTheme.text }}>
                <span style={{ color: selectedTheme.promptColor }}>❯ </span>
                <span className="opacity-90">Ready for commands</span>
                <span
                  className="w-2 h-3.5 inline-block ml-1 animate-pulse align-middle"
                  style={{ backgroundColor: selectedTheme.accent }}
                />
              </p>
            </div>
          </div>
        </div>

        {/* 2. Three Developer Workflow Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 space-y-3 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <GitCompare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100">Integrated Git Diff Viewer</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Inspect unstaged file changes, branch commits, and syntax-highlighted side-by-side diffs directly inside your workspace without context switching.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 space-y-3 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400">
              <Command className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100">Command Palette (Ctrl + K)</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fuzzy-search across open terminals, recent project workspaces, custom shell scripts, and theme configurations in under 5 milliseconds.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 space-y-3 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100">Built-in Scratchpad &amp; Notes</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Keep curl payloads, database connection strings, and markdown scratch notes persistently docked beside your active shell sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
