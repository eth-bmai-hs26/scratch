# CLAUDE.md, cold-open-weekend1/slides/img/

Contract for the plate directory of the weekend-1 cold open.

> **Status, 2026-08-26.** Empty except for `IMAGE-SOURCES.txt` and this file.
> That is the intended state of the initial handoff: nothing was downloaded
> during the build. The deck compiles and projects without any image.

## What belongs here

Exactly one file, and it is not here yet:

| Filename the deck expects | Subject | Where the deck uses it |
|---|---|---|
| `descartes-hals.jpg` | Frans Hals, *Portrait of Rene Descartes* (1649) | `slides.tex` frame 1, left column, `\plateh{4.1cm}{3.1cm}{img/descartes-hals.jpg}` |

`IMAGE-SOURCES.txt` carries the artist, the year, the licence, the Commons URL,
the recorded pixel size, the traps, and a `Status` line that currently says the
file was never downloaded, opened or inspected. **Update that line when it is.**

## Why the directory is empty

Two reasons, and both are house rules rather than laziness.

1. **Filenames lie, so a plate is promised only after somebody opens it.** The
   Commons record for this portrait has at least six near-identical variants,
   one of them labelled a digitally modified derivative. Committing whichever
   file a script downloaded first would put an unexamined image in front of a
   room, which is the failure the rule exists to prevent.
2. **A missing plate has to be visible.** `\plateh` in `../beamer-preamble.tex`
   falls back to a dashed box naming the file, so an absent image is legible on
   the slide and cannot be shipped by accident. Committing a stand-in image
   would hide the gap behind something that looks like a picture.

## Adding the plate

1. Open the Commons page in `IMAGE-SOURCES.txt`, look at the image, and prefer
   the plain unmodified scan.
2. Download it as `descartes-hals.jpg` into this directory. About 1000 px on the
   long edge is plenty for a 4.1cm plate.
3. Replace the three `NOT` lines under `Status` with the Commons file name, the
   download date, and the words "opened and inspected before use".
4. `cd .. && pdflatex slides.tex && pdflatex slides.tex`, then render frame 1 to
   PNG and look at it. The real portrait is narrower than the placeholder box,
   so the column shifts a little.

## Maintenance contract

- This file is the working memory for this directory. After any major change
  here, meaning an image added, replaced, renamed or removed, a changed licence
  finding, or a new plate that a new frame needs, UPDATE THIS FILE AND
  `IMAGE-SOURCES.txt` IN THE SAME COMMIT. A CLAUDE.md that describes a layout
  the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and
  that file must itself carry this same maintenance contract, including this
  propagation rule. When you create a subdirectory, create its CLAUDE.md at the
  same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the
  gotchas that cost someone an hour. Do not restate what the code already says
  plainly.
