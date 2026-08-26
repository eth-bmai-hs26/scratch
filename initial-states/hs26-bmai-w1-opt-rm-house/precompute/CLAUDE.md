# CLAUDE.md, precompute/

Contract for the precompute directory of `hs26-bmai-w1-opt-rm-house`.

Neither file here is loaded at runtime by anything a participant opens. Both are build and
verification tools, and both are meant to be run by an agent or a TA.

## The two files

| File | Role |
|---|---|
| `reference.py` | The single source of truth for every number the printed material quotes |
| `build_notebooks.py` | The single source of truth for both notebooks |

## reference.py

It prints every number quoted in `README.md`, in `data/README.md`, in the notebook markdown
cells and in the issue prompts, and then asserts each one. A change to the generator or to an
algorithm fails here loudly instead of leaving the code and the prose quietly disagreeing.

Run it with `python3 precompute/reference.py`. It ends on `All assertions passed.` followed by
a wall clock, which is about one second on a laptop. The wall clock is measured, not pinned, so
do not quote a particular value of it anywhere.

What it asserts, by section:

1. The committed CSV equals a fresh call to `make_houses()`, the first three areas are
   101, 101, 102 and the last is 217, least squares gives `w = 948.8828, b = 123.5852` with
   mse 281.1024, `mean(x) = 1.5308`, `mean(y) = 1576.1667`, and the true line scores worse on
   this sample than the least squares line does.
2. Act 0 reproduces the blackboard: the four misses are exactly `-11811.0, 116889.0, -111.0, 6.0`.
3. Act 1 orbits: 400 steps without stopping, the last six values alternate `1070.0, 1080.0`,
   the last forty visit exactly two distinct values, and the final value is not the exact answer.
   With `eps = 12` it stops after 17 steps.
4. Act 2 lands in 8 steps at `w = 1071.6563`, the exact answer is `1072.2772`, `alpha = 2.2`
   drives it below minus 28 million, and `alpha = 1.9` fails to stop within 60 steps.
5. Act 3 reaches `w = 937.1679, b = 142.5066, mse = 303.4612` and then **rattles**: over the
   last 1200 of 20000 steps the iterates move across a band wider than 10 in both coordinates.
6. Act 4 with a constant step also rattles. With a shrinking step it **settles**: bands narrower
   than 1.0 in both coordinates, and within 0.05 of the least squares line in both. Sweeping the
   houses in area order instead of shuffling is at least 15 percent worse.
7. Extension A: the deck's batch rule started from `(500, 0)` and from `(1200, 0)` ends at two
   different slopes more than 100 apart, and both satisfy `w * mean(x) + b = mean(y)` to within
   1e-6.
8. The sign error trace, for the TA card.
9. The four checks accept four correct implementations and reject four deliberately wrong ones.
   The wrong ones are constructed here, one per known participant mistake.

Section 9 is the part worth protecting. A check that never rejects anything is worthless, and
the only way to know it rejects is to hand it a wrong loop on purpose.

## build_notebooks.py

Described in `notebooks/CLAUDE.md`. In short: every notebook cell is written once here, and the
script writes both `.ipynb` files and then asserts that they are valid JSON, valid nbformat,
the same length, differing in exactly the four task cells, sharing their banners and closing
lines, carrying the blanks only in the student file, embedding byte identical copies of
`housetools.py` and `data/houses.csv`, and free of em dashes, en dashes and double hyphens.

## Rules

1. **Run `reference.py` after any change to `housetools.py`, `data/generate_houses.py` or an
   algorithm.** The two files share the algorithms by copy, deliberately: the notebook must show
   a participant a self contained loop, so the loops are written out in the notebook and again
   in the reference. `reference.py` is what keeps the copies honest, because it asserts the same
   numbers the notebook prints.
2. **Never quote a number in prose that this file does not print.** If a new number is wanted in
   the README or on the TA card, add it to the report section here first, run it, and copy the
   output.
3. **`precompute/` is not served and not shipped.** In the FDD publishing convention the
   precompute directory is deleted from what gets deployed. Nothing here may become a runtime
   dependency of a notebook.
4. The `# ---- asserts ----` block at the bottom of `reference.py` is the acceptance criteria of
   the design spec, in executable form. Adding an acceptance criterion means adding an assert.
