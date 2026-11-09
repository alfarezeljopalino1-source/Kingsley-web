import React, { useState } from 'react';
import { Download, Copy, Check, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const DownloadMatrix: React.FC = () => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [smartScreenOpen, setSmartScreenOpen] = useState<boolean>(true);

  const files = [
    {
      os: 'Windows',
      arch: 'x64 (Windows 10/11)',
      format: 'NSIS Installer (.exe)',
      filename: 'Kingsley.Setup.1.0.1.exe',
      size: '~90 MB',
      url: 'https://github.com/alfarezeljopalino1-source/Kingsley/releases/download/v1.0.1/Kingsley.Setup.1.0.1.exe',
      sha256: '658137193a69c84bfe8bd7b071523e08ed6ae46694380325864dff66cd5c7557',
      badge: 'Recommended for PC',
      accent: 'border-blue-500/60 bg-blue-950/10',
    },
    {
      os: 'macOS',
      arch: 'Apple Silicon (M1/M2/M3/M4)',
      format: 'Disk Image (.dmg)',
      filename: 'Kingsley-1.0.1-arm64.dmg',
      size: '~101 MB',
      url: 'https://github.com/alfarezeljopalino1-source/Kingsley/releases/download/v1.0.1/Kingsley-1.0.1-arm64.dmg',
      sha256: 'd9311cac4473088fd363d1c382c90b3256c1299beea77d64e15a2d9227d04542',
      badge: 'Apple Silicon DMG',
      accent: 'border-zinc-800 bg-[#0d0d12]',
    },
    {
      os: 'macOS',
      arch: 'Apple Silicon (Portable)',
      format: 'Compressed Archive (.zip)',
      filename: 'Kingsley-1.0.1-arm64-mac.zip',
      size: '~98 MB',
      url: 'https://github.com/alfarezeljopalino1-source/Kingsley/releases/download/v1.0.1/Kingsley-1.0.1-arm64-mac.zip',
      sha256: 'b23bb279e2f61d685ee1a88c1555d289677cd2cf7088e1b716ca96bac3ad0d67',
      badge: 'Standalone Zip',
      accent: 'border-zinc-800 bg-[#0d0d12]',
    },
  ];

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section id="download" className="py-20 border-t border-zinc-800/80 bg-[#0c0c11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
            OFFICIAL BINARIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Download Kingsley v1.0.1
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Static client binaries served directly via GitHub Global CDN. Zero intermediate proxy, 100% verified checksums.
          </p>
        </div>

        {/* 3 Download Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {files.map((file, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 flex flex-col justify-between shadow-xl transition-all ${file.accent}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-900 border border-zinc-700 text-zinc-300">
                    {file.badge}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{file.size}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{file.os}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{file.arch}</p>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 truncate">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Binary Target</p>
                  <p className="truncate text-blue-300">{file.filename}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 space-y-3">
                <a
                  href={file.url}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {file.format}</span>
                </a>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="truncate pr-2">SHA-256</span>
                  <button
                    onClick={() => handleCopyHash(file.sha256, file.filename)}
                    className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors"
                  >
                    {copiedHash === file.filename ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Windows Defender SmartScreen Friendly Accordion */}
        <div className="max-w-3xl mx-auto rounded-xl border border-zinc-800 bg-[#09090d] overflow-hidden">
          <button
            onClick={() => setSmartScreenOpen(!smartScreenOpen)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Catatan Instalasi Windows (SmartScreen Notice)
                </h4>
                <p className="text-xs text-zinc-500">
                  Kenapa muncul "Windows protected your PC" dan cara mengatasinya
                </p>
              </div>
            </div>
            {smartScreenOpen ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {smartScreenOpen && (
            <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 space-y-3 border-t border-zinc-800/60 leading-relaxed font-sans">
              <p>
                Sebagai proyek <strong className="text-zinc-200">100% Free & Open Source</strong> tanpa sertifikat korporat komersial ($400/tahun), Windows SmartScreen mungkin akan menampilkan dialog proteksi biru saat Anda pertama kali menjalankan installer.
              </p>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 space-y-1.5">
                <p className="text-emerald-400 font-semibold">Langkah mudah untuk melanjutkan:</p>
                <p>1. Pada jendela biru "Windows protected your PC", klik <span className="text-white underline">More info</span>.</p>
                <p>2. Klik tombol <span className="text-white font-semibold">Run anyway</span>.</p>
                <p>3. Installer Kingsley akan berjalan dan terpasang dengan aman.</p>
              </div>
              <p className="text-zinc-500 text-[11px]">
                Seluruh source code dapat diaudit secara bebas dan transparan di repositori GitHub kami.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
