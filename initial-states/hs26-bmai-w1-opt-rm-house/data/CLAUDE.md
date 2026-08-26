# CLAUDE.md, data/

Contract for the data directory of `hs26-bmai-w1-opt-rm-house`.

## What is here

| File | Role |
|---|---|
| `generate_houses.py` | The seeded generator. It is the source of truth for the data |
| `houses.csv` | Its committed output. 12 rows, plus a one-line header note marking it fictitious |
| `README.md` | The true parameters, the generating process, the honesty note, the determinism check |

## Rules

1. **The data is fictitious and every artifact says so.** The statement appears in the CSV
   header line, in the generator docstring, in `README.md`, in the notebook title cell, in the
   notebook closing cell and in every figure title through `housetools.FICTITIOUS`. Do not
   quietly drop any of those.
2. **The CSV is committed, and so is the generator.** This departs from the FS26
   `lead_scoring_minimal` pattern, which commits the generator and gitignores the CSV. Twelve
   rows are small enough to read in a diff, the notebook embeds a copy of them anyway so that it
   can run with no clone, and a committed CSV means a participant with no numpy still sees the
   data. If the CSV is ever removed from git, the notebook's embedded copy and
   `precompute/build_notebooks.py` both break.
3. **Never edit `houses.csv` by hand.** Change `generate_houses.py` and re-run it. The reference
   implementation compares the committed file against a fresh generator call on every run and
   fails if they disagree.
   The writer passes an explicit `lineterminator="\n"`, which is load bearing. The `csv` default
   is CRLF, and because the header note above it is written with a plain `\n` the file then ends
   up with mixed endings. The notebook embeds a copy of this file and writes it back out at run
   time, so mixed endings inside that copy are a trap on a Windows runtime. `file houses.csv`
   must report `ASCII text` and nothing more.
4. **Changing the seed or any constant is a breaking change.** Every number in `README.md`,
   `data/README.md`, both notebooks and the issue prompts comes from this data. After such a
   change, run `python3 precompute/reference.py`, watch it fail, and update every quoted number
   from its new output before doing anything else.
5. **`TRUE_W` and `TRUE_B` are withheld from the participant until act 4.** They may appear in
   this directory and in `precompute/`. They may not appear in any student-facing cell before
   act 4, and no `check_task_N` may print them at all.

## The one thing that looks like a bug and is not

The generator draws `rng.integers(90, 221)` and the first three areas come out as 101, 101 and
102, which looks suspiciously clustered for a uniform draw over 131 values. It is a genuine
draw from seed 42 and it is left alone. It is also pedagogically useful: houses 1 and 2 have the
same area and different prices, which is the cleanest possible demonstration that no line can
pass through every point, and it is the reason the least squares line exists at all.

## Not done

- The name Musterwil is unverified against the federal register of municipalities.
- There is no second feature. `generate_houses.py` produces area and price only. Extension C of
  the notebook says this on the page. `issue-prompts/04` adds a room count.
