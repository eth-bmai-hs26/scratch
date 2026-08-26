# CLAUDE.md, issue-prompts/

Contract for the issue prompts of `hs26-bmai-w1-opt-heron`. Owners: Jinlei, Daniele, Ivan.

## What these are

One markdown file per unit of work that remains. Each is written so that an agent or a TA can be
handed exactly one of them, with no other context beyond this repository, and produce a mergeable
result. The format is the FS26 one, verified against
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/issue-prompts/`, which is 18
files using a stable heading order.

Read `../CLAUDE.md` before opening any of these. It carries the withholding contract, the colour
identities, the sign convention and the Decimal rule, and every issue here assumes them.

## Heading order, fixed

```
# Issue N: Title
## Goal              two to four sentences, what and why
## Dependencies      one bullet per upstream issue, or the word None
## Context           what the agent needs to know that is not obvious from the tree
## Deliverables      numbered h3 per artifact, specified to zero ambiguity
## File Structure    only the files this issue creates or edits, (updated) marks an edit
## Verification      observable acceptance bullets, the last one being a command that must pass
```

`## Implementation Notes` is optional and goes between Deliverables and File Structure.

## The dependency graph

```
tier 0   01-shared-views-ruler-loupe.md .... no dependencies. START HERE, it blocks three issues
         05-scene5-bridge.md ............... no dependencies, pure DOM and text
         06-ta-card.md ..................... no dependencies, needs the room and the clock
         08-block-notebook-merge.md ........ no code dependency, BLOCKED on a decision from
                                             Carlos and from the other two TA teams

tier 1   02-scene2-bracket.md .............. after 01, needs RulerView
         03-scene3-heron.md ................ after 01, needs RulerView and Loupe
         04-scene4-digits.md ............... after 01, needs Loupe

tier 2   07-verification-pass.md ........... last. It records what the others did
```

Who takes what, given three TAs and the skill's rule to bundle for tonal coherence rather than for
parallelism:

| TA | Issues | Why bundled |
|---|---|---|
| Jinlei | 01, then 02 | The bracket is the pedagogically load-bearing scene and it needs the ruler it is built on |
| Daniele | 03 and 04 | Naming and payoff are one voice. Splitting them splits the register |
| Ivan | 05, 06, then 07 | Light work, similar tone, and 07 is the integration pass |

## File collisions

| File | Touched by |
|---|---|
| `index.html` | 01 only (two new `<script src>` lines) |
| `js/scenes/scene2.js`, `css/scene2.css` | 02 only |
| `js/scenes/scene3.js`, `css/scene3.css` | 03 only |
| `js/scenes/scene4.js`, `css/scene4.css` | 04 only |
| `js/scenes/scene5.js`, `css/scene5.css` | 05 only |
| `../CLAUDE.md`, `../README.md` | 01 and 07. Run 07 after 01 has landed |
| `exercise/` | 08 only |

Nothing else overlaps, so tier 1 runs three ways in parallel.

## Rules for anyone writing a new issue prompt here

1. **Numbers in a deliverable are literal.** Write `bracket width 87.240734`, never "a narrower
   bracket". Every number must be real output of `precompute/build_data.py` or must already sit in
   `data/datasets.js`.
2. **Verification bullets are observable.** "The scene reads well" fails this test. "At 1280 by 800
   in dark, screenshot `#scene=2&instant&theme=dark&test=widened` and confirm the bracket bar and
   its two end labels do not overlap" passes it.
3. **Every issue ends on a command that must pass.** For a scene that is
   `node --check js/scenes/sceneN.js` plus a named-state screenshot; for anything touching data it is
   `python3 precompute/build_data.py`.
4. **State negative dependencies explicitly** where they exist, the way FS26 issue 16 does.
5. Repeat the withholding rule in any issue that draws a ruler or an axis. It is the rule most easily
   broken by a helpful addition.
6. ASCII punctuation only.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a new
  issue, an issue that has been completed and should be marked so, a changed dependency, or a change
  in who owns which issue, UPDATE THIS FILE IN THE SAME COMMIT. A CLAUDE.md that describes a layout
  the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
