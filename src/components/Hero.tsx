import React, { useState, useEffect } from 'react';
import { Download, Github, Copy, Check, ShieldCheck } from 'lucide-react';
import { TerminalMockup } from './TerminalMockup';

export const Hero: React.FC = () => {
  const [os, setOs] = useState<'windows' | 'mac'>('windows');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCliTab, setActiveCliTab] = useState<'powershell' | 'curl'>('powershell');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes('mac')) {
        setOs('mac');
        setActiveCliTab('curl');
      } else {
        setOs('windows');
        setActiveCliTab('powershell');
      }
    }
  }, []);

  const downloadLinks = {
    windows: {
      name: 'Windows 64-bit (Setup)',
      file: 'Kingsley.Setup.1.0.0.exe',
      size: '~90 MB',
      url: 'https://github.com/alfarezeljopalino1-source/Kingsley/releases/latest/download/Kingsley.Setup.1.0.0.exe',
    },
    mac: {
      name: 'macOS Apple Silicon (DMG)',
      file: 'Kingsley-1.0.0-arm64.dmg',
      size: '~101 MB',
      url: 'https://github.com/alfarezeljopalino1-source/Kingsley/releases/latest/download/Kingsley-1.0.0-arm64.dmg',
    },
  };

  const cliCommands = {
    powershell: `irm kingsley.vercel.app/win | iex`,
    curl: `curl -fsSL kingsley.vercel.app/mac | bash`,
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommands[activeCliTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentDownload = downloadLinks[os];

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background radial gradient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.1]">
            The Terminal Multiplexer That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Doesn't Get in Your Way.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Native ConPTY speed on Windows. POSIX core on macOS. Fluid resizable split-panes and
            instant path drag-and-drop without tmux configuration headaches.
          </p>

          {/* Key capability pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <span className="text-cyan-400 font-bold">⚡</span> 0.18ms ConPTY IPC
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <span className="text-blue-400 font-bold">🪟</span> Fluid Resizable Split
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <span className="text-emerald-400 font-bold">🎯</span> Zero-Copy Path Drop
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <span className="text-purple-400 font-bold">🤖</span> AI CLI Flow Ready
            </span>
          </div>

          {/* Primary CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={currentDownload.url}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border border-blue-400/30 transition-all group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download for {os === 'windows' ? 'Windows' : 'macOS'}</span>
              <span className="text-xs text-blue-200/80 font-mono bg-blue-700/50 px-2 py-0.5 rounded">
                v1.0.0
              </span>
            </a>

            <a
              href="https://github.com/alfarezeljopalino1-source/Kingsley"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-medium text-sm text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              <Github className="w-4 h-4 text-zinc-400" />
              <span>View Source on GitHub</span>
            </a>
          </div>

          {/* Trust subtitle */}
          <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Free & Open Source (MIT)
            </span>
            <span>•</span>
            <span>{currentDownload.file} ({currentDownload.size})</span>
          </div>

          {/* Quick Terminal Install Snippet */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="rounded-lg border border-zinc-800 bg-[#0c0c11] overflow-hidden text-left shadow-lg">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/60 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">Fast Terminal Install:</span>
                  <button
                    onClick={() => setActiveCliTab('powershell')}
                    className={`px-2 py-0.5 rounded ${
                      activeCliTab === 'powershell'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800/60'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    PowerShell
                  </button>
                  <button
                    onClick={() => setActiveCliTab('curl')}
                    className={`px-2 py-0.5 rounded ${
                      activeCliTab === 'curl'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800/60'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    cURL
                  </button>
                </div>

                <button
                  onClick={handleCopyCli}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors text-[10px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 font-mono text-xs text-zinc-300 overflow-x-auto whitespace-nowrap">
                <span className="text-blue-400 select-none mr-2">❯</span>
                <code>{cliCommands[activeCliTab]}</code>
              </div>
            </div>
          </div>
        </div>

        {/* The Centerpiece: Playable Terminal Mockup */}
        <div className="mt-12 md:mt-16">
          <TerminalMockup />
        </div>
      </div>
    </section>
  );
};
