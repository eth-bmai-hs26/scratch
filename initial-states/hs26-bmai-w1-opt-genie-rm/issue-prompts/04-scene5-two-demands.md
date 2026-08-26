# Issue 4: Scene 5, two demands on the step

## Goal

Replace the stub in `js/scenes/scene5.js`. Scene 4 taught that the step has to shrink. This
scene closes the obvious next move, which is to shrink it hard, and in doing so it produces
both Robbins-Monro conditions rather than one. It is the hardest scene to get right, because
the failure it shows looks like success.

## Dependencies

- **Issue 3** (Scene 4, the sandstorm): the panel layout, the shared axis and the run
  machinery this scene extends.

## Context

Add a fourth schedule, `Schedules.inverseSquare(1)`, meaning `alpha = 1/(t + 1)^2`. Real
measured values at the pinned seed, from `node precompute/verify-genie.mjs --print`:

```
inverseSquare   spread 6.973e-5   avg heard loss 0.1867   rests at 1.749483
```

It has the **smallest spread of all four** and by far the largest standing loss. It rests at
`1.749483`, where the genie returns `1.571597`. It settled beautifully, on a number the genie
refuses, and it looks more settled than the row that is right. Verifier assertion (h) already
pins that the rest point is somewhere the genie is not satisfied.

Then the same point with the storm off and a far start, so the argument does not rest on one
draw of the noise. Verifier assertion (i), real output:

```
alpha = 1/(t+1)        rests at 1.617875   |err| 1.59e-4
alpha = 0.5/(t+1)^2    rests at 3.626966   keeps 31.5 per cent of its initial error
```

**A precision warning for whoever writes the prose.** The correct statement is that when the
steps add up to something finite, the per-step contraction factors multiply out to a nonzero
limit, so a fixed fraction of the starting error survives forever. Avoid the loose phrasing
"it runs out of distance to travel", which is a heuristic dressed as a reason and which a
participant with an engineering degree will challenge.

The two conditions, in the AINIT deck's own words (rl-slides.tex, the Robbins-Monro
iteration frame): the steps must add up without bound, so the loop can travel from any start;
and their squares must add up to something finite, so the noise eventually cancels.
`alpha_n = 1/n` satisfies both.

## Deliverables

### 1. The fourth row

Step 0 adds `alpha = 1/(t + 1)^2` to scene 4's panel and axis. Nothing else changes yet, and
nothing on screen says it is wrong. Let the participant read the smallest spread first.

### 2. What it rests on

Step 1 prints the rest point and what the genie returns for it, side by side, as two numbers
computed live. The standing loss is the gap between them and it never closes.

### 3. The same point with the storm off

Step 2: clean genie, start `Q = 8`, 200 rounds, `Schedules.inverse(1)` against
`Schedules.inverseSquare(0.5)`. One trace each. The second one stops partway and stays there.

### 4. The two conditions, with both running sums live

Step 3: the two conditions in words, with `sum of alpha_t` and `sum of alpha_t squared` both
counting up on screen for the schedule the participant selects. For `1/(t+1)` the first sum
grows without bound and the second converges; for `1/(t+1)^2` both converge, and the first
one converging is the failure.

Real anchors: over 200 terms, `1/(t+1)` sums to `5.8780` and keeps growing, while
`0.5/(t+1)^2` sums to `0.8200`, bounded by `0.5 * pi^2/6 = 0.822467`. Recompute these live.

### 5. Dev hooks and stylesheet

`?test=demands` lays in all four steps. Register `"demands": 5` in `TEST_SCENE` in
`js/main.js`. Add `css/scene5.css` and its link in `index.html`.

## File Structure

```
js/scenes/scene5.js    (updated, the stub is replaced)
css/scene5.css
js/main.js             (updated, one line in TEST_SCENE)
index.html             (updated, one stylesheet link)
```

## Verification

- `node --check js/scenes/scene5.js` passes.
- `node precompute/verify-genie.mjs` still ends on `ALL PASS`, assertion (j) included.
- `index.html?test=demands` reaches the scene with all four steps shown.
- The rest point and the genie's answer for it differ by more than 0.1, which is what
  assertion (h) asserts independently.
- The far-start demonstration shows the fast schedule keeping more than a quarter of its
  initial error, which is what assertion (i) asserts independently.
- The prose does not contain the phrase "runs out of distance".
- `bash docs/capture.sh light` and `dark`, then **read** `demands_light.png` and
  `demands_dark.png`.
- No console errors.
