# The four built FDD visualizations, dissected for BMAI weekend 1

Written 2026-08-26. Everything below was read from the files on disk. Where something is absent I
say it is absent.

Repo under dissection: `/Users/carloscotrini/Documents/git_fdd/projects`
Target of the work: `hs26-bmai-w1-gd-grasshopper` and the weekend 1 optimization block.

---

## 0. Fork decision table (read this first)

| If you are building | Fork from | Why |
|---|---|---|
| A game where the participant IS the algorithm, one parameter, felt before named | `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper` | The only one of the four that teaches an update rule by feel. Carries the verifier, the local/world split, the explain section, the mapping table. |
| A multi scene click through explainer with a lecturer driving Prev/Next | `/Users/carloscotrini/Documents/git_fdd/projects/bandits` | The reference implementation of the course-viz scene contract, hash routing included. |
| A page paired with a beamer deck the lecturer talks over | `/Users/carloscotrini/Documents/git_fdd/projects/gaussian` | Shows the deck side and the viz side of one lesson, and how the deck points at the viz. |
| A live arcade toy with a physics loop and live readouts | `/Users/carloscotrini/Documents/git_fdd/projects/lunar-lander-game` | Smallest of the four (64K, 7 files, zero libraries). Canvas, requestAnimationFrame, readout panels. |

All four share one shell. `lunar-lander-game/css/style.css` is **byte identical** to
`grasshopper/css/style.css` (648 lines, verified with `diff`), and
`lunar-lander-game/js/theme.js` differs from `grasshopper/js/theme.js` in **exactly one line**,
the localStorage key. That is the sanctioned way to start a new viz: copy those two files, change
the key, build on top.

Shared token values across grasshopper, lunar-lander-game, bandits and gaussian:
light `--bg: #f9f7f1`, `--ink: #1a1a1a`; dark `--bg: #181612`, `--ink: #ece7d9`;
categorical blue `#2f6cb1`. These match the course-viz skill exactly.

Vendored library versions, for a copy: d3 **7.9.0** (grasshopper and gaussian, identical banner),
KaTeX **0.17.0** in grasshopper (`vendor/katex.min.js` plus 60 font files, ttf and woff and woff2,
1.7M), KaTeX **0.16.11** in bandits (`vendor/katex/`, woff2 only, 20 font files, 592K).
If size matters, take the bandits vendor tree. lunar-lander-game vendors **nothing**: it is pure
canvas 2D and needs no library at all.

---

## 1. grasshopper: the gradient ASCENT game

Path: `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper`
Last commit: 2026-08-04, `b4c68e0 Add the Grasshopper gradient-ascent game and explainer`.
Published at https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html
Size: 1.9M total, of which 1.7M is the vendor tree. Authored code: 4216 lines.

```
index.html            script order is load-bearing and the file says so
css/style.css   648   theme tokens + shell + the FULL shared class vocabulary
css/game.css    509   game area, and the SVG box size locks
css/explain.css 245   explanation area
js/theme.js      74   light/dark, 't' shortcut, ?theme= override
js/landscapes.js 259  the five levels, and window.Landscape (grad, sampleCurve, clamp)
js/localview.js 343   what the grasshopper sees
js/worldview.js 237   the truth, gated
js/game.js      692   state, controls, verdict
js/explain.js   566   the explanation, five parts, four figures, one mapping table
js/main.js       60   boot + URL hooks
precompute/verify_landscapes.mjs  583   recomputes and asserts every pinned number
vendor/               d3 7.9.0, KaTeX 0.17.0
```

There is **no `data/datasets.js`**. `js/landscapes.js` plays that role and is documented as the
single source of truth. There is **no `js/scenes/` directory and no scene engine**. The page is a
game with an essay under it, driven by its own controls and by `?level=N`. There is **no
CLAUDE.md** (none of the four has one; the BMAI house rule that every directory carries one is
something you must add).

### 1.1 The five levels (`js/landscapes.js`)

Every level is a closed form. Sums of Gaussians, one linear tilt, one cosine ripple. Nothing is
random and nothing is fitted at run time.

| # | id | J | teaches | par | parReached |
|---|---|---|---|---|---|
| 1 | `one-hill` | `1 + 5 exp(-(t-6.2)^2 / (2*2.5^2))` | the sign of the slope is the direction | 3 | true |
| 2 | `long-shelf` | `0.5 + 0.012 t + 2.2 exp(-(t-9.4)^2/2)` | a right sign with no size | 60 | false |
| 3 | `two-hills` | `0.6 + 2.4 exp(...t-3.4) + 3.6 exp(...t-8.6)` | the nearest summit may be the shorter one | 60 | false |
| 4 | `narrow-summit` | broad mound plus thin spike, both at 6.1 | a step that suited gentle ground overshoots | 5 | true |
| 5 | `rough-ground` | trend at 6.4 plus `0.2 cos(2 pi (t-6.4)/1.5)` | a noisy slope reading misleads any single step | 3 | true |

Level 4 is the interesting construction: `2.6 exp(-(u^2)/(2*2.6^2)) + 1.2 exp(-(u^2)/(2*0.08^2))`
with both terms centred at 6.1. Same centre, two widths. `maxSlope` is 9.13 against 1.2 to 1.6 on
the other levels. That is how you build "one alpha cannot serve both regimes" out of two Gaussians.

Each level carries pinned facts: `peak`, `range`, `maxima` (every interior local maximum),
`maxSlope`, `par`, `parReached`, and `demo: { climb, stuck }` scripted `[direction, distance]`
pairs. **`parReached: false` is an honesty flag**: on levels 2 and 3 no fixed step size reaches
the summit inside a 60 step budget, so par records the exhausted budget, and `js/game.js:48` falls
back to `demo.climb.length` as the human benchmark. Copy that flag; it is the difference between a
par that teaches and a par that lies.

`window.Landscape.grad` (`js/landscapes.js:222`) is a **central difference with h = 1e-4**, with
the stencil clamped into the domain so it degrades to a one sided difference at the ends. There is
no analytic derivative anywhere in the runtime. That matters for BMAI: Carlos's stage 1 asks
participants to compute `grad_eps L(w_hat)` by finite difference, and grasshopper already does
exactly that. The difference is that grasshopper's h is fixed and invisible, while stage 1 wants
eps visible and adjustable.

### 1.2 The verifier (`precompute/verify_landscapes.mjs`, 583 lines)

Run `node precompute/verify_landscapes.mjs`. It loads `js/landscapes.js` into a `vm` sandbox with a
fake `window`, then recomputes every pinned number from J alone on a 200001 point grid plus golden
section refinement, and asserts invariants labelled a through h in its own header:

- a: J finite on 20001 samples per level
- b: pinned peak, range, maxima, maxSlope match to 1e-3 in theta and 1e-4 in J
- c: the global maximum is interior by at least 0.4
- d: the best competitor sits at least 3 percent of the range below the global maximum
- e: per level structure (level 2 has a flat stretch at least 2.5 wide, level 3 traps naive ascent,
  level 4 has a slope above 8, level 5 has at least 6 interior maxima and at least 12 percent sign
  disagreement against its own trend)
- f: `halfV / halfW` lies in [0.8, 2.0] and at least 85 percent of the domain renders inside the window
- g: `demo.climb` ends on the summit, `demo.stuck` ends on a non global maximum
- h: `par` matches the best fixed step gradient ascent count

It also **generates** the demo jump lists and compares them for exact equality against the pinned
ones, so the arrays in `landscapes.js` are always exactly what the script produces. It has
`goldenMax` and `goldenMin` (the latter defined as `goldenMax` of the negated function), so the
machinery for a descent port is already present in the file.

This is the single most valuable non obvious asset in the whole repo. Without it, a level file is
a pile of magic numbers.

### 1.3 The state model (`js/game.js`)

```js
state = {
  levelIdx, theta, turns,
  trail: [theta...], log: [{dir, dist, theta, J}...],
  dir, dist,
  reveal, hints: { grad, tangent },
  committed, verdict, flying
}
```

Public API returned from `Game.mount(root)`:
`setLevel(idx)`, `setReveal(bool)`, `setHints({grad, tangent})`, `jump(dir, dist)`, `commit()`,
`reset()`, `replayDemo(kind)`. `js/main.js` calls exactly those and nothing else.

Three information switches, **all off at start**, and they are the only way to buy more
information: "Show the whole landscape", "Show the slope line", "Show the gradient". Par is the one
number public from the start "because a par you cannot see is not a par". Best score per level is
kept in localStorage under `grasshopper-best-<id>`, wrapped in try/catch because `file://` and
private mode can throw.

The verdict function (`js/game.js:348`) has three outcomes and one subtlety worth copying:

- summit: `rel = (L.peak.J - jt) / span <= 0.01`
- flat but not summit: `|grad| <= 0.01 * maxSlope`, and then it decides between "a lesser summit"
  and "a shelf that only feels like one" using **curvature**:
  `curv = grad(theta + 0.01) - grad(theta - 0.01)` must be `< 0` (`js/game.js:386`). The comment
  explains why proximity in theta alone fails: on a rippled landscape a valley floor sits well
  inside the tolerance of the crest beside it, and calling that floor a summit is the one thing the
  verdict must never do.
- otherwise: "You stopped on a slope."

Two rendering rules are commented as deliberate and are worth carrying over verbatim:
the level list and the chip row are rebuilt from `innerHTML` **only when their set of rows
changes**, because rebuilding would destroy the button the player just activated and drop keyboard
focus to `<body>`; and the world view is **not rendered at all** while hidden, and `world.clear()`
is called on the way back out, so a landscape the player has not earned is never sitting in the DOM
behind a `display: none` for anyone who opens the inspector.

### 1.4 How theta <- theta + alpha grad J(theta) is taught by feel before it is named

The whole design is one sentence: the two things a player learns by feel are exactly the two
things the update rule does. Go the way the slope points. Go further when it is steeper.

Concretely, the player has **two levers and only two**: a direction segmented control
(left / right) and a distance slider (0.01 to `maxJump`, always 3, with preset chips at
0.05, 0.2, 0.5, 1, 2, 3). Nothing else. The explanation section then says, in part three, that the
rule takes over the first lever completely because the sign of grad J is the direction, and takes
over most of the second because the size of grad J is most of the distance, and that alpha is
**what is left of the distance lever**: one number, fixed before you start, that says how far a
given steepness carries you. That framing is the payload and it survives a sign flip untouched.

The naming happens only in `js/explain.js`, in five parts:

1. "The landscape has a name: J". Figure A, one full landscape with a marked position and the
   marked global maximum.
2. "What the grasshopper feels has a name too: nabla J". Figure B, one hill felt from three places
   (uphill right at t = 2.2, uphill left at t = 8.9, no uphill at the summit t = 5.0). The three
   panels share **one pixels per unit scale** (`PPX = 90`, `PPY = 51.4`) so the three slopes are
   comparable. The slope is drawn as a fixed run with the matching rise. The comment gives the
   reason: a bare tangent line hugs the curve too closely to be read.
3. "The method is one line". The KaTeX display at `js/explain.js:427` is
   `\theta \leftarrow \theta + \alpha \nabla J(\theta)`, then the paragraph at line 447 says
   "Change the plus to a minus and you have gradient descent", and line 448 renders
   `\theta \leftarrow \theta - \alpha \nabla J(\theta)`. **The descent form already ships**, as one
   sentence and one formula, with no figure of its own. Figure C follows: the same landscape and
   start point at three alphas (0.35 too small, 1.6 about right, 4.4 too large), and every dot is a
   real iteration of `ascend(grad, t0, alpha, steps)` at `js/explain.js:49`, whose body is literally
   `t = t + alpha * grad(t)` (line 52).
4. "Why the levels were hard". Four named failure modes as prose plus figure D, ascent from the
   left flank of the small hill, seven steps, taller summit marked and never visited.
5. The handover.

**Nothing in the figures is drawn by hand.** The file says so in its header, and it is true: the
hills are real functions, the paths are real iterations, the printed gradient values come from the
same derivative the figure draws.

### 1.5 How the explain section hands the notation over to REINFORCE

Part five, "Where this is going: REINFORCE", changes the meaning of every symbol while keeping the
symbol. theta stops being a place on a hill and becomes the policy weights. grad J becomes one
number per weight. J stops being a height and becomes the average return. The landscape becomes
the space of all policies and is now genuinely invisible, because seeing it would mean running
every policy there is. Then the twist: grad J cannot be looked up here, it has to be **estimated**
from the handful of episodes actually played, and it is right on average and only on average. That
paragraph explicitly points back at level 5, rough ground.

It closes with a two column table (`js/explain.js:513`, `<table class="exp-table">`) with the rows

| symbol | In the game | In REINFORCE |
|---|---|---|
| theta | where you stand on the hill | the weights inside the policy |
| J(theta) | the height at that position | the average return that policy collects |
| grad J(theta) | the slope under your feet | an estimate of the slope, from the episodes played |
| alpha | how far a given steepness carries you | the learning rate |
| a local maximum | the smaller of the two hills | a policy that no small change improves |

caption "Two settings, one procedure". This is the same device the cold open menu calls the
sharpest in the house style (the AINIT Faust deck's mapping table). Refill it, do not redesign it.

The section is mounted with the page and is **not** gated on a first commit. `explain.js` documents
the choice: a lecturer must be able to scroll to it and read from it without playing five levels
first, and a reader who scrolls past the game has chosen to skip the discovery.

### 1.6 The localview / worldview split

This is the pedagogical spine and it is worth stating precisely.

**localview.js** is what the grasshopper sees: a 620 by 380 panel, the grasshopper at the exact
centre, x mapped from `[theta - halfW, theta + halfW]` and y from
`[J(theta) - halfV, J(theta) + halfV]`. Both spans are **constants of the level**, so pixels per
unit never change. The README calls this "the one rule that matters" and explains why: if the
vertical scale auto fitted to the visible window, a dead flat shelf would look as steep as a cliff
and levels 2 and 4 would stop teaching anything. The consequence is that **the tilt of the
grasshopper glyph IS the gradient** (`tilt = atan(-g * pxJ / pxT)`, clamped to 70 degrees at
`js/localview.js:38`). Two eyesight fade gradients at the panel edges, a plate carrying two scale
bars that picks the emptier corner, and an optional gradient readout badge and tangent line behind
the two hint switches. The jump animation **pans the view centre**: the ground slides horizontally
under a fixed horizon while the glyph rides a parabolic arc above its resting point, 620 ms, cubic
in out, and it honours `prefers-reduced-motion`.

**worldview.js** is the truth: the whole domain in one 740 by 280 panel, the real profile, the
amber band showing the sliver currently visible, the purple dotted trail of every position
visited, and the axes. It is only mounted when the landscape switch is on or the flag is planted.
**The summit is not marked until the player commits.** Until then the panel shows only where you
have been. On commit it adds the amber summit dot, a dashed leader to a label parked at the top of
the panel on whichever side the flag is not, and the flag itself, drawn last so the pole covers the
leader. If the player finishes on the summit the two markers would collide, so within 6 pixels they
fuse into one marker (amber disc, green centre, pole rising out of it) and the separate hopper
marker is hidden.

Colour identities are fixed once at the head of `css/style.css` and nothing cross talks:
green is the grasshopper and a successful climb, amber is revealed truth, blue is the slope and
gradient concept, purple is the trail, red is a miss.

### 1.7 URL hooks

`?level=1..5` is a real deep link a lecturer can use mid lecture. The rest are dev affordances for
headless screenshots and `js/main.js` says so: `?theme=dark`, `?test=revealed`, `?test=hints`,
`?test=played`, `?test=committed`, `?test=stuck`. Both the query string and the hash are accepted
(`main.js` concatenates them into one `URLSearchParams`).

---

## 2. lunar-lander-game, and the scratch file that shares its name

### 2.1 What the FDD lander is

Path: `/Users/carloscotrini/Documents/git_fdd/projects/lunar-lander-game`
Last commit: 2026-08-06, `31f4d77 Add a playable lunar lander, and link it from the MDP slide`.
Published as `fly-the-lander/` on the FDD Pages site.
64K, 7 files, 1376 lines, zero vendored libraries.

```
index.html
css/style.css   648   byte identical to grasshopper/css/style.css
css/game.css    228   stage, controls, the two readout cards
js/theme.js      74   identical to grasshopper except the localStorage key
js/lander.js    178   the MDP: physics + the exact reward function
js/main.js      248   canvas, input, readouts
```

Its subject is **the Markov decision process**. Eight observations, four actions, and a live reward
breakdown: shaping ("nearer, slower, more upright"), fuel burned, terminal, and the running return
against a meter where 200 counts as solved. The three "what to notice" cards are the teaching
payload: most of the return is earned before touchdown; doing nothing is an action and often the
right one, because the main engine costs 0.30 every frame; you choose the action and the
environment chooses what happens next.

The honesty split is documented in the file header and repeated in the page's own fine print.
**The reward function is transcribed line for line from gymnasium's
`envs/box2d/lunar_lander.py`** and the eight observations use that environment's exact scalings.
**The physics is a stand in for Box2D**: a direct integration in the same normalised state space
with constants tuned until it flies like the original. The README states the tuning target and the
measured result: the PD `referencePilot` lands 19 of 24 starts with a median return of 191 in about
396 steps, and it says in plain words "Do not use it to compare scores against the notebook."

Starts are deterministic per seed (`hash01(n)` from `sin(n * 12.9898) * 43758.5453`), so a lecturer
can reproduce a run. Dev hooks: `?test=mid` flies the reference pilot 140 steps and freezes,
`?test=landed` runs to touchdown, `?theme=dark` forces the theme. When `test` is set the animation
loop is never started, which is why the screenshot is stable.

### 2.2 The scratch file

Path: `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/Minimum Lander Exploration.html`
One file, 1154 lines, 74396 bytes. Filesystem mtime 2026-08-26 10:52.
Line 2 is `<!-- saved from url=(0109)https://moodle-app2.let.ethz.ch/pluginfile.php/2523623/mod_resource/content/2/minimum_lander_exploration.html -->`,
so the local copy is a browser save of a Moodle resource, content version 2. It carries no git
history. I cannot date its authoring from the file; I can only say the local copy has the later
mtime of the two.

Structure: a sticky progress bar with 7 clickable dots plus Prev and Next, seven
`<div class="stage">` blocks, a completion screen, and a modal popup. Seven independent IIFEs, each
owning its own canvas, its own `surfaceY` or `f`, its own `deriv`, its own reset and draw.

| Mission | Title | Function | What it teaches |
|---|---|---|---|
| 1 | Manual Moon Landing | `x^2 + 6x + 10` | read the minimum off a fully visible curve |
| 2 | Navigating the Fog | `x^2 - 8x + 20` | the same with only a revealed window around each landing |
| 3 | The Mathematics of Slope | `w^2 - 4w + 7` | compute a finite difference slope in two windows (eps = 1, centres at -14 and +14), with a "Query Function" box |
| 4 | The Precision Limit | `w^2 - 4w + 7` | shrink eps by 10x per click, watch `(b - a) / eps` converge, then type the limit |
| 5 | Engaging Autopilot | `0.5 w^4 - 3 w^3 + 2 w^2 + 5 sin 2w + 3 cos w + 10` | 1D gradient descent, step / auto run, history table of w, f'(w), delta w |
| 6 | The 2D World | `w1^2 + 2 w2^2 + 0.5 w1 w2` | 2D descent on a contour plot with a gradient arrow |
| 7 | The Trap | `0.1 (w-3)^2 + 3 - 2 exp(...) - 4 exp(...)` | local versus global minima |

### 2.3 Which is newer, which is richer, what is in one and not the other

**The two teach disjoint subjects.** The FDD lander teaches the MDP: states, actions, reward,
return. The scratch file teaches gradient descent on a loss. They share the word "lander" and
nothing else. There is no gradient, no derivative and no loss anywhere in `lunar-lander-game/js`,
and there is no reward, no action and no policy anywhere in the scratch file. So "which is richer"
only has an answer per axis:

Only in the FDD lander: the mandated multi file layout; the house light default plus dark with the
`t` shortcut; theme aware canvas drawing (`css("--red")` read from the stylesheet at draw time, so
the toggle repaints); documented dev hooks; a stated and measured verification claim; a written
honesty note separating what is exact from what is tuned.

Only in the scratch file: the seven mission progression and its progress bar; answer checking with
`correct` / `incorrect` input classes; the "Query Function" affordance that makes f a black box you
must probe; the eps shrinking convergence table; the descent history tables; a working marching
squares contour renderer with a gradient arrow; the Colab handoff at the end.

Weaknesses of the scratch file, measured against the course-viz skill: single file with an inline
`<style>` block (lines 7 to 219); dark only palette (`#05070c`, `#0b1020`, `#e7e9ef`, `#34d399`,
`#fb7185`, `#7dd3fc`, `#fbbf24`), with no light theme and no `t` shortcut, which inverts the
lecture default the skill mandates; `onclick="goToStage(0)"` attributes in markup; no hash routing
at all, so a lecturer cannot deep link to mission 6; `Math.random()` used inside draw code; a
5 second auto advance popup that takes control of the room away from whoever is teaching; and each
mission's mathematics duplicated inside its own closure with no single source of truth and no
verifier.

### 2.4 What "merging them" would actually mean, file by file

Merging is the wrong verb. The right operation is: **port the seven missions into the FDD shell.**
That is exactly what `lunar-lander-game` itself did (its `css/style.css` is inherited from
grasshopper verbatim), so there is a precedent for the move.

| New file | Comes from | Work |
|---|---|---|
| `index.html` | scratch lines 220 to 516 | keep the seven stage blocks; delete the inline `<style>` (lines 7 to 219) and link `css/*.css` instead; delete every `onclick=` attribute and bind in JS; add the script tags in load order |
| `css/style.css` | `lunar-lander-game/css/style.css` verbatim | this one file converts the page from dark only to the house light default plus dark |
| `css/game.css` | new, seeded from the scratch rules | the mission header, the tables, the canvas size locks |
| `js/theme.js` | `lunar-lander-game/js/theme.js`, change the localStorage key | gives the `t` shortcut and `?theme=` for free |
| `js/main.js` | `bandits/js/main.js` | replace `goToStage` / `updateProgress` / `prevStage` / `nextStage` with the scene engine and **mandatory** `#scene=N` hash routing |
| `js/scenes/scene0.js` to `scene6.js` | one per scratch IIFE | each registers `window.scenes.sceneN(root)` and returns `{ onLeave }` that clears its `setInterval`. The scratch auto run timers are exactly the leak `autoplay.js` warns about |
| `js/landscapes.js` | new, collecting the seven functions | the seven `surfaceY` / `f` / `deriv` pairs and their pinned minima in ONE module, so no scene owns its own copy of the mathematics |
| `precompute/verify_landscapes.mjs` | ported from grasshopper | assert every pinned minimum and every checkable answer: mission 3 expects `2w - 4` at -14 and +14, that is -32 and 24; mission 4's limit at the chosen w; mission 7's local versus global gap |
| deleted | the popup countdown, `Math.random()` in draw code, the `onclick=` attributes | |
| kept untouched | the mission prose, the Query Function box, the eps table, the contour renderer | |

The contour renderer is the one piece of the scratch file worth lifting wholesale: marching squares
over levels `[0.5, 1, 2, 4, 8, 12, 16, 24, 32]` at `res = 2` on a 960 by 400 canvas, with a
gradient arrow scaled by `20 / max(|grad|, 1)`. Nothing in the FDD repo draws a contour plot.

---

## 3. bandits: the scene engine in practice

Path: `/Users/carloscotrini/Documents/git_fdd/projects/bandits`
Last commit: 2026-08-22, `e8104a0 Make the bandit board actually playable, and thin the recap frames`.
2344 lines. 720K. Published at `bandits/` on the FDD Pages site.

**Provenance matters here and the README says so in bold: this is a trimmed copy, and the canonical
version belongs to the SML course** at `sml-fs26/classic_rl`, working copy
`~/Documents/git_sml/classic_rl/casino/`. Fix bugs there first, then re trim, or the two drift. The
SML original has five scenes (free play board, explore or exploit, epsilon greedy, the trade off,
a recap); Carlos asked on 2026-08-22 for **one scene only, just the basics**, so only the board
survives. The README carries a table of exactly what was changed and nothing else was.

### 3.1 The scene contract, verbatim

`js/main.js` is the reference implementation of the course-viz scene contract and its header says
the pattern was lifted from the skill. Each scene file at `js/scenes/sceneN.js` registers:

```js
window.scenes.sceneN = function (root) {
  return { onEnter?, onLeave?, onNextKey?, onPrevKey? };
};
```

`onNextKey` / `onPrevKey` return **true to consume the keystroke** (advance an internal step inside
the scene) and **false to let the driver advance the scene**. That single boolean is the whole
mechanism for "a scene with its own step engine inside a deck of scenes".

`goTo(idx)` does, in order: leave the old scene (remove `active`, call `onLeave`), lazily create the
scene node and call the builder **once** (subsequent visits call `onEnter` instead), set `current`,
add `active` after a 20 ms timeout for the fade, update dots, buttons, title, and hash. Builder
failures are caught and rendered into the node as a visible message rather than dying silently.

Two details worth copying exactly:

- **Scene keys are non contiguous by design.** The comment says the original scenes 1 and 2 were
  merged and scene 3 dropped, and the keys were preserved "so deep links survive". Gaps in the deck
  are fine; the engine takes a list of `{ key, title }` and never assumes key equals index.
- **`&instant` in the hash bypasses the opacity transition.** The comment explains why it exists:
  CSS transitions run on the compositor and do not follow `--virtual-time-budget`, so headless
  screenshots otherwise capture mid fade. The source labels it a dev affordance.

Hash routing: `readHashScene()` matches `/[#&?]scene=(\d+)/`, `syncHash(idx)` rewrites just the
scene parameter with `history.replaceState` and preserves any other hash parameters. A
`hashchange` listener calls `goTo`. Initial load reads the hash and falls back to scene 0.

### 3.2 The supporting modules, and which are reusable as is

- `js/bandit.js` (149): a Bernoulli bandit mirroring the notebook's `casino_utils.py`, with the
  vocabulary explicitly pinned to the Python (`empirical(arm)` maps to
  `get_empirical_probability()`, and so on). Carries **Mulberry32**, and the comment notes it is
  identical to the generator in a sibling viz so seeds line up. Scenes never call `Math.random()`.
  Exposes both `cumulativeRegret` (can drop on a win, honest per realisation noise) and
  `cumulativePseudoRegret` (monotone), with a comment explaining when to use which.
- `js/policies.js` (85): `greedy`, `epsGreedy`, `epsGreedyDecay`, plus `argmaxRandomTiebreak` whose
  tie breaking is documented as matching the notebook's `random.choice(best_machines)`.
  **In this trimmed copy it is dead code**: only scene0 ships, and scene0 never calls `Policies`.
- `js/history.js` (51): a tiny record and cursor store implementing the skill's step engine
  contract, "state is source of truth, prev equals reset plus replay". `push` truncates any future
  records left over from a rewind. Reusable verbatim for any stepped scene.
- `js/autoplay.js` (130): a clock with knobs. `create({ maxSteps, stepFn, onTick, onPause, onComplete, speed })`
  then `attachControls({ playBtn, pauseBtn, stepBtn, resetBtn, speedSlider })`. Its header carries
  the warning that the scene's `onLeave` **must** call `engine.dispose()` or the timer keeps firing
  after the user navigates away.
- `js/katex-helpers.js` (29): `Katex.render(tex, host, displayMode)`, `Katex.inline`,
  `Katex.display`. Never throws; falls back to literal text. Copy this file as is into any new viz.
- `js/machine-row.js` (204) and `js/chart.js` (233): widget and SVG line chart. Both route every
  per trace and per arm colour through a CSS class.
- `data/datasets.js` (267): the `window.DATA = {...}` convention, with the probabilities pinned to
  the notebook cell they came from and the seeds pinned per scene so trajectories reproduce.

### 3.3 The lesson that cost the most

`js/scenes/scene0.js` opens with it. The SML scene 0 was a static title board that hand built five
cards and never attached a handler, because playing began in scene 1. Trimming to one scene left
a board that **looked clickable and was not**, and Carlos found it immediately: "I click on a
machine but nothing happens." The fix mounts the board through the shared `machine-row.js` and
wires `setClickable`. There is a second note in the same file: `setKeyboardShortcut` only stores
the handler and nothing dispatches to it, so the scene registers its own real `keydown` listener,
"the hud promises press 1 to 5, so the listener has to be real or the promise is a lie".

Also: the five probabilities are permuted on every load so the best machine cannot be memorised
between runs, and the multiset is unchanged so it is the same problem the notebook poses.

---

## 4. gaussian: how a deck and a viz are paired

Path: `/Users/carloscotrini/Documents/git_fdd/projects/gaussian`
Last commit touching it: 2026-07-09. This is the **oldest** of the four and it shows.

```
README.md                        the pairing is documented here, for the lecturer
slides/beamer-preamble.tex   77  light Metropolis, Libertinus, TikZ styling
slides/gp-slides.tex        296  15 frames in 5 sections
slides/gp-slides.pdf             the compiled deck
viz/gp-pricing/                  the interactive, 3 scenes
  js/gp.js                  360  the real mathematics: RBF kernel, Cholesky, posterior, EI
  js/main.js                120  click-step scene engine with #scene=N and &run
  js/theme.js                40  a leaner theme module than grasshopper's
  js/scenes/scene0.js        50
  js/scenes/scene1.js       131  prior, posterior, band; smoothness slider; New guesses
  js/scenes/scene2.js       178  the hunt: EI acquisition, 5 trials, then the reveal
  data/datasets.js          528  generated
  precompute/build_data.py  132  the ONLY place the numbers are born
  vendor/d3.min.js               d3 7.9.0. No KaTeX: this viz carries no formulas
```

### 4.1 The pairing mechanism

Three things bind the deck to the viz, and they are all small.

1. **A macro.** `slides/beamer-preamble.tex:77` defines
   `\newcommand{\livecue}[1]{{\footnotesize\color{good}$\blacktriangleright$ live: #1}}`.
   It is used exactly twice in the deck, on the two frames that have an interactive counterpart:
   line 130 `\livecue{drag the smoothness dial, add a point, watch the band breathe}` on the frame
   "Keep only the curves that fit the tests", and line 194
   `\livecue{press the button, run each test, watch it converge}` on "Where should we test next?".
   The cue is a stage direction for the lecturer, in the green "action" colour, revealed on the
   same overlay as the frame's final reveal. It contains no URL.
2. **Deep links live in the README.** Three of them: `index.html#scene=1&step=2` for the forecast
   band, `#scene=2&step=0` for the first move of the hunt, `#scene=2&step=6` for the reveal. That
   is what the mandatory hash routing is actually for.
3. **Scene titles that are frame titles.** The viz's three scene titles are "What price should we
   charge?", "A forecast with honest error bars", "Find the best price in a few tests"; the deck's
   five section names include "The question", "A forecast with honest error bars", "Smart
   experimentation". The audience hears the same sentence twice.

The README's "Drive it during the talk" section is written for a human standing in a room: Next and
Prev or arrow keys, dots to jump, `t` to flip theme, and what is draggable on each scene.

### 4.2 One source of numbers, computed live

`precompute/build_data.py` is the only place the numbers are born: the true profit curve
(`profit(p) = (p - cost) * demand0 * exp(-(p - cost) / decay)`, peaking at `cost + decay`), the
three past tests, the prior mean and spread, the noise, the default length scale. It is
deterministic (seed 0) and reproduces byte identical output. The viz then computes the GP posterior
and the acquisition **live** from those inputs with real mathematics in `js/gp.js`: RBF kernel,
Cholesky factorisation and back substitution, posterior mean and variance, Expected Improvement
with a rational `erf` approximation. The README tells the lecturer to edit the Python and rerun.

`scene2.js` precomputes the whole EI trajectory once at build time from a seeded Mulberry32, then
reveals it one trial at a time, recomputing the posterior and the acquisition from only the points
revealed so far. The acquisition scale is **fixed at the step 0 maximum** so the promise visibly
shrinks as the search converges. That is a chosen invariant, and it is the kind of thing a
`precompute/` check should assert.

### 4.3 The one thing not to copy from this deck

`slides/beamer-preamble.tex:75` defines
`\newcommand{\takeaway}[1]{\vfill\begin{center}\Large\alert{#1}\end{center}\vfill}`
and `gp-slides.tex` uses it **14 times**, once on nearly every frame.

That macro is now forbidden. `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md:124`
states the rule: "No closing punchline. A frame ends on its final reveal. No big centred line in the
brand colour, ever. If a closing thought is real content, it is the last ordinary bullet, in body
text." The cold open menu repeats it and adds, in as many words, that an earlier build got this
wrong by reverse engineering the grammar from decks that predate the rule, and that a `\takeaway`
macro must not be reintroduced. `gp-slides.tex` (2026-07-09) is one of those older decks.

So: copy the `\livecue` macro, the section structure, the TikZ styling and the light projection
first colour setup from `beamer-preamble.tex`. Do not copy `\takeaway`, and do not copy the
per frame closing line pattern from `gp-slides.tex`.

---

## 5. The answer for `hs26-bmai-w1-gd-grasshopper`

Carlos's stage 5: "Let participants understand that GD fulfils the Bernstein conditions. Each
grasshopper only needs to work on its own dimension. For `w = (w1, w2)` in R^2,
`w <- w - alpha grad L(w)` splits into `w1 <- w1 - alpha dL/dw1(w)` and
`w2 <- w2 - alpha dL/dw2(w)`."

First, the schedule fact that shapes the answer: the master schedule gives the **same slug**
`hs26-bmai-w1-gd-grasshopper` to two rows, one for the grasshopper game (Christina, Suei-Wen, Ivan)
and one for "Moonlander games as grasshopper games, extending these games with the new ideas"
(Sanziana, Suei-Wen). Two teams, one slug, and the second brief is the first with the Minimum
Lander missions folded in. The cleanest resolution is **one folder with two acts**, a 1D act and a
per coordinate act. It also puts Suei-Wen on both, which is the natural integration point.

### 5.1 Reuse verbatim or near verbatim

| File | Change needed |
|---|---|
| `vendor/` (whole tree) | none. Copy. |
| `css/style.css` | none, if you keep the token names. See 5.2 on the peak tokens. |
| `js/theme.js` | one line: the localStorage key. |
| `js/localview.js` | the drawing is sign agnostic; feed it L instead of J and it works. Only the badge string "grad J = " and the SVG `aria-label` change. The fixed scale rule, the glyph tilt equals gradient, the pan the view animation, the eyesight fades, the corner picking scale plate: all keep. |
| `js/history.js` from bandits | copy as is if you add a rewindable step. |
| `js/katex-helpers.js` from bandits | copy as is. Cleaner than grasshopper's inline `katex.render` calls. |
| `precompute/verify_landscapes.mjs` | keep the structure, the sandbox load, the 200001 point grid, the golden section refinement, the a to h invariant letters, and the "generate the demo scripts and compare for exact equality" trick. `goldenMin` already exists in the file. |
| `js/game.js` | the whole state model, the three information switches, the `parOf` / `parReached` honesty, the localStorage best, the public API, the keyboard bindings, and the two "do not rebuild the list you are standing on" rendering rules. |
| `js/explain.js` | the five part structure, the four figure structure, the "every figure is computed, never drawn by hand" rule, and the two column mapping table at line 513. |

### 5.2 What must change because BMAI descends a loss

1. **The sign.** `js/explain.js:49` `ascend(grad, t0, alpha, steps)` with body `t = t + alpha * grad(t)`
   becomes `descend` with `t = t - alpha * grad(t)`. Every figure path in the file comes from that
   one function, so it is one edit plus a re verification of every narrative string. Figure C's
   three alphas (0.35, 1.6, 4.4) were tuned against `hill(t) = 1.5(1 + cos(pi(t-5)/5))` for ascent;
   after mirroring you must re run the iteration and re read every caption ("at the summit after
   four steps", "overshoots the top, then overshoots back") against what the code now produces.
2. **The symbols.** Carlos's handwriting uses `L`, `w`, `w_hat`, `grad_eps L(w_hat)`, `alpha`. The
   BMAI SLT deck uses `w` for the model parameter. So the rename is theta to **w**, J to **L**, and
   keep **alpha** (the Minimum Lander uses eta; pick one and pin it in the new CLAUDE.md, and I
   recommend Carlos's own alpha). Files touched by the rename: `js/landscapes.js` (field names
   `peak`, `maxima`, `maxSlope`, the doc block), `js/localview.js` (badge text, aria label, the
   header comment's axis description), `js/worldview.js` (axis titles "position theta" and
   "height J", the aria label), `js/game.js` (the three KPI labels "Height (J)" and
   "Position (theta)", every verdict string), `js/explain.js` (every `data-tex` attribute, the two
   display formulas, all prose, the mapping table's symbol column).
3. **The geometry vocabulary.** summit becomes the lowest point, peak becomes basin, uphill becomes
   downhill, "a local maximum" becomes "a local minimum", the flag is planted in a valley.
   `js/game.js:351` `rel = (L.peak.J - jt) / span` becomes `(jt - L.min.L) / span`.
   `js/game.js:386` `curv < 0` becomes `curv > 0`, because at a local minimum the slope turns
   upward. `js/worldview.js`'s y domain padding is currently
   `[range.lo - 0.10*span, range.hi + 0.18*span]`, generous at the top for a summit label; for a
   descent the extra room belongs at the bottom.
4. **The five level identities** survive with their failure modes mirrored: one bowl, the long flat
   shelf, two bowls with the shallower one trapping you, the narrow trough that a gentle ground
   alpha oscillates across, and rough ground. Rebuild them as `-J` or re author them; the verifier
   is what settles whether they are right.
5. **The `--peak` and `--peak-soft` CSS tokens** keep their amber "revealed truth" identity and
   should keep their names so `css/style.css` stays byte comparable with the FDD original. Document
   the mapping (peak means the true minimum here) in the new CLAUDE.md, and leave the 648 lines
   alone.
6. **The handover section, part five, is rewritten end to end.** Today it hands theta, J, grad J and
   alpha to REINFORCE. For BMAI it hands w, L, grad L and alpha to the **house price model**:
   w is the weight in `y = w x + b`, L is the average error over the dataset, and grad L is
   estimated from a minibatch instead of the whole dataset, which is exactly the
   "Robbins-Monro algorithm | Stochastic gradient descent" punchline on Carlos's own slide. Level 5,
   rough ground, is the level that paragraph points back at, and its destination becomes
   Robbins-Monro. Keep the table shape. Consider the AINIT device of **muting one row**: a term the
   participants will offer that the course refuses.

### 5.3 What must be ADDED: the per coordinate decomposition

**Grasshopper is strictly one dimensional everywhere, with no exceptions.** Every level is
`domain: [lo, hi]` with `J: function (t)` of one number. `Landscape.grad` is a single central
difference. `localview.js` draws a 1D profile, `worldview.js` draws a 1D profile, and explain
figures A, B, C and D are all 1D. There is **no 2D landscape, no contour plot, no partial
derivative, no vector and no second coordinate anywhere in the 4216 authored lines.** Stage 4 and
stage 5 are entirely new work.

New files, and what goes in each:

| New file | Contents |
|---|---|
| `js/landscapes2d.js` | levels with `domain: [[lo1,hi1],[lo2,hi2]]` and `L: function (w1, w2)`, plus a `gradEps(L, w, eps)` helper written as a **readable loop over coordinates**. Carlos's stage 4 asks participants to implement exactly that algorithm for w in R^d, so the shape of the loop is part of the lesson. Pin `min`, `range`, `maxima` equivalents and a per coordinate demo script, same shape as `landscapes.js`. |
| `js/localview2d.js` | **two panels side by side, one per coordinate.** Grasshopper A sees the slice `w1 -> L(w1, w2_fixed)`, grasshopper B sees `w2 -> L(w1_fixed, w2)`. Each panel is the existing `localview.js` unchanged, including the fixed scale rule. That is the entire visual argument for "each grasshopper only needs to work on its own dimension", and it needs no new drawing primitive. |
| `js/worldview2d.js` | the contour plot of `L(w1, w2)` with the trail, gated on commit exactly as `worldview.js` is. Port the marching squares renderer from Minimum Lander mission 6 (`drawContours`, levels `[0.5, 1, 2, 4, 8, 12, 16, 24, 32]`, `res = 2`). Nothing in the FDD repo draws a contour. |
| `precompute/verify_landscapes2d.mjs` | assert the pinned minimum on a dense 2D grid plus golden section per axis (reuse the existing `goldenMin` via coordinate descent), the interior margin, and that the pinned per coordinate demo script really reaches the minimum. Without this the 2D levels lose the property that makes the 1D ones trustworthy. |

Existing files that must change for the 2D act:

- `js/game.js`: a per coordinate control pair, plus a **mode switch**: move w1 only, move w2 only,
  move both. The teaching sequence is to let the room play a few turns moving one coordinate at a
  time, which is the alternating Robbins-Monro of the BMAI deck, and only then reveal that doing
  both at once is the same statement. The verdict logic needs a 2D branch (gradient norm near zero,
  and which coordinate is still carrying slope).
- `js/explain.js`: a fifth figure, E, showing the same arithmetic twice. The vector line
  `w \leftarrow w - \alpha \nabla L(w)` above, and under it, braced,
  `w_1 \leftarrow w_1 - \alpha \frac{\partial L}{\partial w_1}(w)` and
  `w_2 \leftarrow w_2 - \alpha \frac{\partial L}{\partial w_2}(w)`. That is Carlos's stage 5
  verbatim, and it costs one KaTeX display plus one brace.
- `css/game.css`: a second set of size locks for the side by side panels. The file's own header
  already says every SVG box is locked in width and height with `flex: 0 0 auto`, and the course-viz
  skill's canvas in flex trap (renders fine interactively, captures wrong headless) makes this
  non negotiable. The current locks are 620 by 380 for local and 740 by 280 for world.
- `css/explain.css`: classes for figure E.
- `css/style.css`: **if** the contour needs a sequential ramp, give it a **new muted ramp** of its
  own. The house rule forbids reusing a categorical identity colour for a second encoding, and blue
  is already the gradient concept, amber is already revealed truth, purple is already the trail,
  green is already the hopper.
- `index.html`: retitle, and add the new scripts in load order. The existing comment
  "Script order is load-bearing" stays true: theme, d3, katex, landscapes, landscapes2d, localview,
  localview2d, worldview, worldview2d, game, explain, main.
- `README.md` and a **new `CLAUDE.md`**. None of the four FDD viz carries a CLAUDE.md, so the BMAI
  rule that every directory documents its contents means writing this one from scratch.

One structural decision to take before any code: grasshopper is a **game page** with no scene
engine. If the BMAI build stays one page with two acts, keep it that way and extend `?level=N` to
cover the 2D levels. If it becomes a multi scene walk through stage 1 to stage 5, adopt
`bandits/js/main.js` wholesale and put each stage in `js/scenes/`. The course-viz skill says pick
one and commit; do not mix.

---

## 6. Fixed point iteration, square root by successive correction, shrinking step size

**None of the four teaches any of the three.** Nor does the Minimum Lander Exploration. I grepped
all four project trees and the scratch file for `robbins`, `heron`, `newton`, `fixed point`,
`fixed-point`, `golden ratio`, `sqrt`, `decay`, `shrink`, `schedul`, `anneal`. Weekend 1 has
nothing here to duplicate; everything on this axis is an extension.

The only mentions of Robbins-Monro anywhere in `/Users/carloscotrini/Documents/git_fdd/projects`
are in prose planning documents, never in built code:
`reinforcement-learning/feedback_reintro_08_01.txt` line 5 ("In the latest iteration of AINIT, we
have now this genie game which I think helps better with the intuition of Robbins-Monro. Consider
using that instead of the analogy of the darts in the dark"), line 7 (questioning whether to teach
it at all), `reinforcement-learning/COACHING-NOTES-2026-08-01.md:177`, and
`reinforcement-learning/SIMPLIFICATION-PLAN.md` lines 68 and 263. Heron and the golden ratio appear
nowhere at all. So `hs26-bmai-w1-opt-heron` and `hs26-bmai-w1-opt-genie-rm` are green field.

Three things are close enough to be worth naming so nobody mistakes them for the real thing:

1. **`bandits/js/policies.js:53`, `epsGreedyDecay(eps0, decay, rng)` with
   `eps(t) = eps0 * decay^t`**, pinned in `bandits/data/datasets.js` as `eps0 = 0.5, decay = 0.995`
   with the KaTeX literal `\epsilon(t) = \epsilon_0 \cdot \rho^{t}`. This is a decaying
   **exploration rate**. It never multiplies a gradient. And in the FDD copy it is dead code,
   because only scene0 ships and scene0 never calls `Policies`.
2. **`grasshopper/js/explain.js:443`**: "Near the top the ground flattens, grad J shrinks, and the
   steps shorten on their own. At a summit the slope is zero, so the step is zero: the procedure
   stops there without being told to." The **step** shrinks because the **gradient** shrinks, with
   alpha held constant. This is precisely the distinction weekend 1 must draw against Robbins-Monro,
   where `alpha_t` itself must go to zero. Grasshopper sets the contrast up for free: level 4, the
   narrow summit, is exactly the case where a constant alpha oscillates and never settles, which is
   the failure Robbins-Monro's shrinking step fixes. Use it as the motivating slide.
3. **Minimum Lander mission 4**: `shrinkEpsilon()` divides epsilon by 10 per click down to 1e-8 and
   tabulates `(b - a) / eps`. That epsilon is the **finite difference width**. It is Carlos's
   stage 2 (grad L as the limit of grad_eps L) already built and working. The learning rate in
   missions 5, 6 and 7 is a constant read from an input box and never changed during a run.

Practical consequence: mission 4 of the scratch file is the best existing asset for stage 2, and
nothing existing serves stage 1's Heron table, the genie game, or the shrinking step of
Robbins-Monro. Those three are new builds.

---

## 7. Absences worth knowing before you fork

- **No CLAUDE.md** in any of `grasshopper`, `lunar-lander-game`, `bandits`, `gaussian/viz/gp-pricing`.
  Each has a README.md aimed at a lecturer or a TA. The BMAI per directory CLAUDE.md is an addition
  you write.
- **No `data/datasets.js` in grasshopper.** `js/landscapes.js` is the data module. bandits and
  gp-pricing both have one.
- **No scene engine in grasshopper or lunar-lander-game.** Both are single pages. Hash routing is
  mandatory for click-step viz per the skill; a game page satisfies the spirit with `?level=N`.
- **No KaTeX in gp-pricing or lunar-lander-game.** gp-pricing carries no formulas in the viz at all;
  they live in the deck.
- **No generator in grasshopper's data path.** `precompute/verify_landscapes.mjs` recomputes and
  asserts, and it generates only the demo jump scripts, which it then compares for exact equality.
  bandits' `precompute/` was deleted during the trim, and the README explains why
  `data/datasets.js` was kept anyway.
- **The world view is deliberately unreachable before commit.** Do not "helpfully" show the answer
  earlier; the skill lists "Display the answer before the student attempts it" under things to never
  do.
- **The gaussian deck's `\takeaway` macro is forbidden now.** See 4.3.
- **bandits is a trimmed downstream copy.** Fix bugs in `~/Documents/git_sml/classic_rl/casino/`
  first. If you fork bandits for BMAI you are forking a fork; go to the SML original for anything
  beyond the scene engine.
