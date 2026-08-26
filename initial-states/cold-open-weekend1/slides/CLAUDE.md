# CLAUDE.md, cold-open-weekend1/slides/

Contract for the deck itself. Read this before editing a `.tex` file here.

> **Status, 2026-08-26.** Built, compiled twice with `pdflatex`, rendered at 130
> and 300 DPI and read page by page. Four frames, thirteen overlay pages, zero
> LaTeX errors, zero overfull or underfull boxes, zero em dashes and zero en
> dashes in the rendered PDF. `img/` is deliberately empty, so frame 1 currently
> projects a dashed placeholder box where the portrait belongs.
>
> Nothing here has been committed to git by the agent that built it, and no
> quotation on the slides has been re-pinned against a primary source in the
> build session. The build inherited the pinning done in
> `../COLD-OPEN-CANDIDATES.md` section 13 and did no verification of its own.
> See "What is unverified" in `../README.md`.

## Layout

```
slides/
  CLAUDE.md              this file
  .gitignore             LaTeX aux files and the scratch decks. The PDF is committed
  beamer-preamble.tex    the theme. Copied from the lecture-slides skill template
                         and diffed against the skill; the diff is in its header
  slides.tex             the four frames
  slides.pdf             compiled, 13 pages, the deliverable
  img/
    CLAUDE.md            contract for the plate directory
    IMAGE-SOURCES.txt    one block per image: artist, year, licence, URL, traps
```

## Build

```
cd slides
pdflatex slides.tex && pdflatex slides.tex
```

Twice, and with plain `pdflatex`. Compile FROM this directory so that
`\input{beamer-preamble}` and `img/descartes-hals.jpg` both resolve.

No `lualatex`, no `xelatex`, no `fontspec`. The deck quotes French only, and
every accent is written as a LaTeX escape (`\'e`, `\`a`, `\^e`, `\c{c}`,
`\^{\i}`), so both source files are pure ASCII. A cold open that quoted Greek
would have forced `lualatex` for the whole deck; that cost is one of the reasons
the Greek candidates lost. See `../COLD-OPEN-CANDIDATES.md` section 0.

## The five rules that matter most here

1. **The four alerted clauses on frame 2 are the four left-hand cells of frames
   3 and 4, word for word.** That is the whole mechanism: the accent colour is
   taught on frame 2 on clauses that have no meaning yet, and it is spent on
   frame 3 where one row loses it. Editing a clause in one place and not the
   other two breaks the device silently. Grep for the clause before you change
   it; it appears three times.

2. **Row 4 is muted by absence of `\alert` plus one `{\color{muted}}` on the
   right cell.** Never a strikethrough, never a deletion, never a caption. Its
   LEFT cell is ordinary ink, which makes it darker than the alerted rows on one
   side and greyer on the other. This is the AINIT *die Kraft* device
   (`/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex`
   lines 111 to 123), and the analysis of why it works is in
   `../../docs/summaries/02-ainit-rl-slides-narrative-and-cold-open.md`.

3. **`\alert` appears nowhere else in this deck.** Twelve calls on frame 2 and
   frames 3 and 4, and that is the whole budget. The AINIT deck spends 12 of its
   13 `\alert` calls inside its three cold-open frames for the same reason.

4. **No closing punchline.** `\takeaway` is deliberately undefined in the
   preamble and the reason is written at the foot of that file. The two closing
   thoughts that are real content, "He settled on four." on frame 1 and "This
   morning we could obey three of them. This hour is about the fourth." on frame
   4, are `\footnotesize` body text in ink, left aligned, with no rule above
   them. Frame 4's line sits OUTSIDE the `{\centering ...}` group on purpose: an
   earlier build let `\centering` catch it and it read as a centred punchline.

5. **Frame 2's numerals hang in a zero-width `\makebox`.** An earlier build put
   them in their own `r` column, and beamer's `\onslide` pushed every precept
   about 5pt below its own numeral. The `\hyphenpenalty=10000` on the same line
   is also load bearing: without it "qu'il se pourrait" breaks as "pour-rait"
   in the middle of an `\alert`. Neither is a stylistic flourish; do not
   simplify either one back.

## Overlay pacing, and why the ratio is low

| Frame | Title | Overlay pages | PDF pages |
|---|---|---|---|
| 1 | Descartes, 1637: four rules of method | 1 | 1 |
| 2 | The four precepts | 5 | 2 to 6 |
| 3 | Friday, read against the four precepts | 5 | 7 to 11 |
| 4 | The fourth precept | 2 | 12 to 13 |

Four frames, thirteen pages, a ratio of 3.25. The `lecture-slides` skill
calibrates a teaching deck at 4 to 6 overlay steps per frame and calls a ratio
near 1.0 a symptom of forgetting to animate. **A cold open is calibrated
differently and this one is deliberate.** Its own precedent, the AINIT Faust
opening, is three `[plain]` frames, three clicks and ZERO overlays, a ratio of
exactly 1.0. `../COLD-OPEN-CANDIDATES.md` section 3 predicted 3.7 for this deck
and called that "correct for an opening whose frames are quotations". Frame 1 is
static because it is placement and the placement is spoken over it.

If you add clicks, add them for a reason a room can feel. Do not add them to
move a ratio.

## Verification, and how to re-run it

Every command below was run on 2026-08-26 and its real output is recorded in
`../README.md` under "Verification".

```
pdflatex slides.tex && pdflatex slides.tex     # exit 0 twice
grep -nE '^!|Overfull|Underfull' slides.log    # must print nothing
pdftotext slides.pdf - | grep -cP '\x{2014}'   # em dashes: must be 0
pdftotext slides.pdf - | grep -cP '\x{2013}'   # en dashes: must be 0
grep -nE -- '---|[^-]--[^-]' slides.tex        # every hit must be a LaTeX comment
pdftoppm -png -r 130 slides.pdf /tmp/co        # then READ all 13 PNGs
```

Two checks beyond the standard list, both of which caught a real defect here:

```
# no-shift: a revealed row must not move the rows already on screen.
for pg in 8 9 10 11; do
  pdftoppm -png -singlefile -r 130 -f $pg -l $pg -x 90 -y 100 -W 640 -H 60 \
    slides.pdf /tmp/row1_$pg
done
md5 -q /tmp/row1_8.png /tmp/row1_9.png /tmp/row1_10.png /tmp/row1_11.png
# all four hashes must be identical

# high-DPI read of the terminal overlay of each frame (130 DPI is too coarse to
# see a numeral sitting off its baseline, which is exactly what happened here)
pdftoppm -png -singlefile -r 300 -f 6 -l 6 slides.pdf /tmp/hi6
```

**Rendering and looking is what makes the rest work.** Exit 0 proved nothing
about this deck: the compile was clean while the mapping table ran off the right
edge of the slide, the numerals floated above their text, and frame 3's first
overlay showed four bare arrows pointing at nothing. All three were found by
reading a PNG.

## What NOT to do

- **Do not define `\takeaway`, `\sectionsub` or `\cursub`.** The preamble's
  closing comment says why. Both have re-entered house decks by wholesale
  preamble copying, twice each.
- **Do not add a red/green pair.** The preamble ships Okabe-Ito blue and
  vermillion for `good` and `bad`, and this deck uses neither. Accent blue and
  muted grey are the entire palette.
- **Do not lighten `muted` above `black!55`.** The muted row of the mapping
  table is the payload of the deck and it has to survive a projector.
- **Do not commit a stand-in image** so that frame 1 "looks finished". See
  `img/CLAUDE.md`.
- **Do not put an unpinned quotation on a slide.** Frame 1 carries this deck's
  own prose rather than the sentence that introduces the precepts in the source,
  because that sentence was read in the proposal and never re-pinned. The house
  precedent is that the FDD opening CUT its one unpinned quotation rather than
  project it.
- **Do not restyle the deck into the Modern Editorial theme casually.** It is a
  real option and `../README.md` records exactly what it would cost, but it is
  a decision for Carlos and it changes the eyebrow, the stripe, the footer and
  the frametitle height on every frame.
- **Do not run past page 11 on Friday morning.** Pages 12 and 13 are the 16:00
  frame.

## Maintenance contract

- This file is the working memory for this directory. After any major change
  here, meaning a frame added, cut or reordered, a changed quotation, a changed
  overlay count, a theme change, or a new image dependency, UPDATE THIS FILE AND
  THE FRAME TABLE IN `../README.md` IN THE SAME COMMIT. A CLAUDE.md that
  describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and
  that file must itself carry this same maintenance contract, including this
  propagation rule. When you create a subdirectory, create its CLAUDE.md at the
  same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the
  gotchas that cost someone an hour. Do not restate what the code already says
  plainly.
