import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Video,
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
  Volume2,
  VolumeX,
  Columns,
  Rows,
  Check
} from 'lucide-react';

export const TerminalMockup: React.FC = () => {
  // Mode: 'video' (Video Walkthrough) vs 'interactive' (Live Playable App)
  const [viewMode, setViewMode] = useState<'video' | 'interactive'>('video');

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [duration, setDuration] = useState<string>('00:08');

  // Interactive app state
  const [splitPos, setSplitPos] = useState<number>(50); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'kingsley' | 'sesitanya'>('kingsley');
  const [activePane, setActivePane] = useState<'left' | 'right'>('left');
  const [pathDropped, setPathDropped] = useState<boolean>(false);
  const [benchRunning, setBenchRunning] = useState<boolean>(false);
  const [benchLogs, setBenchLogs] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Video time & progress tracking
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 8;
    setProgress((curr / dur) * 100);

    const m = Math.floor(curr / 60);
    const s = Math.floor(curr % 60);
    setCurrentTime(`${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`);

    const dm = Math.floor(dur / 60);
    const ds = Math.floor(dur % 60);
    setDuration(`${dm < 10 ? '0' : ''}${dm}:${ds < 10 ? '0' : ''}${ds}`);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 8);
  };

  // Draggable split logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left - (isSidebarOpen ? 180 : 0);
      const availableWidth = rect.width - (isSidebarOpen ? 180 : 0);
      const percentage = (rawX / availableWidth) * 100;
      setSplitPos(Math.min(Math.max(percentage, 25), 75));
    },
    [isDragging, isSidebarOpen]
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

  const handleSimulateDrop = () => {
    setPathDropped(true);
    setTimeout(() => setPathDropped(false), 2500);
  };

  const runBench = () => {
    if (benchRunning) return;
    setBenchRunning(true);
    setBenchLogs([]);
    const lines = [
      '[conpty] Binding pipe stream -> ACK: 0.19ms',
      '[conpty] Latency test (64KB buffer): 0.22ms avg',
      '[conpty] 24-bit TrueColor buffer verified: 120fps'
    ];
    lines.forEach((l, idx) => {
      setTimeout(() => {
        setBenchLogs((prev) => [...prev, l]);
        if (idx === lines.length - 1) setBenchRunning(false);
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-indigo-600/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

      {/* Mode Switcher Pill */}
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('video')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all font-medium ${
              viewMode === 'video'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Walkthrough</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setViewMode('interactive')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-all font-medium ${
              viewMode === 'interactive'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Real Kingsley Desktop App UI</span>
        </div>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl border border-zinc-800 bg-[#16161e] shadow-2xl shadow-black overflow-hidden select-none font-mono text-xs"
      >
        {/* ========================================================================= */}
        {/* VIEW 1: VIDEO WALKTHROUGH MODE                                            */}
        {/* ========================================================================= */}
        {viewMode === 'video' && (
          <div className="relative bg-black flex flex-col justify-between">
            {/* Real App TitleBar on top of video */}
            <div className="h-9 bg-[#1a1b26] border-b border-zinc-800/80 px-3 flex items-center justify-between text-zinc-400 text-[11px] select-none z-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-xs font-bold font-sans">
                  K
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24283b] text-zinc-200 border-b-2 border-blue-500 text-[11px]">
                  <Terminal className="w-3 h-3 text-blue-400" />
                  <span>Kingsley App</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 px-3 py-0.5 rounded-md bg-[#13141f] border border-zinc-800 text-[10px] text-zinc-500">
                <Search className="w-3 h-3" />
                <span>Ctrl + K Command Palette</span>
              </div>

              <div className="flex items-center gap-2">
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

            {/* Video Player Box */}
            <div className="relative aspect-[16/9] w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/kingsley-showcase.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Floating overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                {/* Scrubber Timeline */}
                <div
                  onClick={handleSeek}
                  className="w-full h-1.5 bg-zinc-800/90 rounded-full cursor-pointer relative mb-3 overflow-hidden group/bar"
                >
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-blue-500 relative transition-all"
                  />
                </div>

                {/* Video Controls */}
                <div className="flex items-center justify-between text-zinc-300 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-md bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-md bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {currentTime} / {duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px] font-mono">
                      ● REAL APP VIDEO
                    </span>
                    <button
                      onClick={() => setViewMode('interactive')}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors"
                    >
                      Try Interactive Simulator →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: AUTHENTIC KINGSLEY INTERACTIVE SIMULATOR                          */}
        {/* ========================================================================= */}
        {viewMode === 'interactive' && (
          <div className="flex flex-col h-[480px] w-full">
            {/* TitleBar */}
            <div className="h-9 bg-[#1a1b26] border-b border-zinc-800 px-3 flex items-center justify-between text-zinc-400 text-[11px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  title="Toggle Sidebar"
                  className="p-1 hover:text-zinc-200 hover:bg-zinc-800/60 rounded transition-colors"
                >
                  <PanelLeft className="w-3.5 h-3.5 text-blue-400" />
                </button>

                {/* Tabs */}
                <div className="flex items-center gap-1">
                  <div
                    onClick={() => setActiveTab('kingsley')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors text-[11px] ${
                      activeTab === 'kingsley'
                        ? 'bg-[#24283b] text-zinc-100 border-b-2 border-blue-500'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Terminal className="w-3 h-3 text-blue-400" />
                    <span>Kingsley App</span>
                    <X className="w-3 h-3 text-zinc-600 hover:text-zinc-400 ml-1" />
                  </div>
                  <div
                    onClick={() => setActiveTab('sesitanya')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors text-[11px] ${
                      activeTab === 'sesitanya'
                        ? 'bg-[#24283b] text-zinc-100 border-b-2 border-blue-500'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Folder className="w-3 h-3 text-amber-400" />
                    <span>Sesi tanya</span>
                    <X className="w-3 h-3 text-zinc-600 hover:text-zinc-400 ml-1" />
                  </div>
                  <span className="p-1 text-zinc-500 hover:text-zinc-300 cursor-pointer">
                    <Plus className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Command Palette search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-[#13141f] border border-zinc-800 text-[10px] text-zinc-500">
                <Search className="w-3 h-3" />
                <span>Search projects, commands, terminals... Ctrl+K</span>
              </div>

              {/* Right System Badges & Caption Controls */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1f2335] text-zinc-400 text-[10px]">
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

            {/* App Body: Sidebar + Split Workspace */}
            <div className="flex-1 flex overflow-hidden bg-[#16161e]">
              {/* Authentic Left Sidebar */}
              {isSidebarOpen && (
                <div className="w-44 bg-[#1a1b26] border-r border-zinc-800 flex flex-col justify-between p-3 select-none">
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
                        <div className="flex items-center gap-1.5 text-blue-300 py-0.5">
                          <Folder className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-medium">Kingsley</span>
                        </div>
                        <div className="pl-4 py-0.5 flex items-center gap-1.5 text-blue-400 text-[10px] bg-blue-950/40 rounded px-1.5 border border-blue-800/40 font-semibold">
                          <Sparkles className="w-3 h-3 text-blue-400" />
                          <span>opencode</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Footer: Jopal Operator Profile */}
                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-[10px]">
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

              {/* Center Split Workspace */}
              <div className="flex-1 flex overflow-hidden bg-[#16161e]">
                {/* LEFT PANE: Kingsley opencode (Code Viewer + Terminal) */}
                <div
                  onClick={() => setActivePane('left')}
                  style={{ width: `${splitPos}%` }}
                  className={`h-full flex flex-col justify-between border-r border-zinc-800/80 transition-colors ${
                    activePane === 'left' ? 'bg-[#1a1b26]' : 'bg-[#16161e]'
                  }`}
                >
                  {/* PaneHeader */}
                  <div className="h-7 bg-[#1f2335] border-b border-zinc-800 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="font-bold text-zinc-200">Kingsley</span>
                      <span className="text-zinc-600">/</span>
                      <span className="text-blue-300">opencode</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Columns className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                      <Rows className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                      <Maximize2 className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                      <X className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                    </div>
                  </div>

                  {/* Code Viewer Preview (Top Half) */}
                  <div className="p-3 bg-[#16161e] border-b border-zinc-800/60 font-mono text-[10px] text-zinc-300 space-y-0.5 overflow-hidden">
                    <p className="text-zinc-500">// Kingsley Multi-Pane Core Binding</p>
                    <p>
                      <span className="text-blue-400">const</span> primary = screen.
                      <span className="text-amber-300">getPrimaryDisplay</span>()
                    </p>
                    <p>
                      <span className="text-blue-400">const</span> scale = primary.scaleFactor ||{' '}
                      <span className="text-purple-400">1</span>
                    </p>
                    <p>
                      <span className="text-blue-400">const</span> sources ={' '}
                      <span className="text-blue-400">await</span> desktopCapturer.
                      <span className="text-amber-300">getSources</span>({'{'} types: ['screen'] {'}'})
                    </p>
                  </div>

                  {/* Terminal Area (Bottom Half) */}
                  <div className="p-3 flex-1 overflow-y-auto space-y-1 text-[11px] font-mono text-zinc-300 bg-[#1a1b26]">
                    <p className="text-zinc-400">
                      <span className="text-emerald-400">kingsley</span>
                      <span className="text-zinc-500">:</span>
                      <span className="text-blue-400">~/app</span>
                      <span className="text-zinc-500"> (main)</span>
                    </p>
                    <p className="text-zinc-200">$ npx electron "kingsley-ipc-test.cjs" 2&gt;&amp;1</p>
                    <p className="text-emerald-400">✓ ConPTY stream connected [0.2ms latency]</p>
                    <p className="text-zinc-400">
                      <span className="text-blue-400">❯</span> cat{' '}
                      {pathDropped ? 'D:/projects/schema.prisma' : ''}
                      <span className="w-2 h-3.5 inline-block bg-blue-400 ml-1 animate-pulse align-middle" />
                    </p>
                    {pathDropped && (
                      <span className="text-[10px] text-emerald-400 font-sans block mt-1">
                        ✓ File path injected cleanly via Direct Drag & Drop!
                      </span>
                    )}
                  </div>

                  {/* Pane Footer Action Bar */}
                  <div className="h-7 bg-[#1a1b26] border-t border-zinc-800/60 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                    <button
                      onClick={handleSimulateDrop}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors"
                    >
                      <Plus className="w-3 h-3 text-blue-400" />
                      <span>Simulate Path Drop</span>
                    </button>
                    <span className="text-zinc-500">DeepSeek V4.1 • OpenCode</span>
                  </div>
                </div>

                {/* Draggable Divider (ResizeHandle) */}
                <div
                  onMouseDown={handleMouseDown}
                  className={`w-1.5 h-full cursor-col-resize flex items-center justify-center transition-colors z-20 ${
                    isDragging ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-[#24283b] hover:bg-blue-500/70'
                  }`}
                  title="Drag divider horizontally to resize"
                >
                  <div className="w-0.5 h-4 bg-zinc-500 rounded pointer-events-none" />
                </div>

                {/* RIGHT PANE: Sesi tanya shell with omp agent */}
                <div
                  onClick={() => setActivePane('right')}
                  style={{ width: `${100 - splitPos}%` }}
                  className={`h-full flex flex-col justify-between transition-colors ${
                    activePane === 'right' ? 'bg-[#1a1b26]' : 'bg-[#16161e]'
                  }`}
                >
                  {/* PaneHeader */}
                  <div className="h-7 bg-[#1f2335] border-b border-zinc-800 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-bold text-zinc-200">Sesi tanya</span>
                      <span className="text-zinc-600">/</span>
                      <span className="text-emerald-300">shell (omp)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Columns className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                      <Maximize2 className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                      <X className="w-3 h-3 hover:text-zinc-200 cursor-pointer" />
                    </div>
                  </div>

                  {/* Shell & Agent logs */}
                  <div className="p-3 flex-1 overflow-y-auto space-y-1.5 text-[11px] font-mono text-zinc-300 bg-[#16161e]">
                    <p className="text-zinc-500">Gemini-3.8-flash agent pipe active.</p>
                    <p className="text-zinc-300">$ omp --help</p>
                    <p className="text-zinc-400">
                      omp autonomous coding agent connected to Kingsley ConPTY multiplexer.
                    </p>
                    <p className="text-emerald-400">$ omp models</p>
                    <p className="text-blue-300">
                      ✓ [high] Gemini 3.5 Flash Lite • [D] D:/backup data C/OneDrive/Sesi tanya
                    </p>
                    {benchLogs.map((b, i) => (
                      <p key={i} className="text-amber-300 text-[10px]">
                        {b}
                      </p>
                    ))}
                  </div>

                  {/* Pane Footer Action Bar */}
                  <div className="h-7 bg-[#1f2335] border-t border-zinc-800/60 px-3 flex items-center justify-between text-[10px] text-zinc-400">
                    <button
                      onClick={runBench}
                      disabled={benchRunning}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950 hover:bg-blue-900 border border-blue-800/50 text-blue-300 text-[10px] transition-colors disabled:opacity-50"
                    >
                      <Play className="w-2.5 h-2.5" />
                      <span>{benchRunning ? 'Benchmarking...' : 'Test Speed'}</span>
                    </button>
                    <span className="text-zinc-500 font-mono">
                      Split: {Math.round(splitPos)}% / {100 - Math.round(splitPos)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom StatusBar */}
            <div className="h-6 bg-[#13141f] border-t border-zinc-800 px-3 flex items-center justify-between text-[10px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3 h-3" /> ConPTY IPC Connected
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">1 shell • 111.2K (56%) ctrl+p commands</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">[high] Gemini 3.5 Flash Lite</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500">v1.0.0</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
