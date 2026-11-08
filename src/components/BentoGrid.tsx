import React, { useState } from 'react';
import {
  Columns2,
  Rows2,
  LayoutGrid,
  Terminal,
  Check,
  Layers,
  FileCode2,
  Globe,
  RotateCw,
  Server,
  Lock
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  const [splitLayout, setSplitLayout] = useState<'vert' | 'horiz' | 'grid'>('vert');

  return (
    <section id="features" className="py-24 border-t border-zinc-800/80 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 text-[#00d2d3] border border-cyan-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d2d3] animate-pulse" />
            <span>ENGINEERED CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
            Built for Engineers Who Refuse Bloat.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Kingsley isn't just another terminal skin. It couples direct OS pseudoterminal bindings with an embedded web preview engine and native agent tooling.
          </p>
        </div>

        {/* 2x2 Distinct High-Impact Engineering Grid (Zero Repetition) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ========================================================================= */}
          {/* CARD 1: Fluid Resizable Split-Panes                                       */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0c0e14] p-7 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-[#00d2d3]">
                  <Layers className="w-5 h-5" />
                </div>
                {/* Mode Selector */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
                  <button
                    onClick={() => setSplitLayout('vert')}
                    className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      splitLayout === 'vert'
                        ? 'bg-[#12161f] border border-[#00d2d3]/50 text-white font-medium'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span>Vertical</span>
                  </button>
                  <button
                    onClick={() => setSplitLayout('horiz')}
                    className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      splitLayout === 'horiz'
                        ? 'bg-[#12161f] border border-[#00d2d3]/50 text-white font-medium'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Rows2 className="w-3.5 h-3.5" />
                    <span>Horizontal</span>
                  </button>
                  <button
                    onClick={() => setSplitLayout('grid')}
                    className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      splitLayout === 'grid'
                        ? 'bg-[#12161f] border border-[#00d2d3]/50 text-white font-medium'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid (3-Way)</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Fluid Resizable Split-Panes
                </h3>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  No complex <code className="text-zinc-300 font-mono text-xs bg-zinc-800/80 px-1.5 py-0.5 rounded">.tmux.conf</code> scripts. No detached socket deaths. Drag any pane border smoothly with your mouse or trigger instant keyboard splits.
                </p>
              </div>

              {/* Technical Keyboard Shortcuts Callout */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-zinc-500">Quick Triggers:</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Ctrl+Shift+D <span className="text-zinc-500">(Vertical)</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Ctrl+Shift+E <span className="text-zinc-500">(Horizontal)</span>
                </span>
              </div>
            </div>

            {/* Terminal Window Architecture Preview */}
            <div className="mt-6 rounded-xl bg-[#08090d] border border-white/10 p-3 font-mono text-xs">
              <div className="h-44 w-full rounded-lg bg-[#0c0e12] border border-white/5 p-2 flex gap-2">
                {splitLayout === 'vert' && (
                  <>
                    <div className="flex-1 rounded bg-[#12161f] border border-[#00d2d3]/40 p-3 flex flex-col justify-between shadow-[inset_0_0_12px_rgba(0,210,211,0.06)]">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#00d2d3]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>backend-core / shell</span>
                        </div>
                        <p className="text-zinc-200 mt-2 font-medium">$ npm run dev --port 3000</p>
                        <p className="text-emerald-400 text-[10px] mt-0.5">✓ Ready on :3000 (182ms)</p>
                      </div>
                      <span className="text-[10px] text-zinc-500">Active Focus</span>
                    </div>

                    {/* Signature Kingsley Drag Handle Pill */}
                    <div className="relative flex items-center justify-center w-2 cursor-col-resize select-none">
                      <div className="w-[1px] h-full bg-white/10" />
                      <div className="absolute w-1.5 h-6 rounded-full bg-[#00d2d3] shadow-[0_0_8px_#00d2d3]" />
                    </div>

                    <div className="flex-1 rounded bg-[#10131a] border border-zinc-800 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                          <span>worker / logs</span>
                        </div>
                        <p className="text-zinc-400 mt-2">$ cargo watch</p>
                        <p className="text-cyan-400 text-[10px] mt-0.5">&gt; Listening for file updates</p>
                      </div>
                      <span className="text-[10px] text-zinc-600">Split: 53% : 47%</span>
                    </div>
                  </>
                )}

                {splitLayout === 'horiz' && (
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex-1 rounded bg-[#12161f] border border-[#00d2d3]/40 p-2.5 flex items-center justify-between shadow-[inset_0_0_12px_rgba(0,210,211,0.06)]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-zinc-200">$ nvim src/core.rs</span>
                      </div>
                      <span className="text-[10px] text-[#00d2d3]">Pane Top</span>
                    </div>

                    <div className="relative flex items-center justify-center h-1 cursor-row-resize select-none">
                      <div className="h-[1px] w-full bg-white/10" />
                      <div className="absolute h-1.5 w-6 rounded-full bg-[#00d2d3] shadow-[0_0_8px_#00d2d3]" />
                    </div>

                    <div className="flex-1 rounded bg-[#10131a] border border-zinc-800 p-2.5 flex items-center justify-between">
                      <span className="text-zinc-400">$ vitest --watch</span>
                      <span className="text-[10px] text-emerald-400">12 Tests Passing</span>
                    </div>
                  </div>
                )}

                {splitLayout === 'grid' && (
                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="rounded bg-[#12161f] border border-[#00d2d3]/40 p-2.5 flex flex-col justify-between">
                      <span className="text-[10px] text-[#00d2d3]">#1 API Server</span>
                      <span className="text-zinc-200 text-[11px]">$ uvicorn app:main --reload</span>
                    </div>
                    <div className="rounded bg-[#10131a] border border-zinc-800 p-2.5 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-500">#2 Background Worker</span>
                      <span className="text-zinc-400 text-[11px]">$ celery -A tasks worker</span>
                    </div>
                    <div className="col-span-2 rounded bg-zinc-950/80 border border-zinc-800/80 p-2 flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="text-emerald-400">✓ ConPTY Multiplexed [200 OK GET /v1/stream 0.18ms]</span>
                      <span className="text-zinc-600 font-mono">3 Panes Active</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: Direct OS Path Ingestion (Zero-Copy Stream)                       */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0c0e14] p-7 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/60">
                  Zero-Copy Stream
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Direct Path Drag & Drop
                </h3>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Drag any file or folder from Explorer or Finder straight into your shell. Kingsley captures the OS drop handle directly and escapes spaces cleanly without clipboard interference.
                </p>
              </div>

              {/* Technical Comparison Checklist */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 text-rose-300 space-y-1">
                  <span className="text-[10px] text-rose-400 font-bold block">TRADITIONAL TERMINALS</span>
                  <p className="text-[11px] text-rose-300/80">✗ Overwrites clipboard history</p>
                  <p className="text-[11px] text-rose-300/80">✗ Unescaped spaces break script</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold block">KINGSLEY ENGINE</span>
                  <p className="text-[11px] text-emerald-300">✓ Direct ConPTY stdin injection</p>
                  <p className="text-[11px] text-emerald-300">✓ 0ms lag, zero clipboard pollution</p>
                </div>
              </div>
            </div>

            {/* Architecture Code Snippet Showcase */}
            <div className="mt-6 rounded-xl bg-[#08090d] border border-white/10 p-3.5 font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-white/5">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Win32 OS DragOver Hook</span>
                </div>
                <span className="text-emerald-400 text-[10px]">Zero Temp Files</span>
              </div>

              <div className="p-2.5 rounded bg-[#0c0e12] border border-white/5 space-y-1 text-xs">
                <p className="text-zinc-500 text-[10px]">Active Terminal Prompt:</p>
                <p className="text-zinc-300">
                  <span className="text-purple-400 font-semibold">PS &gt;</span> python run_pipeline.py --config=
                  <span className="text-[#00d2d3] font-semibold bg-[#00d2d3]/15 px-1 py-0.5 rounded border border-[#00d2d3]/30">
                    "C:\workspace\backend\src\pipeline.ts"
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3 h-3" /> Auto-escaped with clean Win32 quotes
                </span>
                <span>Latency: 0.00ms</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: Embedded Localhost Browser Preview (BrowserPane.tsx Feature)      */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0c0e14] p-7 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-amber-950/60 text-amber-300 border border-amber-800/60 font-semibold">
                  Zero Alt+Tab
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Embedded Live Web Browser
                </h3>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Test localhost servers, inspect responsive UI endpoints, or browse API docs in an embedded Chromium pane docked side-by-side with your active build shell.
                </p>
              </div>

              {/* Technical Features Tag Grid */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Hot-Reload Sync
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  DevTools Inspection
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Mobile / Desktop Viewports
                </span>
              </div>
            </div>

            {/* Embedded Browser Preview Mockup */}
            <div className="mt-6 rounded-xl bg-[#08090d] border border-white/10 p-3.5 font-mono text-xs space-y-2.5">
              {/* Browser Address Bar Header */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#0c0e12] border border-white/10 text-[11px]">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-zinc-500 pl-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-300 border border-white/5 flex-1 min-w-0">
                    <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-mono text-zinc-300 truncate">http://localhost:5173/</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-zinc-400 shrink-0 pr-1">
                  <RotateCw className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Split Terminal + Web View Preview */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded bg-[#0c0e12] border border-white/5 space-y-1">
                  <span className="text-zinc-500 block">Pane 1: Terminal</span>
                  <p className="text-zinc-300">$ vite --port 5173</p>
                  <p className="text-emerald-400">➜ Local: 5173 (HMR)</p>
                </div>
                <div className="p-2 rounded bg-blue-950/20 border border-blue-900/40 space-y-1">
                  <span className="text-cyan-400 block font-semibold">Pane 2: Browser Live</span>
                  <p className="text-zinc-300">DOM: 24 Elements</p>
                  <p className="text-emerald-400">✓ Page render: 12ms</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Live IPC stream synchronization
                </span>
                <span>Isolated Cookies &amp; Storage</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 4: Native MCP Skills Hub & Plugin Ecosystem (McpSkillsModal.tsx)     */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0c0e14] p-7 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">
                  MCP Protocol
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Native MCP Skills &amp; Plugins Hub
                </h3>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Connect local filesystem sandbox tools, database introspectors, and GitHub APIs directly to your autonomous terminal agents with 1-click toggles instead of messy JSON configuration files.
                </p>
              </div>

              {/* Supported MCP Providers */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
                <span className="text-zinc-500">Servers:</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">Filesystem</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-300">Playwright</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-purple-300">GitHub API</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-300">SQLite DB</span>
              </div>
            </div>

            {/* MCP Live Status Card Showcase */}
            <div className="mt-6 rounded-xl bg-[#08090d] border border-white/10 p-3.5 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-1.5 border-b border-white/5">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3 MCP Servers Connected
                </span>
                <span className="text-zinc-500 text-[10px]">26 Active Tools</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded bg-[#0c0e12] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">●</span>
                    <span className="text-zinc-200">filesystem-mcp</span>
                    <span className="text-zinc-500 text-[10px]">(6 tools)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Ready</span>
                </div>

                <div className="p-2 rounded bg-[#0c0e12] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">●</span>
                    <span className="text-zinc-200">playwright-browser-mcp</span>
                    <span className="text-zinc-500 text-[10px]">(8 tools)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Ready</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                <span className="text-cyan-400 font-mono">Direct agent context injection</span>
                <span>Zero CLI Restart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
