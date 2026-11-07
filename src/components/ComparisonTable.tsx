import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisons = [
    {
      feature: 'Fluid Mouse-Draggable Split Divider',
      kingsley: { val: 'Native & Smooth', ok: true },
      wt: { val: 'Limited / Rigid', ok: false },
      tmux: { val: 'Complex Config Required', ok: false },
    },
    {
      feature: 'Direct File Path Drag & Drop',
      kingsley: { val: 'Zero-Copy Auto Escape', ok: true },
      wt: { val: 'Inconsistent quotes', ok: false },
      tmux: { val: 'Manual Paste Only', ok: false },
    },
    {
      feature: 'Windows ConPTY Native Engine',
      kingsley: { val: 'Built-in ConPTY', ok: true },
      wt: { val: 'Built-in ConPTY', ok: true },
      tmux: { val: 'Requires WSL / Emulation', ok: false },
    },
    {
      feature: 'macOS Apple Silicon Native (POSIX)',
      kingsley: { val: 'Native arm64 Binary', ok: true },
      wt: { val: 'Not Available', ok: false },
      tmux: { val: 'Native POSIX', ok: true },
    },
    {
      feature: 'Out-of-the-Box Setup Overhead',
      kingsley: { val: '0 Minutes (Instant)', ok: true },
      wt: { val: 'Medium JSON configuration', ok: 'neutral' },
      tmux: { val: 'High (.tmux.conf scripts)', ok: false },
    },
    {
      feature: 'AI CLI Workflow Flow (omp / claude)',
      kingsley: { val: 'Dedicated split context', ok: true },
      wt: { val: 'Separate tab switching', ok: 'neutral' },
      tmux: { val: 'Manual pane management', ok: 'neutral' },
    },
    {
      feature: 'License & Cost',
      kingsley: { val: '100% Free (MIT)', ok: true },
      wt: { val: 'Free (MIT)', ok: true },
      tmux: { val: 'Free (BSD)', ok: true },
    },
  ];

  return (
    <section id="comparison" className="py-20 border-t border-zinc-800/80 bg-[#0c0c11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950/60 text-blue-300 border border-blue-800/50">
            TECHNICAL AUDIT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            How Kingsley Compares
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            No marketing hype. A straightforward breakdown of why Kingsley fits modern terminal workflows better.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="rounded-2xl border border-zinc-800 bg-[#09090d] shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 text-xs font-semibold text-zinc-400">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6 text-blue-400 bg-blue-950/20 border-x border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Kingsley</span>
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-sans">v1.0</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-zinc-400">Windows Terminal</th>
                  <th className="py-4 px-6 text-zinc-400">tmux</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-200">
                      {row.feature}
                    </td>

                    {/* Kingsley Column */}
                    <td className="py-4 px-6 font-semibold bg-blue-950/10 border-x border-zinc-800/80 text-blue-300">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.kingsley.val}</span>
                      </div>
                    </td>

                    {/* Windows Terminal */}
                    <td className="py-4 px-6 text-zinc-400">
                      <div className="flex items-center gap-2">
                        {row.wt.ok === true ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : row.wt.ok === 'neutral' ? (
                          <Minus className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 shrink-0" />
                        )}
                        <span>{row.wt.val}</span>
                      </div>
                    </td>

                    {/* tmux */}
                    <td className="py-4 px-6 text-zinc-400">
                      <div className="flex items-center gap-2">
                        {row.tmux.ok === true ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : row.tmux.ok === 'neutral' ? (
                          <Minus className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 shrink-0" />
                        )}
                        <span>{row.tmux.val}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
