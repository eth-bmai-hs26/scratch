# Issue 3: Check coverage for the remaining participant mistakes

## Goal

Four `check_task_N` functions ship and each is proven to reject exactly one wrong loop. The
design spec lists nine failure modes across the four tasks, so five are currently undetected: a
participant hits one, the check prints `PASS`, and they carry a wrong loop into the next act.
Close the gap, and prove each new branch fires by constructing the wrong loop that triggers it.

## Dependencies

None on the other issues, but this issue edits `housetools.py`. **Do not run it at the same time
as issue 2**, which edits the same file.

## Context

The checks live at the bottom of `housetools.py` and are exercised in section 9 of
`precompute/reference.py`, which runs each check against one correct implementation and one
deliberately wrong one, then asserts `c1 and c2 and c3 and c4` and `not (f1 or f2 or f3 or f4)`.
That is the pattern to extend: a check that has never rejected anything is not known to work.

The checks run against throwaway problems, never the twelve Musterwil houses, so that the real
data is not spoiled and no check ever prints the true `w` or `b`:

```
CHECK_X, CHECK_Y, CHECK_ANSWER = 2.0, 20.0, 10.0
CHECK_AREAS  = np.array([1.0, 2.0, 3.0, 4.0])
CHECK_PRICES = np.array([12.0, 21.0, 29.0, 41.0])
```

`_ref_alternating` and `_ref_sgd` are parameterised reference loops with switches
(`recompute`, `x_on_w`, `x_on_b`, `shuffle`) so a check can run the participant's function
beside several named variants and say **which** wrong rule was written rather than only that
something is wrong. Extend those switches rather than writing new loops.

Currently detected, one per task:

| Check | Detects |
|---|---|
| `check_task_1` | the two branches swapped |
| `check_task_2` | the update subtracts instead of adding |
| `check_task_3` | the miss not recomputed before `b` |
| `check_task_4` | the factor `x` missing from the slope update |

Plus a `_has_blank` guard on all four, which catches an unfilled `___` by reading the source.

## Deliverables

### 1. Five new detection branches

Each must name the mistake in its message, in the voice of the existing ones: a short statement
of what the numbers show, then what to look at. No branch may print the true `w` or `b` of the
shipped data.

1. **`check_task_1`, `l` written as `y_hat - y`.** The whole sign of the loop inverts. Message
   should point at the direction of the first step.
2. **`check_task_2`, `alpha` above `2 / x` on the check problem.** The miss grows instead of
   shrinking. There is already a non-finite guard; this branch should fire on a growing but
   finite miss, which is the more common and more confusing case. Detect it by comparing
   `abs(l)` at the first and second steps.
3. **`check_task_3`, `b` updated with `alpha * l * x`.** Already present as a branch through
   `x_on_b=True`. Confirm it fires and keep it.
4. **`check_task_4`, the factor `x` on both parameters.** Already present through `x_on_b=True`.
   Confirm it fires and keep it.
5. **`check_task_4`, `rng.permutation` replaced by `range`.** Already present through
   `shuffle=False`. Confirm it fires and keep it.

Items 3, 4 and 5 exist in the code and are **not proven**: no wrong loop in `reference.py`
triggers them. Proving them is as much of this issue as writing items 1 and 2.

### 2. A wrong loop per branch, in `reference.py` section 9

For every branch, correct and incorrect, a constructed implementation and an assertion on the
outcome. Structure it as a table rather than as loose variables, so a reader can see the
coverage at a glance:

```python
WRONG_LOOPS = [
    ("task 1, branches swapped",        1, swapped_branches),
    ("task 1, miss written backwards",  1, backwards_miss),
    ...
]
```

then loop over it, call the right check, and assert every one returns `False`.

### 3. A coverage table in `precompute/CLAUDE.md`

One row per branch: the check, the mistake, and whether `reference.py` proves it fires.

## File Structure

```
hs26-bmai-w1-opt-rm-house/
  housetools.py            (updated) new branches, and any new switch on the _ref_ loops
  precompute/reference.py  (updated) section 9 becomes a table of wrong loops with assertions
  precompute/CLAUDE.md     (updated) the coverage table
```

## Implementation Notes

The order of branches inside a check matters. The most specific comparison must come first,
because a wrong loop can match more than one variant on a short run. The existing checks compare
against named variants with `_same` before falling through to the generic message, and that
order should be preserved.

Keep every check under a second. They run on a projector in front of a room.

Do not add a check for extension A's `batch_deck`. It is prewritten, the participant does not
type it, and its wrongness is the point.

## Verification

- Every branch in every check is triggered by at least one entry in `WRONG_LOOPS`.
- `python3 precompute/reference.py` prints a `PASS` for each of the four correct loops and a
  `FAIL` for each wrong loop, then ends on `All assertions passed.`
- No check prints `950` or `120` or `948.8828` or `123.5852` in any branch. Grep the check
  bodies for those strings.
- The four correct implementations in `reference.py` are unchanged and still pass.
- `python3 precompute/build_notebooks.py` ends on `All assertions passed.` The embedded copy of
  `housetools.py` will have changed, and the builder asserts it matches.
- The student notebook, untouched, still prints the blank message for all four checks.
