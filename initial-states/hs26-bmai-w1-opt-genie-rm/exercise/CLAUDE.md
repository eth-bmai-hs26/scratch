# CLAUDE.md, exercise/

The participant-facing coding part of `hs26-bmai-w1-opt-genie-rm`.

## The one rule that matters most here

**The two notebooks are generated. Edit `build_notebooks.py` and rerun it.**

```
python3 exercise/build_notebooks.py
```

A hand edit to an `.ipynb` is destroyed silently the next time the builder runs. That is how
the FS26 student and solutions sync rule holds by construction rather than by discipline. The
builder asserts the rule before it writes anything: identical cell counts, and only the intro
cell plus the four task cells that carry a blank may differ. It also checks, line by line,
that nothing inside a differing task cell moved or vanished except the blank itself.

## What is here

```
exercise/
  CLAUDE.md                              this file
  genie.py                               the environment, the seeded RNG, the sanity checks
  build_notebooks.py                     generates both notebooks. THE SOURCE OF TRUTH
  genie_robbins_monro.ipynb              GENERATED. 21 cells, 7 code, 4 blanks marked ___
  genie_robbins_monro_solutions.ipynb    GENERATED. the same 21 cells, 0 blanks
```

## Why the RNG is ported rather than imported

The browser page draws its sandstorm from Mulberry32 plus Box-Muller (`../js/rng.js`). If
this notebook used `random.gauss`, a participant running it at home would see a different
storm from the one the room watched.

So both generators are ported into `genie.py` line for line, and
`_assert_stream_matches_browser()` checks the port against six uniforms and six Gaussian
draws taken from the running JavaScript at seed 20260904. **That assert runs at import
time**, so a broken port fails immediately rather than quietly producing plausible numbers.

Verified on 2026-08-26: the Python and the JavaScript agree to every digit printed. The
notebook's task 5 prints spreads of `1.693e-01`, `3.515e-02` and `1.854e-03`; the
JavaScript verifier prints `1.693e-1`, `3.515e-2` and `1.854e-3` for the same three
schedules.

The two hand-copied constants that make this work are in `genie.py` under
`_BROWSER_UNIFORMS` and `_BROWSER_GAUSS_015`, with the exact `node -e` command that produced
them in the comment above. If `../js/rng.js` ever changes, rerun that command and replace
them; do not adjust the tolerance.

## Why the module is carried inline in the notebook

The setup cell contains the whole of `genie.py`, minus its command line block, as executable
code. No `git clone`, no `pip install`, no network. `build_notebooks.py` reads `genie.py` at
build time and inlines it, so the two cannot drift.

That is the same call the house-price exercise made, and the reason is a participant on a
hotel connection with a corporate proxy. The cost is one long cell, which is why it opens
with `# @title` so Colab collapses it.

## The six tasks

| # | task | shape | what it lands |
|---|---|---|---|
| 1 | Hear what the genie says | blank: `loss` | the bargain is a test you may run |
| 2 | The whole step | blank: the update | guess, check, correct, and the slide's six rows |
| 3 | Form B and the whole step | given, run it | the same bargain, and the loop flees |
| 4 | Move only part of the way | blank: `alpha` in the update | a partial step rescues it |
| 5 | The sandstorm | blank: the update with `alpha_t` | the instrument panel |
| 6 | Why not shrink faster | given, run it | it settles on the wrong number |

Tasks 3 and 6 have no blank on purpose. A run the participant only watches is the right
shape when the point is a surprise rather than a technique.

Every task is followed by a `### What just happened?` markdown cell carrying a code-free
Discussion list, which is the FS26 spine.

**Every number quoted in a markdown cell is computed by `measure()` in the builder and
asserted there.** Nothing is typed from memory. If a number moves, the builder fails.

## Sanity checks, and what they catch

```
python3 exercise/genie.py
```

Three checks, ending on `All assertions passed.`

1. **The lecture slide's six rows**, to 1e-12. No randomness, so it transfers to Python
   exactly. What it catches is a wrong sign: writing `loss = target - current` while keeping
   `guess = current - step` sends the first update to exactly zero, which the genie cannot
   even test, and the run reads `1 -> 0 -> -inf`. The failure is immediate and legible, which
   is why this check comes first.
2. **Clean convergence.** Storm off, `alpha_0 = 1.0`, `decay_rate = 5.0`, 60 rounds from
   `Q = 1`. Asserts that the last guess prints `1.6180339887` to ten decimals, which is
   exactly what scene 6 of the page prints, and which verifier assertion (l) pins from the
   JavaScript side.
3. **Noisy convergence.** sigma 0.15, seed 20260904, 400 rounds. Asserts spread below 0.02
   and absolute average heard loss below 0.05. **The thresholds are generous on purpose**:
   they exist to catch a wrong sign and not to grade the seed.

## Sign convention

```
loss = Q - target                  your number minus what came back
Q    = Q - alpha * loss            subtract part of the loss
```

The AINIT deck's own, and the same one the page's live table uses, because the table's
headers are the deck's and the headers fix the sign. The house-price exercise 40 minutes
later writes `l = y - y_hat` with `w = w + alpha * l`, which is the same rule with
`l = -loss`. See `../CLAUDE.md`, "Notation, pinned".

## Not done

- **Neither notebook has been opened in Colab.** They were executed cell by cell through
  Python in a terminal. `# @title` collapsing, markdown rendering and the traceback a `___`
  blank produces are all unverified. That is `../issue-prompts/08-colab-run.md`.
- **No share link exists**, and no decision has been recorded about whether participants get
  a file or a link.
- **No debrief helper.** The FS26 exercises carry an LLM debrief cell. If one is added here,
  adopt the coach contract from `the_hidden_layer_full_mission_solutions.ipynb` cell 11,
  meaning DIAGNOSE, GUIDE, HINT, IMPLEMENT TOGETHER, and "NEVER return a complete drop-in
  function unprompted". The competing contract in the student notebook of that same version
  pair hands over the complete cell; leave that one alone.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a
  new task, a changed blank, a changed sanity threshold, a changed RNG, or a Colab run,
  UPDATE THIS FILE IN THE SAME COMMIT. A CLAUDE.md that describes a layout the directory no
  longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you
  create a subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that
  cost someone an hour. Do not restate what the code already says plainly.
