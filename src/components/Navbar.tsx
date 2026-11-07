import React, { useState, useEffect } from 'react';
import { Github, Star, Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  onDownloadClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownloadClick }) => {
  const [stars, setStars] = useState<number>(1);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cacheKey = 'kingsley_stars_cache';
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { value } = JSON.parse(cached);
        if (typeof value === 'number') setStars(value);
      }
    } catch {
      // ignore
    }

    fetch('https://api.github.com/repos/alfarezeljopalino1-source/Kingsley')
      .then((res) => {
        if (!res.ok) throw new Error('API limit');
        return res.json();
      })
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ value: data.stargazers_count, time: Date.now() })
          );
        }
      })
      .catch(() => {
        // silent fallback to default
      });
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/kingsley-icon.png"
              alt="Kingsley Icon"
              className="w-8 h-8 rounded-lg object-contain shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all"
            />
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-zinc-100 tracking-tight">Kingsley</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition-colors">
              Features
            </a>
            <a href="#comparison" className="hover:text-zinc-100 transition-colors">
              Comparison
            </a>
            <a href="#shortcuts" className="hover:text-zinc-100 transition-colors">
              Shortcuts
            </a>
            <a href="#download" className="hover:text-zinc-100 transition-colors">
              Download
            </a>
          </div>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/alfarezeljopalino1-source/Kingsley"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition-all"
            >
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub</span>
              <span className="flex items-center gap-1 pl-1.5 border-l border-zinc-800 text-zinc-400">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                <span>{stars}</span>
              </span>
            </a>

            <a
              href="#download"
              onClick={onDownloadClick}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Kingsley</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Features
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Comparison
          </a>
          <a
            href="#shortcuts"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Shortcuts
          </a>
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-900"
          >
            Download
          </a>
          <div className="pt-2 border-t border-zinc-800 flex gap-2">
            <a
              href="https://github.com/alfarezeljopalino1-source/Kingsley"
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300"
            >
              ★ Star on GitHub
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-medium bg-blue-600 rounded-lg text-white"
            >
              Download v1.0.0
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
