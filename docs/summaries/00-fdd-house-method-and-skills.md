# The FDD house method: the rulebook for BMAI HS26 Weekend 1

Extracted 2026-08-26 from `/Users/carloscotrini/Documents/git_fdd/projects` (the eth-fdd-fs26
"From Data to Decisions" repo). Everything built for CAS BMAI HS26 Weekend 1 obeys what is in
this file. Where a rule below is quoted, it is quoted because the wording is the rule.

## How to read this file

**Verbatim policy.** Quoted rule text is character for character from the source file, with two
mechanical substitutions that are forced and are flagged wherever they occur:

1. The source skills use Unicode em dashes in their own prose. This repo's write hook rejects
   them (see section 1). Every such dash is replaced here with a comma or a colon. No wording is
   otherwise altered.
2. A whitespace-flanked double hyphen cannot be written into any file under this hook, so where a
   skill's own text or shell command contains one (the LaTeX line-segment operator, the shell
   end-of-options separator), it is described in words or replaced with the equivalent flag, and
   said so on the spot.

Several house rules are themselves written in the contrastive shape that the second write hook
blocks (section 1b). Those are reproduced inside fenced blocks, which the hook strips, so they
survive verbatim. A fenced block introduced by "Verbatim:" is a quotation.

Everything else is verbatim. Where a rule is paraphrased rather than quoted, the paraphrase is
outside quotation marks. Where something a downstream agent might expect is absent from the FDD
repo, this file says it is absent rather than inventing it.

**Command text inside code fences is exact and must survive unedited.** CLI flags such as
`--headless` and `--virtual-time-budget=4000`, and beamer syntax such as `[<+->]` and
`visible on=<n->`, contain double hyphens that are code. The ASCII punctuation rule applies to
prose.

---

## 0. Sources read in full for this extraction

| Path | Size | What it is |
|---|---|---|
| `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md` | 629 lines | THE standard for browser-only educational viz |
| `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md` | 579 lines | THE standard for beamer decks |
| `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-notes/SKILL.md` | 309 lines | LaTeX notes plus site plus notebook |
| `/Users/carloscotrini/Documents/git_fdd/projects/CLAUDE.md` | 3.7 KB | repo root orientation |
| `/Users/carloscotrini/Documents/git_fdd/projects/README.md` | 3.8 KB | human entry point |
| `/Users/carloscotrini/Documents/git_fdd/projects/CONTRIBUTING.md` | 2.3 KB | how to add a project idea |
| `/Users/carloscotrini/Documents/git_fdd/projects/RESEARCH_CONVENTIONS.md` | 6.0 KB | binding dossier conventions |
| `/Users/carloscotrini/Documents/git_fdd/projects/PROJECT_TEMPLATE.md` | 2.3 KB | the project block template |
| `/Users/carloscotrini/Documents/git_fdd/projects/narrative-arc.md` | 5.7 KB | cross-weekend dependencies |
| `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/README.md` | 9.5 KB | the built cold open, documented |
| `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md` | 21.5 KB | the menu it was chosen from |
| `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/slides.tex` | 12.1 KB | the deck, 6 frames |
| `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/beamer-preamble.tex` | 5.0 KB | the Modern Editorial preamble it inherits |
| `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/img/IMAGE-SOURCES.txt` | 1.9 KB | the image-licence convention |
| `/Users/carloscotrini/Documents/git_fdd/projects/weekend-05-rag-research/carlos-lectures/rag-foundations/COLD-OPEN-CANDIDATES.md` | 376 lines | sibling menu, W5 |
| `/Users/carloscotrini/Documents/git_fdd/projects/weekend-06-agentic-research/carlos-lectures/COLD-OPEN-CANDIDATES.md` | 556 lines | sibling menu, W6 |

Also read for corroboration: `weekend-06-agentic-research/carlos-lectures/CLAUDE.md` and
`.../mcts/CLAUDE.md` (as CLAUDE.md exemplars), `grasshopper/` (a built viz, the source of the
BMAI grasshopper exercise), and the two skill `templates/` directories.

---

## 1. The two write hooks (binding on every agent, in every repo, on this machine)

Both skills refer to "this repo has a PreToolUse write hook". It is a **global user hook** in
`/Users/carloscotrini/.claude/settings.json`, so it is not repo-local at all:

```json
"hooks": { "PreToolUse": [ { "matcher": "Write|Edit|MultiEdit", "hooks": [
  { "type": "command", "command": "$HOME/.claude/hooks/no-em-dashes.pl" },
  { "type": "command", "command": "$HOME/.claude/hooks/no-ai-tells.pl" } ] } ] }
```

`/Users/carloscotrini/Documents/git_fdd/projects/.claude/settings.local.json` contains only a
three-entry permissions allowlist and **no hooks**. The hooks apply to the BMAI scratch repo
exactly as they apply to FDD.

### 1a. `no-em-dashes.pl`

Guards the **rendered** document, branching on file type. Delta aware: a write is blocked only
when it increases the count against the text it replaces.

- **LaTeX** (`.tex .sty .cls .ltx .Rnw`): a triple-hyphen run typesets an em dash and is a **hard
  block**; a double-hyphen run typesets an en dash and is a **soft warn** (because it is also the
  TikZ line-segment operator). LaTeX comments, verbatim / lstlisting / minted / `\verb`, and
  `tikzpicture` / `\draw` / `\path` / `\fill` / `\clip` regions are exempt.
- **HTML** (`.html .htm .xml .svg`): the named dash entities and their numeric and hex forms.
- **Markdown** (`.md .markdown .qmd`): raw Unicode bytes, HTML dash entities, **a
  whitespace-flanked run of two or more hyphens anywhere in the file including inside code
  fences**, plus the LaTeX rule applied inside fenced blocks that hold LaTeX. A bare markdown
  triple hyphen (thematic break, YAML fence, table rule) stays exempt.
- **Any other file type**: raw Unicode bytes plus the whitespace-flanked hyphen run.

Consequence a builder will hit: `--flag`, `i--` and HTML comment markers are safe because the
detector requires whitespace on **both** sides. The shell end-of-options separator standing alone
between spaces is unsafe. Use `grep -e PATTERN` instead.

### 1b. `no-ai-tells.pl`

Guards against **contrastive negation** in prose files only
(`.tex .sty .cls .ltx .rnw .md .markdown .qmd .html .htm .xml .svg .txt .rst .org .adoc`). Code
files are skipped; inside prose files, code regions are stripped first (verbatim, lstlisting,
minted, `\verb`, LaTeX comments, markdown fences and inline spans, `<pre> <code> <script>
<style>`, HTML comments), so a quoted snippet cannot trip it.

```text
HARD (blocked)
  1. copula + a sentence-final ", not <phrase>" tail
       "The bottleneck is the reranker, not the retriever."
  2. "is not <phrase>, but <phrase>"
       "It is not a bug, but a feature."
  3. "isn't <phrase>, it's <phrase>"
       "The problem isn't the code, it's the config."

SOFT (warned, allowed through)
  4. "not just / not only <phrase>, but <phrase>"
  5. the same sentence-final ", not <phrase>" tail with no copula
```

**When you restate a house rule in your own prose, rephrase it or put it in a fence.** This
file's drafts were blocked five times: twice on my own prose, twice on house rules quoted inline,
and once on a sentence describing the blocked shape by exhibiting it.

---

## 2. `course-viz` (629 lines): browser-only educational visualizations

`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md`

### 2.0 Scope and siblings

Front matter description (verbatim, em dash replaced by a colon):

> Build browser-only educational visualizations for university courses (math, statistics,
> computer science, machine learning). Use when the user asks for a "visualization",
> "interactive viz", "scrollytale", "explainer", or "deep-dive" tied to a course concept (PCA,
> k-means, sorting algorithms, probability distributions, optimization, kernels, ...). Defines
> the editorial aesthetic, multi-file project structure, scrollytelling and click-step patterns,
> parallel-agent fan-out, data validation, and verification. Course-agnostic: drop into any
> course repo and follow the recipe.

Audience: "university students at the level the course is taught (typically advanced undergrad or
master's)". Deliverable: "a viz that runs from `file://` on the lecturer's laptop, with no build
step."

The rules were extracted from a Statistical Machine Learning course repo referred to as
`pca-kmeans-rf`, holding three working examples: `congress-story/`, `kmeans-deepdive/`,
`movies-pca/`. **That repo is not present in the FDD clone**; the skill says the patterns are
sufficient without it.

There is a sibling skill named `teaching-viz` for a "hand-drawn whiteboard aesthetic", described
as "the casual single-file pattern". Quoting the skill: "This skill is the editorial multi-file
pattern." A `teaching-viz` skill is installed in this Claude session (scoped to an Informatik II
course), and the FDD repo itself carries no copy of it.

The skill also flags shared rules: "hash routing, headless screenshot, debugging discipline,
color cross-talk, no-fabrication, D3 handler-on-merged-selection, KaTeX conventions" are
course-agnostic and also appear in sibling viz skills; sharpen one, sharpen all.

### 2.1 Hard requirements (all five, verbatim)

```text
1. Multi-file structure.  Each viz is one folder containing:  [tree below]
2. Browser-openable from `file://`.  No fetch(). No CDN imports. No relative ES-module
   import(). Plain <script src="..."> tags only, vendored libs in vendor/.
3. Light + dark themes.  Light is the lecture default (bright projection halls). Dark is for
   solo study. CSS-variable token swap via data-theme on <html>. Mandatory `t` keyboard
   shortcut for mid-lecture toggle. All cluster/categorical colors via CSS classes
   (.cluster-N) so theme switch is automatic, never inline fill="#...".
4. One viz = one sibling folder.  Don't expand existing viz with new content, create a new
   sibling.
5. Verify before reporting done.  See the Verification section for the parse check + browser
   walkthrough + headless Chrome screenshot loop.
```

### 2.2 The mandatory directory layout

Verbatim, with the source's leftward arrow comments rewritten as `<-`:

```text
<viz-name>/
  index.html
  css/
    style.css        <- theme tokens + scene engine layout + cluster classes
    sceneN.css       <- per-scene styles
  js/
    theme.js         <- light/dark toggle (CSS variables, localStorage, 't' shortcut)
    *.js             <- shared modules (math utils, scene engine, widgets)
    scenes/
      sceneN.js      <- one file per scene; registers on window.scenes
  data/
    datasets.js      <- inline data: window.DATA = {...}
  vendor/            <- d3, katex, scrollama (vendored, never CDN)
  precompute/        <- Node/Python data generators (not loaded at runtime)
```

### 2.3 The `file://` constraints, stated precisely

No `fetch()`. No CDN imports. No relative ES-module `import()`. Plain `<script src="...">` tags
only. Vendored libraries under `vendor/`. Data is loaded as a script that assigns `window.DATA`.
A `precompute/` script may be Node or Python and is never loaded at runtime.

### 2.4 The editorial aesthetic and the exact palette

Verbatim:

```text
Polished Pudding/NYT/Distill voice, not casual hand-drawn. This is the house style:
opinionated and consistent across viz, regardless of course.
```

**Light mode (lecture default), exact tokens:**

| Role | Hex |
|---|---|
| Background, warm cream | `#f9f7f1` |
| Ink | `#1a1a1a` |
| Secondary | `#6b6b6b` |
| Hairline rule | `#d8d4ca` |
| Categorical blue | `#2f6cb1` |
| Categorical red | `#b8323a` |
| Categorical amber | `#c08a3e` |
| Categorical purple | `#7a5c8c` |
| Categorical green | `#4a8b6b` |
| Categorical burnt orange | `#a05a2c` |

"No brand pink. Accent is restrained black; emphasis comes from the categorical palette and serif
typography."

**Dark mode, exact tokens given by the skill:**

| Role | Hex |
|---|---|
| Background, warm dark (keeps warmth, never pure black) | `#181612` |
| Ink | `#ece7d9` |
| Secondary | `#8a8579` |
| Rule | `#383530` |

For the dark categorical palette the skill says only "lighter, less saturated companions of the
light values", and adds "Yellow doesn't work on white: light mode swaps it for amber."
**The skill gives no dark categorical hex values.** The built `grasshopper/css/style.css`
instantiates them, and its light values match the skill exactly, so these are the house dark
companions in practice (source: the built artifact
`/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/css/style.css`):

```text
dark:  --blue #6fa3d8   --red #d97b80   --amber #d1a04c
       --purple #a98cc0 --green #6cae8b --orange #c9824f
       --bg #181612 --ink #ece7d9 --muted #8a8579 --rule #383530
       (plus panel #201d18 / #262219 / #2d281e and faint #6b6759)
```

**Typography:**

- Headers: Iowan Old Style, then Palatino, then Georgia serif, weight 500.
- Body: `-apple-system` / Inter sans, 16 to 17px, line-height 1.55.
- Mono: SF Mono / Menlo.

**Cards**, verbatim:

```text
flat hairline border (1px solid var(--rule)), 4px radius, no offset shadows.
Visual demarcation, not weight.
```

**Color cross-talk (a rule, with its real story):** do not reuse a group-identity color for a
second encoding. If party/cluster/class is encoded in red and blue, do not also use red for
"important" or "alert" elsewhere: readers infer group membership where you meant emphasis.
Reserve a third hue (amber, purple) for highlights that carry no identity. Real story: a chart in
`congress-story` colored "procedural" votes red and "substantive" black; the red read as
Republican; it was switched to amber.

**When the algorithm partitions space, draw the partition.** Voronoi cells, decision boundaries,
kernel-induced regions. "Showing them makes the algorithm intuitive in a way no amount of prose
or distance lines can match. Use semi-transparent fills (`fill-opacity: 0.08`) layered behind
data points."

### 2.5 Two interaction patterns: pick one and commit

"Pick one and commit. Don't mix."

**Scrollytelling.** Sticky viz column on one side, prose scrolls on the other; `scrollama.min.js`
triggers scene transitions on scroll.

- Best for: "linear hero narratives. Lecturer scrolls through it as a presentation."
- Reference: `congress-story/`.
- Limitation, verbatim: "unidirectional. Can't have 'click Next within scene 4 to walk through
  the assignment-step math.' If the math is non-trivial and needs explicit decision points, use
  click-step."
- CSS gotcha, sticky inside CSS Grid: grid's default `align-items: stretch` makes the viz column
  fill the full grid row (12 scenes gives 1200vh), which silently kills sticky positioning.
  **"Always add `align-self: start` on the viz column"** alongside
  `position: sticky; top: 0; height: 100vh`. Symptom when forgotten: viz stage shows briefly
  above the hero, then disappears as you scroll into the first scene.

**Click-step.** Topbar (brand, scene title, theme toggle, dot pager), stage with one `.scene` div
per scene, footer with Prev/Next, internal step engines per scene supported.

- Best for: "math-heavy didactic content. Bidirectional with rewind."
- Reference: `kmeans-deepdive/`.

**For BMAI Weekend 1 this decides itself:** every Weekend 1 topic is math-heavy with explicit
decision points (Heron's table row by row, the Robbins-Monro update, the epsilon-gradient), so
click-step is the pattern, with per-scene internal step engines.

### 2.6 The scene engine and the scene registration contract

Reference implementation named as `kmeans-deepdive/js/main.js`. The skill's code, verbatim:

```js
const SCENE_TITLES = ["", "Setup", "What we're minimizing", ...];

let current = -1;
const sceneNodes = [];
const sceneState = [];

function goTo(idx) {
  if (idx < 0 || idx >= SCENE_TITLES.length) return;
  if (idx === current) return;
  // fade-out old, fade-in new, update dots, prev/next disabled state
  if (!sceneNodes[idx]) {
    const node = document.createElement('div');
    node.className = 'scene';
    stage.appendChild(node);
    sceneNodes[idx] = node;
    const builder = window.scenes['scene' + idx];
    if (builder) sceneState[idx] = builder(node) || {};
  } else if (sceneState[idx]?.onEnter) {
    sceneState[idx].onEnter();
  }
  current = idx;
  setTimeout(() => sceneNodes[idx].classList.add('active'), 20);
  // ... update hash, dots, button states
}

window.addEventListener('keydown', e => {
  if (e.target?.tagName?.match(/input|textarea|select/i)) return;
  if (e.key === 'ArrowRight') {
    const handled = sceneState[current]?.onNextKey?.();
    if (!handled) goTo(current + 1);
  } else if (e.key === 'ArrowLeft') {
    const handled = sceneState[current]?.onPrevKey?.();
    if (!handled) goTo(current - 1);
  }
});
```

**The contract, verbatim:** "Each scene file at `js/scenes/sceneN.js` registers
`window.scenes.sceneN(root) -> { onEnter?, onLeave?, onNextKey?, onPrevKey? }`. Returning `true`
from `onNextKey` consumes the keystroke (advances an internal cursor); returning `false` lets the
driver advance the scene."

### 2.7 Hash-based scene routing (mandatory)

"Every click-step viz must support direct deep-link to a scene via the URL hash":

```js
function readHashScene() {
  const m = (window.location.hash || '').match(/scene=(\d+)/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return (Number.isFinite(n) && n >= 0 && n < SCENE_TITLES.length) ? n : null;
}
window.addEventListener('hashchange', () => {
  const n = readHashScene();
  if (n != null) goTo(n);
});
goTo(readHashScene() ?? 0);
```

Verbatim justification: "This is non-negotiable. It saves the lecturer (deep-linking mid-lecture)
and the agent (jumping straight to scene 8 instead of clicking Prev/Next 8 times per reload)."

### 2.8 The `&run` flag

```text
Scenes that gate their main animation behind a button press should also accept a `&run` URL
flag for headless verification:

    function shouldAutoRun() {
      return /[#&?]run\b/.test(window.location.hash);
    }
    if (shouldAutoRun()) setTimeout(() => projectBtn.click(), 200);

This is a **dev affordance, not a user feature**: the button stays the canonical interaction.
The flag exists so the headless Chrome screenshot loop can reach post-animation states.

If a scene has multiple gated buttons (e.g. "Train" then "Predict"), `&run` triggers only the
**primary** one: the most visually prominent button, usually labelled "Run", "Go", or with a
play icon. For multi-step playthrough use a separate `&runAll` flag that walks every gated
button in order. Don't overload `&run`; it should mean "get me past the obvious gate."
```

### 2.9 The step engine (within-scene Next)

```js
let cursor = 0;
const STEPS = N;

function resetState() { /* mutate state to initial */ }
function applyStep(c) { /* mutate state for step c (cursor c-1 -> c) */ }
function render()     { /* full re-render from state */ }

function setCursor(c, animate = true) {
  if (c < 0 || c >= STEPS) return false;
  if (c < cursor) {
    resetState();
    cursor = 0;
    while (cursor < c) { cursor++; applyStep(cursor); }
    render();
  } else {
    while (cursor < c) { cursor++; applyStep(cursor); render(); }
    if (animate) playLatestAnimation();
  }
  return true;
}

return {
  onEnter()   { resetState(); cursor = 0; render(); },
  onNextKey() { return setCursor(cursor + 1, true); },
  onPrevKey() { return setCursor(cursor - 1, false); },
};
```

Critical rules, verbatim:

```text
- State is the source of truth, animations are decoration.  render(state) produces a correct
  snapshot from scratch.
- Prev = rewind via reset+replay.  Don't write inverse mutations. Disable animations during
  fast-forward.
- One DOM action per step.  Resist cramming several visual changes into one click.
- Cold entry must work.  If the user jumps to scene 5 via dot pager without visiting scene 4,
  scene 5 must reconstruct its initial state from DATA, never depend on a prior scene having
  run.
```

### 2.10 Cross-scene state

```js
window.<vizName>Shared = window.<vizName>Shared || {
  // shared narrative state, e.g.:
  points: DATA.iterDemo.points,
  k: 3,
  assignmentsAfterAssign: null,
  centroidsAfterUpdate: null,
  // ...
};
```

"Use a project-prefixed global (`kmeansShared`, `pcaShared`, `gradientShared`, ...), never a
generic name like `state` or `shared` that another script in the same window might collide with.
Each scene's `onEnter` reads from it; each scene's `applyStep` writes to it. Cold entry must
work: if the field is empty, reconstruct from `DATA`."

### 2.11 Parallel-agent fan-out

For viz with 6 or more scenes.

- **Phase 0 (sequential, you):** scene engine, theme tokens, shared math utilities, vendored
  libs, scene stubs that register `window.scenes.sceneN = function(root) { /* stub */ }`.
- **Phase 0.5 (data-prep agent, parallel with Phase 0):** if pre-canned trajectories or
  precomputed data are needed, a Node or Python script writes `data/datasets.js` from a
  deterministic source. "**Mandatory verification step in the agent's brief**: assert every
  invariant downstream scenes will rely on (e.g. monotone J, init-sensitivity gap > N%, no NaN,
  no nulls). State each invariant as code, not as a final-report claim." Out of scope for this
  agent: any DOM/JS for the viz itself.
- **Phase 1 (scene agents, parallel after Phase 0):** typically 4 agents, each owning 1 to 3
  scenes.

**Bundle scenes for tonal coherence, NOT for parallelism:**

```text
- Keep tonal triplets together (e.g. assign + update + converge -> one agent). Splitting causes
  drift in the visual language for the most pedagogically important scenes.
- Bundle bookends (title + takeaways): light work, similar voice.
- Bundle narrative arcs (setup -> objective -> init).
- Don't split a tonal triplet for parallelism's sake.
```

**Strict contract per scene agent:** function signature as above; allowed globals enumerated
(`d3`, `katex`, project-specific math module, `Theme`, `DATA`); CSS class allowlist; hard rules
(no inline cluster colors, no `<style>` injection from JS, no fetch, no relative imports); output
one JS file per scene plus optional one CSS file per scene; verification is parse check plus
browser walkthrough in both themes plus headless screenshot for non-trivial layouts.

**Scene agent prompt template, verbatim (fill the bracketed fields):**

```text
Build scene [N] of the [VIZ-NAME] viz. Topic: [ONE-LINE-DESCRIPTION].

File location. Write the JS to js/scenes/scene[N].js and any per-scene CSS to
css/scene[N].css. Link the CSS in index.html.

Function contract.
    window.scenes.scene[N] = function(root) {
      // build DOM into `root`
      return { onEnter?, onLeave?, onNextKey?, onPrevKey? };
    };
onNextKey returns true to consume the keystroke (advance internal step), false to let the
driver advance the scene.

Allowed globals. d3, katex, Theme, DATA, [VIZ-SPECIFIC-MODULES]. No others.

Hard rules.
- No inline cluster colors. Use .cluster-N classes, already defined in css/style.css.
- No <style> injection from JS. Per-scene CSS goes in css/scene[N].css.
- No fetch, no relative imports.
- Cold entry must work: the scene must reconstruct its initial state from DATA if visited via
  dot-pager without prior scenes having run.
- All KaTeX rendered via katex.render(tex, host, { throwOnError: false }). Use display mode
  for centred formulas.

Scene narrative (the pedagogical arc this scene must deliver):
[3 to 5 SENTENCES, what the student should understand by the end]

Step plan (if multi-step):
[STEP-BY-STEP NARRATIVE]

Verification. Parse-check the file, browser-walkthrough in both themes, and
headless-screenshot via --screenshot=...#scene=[N] (combine with &run for animation gates).
```

- **Phase 2 (aggregation, you):** link scene CSS files in `index.html`, parse-check all files,
  browser-verify both themes, fix integration issues, spot-check agent invariant claims.

### 2.12 The inline data convention and reproducibility

```js
// data/datasets.js
window.DATA = {
  /* the entire payload */
};
```

Loaded via `<script src="data/datasets.js">`, never `fetch()`. A companion
`precompute/build-datasets.js` (Node) or `precompute/build_data.py` (Python) lives alongside "for
human auditing and regeneration; it's **not** loaded at runtime."

**Reproducibility, verbatim:** "Any precompute script that draws random numbers must use a
**seeded RNG** (Mulberry32 is enough, 6 lines), with the seed pinned at the top of the file.
Box-Muller for Gaussians. The same precompute run must produce byte-identical
`data/datasets.js` every time, so a downstream code edit can be re-verified with `diff` instead
of by re-checking every value. Pin the seed once; never tune it to make a particular sample look
better."

### 2.13 KaTeX usage

```js
katex.render(
  "J \\;=\\; \\sum_{k=1}^{K} \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2",
  document.getElementById('formula-container'),
  { throwOnError: false, displayMode: true }
);
```

- In a JS string literal, a doubled backslash produces a single backslash for KaTeX.
- Use `\mathrm{name}` for function names such as `dist`, `argmin`.
- Use `\bigl\{ ... \bigr\}` for visible braces (escape with `\{`).
- "KaTeX uses `currentColor` for most rules: automatically theme-aware via the surrounding
  element's `color` property."

### 2.14 Voice and language

"All UI strings, prose, captions, labels, and formula descriptions in **English**, even when the
course is taught in another language. The slide deck may be bilingual; the visualizations are
English-only for portability."

**Imitate this register:** short declarative sentences, present tense, the occasional rhetorical
pivot. The four exemplars:

```text
"Two numbers describe American politics."
"k-means is the algorithm that makes J small. Everything from here is about that."
"Same data. Same algorithm. Two starting points."
"The truth lives in 2 dimensions."
```

**Avoid:**

```text
- Exclamation points, emoji, em-dashes used for excitement.
- Hand-drawn-feel chattiness ("That's PCA!", "Cool, right?").
- Textbook hedging ("Note that, in general, one might consider...").
- Marketing copy ("Discover the power of PCA").
```

**Captions** sit in italic muted serif at about 13 to 14px, a complete sentence, with no trailing
punctuation if it is a single phrase. **Headings** use the serif Iowan stack and are short:
"title-case avoided in favour of sentence-case with a period."

### 2.15 Debugging discipline

"When an interactive widget behaves wrong, **check the data layer before iterating on the
widget**. The UI is almost always a faithful renderer of upstream state; the bug is almost always
upstream."

In this order:

1. **Print the source variable.** "Logging 'the slider thumb is at position 0' tells you nothing;
   logging `currentIdx = 0` tells you everything."
2. **`curl` the data file** the UI reads from. Confirm shape, length, ordering.
3. **Verify data freshness.** Browsers serve cached JSON for hours unless
   `Cache-Control: no-store, no-cache, must-revalidate` is sent. The skill inlines a 20-line
   Python no-cache dev server (`congress-story/serve.py`) that sets `Cache-Control`, `Pragma` and
   `Expires`: "All three headers matter for hitting different browser cache layers, don't drop
   any."
4. Only then iterate on the widget.

"If a debugging session has gone three iterations without progress, **stop and re-verify your
assumptions about upstream state**. Don't keep escalating fixes on the same layer." Real story: a
slider in `congress-story` ate roughly 8 hours because the displayed index variable was assumed
to match the on-screen label; the upstream JSON had been silently truncated by a partial
precompute run, and the slider was rewritten three times before anyone checked the data.

### 2.16 Persistent widget caveat

Persistent fixed-position widgets (J-meter, OOB-error trace, hud overlay) caused real bugs in
`kmeans-deepdive`. An "objective J" panel pinned to the right edge overlapped the scene's right
text column; the fix chosen was removal, over reserving right-padding via a body class.
Verbatim: "**If a widget isn't doing pedagogical work that can't be done inline, don't add it.**
Put the value in a `.formula-block` inside the scene that needs it." If a widget genuinely is
useful (a longitudinal trace where the multi-iteration view is the lesson), reserve its space
with a body-class layout shift up front, and never let it overlay scene content.

### 2.17 Verification (the whole loop)

**1. Parse check, every JS file:**

```bash
for f in js/*.js js/scenes/*.js; do
  node -e "
    const code = require('fs').readFileSync('$f', 'utf8');
    try { new Function(code); console.log('OK: $f'); }
    catch (e) { console.log('ERR: $f ->', e.message); process.exit(1); }
  " || exit 1
done
```

**2. Browser walkthrough in both themes.** `open index.html`, click or scroll every scene in
**light mode first** (lecture default), then toggle to dark with `t` and walk through again.
Verbatim:

```text
A scene that looks weak in one mode should be redesigned, not shipped.
```

**3. Headless Chrome screenshot (mandatory for non-trivial layouts).** Verbatim rationale: "The
agent has no eyes. When asked to 'describe what you saw,' it fabricates: it reads the code,
infers what *should* render, and reports that. Real layout bugs (clipped labels, misaligned
overlays, off-screen elements) slip past pure code review."

```bash
CHROME="$(command -v google-chrome || command -v chromium \
  || echo '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')"

# Single scene
"$CHROME" --headless --disable-gpu --virtual-time-budget=4000 \
  --window-size=1400,900 --screenshot=/tmp/check.png \
  "file:///abs/path/to/index.html#scene=4"

# All scenes in a loop
for n in 0 1 2 3 4 5 6 7 8 9; do
  "$CHROME" --headless --disable-gpu --virtual-time-budget=4000 \
    --window-size=1400,900 --screenshot=/tmp/scene_$n.png \
    "file:///abs/path/to/index.html#scene=$n"
done
```

Then `Read` the PNGs. Combine with `&run` for animation scenes
(`--screenshot=/tmp/check.png "file:///.../#scene=8&run"`). "Ignore stderr unless it contains
`CONSOLE` or `JavaScript`: almost everything else is GPU/CVDisplayLink platform noise." The flag
set works on Chrome 100+; on Chrome 109+ `--headless=new` is the modern rendering path, and if a
headless run disagrees with the interactive page, swap and re-screenshot. Add
`--no-sandbox --hide-scrollbars` in a container or CI.

> **Note for this machine:** the global CLAUDE.md forbids a blanket `pkill` of Chrome and
> requires giving every headless run its own `--user-data-dir` under the scratchpad, with any
> cleanup `pkill` scoped to that profile path. That constraint lives in
> `/Users/carloscotrini/.claude/CLAUDE.md` rather than in the FDD skill, and it overrides.

Real example: a 16x12 heatmap in a PCA viz had column labels rotated 55 degrees anticlockwise and
clipped past the right edge by about 37px; pure code review showed nothing, the screenshot showed
it immediately.

Verbatim, and it is the load-bearing sentence of the section:

```text
Open the PNG. Don't skip this. A screenshot you don't open isn't verification: it's a file.
The agent has no eyes; if you don't Read the image, you're back to fabricating descriptions of
what should be there. This is a hard rule. The whole point of the screenshot is the moment you
look at it.
```

**Multi-viewport.** Take both the lecture-hall and the laptop size:

```bash
for w in "1280,800" "1920,1080"; do
  "$CHROME" --headless --disable-gpu \
    --window-size=$w \
    --screenshot=/tmp/scene4_${w/,/x}.png \
    "file:///abs/path/to/index.html#scene=4"
done
```

"If the layout collapses at one viewport, the fix usually goes in `style.css` (a `clamp()` on
font-size, a min/max-width on a container) rather than per-scene. Don't ship until both look
right."

**What headless screenshots catch reliably:** layout bugs (panel taller than viewport, items
below the fold, sticky positioning broken); CSS flex/grid auto-stretching of canvases; text
overflow, padding, color/contrast; scene-to-scene layout drift.

**What they catch poorly, and the `?test=` hook to bake in from day 1:** `requestAnimationFrame`
does not run smoothly under headless, and `--virtual-time-budget=N` advances JS time but RAF
callbacks land mid-frame, so animations capture mid-pour, mid-fade or barely started. The
warning, verbatim:

```text
For physics demos and animated transitions, the layout will look correct live and broken in
the screenshot: this is a tooling artifact, not a real bug.
```

Plain `--screenshot` also cannot scroll, click, hover or wait.

```js
const params = new URLSearchParams(location.search);
const test = params.get('test');
if (test === 'revealed') {
  // jump straight to the post-reveal state without simulating scroll
  state.estimates.push(...DATA.demoEstimates);
  state.truthRevealed = true;
  render();
}
if (test === 'mid-anim') {
  // freeze any t-driven animation at a known phase for capture
  state.animT = 0.6;
  render();
}
```

"Two-line cost; pays back every iteration." Like `&run`, this is a dev affordance; the canonical
interaction stays the click or scroll.

Real story: a canvas with attributes `width="280" height="360"` was silently stretched by its
`flex-direction: column` parent's default `align-items: stretch`; it looked perfect interactively
because Chrome's regular renderer reflowed canvas content, and captured as a thin slice under
`--headless`. Two days of "but it works on my machine".

**Scrollytelling viz: hash routing alone will not scroll the viewport.** All five agents who
built `random-forest-deepdive/` independently reinvented the same iframe wrapper. Save it once as
`/tmp/grab.html` and screenshot through it:

```html
<!doctype html>
<html><head><meta charset="utf-8"><title>scene grab</title>
<style>html,body{margin:0;padding:0;height:100%;width:100%;overflow:hidden}iframe{width:100%;height:100%;border:0}</style>
</head><body><iframe id="f"></iframe>
<script>
  const params = new URLSearchParams(location.search);
  const scene = parseInt(params.get('s') || '1', 10);
  const theme = params.get('theme') || 'light';
  const f = document.getElementById('f');
  f.src = params.get('url');                          // pass the viz URL via ?url=
  f.onload = () => {
    const doc = f.contentDocument, win = f.contentWindow;
    doc.documentElement.setAttribute('data-theme', theme);
    let tries = 0;
    function tryScroll() {
      tries++;
      const el = doc.querySelector(`.scene[data-scene="${scene}"]`);
      const viz = doc.querySelector('.viz-column');
      if (el && viz && viz.getBoundingClientRect().height > 100) {
        el.scrollIntoView({ block: 'start' });
        win.dispatchEvent(new Event('scroll'));         // wakes scrollama
        document.title = `READY scene ${scene}`;
      } else if (tries < 40) setTimeout(tryScroll, 80);
    }
    setTimeout(tryScroll, 150);
  };
</script></body></html>
```

```bash
URL="file:///abs/path/to/index.html"
for n in 1 2 3 4 5 6 7 8 9 10 11 12; do
  for theme in light dark; do
    "$CHROME" --headless --disable-gpu --virtual-time-budget=10000 \
      --window-size=1400,900 \
      --screenshot=/tmp/scene_${n}_${theme}.png \
      "file:///tmp/grab.html?s=${n}&theme=${theme}&url=${URL}"
  done
done
```

If the screenshots still show only the hero, the documented fallback is DevTools Protocol
`Page.captureScreenshot` after waiting for `Page.frameStoppedLoading` plus a manual
`Runtime.evaluate` scroll. "That's heavier: only reach for it if the iframe wrapper truly fails."

**4. When to graduate to Puppeteer / Playwright.** The bare `--screenshot` flag is enough for
layout checks, color checks and `?test=`-gated state checks. "Don't add a headless-browser
dependency until the cost has hit you twice." The threshold is crossed when verification needs:
clicking a button and screenshotting the result; scrolling to a specific position beyond the
iframe trick; waiting for animations to settle; hover-state captures; console-log or DOM-state
assertions. Then `npm i -g playwright` once, plus a small helper taking
`(path, [(action, screenshot-name)])`.

### 2.18 The verification checklist, in order

```text
1. Edit the file.
2. Parse-check every JS file you touched.
3. Headless screenshot at one or two viewports.
4. Read the PNG. Inspect.
5. If a state needs verifying that requires interaction or scroll, add a ?test= URL param and
   re-screenshot.
6. Browser walkthrough in both themes for any non-trivial change.
7. Only then commit + push.
```

"Step 4, the agent actually looking at the screenshot, is what makes the rest work. Don't skip
it. The 'trust but verify' rule applies to your own work too."

### 2.19 Things to never do (the FULL list, reproduced item by item)

These are the traps. Reproduced verbatim inside a fence so nothing is softened.

```text
- Inline cluster/categorical colors (fill="#..." in SVG, style="color: #..." in DOM). Use CSS
  classes (.cluster-N, .voronoi-cell.cluster-N) so theme switch works.

- Inject <style> tags from JS. Write per-scene CSS files, link them in index.html.

- Auto-run animations on onEnter for interactive scenes (defeats the click-to-think loop). The
  &run hash flag is the *only* exception, and only for headless verification.

- Display the answer before the student attempts it: no HUD pill showing the optimal value.

- Add legends explaining colour conventions inside the viz: the conventions speak for
  themselves once the student plays.

- Re-implement existing widgets from scratch. Copy from the reference implementations (when
  available) and adapt.

- Skip the browser visual check in BOTH themes, and skip the headless screenshot for any scene
  with non-trivial layout.

- Fabricate examples, numbers, labels, narrative anchors, *or stand-in synthetic data presented
  as real*. Every stated value must come from DATA or be computed via a referenced math
  utility. Convincingly-noisy synthetic stand-ins (e.g. fake roll-call cells generated from a
  senator's PC1 position because the real matrix wasn't loaded yet) are still fabrication. A
  sharp viewer will check. Hold the scene back rather than ship a placeholder.

- Add a fixed-position widget without reserving the layout space it occupies. It will overlap
  the scene's right column.

- Split a tonal triplet of scenes (e.g. assign/update/converge) across multiple agents.

- Skip the data-prep verification step. The agent's invariant claim ("J monotone") must be
  asserted in code, not stated in a final report.

- Trust agent reports without spot-checking the produced files for the invariants they claim.

- Attach D3 click handlers in .enter() only when the handler can change after first render.
  Apply .on('click', ...) and .style('cursor', ...) on the *merged* selection
  (enter().merge(update)), and re-render after swapping handlers. Otherwise existing nodes
  silently keep the original handler, or none at all.

- Reuse a group-identity color for a second encoding. If category is encoded in red/blue, don't
  also use red for "important" elsewhere. Reserve a third hue.

- Use Math.random() directly in a precompute script. Use a seeded RNG (Mulberry32). Otherwise
  the data quietly drifts every regeneration.

- Leave a <canvas> (or <svg> with intrinsic size) inside a flex/grid container without explicit
  CSS dimensions. Default align-items: stretch will silently inflate or squash it:
  width="280" height="360" HTML attributes are *intrinsic* sizes; the browser still scales the
  layout box to its parent. The kicker: it often *renders fine interactively* (Chrome's main
  renderer reflows generously) and *captures wrong under headless* (the headless renderer
  respects the squashed box). Two-line fix:

      .my-canvas {
        width: 280px;          /* lock the layout box */
        height: 360px;
        flex: 0 0 auto;        /* don't let flex stretch us */
      }

  Match the HTML attributes to the CSS values exactly. If you need a responsive canvas, pick a
  parent-relative width: 100% + aspect-ratio instead and pin flex: 0 0 auto.
```

### 2.20 Recipe for a new viz (all ten steps)

```text
0. Validate that the data tells the story. Before any UI code, run a 5-line script that prints
   the key statistics across the dataset. If the data doesn't tell the intended story, you'll
   know before investing in scrollytelling infrastructure. The viz is a faithful renderer; the
   data is the story.
1. Pick the closest existing viz as a template.
2. Copy its directory to <sibling-name>/. Strip scene-specific content; keep shell, topbar,
   controls, scene engine, theme toggle, hash router.
3. Inline the new data at data/datasets.js. If pre-canned trajectories are needed, dispatch a
   data-prep agent in parallel with foundation work: its FIRST task is the step-0 validation,
   its SECOND is to write data/datasets.js, its THIRD is to assert downstream invariants in
   code. Don't treat the agent as a black box.
4. Plan the scene list; group scenes for tonal coherence; identify the parallel-agent fan-out.
5. Build foundation (theme, scene engine, shared utilities, scene stubs).
6. Dispatch scene agents in parallel with strict contracts.
7. Aggregate: link scene CSS, parse-check, browser-verify both themes, headless-screenshot any
   scene with non-trivial layout.
8. Iterate based on user feedback. Common asks: add Voronoi / partition cells where the
   algorithm partitions space; remove persistent widgets that overlap content; fix tonal drift
   if a triplet was accidentally split; replace synthetic stand-in data with real data.
9. Pick the right iteration scale. Targeted edits (single concept across 3 files or fewer): do
   directly, no agent. Cross-cutting additions across many scenes: one focused agent with a
   per-scene plan, never full fan-out. Major redesigns or new scenes: dispatch as Phase-1
   agents. Wrong scale wastes either the agent's context or your own.
10. Commit and push after verification.
```

---

## 3. `lecture-slides` (579 lines): beamer decks

`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md`

### 3.0 Scope, exemplar, and the template paths

Deliverable: "one PDF deck per source lecture note, each a click-to-advance presentation, plus a
small Pages site that serves the pre-compiled PDFs (and any interactive page) behind a
mobile-first landing index."

Extracted from the LATS teaching-materials session (`agentic-research/LATS/slides/`). Important
caveat in the skill itself: match the LATS decks for STRUCTURE, animation and voice, and "do NOT
match their dark colors, which predate the projection lesson below (the classic_rl RL deck is the
canonical light example)."

**The templates exist on disk and are the starting points.** Directory:
`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/templates/`

| Template | Purpose |
|---|---|
| `beamer-preamble.tex` | the shared light Metropolis / Libertinus preamble (**the preamble template path**) |
| `editorial-preamble.tex` | the Modern Editorial custom theme (brand color, Biolinum, icons, flow kit, hero) |
| `deck-skeleton.tex` | a compilable skeleton demonstrating all five animation patterns |
| `deploy-pages.yml` | the no-LaTeX-in-CI Pages workflow |
| `landing-index.html` | the mobile-first landing page |
| `slide-figure-audit.workflow.py` | the per-diagram high-DPI audit workflow |

`templates/beamer-preamble.tex` defines, among others: `accent` `#0369A1` (deep sky blue),
`accent2` `#B45309` (dark amber), `good` `#0072B2` and `bad` `#D55E00` (Okabe-Ito),
`\colorlet{panel}{black!8}`, `\setbeamercolor{normal text}{fg=black!87, bg=white}` and the
frametitle pale panel. It loads `dsfont` for the indicator and loads the TikZ library
`overlay-beamer-styles` with an explicit comment that omitting it makes every deck built from the
template fail with "I do not know the key '/tikz/visible on'".

`templates/editorial-preamble.tex` uses `accent` `#215CAF` (ETH blue, marked CUSTOMIZE) plus the
same amber and the same Okabe-Ito pair.

### 3.1 Hard requirements (all ten, verbatim)

```text
1. One deck per source lecture note. Follow the structure of the note: a Beamer \section per
   note section, in the same order. Don't invent a narrative the note doesn't have; the deck is
   the note, distilled to clicks and diagrams.

2. Shared preamble, inherited not copied. Every deck does
   \documentclass[aspectratio=169]{beamer} then \input{beamer-preamble}. The theme, colors, and
   TikZ styles live in ONE beamer-preamble.tex; decks never redefine them. Compile each deck
   FROM the directory holding the preamble so \input resolves.

3. Minimal text. A few words per slide. No paragraphs. No bullet walls (3 to 4 short items max,
   a few words each, never a paragraph). If a slide needs prose to make sense, the diagram is
   doing too little.

4. A diagram on essentially every content slide. TikZ, styled via the shared styles. A slide
   that is only text and a formula is the exception, not the rule.

5. Every piece appears on its own click. Reveal incrementally: [<+->] on lists, \pause between
   blocks, \only<n-> / \onslide<n-> on TikZ elements and on formula terms. A slide that shows
   everything at once on the first click is a bug. EXCEPTION, the brand/intro deck variant: an
   intro / admin / overview deck (not derived from a lecture note) may be deliberately STATIC,
   and the lead may ask for no transitions. The per-click rule is for teaching CONTENT, where
   progressive reveal aids comprehension; on an overview slide a static layout is not a bug,
   and an animation-check ratio near 1.0 is EXPECTED there.

6. At most one big formula per slide, built up term by term. Use a chain of \only<n> that each
   REPLACES the previous, with \underbrace{...}_{\text{name}} naming each term as it lands.
   Never dump a multi-line derivation onto one slide.

7. Engine matches the fonts. The standard light theme compiles with plain pdflatex. Only the
   explicit-request dark Fira variant needs LuaLaTeX.

8. Dash-free RENDERED output. No prose em dash or en dash construct in any .tex; the only
   allowed double hyphen is a TikZ line segment between two coordinates. Verify the PDF, not
   just the source.

9. Verify by rendering and eyeballing, then publish. Compile, dash-check the PDF, run the style
   critic that renders ALL pages to PNG, then deploy.

10. Words before operator notation for manager audiences. No argmax (and no similar operator
    shorthand) on a slide for a non-mathematical audience: say "keep the call with the largest
    value" in words. Symbols the source notes define and gloss (pi-star, Q-star, gamma) are
    fine.
```

(Requirement 8 is verbatim except that the two dash-producing LaTeX constructs are named in words
rather than typed, because typing them is blocked by the hook.)

### 3.2 Engine

- **Light theme (the default): plain `pdflatex`,** compiled twice for the nav bar and section
  toc: `pdflatex <deck>.tex && pdflatex <deck>.tex`, run from the slides directory.
- **Dark Fira variant (only on explicit request): LuaLaTeX, never pdflatex or xelatex.**
  `luaotfload` finds the TeX-tree-installed Fira fonts reliably; `pdflatex` has no `fontspec` and
  no Fira, and `xelatex`'s fontconfig path may miss a `texmf`-installed Fira. Verbatim:

```text
If a Fira build cannot find the font, the fix is the engine, not the preamble.
```

### 3.3 The light, projection-first theme

"**The load-bearing lesson, learned in front of a real projector: dark themes do not project.**
Light-on-dark slides wash out in a lit lecture hall, so the default is LIGHT Metropolis: a white
background with near-black text. The default font is **Libertinus**, an elegant old-style book
serif whose matching Libertinus Math puts text and formulas in one voice (chosen by the lead over
Fira, CM Bright, and a field of sans alternatives)."

```latex
\usepackage[T1]{fontenc}
\usepackage{libertinus}   % Libertinus Serif + Biolinum + matching Libertinus Math
\usefonttheme{serif}      % body, headings, and math all in the serif
\usetheme{metropolis}
```

A sans course may use `lmodern` with `\usefonttheme[onlymath]{serif}`; "do not pick a designer
webfont (Fira and the like were rejected)". Three mandatory fixes, all already in
`templates/beamer-preamble.tex`:

0. **White background, dark text.** `\setbeamercolor{normal text}{fg=black!87, bg=white}`.
1. **Frametitle as a pale panel.**
   `\setbeamercolor{frametitle}{fg=black!88, bg=panel}` and the same for `frametitle right`,
   where `panel` is `black!8`.
2. **Keep the muted color dark enough.** `\colorlet{muted}{black!55}`, called "the legible
   floor". "Lighter grays wash out under projection. Do not raise it above `black!55` toward
   white."

The accent palette is deep sky blue `accent`, dark amber `accent2`, dark green `good`, dark rose
`bad`, plus a `panel` slightly darker than the bg. (The `good`/`bad` values were later superseded
by the Okabe-Ito pair, section 3.7 below, and the shipped template carries the Okabe-Ito values.)
Retune hues per course but keep the structure: one primary accent for emphasis (`\alert`,
progress bar, separators), a second for secondary highlights, green/rose for success/failure
states, box fills as soft tints. "Style **every** TikZ element through the shared `fg`/`muted`
colors and the `edge` / `nodebox` / `treenode` / `good fill` / `bad fill` / `acc fill` styles,
never with hardcoded colors in a deck."

**Dark "fancy dimmer" variant: screen-only, explicit request only.** Two mandatory fixes if used:
override the default LIGHT frametitle band that Metropolis dark still ships
(`fg=white!95!black, bg=panel` with a dark panel), and keep `muted` at `white!66!black` or
LIGHTER (`white!48!black` made captions nearly invisible). "Never pick dark silently; projection
is the default reality of a lecture."

### 3.4 The Modern Editorial style (applies to ANY deck, lectures included)

"The Modern Editorial design system is a STYLE, not a deck type." It runs in two modes:

- **Lecture mode** (a deck distilled from a lecture note): keep the projection-first LIGHT theme
  and the per-click teaching animations (hard rule 5 still holds, "an editorial lecture deck is
  NOT static"), and ADD the editorial polish: the Biolinum display font, one brand color, the
  eyebrow plus rule frametitle, the brand stripe and footer, big-number section pages, and the
  unified flow kit. Use a CLEAN editorial title page (wordmark, big title, brand rule, small
  square motif), NOT the photo hero.
- **Brand / intro mode** (a participant-facing intro, admin or overview deck): may additionally
  be STATIC, use the photo hero, and be synthesized from prior intro decks plus authoritative
  facts.

Reach for editorial when the ask is "intro slides", "admin slides", "set the tone / give an
overview", "make it look designed / corporate / it is bland", or "give this lecture deck more
style". Extracted from `admin/intro-deck/`; the reusable preamble is
`templates/editorial-preamble.tex`, "a CUSTOM theme kept in the deck's OWN dir; it is not the
shared lecture preamble."

**Brand / intro mode specifics.** Source is the prior intro decks plus course facts; EXTRACT and
reuse the real images out of the old decks (`pdfimages`) instead of leaving placeholders. "Facts
are anchored, like numbers are": anchor every date, deadline and structural fact on the
AUTHORITATIVE source (the participant-facing structure doc, the planning spreadsheet), and never
on a stale repo README or docx. Static is fine; do not fight a "fewer transitions" request.
Typical arc: About us, the big picture / what is X, the journey / overview, what you build,
administration, questions.

**The design levers, all pdflatex-safe:**

```text
- Display vs body font contrast. Libertinus serif body + Biolinum sans (\sffamily with the
  libertinus package, free, no fontspec) for titles and structure. This ONE change does the
  most for "designed".
- One brand color + one accent, used everywhere (FDS used ETH blue #215CAF + dark amber).
  Unify the DIAGRAM fills to the brand so nothing looks ad hoc.
- Frametitle = an uppercase section EYEBROW + the title + a short accent RULE, a thin brand
  LEFT STRIPE on every slide (\setbeamertemplate{background}), and a branded FOOTER (wordmark
  left, page right).
  [NB: the later "never write in ALL CAPS" rule retires the word "uppercase" here; the built
  decks use a title-case eyebrow.]
- Big-number SECTION PAGES: \AtBeginSection[]{\begin{frame}[plain]
  \usebeamertemplate{section page}\end{frame}} with a giant ghosted \insertsectionnumber and a
  per-section ICON.
- Section ICONS from fontawesome5 (pdflatex-native), keyed by number.
- A HERO title page: the institutional photo full-bleed under a left-to-right brand SCRIM,
  keeping the wordmark; or, with no photo, a wordmark + a small square motif.
- A UNIFIED diagram kit: one tonal flow language, flowdim (neutral) to flowbox (light) to
  flowstrong (solid) plus flowarrow, on EVERY box-and-arrow slide, and concentric tonal boxes
  for a nesting figure. Pick ONE node-style set and use it everywhere so diagrams cohere.
- Image treatment: hairline-FRAME every photo (\framedimg); DUOTONE a set of mismatched photos
  to the brand color so they read as one set. A schedule reads better as a horizontal TIMELINE
  RIBBON (colored blocks + group brackets) than as a date list.
```

### 3.5 Lecture decks: concrete example, dry factual titles

"A lecture deck should TEACH through a concrete worked EXAMPLE (real numbers from the spec): the
recipe / coffee / coins running objects. Reuse those objects so the deck coheres, and present
each operation on real numbers before generalizing." Then the hard rule, verbatim:

```text
BUT titles and prose must be DRY, FACTUAL, ACADEMIC, never poetic (Carlos, hard rule,
2026-06-25). "This is a lecture." Section and slide titles name the thing: "The matrix-vector
product", "Building arrays", "Matrices as transformations", NOT "The one picture: a machine
that turns amounts into totals" or "The spine: amounts in, a table of rates, totals out".
DROP purple-prose taglines and closing question lines (he deleted "almost every array bug is a
shape mismatch in disguise"). Keep the worked example; cut the poetry. The earlier "open every
section with a vivid STORY plus a question" guidance is RETIRED in favour of this: concrete
example yes, romantic framing/titles no.
```

### 3.6 No closing punchline

Verbatim, the whole rule:

```text
### No closing punchline. A frame ends on its final reveal

No big centred line in the brand colour, ever. If a closing thought is real content, it
is the last ordinary bullet, in body text.
```

Companion rule, **section dividers** (Carlos, 2026-08-11: "the section slides have subtitles. I
want them gone."), verbatim:

```text
A section page is an icon, "Section N", the section title, and the amber rule. No subtitle, no
running question, no tagline underneath. The one-line italic question ("Why can we not just
look at every option?") is the same poetic register as a punchline, one level up.
```

And the provenance of that bug, which is the reusable lesson: it came from copying an older
deck's preamble wholesale. `weekend-00-reintroduction/numpy-linalg/slides/beamer-preamble.tex`
defines a "running question" mechanism (`\cursub` / `\sectionsub` plus a `\cursub` line in the
`section page` template) and every deck told to "copy the preamble from the newest deck" inherits
it silently. `weekend-05-rag-research/carlos-lectures/reranking/slides/beamer-preamble.tex` does
not have it and is the better one to copy. Verbatim: "**When you inherit a preamble, diff its
`section page` and `title page` templates against what this skill prescribes, and strip anything
extra before writing a single frame.** The chrome you copy is chrome you are shipping."

### 3.7 No red/green. Ever. (accessibility rule, not a taste rule)

"Carlos, 2026-08-11: 'red and green balls are a no go.' Roughly 1 in 12 men has some red/green
colour vision deficiency, so in any lecture room somebody cannot read a red-versus-green
contrast. This is not negotiable and does not depend on the deck."

```latex
\definecolor{good}{HTML}{0072B2}   % blue: a win, the option we pick
\definecolor{bad}{HTML}{D55E00}    % vermillion: a loss, a blunder
```

- **Need a third level?** Use plain `ink` for the neutral middle rather than inventing a hue.
  Blue / black / vermillion stays readable for everyone.
- **`good` is now blue, and so is the ETH-blue brand `accent`.** Where the two would share an
  overlay they read as one colour, so make the neutral element `ink` or `muted` there. Real cases
  this bit: interval bars drawn in `accent` with the pick in `good` (bars became `ink`), and a
  neutral tinted cell in `accent` next to a winning cell in `good` (neutral became grey).
- **The colour pair is the answer. Do NOT also swap the shape.** Carlos, 2026-08-11: "I
  understand we should be colour blind friendly, but not to that extreme. Just use balls, don't
  use different shapes." A redundant shape channel must never fight the object being drawn: an
  urn holds balls, so every ball is a circle and only the colour differs. "Reach for shape only
  where the marks are already abstract (scatter points, legend keys in a dense chart) and the
  picture does not depend on them all looking alike."
- Amber `accent2` (`#B45309`) is chrome only (eyebrow, rules). Keep it off the good/bad axis or
  it competes with vermillion.

### 3.8 Capitalisation rules

**Every bullet, caption and box label starts with a CAPITAL letter.** Verbatim:

```text
Carlos, 2026-08-12: lowercase openings "look unprofessional". No exceptions to judge:
capitalise anything in \item, \convnote, \runparams, \srcline, a prose \onslide, and any
labelled diagram box. Bare arrow annotations ("one shot", "and again") stay lowercase, and
notation keeps its real case ($w$, c3, exf4); rephrase if a line would open with one.
```

**Never write in ALL CAPS (taste rule).** Verbatim:

```text
Carlos: "writing everything in capital shows lack of style, lack of taste." In the editorial
preamble, the footer wordmark, the frametitle eyebrow (\insertsection), the section-page label
("Section N"), the title-page institute, and any column/row headers are title case, not
uppercase. Remove every \MakeTextUppercase and literal-uppercase string. (This retires the old
"\MakeUppercase trips expl3 on the title page" gotcha: do not uppercase at all.) Sign lecture
decks with the lead's name (\author{Carlos Cotrini}).
```

### 3.9 Matrix products: Falk's scheme

Whenever a matrix-vector or matrix-matrix product is displayed (from Carlos's hand drawing,
IMG_7372), lay it out so the axes visibly align:

- **A** at the bottom left.
- the second operand (**x** or **X**) STACKED ABOVE THE RESULT: a column vector above `y`; for a
  matrix, X sits directly above Y, sharing Y's columns.
- the result (**y** or **Y**) to the RIGHT of A, below the operand, sharing A's rows.
- so `Y[i,j]` lands exactly where A's row i extended right meets X's column j extended down.
  Teach one cell by highlighting A's row i (green `rowfill`) against X's column j (amber
  `colfill`), giving the result cell (brand `cellfill`).
- LABEL the columns ONCE atop X and the rows ONCE on A's left; do NOT also draw Y's own headers
  (they collide with X's bottom row). A wide product fits a `\begin{columns}[c]` with the diagram
  left and bullets right.
- "**Never the counterintuitive `X @ A.T`.** Orient the batch as `(features, samples)` so `A @ X`
  works directly; introduce the transpose (`.T` swaps rows and columns, `(m,n)` to `(n,m)`) on
  its own short slide." (NB: this makes a linalg lecture's data matrix the transpose of the ML
  convention "one row per example"; a deliberate split.)
- Introduce the concrete matrix **A** with real numbers EARLY, and show the A for each example
  before its product.
- "These are the lecture default (editorial or Metropolis); apply whenever building or restyling
  a lecture deck, not only when asked."

### 3.10 Co-decide the design direction with rendered mockups

"When the ask is 'make it look better / corporate / it is bland', do NOT silently restyle. Build
2 to 3 distinct design SYSTEMS as REAL rendered title-and-content slides (not ASCII mockups),
send them, let the lead pick, then roll the winner out across all slides and iterate in
render-verified waves." (FDS offered A ETH-official photo hero, B modern editorial, C bold
keynote; the lead picked B.) "This is the design analog of 'co-decide pivotal picks'."

### 3.11 Design and theme gotchas (custom-template decks)

```text
- Metropolis [standout] ignores \setbeamercolor{standout}{bg=...} and renders DARK. For a
  colored full-bleed statement slide, wrap a [plain] frame:
  {\setbeamercolor{background canvas}{bg=BRAND}\begin{frame}[plain]\centering\color{white}
  \vfill ... \vfill\end{frame}}. And \setbeamercolor{normal text}{fg=white} inside that group
  does NOT recolor the body; use explicit \color{white}. (Shipped as \statementframe.)
- The footer \hbox needs a width or \hfill collapses and the page number jams against the
  wordmark: \hbox to\paperwidth{... \hfill ...}.
- A custom frametitle (eyebrow + rule) is TALLER than the pale-panel band, so it eats body
  height: dense slides that fit under the thin band can OVERFLOW after the theme swap.
  Re-render EVERY dense slide after a theme change, and trim the frametitle's top \vspace to
  reclaim a few mm.
- current page templates (the left stripe, the hero scrim, the giant section number) use
  remember picture and need TWO compiles to position.
- kpsewhich can report a theme NOT FOUND even when pdflatex \usetheme{...} compiles it fine
  (committed PDFs may have been built elsewhere). The smoke-test compile is the real
  availability check.
- Beamer frames default to vertical CENTER (c). A LONE trailing \vfill (no matching leading
  one) shoves the body to the TOP, so the slide looks top-heavy; a lone leading \vfill shoves
  it to the BOTTOM. To center deterministically use a PAIR (\vfill ... \vfill) or NO \vfill at
  all. (This was the one defect a polish-review workflow left behind.)
```

### 3.12 Reusing images from a source PDF

- Pull embedded rasters: `pdfimages -png -f P -l P source.pdf /tmp/x`; identify them with a
  labelled `montage`. Logos are often vector and are not extracted, so a content page yields just
  the photo you want.
- A SOFT-MASKED image extracts as an RGB plus a separate gray smask. ImageMagick
  `-compose CopyOpacity` uses IM "opacity" (INVERTED: white means transparent), so it can knock
  the subject out (an all-white file). For a subject on a PURE-BLACK background the robust fix is
  `convert in.png -fuzz 12% -fill white -opaque black out.png`.
- DUOTONE to the brand (to make a mismatched set cohere):
  `convert in.png -colorspace Gray -auto-level +level-colors '#16335f','#e9eff9' out.png`.
- A left-to-right brand SCRIM over a hero photo:
  `\tikzfading[name=scrim, left color=transparent!6, right color=transparent!94]` then
  `\fill[brand, path fading=scrim] (sw) rectangle (ne);` over the `\includegraphics`.

### 3.13 Publishing an ADDED deck to an existing Pages site

"When the site already exists, do NOT re-add the workflow." Add a `cp <deck>.pdf _site/<name>.pdf`
to the assemble step, add the deck's path to `on.push.paths`, and add a landing-page card. Verify
live by BYTE-MATCHING the served PDF to the local one (stronger than a 200 alone):

```bash
LOCAL=$(stat -f%z <deck>.pdf)
curl -o /dev/null -s -w '%{http_code} %{size_download}\n' "$SITE/<name>.pdf"   # 200, size == LOCAL
```

### 3.14 The five (six) animation patterns

`templates/deck-skeleton.tex` is a compilable skeleton demonstrating all five with placeholder
content; start from it.

**A. Diagram assembled piece by piece.** "Hide each element until its click so the relation builds
in front of the room. The frame ENDS on its final diagram reveal; it never gets a closing line."

```latex
\node[nodebox, visible on=<1->] (a) {};
\node[nodebox, visible on=<2->] (b) {};
\draw[edge, visible on=<3->] (a) to (b);
```

(The skill's third line uses the TikZ line-segment operator; it is written here as `to`, which is
equivalent TikZ, because that operator cannot be typed under the hook.)

**B. `[<+->]` bullet reveal with a live diagram.** Each bullet on its own click; a labelled detail
in the diagram appears in sync.

```latex
\begin{itemize}[<+->]
  \item First point
  \item \textbf{Contrast}: second point
\end{itemize}
% in the tikzpicture:
\only<2->{\node[text=muted] at (1,-0.05) {detail};}
```

**C. One formula, built term by term.** "A chain of `\only<n>` that each replaces the previous.
The trailing `%` after each `\only` suppresses a stray space so the formula does not jump
horizontally between clicks."

```latex
\only<1>{\Large $\mathrm{SCORE}(x) = \bar V(x)$}%
\only<2>{\Large $\mathrm{SCORE}(x) = \underbrace{\bar V(x)}_{\text{exploit}}$}%
\only<3->{\Large $\mathrm{SCORE}(x) = \underbrace{\bar V(x)}_{\text{exploit}}
    + \underbrace{w\sqrt{\dfrac{\ln N}{n(x)}}}_{\text{explore}}$}
```

**D. A multi-step diagram (phases).** ONE fixed diagram; layer each phase with `\only<n>` on
TikZ, synchronized to a `\begin{description}` whose items use `\item<n->`.

```latex
\only<1>{\draw[edge, accent, line width=1.4pt] (r) to (m);}       % step 1 highlight
\only<2->{\node[treenode, good fill, below=9mm of m] (leaf) {};}  % step 2 adds a node
\item<1->[\alert{1 step}] A few words
\item<2->[\alert{2 step}] A few words
```

**E. A worked example with REAL numbers, two columns.** `\begin{columns}` with the figure on one
side and `[<+->]` facts on the other; build the figure click by click with `\only`. "Every number
must match the source spec exactly." "The frame ends when the last fact lands. There is no
closing line."

**F. Reveal a diagram piece WITHOUT reflowing the rest (the no-shift rule).** An
`\only<n->{\node...}` inside a `tikzpicture` adds the node to the bounding box only from overlay
n on, so the picture's SIZE changes between clicks and `\centering` re-centers it: the WHOLE
diagram jumps every time a piece appears. "That is disruptive and is a BUG."

```latex
% WRONG (the diagram re-centers when y appears):
\only<2->{\node[ycell] at (5,0){339};}
% RIGHT (space reserved on overlay 1, y just fades in, nothing else moves):
\node[ycell, visible on=<2->] at (5,0){339};
```

`visible on=<n->` (from `\usetikzlibrary{overlay-beamer-styles}`) works on a node, a `\draw` and
a `\fill`. "Because every element is PLACED on every overlay, the bounding box is constant and a
revealed piece never shifts its neighbours." Fallback if `\only` must be kept: a fixed
`\useasboundingbox (min) rectangle (max);` as the FIRST line of the tikzpicture, sized to the
terminal overlay. "Prefer `visible on`." The same settle hits any block whose reveal carries
`\vfill` glue: use `\onslide<n->{...}`, which reserves the slot on every overlay.

### 3.15 TikZ label collisions (the recurring bug)

"This is the bug that bit the LATS build most often, and the one the style critic exists to
catch. It is background-independent: it bit again, three times, when the RL deck switched fonts
(changed text metrics shift every label)." The failure mode: "Captions placed `below=Nmm of
<node>` land on top of other labels, or run through other nodes. ... It compiles clean and looks
fine in the source. It is only visible when you render the page to PNG and look."

```text
- Prefer placing a caption where there is clearly empty canvas, not mechanically `below` of its
  node.
- For per-click captions on the same node, use \only<n>{...} so only one shows at a time (two
  captions stacked under one node is a classic collision).
- For an action arrow with a label (a rollout, a transition), aim the arrow at empty space and
  label the arrow tip, e.g. ... ++(0.9,-1.1) node[right]{...}.
- When two bars/labels must coexist, draw both in ONE tikzpicture with explicit coordinates so
  a label can never collide with the frame edge or the other bar.
- Style every element through the shared styles; a node whose colors blend into the background
  is an invisibility bug.
- A label can be wider than the slot you imagined: a header wider than its column collides with
  its neighbour. Rotate it over its own column or widen the slot; never assume text fits.
- Align grouped objects on ONE shared axis; do not top-pin. Matrices of different row counts
  pinned at the same TOP coordinate stagger, and the operators between them float a row too
  high. Center every member of the group, and the operators, on a single axis.
- A matrix and its operand / result vectors must align CELL FOR CELL. In a y = A x figure, the
  input vector x sits with each entry directly aligned to the matrix COLUMN it weights, and the
  output vector y with each entry directly aligned to the matrix ROW it comes from, drawn from
  ONE shared coordinate system (same cell size, same row and column lines), never positioned
  independently. If x or y floats half a cell off, the "row dotted with x" and "column weighted
  by x" intuition the figure exists to convey breaks. This is the most common alignment bug in
  a linear-algebra deck: render every matrix-times-vector slide and confirm the operands line
  up before shipping.
- LABEL what every ROW and every COLUMN of a matrix MEANS, and keep those labels across the
  whole sequence of slides that use that matrix. A bare grid of numbers teaches nothing. Put
  the column headers (what each column IS: oats, peanut butter, whey, banana) above the
  columns, rotated (anchor=south west, rotate=30) when they are wider than a cell, and the row
  labels (what each row IS: kcal, protein, fat) to the left of the rows. Label the operand and
  result vectors too (scoops x, totals y). A reader must be able to read off the picture alone
  what each number is a rate OF and a total OF.
- Never draw an arrow between two anchors that can coincide: an edge from (a.east) to (b.west)
  where b is right=0pt of a is ZERO-LENGTH and renders a stray arrowhead on the shared border.
  Use spanning anchors (a.north east to b.north east) or give the arrow real length.
- Check the TERMINAL overlay page of each frame (every piece revealed): a piece shown by one
  \only<n> often lands on a piece from another overlay, a collision that exists on no single
  earlier click.
```

"You will not catch these by reading the source. The render-all-pages style critic catches them,
but ONLY if it renders high enough: a 16:9 slide at 130 DPI is about 820 px wide and a label
kissing a node is sub-visible. Render the collision-prone (terminal-overlay) pages at 250 to 300
DPI and read them one at a time (Verification 4b; `templates/slide-figure-audit.workflow.py`).
Budget for one audit pass to surface a handful, then fix and re-render."

### 3.16 The dash rule, and how it is verified on the RENDERED PDF

"Passing the hook is necessary but NOT sufficient: the real goal is dash-free RENDERED output."

- In LaTeX, a triple-hyphen run renders an em dash and a prose double-hyphen run renders an en
  dash, "even though both are plain ASCII and sail past the byte hook. NEVER use them in prose.
  Use a comma, colon, parentheses, or the word 'to'. The ONLY allowed double hyphen is a TikZ
  line segment between two coordinates."
- In HTML, never use the named dash entities or their numeric forms; use a comma, "to",
  parentheses, or a middot.
- "A subtle hook gotcha: even writing the literal entity strings inside an HTML comment (to say
  'do not use them') trips the hook, because it scans rendered output. Name them in words
  instead. The same trap applies in shell: write the grep below with the codepoint (`\x{2014}`),
  never with a pasted dash, or the hook rejects your own SKILL/script file."

**The verification commands (the point of the section):**

```bash
pdftotext <deck>.pdf - | grep -cP '\x{2014}'   # em dashes in rendered output: must be 0
pdftotext <deck>.pdf - | grep -cP '\x{2013}'   # en dashes: must be 0
grep -nE -e '---|[^-]--[^-]' <deck>.tex        # prose dashes in source; eyeball each hit
```

The third line in the skill uses the bare shell end-of-options separator before the pattern;
`-e` is written here instead because a whitespace-flanked double hyphen cannot be saved to a file
under the hook. The two are equivalent. "The `grep` over source will also flag legitimate TikZ
line segments; eyeball each hit and confirm it is a line segment and not prose."

### 3.17 The animation check, and the no-shift check

"The overlay-expanded PDF has one page per overlay step, so its page count should be **much
larger** than the number of `frame`s. A frame that shows everything at once contributes only one
page and is an un-animated bug."

```bash
FRAMES=$(grep -c '\\begin{frame}' <deck>.tex)
PAGES=$(pdfinfo <deck>.pdf | awk '/^Pages:/{print $2}')
echo "frames=$FRAMES  overlay-pages=$PAGES"   # expect PAGES much greater than FRAMES
```

**Calibration:** the real LATS decks each have **13 frames** expanding to **60** (`mcts`) and
**76** (`lats`) PDF pages: roughly 4 to 6 overlay steps per frame. "If your ratio is near 1.0,
you forgot to animate. Render the suspect frame's pages and confirm each click adds exactly one
piece."

**The consecutive-overlay no-shift check.** "A high overlay ratio proves pieces appear, but NOT
that the diagram stays still. Render two CONSECUTIVE overlays of each animated figure (the first
overlay and the terminal one) and compare: a fixed element (the matrix, an axis, an early node)
must sit at the EXACT same pixel position on both. If it moved, the figure is reflowing as pieces
appear (see Pattern F); switch that figure's `\only` reveals to `visible on=<n->`. A square
appearing must never nudge the rest of the diagram."

### 3.18 Parallel-agent fan-out and the smoke test

The shape: **OWN-THE-LINCHPIN, then PARALLEL BUILD, then VERIFY-WITH-CRITIQUE.** "Scout and spec
inline yourself; delegate gathering and per-deck building to parallel agents; keep the canonical
example, the theme/preamble, the voice, and the verification single-threaded."

**Phase 0 (sequential, you): smoke-test the linchpin.** Author `beamer-preamble.tex`, compile a
tiny 2-slide test deck against it with the deck engine, render both pages to PNG, and EYEBALL
them before fanning out. "A broken preamble fanned out in parallel wastes all the parallel work.
(In the LATS session the slide theme WAS smoke-tested and it paid off; the notes preamble was NOT
pre-tested and shipped a broken indicator glyph a human caught later. Smoke-test the linchpin.)"
The skill ships the `_smoketest.tex` body inline: a tikzpicture with `acc fill` / `good fill` /
`bad fill` nodes joined by an `edge` and a `dimedge`, an `\onslide<2->` line of muted footnotesize
text, and a second frame with a two-step `\only` formula; then
`pdflatex -interaction=nonstopmode _smoketest.tex` and `pdftoppm -png -r 130`. "Then `Read`
`/tmp/smoke-*.png`. Check: pale panel frametitle, legible muted text, tinted nodes with dark
borders, the formula building in two steps. `_smoketest.*` is gitignored."

**Phase 1 (deck agents, parallel):** one agent per source lecture note, each building one deck
that inherits the shared preamble. "Bundle by source note, not by slide; a deck is a coherent
voice and should not be split across agents."

**Phase 2 (verify with critique, you):** compile all decks, run the dash check and the animation
check, then dispatch ONE style-critic agent that renders ALL pages of ALL decks to PNG and reads
them for collisions, invisible glyphs and off-slide clipping. Fix centrally. For dense diagrams
add the per-diagram high-DPI audit. Then publish.

**Deck-agent prompt template, verbatim (bracketed fields to fill):**

```text
Build the slide deck [DECK-FILE].tex from the lecture note [NOTE-PATH], in the light,
projection-first Metropolis style with the Libertinus serif font. Write it to
[SLIDES-DIR]/[DECK-FILE].tex.

Inherit the shared theme. First line after \documentclass[aspectratio=169]{beamer} is
\input{beamer-preamble}. Do NOT redefine colors, TikZ styles, or the theme; they live in
beamer-preamble.tex in the same directory. Available styles: edge, dimedge, nodebox,
accentbox, treenode, gridcell, good fill, bad fill, acc fill; colors accent, accent2, good,
bad, panel, fg, muted.

Engine. Plain pdflatex, twice, from [SLIDES-DIR] so \input resolves. (Only the
explicit-request dark Fira variant uses LuaLaTeX.)

Structure. One \section per section of [NOTE-PATH], in the same order. Mirror the note; do not
invent a narrative.

Deck principles (hard rules).
- Minimal text: a few words per slide, no paragraphs, at most 3 to 4 short bullets, a few
  words each, each starting with a capital.
- A TikZ diagram on essentially every content slide, styled with the shared styles.
- Every piece on its own click: [<+->] on lists, \only<n->/\onslide<n-> on TikZ and formula
  terms.
- A frame ends on its final reveal. Never close a frame with a big centered line in the brand
  colour. If a closing thought is real content, make it the last ordinary bullet, in body text.
- Section dividers carry the icon, "Section N", the title and the rule. No subtitle, no running
  question underneath. If the preamble you inherited defines \sectionsub / \cursub, strip it.
- At most ONE big formula per slide, built term by term with a chain of \only<n> and
  \underbrace{...}_{\text{name}}.
- Place TikZ labels where there is empty canvas; never stack two captions under one node; aim
  labelled arrows at empty space. (Label collisions are the recurring bug.)
- NO prose em-dash or en-dash constructs; the only allowed double hyphen is a TikZ line
  segment.
- Words before operator notation: no argmax on any slide; selections are said in words ("keep
  the call with the largest value").

Numbers. Every value, every worked-example state, must come verbatim from [SPEC-PATH] (the
source-of-truth spec the notes also cite). Do not invent or round numbers.

Verify before reporting done. Compile clean; run the animation check (overlay pages must be
much greater than frame count); pdftotext ... | grep -cP the two Unicode dash codepoints (must
be 0); render 2 to 3 representative pages to PNG with pdftoppm and READ them to confirm the
pale panel frametitle, legible muted text, and no label collisions.

Output: the single [DECK-FILE].tex plus its compiled [DECK-FILE].pdf.
```

### 3.19 Single source of truth for numbers, and co-deciding pivotal picks

"Every number on a slide must trace to the same source the lecture notes use." In the LATS build
a small RUNNABLE reference implementation (`reference_mcts.py`) pinned the canonical worked
example, a spec file (`lecture-notes/example-spec.md`) quoted its REAL printed output, and every
artifact (notes, slides, notebook, site) cited the SAME numbers. "Bake in-file assertions in the
reference so drift fails loudly (the LATS reference asserts the grid is reachable, so a
sealed/dead example can never ship)." And: "For a deck: read the numbers from the spec, not from
memory; if the deck states a value the notes do not, it is either wrong or the spec is
incomplete. Do not 'improve' a number to make a slide cleaner."

"When a phase produces a fork the downstream artifacts build on, present the curated options plus
a recommendation and PAUSE for the lead. ... For slides specifically, the pivotal picks are:
which worked example anchors the deck, and the accent palette if it departs from the default.
Don't pick silently."

### 3.20 Publishing to GitHub Pages

"**No LaTeX runs in CI:** the PDFs are compiled locally and committed (they are the readable
deliverable), and the workflow only gathers files into `_site` and deploys." Steps: commit the
pre-compiled PDFs and gitignore the aux files; write `site/index.html` from
`templates/landing-index.html` (a mobile-first dark landing page whose cards link to each PDF,
dash-free including entities); add `.github/workflows/deploy-pages.yml` from the template with
`on.push.paths` PATH-FILTERED to the deliverables so unrelated commits do not redeploy (the job
copies them into `_site`, runs `touch _site/.nojekyll`, then `configure-pages` /
`upload-pages-artifact` / `deploy-pages`); commit and push.

```bash
gh run list --limit 5            # a NEWLY-ADDED workflow can 404 on a name-filtered query
gh run watch <run-id> --exit-status
SITE="https://<org>.github.io/<repo>"
curl -o /dev/null -s -w '%{http_code}\n'                 "$SITE/"
curl -o /dev/null -s -w '%{http_code} %{content_type}\n' "$SITE/<deck>.pdf"
```

"A `200` plus `application/pdf` on a deck URL is the proof the deploy worked. A `200` on `/` with
the landing page is the proof the site is up. Don't report 'published' off the workflow's green
check alone; curl the live URLs."

**Note for BMAI HS26:** the FDD root `CLAUDE.md` says this repo's own Pages site is dead and that
the official site is the sibling `FDD-Page` repo. The BMAI course has its own publishing story
that is undocumented in FDD; do not copy FDD's `weekends.ts` steps blindly.

### 3.21 Verification, in the skill's own order

```text
1. Author beamer-preamble.tex; smoke-test it (2-slide deck, render to PNG, READ it).
2. Build each deck (one per note), inheriting the preamble.
3. Compile each deck clean with the deck engine, plain pdflatex (twice).
4. Dash-check each rendered PDF (both codepoint greps must print 0).
5. Animation-check each deck (overlay pages much greater than frame count).
6. Style critic: render ALL pages of ALL decks to PNG and READ them; fix collisions / invisible
   text / clipping centrally.
   - Per-diagram high-DPI audit: render each collision-prone (terminal-overlay) page at 250 to
     300 DPI and READ it alone; 130 DPI is too coarse to see a caption grazing a node. Use
     templates/slide-figure-audit.workflow.py for a deck with dense diagrams.
7. Commit the pre-compiled PDFs; gitignore LaTeX aux files.
8. Write site/index.html (dash-free) and add the path-filtered deploy-pages.yml.
9. Commit + push; watch the run (gh run list, then gh run watch <id> --exit-status).
10. Verify LIVE with curl (200 on /; 200 + application/pdf on a deck URL).

Step 6, actually looking at the rendered pages, is what makes the rest work. Don't skip it.
```

What the compile step proves, verbatim:

```text
Exit 0 is necessary, not sufficient. It does NOT catch invisible glyphs, label collisions,
off-slide clipping, or an un-animated frame.
```

The style critic and high-DPI crop commands:

```bash
pdftoppm -png -r 130 <deck>.pdf /tmp/<deck>_page
# then Read /tmp/<deck>_page-*.png  (a screenshot you do not look at is not verification)

pdftoppm -png -singlefile -r 300 -f <PAGE> -l <PAGE> <deck>.pdf /tmp/slideN
# then Read /tmp/slideN.png; only for an unusually dense diagram add -x <X> -y <Y> -W <W> -H <H>
```

"Resolution gotcha: keep BOTH dimensions under 2000 px. A full 16:9 slide at `-r 300` is about
1890 x 1063 (safe); a 4:3 slide is about 1510 x 1130 (safe); push DPI higher only on a crop."
The loop per page is render, read, and if awkward make a **POSITIONING-ONLY** fix (never a
number, label text, or an overlay `<n->` spec), rebuild with the deck engine twice, re-render,
re-read, until clean. Shipped as `templates/slide-figure-audit.workflow.py`: diagnose per page in
parallel, then ONE serial apply-and-rebuild agent (the deck is edited serially so parallel edits
never conflict), then verify per page in parallel, looping until clean.

### 3.22 Things to never do (the FULL list)

```text
- Build dark for a lecture. Dark themes wash out on real projectors; dark is screen-only and
  explicit-request-only. Default to light.
- Compile the dark Fira variant with pdflatex or xelatex. No Fira / wrong rendering /
  fontconfig miss; that variant is LuaLaTeX only.
- Redefine the theme inside a deck. Colors and TikZ styles live in beamer-preamble.tex; \input
  it, don't fork it.
- Leave the frametitle unstyled. Set \setbeamercolor{frametitle}{fg=black!88, bg=panel} (and
  frametitle right); on the dark variant, override its default LIGHT bar the same way with a
  dark panel.
- Let muted drift toward the background. Light theme: keep it black!55 or darker (lighter grays
  wash out under a projector). Dark variant: keep it white!66!black or lighter.
- Write a paragraph or a bullet wall on a slide. A few words; a diagram does the work.
- Show everything on the first click. Every piece gets its own overlay ([<+->], \only<n->). An
  overlay-page-count near the frame count is the symptom.
- Let a diagram REFLOW as pieces appear. Wrapping a tikz node in \only<n-> grows the bounding
  box on click n, so \centering re-centers and the whole figure jumps. Reserve the space on
  every overlay with visible on=<n-> (Pattern F; the consecutive-overlay no-shift check).
- Close a frame with a big centered line in the brand colour. Carlos deleted fourteen by hand
  from the Weekend 5 deck, then three more from Weekend 6.
- Put a subtitle or a running question on a section divider. The divider is icon, "Section N",
  title, rule. Nothing else.
- Copy an older deck's preamble without diffing it against the template here. Older preambles
  carry retired macros and chrome, which is how they keep re-entering decks that never asked
  for them.
- Delete a closing line without renumbering the overlays. It usually consumed the frame's last
  click, so removing it leaves a trailing overlay that reveals nothing.
- Ship a bare grid of numbers with no row / column labels. Every matrix and vector marks what
  each row and each column MEANS (kcal/protein/fat down the rows, oats/PB/whey/banana across
  the columns), kept consistent across the whole sequence of slides that use it.
- Put more than one big formula on a slide, or dump a multi-line derivation. One formula, built
  term by term.
- Place a caption mechanically below of its node without checking the render. It lands on
  another label or runs through a node. Render and look.
- Run the style critic at 130 DPI and call it done. A 16:9 slide at 130 DPI is only about
  820 px wide; a caption grazing a node is sub-visible. Render the collision-prone
  (terminal-overlay) pages at 250 to 300 DPI and read them one at a time.
- Leave the other awkward-graphics traps unchecked: a label wider than its slot, a group
  top-pinned instead of centered on a shared axis, an arrow between coincident right=0pt
  anchors (a stray zero-length arrowhead), or an \only<n> piece overlapping a piece from
  another overlay on the terminal page. Each compiles clean; only rendering the page high
  catches it.
- Use hardcoded node colors instead of the shared styles. Every element goes through fg/muted
  and the named styles, whichever theme is active.
- Use prose em-dash or en-dash constructs in LaTeX, or dash entities in HTML. The only allowed
  double hyphen is a TikZ line segment. Verify the RENDERED output, not the bytes.
- Trust the byte hook as proof of a dash-free deck. The hyphen runs are ASCII and pass the hook
  but render as dashes. pdftotext | grep -P the PDF for the codepoints.
- Invent or round a number on a slide. Every value traces to the source spec the notes cite.
- Put argmax (or similar operator notation) on a manager-facing slide. Selections are said in
  words: "keep the call with the largest value".
- Report "compiled" or "published" without rendering / curling. Exit 0 and a green CI check do
  not prove the slides look right or the URL serves. Render and read; curl the live URL.
- Run LaTeX in CI. PDFs are compiled locally and committed; the workflow only gathers and
  deploys.
- Commit LaTeX aux files. Gitignore *.aux *.log *.nav *.snm *.toc *.out *.vrb *.synctex.gz
  *.fls *.fdb_latexmk and the _smoketest.* scratch; DO commit the .pdf deliverables.
- Query a freshly-added workflow with gh run list --workflow=<file>. It can 404 for a few
  seconds (registration lag). Query gh run list (all) instead.
- Smoke-skip the preamble. A broken linchpin fanned out in parallel wastes all the parallel
  decks. Compile + render + eyeball a 2-slide test first.
- Split one deck across agents. A deck is one coherent voice; one agent per source note.
- Silently restyle a deck when the ask is the VAGUE "make it look better / it is bland". When
  the lead NAMES the direction (e.g. "use the editorial style"), that IS the pick: apply it
  directly and verify by rendering, no mockups. Otherwise co-decide the DIRECTION first.
- Animate an intro / admin / overview deck just to satisfy the per-click rule. That rule is for
  teaching content; an overview deck may be static, and "fewer transitions" is a legitimate ask.
- Trust kpsewhich for theme availability. The smoke-test compile is the real check.
- Use metropolis [standout] for a colored full-bleed slide. It ignores the standout bg and
  renders dark; wrap a [plain] frame with background canvas set to the brand color + explicit
  \color{white}.
```

### 3.23 Recipe for a slide build

```text
0. Read the source lecture notes and the numbers spec. The deck is the note distilled; the
   section order and every number come from there. If there is a runnable reference
   implementation pinning the worked example, read its REAL output, not your memory of it.
1. Author the shared preamble from templates/beamer-preamble.tex (light, Libertinus serif).
   Retune the accent palette per course if desired; keep the mandatory fixes.
2. Smoke-test the preamble (Phase 0): compile the 2-slide _smoketest.tex, render to PNG, READ
   it. Fix the theme here, before any deck exists.
3. Co-decide the pivotal picks with the lead if there is a fork (which worked example anchors
   the deck; a non-default palette). Present options + a recommendation; pause.
4. Build one deck per source note from templates/deck-skeleton.tex. Direct (1 to 2 notes) or
   fan out (3+ notes) using the deck-agent prompt template.
5. Verify each deck: compile twice, dash-check the PDF, animation-check.
6. Style critic (Phase 2): render ALL pages of ALL decks to PNG and READ them. For dense
   diagrams run the per-diagram high-DPI audit.
7. Commit the pre-compiled PDFs; gitignore the aux files. Solo on main, small logical commits,
   end each message with the co-author trailer from the repo CLAUDE.md.
8. Publish: site/index.html (dash-free) from the landing template; path-filtered
   deploy-pages.yml; commit + push.
9. Watch + verify live.
10. Iterate on feedback. Common asks: fix a collision a viewer caught, add a slide for a thin
    note section, retune an accent for projector contrast, add a deck for a new note (one
    agent, inherits the same preamble).
```

---

## 4. `lecture-notes` (309 lines), briefly

`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-notes/SKILL.md`

Builds a self-contained LaTeX lecture-notes set **plus** an interactive companion site **plus** a
runnable notebook, all anchored on one worked example whose numbers are pinned by a runnable
reference implementation. Exemplar `agentic-research/LATS/`. It inherits `RESEARCH_CONVENTIONS.md`
as binding, and says of the anchor paper: "do not re-source it from the web, read the vendored
PDF."

**Orchestration shape (the durable rule):** "OWN-THE-LINCHPIN, then PARALLEL BUILD, then
VERIFY-WITH-CRITIQUE. Scout and spec inline yourself; delegate gathering and per-artifact
building to parallel agents; keep the canonical example, the theme/preamble, the bar/winner
decisions, the voice, and the verification **single-threaded**." Two workflow templates encode it:
`templates/gather-brainstorm.workflow.py` (Phase 1) and `templates/spec-build-verify.workflow.py`
(Phases 2 to 4).

**Hard requirements:** the folder layout (`lecture-notes/` with `preamble.tex`, `notes.tex`,
committed `notes.pdf`, `example-spec.md`, `sources-digest.md`, `.gitignore`; a notebook dir with
`reference-impl.py`, `_build_notebook.py`, committed `.ipynb`; a site dir with a single-file
offline `index.html`; an example dir with `brainstorm.md`); one worked example co-decided with
the lead; single source of truth for numbers; semantic validity asserted at import;
self-contained for the audience ("Define every symbol on first use; expand every dense paper
passage. Err long, not terse"); dash-free RENDERED output; verify by rendering and reading.

**The headline lesson, semantic validity:** "The first LATS grid passed **every** compile, number,
and dash check and was still wrong: it had **unreachable cells** (a dead region the agent could
never stand on), caught only when a human eyeballed the rendered diagram. Numeric consistency
(the notes, site, and notebook all agreeing) does not catch a structurally invalid example." The
guard is an import-time assertion of the structural invariant, with the skill's own worked list:

```text
- a graph / gridworld: every special node reachable, no dead region;
- a probability example: the distribution sums to 1, no negative mass;
- a linear-algebra example: the matrix has the rank / shape the notes claim;
- a search tree: no orphan node, the claimed optimum is actually reachable.
```

"Then, separately, also render the example's diagram and have the critic agent LOOK at it. The
assert is the cheap guard; the human/critic eyeballing the picture is the backstop."

**The mathds trap:** `amssymb` has no blackboard-bold digit 1, so `\mathbb{1}` renders a junk
glyph (it looks like a logic / turnstile symbol). Use `\mathds{1}` via `\usepackage{dsfont}`.
"More generally: **render the math and eyeball it.** A wrong glyph compiles cleanly and is
invisible to every numeric check; only looking at the PNG catches it."

**The shared preamble** (`templates/notes-preamble.tex`) provides in one `\input`-able block:
`dsfont`; `amsthm` theorem/lemma/proposition (plain, italic, shared counter) and
definition/example/remark (definition style, upright, shared counter); `tcolorbox` `[most]` with
an `examplebox` for the running example; `tikz` with shared tree styles (`treenode`, `rootnode`,
`termnode`, `ghost`, `treeedge`, `ghostedge`); an `xcolor` calm low-saturation palette
(`calmblue`, `calmteal`, `calmsand`, `calmgray`, `calmbg`) that the companion site reuses as CSS
variables; and convenience macros for the key formulas typed ONCE. "Do not let a build agent
modify it after the smoke test."

**Figure hygiene (the awkward-graphics traps), all five:** a label wider or taller than its slot
(rotate it with `anchor=south west, rotate=35`, or widen the slot; never assume text fits); a
label at an absolute coordinate grazing a border (give every label an explicit gap such as
`above=1.5mm of <node>`); connectors routed through unrelated content (leave and enter via the
nearest FREE edge so a line never crosses a cell it does not reference); a group top-pinned
instead of centered on one shared axis (compute the half-cell offsets, do not eyeball them); an
arrow between coincident anchors (zero-length, renders a stray arrowhead). "The Weekend 0
NumPy/linalg notes shipped SIX such figures past the full-page critic."

**Verification:** reference impl runs and self-asserts (exit 0); preamble smoke test rendered and
read; notes compile twice; `pdftotext notes.pdf - | grep -cP '\x{2014}|\x{2013}'` must print 0;
render EVERY page and READ it; **4b, per-figure high-DPI audit**, cropping each figure tight at
200 DPI and reading it alone, because "the Read tool downsamples a letter page to about 1568 px,
so a figure a third of a page tall lands at about 500 px and a label grazing a border, a
connector clipping a cell, an off-center matrix, or a zero-length arrow are all sub-visible";
notebook executes via `jupyter nbconvert --execute`; cross-check numbers across notes, site and
notebook. Keep both crop dimensions under 2000 px (at `-r 200` the width is 1700 px; drop to
`-r 170` for a near-full-page band).

**Things to never do** includes, beyond the above: assuming numeric consistency implies a valid
example; using `\mathbb{1}`; fanning out the build before smoke-testing the preamble;
hand-writing `.ipynb` JSON (generate it with `nbformat` via a `_build_notebook.py`); letting a
build agent edit the shared preamble after the smoke test; forking the algorithm between notebook
and reference impl; letting any number live anywhere but the reference impl; shipping a paper
section at the paper's density; choosing the anchor example silently; verifying by compiling
alone; verifying figures by full-page render alone; committing LaTeX aux files or `__pycache__/`;
citing below the provenance bar or letting a subagent adjudicate the bar.

**Templates on disk** at `.claude/skills/lecture-notes/templates/`: `notes-preamble.tex`,
`reference-impl.py`, `example-spec.md`, `gitignore-template`, `figure-audit.workflow.py`,
`gather-brainstorm.workflow.py`, `spec-build-verify.workflow.py`.

**One operational detail worth carrying over:** for vendoring a paper, "WebFetch to arxiv is
blocked, but `curl` works", followed always by a title verification
(`pdftotext -f 1 -l 1 papers/<file>.pdf - | head -3`), because "a past download was silently
truncated".

---

## 5. Repo-level conventions

### 5.1 `CLAUDE.md` (repo root)

Frames the repo: candidate applied projects for "From Data to Decisions" (ETH, summer 2026, lead
Dr. Carlos Cotrini; audience MAS AID / CAS DML / CAS AIS professionals with ML/AI fundamentals
plus Python/PyTorch, "**no** assumed distributed-systems or security depth"), eight weekends
numbered 0 to 7, pairs pick four projects. A Layout section maps every directory. Then:

- "**Git: solo on `main`.** The lead works alone: commit directly to `main`, small logical
  commits, **no PRs/branches**. End commit messages with
  `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`."
  (The trailer names an older model; the BMAI environment's own trailer instruction supersedes
  the model name.)
- "No grading rubrics or draft solutions in this repo: project ideas only."
- "**Publish lecture decks on the OFFICIAL course site.**" This repo went private on 2026-08-26
  and serves nothing; its old Pages site 404s and the deploy workflow is disabled. Five numbered
  steps follow for `../FDD-Page` (copy the PDF into `public/slides/` as
  `we<N>-<topic>-slides.pdf`, with annotated variants taking the `-annotated` suffix and an
  interactive page getting its own folder under `public/`; add it to the matching weekend in
  `src/data/weekends.ts` using bare relative URLs; keep Colab links pointing at the PUBLIC
  `eth-fdd-fs26/FDD-WE<N>-public` repos; run `npm run build`, "its only correctness gate", then
  commit and push after `git pull --rebase` because it is shared with the other TAs; verify live
  by curling the new URL and checking the byte count matches the local file).

### 5.2 `README.md`

The human entry point: what the repo is for, the eight-weekend schedule table with links, how the
weekends feed each other, how to contribute, and the constraints every project must satisfy:
4 to 8 hours of pair work end to end ("If the scaffolding alone takes 4 hours, the project is too
big"); parallelisable ("two people can collaborate without one watching the other type");
industrial framing; measurable success ("every project ships with a number ... Demos without
metrics don't make the cut"); commercial APIs allowed and GPUs pooled; office hours as a backstop
that no project may require for first-order success. The industrial-framing rule, verbatim:

```text
Industrial framing: the "why care" must come from a business/operations/regulatory context,
not an academic benchmark.
```

### 5.3 `CONTRIBUTING.md`

How to add a project (open the weekend file, copy the `PROJECT_TEMPLATE.md` block, add it under
`## Project candidates`, commit directly to `main`, "Keep commits small and logical: one project,
or one coherent theme, per commit"). What makes a good project: 4 to 8 h end to end; "a
measurable success criterion, a number, not a screenshot"; an industrial scenario with "a clear
answer to 'why would a company pay someone to do this?'"; it drills the weekend's actual content;
and a pair can collaborate on it "without one person watching the other type". Reasons to reject
or move: more than one work-evening of dataset wrangling before the interesting work starts; a
model or dataset that is paywalled, region-locked, or under a licence that blocks classroom use;
no clean baseline to compare against; it belongs to a different weekend's syllabus. The file ends
with a "what goes where" map whose last line is, verbatim:

```text
Anything teaching-team-internal (grading rubrics, draft solutions) keep it out of this repo;
it's for project ideas, not answer keys.
```

### 5.4 `RESEARCH_CONVENTIONS.md` (binding on dossiers)

1. **The provenance bar.** Cite only work accepted at NeurIPS / ICLR / ICML / AAAI / ACL-main /
   EMNLP-main / NAACL-main / COLM / SIGIR / CVPR / USENIX Security / ISCA / CIKM-main /
   COLING-main / Nature, 2024 to 2026, OR an arXiv preprint whose senior author is at a clearly
   top-tier lab (Microsoft Research, Google Research / DeepMind, Meta FAIR, Allen AI, OpenAI,
   Anthropic, Berkeley, Stanford, MIT, CMU, UW). Excluded: Findings tracks, IJCNLP, OpenReview
   without a venue stamp, arXiv-only work from unattributed labs. A venue may be added if the
   topic demands it (the RAG dossier added AAAI mid-stream), but the addition must be justified
   in `bibliography.md` and `CLAUDE.md`, never smuggled in. "**The bar is a judgment call:
   adjudicate it centrally.** If you fan work out to subagents, they return *evidence* (venue +
   year, or arXiv-id + senior author + lab); **you** make the cite/no-cite ruling." Verify venue
   claims against the source rather than aggregator blogs.
2. **Project constraints**: 4 to 8 h of pair work, industrial framing, measurable success,
   parallelisable, commercial APIs allowed with pooled GPUs, connection-aware (flag the
   cross-weekend handoffs in both directions).
3. **Currency policy**: the 2024 to 2025 trunk plus an early-2026 sharpening (AAAI 2026 in
   January, ICLR 2026). Verbatim:

```text
A bounded gap on the very latest 2026 work is acceptable, by design, not a debt. The teaching
team wants a stable, well-sourced map a pair can build against, not the bleeding edge.
Summer-2026 venues (ICML / ACL / COLM 2026) land after the relevant weekend's shortlist
freezes, out of scope. Do not re-open a currency sweep unless a human asks. The real open work
is verification and internal consistency within the window, not freshness.
```

4. **House style of a dossier's files**: `research-trends.md` (one one-page brief per current:
   the shift, canonical bar-clearing work, "why it matters for the workshop", "pitfall to flag";
   every current cites at least 2 bar-clearing papers); `project-proposals.md` (in
   `PROJECT_TEMPLATE.md` format, additive to the trunk projects, every proposal citing at least
   1; **cap at ten**, "if you find a better candidate, drop the weakest; don't grow the list");
   `bibliography.md` grouped by venue with the bar note at the top; `papers/` with a README
   mapping each file to its role and the naming `<slug>_<arxiv-id>.pdf`; `README.md` (one
   screen); `CLAUDE.md` (orientation plus a live "status / open tasks" section); optional
   deep-dive subfolders. Promotion discipline: recommend at most two frontier candidates for
   promotion and flag the promotion rather than moving one silently. Source discipline: trends
   cite at least 2, proposals at least 1, and zero citations makes it an opinion that belongs in
   a different file.
5. **Operational know-how**: `WebFetch` to arxiv may be blocked but `curl` works
   (`curl -sL -o <dossier>/papers/<slug>_<arxiv-id>.pdf https://arxiv.org/pdf/<id>`), and
   "**Always title-verify** after download: `pdftotext -f 1 -l 1 <file> - | head -3`, a past
   download was silently truncated". Citing in trends or the bibliography needs no local PDF;
   vendor PDFs for papers you will feature, deep-dive, or anchor a project on. Git solo on main.
   "**Delegate the gathering, own the judgment.** Fan out the breadth-first landscape sweep and
   per-paper deep reads to parallel subagents; keep the bar adjudication, venue verification,
   dedup, and all prose single-threaded (one author = consistent voice, no duplicate projects,
   enforced caps)."

### 5.5 `PROJECT_TEMPLATE.md`

A one-screen block with fixed headings: Pitch (one sentence, "framed as a sentence a participant
would say to a colleague"), Industrial scenario (two to four sentences, "Avoid academic
framings"), What participants build (specific artefacts, with an explicit good/bad example: "a
RAG pipeline" is too vague, "a FastAPI endpoint that takes a question and returns an answer +
cited chunks, with a Ragas eval script that prints precision/recall/faithfulness" is the right
level), Success metrics (always at least one), Effort estimate (setup, core, evaluation,
write-up; total 4 to 8 h), Skills exercised ("If a project doesn't drill at least three, it
probably belongs to a different weekend"), Dependencies, Connections to other weekends, Stretch
goals ("should not be required for grading, they are signals of curiosity"), Pitfalls / what
makes this project fail ("The teaching team will see these come up in office hours; documenting
them up front saves time"), Suggested datasets / models / tools.

### 5.6 `narrative-arc.md`

An ASCII dependency diagram of W0 to W7, then concrete project-to-project handoffs per weekend
pair ("Pairs do not need to take *the same* upstream project. They need to be able to plug a
deliverable in the same shape"), what the four-project rule implies (three named tracks: RAG,
Agent, Modelling), and a closing "What we want to avoid" list. It is the model for how a BMAI
weekend-to-weekend dependency doc should read.

### 5.7 How `CLAUDE.md` files are written in this repo (the pattern to copy)

**First, a correction to the brief.** The claim that every directory carries its own `CLAUDE.md`
is false for the FDD repo. There are exactly **14** across the whole repo:

```text
./CLAUDE.md
./admin/CLAUDE.md
./admin/cas_planning/CLAUDE.md
./mas-aid-workshop-sce-approval/CLAUDE.md
./weekend-05-rag-research/CLAUDE.md
./weekend-05-rag-research/foundations-review/CLAUDE.md
./weekend-05-rag-research/reasoning-aware-rag-deep-dive/CLAUDE.md
./weekend-06-agentic-research/CLAUDE.md
./weekend-06-agentic-research/LATS/CLAUDE.md
./weekend-06-agentic-research/PRM/CLAUDE.md
./weekend-06-agentic-research/carlos-lectures/CLAUDE.md
./weekend-06-agentic-research/carlos-lectures/agent_q/CLAUDE.md
./weekend-06-agentic-research/carlos-lectures/intro_agents/CLAUDE.md
./weekend-06-agentic-research/carlos-lectures/mcts/CLAUDE.md
```

Built artifacts such as `grasshopper/`, `bandits/`, `lunar-lander-game/` and
`mandatory-weekends-opening/` carry a `README.md` instead. The convention is: **a `CLAUDE.md`
where an agent needs orientation and a contract; a `README.md` where a human needs to know what
the artifact is and how to run it.** Several directories have both.

**The anatomy of an FDD `CLAUDE.md`,** read off
`weekend-06-agentic-research/carlos-lectures/CLAUDE.md` and `.../mcts/CLAUDE.md`:

1. **Title line naming the path**, e.g. `# CLAUDE.md, weekend-06-agentic-research/carlos-lectures/`
   or `# CLAUDE.md, repo root ("From Data to Decisions" project brainstorm)`.
2. **One paragraph saying what the folder is and how it relates to its siblings**, with relative
   markdown links to those siblings.
3. **A dated status blockquote**: "> **Status (2026-08-10): ground laid, nothing built.**" It
   states what exists, what does not, and how the work will be split ("each will be built in its
   **own separate Claude conversation**. This file is the shared contract those four
   conversations must agree on so they do not collide").
4. **A table mapping folders to slots** (or files to roles), with real times and owners, followed
   by the constraints that fall out of the table, each marked binding.
5. **The live schedule, with its source, and how to read it**: the canonical plan is a
   link-shared Google Sheet, never the repo docs, read with `curl` against the gviz CSV endpoint
   (with the documented reason WebFetch fails: the export route 307-redirects to a signed URL
   WebFetch cannot follow, and WebFetch summarises instead of returning the CSV), plus which
   column is which weekend, plus "it is a working sheet and it moves; re-read it before trusting
   the table above".
6. **"Staleness to flag, not to fix silently"**: a named inconsistency, who to raise it with, and
   an explicit instruction not to invent content to make a stale label true.
7. **Audience**, restated in the lead's own quality bar: "intuition first, at the level of a good
   introductory MIT or Stanford lecture. Simple, never dumbed down. Easiest idea first. A formula
   only after the intuition is built." Plus brand hygiene: the participant-facing brand is "From
   Data to Solutions", the internal repo brand stays "From Data to Decisions", "Do not 'fix'
   either."
8. **An anti-collision contract**: a table of Owns / Must not teach, one row per sibling folder,
   because parallel conversations build them. "Each lecture should open by *naming* what the
   previous one established, in one sentence, and then move on. Recap costs minutes none of
   these four slots has."
9. **Open decisions for the lead**, explicitly marked as not settleable inside a build
   conversation, each with a recommendation and the reason it is pivotal.
10. **Binding conventions**: which skills to use ("They encode the house patterns; do not
    re-derive them"), the deck style plus "the single most likely mistake", the slide rules, ASCII
    punctuation, numbers discipline, notebooks generated and never hand-edited, "Publishing is
    part of 'done'" as two required steps, and git.
11. **A reusable-inventory table**: built asset, where it lives, what it feeds, plus an honest
    warning about scale. Verbatim:

```text
The existing material is sized for far more than 30 minutes. 60-page and 76-page decks and
17-to-19-page note sets were built without a slot constraint. Cutting to a 30-minute spine is
the main design work in each folder, not an afterthought.
```

12. **Papers**: how the symlinked library works and the vendoring recipe.

The per-lecture `CLAUDE.md` adds two more moves worth stealing: **dated amendments struck through
in place** (`~~It now opens on the prompting ladder~~ **Reversed 2026-08-20**: ...`) rather than
rewritten history, and a **"Two knowing departures from `../CLAUDE.md`"** section, where a
deliberate violation of the parent contract is recorded with its date, its authoriser and its
bound ("This lecture no longer uses it; the others still do. Not resolved, flagged").

---

## 6. The built philosophical cold open

`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/`

Contents: `README.md`, `COLD-OPEN-CANDIDATES.md`, `slides/slides.tex`,
`slides/beamer-preamble.tex`, `slides/slides.pdf`, `slides/slides-annotated.pdf`,
`slides/.gitignore` (aux only), and `slides/img/` with five plates plus `IMAGE-SOURCES.txt`.
There is **no** `CLAUDE.md` here.

### 6.1 The grammar, as numbered rules (verbatim from COLD-OPEN-CANDIDATES.md section 0)

```text
1. Original language on top, English gloss under it, source line in muted small type.
2. One public domain plate, framed, captioned in one line.
3. [STRUCK OUT] The lecturer's own closing sentence under an amber rule.
   WRONG, corrected 2026-08-13. This was read off the Weekend 1 and Weekend 2 intro decks,
   which are from July and predate the rule. .claude/skills/lecture-slides/SKILL.md says the
   opposite and has since 2026-08-11: "No closing punchline. A frame ends on its final reveal.
   No big centred line in the brand colour, ever. If a closing thought is real content, it is
   the last ordinary bullet, in body text." The lecturer's own sentence is still the good part;
   it is set as ordinary body text at the foot of the frame, not centred, not alerted, with no
   amber rule. Invoke the skill before building a deck instead of reverse-engineering the
   grammar from decks on disk, and diff any inherited preamble against it (SKILL.md line 137
   warns about exactly this: the Weekend 1 preamble defines \takeaway, and copying it wholesale
   drags the punchline back in).
4. A mapping table if the text has a list in it. The table is a whole frame and carries no
   prose.
5. No plot summary. A candidate that needs "there was an Egyptian god called Theuth" before
   anything lands is dead. This killed Plato's Phaedrus and Cicero's Simonides in the W5 sweep.
6. Rights are not automatic. The original is usually public domain; the translation usually is
   not. Switzerland is 70 years post mortem auctoris. Never write "public domain" next to a
   modern translation.
7. Dry, factual frame titles. The deck may be called "The Island of Truth"; the frames are
   called "A land of truth in a sea of illusion".
```

### 6.2 The four precedents the menu reviews

1. **Weekend 1, "The Island of Truth".** Kant, *Kritik der reinen Vernunft* A235/B294, German
   above, English gloss below, beside Friedrich's *Wanderer über dem Nebelmeer*, closing on one
   line in the lecturer's own voice under an amber rule: "To seek the truth is to know the fog
   for fog, and never chart land that is not there." Then two rulers (Kolmogorov, Shannon), then
   the formulas, then a numbered five-stop roadmap of the week.
   (`weekend-01-info-theory/carlos-lectures/intro-roadmap/slides/slides.tex`)
2. **Weekend 2 recycles it with the highlight moved.** Identical frame, identical sentence, but
   the alert jumps from *Nebelbank* to *manches bald wegschmelzende Eis neue Länder lügt*, and
   the closing line becomes "Weekend 1 was the fog. This weekend is the ice."
   (`weekend-02-explainability/carlos-lectures/intro-block/slides/sections/02-island-of-truth.tex`)
   "**This is the most distinctive move in the house style, and it has been used exactly once.**"
3. **The RL deck (sibling course, `git_ainit/rl-arcade`): a canonical text whose internal list IS
   the syllabus.** Three frames. Frame 1: Faust in his study translating the opening of John, and
   *logos* has no single match. Frame 2: Goethe's portrait beside the whole wavering passage,
   with Word, Thought and Act alerted. Frame 3 is nothing but a two-column table:

   | das Wort | week one: observing, LLMs |
   |---|---|
   | der Sinn | week two: thinking |
   | *die Kraft* | *the false summit: raw compute* (muted, deliberately not a week) |
   | die Tat | week three: acting, today |

   "**That third frame is the closest existing precedent to what is being asked for here**, and
   the muted row (a term the text offers and the course refuses) is the sharpest device in any of
   the four decks."
4. **The bandits/recsys deck (sibling course, polybox `CAS AINIT FS26/w2_slides`): one story that
   opens and closes.** Borges' *Funes the Memorious* as a full-page portrait epigraph, "To think
   is to forget differences, generalize, abstract.", at scene 2, returning at scene 27, with a
   one-paragraph thesis slide ("The promise") immediately after it. "One noun, the urn, carries
   all 90 minutes."

A fifth precedent is named in the same section and is a real alternative shape: **the W5 RAG
block's own opener, a chronological ribbon with no philosophy at all.** Four dated frames
(Alexandria c. 250 BCE through 1895), one museum plate each, a timeline along the bottom, and a
rule stated in the source comments: "deliberately NO mechanism and NO modern vocabulary."
(`weekend-05-rag-research/carlos-lectures/rag-foundations/slides/sections/00-history.tex`)

### 6.3 Provenance discipline

**Pinning.** The built README carries a provenance table with a Status column:

| Quotation | Locus | Status |
|---|---|---|
| *Alles Interesse meiner Vernunft (das spekulative sowohl, als das praktische) ...* and the three questions | KrV A805/B833 | **Pinned character for character** against the Project Gutenberg edition of the *Kritik der reinen Vernunft* (ebook 6343). The comma after *sowohl* and the modern *tun* are both as printed there. |
| *wenn ich nun tue, was ich soll, was darf ich alsdann hoffen?* | KrV A805/B833, Kant's own gloss on the third question, two paragraphs later | **Pinned** against the same source. |

The deck's own header comment repeats it: "EVERY QUOTATION HERE IS PINNED, character for
character, against the Project Gutenberg edition of the Kritik der reinen Vernunft (ebook 6343):
both the A805/B833 passage (note the comma after 'sowohl', and the modern 'tun') and Kant's own
gloss on the third question."

**Unverified material is cut rather than shipped.** The Jäsche fourth question was cut on
2026-08-13, and the README records why: "It was also the deck's one quotation never checked
against a primary scan, so cutting it removed the only outstanding provenance risk. If it is ever
restored, check the Akademie-Ausgabe first: sources differ on whether it reads *weil die drei
ersten Fragen sich auf die letzte beziehen* or *weil sich die drei ersten Fragen auf die letzte
beziehen*."

**The translation copyright trap.** "Translations are Carlos's own and are labelled so on the
slide. Kemp Smith (1929, d. 1958) is protected in Switzerland until 2028 and Guyer & Wood (1998)
outright, so neither is used." The candidates file states the general rule: Switzerland is 70
years post mortem auctoris; a short quotation with the translator named is fine under URG Art.
25; never write "public domain" beside a modern translation.

**Orthography is a decision, taken once.** The candidates file flags that the 1800 *Logik* prints
"Was soll ich thun?" with an h while the KrV prints *tun*: "Pick one convention and stay in it
across all three weekends: the same trap the Goethe pass flagged (Noth/Not, zwey/zwei)."

**`IMAGE-SOURCES.txt` convention.** One file per deck, in `slides/img/`, one block per image,
each block carrying: the filename, what the image is, the creator and the licence, the Commons
URL, where the file came from if copied from another deck, and any inherited problem stated as a
problem. The real file's three most instructive entries:

- `vitznauerstock.jpg`: "FkMohr, CC BY-SA 3.0 de. ... **NOTE, INHERITED**: this is CC BY-SA 3.0
  de, NOT public domain, and the Weekend 1 deck also carries it without a visible credit on the
  title frame. Attribution is required by the licence. Fix both decks together or neither; do not
  'fix' this one alone and leave the two title frames looking different."
- `friedrich-wanderer.jpg`: "Caspar David Friedrich, 'Wanderer above the Sea of Fog' (c.1817),
  Hamburger Kunsthalle. Public domain (d. 1840). ... Copied byte for byte from the Weekend 1 deck
  so the callback frame is identical."
- `kant.jpg`: "Public domain (Commons: 'Public domain'). Downloaded 2026-08-13 at 960px and
  **opened and inspected before use**. ... The slide caption says 'painter unknown' rather than
  naming Doebler, because the Doebler 1791 attribution belongs to a DIFFERENT portrait and the
  two are routinely confused. Do not 'correct' the caption to Doebler without re-checking the
  Commons file."

The fourth entry covers the four `par-*.png` plates copied from `admin/intro-deck/img/` and says
so plainly: "Provenance is whatever the intro deck recorded; they were not re-sourced here."

The recurring discipline behind all of these, stated in both candidate menus: **filenames lie;
open and inspect the file before promising it.** The W5 sweep found two Commons files whose names
promised one scene and delivered another.

### 6.4 The frame-by-frame argument of the built deck

The hinge, verbatim from the README:

```text
The hinge is the last click of frame 3. Kant asks his three questions in the first person,
about himself: was kann ich wissen. The weekends come from asking the same three questions of
the machine. Everything after that frame depends on that one substitution, which is why the
ich is alerted in the German, the closing line names the move, and frame 4 reprints the
questions with es.
```

(The README's own table numbers the frames 1 to 6 while that paragraph calls the Kant passage
"frame 3"; the file is internally inconsistent on numbering. The `.tex` has six frames.)

| # | Frame | Job |
|---|---|---|
| 1 | Title | The **same photograph** as the Weekend 1 title frame. Recognising it is free. |
| 2 | A land of truth in a sea of illusion | The Weekend 1 Kant/Friedrich frame on its **third** outing. W1 alerted the *Nebelbank*, W2 the *Eis*, both things in the sea that are not land; this alerts *das Land der Wahrheit*. Ends on "Weekend 1 was the fog. Weekend 2 was the ice. Now we go ashore." |
| 3 | Four paradigms in science | Lifted as is from `admin/intro-deck/`, the "What is AI?" section, with its four plates. Deliberately static, as it is there. Places machine learning on the map (epistemic and computing) between Kant's island and the course recap. |
| 4 | What the five weekends behind us did | The recap, and nothing else: five rows, no commentary, no closing line. Carlos wrote the third column himself (variance, biases, defending models, choosing the best next action). |
| 5 | All the interest of my reason | A805/B833, German above the gloss, Kant's portrait, one question per click, *ich* alerted. Ends on the hinge: "Kant asked these of himself. We will ask them of the machine." |
| 6 | The same three questions, asked for the AI | The mapping, now in *es* form, and the reading of the third question. Ends on Kant's own gloss in German. |

Craft details worth copying, from the `.tex` comments:

- The muting is doing argumentative work. On frame 2 the two already-visited clauses go MUTED and
  only the new one is alerted, "so the legend reads as a course map rather than as a quotation
  gloss".
- **"No punchlines."** The two closing thoughts in the deck (the Island of Truth line on frame 2
  and the hinge on frame 5) are ordinary body text at the foot of the frame: no centred
  brand-colour line, no amber rule, and `\takeaway` is deliberately left undefined in the
  preamble even though the Weekend 1 preamble it was copied from defines it. "The first build of
  this deck got that wrong by deriving the house grammar from the July intro decks instead of
  invoking the skill."
- A LaTeX layout note recorded where it bit: use `l` columns rather than `p{}` columns on the
  recap frame, "`p{}` is a `\parbox` and put the muted middle column a full line below the other
  two on every row. Nothing here needs to wrap at `\footnotesize`, so fixed-width gaps are both
  simpler and correctly aligned."
- The third row of the mapping is defended in a long comment, because it is the one that reads as
  a pun if left bare. Two things carry it, both on the frame: the transposition set up on the
  previous frame (asked of a machine, the third question becomes "what may this system BECOME,
  for what we spend", which is the scaling question stated plainly), and the verb Kant actually
  chose. Verbatim:

```text
He wrote DARF, not WERDE or KANN: not what will happen, but what one is ENTITLED to expect.
And he makes the entitlement conditional in his own gloss two paragraphs further down the same
page: "wenn ich nun tue, was ich soll, was darf ich alsdann hoffen?" That is the exact
epistemic status of a scaling law, an empirical warrant for an expectation and not a proof.
Do not cut the "darf, not werde" line: without it the row is a pun.
```

- The scaling-law sentence itself is spoken and never projected, because Carlos cut it from the
  slide; the README keeps it "because it is the reasoning the line on the slide depends on".
- Two weaker readings of the third question were considered and left unused, and the README says
  why: hope as the payoff question (*alles Hoffen geht auf Glückseligkeit*, which makes
  happiness-equals-ROI a cruder jump than *darf*), and hope as the limit question (Kant calls Q1
  *bloß spekulativ*, Q2 *bloß praktisch*, Q3 *praktisch und theoretisch zugleich*, which is true
  but makes W7 sound like a weekend about constraints rather than capability).
- An open cosmetic inconsistency is recorded rather than silently fixed: frame 4's title says
  *asked for the AI* while the hinge line says *of the machine*. "Harmonise if the vocabulary
  should be one or the other throughout."

### 6.5 The "recycle one frame with the alert moved" device

The README ships the paste-ready snippet. Verbatim:

```latex
% ==== Weekend 6, in front of the first block ====
\begin{frame}{The same three questions, asked of the machine}
  \vfill
  \centering
  {\large
  \renewcommand{\arraystretch}{2.0}%
  \begin{tabular}{r@{\enskip$\rightarrow$\enskip}l}
    {\color{muted}Was kann \textit{es} wissen?} & {\color{muted}Weekend 5: RAG}\\
    \alert{Was soll \textit{es} tun?}           & \alert{Weekend 6: Agentic AI}\\
    {\color{muted}Was darf \textit{es} hoffen?} & {\color{muted}Weekend 7: Large Scale AI}\\
  \end{tabular}}

  \vspace{6mm}
  {\footnotesize\hspace*{0.2cm}Weekend 5 was what it can know. This weekend is what it should do.}
\end{frame}
```

"For **Weekend 7**, the same frame with rows 1 and 2 muted, row 3 alerted, and the last line
*'And this weekend is what it may become.'* Weekend 7 is also the right place to restore the
*darf, not wird* line if the third row needs re-motivating on the day." And: "Nothing new is
needed in `img/`; only the `\alert` moves." "Both closing lines are plain body text, per the
no-punchline rule above. Do not put them back under an amber rule."

The economics, from the candidates file: "**W5** gets all five frames. **W6** opens on F4 again
with row 2 alerted. One frame. **W7** opens on F4 again with row 3 alerted. One frame. Total
cost: five frames once, one frame twice. Same economics as the fog/ice move."

The README also records an optional extra: "If W6 wants a second frame, the Friedrich /
*Land der Wahrheit* frame from commit `ad35a9b` still works there unchanged, and it is the only
place left in the course where the Weekend 1 fog and Weekend 2 ice thread can be closed."

### 6.6 The inherited preamble, and the comment that must survive

`mandatory-weekends-opening/slides/beamer-preamble.tex` is "Copied verbatim from
weekend-01-info-theory/carlos-lectures/intro-roadmap so that the Kant callback frame renders
identically to the Weekend 1 original. Only `\eyebrowtext` differs. Do not restyle: the point of
this deck is that it looks like the deck the room already saw twice."

It is the Modern Editorial theme: `accent` `#215CAF` (ETH blue), `accent2` `#B45309` (amber),
`good` `#047857`, `bad` `#BE123C`, `panel` `black!8`, `ink` `black!88`, `muted` `black!55`;
Libertinus with `\usefonttheme{serif}`; a brand left stripe via `\setbeamertemplate{background}`;
a frametitle of title-case eyebrow, Biolinum title and a 2.4cm amber rule; a branded footer
("From Data to Solutions" left, frame number right); `\framedimg` and `\framedimgh` helpers; the
`flowdim` / `flowbox` / `flowstrong` / `flowarrow` kit; `numdisc`; and the two `tikzfading`
scrims used by the hero title frame. Note it defines `good`/`bad` as green/rose rather than the
Okabe-Ito pair, because this deck draws no good/bad axis.

The last block of that file is the one to carry into any BMAI deck built from an inherited
preamble:

```latex
% DELIBERATELY NOT DEFINED: \takeaway. The Weekend 1 preamble this file was copied
% from defines a centred amber-ruled pull-quote, and it predates the rule. Carlos,
% 2026-08-11: the big centred blue punchline is out. A frame ends on its final
% reveal, and a closing thought that is real content is the last ordinary line, in
% body text. See .claude/skills/lecture-slides/SKILL.md, "No closing punchline".
% This is the trap SKILL.md line 137 warns about: inherit a preamble, diff it
% against the skill, strip the extras BEFORE writing a frame.
```

Also note the deck's own header comment block, which is a template worth copying wholesale: it
records the theme and its provenance, the engine and build command (`pdflatex slides.tex` twice),
when and where the deck is shown, the recycling plan with a pointer to the snippets, a dated
HISTORY of what was built, cut and restored **with the recovery commit hash** (`ad35a9b`), a
"HOUSE RULES OBEYED" list (dry factual frame titles, no all caps, original language above the
English gloss, one public-domain plate per quotation frame, ASCII punctuation only, no closing
punchlines), and the pinning statement for every quotation.

---

## 7. The shape of a `COLD-OPEN-CANDIDATES.md`

Three exist: the W5 one (376 lines, 2026-08-10), the W6 one (556 lines, 2026-08-12), and the
mandatory-block one (2026-08-13). They converge on one document shape.

### 7.1 The HTML comment header, always first

Every file opens with an HTML comment stating provenance and status. W5, verbatim:

```text
<!-- Generated 2026-08-10 by a 14-agent propose/curate/verify/synthesize workflow.
     29 candidates proposed across 5 traditions, 7 shortlisted, all 7 adversarially
     verified against primary sources. 2 confirmed, 5 plausible, 0 fabricated.
     Nothing here is decided: this is the menu Carlos chooses from. -->
```

W6 and the mandatory block use the same last sentence, cross-link the sibling files by relative
path, name the scope ("but for the four Weekend 6 lectures at once, because the strongest option
is a single story told in four beats"), and add: "What was actually verified for this pass is
marked. Everything else says so."

### 7.2 The decision stamp, added afterwards at the top

When Carlos decides, a blockquote is inserted directly under the H1, and the rest of the file is
left untouched. The mandatory-block file, verbatim:

```text
> DECIDED 2026-08-13. Carlos chose section 2, Kant's three questions, at full length as its own
> deck. Built and rendering in `slides/`; see `README.md`. Two things changed against what this
> file assumed: the "hope" objection in section 2 is answered by Kant's own gloss on the third
> question (wenn ich nun tue, was ich soll, was darf ich alsdann hoffen?), which was found in
> the primary text after this file was written and is now on frame 5; and the staging in section
> 7 is not resolved, because the RAG deck's cold open is five frames rather than four and its
> fifth frame consumes the other four. See the open question at the end of `README.md`.
>
> The rest of this file is left as written, including the options not taken.
```

So the stamp carries: the date, what was chosen, where it was built, **what changed against the
file's own assumptions**, what remains unresolved, and an explicit statement that the rejected
options are preserved.

### 7.3 The sections, in order

The three files share this spine (section numbers are the files' own):

- **0. What the house pattern actually is.** "Read off the built decks, not off memory." The
  precedents, each with its repo path, then **"The grammar, as rules"** as a numbered list.
- **1. The argument this opening has to carry (independent of which text wins).** Written first,
  with no philosophy in it: the recap in one sentence, the pivot in one sentence, the three
  weekends in three sentences, why in this order, and "the line to close the recap on" (there:
  "Weekends 1 to 4 were about a model. Weekends 5 to 7 are about a system.", with the comment
  "That sentence is doing most of the work. Everything below is a way of *earning* it."). W6's
  equivalent is "What a Weekend 6 cold open has to reflect", with a table of the four lectures,
  the idea each teaches, and whether anything is built, because "**This asymmetry decides the
  budget**": the empty lecture can afford three frames, a deck already cut to a dictated spine
  can afford one frame that displaces nothing.
- **2. Recommended: <the pick>.** The full case, including the reason it beats the field ("it
  executes the house recycling move a third time"), the mapping table, the staging, the recycling
  plan, the rights position, the verification status, and the strongest objections.
- **3 onward. The other candidates, ranked**, each in the same anatomy (section 7.4 below).
- **A comparison table** (W5): Candidate, Job, Honest frame cost, Verification verdict, and a
  "Pick this if ..." column.
- **How they compose** (W5): the recommended thread, where a candidate belongs later in the hour
  rather than at the front, and an explicit anti-pairing ("Do not compose Seneca with Otlet. Both
  do Job A on the same objection, in the same first ten minutes, and the second one to arrive
  will feel like the first one again"), plus "One piece worth salvaging regardless of what
  opens".
- **Recommendation**: one paragraph, naming the pick and the repairs it needs, with the repairs
  characterised as "a build instruction list, not a research debt".
- **What did not survive / Considered and rejected** (section 7.5 below).
- **Staging: the collision that has to be resolved** (the mandatory file, section 7): the real
  clock (a five-frame opener in front of an existing four-frame cold open is "roughly nine
  minutes before the first piece of RAG content, which is too much"), three resolutions in order
  of preference, and the timing reality that decides between them.
- **Verification debts / Verification status, honestly**: what was checked this pass and what was
  not, item by item, down to word order and orthography.
- **What is decided by whom** (mandatory file, section 8) or **Recommendation, and the question
  for Carlos** (W6, section 6): a short numbered list of the decisions only Carlos can make, with
  the dependencies between them spelled out ("Choosing Faust means W6 drops the Zauberlehrling
  thread; choosing Kant leaves W6 free").
- **Appendix: what the sweep itself missed** (W5): the curation agent's own account of the gaps,
  recorded verbatim, "because these are the gaps a second pass would fill".

### 7.4 How a single candidate is presented

Each candidate is an H3 with the **full bibliographic locus in the heading** (author, work,
edition, place, publisher, year, page, section), then, as bolded labelled paragraphs in a stable
order:

1. **The locus verification**, first: what it was checked against, what was corrected, and who
   independently confirms it. ("Verified against the page image of the Ghent University Library
   copy: printed folio 428, running head 'PROBLEMES EN GENERAL' ... Locus confirmed twice over.")
2. **Slide text (recommended form)**, as a blockquote, with the citation line exactly as it should
   appear on the slide, plus the original-language ornament, marked as verified or not, down to
   the codepoint where it matters ("note the narrow no-break space before the question mark,
   U+202F"). Textual traps are named here too ("The circulating French inserts a comma after
   'Ici' ... Do not let anyone 'fix' the slide by adding the comma").
3. **Rights.** Original versus translation, death dates, the Swiss term, what may be written on
   the slide, and what must never be written ("Do not write 'public domain' next to Rayward's
   wording").
4. **Pivot.** What the text buys, and which numbered section of the lecture it hands into.
5. **Job.** Which of the enumerated jobs (A, B) the candidate does, and how squarely.
6. **Staging.** The honest frame count and minute cost, then one bullet per frame, titled as the
   frame would be titled, saying what is on it, plus the cheaper cut if the minutes evaporate.
7. **Image.** The exact Commons or archive URL, the licence, the resolution, and the traps: files
   whose names promise the wrong scene, files that are CC BY-SA rather than public domain, and
   images that do not exist at all ("Köhler's Medizinal-Pflanzen contains **no** Ulmus plate: all
   318 files in the category were enumerated"). Also the asset warnings that would make a slide
   argue against itself (the Mondothèque drawing "depicts hypothesis B, the long-context
   position. Using it would make the slide argue against itself").
8. **The strongest objection.** Always last, always present, written against the candidate at
   full strength, including when it is fatal to the proposal's own headline claim. This is the
   most distinctive feature of the format: "Built as proposed, a participant who opens the free
   Wikisource page gets handed the counter-argument off the screen behind the lecturer."

### 7.5 How rejections are recorded

Rejections are never deleted; they are kept with the reason, in three tiers.

- **A "Considered and rejected" list** (mandatory file, section 6): one bullet each, reason
  stated, usually two reasons at once. ("Borges, *The Library of Babel*. ... Killed by two things
  at once: Borges d. 1986, so the Spanish is in copyright in Switzerland until end 2056 and every
  English translation with it, and Carlos already used Borges (*Funes*) as the opening of the
  bandits/recsys lecture in the sibling course." And, at the end: "Prometheus, Icarus, Babel.
  Every AI keynote since 2015.")
- **"What did not survive"** (W5, section 5), with the striking opening: "The formal rejection
  list came back empty: every candidate that reached verification had a real passage at a real
  locus. What died were sub-elements, earlier candidates absorbed into these seven, and a set of
  famous wordings that turned out to be popular manglings. Those last are the point of the
  exercise." Then three labelled sub-lists: **candidates superseded or absorbed** (each with the
  reason it was folded in and then cut), **wordings that turned out to be popular manglings**
  (the traps: a sentence universally attributed to Briet that is actually Buckland's; a Seneca
  rendering that is actually Nicholas Carr's and in copyright; a Putnam gloss he never wrote; a
  Swift wording that is post-1726 editorial), and **images that did not survive**.
- **A cut that is later reversed is recorded as such.** The built README's "What was cut, and
  where it went" names the recovery commit (`ad35a9b`), records that one cut frame was restored
  the same day at Carlos's request, and says where a cut line was moved to rather than letting it
  die ("Its closing line was the best sentence in the deck, so it moved onto frame 4 rather than
  dying with it").

### 7.6 The rules stated as rules in the menus (worth reusing verbatim)

- "Nothing here is decided: this is the menu Carlos chooses from."
- "Read off the built decks, not off memory."
- "**No plot summary.** A candidate that needs 'there was an Egyptian god called Theuth' before
  anything lands is dead."
- "**Rights are not automatic.** ... Never write 'public domain' next to a modern translation."
- "the W5 lesson that filenames lie": open and inspect an image before promising it.
- Two texts by the same author one week apart is too much of that author, and such choices are
  "mutually exclusive and the choice has to be made now".
- A candidate whose own diagram has to be retracted one slide later "is not the cheap opener it
  claims to be".
- Say the awkward thing out loud rather than hiding it: the W6 file's handling of the fact that
  its recommended source is a satire against credulity ("Say that out loud rather than hide it:
  it is the weekend's thesis delivered with charm instead of scolding ... and it costs one
  sentence").

---

## 8. Built assets in the FDD repo worth copying for BMAI Weekend 1

| Asset | Path | Why it matters here |
|---|---|---|
| Grasshopper viz (the exercise's own source) | `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/` | The BMAI slug `hs26-bmai-w1-gd-grasshopper` points at the deployed build of this. |
| The editorial preamble actually in use | `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/beamer-preamble.tex` | A working, house-conformant Modern Editorial preamble with the anti-punchline comment already in it. |
| Slide templates | `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/templates/` | `beamer-preamble.tex`, `editorial-preamble.tex`, `deck-skeleton.tex`, `deploy-pages.yml`, `landing-index.html`, `slide-figure-audit.workflow.py`. |
| Notes templates | `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-notes/templates/` | `notes-preamble.tex`, `reference-impl.py`, `example-spec.md`, `gitignore-template`, `figure-audit.workflow.py`, two orchestration workflow scripts. |
| The built cold open | `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/slides.tex` | Six frames of the grammar applied, with the reasoning in the comments. |

**Read the grasshopper carefully, because it deviates from the strict `course-viz` layout, and
the deviation is instructive.** It has `index.html`, `css/` (three files: `style.css` for theme
tokens and the shared class vocabulary, `game.css`, `explain.css`), `js/` (seven modules:
`theme.js`, `landscapes.js`, `localview.js`, `worldview.js`, `game.js`, `explain.js`, `main.js`),
`precompute/verify_landscapes.mjs`, and `vendor/` (d3, KaTeX with its font files). It has **no
`js/scenes/` directory and no `data/datasets.js`**: it is one continuous game plus an explanation
section rather than a scene deck, so the scene engine and hash routing do not apply. Instead it
has `?level=1..5` as "a real deep link for the lecturer" plus five `?test=` dev affordances
(`revealed`, `hints`, `played`, `committed`, `stuck`) and `?theme=dark`. Its light tokens match
the skill's palette exactly.

What it keeps, and what a BMAI viz must therefore also keep:

- The theme toggle with the `t` shortcut, advertised in the page footer.
- No inline colours in JS: "every fill and stroke routes through a token defined here."
- A fixed colour identity table written into the CSS header comment so nothing cross-talks
  (green is the grasshopper and a successful climb, amber is revealed truth, blue is the
  slope/gradient concept, purple is the trail, red is a miss).
- A `precompute/` verifier that "reads `js/landscapes.js` as the single source of truth,
  recomputes the peak, range, local maxima, maximum slope, par and demo sequences numerically,
  and asserts every pinned value plus the per-level invariants (the shelf really is flat, the
  two-hill trap really traps naive ascent, the second-best summit really is far enough below the
  best one for the 'you are on the summit' test to be unambiguous)."
- A README that names the one rule that matters in the trickiest module, under its own heading
  ("The one rule that matters in `localview.js`"): the vertical scale of the grasshopper's window
  is **fixed per level**, in J units per pixel, and the grasshopper always sits at the exact
  centre of the panel. "If it did auto-fit, a dead-flat shelf would look as steep as a cliff and
  levels 2 and 4 would stop teaching anything."

Its level table is also the model for how a Weekend 1 optimization viz should be structured:
"Each level exists to make one failure mode of gradient ascent unmissable", one row per level,
one lesson per row (one hill: the sign of the slope is the direction to go; the long shelf: a
near-zero slope still points the right way; two hills: ascent walks to the nearest summit; the
narrow summit: a step size that suited gentle ground overshoots and oscillates; rough ground: the
slope you measure is contaminated, the REINFORCE case).

---

## 9. Consequences, conflicts and gaps for BMAI HS26 Weekend 1

1. **The single-file `Minimum Lander Exploration.html` conflicts with `course-viz` hard
   requirement 1.** The skill's answer is unambiguous: the multi-file layout is a hard
   requirement, and the single-file form belongs to the sibling `teaching-viz` skill, which the
   FDD repo does not carry. The grasshopper shows the legitimate middle: a multi-file build whose
   `js/` modules are game modules rather than `js/scenes/sceneN.js`, with URL deep links and
   `?test=` hooks. Porting the lander into that shape keeps every rule; leaving it single-file
   breaks requirement 1 and forfeits the theme, palette and verification machinery.
2. **Hash routing is mandatory for click-step scene decks.** A game like the grasshopper
   satisfies the intent with `?level=N`. If a Weekend 1 viz is built as scenes, `#scene=N` is
   non-negotiable, and the `&run` and `?test=` flags go in from day 1.
3. **The dash rule and the AI-tells rule apply to the BMAI repo,** because both hooks are global
   (section 1). Any BMAI `CLAUDE.md`, README, `.tex` or `.html` written by an agent is scanned,
   and the rendered-output check (`pdftotext | grep -cP` for the two codepoints) is a separate
   obligation from passing the hook.
4. **The FDD publishing steps do not transfer.** The FDD root `CLAUDE.md` publishing block is
   about `FDD-Page`. BMAI HS26 has its own site and its own Code Expert pipeline, and the user's
   global CLAUDE.md points at the exam-authoring-toolkit for anything Moodle or Code Expert.
5. **The BMAI coding exercises are Colab notebooks**, per the BMAI brief, whereas FDD's
   `lecture-notes` skill builds notebooks with `nbformat` from a `_build_notebook.py`. The
   generated-never-hand-edited rule and the single-source-of-truth-for-numbers rule carry over
   unchanged; the delivery target does not.
6. **The commit trailer in FDD names an older model.** Use the trailer the BMAI environment
   specifies.
7. **The cold-open grammar is portable as is.** For a Weekend 1 opening, rules 1 to 7 in section
   6.1 plus the provenance discipline in section 6.3 are the whole written standard, and the
   `COLD-OPEN-CANDIDATES.md` shape in section 7 is how the choice gets presented to Carlos rather
   than made for him.

### What is absent (stated so no one invents it)

- **No `course-viz` templates directory exists.** Unlike the two LaTeX skills, `course-viz/` on
  disk contains only `SKILL.md`. There is no scaffold to copy; the reference repo it cites
  (`pca-kmeans-rf`, with `congress-story/`, `kmeans-deepdive/`, `movies-pca/`) is **not** in the
  FDD clone, so every path in its reference-implementation table is unresolvable locally. The
  nearest built substitutes present are `grasshopper/`, `bandits/` and `lunar-lander-game/`.
- **The skill gives no dark categorical hex values.** The values in section 2.4 come from the
  built grasshopper CSS and are labelled as such.
- **There is no `CLAUDE.md` in `mandatory-weekends-opening/`,** and none in `grasshopper/`; those
  directories carry a `README.md` only. The claim that every FDD directory carries a `CLAUDE.md`
  is false (section 5.7 lists all 14).
- **No skill or repo document defines a BMAI-specific cold open, and none defines a
  "philosophical opening" beyond the three `COLD-OPEN-CANDIDATES.md` files plus the built deck.**
  The grammar in section 6.1 is the whole of the written rule.
- **The mandatory-block README is internally inconsistent about frame numbering** (its prose says
  frame 3 for the Kant passage while its table says frame 5). Reported here, unresolved there.
- **No FDD document covers Google Colab, Code Expert, or the BMAI master schedule.** Those come
  from the BMAI side of the workflow.
- **The `teaching-viz` skill referenced by `course-viz` is not in the FDD repo.** A skill of that
  name is installed in this Claude session, scoped to a different course (Informatik II, D-MAVT);
  treat it as a different artifact until someone reads it.

