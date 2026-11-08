import React, { useState } from 'react';
import {
  Columns2,
  Rows2,
  LayoutGrid,
  FileCode,
  Zap,
  Bot,
  Terminal,
  Check,
  FolderTree
} from 'lucide-react';
export const BentoGrid: React.FC = () => {
  const [splitLayout, setSplitLayout] = useState<'vert' | 'horiz' | 'grid'>('vert');
  
  // Interactive sample files for Direct Path Drag & Drop
  const [activeFileIdx, setActiveFileIdx] = useState<number>(0);
  const [isDropped, setIsDropped] = useState<boolean>(true);

  const sampleDropFiles = [
    {
      name: 'server.ts',
      fullPath: 'C:\\workspace\\backend\\src\\server.ts',
      size: '14.2 KB',
      iconColor: 'text-[#00d2d3]',
      commandPrefix: '$ cat',
    },
    {
      name: 'agent.rs',
      fullPath: 'C:\\workspace\\core\\models\\agent.rs',
      size: '28.6 KB',
      iconColor: 'text-amber-400',
      commandPrefix: '$ cargo check --path',
    },
    {
      name: 'dist-bundle/',
      fullPath: 'C:\\workspace\\client\\dist-bundle',
      size: '128 MB',
      iconColor: 'text-purple-400',
      commandPrefix: '$ ls -la',
    },
  ];

  const currentFile = sampleDropFiles[activeFileIdx];

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
          {/* ========================================================================= */}
          {/* CARD 1: Fluid Resizable Split-Panes (Col-Span 2)                           */}
          {/* ========================================================================= */}
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
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
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
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
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
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
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

            {/* Interactive Layout Mockup Box with Kingsley UI Aesthetics */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#08090d] border border-zinc-800/90 font-mono text-xs">
              <div className="h-44 w-full rounded-lg bg-[#0c0e12] p-2 border border-white/10 flex gap-2">
                {splitLayout === 'vert' && (
                  <>
                    <div className="flex-1 rounded bg-[#12161f] border border-[#00d2d3]/40 p-3 flex flex-col justify-between shadow-[inset_0_0_12px_rgba(0,210,211,0.06)]">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#00d2d3]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>#1: backend-core / shell</span>
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
                          <span>#2: ai-copilot / stream</span>
                        </div>
                        <p className="text-zinc-400 mt-2">$ omp watch</p>
                        <p className="text-cyan-400 text-[10px] mt-0.5">&gt; ConPTY IPC pipeline active</p>
                      </div>
                      <span className="text-[10px] text-zinc-600">Ctrl+Shift+D to split</span>
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

                    {/* Horizontal Divider Handle */}
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
          {/* CARD 2: Direct Path Drag-and-Drop (Aesthetic Interactive Path Drop)       */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e0e14] p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-[#00d2d3]">
                  <FolderTree className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-[#00d2d3] border border-cyan-800/60 font-medium">
                  Zero-Copy Drop
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-100">Direct Path Drag & Drop</h3>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  Drag any file or folder from Explorer or Finder straight into your shell. Paths are escaped cleanly without quotes mess or clipboard interference.
                </p>
              </div>
            </div>

            {/* Aesthetic Interactive Drop Simulator */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#08090d] border border-zinc-800/90 font-mono text-xs space-y-3">
              {/* Selectable File Chips */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1.5 font-sans">
                  <span>Pick file to simulate drag:</span>
                  <span className="text-cyan-400 font-mono text-[9px]">Click file below</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {sampleDropFiles.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveFileIdx(idx);
                        setIsDropped(true);
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all ${
                        activeFileIdx === idx
                          ? 'bg-[#12161f] border border-[#00d2d3] text-white shadow-sm shadow-[#00d2d3]/20'
                          : 'bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                      }`}
                    >
                      <span className={file.iconColor}>●</span>
                      <span>{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag Trajectory Visualizer */}
              <div
                onClick={() => setIsDropped(!isDropped)}
                className="p-2.5 rounded-lg border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/20 flex items-center justify-between cursor-pointer transition-all group/drop"
              >
                <div className="flex items-center gap-2 text-zinc-200 text-[11px]">
                  <FileCode className={`w-3.5 h-3.5 ${currentFile.iconColor}`} />
                  <span className="font-medium text-cyan-200">{currentFile.name}</span>
                  <span className="text-zinc-500 text-[10px]">({currentFile.size})</span>
                </div>
                <span className="text-[10px] font-sans text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80 group-hover/drop:bg-cyan-900 transition-colors">
                  {isDropped ? '✓ Path Injected' : 'Seret ke Shell'}
                </span>
              </div>

              {/* Terminal Target Shell Output */}
              <div className="p-2.5 rounded-lg bg-[#0c0e12] border border-white/10 text-[11px] space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-1 border-b border-white/5">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Terminal className="w-3 h-3 text-[#00d2d3]" />
                    <span>backend-core / shell</span>
                  </div>
                  <span className="text-emerald-400 text-[9px]">0ms Clipboard Lag</span>
                </div>

                <div className="text-zinc-300 pt-0.5 overflow-x-auto whitespace-nowrap font-mono text-[11px] leading-relaxed">
                  <span className="text-purple-400 font-semibold">PS &gt;</span>{' '}
                  <span className="text-zinc-400">{currentFile.commandPrefix}</span>{' '}
                  {isDropped ? (
                    <span className="text-[#00d2d3] font-semibold bg-[#00d2d3]/15 px-1 py-0.5 rounded border border-[#00d2d3]/30">
                      "{currentFile.fullPath}"
                    </span>
                  ) : (
                    <span className="text-zinc-600 animate-pulse">[seret file ke sini...]</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 pt-0.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Clean OS Path Escaping • Zero Clipboard Pollution</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: Native ConPTY & POSIX Core (Col-Span 1)                           */}
          {/* ========================================================================= */}
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

          {/* ========================================================================= */}
          {/* CARD 4: Tailored for AI Agents (Col-Span 2)                               */}
          {/* ========================================================================= */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-950 p-3 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-blue-400 mb-1">
                    <span>Pane A (Your Dev Work)</span>
                    <span className="text-zinc-600">Active</span>
                  </div>
                  <p className="text-zinc-300">$ git diff HEAD~1</p>
                  <p className="text-emerald-400 text-[10px]">+ conpty_pipe_write(buf)</p>
                  <p className="text-rose-400 text-[10px]">- legacy_winpty_exec()</p>
                </div>
                <div className="rounded-lg bg-zinc-950 p-3 border border-emerald-800/50 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 mb-1">
                    <span>Pane B (Autonomous Agent)</span>
                    <span className="text-emerald-400 font-bold">Streaming</span>
                  </div>
                  <p className="text-zinc-400">[omp] Unit tests verified</p>
                  <p className="text-zinc-400">[omp] Commit message prepared</p>
                  <p className="text-cyan-300 font-medium">Ready for git push review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
