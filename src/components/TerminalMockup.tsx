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
  Camera,
  History,
  Grid
} from 'lucide-react';

export const TerminalMockup: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'kingsley' | 'backend-core' | 'ai-copilot'>('ai-copilot');
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');

  // Split position state matching Image #1: 39% left, 61% right
  const [splitPos, setSplitPos] = useState<number>(39);
  const [isUserDragging, setIsUserDragging] = useState<boolean>(false);
  const [isAutoDragging, setIsAutoDragging] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  // Dynamic animated content states
  const [typedCommand, setTypedCommand] = useState<string>('npm run build');
  const [showBuildOutput, setShowBuildOutput] = useState<boolean>(true);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    'ConPTY pseudoterminal session attached (pid: 14208)',
    '> Analyzing workspace components: 100% verified',
    '> ConPTY IPC pipeline active: 0.18ms latency',
    '> Auto-syncing live terminal states: READY'
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const idleResumeTimerRef = useRef<number | undefined>(undefined);

  // AESTHETIC CONTINUOUS MOTION ENGINE (Inspired by enowx.ai, orca, alethe: fluid 6000ms loop)
  useEffect(() => {
    if (userInteracted) {
      setIsAutoDragging(false);
      return;
    }

    const duration = 6000;
    const startTime = Date.now();

    const frameInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % duration;

      // PHASE 1: 0ms - 1800ms (Left Pane active, fast keystroke typing & build compilation)
      if (elapsed < 1800) {
        setIsAutoDragging(false);
        setActivePane('left');

        const cmd = 'npm run build';
        const typeProgress = Math.min(Math.floor((elapsed / 800) * cmd.length), cmd.length);
        setTypedCommand(cmd.slice(0, typeProgress));
        setShowBuildOutput(elapsed > 850);
        setSplitPos(39);
      }
      // PHASE 2: 1800ms - 3800ms (Fluid Resizable Divider Animation: 39% -> 52% -> 34% -> 39%)
      else if (elapsed >= 1800 && elapsed < 3800) {
        setIsAutoDragging(true);
        const dragProgress = (elapsed - 1800) / 2000;
        // Smooth sine wave offset
        const offset = Math.sin(dragProgress * Math.PI * 2) * 14;
        setSplitPos(39 + offset);
      }
      // PHASE 3: 3800ms - 5400ms (Right Pane AI Copilot Agent Stream & Live Synchronization)
      else if (elapsed >= 3800 && elapsed < 5400) {
        setIsAutoDragging(false);
        setActivePane('right');
        setSplitPos(39);

        const agentPhase = elapsed - 3800;
        if (agentPhase < 450) {
          setAgentLogs([
            'ConPTY pseudoterminal session attached (pid: 14208)',
            '> Analyzing workspace components: 100% verified'
          ]);
        } else if (agentPhase >= 450 && agentPhase < 900) {
          setAgentLogs([
            'ConPTY pseudoterminal session attached (pid: 14208)',
            '> Analyzing workspace components: 100% verified',
            '> ConPTY IPC pipeline active: 0.18ms latency'
          ]);
        } else {
          setAgentLogs([
            'ConPTY pseudoterminal session attached (pid: 14208)',
            '> Analyzing workspace components: 100% verified',
            '> ConPTY IPC pipeline active: 0.18ms latency',
            '> Auto-syncing live terminal states: READY'
          ]);
        }
      }
      // PHASE 4: 5400ms - 6000ms (Clean settling, ready for seamless loop restart)
      else {
        setIsAutoDragging(false);
        setSplitPos(39);
      }
    }, 25);

    return () => clearInterval(frameInterval);
  }, [userInteracted, isSidebarOpen]);

  // User manual interaction pause handler
  const handleUserTouch = () => {
    setUserInteracted(true);
    clearTimeout(idleResumeTimerRef.current);
    idleResumeTimerRef.current = window.setTimeout(() => {
      setUserInteracted(false);
    }, 5000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleUserTouch();
    e.preventDefault();
    setIsUserDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isUserDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sidebarWidth = isSidebarOpen ? 180 : 0;
      const effectiveWidth = rect.width - sidebarWidth;
      const offsetX = e.clientX - rect.left - sidebarWidth;
      const percentage = Math.min(Math.max((offsetX / effectiveWidth) * 100, 20), 80);
      setSplitPos(percentage);
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
      {/* Subtle Ambient Radial Glow matching Kingsley palette */}
      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#00d2d3]/20 via-blue-600/15 to-purple-600/20 blur-xl opacity-80 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Main Authentic Kingsley Window (100% matched to Image #1) */}
      <div
        ref={containerRef}
        onMouseEnter={() => handleUserTouch()}
        className="relative rounded-xl border border-white/10 bg-[#08090b] shadow-2xl shadow-black overflow-hidden select-none font-mono text-xs"
      >
        {/* ========================================================================= */}
        {/* 1. TOP TITLEBAR (Exact match to Image #1)                                  */}
        {/* ========================================================================= */}
        <div className="h-10 bg-[#0c0e14] border-b border-white/10 px-3 flex items-center justify-between text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            {/* Sidebar Toggle Icon Button */}
            <button
              onClick={() => {
                handleUserTouch();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              title="Toggle Sidebar"
              className="p-1 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <PanelLeft className="w-4 h-4 text-[#00f5d4]" />
            </button>

            {/* Titlebar Tabs (Matching Image #1) */}
            <div className="flex items-center gap-1.5">
              {/* Tab 1: Kingsley 1 */}
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('kingsley');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-colors text-[11px] ${
                  activeTab === 'kingsley'
                    ? 'bg-[#181d27] text-white border border-[#00f5d4]/60 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <img src="/kingsley-icon.png" alt="Kingsley" className="w-3.5 h-3.5 rounded object-contain" />
                <span>Kingsley 1</span>
                <X className="w-3 h-3 text-slate-500 hover:text-slate-300 ml-1" />
              </div>

              {/* Tab 2: backend-core 1 */}
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('backend-core');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-colors text-[11px] ${
                  activeTab === 'backend-core'
                    ? 'bg-[#181d27] text-white border border-[#00f5d4]/60 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-amber-400" />
                <span>backend-core 1</span>
                <X className="w-3 h-3 text-slate-500 hover:text-slate-300 ml-1" />
              </div>

              {/* Tab 3: ai-copilot 1 (ACTIVE TAB in Image #1: Rounded pill with purple border) */}
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('ai-copilot');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-all text-[11px] ${
                  activeTab === 'ai-copilot'
                    ? 'bg-[#24143a] text-purple-200 border border-[#a855f7] font-medium shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-purple-400" />
                <span>ai-copilot 1</span>
                <X className="w-3 h-3 text-purple-400/80 hover:text-purple-200 ml-1" />
              </div>

              {/* Add Tab Button */}
              <button
                onClick={handleUserTouch}
                className="p-1 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                title="New Tab"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Command Palette Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#08090d] border border-white/5 text-[10px] text-slate-400 shadow-inner">
            <Search className="w-3 h-3 text-slate-500" />
            <span>Q Command Ctrl+K</span>
          </div>

          {/* Right Status Badges & Window Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#131722] text-slate-400 border border-white/5 text-[10px]">
              Default
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-950/60 text-[#10b981] border border-emerald-800/40 text-[10px] font-mono font-semibold">
              7%
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-950/70 text-[#38bdf8] border border-blue-800/50 text-[10px] font-mono font-semibold">
              3645 MB
            </span>
            <div className="flex items-center gap-2.5 text-slate-500 pl-2">
              <Minus className="w-3 h-3 hover:text-slate-300 cursor-pointer" />
              <Square className="w-3 h-3 hover:text-slate-300 cursor-pointer" />
              <X className="w-3 h-3 hover:text-slate-300 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN APP BODY: SIDEBAR + SPLIT WORKSPACE                                */}
        {/* ========================================================================= */}
        <div className="flex h-[440px] w-full overflow-hidden bg-[#08090b] relative">
          {/* Authentic Kingsley Left Sidebar (Exact match to Image #1) */}
          {isSidebarOpen && (
            <div className="w-48 bg-[#0b0d13] border-r border-white/10 flex flex-col justify-between p-3 select-none shrink-0 transition-all">
              <div className="space-y-3">
                {/* Sidebar Top Mini Action Icons */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/5 text-slate-400">
                  <Grid className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <Folder className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <History className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 pl-1 cursor-pointer hover:text-slate-400">
                    <Search className="w-3 h-3" />
                    <span>Search</span>
                  </div>
                </div>

                {/* Section Header: PROJECTS */}
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider">
                  <span>PROJECTS</span>
                  <Plus className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer" />
                </div>

                {/* Projects Tree List */}
                <div className="space-y-2 text-[11px]">
                  {/* Item 1: backend-core */}
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-300 py-0.5 cursor-pointer hover:text-white">
                      <Folder className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-medium">backend-core</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-slate-400 text-[10px]">
                      <TerminalIcon className="w-3 h-3 text-slate-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  {/* Item 2: web-client */}
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-300 py-0.5 cursor-pointer hover:text-white">
                      <Folder className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-medium">web-client</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-slate-400 text-[10px]">
                      <TerminalIcon className="w-3 h-3 text-slate-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  {/* Item 3: microservice */}
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-300 py-0.5 cursor-pointer hover:text-white">
                      <Folder className="w-3.5 h-3.5 text-teal-400" />
                      <span className="font-medium">microservice</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-slate-400 text-[10px]">
                      <TerminalIcon className="w-3 h-3 text-slate-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  {/* Item 4: ai-copilot (Active Project in Image #1) */}
                  <div>
                    <div className="flex items-center gap-1.5 text-purple-300 py-0.5 cursor-pointer">
                      <Folder className="w-3.5 h-3.5 text-purple-400" />
                      <span className="font-semibold">ai-copilot</span>
                    </div>
                    {/* Active highlight pill matching Image #1 */}
                    <div className="mt-0.5 ml-2 py-1 px-2 flex items-center gap-1.5 text-purple-200 text-[10px] bg-[#2a1745] rounded-md border border-purple-800 font-semibold shadow-[0_0_8px_rgba(168,85,247,0.25)]">
                      <TerminalIcon className="w-3 h-3 text-purple-400" />
                      <span>agent (active)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer: Jopal User Profile (Exact match to Image #1) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                    J
                  </div>
                  <div>
                    <p className="text-white font-bold text-[10px] leading-tight">Jopal</p>
                    <p className="text-slate-400 text-[9px] leading-tight">local account · Default</p>
                  </div>
                </div>
                <Settings className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SPLIT WORKSPACE: PANE A + RESIZE DIVIDER + PANE B                       */}
          {/* ========================================================================= */}
          <div className="flex-1 flex overflow-hidden bg-[#08090b] relative">
            {/* --------------------------------------------------------------------- */}
            {/* LEFT PANE: backend-core / shell                                       */}
            {/* --------------------------------------------------------------------- */}
            <div
              onClick={() => {
                handleUserTouch();
                setActivePane('left');
              }}
              style={{ width: `${splitPos}%` }}
              className={`h-full flex flex-col justify-between transition-all duration-150 relative ${
                activePane === 'left'
                  ? 'bg-[#0a0c10] shadow-[inset_0_0_16px_rgba(0,245,212,0.05)]'
                  : 'bg-[#08090b]'
              }`}
            >
              {/* Left Pane Header */}
              <div
                className={`h-8 px-3 flex items-center justify-between text-xs select-none border-b transition-colors duration-150 font-mono ${
                  activePane === 'left'
                    ? 'bg-[#0e1117] text-white border-white/10'
                    : 'bg-[#0a0c10] text-slate-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 overflow-hidden whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
                  <div className="flex items-center gap-1 truncate text-xs">
                    <span className="text-cyan-400 font-semibold">&gt;_</span>
                    <span className="font-bold text-white truncate">backend-core</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-[#c084fc] font-medium truncate">shell</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 shrink-0">
                  <Camera className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Columns className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Left Pane Terminal Output (Exact text from Image #1) */}
              <div className="p-3.5 flex-1 overflow-y-auto space-y-2 text-[11px] font-mono text-slate-300 bg-[#08090b]">
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-[#a855f7] font-semibold">PS</span>{' '}
                  <span className="text-slate-400">C:\workspace\backend-core&gt;</span>{' '}
                  <span className="text-white font-medium">{typedCommand}</span>
                  <span className="w-2 h-3.5 inline-block bg-[#00f5d4] ml-1 animate-pulse align-middle" />
                </p>

                {showBuildOutput && (
                  <div className="space-y-1 text-[11px] pt-1">
                    <p className="text-slate-400">&gt; kingsley-web@1.0.0 build</p>
                    <p className="text-slate-400">&gt; tsc &amp;&amp; vite build</p>
                    <p className="text-[#10b981] font-medium">✓ 1596 modules transformed.</p>
                    <div className="text-[10px] text-slate-400 space-y-0.5 pl-2 border-l border-emerald-500/30 font-mono">
                      <p>dist/index.html <span className="text-slate-400 pl-2">2.06 kB │ gzip: 0.93 kB</span></p>
                      <p>dist/assets/app.js <span className="text-slate-400 pl-2">211 kB │ gzip: 60.5 kB</span></p>
                    </div>
                    <p className="text-[#10b981] font-semibold pt-0.5">✓ built in 3.84s (0 errors)</p>
                  </div>
                )}
              </div>

              {/* Left Pane Footer */}
              <div className="h-7 bg-[#0b0d13] border-t border-white/5 px-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="text-[#10b981] font-semibold">
                  PowerShell 7.4 (ConPTY Active)
                </span>
                <span className="text-slate-400">0.18ms I/O</span>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* FLUID RESIZABLE DIVIDER WITH PERMANENT CYAN PILL HANDLE (Image #1)    */}
            {/* --------------------------------------------------------------------- */}
            <div
              onMouseDown={handleMouseDown}
              role="separator"
              aria-orientation="vertical"
              className={`relative z-40 group flex items-center justify-center select-none shrink-0 transition-all w-3 h-full cursor-col-resize -mx-1.5 ${
                isDraggingActive ? 'z-50' : ''
              }`}
              title="Drag to resize split panes"
            >
              {/* Hairline vertical divider track */}
              <div className="relative flex items-center justify-center w-[1px] h-full bg-[#1b1f28]">
                {/* Signature Teal / Cyan Handle Pill (Always visible in Image #1) */}
                <div
                  className={`w-1.5 h-8 rounded-full transition-all duration-150 ${
                    isDraggingActive
                      ? 'bg-[#00f5d4] scale-110 shadow-[0_0_16px_rgba(0,245,212,1)]'
                      : 'bg-[#00f5d4] shadow-[0_0_10px_rgba(0,245,212,0.85)] group-hover:scale-105'
                  }`}
                />
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* RIGHT PANE: ai-copilot / agent stream                                 */}
            {/* --------------------------------------------------------------------- */}
            <div
              onClick={() => {
                handleUserTouch();
                setActivePane('right');
              }}
              style={{ width: `${100 - splitPos}%` }}
              className={`h-full flex flex-col justify-between transition-all duration-150 relative ${
                activePane === 'right'
                  ? 'bg-[#0a0c10] shadow-[inset_0_0_16px_rgba(0,245,212,0.05)]'
                  : 'bg-[#08090b]'
              }`}
            >
              {/* Right Pane Header */}
              <div
                className={`h-8 px-3 flex items-center justify-between text-xs select-none border-b transition-colors duration-150 font-mono ${
                  activePane === 'right'
                    ? 'bg-[#0e1117] text-white border-white/10'
                    : 'bg-[#0a0c10] text-slate-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 overflow-hidden whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#00f5d4] shrink-0" />
                  <div className="flex items-center gap-1 truncate text-xs">
                    <span className="text-cyan-400 font-semibold">&gt;_</span>
                    <span className="font-bold text-white truncate">ai-copilot</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-[#10b981] font-medium truncate">agent stream</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 shrink-0">
                  <Camera className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Columns className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Right Pane Terminal Stream Content */}
              <div className="p-3.5 flex-1 overflow-y-auto space-y-2 text-[11px] font-mono text-slate-300 bg-[#08090b]">
                {/* Agent Flow Banner Card (Exact match to Image #1) */}
                <div className="px-3 py-1.5 rounded-lg bg-[#0c1322] border border-blue-900/60 text-[10px] text-cyan-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4]" />
                    <span className="font-medium tracking-wide">AI AGENT FLOW • ConPTY Stream Connected</span>
                  </div>
                  <span className="text-slate-400 text-[10px] shrink-0 font-mono">0.18ms latency</span>
                </div>

                {/* Agent Stream Lines */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-slate-400">
                    <span className="text-cyan-400">[high] Gemini 3.8 Flash</span> • [T] ~/workspace/ai-copilot
                  </p>
                  {agentLogs.map((log, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed ${
                        log.startsWith('>')
                          ? 'text-[#00f5d4] font-medium'
                          : log.startsWith('✓')
                          ? 'text-[#10b981] font-semibold'
                          : 'text-slate-300'
                      }`}
                    >
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Pane Footer */}
              <div className="h-7 bg-[#0b0d13] border-t border-white/5 px-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="text-[#00f5d4] font-semibold">
                  Split: {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
                </span>
                <span className="text-[#10b981] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  IPC Live Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. GLOBAL BOTTOM STATUS BAR (Exact match to Image #1)                      */}
        {/* ========================================================================= */}
        <div className="h-6 bg-[#07080a] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#10b981] font-medium">
              <Check className="w-3 h-3 text-[#10b981]" /> ConPTY IPC Connected (0.18ms)
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">1 shell • 111.2K (56%) ctrl+p commands</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-medium">[high] Gemini 3.8 Flash</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500">v1.0.0 Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
