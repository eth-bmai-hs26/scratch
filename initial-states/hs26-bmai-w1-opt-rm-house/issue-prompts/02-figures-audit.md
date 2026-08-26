# Issue 2: Figure audit and the unused figure

## Goal

Five figures ship in `housetools.py` and only four are called by a notebook cell. Decide the
fate of the fifth, and audit all of them at the size they will actually be projected. Two real
defects in this exercise were found only by rendering a figure and looking at it, so this issue
exists to do that deliberately rather than by luck.

## Dependencies

- **Issue 1** (TA card): only for wording. The card fixes the phrases the TAs will say, and a
  figure title should not contradict them. If issue 1 has not run, do this one anyway and
  re-check the titles afterwards.

This issue edits `housetools.py`. **Do not run it at the same time as issue 3**, which edits the
same file.

## Context

The five figures, all in `housetools.py`, all matplotlib, all driven by the history list the
participant's own function returned:

| Function | Called by | Status |
|---|---|---|
| `plot_houses` | nothing | **unused** |
| `plot_orbit` | acts 1 and 2 | verified, twice repaired |
| `plot_fit_grid` | act 3 | verified, good |
| `plot_loss_curve` | act 3 | verified, good |
| `plot_wb_path` | act 4 | verified, legend moved once |

Two defects already found and fixed, recorded here so they are not reintroduced:

1. `plot_orbit` originally drew all 400 steps of the act 1 run. At that width the alternation
   between 1070 and 1080, which is the entire point of act 1, collapsed into a solid blue band.
   It now draws the first 60 steps and says so in the panel title. **Do not remove the `show`
   argument.**
2. `plot_orbit` and `plot_wb_path` both had a text label sitting on top of the data. Both now
   use a legend. `plot_wb_path`'s legend is upper left with an opaque white patch, because the
   contour lines run underneath it.

The palette is Okabe-Ito, colour blind safe, and red and green are never used as a pair
anywhere in this course. The tokens are at the top of `housetools.py`: blue `#0072B2`,
vermillion `#D55E00`, ink `#1a1a1a`, amber `#B45309` for chrome only, grey `#6b6b6b`.

## Deliverables

### 1. A decision on `plot_houses`, executed

Two acceptable outcomes, and picking one is the deliverable.

- **Keep it**, by adding one figure cell to act 0 in `precompute/build_notebooks.py` that draws
  the twelve houses with no line through them. This costs one cell and it gives the room a
  picture of the problem before any algorithm appears, which fits the house convention that the
  answer is withheld until the participant has attempted it.
- **Remove it** from `housetools.py`, which shortens the embedded copy the setup cell carries.

Record the reason in `housetools.py` next to the change, or in `notebooks/CLAUDE.md`.

### 2. A rendered audit of all figures that ship

For each figure that a notebook cell calls after deliverable 1, render it to PNG at the dpi the
function sets and **open the image and look at it**. Confirm, per figure:

- No text overlaps a data point, a line or another label.
- Every axis has a label, and the title names the fictitious dataset.
- The figure carries the story it is there to carry. Specifically: `plot_orbit` on the act 1 run
  must show a visible sawtooth straddling the dashed line, and `plot_wb_path` must show the path
  entering a narrow valley.
- No categorical colour is a red and green pair.

### 3. A projector check at reduced size

Downscale each PNG to 50 percent and confirm the axis tick labels and the legend are still
readable. A lecture hall projector plus a rear row is roughly this.

## File Structure

```
hs26-bmai-w1-opt-rm-house/
  housetools.py                    (updated) plot_houses kept and unchanged, or removed
  precompute/build_notebooks.py    (updated) only if plot_houses is kept
  notebooks/CLAUDE.md              (updated) the cell spine, if a cell was added
  README.md                        (updated) the "Not done" list loses its plot_houses item
```

## Implementation Notes

Rendering a figure without running a whole notebook:

```python
import sys; sys.path.insert(0, ".")
import matplotlib; matplotlib.use("Agg")
import housetools as H
area, price, x, y = H.load_houses("data/houses.csv")
fig = H.plot_houses(x, y)
fig.savefig("/tmp/plot_houses.png")
```

If a cell is added to the builder, the four task cell indices move. The builder computes them
and asserts them, so it will tell you the new ones. Update the cell spine table in
`notebooks/CLAUDE.md` to match.

## Verification

- Every figure function defined in `housetools.py` is called by at least one notebook cell.
  Check with `grep -o "H.plot_[a-z_]*" precompute/build_notebooks.py | sort -u` against
  `grep -o "^def plot_[a-z_]*" housetools.py | sort -u`.
- Each shipping figure has been rendered to PNG and opened, and the audit above is recorded.
- `python3 precompute/build_notebooks.py` ends on `All assertions passed.`
- The solutions notebook still executes top to bottom with zero errors, and each figure cell
  produces exactly one output. Count them: any figure cell with two outputs has lost its
  trailing semicolon.
- `python3 precompute/reference.py` still ends on `All assertions passed.`
