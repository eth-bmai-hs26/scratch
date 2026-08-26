# CLAUDE.md, data/

## The one rule

**`datasets.js` is generated. Never hand-edit it.**

```
node precompute/verify-genie.mjs
```

The verifier loads `js/rng.js`, `js/genie.js`, `js/schedules.js` and `js/loop.js` under a
fake `window` and asserts twelve groups of invariants against the real runtime code. Only
when every one passes does it write this file. Assertion (k) checks that a rerun is byte
identical.

## What is in it

`window.DATA` holds three things and nothing else.

| key | what it is |
|---|---|
| `deckTable` | the six rows of the AINIT slide, as numerator and denominator pairs, so scene 2 can print exact fractions rather than decimals |
| `demo` | the parameters each `?test=` state replays. Parameters, and not results |
| `reveal` | the two roots, the printed digits, the two alpha thresholds and the two derivatives |

Plus `seed`, `sigma` and `rounds`, which are the pinned experiment settings.

## Why it is so small

Scenes 3, 4 and 5 recompute as the participant moves a slider, so the arithmetic is live in
`js/loop.js`. A 400 round run of a three line recurrence is instant, and precomputing it
would only create a second place for the numbers to live and a second place for them to
drift. This is a smaller data file than the course-viz examples carry, deliberately.

## `DATA.reveal` is not read before scene 6

That namespace is the rule. `js/scenes/scene6.js` is the only file that reads it, and it is
also the only caller of `Trace.setTruthVisible(true)`. Verifier assertion (j) refuses any
scene file numbered 0 to 5 that contains the substring `1.618`, the word `golden`, or the
identifier `DATA.reveal`, comments included.

The two alpha thresholds live here and appear on no screen. The README prints them for the
TA. In the room, the slider is what finds them.

## Maintenance contract

- This file is the working memory for this directory. After any change to the payload shape
  in `precompute/verify-genie.mjs`, UPDATE THIS FILE IN THE SAME COMMIT. A CLAUDE.md that
  describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule.
- Keep it concrete: real file names, real identifiers, real commands.
