# CLAUDE.md, js/

The shared modules and the engine. Scene files live in `js/scenes/` and have their own
CLAUDE.md.

## Load order, and why it is load-bearing

`index.html` lists these in dependency order and says so in a comment. Reordering breaks
things silently.

```
vendor/katex.min.js       the vendored library
vendor/d3.min.js          scales only. issue-prompts/06 removes it
theme.js                  FIRST of ours, so data-theme is stamped before anything measures
data/datasets.js          window.DATA
katex-helpers.js          Katex.render, never throws
history.js                the record and cursor store
rng.js                    Mulberry32 and Box-Muller
genie.js                  needs nothing
schedules.js              needs nothing
loop.js                   needs RNG, Genie and Schedules
table.js                  needs Katex
trace.js                  needs d3
stub.js                   needs nothing
scenes/scene0.js .. scene8.js   each registers itself on window.scenes and touches no DOM
main.js                   LAST. the only file that touches the DOM at load
```

## What each file owns

| file | owns | globals it exposes |
|---|---|---|
| `theme.js` | light and dark, the `t` shortcut, `localStorage` under `genie-rm-theme`, the `?theme=` override | `Theme` |
| `rng.js` | **all randomness in this viz**, seed 20260904 | `RNG` |
| `genie.js` | the bargain: two forms, the positivity clause, `loss = Q - target` | `Genie` |
| `schedules.js` | `full`, `constant(c)`, `inverse(c)`, `inverseSquare(c)`, `decay(a0, d)` | `Schedules` |
| `loop.js` | `run(opts)`, `spread(rows)`, `avgHeardLoss(rows)` | `Loop` |
| `table.js` | the widget with the deck's three headers, plus optional extra columns | `Table` |
| `trace.js` | the guess trace, the loss strip, **and the truth line** | `Trace` |
| `history.js` | record and cursor. `push` truncates the future after a rewind | `History` |
| `katex-helpers.js` | `render`, `inline`, `display`. Falls back to literal text | `Katex` |
| `stub.js` | the card an unbuilt scene renders | `Stub` |
| `main.js` | the scene list, the hash router, the dev hooks | `GenieViz` |

## The four rules

**1. `rng.js` is the only source of randomness.** Nothing else may call `Math.random()`. The
course-viz never-do list is explicit, and the reason is that a run a TA demonstrates has to
be the run a participant reproduces at home.

**2. No JavaScript file writes a colour.** Every fill and stroke routes through a CSS class.
That single rule is what makes both themes work without a second code path.

**3. `trace.js` owns the truth line, and `setTruthVisible(bool)` defaults to false.**
`scenes/scene6.js` is the only caller. Grepping for `setTruthVisible` is a complete audit of
who can reveal the answer.

**4. A plot box size lives in two files and they must agree.** `css/trace.css` locks
`.trace-svg` and `.spark-svg`; `trace.js` writes the same numbers into the `width` and
`height` attributes. A mismatch scales the viewBox instead of resizing the box, which renders
acceptably in a live browser and captures wrong. It happened once; the header comment in
`css/trace.css` records it.

## Provenance

`theme.js` is `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/js/theme.js` with
one line changed, the `localStorage` key. `history.js` and `katex-helpers.js` are
`/Users/carloscotrini/Documents/git_fdd/projects/bandits/js/`. `katex-helpers.js` is
verbatim. `history.js` has the same code and a rewritten header comment, because the
original described a bandit's pulls and carried three em dashes and a section sign, none of
which pass the ASCII house rule or describe this viz. `main.js` follows
bandits' scene engine and the course-viz skill's reference `goTo()`. `rng.js` is the
Mulberry32 and Box-Muller pair from
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/minigolf/index.html`, lines 1541 and 1549.

## Maintenance contract

- This file is the working memory for this directory. After any new module, a changed global,
  a changed load order, or a changed provenance, UPDATE THIS FILE IN THE SAME COMMIT. A
  CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule.
- Keep it concrete: real file names, real identifiers, real commands.
