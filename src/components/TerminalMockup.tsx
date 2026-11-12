import React, { useState, useEffect } from 'react';
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
  // Continuous Motion Loop States (Non-stop automated video/motion showcase)
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');
  const [splitPos, setSplitPos] = useState<number>(53);
  const [typedCommand, setTypedCommand] = useState<string>('npm run build');
  const [showBuildOutput, setShowBuildOutput] = useState<boolean>(true);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    'ConPTY pseudoterminal session attached (pid: 14208)',
    '> Analyzing workspace components: 100% verified',
    '> ConPTY IPC pipeline active: 0.18ms latency',
    '> Auto-syncing live terminal states: READY'
  ]);

  // UNSTOPPABLE HYPNOTIC MOTION ENGINE (Exact continuous promotional showcase)
  useEffect(() => {
    const duration = 7200; // 7.2s smooth full workflow cycle
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % duration;

      // =========================================================================
      // PHASE 1: 0ms - 2200ms (Left Pane Focus, Realtime typing & build compile)
      // =========================================================================
      if (elapsed < 2200) {
        setActivePane('left');
        setSplitPos(53);

        const cmd = 'npm run build';
        if (elapsed < 1100) {
          const typeProgress = Math.min(Math.floor((elapsed / 1000) * cmd.length), cmd.length);
          setTypedCommand(cmd.slice(0, typeProgress));
          setShowBuildOutput(false);
        } else {
          setTypedCommand(cmd);
          setShowBuildOutput(true);
        }
      }
      // =========================================================================
      // PHASE 2: 2200ms - 4600ms (Fluid Resizable Divider Glide: 53% -> 38% -> 66% -> 53%)
      // =========================================================================
      else if (elapsed >= 2200 && elapsed < 4600) {
        setShowBuildOutput(true);
        setTypedCommand('npm run build');

        const dragProgress = (elapsed - 2200) / 2400;
        // Smooth sinusoidal glide
        const offset = Math.sin(dragProgress * Math.PI * 2) * 14;
        setSplitPos(53 + offset);
      }
      // =========================================================================
      // PHASE 3: 4600ms - 6600ms (Right Pane Focus, Live AI Agent Stream sync)
      // =========================================================================
      else if (elapsed >= 4600 && elapsed < 6600) {
        setActivePane('right');
        setSplitPos(53);

        const agentPhase = elapsed - 4600;
        if (agentPhase < 500) {
          setAgentLogs([
            'ConPTY pseudoterminal session attached (pid: 14208)',
            '> Analyzing workspace components: 100% verified'
          ]);
        } else if (agentPhase >= 500 && agentPhase < 1100) {
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
      // =========================================================================
      // PHASE 4: 6600ms - 7200ms (Seamless settling & rollover to next cycle)
      // =========================================================================
      else {
        setSplitPos(53);
        setActivePane('left');
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none pointer-events-none cursor-default">
      {/* Subtle Ambient Radial Glow matching Kingsley palette */}
      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#00d2d3]/20 via-blue-600/15 to-purple-600/20 blur-xl opacity-80 pointer-events-none" />

      {/* Main Authentic Kingsley Window (Responsive across Mobile, Tablet, Desktop) */}
      <div className="relative rounded-xl border border-white/10 bg-[#0c0e12] shadow-2xl shadow-black overflow-hidden font-mono text-xs">
        {/* ========================================================================= */}
        {/* 1. TOP TITLEBAR (Responsive to Mobile & Tablet)                            */}
        {/* ========================================================================= */}
        <div className="h-9 sm:h-10 bg-[#12161f] border-b border-white/10 px-2 sm:px-3 flex items-center justify-between text-neutral-400 text-xs">
          {/* Left: Brand Logo, Sidebar Toggle & Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden flex-1">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-1.5 px-1 py-1 font-mono text-xs font-bold tracking-wider shrink-0">
              <img src="/kingsley-icon.png" alt="Kingsley" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded object-contain" />
              <span className="text-white text-[11px] sm:text-xs">KING<span className="text-[#00d2d3]">SLEY</span></span>
            </div>

            {/* Sidebar Toggle Icon (Yellow/Amber matching Image #1) */}
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg flex items-center justify-center shrink-0 text-amber-400">
              <PanelLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            {/* Vertical Divider */}
            <div className="h-4 w-[1px] bg-white/10 mx-0.5 sm:mx-1 shrink-0" />

            {/* Tab List */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
              {/* Tab 1: Kingsley 1 (Hidden on mobile <sm to save space) */}
              <div className="hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-t text-xs font-mono text-neutral-400 shrink-0">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate max-w-[80px] md:max-w-none">Kingsley 1</span>
                <X className="w-3 h-3 text-neutral-500 ml-1" />
              </div>

              {/* Tab 2: backend-core (Hidden on small screens) */}
              <div className="hidden md:flex items-center gap-1.5 h-7 px-2.5 rounded-t text-xs font-mono text-neutral-400 shrink-0">
                <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate max-w-[90px] md:max-w-none">backend-core</span>
                <X className="w-3 h-3 text-neutral-500 ml-1" />
              </div>

              {/* Tab 3: ai-copilot (Active Tab in Image #1: Enclosed Purple Rounded Pill) */}
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[#24143a] text-purple-200 border border-[#a855f7] font-medium shadow-[0_0_12px_rgba(168,85,247,0.3)] text-[10px] sm:text-[11px] shrink-0">
                <Folder className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 shrink-0" />
                <span>ai-copilot</span>
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400/80 ml-0.5 sm:ml-1" />
              </div>

              {/* Add Tab Button */}
              <div className="p-1 text-neutral-500 shrink-0">
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
          </div>

          {/* Right: Command Search, Git Changes, Settings & Window Controls */}
          <div className="flex items-center h-full shrink-0">
            {/* Command Search Pill (Hidden on mobile & tablet <lg) */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 mr-2 text-xs font-mono rounded bg-white/5 border border-white/10 text-neutral-400">
              <Search className="w-3 h-3 text-amber-400" />
              <span className="text-[11px]">Command</span>
              <kbd className="text-[10px] px-1 py-0.2 rounded bg-white/10 font-bold text-neutral-300">
                Ctrl+K
              </kbd>
            </div>

            {/* Git Changes Button (Hidden on xs mobile) */}
            <div className="hidden sm:block p-1.5 text-neutral-400">
              <GitCompare className="w-3.5 h-3.5" />
            </div>

            {/* Settings Button */}
            <div className="p-1 sm:p-1.5 text-neutral-400">
              <Settings className="w-3.5 h-3.5" />
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-white/10 mx-1 sm:mx-1.5" />

            {/* Window Controls (Hidden on small mobile screens) */}
            <div className="hidden sm:flex items-center text-neutral-400">
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                <Square className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN APP BODY: SIDEBAR (Hidden on mobile <md) + SPLIT WORKSPACE         */}
        {/* ========================================================================= */}
        <div className="flex h-[380px] sm:h-[430px] md:h-[440px] w-full overflow-hidden bg-[#0c0e12] relative">
          {/* Authentic Kingsley Left Sidebar (Hidden on mobile <md, visible on tablet & desktop) */}
          <div className="hidden md:flex w-44 lg:w-52 bg-[#12161f] border-r border-white/10 flex-col justify-between p-3 shrink-0">
            <div className="space-y-3">
              {/* Section Header: PROJECTS */}
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 tracking-wider font-mono">
                <span>PROJECTS</span>
                <Plus className="w-3.5 h-3.5 text-neutral-500" />
              </div>

              {/* Projects Tree List */}
              <div className="space-y-2 text-xs font-mono">
                {/* Item 1: backend-core */}
                <div>
                  <div className="flex items-center gap-1.5 text-neutral-300 py-0.5">
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
                  <div className="flex items-center gap-1.5 text-neutral-300 py-0.5">
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
                  <div className="flex items-center gap-1.5 text-neutral-300 py-0.5">
                    <Folder className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium">microservice</span>
                  </div>
                  <div className="pl-4 py-0.5 flex items-center gap-1.5 text-neutral-400 text-[11px]">
                    <Terminal className="w-3 h-3 text-neutral-500" />
                    <span>shell</span>
                  </div>
                </div>

                {/* Item 4: ai-copilot (Active in Image #1) */}
                <div>
                  <div className="flex items-center gap-1.5 text-purple-300 py-0.5">
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

            {/* Sidebar Bottom: Developer Profile (Exact match to Image #1) */}
            <div className="pt-3 border-t border-white/10 space-y-2 font-mono">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.02]">
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
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-neutral-300">
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

          {/* ========================================================================= */}
          {/* 3. SPLIT WORKSPACE: PANE A + RESIZE DIVIDER + PANE B                       */}
          {/* ========================================================================= */}
          <div className="flex-1 flex overflow-hidden bg-[#0c0e12] relative">
            {/* --------------------------------------------------------------------- */}
            {/* LEFT PANE: backend-core / shell                                       */}
            {/* --------------------------------------------------------------------- */}
            <div
              style={{ width: `${splitPos}%` }}
              className={`h-full flex flex-col justify-between transition-all duration-150 relative ${
                activePane === 'left'
                  ? 'bg-[#12161f] shadow-[inset_0_0_16px_rgba(0,210,211,0.06)]'
                  : 'bg-[#0c0e12]'
              }`}
            >
              {/* Left Pane Header */}
              <div
                className={`h-7 px-2 sm:px-2.5 flex items-center justify-between text-xs border-b transition-colors duration-150 font-mono ${
                  activePane === 'left'
                    ? 'bg-[#1a202c] text-white border-white/10'
                    : 'bg-[#12161f] text-neutral-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePane === 'left' ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
                    }`}
                  />
                  <div className="flex items-center gap-1 shrink-0 text-[10px] sm:text-xs">
                    <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a8ff]" />
                    <span className="font-bold text-white truncate max-w-[80px] sm:max-w-none">backend-core</span>
                    <span className="text-neutral-500">/</span>
                    <span className="text-purple-300 font-medium truncate">shell</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-neutral-400 shrink-0">
                  <Camera className="w-3 h-3" />
                  <Rows className="w-3 h-3" />
                  <Columns className="w-3 h-3" />
                  <Maximize2 className="w-3 h-3" />
                  <X className="w-3 h-3" />
                </div>
              </div>

              {/* Left Pane Terminal Output */}
              <div className="p-2.5 sm:p-3.5 flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs font-mono text-neutral-300 bg-[#0c0e12]">
                <p className="text-neutral-300 leading-relaxed truncate">
                  <span className="text-purple-400 font-semibold">PS</span>{' '}
                  <span className="text-neutral-500 hidden sm:inline">C:\workspace\backend-core&gt;</span>
                  <span className="text-neutral-500 sm:hidden">&gt;</span>{' '}
                  <span className="text-white font-medium">{typedCommand}</span>
                  <span className="w-1.5 sm:w-2 h-3 sm:h-3.5 inline-block bg-[#00d2d3] ml-1 animate-pulse align-middle" />
                </p>

                {showBuildOutput && (
                  <div className="space-y-0.5 sm:space-y-1 text-[9.5px] sm:text-xs pt-0.5 sm:pt-1">
                    <p className="text-neutral-500 truncate">&gt; kingsley-web@1.0.2 build</p>
                    <p className="text-neutral-500 truncate">&gt; tsc &amp;&amp; vite build</p>
                    <p className="text-emerald-400 font-medium">✓ 1596 modules transformed.</p>
                    <div className="text-[9px] sm:text-[11px] text-neutral-400 space-y-0.5 pl-1.5 sm:pl-2 border-l border-emerald-500/30 font-mono">
                      <p className="truncate">dist/index.html <span className="text-neutral-500 pl-1">2.06 kB</span></p>
                      <p className="truncate">dist/assets/app.js <span className="text-neutral-500 pl-1">211 kB</span></p>
                    </div>
                    <p className="text-emerald-400 font-semibold pt-0.5">✓ built in 3.84s (0 errors)</p>
                  </div>
                )}
              </div>

              {/* Left Pane Footer */}
              <div className="h-6 sm:h-7 bg-[#141924] border-t border-white/5 px-2 sm:px-3 flex items-center justify-between text-[9px] sm:text-[11px] text-neutral-400 font-mono">
                <span className="text-emerald-400 font-semibold truncate">
                  <span className="hidden sm:inline">PowerShell 7.4 (ConPTY Active)</span>
                  <span className="sm:hidden">PS 7.4 (ConPTY)</span>
                </span>
                <span className="text-neutral-500 shrink-0 pl-1">0.18ms</span>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* FLUID RESIZABLE DIVIDER (Continuous Motion Glide)                     */}
            {/* --------------------------------------------------------------------- */}
            <div
              role="separator"
              aria-orientation="vertical"
              className="relative z-40 flex items-center justify-center shrink-0 w-2 sm:w-3 h-full -mx-1 sm:-mx-1.5"
            >
              {/* Hairline 1px border track */}
              <div
                className="transition-all duration-150 relative flex items-center justify-center w-[1px] h-full opacity-100 shadow-[0_0_12px_rgba(0,210,211,0.95)]"
                style={{ backgroundColor: '#00d2d3' }}
              >
                {/* Signature Teal / Cyan Handle Pill (Always Visible in Image #1) */}
                <div className="absolute rounded-full w-1 sm:w-1.5 h-6 sm:h-8 bg-[#00d2d3] shadow-[0_0_12px_rgba(0,210,211,1)]" />
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* RIGHT PANE: ai-copilot / agent stream                                 */}
            {/* --------------------------------------------------------------------- */}
            <div
              style={{ width: `${100 - splitPos}%` }}
              className={`h-full flex flex-col justify-between transition-all duration-150 relative ${
                activePane === 'right'
                  ? 'bg-[#12161f] shadow-[inset_0_0_16px_rgba(0,210,211,0.06)]'
                  : 'bg-[#0c0e12]'
              }`}
            >
              {/* Right Pane Header */}
              <div
                className={`h-7 px-2 sm:px-2.5 flex items-center justify-between text-xs border-b transition-colors duration-150 font-mono ${
                  activePane === 'right'
                    ? 'bg-[#1a202c] text-white border-white/10'
                    : 'bg-[#12161f] text-neutral-400 border-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePane === 'right' ? 'bg-[#00d2d3] animate-pulse' : 'bg-neutral-500'
                    }`}
                  />
                  <div className="flex items-center gap-1 shrink-0 text-[10px] sm:text-xs">
                    <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00a8ff]" />
                    <span className="font-bold text-white truncate max-w-[70px] sm:max-w-none">ai-copilot</span>
                    <span className="text-neutral-500">/</span>
                    <span className="text-emerald-300 font-medium truncate">stream</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-neutral-400 shrink-0">
                  <Camera className="w-3 h-3" />
                  <Rows className="w-3 h-3" />
                  <Columns className="w-3 h-3" />
                  <Maximize2 className="w-3 h-3" />
                  <X className="w-3 h-3" />
                </div>
              </div>

              {/* Right Pane Terminal Stream Content */}
              <div className="p-2.5 sm:p-3.5 flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs font-mono text-neutral-300 bg-[#0c0e12]">
                {/* Agent Flow Banner Card (Exact match to Image #1) */}
                <div className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#0c1424] border border-blue-900/60 text-[9px] sm:text-[10px] text-cyan-200 flex items-center justify-between shadow-sm gap-1.5">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2d3] shrink-0" />
                    <span className="font-medium tracking-wide truncate">AI AGENT FLOW • ConPTY Connected</span>
                  </div>
                  <span className="text-neutral-400 text-[8px] sm:text-[9px] shrink-0 font-mono">0.18ms</span>
                </div>

                {/* Agent Stream Lines */}
                <div className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1 text-[9.5px] sm:text-xs">
                  <p className="text-neutral-500 truncate">
                    <span className="text-cyan-400">[high] Gemini 3.8</span> • ~/workspace
                  </p>
                  {agentLogs.map((log, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed truncate ${
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
              <div className="h-6 sm:h-7 bg-[#141924] border-t border-white/5 px-2 sm:px-3 flex items-center justify-between text-[9px] sm:text-[11px] text-neutral-400 font-mono">
                <span className="text-[#00d2d3] font-semibold">
                  Split: {Math.round(splitPos)}% : {100 - Math.round(splitPos)}%
                </span>
                <span className="text-emerald-400 flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="hidden sm:inline">IPC Live Sync</span>
                  <span className="sm:hidden">Live</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. GLOBAL STATUS BAR (Responsive to Mobile)                                */}
        {/* ========================================================================= */}
        <div className="h-5 sm:h-6 bg-[#12161f] border-t border-white/10 px-2 sm:px-3 flex items-center justify-between text-[9px] sm:text-[11px] text-neutral-400 font-mono">
          {/* Left: Sidebar, Git Branch & Pane Count */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-300">
              <Layout className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
              <span className="font-medium text-[10px] sm:text-[11px]">Sidebar</span>
            </div>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-300">
              <GitBranch className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
              <span>main</span>
            </div>

            <div className="hidden sm:block h-3 w-[1px] bg-white/10" />

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>2 Panes</span>
            </div>

            <div className="hidden md:block h-3 w-[1px] bg-white/10" />

            <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
              <Check className="w-3 h-3" />
              <span>ConPTY IPC Connected (0.18ms)</span>
            </div>
          </div>

          {/* Right: Agent & Release */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#00d2d3] font-medium">[high] Gemini 3.8</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="hidden sm:inline text-neutral-500">v1.0.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
