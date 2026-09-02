# CLAUDE.md, cold-open-weekend1-szymborska/slides/

Contract for the deck. Read it before editing `slides.tex`.

> **Status, 2026-09-01.** Built and verified. Compiles twice with plain `pdflatex`, exit 0, no
> LaTeX errors and **no overfull or underfull boxes**, 24 pages, zero em dashes, zero en dashes and
> zero double hyphens in the rendered PDF, all 24 pages rendered at 130 DPI, frame 1 read again at
> 300 DPI, the Polish diacritics confirmed through `pdftotext`, and the no-shift rule on frame 1
> measured pixel by pixel rather than eyeballed. **Seven of the 24 pages were read in this build**,
> the four of the new frame plus pages 8, 15 and 24; the other 17 are the Popper deck unchanged and
> were read one by one in its build of 2026-08-31. `../README.md` says which.
>
> Three defects were found by rendering this build and fixed: **frame 1 overflowed by 90.6pt**, its
> plate caption **split the licence as "CC / BY 3.0"**, and the **references frame overflowed by
> 26pt** once Szymborska's entries were added, whose first fix pushed the column headings into the
> frametitle panel. `../README.md` has all three in full. The three defects of the 2026-08-31 build
> are in `../../cold-open-weekend1-popper/slides/CLAUDE.md`.
>
> **What is deliberately incomplete.** Three of the four plates are present; `img/popper-lse.jpg` is
> absent and its box projects on frame 2. The German original on frame 2 could not be found, so its
> slot projects a dashed marker too. Both gaps are visible by design. See `../SOURCES.md`.

## The five rules that matter most in this file

1. **Do not fill the `\origslot` marker on frame 2 from a quotation site.** Two German wordings
   circulate and neither was traceable to a printed page. It is also not yet known whether that
   sentence has a 1934 German counterpart at all, because Popper revised the 1959 English himself.
   `../SOURCES.md` section 2.2 has the full account.
2. **Do not restore the familiar Whewell wording.** The circulating version says "is apparently the
   only way"; the 1858 text says "is, with most persons,". The deck carries 1858.
3. **The diagram is drawn with `to`, never with `--`.** A TikZ line segment is the one place the
   house dash rule permits a double hyphen, and this deck declines even that, so the dash grep over
   the source returns only comment lines and nobody has to eyeball hits.
4. **Every node and arrow on frame 3 uses `visible on=<n->`, never `\only`.** That is what keeps the
   picture's bounding box identical across all seven overlays. Measured: the `P1` box's ink starts
   at the same pixel on every overlay it appears in.
5. **No closing punchline and no `\takeaway`.** The preamble deliberately does not define one, and
   the reason is written at the foot of that file. Frames end on their final reveal.
6. **On frame 1, the break between a quotation and its gloss is `\\[2pt]` and NEVER `\par`.** A
   `\par` inside those `\onslide` groups ends the paragraph, and the `\\[8pt]` that separates the
   groups then fails with "There's no line here to end". This deck did exactly that on its first
   build and would not compile.
7. **Frame 1's Polish is written as LaTeX accent commands, never as raw UTF-8**, matching the
   convention the Descartes deck uses for its French. `\l{}` is l with stroke, `\k{a}` and `\k{e}`
   are the ogonek, `\.z` is z with a dot. After any edit to that frame, re-run
   `pdftotext -f 4 -l 4 slides.pdf -` and read the Polish back.

## Layout

```
slides/
  CLAUDE.md            this file
  .gitignore           LaTeX aux files and scratch decks. The PDF is committed
  beamer-preamble.tex  the theme. Copied from the Descartes deck, which had already been
                       diffed against the lecture-slides skill. ONE macro added,
                       \origslot, documented at its definition
  slides.tex           six frames
  slides.pdf           compiled, 24 pages
  img/
    CLAUDE.md          contract for the plate directory
    IMAGE-SOURCES.txt  one block per plate: author, date, licence, URL, traps, status
```

## Frames and pages

| # | Frame | PDF pages | Overlays | Job |
|---|---|---|---|---|
| 1 | Szymborska, 1996: the answer that will not hold | 1 to 4 | 4 | Placement, then "born from a continuous I don't know", then the loop. Polish above, the published English below. **Ends on the line frame 2 answers** |
| 2 | Popper, 1934: conjecture and refutation | 5 to 8 | 4 | Placement, the German slot, then the sentence. The frame the room remembers |
| 3 | Popper's tetradic schema | 9 to 15 | 7 | The pinned quotation, then `P1 TT EE P2` one node per click, then the loop closing, then Friday morning hung off each node in one wave |
| 4 | Turing, 1950: the child machine | 16 to 19 | 4 | The same loop, said about machines that learn, one year before Robbins and Monro |
| 5 | Whewell, 1858: trying wrong guesses | 20 to 23 | 4 | The same loop again, plus overshooting, which is the 11:00 lecture |
| 6 | References | 24 | 1 | A handout page and a rights record. **Not part of the three minutes** |

Ratio: 6 frames to 24 pages, exactly 4.0, inside the skill's 4 to 6 teaching band. Frame 6 is
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
2. **NOTHING ON A SLIDE IS ADDRESSED TO THE BUILD, and this entry used to say
   the opposite.** It read: "Frame N projects its own provenance caveat, in
   muted type ... that is build metadata on a slide, and it is there for the
   same reason a missing plate draws a box: a gap that is legible cannot be
   shipped by accident. Delete that one line when the sentence is pinned."
   **That was wrong and Carlos struck it on 2026-09-02.** A dashed box stands in
   for something ABSENT and forces the gap closed before the lecture; a footnote
   about a quotation that IS on the slide is this deck talking to its own
   builder in front of a room of managers. The caveat belongs in `SOURCES.md`
   and in a `%` comment at the frame. Do not put a build note, a repository
   path, a "not pinned" or a "TBD" on a slide.
3. **Three of the five quotation frames carry English originals, so their second line is a
   paraphrase rather than a translation.** Each source line says which it is. `../SOURCES.md`
   section 3 has the reasoning and the one-line way to drop those paraphrase lines if Carlos
   prefers. **Frame 1 is the exception**: its Polish original is pinned, so the line under it is a
   published translation.
4. **No mapping table frame**, which is what the sibling Descartes deck exists for. Friday morning
   is hung off the four schema nodes instead, as the last wave of frame 3, so the deck stays at the
   frame count Carlos asked for plus the poet. If the mapping deserves its own frame, that is a new
   frame rather than an edit to this one.
5. **The animation ratio is 4.0**, which is only just inside the band, because a cold open is
   calibrated differently from a teaching deck. Its own precedent, the AINIT Faust opening, sits at
   exactly 1.0, and the Descartes deck at 3.25. Adding frame 1 left the ratio exactly where it was,
   which is a coincidence worth not reading anything into.

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
