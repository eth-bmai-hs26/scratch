# Issue 1: The ruler and the loupe, two shared views

## Goal

Build the two drawing modules that scenes 2, 3 and 4 all need: `RulerView`, a linear ruler that
projects the two sides of the rectangle down as a bracket, and `Loupe`, a magnifier that keeps the
verdict physical after the mismatch between the two sides goes sub-pixel. Both are pure views with no
scene logic, in the shape `js/rectview.js` already sets. This issue blocks three of the four
remaining scenes, so it is the one to start with.

## Dependencies

None. Everything it needs exists: `window.Heron` (the mathematics), `window.DATA` (the pinned
numbers), and the class vocabulary at the foot of `css/style.css`.

## Context

Read `../CLAUDE.md` first, in particular the withholding contract and the colour identities.

`js/rectview.js` is the model to copy: it takes a host element and an options object, returns an
object with `setTheta`, `getTheta`, `setOptions` and `render`, draws only through CSS classes, and
locks its SVG box in both dimensions so that headless capture matches the browser.

**Why the ruler is linear, and why that is load-bearing.** On a logarithmic ruler the two sides
`theta` and `2026/theta` sit symmetrically about `sqrt(2026)`, so the answer would be the visible
midpoint of the bracket and the scene would hand over the very thing it is asking for. It would also
point at the geometric mean, which no participant can compute without the square root key they do not
have. On a linear ruler the target sits off centre (from `theta = 10` it sits at 18 percent of the
bracket) and the midpoint is the arithmetic mean, which is exactly one Heron step. **Do not add a log
option.**

**Why the loupe exists.** Between `theta = 10` and `theta = 44` the rectangle is visibly tall and the
verdict is free. From `theta = 45` onward the two sides differ by 0.0222 units, which at the pinned
1.6 px per unit is 0.036 px, and the requirement to keep the verdict physical would quietly lapse into
a printed minus sign. The loupe magnifies the corner where the two sides overshoot each other, with
the magnification printed at all times. The ladder is already computed and pinned in `DATA.loupe`:

| k | magnification | mismatch under it | the gap itself |
|---|---|---|---|
| 0 | 10^3 | 35.56 px | 2.222222e-2 |
| 1 | 10^6 | 4.39 px | 2.742807e-6 |
| 2 | 10^14 | 6.69 px | 4.178407e-14 |
| 3 | 10^30 | 15.52 px | 9.697100e-30 |
| 4 | 10^61 | 8.36 px | 5.222807e-61 |

The magnification exponent and the correct-digit count are the same number, and both double. That is
quadratic convergence turned into something the room watches.

This is a knowing departure from the fixed-scale rule that makes grasshopper's local view work
(`/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/js/localview.js`, header comment at line
5, "The scales are fixed for the whole level"). There the fixed scale is the lesson, because it makes
a flat shelf look flat. Here the collapse across scales is the lesson, so the scale change has to be
visible, participant driven, and labelled. Say so in the header comment of `js/loupe.js`.

## Deliverables

### 1. `js/rulerview.js`

Exposes `window.RulerView` with a `create(host, opts)` factory, matching the `RectView` shape.

Geometry, pinned as `var` constants at the head of the file the way `rectview.js` does:

```
W = 620            svg width, matching the CSS lock exactly
H = 130            svg height
PAD_L = 40         left padding
PAD_R = 40         right padding
AXIS_Y = 74        the ruler line
THETA_MIN = 10     the same closed domain as the rectangle
THETA_MAX = 202.6
```

A width `t` maps to `PAD_L + (t - THETA_MIN) / (THETA_MAX - THETA_MIN) * (W - PAD_L - PAD_R)`.

It draws, in this order:

1. The ruler line, class `axis-line`, with unlabelled ticks every 25 units, class `gridline`.
2. Two end labels at 10 and 202.6, class `axis-ink`. They mark the frame. Nothing between them is
   ever marked.
3. The bracket: a bar from `lo` to `hi` at `AXIS_Y`, class `bracket-bar`, with a serif at each end,
   class `bracket-end`.
4. The two marks: the width at `theta` in class `mark-width` (blue), the height at `2026/theta` in
   class `mark-height` (amber), each drawn as a 14 px vertical tick.
5. The two numbers, `Heron.fmt(t, 4)`, in classes `side-width-ink` and `side-height-ink`, placed
   above and below the line respectively so they never collide when the bracket is narrow.
6. Optionally a purple `ghost-bracket` for the previous bracket, so a narrowing is visible as a
   change rather than only as a number.

API:

```js
RulerView.create(host, { theta: 10, showGhost: false })
  .setTheta(t)         // redraws, returns the clamped t
  .setGhost(lo, hi)    // remembers a previous bracket, or null to clear
  .getBracket()        // { lo, hi, width } from window.Heron.bracket
  .node                // the svg element
```

**It never draws a tick, marker, dashed line or label at `sqrt(2026)`, and it takes no option that
would.** If a later scene needs one it draws it itself, on top, and only scene 4 may.

New CSS classes go in `css/style.css` under the existing shared SVG vocabulary block, with tokens
already defined there: `.bracket-bar` uses `--height-side` (amber, the bracket is the pair of sides),
`.bracket-end` the same, `.mark-width` uses `--width-side`, `.mark-height` uses `--height-side`,
`.ghost-bracket` uses `--trail-faint`.

### 2. `js/loupe.js`

Exposes `window.Loupe` with `create(host, opts)`.

A 240 by 160 SVG panel showing the top right corner of the rectangle, where the two sides overshoot
each other by `|theta - 2026/theta|`. It draws:

1. A frame, class `paper` plus `plot-frame`.
2. Two lines meeting at the corner, `side-width` and `side-height`, separated horizontally by the
   magnified mismatch.
3. The mismatch as a labelled span, class `label-ink`, reading the gap in units.
4. The magnification, always visible, as `10^N` rendered with the vendored KaTeX through
   `window.Katex.render`, in a corner of the panel.

API:

```js
Loupe.create(host, { power: 3 })
  .setPower(n)          // n is the EXPONENT, so 3 means 10^3
  .setGapPx(px)         // draw a mismatch this many pixels wide. See below
  .setGapLabel(str)     // the exact gap as a STRING, for example "4.178407e-14"
  .node
```

**`setGapPx` takes pixels and the module computes nothing.** Feed it `DATA.loupe[k].px`, which is
already `gap * 1.6 * 10^power` computed in Python with `Decimal`. A browser cannot compute
`theta - 2026/theta` below about 1e-14: in IEEE doubles the k=2 row reads 4.973799e-14 against the
true 4.178407e-14, and the k=3 row reads exactly one ulp at 45. Any JavaScript that recomputes this
column makes the collapse appear to stall, which is the opposite of the scene's point. Put that
warning in the file header.

`setGapLabel` takes a string for the same reason.

### 3. Two `<script src>` lines in `index.html`

Immediately after `js/rectview.js` and before `js/stub.js`, keeping the load-order comment above the
block accurate:

```html
  <script src="js/rulerview.js"></script>
  <script src="js/loupe.js"></script>
```

### 4. A console recipe in each header comment

Scenes 2 to 4 will exercise these modules. To make this issue self-verifiable before those land, put
a one-line recipe a reviewer can paste into the console at the top of each file, for example:

```
window.RulerView.create(document.getElementById("stage"), { theta: 10 })
```

### 5. `../CLAUDE.md` (updated)

Add both modules to the file tree, one line each.

## File Structure

```
js/rulerview.js        new
js/loupe.js            new
css/style.css          (updated) five new classes in the shared SVG vocabulary block
index.html             (updated) two script tags
CLAUDE.md              (updated) two lines in the file tree
```

## Verification

- `node --check js/rulerview.js` and `node --check js/loupe.js` both exit 0.
- `grep -n "sqrt\|45.011\|4.501" js/rulerview.js` returns nothing.
- `grep -n "Math.random\|fetch(\|#[0-9a-fA-F]\{6\}" js/rulerview.js js/loupe.js` returns nothing: no
  randomness, no network, no colour literal.
- Pasting the console recipe from each header comment into a browser on `index.html` draws the
  module without a console error.
- With `theta = 10`, `RulerView.getBracket()` returns `{lo: 10, hi: 202.6, width: 192.6}` and the
  bracket bar spans the full usable width of the ruler.
- With `theta = 106.3`, `getBracket().width` reads `87.24073377234242`, and the drawn bar is visibly
  shorter than the one at `theta = 10`.
- `Loupe.setPower(14)` renders `10^{14}` through KaTeX, and `setGapPx(6.69)` draws a mismatch a
  reader can see at 1440 by 980.
- Both panels are locked in width and height, in the CSS and in the SVG attributes, and the two
  numbers match. Screenshot at 1280 by 800 and at 1920 by 1080 and confirm neither panel is stretched
  or squashed.
- `sh docs/capture.sh` still produces every existing scene without a new error, and the PNGs are read
  rather than merely produced.
- No console errors.
