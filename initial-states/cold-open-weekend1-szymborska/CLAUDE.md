# CLAUDE.md, cold-open-weekend1-szymborska

Contract for the next agent working in this directory. Read it before editing anything.

> **Status, 2026-09-01.** Built and verified. The deck compiles twice with plain `pdflatex` with
> exit 0, no LaTeX errors and no overfull or underfull boxes, 24 pages, zero em dashes, zero en
> dashes and zero double hyphens in the rendered PDF. All 24 pages were rendered to PNG and seven
> of them read, the four of the new frame plus the hand-off, the schema and the rebuilt references
> page; the other 17 are the Popper deck unchanged and were read one by one in its own build. The
> new frame 1 was read again at 300 DPI, its Polish diacritics were confirmed through
> `pdftotext`, and the no-shift rule on it was measured pixel by pixel rather than eyeballed. Three
> defects were found by reading the renders and fixed; `README.md` lists them.
>
> **What this deck is.** It is `../cold-open-weekend1-popper/` with ONE FRAME ADDED AT THE FRONT,
> Wislawa Szymborska's 1996 Nobel lecture. Frames 2 to 6 are that deck apart from their banner
> numbers and three added lines on the references frame, so **a diff between the two directories is
> meaningful. Keep it meaningful.** Change a shared frame in both, or record in the header of
> `slides/slides.tex` why they have been allowed to diverge.
>
> **What is deliberately incomplete.** Three of the four plates are present. `img/popper-lse.jpg` is
> absent, so its slot on frame 2 projects a dashed box, because its rights question is unresolved
> and the choice is Carlos's. The German original on frame 2 could not be found, so that slot
> projects a dashed marker too. Both gaps are visible by design, and `SOURCES.md` says exactly what
> has to happen to close them. **Everything Szymborska is pinned, in both languages.**
>
> **Nothing here has been committed to git by the agent that built it.**

## What this is

| | |
|---|---|
| Artifact | A third philosophical cold open for weekend 1. A Beamer deck, six frames |
| Slug | None. This block has no exercise slug and no TAs |
| Lecture moment | Friday 4 September 2026, 08:00, inside "Intro and onboarding", before anything administrative. About three and a half minutes for frames 1 to 5 |
| Owner | **Carlos.** This is his opening, and the decisions at the foot of `README.md` are his |
| Texts | Wislawa Szymborska, Nobel Lecture "The poet and the world" (1996), in Polish and in the Baranczak and Cavanagh English; Karl Popper, *Conjectures and Refutations* (1963), *Objective Knowledge* (1972) and *The Logic of Scientific Discovery* (1959); A. M. Turing, *Mind* (1950); William Whewell, *Novum Organon Renovatum* (1858) |
| Origin | The Popper deck of 2026-08-31, plus a Szymborska frame added 2026-09-01. Carlos chose Szymborska from four literary candidates, Paz, Tagore, Szymborska and Beckett, all four of them pinned against primary sources first. The other three are recorded at the foot of `README.md` |
| Budget | About three and a half minutes. Frame 6 is a handout page and is not projected in them |
| House skill | `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md` |
| Siblings | `../cold-open-weekend1/`, the Descartes deck, and `../cold-open-weekend1-popper/`, this deck without the poet. **All three are alternatives for the same slot** |

The one sentence the deck exists to earn: **every algorithm on Friday morning is the loop a poet
runs on a poem and the loop Popper called science, and Turing and Whewell describe the same loop in
the same words.**

The twenty seconds the deck is built around: frame 1 ends on Szymborska's "born from a continuous
'I don't know'", and frame 2 opens on Popper's "We do not know: we can only guess". The room hears
the same sentence twice, once from a poet and once from a philosopher, and the second one adds the
guess. **Do not put a frame between them and do not reorder them.**

## Layout

```
cold-open-weekend1-szymborska/
  CLAUDE.md                    this file
  README.md                    the argument, the frame table, what the schema slide says,
                               the verification results, what is unverified, the decisions,
                               and the anti-collision table
  SOURCES.md                   provenance for every quotation, the rights table, the
                               misquotation trap and the hook gotchas. Section 1a is the
                               Szymborska provenance. The DECK POINTS HERE BY NAME from
                               frame 2, so do not move or rename it
  slides/
    CLAUDE.md                  contract for the deck. The five rules that matter most are there
    .gitignore                 LaTeX aux files and scratch decks. The PDF is committed
    beamer-preamble.tex        the theme, inherited from the Descartes deck, plus \origslot
    slides.tex                 the six frames
    slides.pdf                 compiled, 24 pages
    img/
      CLAUDE.md                contract for the plate directory
      IMAGE-SOURCES.txt        one block per plate: author, date, licence, URL, traps, status
      szymborska-kubik.jpg     PRESENT. CC BY 3.0, attribution is a condition
      turing-1951.jpg          PRESENT. Public domain
      whewell-wellcome.jpg     PRESENT. CC BY 4.0, attribution is a condition
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
pdftotext slides.pdf - | grep -cP '\-\-'      # must print 0
pdftoppm -png -r 130 slides.pdf /tmp/szym      # then READ all 24 PNGs
```

`slides/CLAUDE.md` carries the extra checks that caught real defects here: the 300 DPI read of each
frame's terminal overlay, the measured no-shift comparison, and, added for this deck, a `pdftotext`
read of frame 1 to confirm the Polish diacritics survive into the PDF.

## Deliberate departures, each with its reason

1. **No `issue-prompts/` directory**, for the same reason the sibling deck has none: this is
   Carlos's own three-minute opening with one owner, and the remaining work is a short list of
   decisions rather than parallel build tasks. That list is at the foot of `README.md`.

2. **No title frame and no `\maketitle`.** The deck is pasted in front of the intro and onboarding
   block, which already carries the course title page.

3. **A references frame, which the Descartes deck does not have.** Five quoted authors, two of them
   protected in Switzerland until the end of 2064 and 2082, and three plates with licence
   conditions. The frame is the rights record made visible.

4. **`SOURCES.md` exists as its own file**, where the sibling deck folds provenance into its README.
   Two of this deck's quotation slots are unresolved and the rights picture is more complicated, so
   it earned a file. The deck references it by path from a slide.

5. **One macro was added to the inherited preamble, `\origslot`.** It is the original-language
   analogue of `\plateh`: pass the pinned text and it renders as an ordinary quotation, pass nothing
   and it draws a dashed marker naming the work and the locus still to be checked. The reasoning is
   written at its definition.

6. **Three of the five quotation frames carry English originals**, so the muted line under them is a
   paraphrase rather than a translation, and each source line says which it is. House grammar rule 1
   assumes a foreign original, and those three have none. **Frame 1 is the exception and the
   model**: Szymborska delivered the lecture in Polish, nobelprize.org publishes both texts, both
   were pinned, so the Polish is the body and the published English sits under it as a real
   translation.

7. **The plate on frame 1 is 3.6cm where the other three are 4.0cm.** That is a layout decision and
   not a resolution one: the file is 360 x 480, which is still about 340 ppi at 3.6cm, and the frame
   needed the vertical room for two quotations in two languages. Do not upscale the file.

## Anti-collision

See the table at the foot of `README.md`. The one line that matters most: **do not run two of the
three cold opens at 08:00 on the same morning.** They are three answers to the same three minutes,
and the Descartes and Popper decks both open on a numbered structure mapped onto the day. The second
to arrive would feel like the first one again, which is the same objection the menu records against
composing Heron with Descartes.

Second line, specific to this deck: **do not spend the Szymborska passage again at 16:00.** If a
return frame is wanted there, her Ecclesiastes passage is pinned and unused. `SOURCES.md` section 1a
lists it with two others.

## What NOT to do

- **Do not fill the `\origslot` marker on frame 2 from a quotation site.** `SOURCES.md` section 2.2.
- **Do not "correct" the Polish quotation marks on frame 1** to the Polish low-opening form.
  nobelprize.org sets them as English-style curly quotes and the frame reproduces what was pinned.
- **Do not "correct" the number mismatch on frame 1 either.** The Polish is singular and the
  Baranczak and Cavanagh English is plural. That is the translators' choice and the deck carries
  their published wording. `SOURCES.md` section 1a.
- **Do not use `\par` between a quotation and its gloss inside those `\onslide` groups.** It ends
  the paragraph and the `\\[8pt]` that follows the group then fails with "There's no line here to
  end". Use `\\[2pt]`. This deck did it wrong on its first build.
- **Do not restore the familiar Whewell wording.** The circulating version drops ", with most
  persons," and adds "apparently". The 1858 text has neither.
- **Do not treat the Popper photograph's rights as settled.** "No known copyright restrictions" is
  an institutional statement rather than a licence.
- **Do not shorten the Wellcome credit on frame 4.** CC BY 4.0 makes it a condition.
- **Do not put an unpinned quotation on a slide**, and do not "fix" a dashed plate box with a
  stand-in image.
- **Do not shorten the Kubik credit on frame 1.** CC BY 3.0 makes it a condition, the same way
  CC BY 4.0 does for the Wellcome Whewell on frame 5.
- **Do not define `\takeaway`**, and do not centre or enlarge any line in the deck.
- **Do not add a red/green pair anywhere.**
- **Do not report the deck as verified without rendering it and looking.** Every defect this build
  found was invisible to a clean compile.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a frame
  added, cut or reordered, a changed or newly pinned quotation, a decision recorded by Carlos, a
  theme change, a new image dependency, a resolution of the Popper photograph question, or a
  decision on the dash exemption for pinned quotations, UPDATE THIS FILE IN THE SAME COMMIT, along
  with the frame table in `README.md` and the tables in `SOURCES.md`. If the change touches a frame
  this deck shares with `../cold-open-weekend1-popper/`, make it in both or record why not. A CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
