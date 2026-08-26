# Issue 5: The real Colab run, and where the notebook lives

## Goal

Everything in this exercise was verified by executing the notebooks with `nbclient` on a local
CPython 3.11. Nobody has opened either file in Google Colab, and nobody has decided how a
participant gets to them on the morning of Friday 4 September. Close both gaps. A notebook that
runs under `nbclient` and fails in Colab fails in front of the room, and a notebook with no
published address is not deliverable however well it runs.

## Dependencies

None. This issue needs a browser, a Google account and a decision from Carlos on the hosting
question. It can start immediately and it does not touch any file the other five issues touch,
apart from the README section it hands back.

## Context

The exercise is the third of three in a 20 to 25 minute block and it is the only Colab notebook
of the morning, so it pays the full setup cost alone: opening Colab, signing in, and running the
setup cell. Every minute spent there is taken from act 4, which is the punchline of the weekend.
That is why the notebook has no API key cell, no client cell and no repository clone.

**What the setup cell does, and why it is unusual.** It writes `housetools.py` and `houses.csv`
next to the notebook from copies embedded in its own source, so there is nothing to clone and no
network call anywhere. `precompute/build_notebooks.py` asserts that both embedded copies are
byte identical to the files on disk. This is a deliberate departure from the FS26 pattern, which
runs `git clone -b week3 https://github.com/eth-bmai-fs26/coding-exercises.git`, and the reason
is recorded in the root `CLAUDE.md` under departures. The departure exists because **no HS26
exercises repository exists**, which is the second half of this issue.

**What is known to work, and where.** Measured on 2026-08-26, Python 3.11.1, numpy 1.26.4,
matplotlib 3.10.8, nbformat 5.10.4, nbclient 0.10.4:

- the solutions notebook executed top to bottom with `allow_errors=False` in about six seconds,
  zero error outputs, zero stderr, five figures each rendered once;
- the student notebook, run untouched with every blank still `___`, printed the blank message
  from all four checks and raised only `NameError` downstream of an unfilled task.

Colab differs from that runtime in at least these ways, and each one is a thing to look at
rather than a thing to assume: the `# @title` comment collapses a cell, and nothing local
renders that; `ipywidgets` behaves differently, and the debrief paste block uses a textarea and
a copy affordance; figure sizes are set for a projector, not for a laptop; and the Colab numpy
and matplotlib versions are whatever Google ships that week.

## Deliverables

### 1. A real Colab run of both notebooks

Upload both files to Colab on a fresh runtime, with no local files present, and run each from
`Runtime` then `Run all`.

Record, in a new section of `README.md` titled `Verified in Colab`:

- the date of the run, the Colab Python version, and the numpy and matplotlib versions Colab
  reported, read off a cell rather than assumed;
- whether the setup cell wrote both files successfully with no network available to it;
- total wall clock for the solutions notebook, from the Colab cell timers;
- the state of each of the five figures, described in one line each after looking at them at
  projector size;
- the behaviour of the debrief paste block: whether the copy affordance works, and whether the
  textarea renders read only as intended;
- every warning Colab printed, quoted, or the sentence that it printed none.

### 2. A verdict on the `# @title` collapsing

The setup cell and the debrief helper cells are marked `# @title` on the assumption that Colab
collapses them and keeps the participant's eye on the task cells. Confirm that it does, on both
files, and record what a participant actually sees on first open: which cells are collapsed,
which are expanded, and whether the first thing on screen is the title cell.

If it does not behave as assumed, say so plainly and propose the fix rather than applying a
cosmetic patch. The cells are generated, so any fix belongs in `precompute/build_notebooks.py`.

### 3. A decision on hosting, written down

The open question, recorded in the root `CLAUDE.md` and in the design spec, is where the
notebooks live on the morning. The three candidates, with what each costs:

| Option | What it needs | What it costs the participant |
|---|---|---|
| A new `eth-bmai-hs26/coding-exercises` repository with an `Open in Colab` badge | Somebody creates the repository and pushes | One click from the master schedule, and the tab is warm before the block starts |
| Moodle file upload, the way `Minimum Lander Exploration.html` was delivered | Nothing new | Download then upload to Colab, which is the slowest path and the one most likely to strand somebody |
| Colab shared link, one per exercise | A Drive folder and sharing set to the course | One click, but no version control and no diff |

Do not choose alone. Present the three with the costs above, take Carlos's answer, and record it
in the root `CLAUDE.md` under open decisions, replacing the open question with the decision and
its date. If the answer is the repository, this issue also creates it and pushes, and updates
every path in `README.md` that currently says the notebook is self contained.

### 4. A projector check on the figures

Open the solutions notebook on the machine and the screen that will actually be used, or the
closest available, and look at all five figures at the size the room will see. The two defects
found in the sibling lander exercise were both found this way and by no other means: a label
collision that is invisible at laptop size, and an answer visible on screen before the
participant had attempted it. Report what you see, one line per figure. Fixes belong to issue 2.

## File Structure

```
hs26-bmai-w1-opt-rm-house/
  README.md      (updated) a new Verified in Colab section, and the hosting answer
  CLAUDE.md      (updated) open decision 2 replaced by the decision and its date
```

No other file changes unless the Colab run finds a defect, and then the fix belongs in
`precompute/build_notebooks.py` and the notebooks are regenerated, never hand edited.

## Verification

- Both notebooks have been opened in Colab on a fresh runtime and run end to end, and the README
  section quotes real versions and a real wall clock from that run.
- The solutions notebook produced zero errors in Colab, or the errors are quoted verbatim in the
  README and an issue is opened for each.
- All five figures were looked at, at projector size, and there is one written line per figure.
- The hosting question has an answer, the answer is written in `CLAUDE.md` with its date, and
  the open decision list no longer carries it as open.
- If a repository was created, the master schedule row for `hs26-bmai-w1-opt-rm-house` points at
  it, and the link was opened once from a signed out browser to confirm a participant can reach
  it.
- `python3 precompute/build_notebooks.py` still ends on `All assertions passed.`
