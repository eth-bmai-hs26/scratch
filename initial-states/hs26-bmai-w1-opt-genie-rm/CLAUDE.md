# CLAUDE.md, hs26-bmai-w1-opt-genie-rm

> **Status, 2026-08-26.** TA-ready initial state. Scenes 0, 1, 2, 3, 6, 7 and 8 are built and
> verified by screenshot. Scenes 4 and 5 are stubs that render their own specification. The
> rigor gate passes 62 assertions, the notebook pair is generated and every code cell of the
> solutions notebook has been run. Owners: **Jinlei and Suei-Wen**.

Master schedule row, Friday 04.09.2026, 10:00 block, second of three:

```
CX First-order optimization:
Genie game and Robbins-Monro
```

Design spec: `../../proposals/viz-genie-robbins-monro.md`. Read it before changing any
pedagogy. Section 14 of it is the list of things only Carlos can settle, and several of
them are still open.

## What this is

A browser page, opened straight from `file://`, in which a genie offers a bargain: name a
positive number that its own test accepts and you go free. The test is `Q -> 1 + 1/Q`. The
participant invents a loop, breaks it in two different ways, and arrives at Robbins-Monro
without being handed it.

The lecture moment it serves: Carlos's handwritten page 1, `Act 2) Robbins-Monro algorithm`,
labelled in his own quotation marks `"The genie game"`, with `theta = 1 + 1/theta` beside it
and a four-column table underneath. His page 2 reads, in full, that the participants must
derive the Robbins-Monro algorithm and points at the AINIT slides. The framing already
exists as slides in `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex`,
section "Learning a number in the dark: Robbins-Monro". This page turns those five frames
into a thing a participant drives.

## Layout

```
hs26-bmai-w1-opt-genie-rm/
  CLAUDE.md                  this file
  README.md                  for a lecturer or a TA: what it is, how to open it, what is done
  .gitignore                 __pycache__ and the uncommitted screenshots
  index.html                 the only HTML file. Script order is load-bearing and commented

  css/
    style.css                grasshopper's 648 lines byte for byte, then two appended blocks:
                             the scene engine shell, and this viz's colour identities
    table.css                the guess / target / loss widget, plus Carlos's two columns
    trace.css                the two plots. The four box numbers must match js/trace.js
    scene0.css               the lamp, drawn rather than photographed
    scene1.css               the verdict chip
    scene3.css               the two controls of the breaking scene
    scene6.css               the reveal. The only place amber is spent
    scene7.css               the code stub and the quiz
    scene8.css               the mapping table, and the muted row

  js/
    theme.js                 grasshopper's, KEY = "genie-rm-theme"
    rng.js                   Mulberry32 and Box-Muller. THE ONLY SOURCE OF RANDOMNESS
    genie.js                 the bargain: two forms, the positivity clause, the loss
    schedules.js             full, constant(c), inverse(c), inverseSquare(c), decay(a0, d)
    loop.js                  run(), and the two instrument-panel readouts
    table.js                 the widget with the deck's exact three headers
    trace.js                 the two plots. Owns setTruthVisible, default false
    history.js               bandits', record and cursor, prev = reset + replay
    katex-helpers.js         bandits', never throws
    stub.js                  the card an unbuilt scene renders
    main.js                  the click-step scene engine and the hash router, nine scenes
    scenes/scene0.js .. scene8.js

  data/datasets.js           GENERATED. window.DATA = { deckTable, demo, reveal }
  precompute/verify-genie.mjs  the rigor gate. Loads the real runtime modules and asserts (a) to (l)
  vendor/                    KaTeX 0.17 with 60 font files, and d3 7.9. No CDN anywhere
  docs/                      capture.sh, the committed table screenshot, what reading it found
  exercise/                  genie.py, the notebook builder, and the generated notebook pair
  issue-prompts/             one numbered file per remaining unit of work
```

## The three rules that matter most here

**1. The answer is not on screen before scene 6, and that is enforced structurally.**
`phi`, both roots and both alpha thresholds live under `DATA.reveal`. `js/trace.js` owns the
truth line and exposes `setTruthVisible(bool)`, default false. `js/scenes/scene6.js` is the
only caller and the only reader of `DATA.reveal`. Verifier assertion (j) refuses any scene
file numbered 0 to 5 that contains the substring `1.618`, the word `golden`, or the
identifier `DATA.reveal`. Grepping for `setTruthVisible` is a complete audit of who can
reveal the answer.

That assertion is blunt on purpose, and it fires on comments too. During the build it caught
two comment lines that explained the rule by quoting the thing the rule forbids. The comments
were reworded rather than the assertion weakened.

**2. `data/datasets.js` is generated. Never hand-edit it.**

```
node precompute/verify-genie.mjs
```

The verifier loads `js/rng.js`, `js/genie.js`, `js/schedules.js` and `js/loop.js` under a fake
`window` and asserts against the real runtime code, so what is checked is exactly what the
browser computes. A failed assertion exits non-zero and the data file is NOT written.
Assertion (k) checks that a rerun is byte identical.

**3. The two notebooks are generated. Edit the builder, never an `.ipynb`.**

```
python3 exercise/build_notebooks.py
```

A hand edit to a notebook is destroyed silently the next time the builder runs. That is how
the FS26 student and solutions sync rule holds by construction. The builder asserts the rule
before it writes: identical cell counts, and only the intro cell plus the four task cells
with blanks may differ.

## Notation, pinned

| symbol | meaning |
|---|---|
| `Q` | the number the participant hands over |
| `target` | what came back, meaning the genie's test applied to `Q` |
| `loss` | `Q - target`. Signed, and never an absolute value |
| `alpha` | the fraction of the loss to subtract. Never `eta` |
| `alpha_t` | this round's alpha, under a schedule |
| `sigma` | the width of the sandstorm |
| form A | the bargain as first written, `Q = 1 + 1/Q`, test `1 + 1/Q` |
| form B | the same bargain rearranged, `Q = 1/(Q - 1)`, test `1/(Q - 1)` |

**The sign convention collides with the exercise 40 minutes later, and that is known.** This
page follows the AINIT deck, `loss = Q - target` with `Q <- Q - alpha * loss`, because the
live table's headers are the deck's own and the headers fix the sign. The house-price
exercise follows Carlos's deck, `l = y - y_hat` with `w <- w + alpha * l`. They are the same
rule with `l = -loss`. Scene 8 carries the bridging row. A weekend-wide ruling would let all
three 10:00 exercises be written to one convention, and it is question 1 in the spec's
section 14.

`eps` is not used anywhere in this exercise. The 11:00 lecture spends it on the width of a
finite-difference window, so nothing here competes for it.

## Colour identities, fixed once

```
blue    #2f6cb1   the genie's answer: the target column, the target series
purple  #7a5c8c   the trail of guesses already made
amber   #c08a3e   revealed truth. Nothing uses it before scene 6
green   #4a8b6b   the genie accepts. Always printed with the word "accepted"
red     #b8323a   a number the bargain refuses. Always printed with the word "refused"
```

Red and green both appear. The no-red-green rule in the house belongs to the `lecture-slides`
skill and governs projected beamer decks; the `course-viz` palette carries both hues. The
rule is honoured here the other way round: **colour is never the only channel.** A refused
row prints the word `refused` in its round column, an accepted one prints `accepted`, and
every verdict box carries a title in words. Question 5 of the spec's section 14 offers Carlos
the stricter option, which is green for accepted and burnt orange `#a05a2c` for refused.

## Deliberate departures, recorded so they are not re-litigated

1. **No hard gate.** The AINIT darts cartridge hides its later pages behind `.locked` until
   the three code blanks are right. A gate fights the mandatory hash routing, because a
   lecturer has to be able to jump to any scene by URL. Scene 7 gives feedback and leaves
   every scene reachable.
2. **No drifting target.** darts moves its bullseye every round, which is a nonstationary
   tracking problem. The genie's answer is a fixed point that stays put. Mixing the two
   blurs which property the shrinking step buys.
3. **No score.** darts scores each shot out of 100 and names the variables `target_score`
   and `current_score` while glossing them in code as positions. The genie keeps no score,
   and the names here are the ones the table already uses.
4. **No photographic plate.** The AINIT genie slide credits "Maxfield Parrish, The Arabian
   Nights (1909)". Verified in this session: there is no `IMAGE-SOURCES.txt` anywhere in the
   rl-arcade repository, and `slides/CLAUDE.md` records licences for the other three epigraph
   plates and omits that one. Switzerland runs 70 years post mortem auctoris. The lamp is
   drawn in SVG until somebody checks.
5. **d3 is vendored and used for scales only.** The spec argued for dropping it. It was
   already in `vendor/` when this build started and `js/trace.js` was already written against
   `d3.scaleLinear` and `d3.scaleLog`. Removing it is worth about 280 KB and is issue 06.
6. **The scene count is nine, and two of them are stubs.** A stub is registered, titled and
   reachable, so no deep link a TA writes down is renumbered when the scene is finished.

## Anti-collision with the other two exercises of the same block

| idea | owned by |
|---|---|
| guess, check, correct as a loop with a verdict and an update | `opt-heron`, before this |
| a five-column table the participant fills in | `opt-heron`, before this |
| the fixed-point form: the answer is the number its own test returns | **this exercise** |
| a step size that can be too big, and the loop breaking because of it | **this exercise** |
| the same problem written two ways, with different stability | **this exercise** |
| noise, and convergence under noise | **this exercise** |
| the two Robbins-Monro conditions on the step sizes | **this exercise** |
| the golden ratio | **this exercise** |
| data, residuals on examples, `y = wx + b` | `opt-rm-house`, after this |
| more than one parameter, and alternating updates | `opt-rm-house`, after this |
| the name stochastic gradient descent | `opt-rm-house` and the 11:00 lecture |
| derivatives, finite differences, gradients | the 11:00 gradient-descent block |

Must not teach here: any derivative, any loss defined over a dataset, any second parameter.
Scene 8 points at all three and teaches none of them.

## Verification, and how to re-run it

```
node precompute/verify-genie.mjs            62 assertions, then rewrites data/datasets.js
node precompute/verify-genie.mjs --print    the same, plus the measured table the README quotes
python3 exercise/genie.py                   three sanity checks, ends on "All assertions passed."
python3 exercise/build_notebooks.py         rewrites both notebooks, asserts the sync rule
bash docs/capture.sh light                  11 screenshots, light theme
bash docs/capture.sh dark                   the same 11, dark theme
```

Then **go and look at the PNGs**. The `course-viz` skill says this twice and gives the
reason. Reading them is what found the three defects listed in `docs/CLAUDE.md`.

Parse check and house-rule greps:

```
for f in js/*.js js/scenes/*.js data/datasets.js; do node --check "$f"; done
grep -rn 'fetch(\|cdn\.\|unpkg\|jsdelivr\|type="module"\|Math\.random' js index.html data
grep -rnP '\x{2014}|\x{2013}' js css index.html data precompute exercise
grep -rn 'fill="#\|stroke="#\|style="[^"]*color:' js
```

All five must come back empty, except that `js/rng.js` mentions `Math.random` in a comment
forbidding it.

## The one gotcha that will cost an hour

**Chrome 151 on macOS does not exit after `--screenshot`.** The PNG is written within about
two seconds and is complete, and then the process sits there; `--virtual-time-budget` is not
honoured by the new headless mode. `docs/capture.sh` wraps each shot in `timeout 10` for that
reason. Judge a shot by its byte count and not by the exit code.

**Never clean up with `pkill -f "Google Chrome"`.** Carlos works in a real Chrome with many
tabs, and often a second one holding a hand-done ETH Shibboleth login that cannot be
re-automated. A bare pattern takes all of it down with no crash dialog. `docs/capture.sh`
scopes its cleanup to its own `--user-data-dir`.

## Open decisions for Carlos

1. The sign convention for the whole 10:00 block. See "Notation, pinned".
2. The Overleaf teaching plan named on the schedule row,
   `https://www.overleaf.com/6246534572rhwckvrwdzgz#c494bd`, has not been opened and may
   already settle several of these.
3. Whether the Maxfield Parrish plate can be used. The lamp is drawn until it is cleared.
4. Whether red and green may both appear in a viz. See "Colour identities".
5. Whether the block runs 60 minutes or 30. If 30, the minimum viable path is scenes 0, 1,
   2, 3 and 8, which is the whole argument without the storm.
6. Notebook naming across HS26. This directory uses `<name>.ipynb` and `<name>_solutions.ipynb`.

## What NOT to do

- Do not hand-edit `data/datasets.js` or either `.ipynb`. Both are generated.
- Do not weaken verifier assertion (j) to let a scene file mention the answer.
- Do not add a second call to `Trace.setTruthVisible(true)`.
- Do not call `Math.random()`. `js/rng.js` is the only source of randomness, seed 20260904.
- Do not write a colour in JavaScript. Every fill and stroke routes through a CSS class.
- Do not change a box size in `css/trace.css` without changing the matching number in
  `js/trace.js`. A mismatch scales the viewBox instead of resizing the box, which renders
  acceptably and captures wrong. It happened once already.
- Do not put the two alpha thresholds on screen. The slider is what finds them.
- Do not add a gate that hides a scene until an answer is right.
- Do not renumber a scene. Stubs hold their positions for that reason.
- Do not use an em dash, an en dash, or `--` as a dash, anywhere, including inside generated
  notebook cells.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a
  scene moving from stub to built, a new module, a changed verification command, a changed
  data format, or a change in who owns the work, UPDATE THIS FILE IN THE SAME COMMIT. A
  CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you
  create a subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that
  cost someone an hour. Do not restate what the code already says plainly.
