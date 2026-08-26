#!/bin/bash
# ============================================================================
# capture.sh : headless screenshots of this viz, one per named state.
#
#   bash docs/capture.sh                 every state in STATES, light theme
#   bash docs/capture.sh dark            every state in STATES, dark theme
#
# Writes PNGs into /private/tmp/genie-shots and copies the table shot to
# docs/screenshot-table.png. THEN GO AND LOOK AT THEM. The course-viz skill
# says this twice and gives the reason: an agent has no eyes, and a screenshot
# nobody opens is a file rather than a verification.
#
# TWO MACOS GOTCHAS, both cost time on 2026-08-26 and both are handled here.
#
# 1. Chrome 151 on macOS does not exit after --screenshot. The PNG is written
#    within about two seconds and complete, and then the process sits there.
#    --virtual-time-budget is not honoured by the new headless mode, so the
#    `timeout 10` below is doing real work rather than papering over a hang.
#    Check the byte count, not the exit code: exit 124 with a PNG on disk is
#    a successful shot.
#
# 2. NEVER clean up with `pkill -f "Google Chrome"`. Carlos works in a real
#    Chrome with many tabs and often a second Chrome holding a hand-done ETH
#    Shibboleth login on the CDP port. A bare pattern takes all of it down
#    with no crash dialog, so it presents as "Chrome started crashing". The
#    cleanup below is scoped to this script's own --user-data-dir.
# ============================================================================
set -u

VIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHOT=/private/tmp/genie-shots
PROFILE="$SHOT/profile"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
THEME="${1:-light}"
SIZE="${2:-1400,1000}"

mkdir -p "$PROFILE"

# state name -> the URL fragment that reaches it. ?test= routes to the scene
# that owns the state, so one parameter is enough (see js/main.js TEST_SCENE).
STATES=(
  "scene0:?test=rules&instant"
  "table:?test=filled&instant"
  "fullstep:?test=full&instant"
  "broken-a:?test=broken-a&instant"
  "broken-b:?test=broken-b&instant"
  "fixed-b:?test=fixed-b&instant"
  "sandstorm:#scene=4&instant"
  "demands:#scene=5&instant"
  "revealed:?test=revealed&instant"
  "loop:?test=solved&instant"
  "price:#scene=8&instant"
)

for entry in "${STATES[@]}"; do
  name="${entry%%:*}"
  frag="${entry#*:}"
  out="$SHOT/${name}_${THEME}.png"
  rm -f "$out"
  case "$frag" in
    \?*) url="file://$VIZ/index.html${frag}&theme=${THEME}" ;;
    *)   url="file://$VIZ/index.html${frag}&theme=${THEME}" ;;
  esac
  timeout 10 "$CHROME" --headless --disable-gpu --no-first-run \
    --no-default-browser-check --hide-scrollbars \
    --force-device-scale-factor=1 \
    --user-data-dir="$PROFILE" --window-size="$SIZE" \
    --screenshot="$out" "$url" >/dev/null 2>&1
  if [ -s "$out" ]; then
    printf 'ok    %-12s %8s bytes   %s\n' "$name" "$(wc -c < "$out" | tr -d ' ')" "$url"
  else
    printf 'FAIL  %-12s no png                %s\n' "$name" "$url"
  fi
done

# scoped cleanup: this profile only, never the app name
pkill -f "user-data-dir=$PROFILE" 2>/dev/null

if [ "$THEME" = "light" ] && [ -s "$SHOT/table_light.png" ]; then
  cp "$SHOT/table_light.png" "$VIZ/docs/screenshot-table.png"
  echo "copied table_light.png to docs/screenshot-table.png"
fi
