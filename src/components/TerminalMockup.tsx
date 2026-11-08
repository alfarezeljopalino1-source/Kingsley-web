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
  Terminal,
  Maximize2,
  Columns,
  Rows,
  Check,
  Camera,
  GitCompare,
  GitBranch,
  Layout
} from 'lucide-react';

export const TerminalMockup: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'kingsley' | 'backend-core' | 'ai-copilot'>('ai-copilot');
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');

  // Split position state matching Kingsley app: 53% left, 47% right
  const [splitPos, setSplitPos] = useState<number>(53);
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

  // AESTHETIC CONTINUOUS MOTION ENGINE (6000ms loop, inspired by enowx.ai, orca, alethe)
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
        setSplitPos(53);
      }
      // PHASE 2: 1800ms - 3800ms (Fluid Resizable Divider Animation: 53% -> 38% -> 66% -> 53%)
      else if (elapsed >= 1800 && elapsed < 3800) {
        setIsAutoDragging(true);
        const dragProgress = (elapsed - 1800) / 2000;
        // Smooth sine wave offset
        const offset = Math.sin(dragProgress * Math.PI * 2) * 15;
        setSplitPos(53 + offset);
      }
      // PHASE 3: 3800ms - 5400ms (Right Pane AI Copilot Agent Stream & Live Synchronization)
      else if (elapsed >= 3800 && elapsed < 5400) {
        setIsAutoDragging(false);
        setActivePane('right');
        setSplitPos(53);

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
        setSplitPos(53);
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
      const sidebarWidth = isSidebarOpen ? 208 : 0;
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

      {/* Main Authentic Kingsley Window (100% matched to Kingsley Desktop App) */}
      <div
        ref={containerRef}
        onMouseEnter={() => handleUserTouch()}
        className="relative rounded-xl border border-white/10 bg-[#0c0e12] shadow-2xl shadow-black overflow-hidden select-none font-mono text-xs"
      >
        {/* ========================================================================= */}
        {/* 1. TOP TITLEBAR (100% Exact to Kingsley TitleBar.tsx)                     */}
        {/* ========================================================================= */}
        <div className="h-10 bg-[#12161f] border-b border-white/10 px-3 flex items-center justify-between text-neutral-400 text-xs select-none">
          {/* Left: Brand Logo, Sidebar Toggle & Tabs */}
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-1.5 px-1 py-1 font-mono text-xs font-bold tracking-wider shrink-0 select-none cursor-pointer">
              <img src="/kingsley-icon.png" alt="Kingsley" className="w-4 h-4 rounded object-contain" />
              <span className="text-white">KING<span className="text-[#00d2d3]">SLEY</span></span>
            </div>

            {/* Toggle Sidebar Button */}
            <button
              onClick={() => {
                handleUserTouch();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              title="Toggle Sidebar (Ctrl+B)"
              className={`h-7 w-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-0.5 ${
                isSidebarOpen ? 'text-amber-400' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Vertical Divider */}
            <div className="h-4 w-[1px] bg-white/10 mx-1 shrink-0" />

            {/* Tab List */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {/* Tab 1: Kingsley 1 */}
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('kingsley');
                }}
                className={`flex items-center gap-1.5 h-7 px-2.5 rounded-t text-xs font-mono cursor-pointer transition-all border-t-2 ${
                  activeTab === 'kingsley'
                    ? 'bg-[#0c0e12] text-white border-[#00d2d3] font-medium'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03] border-transparent'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Kingsley 1</span>
                <X className="w-3 h-3 text-neutral-500 hover:text-red-400 ml-1" />
              </div>

              {/* Tab 2: backend-core */}
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('backend-core');
                }}
                className={`flex items-center gap-1.5 h-7 px-2.5 rounded-t text-xs font-mono cursor-pointer transition-all border-t-2 ${
                  activeTab === 'backend-core'
                    ? 'bg-[#0c0e12] text-white border-amber-400 font-medium'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03] border-transparent'
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>backend-core</span>
                <X className="w-3 h-3 text-neutral-500 hover:text-red-400 ml-1" />
              </div>

              {/* Tab 3: ai-copilot (Active Tab) */}
              <div
                onClick={() => {
                  handleUserTouch();
                  setActiveTab('ai-copilot');
                }}
                className={`flex items-center gap-1.5 h-7 px-2.5 rounded-t text-xs font-mono cursor-pointer transition-all border-t-2 ${
                  activeTab === 'ai-copilot'
                    ? 'bg-[#0c0e12] text-purple-200 border-purple-500 font-medium'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03] border-transparent'
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>ai-copilot</span>
                <X className="w-3 h-3 text-neutral-500 hover:text-red-400 ml-1" />
              </div>

              {/* Add Tab Button */}
              <button
                onClick={handleUserTouch}
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-cyan-400 transition-colors cursor-pointer shrink-0 ml-0.5"
                title="New Tab"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Command Search, Git Changes, Settings & Window Controls (NO DEFAULT/7%/3645MB!) */}
          <div className="flex items-center h-full shrink-0">
            {/* Command Search Button (Exact from Kingsley TitleBar.tsx) */}
            <div
              onClick={handleUserTouch}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 mr-2 text-xs font-mono rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-neutral-400 hover:text-white cursor-pointer"
            >
              <Search className="w-3 h-3 text-amber-400" />
              <span className="text-[11px]">Command</span>
              <kbd className="text-[10px] px-1 py-0.2 rounded bg-white/10 font-bold text-neutral-300">
                Ctrl+K
              </kbd>
            </div>

            {/* Git Changes Button */}
            <button
              onClick={handleUserTouch}
              className="p-1.5 transition-colors flex items-center gap-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
              title="Git Changes"
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>

            {/* Settings Button */}
            <button
              onClick={handleUserTouch}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors rounded"
              title="Settings (Ctrl+,)"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-white/10 mx-1.5" />

            {/* Window Controls */}
            <div className="flex items-center">
              <button className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                <Square className="w-3 h-3" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-red-600 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN APP BODY: SIDEBAR + SPLIT WORKSPACE                                */}
        {/* ========================================================================= */}
        <div className="flex h-[440px] w-full overflow-hidden bg-[#0c0e12] relative">
          {/* Authentic Kingsley Left Sidebar (Exact match to Kingsley Sidebar.tsx, NO JOPAL) */}
          {isSidebarOpen && (
            <div className="w-52 bg-[#12161f] border-r border-white/10 flex flex-col justify-between p-3 select-none shrink-0 transition-all">
              <div className="space-y-3">
                {/* Section Header: PROJECTS */}
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 tracking-wider font-mono">
                  <span>PROJECTS</span>
                  <Plus className="w-3.5 h-3.5 text-neutral-500 hover:text-white cursor-pointer" />
                </div>

                {/* Projects Tree List */}
                <div className="space-y-2 text-xs font-mono">
                  {/* Item 1: backend-core */}
                  <div>
                    <div className="flex items-center gap-1.5 text-neutral-300 py-0.5 cursor-pointer hover:text-white">
                      <Folder className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-medium">backend-core</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-neutral-400 text-[11px]">
                      <Terminal className="w-3 h-3 text-neutral-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  {/* Item 2: web-client */}
                  <div>
                    <div className="flex items-center gap-1.5 text-neutral-300 py-0.5 cursor-pointer hover:text-white">
                      <Folder className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-medium">web-client</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-neutral-400 text-[11px]">
                      <Terminal className="w-3 h-3 text-neutral-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  {/* Item 3: microservice */}
                  <div>
                    <div className="flex items-center gap-1.5 text-neutral-300 py-0.5 cursor-pointer hover:text-white">
                      <Folder className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-medium">microservice</span>
                    </div>
                    <div className="pl-4 py-0.5 flex items-center gap-1.5 text-neutral-400 text-[11px]">
                      <Terminal className="w-3 h-3 text-neutral-500" />
                      <span>shell</span>
                    </div>
                  </div>

                  {/* Item 4: ai-copilot (Active Workspace) */}
                  <div>
                    <div className="flex items-center gap-1.5 text-purple-300 py-0.5 cursor-pointer">
                      <Folder className="w-3.5 h-3.5 text-purple-400" />
                      <span className="font-semibold">ai-copilot</span>
                    </div>
                    <div className="mt-0.5 ml-2 py-1 px-2 flex items-center gap-1.5 text-purple-200 text-[10px] bg-purple-950/60 rounded-md border border-purple-800/80 font-semibold shadow-sm">
                      <Terminal className="w-3 h-3 text-purple-400" />
                      <span>agent (active)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Bottom: Kingsley Operator Profile (Exact from Kingsley Sidebar.tsx, NO JOPAL) */}
              <div className="pt-3 border-t border-white/10 space-y-2 font-mono">
                <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-black/40">
                      <div className="text-cyan-400 flex items-center justify-center">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs text-white truncate">
                        Developer
                      </span>
                      <span className="text-[10px] text-neutral-400 truncate">
                        @dev_operator
                      </span>
                    </div>
                  </div>
                  <span className="text-xs">⚡</span>
                </div>

                {/* Settings Shortcut Button */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs text-neutral-300 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-medium">Settings</span>
                  </div>
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-bold text-neutral-400">
                    Ctrl+,
                  </kbd>
                </div>

                <div className="flex items-center justify-between px-1 text-[10px] text-neutral-500">
                  <span>Kingsley • Win11 Native</span>
                  <span className="capitalize">Obsidian</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SPLIT WORKSPACE: PANE A + RESIZE DIVIDER + PANE B                       */}
          {/* ========================================================================= */}
          <div className="flex-1 flex overflow-hidden bg-[#0c0e12] relative">
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
                  ? 'bg-[#12161f] shadow-[inset_0_0_16px_rgba(0,210,211,0.06)]'
                  : 'bg-[#0c0e12]'
              }`}
            >
              {/* Left Pane Header (Exact from Kingsley PaneHeader.tsx) */}
              <div
                className={`h-7 px-2.5 flex items-center justify-between text-xs select-none border-b transition-colors duration-150 font-mono ${
                  activePane === 'left'
                    ? 'bg-[#1a202c] text-white border-white/10'
                    : 'bg-[#12161f] text-neutral-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePane === 'left' ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
                    }`}
                  />
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Terminal className="w-3.5 h-3.5 text-[#00a8ff]" />
                    <span className="font-bold text-white truncate">backend-core</span>
                    <span className="text-neutral-500">/</span>
                    <span className="text-purple-300 font-medium truncate">shell</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400 shrink-0">
                  <Camera className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Columns className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Left Pane Terminal Output */}
              <div className="p-3.5 flex-1 overflow-y-auto space-y-1.5 text-xs font-mono text-neutral-300 bg-[#0c0e12]">
                <p className="text-neutral-300 leading-relaxed">
                  <span className="text-purple-400 font-semibold">PS</span>{' '}
                  <span className="text-neutral-500">C:\workspace\backend-core&gt;</span>{' '}
                  <span className="text-white font-medium">{typedCommand}</span>
                  <span className="w-2 h-3.5 inline-block bg-[#00d2d3] ml-1 animate-pulse align-middle" />
                </p>

                {showBuildOutput && (
                  <div className="space-y-1 text-xs pt-1">
                    <p className="text-neutral-500">&gt; kingsley-web@1.0.0 build</p>
                    <p className="text-neutral-500">&gt; tsc &amp;&amp; vite build</p>
                    <p className="text-emerald-400 font-medium">✓ 1596 modules transformed.</p>
                    <div className="text-[11px] text-neutral-400 space-y-0.5 pl-2 border-l border-emerald-500/30 font-mono">
                      <p>dist/index.html <span className="text-neutral-500 pl-2">2.06 kB │ gzip: 0.93 kB</span></p>
                      <p>dist/assets/app.js <span className="text-neutral-500 pl-2">211 kB │ gzip: 60.5 kB</span></p>
                    </div>
                    <p className="text-emerald-400 font-semibold pt-0.5">✓ built in 3.84s (0 errors)</p>
                  </div>
                )}
              </div>

              {/* Left Pane Footer */}
              <div className="h-7 bg-[#141924] border-t border-white/5 px-3 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span className="text-emerald-400 font-semibold">
                  PowerShell 7.4 (ConPTY Active)
                </span>
                <span className="text-neutral-500">0.18ms I/O</span>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* FLUID RESIZABLE DIVIDER (Exact to Kingsley ResizeHandle.tsx)           */}
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
              {/* Hairline 1px border track */}
              <div
                className={`transition-all duration-150 relative flex items-center justify-center w-[1px] h-full ${
                  isDraggingActive
                    ? 'opacity-100 shadow-[0_0_12px_rgba(0,210,211,0.95)]'
                    : 'opacity-35 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(0,210,211,0.6)]'
                }`}
                style={{ backgroundColor: '#00d2d3' }}
              >
                {/* Signature Teal / Cyan Handle Pill */}
                <div
                  className={`absolute rounded-full transition-all duration-150 w-1.5 h-8 ${
                    isDraggingActive
                      ? 'bg-[#00d2d3] scale-100 shadow-[0_0_12px_rgba(0,210,211,1)]'
                      : 'bg-[#00d2d3] shadow-[0_0_10px_rgba(0,210,211,0.85)] group-hover:scale-105'
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
                  ? 'bg-[#12161f] shadow-[inset_0_0_16px_rgba(0,210,211,0.06)]'
                  : 'bg-[#0c0e12]'
              }`}
            >
              {/* Right Pane Header */}
              <div
                className={`h-7 px-2.5 flex items-center justify-between text-xs select-none border-b transition-colors duration-150 font-mono ${
                  activePane === 'right'
                    ? 'bg-[#1a202c] text-white border-white/10'
                    : 'bg-[#12161f] text-neutral-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePane === 'right' ? 'bg-[#00d2d3] animate-pulse' : 'bg-neutral-500'
                    }`}
                  />
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Terminal className="w-3.5 h-3.5 text-[#00a8ff]" />
                    <span className="font-bold text-white truncate">ai-copilot</span>
                    <span className="text-neutral-500">/</span>
                    <span className="text-emerald-300 font-medium truncate">agent stream</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400 shrink-0">
                  <Camera className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Rows className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Columns className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Right Pane Terminal Stream Content */}
              <div className="p-3.5 flex-1 overflow-y-auto space-y-2 text-xs font-mono text-neutral-300 bg-[#0c0e12]">
                {/* Agent Flow Banner Card */}
                <div className="px-2.5 py-1.5 rounded-lg bg-[#0c1424] border border-blue-900/60 text-[10px] text-cyan-200 flex items-center justify-between shadow-sm gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2d3] shrink-0" />
                    <span className="font-medium tracking-wide truncate">AI AGENT FLOW • ConPTY Stream Connected</span>
                  </div>
                  <span className="text-neutral-400 text-[9px] shrink-0 font-mono">0.18ms latency</span>
                </div>
                {/* Agent Stream Lines */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-neutral-500">
                    <span className="text-cyan-400">[high] Gemini 3.8 Flash</span> • [T] ~/workspace/ai-copilot
                  </p>
                  {agentLogs.map((log, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed ${
                        log.startsWith('>')
                          ? 'text-[#00d2d3] font-medium'
                          : log.startsWith('✓')
                          ? 'text-emerald-400 font-semibold'
                          : 'text-neutral-300'
                      }`}
                    >
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Pane Footer */}
              <div className="h-7 bg-[#141924] border-t border-white/5 px-3 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span className="text-[#00d2d3] font-semibold">
                  Split: {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
                </span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  IPC Live Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. GLOBAL STATUS BAR (100% Exact to Kingsley StatusBar.tsx)               */}
        {/* ========================================================================= */}
        <div className="h-6 bg-[#12161f] border-t border-white/10 px-3 flex items-center justify-between text-[11px] text-neutral-400 font-mono select-none">
          {/* Left: Sidebar, Git Branch & Pane Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleUserTouch();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Layout className="w-3 h-3 text-amber-400" />
              <span className="font-medium">Sidebar</span>
            </button>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="flex items-center gap-1.5 text-neutral-300">
              <GitBranch className="w-3 h-3 text-emerald-400" />
              <span>main</span>
            </div>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>2 Panes</span>
            </div>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
              <Check className="w-3 h-3" />
              <span>ConPTY IPC Connected (0.18ms)</span>
            </div>
          </div>

          {/* Right: Agent & Release */}
          <div className="flex items-center gap-2">
            <span className="text-[#00d2d3] font-medium">[high] Gemini 3.8 Flash</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-500">v1.0.0 Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
