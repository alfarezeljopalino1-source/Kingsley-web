# Kingsley Web Development Guidelines

This repository contains the official showcase and download website for **Kingsley Terminal Multiplexer**.

## Architecture & Technology Stack
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Lucide React Icons
- **Hosting Target**: Apache on DomaiNesia (`.htaccess` routing) / Static Edge CDN
- **Domain**: `https://kingsley.my.id`
- **Endpoints**:
  - `/` — Kingsley showcase landing page (Single Page Application)
  - `/win` — PowerShell one-liner installer (`install.ps1`)
  - `/mac` — macOS terminal installer (`install.sh`)

## Project Commands
- `npm install` — Install project dependencies
- `npm run dev` — Start local development server on port 5173
- `npm run build` — Compile TypeScript and generate production bundle in `dist/`
- `npm run preview` — Preview production bundle locally

## Engineering Guidelines
1. **Zero AI Slop**: Maintain sharp hairline borders (`border-white/10` or `border-zinc-800`), dark matte surfaces, crisp monospaced typography, and meaningful developer interactions.
2. **Responsive Standards**: All components must render cleanly on mobile phones (375px–420px), tablets (768px–1024px), and ultra-wide displays without horizontal overflow.
3. **Verified CDN Links**: All binaries link directly to verified official GitHub Releases.
