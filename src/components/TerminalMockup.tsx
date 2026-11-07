import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Plus,
  Minus,
  Square,
  X,
  PanelLeft,
  Search,
  Settings,
  Folder,
  Terminal,
  Maximize2,
  Columns,
  Rows,
  Check,
  Play,
  Pause,
  RotateCcw,
  MousePointer,
  Zap
} from 'lucide-react';

export const TerminalMockup: React.FC = () => {
  // Motion loop state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'kingsley' | 'sesitanya'>('kingsley');
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');

  // Interactive vs Auto Split Position
  const [splitPos, setSplitPos] = useState<number>(50); // percentage
  const [isUserDragging, setIsUserDragging] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  // Dynamic animated content
  const [typedText, setTypedText] = useState<string>('git status --short');
  const [showStatusOutput, setShowStatusOutput] = useState<boolean>(true);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    'Gemini-3.8-flash agent pipe active.',
    '$ omp --help',
    'Autonomous CLI companion connected to Kingsley ConPTY.'
  ]);
  const [virtualCursor, setVirtualCursor] = useState<{
    x: number;
    y: number;
    visible: boolean;
    clicking: boolean;
  }>({ x: 500, y: 220, visible: false, clicking: false });

  const containerRef = useRef<HTMLDivElement>(null);
  const idleResumeTimerRef = useRef<number | undefined>(undefined);

  // FAST CONTINUOUS MOTION ENGINE (4.5s loop, non-stop)
  useEffect(() => {
    if (!isPlaying || userInteracted) return;

    const baseDuration = 4500;
    const duration = baseDuration / speedMultiplier;
    const startTime = Date.now();

    const frameInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % duration;
      const normalizedTime = (elapsed / duration) * baseDuration;

      // PHASE 1: 0ms - 1300ms (Rapid Keystroke Typing in Left Pane)
      if (normalizedTime < 1300) {
        setActivePane('left');
        setVirtualCursor({ x: 380, y: 310, visible: true, clicking: false });

        const cmd = 'git status --short';
        const typeProgress = Math.min(Math.floor((normalizedTime / 800) * cmd.length), cmd.length);
        setTypedText(cmd.slice(0, typeProgress));
        setShowStatusOutput(normalizedTime > 850);
      }
      // PHASE 2: 1300ms - 3000ms (Rapid Fluid Split Divider Drag)
      else if (normalizedTime >= 1300 && normalizedTime < 3000) {
        const dragProgress = (normalizedTime - 1300) / 1700; // 0 to 1
        // Dynamic sine wave: 50% -> 34% -> 66% -> 50%
        const offset = Math.sin(dragProgress * Math.PI * 2) * 16;
        const currentSplit = 50 + offset;
        setSplitPos(currentSplit);

        // Position virtual cursor grabbing divider
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const sidebarWidth = isSidebarOpen ? 180 : 0;
          const dividerX = sidebarWidth + ((rect.width - sidebarWidth) * currentSplit) / 100;
          setVirtualCursor({ x: dividerX, y: 220, visible: true, clicking: true });
        }
      }
      // PHASE 3: 3000ms - 4200ms (Fast AI Agent Output Cascade in Right Pane)
      else if (normalizedTime >= 3000 && normalizedTime < 4200) {
        setActivePane('right');
        setVirtualCursor({ x: 740, y: 240, visible: true, clicking: false });

        const agentPhase = normalizedTime - 3000;
        if (agentPhase < 400) {
          setAgentLogs([
            'Gemini-3.8-flash agent pipe active.',
            '$ omp --help',
            'Autonomous CLI companion connected to Kingsley ConPTY.'
          ]);
        } else if (agentPhase >= 400 && agentPhase < 800) {
          setAgentLogs([
            'Gemini-3.8-flash agent pipe active.',
            '$ omp analyze-diff --conpty',
            'Streaming live AST analysis (0.18ms latency)...'
          ]);
        } else {
          setAgentLogs([
            'Gemini-3.8-flash agent pipe active.',
            '$ omp analyze-diff --conpty',
            'Streaming live AST analysis (0.18ms latency)...',
            '✓ [high] Gemini 3.5 Flash Lite: 0.18ms verified. Ready.'
          ]);
        }
      }
      // PHASE 4: 4200ms - 4500ms (Smooth seamless loop reset)
      else {
        setSplitPos(50);
        setVirtualCursor({ x: 500, y: 220, visible: false, clicking: false });
      }
    }, 25);

    return () => clearInterval(frameInterval);
  }, [isPlaying, userInteracted, isSidebarOpen, speedMultiplier]);

  // Handle User Manual Interaction (pauses auto-motion, allows manual drag)
  const handleUserTouch = () => {
    setUserInteracted(true);
    clearTimeout(idleResumeTimerRef.current);
    // Resume auto-motion after 5 seconds of inactivity
    idleResumeTimerRef.current = window.setTimeout(() => {
      setUserInteracted(false);
    }, 5000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleUserTouch();
    setIsUserDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isUserDragging || !containerRef.current) return;
      handleUserTouch();
      const rect = containerRef.current.getBoundingClientRect();
      const sidebarWidth = isSidebarOpen ? 180 : 0;
      const rawX = e.clientX - rect.left - sidebarWidth;
      const availableWidth = rect.width - sidebarWidth;
      const percentage = (rawX / availableWidth) * 100;
      setSplitPos(Math.min(Math.max(percentage, 25), 75));
    },
    [isUserDragging, isSidebarOpen]
  );

  const handleMouseUp = useCallback(() => {
    setIsUserDragging(false);
  }, []);

  useEffect(() => {
    if (isUserDragging) {
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
  }, [isUserDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-600/15 to-indigo-600/20 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />

      {/* Control & Live Speed Status Bar */}
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {/* Live Continuous Loop Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying && !userInteracted
                  ? 'bg-cyan-400 animate-ping'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-zinc-200 font-medium">
              {isPlaying && !userInteracted
                ? '⚡ Continuous Motion Engine (Non-Stop Loop)'
                : 'Interactive Mode (User Override)'}
            </span>
          </div>

          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              setUserInteracted(false);
            }}
            title={isPlaying ? 'Pause Motion' : 'Play Motion'}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {isPlaying && !userInteracted ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Speed Toggle (1x vs 1.5x Fast) */}
          <button
            onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 1.5 : 1)}
            title="Toggle Motion Speed"
            className={`px-2 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1 transition-colors ${
              speedMultiplier === 1.5
                ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>{speedMultiplier === 1.5 ? '1.5x Ultra-Fast' : '1x Fast'}</span>
          </button>

          <button
            onClick={() => {
              setUserInteracted(false);
              setSplitPos(50);
              setAgentLogs([
                'Gemini-3.8-flash agent pipe active.',
                '$ omp --help',
                'Autonomous CLI companion connected to Kingsley ConPTY.'
              ]);
            }}
            title="Reset to 50/50 Split"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <span className="text-cyan-400">Live Split:</span>
          <span className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-200 font-semibold">
            {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
          </span>
        </div>
      </div>

      {/* Main Authentic Kingsley Window */}
      <div
        ref={containerRef}
        onMouseEnter={() => handleUserTouch()}
        className="relative rounded-xl border border-zinc-800 bg-[#0c0e12] shadow-2xl shadow-black overflow-hidden select-none font-mono text-xs"
      >
        {/* ========================================================================= */}
        {/* AUTHENTIC KINGSLEY TITLEBAR                                               */}
        {/* ========================================================================= */}
        <div className="h-9 bg-[#12161f] border-b border-zinc-800/80 px-3 flex items-center justify-between text-zinc-400 text-[11px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleUserTouch();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              title="Toggle Sidebar"
              className="p-1 hover:text-zinc-200 hover:bg-zinc-800/60 rounded transition-colors"
            >
              <PanelLeft className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {/* Tabs */}
            <div className="flex items-center gap-1">
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('kingsley');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors text-[11px] ${
                  activeTab === 'kingsley'
                    ? 'bg-[#1a202c] text-zinc-100 border-b-2 border-cyan-400 font-medium'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>Kingsley 1</span>
                <X className="w-3 h-3 text-zinc-600 hover:text-zinc-400 ml-1" />
              </div>
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('sesitanya');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors text-[11px] ${
                  activeTab === 'sesitanya'
                    ? 'bg-[#1a202c] text-zinc-100 border-b-2 border-cyan-400 font-medium'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Folder className="w-3 h-3 text-amber-400" />
                <span>terminal 2</span>
                <X className="w-3 h-3 text-zinc-600 hover:text-zinc-400 ml-1" />
              </div>
              <span className="p-1 text-zinc-500 hover:text-zinc-300 cursor-pointer">
                <Plus className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Search Bar / Command Palette */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-[#090b0e] border border-zinc-800/80 text-[10px] text-zinc-500">
            <Search className="w-3 h-3" />
            <span>Search projects, commands, terminals... Ctrl+K</span>
          </div>

          {/* System Telemetry & Caption Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1a202c] text-zinc-400 text-[10px]">
              Default
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-[10px]">
              5%
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-300 border border-blue-800/50 text-[10px]">
              2224 MB
            </span>
            <div className="flex items-center gap-2 text-zinc-500 pl-2">
              <Minus className="w-3 h-3" />
              <Square className="w-3 h-3" />
              <X className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* APP BODY: SIDEBAR + SPLIT WORKSPACE                                       */}
        {/* ========================================================================= */}
        <div className="flex h-[430px] w-full overflow-hidden bg-[#0c0e12] relative">
          {/* Authentic Kingsley Left Sidebar */}
          {isSidebarOpen && (
            <div className="w-44 bg-[#12161f] border-r border-zinc-800 flex flex-col justify-between p-3 select-none shrink-0 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 tracking-wider">
                  <span>PROJECTS</span>
                  <Plus className="w-3 h-3 text-zinc-500 hover:text-zinc-200 cursor-pointer" />
                </div>

                {/* Projects Tree */}
                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex items-center gap-1.5 text-zinc-300 py-0.5">
                      <Folder className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-medium">Sesi tanya</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-zinc-400 text-[10px]">
                      <Terminal className="w-3 h-3 text-zinc-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-zinc-300 py-0.5">
                      <Folder className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-medium">Maybee</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-zinc-400 text-[10px]">
                      <Terminal className="w-3 h-3 text-zinc-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-cyan-300 py-0.5">
                      <Folder className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-medium">Kingsley</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-cyan-400 text-[10px] bg-cyan-950/40 rounded px-1.5 border border-cyan-800/40 font-semibold">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>opencode</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer: Jopal Operator Profile */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                    J
                  </div>
                  <div>
                    <p className="text-zinc-200 font-bold text-[10px] leading-tight">Jopal</p>
                    <p className="text-zinc-500 text-[9px] leading-tight">local account</p>
                  </div>
                </div>
                <Settings className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
              </div>
            </div>
          )}

          {/* Split Workspace */}
          <div className="flex-1 flex overflow-hidden bg-[#0c0e12] relative">
            {/* LEFT PANE: Code Viewer + Interactive Shell */}
            <div
              onClick={() => {
                handleUserTouch();
                setActivePane('left');
              }}
              style={{ width: `${splitPos}%` }}
              className={`h-full flex flex-col justify-between border-r border-zinc-800/80 transition-colors ${
                activePane === 'left' ? 'bg-[#10131a]' : 'bg-[#0c0e12]'
              }`}
            >
              {/* PaneHeader */}
              <div className="h-7 bg-[#141924] border-b border-zinc-800 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="font-bold text-zinc-200">Kingsley</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-cyan-300 font-medium">opencode</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Columns className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                  <X className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                </div>
              </div>

              {/* Code Viewer Preview (Top Half) */}
              <div className="p-3 bg-[#0c0e12] border-b border-zinc-800/60 font-mono text-[10px] text-zinc-300 space-y-0.5 overflow-hidden">
                <p className="text-zinc-500">// Kingsley Fluid Split ConPTY Engine</p>
                <p>
                  <span className="text-cyan-400">const</span> primary = screen.
                  <span className="text-amber-300">getPrimaryDisplay</span>()
                </p>
                <p>
                  <span className="text-cyan-400">const</span> scale = primary.scaleFactor ||{' '}
                  <span className="text-purple-400">1</span>
                </p>
                <p>
                  <span className="text-cyan-400">const</span> sources ={' '}
                  <span className="text-cyan-400">await</span> desktopCapturer.
                  <span className="text-amber-300">getSources</span>({'{'} types: ['screen'] {'}'})
                </p>
              </div>

              {/* Terminal Area (Bottom Half with Fast Keystrokes) */}
              <div className="p-3 flex-1 overflow-y-auto space-y-1 text-[11px] font-mono text-zinc-300 bg-[#10131a]">
                <p className="text-zinc-400">
                  <span className="text-emerald-400">kingsley</span>
                  <span className="text-zinc-500">:</span>
                  <span className="text-cyan-400">~/app</span>
                  <span className="text-zinc-500"> (main)</span>
                </p>
                <p className="text-zinc-200">
                  $ {typedText}
                  <span className="w-2 h-3.5 inline-block bg-cyan-400 ml-1 animate-pulse align-middle" />
                </p>
                {showStatusOutput && (
                  <div className="space-y-0.5 text-[10px] pt-1">
                    <p className="text-emerald-400 font-semibold"> M src/multiplexer/conpty.rs</p>
                    <p className="text-emerald-400 font-semibold"> M src/ui/ResizeHandle.tsx</p>
                    <p className="text-zinc-400 font-mono">✓ ConPTY stream active (0.18ms latency)</p>
                  </div>
                )}
              </div>

              {/* Pane Footer Action Bar */}
              <div className="h-7 bg-[#141924] border-t border-zinc-800/60 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ConPTY Pipe Ready (0.18ms)
                </span>
                <span className="text-zinc-500">DeepSeek V4.1 • OpenCode</span>
              </div>
            </div>

            {/* Draggable Divider (ResizeHandle) with Live Animated Movement */}
            <div
              onMouseDown={handleMouseDown}
              className={`w-1.5 h-full cursor-col-resize flex items-center justify-center transition-all z-20 ${
                isUserDragging || (isPlaying && !userInteracted)
                  ? 'bg-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.9)]'
                  : 'bg-zinc-800 hover:bg-cyan-500/80'
              }`}
              title="Drag divider horizontally to resize"
            >
              <div className="w-0.5 h-4 bg-zinc-900 rounded pointer-events-none" />
            </div>

            {/* RIGHT PANE: Sesi tanya shell with omp agent */}
            <div
              onClick={() => {
                handleUserTouch();
                setActivePane('right');
              }}
              style={{ width: `${100 - splitPos}%` }}
              className={`h-full flex flex-col justify-between transition-colors ${
                activePane === 'right' ? 'bg-[#10131a]' : 'bg-[#0c0e12]'
              }`}
            >
              {/* PaneHeader */}
              <div className="h-7 bg-[#141924] border-b border-zinc-800 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-zinc-200">Sesi tanya</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-emerald-300 font-medium">shell (omp)</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Columns className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                  <X className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                </div>
              </div>

              {/* Fast Streaming AI Logs */}
              <div className="p-3 flex-1 overflow-y-auto space-y-1.5 text-[11px] font-mono text-zinc-300 bg-[#0c0e12]">
                {agentLogs.map((log, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      log.startsWith('✓')
                        ? 'text-cyan-300 font-semibold'
                        : log.startsWith('$')
                        ? 'text-zinc-200'
                        : 'text-zinc-400'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>

              {/* Pane Footer Action Bar */}
              <div className="h-7 bg-[#141924] border-t border-zinc-800/60 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-cyan-300 font-mono text-[10px] font-medium">
                  Split: {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
                </span>
                <span className="text-zinc-500 font-mono text-[9px]">[high] Gemini 3.5</span>
              </div>
            </div>

            {/* Virtual Simulated Mouse Cursor Animation (Showcases Kingsley's Fluid Drag) */}
            {virtualCursor.visible && isPlaying && !userInteracted && (
              <div
                style={{
                  left: `${virtualCursor.x}px`,
                  top: `${virtualCursor.y}px`
                }}
                className="pointer-events-none absolute z-30 transition-all duration-75 ease-out"
              >
                <div className="relative">
                  <MousePointer
                    className={`w-4 h-4 text-white drop-shadow-md transition-transform ${
                      virtualCursor.clicking ? 'scale-90 text-cyan-300' : 'scale-100'
                    }`}
                  />
                  {virtualCursor.clicking && (
                    <span className="absolute -top-5 left-4 px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 whitespace-nowrap shadow-md">
                      Fluid Resize Drag
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AUTHENTIC KINGSLEY STATUSBAR                                              */}
        {/* ========================================================================= */}
        <div className="h-6 bg-[#090b0e] border-t border-zinc-800 px-3 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3 h-3" /> ConPTY IPC Connected (0.18ms)
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400">1 shell • 111.2K (56%) ctrl+p commands</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">[high] Gemini 3.5 Flash Lite</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-500">v1.0.0 Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
