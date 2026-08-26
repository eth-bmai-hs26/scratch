# CLAUDE.md, hs26-bmai-w1-opt-rm-house

Contract for the next agent working in this directory. Read it before editing anything.

> **Status, 2026-08-26.** TA-ready initial state. The generator, the helper module, the
> reference implementation and both notebooks are built, run and verified. What is left is
> listed in `issue-prompts/` as six numbered units of work, all six of which now exist as
> files. Nothing here has been committed to git by the agent that built it.
>
> **Amendment, 2026-08-26, later the same day.** A verification pass over the whole tree found
> and fixed two defects, both recorded under `Corrections` at the foot of `README.md`: the
> generated CSV had mixed CRLF and LF line endings, and the ASCII punctuation guard in
> `precompute/build_notebooks.py` was written with the literal em dash and en dash it forbids.
> The same pass wrote the three missing issue prompts, 04, 05 and 06, and removed two quoted
> wall clock values that are measured on the run and were being presented as pinned. The whole
> verification chain was re-run afterwards and no number in the printed material moved.
>
> **Amendment, 2026-08-26, independent re-verification.** A second agent re-ran the whole chain
> without trusting the claims in `README.md`, and confirmed every one of them. The full account
> is under "Independent re-verification" in `README.md`. The three findings worth carrying
> forward: every one of the 47 lines the README presents as real output was found verbatim in
> the captured stdout; the assertions were mutation tested and do fire, so they are not
> decorative; and the notebook build is reproducible, since a rebuild returned both `.ipynb`
> files at their existing MD5. That pass changed two things only, both cosmetic: it deleted the
> `__pycache__` directories the tree had accumulated, and it replaced one rounded pair of
> figures in `README.md` prose with the exact pair the reference prints.

## What this is

| | |
|---|---|
| Slug | `hs26-bmai-w1-opt-rm-house` |
| Title | Robbins-Monro scaffold for house-price prediction |
| Owning TAs | **Ghali, Suei-Wen** |
| Lecture moment | Friday 4 September, the 10:00 CX block, third of three, after `hs26-bmai-w1-opt-heron` and `hs26-bmai-w1-opt-genie-rm`. It follows the 09:00 lecture "First-order approximation algorithms" and it feeds the 11:00 lecture "Gradient descent" |
| Schedule brief, verbatim | "Fit a model y = wx + b on a fictitious toy dataset of house measurements {(x1,y1),(x2,y2),...(xn,yn)}" |
| Format | One Google Colab notebook pair, plus a helper module, a seeded generator and a reference implementation |
| Design spec | `proposals/cx-house-price-rm.md` in this repository, read it in full before changing the pedagogy |
| Budget | 20 to 25 minutes of participant hands-on time |

The exercise is the hinge of the weekend. Heron and the genie solve for a number defined by
an equation. This one solves for a number defined by data, and the last act names the result
stochastic gradient descent, which is the right-hand column of the deck's page 56 table.

## Layout

```
hs26-bmai-w1-opt-rm-house/
  CLAUDE.md                       this file
  README.md                       what it is, how to run it, done versus not done
  requirements.txt                numpy, matplotlib. Nothing else is imported anywhere
  housetools.py                   THE helper module: loader, five figures, four checks,
                                  the debrief paste block. Single source of truth for
                                  everything the notebooks import
  data/
    CLAUDE.md                     contract for the data directory
    README.md                     the true w and b, the generating process, the honesty note
    generate_houses.py            seeded generator, SEED = 42
    houses.csv                    committed output of that generator, 12 rows
  notebooks/
    CLAUDE.md                     contract for the notebooks, read before touching an .ipynb
    house_price_rm.ipynb          student, GENERATED, 4 task cells carry ___ blanks
    house_price_rm_solutions.ipynb  solutions, GENERATED, identical except those 4 cells
  precompute/
    CLAUDE.md                     contract for the precompute directory
    reference.py                  every number the printed material quotes, printed and asserted
    build_notebooks.py            THE notebook source. Both .ipynb files are built from it
  issue-prompts/
    CLAUDE.md                     contract for the issue prompts
    01 through 06                 the remaining units of work
```

## The one rule that matters most here

**The two notebooks are generated. Edit `precompute/build_notebooks.py`, never an `.ipynb`.**
A hand edit to a notebook is silently destroyed the next time anybody runs the builder. This
is the mechanism that makes the FS26 student/solutions sync rule hold by construction rather
than by discipline: every cell is written once, a task cell carries a student body and a
solutions body that share their banner, their docstring and their closing `print`, and the
builder asserts that exactly the four task cells differ.

## Notation, pinned

Taken from the annotated deck, handwritten pages 28 to 34. The same words must be used by all
three `opt-` exercises of the 10:00 block.

| Symbol | Meaning | Source |
|---|---|---|
| `x` | the feature, living area | deck p28 |
| `y` | the target, asking price | deck p28 |
| `y_hat` | the prediction, `w * x + b` | deck p29, p30 |
| `l` | the signed miss, `y - y_hat` | deck p30, written in red |
| `alpha` | the step size | deck p30 |
| `eps` | the stopping tolerance in `abs(l) < eps` | deck p30 |
| `w` | slope, price per unit of area | deck p31, labelled "area" |
| `b` | base | deck p31, labelled "base" |

Three consequences, each of which someone will otherwise get wrong.

1. **The step is `alpha` and the tolerance is `eps`.** The 11:00 lecture spends `eps` a third
   time on the width of a finite difference window (deck p38). No exercise may use `eps` for a
   step size.
2. **The miss is target minus prediction and the update adds.** `l = y - y_hat`, and
   `w <- w + alpha * l`. That is deck p30 exactly. The genie exercise 40 minutes earlier writes
   the opposite pair, `loss = Q - target` with `Q := Q - alpha * loss`. Both move the estimate
   toward the target. The notebook says the flip out loud in act 2 rather than leaving the room
   to trip over it.
3. **Robbins-Monro names the proportional update.** Printed deck page 51 gives the same name to
   the sign-only rule. Handwritten p30 crosses the sign rule out and boxes the proportional one.
   This exercise follows the handwriting, calls the sign-only rule "the fixed step algorithm",
   and the TA card records that slide 51 disagrees.

## Working units, and why they are load bearing

The notebook works in `x = area / 100` and `y = price / 1000`, so the true parameters become
`w = 950` and `b = 120`. This is the single most important engineering decision in the exercise.
The usable range of `alpha` is set by the size of `x`:

| Rule | Stable while | In these units | In raw square metres |
|---|---|---|---|
| `w <- w + alpha * l` (acts 2 and 3) | `alpha < 2 / x` | `alpha < 0.9217` | `alpha < 0.0092` |
| `w <- w + alpha * l * x` (act 4) | `alpha < 2 / (x^2 + 1)` | `alpha < 0.3503` | `alpha < 0.000042` |

Both computed at the largest house, `x = 2.17`. In raw square metres a participant would be
typing `alpha = 0.00002` and would have no chance of feeling what the knob does. Do not "clean
up" the scaling.

## Deliberate departures from the FS26 house pattern

Record each of these before deciding one of them is a bug and fixing it back.

1. **No Gemini debrief coach, no API key, no client cell, no log download.** FS26 ships them
   because a system prompt has no ground truth. This exercise is a twenty line numeric loop with
   a checkable answer and four enumerable failure modes, all of which are diagnosed
   deterministically by `check_task_N`. Setting up an API key costs 4 to 5 minutes of a 20
   minute budget and introduces a failure mode that has nothing to do with optimization. What is
   kept is the cheap half: `generate_debrief_paste` renders the coaching contract plus the
   participant's own numbers and cell, for pasting into whatever assistant they already have
   open. Zero setup, zero keys, zero network.
2. **No repository clone.** FS26 setup cells run `git clone -b week3 ...`. No HS26 exercises
   repository exists yet (open question 3 below). The setup cell instead writes `housetools.py`
   and `houses.csv` from copies embedded in it, so the notebook is one self-contained file that
   works from a bare Colab runtime with no network at all. The builder asserts those embedded
   copies are byte identical to the files on disk, so the module stays the single source of truth.
3. **The generator lives in `data/`, not in `precompute/`.** The design spec puts it in
   `precompute/`. It sits next to its own output instead, so that `data/` is self contained and
   `data/README.md` can document the process beside the file it describes.
4. **Every loop takes `max_steps` or `n_epochs`.** No cell can hang a projector.

## Anti-collision with the other two exercises of the same block

| This exercise owns | This exercise must not teach |
|---|---|
| The model `y = w x + b` fitted to data | Heron's averaging update, which belongs to `opt-heron` |
| The step size that lands versus the step that orbits, on real residuals | The genie's fixed point `Q = 1 + 1/Q`, which belongs to `opt-genie-rm` |
| The naming of stochastic gradient descent | The finite difference window and the limit, which belong to the 11:00 lecture and the moonlander |
| The per-coordinate view, only as a stretch cell pointing forward | The grasshopper's one grasshopper per dimension, which belongs to the 12:00 block |

The three `opt-` exercises are the same widget three times: guess, computed target, verdict,
update, repeated in a table. If someone builds the shared scaffold Carlos asked for in his
handwritten TODO ("Come up with a scaffold of games and guide them"), this exercise should adopt
it rather than keep its own loop shapes.

## Verification, and how to re-run it

Everything below was run on 2026-08-26 with Python 3.11.1, numpy 1.26.4, matplotlib 3.10.8,
nbformat 5.10.4, nbclient 0.10.4.

```
python3 data/generate_houses.py        # rewrites data/houses.csv, byte identical every time
python3 precompute/reference.py        # prints every quoted number, then asserts each one
python3 precompute/build_notebooks.py  # rewrites both notebooks, asserts the sync rule
```

The reference ends on `All assertions passed.` and the builder ends on `All assertions passed.`
Executing the solutions notebook end to end is the fourth check and it is written out in
`notebooks/CLAUDE.md`.

## Open decisions for Carlos

These are recorded in the design spec as well. None of them is the next agent's to make alone.

1. **How long is the block really?** The schedule reads 10:00 CX and 10:30 coffee. If it is 30
   minutes for three exercises, the minimum viable path shrinks to acts 0, 2 and 4 and
   `PREFILL_TASK3` goes to `True`.
2. **Which repository do the notebooks clone from?** No `eth-bmai-hs26/coding-exercises` exists
   locally. The current answer is that they clone from nowhere and are self contained.
3. **The name Musterwil.** Confirm against the federal register of municipalities that it is not
   a real place, or pick another placeholder. The fictitious labelling stays either way.
4. **Sign convention across the three morning exercises.** This one follows the deck. The genie
   proposal keeps the AINIT convention. Either normalise the genie, or keep the flip and make it
   explicit in both, which is what this notebook does.
5. **Notebook naming for all of HS26.** This one picks `<name>.ipynb` and `<name>_solutions.ipynb`.
6. **Does the room see the true parameters at all?** This one reveals `w = 950, b = 120` in act 4,
   after the fit, and immediately uses the gap between them and the least squares line to point at
   Saturday's validation slot.

## Binding conventions

- ASCII punctuation only in every authored file, code and prose alike. No em dash, no en dash,
  and never a double hyphen used as a dash. The notebook builder asserts this on both `.ipynb`
  files, and it should stay that way.
- Never fabricate a number. Every value quoted in the README, in a notebook markdown cell or in
  an issue prompt is real output of `precompute/reference.py`. If a number moves, the reference
  fails loudly and the printed material is updated from its output.
- The toy data is synthetic and is labelled synthetic in the CSV header, in the generator
  docstring, in `data/README.md`, in the README, in the notebook title cell, in the closing cell
  and in every figure title.
- The answer is withheld until the participant has attempted it. `TRUE_W` and `TRUE_B` appear in
  no student cell before act 4, and no `check_task_N` prints them at all.
- Every directory carries its own CLAUDE.md.
