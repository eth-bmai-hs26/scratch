# Issue 7: The full verification pass

## Goal

Run the whole acceptance list against the finished viz, in the order the course-viz skill gives, and
record what was actually seen. This is the integration issue: it is the last one, it is the one that
catches what the per-scene issues each thought was somebody else's problem, and its output is a
paragraph in `docs/CLAUDE.md` saying what every screenshot showed.

## Dependencies

- **Issue 1** (The ruler and the loupe)
- **Issue 2** (Scene 2, the bracket)
- **Issue 3** (Scene 3, Heron named)
- **Issue 4** (Scene 4, the digits)
- **Issue 5** (Scene 5, the bridge table)
- **Issue 6** (The printed TA card), because the card quotes numbers this pass re-checks

This issue edits `CLAUDE.md` and `README.md`, and so does issue 1. Run it after issue 1 has landed.

## Context

Read `../CLAUDE.md` first. The skill's checklist is: validate the data before any UI, parse-check,
screenshot, **read the PNG**, exercise the states a screenshot cannot reach, walk both themes, then
commit. Verification that ends before the reading step is not verification.

Two machine-specific things, both already encoded in `docs/capture.sh` and worth knowing before you
start:

1. Chrome 151 on this machine writes the PNG and then hangs, with `--headless` and with
   `--headless=old` alike, whatever `--virtual-time-budget` says. Each run is wrapped in `timeout`,
   and the acceptance test is whether the PNG exists. An exit status of 124 is expected.
2. Cleanup is a `pkill` scoped to the run's own `--user-data-dir`. A bare `pkill -f "Google Chrome"`
   also kills the operator's real browser and any hand-done SSO login it holds. That has cost this
   project a session before.

## Deliverables

### 1. The acceptance run

Work through this list in order and record each result. Every item is observable in under a minute
with no reading of source.

**Runs at all**

1. `open index.html` straight from `file://`, no server. The rectangle draws and the console is empty.
2. `grep -rn "fetch(\|cdn\|https://" index.html js/ css/ data/` returns nothing outside comments. The
   one expected hit is `http://www.w3.org/2000/svg` in `js/rectview.js`, which is the SVG namespace
   identifier and is never fetched.

**The withholding rule**

3. Screenshot scenes 0, 1, 2 and 3. The string `45.011` appears in none of them.
4. Screenshot scene 4. It appears there.
5. No ruler or axis in scenes 0 to 3 carries a tick, dash or marker at the target.
6. `grep -n "alpha\|learning rate\|gradient" js/scenes/scene0.js js/scenes/scene1.js
   js/scenes/scene2.js js/scenes/scene3.js` returns nothing in a participant-facing string.

**The rectangle is honest**

7. Set `theta = 15`, then `theta = 100`. The drawn rectangle covers the same pixel area both times to
   within 1 square pixel, and the sides read `15 x 135.0667` and `100 x 20.26`.
8. At `theta = 45.0111` the verdict reads too small; at `45.0112` it reads too large.
   (`45.0111^2 = 2025.9991232099999`, `45.0112^2 = 2026.0081254400002`.)
9. The width control cannot leave `[10, 202.6]`, and both endpoints draw a rectangle that fits the
   frame.

**The bracket**

10. In scene 2 from `theta = 10`, entering `300` reports a wider bracket, and `50` a narrower one.
11. Entering `106.3` gives bracket width `87.240734`.
12. Scene 2 never draws a mark at 45.011, at any zoom.

**The payoff**

13. Scene 4's digit column reads `3, 6, 14, 30, 61`.
14. Scene 4's loupe ladder reads `10^3, 10^6, 10^14, 10^30, 10^61`, and the mismatch stays visible at
    every rung.
15. Scene 4's bisection comparison reads 20 steps and 34 steps, and its digit column is visibly not
    monotone.
16. Scene 4's fixed nudge at alpha = 0.1 shows the cycle `45.0, 45.1, 45.0, 45.1`.
17. The gap column three corrections in reads `4.178407e-14` in the default path.

**Engine and theme**

18. `index.html#scene=4` loads directly into the digits scene. Editing the hash to `#scene=2` moves
    there with no reload.
19. `t` toggles the theme from every scene, and both themes are legible in all six.
20. Arrow keys step within a scene first and change scene only when the internal cursor is exhausted.
21. Entering scene 5 through the dot pager, with no earlier scene ever built, renders correctly.

**Data**

22. `python3 precompute/build_data.py` run twice produces a byte-identical `data/datasets.js`,
    checkable with `diff` or `md5`.
23. Corrupting one pinned digit in the script makes it exit nonzero and leave `data/datasets.js`
    unwritten. Test this deliberately, then restore the file.

**Coding**

24. The solutions notebook has the same cell count as the student notebook, and the differing cells
    are exactly the task cells. `python3 exercise/build_notebooks.py` asserts this.
25. Every sanity assertion in the notebook passes against the solutions version.

### 2. Both viewports, both themes, every scene

```
sh docs/capture.sh
```

produces 18 PNGs into `docs/shots/`, which is gitignored. **Open every one and look at it.** The four
most likely to fail, and what to look for:

- Scene 0 at `theta = 10`: the rectangle is 16 px wide and 324 px tall at the pinned scale. Both edge
  labels have to stay legible instead of colliding at the corner.
- Scene 1 at 1280 by 800: five columns plus the live rectangle plus the loupe, the densest layout in
  the viz. This one is already known to put the table below the fold, recorded in `docs/CLAUDE.md`
  and unresolved. Decide between shrinking the rectangle stage for that scene, moving the table into
  the right column, and accepting the scroll and saying so on the TA card.
- Scene 4: the digit column, the loupe ladder and two comparison traces on one screen.
- Every scene in dark. A scene that reads weakly in one theme gets redesigned rather than shipped.

### 3. `docs/CLAUDE.md` (updated)

Replace the "what the last read found" section with what **this** pass found, screenshot by
screenshot, dated. Say what you saw, including anything that looked wrong and was left alone, and
why.

### 4. `README.md` and `CLAUDE.md` (updated)

Move each built scene from the stub column to the built column, update the status blockquote at the
top of `CLAUDE.md` with the date, and rewrite the "What is not done" section of `README.md` so it is
true.

## Implementation Notes

- Items 3 and 4 of the acceptance list are the two that a well-meaning contributor breaks most often,
  because adding a helpful marker at the target feels like an improvement. If either fails, the fix
  is in the scene that drew it, and it is a revert rather than a redesign.
- Item 23 is a real test, so actually corrupt the file. A verification pass that skips the failure
  path has only tested the happy path.

## File Structure

```
docs/CLAUDE.md         (updated) the findings of this pass, dated
docs/shots/            regenerated, gitignored
README.md              (updated) the done and not-done sections
CLAUDE.md              (updated) the status blockquote and the file tree
```

## Verification

- All 25 acceptance items above are recorded with a result. An item that fails is either fixed or
  written down as a known defect with an owner.
- All 18 PNGs exist and every one has been opened and looked at, with the finding written into
  `docs/CLAUDE.md`.
- `for f in js/*.js js/scenes/*.js data/*.js; do node --check "$f" || echo "FAIL $f"; done` prints no
  FAIL line.
- `python3 precompute/build_data.py` and `python3 exercise/build_notebooks.py` both end without a
  failed check, and both leave their outputs byte identical to what is committed.
