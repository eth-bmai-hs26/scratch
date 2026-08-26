# CLAUDE.md, js/scenes/

Nine scenes, zero indexed everywhere: in the hash, in the arrays and in the builder names.

## The contract

```js
window.scenes.sceneN = function (root) {
  return { onEnter?, onLeave?, onNextKey?, onPrevKey? };
};
```

`onNextKey` and `onPrevKey` return **true** to consume the keystroke, which advances a step
inside the scene, and **false** to let the driver change scene. A scene with no internal
steps returns an empty object and the arrow keys page straight past it.

A scene builder receives an empty `<div class="scene">` and fills it. It must reconstruct
itself from `window.DATA` and the shared modules and never assume another scene ran, because
a lecturer can deep link straight to it.

`main.js` wraps every builder in a try/catch and renders the error into the node. One broken
scene must not take the deck down, because a TA mid lecture needs the other eight.

## State of each scene

| # | file | title | state | owner |
|---|---|---|---|---|
| 0 | `scene0.js` | The bargain | built, 2 steps | done |
| 1 | `scene1.js` | Guess, check, correct | **built and live** | done |
| 2 | `scene2.js` | The full step | built, 6 steps | done |
| 3 | `scene3.js` | Breaking it | **built and live**, 4 steps | done |
| 4 | `scene4.js` | The sandstorm | **stub** | Suei-Wen, issue 03 |
| 5 | `scene5.js` | Two demands on the step | **stub** | Suei-Wen, issue 04 |
| 6 | `scene6.js` | The number | built, 4 steps | done |
| 7 | `scene7.js` | Write the loop | built | done |
| 8 | `scene8.js` | The same loop, on a price | built | done |

A stub renders a card through `window.Stub.render` naming what the scene will do, who owns
it, which issue prompt specifies it, and what already works underneath. A stub keeps its real
title and its real position, so no deep link a TA has written down is renumbered later.

## The rule that constrains scenes 0 to 5

**They may not name the answer.** Verifier assertion (j) in `precompute/verify-genie.mjs`
reads each of `scene0.js` through `scene5.js` and refuses any that contains the substring
`1.618`, the word `golden`, or the identifier `DATA.reveal`. **It fires on comments too.**
During the build it caught two comment lines that explained the rule by quoting the thing the
rule forbids; the comments were reworded rather than the assertion weakened.

`scene6.js` is the only file that reads `DATA.reveal` and the only caller of
`Trace.setTruthVisible(true)`.

## The `?test=` states

Each scene documents its own in its header comment. `main.js` carries the routing table:

| state | scene |
|---|---|
| `rules` | 0 |
| `filled` | 1 |
| `full` | 2 |
| `broken-a`, `broken-b`, `fixed-b` | 3 |
| `revealed` | 6 |
| `solved` | 7 |

`?test=` on its own routes to the scene that owns the state, so a capture command needs one
parameter rather than two. When a new state is added, add its row to `TEST_SCENE` at the top
of `main.js` and to `docs/capture.sh`.

**A `?test=` hook has to call the scene's own render.** Setting a cursor and stopping there
leaves the DOM at step 0, which is what happened to `scene6.js` and was only found by reading
a screenshot.

## Maintenance contract

- This file is the working memory for this directory. After a scene moves from stub to built,
  a new `?test=` state, or a change of owner, UPDATE THIS FILE IN THE SAME COMMIT. A
  CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule.
- Keep it concrete: real file names, real identifiers, real commands.
