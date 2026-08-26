# CLAUDE.md, docs/

Screenshots of `hs26-bmai-w1-opt-genie-rm`, and the record of what reading them found.

## What is here

```
docs/
  CLAUDE.md              this file
  capture.sh             headless screenshots, one per named state, one theme per run
  screenshot-table.png   scene 1 with the lecture slide's six rows. The one committed image
```

`.gitignore` keeps every other PNG out of the repository. They belong in
`/private/tmp/genie-shots`, where `capture.sh` writes them.

## Running it

```
bash docs/capture.sh                    light theme, 1400x1000
bash docs/capture.sh dark               dark theme, same size
bash docs/capture.sh light 1280,800     the projector size
```

Eleven states per run: `scene0`, `table`, `fullstep`, `broken-a`, `broken-b`, `fixed-b`,
`sandstorm`, `demands`, `revealed`, `loop`, `price`. The state names map to scenes through
the `TEST_SCENE` table at the top of `js/main.js`, so `?test=broken-b` routes to scene 3 by
itself and a capture command needs one parameter rather than two.

**Then read the PNGs.** The course-viz skill says this twice and gives the reason: an agent
has no eyes, and a screenshot nobody opens is a file rather than a verification. Reading them
is what found everything in the next section.

## Two macOS gotchas, both of which cost time on 2026-08-26

**Chrome 151 does not exit after `--screenshot`.** The PNG is written within about two
seconds and is complete, and then the process sits there. `--virtual-time-budget` is not
honoured by the new headless mode, so the `timeout 10` inside `capture.sh` is doing real work
rather than papering over a hang. **Judge a shot by its byte count and not by the exit code.**
A first attempt without the timeout ran for two minutes and was killed by the harness, with
a perfectly good PNG already on disk.

**Never clean up with `pkill -f "Google Chrome"`.** Carlos works in a real Chrome with many
tabs, and often a second one holding a hand-done ETH Shibboleth login that cannot be
re-automated. A bare pattern takes all of it down at once, and because it is an external
SIGTERM rather than a fault there is no crash dialog and no dump, so it presents as "Chrome
suddenly started crashing". `capture.sh` scopes its cleanup to its own `--user-data-dir`.

## What reading the screenshots found, 2026-08-26

Three real defects, all found by looking and none by any check that passed.

**1. The plot boxes were scaled rather than sized.** `css/trace.css` locked `.trace-svg` at
560x300 while `js/trace.js` wrote `width="470" height="250"` into the attributes. With a
viewBox present the browser scales the content by 1.19 and centres it, so the plot overflowed
its card and the right hand end of the truth label was clipped by the card edge. It looked
almost right in a live browser and captured wrong. This is the exact case the course-viz
never-do list carries its longest entry about. Fixed by making the four numbers agree, adding
a `.plot-scroll` container so a locked box can scroll on a narrow window rather than pushing
the page sideways, and writing the reason into the header comment of `css/trace.css` so the
next agent does not undo it.

**2. Scene 6's `?test=revealed` set its cursor and never re-rendered.** The three reveal
cards existed in the DOM with `display: none`. A DOM dump is what settled it: the cards were
there, three `display: none` were there, so the hook was the suspect rather than the builder.
Fixed with one `render()` call.

**3. The verdict chip read "down too big".** A CSS `::before` was adding a direction word in
front of the verdict, which is two verdicts in a row. Carlos's own handwritten page puts the
direction in the Update column and the verdict in the Verdict column, so the `::before` came
out and the direction stayed in the update text.

Two cosmetic things fixed in the same pass: the footer was clipped at 1400x1000 because
`.stage` reserved 190px of chrome when the real total is about 172px plus slack, and the loss
strip's card heading repeated the words already drawn inside the SVG.

## What has been observed, and what has not

**Observed**, at 1400x1000, both themes, by reading the images:

- Scene 1 renders the deck's three headers through KaTeX, character for character, with the
  six rows and their signed losses; the verdict chip reads `too big`; the loss strip falls
  from `1.0e+0` to `9.6e-3`.
- Scene 3 at `?test=broken-b` shows `1.7000 -> 1.4286 -> 2.3333 -> 0.7500` then a struck row
  reading `refused / -4.0000 / no answer`, the red verdict box, and the trace holding the
  escape as a dashed line.
- Scene 6 shows `1.6180339887` in amber, the truth line labelled and inside the plot, and all
  three reveal cards.
- Scene 7 accepts the three blanks and turns them green with the confirming sentence.
- Scene 8's muted row is legibly muted in both themes, which is acceptance criterion 14.
- Scenes 4 and 5 render their stub cards with the owner and the issue prompt filename.

**Not observed:**

- Nothing at 1280x800. That is issue 05, and the arithmetic in that issue predicts the plots
  will have to scroll inside their containers at that width.
- No interaction was driven by hand. Every state was reached through a `?test=` hook or a
  deep link. Typing into the scene 1 input, dragging the scene 3 slider and clicking the
  quiz have not been done by a human.
- No `prefers-reduced-motion` pass.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a
  new capture state, a changed capture recipe, or a new round of reading the images, UPDATE
  THIS FILE IN THE SAME COMMIT, under a dated heading. A CLAUDE.md that describes a layout
  the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you
  create a subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that
  cost someone an hour. Do not restate what the code already says plainly.
