# Issue 6: Drop d3

## Goal

Remove `vendor/d3.min.js` and replace the two d3 functions this viz actually uses with about
twenty lines in `js/trace.js`. It is 280 KB of dependency for `scaleLinear` and `scaleLog`.

## Dependencies

- **Issue 2** (Several runs on one axis), because that issue touches the same scale code and
  the two would collide.

## Context

`grep -rn 'd3\.' js/` finds four call sites, all inside `js/trace.js`, three of the first
kind and one of the second:

```
d3.scaleLinear().domain([lo, hi]).range([a, b])
d3.scaleLog().domain([lo, hi]).range([a, b])
scale.ticks(n)
```

The design spec argued for never vendoring d3 here, for exactly this reason, and it was
already in `vendor/` when the page was built. The spec's own words: if a later scene turns
out to need an axis d3 would give for free, add d3 then and record the reason.

`ticks(n)` is the only part with any subtlety. d3's algorithm picks a step from 1, 2, 5 or 10
times a power of ten so the labels come out round. Reimplementing it badly gives axis labels
like `1.3333`, which looks amateurish next to KaTeX. Write it carefully or keep the tick
values fixed per scene.

## Deliverables

### 1. `js/scale.js`

A new module exposing `window.Scale`:

```js
Scale.linear()  -> fn(v), with .domain([lo,hi]), .range([a,b]), .ticks(n)
Scale.log()     -> the same shape, base 10, refusing a non-positive domain
```

`ticks(n)` picks a step of 1, 2, 5 or 10 times a power of ten and returns the round values
inside the domain.

### 2. `js/trace.js` (updated)

Three call sites become `Scale.linear()` and `Scale.log()`. Nothing else changes.

### 3. `index.html` (updated)

Remove `<script src="vendor/d3.min.js"></script>`. Add `<script src="js/scale.js"></script>`
before `js/trace.js`. The script order is load-bearing.

### 4. `vendor/d3.min.js` removed

Delete the file. Update the `vendor/CLAUDE.md` inventory and the `CLAUDE.md` layout table,
which both currently say d3 is vendored, and remove the deliberate-departure entry number 5
in `CLAUDE.md` that records why it was kept.

## File Structure

```
js/scale.js
js/trace.js       (updated)
index.html        (updated)
vendor/d3.min.js  (deleted)
vendor/CLAUDE.md  (updated)
CLAUDE.md         (updated)
README.md         (updated)
```

## Verification

- `grep -rn 'd3' js/ index.html` returns nothing.
- `node --check js/scale.js` and `node --check js/trace.js` pass.
- Axis labels are round numbers. Compare a before and an after screenshot of scene 3 side by
  side; the tick values should be identical.
- `bash docs/capture.sh light` and `dark`, then **read** every scene that draws a plot,
  meaning 1, 2, 3, 4, 5 and 6.
- The folder still opens from `file://` with no network. Check with the browser devtools
  network tab showing zero requests beyond the local files.
- No console errors.
