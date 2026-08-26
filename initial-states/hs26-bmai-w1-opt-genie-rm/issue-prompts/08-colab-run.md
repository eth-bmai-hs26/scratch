# Issue 8: Run the notebooks in Colab

## Goal

Open both notebooks in Google Colab, run them end to end, and fix whatever only shows up
there. The notebooks have been executed cell by cell through Python in a terminal and have
never been opened in Colab, so everything Colab-specific is unverified.

## Dependencies

None.

## Context

BMAI coding exercises are Colab notebooks. What the terminal run cannot check:

- **`# @title` collapsing.** The setup cell begins with
  `# @title Setup: the genie. Run this cell, then leave it alone.` and should render as a
  collapsed titled cell. It is a long cell, carrying the whole of `exercise/genie.py` inline,
  and if it does not collapse it dominates the notebook.
- **Markdown rendering.** The `### What just happened?` cells contain fenced code blocks and
  a markdown table. Colab's renderer is not the same as Jupyter's.
- **The `___` blanks.** In the student notebook, `current = ___` raises
  `NameError: name '___' is not defined`, which is the intended failure and should read
  clearly in Colab's traceback.
- **Task ordering.** Task 6 uses the `storm` function defined in task 5's cell. A participant
  who runs task 6 without completing task 5 gets a `NameError` from inside `storm`. Check
  that the message points at the right place.

The module is carried inline in the setup cell rather than cloned, which is the same call the
house-price exercise made: one cell, no network, and a participant on a hotel connection is
not stuck. Do not replace it with a `git clone`.

## Deliverables

### 1. A run of both notebooks in Colab

Fresh runtime, Run all, top to bottom. The solutions notebook must complete with no error.
The student notebook must fail at task 1's blank and nowhere earlier.

### 2. Fixes, applied to `exercise/build_notebooks.py` only

**The notebooks are generated.** A hand edit to an `.ipynb` is destroyed silently the next
time the builder runs. Every fix goes into the builder, and then:

```
python3 exercise/build_notebooks.py
```

### 3. A share link, and where it lives

If the notebooks are to be handed out by link rather than by file, record the link and the
sharing setting in `exercise/CLAUDE.md`, and say plainly whether the link is the student one
or the solutions one. Getting that backwards is the failure mode.

### 4. `exercise/CLAUDE.md` (updated)

A dated section recording: the Colab runtime the run used, whether `# @title` collapsed,
anything that rendered differently, and the total wall-clock time of a Run all. That last one
decides whether the notebook fits the block.

## File Structure

```
exercise/build_notebooks.py               (updated if anything needed fixing)
exercise/genie_robbins_monro.ipynb        (regenerated)
exercise/genie_robbins_monro_solutions.ipynb  (regenerated)
exercise/CLAUDE.md                        (updated)
```

## Verification

- Both notebooks Run all in Colab from a fresh runtime with the expected outcome.
- `python3 exercise/build_notebooks.py` still ends on `All assertions passed.`
- `python3 exercise/genie.py` still ends on `All assertions passed.`, which is the check that
  the inlined copy of the module still matches the file.
- The wall-clock time of a Run all of the solutions notebook is recorded.
- The generated notebooks are still pure ASCII:
  `LC_ALL=C grep -cP '[^\x00-\x7F]' exercise/*.ipynb` prints 0 for both.
