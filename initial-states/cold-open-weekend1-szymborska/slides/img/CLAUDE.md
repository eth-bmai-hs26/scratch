# CLAUDE.md, cold-open-weekend1-szymborska/slides/img/

Contract for the plate directory of the Szymborska cold open.

> **Status, 2026-09-01.** THREE OF FOUR PLATES PRESENT. `szymborska-kubik.jpg`
> was added with the new frame 1; `turing-1951.jpg` and `whewell-wellcome.jpg`
> came over from the Popper deck. All three were licence-checked at the source,
> opened and inspected before use, and the Szymborska file's EXIF was
> cross-checked against its Commons record. `popper-lse.jpg` is STILL ABSENT and
> its dashed box still projects on frame 2, because its rights question is
> unresolved and the choice is Carlos's.

## What belongs here

Four files. Three are here.

| Filename the deck expects | Subject | Where the deck uses it | Present |
|---|---|---|---|
| `szymborska-kubik.jpg` | Wislawa Szymborska, Krakow, 23 October 2009, Mariusz Kubik | `slides.tex` frame 1, `\plateh{3.6cm}{3.0cm}{img/szymborska-kubik.jpg}` | **Yes** |
| `popper-lse.jpg` | Karl Popper, about 1980, LSE Library | `slides.tex` frame 2, `\plateh{4.0cm}{3.0cm}{img/popper-lse.jpg}` | **No, and its box projects** |
| `turing-1951.jpg` | Alan Turing, 29 March 1951, Elliott and Fry | `slides.tex` frame 4 | **Yes** |
| `whewell-wellcome.jpg` | William Whewell, stipple engraving, Wellcome L0014766 | `slides.tex` frame 5 | **Yes** |

Note the frame numbers. Szymborska took frame 1, so every other plate moved down
one against the Popper deck next door.

## The one thing that makes this directory different from its sibling

The sibling Descartes deck wants a single plate and it is a 1649 painting, free
by age in every direction. **Three of the four plates here carry a condition**,
and one of those conditions is unresolved:

0. **`szymborska-kubik.jpg` is CC BY 3.0 with attribution required.** The credit
   on frame 1 and on the references frame is that condition being met. Do not
   shorten it. The file is 360 x 480, the largest Commons holds, which is why
   the plate is 3.6cm rather than 4.0cm. Do not upscale it.

1. **`popper-lse.jpg` has a real rights question.** Commons records it as "no
   known copyright restrictions", which is an institutional statement rather
   than a licence or a public domain finding. Popper died in 1994 and the
   photograph is from about 1980. `IMAGE-SOURCES.txt` sets out three options,
   including running frame 2 with no plate at all. **This is Carlos's call and
   it is not made.**
2. **`whewell-wellcome.jpg` is CC BY 4.0**, so the credit printed on frame 5 and
   repeated on the references frame is a licence condition. Do not shorten it.
3. `turing-1951.jpg` is plain public domain and needs nothing.

## Adding a plate

1. Open the Commons page in `IMAGE-SOURCES.txt`, look at the image, and prefer
   the plain unmodified scan.
2. Download it under the exact name in the table above. About 1000 px on the
   long edge is plenty for a 4.0cm plate. The Popper file is only 769 px tall as
   recorded; do not upscale it.
3. Replace the three `NOT` lines under `Status` with the Commons file name, the
   download date, and the words "opened and inspected before use".
4. `cd .. && pdflatex slides.tex && pdflatex slides.tex`, then render that frame
   to PNG and look at it. A real portrait is narrower than the placeholder box,
   so the column shifts a little when the file lands.

## Maintenance contract

- This file is the working memory for this directory. After any major change
  here, meaning an image added, replaced, renamed or removed, a changed licence
  finding, a decision recorded by Carlos on the Popper photograph, or a new
  plate that a new frame needs, UPDATE THIS FILE AND `IMAGE-SOURCES.txt` IN THE
  SAME COMMIT. A CLAUDE.md that describes a layout the directory no longer has
  is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and
  that file must itself carry this same maintenance contract, including this
  propagation rule. When you create a subdirectory, create its CLAUDE.md at the
  same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the
  gotchas that cost someone an hour. Do not restate what the code already says
  plainly.
