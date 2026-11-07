import React, { useState } from 'react';

export const Shortcuts: React.FC = () => {
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);

  const shortcutsList = [
    {
      action: 'Split Pane Horizontally',
      description: 'Creates a new terminal pane stacked vertically below.',
      keys: ['Ctrl', 'Shift', 'D'],
      macKeys: ['⌘', 'Shift', 'D'],
    },
    {
      action: 'Split Pane Vertically',
      description: 'Creates a new side-by-side terminal pane to the right.',
      keys: ['Ctrl', 'Shift', 'E'],
      macKeys: ['⌘', 'Shift', 'E'],
    },
    {
      action: 'Close Active Pane',
      description: 'Terminates the focused shell session cleanly.',
      keys: ['Ctrl', 'W'],
      macKeys: ['⌘', 'W'],
    },
    {
      action: 'Cycle Next Pane',
      description: 'Switches keyboard focus smoothly between open split panes.',
      keys: ['Ctrl', 'Tab'],
      macKeys: ['⌃', 'Tab'],
    },
    {
      action: 'Toggle Fullscreen Pane',
      description: 'Maximizes the active split pane to take the entire window.',
      keys: ['Ctrl', 'Shift', 'F'],
      macKeys: ['⌘', 'Shift', 'F'],
    },
    {
      action: 'Restart Shell Session',
      description: 'Reloads the current pseudoterminal process and buffer.',
      keys: ['Ctrl', 'Shift', 'R'],
      macKeys: ['⌘', 'Shift', 'R'],
    },
  ];

  return (
    <section id="shortcuts" className="py-20 border-t border-zinc-800/80 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950/60 text-blue-300 border border-blue-800/50">
            KEYBOARD-DRIVEN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Intuitive Keyboard Shortcuts
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Keep your hands on the home row. Ergonomic shortcuts configured for rapid muscle memory.
          </p>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shortcutsList.map((sc, idx) => {
            const isSelected = activeShortcut === sc.action;
            return (
              <div
                key={idx}
                onClick={() => setActiveShortcut(isSelected ? null : sc.action)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none group ${
                  isSelected
                    ? 'border-blue-500/80 bg-blue-950/20 shadow-lg shadow-blue-500/10'
                    : 'border-zinc-800 bg-[#0d0d12] hover:border-zinc-700 hover:bg-[#111118]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    {sc.action}
                  </h4>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-900/40 px-2 py-0.5 rounded border border-blue-700/50">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  {sc.description}
                </p>

                {/* Keycaps Display */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  {sc.keys.map((k, kIdx) => (
                    <React.Fragment key={kIdx}>
                      <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded bg-zinc-900 border border-zinc-700/80 shadow-inner shadow-black/60 text-zinc-200 font-semibold text-[11px] group-hover:border-zinc-600 group-active:translate-y-0.5 transition-all">
                        {k}
                      </span>
                      {kIdx < sc.keys.length - 1 && (
                        <span className="text-zinc-600 font-sans text-xs">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
