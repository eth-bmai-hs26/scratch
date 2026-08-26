# CLAUDE.md, hs26-bmai-w1-opt-heron

> **Status, 2026-08-26.** Partial build, TA-ready as an initial state. Scenes 0 and 1 are finished
> and interactive. Scenes 2 to 5 are registered, titled, reachable by the hash router, and render
> their own specification. The data layer is complete and verified. The paired coding exercise is
> complete. Eight issue prompts in `issue-prompts/` are the remaining work.
> Owners: **Jinlei, Daniele, Ivan.**

"Squaring the rectangle": Act 1 of Carlos's handwritten page 1, first of the three exercises in the
Friday 10:00 block, "CX: First-order optimization algorithms". A rectangle of fixed area 2026 whose
width the participant owns, so the height is forced to `2026/theta`, the verdict is the shape you
are looking at, and the correction is the visible act of averaging the two sides.

The lecture moment it serves: it runs immediately after the 09:00 lecture "First-order approximation
algorithms" and immediately before `hs26-bmai-w1-opt-genie-rm`. It is the one exercise in the weekend
where the correction can be computed exactly, which is what makes the step size of the next two
exercises feel like a concession.

Design spec: `../../proposals/viz-heron.md`, 1153 lines. Read section 17 (what is built) and
section 18 (open questions for Carlos) before changing anything pedagogical.

## Run it

```
open index.html                        straight from file://, no server, no build step
python3 precompute/build_data.py       regenerates data/datasets.js, 30 invariant checks
python3 exercise/reference.py          the notebook's numbers, printed and asserted
python3 exercise/build_notebooks.py    regenerates BOTH notebooks and asserts the sync rule
sh docs/capture.sh                     headless screenshots of every scene, both themes
```

`build_data.py` and `build_notebooks.py` are byte-deterministic: run either twice and `diff` the
output. Neither is loaded at runtime.

## File tree

```
index.html                  the only HTML file. SCRIPT ORDER IS LOAD-BEARING and commented there
css/
  style.css                 661 lines: theme tokens, page shell, the whole SVG class vocabulary
  scene0.css .. scene5.css  one per scene. scene2 to scene5 are empty placeholders with a note
js/
  theme.js                  light and dark, the 't' shortcut, ?theme= override. grasshopper copy,
                            one line changed: KEY = "heron-theme"
  main.js                   the click-step engine, hash router, dot pager, dev hooks. 6 scenes
  heron.js                  the mathematics. Single source of truth. No DOM, no colours, no strings
  rectview.js               the rectangle panel. Fixed scale, locked box, withholds the answer
  katex-helpers.js          Katex.render / inline / display. Copied from FDD bandits
  stub.js                   renders an unbuilt scene AS ITS OWN SPEC. Never a fake chart
  scenes/scene0.js          BUILT. The rectangle: slider, both sides, the trail
  scenes/scene1.js          BUILT. Carlos's five columns from theta = 45
  scenes/scene2.js          stub. The bracket. Issue 02
  scenes/scene3.js          stub. Heron named. Issue 03
  scenes/scene4.js          stub. The digits. Issue 04
  scenes/scene5.js          stub. The bridge table. Issue 05
data/datasets.js            GENERATED. window.DATA. Never edit by hand
precompute/build_data.py    the generator and the verifier. Exits nonzero and writes nothing on a
                            failed invariant
exercise/                   the participant-facing coding half. Its own CLAUDE.md
issue-prompts/              one numbered markdown per remaining unit of work. Its own CLAUDE.md
docs/                       the screenshot recipe and what reading the screenshots found. Own CLAUDE.md
vendor/katex.min.js .css    KaTeX, copied from FDD grasshopper. 1.4 MB with the fonts
vendor/fonts/               60 KaTeX font files
```

`docs/`, `exercise/` and `issue-prompts/` each carry their own CLAUDE.md, because each holds
decisions of its own. `css/`, `data/`, `js/`, `js/scenes/`, `precompute/` and `vendor/` do not, and
are documented instead by the annotated tree above plus the header comment at the top of each file.
That is the course-viz convention, and the AINIT arcade states it explicitly: a multi-file viz
documents its own subdirectories through the parent's layout section rather than through about sixty
nested CLAUDE.md files. `vendor/` is a verbatim copy, recorded in this file and nowhere else.

## The mathematics, and the one sign convention

`js/heron.js` is the only file that computes anything. Every scene calls into it, so there is exactly
one place a sign can be wrong.

| Name | Meaning |
|---|---|
| `theta` | the width, the thing the participant owns |
| `otherSide(theta)` | `2026/theta`, the height the fixed area forces |
| `residual(theta)` | `2026 - theta^2`, **Carlos's third column** |
| `verdict(theta)` | too small when the residual is positive |
| `bracket(theta)` | the two sides sorted. The answer is always inside it (theorem 1) |
| `step(theta)` | `(theta + 2026/theta)/2`, one Heron correction |

**The residual sign follows Carlos's handwritten page.** He writes `2026 - theta^2`, so positive
means the guess is too small. The AINIT genie slide that `hs26-bmai-w1-opt-genie-rm` inherits writes
`loss = Q - target`, the opposite sign, and participants meet both inside two hours. That clash is
open question 3 in the proposal and only Carlos can settle it. Until then this exercise follows his
page, and `residual()` is the single function that changes if the decision goes the other way.

`alpha` is a step size and `eps` is a stopping tolerance, everywhere in weekend 1. Heron has neither,
which is the point.

## The withholding contract

This is the pedagogy, and a well-meaning change breaks it silently. The course-viz skill lists
"display the answer before the student attempts it" under things never to do.

| Withheld | Until |
|---|---|
| The value of `sqrt(2026)`, 45.0111097397..., anywhere on screen | scene 4, after the participant has run the update |
| Any tick, marker or dashed line at the target, on any ruler or axis | scene 4 |
| The word "average", and the formula | scene 3, after the scene 2 gate |
| The phrase "quadratic convergence" | scene 4, and only after the digit column has doubled twice |
| The words alpha, learning rate, gradient, loss | scene 5, as the names of what comes next |
| A colour legend explaining the palette | never |

Mechanically: `RectView` takes `showSquare` and it is **off** for scenes 0 to 3. Scene 3 is the first
scene allowed to turn it on. `sqrt(2026)` to 70 places does sit in `data/datasets.js`, because scene
4 has to count digit agreement past double precision. The rule governs what reaches the screen. A
data file a curious participant could open is the same trade grasshopper makes by pinning its summit
heights in `js/landscapes.js`.

A one-command check:

```
grep -l "45.0111097" js/scenes/scene0.js js/scenes/scene1.js js/scenes/scene2.js js/scenes/scene3.js
```

must print nothing.

**Use that nine-digit prefix and not the shorter `45.011`.** One Heron step from 45 is
45.01111111111111, which scene 3 prints legitimately: it is the correction the participant has just
derived. The root is 45.0111097397..., and the two agree only to the fifth decimal place. A grep for
`45.011` therefore reports scene 3 as a leak when nothing has leaked.

## Numbers: Decimal only, below 1e-14

**Any quantity smaller than about 1e-14 comes from `Decimal` in `precompute/build_data.py`, ships as
a string, and is never recomputed in the browser.** That is a correctness rule with a measured cause.
The gap between the two sides three corrections in from 45 is exactly `4.178407e-14`; computed in
IEEE doubles the same quantity reads `4.973799e-14`, and one step later the double trace reads
`7.105427e-15`, which is exactly `math.ulp(45.0)`. From there on a double is measuring its own
rounding error, the collapse appears to stall, and scene 4 teaches the opposite of its own lesson.

Both readings are pinned, and the script asserts that they differ:

- `DATA.heron45[k].gapSci` is the mathematics. Exact, seven significant digits, a string.
- `DATA.bracket45[k].width` is what a double says. Also real, also useful, and labelled as such.

The same trap has a formatting cousin, recorded at the top of `build_data.py`: `"%.60f" % some_decimal`
silently converts the Decimal to a float first, so it prints sixty digits of a sixteen-digit number,
and the digit column comes out reading 3, 6, 14, 62, 62. That looks like a discovery about
convergence and is a formatting bug.

## Colour identities

Fixed once at the head of `css/style.css`. Nothing else may claim them, and no JS file writes a
colour: every fill and stroke routes through a class, which is what makes the theme swap free.

| Colour | Means |
|---|---|
| blue `#2f6cb1` | the width `theta`, the side you control, and the update arrow |
| amber `#c08a3e` | the height `2026/theta`, the side the area forces, and the bracket |
| purple `#7a5c8c` | the trail of widths already tried |
| green `#4a8b6b` | the square, and only once it has converged |
| red `#b8323a` | a guess that made the bracket wider |

Red is spent. An "important" or "alert" state gets some other treatment, because red already means a
widened bracket. Dark values are grasshopper's, which is the house's only worked answer to the
skill's instruction to use "lighter, less saturated companions".

## Engine conventions

A scene file registers `window.scenes.sceneN(root)` and returns
`{ onEnter?, onLeave?, onNextKey?, onPrevKey? }`. Returning `true` from a key handler CONSUMES the
keystroke and advances a step inside the scene; returning `false` lets the driver change scene.
Prev and Next in the footer delegate to the same handlers, so a participant on a trackpad gets the
same stepping a keyboard user gets.

State is the source of truth. A scene keeps a plain `state` object, `applyStep(c)` mutates for
exactly one step, `render()` redraws everything from the state, and **Prev rewinds by reset and
replay.** An inverse mutation is never the way back. Both built scenes do it this way; copy the shape.

Cold entry must work. `#scene=4` typed into a fresh tab has to render correctly with no earlier scene
ever having been built.

| Hook | Kind | Effect |
|---|---|---|
| `#scene=N` | deep link | a lecturer jumps mid lecture. Zero indexed, 0 to 5 |
| `?theme=light` `dark` | dev | forces a theme. Query or hash, handled in `js/theme.js` |
| `&instant` | dev | skips the fade, so a capture cannot land mid fade |
| `&run` | dev | clicks the scene's single `[data-run-primary]` control |
| `&step=K` | dev | fires `onNextKey` K times to reach a mid-scene state |
| `&test=NAME` | dev | a per-scene named state, listed in each scene's header comment |

Existing named states: scene 0 `swept`, `looksquare`; scene 1 `table`, `drag`. Every new scene adds
its own and lists them in its header comment. The two most important states in scene 2 exist only
after typed input, so without a named hook they cannot be screenshotted at all.

`window.HeronViz` exposes `goTo`, `current`, `titles`, `flag`, `param` for headless verification and
for a lecturer's console.

## Verification, in the order the skill gives

```
python3 precompute/build_data.py                    step 0: the data tells the story, or stop
for f in js/*.js js/scenes/*.js data/*.js; do node --check "$f"; done
sh docs/capture.sh                                  writes docs/shots/, gitignored
```

Then **open the PNGs and look at them.** A screenshot nobody read is not verification. `docs/CLAUDE.md`
records what the last read found, screenshot by screenshot.

Two machine-specific gotchas, both in `docs/capture.sh` as comments:

1. Chrome 151 on this machine writes the PNG and then hangs, with `--headless` and with
   `--headless=old` alike, whatever `--virtual-time-budget` says. Each run is wrapped in `timeout`
   and the acceptance test is whether the PNG exists. An exit status of 124 is expected here.
2. Cleanup is a `pkill` **scoped to the run's own `--user-data-dir`**. A bare
   `pkill -f "Google Chrome"` also kills the operator's real browser and any hand-done SSO login it
   is holding. That has cost this project a session before.

## Inherited detritus, and things that look like bugs

- `js/rectview.js` contains `http://www.w3.org/2000/svg`. That is the SVG namespace identifier, and
  nothing ever fetches it. It is the only `http` string outside `vendor/`, so a grep-based reviewer
  should expect it.
- `DATA.view` duplicates the drawing frame that `js/rectview.js` draws with. Two copies of a number
  are a bug waiting to happen, so `build_data.py` reads the constants back out of `rectview.js` and
  fails if the pair drifts. Move one, move both, rerun the script.
- `css/scene2.css` through `scene5.css` are three-line comments. They are real slots, wired into
  `index.html`, waiting for the scene that needs them. Keep them, and keep new rules out of a
  `<style>` tag injected from JS.
- `js/heron.js` defines `fixedNudge`, which nothing currently calls. Scene 4 needs it. It is early
  code.
- Scene 0's opening step has the width control live rather than locked, which departs from the
  proposal's step plan. The reason is written into the file's header comment: a disabled slider on
  the opening frame reads as a broken page. Change it back if Carlos prefers the lock.

## What NOT to do

- Do not put `sqrt(2026)`, or a marker at it, into scenes 0 to 3. The failure to find the square by
  eye is the mechanism of the whole exercise.
- Do not add a step size, a learning rate, or noise. Those belong to `hs26-bmai-w1-opt-genie-rm` and
  to the 11:00 lecture. See the anti-collision table below.
- Do not recompute anything below 1e-14 in JavaScript. See the Decimal rule above.
- Do not auto-fit the rectangle's scale. It is fixed at 1.6 px per unit so that a tall sliver and a
  flat slab look different. The bounded width range `[10, 202.6]` exists because it is closed under
  `theta -> 2026/theta`.
- Do not write a colour literal in a JS file. Add a token in `css/style.css` and a class.
- Do not call `Math.random()` anywhere at runtime. Heron needs no randomness at all, and a demo that
  differs between the rehearsal and the lecture has stopped being a demo.
- Do not edit `data/datasets.js` or either `.ipynb` by hand. All three are generated, and a hand edit
  is destroyed silently by the next build.
- Do not gate scene 4 behind the in-page code blanks. With ten minutes and a TA holding the room, a
  lock screen turns a discovery into a queue. This is a deliberate departure from the AINIT darts
  cartridge, which does lock.
- Do not add a seventh scene. Six is already at the skill's fan-out threshold.
- Do not put a date or an attribution for Heron of Alexandria on screen. No primary source has been
  consulted. The exercise works with no history at all.

## Anti-collision, the 10:00 block

Three exercises share the block and the same guess, check, correct skeleton. They collide unless each
keeps its hands off the others' idea.

| Idea | Owner |
|---|---|
| A target defined by an equation you can evaluate exactly | **this exercise** |
| The correction computed in closed form, with no step size at all | **this exercise** |
| Quadratic convergence, and what a doubling digit count looks like | **this exercise** |
| A step size alpha, and a schedule that shrinks it | `hs26-bmai-w1-opt-genie-rm` |
| Noise in the measurement, and averaging it away | `hs26-bmai-w1-opt-genie-rm` |
| A target defined by data rather than by an equation | `hs26-bmai-w1-opt-rm-house` |
| A loss surface, a gradient, a learning rate | the 11:00 lecture and the grasshopper |

Grep-able consequence: alpha, learning rate, gradient, loss and derivative appear nowhere in the
participant-facing strings of scenes 0 to 4. They appear once each in the scene 5 bridge table, as
the names of what the next two exercises add.

## Open decisions, for Carlos

Full statements in `../../proposals/viz-heron.md` section 18. The four that block work here:

1. **Thirty minutes or sixty?** The spreadsheet says the CX block runs 10:00 to 10:30 for three
   exercises. The task brief says an hour. Everything about pacing hangs on this. The build assumes
   thirty, which gives Heron about ten minutes.
2. **One notebook for the block, or three?** `exercise/` currently ships its own pair, which costs
   the block a Colab boot it may not have. Issue 08 is the merge into a shared
   `hs26-bmai-w1-opt.ipynb` if the other two TA teams agree.
3. **Does the residual keep Carlos's sign?** See the sign section above.
4. **Is the rectangle framing approved?** Carlos's page draws a square of side `sqrt(2026)`. The
   rectangle of fixed area with sides `theta` and `2026/theta` is an addition that makes the
   averaging update physical. It is faithful to the mathematics and it is still an addition.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a scene
  moving from stub to built, a new shared module, a changed data format, a changed build or run
  command, a settled open decision, or a change in who owns the work, UPDATE THIS FILE IN THE SAME
  COMMIT. A CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
