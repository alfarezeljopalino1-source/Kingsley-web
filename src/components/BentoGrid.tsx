import React, { useState } from 'react';
import { Columns2, Rows2, LayoutGrid, FileCode, Zap, Bot } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  const [splitLayout, setSplitLayout] = useState<'vert' | 'horiz' | 'grid'>('vert');
  const [dragged, setDragged] = useState<boolean>(false);

  return (
    <section id="features" className="py-20 border-t border-zinc-800/80 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950/60 text-blue-300 border border-blue-800/50">
            ENGINEERING CRAFT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Built for Power Users Who Live in the Terminal
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            No bloated web wrappers. Kingsley couples direct OS pseudoterminal bindings with high-efficiency visual layout management.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: Fluid Resizable Split-Panes (Col-Span 2) */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
                  <Columns2 className="w-5 h-5" />
                </div>
                {/* Layout Mode Selector Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
                  <button
                    onClick={() => setSplitLayout('vert')}
                    className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      splitLayout === 'vert'
                        ? 'bg-blue-600 text-white'
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
                        ? 'bg-blue-600 text-white'
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
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid (3-Way)</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-100">Fluid Resizable Split-Panes</h3>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  Split your workspace horizontally or vertically with instant keyboard triggers. Drag borders smoothly with your mouse without touching complex tmux configuration files.
                </p>
              </div>
            </div>

            {/* Interactive Layout Mockup Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#09090d] border border-zinc-800/80 font-mono text-xs">
              <div className="h-44 w-full rounded-lg bg-zinc-950 p-2 border border-zinc-800 flex gap-2">
                {splitLayout === 'vert' && (
                  <>
                    <div className="flex-1 rounded bg-zinc-900/90 border border-blue-500/40 p-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-blue-400">#1: Main Shell</span>
                        <p className="text-zinc-300 mt-2">$ npm run dev</p>
                        <p className="text-emerald-400 text-[10px]">Ready on :3000</p>
                      </div>
                      <span className="text-[10px] text-zinc-600">Active Focus</span>
                    </div>
                    <div className="w-1.5 bg-blue-500/70 rounded-full cursor-col-resize shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <div className="flex-1 rounded bg-zinc-900/50 border border-zinc-800 p-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500">#2: Background Worker</span>
                        <p className="text-zinc-400 mt-2">$ cargo watch</p>
                        <p className="text-zinc-500 text-[10px]">Listening for changes</p>
                      </div>
                      <span className="text-[10px] text-zinc-600">Ctrl+Shift+D to split</span>
                    </div>
                  </>
                )}

                {splitLayout === 'horiz' && (
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex-1 rounded bg-zinc-900/90 border border-blue-500/40 p-2.5 flex items-center justify-between">
                      <span className="text-zinc-300">$ nvim src/core.rs</span>
                      <span className="text-[10px] text-blue-400">Editor (Top)</span>
                    </div>
                    <div className="h-1 bg-blue-500/70 rounded-full cursor-row-resize shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <div className="flex-1 rounded bg-zinc-900/50 border border-zinc-800 p-2.5 flex items-center justify-between">
                      <span className="text-zinc-400">$ vitest --watch</span>
                      <span className="text-[10px] text-emerald-400">Tests Passing</span>
                    </div>
                  </div>
                )}

                {splitLayout === 'grid' && (
                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="rounded bg-zinc-900/90 border border-blue-500/40 p-2.5 flex flex-col justify-between">
                      <span className="text-[10px] text-blue-400">#1 API</span>
                      <span className="text-zinc-300 text-[11px]">$ uvicorn main:app</span>
                    </div>
                    <div className="rounded bg-zinc-900/50 border border-zinc-800 p-2.5 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-500">#2 DB</span>
                      <span className="text-zinc-400 text-[11px]">$ docker compose up</span>
                    </div>
                    <div className="col-span-2 rounded bg-zinc-900/40 border border-zinc-800/80 p-2 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>#3 Logs: 200 OK (GET /status) - 1.2ms</span>
                      <span className="text-zinc-600">ConPTY Multiplexed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: Direct Path Drag-and-Drop (Col-Span 1) */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Direct Path Drag & Drop</h3>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  Drag any file or folder from Explorer or Finder straight into your shell. Paths are escaped cleanly without quotes mess or clipboard interference.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#09090d] border border-zinc-800/80 font-mono text-xs space-y-3">
              <div
                onClick={() => setDragged(!dragged)}
                className="p-3 rounded-lg border border-dashed border-zinc-700 hover:border-blue-400 bg-zinc-900/60 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 text-zinc-300">
                  <FileCode className="w-4 h-4 text-blue-400" />
                  <span>schema.prisma</span>
                </div>
                <span className="text-[10px] font-sans text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  {dragged ? 'Path Dropped!' : 'Click to simulate drop'}
                </span>
              </div>

              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300">
                <p className="text-zinc-500 text-[10px] mb-1">Terminal Prompt:</p>
                <p>
                  <span className="text-blue-400">❯</span> npx prisma db push --schema=
                  <span className={dragged ? 'text-emerald-400 font-semibold' : 'text-zinc-600'}>
                    {dragged ? '"D:/app/prisma/schema.prisma"' : '...'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: Native ConPTY & POSIX Core (Col-Span 1) */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Native ConPTY Core</h3>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  Real Windows Console Pseudo-Terminal (ConPTY) and macOS POSIX bindings. Zero emulation overhead, pure native I/O speed.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#09090d] border border-zinc-800/80 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">IPC Input Latency</span>
                <span className="text-emerald-400 font-bold">0.18 ms</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                <div className="w-[12%] h-full bg-emerald-500 rounded-full" />
              </div>

              {/* 24-bit TrueColor Gradient Bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                  <span>24-bit TrueColor Output</span>
                  <span>16.7M Colors</span>
                </div>
                <div className="h-3 w-full rounded bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-blue-500 to-purple-500 opacity-90" />
              </div>
            </div>
          </div>

          {/* CARD 4: Tailored for AI Agents (Col-Span 2) */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                  AI CLI Ready
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Side-by-Side AI CLI Workflow</h3>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  Run autonomous coding agents like omp, claude-code, or Aider in one split-pane while monitoring active build logs or testing endpoints in the other without switching window focus.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#09090d] border border-zinc-800/80 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-blue-400 font-bold block mb-1">Pane A (Your Dev Work)</span>
                  <p className="text-zinc-300">$ git diff HEAD~1</p>
                  <p className="text-emerald-400">+ conpty_pipe_write(buf)</p>
                  <p className="text-red-400">- legacy_winpty_exec()</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-emerald-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">Pane B (Autonomous Agent)</span>
                  <p className="text-zinc-400">[omp] Unit tests verified</p>
                  <p className="text-zinc-400">[omp] Commit message prepared</p>
                  <p className="text-blue-400">Ready for git push review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
