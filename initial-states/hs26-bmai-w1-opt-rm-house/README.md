# Robbins-Monro scaffold for house-price prediction

CAS BMAI HS26, weekend 1, Friday 4 September, the 10:00 coding block.
Exercise slug `hs26-bmai-w1-opt-rm-house`. TAs **Ghali** and **Suei-Wen**.

Third of three exercises in the block, after Heron's algorithm and the genie game. The same
guess, check, correct loop that found a square root and satisfied a genie now fits a price
model on twelve fictitious houses, and the last act shows that the update the lecturer boxed
on the board is one step of stochastic gradient descent.

**All data in this exercise is fictitious.** Musterwil is an invented municipality. The twelve
houses were produced by a committed generator with a fixed seed. The prices are invented.
Nothing here is a fact about Swiss housing.

## What a participant does

| Clock | Act | They do |
|---|---|---|
| 0:00 to 0:03 | Cell 0 and setup | Open the notebook, run two cells |
| 0:03 to 0:05 | Act 0, the lecture house | Run one prewritten cell, see the blackboard reproduced |
| 0:05 to 0:10 | Act 1, the fixed step | Fill 4 blanks, watch the estimate orbit and never stop |
| 0:10 to 0:14 | Act 2, Robbins-Monro | Fill 1 blank, watch it land in 8 steps |
| 0:14 to 0:20 | Act 3, `w` and `b` on 12 houses | Fill 3 blanks, watch the fit line move |
| 0:20 to 0:25 | Act 4, the naming | Fill 2 blanks, read the comparison table |
| after | Extensions A, B, C | Only for the fast half of the room |

Ten blanks in four task cells. The minimum viable path is acts 0, 1, 2 and 4, which is seven
of the ten. Act 3 is the first thing to cut under time pressure: the TA sets `PREFILL_TASK3 =
True` in the setup cell and a prewritten cell hands the room a finished loop.

## How to run it

Nothing is built and nothing is installed beyond two libraries that Colab already has.

```
pip install -r requirements.txt          # numpy, matplotlib. Only needed off Colab
```

**As a participant.** Open `notebooks/house_price_rm.ipynb` in Colab or Jupyter and run the
cells in order. The setup cell writes `housetools.py` and `houses.csv` next to the notebook
from copies embedded in it, so the notebook is self contained: no repository to clone, no API
key, no network call anywhere.

**As a TA.** Open `notebooks/house_price_rm_solutions.ipynb` the same way. It runs top to
bottom with no errors.

**As the next agent.** Three commands, in this order:

```
python3 data/generate_houses.py        # rewrites data/houses.csv, byte identical every time
python3 precompute/reference.py        # prints every number quoted below, then asserts each
python3 precompute/build_notebooks.py  # rewrites both notebooks from source, asserts the sync rule
```

The two notebooks are **generated**. Edit `precompute/build_notebooks.py`, never an `.ipynb`.

## What was verified, and what was actually observed

Run on 2026-08-26, Python 3.11.1, numpy 1.26.4, matplotlib 3.10.8, nbformat 5.10.4,
nbclient 0.10.4. Every number below is copied from the real output of the commands named.

The whole chain was re-run after the two corrections listed under `Corrections` at the foot of
this file, and not one number below moved. The check for that is in the corrections section
itself: the reference output was diffed against the run from before the edits.

**Independent re-verification, 2026-08-26.** A second agent re-ran the whole chain from a clean
checkout rather than trusting this file, and confirmed it. What that pass did, and found:

- Ran `data/generate_houses.py` twice. Both runs left `houses.csv` at MD5
  `1ecea12797b452eb1968c4acf54edb2d`, `file` reports `ASCII text`, and the two stdout dumps are
  identical, so the generator is deterministic.
- Ran `precompute/reference.py`. Exit 0, ending on `All assertions passed.`
- Extracted every line this README presents inside a fenced block as real output, 47 lines in
  all, and searched for each one verbatim in the captured stdout of the three commands. All 47
  were found. The only fenced lines not found are the four `python3 ...` and `pip install ...`
  command lines, which are instructions rather than output.
- Ran `precompute/build_notebooks.py`. Both `.ipynb` files came back at the identical MD5 they
  had before the rebuild, so the build is reproducible.
- Validated both notebooks two ways, which is the check the build task specified:
  `python3 -c "import json; json.load(open(PATH))"` succeeded on each, and `nbformat.read`
  followed by `nbformat.validate` succeeded on each under nbformat 5.10.4. Both are 38 cells,
  nbformat 4.5.
- Re-derived the sync rule independently of the builder's own report, by loading both files with
  `json` and comparing cell sources: 38 cells each, differing at indices 6, 11, 16 and 23, all
  four of them the task cells, carrying 4, 1, 3 and 2 blanks for 10 in total.
- Executed the solutions notebook with `nbclient` and `allow_errors=False`: clean in 5.5 s, zero
  error outputs, five figures. Executed the student notebook untouched with `allow_errors=True`:
  the four check cells print the blank message and six downstream cells raise plain `NameError`,
  which is the documented behaviour.
- Checked all 22 files for punctuation: zero bytes above 127 anywhere, and zero whitespace
  flanked double hyphens. Confirmed a `CLAUDE.md` in the root and in all four subdirectories.
- Mutation tested the assertions, because an assertion that never fires is worthless. Changing
  the seed from 42 to 43 fails on `the committed CSV disagrees with the generator`. Flipping one
  `+` to `-` in the act 3 update fails on the act 3 assertion. The baseline passes again once
  both are reverted.
- Rendered all six figure functions to PNG at 110 dpi and looked at them. The act 1 orbit shows
  the sawtooth never touching the dashed exact answer, the act 2 panel shows the smooth landing
  on it, the fit grid shows the line walking onto the twelve points, and the loss surface panel
  shows the path descending to the least squares marker. Every title carries the fictitious
  label. Colours are the Okabe-Ito blue and vermillion, with no red and green pair anywhere.

That pass changed two things and nothing else: it deleted the `__pycache__` directories left in
the tree, and it replaced the prose "within 0.033 and 0.048" above with the two figures the
reference actually prints.

### The fixed step algorithm orbits and never settles

Real output of `python3 precompute/reference.py`, section 3. House 1 of the table, `x = 1.01`
and `y = 1083.0`, starting from `w = 900` with `alpha = 10` and `eps = 1`:

```
  house 1: x = 1.01, y = 1083.0, exact answer y/x = 1072.2772
  alpha 10, eps 1 : stopped False after 400 steps
                    last six w      [1070.0, 1080.0, 1070.0, 1080.0, 1070.0, 1080.0]
                    last six misses [2.3, -7.8, 2.3, -7.8, 2.3, -7.8]
                    the tail visits exactly 2 values: [1070.0, 1080.0]
  alpha 10, eps 12: stopped True after 17 steps, w = 1070.0, miss = 2.3
```

It ran out of steps rather than stopping. Over its last forty steps it visited exactly two
values, `1070.0` and `1080.0`, and the exact answer `1072.2772` lies between them and is never
reached. Widening the tolerance to 12 makes it stop after 17 steps, which is a hollow kind of
stopping and the notebook says so.

### The Robbins-Monro update converges

Real output, section 4, same house, `alpha = 0.5`, `eps = 1`:

```
  the miss is multiplied by (1 - alpha * x) each step, so this
  loop converges while alpha < 2 / x = 1.9802
  alpha 0.5: stopped True after 8 steps, w = 1071.6563
             trace [900.0, 987.0, 1030.06, 1051.38, 1061.93, 1067.16, 1069.74, 1071.02, 1071.66]
  alpha 1.9: stopped False after 60 steps, w = 1071.1929
  alpha 2.2: stopped False after 60 steps, w = -28872480.7323
```

Eight steps against four hundred that never arrived. The divergence at `alpha = 2.2` is real
and the threshold `alpha < 2 / x = 1.9802` is exact.

### Two parameters on twelve houses

Real output, sections 5 and 6. Both runs start from `(w, b) = (500, 0)`.

```
  alpha 0.1,   3600 steps: w = 937.1679  b = 142.5066  mse = 303.4612
  alpha 0.1,  20000 steps: w = 952.2939  b = 126.5448  mse = 349.8506
  more steps do not settle it. Over the last 1200 of those 20000 steps
  w rattles across a band of width 14.99 and b across a band of width 13.84.
```

```
  alpha 0.05, 300 passes : w = 947.8121  b = 124.6350  mse = 281.6283
  a constant step still rattles: band widths 10.84 and 6.28
  alpha_t = 0.3 / (1 + t/200), 300 passes : w = 948.6542  b = 124.1379  mse = 281.1516
  the same shrinking step, 3000 passes    : w = 948.8507  b = 123.6332  mse = 281.102582
  it settles: band widths 0.4199 and 0.2420, and it is 0.0322 away in w and
  0.0480 away in b from the best possible line.
```

**Read that carefully, because the honest claim is narrower than "it converges to the true w
and b".** What was observed is this:

- The **act 3 rule** and the **act 4 rule with a constant step** both reach the right
  neighbourhood and then rattle inside it forever. Twenty thousand steps did no better than
  three thousand six hundred. This is correct behaviour for a constant step on noisy data, and
  the exercise uses it as the door into act 4.
- Only the **act 4 rule with a shrinking step** settles. After 3000 passes it sits at
  `w = 948.8507, b = 123.6332`, with the last 1200 iterates moving across a band of width
  0.42 in `w` and 0.24 in `b`.
- It settles on the **least squares line for this sample**, `w = 948.8828, b = 123.5852`,
  which it reaches to within 0.0322 in `w` and 0.0480 in `b`, which are the two figures the
  reference prints rather than a rounding of them.
- The **generating line** is `w = 950, b = 120`. The loop does not converge to it, and it
  should not: the generator added Gaussian noise to every price, so the twelve houses are not
  on the line they came from. The mean squared error of the true line on this sample is
  284.8125, which is worse than the least squares line's 281.1024. The notebook reveals both
  numbers in act 4 and uses the gap to point at Saturday's validation slot.

### The deck's own batch rule does not identify the slope

Real output, section 7. This reproduces a defect in the source deck deliberately, as an
optional discovery. 20000 passes at `alpha = 0.05`:

```
    from (500.0, 0.0)   w =  830.3397  b =  305.0550  mse = 2470.5850   w*mean(x)+b = 1576.1667
    from (1200.0, 0.0)  w = 1093.7236  b =  -98.1418  mse = 3549.7660   w*mean(x)+b = 1576.1667
    from (950.0, 120.0) w =  950.7640  b =  120.7055  mse =  281.6538   w*mean(x)+b = 1576.1667
    mean(y) = 1576.1667. One equation cannot pin down two numbers.
```

Deck pages 32 and 34 write the loss as the mean **signed** residual. Its zero set is one
equation in two unknowns, so it pins down the line through the centre of mass and leaves the
slope wherever it started. The required path of the exercise does not use this rule. Extension
A does, and lets the participant find out why it fails.

### The four checks pass right loops and catch wrong ones

Real output, section 9. Four correct implementations and four deliberately wrong ones:

```
  correct implementations, all four should print PASS:
PASS  Task 1 looks right: 10 steps of size 1.0, landing on w = 10.0.
PASS  Task 2 looks right: 33 steps, landing on w = 10.0 to six decimals.
PASS  Task 3 looks right: w is updated, the miss is measured again, then b is updated.
PASS  Task 4 looks right: the slope carries the factor x and the base does not.
  wrong implementations, all four should print FAIL:
FAIL  The first step went down, from a prediction that was too low. Read the miss out loud with its sign, then check which branch subtracts alpha.
FAIL  w is running away from the answer. The miss is positive here, so the update has to add.
FAIL  You updated w and then reused the old miss for b. Page 31 measures the miss a second time, because moving w changed the prediction.
FAIL  This is the task 3 rule again. The derivative of the squared loss with respect to w carries a factor x.
```

The reference ends on `All assertions passed.` followed by a measured wall clock, which is
about one second on a laptop. That number is timed on the run, so it is not pinned and it is
not quoted anywhere as an expected value.

### The notebooks

`python3 precompute/build_notebooks.py` reports:

```
  cells in each file            : 38
  cells that differ             : [6, 11, 16, 23]
  all four are the task cells   : True
  NOTEBOOK_VERSION              : v1.0
  embedded housetools.py matches: True
  embedded houses.csv matches   : True
  nbformat 5.10.4 validated both files
```

Both notebooks were then executed with `nbclient`:

- **Solutions**, executed top to bottom with `allow_errors=False`, finished clean in about 5 to
  7 seconds with zero errors and five figures, each rendered exactly once.
- **Student**, executed untouched with every blank still `___`, behaves as intended: the four
  check cells print
  `FAIL  There is still a ___ in the cell above. Fill in every line marked COMPLETE THIS LINE,
  then run both cells again.`
  and the cells downstream of an unfilled task raise a plain
  `NameError: name 'hist' is not defined`, which reads as "you have not run the previous cell
  yet". The debrief cell and extension B degrade gracefully instead of raising.

All five figures were rendered to PNG and looked at.

## Done

- `data/generate_houses.py`, seeded at 42, and `data/houses.csv` produced by running it. Three
  consecutive runs gave the identical MD5, so the generator is deterministic.
- `data/README.md`, recording the true `w` and `b`, the generating process and the honesty note.
- `housetools.py`: the CSV loader, `mse`, a closed form `least_squares`, five matplotlib
  figures, the four `check_task_N` diagnostics, and `generate_debrief_paste`.
- `precompute/reference.py`: prints every number this README quotes and asserts each one.
- `precompute/build_notebooks.py`: the single source for both notebooks, with the sync rule,
  the embedded-copy drift guard and the ASCII punctuation rule all asserted.
- `notebooks/house_price_rm.ipynb` and `notebooks/house_price_rm_solutions.ipynb`, 38 cells
  each, differing in exactly the four task cells, both valid nbformat.
- Per-directory CLAUDE.md files, one in each of the five directories.
- `issue-prompts/`, six numbered units of work in the FS26 format, with the dependency graph
  between them recorded in `issue-prompts/CLAUDE.md`.

## Not done

Written up as six numbered units of work in `issue-prompts/`, which is the whole of what
remains. The dependency graph between them is in `issue-prompts/CLAUDE.md`.

1. **The TA card** (issue 01). One printed page: the six participant mistakes with the sentence
   to say, the slide 51 disagreement, the genie sign flip, the `190.000` arithmetic slip on
   deck page 32, the extension A table and the collapse plan. The content exists in the design
   spec and in the reference output. Nobody has laid it out.
2. **A run in real Google Colab** (issue 05). Everything above was executed with `nbclient` on
   a local CPython 3.11. Nobody has opened either notebook in Colab, so the `# @title` collapsing,
   the figure sizes on a projector and the behaviour of the paste block's copy affordance are
   unverified there.
3. **The second feature** (issue 04). Extension C is prose only, and it says so on the page:
   there is no stub, no check and no second column. `generate_houses.py` produces area and
   price only, so issue 04 adds the room count to the generator and turns the extension into a
   real task.
4. **The `plot_houses` figure is unused** (issue 02). It exists in `housetools.py` and no
   notebook cell calls it, which was confirmed by grep. Either act 0 gains a scatter of the
   twelve houses, or the function goes.
5. **The publishing target** (issue 05). No `eth-bmai-hs26/coding-exercises` repository exists
   locally, so there is no decided answer to "where does a participant get this notebook".
6. **The name Musterwil** is unverified against the federal register of municipalities.
7. **The shared scaffold** across the three `opt-` exercises, which is Carlos's own handwritten
   TODO, is not built. This exercise keeps its own loop shapes.
8. **Five of the nine known participant mistakes have no check** (issue 03). Four
   `check_task_N` branches are proven to fire, one per task. The design spec lists nine failure
   modes, so a participant can hit one of the other five, see `PASS`, and carry a wrong loop into
   the next act.
9. **The handover itself** (issue 06). Bringing the six documents back into agreement with the
   code after the other five issues move it, and writing the TA handover section, is a unit of
   work in its own right and it is deliberately last.

## The deck, and two defects in it

The exercise is built against the annotated deck at
`bmai_w1_sml_annotated (1).pdf`, handwritten pages 28 to 34.

| Deck page | What it says | Where it lands |
|---|---|---|
| p29 | `x = 234`, `y = 198789`, the trace `w = 900, 350, 850, 849.5` | Act 0, prewritten |
| p30 | The fixed step rule, the whole `if/else` crossed out with an X, and the boxed `w <- w + alpha * l` | Acts 1 and 2 |
| p31 | `y = wx + b`, alternating, with the miss recomputed between the two updates | Act 3 |
| p32, p34 | The batch rule with the mean signed residual | Extension A, as a discovery |
| p56 | The 1982 versus today table, training algorithm row | Act 4 |
| p57, p59 | The two sentences naming the upgrades | Act 4, quoted |

**Defect 1, arithmetic on p32.** The annotation reads `w_0 = 850 -> y_hat = 190.000` with
`y - y_hat = 8789`. But `850 * 234 = 198900`, so the stated residual is consistent with a
prediction of 190,000 and inconsistent with the stated `w_0`. The notebook uses `198900` and
the residual `-111`, which is what the arithmetic gives and what p29 itself writes.

**Defect 2, the batch rule.** Described above. The exercise takes the per-house route on the
required path and shows the failure in extension A, and page 59 backs that choice: using a
subset of the data at each iteration is exactly the upgrade that produces stochastic gradient
descent.

Neither defect is inherited silently. Both are named on the TA card so that a participant who
spots the mismatch gets a straight answer.

## Corrections

Recorded in place, with the date, rather than by rewriting the history above.

**2026-08-26, mixed line endings in `data/houses.csv`.** `csv.writer` defaults to CRLF, so the
header note was written with a plain LF and the twelve rows with CRLF, and `file` reported
`ASCII text, with CRLF, LF line terminators`. The notebook embeds a copy of this file in its
setup cell and writes it back out at run time, which makes mixed endings a trap on a Windows
runtime. `data/generate_houses.py` now passes an explicit `lineterminator="\n"`. The CSV is now
`ASCII text`, its MD5 is `1ecea12797b452eb1968c4acf54edb2d`, and its content is identical to the
previous file apart from the removed CR bytes, which was confirmed with
`diff <(tr -d '\r' < old.csv) data/houses.csv`.

**2026-08-26, the ASCII guard was not itself ASCII.** `precompute/build_notebooks.py` asserted
that the notebooks carry no em dash and no en dash by comparing against the literal characters,
so the file enforcing the house rule was the one file in the tree that broke it. The two
literals are now written as `\u2014` and `\u2013` escapes, and the double hyphen test builds
its needle from `"-" * 2`. The guard was then tested against doctored inputs and still fires on
an em dash, on an en dash and on a whitespace flanked double hyphen, and still passes
`--verbose` and `x--y`, which are not dashes.

After both corrections: `python3 precompute/reference.py` and
`python3 precompute/build_notebooks.py` both end on `All assertions passed.`, the reference
output is unchanged apart from its measured wall clock, both notebooks still validate, the
solutions notebook still executes with zero errors, and the student notebook still prints the
blank message from all four checks.
