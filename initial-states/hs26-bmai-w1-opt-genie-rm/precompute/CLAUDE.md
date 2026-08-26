# CLAUDE.md, precompute/

The rigor gate. Never loaded at runtime by the page.

```
node precompute/verify-genie.mjs            62 assertions, then writes data/datasets.js
node precompute/verify-genie.mjs --print    the same, plus the measured tables the README quotes
```

It ends on `ALL PASS  (62 assertions passed)`. A failure exits non-zero, prints
`data/datasets.js was NOT written.`, and leaves the previous data file in place, so a broken
build cannot ship numbers.

## Why it loads the real runtime files

```js
const win = {};
for (const rel of ["js/rng.js", "js/genie.js", "js/schedules.js", "js/loop.js"]) {
  new Function("window", fs.readFileSync(path.join(ROOT, rel), "utf8"))(win);
}
```

It does not reimplement the arithmetic. A reimplementation can agree with itself and disagree
with the page, which is the failure mode this pattern exists to prevent. The pattern is from
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/precompute/build-datasets.js`.

## The assertion groups

| letter | what it pins |
|---|---|
| a | both roots solve `Q^2 = Q + 1`, and the positive one is a fixed point of both forms |
| b | the lecture slide's six rows, to 1e-15, from a live run of `js/loop.js` |
| c | the derivatives at both roots, and the fact that the two forms swap them |
| d | the two alpha thresholds, `1 + 1/sqrt 5` and `1 - 1/sqrt 5`, to 1e-12 |
| e | which alphas settle within 60 tests and which do not, for both forms |
| f | form B with the whole step leaves the bargain, and left running reaches the other root |
| g | the instrument panel ordering, on the pinned seed AND on the mean of 200 seeds |
| h | the fast-shrinking schedule rests where the genie is not satisfied |
| i | the clean far start: one schedule arrives, the other keeps a quarter of its error |
| j | no scene file numbered 0 to 5 names the answer or reads `DATA.reveal` |
| k | regenerating `data/datasets.js` is byte identical |
| l | the run scene 6 prints lands on the fixed point and prints ten specific decimals |

## Two things about these assertions worth knowing

**Group (g) asserts an ORDERING, not a value.** The pinned seed is one draw. The design spec
records where the pinned run is unusual against the 200-seed mean, and the assertion is
written to survive being typical. The factor of 15 in the `|avg loss|` comparison was
calibrated to the measured gap, which is 24x on the pinned seed and 19x on the 200-seed mean.
**The threshold is calibrated to the code, and never the seed to the threshold.**

**Group (j) is blunt and fires on comments.** During the build it caught two comment lines
that explained the rule by quoting the thing the rule forbids. The comments were reworded.
Do not weaken the assertion to let a comment through.

## Maintenance contract

- This file is the working memory for this directory. After any new assertion group, a
  changed payload, or a changed tolerance, UPDATE THIS FILE IN THE SAME COMMIT, including the
  assertion count quoted above. A CLAUDE.md that describes a layout the directory no longer
  has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule.
- Keep it concrete: real file names, real identifiers, real commands.
