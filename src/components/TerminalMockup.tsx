import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Plus,
  Minus,
  Square,
  X,
  PanelLeft,
  Search,
  Settings,
  Folder,
  Terminal as TerminalIcon,
  Maximize2,
  Columns,
  Rows,
  Check,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Camera
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
  const [isAutoDragging, setIsAutoDragging] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  // Dynamic animated content
  const [typedText, setTypedText] = useState<string>('git status --short');
  const [showStatusOutput, setShowStatusOutput] = useState<boolean>(true);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    'Gemini-3.8-flash agent pipe active.',
    '$ omp --help',
    'Autonomous CLI companion connected to Kingsley ConPTY.'
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const idleResumeTimerRef = useRef<number | undefined>(undefined);

  // AUTHENTIC KINGSLEY RAPID CONTINUOUS MOTION ENGINE (4.0s non-stop loop)
  useEffect(() => {
    if (!isPlaying || userInteracted) {
      setIsAutoDragging(false);
      return;
    }

    const baseDuration = 4200;
    const duration = baseDuration / speedMultiplier;
    const startTime = Date.now();

    const frameInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % duration;
      const normalizedTime = (elapsed / duration) * baseDuration;

      // PHASE 1: 0ms - 1100ms (Left Pane Focused & Typing)
      if (normalizedTime < 1100) {
        setIsAutoDragging(false);
        setActivePane('left');

        const cmd = 'git status --short';
        const typeProgress = Math.min(Math.floor((normalizedTime / 700) * cmd.length), cmd.length);
        setTypedText(cmd.slice(0, typeProgress));
        setShowStatusOutput(normalizedTime > 750);
      }
      // PHASE 2: 1100ms - 2700ms (Authentic ResizeHandle Fluid Drag Animation)
      else if (normalizedTime >= 1100 && normalizedTime < 2700) {
        setIsAutoDragging(true);
        const dragProgress = (normalizedTime - 1100) / 1600; // 0 to 1
        // Smooth sine wave: 50% -> 35% -> 65% -> 50%
        const offset = Math.sin(dragProgress * Math.PI * 2) * 15;
        const currentSplit = 50 + offset;
        setSplitPos(currentSplit);
      }
      // PHASE 3: 2700ms - 3900ms (Right Pane Focus & Live Agent Output Stream)
      else if (normalizedTime >= 2700 && normalizedTime < 3900) {
        setIsAutoDragging(false);
        setActivePane('right');

        const agentPhase = normalizedTime - 2700;
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
      // PHASE 4: 3900ms - 4200ms (Instant seamless reset into next loop)
      else {
        setIsAutoDragging(false);
        setSplitPos(50);
      }
    }, 20);

    return () => clearInterval(frameInterval);
  }, [isPlaying, userInteracted, isSidebarOpen, speedMultiplier]);

  // User manual interaction handling
  const handleUserTouch = () => {
    setUserInteracted(true);
    clearTimeout(idleResumeTimerRef.current);
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

  const isDraggingActive = isUserDragging || isAutoDragging;

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#00d2d3]/20 via-blue-600/15 to-cyan-500/20 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />

      {/* Control & Live Speed Status Bar */}
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {/* Live Continuous Loop Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#12161f] border border-white/10 text-xs font-mono shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying && !userInteracted
                  ? 'bg-[#00d2d3] animate-ping'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-200 font-medium">
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
            className="p-1.5 rounded-lg bg-[#12161f] hover:bg-[#1a202c] border border-white/10 text-slate-400 hover:text-white transition-colors"
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
                ? 'bg-cyan-950/80 text-[#00d2d3] border-cyan-700/60'
                : 'bg-[#12161f] text-slate-400 border-white/10 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3 h-3 text-[#00d2d3]" />
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
            className="p-1.5 rounded-lg bg-[#12161f] hover:bg-[#1a202c] border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="text-[#00d2d3]">Live Split:</span>
          <span className="bg-[#12161f] px-2 py-0.5 rounded border border-white/10 text-slate-200 font-semibold">
            {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
          </span>
        </div>
      </div>

      {/* Main Authentic Kingsley Window */}
      <div
        ref={containerRef}
        onMouseEnter={() => handleUserTouch()}
        className="relative rounded-xl border border-white/10 bg-[#0c0e12] shadow-2xl shadow-black overflow-hidden select-none font-mono text-xs"
      >
        {/* ========================================================================= */}
        {/* AUTHENTIC KINGSLEY TITLEBAR (from TitleBar.tsx)                            */}
        {/* ========================================================================= */}
        <div className="h-9 bg-[#12161f] border-b border-white/10 px-3 flex items-center justify-between text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleUserTouch();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              title="Toggle Sidebar"
              className="p-1 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <PanelLeft className="w-3.5 h-3.5 text-[#00d2d3]" />
            </button>

            {/* Tabs matching TitleBar.tsx */}
            <div className="flex items-center gap-1">
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('kingsley');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors text-[11px] ${
                  activeTab === 'kingsley'
                    ? 'bg-[#1a202c] text-white border-b-2 border-[#00d2d3] font-medium'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <TerminalIcon className="w-3 h-3 text-[#00d2d3]" />
                <span>Kingsley 1</span>
                <X className="w-3 h-3 text-slate-600 hover:text-slate-400 ml-1" />
              </div>
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('sesitanya');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors text-[11px] ${
                  activeTab === 'sesitanya'
                    ? 'bg-[#1a202c] text-white border-b-2 border-[#00d2d3] font-medium'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Folder className="w-3 h-3 text-amber-400" />
                <span>terminal 2</span>
                <X className="w-3 h-3 text-slate-600 hover:text-slate-400 ml-1" />
              </div>
              <span className="p-1 text-slate-500 hover:text-slate-300 cursor-pointer">
                <Plus className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Search Bar / Command Palette */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-[#090b0e] border border-white/5 text-[10px] text-slate-500">
            <Search className="w-3 h-3" />
            <span>Search projects, commands, terminals... Ctrl+K</span>
          </div>

          {/* System Telemetry & Caption Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1a202c] text-slate-400 text-[10px]">
              Default
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-[10px]">
              5%
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-300 border border-blue-800/50 text-[10px]">
              2224 MB
            </span>
            <div className="flex items-center gap-2 text-slate-500 pl-2">
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
          {/* Authentic Kingsley Left Sidebar (from Sidebar.tsx) */}
          {isSidebarOpen && (
            <div className="w-44 bg-[#12161f] border-r border-white/10 flex flex-col justify-between p-3 select-none shrink-0 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider">
                  <span>PROJECTS</span>
                  <Plus className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer" />
                </div>

                {/* Projects Tree */}
                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-300 py-0.5">
                      <Folder className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-medium">Sesi tanya</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-slate-400 text-[10px]">
                      <TerminalIcon className="w-3 h-3 text-slate-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-slate-300 py-0.5">
                      <Folder className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-medium">Maybee</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-slate-400 text-[10px]">
                      <TerminalIcon className="w-3 h-3 text-slate-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[#00d2d3] py-0.5">
                      <Folder className="w-3.5 h-3.5 text-[#00d2d3]" />
                      <span className="font-medium">Kingsley</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-[#00d2d3] text-[10px] bg-cyan-950/40 rounded px-1.5 border border-cyan-800/40 font-semibold">
                      <TerminalIcon className="w-3 h-3 text-[#00d2d3]" />
                      <span>opencode</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer: Jopal Operator Profile (OperatorCard.tsx) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00d2d3] to-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                    J
                  </div>
                  <div>
                    <p className="text-slate-200 font-bold text-[10px] leading-tight">Jopal</p>
                    <p className="text-slate-500 text-[9px] leading-tight">local account</p>
                  </div>
                </div>
                <Settings className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
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
              className={`h-full flex flex-col justify-between transition-all duration-150 relative ${
                activePane === 'left'
                  ? 'bg-[#12161f] shadow-[inset_0_0_12px_rgba(0,210,211,0.08)]'
                  : 'bg-[#0c0e12]'
              }`}
            >
              {/* PaneHeader (matching PaneHeader.tsx) */}
              <div
                className={`h-7 px-2.5 flex items-center justify-between text-xs select-none border-b transition-colors duration-150 font-mono ${
                  activePane === 'left'
                    ? 'bg-[#1a202c] text-white border-white/10'
                    : 'bg-[#12161f] text-slate-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 overflow-hidden whitespace-nowrap">
                  {/* Active Pulse Dot from PaneHeader.tsx */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePane === 'left'
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-neutral-500'
                    }`}
                  />
                  <TerminalIcon className="w-3.5 h-3.5 text-[#00a8ff] shrink-0" />
                  <span className="font-bold text-slate-200 truncate">Kingsley</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-[#00d2d3] font-medium truncate">opencode</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
                  <Camera className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Columns className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Code Viewer Preview (Top Half) */}
              <div className="p-3 bg-[#0c0e12] border-b border-white/5 font-mono text-[10px] text-slate-300 space-y-0.5 overflow-hidden">
                <p className="text-slate-500">// Kingsley Fluid Split ConPTY Engine</p>
                <p>
                  <span className="text-[#00d2d3]">const</span> primary = screen.
                  <span className="text-amber-300">getPrimaryDisplay</span>()
                </p>
                <p>
                  <span className="text-[#00d2d3]">const</span> scale = primary.scaleFactor ||{' '}
                  <span className="text-purple-400">1</span>
                </p>
                <p>
                  <span className="text-[#00d2d3]">const</span> sources ={' '}
                  <span className="text-[#00d2d3]">await</span> desktopCapturer.
                  <span className="text-amber-300">getSources</span>({'{'} types: ['screen'] {'}'})
                </p>
              </div>

              {/* Terminal Area (Bottom Half with Fast Keystrokes) */}
              <div className="p-3 flex-1 overflow-y-auto space-y-1 text-[11px] font-mono text-slate-300 bg-[#10131a]">
                <p className="text-slate-400">
                  <span className="text-emerald-400">kingsley</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-[#00d2d3]">~/app</span>
                  <span className="text-slate-500"> (main)</span>
                </p>
                <p className="text-slate-200">
                  $ {typedText}
                  <span className="w-2 h-3.5 inline-block bg-[#00d2d3] ml-1 animate-pulse align-middle" />
                </p>
                {showStatusOutput && (
                  <div className="space-y-0.5 text-[10px] pt-1">
                    <p className="text-emerald-400 font-semibold"> M src/multiplexer/conpty.rs</p>
                    <p className="text-emerald-400 font-semibold"> M src/ui/ResizeHandle.tsx</p>
                    <p className="text-slate-400 font-mono">✓ ConPTY stream active (0.18ms latency)</p>
                  </div>
                )}
              </div>

              {/* Pane Footer Action Bar */}
              <div className="h-7 bg-[#141924] border-t border-white/5 px-3 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ConPTY Pipe Ready (0.18ms)
                </span>
                <span className="text-slate-500">DeepSeek V4.1 • OpenCode</span>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* EXACT RESIZEHANDLE COMPONENT FROM KINGSLEY (ResizeHandle.tsx)         */}
            {/* ===================================================================== */}
            <div
              onMouseDown={handleMouseDown}
              role="separator"
              aria-orientation="vertical"
              className={`relative z-40 group flex items-center justify-center select-none shrink-0 transition-all w-3 h-full cursor-col-resize -mx-1.5 ${
                isDraggingActive ? 'z-50' : ''
              }`}
              title="Resize split panes"
            >
              {/* Hairline 1px border track */}
              <div
                className={`transition-all duration-150 relative flex items-center justify-center w-[1px] h-full ${
                  isDraggingActive
                    ? 'opacity-100 shadow-[0_0_10px_rgba(0,210,211,0.85)]'
                    : 'opacity-35 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(0,210,211,0.6)]'
                }`}
                style={{
                  backgroundColor: '#00d2d3',
                }}
              >
                {/* Subtle micro grip pill for visual affordance (8px high) */}
                <div
                  className={`absolute rounded-full transition-all duration-150 w-1.5 h-8 ${
                    isDraggingActive
                      ? 'opacity-100 scale-100 shadow-[0_0_12px_rgba(0,210,211,1)]'
                      : 'opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75'
                  }`}
                  style={{
                    backgroundColor: '#00d2d3',
                  }}
                />
              </div>
            </div>

            {/* RIGHT PANE: Sesi tanya shell with omp agent */}
            <div
              onClick={() => {
                handleUserTouch();
                setActivePane('right');
              }}
              style={{ width: `${100 - splitPos}%` }}
              className={`h-full flex flex-col justify-between transition-all duration-150 relative ${
                activePane === 'right'
                  ? 'bg-[#12161f] shadow-[inset_0_0_12px_rgba(0,210,211,0.08)]'
                  : 'bg-[#0c0e12]'
              }`}
            >
              {/* PaneHeader (matching PaneHeader.tsx) */}
              <div
                className={`h-7 px-2.5 flex items-center justify-between text-xs select-none border-b transition-colors duration-150 font-mono ${
                  activePane === 'right'
                    ? 'bg-[#1a202c] text-white border-white/10'
                    : 'bg-[#12161f] text-slate-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 overflow-hidden whitespace-nowrap">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePane === 'right'
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-neutral-500'
                    }`}
                  />
                  <TerminalIcon className="w-3.5 h-3.5 text-[#00a8ff] shrink-0" />
                  <span className="font-bold text-slate-200 truncate">Sesi tanya</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-emerald-300 font-medium truncate">shell (omp)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
                  <Camera className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Columns className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Fast Streaming AI Logs */}
              <div className="p-3 flex-1 overflow-y-auto space-y-1.5 text-[11px] font-mono text-slate-300 bg-[#0c0e12]">
                {agentLogs.map((log, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      log.startsWith('✓')
                        ? 'text-[#00d2d3] font-semibold'
                        : log.startsWith('$')
                        ? 'text-slate-200'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>

              {/* Pane Footer Action Bar */}
              <div className="h-7 bg-[#141924] border-t border-white/5 px-3 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-[#00d2d3] font-mono text-[10px] font-medium">
                  Split: {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
                </span>
                <span className="text-slate-500 font-mono text-[9px]">[high] Gemini 3.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AUTHENTIC KINGSLEY STATUSBAR (StatusBar.tsx)                               */}
        {/* ========================================================================= */}
        <div className="h-6 bg-[#090b0e] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3 h-3" /> ConPTY IPC Connected (0.18ms)
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">1 shell • 111.2K (56%) ctrl+p commands</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00d2d3]">[high] Gemini 3.5 Flash Lite</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500">v1.0.0 Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
