# Issue 4: The second feature, and extension C as a real task

## Goal

Extension C is prose. It tells the participant that deck pages 33 and 34 take `x_i` to be a
pair, area and rooms, and then admits on the page that there is no stub, no check and no second
column. Give it a second column, a stub, a check and a verified set of numbers, so that the
last thing a participant touches is the per-coordinate update that the 11:00 lecture and the
12:00 grasshopper block both build on. This is Carlos's stage 4 and stage 5, and this exercise
is the only place before lunch where a participant can type one.

## Dependencies

- **Issue 3** (Check coverage): this issue adds a fifth `check_task_N`, and it should be written
  against the `WRONG_LOOPS` table that issue 3 builds rather than against the loose variables
  that are in `reference.py` today.

Negative dependency, stated explicitly: this issue does **not** depend on issue 1, issue 2 or
issue 5, and it can run in parallel with any of them. It does edit `housetools.py`, so it must
not run at the same time as issue 2 or issue 3.

## Context

This is the heaviest issue of the six, because it edits `data/generate_houses.py`, and every
number in `README.md`, `data/README.md`, both notebooks and the other issue prompts is derived
from that file's output. Read `data/CLAUDE.md` rule 4 before starting.

**The one fact that makes this issue safe.** A new column drawn from the same generator, placed
**after** the price noise in the call order, leaves the twelve areas and the twelve prices bit
for bit unchanged. Placed before it, every one of the twelve prices moves. Verified on
2026-08-26 with numpy 1.26.4:

```
rooms drawn LAST  -> area unchanged: True  price unchanged: True
rooms drawn FIRST -> area unchanged: True  price unchanged: False
prices that move if drawn first: 12 of 12
```

So the room count is drawn last, the existing data does not move, and not one printed number in
the repository has to be re-derived. If you take the other route, you have signed up to update
every number in every file, and `precompute/reference.py` will fail on its first assertion until
you do.

**The mathematics the exercise is walking into.** For one house and the act 4 rule, the miss is
multiplied by `(1 - alpha * (x^2 + 1))` each step, which is why the ceiling printed by the
reference is `2 / (x^2 + 1) = 0.3503` at the largest house. With two features the same algebra
gives

```
l_new = l * (1 - alpha * (x_1^2 + x_2^2 + 1))
```

so the ceiling becomes `2 / (x_1^2 + x_2^2 + 1)`, evaluated at the house that maximises the sum.
Adding a raw room count of 4 to 7 alongside an `x` that runs 1.01 to 2.17 puts `x_2^2` around 16
to 49 and drives the ceiling to roughly 0.04, which is a step size a participant cannot feel and
which will make every worked value in acts 2 and 3 look wrong by comparison. **Scale the second
feature the way the first one is scaled**, and state the scaling on the page. The working units
of this notebook are `x = area / 100` and `y = price / 1000`; pick the divisor for rooms in the
same spirit, compute the resulting ceiling, and print it.

**Where the collinearity bites.** Rooms and area are strongly related in any believable
generator, and that is the interesting content of the extension: the loss surface becomes a long
narrow valley, the two coordinates trade against each other, and the per-coordinate updates take
turns making progress. Do not engineer that away. Do measure it, and say what it does.

## Deliverables

### 1. A room count in the generator (`data/generate_houses.py`)

- A new module constant block beside `TRUE_W` and `TRUE_B` giving the room model, its
  coefficient and its noise, with a comment saying what each one means in words.
- `make_houses(seed=SEED, n=N, with_rooms=False)`. The default stays `False` and returns
  `(area, price)` exactly as today, so every existing caller is untouched. With `with_rooms=True`
  it returns `(area, rooms, price)`.
- The room draw is the **last** call on the rng. Assert it: the module must contain a check that
  `make_houses()` and `make_houses(with_rooms=True)` agree on area and on price, element for
  element.
- The CSV gains a `rooms` column. The header note keeps the word fictitious and gains the room
  count in its list of invented quantities.

### 2. A three-parameter update in `housetools.py`

```python
def sgd2(areas, rooms, prices, w1, w2, b, alpha, n_epochs, seed=0, decay=None):
    """One house at a time. Each coordinate is moved by its own derivative."""
```

Written so that the per-coordinate structure is visible on the page: three update lines, one
per parameter, each carrying its own factor, all reading the **same** miss `l` measured once
before any of them moves. That simultaneity is the point. It is what the 11:00 lecture calls one
grasshopper per dimension, and it is the deliberate contrast with the alternating sweep of act 3,
which measures the miss again between the two updates. Both behaviours already exist in this
repository, and a reader must be able to see the difference by looking at the two functions side
by side.

### 3. `check_task_5`, in the style of the other four

At least these branches, each naming the mistake:

1. The factor `x_1` used on `w_2`, or `x_2` on `w_1`. Message points at which coordinate carries
   which factor.
2. A factor attached to `b`. The base carries none.
3. The miss recomputed between the coordinate updates, which turns it into the act 3 alternating
   sweep. This is not wrong in general and the message must say so, then say that this task asked
   for the simultaneous update.
4. The `_has_blank` guard, as the other four have.

The check runs against a throwaway problem, never against the Musterwil houses, and it prints no
true parameter. Follow `CHECK_AREAS` and `CHECK_PRICES` in `housetools.py`.

### 4. Extension C becomes a task cell in `precompute/build_notebooks.py`

- The prose that currently admits the extension is unfinished is deleted, and the paragraph
  naming deck pages 33 and 34 and the bridge to the grasshopper block is kept.
- A task cell in the shipped stub style: banner comment, `COMPLETE THIS LINE` markers, `___` for
  the three update lines in the student file, filled in the solutions file, with the banner, the
  docstring and the closing `print` byte identical between the two.
- A run cell printing `w_1`, `w_2`, `b` and the mean squared error, and the two-feature step size
  ceiling next to the one-feature ceiling `0.3503`.
- The builder's `TASK_INDICES` grows from four entries to five, and its assertion that exactly
  the task cells differ must still pass.

### 5. Every number, pinned in `precompute/reference.py`

A new report section printing, at minimum: the twelve rooms; the correlation between the scaled
area and the scaled room count; the least squares solution for `y = w_1 x_1 + w_2 x_2 + b` and
its mean squared error, against the 281.1024 of the one-feature fit; the two-feature ceiling; and
the endpoint of `sgd2` from a stated start with a stated seed. Then an assertion on each.

### 6. The prose updated from that output

`data/README.md` gains the room model, the new twelve-row table and a new MD5. `README.md` gains
the two-feature row in its verified-numbers section, and extension C moves out of its "Not done"
list. `data/CLAUDE.md` loses the "there is no second feature" line from its own "Not done".

## File Structure

```
hs26-bmai-w1-opt-rm-house/
  data/generate_houses.py       (updated) with_rooms, the room model, the draw order assertion
  data/houses.csv               (updated) a rooms column, regenerated by running the generator
  data/README.md                (updated) the room model, the new table, the new MD5
  data/CLAUDE.md                (updated) the Not done list loses its second entry
  housetools.py                 (updated) load_houses returns rooms, sgd2, check_task_5
  precompute/reference.py       (updated) a new section, printed and asserted
  precompute/build_notebooks.py (updated) extension C becomes task 5, TASK_INDICES grows
  precompute/CLAUDE.md          (updated) the assertion list gains the new section
  README.md                     (updated) the verified numbers, and the Not done list
  notebooks/*.ipynb             (updated) regenerated, never hand edited
```

## Implementation Notes

`load_houses` currently returns `(area, price, x, y)` and is called in `reference.py`, in the
notebook setup cell and in five figures. Changing its return shape breaks all of them at once.
Prefer a keyword, `load_houses(path=None, with_rooms=False)`, returning the present four-tuple
by default. Whatever you choose, grep for every call site before you change the signature.

The notebook embeds a copy of `housetools.py` and a copy of `houses.csv` in its setup cell, and
the builder asserts both are byte identical to the files on disk. Both copies are regenerated by
running the builder. Never edit an embedded copy by hand.

Keep the whole notebook under about eight seconds of execution. The solutions notebook runs in
about six today, measured with `nbclient`.

## Verification

- `python3 data/generate_houses.py` run twice gives an identical MD5, and `file data/houses.csv`
  reports `ASCII text` with no CR bytes.
- The areas and prices in the regenerated CSV are identical to the twelve rows quoted in
  `data/README.md` today: first area 101, last area 217, first price 1083000, last price 2158000.
- `python3 precompute/reference.py` prints the new section and ends on `All assertions passed.`
- `python3 precompute/build_notebooks.py` reports five differing cells, all of them task cells,
  and ends on `All assertions passed.`
- Both notebooks load with `python3 -c "import json; json.load(open(PATH))"` and validate with
  `nbformat.read` plus `nbformat.validate`.
- The solutions notebook executes top to bottom with `allow_errors=False` and zero error outputs.
- The student notebook, untouched, prints the blank message for all five checks and raises
  nothing except `NameError` downstream of an unfilled task.
- `check_task_5` rejects each of its named wrong loops, proven by an entry per branch in the
  `WRONG_LOOPS` table, and accepts the correct one.
- No new file contains an em dash, an en dash or a whitespace flanked double hyphen.
