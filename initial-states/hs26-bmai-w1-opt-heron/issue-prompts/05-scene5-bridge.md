# Issue 5: Scene 5, the bridge table

## Goal

Build the closing scene as one mapping table and nothing else. Three columns, five rows, handing the
symbols over to the genie game that runs next in the same block and to the gradient descent lecture
at 11:00. The last row is where the three separate, and the closing thought is written as the last
ordinary line of body text.

## Dependencies

None. This scene is pure DOM and text, with one number in it that is already pinned.

## Context

Read `../CLAUDE.md` first. The current `js/scenes/scene5.js` is a 47-line stub that renders this
brief; delete the `Stub.render` call when you build.

The shape is the house's mapping-frame device, used twice already in this course family:

- `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/js/explain.js`, the `exp-table` at
  lines 513 to 529, which hands `theta`, `J(theta)`, `grad J(theta)`, `alpha` and "a local maximum"
  over to REINFORCE.
- The AINIT RL deck's third Faust frame, which is a whole slide containing nothing but a two-column
  table with no prose on it at all.

**No closing punchline.** The house rule is explicit: a frame ends on its final reveal, and if a
closing thought is real content it is the last ordinary line of body text. There is no centred slogan
in the brand colour, ever.

This is the only scene where `alpha`, learning rate, gradient and loss are allowed to appear in
scenes 0 to 5, and each appears exactly once, as the name of what the next two exercises add. See the
anti-collision table in `../CLAUDE.md`.

## Deliverables

### 1. The table

Five rows, three columns, revealed one row per click so the room reads across before it reads down.

| | Heron, this exercise | The genie, next | Gradient descent, 11:00 |
|---|---|---|---|
| the guess | `theta`, a width | `theta` | `w`, a weight |
| what you can measure | the other side, `2026/theta` | `1 + 1/theta` | the slope under your feet |
| the verdict | too wide or too tall | too large or too small | uphill or downhill |
| how far to move | the average of the two sides | `alpha` times the gap, with `alpha` shrinking | `alpha` times the slope |
| what it costs | 2 corrections from 45 | many, and noisy | many, and noisy |

The "2 corrections from 45" is `DATA.stepsToTol["45"]`, which is 2. Read it from the data rather than
typing it, so that a change in the tolerance cannot make the table lie.

Row 4 is the one the whole exercise has been building to, because it is the row where Heron's entry
carries no step size at all. Consider giving that cell the blue width-identity colour, which is the
identity for "the update", and leaving the other two cells in ordinary ink.

### 2. The closing thought, as body text

After the final row, as ordinary body text in the same size and weight as everything else on the
scene:

> Heron can compute its correction exactly because it can evaluate the target. Once the target is
> only visible through noise the exact correction is unavailable and the step size becomes a knob,
> which is the genie. Once the thing being corrected is a loss surface, that knob is the learning
> rate, which is 11:00.

Then one line naming what Carlos's page left open:

> Carlos's Update column carries an arrow and nothing else. The arrow gives the direction. These
> three columns give the distance.

### 3. `css/scene5.css`

The table is the whole scene, so it gets room: a wider `max-width` than the default `.scene-head`,
generous row height in the manner of the AINIT frame's `\arraystretch{2.0}`, and a muted treatment
for the two columns that belong to the other exercises so that the Heron column reads as the one the
participant has just done.

### 4. A muted row treatment, optional but recommended

The AINIT deck's sharpest device is a row that is present, legible, and deliberately not highlighted,
because it names something the course refuses. There is no refused term here, so the honest analogue
is to mute the two columns that belong elsewhere rather than to mute a row. Do it with the existing
`--muted` token, which the house calls the legible floor. Never lighter.

## Implementation Notes

- Cold entry through the dot pager, with no earlier scene ever built, has to render correctly. This
  scene reads exactly one field from `window.DATA`, so that is easy to get right and easy to get
  wrong by reading state left by scene 4.
- Five clicks plus the closing text is the whole scene. Resist adding a diagram.

## File Structure

```
js/scenes/scene5.js    (updated) the stub is replaced by the built scene
css/scene5.css         (updated) table rules replace the placeholder comment
```

## Verification

- `node --check js/scenes/scene5.js` exits 0.
- `index.html#scene=5` opens cold, with no earlier scene ever built, and renders correctly.
- Five clicks reveal five rows; Prev walks back through them.
- The "what it costs" cell for Heron reads 2, and `grep -n '"2"' js/scenes/scene5.js` shows it comes
  from `DATA.stepsToTol` rather than from a literal.
- `grep -c "alpha" js/scenes/scene5.js` counts the occurrences, and every one of them is inside the
  genie or gradient-descent column.
- There is no centred, enlarged, coloured closing line anywhere in the scene. The closing thought
  renders in body type.
- Screenshot at 1280 by 800 and 1920 by 1080, both themes, and read all four PNGs. The table fits
  without horizontal scrolling at 1280, and the muted columns are still legible in dark.
- No console errors.
