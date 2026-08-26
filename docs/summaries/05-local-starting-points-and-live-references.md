# 05: Local starting points and live references

What already exists that weekend 1 can build on, read out of the files and off the live sites, so
the new work extends the assets instead of restarting. Every claim below comes from something I
opened. Where a thing is absent, this document says it is absent.

Prose here is ASCII only. Several of the sources quote em dashes; where I reproduce such a string I
write `[em dash]` in place of the character so this file stays ASCII.

---

## 0. What I read

| Source | How |
|---|---|
| `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/Minimum Lander Exploration.html` | All 1154 lines, plus 5 headless screenshots I rendered myself |
| `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md` | All 629 lines |
| `/Users/carloscotrini/.claude/skills/teaching-viz/SKILL.md` | Headings, hard requirements, aesthetic, colour-blind sections |
| `https://sml-fs26.github.io/neuralnetworks/` | Raw HTML by curl, plus `gradient-descent-viz/index.html`, `js/main.js`, `js/theme.js` |
| `https://sml-fs26.github.io/un-regression-validation/` | Raw HTML by curl, plus `modules/01_explore.html` |
| `https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html` | Raw HTML by curl |
| `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/` | `README.md`, `index.html`, `js/theme.js`, `js/main.js`, `css/style.css` token block |
| `/Users/carloscotrini/Documents/git_fdd/projects/lunar-lander-game/` | `README.md`, `index.html` |
| `/Users/carloscotrini/Documents/git_fdd/projects/.github/workflows/deploy-pages.yml` | Full |
| `/Users/carloscotrini/Documents/git_fdd/FDD-Page/` | `.github/workflows/deploy.yml`, `CLAUDE.md`, `README.md`, `public/` listing |
| `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/docs/master-schedule-weekend1.csv` | Full |

Screenshots I rendered and looked at (they are in the session scratchpad, not in the repo):
missions 1, 3, 4, 6, 7 of the lander at 1400x1000. Missions 2 and 5 were not captured because the
headless runs did not terminate in time, see section 1.11.

---

## 1. Minimum Lander Exploration, dissected

### 1.1 Provenance

Line 2 of the file is a browser "saved from url" comment:

```
<!-- saved from url=(0109)https://moodle-app2.let.ethz.ch/pluginfile.php/2523623/mod_resource/content/2/minimum_lander_exploration.html -->
```

So the copy in the scratch repo is a Save-Page-As of a file already served from ETH Moodle as
`minimum_lander_exploration.html`. The completion screen links out to a Colab notebook,
`https://colab.research.google.com/drive/1yL_9rTuTTd-AsC6C0PPH8jwAo4kdX67T?usp=sharing`, behind a
button labelled "Go to Code". The page therefore already implements the BMAI handoff shape: play the
visualization, then open the notebook.

The master schedule row for the moonlander CX points TAs at this repo for it:
`See handwritten notes and moonlander games here: https://github.com/eth-bmai-hs26/scratch`.

### 1.2 File shape

One file, 1154 lines, 74,396 bytes. One `<style>` block in `<head>`, one `<script>` block at the end
of `<body>`. Zero `<link>` tags, zero `<script src>` tags, zero `import`, zero `fetch(`. The only two
external URLs in the whole file are the Moodle provenance comment and the Colab link.

Macro structure:

```
<style>                       one block: :root tokens, progress bar, shared stage chrome,
                              popup, completion screen, tables, misc widget classes
<div class="progress-bar">    sticky topbar: title, Prev, 7 dots, Next, "Mission n / 7"
<div id="stage0..stage6">     seven mission panels, all present in the DOM at load
<div id="stageComplete">      completion screen
<div class="popup-overlay">   the between-missions congratulation modal
<script>                      global nav (goToStage/updateProgress/prevStage/nextStage/
                              showNextButton) then SEVEN independent IIFEs, one per mission
```

The seven games are seven `(function() { ... })();` blocks. They share no code. Each one
re-declares its own `clamp`, `X`, `Y`, `findVisibleScale`, `normalizeY`, `setMessage`,
`formatNum`, `drawStars`, `drawGrid`, `draw`. `drawStars` in particular is copy-pasted five times
with the same xorshift seeded on `12345` or `54321`. The only shared surface is the DOM plus the
global `showNextButton(stageIndex)`.

### 1.3 The palette, reproduced exactly

```css
:root {
  --bg0: #05070c;
  --bg1: #0b1020;
  --grid: rgba(255,255,255,0.06);
  --text: #e7e9ef;
  --muted: rgba(231,233,239,0.75);
  --ok: #34d399;
  --bad: #fb7185;
  --accent: #7dd3fc;
  --warning: #fbbf24;
}
```

Body background is `radial-gradient(1200px 600px at 60% 20%, var(--bg1), var(--bg0))`. Font stack is
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`, with
`monospace` for table cells and canvas labels.

Semantics as used: `--accent` sky blue is chrome and the current point, `--ok` mint green is the
loss curve and success, `--bad` rose is the secant line, the descent trail and failure, `--warning`
amber is the tangent line and the local minimum, `--muted` is body copy.

Two facts about these tokens:

- `--grid` is defined and used **zero** times. Every grid is drawn with the literal
  `"rgba(255,255,255,0.06)"` inside the canvas code.
- The tokens only reach CSS. The canvas code does not read them. There are **139 literal `rgba(...)`
  strings** in the JS.

### 1.4 The sticky progress bar

```css
.progress-bar { position: sticky; top: 0; z-index: 100; display: flex; align-items: center;
                gap: 6px; padding: 10px 20px; background: rgba(5,7,12,0.92);
                border-bottom: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(8px); }
.progress-steps { display: flex; gap: 4px; flex: 1; }
.progress-dot   { flex: 1; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.1);
                  transition: background 0.4s; cursor: pointer; }
.progress-dot.done   { background: var(--ok); }
.progress-dot.active { background: var(--accent); }
```

The dots are flex-1 bars, not circles, so the bar reads as a segmented progress meter rather than a
pager. Contents left to right: the title "Minimum Lander Exploration" in `--accent`, a
`Prev` button, seven bars, a `Next` button, and the label `Mission n / 7`. Each dot carries an inline
`onclick="goToStage(i)"` and a `title="Mission n"`.

### 1.5 State model

There is exactly one global variable for navigation:

```js
const TOTAL_STAGES = 7;
let currentStage = 0;
```

`goToStage(n)` removes `.active` from every `.stage`, adds it to `stage<n>` (or `stageComplete` when
`n >= TOTAL_STAGES`), sets `currentStage`, calls `updateProgress()`, and smooth-scrolls to the top.
Stage switching is pure CSS visibility: `.stage { display: none } .stage.active { display: block }`.
Nothing is created or destroyed, nothing is reset on entry or exit.

All per-mission state lives inside its IIFE closure and is never observable from outside. Mission 5,
6 and 7 each keep `currentW` (or `cW1`/`cW2`), `learningRate`, `history[]`, `autoInterval`,
`stepCount`. Mission 2 keeps `revealedRegions[]`. Mission 4 keeps `currentW`, `epsilon`,
`measurements[]`.

### 1.6 How a mission gates the next one: it does not, it only nudges

This is the part most likely to be misread. **The gate is soft.** `nextBtn` is enabled from load,
never disabled except at the very end, and every dot is clickable at all times. A participant can
jump to mission 7 in one click without solving anything. The only thing success buys you is an
automatic advance.

The mechanism is `showNextButton(stageIndex)` (the name is left over from an earlier design; it
shows a modal, not a button). It fills the popup with `missionMessages[stageIndex]`, sets a 5 second
countdown, adds `.visible` to `.popup-overlay`, and on zero calls `goToStage(stageIndex + 1)`.

```js
const missionMessages = [
  "You found the minimum!",
  "Navigating through fog like a pro!",
  "You nailed the slope calculations!",
  "You discovered the true gradient!",
  "Autopilot engaged [em dash] gradient descent mastered!",
  "2D navigation complete [em dash] vectors conquered!",
  "You found the global minimum and escaped the trap!"
];
```

The popup has no close button, no click-to-dismiss and no Escape handler. Once it fires, the page
moves on in five seconds and a TA cannot stop it to talk about what just happened. That is a real
classroom problem for a CX hour.

The seven call sites and their win conditions:

| Mission | Win condition in code |
|---|---|
| 1 | lander touches down and `abs(target - (-3)) <= 0.01` |
| 2 | lander touches down and `abs(target - 4) <= 0.01` |
| 3 | both slope inputs within `0.5` of the analytic derivative |
| 4 | limit guess within `0.5` of `f'(w) = 2w - 4` |
| 5 | descent converges, `abs(deltaW) < 1e-6` |
| 6 | descent converges, gradient norm `< 1e-5` |
| 7 | descent converges **and** `abs(w - globalMinW) < 0.3` |

### 1.7 Canvas drawing

Seven `<canvas>` elements:

```html
<canvas id="g1_c" width="920" height="480" style="height:480px">   missions 1, 2, 3
<canvas id="g4_c" width="920" height="380" style="height:380px">   mission 4
<canvas id="g5_c" width="960" height="340" style="height:340px">   missions 5, 7
<canvas id="g6_c" width="960" height="400" style="height:400px">   mission 6
```

The shared CSS is `canvas { width: 100%; border-radius: 12px; border: 1px solid
rgba(255,255,255,0.10); background: linear-gradient(...); display: block; }`.

The idiom in every mission is the same: define the maths in data space, define `X(x)` and `Y(y)`
mapping data space to pixels, compute a vertical scale by sampling the function 200 times and padding
10 to 15 percent, then a `draw()` that clears, paints a radial vignette, then stars, then grid, then
curve, then overlays. Missions 1 and 2 add a physics loop with a `lander` object in
`{x, y, vx, vy, targetX, mode}` and modes `idle -> lifting -> moving -> dropping -> done`, driven by
`requestAnimationFrame` at an assumed `dt = 1/60`.

Mission 6 draws its contours with a hand-rolled marching-squares pass at 2 pixel resolution over nine
levels `[0.5,1,2,4,8,12,16,24,32]`, and computes each level's colour arithmetically into an `rgba()`
string.

### 1.8 The seven missions and the maths each teaches

| # | Title | Function | What it teaches | Controls |
|---|---|---|---|---|
| 1 | Manual Moon Landing | `f(w) = w^2 + 6w + 10`, min at `w = -3` | The task: find the argmin of a visible curve. No algorithm yet. | guess field, Land, Reset, error pill |
| 2 | Navigating the Fog | `f(w) = w^2 - 8w + 20`, min at `w = 4` | The curve is hidden. Each landing reveals a window of radius 0.5. You can only learn locally. | same as mission 1 |
| 3 | The Mathematics of Slope | `f(w) = w^2 - 4w + 7`, `f'(w) = 2w - 4` | The finite difference. Two magnified windows of width `eps = 1` at `w = -14` and `w = 14`, labelled `l`, `r`, `a = f(l)`, `b = f(r)`. The student computes `(b - a) / eps` for each. Answers are `-32` and `24`, tolerance 0.5. | two slope fields, Check, Try Again, plus a free "Query Function" oracle that returns `f(w)` for any `w` |
| 4 | The Precision Limit | same `f` | `grad_eps` converging to `grad`. Shrink `eps` by 10x repeatedly and watch `(b - a)/eps` stabilise, then type the limit. | `Choose w`, `Set w`, `Choose eps`, `Set eps`, `Shrink eps by 10x`, limit field, Check, New w |
| 5 | Engaging Autopilot | `f(w) = 0.5w^4 - 3w^3 + 2w^2 + 5 sin(2w) + 3 cos(w) + 10` with the analytic derivative | Gradient descent itself: `w <- w - eta f'(w)`, one step at a time, with the trail drawn and the tangent shown. | `Starting w` (5), `Starting eta` (0.01), Restart, Step, Auto Run, Stop |
| 6 | The 2D World | `f(w1,w2) = w1^2 + 2 w2^2 + 0.5 w1 w2`, `grad = [2w1 + 0.5w2, 4w2 + 0.5w1]` | The gradient is a vector. Contour plot, descent path, one arrow for the negative gradient. | `w1` (3), `w2` (3), `eta` (0.1), Restart, Step, Auto Run, Stop |
| 7 | The Trap | `f(w) = 0.1(w-3)^2 + 3 - 2 exp(-(w-1.5)^2/0.5) - 4 exp(-(w-5)^2/0.8)`, derivative by central difference `h = 1e-4` | Local versus global minima. Starting at `w = 1` traps you; the message then says "Try starting from w=4." | `Start w` (1), `eta` (0.1), Restart, Step, Auto Run, Stop |

Missions 5, 6 and 7 each keep a "Descent History (Last 3 Steps)" table below the canvas. Mission 5's
columns are `Step | w | f'(w) | Delta w`; mission 6's are `Step | w1 | w2 | f(w1,w2)`; mission 7's are
`Step | w | f(w) | f'(w) | Delta w`.

### 1.9 The maths checks out

I verified every closed form by hand:

- Mission 1: `w^2 + 6w + 10` has its vertex at `w = -3`, and `TRUE_MINIMUM_X = -3`. Correct.
- Mission 2: `w^2 - 8w + 20` has its vertex at `w = 4`, and `TRUE_MINIMUM_X = 4`. Correct.
- Mission 3: `f'(w) = 2w - 4` gives `-32` at `w = -14` and `24` at `w = 14`. Because `f` is quadratic
  the centred difference over `eps = 1` is exact, so the drawing and the accepted answer agree
  exactly rather than approximately. Nice property, almost certainly unintentional.
- Mission 4: the table is seeded with a hardcoded HTML row `3 | 3.25 | 9.25 | 6 | 2`. For `w = 3`,
  `eps = 3`: `l = 1.5`, `f(1.5) = 3.25`; `r = 4.5`, `f(4.5) = 9.25`; `b - a = 6`; `6/3 = 2`; and
  `f'(3) = 2`. All five numbers are right.
- Mission 5: the hand-written derivative `2w^3 - 9w^2 + 4w + 10cos(2w) - 3sin(w)` is the correct
  term-by-term derivative of the quartic-plus-trig `f`.
- Mission 6: the gradient of `w1^2 + 2w2^2 + 0.5 w1 w2` is `[2w1 + 0.5 w2, 4 w2 + 0.5 w1]`. Correct.

No fabricated data anywhere: every number on screen is computed from a closed form in the file.

### 1.10 Narration voice

Second person, mission-briefing register, three or four short lines per header separated by `<br>`,
present tense, heavy exclamation. Examples verbatim:

- "Your sensors show the terrain clearly. / Find the exact point w* where the terrain is at its
  lowest. / Enter your guess and land the ship!"
- "A heavy fog has rolled in. / You can no longer see the entire terrain. / Your sensors only reveal
  a small window around where you land. / You will have to find the minimum blindly!"
- "Gradient descent is greedy [em dash] it follows the slope blindly. / Try experimenting with
  different starting values and observe gradient descent in action!"
- Completion: "Congratulations, Commander! You have completed all 7 missions ... You are now ready to
  implement these concepts in code!"

Failure copy is uniform and terse: "Not quite [em dash] try again."

The voice is warm, gamified and effective for the audience. It is also the exact register both house
viz skills forbid. That is a genuine conflict of taste, not a defect, and section 2 treats it as one.

### 1.11 Defects I found, beyond style

1. **Mission 4 label collision, confirmed on the screenshot.** At the default state (`w = 3`,
   `eps = 3`) the three canvas labels `l (a=3.25)`, `w = 3` and `r (b=9.25)` are drawn at nearly the
   same y and overlap into an unreadable run. The `w = 3` label sits on top of the closing bracket of
   the first, and the `r (b=9.25)` label is partly under it. Pure code review would not have caught
   this; the screenshot shows it immediately.
2. **The answer is on screen before the student tries.** Mission 6 draws a dashed circle labelled
   `min` at the origin on first paint. Mission 7 draws both minima with their values,
   `Global (f~-0.6)` and `Local (f~-1.2)`, before any step is taken. Both are visible in the
   screenshots. Mission 7's local label also overlaps the curve.
3. **Two unstoppable animation loops.** Missions 1 and 2 call `requestAnimationFrame(step)`
   unconditionally at the bottom of `step()`, started at page load, and `step()` calls `draw()` every
   frame regardless of whether the stage is `display: none`. Two full canvas repaints per frame run
   for the entire session, from load to close. This is also why my headless runs on missions 1 and 2
   never hit their virtual-time budget: the page never goes idle. Missions 3 to 7 draw on demand and
   are fine.
4. **Canvas geometry is stretched.** `.wrap` is `width: 960px` with `box-sizing: border-box`, 12px
   padding and a 1px border, so its content box is 934px. A canvas whose backing store is 920px wide
   is scaled up to 934 (about 1.5 percent), and one that is 960 wide is squeezed down to 934 (about
   2.7 percent). Nothing maps pointer coordinates back into data space, so today this is cosmetic,
   but it means the authored aspect ratio is not what renders.
5. **Dead CSS.** `.minima-legend`, `.legend-item`, `.legend-dot`, `.help`, `.formula` and
   `.epsilon-display` are all defined and used zero times in the markup. A colour legend was written
   for mission 7 and then never wired up.
6. **Colour as the only signal in mission 3.** Mission 3 has two inputs. On a wrong answer each input
   independently gets `.correct` (green border and tint) or `.incorrect` (red border and tint) while
   the shared message just says "Not quite [em dash] try again." Which of the two was wrong is
   encoded in red versus green **and nothing else**. Everywhere else in the file the colour is
   redundant with a text message, so this is the one place the encoding is bare.
7. **Terminal disabled states.** In missions 5, 6 and 7, once the run converges or diverges, `Step`
   and `Auto Run` are disabled permanently. Only `Restart` re-enables them. In mission 7 that means a
   participant who lands in the local minimum must notice the small `Restart` button to try again.
8. **Inconsistent reset labels.** Missions 1 and 2 call it `Reset`, mission 3 calls it `Try Again`,
   mission 4 calls it `New w`, missions 5 to 7 call it `Restart`. Four names for one affordance.

### 1.12 What the lander does not teach

Measured against Carlos's handwritten plan:

- Handwritten stage 1 (compute `grad_eps L(w_hat)`) is **mission 3**.
- Stage 2 (`grad L` as the limit of `grad_eps L`) is **mission 4**.
- Stage 3 (implement gradient descent) is **mission 5**.
- Stage 4 (`grad_eps` when `w` is in `R^d`) is partially **mission 6**, which shows the joint
  gradient vector but never the per-coordinate difference quotient.
- Stage 5 (the Bernstein condition, "each grasshopper only needs to work on its own dimension", the
  split of `w <- w - alpha grad L(w)` into two independent coordinate updates) is **absent**. Mission
  6 draws one arrow for the whole vector, which is the opposite of the intended reading.

Also absent from the whole file: Heron's algorithm, the genie game, Robbins-Monro, any shrinking
step size, and any fitting problem with data. **Every one of missions 5, 6 and 7 uses a fixed
`eta`.** The lander is purely the gradient-descent half of Friday, and it stops one stage short.

---

## 2. Audit against `course-viz/SKILL.md`

Rule by rule, with a verdict on whether the break actually matters.

| # | Rule | Verdict | Does it matter |
|---|---|---|---|
| HR1 | **Multi-file structure** (`index.html`, `css/`, `js/`, `js/scenes/`, `data/datasets.js`, `vendor/`, `precompute/`) | **BREAK.** One 1154 line file. | **Yes, but as a consequence, not as a cause.** Being single-file is what forces the other breaks: no `theme.js` to import, no `style.css` for `.cluster-N` classes, no `vendor/katex`, no `precompute/`. Fix the structure and four other rows fix themselves. |
| HR2 | **Browser-openable from `file://`**, no fetch, no CDN, no ES modules | **PASS**, cleanly. Zero `fetch(`, zero `<script src>`, zero `<link>`, zero `import`. | No. This is the one hard requirement the file satisfies better than one of the two live reference sites does. |
| HR3 | **Light and dark themes**, `data-theme` on `<html>`, mandatory `t` shortcut, categorical colours via CSS classes | **BREAK on all four counts.** Zero occurrences of `data-theme`, `localStorage`, `prefers-color-scheme`. Zero `keydown` listeners, so no `t`. Dark-only, on a `#05070c` ground. 139 literal `rgba()` strings in the JS. | **Yes, and this is the expensive one.** The skill's stated reason is projection: light is the lecture default for bright halls. A near-black page with 6 percent-opacity gridlines and mint-on-black curves is the worst case for a projector, and the whole Friday 12:00 hour is projected. Retrofitting is not a token swap either: the canvas code has to start reading tokens instead of hardcoding strings, which is a rewrite of all seven `draw()` functions. |
| HR4 | **One viz equals one sibling folder** | **BREAK.** Seven distinct games in one document. | Mildly. It is the reason nothing is reusable: the mission 5 descent engine cannot be lifted into mission 7 even though they are nearly the same code. |
| HR5 | **Verify before reporting done**, including a headless screenshot you actually look at | **Cannot be assessed from the artifact**, but the mission 4 label collision is exactly the class of bug the screenshot loop exists to catch, and it is sitting in the default state of the scene. Suggestive that the loop was not run. | Yes, as process for whatever replaces it. |
| Aesthetic | **Editorial**: cream `#f9f7f1`, ink `#1a1a1a`, rule `#d8d4ca`, serif Iowan Old Style headers, categorical blue `#2f6cb1` / red `#b8323a` / amber `#c08a3e` / purple `#7a5c8c` / green `#4a8b6b` / burnt orange `#a05a2c`, flat hairline cards, no offset shadows | **BREAK, completely.** Dark space-arcade: radial gradient over `#0b1020` and `#05070c`, system sans throughout, `box-shadow: 0 8px 30px rgba(0,0,0,0.35)` on the cards, `backdrop-filter: blur(8px)` on the topbar, mint `#34d399` / rose `#fb7185` / sky `#7dd3fc` / amber `#fbbf24`. Not one token overlaps the house palette. | **Yes for consistency, no for quality.** The page is well made in its own idiom. The problem is that it will run in the same hour as the grasshopper, which is the house palette exactly, and in the same weekend as `sml-fs26.github.io/neuralnetworks`, which is also the house palette. Three visual identities in one day reads as three different courses. |
| Interaction | **Pick scrollytelling or click-step and commit** | **Partial.** It is recognisably click-step (dot pager, Prev, Next, one panel per step) but not the skill's click-step: no `#scene-title` element, no arrow keys, no `window.scenes` registry, no lazy scene construction, no `onEnter`/`onLeave`. All seven panels exist in the DOM from load. | Low on its own. It is a hand-rolled version of the same shape and it works. |
| **Hash routing** (stated "non-negotiable") | `#scene=N` deep link, `hashchange` listener | **BREAK.** Zero occurrences of `location.hash` or `hashchange`. | **Yes, on both counts the skill names.** A lecturer cannot deep-link mid-lecture: to show the 2D world you click through six missions or hunt for the sixth grey bar. And an agent cannot screenshot a scene at all. I had to write modified copies of the file with a different `.active` class just to render missions 3, 4, 6 and 7. That cost was real and it recurs on every future edit. |
| `&run` flag | Gated animations accept `&run` for headless verification | **ABSENT.** No URL parameters of any kind are read. | Yes, same reason. |
| Step engine | `resetState` / `applyStep` / `render`, prev rewinds by reset-and-replay | **ABSENT.** Missions 5, 6, 7 have a `Step` button that only goes forward. There is no way to step backwards; `history[]` is a display log, not a rewind buffer. | Moderate. "Take that step back and look at the sign again" is a natural TA move and the page cannot do it. |
| Cold entry | A scene visited directly must rebuild from `DATA` | **PASS by construction.** Each IIFE calls its own `reset()` at load, so any panel is valid whenever it is shown. | No. |
| Cross-scene state | Project-prefixed global | **ABSENT and not needed.** No mission depends on another. | No. |
| `data/datasets.js` and `precompute/` | Inline data plus a seeded generator | **ABSENT and not needed here.** Everything is a closed-form function, not data. | No, for this page. It becomes mandatory for `opt-rm-house`, which does carry a dataset. |
| KaTeX | Formulas via `katex.render` | **ABSENT.** Maths is plain text in canvas and DOM: `f'(w) = 2w - 4`, `w_min: -20`, `(b - a) / eps`, with a `\u03B5` JS escape where the greek letter epsilon is needed. | Moderate. Difference quotients and limits in ASCII are hard to read on a projector, and this is the one page whose whole subject is a difference quotient. |
| Voice | Short declarative, present tense, no exclamation points, no chattiness | **BREAK, heavily.** Seven of the seven congratulation strings end in an exclamation mark, including "Autopilot engaged [em dash] gradient descent mastered!" and "2D navigation complete [em dash] vectors conquered!". The completion screen opens "Congratulations, Commander!". | **This is a decision for Carlos, not a defect.** The register is deliberate and it fits a CAS audience of working professionals better than Distill-voice does. But it clashes with the grasshopper's voice ("You are a grasshopper on a hill you cannot see.") in the same hour. Pick one for weekend 1 and apply it to both. |
| ASCII punctuation (house rule, not in the skill) | No em dashes | **BREAK.** The file uses U+2014 in UI strings, for instance "Not quite [em dash] try again." | Small but easy. Any rebuild should strip them. |
| Never: inline categorical colours | Use CSS classes | **BREAK.** 139 `rgba()` literals in JS. | Yes. This is the mechanical blocker for the theme requirement. |
| Never: inject `<style>` from JS | | **PASS.** | No. |
| Never: auto-run animations on enter | | **BREAK, worse than the rule anticipates.** Missions 1 and 2 animate from page load, forever, on a hidden canvas. | Yes. It burns CPU for the whole session and it is why headless capture of those two panels does not terminate. |
| Never: display the answer before the student attempts it | | **BREAK.** Mission 6's `min` marker and mission 7's two labelled minima are painted on first frame. Confirmed on screenshots. | **Yes, pedagogically.** Mission 7's entire lesson is that the algorithm cannot see the global minimum. Labelling it for the student before they run inverts the point. |
| Never: legends explaining colour conventions | | **PASS by accident.** The legend CSS exists but no markup uses it. | No. |
| Never: leave a canvas in a flex or grid container without explicit CSS dimensions | | **BREAK, mildly.** See 1.11 item 4. `width: 100%` plus an attribute width that does not match the container. | Low today, would matter the moment anything reads mouse coordinates. |
| Never: fabricate data | | **PASS.** Everything is computed from a closed form, and I verified the closed forms. | No. |

### 2.1 On the single-file tension, honestly

The brief says the single-file shape "conflicts with the course-viz multi-file requirement" and that
resolving that is part of the work. The resolution is this: **the house has two viz lanes, and the
lander belongs to neither cleanly.**

`course-viz/SKILL.md` says so itself, at line 12: "If a course needs a fundamentally different look
(e.g. a hand-drawn whiteboard aesthetic for an intro CS course), see the sibling `teaching-viz`
skill, that one defines the casual single-file pattern. This skill is the editorial multi-file
pattern."

And the FDD deploy workflow publishes four single-file viz today, alongside the multi-file ones:
`weekend-00-reintroduction/numpy-linalg/viz/index.html`,
`weekend-00-reintroduction/sklearn-ml/viz/index.html`,
`weekend-02-explainability/viz/simpson/index.html` and `.../collider/index.html`, each copied to its
own `_site/interactive-*/index.html`. So single-file is a legitimate house shape and Carlos already
ships it.

But `teaching-viz` is scoped to Informatik II (D-MAVT) and it is not a lower bar. Its own hard
requirements demand a `window.scenes` scene engine, a step engine, a mandatory headless screenshot
review of **every** scene, and an Okabe-Ito colour-blind-safe palette (`--cb-blue #0072B2`,
`--cb-vermillion #D55E00`) with an explicit "never encode good versus bad with red and green alone".
Its aesthetic is cream paper `#fbf8ea` with a Caveat hand-drawn look. The lander fails that lane on
the aesthetic and on the scene engine too.

So the honest statement is: the lander is a good bespoke page that predates being held to either
standard. The decision it forces is not "single-file versus multi-file", it is **"does weekend 1 ship
one visual identity or three"**. My recommendation, argued in section 4, is one identity, taken from
the grasshopper, because the grasshopper is already in the schedule for the same hour and is already
compliant.

---

## 3. The live references

### 3.1 `https://sml-fs26.github.io/neuralnetworks/`

Referenced by the schedule for `hs26-bmai-w1-nn-universal-approx`.

**The landing page** is a single self-contained `index.html` with an inline `<style>`, a topbar
("SML · neural networks" plus a `theme` button), a hero, and four cards. Its palette is defined
purely as `data-theme` token blocks:

```css
:root[data-theme="light"] { --ink:#1c1c1c; --ink-secondary:#6b6b6b; --rule:#d8d4ca;
                            --card-bg:#ffffff; --bg:#f5f1e8; --accent:#d97a1f; --accent-soft:#f0c79a; }
:root[data-theme="dark"]  { --ink:#ece8da; --ink-secondary:#8a8579; --rule:#383530;
                            --card-bg:#211e19; --bg:#15130f; --accent:#e8923f; --accent-soft:#5c3a1c; }
```

Body font is `"Iowan Old Style", Palatino, Georgia, serif`; eyebrows, brand and buttons are
`"SF Mono", Menlo, monospace`, uppercase, letter-spaced. The toggle stores under
`localStorage['sml-landing.theme']`. Cards are flat, `border: 1px solid var(--rule)` plus a 3px left
border that turns `--accent` on hover.

Four viz, each its own folder: `demo2-stack-neurons/`, `gradient-descent-viz/`, `cnn-deepdive/` (the
card says "10 scenes · CNNs"), `unet-deepdive/` ("14 scenes · U-Net · segmentation"). The hero states
the interaction model in one sentence: "Each one is a small interactive deck, click *next* (or use
the arrow keys) to advance one step at a time. Light/dark theme toggles in the top-right of every
page."

**`gradient-descent-viz/` is the course-viz click-step pattern, verbatim.** Its `index.html`:

```html
<html lang="en" data-theme="light">
  <link rel="stylesheet" href="vendor/katex/katex.min.css">
  <link rel="stylesheet" href="css/style.css">   ... css/scene1.css .. css/scene4.css
  <header class="topbar">
    <div class="brand">SML · Neural Networks</div>
    <div id="scene-title" class="scene-title">Scene · loading…</div>
    <div class="right-cluster">
      <button id="prev-btn" class="pager-btn">←</button>
      <div id="dot-pager" class="dot-pager"></div>
      <button id="next-btn" class="pager-btn">→</button>
      <button id="theme-toggle" class="theme-toggle">theme</button>
    </div>
  </header>
  <main id="stage" class="stage"></main>
  <script src="vendor/katex/katex.min.js"></script>
  <script src="data/datasets.js"></script>
  <script src="js/theme.js"></script>
  ... js/loss-utils.js, optimizers.js, projection.js, training-engine.js ...
  <script src="js/scenes/scene1.js"></script> ... <script src="js/main.js"></script>
```

`js/main.js` opens with the comment "Pattern lifted from the course-viz skill (kmeans-deepdive)" and
implements exactly what the skill specifies: `SCENE_TITLES` (`'Scene 1 · The bowl'`, `'Scene 2 ·
Watch your network train'`, `'Scene 3 · Inside the high-D landscape'`, `'Scene 4 · Local minima &
the optimizer zoo'`), `readHashScene()` matching `/[#&?]scene=(\d+)/`, `syncHash()` via
`history.replaceState`, a `hashchange` listener, arrow keys that first offer the keystroke to
`sceneState[current].onNextKey` and only advance the scene when it is not consumed, a dot pager built
from `SCENE_TITLES`, and `window.GDV = { goTo, getCurrentScene }`.

`js/theme.js` is the skill's theme contract: `STORAGE_KEY = 'gradient-descent-viz.theme'`,
`data-theme` on the root element, a `#theme=light|dark` hash override for headless runs, and the `t`
shortcut guarded against `input|textarea|select` and against modifier keys.

Note that only KaTeX is vendored in this viz; there is no d3. The skill lists d3 as a vendored
library, not as a requirement.

**Should weekend 1 match it? Yes.** It is course-viz done properly, it is already linked from the
weekend-1 schedule, participants will open it on the Friday afternoon, and its scene 4 is literally
"Local minima and the optimizer zoo", which is the lander's mission 7. If the Friday 12:00 pages look
like this, the day reads as one course.

### 3.2 `https://sml-fs26.github.io/un-regression-validation/`

Referenced by the schedule for `hs26-bmai-w1-validation`, with Carlos's own note: "I'll show an
improved version of this in the lecture" and "Would be great if the coding exercises ask participants
to implement sth in this direction".

Its own eyebrow reads `CAS BMAI FS26 · Week 1 · coding exercise · un games`, so this is a BMAI FS26
week-1 artifact re-hosted under the `sml-fs26` org, not an SML original. The footer sources it to
`https://github.com/eth-bmai-fs26/coding-exercises/tree/week1/cx1_un-games`.

Structure: a landing `index.html` with a five-card chapter grid, and five separate pages under
`modules/`. The chapters are `01 · THE BAIT` ("What predicts GDP?"), `02 · THE CRASH` ("The hockey
stick of doom"), `03 · THE PATCH` ("Regularisation rescues prediction"), `04 · THE REVEAL` ("The
model kept the wrong features"), `05 · THE TRUST` ("One split lied; what does cross-validation
say?"). Navigation is: click a card from the index, and inside a module a small nav bar reading
"← all chapters" and "01 / 05 · the bait". There is no scene engine, no dot pager, no arrow keys, and
I found no `#scene=` hash routing in the served markup.

**Its technical shape is the opposite of the house rule, and this matters:**

- Both the index and the modules load Google Fonts from `fonts.googleapis.com` and
  `fonts.gstatic.com` (DM Serif Display, Inter, JetBrains Mono).
- The index boots with `<script type="module">` importing `./js/theme.js` and
  `./js/density-toggle.js`. ES modules over `file://` are blocked by CORS, so **the index does not
  work when opened as a local file**.
- `modules/01_explore.html` loads three libraries from CDNs: `papaparse@5.4.1` from jsdelivr,
  `plotly-2.35.0` from `cdn.plot.ly`, and `katex@0.16.9` plus its `auto-render` contrib from jsdelivr.
- It reads two CSVs live in the browser: `gdp_spurious_regression_dataset.csv` (254 rows by 495
  columns) and `codebook.csv`.
- It uses inline hex colours in the markup as a categorical encoding:
  `style="color:#22c55e"` for causal, `#94a3b8` for incidental, `#ef4444` for spurious. That is a
  green versus red pair carrying meaning, with the role name as the redundant label.

I did not fetch its `js/theme.js`, so I cannot say whether it has a theme toggle or a `t` shortcut.
The served markup shows neither `data-theme` nor `localStorage`.

**Should weekend 1 match it? No, and this is the clearest call in this document.** It fails the
`file://` hard requirement four different ways, it needs a network at lecture time, and it has no
reusable scene engine. Its value to weekend 1 is as **content**: it is the previous iteration's own
week-1 exercise, its five-act narrative arc is excellent, and the schedule already earmarks it as a
lecture prop for the Saturday validation slot. Mine it for structure and story; do not fork its
plumbing.

### 3.3 `https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html`

Live and serving. Source of truth is `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/`.

The deployed `index.html` is 2480 bytes and is the house pattern exactly:

```html
<html lang="en" data-theme="light">
  <link rel="stylesheet" href="vendor/katex.min.css">
  <link rel="stylesheet" href="css/style.css">  css/game.css  css/explain.css
  <header class="topbar"> brand + brand-sub + <button class="theme-toggle" id="theme-toggle">Dark</button>
  <main>
    <section class="hero wrap"> h1 + two .lede paragraphs
    <section id="game-root" class="wrap"></section>
    <section id="explain-root" class="wrap"></section>
  <footer class="page-footer"> ... <span class="footer-hint">Press <kbd>t</kbd> for dark mode</span>
  <!-- Script order is load-bearing: theme, vendored libs, landscape maths, views, game,
       explanation, then the boot file. -->
  vendor/d3.min.js  vendor/katex.min.js  js/theme.js  js/landscapes.js  js/localview.js
  js/worldview.js   js/game.js  js/explain.js  js/main.js
```

**It is a third interaction shape, and that is the important finding.** It is neither scrollytelling
nor the click-step scene engine. It is topbar, hero, one mounted game, one mounted explainer, footer,
on a single page, with the five levels selected inside the game rather than by a pager. The
course-viz skill says "pick one and commit" about its two patterns, and the house's own flagship
gradient viz picks neither. So weekend 1 has explicit precedent for a game-plus-explainer page.

Its palette in `css/style.css` **is** the course-viz light palette, token for token: `--bg #f9f7f1`,
`--ink #1a1a1a`, `--muted #6b6b6b`, `--rule #d8d4ca`, `--blue #2f6cb1`, `--red #b8323a`,
`--amber #c08a3e`, `--purple #7a5c8c`, `--green #4a8b6b`, `--orange #a05a2c`, plus a domain layer
(`--curve`, `--ground`, `--sky`, `--hopper`, `--trail`, `--peak`, `--tangent`, `--flag`) and a
controls layer. The file header pins the colour identities so nothing cross-talks: "green: the
grasshopper, and a successful climb; amber: revealed truth; blue: the slope / gradient concept;
purple: the trail; red: a miss".

`js/theme.js` uses `localStorage['grasshopper-theme']`, flips the button label between "Dark" and
"Light", supports `?theme=` from either the query string or the hash, exposes
`window.Theme = { toggle, set, current, onChange }`, and binds `t` with `preventDefault`.

`js/main.js` documents its URL hooks and marks which are real:

| Parameter | Effect | Kind |
|---|---|---|
| `?level=1..5` | select a level | real deep link for the lecturer |
| `?theme=dark` | force a theme | dev affordance |
| `?test=revealed` | landscape toggle on | dev affordance |
| `?test=hints` | slope line and gradient readout on | dev affordance |
| `?test=played` | replay the scripted climb | dev affordance |
| `?test=committed` | replay, then plant the flag | dev affordance |
| `?test=stuck` | replay the losing sequence, then commit | dev affordance |

The five levels, from the README: 1 One hill (the sign of the slope is the direction to go), 2 The
long shelf (a near-zero slope still points the right way but a small step will not move you), 3 Two
hills (ascent walks to the nearest summit, a local maximum), 4 The narrow summit (a step size that
suited gentle ground overshoots and you oscillate), 5 Rough ground (the measured slope is
contaminated, the REINFORCE case). `precompute/verify_landscapes.mjs` recomputes and asserts every
pinned value plus the per-level invariants.

**One substantive mismatch to flag, not to decide.** The grasshopper teaches gradient **ascent**:
`theta <- theta + alpha * grad J(theta)`, climbing a hill. Weekend 1 teaches gradient **descent**:
`w <- w - alpha * grad L(w)`, landing in a valley. The lander is descent; the moonlander CX row is
titled "Moonlander games as grasshopper games". Somebody has to decide whether the BMAI copy flips
the sign or whether the lecture bridges it verbally. This is Carlos's call.

### 3.4 How FDD publishes a viz, since weekend 1 will need to

There are **two independent pipelines**, and the URL in the master schedule uses the second one.

**Pipeline A, `eth-fdd-fs26/projects`** (local: `/Users/carloscotrini/Documents/git_fdd/projects`).
`.github/workflows/deploy-pages.yml`, named "Deploy teaching site to Pages". It triggers on push to
`main` filtered by a long explicit `paths:` list that names every published folder (`grasshopper/**`,
`bandits/**`, `lunar-lander-game/**`, and about forty PDF paths). The job assembles a `_site/`
directory with plain `cp` and `cp -R`, and the conventions inside it are worth copying:

- Each viz folder is copied whole: `mkdir -p _site/grasshopper && cp -R grasshopper/. _site/grasshopper/`.
- Build-time generators are then deleted from what is served:
  `rm -rf _site/grasshopper/precompute   # landscape verifier, not served`. The same line appears for
  the huffman-waiter game and the MCTS site.
- The published name can differ from the folder name: `lunar-lander-game/` is served at
  `_site/fly-the-lander/`.
- Single-file viz are copied as one file into their own directory:
  `cp weekend-02-explainability/viz/simpson/index.html _site/interactive-simpson/index.html`.
- `touch _site/.nojekyll` at the end, then `actions/configure-pages@v5`,
  `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`.
- Every `cp` carries a comment saying what the artifact is and, where two versions exist, which one
  is canonical.

**Pipeline B, `eth-fdd-fs26/FDD-Page`** (local: `/Users/carloscotrini/Documents/git_fdd/FDD-Page`).
This is the course website: Vite plus React plus TypeScript, content in a single typed array at
`src/data/weekends.ts`, `HashRouter`, and `base: './'` in `vite.config.ts` (both deliberate, per its
`CLAUDE.md`, so deep links and assets survive the GitHub Pages repo subpath). Its
`.github/workflows/deploy.yml` runs `actions/checkout@v4`, `setup-node@v4` at node 22 with npm cache,
`npm ci`, `npm run build`, then uploads `dist/`.

The viz live in `FDD-Page/public/`, which Vite copies verbatim into `dist/`. That directory currently
holds: `bandits`, `document-pile`, `exercises`, `fly-the-lander`, `grasshopper`, `guides`,
`interactive-collider`, `interactive-simpson`, `slides`, `yogurt-cups`, plus `favicon.svg`. **That is
why the schedule's URL, `https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html`, resolves.**

**So the publishing recipe for weekend 1 is:** drop the viz folder into the course site repo's
`public/<name>/` and push to `main`. Nothing else. The course-viz layout already guarantees the two
things that makes work: every path is relative, and nothing is fetched. A `precompute/` directory
should be excluded from what is served, following pipeline A's precedent.

**Two caveats:**

1. `lunar-lander-game/README.md` advertises `Live: https://fdd-hs26.github.io/projects/fly-the-lander/`,
   a third host that matches neither workflow's output URL. I did not resolve which is current. Treat
   the README line as stale until checked.
2. **The BMAI HS26 side has no publishing repo yet.** There is no `.github/` directory anywhere in
   `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch`, no Pages workflow, and no analogue of
   `FDD-Page` cloned locally for the `eth-bmai-hs26` org. Somebody has to create one, or the weekend
   1 pages have to be published from the FDD site, or they go into Moodle as single files the way the
   lander did. This is an open decision and it blocks nothing until the first page is ready.

Also absent: there is no `CLAUDE.md` at the root of the scratch repo, although the shared house rule
is that every directory carries one. `proposals/` and `initial-states/` exist and are both empty.

---

## 4. Decision table

Axis 1 is what each slug forks, extends or ignores. Axis 2 is multi-file course-viz versus
single-file. Everything here is a recommendation with its reason attached, not a decision already
taken.

| Slug | Forks | Extends | Ignores | Pattern | Why |
|---|---|---|---|---|---|
| **hs26-bmai-w1-opt-heron**<br>"Heron's algorithm" | **Nothing.** I found no Heron asset in any repo I read. This one is new. | The **grasshopper shell**: copy `css/style.css` token block, `js/theme.js`, the topbar / hero / `#game-root` / `#explain-root` / footer skeleton, and the `?test=` hook convention. Extends Carlos's handwritten table spec: columns `theta`, `theta^2`, `2026 - theta^2`, verdict (too large / too small), update, starting at `theta = 45`. | The lander entirely: wrong palette, wrong voice, and none of its seven missions is about a fixed-point iteration. | **Multi-file course-viz**, in the grasshopper sub-shape (one game plus one explainer, not a scene deck). | Two reasons. First, it will sit in the same 10:00 hour as `opt-genie-rm` and `opt-rm-house` and the same day as the grasshopper, so it must be the same page. Second, the content is a repeating guess-check-correct **table** with KaTeX in the header row, which wants a real DOM table and a vendored KaTeX, both of which are multi-file conventions. There is only one mechanic and about six rounds of it, so a 10-scene click-step deck would be overbuilt. |
| **hs26-bmai-w1-opt-genie-rm**<br>"Genie game and Robbins-Monro" | **The AINIT genie slides, as content only.** There is no code to fork: the genie exists as slides in `git_ainit/rl-arcade/slides/rl-slides.tex`. Fork the framing ("Learning a number in the dark", lost in the desert, the lamp, `Q = 1 + 1/Q`, no computer and no formula) and the table shape (`Q` guess, `target = 1 + 1/Q`, `loss = Q - target`, rows 1, 2, 3/2, converging to the golden ratio). | The **same table widget as `opt-heron`**, with a different update rule and a step that shrinks. This is the pair's whole point: Heron is guess-check-correct with a fixed correction, Robbins-Monro is the same loop with a shrinking one. | The lander, for the same reasons. Also ignores the genie deck's **art**: see the rights note below. | **Multi-file course-viz**, its own sibling folder next to `opt-heron`, sharing a module. | Course-viz rule 4 says do not expand an existing viz, create a sibling. Two folders, one shared `js/guess-table.js`. They are also two separate schedule rows with different TAs (Jinlei / Daniele / Ivan versus Jinlei / Suei-Wen), so two URLs is the practical shape too. **Rights note:** the AINIT slide credits "Maxfield Parrish, The Arabian Nights (1909)". The FDD house tracks image licences in `slides/img/IMAGE-SOURCES.txt`; six such files exist under `git_fdd/projects` but **none exists in the AINIT repo**, so there is no rights record for that plate in anything I read. Verify before reusing it, and remember Switzerland is 70 years post mortem auctoris. |
| **hs26-bmai-w1-opt-rm-house**<br>"Robbins-Monro scaffold for house-price prediction" | **Nothing in code.** | The **BMAI SLT deck's own worked example**: features to price, `y = w x`, guess `w`, compute the loss, fixed-step update (`w += eps` if too low, else `w -= eps`), then Robbins-Monro with a shrinking step so it converges, then alternating on `y = w x + b`. Extends the `opt-genie-rm` table widget by adding a scatter plot of `(x_i, y_i)` and the fitted line beside it. Extends the `un-regression-validation` five-act narrative shape if a story spine is wanted. | The lander. | **Multi-file course-viz, and here it is not optional.** | This is the only one of the four that carries a **dataset**, and the skill's data convention is multi-file by construction: `data/datasets.js` setting `window.DATA`, loaded by `<script src>` and never fetched, with a companion `precompute/build_data.py` that is not loaded at runtime. The no-fabrication rule then binds: the schedule brief itself says "a fictitious toy dataset of house measurements", so the generator must use a seeded RNG (Mulberry32, seed pinned at the top of the file), must be shipped in `precompute/`, and the page must say on its face that the data is synthetic. |
| **hs26-bmai-w1-gd-grasshopper**, row A<br>"Grasshopper game" | **Nothing. Use it as it stands**, at `https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html`. | Nothing needs extending. It is already multi-file, `file://`-safe, light-default with a `t` shortcut, vendored (d3 and KaTeX, never a CDN), deep-linkable by `?level=N`, and numerically verified by `precompute/verify_landscapes.mjs`. | The lander. | **Multi-file course-viz, already.** | Rebuilding it would be pure loss. The only open question is the sign: it teaches ascent, weekend 1 teaches descent. The low-risk call is to link it unchanged and let the 11:00 lecture do the bridge, since the schedule row is just "Grasshopper game" plus that URL. If a BMAI-branded copy is wanted, copy the folder into the BMAI publishing repo rather than editing the FDD original. |
| **hs26-bmai-w1-gd-grasshopper**, row B<br>"Moonlander games as grasshopper games, extending these games with the new ideas" | **The lander's mission design and maths.** Fork missions **3, 4 and 5**: the finite difference over an `eps`-window with `a`, `b`, `l`, `r` labels and the free "Query Function" oracle; the shrink-`eps`-by-10x convergence table; the one-dimensional descent with its per-step history table. Fork the closed forms, they are all verified correct. | **Replace the shell wholesale** with the grasshopper's: `css/style.css` tokens, `js/theme.js`, the topbar and footer, the `?level=` deep link and the `?test=` dev hooks, the ASCII prose rule. **Rebuild mission 6** as the missing handwritten stage 5: two coordinates updated independently, "each grasshopper only needs to work on its own dimension", `w1 <- w1 - alpha dL/dw1` and `w2 <- w2 - alpha dL/dw2` shown as two separate hoppers rather than one joint arrow. **This rebuild is the "new ideas" the schedule row is asking for.** | **Drop missions 1 and 2 or fold them into one short opener.** "You cannot see the landscape" is precisely the grasshopper's premise and it will already have been played in the same hour. **Drop mission 7.** Local versus global is grasshopper level 3 ("Two hills"), also already played. Teaching the same two lessons twice in one hour wastes the hour. Also ignore the dark palette, the exclamation-mark voice and the 5 second auto-advance popup. | **Multi-file course-viz.** | Three reasons. It ships next to the grasshopper in the same slot and must match it. It needs the `t` shortcut and a light default because the room is projected. And it needs hash or query deep-linking so a TA can jump straight to the limit scene, which the current file makes impossible: I could not even screenshot its later panels without editing copies of the file. |

### 4.1 The one thing the four slugs share

`opt-heron`, `opt-genie-rm` and `opt-rm-house` are the same widget three times: a guess, a computed
target, a verdict, an update, repeated in a table. Build that widget **once**, in one module, and
have the three folders each import it with a different update rule and a different story. That is
the single highest-leverage decision in the weekend, and it comes straight from Carlos's own
handwritten TODO on page 1: "Come up with a scaffold of games and guide them."

The `gd-grasshopper` pair is a different widget (a landscape, a local view, a step) and is already
built once, in the grasshopper.

---

## 5. What is absent

Stated plainly, so nobody spends time looking for these:

- No `CLAUDE.md` anywhere in the scratch repo, including at its root.
- No `.github/` directory and no Pages workflow in the scratch repo. No `eth-bmai-hs26` publishing
  site cloned locally.
- `proposals/` and `initial-states/` exist and are both empty.
- No Heron, genie, Robbins-Monro or house-price visualization exists anywhere in the repos I read.
  Three of the four slugs start from zero code.
- No shrinking step size anywhere in the lander. All three of its descent missions use a fixed `eta`.
- No `IMAGE-SOURCES.txt` in the AINIT repo, so no rights record for the Parrish plate used on the
  genie slide.
- I did not fetch `un-regression-validation/js/theme.js`, so whether that site has a theme toggle is
  unknown to me. Its served markup shows no `data-theme` and no `localStorage`.
- I did not capture screenshots of lander missions 2 and 5. Mission 2 shares mission 1's unbounded
  animation loop, so headless capture does not terminate; mission 5 timed out in the same batch.
