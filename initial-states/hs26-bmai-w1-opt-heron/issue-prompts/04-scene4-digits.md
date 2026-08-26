# Issue 4: Scene 4, the digits

## Goal

Build the payoff. Run Carlos's table from 45 to convergence, add the column that counts how many
leading digits of the width are correct, and watch it read 3, 6, 14, 30, 61. Put the loupe ladder
beside it, so the magnification needed to see the mismatch and the digit count turn out to be the
same number. Then put two comparisons on the same axes, because doubling means nothing without
something to double against.

## Dependencies

- **Issue 1** (The ruler and the loupe): `window.Loupe`, its `setPower`, `setGapPx` and `setGapLabel`.

## Context

Read `../CLAUDE.md` first, in particular the Decimal rule. **This scene computes nothing below
1e-14.** Every value it prints is already pinned in `data/datasets.js`, as a string where it has to
be. The current `js/scenes/scene4.js` is a 53-line stub that lists exactly which fields; delete the
`Stub.render` call when you build.

**This is the first scene in the deck allowed to print `sqrt(2026)`.** It has to, because the digit
counter compares against it. Print it once, as `DATA.rootDigits`, and only after the participant has
already stepped the table themselves.

The table, `DATA.heron45`, five rows:

| k | theta (first digits) | residual | correct digits | -log10 rel. error | gap between the sides |
|---|---|---|---|---|---|
| 0 | 45 | 1 | 3 | 3.608 | 2.222222e-2 |
| 1 | 45.011111111111... | -1.2345679e-4 | 6 | 7.516 | 2.742807e-6 |
| 2 | 45.011109739707616... | -1.8807475e-12 | 14 | 15.333 | 4.178407e-14 |
| 3 | 45.011109739707595882970... | -4.3647721e-28 | 30 | 30.968 | 9.697100e-30 |
| 4 | 45.011109739707595882970... | -2.3508435e-59 | 61 | 62.236 | 5.222807e-61 |

**Print the definition of the digit column on screen.** Two reasonable definitions disagree here, and
an undefined counter is a fabricated counter. The column counts leading decimal digits of `theta`
agreeing with the printed root, which is what a participant can check by eye. The standard
numerical-analysis measure, `-log10` of the relative error, is `DATA.heron45[k].relDigits` and reads
3.608, 7.516, 15.333, 30.968, 62.236. Both double. Show both.

## Deliverables

### 1. The stepped table

One row per click, using `DATA.heron45`. Columns: `k`, `theta` truncated to a readable width with the
full value available on hover or in a `title` attribute, `2026 - theta^2` from `residSci`, and the
digit column revealed last.

The residual column changes sign once, at k=1, and never again, which is the invariant scene 3
claimed. Say so once, in body text, when the sign flips.

### 2. The digit column and its definition

Revealed only after all five rows are on screen. Beside it, in `.control-hint` type, both
definitions, with `relDigits` printed as a second small column.

Only after the digit column has doubled twice on screen may the phrase **quadratic convergence**
appear. It is the one phrase this exercise has been withholding since scene 0.

### 3. The loupe ladder

A `Loupe` panel plus a stepper. Each click raises the magnification to the next rung of `DATA.loupe`:

| rung | magnification | mismatch under it |
|---|---|---|
| 0 | 10^3 | 35.56 px |
| 1 | 10^6 | 4.39 px |
| 2 | 10^14 | 6.69 px |
| 3 | 10^30 | 15.52 px |
| 4 | 10^61 | 8.36 px |

The magnification is printed at all times. The point lands when the participant notices that the
exponent column and the digit column are the same numbers, so say nothing and let the two columns
sit next to each other.

### 4. The double-precision beat, one line

After the ladder, one line of body text:

> A double holds about sixteen digits. The algorithm passes that after three corrections, so every
> number below this line was computed with exact decimal arithmetic before the page was built.

Optionally, and only if the scene still breathes, show both readings for the k=2 gap:
`DATA.heron45[2].gapSci` reads `4.178407e-14`, and `DATA.bracket45[2].width`, which is what a browser
computes, reads `4.973799e-14`. One step further the browser reading is `7.105427e-15`, exactly one
ulp at 45, so from there on it is measuring its own rounding error. This is a real beat and it costs
perhaps thirty seconds of a ten-minute exercise. It is open question 7 in the proposal, so build it
behind a click rather than in the default path.

### 5. Comparison A, bisection

From `DATA.bisection45`. Bisection on `[45, 46]` needs **20 steps** to a bracket of width 1e-6 and
**34 steps** to 1e-10. Its digit column over the first twenty steps reads

```
2, 2, 3, 3, 4, 3, 5, 3, 4, 5, 4, 7, 6, 6, 6, 6, 6, 6, 8, 8
```

which buys about a third of a digit per step and is not even monotone. After two corrections Heron
has 14 digits and bisection has 2.

Note for the builder: `DATA.bisection45.widths` holds 21 bracket widths. The digit column above is in
the proposal and is **not** in `data/datasets.js` yet. Add it in `precompute/build_data.py` as
`bisection45.digitColumn`, with an assertion that it reads exactly the twenty values above, and
regenerate. Do not type it into the data file by hand.

### 6. Comparison B, the fixed nudge

From `DATA.fixedNudge`. This is Carlos's arrow update with the distance held fixed, which is what the
Update column describes if the step never adapts.

| alpha | the sequence from 45 | closest it ever gets |
|---|---|---|
| 0.1 | 45.0, 45.1, 45.0, 45.1, forever | 1.1110e-02 |
| 0.01 | enters a two-cycle immediately | 1.1097e-03 |
| 0.001 | walks up, then cycles | 1.0974e-04 |

The orbit radius is set by alpha. **This is the bridge to Act 2 and it arrives as a measured fact.**
Show the alpha = 0.1 cycle animating against the Heron trace on the same axes, so the room watches
one converge and the other orbit.

This is the one place in scenes 0 to 4 where the word `alpha` is allowed on screen, because the scene
is exhibiting a fixed step in order to beat it. Keep it to that panel.

### 7. `css/scene4.css`

The densest layout in the viz: table, digit column, loupe, two comparison traces. Give the comparison
panel its own grid rules here.

## Implementation Notes

- The five rows arrive with a click each, so the scene has at least 5 + 1 + 5 + 2 steps. That is a
  long scene; consider making the loupe stepper its own control rather than another step of the
  cursor, so a lecturer can raise magnification without walking the whole scene.
- `theta` at k=3 and k=4 agree in their first 30 printed characters. Truncate to about 26 characters
  and mark the agreeing prefix with a class, so the doubling is visible as ink rather than only as an
  integer.
- `window.Heron.correctDigits(thetaStr)` already exists and pads both operands before comparing, which
  is the trap that otherwise reports 2 correct digits at k=0 where the honest answer is 3. Use it
  rather than writing a comparison inline.

## File Structure

```
js/scenes/scene4.js         (updated) the stub is replaced by the built scene
css/scene4.css              (updated) scene-specific rules replace the placeholder comment
precompute/build_data.py    (updated) emit bisection45.digitColumn and assert it
data/datasets.js            (updated) regenerated, never hand edited
```

## Verification

- `python3 precompute/build_data.py` prints the new digit-column check as `[ok  ]` and rewrites
  `data/datasets.js`. Running it twice gives a byte-identical file.
- `node --check js/scenes/scene4.js` and `node --check data/datasets.js` both exit 0.
- `index.html#scene=4` opens cold and renders correctly.
- The digit column reads `3, 6, 14, 30, 61` on screen.
- The definition of that column is on screen, and `3.608, 7.516, 15.333, 30.968, 62.236` is beside it.
- The loupe ladder reads `10^3, 10^6, 10^14, 10^30, 10^61`, and at every rung the mismatch is visible
  in the panel at 1280 by 800.
- The gap column shows `4.178407e-14` at k=2. If it shows `4.973799e-14` in the default path, the
  scene is computing in doubles and the Decimal rule has been broken.
- The bisection comparison reads 20 steps and 34 steps, and its digit column is visibly not monotone.
- The fixed nudge with alpha = 0.1 shows the cycle 45.0, 45.1, 45.0, 45.1.
- Screenshot at 1280 by 800 and 1920 by 1080, both themes, and read all four PNGs: nothing overlaps,
  and the comparison panel is legible at the smaller viewport.
- No console errors.
