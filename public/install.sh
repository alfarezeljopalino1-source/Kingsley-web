#!/usr/bin/env bash
set -e

URL="https://github.com/alfarezeljopalino1-source/Kingsley/releases/latest/download/Kingsley-1.0.0-arm64.dmg"
DEST="/tmp/Kingsley.dmg"

echo "⚡ Downloading Kingsley Terminal v1.0.0 for macOS..."
curl -# -L -o "$DEST" "$URL"

echo "✓ Opening installer..."
open "$DEST"
