# The genie game: deriving Robbins-Monro

CAS BMAI HS26, weekend 1, Friday 04.09.2026, the 10:00 coding block, second of three.
Slug `hs26-bmai-w1-opt-genie-rm`. TAs **Jinlei** and **Suei-Wen**.

A genie offers a bargain: name a positive number that its own test accepts and you go free.
Its test is `Q -> 1 + 1/Q`. You may test any number as often as you like, and you may not ask
for the answer. The loop a participant invents breaks in two different ways until they learn
to move only part of the way, which is Robbins-Monro.

## How to open it

Double-click `index.html`, or:

```
open index.html
```

There is no build step, no server and no network. Everything is vendored under `vendor/`.
The page works from a USB stick on a laptop in flight mode.

| key or link | what it does |
|---|---|
| arrow keys | step within a scene, then move between scenes |
| `Prev` and `Next` | the same, for a trackpad |
| `t` | switch between light and dark |
| the dots, top right | jump to any scene |
| `index.html#scene=3` | a deep link. Every scene has one, 0 to 8 |
| `index.html?theme=dark` | force a theme, for a screenshot |

Dev affordances, used for headless capture and not participant features: `&instant` skips
the fade, `&run` clicks the scene's primary control, `&step=K` advances K internal steps,
and `?test=NAME` lays in a named state. `?test=` on its own routes to the scene that owns
the state, so `index.html?test=broken-b` lands on scene 3 with the broken run already on
screen. The names are `rules`, `filled`, `full`, `broken-a`, `broken-b`, `fixed-b`,
`revealed` and `solved`.

## The nine scenes

| # | title | state |
|---|---|---|
| 0 | The bargain | built |
| 1 | Guess, check, correct | **built and live.** The participant types, the table extends |
| 2 | The full step | built. The lecture slide's six rows, as exact fractions |
| 3 | Breaking it | **built and live.** The alpha slider and the form switch |
| 4 | The sandstorm | stub. Registered, titled, reachable, and it states its own spec |
| 5 | Two demands on the step | stub |
| 6 | The number | built. The only scene allowed to reveal |
| 7 | Write the loop | built. Three blanks, a hint box, two quiz questions |
| 8 | The same loop, on a price | built. The mapping table, with one row muted |

Scene 3 is the one the exercise exists for. Two controls, and the participant causes both
failures with their own hand: push the step size past the edge and the swings grow until the
loop leaves the positive numbers; then switch to the same bargain written the other way,
`Q = 1/(Q - 1)`, keep the whole step, and it flees after four tests. Pulling either control
back undoes it.

## For the TA, and not for the room

The two exact edges the slider is looking for, printed by
`node precompute/verify-genie.mjs --print`:

```
form A  alpha must stay below 1.447213595500      ( = 1 + 1/sqrt 5 )
form B  alpha must stay below 0.552786404500      ( = 1 - 1/sqrt 5 )
```

They are deliberately absent from the page, from `js/scenes/`, and from every caption. The
whole step, `alpha = 1`, sits comfortably inside form A's window and comfortably outside
form B's, and that one line is the whole story.

A practical caution before you use those numbers in the room: the sweep criterion the page
and the notebook use is "close enough after a few dozen tests", and it does not coincide
with the exact edge. `alpha = 1.40` lies inside form A's window and still misses after 60
tests, and arrives after 2000.

## The exercise

`exercise/` carries the participant-facing coding part.

```
python3 exercise/genie.py               three sanity checks, and it prints them
python3 exercise/build_notebooks.py     regenerates both notebooks
```

| file | what it is |
|---|---|
| `exercise/genie.py` | the `Genie` class the notebooks program against, plus the seeded RNG |
| `exercise/genie_robbins_monro.ipynb` | the student notebook. Six tasks, four with a blank |
| `exercise/genie_robbins_monro_solutions.ipynb` | the same 21 cells with the blanks filled |
| `exercise/build_notebooks.py` | generates both. **The notebooks are output, not source** |

The notebook draws its sandstorm from the same Mulberry32 and Box-Muller pair the browser
page uses, ported to Python and checked at import time against six draws taken from the
running JavaScript. A participant who runs the notebook sees the same storm the room saw.

## What was verified, and what was actually observed

Everything below was run in this session on 2026-08-26.

### The rigor gate: 62 assertions

`precompute/verify-genie.mjs` loads `js/rng.js`, `js/genie.js`, `js/schedules.js` and
`js/loop.js` under a fake `window`, so what it asserts is exactly what the browser computes
rather than a reimplementation that can agree with itself. It ends on `ALL PASS  (62
assertions passed)` and only then writes `data/datasets.js`.

Real output of `node precompute/verify-genie.mjs --print`:

```
--- measured, pinned seed 20260904, sigma 0.15, 400 rounds, start Q = 1 ---
schedule          spread        avg heard loss   rests at
full            1.693e-1      -0.0047          1.893913
constant        3.515e-2      -0.0065          1.676006
inverse         1.854e-3      0.0077           1.616584
inverseSquare   6.973e-5      0.1867           1.749483

--- same four, mean over 200 consecutive seeds ---
schedule          mean spread   mean |avg heard loss|
full            1.625e-1      1.440e-3
constant        4.245e-2      1.847e-3
inverse         1.964e-3      9.899e-3
inverseSquare   6.854e-5      1.904e-1

--- clean genie, far start Q = 8, 200 rounds ---
alpha = 1/(t+1)        rests at 1.617875   |err| 1.59e-4
alpha = 0.5/(t+1)^2    rests at 3.626966   keeps 31.5 per cent of its initial error

--- form B, full step, from Q = 1.7 ---
1.700000  ->  1.428571  ->  2.333333  ->  0.750000  ->  -4.000000  ->  -0.200000  ->  -0.833333  ->  -0.545455
settles at -0.618033989
```

The two tables are the exercise in miniature. The fast-shrinking schedule has the smallest
spread of all four and the largest standing loss: it settles beautifully, on a number the
genie refuses, and it looks more settled than the row that is right. The pinned-seed figures
sit beside 200-seed means so a reader can check that the pinned run is ordinary.

The last block is what scene 3 shows. With the positivity clause enforced the loop stops
after four tests, because the genie has nothing to answer for `-4`. Left running as bare
arithmetic with no genie to refuse anything, the same recursion rests on `-0.618033989`,
which is the other root of `Q^2 = Q + 1`, and that is the callback scene 6 makes.

### The page: 11 states screenshotted in each theme, and read

`bash docs/capture.sh light` and `bash docs/capture.sh dark` each produced 11 PNGs. Reading
them is what found three real defects, all fixed and recorded in `docs/CLAUDE.md`. The
committed one is `docs/screenshot-table.png`, scene 1 with the lecture slide's six rows laid
in by `?test=filled`.

Observed in that image: the three headers render through KaTeX as `Q (guess)`,
`target = 1 + 1/Q` and `loss = Q - target`, character for character the deck's own. The six
rows read `1, 2, 1.5, 1.666667, 1.6, 1.625` with targets `2, 1.5, 1.666667, 1.6, 1.625,
1.615385` and losses `-1, +0.5, -0.166667, +0.066667, -0.025, +0.009615`. The verdict chip
reads `too big`. The loss strip falls from `1.0e+0` to `9.6e-3` across six points.

### The notebook: every code cell of the solutions notebook was run

All 7 code cells executed in order without an exception, and the numbers they print match
the JavaScript exactly:

```
1   Q =   1.000000   target =   2.000000   loss =  -1.000000
...
6   Q =   1.625000   target =   1.615385   loss =  +0.009615

1   Q =     1.7000   target =     1.4286   loss =    +0.2714
...
5   Q =    -4.0000   The genie wants a positive number.

form B   alpha = 0.20   rests at 1.618033989
form B   alpha = 0.30   rests at 1.618033989
form B   alpha = 0.50   rests at 1.618033989
form B   alpha = 0.60   rests at 2.115962527
form B   alpha = 0.70   rests at 2.437723668
form B   alpha = 1.00   left the bargain

alpha = 1          spread 1.693e-01   avg heard loss -4.700e-03   rests at 1.893913
alpha = 0.2        spread 3.515e-02   avg heard loss -6.509e-03   rests at 1.676006
alpha = 1/(t+1)    spread 1.854e-03   avg heard loss +7.739e-03   rests at 1.616584
alpha = 1/(t+1)^2  spread 6.973e-05   avg heard loss +1.867e-01
it rests at 1.749483, and the genie returns 1.571597 for that number
```

The three spreads in the second-to-last block are the same three the verifier prints, to
every digit shown. The Python port of the generator and the JavaScript original are drawing
the same stream.

## Done

- The nine scenes are registered, titled and reachable by `#scene=N`, and the hash follows
  the pager.
- Scene 1 is genuinely live. Type a number, press Check or Enter, and a row appears with all
  three cells filled. Type another. The loss column shrinks visibly and the loss strip falls.
  `ArrowLeft` rewinds by reset and replay through `js/history.js`, never by an inverse
  mutation. A non-positive entry gets the genie restating its condition.
- Scene 3 is genuinely live. The alpha slider and the form switch recompute the run, the
  table, the trace and the verdict on every input.
- Scenes 0, 2, 6, 7 and 8 are built, with their own internal steps.
- Light and dark are both complete, `t` toggles, the choice persists in `localStorage` under
  `genie-rm-theme`, and `?theme=` forces it for a capture.
- The rigor gate passes and regenerates `data/datasets.js` byte identically.
- The notebook pair is generated, 21 cells each, differing at the intro cell plus four task
  cells, and the solutions version has been executed end to end.
- No `fetch`, no CDN, no ES module, no `Math.random`, no inline colour in JavaScript, no
  `<style>` injection. No em dash or en dash anywhere.

## Not done

- **Scenes 4 and 5 are stubs.** They are the sandstorm and the two conditions on the step
  size. Both render a card naming what they will do, who owns them and which issue prompt
  specifies them. `js/panel.js`, the two-number instrument panel, does not exist yet: its
  arithmetic does, as `Loop.spread` and `Loop.avgHeardLoss`, and both are already asserted.
- **The step-back button in scene 2 and scene 6 is the arrow key and the Prev button.** There
  is no visible per-step control inside those scenes.
- **No TA card.** There is no printed one-page brief for the room. `issue-prompts/07` is that.
- **The notebook has never been opened in Colab.** It was executed cell by cell through
  Python. Colab-specific behaviour, meaning `# @title` collapsing and the widget rendering,
  is unverified.
- **d3 is vendored for two scale functions.** 280 KB for `scaleLinear` and `scaleLog`.
  `issue-prompts/06` removes it.
- **The Maxfield Parrish plate is not cleared.** The lamp is drawn in SVG instead.
- **Nothing has been tested at 1280x800.** The captures were taken at 1400x1000. A projector
  in the room is likely to be the smaller one.

## Where it comes from

- **The framing and the table** are the AINIT RL deck's, at
  `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex`, in the section
  "Learning a number in the dark: Robbins-Monro". Its plate frame, its `Guess, check,
  correct` table with those exact three headers, its pseudocode frame writing `Q := Q - loss`
  and then `Q := Q - alpha . loss`, and its closing line about making the target a noisy
  sample and letting the step shrink.
- **The exercise shape** is the AINIT darts cartridge's, at
  `/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/index.html`: the three-way split
  of the update into the loss, the step it produces and the new guess; the schedule given and
  only the update blanked; the hint box of three bullets that name a strategy and never the
  answer; and both quiz questions, both answered B. What darts does NOT do is demonstrate its
  own claim: it has no alpha control at all, no comparison and no convergence plot, so its
  claim that a large fixed step orbits forever lives only in prose and in a quiz explanation.
  Scenes 3, 4 and 5 exist to make that claim something a participant watched happen.
- **The seeded generator** is the AINIT minigolf cartridge's, at
  `/Users/carloscotrini/Documents/git_ainit/rl-arcade/minigolf/index.html`, which is the only
  seeded game in that arcade.
- **The shell** is the FDD grasshopper's, at
  `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/`: `css/style.css` byte for
  byte, and `js/theme.js` with one line changed. The scene engine and three small modules are
  from `/Users/carloscotrini/Documents/git_fdd/projects/bandits/`.
- **The design spec** is `../../proposals/viz-genie-robbins-monro.md`, whose numbers are
  reproduced by `../../proposals/viz-genie-rm-reference.mjs`.

## Next

`issue-prompts/` has one numbered file per remaining unit of work, and
`issue-prompts/CLAUDE.md` carries the dependency graph. Start at `01-panel-module.md`.
