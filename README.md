# Kingsley Web 👑

> The official showcase landing page and download hub for **Kingsley Terminal Multiplexer** — native ConPTY speed on Windows, POSIX core on macOS, fluid resizable split-panes, and agentic workflows.

🌐 **Live Website**: [https://kingsley.my.id](https://kingsley.my.id)  
📦 **Binary Source**: [Kingsley GitHub Releases](https://github.com/alfarezeljopalino1-source/Kingsley/releases)  
📄 **License**: [MIT License](LICENSE)

---

## ⚡ Overview

**Kingsley Web** is the official web showcase and software distribution hub for Kingsley. Designed with strict anti-AI-slop engineering standards, it demonstrates Kingsley's desktop terminal capabilities, live theme palettes, and keyboard ergonomics directly inside the browser before downloading.

### Key Capabilities Showcased:
1. **Real-time GitHub Star Counter**:
   - Direct integration with GitHub's REST API (`/repos/alfarezeljopalino1-source/Kingsley`).
   - Automatically updates in real time whenever users star the repository.
   - Zero-delay load with *Stale-While-Revalidate* session storage caching.

2. **Continuous Animated Desktop Showcase**:
   - 100% faithful replica of the live Kingsley desktop app interface (TitleBar, Projects Sidebar, Split Terminal Panes, and Status Bar).
   - Hypnotic, non-stop automated 60fps promotional motion loop simulating fast PowerShell compilation, fluid divider resizing (`53% : 47%`), and live AI Agent ConPTY streaming.
   - Locked in pure video showcase mode without interactive click interruptions.

3. **Core Architecture Deep-Dive Matrix**:
   - **Fluid Resizable Split-Panes**: Mouse drag resizing and instant keyboard triggers (`Ctrl+Shift+D` / `Ctrl+Shift+E`) without tmux configuration hassles.
   - **Direct Path Drag & Drop**: Native Win32 OS drop hook that injects clean, escaped paths directly into terminal stdin with 0ms latency and zero clipboard pollution.
   - **Embedded Live Web Browser**: Built-in Chromium preview pane docked beside terminal shells for testing localhost servers (`localhost:5173`) with zero Alt+Tab.
   - **Native MCP Skills & Plugins Hub**: 1-click Model Context Protocol (MCP) server manager for autonomous coding agents (`omp`, `claude-code`, `codex`, `aider`).

4. **Interactive Theme Studio**:
   - Real-time preview of Kingsley's handcrafted color palettes:
     - `Kingsley Obsidian` (Matte Black & Electric Cyan)
     - `Tokyo Night` (Deep Indigo & Violet)
     - `Cyberpunk Neon` (High-Voltage Yellow & Cyan)
     - `Dracula Pro` (Vampire Purple & Pink)
     - `Matrix Core` (Phosphor Hacker Green)
     - `Rosé Pine` (Muted Coral & Gold)

5. **Keyboard Shortcuts Cheat Sheet**:
   - Interactive keycap grid covering essential multiplexer keybindings for split navigation, pane cycling, and session restarts.

6. **Official Download Matrix & Security Verification**:
   - Direct downloads served through GitHub Global CDN:
     - **Windows 64-bit**: NSIS Installer (`.exe`)
     - **macOS Apple Silicon**: Disk Image (`.dmg`)
     - **macOS Portable**: Compressed Archive (`.zip`)
   - Verifiable SHA-256 checksums with one-click copy.
   - Windows SmartScreen notice guidance for open-source binaries.

---

## 🚀 Fast Terminal Install

Users can install Kingsley directly from their preferred shell:

### PowerShell (Windows):
```powershell
irm kingsley.my.id/win | iex
```

### cURL (macOS):
```bash
curl -fsSL kingsley.my.id/mac | bash
```

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting Target**: Apache on DomaiNesia (`.htaccess` routing) / Static Edge CDN

---

## 📁 Project Structure

```text
kingsley-web/
├── public/
│   ├── .htaccess            # Apache HTTPS redirect & /win, /mac MIME routing
│   ├── install.ps1          # PowerShell one-liner bootstrap installer
│   ├── install.sh           # macOS terminal bootstrap installer
│   ├── kingsley-icon.png    # Official Kingsley crown emblem
│   └── favicon.png          # Browser favicon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation & live GitHub star counter
│   │   ├── Hero.tsx             # Headline, CTAs, and quick terminal snippets
│   │   ├── TerminalMockup.tsx   # Continuous 60fps Kingsley desktop app showcase
│   │   ├── BentoGrid.tsx        # 4-card core architecture showcase
│   │   ├── WorkflowShowcase.tsx # Interactive Theme Studio & ecosystem
│   │   ├── Shortcuts.tsx        # Keyboard shortcuts keycap matrix
│   │   ├── DownloadMatrix.tsx   # Official binaries, checksums & SmartScreen accordion
│   │   └── Footer.tsx           # Minimalist footer & author credits
│   ├── App.tsx                  # Root layout
│   ├── main.tsx                 # React DOM mount point
│   └── index.css                # Tailwind directives & typography
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 💻 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/alfarezeljopalino1-source/Kingsley-web.git
cd Kingsley-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
Compiled production files will be output to the `dist/` directory, complete with `.htaccess` and static installer scripts.

---

## 🌐 Server Deployment (DomaiNesia cPanel)

1. Run `npm run build`.
2. Open **cPanel File Manager** on DomaiNesia.
3. Upload all contents of the `dist/` folder directly to `public_html/`.
4. Ensure `.htaccess` is present in `public_html/` to enable:
   - Automated HTTPS redirection.
   - Clean route resolution for `kingsley.my.id/win` (`text/plain` PowerShell execution).
   - Clean route resolution for `kingsley.my.id/mac` (`text/plain` bash execution).
   - Single-Page Application (SPA) fallback routing.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free and open source.

Crafted by **Alfarezel Jopalino**.
