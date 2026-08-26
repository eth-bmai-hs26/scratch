# Issue 2: Several runs on one axis

## Goal

Extend `js/trace.js` so scenes 4 and 5 can hold three or four runs on one set of axes with a
legend, and so the smallest band is still visible rather than pinned flat against the axis.
Today `Trace.create` accepts a `series` array and draws them, but every series gets the same
CSS class unless the caller names one, and there is no legend at all.

## Dependencies

None.

## Context

The four schedules scenes 4 and 5 compare produce bands of wildly different width. Real
measured spreads, from `node precompute/verify-genie.mjs --print`:

```
full            1.693e-1
constant        3.515e-2
inverse         1.854e-3
inverseSquare   6.973e-5
```

That is a factor of 2400 between the widest and the narrowest. On a linear axis the narrowest
three collapse onto one line. The design spec's verification section names this explicitly as
something to check by looking at the screenshot.

`js/trace.js` already has `spark()`, which puts `|loss|` on a log scale, and its
`d3.scaleLog` usage is the pattern to follow. `css/trace.css` already defines
`.series-guess`, `.series-target`, `.series-refused` and `.series-loss`. Colour identities
are fixed in `CLAUDE.md` and must not cross-talk: blue is the genie's answer, purple is the
trail of guesses.

## Deliverables

### 1. Per-series classes (`css/trace.css`, updated)

Four run classes, `.series-run-0` through `.series-run-3`, taking `--purple`, `--blue`,
`--green` and `--orange` in that order, in both themes. Do not use `--amber`: it is reserved
for revealed truth and scene 6 is the only place it may appear. Do not use `--red`: it means
a number the bargain refuses.

### 2. A legend (`js/trace.js`, updated)

`Trace.create(host, opts)`'s `render(spec)` gains `spec.legend`, an array of
`{ label, cls }`. It renders as a row of swatches above the plot, inside the SVG, using the
existing `axis-title` class for the text and one `<rect>` per swatch carrying the series
class. Reserve its height in the top margin so adding a legend does not move the plot.

### 3. A log y option (`js/trace.js`, updated)

`spec.yScale === "log"` switches the y axis to `d3.scaleLog`, with the same tick and
gridline treatment `spark()` uses. Guard against a non-positive value: filter it out and
note the count in the caption rather than throwing.

### 4. Box sizes (`css/trace.css` and `js/trace.js`, updated together)

If the box has to grow for the legend, **change both files in the same edit**. The header
comment in `css/trace.css` records why: they were once 560x300 in CSS and 470x250 in the
attributes, so the viewBox scaled by 1.19 and the plot overflowed its card. It rendered
acceptably at a glance and captured wrong.

## File Structure

```
js/trace.js       (updated)
css/trace.css     (updated)
```

## Verification

- `node --check js/trace.js` passes.
- Scenes 1, 2, 3 and 6 still render correctly: rerun `bash docs/capture.sh light` and read
  `table_light.png`, `fullstep_light.png`, `broken-b_light.png` and `revealed_light.png`.
- The CSS `width` and `height` of `.trace-svg` equal the numbers `Trace.create` writes into
  the `width` and `height` attributes. Check by reading the two files side by side.
- A four-series log-scale render shows all four traces distinguishable, including the one
  whose spread is `6.973e-5`.
- Legend swatch colours match the trace colours in both themes.
- No console errors.
