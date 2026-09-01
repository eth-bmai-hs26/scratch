# CLAUDE.md, cold-open-weekend1-popper

Contract for the next agent working in this directory. Read it before editing anything.

> **Status, 2026-08-31.** Built and verified. The deck compiles twice with plain `pdflatex` with
> exit 0, no LaTeX errors and no overfull or underfull boxes, 20 pages, zero em dashes and zero en
> dashes in the rendered PDF. All 20 pages were rendered to PNG and read, five terminal overlays
> were read again at 300 DPI, and the no-shift rule was measured rather than eyeballed. Three
> defects were found by reading the renders and fixed; `slides/CLAUDE.md` lists them.
>
> **What is deliberately incomplete.** `slides/img/` is empty, so all three plate slots project a
> dashed box naming the file they want. The German original on frame 1 could not be found, so that
> slot projects a dashed marker too. Both gaps are visible by design, and `SOURCES.md` says exactly
> what has to happen to close them.
>
> **Nothing here has been committed to git by the agent that built it.**

## What this is

| | |
|---|---|
| Artifact | A second philosophical cold open for weekend 1. A Beamer deck, five frames |
| Slug | None. This block has no exercise slug and no TAs |
| Lecture moment | Friday 4 September 2026, 08:00, inside "Intro and onboarding", before anything administrative. About three minutes for frames 1 to 4 |
| Owner | **Carlos.** This is his opening, and the decisions at the foot of `README.md` are his |
| Texts | Karl Popper, *Conjectures and Refutations* (1963), *Objective Knowledge* (1972) and *The Logic of Scientific Discovery* (1959); A. M. Turing, *Mind* (1950); William Whewell, *Novum Organon Renovatum* (1858) |
| Origin | Built to a slide list Carlos gave on 2026-08-31, after the Popper and Kuhn survey in the same session |
| Budget | About three minutes. Frame 5 is a handout page and is not projected in them |
| House skill | `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md` |
| Sibling | `../cold-open-weekend1/`, the built Descartes deck. **The two are alternatives for the same slot** |

The one sentence the deck exists to earn: **every algorithm on Friday morning is the loop Popper
called science, and Turing and Whewell describe the same loop in the same words.**

## Layout

```
cold-open-weekend1-popper/
  CLAUDE.md                    this file
  README.md                    the argument, the frame table, what the schema slide says,
                               the verification results, what is unverified, the decisions,
                               and the anti-collision table
  SOURCES.md                   provenance for every quotation, the rights table, the
                               misquotation trap and the hook gotchas. The DECK POINTS HERE
                               BY NAME from frame 1, so do not move or rename it
  slides/
    CLAUDE.md                  contract for the deck. The five rules that matter most are there
    .gitignore                 LaTeX aux files and scratch decks. The PDF is committed
    beamer-preamble.tex        the theme, inherited from the sibling deck, plus \origslot
    slides.tex                 the five frames
    slides.pdf                 compiled, 20 pages
    img/
      CLAUDE.md                contract for the plate directory
      IMAGE-SOURCES.txt        one block per plate: author, date, licence, URL, traps, status
```

Three directories counting this one, three CLAUDE.md files, one README, one SOURCES.

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

`slides/CLAUDE.md` carries the two extra checks that caught real defects here: the 300 DPI read of
each frame's terminal overlay, and the measured no-shift comparison on the animated figure.

## Deliberate departures, each with its reason

1. **No `issue-prompts/` directory**, for the same reason the sibling deck has none: this is
   Carlos's own three-minute opening with one owner, and the remaining work is a short list of
   decisions rather than parallel build tasks. That list is at the foot of `README.md`.

2. **No title frame and no `\maketitle`.** The deck is pasted in front of the intro and onboarding
   block, which already carries the course title page.

3. **A references frame, which no other deck in this family has.** Four quoted authors, one of them
   protected in Switzerland until the end of 2064, and two plates with licence conditions. The frame
   is the rights record made visible.

4. **`SOURCES.md` exists as its own file**, where the sibling deck folds provenance into its README.
   Two of this deck's quotation slots are unresolved and the rights picture is more complicated, so
   it earned a file. The deck references it by path from a slide.

5. **One macro was added to the inherited preamble, `\origslot`.** It is the original-language
   analogue of `\plateh`: pass the pinned text and it renders as an ordinary quotation, pass nothing
   and it draws a dashed marker naming the work and the locus still to be checked. The reasoning is
   written at its definition.

6. **Three of the four quotations are English originals**, so the muted line under them is a
   paraphrase rather than a translation, and each source line says which it is. House grammar rule 1
   assumes a foreign original; three of these four have none.

## Anti-collision

See the table at the foot of `README.md`. The one line that matters most: **do not run this deck and
the Descartes deck at 08:00 on the same morning.** They are two answers to the same three minutes,
and both open on a numbered structure mapped onto the day. The second to arrive would feel like the
first one again, which is the same objection the menu records against composing Heron with Descartes.

## What NOT to do

- **Do not fill the `\origslot` marker on frame 1 from a quotation site.** `SOURCES.md` section 2.2.
- **Do not restore the familiar Whewell wording.** The circulating version drops ", with most
  persons," and adds "apparently". The 1858 text has neither.
- **Do not treat the Popper photograph's rights as settled.** "No known copyright restrictions" is
  an institutional statement rather than a licence.
- **Do not shorten the Wellcome credit on frame 4.** CC BY 4.0 makes it a condition.
- **Do not put an unpinned quotation on a slide**, and do not "fix" the empty `img/` directory with
  a stand-in image.
- **Do not define `\takeaway`**, and do not centre or enlarge any line in the deck.
- **Do not add a red/green pair anywhere.**
- **Do not report the deck as verified without rendering it and looking.** Every defect this build
  found was invisible to a clean compile.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a frame
  added, cut or reordered, a changed or newly pinned quotation, a decision recorded by Carlos, a
  theme change, a new image dependency, or a resolution of the Popper photograph question, UPDATE
  THIS FILE IN THE SAME COMMIT, along with the frame table in `README.md` and the tables in
  `SOURCES.md`. A CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
