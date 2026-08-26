#!/bin/sh
# capture.sh : headless screenshots of every scene, both themes, two viewports.
#
# Run it from anywhere; it locates the viz relative to its own path.
#
#     sh docs/capture.sh                 writes into docs/shots/
#     sh docs/capture.sh /tmp/myshots    writes somewhere else
#
# TWO RULES THAT ARE NOT NEGOTIABLE, both learned the hard way on this machine.
#
#  1. Headless Chrome gets its OWN --user-data-dir under /private/tmp. Never the
#     operator's profile. Cleanup is a pkill SCOPED TO THAT PATH, never
#     `pkill -f "Google Chrome"`, which also kills the real browser the operator
#     is working in and any hand-done SSO login it holds.
#  2. Chrome 151 on this machine WRITES THE PNG AND THEN DOES NOT EXIT, with
#     --headless and with --headless=old alike, whatever --virtual-time-budget
#     says. So each run is wrapped in `timeout` and the check is the PNG, not
#     the exit code. An exit status of 124 here is expected and is not a
#     failure. If a future Chrome starts exiting on its own, drop the wrapper.
set -u

HERE=$(cd "$(dirname "$0")" && pwd)
VIZ=$(dirname "$HERE")
OUT=${1:-"$HERE/shots"}
PROFILE=/private/tmp/heron-chrome-profile.$$

CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
if [ ! -x "$CHROME" ]; then
  CHROME=$(command -v google-chrome || command -v chromium || echo "")
fi
if [ -z "$CHROME" ] || [ ! -x "$CHROME" ]; then
  echo "No Chrome found. Set CHROME=/path/to/chrome and rerun." >&2
  exit 1
fi

TIMEOUT=$(command -v timeout || command -v gtimeout || echo "")

mkdir -p "$OUT" "$PROFILE"

shot() {
  name=$1
  size=$2
  url=$3
  png="$OUT/$name.png"
  rm -f "$png"
  if [ -n "$TIMEOUT" ]; then
    "$TIMEOUT" 8 "$CHROME" --headless --disable-gpu --no-first-run \
      --no-default-browser-check --hide-scrollbars --virtual-time-budget=4000 \
      --user-data-dir="$PROFILE" --window-size="$size" \
      --screenshot="$png" "$url" >/dev/null 2>&1
  else
    "$CHROME" --headless --disable-gpu --no-first-run \
      --no-default-browser-check --hide-scrollbars --virtual-time-budget=4000 \
      --user-data-dir="$PROFILE" --window-size="$size" \
      --screenshot="$png" "$url" >/dev/null 2>&1
  fi
  if [ -s "$png" ]; then
    echo "  ok   $name.png"
  else
    echo "  FAIL $name.png  ($url)"
  fi
}

echo "viz:  $VIZ"
echo "out:  $OUT"

for n in 0 1 2 3 4 5; do
  for th in light dark; do
    shot "scene${n}_${th}_1440" 1440,980 \
      "file://$VIZ/index.html#scene=$n&instant&theme=$th"
  done
done

# the two viewports the skill asks for, on the densest scene
shot "scene1_light_1280" 1280,800 "file://$VIZ/index.html#scene=1&instant&theme=light&test=table"
shot "scene1_light_1920" 1920,1080 "file://$VIZ/index.html#scene=1&instant&theme=light&test=table"

# named states a plain screenshot cannot reach
shot "scene0_swept"      1440,980 "file://$VIZ/index.html#scene=0&instant&theme=light&test=swept"
shot "scene0_looksquare" 1440,980 "file://$VIZ/index.html#scene=0&instant&theme=light&test=looksquare"
shot "scene1_table"      1440,980 "file://$VIZ/index.html#scene=1&instant&theme=light&test=table"
shot "scene1_drag"       1440,980 "file://$VIZ/index.html#scene=1&instant&theme=light&test=drag"

# scoped cleanup. Never a bare pkill on the application name.
pkill -f "user-data-dir=$PROFILE" 2>/dev/null
rm -rf "$PROFILE"
echo "done. Now OPEN the PNGs and look at them. A screenshot nobody read is not verification."
