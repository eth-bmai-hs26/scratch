# 01: The AINIT rl-arcade visualization engine, and how it relates to the FDD course-viz standard

Source read: `/Users/carloscotrini/Documents/git_ainit/rl-arcade` (592 files, git repo, branch as checked out).
Standard compared against: `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md` (629 lines)
and its named sibling `/Users/carloscotrini/.claude/skills/teaching-viz/SKILL.md` (399 lines).

Everything below was read from the files. Where something is absent I say so.

---

## 0. One-paragraph orientation

`rl-arcade` is the AI in Industry course's browser-only, no-build, `file://`-safe arcade of
reinforcement-learning visualizations, deployed to GitHub Pages at
`https://eth-ainit-fs26.github.io/rl-arcade/`. It contains **two structurally different kinds
of game under one start screen**:

- **five single-file cartridges**, each one self-contained `index.html` with inline CSS and JS:
  `anymal-mdp/` (1161 lines, 194 KB), `casino/` (842 lines, 56 KB), `spooky-house/` (769 lines,
  48 KB), `darts/` (718 lines, 46 KB), `minigolf/` (1759 lines, 1.09 MB, of which one line is a
  1,047,560-character base64 PNG logo). All five are marked in their `CLAUDE.md` as **vendored**
  from `eth-ainit-fs26/coding-exercises` branch `week3` and upstream-owned: "do NOT deep-edit,
  re-vendor".
- **six multi-file scene-engine cartridges** that are close relatives of the course-viz pattern:
  `repair-or-replace/` (76 files), `last-minute-pricing/` (108), `recycling-robot/` (86),
  `pokemon-battle/` (88), `critical-spare/` (87), `stale-by-sundown/` (87). The root `CLAUDE.md`
  says these "are the shared multi-file scene-engine visualizations carried over from
  `classic_rl`", and that their design specs live in that repo under `mdp-gallery/`, NOT copied
  here.

So the repo does not choose between the two patterns. It runs both, wires them into one menu,
and documents which is which. That is the single most useful fact for weekend 1.

---

## 1. The start-screen engine

Five pieces, and only one of them holds content.

| File | Lines | Role |
|---|---|---|
| `index.html` | 137 | the cabinet DOM, the overlays, and a long head comment stating the design brief |
| `cartridges.js` | 107 | **the single source of truth for content**; the only file an integrator edits |
| `js/arcade.js` | 1076 | the canvas attract-mode engine and chrome; holds no content |
| `css/arcade.css` | 149 | CRT cabinet chrome and the crisp name overlay; defines no content |
| `assets/fonts/PressStart2P-Regular.woff2` | 4.7 KB | the one bundled static asset |

### 1.1 index.html

`<html lang="en">` with `<meta name="color-scheme" content="dark">`. Body is:

```
#cabinet > #glass > (#scene canvas 320x240) + (#names DOM overlay) + (#crt glass)
#links   (MUSIC / THEME:NES / 日本語? / PLAIN LIST)
#pad     (touch scroll arrows)
#boot    (power-on splash)
#load    (NOW LOADING overlay)
#fx      (konami falling sprites)
```

Then `<script src="cartridges.js">` followed by `<script src="js/arcade.js">`, in that order.
Load order is the contract: `arcade.js` reads the globals `cartridges.js` set.

A ~180-line `<style>` block lives inline in `index.html` for the three full-viewport overlays
(`#boot`, `#load`, `#fx`), with the stated reason that they cover the whole viewport rather than
the cabinet. That is a deliberate, documented exception to "all CSS in `css/`", not an accident.

The head comment states the brief in the repo's own words: the entire scene is drawn on a
320x240 backbuffer and integer-scaled with `image-rendering:pixelated`, "so the pixels are
genuinely chunky. The only thing NOT on the canvas is the selectable game NAMES: those are a
DOM overlay (#names) in Press Start 2P, positioned pixel-exactly over the canvas rows so they
stay crisp and high-contrast (the 'BALANCED' brief: true low-res scene, sharp readable names)."

### 1.2 cartridges.js: the exports, precisely

The header comment is the registration spec. Verbatim shape of the four steps:

```
INTEGRATOR: to add a game, edit ONLY this file (4 steps):
  1. add a GAMES entry   {name, href, acc, tag:"RL"|"BIZ", blurb}
  2. add its pixel sprite to SPRITES   (a grid of rows; PX maps each char to a colour, '.' = transparent)
  3. add the sprite's key to SPR        (SAME order/index as GAMES)
  4. add the game into VIEWS.extra (THEORY GAMES) or VIEWS.main (a front-screen headliner)
Counts (the "N IN 1" badge, the THEORY "+N" tag, the bundle blurb) auto-derive from these.
```

The exports:

- **`window.GAMES`**: an array of 11 objects in display order. Each is
  `{name, href, acc, tag, blurb}` where `name` is the all-caps arcade name, `href` is the folder
  with trailing slash (`"darts/"`), `acc` is a hex accent colour used for the row, `tag` is
  `"RL"` or `"BIZ"` (a two-way taxonomy: RL concept game vs business case), and `blurb` is one
  or two sentences shown in the info panel. Order: the 7 front-screen headliners first
  (indices 0..6), then the 4 theory games (7..10).
- **`window.SPR`**: a flat array of 11 sprite keys, "SAME order as GAMES". After the definitions,
  `window.GAMES.forEach((g,i) => { g.spr = window.SPR[i]; })` attaches each key onto its game, so
  downstream code reads `g.spr` and the parallel-array coupling exists only in this one file.
- **`window.PX`**: the palette, 16 entries, one character per colour plus `'.': null` for
  transparent. Uppercase and lowercase of the same letter are light and dark pairs
  (`R:'#ff4d5e', r:'#c0202e'`; `G:'#6be24a', g:'#1f9a52'`; `B:'#41a6ff', b:'#9aa7ff'`;
  `S:'#c9cee6', s:'#6c7194'`).
- **`window.SPRITES`**: 13 keys, each an array of equal-length strings, one string per pixel row,
  one character per pixel, indexed into `PX`. Eleven are game sprites (`robot`, `van`, `tag`,
  `robot2`, `pokeball`, `sun`, `crate`, `reel7`, `ghost`, `target`, `golf`), one is `qblock` (the
  THEORY bundle icon) and one is `dog` (the attract-mode mascot). Game sprites are 11 wide by 10
  or 11 rows; `dog` is 14 by 8.
- **`window.EXTRA`**: a **pseudo-cartridge** for the bundle row:
  `{name:"THEORY GAMES", isBundle:true, acc:"#ffd23f", spr:"qblock", blurb:...}`. It is a game
  as far as the list renderer is concerned; `arcade.js` branches on `g.isBundle` in `boot()` and
  calls `openExtra()` instead of navigating.
- **`window.VIEWS`**: `{main: [GAMES[0..6], EXTRA], extra: [GAMES[7..10]]}`. Two screens. `main`
  is the front screen with the bundle row at the bottom; `extra` is the theory sub-screen.

Then three derivations, which are why "counts auto-derive":

```js
window.EXTRA.tag  = '+' + window.VIEWS.extra.length;
window.EXTRA.blurb = window.VIEWS.extra.length + ' theory games: ' + window.EXTRA.blurb;
```

Finally a `JP` map keyed **by href** supplying `{jp, jb}` (Japanese name and blurb) merged onto
each game, plus `EXTRA.jp` / `EXTRA.jb`. Japanese lives in the registry, not in the games.

### 1.3 js/arcade.js

1076 lines, one IIFE, `'use strict'`. It opens by binding the six registry globals into local
consts, then never writes to them. Notable internals:

- `PAL`, a fixed 16-colour flat palette; `LOGO_RAMP`, the six-colour cycle for the logo shimmer.
- A 320x240 backbuffer with `imageSmoothingEnabled = false`; `layout()` recomputes `SCALE` on
  resize.
- `bakeSprite(id)` / `drawSprite(id, bx, by, bw, bh)`: sprites are baked once from the
  `SPRITES` + `PX` string grids into offscreen canvases, then letterboxed into a box.
- `dither(x,y,w,h,colA,colB,lvl)` and `ditherVRamp(...)`: shading is Bayer 4x4 dithering between
  two palette colours. There are no gradients and no alpha on the scene.
- A hand-pixelled 5x7 bitmap font (`GLYPHS`, `glyph`, `text`, `textCenter`) for in-canvas text.
  It is Latin-only, so `jtext` / `jwrap` fall back to `fillText` in the OS kana font for
  Japanese. No kana webfont is bundled, deliberately, so the page still works offline.
- List geometry constants: `LIST_TOP = 70`, `ROW_H = 11`, `VISROWS = 10`, `LIST_X = 16`, plus
  `NUM_X`, `CHIP_X`, `CHIP_W`, `NAME_X`, `NAME_W`. `buildNames()` builds one `.nrow` per
  cartridge into `#names`; `syncNames()` positions each row in device pixels over the canvas row
  every frame.
- View state: `let view = 'main'`, `curList()` returns `VIEWS[view]`, `sel` is the cursor.
  `boot()` records `visited[g.href] = 1` into `localStorage['classicrl_visited']` (which drives a
  star on played carts) and navigates to `g.href + 'index.html'`, with the comment
  "file:// shows a dir listing for 'casino/', so target index.html so it works locally AND on
  Pages". `openExtra()` and `backToMain()` switch views.
- URL params, all QA or deep-link affordances: `?boot=0` skips the splash, `?jp=1` starts
  Japanese, `?view=extra` opens the bundle, `?i=N` preselects a row, `?demo=1` jumps to attract
  mode, `?phase=N` holds one attract phase.
- `THEMES = ['NES','GREEN','AMBER']` and `cycleTheme()` on the `T` key. **This is a palette
  recolour of one dark scene, not a light/dark toggle.** The start screen has no light mode.
- Attract mode after ~20s idle (skipped under `prefers-reduced-motion`), cycling title,
  high-score, demo-walk and insert-coin phases.
- Input: arrows and WASD, Enter, Konami code, touch swipe, the `#pad` arrows, and gamepad.
  Chiptune SFX via Web Audio.

### 1.4 css/arcade.css

149 lines. `@font-face` for Press Start 2P from `../assets/fonts/`, `font-display: block` with
the stated reason "pixel font: never flash a fallback serif". A global flat-pixel reset:
`* { border-radius: 0 !important }`, `-webkit-font-smoothing: none`, black background, no page
scroll. Then the cabinet stack, the `#crt` scanline / shadow-mask / vignette / flicker layer,
the `#names` overlay rows with state classes `.sel` and `.bundle`, the `#links` bar, the `#pad`,
and a `prefers-reduced-motion` block that kills flicker and curvature.

### 1.5 assets/

One font, and a `CLAUDE.md` that explains why the Japanese strings are deliberately NOT drawn in
that font (Press Start 2P has no kana glyphs) and that the relationship to `cartridges.js` is
"one-way and decoupled: adding or removing a game touches ONLY `cartridges.js`, never this
folder."

### 1.6 A real drift finding: list.html

`list.html` (312 lines) is described as "a plain editorial list of the games" and is linked from
the top bar. Two things about it matter:

1. **It is the one place in the repo that uses the course-viz editorial palette verbatim**:
   `--bg: #f9f7f1`, `--ink: #1a1a1a`, `--ink-secondary: #6b6b6b`, `--rule: #d8d4ca`, and under
   `@media (prefers-color-scheme: dark)`: `#181612`, `#ece7d9`, `#8a8579`, `#383530`, accent
   `#b8323a`. Those are exactly the tokens in the course-viz skill.
2. **It hardcodes its own content and has drifted.** Nine of its links are dead in this repo:
   `sarsa-anymal`, `snakes-ladders`, `press-your-luck`, `pipeline-climb`, `gamblers-ruin`,
   `beat-the-deadline`, `churn-rescue`, `trial-clock`, `windy-treasure-cave`. `minigolf` is
   missing from it entirely, and its `<title>` still says "seven visualizations". The "single
   source of truth" discipline covers the arcade screen only; the second listing page was not
   wired to the registry and rotted.

That is the concrete cost of a hand-maintained parallel listing, and it is worth avoiding in
weekend 1.

---

## 2. Anatomy of a self-contained single-file game

All five vendored cartridges share one skeleton. It is not the course-viz click-step engine and
it is not the teaching-viz cream-paper look either. Call it what it is: **a dark-mode scroll-snap
lesson with an embedded playable widget, a gated code exercise, and a quiz.**

### 2.1 The shared skeleton

```
<main>
  <section class="page" id="page-1">        cover: .hero, .hero-title with a .grad gradient span
    <div class="segment"> ... </div>        one full-viewport slide
    <div class="segment"> ... </div>
  </section>
  <section class="page" id="page-2">        the playable game: .game-stage grid
  <section class="page" id="page-3">        the idea, built up in .concept-card / .panel / .eqn
  <section class="page segment slide-scroll" id="page-N">   the code exercise
  <div class="gate" id="gate-e1">           a lock screen
  <section class="page locked" id="...">    quiz, hidden until the exercise is right
  <section class="page locked" id="...">    conclusion
</main>
<script> ... one inline IIFE-ish script ... </script>
```

Mechanics, identical across the files (the helper functions are literally copy-pasted between
them):

- `html { scroll-behavior: smooth; scroll-snap-type: y mandatory }` and
  `.segment { height: 100vh; scroll-snap-align: start }`. Navigation is **scroll**, one slide
  per screen. There is no Prev / Next, no dot pager, no scene index.
- `history.scrollRestoration = 'manual'` plus a `load` handler forcing `scrollTo(0,0)`: every
  reload starts at the cover.
- A document-level `keydown` handler that `preventDefault()`s the arrow keys everywhere outside
  form fields, so the arrows belong to the game, never to the page.
- `IntersectionObserver` on `.reveal` adds `.in`; `.d1` through `.d5` are transition-delay
  classes for staged entrance. A `requestAnimationFrame` pass marks anything already in view.
  `prefers-reduced-motion` disables it.
- `norm(s)` strips whitespace and normalizes quotes; `setInputState(el, ok)`; `unlock(el)`
  removes `.locked` and re-observes the newly revealed `.reveal` nodes; `bindHint(btnId, boxId)`.
- `window._slideNav.advance()`: finds the first `.hero, .segment, .gate` below the fold that is
  not inside a `.locked` ancestor and `scrollIntoView({behavior:'smooth'})`. Every correct answer
  calls it. That is the whole "engine".
- No vendored libraries at all. Zero `http` references in all five files. No KaTeX, no d3, no
  scrollama.

### 2.2 State object, step engine, draw loop

There is no generic step engine. Each game has **one plain mutable state object plus one
`render()` that redraws from it**, which is the course-viz "state is the source of truth,
animations are decoration" rule arrived at independently.

**darts** (`darts/index.html`, the embedded game IIFE):

```js
st = { round: 0, player: 50, bull: randStart(), hist: [], won: false };
function render() { player.style.top = (100 - st.player) + '%'; ... }
function move(d) { st.player = clamp(st.player + d, 2, 98); render(); }
function shoot() { st.round++; st.bull = ...; st.hist.push({...}); render(); }
```

**minigolf**:

```js
st = { force: 50, hole: R()<0.5 ? 15+R()*15 : 65+R()*15, round: 0, total: 0,
       best: Infinity, revealed: false, h: [] };
function renderGame() { ...forceOut, roundOut, forceLine.left, holeLine.left, ball.left, hist... }
function putt(auto) { ... }
```

**casino** keeps two independent copies of the same model: a closure in the manual game
(`pulls`, `wins`, `total`, `round` as bare locals) and a reusable factory `makeBandit(probs)`
returning `{K, probs, emp, empRow, pull, nPulls, nWins, total, round, pseudoRegret, reset}` for
the two simulation panels. That duplication is the price of not having a shared `js/` module.

There is no rewind. `reset()` re-initialises; nothing steps backwards.

### 2.3 The control panel

A consistent left-column widget across darts and casino:

```html
<div class="control-panel">        <!-- 3px gradient top rule via ::before -->
  <div class="stats-row">
    <div class="stat-block">
      <div class="stat-label">Last score</div>       <!-- 11.5px, letter-spacing .14em, uppercase -->
      <div class="stat-value" id="dk_lastScore">-</div>  <!-- 46px mono, gradient-clipped text -->
    </div>
  </div>
</div>
<button class="game-btn" id="dk_shoot">...</button>  <!-- full width, uppercase, gradient fill -->
<div class="game-log" id="dk_log"></div>
```

minigolf instead uses a five-button `.force-grid` (`-5 / -1 / Putt / +1 / +5`) plus three
full-width buttons (`Robbins-Monro step`, `Reveal hole`, `Reset`), and a `.message` line.

### 2.4 The narration and caption system

There is no per-scene caption API. Narration is **static prose in the markup**, revealed by
scroll, in a fixed vocabulary of blocks:

- `.segment-heading` (clamp(28px,3.4vw,44px), weight 800) plus `.segment-lead` (17px, max-width
  80ch). Headings are short sentences ending in a period: "The game in 30 seconds.",
  "Four rules to play by.", "Points to chase.", "Keys to press.", "A natural strategy.",
  "Nudge toward the target.", "The Robbins-Monro update rule.".
- `.rule-grid` of `.rule-card`s, each an emoji icon plus one line, for the rules of the game.
- `.panel` with `.score-row`s, a numbered procedure or a scoring table, where the number sits in
  a coloured `.score-val` pill (`.score-good` / `.score-neutral` / `.score-bad`).
- `.concept-card` with a small uppercase `.concept-tag` label and one to three short paragraphs.
  `.concept-card.eq` is the variant that holds an equation.
- One **live** narration channel only: a single `#dk_log` / `#msg` line under the button that the
  game writes after each action, e.g. minigolf's
  `PAST by 4.3. Try less force.` or `Robbins-Monro used alpha 2.50 and updated the next force.`
- A "Round history" list on the right of the board, last 15 rounds in darts, last 6 in minigolf.

The register is close to the course-viz voice (short declaratives, present tense) but breaks two
of its rules explicitly: **emoji are used as iconography throughout** and **the prose is full of
em dashes**. Non-ASCII counts in the authored HTML: darts 27 em dashes and 6 en dashes (including
"Robbins-Monro" spelled with U+2013 in every heading), casino 13 and 3, spooky-house 21,
anymal-mdp 28, minigolf 12. Anything ported from these files into the BMAI line needs a
punctuation pass; the house rule is ASCII only.

### 2.5 How the maths is exposed to a non-mathematical audience

Four devices, in a fixed order, and this is the strongest thing these files do:

1. **Play first, name nothing.** The playable widget comes before any symbol. In darts you shoot
   twelve times before the word "error" appears.
2. **Describe the move you kept making.** A `.concept-card` headed "The move you kept making"
   states it in quotes and plain language: *"How far off was I, and which way?" then step in that
   direction, proportional to the error.* Followed by: *A big miss led to a big correction; a
   near-hit to a tiny one.*
3. **One line of algebra, colour-keyed, with a three-item glossary.** Rendered as plain
   monospace HTML spans, not KaTeX:
   `y(t+1) = y(t) + α(t) × error` with `y(t)` green, `error` blue, `α(t)` amber, and one bullet
   per symbol. minigolf goes further and builds up `E[landing] = hole`, `error = landing - hole`,
   `E[error] = 0`, then `H(theta) = E[landing - hole] = theta - theta*` and
   `theta_(t+1) = theta_t - alpha_t * error_t`, using ASCII names (`theta`, `alpha`) rather than
   Greek, and glossing `E[...]` as *"the long-run average of"*.
4. **Make them write it.** A syntax-coloured Python `pre.template` with the loop, the decaying
   learning rate and the environment call already given, and two or three `input.inline` blanks
   for exactly the line being taught. Answers are checked by normalized exact string match
   against a small allowlist. A hint box gives a nudge per blank and explicitly says "no answers".
   Getting all blanks right removes a `.gate` lock screen and un-`.locked`s the rest of the page.

Then two multiple-choice questions with a wrong-answer path that shows a *hint*, not the answer,
and lets you retry. Then a three-bullet "Three ideas to carry with you" close.

---

## 3. Anatomy of a multi-file scene-engine game: repair-or-replace

This is the pattern that is a near-relative of course-viz. 76 files.

### 3.1 Layout

```
repair-or-replace/
  index.html                  93 lines, ONLY a load-order manifest
  css/style.css               2234 lines: tokens + chrome + theme
  css/qtable.css              the 4x3 Q-table widget
  css/scene0.css .. scene14.css   15 per-scene stylesheets, 172 to 461 lines each
  js/actions.js               the 3-action space (window.Actions, aliased to window.Moves)
  js/van.js                   the MDP: state, transition, sample, successors (window.Van -> window.Battle)
  js/bellman.js               value iteration
  js/sarsa.js                 on-policy SARSA primitives
  js/theme.js                 60 lines
  js/katex-helpers.js         window.Katex render helpers
  js/dialog.js js/sfx.js js/music.js js/music-ui.js
  js/vanCard.js js/qtable.js js/chart.js js/history.js js/speakerNotes.js
  js/scenes/scene0.js .. scene14.js   15 scenes, 5741 lines total (126 to 612 each)
  js/main.js                  516 lines, the click-step engine
  data/datasets.js            3655 lines, GENERATED, window.DATA
  precompute/value_iteration.py    103 lines, the design contract
  precompute/build-datasets.js     334 lines, the rigor gate
  vendor/katex/               katex.min.js + katex.min.css + woff2 fonts
  assets/fonts/PressStart2P-Regular.woff2
```

`index.html` links 18 stylesheets and 33 scripts in a fixed order (vendor, katex helper, data,
MDP engine, solvers, theme, audio, widgets, chrome, 15 scenes, then `main.js`). The topbar is
brand, scene title, PREV, dot pager, NEXT, concept badges, MUSIC, theme. `<main id="stage">` is
empty; scenes are built into it lazily.

### 3.2 The scene engine (js/main.js)

Matches the course-viz reference implementation closely, then extends it:

- `SCENES` is an array of `{key, title, music}`. The **live order reorders two late-built
  files**: `scene13` sits between `scene6` and `scene7`, `scene14` between `scene11` and
  `scene12`. `SCENE_TITLES` is a `Proxy` giving array-like access over that.
- `goTo(idx)`: removes `.active` from the old node, calls its `onLeave`, creates the node on
  first visit and calls `window.scenes[key](root)` inside a try/catch that renders
  `Scene N failed to build: ...` into the node rather than dying, otherwise calls `onEnter`.
  Re-asserts the `scene` class afterwards with the comment "in case a builder overwrote
  root.className, which would drop the node out of the absolute/opacity overlay and stack
  scenes". That is a scar from a real bug.
- **Hash routing**: `readHashScene()` matches `/[#&?]scene=(\d+)/`; `syncHash(idx)` rewrites the
  scene token with `history.replaceState` while **preserving foreign hash params**;
  `hashchange` calls `goTo`. There is also `stripStepParams()`, which scrubs
  `&autostep`, `&step`, `&s10step`, `&s9fp` when paging away, with the comment that otherwise
  "a `&step=3` link leaks into the NEXT scene's builder and pre-skips its guided steps".
- **QA flags**: `&run` clicks the scene's single `[data-run-primary]` button 220 ms after build;
  `&autostep=K` fires `onNextKey()` K times with 140 ms spacing, but only while it keeps
  returning `true`; `&instant` disables the fade transition; `#theme=light|crt`.
- Keyboard: arrows delegate to `onNextKey` / `onPrevKey` first and fall through to the pager;
  `n` speaker notes, `f` slide mode, `g` quick jump, `?` help, `m` music, `t` theme (owned by
  `theme.js`), Esc closes overlays, digits jump while quick-jump is open. **PREV and NEXT
  buttons delegate to the step engine too**, "so mobile users with no arrow keys can step".
- Session concept badges MDP / POL / RTN / Q* / DP / SRS awarded on first visit to their owning
  scene, via a `scene-change` CustomEvent.
- A one-time intro modal that fires only on the transition scene 0 to scene > 0, never on a deep
  link and never under `&run`.
- Exposes `window.VanViz = { goTo, getCurrentScene, sceneTitles, rebuildAll }`.

### 3.3 A scene (js/scenes/scene5.js, 412 lines)

Header comment is a spec: what the scene shows, what each internal step does, the pedagogical
beat, and the last line `Registers window.scenes.scene5 per the course-viz scene contract.`
Body pattern:

```js
window.scenes.scene5 = function (root) {
  const V = window.Van, ACT = window.Actions;
  const TRAJ = (window.DATA && window.DATA.demoTrajectory) || { start:0, steps:[], totalReturn:0 };
  root.classList.add('scene-pad', 'scene5-scene');
  const RUN = /[#&?]run\b/.test(window.location.hash || '');
  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function A(ms) { return (RUN || reduceMotion) ? Math.min(ms, 50) : ms; }
  ...
  return { onEnter(){}, onLeave(){ clearTimers(); ... }, onNextKey(){...}, onPrevKey(){...} };
};
```

Two details worth stealing: `A(ms)` collapses every animation delay under `&run` or reduced
motion so a headless capture reaches the end state; and an `epoch` counter invalidates in-flight
animation callbacks after a rewind, with the note "so a fast rewind mid-fx cannot leave the board
stale". Cold entry is explicit: the header says "Cold-entry safe (deep link `#scene=5` renders
step 0)".

### 3.4 Theme

`js/theme.js`, 60 lines. `THEMES = ['light', 'crt']`, `data-theme` on `<html>`,
`localStorage['repair-or-replace.theme']`, `t` shortcut, `#theme=light|crt` hash override, and
legacy `'dark'` / `'gb'` values falling back to `'light'`. **Light is the default.** But note the
second theme is an amber-phosphor CRT, not the editorial dark. And `css/style.css` opens by
saying so outright:

> Shares the manager gallery's retro Gen-1 shell (Press Start 2P, poke-box chrome, light "paper"
> plus amber CRT themes); the editorial cream/serif palette of the wider curriculum is
> deliberately overridden here, as in the sibling gallery viz.

The token block does carry the Okabe-Ito colour-blind-safe palette (`--cb-blue #0072B2`,
`--cb-vermillion #D55E00`, ...) with an instruction to use those, not the brand green and red,
"wherever colour carries meaning", citing "teaching-viz SKILL section Colour-blind safety".
It also carries **cross-viz hue identities** including `--hue-star: #C08A3E; /* amber,
Robbins-Monro */`, i.e. the arcade already assigns Robbins-Monro a colour.

### 3.5 The rigor gate

Two source-of-truth files kept in lockstep:

1. `precompute/value_iteration.py` is the **design contract**: reference value iteration that
   prints the Q* grid and asserts the intended policy, the SHAKY replace margin > 15 and both
   WORN frontiers > 15.
2. `node precompute/build-datasets.js` is the **gate**. It does `global.window = {}` and then
   `require`s the real runtime files `js/actions.js`, `js/van.js`, `js/bellman.js`, so "the
   numbers here are the exact numbers the browser computes". It runs VI to `tol: 1e-12`, then
   asserts, with `process.exit(1)` on any failure so `data/datasets.js` is **not written**:
   - every Q* cell within 0.05 of the Python contract,
   - the optimal policy is exactly `run, service, replace, replace`,
   - `Q*(SHAKY, replace) > Q*(SHAKY, service) + 15`,
   - `Q*(WORN, service)` beats both alternatives by > 15,
   - `Q*(FAILING, run) < 0`,
   - the gamma-sweep signposts and monotonicity,
   - the demo trajectory is a legal sequence of engine transitions.

This is course-viz section "Phase 0.5" taken further than the skill asks: the invariants are not
just asserted in the generator, the generator refuses to emit on failure.

---

## 4. The per-directory CLAUDE.md convention

**Coverage.** 17 `CLAUDE.md` files. One at the repo root, one in each of the 11 game folders, one
each in `css/`, `js/`, `assets/`, `slides/`, `lecture_notes/`. Coverage is complete **at the level
of a directory that is a unit of work**. It deliberately does **not** recurse: a multi-file game's
own `css/`, `js/`, `js/scenes/`, `data/`, `precompute/`, `vendor/`, `assets/` have none (about 60
nested directories in total). Those are documented instead by the parent game's `## Layout`
section, which is an annotated file tree with one comment per file. Only the start-screen engine's
`css/`, `js/` and `assets/` get their own, because there they *are* the unit of work.

**Two tiers.**

### Tier A: engine directories and vendored single-file games (25 to 61 lines, 1.2 to 3.0 KB)

Heading spine:

```
# <dirname> : <one line saying exactly what it is>
## What is here / ## Contents / ## What it does
## Concept it teaches            (games only)
## Provenance and how to update  or  ## This is vendored, do not deep-edit
## Registration                  (or ## Registration (do NOT edit here))
## Contract with `../cartridges.js`   (engine dirs)
## URL params                         (engine dirs)
```

The whole of `darts/CLAUDE.md` is 26 lines: a title line, four sections, and it ends by naming
the exact registry entry (`href:"darts/"`, name "DARTS IN THE DARK", tag `RL`, accent `#38bdf8`,
placed in `window.VIEWS.extra`, with a Japanese name and blurb in the `JP` map) and the sentence
"The engine is the root `js/arcade.js`." Nothing about how the code works. It tells the next
agent the two things it can get wrong: do not edit here, and here is where the wiring lives.

### Tier B: the six multi-file cartridges (203 to 272 lines, 12 to 16 KB)

`repair-or-replace/CLAUDE.md` (232 lines) and `pokemon-battle/CLAUDE.md` (272 lines) are the
longest. The spine, in order:

1. `# <dir> : <what it is>` plus a 3 to 6 line abstract naming the audience ("for a **manager
   audience**"), the properties ("browser-only, no-build, `file://`-safe"), where it sits in the
   arcade, and the whole scene arc on one line
   (`title -> tutorial -> playtest -> formalization -> policy -> trajectory -> return ->
   patience knob -> Q* -> Bellman -> DP -> DP-caveat -> SARSA -> live SARSA -> recap`).
2. `## The concept (...)` a plain-language paragraph naming the headline surprise.
3. `## The MDP` with **State / Action / Transition / Reward** bullets carrying the literal
   constants (`REV_RUN = [95, 72, 40, 16]`, `P_BD = [0.02, 0.08, 0.28, 0.55]`), and a markdown
   table of the verified Q* grid with the argmax bolded and the optimal policy spelled out.
4. `## Layout` the annotated fenced tree, then a closing "No build step. Open `index.html` from
   `file://`; everything works offline."
5. `### Engine conventions (shared with the gallery)` aliases, Q-table indexing, the scene
   contract, the live scene order, every deep-link and QA flag.
6. `## The rigor gate (precompute)` the two source-of-truth files and every assertion, numbered.
7. `## Regenerating the data` one fenced command.
8. `## SARSA ...` an honest paragraph on what the model-free path does and does not reproduce.
   `last-minute-pricing` titles this section "SARSA here is the honest 'good enough, not exact'
   path" and explains why the disagreement is correct RL behaviour "not a bug".
9. `## i18n (EN + JP)` where the cartridge has it.
10. `## Inherited template detritus (cloned from pokemon-battle)` a section that exists purely to
    stop the next agent from "fixing" things: stale Pokemon comments in `bellman.js` that are
    wrong but whose code is generic and correct, dead Pikachu sprites, a screenshot harness still
    named for the template.
11. `## QA (this Mac hangs headless Chrome)` the machine-specific watchdog recipe (launch
    detached with a fresh `--user-data-dir`, poll for the PNG, kill the process) and the
    "old headless Chrome with `--window-size=390` does NOT emulate a mobile viewport, render
    inside a `width:390px` iframe instead" gotcha.
12. `## Parity checklist (vs ...)` a literal `- [x]` / `- [ ]` checklist against the sibling
    cartridges, with unchecked boxes left unchecked (repair-or-replace's Japanese box is `- [ ]`).
13. `## Registration on the arcade start screen (../cartridges.js)` the exact registry entry.

**What makes them good, stated plainly:** they are written for the next agent, not for a reader.
Every section either (a) states a number a reader can go check, (b) names a file as the source of
truth and forbids editing the copy, (c) records a decision *and its reason*, or (d) warns about
something that looks like a bug and is not. Voice is second person imperative, declarative,
present tense, ASCII punctuation. There is no marketing and no restatement of what the code
obviously does.

The repo's own house rule, from the root `CLAUDE.md`: "Every directory carries its own
`CLAUDE.md` documenting its contents" and "ASCII punctuation only in authored text: no em or en
dashes, and no `--` used as a dash." The `CLAUDE.md` files obey that. The vendored game HTML does
not.

Two more repo-level documents worth knowing about:

- `PARALLEL.md` (57 lines): how multiple Claude sessions work the repo without colliding. Three
  lanes, one git worktree and branch each, and a file layout where no two lanes share a file:
  **Games** touch only new `*/` folders, **Design** touches only `index.html` and `css/`,
  **Integrate** touches only `cartridges.js` and `list.html` and does the merges. Only `main`
  deploys. This is why `cartridges.js` is a separate file from `index.html` in the first place.
- `LIVE-CODING-DEMO.md` (183 lines): a plan for live-coding a whole MDP plus a TD learner from a
  blank file in one sitting, with a comparison table picking `repair-or-replace` as the cheapest
  to write live (4 states, 1-D, infinite horizon, flat 4x3 Q-table, no illegal actions) and the
  exact constants to copy to the board.

---

## 5. The pedagogical framing: the game to idea table

Reproduced verbatim from `README.md`:

| Game | Idea it builds intuition for |
|------|------------------------------|
| ANYMAL MDP | the four pieces of an MDP: state, action, transition, reward |
| Casino | bandits; explore vs exploit (epsilon-greedy) |
| Spooky House | value and the Bellman recursion |
| Darts in the Dark | an online estimate converging (learning rate vs stability) |
| Minigolf | noisy reward feedback under stochastic outcomes |
| Repair or Replace | maintenance vs replacement, timing set by the discount gamma |
| Last-Minute Pricing | revenue management (DP, then SARSA) |
| Recycling Robot | acting on a battery budget (search / wait / recharge) |
| Pokemon Battle | the same RL lesson under a Gen-1 battle screen |
| Stale by Sundown | perishable inventory (hold / discount / dump) |
| Critical Spare | spare-parts pre-positioning before a failure strands you |

### How each turns maths into a story

The `tag` field splits them: **RL** cartridges dress a piece of theory in a physical or playful
world; **BIZ** cartridges dress the identical machinery in an operations decision a manager has
actually made. Concretely:

- **ANYMAL MDP** (RL): a robot dog on a grid chasing treats. The maths is the tuple
  (S, A, P, R). The story asks you to *name* the four pieces of the thing you just played.
- **Casino** (RL): five slot machines with hidden odds `[0.30, 0.62, 0.45, 0.78, 0.52]`. The
  maths is a K-armed bandit and pseudo-regret. The story is a 50-pull budget: your total is
  compared at the end against `round(50 * best_p)`, the oracle. Explore and exploit are two
  buttons before they are two words.
- **Spooky House** (RL): a hero walks a grid of haunted rooms, right or down only, summing
  spookiness. The maths is the Bellman recursion. The story is the combinatorial explosion made
  concrete: "6 paths for 3x3, 3432 for 8x8", then one recursion beats every brute force.
- **Darts in the Dark** (RL): a dartboard you cannot see, a bullseye that drifts, a loudspeaker
  that calls a noisy score. The maths is Robbins-Monro stochastic approximation. The story is
  that the only thing you ever learn is one number.
- **Minigolf** (RL): a hidden hole and wind on every putt. The maths is stochastic root-finding,
  `H(theta) = E[landing - hole] = theta - theta*`. The story is that one putt lies, so you must
  chase the *average* putt, not the last one.
- **Repair or Replace** (BIZ): OLD BESSIE the delivery van, four wear levels, three calls each
  week. The maths is an infinite-horizon discounted MDP at gamma = 0.9. The story lands a
  surprise the manager can argue with: at SHAKY the optimal call is REPLACE **even though the van
  still runs**, and at FAILING, running it actually loses money (`Q*(FAILING, RUN) = -3.1`).
- **Last-Minute Pricing** (BIZ): perishable stock and a midnight deadline, two price tags. The
  maths is finite-horizon DP on a 5x4 board, then SARSA. The story is that the optimal lever
  *moves* across the board: lots of stock and little time means clear it, scarce stock and time to
  spare means hold out.
- **Recycling Robot** (RL): search, wait, or recharge on a battery. The lever flips up a battery
  gauge, so the state is visible as a gauge before it is a symbol.
- **Pokemon Battle** (RL): the identical RL lesson under a Gen-1 Red/Blue battle screen. Its
  existence is the point: the same machinery, a completely different dress.
- **Stale by Sundown** (BIZ): fresh stock spoiling, hold / discount / dump; the optimal call
  marches down the freshness tier, and the CLAUDE.md notes the surprise is that *age*, not stock,
  drives it.
- **Critical Spare** (BIZ): one machine and one spare bin; pre-position the spare as the machine
  ages, before a failure strands you.

The recurring move is: **let them play the thing, then name what they were doing.** Every scene
arc in the multi-file cartridges is literally `title -> tutorial -> playtest -> formalization`.
The formalization scene never comes first.

---

## 6. darts/ in full (crucial for hs26-bmai-w1-opt-genie-rm)

`darts/index.html`, 718 lines, 46,192 bytes, one file, no sidecar assets, zero external requests.
Page `<title>` is **"Blind Bullseye"**; the arcade name is "DARTS IN THE DARK". Vendored from
`eth-ainit-fs26/coding-exercises` branch `week3`.

### 6.1 The section arc (from the HTML comments)

```
PAGE 1  COVER                     hero, "The game in 30 seconds.", "Four rules to play by.",
                                  "Points to chase." (scoring), "Keys to press."
PAGE 2  GAME                      the playable board
PAGE 3  DISCOVERING ROBBINS-MONRO "A natural strategy." (7-step procedure),
                                  "Nudge toward the target." (the concept card),
                                  "The Robbins-Monro update rule." (the equation)
PAGE 4  EXERCISE 1                the Python fill-in
        gate-e1                   lock screen
PAGE 6  QUIZ                      two questions (page 5 is skipped in the numbering)
PAGE 7  CONCLUSION                three carry-away bullets
```

### 6.2 The playable game, exactly

State: `st = { round, player, bull, hist, won }`.

- `randStart()` places the hidden bullseye **bimodally**: 50/50 between `10 + rand*15` (10 to 25)
  and `75 + rand*15` (75 to 90). Never near the player's start.
- Player starts at 50, clamped to `[2, 98]`, moved by exactly **+/- 3** per ArrowUp / ArrowDown.
- `shoot()` (Space or the button): `st.round++`, then the bullseye **drifts**:
  `st.bull = clamp(st.bull + clamp(gauss(0,1), -2.5, 2.5), 10, 90)`.
- Score: `dist = |player - bull|`, `score = clamp(max(0, 100 - 2*dist), 0, 100)`.
- Win condition: `Math.round(score) >= 97`, i.e. `dist <= 1.5`. A `.dk-end-card` pops
  ("You win!", the score, Play again / Continue).
- `gauss(m, s)` is Box-Muller over **raw `Math.random()`**. There is **no seeded RNG** in darts.
- Board: a vertical `.dk-track` (80px wide, 480px tall, rounded, inset shadow) with ticks and
  labels at 90 / 50 / 10; a glowing `.dk-player` puck with two eyes; a `.dk-bull` element that is
  `display: none` in the live game. The right panel is "Round history", last 15 rounds, each
  `Round NN Score: SS`. The left panel is one stat ("Last score", 46px gradient numeral) and one
  button.
- Keys only fire when the game's `.page` straddles the vertical midpoint of the viewport.

### 6.3 What the maths section actually says

- A decorative track with the caption **`aim += α × error`**.
- The seven-step "What could be done" procedure: throw from the middle, take the score, move a
  little, throw again, take the new score, compare the two, step toward the better direction and
  repeat.
- The concept card "The move you kept making": *"How far off was I, and which way?" then step in
  that direction, proportional to the error. A big miss led to a big correction; a near-hit to a
  tiny one. That single move, repeated, is what reeled you in on a target you could never see.*
- The equation card:

  ```
  y(t+1) = y(t) + α(t) × error
    y(t)    your aim at timestep t
    error   how far off the shot was, and in which direction (signed)
    α(t)    the learning rate at timestep t, decaying over time
  ```

  Rendered as coloured HTML spans in a monospace `.eqn`, **not KaTeX**.
- Closing line: *This rule is Robbins-Monro, the root of stochastic approximation.*

### 6.4 The exercise, exactly

```python
def robbins_monro(game: DartsInTheDark, n_rounds: int = 100, alpha_0: float = 5.0, decay_rate: float = 20.0):
    positions, scores, learning_rates = [], [], []
    game.reset()
    for t in range(n_rounds):
        alpha_t = alpha_0 / (1 + t / decay_rate)     # GIVEN
        learning_rates.append(alpha_t)
        current_pos = game.position                   # GIVEN
        positions.append(current_pos)
        result = game.shoot()                         # GIVEN
        scores.append(result['score'])
        target_score  = result['target_score']        # GIVEN, "where a perfect aim would be"
        current_score = result['current_score']       # GIVEN, "where the aim is now"
        error  = ____                                 # BLANK
        change = ____                                 # BLANK
        game.position = ____                          # BLANK
    return positions, scores, learning_rates
```

Accepted answers (whitespace stripped, double quotes normalized to single, exact match after
that, nothing else):

```js
error:  ["target_score-current_score"]
change: ["alpha_t*error", "error*alpha_t"]
update: ["current_pos+change", "change+current_pos"]
```

All three correct removes `#gate-e1`, unlocks `#page-6` and `#page-7`, and auto-advances.
Wrong gives `N/3 correct` plus one sentence. The hint box gives one nudge per blank.

### 6.5 The two quiz questions

Q1 "Why does the learning rate α(t) get smaller as the rounds go on?" Correct: B,
*Big early steps close the gap quickly; small later steps stop you overshooting so the aim can
settle.* Explanation ends: *this decaying schedule is exactly the Robbins-Monro condition for
convergence.*

Q2 "Suppose you kept α large and constant forever." Correct: B, *The aim keeps jumping back and
forth across the bullseye and never settles.* Explanation: *it orbits the target forever without
settling, and the noise makes it worse.*

### 6.6 What darts does NOT do (the extension surface)

This matters more than what it does, because `hs26-bmai-w1-opt-genie-rm` must extend it.

- **The playable game does not run Robbins-Monro.** You move the aim by hand in fixed +/- 3
  steps. There is no auto-step button, no alpha slider (`type="range"` count is **0**), no
  side-by-side fixed-alpha vs decaying-alpha run, and no convergence plot. The claim in
  `darts/CLAUDE.md` that "a large, fixed step keeps overshooting and orbits the target forever;
  a decaying step lets the aim fine-tune and settle" is delivered **only as prose and as quiz
  answer text**. Nothing on the page demonstrates it.
- **The Python class `DartsInTheDark` is not in this repo.** The exercise references
  `game.position`, `game.shoot()`, `game.reset()` and a result dict with `score`,
  `target_score`, `current_score`. The JS game has none of that: its `shoot()` returns nothing
  and pushes only `{round, player, bull, dist, score}` to history. The notebook lives upstream in
  `coding-exercises`.
- **The naming is internally inconsistent.** `target_score` and `current_score` are named as
  scores but glossed as positions ("where a perfect aim would be", "where the aim is now"), and
  the accepted `error = target_score - current_score` only reads as a signed positional error
  under the positional reading.
- **Sign convention differs from minigolf.** darts: `y(t+1) = y(t) + alpha * (target - current)`.
  minigolf: `theta_(t+1) = theta_t - alpha_t * error_t` with `error = landing - hole`. Both are
  Robbins-Monro; the signs differ because the error points in opposite directions. Two BMAI
  exercises taken from these two files would teach two conventions unless one is chosen and
  imposed.
- No seeded RNG, no theme toggle, no `data-theme`, no `prefers-color-scheme`, no hash routing, no
  `&run` or `?test=` hook, no KaTeX.

### 6.7 minigolf already does the half darts is missing

Read this before building anything: `minigolf/` is the closer starting point for a
Robbins-Monro exercise, and the brief's framing of darts as the Robbins-Monro cartridge is only
half right.

- It has a literal **"Robbins-Monro step"** button. `putt(auto)` with `auto = true` computes
  `alpha = 5 / (1 + st.round / 20)` (exactly the exercise's `alpha_0 = 5.0`,
  `decay_rate = 20.0`) and applies `st.force = clamp(force - alpha * err, 0, 100)`, then narrates
  it: *"Robbins-Monro used alpha 2.50 and updated the next force."*
- It uses a **seeded RNG**: a Mulberry32 (`Math.imul` variant) with `rng(42)`, plus Box-Muller
  `gauss(R, 8)` for the wind (sd 8.0). It is the only one of the five single-file games that
  does. That satisfies the course-viz reproducibility rule.
- It builds the expectation argument explicitly: `E[landing] = hole`, `error = landing - hole`,
  `E[error] = 0`, `H(theta) = E[landing - hole] = theta - theta*`, `H(theta*) = 0`, and the
  headline *"Robbins-Monro doesn't chase the last putt. It chases the average putt."*
- Its quiz Q2 is the one darts is missing: *You have dialed in the perfect force. What does the
  caddie's signed feedback do now?* Correct: *Each putt is still noisy, but the feedback averages
  out to 0 over many putts.*
- It has a "Reveal hole" toggle, so the truth can be shown after the blindfolded play, never
  before. That is the course-viz rule "do not display the answer before the student attempts it",
  honoured with a control.

**Recommendation for `hs26-bmai-w1-opt-genie-rm`:** take darts' framing (a target you cannot
see, one noisy number back) and minigolf's mechanics (the seeded RNG, the auto-step button, the
alpha schedule shown live, the expectation argument, the reveal toggle), and add the one thing
neither has: **a fixed-alpha versus decaying-alpha comparison the student can run**, since that
is the claim both files assert in prose and neither demonstrates. For Carlos's genie framing
(`theta = 1 + 1/theta`), the deterministic fixed-point iteration replaces the noisy environment,
so the "guess, check, correct" table from the AINIT deck is the natural on-screen widget, and the
alpha schedule is what turns oscillation into convergence.

---

## 7. rl-arcade versus the course-viz standard: a compliance table

Against `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md`.

| course-viz requirement | multi-file cartridges (repair-or-replace et al.) | single-file cartridges (darts, casino, minigolf, ...) |
|---|---|---|
| Multi-file structure `index.html` + `css/` + `js/` + `js/scenes/` + `data/` + `vendor/` + `precompute/` | Yes, exactly, plus `assets/fonts/` | No, by design; one file |
| Openable from `file://`, no fetch, no CDN, no relative ES imports | Yes for the engine; **but 5 of 6 load DotGothic16 from Google Fonts** for Japanese (documented as "the one optional network asset", with OS fallback offline). `repair-or-replace` is EN-only and has zero external references | Yes, fully: zero external references in all five |
| Light + dark themes, `t` shortcut, CSS-variable token swap on `data-theme` | Yes, `t` and `#theme=`, localStorage, light default. **But the pair is light + amber-CRT, not light + editorial dark** | **No.** Dark only, no `data-theme`, no `prefers-color-scheme`, no toggle |
| Editorial aesthetic: cream `#f9f7f1`, Iowan serif, hairline cards, restrained accent | **No, deliberately overridden.** Press Start 2P pixel, Gen-1 poke-box chrome; `style.css` says so in a comment | No. Dark slate / navy with gradient-clipped text, emoji icons, Inter |
| One viz = one sibling folder | Yes | Yes |
| Click-step or scrollytelling, pick one | Click-step, and a strong one | Neither: **scroll-snap slides**, one-way, no pager, no scene index |
| Hash-based scene routing `#scene=N` (mandatory) | Yes, plus foreign-param preservation and `stripStepParams` | **No.** Zero `location.hash` use |
| `&run` flag for animation gates | Yes, via `[data-run-primary]`, plus `&autostep=K` and `&instant` | No |
| Scene contract `window.scenes.sceneN(root) -> {onEnter, onLeave, onNextKey, onPrevKey}` | Yes, and cited by name in scene headers | Not applicable |
| Step engine, state as source of truth, prev = reset and replay | Yes, plus an `epoch` guard for in-flight animations | Partial: state plus `render()`, but no rewind |
| Cold entry from `DATA` | Yes, asserted in scene headers | Not applicable (linear scroll) |
| `data/datasets.js` as `window.DATA`, with a `precompute/` generator not loaded at runtime | Yes | No; constants are inline literals |
| Seeded RNG in precompute (Mulberry32) | Yes, deterministic byte-identical output | **Only minigolf.** darts, casino, spooky-house, anymal-mdp use raw `Math.random()` |
| Vendored KaTeX for maths | Yes, `vendor/katex/` with woff2 fonts | No KaTeX at all; equations are styled monospace HTML |
| No inline categorical colours | Mostly, via `.cluster`-style classes and tokens | No: inline `style="color:#..."` on equation symbols is routine |
| English-only UI | No: five cartridges ship full EN + JP; the arcade shell has a Japanese mode | Yes, English only |
| ASCII punctuation in authored prose (repo house rule) | Yes in the docs | **No:** 12 to 28 em dashes per file, en dashes in "Robbins-Monro" |
| Verification: parse check, both themes, headless screenshots | Documented per cartridge; `pokemon-battle/` and `last-minute-pricing/` ship a Playwright harness (`tests/shot.mjs`, `scripts/regress-screenshots.sh`) with committed baselines and a 6% PNG-size drift detector | No harness, no flags to drive one |

And against the sibling `teaching-viz` skill that course-viz points at for "the casual single-file
pattern": the rl-arcade single-file games match its **structure** (one self-contained
`index.html`, inline everything, no build) but not its **aesthetic** (teaching-viz specifies a
cream-paper look with Caveat cursive and permits CDN imports for d3, GSAP and KaTeX; the arcade
games are dark, use no libraries at all, and load nothing from the network). So neither skill
describes these files exactly. They are a third thing: a **vendored dark scroll-snap lesson with
a gated code exercise**.

---

## 8. Recommendation: which pattern for each weekend-1 visualization

The builders need one answer, so here it is.

### 8.1 The decision rule

Use **multi-file course-viz** when any two of these hold:

1. the artifact has 5 or more distinct scenes, or will be built by more than one agent;
2. numbers on screen must be verified before they are shown (a precompute rigor gate);
3. the lecturer will drive it live and needs deep-link, light mode on a projector, and a `t`
   toggle;
4. it will be maintained across course iterations by someone other than its author;
5. it needs KaTeX.

Use **single-file** when:

1. it is one continuous playable lesson with one idea and one exercise;
2. it must travel as one attachment (Code Expert asset, Moodle upload, a student's Downloads
   folder) or be embedded in a notebook;
3. it is vendored from elsewhere and will be re-vendored wholesale, never patched;
4. it is under roughly 1000 lines.

### 8.2 The decisive evidence

The master schedule already points `hs26-bmai-w1-gd-grasshopper` at
`https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html`, built from
`/Users/carloscotrini/Documents/git_fdd/projects/grasshopper`. I checked that directory: it is
**multi-file course-viz** (76 files: `index.html`, `css/style.css` + `explain.css` + `game.css`,
`js/main.js` + `game.js` + `theme.js` + `landscapes.js` + `localview.js` + `worldview.js` +
`explain.js`, `vendor/d3.min.js` + `vendor/katex.min.js` + `katex.min.css`,
`precompute/verify_landscapes.mjs`). Weekend 1's gradient-descent block is therefore already
committed to the multi-file pattern, and Carlos's handwritten stage 5 ("Each grasshopper only
needs to work on its own dimension") extends that same artifact.

Meanwhile the two things already on disk for the optimization block are single-file: Carlos's own
`Minimum Lander Exploration.html` (7 missions in one file) and the AINIT darts and minigolf
cartridges.

### 8.3 The call, per slug

| Slug | Pattern | Reason |
|---|---|---|
| `hs26-bmai-w1-opt-heron` (Heron's algorithm) | **Single-file** | One idea, one table, one exercise. It is Act 1 of a 60-minute CX block, it needs no precomputed data (`sqrt(2026)` is checkable in the browser), no KaTeX (`theta`, `theta^2`, `2026 - theta^2` are ASCII), and it should travel as one Code Expert asset. Build it from the `darts/` skeleton: hero, rules, the guess-check-correct board, the code fill-in, two quiz questions, three-bullet close. |
| `hs26-bmai-w1-opt-genie-rm` (Genie game and Robbins-Monro) | **Single-file**, extending `minigolf/` more than `darts/` | Same reasoning, plus the strongest reason of all: the artifact to extend is already single-file. Copy `minigolf/index.html` into the BMAI repo, keep its seeded Mulberry32 RNG, its auto-step button, its `alpha_t = alpha_0 / (1 + t/decay)` schedule and its reveal toggle; reskin to the genie and `theta = 1 + 1/theta`; then **add the one widget neither AINIT file has, a fixed-alpha versus decaying-alpha race**. Strip the em dashes and the en dash in "Robbins-Monro". |
| `hs26-bmai-w1-opt-rm-house` (RM scaffold for house-price prediction) | **Single-file**, but this one ships a seeded generator | It is a scaffold for a Colab notebook on a fictitious toy dataset. Single file, but the toy dataset must be generated by a committed seeded script and labelled synthetic in the page, per the no-fabrication rule. If the viz grows to include the multi-dimensional alternating-RM story for `y = wx + b`, promote it to multi-file rather than letting one file pass 1200 lines. |
| `hs26-bmai-w1-gd-grasshopper` (Grasshopper game) | **Multi-file**, already is | The FDD grasshopper is course-viz. Extend it in place or fork it as a sibling folder; do not rewrite it single-file. |
| `hs26-bmai-w1-gd-grasshopper` (Moonlander as grasshopper games) | **Multi-file. Convert `Minimum Lander Exploration.html`.** | This is the one place the tension has to be resolved rather than dodged, and it resolves against the single file. Seven missions is past the 5-scene threshold; the missions are a tonal sequence that wants parallel-agent fan-out; missions 3, 4 and 5 (slope, precision limit, gradient descent) want KaTeX and want their numbers verified; and the whole point of the brief is to make the lander *the same object* as the grasshopper, which is multi-file. Convert it: one folder, `js/scenes/mission1.js` through `mission7.js`, `data/datasets.js` for the terrain, `precompute/` for the landscape and its invariants (single global minimum for missions 1 to 6, a verified local minimum for mission 7), `vendor/katex`, hash routing so Carlos can deep-link mission 5 mid-lecture, and the `t` toggle for the projector. Keep the original file in the repo as `reference/` so nothing is lost. |
| `hs26-bmai-w1-nn-universal-approx` | **Multi-file** | It already has a reference at `https://sml-fs26.github.io/neuralnetworks/`; universal approximation is a build-up-the-sum story with 5 or more scenes and needs KaTeX. |
| `hs26-bmai-w1-validation` | **Multi-file** | Same: an existing reference at `https://sml-fs26.github.io/un-regression-validation/`, and the train/validation split story is inherently multi-scene with data that must be precomputed and asserted. |
| `hs26-bmai-w1-nn-pytorch`, `hs26-bmai-w1-project` | **Neither** | These are Colab notebooks in the BMAI line (student and solutions versions kept in sync, TODO stubs), not browser visualizations. |

### 8.4 The rules that apply to both patterns, no exceptions

Whichever pattern a builder picks, these are not negotiable and they are cheap:

1. **ASCII punctuation in every authored string.** The AINIT single-file games fail this; do not
   inherit the failure. Grep the built file for U+2014, U+2013 and `--` before shipping.
2. **Seeded RNG wherever randomness is visible.** Copy minigolf's Mulberry32, pin the seed at the
   top, never tune it to make one run look better.
3. **Light theme with a `t` toggle**, even in a single-file game. The AINIT single-file games are
   dark-only, and weekend 1 is taught in a bright hall. This is about 30 lines of CSS variables
   plus a keydown handler; there is no excuse to skip it.
4. **A URL hook for headless capture.** Multi-file gets `#scene=N` and `&run`; a single-file
   scroll lesson gets `?test=` jumping to a named state and `?slide=N` scrolling to a slide.
   Without one, nobody can screenshot-verify it, and per the course-viz skill the agent has no
   eyes.
5. **A `CLAUDE.md` in every directory**, Tier A shape for a single file (title, what is here,
   concept it teaches, provenance, registration), Tier B shape for a multi-file viz (the full
   13-section spine in section 4 above).
6. **No fabricated numbers.** If a toy dataset is generated, say so on the page, ship the
   generator under `precompute/`, and use the seeded RNG.
7. **One registry file if there is ever more than one viz.** `cartridges.js` is the right idea and
   `list.html` is the cautionary tale: a second hand-maintained listing drifts, and this one now
   has nine dead links.

---

## 9. File index for follow-up work

Absolute paths, all read for this summary.

Start-screen engine:
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/CLAUDE.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/README.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/cartridges.js`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/index.html`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/js/arcade.js`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/css/arcade.css`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/js/CLAUDE.md`, `css/CLAUDE.md`, `assets/CLAUDE.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/list.html` (stale, nine dead links)
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/PARALLEL.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/LIVE-CODING-DEMO.md`

Single-file cartridges:
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/index.html` and `darts/CLAUDE.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/minigolf/index.html` and `minigolf/CLAUDE.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/casino/index.html` and `casino/CLAUDE.md`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/spooky-house/index.html`, `anymal-mdp/index.html`

Multi-file cartridge (the model):
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/CLAUDE.md` (the gold-standard doc)
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/js/main.js` (the scene engine)
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/js/theme.js`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/js/scenes/scene5.js`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/precompute/build-datasets.js`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/precompute/value_iteration.py`
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/last-minute-pricing/CLAUDE.md` (257 lines, the longest full spine with i18n and detritus sections)
- `/Users/carloscotrini/Documents/git_ainit/rl-arcade/pokemon-battle/CLAUDE.md` (272 lines) and `pokemon-battle/tests/shot.mjs`, `pokemon-battle/scripts/regress-screenshots.sh`

Standards:
- `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md`
- `/Users/carloscotrini/.claude/skills/teaching-viz/SKILL.md`
- `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/` (multi-file, the weekend-1 GD target)
