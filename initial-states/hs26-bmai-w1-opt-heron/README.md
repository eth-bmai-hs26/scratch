# Squaring the rectangle

A browser visualization for **hs26-bmai-w1-opt-heron**, the first of the three coding exercises in
the Friday 10:00 block of CAS BMAI weekend 1, "CX: First-order optimization algorithms".

Owners: **Jinlei, Daniele, Ivan.**

## What it is

A rectangle of area 2026. You choose the width. The area is fixed, so the height is forced to
`2026/theta`, and the amount of ink on the screen never changes: only the shape does.

That one picture carries every column of Carlos's handwritten table.

| Carlos's column | What it is on screen |
|---|---|
| `theta` | the width you chose |
| `theta^2` | the area of the square you would get if the height matched the width |
| `2026 - theta^2` | how much area that square is missing |
| Verdict | the shape: tall and narrow, or wide and flat |
| Update | move the width toward the height |

The verdict stops being a sign, because the guess is too small exactly when the rectangle is taller
than it is wide. The update stops being an arrow, because with two numbers, no square root key and
the answer known to lie between them, the cheapest thing anyone can do is average them. That average
is `theta <- (theta + 2026/theta)/2`, which is Heron, and geometrically it is the rectangle being
squared up.

The payoff is a digit counter that reads **3, 6, 14, 30, 61**. Two corrections from Carlos's start of
45 already beat twenty steps of bisection.

## How to open it

```
open index.html
```

Straight from `file://`. There is no build step, no server, no `npm install`, and nothing is fetched
over the network at any point. Copy the folder onto a memory stick and it still works. KaTeX is
vendored under `vendor/` (1.4 MB with its fonts) and is the only library.

Tested in Chrome 151 on macOS.

## Controls

| | |
|---|---|
| Right arrow, or **Next** | one step forward inside the scene; at the end of a scene, the next scene |
| Left arrow, or **Prev** | one step back |
| The dots, top right | jump to any of the six scenes |
| **t** | switch between light and dark. Light is the lecture default |
| `index.html#scene=4` | deep link. A lecturer can open straight into the payoff |

Scenes are numbered 0 to 5, in the hash and on screen.

## The six scenes

| # | Title | State |
|---|---|---|
| 0 | The rectangle | **Built.** Slider and number input drive the width, the height follows, the trail accumulates |
| 1 | The table | **Built.** Carlos's five columns from `theta = 45`, one column per click, ending on the open Update cell |
| 2 | The bracket | Stub. The discovery scene: guess again and watch the bracket widen or narrow |
| 3 | Heron | Stub. Names the averaging update, after the attempt |
| 4 | The digits | Stub. The digit column, the loupe ladder, bisection and the fixed nudge |
| 5 | The bridge | Stub. One mapping table handing the symbols to the genie game and to gradient descent |

## What it looks like

Three screenshots are committed, all taken headlessly and all read before being committed:

| File | What it shows |
|---|---|
| `docs/screenshot-scene1.png` | the first scene working, at a width of 78, with the height at 25.9744 and the product still exactly 2026.0000 |
| `docs/screenshot-scene1-dark.png` | the same scene in the dark theme |
| `docs/screenshot-stub.png` | what an unbuilt scene shows: its own brief, its step plan, its pinned numbers, and the issue file that builds it |

`sh docs/capture.sh` regenerates the full set of 18 into `docs/shots/`, which is gitignored.
`docs/CLAUDE.md` records what reading them found, including two defects they caught.

## What is done

- The page shell, the click-step engine, the hash router, the dot pager, the dev hooks.
- Light and dark themes with the `t` shortcut, in every scene including the stubs.
- `js/heron.js`, the mathematics, complete: the other side, the residual, the verdict, the shape, the
  bracket, one step, a run to tolerance, the fixed nudge, and the digit counter.
- `js/rectview.js`, the rectangle panel, complete: fixed scale at 1.6 px per unit, both sides drawn
  and labelled in their own colours, the constant area label, the ghost trail.
- **Scene 0 and scene 1, fully interactive.** Drag the width in either scene and everything follows.
- `data/datasets.js`, generated and verified: 30 invariant checks, including the three theorems the
  bracket game stands on, swept over 300000 sampled widths.
- `exercise/`, the paired coding half: a student notebook and a synchronised solutions notebook,
  a runnable reference that prints and asserts every number they contain, and the builder that
  regenerates both.
- `issue-prompts/`, eight numbered units of work covering everything below.

## What is not done

- **Scenes 2, 3, 4 and 5 are stubs.** They are registered, titled, reachable by the hash router, and
  they render their own specification, so opening `#scene=4` hands its owner exactly their work item.
  Nothing there draws a fake chart or a placeholder number.
- Two shared views the later scenes need, `js/rulerview.js` and `js/loupe.js`, do not exist yet.
- The in-page Python blanks belong to scene 3 and are therefore also not built. The notebook in
  `exercise/` is complete and can be used on its own today.
- No screenshot of scenes 2 to 5 shows a finished design, because there is no finished design to
  show. `docs/CLAUDE.md` records what the captured screenshots actually show.
- Whether this exercise ships its own notebook or merges into one shared notebook for the whole 10:00
  block is an open question for Carlos. Issue 08 covers the merge.

## Regenerating things

```
python3 precompute/build_data.py       rewrites data/datasets.js, 30 checks, byte identical each run
python3 exercise/reference.py          prints every number the notebook contains, then asserts it
python3 exercise/build_notebooks.py    rewrites both notebooks, asserts the student and solutions sync
sh docs/capture.sh                     screenshots every scene, both themes, into docs/shots/
```

`build_data.py` writes nothing if any invariant fails, so a corrupted pin is visible immediately
rather than three scenes later. Neither generator is loaded by the page.

## For the TA picking this up

Read `CLAUDE.md` in this directory first: it carries the withholding contract, the colour identities,
the sign convention, the Decimal rule and the list of what not to do. Then read
`issue-prompts/CLAUDE.md` for the dependency graph and pick your issue. The design spec behind all of
it is `../../proposals/viz-heron.md`.

The one thing to know before you touch a scene: **nothing in scenes 0 to 3 may name or mark
`sqrt(2026)`.** A participant who cannot find the square by eye is the mechanism of the exercise.
