# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# KINGSLEY WEB (Official Showcase & Download Hub)

**Document Version:** 1.0.0  
**Owner / Creator:** Alfarezel Jopalino (Bro Jopal)  
**Lead Engineer:** Ben  
**Status:** Approved & Ready for Implementation  
**Project Path:** `D:\backup data C\OneDrive\Kingsley Web`  
**Repository Target:** `https://github.com/alfarezeljopalino1-source/Kingsley-Web`  
**Binary Source:** `https://github.com/alfarezeljopalino1-source/Kingsley/releases`  
**Total Infrastructure Budget:** **Rp 0 / $0.00 (Strict 100% Free Tier & Open Source)**

---

## 1. Executive Summary & Purpose

**Kingsley Web** adalah website resmi showcase produk dan *download hub* untuk **Kingsley** — Next-Generation Terminal Multiplexer untuk Windows dan macOS buatan Alfarezel Jopalino.

Tujuan utama website ini:
1. **Show, Don't Tell**: Menampilkan performa dan keunggulan Kingsley secara interaktif (pengunjung dapat menguji *fluid resizable split-pane* langsung di browser sebelum mengunduh).
2. **Zero Friction Download**: Mendeteksi sistem operasi pengunjung secara otomatis (Windows / macOS) dan memberikan direct-download link instan ke binary rilis GitHub CDN.
3. **Developer-Grade Trust**: Menyajikan checksum SHA-256 resmi dan panduan bypass Windows Defender SmartScreen yang ramah developer.
4. **Zero Maintenance & Zero Cost**: Berjalan 100% statis di Edge CDN gratis (Vercel) dengan binary hosting gratis di GitHub Releases.

---

## 2. Core Principles & Non-Negotiables

### 🚫 STRICT ANTI AI-SLOP LAWS
1. **Haram Gradien Neon Murahan**: Dilarang menggunakan gradien ungu-pink-cyan generik (`from-purple-500 to-cyan-500`). Palet warna wajib berbasis **Deep Obsidian (`#09090b`)**, **Surface Dark (`#121217`)**, dan aksen fungsional **Electric Blue (`#3b82f6`)** atau **Crisp White (`#f4f4f5`)**.
2. **Haram Ilustrasi 3D / Vektor Kartun**: Tidak ada gambar maskot generic, robot 3D mengkilap, atau blob vektor mengambang. Visual wajib berupa **komponen terminal realistis**, teks ANSI autentik, dan representasi interface nyata.
3. **Haram Copywriting Basi**: Dilarang menggunakan jargon korporat AI generik (*"Unleash the ultimate power of AI synergy"*). Semua copy wajib kering, teknis, jujur, dan to-the-point khas software engineer.
4. **Haram Animasi Melayang Lambat**: Tidak ada floating card atau bouncing animation yang mengganggu. Semua micro-interaction wajib cepat dan presisi (100–150ms `ease-out`).
5. **Proporsi Border Disiplin**: Menggunakan border 1px tajam (`border-zinc-800` / `#27272a`) dengan `rounded-lg` (8px–12px). Dilarang menggunakan rounded 24px/32px bengkak tanpa tujuan.

### 💰 ZERO-COST BUDGET CONSTRAINTS
* **Compute / Hosting**: Vercel Hobby Tier (Rp 0, Unlimited static edge requests, Free SSL).
* **Storage & Bandwidth Binary**: GitHub Releases CDN (Rp 0, Unlimited direct downloads).
* **Domain**: `kingsley.vercel.app` atau subdomain gratis (Rp 0).
* **Code Signing**: Sertifikat berbayar $400/th dicoret total (Rp 0). Menggunakan panduan transparansi SmartScreen + SHA-256 verified checksum.
* **Libraries**: 100% MIT / Apache 2.0 Open Source.

---

## 3. Target User Personas & Problem Statement

### Target Personas
1. **Windows Power Developers**: Engineer yang frustrasi dengan keterbatasan Windows Terminal (split pane kaku, navigasi ribet, tidak ada drag-and-drop path instan).
2. **AI CLI Workflow Users**: Pengguna tools AI coding agent (omp, claude-code, Aider) yang membutuhkan terminal pendamping cepat untuk menjalankan server/test tanpa keluar dari shell.
3. **Cross-Platform Developers**: Mahasiswa dan profesional yang bekerja bergantian di Windows dan macOS Apple Silicon yang membutuhkan terminal multiplexer modern tanpa konfigurasi tmux yang rumit.

### Problem vs Solution Matrix
| Masalah Developer | Solusi Kingsley | Implementasi di Web |
| :--- | :--- | :--- |
| Config tmux rumit (`.tmux.conf`) | Fluid split-pane pakai mouse & shortcut mudah | Mockup split-pane interaktif di Hero |
| Input path file panjang di terminal rawan typo | Drag & drop file langsung terkonversi jadi clean path | Visual demo drag & drop di Bento Grid |
| Split screen terminal Windows terasa lambat | Native ConPTY raw performance, zero latency | Benchmark badge & ANSI true-color test card |
| Bingung cari installer yang cocok | Smart OS detection & instant CDN download | Tombol CTA dinamis otomatis pilih OS |

---

## 4. Page Architecture & Section Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│ 01. NAVBAR (Sticky Glassmorphism)                               │
├─────────────────────────────────────────────────────────────────┤
│ 02. HERO & SMART DOWNLOAD CTA                                   │
│     - Headline & Subheadline                                    │
│     - Primary CTA (Auto-detect OS) & Secondary CTA (GitHub)     │
│     - Quick Terminal Install Snippet (PowerShell / cURL)        │
├─────────────────────────────────────────────────────────────────┤
│ 03. PLAYABLE HERO TERMINAL MOCKUP                               │
│     - Traffic Lights Header & Tab Status                        │
│     - Resizable Draggable Divider (Interactive in browser!)     │
│     - Left: ConPTY Shell / Right: AI Agent CLI Output           │
├─────────────────────────────────────────────────────────────────┤
│ 04. BENTO GRID FEATURES SHOWCASE                                │
│     - Card 1: Fluid Resizable Split-Panes (Interactive Switcher)│
│     - Card 2: Direct Path Drag-and-Drop (Visual Simulation)     │
│     - Card 3: Native ConPTY & POSIX Engine (Latency & TrueColor)│
│     - Card 4: AI Workflow Ready (omp / agent companion)        │
├─────────────────────────────────────────────────────────────────┤
│ 05. KINGSLEY VS TRADITIONAL MULTIPLEXERS (Comparison Matrix)    │
├─────────────────────────────────────────────────────────────────┤
│ 06. INTERACTIVE KEYBOARD SHORTCUTS CHEAT SHEET                  │
├─────────────────────────────────────────────────────────────────┤
│ 07. DOWNLOAD MATRIX & SECURITY INTEGRITY                        │
│     - Windows Setup (.exe) + macOS (.dmg / .zip)                │
│     - SHA-256 Checksums (1-Click Copy)                          │
│     - Windows SmartScreen Helper Accordion                      │
├─────────────────────────────────────────────────────────────────┤
│ 08. MINIMALIST FOOTER (Credit: Alfarezel Jopalino • MIT)        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Detailed Section Specifications

### 01. Sticky Navbar
* **Brand Logo**: Monogram `[K]` minimalis + teks `Kingsley` font sans bold.
* **Navigation Links**: Smooth scroll anchor ke `#features`, `#shortcuts`, `#download`.
* **Social / Metric Badge**: Link ke GitHub repo dengan ikon Star (`lucide-react`) dan live star count (fallback: statis).
* **CTA Button**: Tombol kecil `Download v1.0.0` yang muncul jika user scroll melewati Hero section.
* **Style**: `sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80`.

### 02. Hero Section
* **Release Pill**: Micro-badge monospace: `● v1.0.0 STABLE RELEASE • WINDOWS & MACOS`.
* **Headline**: 
  > **The Terminal Multiplexer That Doesn't Get in Your Way.**
* **Subheadline**:
  > *Native ConPTY speed on Windows. POSIX core on macOS. Fluid resizable split-panes and instant path drag-and-drop without tmux configuration headaches.*
* **Primary CTA**:
  * Windows Visitor: `Download for Windows (v1.0.0)` (Link langsung ke `Kingsley.Setup.1.0.0.exe`).
  * macOS Visitor: `Download for macOS (Apple Silicon)` (Link langsung ke `Kingsley-1.0.0-arm64.dmg`).
* **Secondary CTA**: `View on GitHub` dengan GitHub icon.
* **CLI One-Liner Tab**:
  * Box command bar dengan tombol copy:
    ```powershell
    irm https://github.com/alfarezeljopalino1-source/Kingsley/releases/latest/download/Kingsley.Setup.1.0.0.exe -OutFile Kingsley-Setup.exe; .\Kingsley-Setup.exe
    ```

### 03. Playable Hero Terminal Mockup (Centerpiece)
* **Window Frame**: macOS-style traffic lights (`#ff5f56`, `#ffbd2e`, `#27c93f`), tab title `kingsley: main-split`, audio/status pill.
* **Interactive Draggable Divider**:
  * Divider tengah 2px vertikal yang **bisa digeser pengunjung menggunakan kursor mouse** (state `splitPosition` 20% - 80%).
  * Efek visual subtle highlight biru saat mouse hover/drag divider.
* **Left Pane (ConPTY Shell)**:
  * Menampilkan simulasi shell modern:
    ```bash
    kingsley ~/projects/kingsley-app (main)
    $ git status
    On branch main
    Your branch is up to date with 'origin/main'.
    nothing to commit, working tree clean
    ```
* **Right Pane (AI CLI Workflow)**:
  * Menampilkan proses agent:
    ```bash
    [omp] analyzing local workspace...
    [ok] conpty stream connected (latency: 0.2ms)
    ready for instructions.
    ```
* **Mobile Behavior**: Di layar $< 768\text{px}$, divider drag dinonaktifkan, diganti tab button sederhana (`Pane 1` / `Pane 2`).

### 04. Bento Grid Features Showcase
1. **Card 1: Fluid Resizable Split-Panes (Large Card, Col-Span 2)**:
   * Preview interaktif layout grid (Horizontal split, Vertical split).
   * Copy: *"Bebas atur ukuran pane dengan mouse drag atau keyboard shortcut tanpa restart session."*
2. **Card 2: Direct Path Drag-and-Drop (Col-Span 1)**:
   * Simulasi animasi visual: File ditarik dari desktop ke terminal langsung ter-escape rapi jadi path absolut.
   * Copy: *"Zero typo. Cukup drag file ke pane aktif, path langsung tertulis instan."*
3. **Card 3: Native ConPTY & POSIX Core (Col-Span 1)**:
   * TrueColor ANSI spectrum bar demo (`#ff0055`, `#00e5ff`, `#76ff03`).
   * Copy: *"Bukan web-terminal emulator lambat. Kingsley menggunakan Windows ConPTY asli untuk raw shell speed."*
4. **Card 4: Tailored for AI Agents (Col-Span 2)**:
   * Visual terminal split antara dev server dan omp/claude-code.
   * Copy: *"Pantau output agent AI di satu sisi sambil tetap bebas koding di sisi lain tanpa kehilangan konteks."*

### 05. Kingsley vs Traditional Multiplexers (Comparison Matrix)
Tabel perbandingan ringkas dan faktual:

| Fitur | Kingsley | Windows Terminal | tmux |
| :--- | :---: | :---: | :---: |
| **Mouse Draggable Split Divider** | **Ya (Fluid Native)** | Terbatas | Butuh config rumit |
| **Direct Path Drag & Drop** | **Ya (Zero Copy)** | Tidak konsisten | Manual paste |
| **Windows Native (ConPTY)** | **Ya** | Ya | Tidak (butuh WSL) |
| **macOS Native (POSIX)** | **Ya** | Tidak ada | Ya |
| **Setup & Config Overhead** | **0 Menit (Out of the box)** | Sedang | Tinggi (`.tmux.conf`) |
| **Biaya & Lisensi** | **100% Free (MIT)** | Free | Free |

### 06. Interactive Keyboard Shortcuts Cheat Sheet
Grid kartu keycap mekanikal gelap:
* `Ctrl + Shift + D`: Split Pane Horizontal
* `Ctrl + Shift + E`: Split Pane Vertical
* `Ctrl + W`: Close Active Pane
* `Ctrl + Tab`: Cycle Next Pane
* `Ctrl + Shift + F`: Toggle Fullscreen Pane
* `Ctrl + Shift + R`: Reload Session

### 07. Download Matrix & Trust Center
* **Direct Download Cards**:
  1. **Windows Installer**: `Kingsley.Setup.1.0.0.exe` (~90 MB) — Windows 10/11 64-bit.
  2. **macOS Apple Silicon**: `Kingsley-1.0.0-arm64.dmg` (~101 MB) — M1/M2/M3/M4.
  3. **macOS Portable Zip**: `Kingsley-1.0.0-arm64-mac.zip` (~98 MB).
* **SHA-256 Checksum Bar**:
  * Tampilkan hash SHA-256 dengan tombol 1-klik `Copy SHA-256` untuk verifikasi integritas file.
* **SmartScreen Friendly Guide (Accordion)**:
  * Box informasi berkelas: *"Catatan Instalasi Windows: Karena Kingsley adalah proyek open-source independen tanpa sertifikat korporat berbayar, jika Windows SmartScreen muncul: Klik **'More info'** lalu pilih **'Run anyway'**."*

### 08. Minimalist Footer
* Credit teks: *"Designed & Built by **Alfarezel Jopalino** (Bro Jopal) with engineering partner **Ben**."*
* Links: GitHub Repository, Issue Tracker, Release Notes, MIT License.
* Status indicator: `● All Systems Operational • CDN Edge Global`.

---

## 6. Design System & Token Specifications

### Color Tokens (Strict Dark Palette)
```css
/* Backgrounds */
--bg-base: #09090b;        /* Zinc 950 - Ultra dark matte */
--bg-surface: #121217;     /* Elevated card surface */
--bg-elevated: #18181f;    /* Hover & active states */

/* Borders */
--border-subtle: #27272a;  /* Zinc 800 - Crisp 1px rule */
--border-highlight: #3f3f46;/* Zinc 700 - Hover highlight */

/* Text */
--text-primary: #f4f4f5;   /* Zinc 100 - High contrast */
--text-secondary: #a1a1aa; /* Zinc 400 - Readable muted */
--text-muted: #71717a;     /* Zinc 500 - Captions & hotkeys */

/* Accents */
--accent-primary: #3b82f6; /* Blue 500 - Primary actions */
--accent-hover: #2563eb;   /* Blue 600 */
--accent-glow: rgba(59, 130, 246, 0.12);
--accent-success: #10b981; /* Emerald 500 - Live badges */
```

### Typography Hierarchy
* **Headings**: `Inter` / `Geist Sans` dengan `font-bold tracking-tight text-zinc-100`.
* **Body / Descriptions**: `Inter` dengan `font-normal text-zinc-400 leading-relaxed`.
* **Code / Terminal / Keycaps**: `JetBrains Mono` / `Geist Mono` dengan `font-mono text-sm tracking-normal`.

---

## 7. Technical Architecture & Constraints

* **Runtime & Tooling**: Node.js / Bun + Vite (Build output: 100% static client bundle).
* **UI Framework**: React 18+ (TypeScript).
* **CSS Framework**: Tailwind CSS (JIT, purged output $< 25\text{ KB}$ CSS).
* **Icon Library**: `lucide-react` (Tree-shaken, zero unused SVG).
* **Motion / Animation**: Lightweight CSS transitions + Framer Motion untuk micro-interactions (durasi 150ms).
* **Data Sources**:
  * Versi rilis: Hardcoded fallback `v1.0.0` (zero delay).
  * Dynamic GitHub API: `https://api.github.com/repos/alfarezeljopalino1-source/Kingsley` (Cached in `sessionStorage` 30 menit).
* **Deployment Target**: Vercel (Edge static CDN, Free Tier).

---

## 8. Performance & SEO Targets

* **Lighthouse Performance Score**: $\ge 98$ / 100.
* **First Contentful Paint (FCP)**: $< 0.8$ detik.
* **Total Blocking Time (TBT)**: $< 50\text{ ms}$.
* **Cumulative Layout Shift (CLS)**: $0.00$ (Zero layout shift).
* **OpenGraph Social Preview**:
  * Title: `Kingsley — The Next-Gen Terminal Multiplexer`
  * Description: `Native ConPTY speed, fluid resizable split-panes, and direct path drag-and-drop for Windows & macOS.`
  * Image: `/og-image.png` (1200x630 dark slate preview mockup).

---

## 9. Implementation Roadmap & Milestones

### Milestone 1: Setup & Project Scaffolding
- [ ] Initialize Vite + React (TypeScript) di folder `Kingsley Web`.
- [ ] Install & configure Tailwind CSS, Lucide React, Font families.
- [ ] Setup asset folder (`og-image.png`, `favicon.svg`).

### Milestone 2: Navbar, Hero & Interactive Draggable Mockup
- [ ] Build Sticky Navbar dengan glassmorphism & GitHub star counter.
- [ ] Implement Smart OS Detection (Windows vs macOS user agent).
- [ ] Build Hero CTA & One-Liner Terminal Copy bar.
- [ ] Implement **Playable Draggable Split-Pane Terminal** (mouse drag state, dual shell preview).

### Milestone 3: Bento Grid, Comparison Table & Shortcuts
- [ ] Build 4-card Bento Grid dengan demo micro-interactions.
- [ ] Build Comparison Matrix (Kingsley vs Windows Terminal vs tmux).
- [ ] Build Interactive Keyboard Shortcuts Keycap Grid.

### Milestone 4: Download Matrix, Trust Center & Deploy
- [ ] Build Multi-Platform Download Matrix (`.exe`, `.dmg`, `.zip`).
- [ ] Add SHA-256 Checksum copy buttons & SmartScreen Help Accordion.
- [ ] Build Minimalist Developer Footer.
- [ ] Production build verification (`npm run build`).
- [ ] Deploy to Vercel & verify live production URL.

---
**Approved by:** Alfarezel Jopalino (Bro Jopal) & Ben  
**Date:** 2026-11-07