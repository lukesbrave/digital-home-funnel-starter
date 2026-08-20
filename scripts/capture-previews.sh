#!/usr/bin/env bash
# Regenerates the previews/ screenshot set (3 themes x 3 screens)
# from the /preview route. Run the dev server first, then:
#   BASE_URL=http://localhost:3000 npm run previews
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [ ! -x "$CHROME" ]; then
  CHROME="$(command -v google-chrome || command -v chromium || true)"
fi
if [ -z "$CHROME" ]; then
  echo "No Chrome/Chromium binary found. Set CHROME=/path/to/chrome" >&2
  exit 1
fi

cd "$(dirname "$0")/.."
mkdir -p previews

# 1440x900 = a real 16:10 desktop viewport. The gallery shows these
# inside a 16:10 monitor frame, so every capture is the
# above-the-fold view, never a scaled-down full-page scroll.
for theme in clean manuscript signal; do
  for screen in landing quiz results; do
    echo "capturing $theme-$screen"
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
      --virtual-time-budget=6000 --window-size=1440,900 \
      --screenshot="previews/$theme-$screen.png" \
      "$BASE_URL/preview?theme=$theme&screen=$screen" 2>/dev/null
  done
done

# Sales-page composition slices (hero / offer / proof), same viewport.
for theme in clean manuscript signal; do
  for slice in hero offer proof; do
    echo "capturing $theme-sales-page-$slice"
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
      --virtual-time-budget=6000 --window-size=1440,900 \
      --screenshot="previews/$theme-sales-page-$slice.png" \
      "$BASE_URL/preview?theme=$theme&screen=sales-$slice" 2>/dev/null
  done
done

echo "done: $(ls previews | wc -l | tr -d ' ') files in previews/"
