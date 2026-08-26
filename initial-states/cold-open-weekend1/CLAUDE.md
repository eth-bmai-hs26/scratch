# CLAUDE.md, cold-open-weekend1

Contract for the next agent working in this directory. Read it before editing anything.

> **Status, 2026-08-26.** Built and verified. The deck compiles twice with plain `pdflatex` with
> exit 0, no LaTeX errors and no overfull or underfull boxes, 13 pages, zero em dashes and zero en
> dashes in the rendered PDF, and all 13 pages were rendered to PNG and read. Three defects were
> found by reading the renders and fixed: the mapping table ran 74pt off the right edge, frame 2's
> numerals sat about 5pt above their own precepts, and frame 3's early overlays showed four bare
> arrows pointing at nothing.
>
> **What is deliberately incomplete.** `slides/img/` is empty, so frame 1 projects a dashed
> placeholder box naming the file it wants. No quotation was re-pinned during the build session; the
> French is trusted from the proposal pass. The English gloss is a working draft awaiting Carlos.
> The 16:00 Hume frame that the menu also recommends is not built, because its muted row depends on
> a passage the proposal records as unread. See "What is unverified" in `README.md`.
>
> **Nothing here has been committed to git by the agent that built it.**

## What this is

| | |
|---|---|
| Artifact | The philosophical cold open for weekend 1. A Beamer deck, four frames |
| Slug | None. This block has no exercise slug and no TAs |
| Lecture moment | Friday 4 September 2026, 08:00, inside "Intro and onboarding", before anything administrative. Plus ONE frame at 16:00, in front of "Vapnik's statistical learning theory" |
| Owner | **Carlos.** This is his opening, and the decisions listed at the foot of `README.md` are his |
| Text | Rene Descartes, *Discours de la methode*, seconde partie (1637), the four precepts |
| Design spec | `COLD-OPEN-CANDIDATES.md` in this directory, a copy of `proposals/COLD-OPEN-CANDIDATES.md`. **Read it in full before changing the pedagogy.** Its section 9 is the recommendation this deck implements |
| Budget | About 3 minutes at 08:00, about 30 seconds at 16:00 |
| House skill | `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md` |
| House precedent | `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/`, the built FDD cold open. `README.md` here is modelled on that directory's README |

The one sentence the deck exists to earn: **the fourth precept is the one rule a learning machine
cannot obey, and every single thing in the 16:00 lecture is what you do instead of obeying it.**

## Layout

```
cold-open-weekend1/
  CLAUDE.md                    this file
  README.md                    the argument, the frame table with a job column, what was cut,
                               the PROVENANCE table, the verification results, the timing,
                               the paste-ready 16:00 frame, and what only Carlos can decide
  COLD-OPEN-CANDIDATES.md      the menu, copied in so it travels with the deck. STILL A MENU
  slides/
    CLAUDE.md                  contract for the deck. The five rules that matter most are there
    .gitignore                 LaTeX aux files and the scratch decks. The PDF is committed
    beamer-preamble.tex        the theme, with the diff against the skill template in its header
    slides.tex                 the four frames
    slides.pdf                 compiled, 13 pages
    img/
      CLAUDE.md                contract for the plate directory
      IMAGE-SOURCES.txt        one block per image: artist, year, licence, URL, traps, status
```

Four directories counting this one, three CLAUDE.md files, one README.

## Build and verify

```
cd slides
pdflatex slides.tex && pdflatex slides.tex     # twice, plain pdflatex, from inside slides/
pdftotext slides.pdf - | grep -cP '\x{2014}'   # must print 0
pdftotext slides.pdf - | grep -cP '\x{2013}'   # must print 0
pdftoppm -png -r 130 slides.pdf /tmp/co        # then READ all 13 PNGs
```

`slides/CLAUDE.md` carries the full verification recipe, including the two extra checks that caught
real defects here: the consecutive-overlay no-shift MD5 comparison, and the 300 DPI read of each
frame's terminal overlay.

## Deliberate departures, each with its reason

1. **No `issue-prompts/` directory.** Every other slug under `initial-states/` ships one, because a
   slug is TA work that fans out. This is Carlos's own three-minute opening, it has one owner, and
   the remaining work is a short list of decisions rather than a set of parallel build tasks. That
   list is "What only Carlos can decide" at the foot of `README.md`, and "What is unverified" just
   above it. Creating an empty `issue-prompts/` would add a directory that describes nothing.

2. **No title frame, and no `\maketitle`.** The deck is pasted in front of the intro and onboarding
   block, which already carries the course title page. The FDD opening opens on a title frame
   because it deliberately reuses the Weekend 1 title photograph and the recognition is part of its
   argument; weekend 1 of a new course has no earlier frame to recognise.

3. **Light Metropolis from the skill template, rather than the Modern Editorial theme the FDD
   opening uses.** The task that produced this build named the skill template. Moving to editorial
   is a live option and it is Carlos's call; it changes the eyebrow, the brand stripe, the footer
   and the frametitle height on every frame, and the editorial frametitle is taller, so every frame
   needs re-rendering after the swap.

4. **The animation ratio is 3.25**, below the skill's 4 to 6 teaching band. A cold open is
   calibrated differently and its own precedent, the AINIT Faust opening, sits at exactly 1.0. See
   `slides/CLAUDE.md`, "Overlay pacing, and why the ratio is low".

5. **Frame 3's mapping table puts the ENGLISH above the French**, which inverts house grammar rule 1
   (original on top, gloss below). That rule governs the quotation frame, and frame 2 obeys it
   exactly. The mapping frame follows the AINIT precedent instead, which puts English first with the
   original in muted italic underneath, because the table has to be readable at a glance by a room
   with no French. `COLD-OPEN-CANDIDATES.md` section 0 records that the FDD menu got this detail
   backwards when it described the AINIT table.

## Anti-collision: what this artifact owns, and what belongs to somebody else

| Idea | Owner |
|---|---|
| The four precepts as the map of Friday, and the muted fourth row | **This deck.** Nothing else in weekend 1 quotes Descartes |
| Heron of Alexandria, *Metrica* I.8, and the averaging update | **`initial-states/hs26-bmai-w1-opt-heron`.** The menu recommends one spoken sentence at the top of the 09:00 lecture and no frame. **Do not put Heron's averaging update on an 08:00 slide**: Carlos's handwritten table withholds it on purpose, and the exercise builds a discovery mechanic around it |
| The genie, `Q = 1 + 1/Q`, and the Robbins-Monro step-size conditions | **`initial-states/hs26-bmai-w1-opt-genie-rm`.** Zeno's halving ladder, if it is ever built, belongs at 11:00 or inside that exercise |
| Training error against test error, *I have found* against *I foresee* | **The 16:00 lecture.** The menu recommends the Hume frame there, after the mute is lifted. It is not built |
| Course branding, dates, rooms, people and the project | **The intro and onboarding deck**, which this one is pasted in front of |

## What NOT to do

- **Do not treat `COLD-OPEN-CANDIDATES.md` as decided.** It is a menu. Section 9 recommends
  Descartes and section 12 lists five things only Carlos can settle, two of which could replace this
  deck entirely.
- **Do not edit one of the four alerted clauses in one place only.** Each appears three times: once
  alerted inside its precept on frame 2, and once as the left-hand cell of frames 3 and 4.
- **Do not define `\takeaway`**, and do not centre or enlarge either of the deck's two closing lines.
- **Do not add a red/green pair anywhere.**
- **Do not put an unpinned quotation on a slide.** The house precedent is that the FDD opening cut
  its one unpinned quotation rather than project it, and this deck did the same on frame 1.
- **Do not download and commit a plate without opening it.** `slides/img/CLAUDE.md` says why.
- **Do not "fix" the empty `img/` directory with a stand-in image.**
- **Do not report the deck as verified without rendering it and looking.** Every defect this build
  found was invisible to a clean compile.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a frame
  added, cut or reordered, a changed quotation, a decision recorded by Carlos, a theme change, a new
  image dependency, or the Hume frame being built, UPDATE THIS FILE IN THE SAME COMMIT, along with
  the frame table and the PROVENANCE table in `README.md`. A CLAUDE.md that describes a layout the
  directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must itself
  carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
