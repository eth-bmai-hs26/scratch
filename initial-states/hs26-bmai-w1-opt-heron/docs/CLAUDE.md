# CLAUDE.md, docs/

Screenshots and the recipe that takes them, for `hs26-bmai-w1-opt-heron`.
Owners: Jinlei, Daniele, Ivan.

Read `../CLAUDE.md` first.

## What is here

```
capture.sh                     the headless recipe. 18 shots, six scenes, both themes, two viewports
CLAUDE.md                      this file
screenshot-scene1.png          the first scene, working, committed
screenshot-scene1-dark.png     the same scene in dark, committed
screenshot-stub.png            what an unbuilt scene looks like, committed
shots/                         the full batch. GITIGNORED, regenerate with capture.sh
```

`ta-card.md` belongs here too and is issue 06.

## Why only three PNGs are committed

The batch is 18 files and about 2.4 MB, and it changes on every verification pass. Committing it
would make the diff of a one-line CSS change unreadable. The three named files above are the ones
`../README.md` and this file point at, so they are committed by name. Everything else lives under
`shots/`, which `.gitignore` excludes, and is two and a half minutes away.

**A note on the naming.** The task that commissioned this build asked for
`docs/screenshot-scene1.png` showing "scene 1". The deck is zero indexed everywhere, in the hash, in
the pager and in the titles, so the first scene is `#scene=0`, "The rectangle". The committed file
shows that first scene, captured from
`index.html#scene=0&instant&theme=light&test=swept`. The second scene, "The table", is `#scene=1` and
its shots are `shots/scene1_*.png`.

## Taking them

```
sh docs/capture.sh                 writes into docs/shots/
sh docs/capture.sh /tmp/elsewhere  writes somewhere else
CHROME=/path/to/chrome sh docs/capture.sh    if Chrome is not where the script looks
```

Two rules inside that script exist because of real incidents. Both are commented in place.

1. **Headless Chrome gets its own `--user-data-dir` under `/private/tmp`, and cleanup is a `pkill`
   scoped to that path.** A bare `pkill -f "Google Chrome"` matches every Chrome process on the
   machine and takes down the operator's real browser along with any hand-done SSO login it is
   holding. Because that is an external signal rather than a fault, there is no crash dialog and no
   dump, so it presents as "Chrome suddenly started crashing" and burns a long debugging session.
2. **Chrome 151 on this machine writes the PNG and then hangs.** This happens with `--headless` and
   with `--headless=old` alike, whatever `--virtual-time-budget` says. Each run is wrapped in
   `timeout 8`, and the acceptance test is whether the PNG exists and is non-empty. An exit status of
   124 is expected here. A run takes about 8 seconds and the full batch about two and a half minutes.
   If a future Chrome starts exiting by itself, drop the wrapper.

## What reading the screenshots found, 2026-08-26

The point of a screenshot is the reading. Recorded here so the next pass can tell what changed.

**Scene 0, light, 1440 by 980, at the opening step.** Topbar with the brand dot, the title, the scene
label "Scene 0. The rectangle", six pager dots with the first filled, and the Dark button. The
rectangle draws at `theta = 15`: a tall narrow shape with `15.0000` in blue under its base and
`135.0667` in amber to the left of its top edge, which is `2026/15` to four places. The area label
`2026` sits inside. Gridlines and both axes render, with "width" and "height" as axis titles. The
right column shows the width control with a slider and a number input, an empty "What the two sides
are" card, and the question card reading "Look first." Prev is disabled, Next is live. Console clean.

**Scene 0, dark.** The same, in the warm dark palette. The toggle label reads "Light". Blue and amber
keep their identities and both edge labels stay legible against `#181612`.

**Scene 0 with `&test=swept`, after the fix described below.** Width at 78, the readout row visible
with `78.0000`, `25.9744` and `2026.0000`, which is the honesty check a participant can run
themselves: the third number never moves. Two faint ghost outlines mark the tallest and the widest
shape visited, and seven purple dots sit on the axis. The question card has advanced to "It is not
easy."

**Scene 0 with `&step=2`.** Confirms the engine's step hook: two synthetic Next presses land on the
last step with the readouts showing.

**Scene 1, light.** Carlos's five column headers render through the vendored KaTeX: theta, theta
squared, and 2026 minus theta squared as real mathematics, with Verdict and Update as plain text. The
rectangle sits at 45 and reads `45.0000` by `45.0222`, which is the moment the eye gives up. The
caption says so. The card note reads "column 0 of 5" before the first click.

**Scene 2, light and dark.** The stub renders as designed: the real title and lede, a "NOT BUILT YET"
flag in amber, the job, a six-item step plan, the pinned numbers, and the owner line naming the issue
file. Nothing on it is a fake chart or an invented value. This is what `#scene=2` should look like
until issue 02 lands.

**Scene 3, dark.** Same shape. Every line legible at `#181612`, the amber flag included.

### Two defects found by reading, both fixed

1. **Scene 0 crashed on its first step.** `&test=swept` captured a page reading "Scene 0 failed to
   build: Cannot set properties of null (setting 'showReadouts')". The cause was a second
   `var state = null;` in the middle of the builder: hoisted as a declaration, but assigned where it
   was written, so it ran after `resetState()` and put the state back to null. The scene therefore
   built and screenshotted cleanly and threw on the first Next. Fixed by declaring `state` once, at
   the top, with a comment saying why. **The lesson is the one the skill states: a screenshot of the
   default view proves the default view.** The named states exist precisely to catch this.
2. **The four stubs cited issue files that do not exist**, numbered 04 to 07 from an earlier plan.
   They now cite `02-scene2-bracket.md` through `05-scene5-bridge.md`, and the owner lines name the
   TA rather than "one TA". A stub whose only job is to hand somebody their work item has to name the
   right file.

### One layout finding, open for issue 07

**Scene 1 at 1280 by 800 puts the table below the fold.** With `&test=table` the five filled columns
start at about y = 690 and the first data row is cut by the viewport edge, so a lecturer at that
resolution has to scroll to show the row they are talking about. The page scrolls correctly and
nothing is broken. At 1440 by 980 and at 1920 by 1080 the whole scene fits. Options, none of them
chosen yet: shrink the rectangle stage for this scene only, move the table into the right column, or
accept the scroll and say so on the TA card. This is exactly the kind of thing the skill's
two-viewport rule exists to surface, and it belongs to whoever runs issue 07.

### Two things left alone, deliberately

- **The "What the two sides are" card is an empty box at scene 0 step 0.** The readouts are hidden
  with `visibility` rather than `display`, so revealing them at step 1 does not reflow the panel
  underneath. The cost is an empty card on the opening frame. Reflow on every step would be worse.
- **The empty table cells in scene 1 show a full stop** as a low-contrast placeholder. It was a
  middle dot, which is outside ASCII, so it was replaced under the house punctuation rule.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a new or
  renamed screenshot, a changed capture recipe, or a new verification pass, UPDATE THIS FILE IN THE
  SAME COMMIT, including the findings section above. A CLAUDE.md that describes a layout the
  directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
