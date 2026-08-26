# Issue 3: Scene 4, the sandstorm

## Goal

Replace the stub in `js/scenes/scene4.js` with the built scene. The wind rises, the genie's
answer arrives blurred, and the same number handed over twice comes back differently. The
scene has to earn exactly one reading: a constant step settles into a band, and the band
never closes, however long the loop runs.

## Dependencies

- **Issue 1** (The instrument panel): `window.Panel.create`, `setRow`, `highlight`.
- **Issue 2** (Several runs on one axis): per-series classes, the legend, the log y option.

## Context

Everything this scene computes already exists and is already asserted.

- `Loop.run({ form, q0, n, schedule, sigma, rng })` returns one record per round with `q`,
  `clean`, `heard`, `loss` and `alpha`. Pass `sigma: 0.15` and `rng: RNG.stream()`.
- `RNG.stream()` is the pinned Mulberry32 at seed 20260904. Call it once per run so that
  rerunning a demonstration reproduces the same storm. **Never call `Math.random()`.**
- `Loop.spread(rows)` and `Loop.avgHeardLoss(rows)` are the two panel numbers.
- Verifier assertion (g) already pins the ordering of the three spreads on the pinned seed
  and on the mean of 200 seeds.

The three runs, same seed and same start `Q = 1`, 400 rounds, sigma 0.15. Real measured
values from `node precompute/verify-genie.mjs --print`:

```
alpha = 1          spread 1.693e-1   avg heard loss -0.0047   rests at 1.893913
alpha = 0.2        spread 3.515e-2   avg heard loss -0.0065   rests at 1.676006
alpha = 1/(t+1)    spread 1.854e-3   avg heard loss  0.0077   rests at 1.616584
```

**Do not retype those numbers into the scene.** The scene recomputes them live from the same
modules the verifier loaded, which is what keeps the page and the verifier from drifting
apart. They are here so you can tell whether what you built is right.

The clean loss is already down to about 0.0096 by row 6 of the lecture slide's own table, so
noise of 0.15 swamps the signal completely. That contrast is the scene's opening move.

## Deliverables

### 1. The storm, made visible before any schedule is compared

Step 0 of the scene: hand the genie the same number three times and show three different
answers. Two or three rows, no plot. The point lands before any machinery appears.

### 2. Three runs, one per click

Steps 1, 2 and 3 add `alpha = 1`, then `alpha = 0.2`, then `alpha = 1/(t + 1)`. Each one:

- adds its trace to the shared axis, keeping the earlier traces
- adds its row to the instrument panel
- highlights the row just added

Use `Schedules.full()`, `Schedules.constant(0.2)` and `Schedules.inverse(1)`.

### 3. The reading, as the last ordinary line

Body text, `class="body-line"`, no styling of any kind, appearing on the last step: the
constant step settles into a band and the band never closes, however long you run. Only the
shrinking step closes it.

There is no closing punchline, no big centred line and no brand colour. That is a house rule.

### 4. Dev hooks

`?test=storm` lays in all three runs. Register it in the `TEST_SCENE` map at the top of
`js/main.js`, mapping `"storm"` to `4`, so `index.html?test=storm` routes to this scene.

### 5. `css/scene4.css`, and `index.html` (updated)

Add the stylesheet link after `css/scene3.css`.

## Implementation Notes

- The scene is 400 rounds of a three-line recurrence per schedule. It is instant; do not
  precompute it and do not add a progress indicator.
- A trace of 400 points with dots is unreadable. Pass `dots: false`.
- The scene keeps the truth line off. `Trace.setTruthVisible` is scene 6's, and scene 6's
  alone.
- Verifier assertion (j) will refuse this file if it contains the substring `1.618`, the word
  `golden`, or the identifier `DATA.reveal`. That includes comments. Reword rather than
  weaken the assertion.

## File Structure

```
js/scenes/scene4.js    (updated, the stub is replaced)
css/scene4.css
js/main.js             (updated, one line in TEST_SCENE)
index.html             (updated, one stylesheet link)
```

## Verification

- `node --check js/scenes/scene4.js` passes.
- `node precompute/verify-genie.mjs` still ends on `ALL PASS`, including assertion (j) for
  `scene4.js`.
- `index.html#scene=4` reaches the scene, and `index.html?test=storm` reaches it with all
  three runs laid in.
- The three spreads the panel shows agree with the three in this file to the digits shown.
- Reload twice: the numbers are identical. If they move, something called `Math.random()`.
- `bash docs/capture.sh light` and `bash docs/capture.sh dark`, then **read**
  `sandstorm_light.png` and `sandstorm_dark.png`. The narrowest band has to be visibly a
  band rather than a line.
- No console errors.
