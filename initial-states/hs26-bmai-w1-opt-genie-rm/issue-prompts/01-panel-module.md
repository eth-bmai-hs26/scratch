# Issue 1: The instrument panel

## Goal

Build `js/panel.js` and `css/panel.css`: a two-number readout that says whether the loop
settled and whether the genie is satisfied. Scenes 4 and 5 both hang on it, and it is the
single device that makes the "you may not ask for the answer" rule enforceable rather than
aspirational, because both of its numbers are computable from what the participant heard.

## Dependencies

None. The arithmetic already exists and is already asserted.

## Context

The two readouts, and why they are these two:

- **spread**: the standard deviation of the guesses over the last third of the run. Does the
  loop settle down?
- **average heard loss**: the mean of the losses over the last third. Is the genie satisfied?

Neither uses the answer. Distance to the fixed point appears nowhere before scene 6, and
verifier assertion (j) refuses any scene file numbered 0 to 5 that mentions it.

Both are already implemented in `js/loop.js` as `Loop.spread(rows)` and
`Loop.avgHeardLoss(rows)`, and verifier assertion (g) in `precompute/verify-genie.mjs`
already pins their ordering across four schedules, on the pinned seed and on the mean of 200
consecutive seeds. This issue adds no arithmetic. It adds a way to look at it.

Display rule from the design spec, section 4.5, and it matters: print the average heard loss
to **two** decimals, so the column reads `0.00, 0.00, 0.01, 0.19`, and render a value whose
absolute value rounds to zero as `0.00` with no sign. Three decimals invites a false ranking
between the full step and the shrinking step, which the spec's own 200-seed table shows is
not a real ranking.

The shared vocabulary in `css/style.css` already has `.kpi-row`, `.kpi`, `.kpi-value` and
`.kpi-label`. Use them rather than inventing a card.

## Deliverables

### 1. `js/panel.js`

Exposes `window.Panel` with:

```js
Panel.create(host, opts)   // opts: { rows: [{ key, label }] }  one row per schedule
  -> { setRow(key, { spread, avgLoss, label }), clear(), highlight(key), node }
```

- `setRow` formats: spread as `toExponential(3)`, average heard loss as `toFixed(2)` with a
  leading `+` for a positive value and no sign at all when the absolute value rounds to zero.
- `highlight(key)` adds a class to one row and removes it from the others, so a scene can
  point at the row it is talking about. No colour is written in JavaScript.
- The module holds no arithmetic and no schedule names. It is handed numbers.

### 2. `css/panel.css`

- `.panel-table` with one row per schedule and three columns: the schedule's label, the
  spread, the average heard loss.
- Numeric cells: `font-variant-numeric: tabular-nums`, right aligned, monospace.
- `.panel-row.is-highlight` uses `var(--panel-2)` as a background and nothing else. Do not
  spend a categorical colour on it.
- Complete in both themes. Check `--panel-2` against `--panel` in dark, where the two are
  four hex points apart.

### 3. `index.html` (updated)

Add `<link rel="stylesheet" href="css/panel.css">` after `css/trace.css`, and
`<script src="js/panel.js"></script>` after `js/trace.js`. The script order is load-bearing
and the comment above the block says so.

## Verification

- `node --check js/panel.js` passes.
- `grep -n 'fill=\|stroke=\|color:' js/panel.js` returns nothing.
- With the module loaded, in the browser console:
  `Panel.create(document.body, {rows:[{key:'a',label:'alpha = 1'}]})` renders a one-row
  table, and `setRow('a', {spread: 0.1693, avgLoss: -0.0047})` shows `1.693e-1` and `0.00`.
- A value of `-0.004` renders as `0.00` and not as `-0.00`.
- Both themes readable at 1280x800.
- No console errors.
