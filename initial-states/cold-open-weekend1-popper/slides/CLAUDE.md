# CLAUDE.md, cold-open-weekend1-popper/slides/

Contract for the deck. Read it before editing `slides.tex`.

> **Status, 2026-08-31.** Built and verified. Compiles twice with plain `pdflatex`, exit 0, no
> LaTeX errors and **no overfull or underfull boxes**, 20 pages, zero em dashes and zero en dashes
> in the rendered PDF, all 20 pages rendered and read, five terminal overlays read again at 300 DPI,
> and the no-shift rule measured rather than eyeballed. Three defects were found by rendering and
> fixed: frame 2 overflowed its frame by 24.5pt, its "Compare" caption hyphenated as "Com-pare"
> inside a 2.9cm node, and the fix for that suppressed hyphenation in the source line below it,
> which then ran 4.45pt past the right margin.
>
> **What is deliberately incomplete.** `img/` is empty, so all three plate slots project a dashed
> box. The German original on frame 1 could not be found, so its slot projects a dashed marker too.
> Both gaps are visible by design. See `../SOURCES.md`.

## The five rules that matter most in this file

1. **Do not fill the `\origslot` marker on frame 1 from a quotation site.** Two German wordings
   circulate and neither was traceable to a printed page. It is also not yet known whether that
   sentence has a 1934 German counterpart at all, because Popper revised the 1959 English himself.
   `../SOURCES.md` section 2.2 has the full account.
2. **Do not restore the familiar Whewell wording.** The circulating version says "is apparently the
   only way"; the 1858 text says "is, with most persons,". The deck carries 1858.
3. **The diagram is drawn with `to`, never with `--`.** A TikZ line segment is the one place the
   house dash rule permits a double hyphen, and this deck declines even that, so the dash grep over
   the source returns only comment lines and nobody has to eyeball hits.
4. **Every node and arrow on frame 2 uses `visible on=<n->`, never `\only`.** That is what keeps the
   picture's bounding box identical across all seven overlays. Measured: the `P1` box's ink starts
   at the same pixel on every overlay it appears in.
5. **No closing punchline and no `\takeaway`.** The preamble deliberately does not define one, and
   the reason is written at the foot of that file. Frames end on their final reveal.

## Layout

```
slides/
  CLAUDE.md            this file
  .gitignore           LaTeX aux files and scratch decks. The PDF is committed
  beamer-preamble.tex  the theme. Copied from the sibling Descartes deck, which had
                       already been diffed against the lecture-slides skill. ONE macro
                       added for this deck, \origslot, documented at its definition
  slides.tex           five frames
  slides.pdf           compiled, 20 pages
  img/
    CLAUDE.md          contract for the plate directory
    IMAGE-SOURCES.txt  one block per plate: author, date, licence, URL, traps, status
```

## Frames and pages

| # | Frame | PDF pages | Overlays | Job |
|---|---|---|---|---|
| 1 | Popper, 1934: conjecture and refutation | 1 to 4 | 4 | Placement, the German slot, then the sentence. The frame the room remembers |
| 2 | Popper's tetradic schema | 5 to 11 | 7 | The pinned quotation, then `P1 TT EE P2` one node per click, then the loop closing, then Friday morning hung off each node in one wave |
| 3 | Turing, 1950: the child machine | 12 to 15 | 4 | The same loop, said about machines that learn, one year before Robbins and Monro |
| 4 | Whewell, 1858: trying wrong guesses | 16 to 19 | 4 | The same loop again, plus overshooting, which is the 11:00 lecture |
| 5 | References | 20 | 1 | A handout page and a rights record. **Not part of the three minutes** |

Ratio: 5 frames to 20 pages, exactly 4.0, inside the skill's 4 to 6 teaching band. Frame 5 is
static on purpose and drags the ratio down; the four content frames alone run 19 pages over 4
frames.

## Build and verify

```
cd slides
pdflatex slides.tex && pdflatex slides.tex     # twice, plain pdflatex, from inside slides/
grep -c "^!" slides.log                        # must print 0
grep -c "Overfull\|Underfull" slides.log       # must print 0
pdftotext slides.pdf - | grep -cP '\x{2014}'   # must print 0
pdftotext slides.pdf - | grep -cP '\x{2013}'   # must print 0
pdftoppm -png -r 130 slides.pdf /tmp/pop       # then READ all 20 PNGs
```

Two extra checks that each caught a real defect here, and that a clean compile does not:

```
# 1. Terminal overlay of every frame, read alone at 300 DPI. 130 DPI is too coarse
#    to see a caption hyphenating inside a node.
for p in 4 11 15 19 20; do pdftoppm -png -singlefile -r 300 -f $p -l $p slides.pdf /tmp/hi_$p; done

# 2. No-shift, MEASURED. The P1 node must start at the same pixel on every overlay
#    of frame 2 that shows it. Crop the window and compare the ink bounding box on
#    pages 6 to 11; the left and top edges must not move.
```

## Deliberate departures, each with its reason

1. **A references frame, which no other deck in this family has.** Four quoted authors, one of them
   in copyright, and two plates carrying licence conditions. The frame is the rights record made
   visible. It is not projected during the three minutes.
2. **Frame 1 projects its own provenance caveat**, in muted type: "Located, not yet pinned: a colon
   and a semicolon version both circulate." That is build metadata on a slide, and it is there for
   the same reason `img/` is empty: a gap that is legible cannot be shipped by accident. Delete
   that one line when the sentence is pinned.
3. **Three of four quotations are English originals, so their second line is a paraphrase rather
   than a translation.** Each source line says which it is. `../SOURCES.md` section 3 has the
   reasoning and the one-line way to drop those paraphrase lines if Carlos prefers.
4. **No mapping table frame**, which is what the sibling Descartes deck exists for. Friday morning
   is hung off the four schema nodes instead, as the last wave of frame 2, so the deck stays at the
   five frames that were asked for. If the mapping deserves its own frame, that is a new frame
   rather than an edit to this one.
5. **The animation ratio is 4.0**, which is only just inside the band, because a cold open is
   calibrated differently from a teaching deck. Its own precedent, the AINIT Faust opening, sits at
   exactly 1.0, and the sibling Descartes deck at 3.25.

## What NOT to do

- Do not put an unpinned quotation on a slide. Two slots in this deck are marked precisely because
  they are not pinned yet.
- Do not download and commit a plate without opening it, and do not resolve the Popper photograph's
  rights question by ignoring it.
- Do not shorten the Wellcome credit on frame 4. It is a licence condition.
- Do not add a red/green pair anywhere.
- Do not promote either muted paraphrase line into body text, and do not centre anything.
- Do not report the deck as verified without rendering it and looking. All three defects this build
  found were invisible to a clean compile.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a frame
  added, cut or reordered, a changed or newly pinned quotation, a theme change, a new image
  dependency, or a decision recorded by Carlos, UPDATE THIS FILE IN THE SAME COMMIT, along with the
  frame table above and `../SOURCES.md`. A CLAUDE.md that describes a layout the directory no
  longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
