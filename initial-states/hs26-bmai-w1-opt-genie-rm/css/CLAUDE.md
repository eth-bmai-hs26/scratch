# CLAUDE.md, css/

## Provenance

`style.css` is `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/css/style.css`,
its first 648 lines copied byte for byte on 2026-08-26 so the two stay diffable, with two
blocks appended below a marked line and **nothing above it edited**:

1. the click-step scene engine shell, adapted from
   `/Users/carloscotrini/Documents/git_fdd/projects/bandits/css/style.css`. The bandits file
   uses `--ink-secondary` where grasshopper uses `--muted`, so the token names are remapped.
2. the small shared pieces this viz needs everywhere: the step counter, the genie's speech
   line, the body line and the stub card.

When grasshopper's file changes upstream, diff the first 648 lines rather than merging.

## Colour identities, fixed once

```
blue    #2f6cb1   the genie's answer: the target column, the target series
purple  #7a5c8c   the trail of guesses already made
amber   #c08a3e   revealed truth. NOTHING uses it before scene 6
green   #4a8b6b   the genie accepts. Always printed with the word "accepted"
red     #b8323a   a number the bargain refuses. Always printed with the word "refused"
```

Inherited token names that now mean something else, and are deliberately not renamed so the
file stays diffable against grasshopper: `--peak` and `--peak-soft` were the summit of a
landscape and are now the revealed truth line; `--hopper` and its relatives are unused here
and drive the primary button.

Red and green both appear, and the rule is honoured the other way round from the beamer
skill: **colour is never the only channel.** Every use is redundant with a word on screen.

## The file per scene

| file | what it dresses |
|---|---|
| `style.css` | tokens, page shell, and the whole shared class vocabulary |
| `table.css` | the guess / target / loss widget, and Carlos's two extra columns |
| `trace.css` | the two plots. **Four numbers here must match `js/trace.js`** |
| `scene0.css` | the lamp, drawn rather than photographed |
| `scene1.css` | the verdict chip |
| `scene3.css` | the two controls of the breaking scene |
| `scene6.css` | the reveal. The only place amber is spent |
| `scene7.css` | the code stub and the quiz |
| `scene8.css` | the mapping table, and the muted row |

Scenes 2, 4 and 5 have no stylesheet, because scene 2 uses only the shared vocabulary and 4
and 5 are stubs. When a scene gets one, add its `<link>` to `index.html` in scene order.

## The rule that has already been broken once

**A plot box size lives in two files and they must agree.** `.trace-svg` and `.spark-svg`
lock `width` and `height` here; `js/trace.js` writes the same numbers into the SVG
attributes. They were once 560x300 in CSS and 470x250 in the attributes, so with a viewBox
present the browser scaled the content by 1.19 and centred it, and the plot overflowed its
card and clipped the end of the truth label. It rendered acceptably in a live browser and
captured wrong. The header comment in `trace.css` carries the same warning.

## Maintenance contract

- This file is the working memory for this directory. After a new stylesheet, a new token, a
  changed box size, or a changed colour identity, UPDATE THIS FILE IN THE SAME COMMIT. A
  CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule.
- Keep it concrete: real file names, real identifiers, real commands.
