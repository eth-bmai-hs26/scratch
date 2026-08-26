# CLAUDE.md, notebooks/

Contract for the notebook directory of `hs26-bmai-w1-opt-rm-house`.

## Read this before you open an .ipynb

**Both notebooks are generated. Edit `../precompute/build_notebooks.py`, never a file in this
directory.** A hand edit here is destroyed the next time anybody runs the builder, without a
warning and without a conflict.

The reason is the FS26 sync rule. In FS26 the student and solutions notebooks are kept in step
by discipline, and the measured result is good but fragile: `rag_exercise` has 34 cells each
with exactly 5 differing. Here every cell is written once in the builder, a task cell carries a
student body and a solutions body that share their banner, docstring and closing `print`, and
the builder asserts the outcome. The sync rule holds by construction.

## The files

| File | What it is |
|---|---|
| `house_price_rm.ipynb` | Student. 38 cells. Four task cells carry `___` blanks |
| `house_price_rm_solutions.ipynb` | Solutions. 38 cells. Identical except those four |

`NOTEBOOK_VERSION` is `v1.0` and it is identical in both, set in one place in the builder.

## The cell spine

38 cells. Cell 1 is the setup. The four task cells are at indices 6, 11, 16 and 23, which the
builder prints on every run.

```
 0  md    title, the fictitious note, the three sentences, how the notebook works
 1  code  @title Setup: writes housetools.py and houses.csv, imports, prints the 12 houses
 2  md    act 0 header
 3  code  act 0, the lecture house, prewritten
 4  md    what just happened
 5  md    act 1 header, the notation and the units
 6  code  TASK 1, four blanks
 7  code  check, then the orbit run and the eps = 12 run, guarded on the check
 8  code  figure: the orbit
 9  md    what just happened
10  md    act 2 header, including the sign convention box
11  code  TASK 2, one blank
12  code  check, then alpha 0.5 and the three alpha sweep, guarded
13  code  figure: the landing
14  md    what just happened
15  md    act 3 header
16  code  TASK 3, three blanks
17  code  the PREFILL_TASK3 collapse plan
18  code  check, then 3600 and 20000 steps, guarded
19  code  figure: the fit grid
20  code  figure: the loss curve
21  md    what just happened
22  md    act 4 header, the derivative of the squared loss
23  code  TASK 4, two blanks
24  code  check, then the five row comparison table, guarded
25  code  the reveal of the generating line, and the gap to least squares
26  code  figure: the loss surface and the path
27  md    the naming, with the p56 table and the p57 and p59 quotes
28  md    extensions header
29  md    extension A header
30  code  extension A, the deck's batch rule from three starting points
31  md    what just happened in extension A
32  md    extension B, the shrinking step and the classical conditions
33  code  extension B, constant step against shrinking step
34  md    extension C, a second feature, honestly unfinished
35  md    the paste block, what it is for
36  code  @title the paste block, works whether or not the loops ran
37  md    what comes next, and the closing fictitious reminder
```

## Conventions that are load bearing

1. **The setup cell embeds `housetools.py` and `houses.csv` as `r'''...'''` literals** and
   writes them next to the notebook, so there is no repository to clone and no network call.
   The builder asserts both embedded copies are byte identical to the files on disk, so
   `housetools.py` remains the single source of truth. It also asserts the module contains no
   triple single quote, which is what would break the embedding.
2. **Every runner cell is guarded on its check**, as `if H.check_task_N(fn):`. Without the guard
   an unfilled notebook throws a traceback from inside the participant's own function, which
   reads as a bug in the exercise. With it, the participant sees one `FAIL` line naming the
   problem and nothing else.
3. **The `___` blank is checked by reading the source, not by running it.** IPython pre-binds
   the names `_`, `__` and `___` to the last three results, so a leftover `___` evaluates to the
   empty string rather than raising `NameError`, and the participant would otherwise see
   `TypeError: bad operand type for abs(): 'str'`. `housetools._has_blank` runs
   `inspect.getsource` over the function and looks for `___` outside comments, and every
   `check_task_N` calls it first. This was found by executing the untouched student notebook,
   and it is the reason to keep doing that.
4. **Figure cells end in a semicolon.** Without it a figure renders twice in the notebook, once
   as the cell's `execute_result` and once through the inline backend's flush hook. This was
   also found by executing and counting outputs, and is invisible when reading the source.
5. **`# @title` marks a cell collapsible in Colab.** It is used on the setup cell and the paste
   block, and never on a cell the participant edits.
6. **ASCII punctuation only.** The builder asserts no em dash, no en dash and no double hyphen
   used as a dash, on the rendered `.ipynb` files rather than on the builder source.
7. **No cell can hang a projector.** Every loop takes `max_steps` or `n_epochs`. The whole
   solutions notebook executes in about 5 to 7 seconds.

## How to verify a change

```
python3 precompute/build_notebooks.py     # rebuild, and assert the sync rule and the ASCII rule
```

Then execute both, which is the check that catches everything the builder cannot see:

```python
import nbformat
from nbclient import NotebookClient

# the solutions notebook must run top to bottom with no errors
nb = nbformat.read("notebooks/house_price_rm_solutions.ipynb", as_version=4)
NotebookClient(nb, timeout=600, kernel_name="python3",
               resources={"metadata": {"path": "notebooks"}}).execute()

# the student notebook, untouched, must FAIL its four checks with the blank message
nb2 = nbformat.read("notebooks/house_price_rm.ipynb", as_version=4)
NotebookClient(nb2, timeout=600, kernel_name="python3", allow_errors=True,
               resources={"metadata": {"path": "notebooks"}}).execute()
```

Executing the notebook writes `housetools.py` and `houses.csv` into the working directory you
point it at. Point it at a scratch directory rather than at this one, or the copies will sit
beside the notebooks and confuse the next reader.

Then extract the PNGs and **look at them**. The last two defects found in this exercise were
both invisible in the source and obvious in the image: a 400 step orbit painted whole collapses
into a solid band that hides the alternation the act is about, and a legend placed lower left
sat on top of the starting marker.

## Not done

- **Nobody has opened either notebook in real Google Colab.** Everything was verified with
  `nbclient` against a local CPython 3.11. The `# @title` collapsing, figure legibility on a
  projector, and the paste block on a Colab runtime are unverified there. This is
  `issue-prompts/05`.
- There is no `Open in Colab` badge, because there is no decided hosting location.
