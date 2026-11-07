import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Sparkles, Check, GripVertical, Plus, Maximize2, RefreshCw } from 'lucide-react';

export const TerminalMockup: React.FC = () => {
  const [splitPos, setSplitPos] = useState<number>(52); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');
  const [benchmarkRunning, setBenchmarkRunning] = useState<boolean>(false);
  const [benchmarkLog, setBenchmarkLog] = useState<string[]>([]);
  const [typedPath, setTypedPath] = useState<string>('');
  const [pathAdded, setPathAdded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const percentage = (rawX / rect.width) * 100;
      // Clamp between 25% and 75%
      const clamped = Math.min(Math.max(percentage, 25), 75);
      setSplitPos(clamped);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleSimulateDragPath = () => {
    setPathAdded(true);
    setTypedPath(' D:/projects/api/server.ts');
    setTimeout(() => setPathAdded(false), 2000);
  };

  const runLatencyBenchmark = () => {
    if (benchmarkRunning) return;
    setBenchmarkRunning(true);
    setBenchmarkLog([]);
    const logs = [
      '[benchmark] Initializing ConPTY IPC probe...',
      '[benchmark] Pipe write: 64KB buffer -> ack: 0.18ms',
      '[benchmark] ANSI 24-bit TrueColor stream: 120 FPS stable',
      '[benchmark] Result: Zero input stutter detected (0.21ms avg)',
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setBenchmarkLog((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setBenchmarkRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-indigo-600/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

      {/* Main Terminal Shell Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl border border-zinc-800 bg-[#0c0c10] shadow-2xl shadow-black overflow-hidden select-none font-mono text-xs"
      >
        {/* Terminal Window Header Bar */}
        <div className="h-10 bg-zinc-900/90 border-b border-zinc-800/80 px-4 flex items-center justify-between">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40" />
            <span className="ml-3 text-zinc-400 font-medium text-[11px] hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              kingsley: split-session-01 (ConPTY)
            </span>
          </div>

          {/* Interactive Hint Indicator */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-blue-950/60 text-blue-300 border border-blue-800/50">
              <GripVertical className="w-3 h-3 text-blue-400" />
              Drag divider to test split
            </span>
            <div className="flex items-center gap-1 text-zinc-500">
              <button
                onClick={() => setSplitPos(50)}
                title="Reset split 50/50"
                className="p-1 hover:text-zinc-200 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
              <span className="p-1 text-zinc-600">
                <Plus className="w-3 h-3" />
              </span>
              <span className="p-1 text-zinc-600">
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Dual Split Panes Body */}
        <div className="relative flex flex-col md:flex-row h-[360px] md:h-[400px] w-full bg-[#09090d]">
          {/* LEFT PANE: Core Shell */}
          <div
            onClick={() => setActivePane('left')}
            style={{ width: `${splitPos}%` }}
            className={`h-full overflow-hidden p-4 flex flex-col justify-between transition-colors cursor-text ${
              activePane === 'left' ? 'bg-[#0b0b10]' : 'bg-[#08080c]/60'
            }`}
          >
            <div className="space-y-2 text-zinc-300">
              {/* Header inside pane */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/50 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="text-blue-400">#1</span> pwsh (ConPTY Active)
                </span>
                <span className="text-[10px] text-zinc-600">PID 14208</span>
              </div>

              {/* Shell Commands & Output */}
              <div className="space-y-1">
                <p className="text-zinc-400">
                  <span className="text-emerald-400">kingsley</span>
                  <span className="text-zinc-500">@</span>
                  <span className="text-blue-400">machine</span>
                  <span className="text-zinc-500">:</span>
                  <span className="text-zinc-300">~/app</span>
                  <span className="text-zinc-500"> (main)</span>
                </p>
                <p className="text-zinc-200">$ git status --short</p>
                <p className="text-emerald-400"> M src/multiplexer/conpty.rs</p>
                <p className="text-emerald-400"> M src/ui/divider.tsx</p>
                <p className="text-zinc-500">?? release/v1.0.0/Kingsley.exe</p>
              </div>

              <div className="pt-2 space-y-1">
                <p className="text-zinc-200">$ kingsley-bench --fast</p>
                <p className="text-zinc-400">✓ ConPTY I/O latency: <span className="text-emerald-400">0.24ms</span></p>
                <p className="text-zinc-400">✓ Resizable divider state: <span className="text-blue-400">{Math.round(splitPos)}% / {100 - Math.round(splitPos)}%</span></p>
              </div>

              {/* Interactive Path Drag Demonstration */}
              <div className="pt-3">
                <p className="text-zinc-400">
                  <span className="text-blue-400">❯</span> cat{typedPath}
                  <span className="w-2 h-3.5 inline-block bg-blue-400 ml-1 animate-pulse align-middle" />
                </p>
                {pathAdded && (
                  <span className="inline-block mt-1 text-[10px] text-emerald-400 font-sans">
                    ✓ Clean path injected without quotes or clipboard corruption!
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Pane Action Pill */}
            <div className="pt-2 flex items-center justify-between border-t border-zinc-800/40 text-[10px] text-zinc-500">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSimulateDragPath();
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 transition-colors"
              >
                <Plus className="w-3 h-3 text-blue-400" />
                <span>Simulate Drag & Drop Path</span>
              </button>
              <span className="hidden sm:inline font-mono text-zinc-600">UTF-8 | 24-bit TrueColor</span>
            </div>
          </div>

          {/* DRAGGABLE VERTICAL DIVIDER */}
          <div
            onMouseDown={handleMouseDown}
            className={`relative w-2 md:w-1.5 h-full cursor-col-resize flex items-center justify-center transition-colors z-20 ${
              isDragging
                ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]'
                : 'bg-zinc-800 hover:bg-blue-500/70'
            }`}
            title="Click and drag horizontally to resize panes"
          >
            {/* Grab handle indicator */}
            <div className="hidden md:flex flex-col gap-1 py-1 px-0.5 rounded bg-zinc-900 border border-zinc-700 pointer-events-none">
              <div className="w-0.5 h-1 bg-zinc-400" />
              <div className="w-0.5 h-1 bg-zinc-400" />
              <div className="w-0.5 h-1 bg-zinc-400" />
            </div>
          </div>

          {/* RIGHT PANE: AI Flow & Background Process */}
          <div
            onClick={() => setActivePane('right')}
            style={{ width: `${100 - splitPos}%` }}
            className={`h-full overflow-hidden p-4 flex flex-col justify-between transition-colors cursor-text ${
              activePane === 'right' ? 'bg-[#0b0b10]' : 'bg-[#08080c]/60'
            }`}
          >
            <div className="space-y-2 text-zinc-300">
              {/* Header inside pane */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/50 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-zinc-200">#2 AI Agent Companion (omp)</span>
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Logs */}
              <div className="space-y-1">
                <p className="text-zinc-400">[agent] Connected to Kingsley multiplexer pipe</p>
                <p className="text-zinc-400">[agent] Monitoring compiler & test streams</p>
                <p className="text-emerald-400/90">✓ Zero latency buffer: ready</p>
                {benchmarkLog.map((log, i) => (
                  <p key={i} className="text-blue-300 font-mono text-[11px] animate-fadeIn">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Pane Benchmark Trigger */}
            <div className="pt-2 flex items-center justify-between border-t border-zinc-800/40 text-[10px] text-zinc-500">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  runLatencyBenchmark();
                }}
                disabled={benchmarkRunning}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-blue-300 transition-colors disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-blue-400" />
                <span>{benchmarkRunning ? 'Testing ConPTY...' : 'Test ConPTY Speed'}</span>
              </button>
              <span className="text-zinc-600 font-mono">
                Ratio: {Math.round(splitPos)}:{100 - Math.round(splitPos)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Bar at the very bottom */}
        <div className="h-6 bg-zinc-950 border-t border-zinc-800/80 px-3 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3 h-3" /> ConPTY IPC Connected
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-zinc-400">Resizable Panes: Active</span>
          </div>
          <div>
            <span className="text-zinc-400">v1.0.0 Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
