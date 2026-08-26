# CLAUDE.md, exercise/

The participant-facing coding half of `hs26-bmai-w1-opt-heron`. Owners: Jinlei, Daniele, Ivan.

Read `../CLAUDE.md` first for the sign convention, the Decimal rule and the anti-collision table.

## The one rule that matters here

**The two notebooks are generated. Edit `build_notebooks.py` and never an `.ipynb`.** A hand edit to
a notebook is destroyed silently the next time anybody runs the builder. That is how the FS26 student
and solutions sync rule holds by construction rather than by discipline.

A second rule follows from the first: **the four solutions bodies live in `reference.py`** and the
builder reads them with `inspect.getsource`. There is exactly one implementation of Heron in this
directory. Change the mathematics in `reference.py` and it arrives in the solutions notebook on the
next build.

## What is here

```
reference.py            the four functions plus the digit column, printed and asserted. 16 checks
build_notebooks.py      the cell list and the generator. 19 checks, including the sync rule
heron.ipynb             GENERATED. The student version, 17 cells, four of them TODO
heron_solutions.ipynb   GENERATED. Same 17 cells, differing only at indices 3, 5, 7, 9
CLAUDE.md               this file
```

Neither notebook needs the network, an API key, a `pip install` or a repository to clone. Everything
is the Python standard library, so a participant on hotel wifi is fine, and so is a participant with
no wifi.

## Commands

```
python3 exercise/reference.py         prints every number, then asserts each one
python3 exercise/build_notebooks.py   rewrites both notebooks and checks the sync rule
```

Both end on `All assertions passed.` Both are byte-deterministic: run either twice and `diff` the
output.

To check that the solutions notebook actually runs, execute its code cells in order:

```
python3 - <<'PY'
import json, io
nb = json.load(io.open("exercise/heron_solutions.ipynb"))
g = {}
for c in nb["cells"]:
    if c["cell_type"] == "code":
        exec(compile("".join(c["source"]), "<cell>", "exec"), g)
PY
```

The last line it prints is `digit column: 3 6 14 30 61`.

## The 17 cells

| # | Kind | Content |
|---|---|---|
| 0 | md | Title, the rectangle, the four functions, the promise of the digit column |
| 1 | code | `# @title` setup: `AREA`, the Decimal import, `NOTEBOOK_VERSION`, the banner |
| 2 | md | Task 1 |
| **3** | **task** | `other_side` |
| 4 | md | Task 2, including the sign convention |
| **5** | **task** | `verdict` |
| 6 | md | Task 3 |
| **7** | **task** | `heron_step` |
| 8 | md | Task 4 |
| **9** | **task** | `heron` |
| 10 | md | Why the sanity cell exists |
| 11 | code | The sanity check, given |
| 12 | md | The digit column, and the two traps |
| 13 | code | The digit column, given |
| 14 | md | Three discussion questions, no code |
| 15 | md | The LLM coach contract |
| 16 | md | What is next: the genie, house prices, 11:00 |

The builder asserts that exactly cells 3, 5, 7 and 9 differ between the two files.

## The numbers the notebook quotes

Every one is real output of `reference.py`, and `build_notebooks.py` re-checks each by running the
solutions code:

| Quoted | Value |
|---|---|
| `other_side(45.0)` | 45.022222222222226 |
| `other_side(10.0)` | 202.6 |
| `heron_step(45.0)` | 45.01111111111111 |
| `len(heron(theta0=45.0))` | 3, the start plus two corrections |
| `len(heron(theta0=10.0))` | 7, the start plus six corrections |
| 45 squared | 2025, so the first residual is exactly 1 |
| 46 squared | 2116 |
| The digit column | 3, 6, 14, 30, 61 |
| Bisection on 45 to 46 | 20 corrections to a width of 1e-6 |

The bisection figure comes from `../precompute/build_data.py`, which asserts it as `stepsTo1e6`.

## Decisions recorded here

**The stubs raise rather than returning a blank.** The design spec writes the stub as
`return ___`, which is a `NameError` at runtime. The generated student cells instead end on
`raise NotImplementedError("fill in other_side")`. The sanity cell catches that exception by type and
prints `Still to do: fill in other_side`, so a participant who runs everything top to bottom gets a
task list instead of a traceback. The `# TODO:` comment lines are kept verbatim from the spec.

**The debrief is three discussion questions plus a coach contract, with no paste-to-LLM machinery.**
The FS26 debrief apparatus (a JSON game log, `_analyze_log`, `generate_debrief_paste`, an ipywidgets
copy button) is built for a forty minute agent game and is too heavy for a ten minute exercise. Cells
14 and 15 are the lighter spine that the same FS26 repository uses for its non-agent exercises.

**On the coach contract, this exercise takes a side.** Two FS26 v1.5 notebooks disagree with each
other: the student version tells the model to output the complete cell every time, the solutions
version tells it never to return a complete drop-in function unprompted. **This exercise ships the
coach contract**, in cell 15, in the participant's own words so they can paste it. A model that hands
back the finished function has answered the question the participant was supposed to answer.

**One notebook or three for the 10:00 block is still open.** This pair covers Heron alone. Merging
all three exercises into one `hs26-bmai-w1-opt.ipynb` pays the Colab boot once instead of three
times, and it needs agreement from the other two TA teams. That is issue 08 in `../issue-prompts/`
and open question 2 for Carlos.

**There is no data file and no seeded generator here, because there is no data.** Every value is a
deterministic function of the area 2026 and the starting width. That is the strongest form of
reproducibility available: the file reproduces because there is nothing to reproduce.

## What NOT to do

- Do not edit `heron.ipynb` or `heron_solutions.ipynb`. See the first section.
- Do not write a second implementation of `heron_step` in `build_notebooks.py`. It reads
  `reference.py`.
- Do not compute the digit column in floats. It reads 3, 6, 14, 16, 16 that way, and the doubling
  disappears at exactly the step that makes the point. `reference.py` prints both columns so the
  claim is checkable.
- Do not quote a number in a markdown cell that `reference.py` does not print. The builder greps the
  emitted notebook for the important ones, and a number it cannot find fails the build.
- Do not add a `pip install`, a clone, or an API key. This notebook runs offline and that is a
  feature of a ten minute exercise.
- Do not introduce a step size or a learning rate. Heron has neither. See the anti-collision table in
  `../CLAUDE.md`.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a new or
  removed cell, a changed task, a changed number, a changed build command, or a settled open
  decision, UPDATE THIS FILE IN THE SAME COMMIT. A CLAUDE.md that describes a layout the directory no
  longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
