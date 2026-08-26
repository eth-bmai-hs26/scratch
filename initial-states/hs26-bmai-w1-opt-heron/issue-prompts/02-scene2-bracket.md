# Issue 2: Scene 2, the bracket

## Goal

Build the discovery scene. The participant restarts from a deliberately bad guess, `theta = 10`, sees
the two sides of the rectangle projected onto a linear ruler as a bracket, types the next width, and
gets exactly one piece of feedback: the new bracket width. A participant who reasons "the answer is
somewhere in here, so I take the middle" has derived Heron, and the next scene names what they did.
This is the pedagogically load-bearing scene of the exercise.

## Dependencies

- **Issue 1** (The ruler and the loupe): `window.RulerView`, its `setTheta`, `setGhost` and
  `getBracket`.

## Context

Read `../CLAUDE.md` first. The withholding contract binds this scene harder than any other: **the
scene never marks the target, at any zoom level, ever.** It marks the bracket, and the bracket is the
two sides of the rectangle the participant is already looking at.

The current `js/scenes/scene2.js` is a 52-line stub that renders this brief on screen. It is
deliberately unsketched, because the thing this scene has to get right is the feedback rule, and a
wrong feedback rule teaches the wrong lesson silently. Delete the `Stub.render` call when you build.

Three theorems make the feedback honest. All three are verified in `precompute/build_data.py` over
300000 log-uniform sampled widths seeded with 2026, with zero violations each:

1. **The bracket always straddles the answer.** For any `theta > 0`, `sqrt(2026)` lies between
   `min(theta, 2026/theta)` and `max(theta, 2026/theta)`. So the scene can draw a region that
   provably contains the target without drawing the target.
2. **Any guess outside the current bracket makes the next bracket strictly wider.** The bracket width
   is `|theta - 2026/theta|`, which decreases below the root and increases above it, and the two
   endpoints of a bracket have equal width. So the scene can truthfully say "that made it worse"
   while revealing nothing the shape does not already show.
3. **The midpoint of the bracket is exactly one Heron step.** `(lo + hi)/2` equals
   `(theta + 2026/theta)/2`.

The scene must never state theorem 3 on screen. That is scene 3's job.

The pinned bracket trace from `theta = 10` is `DATA.heron10`, seven rows:

| k | theta | bracket | width |
|---|---|---|---|
| 0 | 10 | [10, 202.6] | 192.6 |
| 1 | 106.3 | [19.059266, 106.3] | 87.240734 |
| 2 | 62.679633 | [32.323099, 62.679633] | 30.356534 |
| 3 | 47.501366 | [42.651405, 47.501366] | 4.849961 |
| 4 | 45.076386 | [44.945928, 45.076386] | 0.130457 |
| 5 | 45.011157 | [45.011062, 45.011157] | 0.000095 |
| 6 | 45.011110 | [45.011110, 45.011110] | 4.96e-11 |

Read that column in the room: the first correction from a terrible start still cuts the bracket by 55
percent, and the participant can see it happen. The correct-digit count on the same rows reads
0, 0, 0, 1, 3, 6, so early Heron looks slow in digits while the bracket is already collapsing. **This
scene shows the bracket. Scene 4 shows the digits. Neither shows the other's column.**

## Deliverables

### 1. The scene, `js/scenes/scene2.js`

Registers `window.scenes.scene2(root)` and returns `{ onEnter, onNextKey, onPrevKey }`. State is the
source of truth, `applyStep` mutates for exactly one step, `render` redraws from state, and Prev
rewinds by reset and replay. Copy the shape from `js/scenes/scene1.js`.

Layout: the rectangle panel (`RectView`) on the left, the ruler (`RulerView`) directly under it so
the projection reads as a projection, and the controls and readouts in the right-hand `.split-side`.

Steps:

| Step | What appears |
|---|---|
| 0 | The rectangle at `theta = 10`, 10 wide by 202.6 tall, and the ruler with the bracket [10, 202.6] |
| 1 | The guess input, the constraint line, and the three-guess counter |
| 2 | The running bracket-width readout and the ghost of the previous bracket |
| 3 | The closing prompt |

### 2. The guess mechanic

A text input plus a "Try it" button carrying `data-run-primary` so `&run` reaches it. On submit:

- Clamp the typed value to `[10, 202.6]`, the same closed domain the rectangle uses.
- Compute the new bracket with `window.Heron.bracket`.
- Call `ruler.setGhost(oldLo, oldHi)` and then `ruler.setTheta(newTheta)`.
- Report **only** the new bracket width, to six decimal places, and whether it grew or shrank.
- A guess that widened the bracket gets class `verdict bad` (red is already the identity for exactly
  this). A guess that narrowed it gets `verdict good`.
- Increment a guess counter. After three guesses, show the best bracket width achieved and store it
  under the `localStorage` key `heron-best-bracket`, wrapped in try/catch for private mode.

The feedback text is one sentence with one number in it. Nothing else. A second number here invites
the participant to optimise the wrong thing.

### 3. The constraint, printed on screen

Verbatim, as ordinary body text near the input:

> Your next guess has to be something you can compute from the two numbers in front of you using only
> plus, minus, times and divide. There is no square root key.

This is Carlos's genie framing ("No computer, no formula, only arithmetic") applied one act earlier,
and it is what turns a guessing game into a derivation.

### 4. The closing prompt, step 3

Verbatim:

> You know two numbers, and you know the answer is between them. Say what you would do with no square
> root key.

The scene stops there. No formula, no averaging, no hint about the midpoint.

### 5. Named states, `js/scenes/scene2.js` header comment and `&test=`

| Hook | State |
|---|---|
| `&test=widened` | after a guess of 300, which is outside the bracket, so the bracket is wider and the red verdict is showing |
| `&test=narrowed` | after three guesses of 106.3, 62.68 and 47.5, so the bracket has visibly collapsed and the best-of-three line is showing |

Without these two the most important states in the whole viz cannot be screenshotted, because they
exist only after typed input.

### 6. `css/scene2.css`

Any rule specific to this scene, including the vertical stacking of the rectangle over the ruler. No
`<style>` tag injected from JS.

## Implementation Notes

- The three-guess counter is a soft counter. A participant may keep guessing after three; the counter
  just stops being the headline. Nothing in this viz locks.
- Do not accept a pasted `45.011`. There is no need for a special case: the scene reports the bracket
  width like any other guess, and a participant who has a calculator has cheated themselves out of
  ten minutes rather than broken anything.
- The rectangle at `theta = 10` is 16 px wide and 324 px tall at the pinned scale. Check that both
  edge labels stay legible instead of colliding at the corner. This was already flagged as the most
  collision-prone state in the deck.

## File Structure

```
js/scenes/scene2.js    (updated) the stub is replaced by the built scene
css/scene2.css         (updated) scene-specific rules replace the placeholder comment
```

## Verification

- `node --check js/scenes/scene2.js` exits 0.
- `index.html#scene=2` opens cold, with no earlier scene ever built, and renders correctly.
- From `theta = 10`, entering `300` reports a **wider** bracket and shows the red verdict.
- From `theta = 10`, entering `50` reports a **narrower** bracket and shows the green verdict.
- Entering `106.3` reports bracket width `87.240734`.
- `grep -n "45.011\|sqrt\|average\|midpoint\|mean" js/scenes/scene2.js` returns nothing in any string
  the participant reads.
- Screenshot `#scene=2&instant&theme=light&test=widened` and `&test=narrowed`, at 1280 by 800 and
  1920 by 1080, in both themes, and **read all eight PNGs**. In none of them is there a tick, mark,
  dash or label anywhere between the two bracket ends.
- Arrow keys step within the scene and only change scene once the four steps are exhausted.
- `t` toggles the theme from this scene and both themes are legible.
- No console errors.
