#!/bin/bash
cd "$(dirname "$0")/dist"

echo "Starting Bunny ABC server..."
echo "The game will open in your browser shortly."
echo ""
echo "To stop the server, press Ctrl+C"
echo ""

# Open browser
open "http://localhost:8000" 2>/dev/null || xdg-open "http://localhost:8000" 2>/dev/null || echo "Please open http://localhost:8000 in your browser"

# Try Python first
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
elif command -v npx &> /dev/null; then
    npx --yes serve -l 8000 .
else
    echo ""
    echo "ERROR: Cannot start server."
    echo "Please install Python or Node.js, then try again."
    echo ""
    read -p "Press Enter to exit..."
fi
