# CLAUDE.md, issue-prompts/

Contract for the issue prompts of `hs26-bmai-w1-opt-genie-rm`.

## What these are

One markdown file per unit of work that remains. Each is written so that one person or one
agent can be handed exactly that file, with no context beyond this repository, and produce a
mergeable result. The format is the FS26 one, verified against
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/issue-prompts/`, which
is 18 files using a stable heading order.

## Heading order, fixed

```
# Issue N: Title
## Goal              two to four sentences, what and why
## Dependencies      one bullet per upstream issue, or the word None
## Context           what the agent needs to know that is not obvious from the tree
## Deliverables      numbered h3 per artifact, specified to zero ambiguity
## File Structure    only the files this issue creates or edits, (updated) marks an edit
## Verification      observable acceptance bullets, the last ones being commands that pass
```

`## Implementation Notes` is optional and goes between Deliverables and File Structure.

## The dependency graph

```
tier 0    01-panel-module.md .............. no dependencies
          02-multi-series-trace.md ........ no dependencies
          07-ta-card.md ................... no dependencies, needs no code at all
          08-colab-run.md ................. no dependencies, needs a browser and an account

tier 1    03-scene4-sandstorm.md .......... after 01 and 02
          06-drop-d3.md ................... after 02, because both edit js/trace.js

tier 2    04-scene5-two-demands.md ........ after 03

tier 3    05-projector-pass-1280.md ....... last, because it walks every scene
```

**Issues that touch the same file and must not run at the same time:**

| file | issues |
|---|---|
| `js/trace.js` | 02, 06, and 05 if a plot box changes |
| `css/trace.css` | 02, 06, 05 |
| `js/main.js` | 03 and 04, one `TEST_SCENE` line each |
| `index.html` | 01, 03, 04, 06, one or two lines each |
| `docs/CLAUDE.md` | 05, 07 |

`js/main.js` and `index.html` take a one-line edit from several issues, which merges cleanly
in practice. `js/trace.js` does not: issues 02 and 06 rewrite the same scale code and one of
them has to land first. The graph puts 02 first for that reason.

## Ownership, from the master schedule

TAs Jinlei and Suei-Wen. The design spec's fan-out plan puts the pedagogical core, meaning
break, noise and conditions, in one lane rather than splitting it, because the second break
only lands against the first. So:

| lane | issues |
|---|---|
| Suei-Wen | 01, 02, 03, 04, 05 |
| Jinlei | 07, 08 |
| either | 06 |

Bundle for tonal coherence and never for parallelism, and never split a tonal triplet.

## Standing rules for every issue here

1. **Never call `Math.random()`.** `js/rng.js` is the only source of randomness, seed
   20260904, and the course-viz never-do list is explicit about this.
2. **Never write a colour in JavaScript.** Every fill and stroke routes through a CSS class.
3. **The answer stays off screen before scene 6.** Verifier assertion (j) refuses any scene
   file numbered 0 to 5 containing `1.618`, `golden` or `DATA.reveal`, comments included.
   Reword rather than weaken the assertion.
4. **A plot box size lives in two files and they must agree.** `css/trace.css` and
   `js/trace.js`. A mismatch scales the viewBox instead of resizing the box, which renders
   acceptably and captures wrong.
5. **Verification ends in looking.** Capture the PNGs and read them. Compiling clean and
   exit 0 prove nothing about how a page looks.
6. **ASCII punctuation only**, in code, prose and generated notebook cells alike.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a
  new issue, an issue completed and removed, a changed dependency, or a change in who owns
  a lane, UPDATE THIS FILE IN THE SAME COMMIT. A CLAUDE.md that describes a layout the
  directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you
  create a subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that
  cost someone an hour. Do not restate what the code already says plainly.
