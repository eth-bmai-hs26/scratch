# CLAUDE.md, issue-prompts/

Contract for the issue prompts of `hs26-bmai-w1-opt-rm-house`.

## What these are

One markdown file per unit of work that remains. Each is written so that an agent or a TA can
be handed exactly one of them, with no other context beyond the repository, and produce a
mergeable result. The format is the FS26 one, verified against
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/issue-prompts/`, which is
18 files using a stable heading order.

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
tier 0   01-ta-card.md ..................... no dependencies, can start now
         05-colab-run-and-hosting.md ....... no dependencies, needs a browser and an account

tier 1   02-figures-audit.md ............... after 01, because the TA card fixes the wording
         03-check-coverage.md .............. independent of 01 and 02, but touches housetools.py
                                             so it should not run at the same time as 02

tier 2   04-second-feature.md .............. after 03, because it adds a fifth check
         06-readme-and-handover.md ......... last, because it records what the others did
```

Issues 02 and 03 both edit `housetools.py`. Do not run them in parallel.
Issue 04 edits `data/generate_houses.py`, which invalidates every number in the printed
material, so it carries the heaviest verification burden of the six.

## Rules for anyone writing a new issue prompt here

1. **Numbers in a deliverable are literal.** Write `alpha = 0.05` and `mse = 281.6283`, never
   "a small step" or "close to optimal". Every number must be real output of
   `precompute/reference.py`.
2. **Verification bullets are observable.** "The figure is legible" is not a criterion. "Render
   `plot_orbit` to PNG at 110 dpi and confirm the legend does not overlap any data point" is.
3. **Every issue ends on a command that must pass**, normally
   `python3 precompute/reference.py` and `python3 precompute/build_notebooks.py`.
4. **State negative dependencies explicitly** where they exist, the way FS26 issue 16 does.
5. ASCII punctuation only.
