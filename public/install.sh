#!/usr/bin/env bash
set -e

URL="https://github.com/alfarezeljopalino1-source/Kingsley/releases/download/v1.0.1/Kingsley-1.0.1-arm64.dmg"
DEST="/tmp/Kingsley.dmg"

echo "⚡ Downloading Kingsley Terminal v1.0.1 for macOS..."
curl -# -L -o "$DEST" "$URL"

echo "✓ Opening installer..."
open "$DEST"
