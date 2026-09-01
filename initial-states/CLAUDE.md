# CLAUDE.md, initial-states/

The buildable material for CAS BMAI HS26 weekend 1. One directory per master-schedule slug, each one
a handoff package a TA can pick up cold.

Start at the repository root `CLAUDE.md` for the course, the schedule, the TA assignments and the
house rules.

## How a TA picks up work

1. Find your slug in the schedule table in the root `CLAUDE.md`, or in
   `docs/master-schedule-weekend1.csv`.
2. Go to `initial-states/<slug>/`.
3. **Read that directory's `CLAUDE.md` first.** It is the authority for its own directory and it
   overrides anything said here. It carries the status, the file tree with one line per file, the
   pinned notation, the deliberate departures from house pattern, the verification commands, the
   anti-collision table against the neighbouring exercises, and the open decisions.
4. **Then read `<slug>/issue-prompts/`.** One numbered markdown file per remaining unit of work, each
   written so that one person or one agent can be handed exactly that file, with no context beyond
   the repository, and produce a mergeable result. The `issue-prompts/CLAUDE.md` carries the
   dependency graph, including which issues edit the same file and therefore cannot run in parallel.
5. Read the matching design spec in `proposals/` before changing any pedagogy.
6. Before writing a visualization or a deck, read the relevant house skill in
   `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/`.

The fixed heading order of an issue prompt, from the FS26 convention:

```
# Issue N: Title
## Goal              two to four sentences, what and why
## Dependencies      one bullet per upstream issue, or the word None
## Context           what the agent needs that is not obvious from the tree
## Deliverables      numbered h3 per artifact, specified to zero ambiguity
## File Structure    only the files this issue creates or edits, (updated) marks an edit
## Verification      observable acceptance bullets, the last one a command that must pass
```

`## Implementation Notes` is optional and goes between Deliverables and File Structure.

## What is here, 2026-09-01

| Directory | Session | TAs | Format | State |
|---|---|---|---|---|
| `hs26-bmai-w1-opt-heron` | Fri 10:00, first of three | Jinlei, Daniele, Ivan | Multi-file `course-viz` page, click-step, 6 scenes, vendored KaTeX | **TA-ready initial state.** Scenes 0 and 1 built and verified, 2 to 5 stubbed, notebook pair complete, 8 issue prompts |
| `hs26-bmai-w1-opt-genie-rm` | Fri 10:00, second of three | Jinlei, Suei-Wen | Multi-file `course-viz` page, click-step, 9 scenes, vendored d3 and KaTeX | **TA-ready initial state.** Scenes 0, 1, 2, 3, 6, 7, 8 built and verified, 4 and 5 stubbed, notebook pair generated and run, 8 issue prompts |
| `hs26-bmai-w1-opt-rm-house` | Fri 10:00, third of three | Ghali, Suei-Wen | Colab notebook pair plus helper module, seeded generator, reference implementation | **TA-ready.** Built, run, verified, then independently re-verified by a second agent. 6 issue prompts |
| `cold-open-weekend1` | Fri 08:00 intro block, plus one frame at Fri 16:00 | none, this is Carlos's own | Beamer deck, 4 frames over 13 pages, plain `pdflatex` | **Built and verified.** Compiles clean, every page rendered and read. `slides/img/` is empty on purpose. No `issue-prompts/` |
| `cold-open-weekend1-popper` | Fri 08:00 intro block. **An alternative to the line above, for the same three minutes** | none, this is Carlos's own | Beamer deck, 5 frames over 20 pages, plain `pdflatex` | **Built and verified.** Compiles clean with no bad boxes, all 20 pages rendered and read, no-shift measured. Two of three plates present, one quotation slot is a marker. No `issue-prompts/` |
| `cold-open-weekend1-szymborska` | Fri 08:00 intro block. **A third alternative for the same three minutes** | none, this is Carlos's own | Beamer deck, 6 frames over 24 pages, plain `pdflatex` | **Built and verified 2026-09-01.** The Popper deck with a Wislawa Szymborska frame added at the front. Compiles clean with no bad boxes, 24 pages rendered and 7 read (the new frame plus three checks; the rest are the Popper deck unchanged), frame 1 read at 300 DPI, Polish diacritics confirmed, no-shift measured pixel by pixel. Three of four plates present. No `issue-prompts/` |

Five schedule slugs have no directory here yet: `hs26-bmai-w1-gd-grasshopper` (both briefs),
`hs26-bmai-w1-nn-universal-approx`, `hs26-bmai-w1-nn-pytorch`, `hs26-bmai-w1-validation` and
`hs26-bmai-w1-project`.

Three directories here are not schedule slugs: `cold-open-weekend1`, `cold-open-weekend1-popper`
and `cold-open-weekend1-szymborska`. All three are the philosophical opening of the weekend, they
have no CX slot and no TAs, and they are listed above so that a reader of this table sees everything
the directory holds.

**They are alternatives, not a sequence.** Each fills the same three minutes at Friday 08:00, and
each opens on a numbered structure mapped onto the day, so running both would make the second feel
like the first again. Carlos chooses one. Until he does, both stay.

### `hs26-bmai-w1-opt-heron`, "Squaring the rectangle"

Act 1 of Carlos's handwritten page 1: a rectangle of fixed area 2026, where the verdict is the shape
you are looking at and the update is the visible act of averaging the two sides.

Complete: `CLAUDE.md`, `README.md`, `.gitignore`, `index.html` (the page shell, with the script order
documented in a comment and marked load-bearing), `css/style.css` plus one stylesheet per scene,
`js/theme.js`, `js/katex-helpers.js`, `js/heron.js`, `js/rectview.js`, `js/stub.js`, `js/main.js`
(the click-step scene engine and the hash router, six scenes, zero indexed everywhere),
`js/scenes/scene0.js` through `scene5.js`, `data/datasets.js`, `precompute/build_data.py` with 30
invariant checks, a 1.4 MB vendored KaTeX tree under `vendor/`, `exercise/` (the notebook pair, its
reference and its builder), `issue-prompts/` (eight units of work plus the dependency graph), and
`docs/` (the screenshot recipe, three committed screenshots, `docs/shots/` for the uncommitted batch
and what reading them found). Nine subdirectories, four CLAUDE.md files.

**Scenes 0 and 1 are interactive and verified by screenshot. Scenes 2 to 5 are stubs** that render
their own specification, so opening `#scene=4` hands its owner exactly their work item. Two shared
views the later scenes need, `js/rulerview.js` and `js/loupe.js`, are issue 01.

Its verification chain:

```
python3 precompute/build_data.py       rewrites data/datasets.js, 30 checks, byte identical each run
python3 exercise/reference.py          prints every number the notebook contains, then asserts it
python3 exercise/build_notebooks.py    rewrites both notebooks, asserts the sync rule
sh docs/capture.sh                     18 screenshots, every scene, both themes, two viewports
```

Design spec: `proposals/viz-heron.md`, whose section 11 is the intended file tree and section 14 the
TA-checkable acceptance list. One item from its section 17 was completed during the build: the exact
gap column and the loupe ladder now ship in `data/datasets.js`, computed with `Decimal`, alongside
the double-precision readings they are often confused with.

### `hs26-bmai-w1-opt-genie-rm`, the genie game

Act 2 of the same page, plus page 2 in full: "They must derive the Robbins-Monro algo. See AINIT
slides for details." The genie frees you when you name a positive number its own test accepts,
`Q = 1 + 1/Q`, and the loop the participant invents breaks in two different ways until the step
shrinks, which is Robbins-Monro.

Complete: `CLAUDE.md`, `README.md`, `.gitignore`, `index.html` (script order load-bearing and
commented), `css/` (style.css plus six scene stylesheets, table.css and trace.css), `js/` (theme,
rng, genie, schedules, loop, table, trace, history, katex-helpers, stub, and main.js as the
click-step engine and hash router over nine scenes), `js/scenes/scene0.js` through `scene8.js`,
`data/datasets.js`, `precompute/verify-genie.mjs` with 62 assertions, a 1.7 MB `vendor/` holding
KaTeX and d3, `exercise/` (the Genie environment, the notebook builder and the generated pair),
`issue-prompts/` (eight units of work plus the dependency graph), and `docs/` (the capture script,
the committed table screenshot and what reading the images found). Nine subdirectories, ten
CLAUDE.md files.

**Scenes 0, 1, 2, 3, 6, 7 and 8 are built. Scenes 4 and 5 are stubs** that render their own
specification, so opening `#scene=4` hands its owner exactly their work item. Scene 1 is the live
guess / target / loss table under the AINIT deck's exact three headers, and scene 3 is the two
controls that break the loop.

Its verification chain:

```
node precompute/verify-genie.mjs       62 assertions, then rewrites data/datasets.js byte identically
python3 exercise/genie.py              three sanity checks, and the RNG port matches the browser
python3 exercise/build_notebooks.py    rewrites both notebooks, asserts the sync rule
bash docs/capture.sh light             11 screenshots; run again with dark
```

The Python port of the page's Mulberry32 and Box-Muller pair is asserted at import time against six
draws taken from the running JavaScript, so the notebook and the room see the same storm. Verified
on 2026-08-26: both print the same three spreads, `1.693e-1`, `3.515e-2` and `1.854e-3`.

Design spec: `proposals/viz-genie-robbins-monro.md`, whose section 10 is the intended file tree,
section 14 what only Carlos can settle, and section 16 the fan-out plan.

### `hs26-bmai-w1-opt-rm-house`, the house-price scaffold

The hinge of the weekend: the same guess, check, correct loop now fits a model to data, and the last
act names the result stochastic gradient descent. Twelve fictitious houses in an invented
municipality, generated by a committed script with `SEED = 42`.

Complete, and the worked example for everything else here. It carries `CLAUDE.md`, `README.md`,
`.gitignore`, `requirements.txt`, `housetools.py`, `data/` (generator, CSV, README, CLAUDE.md),
`notebooks/` (student and solutions pair, both generated), `precompute/` (the reference and the
notebook builder), and `issue-prompts/` with six numbered units of work plus its own CLAUDE.md
carrying the dependency graph. Four subdirectories, five CLAUDE.md files.

The one rule that matters most in it: **the two notebooks are generated, so edit
`precompute/build_notebooks.py` and never an `.ipynb`.** A hand edit to a notebook is destroyed
silently the next time the builder runs. This is how the student and solutions sync rule holds by
construction. Its verification chain:

```
python3 data/generate_houses.py        rewrites data/houses.csv, byte identical every time
python3 precompute/reference.py        prints every quoted number, then asserts each one
python3 precompute/build_notebooks.py  rewrites both notebooks, asserts the sync rule
```

Both scripts end on `All assertions passed.` A later independent pass re-ran the whole chain without
trusting the README, confirmed all 47 quoted output lines verbatim, mutation tested the assertions
to prove they fire, and rebuilt both notebooks to their existing MD5.

### `cold-open-weekend1-szymborska`, "Guess, Check, Correct" with a poet in front

**The newest of the three, built 2026-09-01.** It is `cold-open-weekend1-popper` with ONE FRAME
ADDED AT THE FRONT: Wislawa Szymborska's 1996 Nobel lecture "The poet and the world". Frames 2 to 6
are the Popper deck apart from their banner numbers and three added lines on the references frame,
so **a diff between the two directories is meaningful and should stay meaningful.**

Carlos asked for a literary cold open drawn from a Nobel laureate in literature rather than from
philosophy or science, one that shows the guess, the feedback and the correction. Four candidates
were pinned against primary sources first, Octavio Paz's *Piedra de sol*, Rabindranath Tagore's
*Gitanjali* 12, Szymborska's Nobel lecture and Beckett's *Worstward Ho*, and he chose Szymborska.
The other three are recorded with their provenance at the foot of the deck's `README.md`, so any of
them can be built without repeating the research.

**The twenty seconds the deck is built around.** Frame 1 ends on Szymborska's `rodzi sie z
bezustannego "nie wiem"`, born from a continuous "I don't know". Frame 2 opens on Popper's "We do
not know: we can only guess". The room hears the same sentence twice, once from a poet and once
from a philosopher of science, and the second one adds the guess. Do not put a frame between them
and do not reorder them.

**This frame is the best documented in any of the three cold opens.** Szymborska delivered the
lecture in Polish and nobelprize.org publishes the Polish and the Baranczak and Cavanagh English on
the same record, so both were pinned and the deck's "original language above the gloss" rule works
exactly as written for the first time in the family. Everything on the frame is pinned, in both
languages. Its plate is a CC BY 3.0 photograph by Mariusz Kubik, Krakow 2009, downloaded, opened,
inspected, and cross-checked against its Commons record through the EXIF.

Its verification chain, all of it run and recorded in `README.md`:

```
cd slides && pdflatex slides.tex && pdflatex slides.tex   exit 0 twice, no errors, NO bad boxes
pdftotext slides.pdf - | grep -cP '\x{2014}'              0 em dashes in the rendered PDF
pdftotext slides.pdf - | grep -cP '\x{2013}'              0 en dashes in the rendered PDF
pdftotext slides.pdf - | grep -cP '\-\-'                  0 double hyphens in the rendered PDF
pdftoppm -png -r 130 slides.pdf /tmp/szym                 all 24 pages rendered
```

plus a 300 DPI read of frame 1, a `pdftotext` read to confirm the Polish diacritics survive into
the PDF, and a pixel-by-pixel no-shift measurement on frame 1 in which every band changes exactly
once, at its own overlay, and is byte-identical either side. Three defects were found by rendering
and fixed.

**Seven of the 24 pages were read in this build**, the four of the new frame plus the hand-off, the
schema and the rebuilt references page. The other 17 are the Popper deck unchanged and were read
one by one in its own build of 2026-08-31. The deck's `README.md` says exactly which, because a
verification table that overstates what was looked at is worse than one that admits a gap.

Four things to know before touching it. **It inherits every unresolved item from the Popper deck**,
including the unpinned German original and the Popper photograph's rights question, and resolved
none of them. **A new decision appeared with this build**: house rule 4 wants a quotation pinned
character for character and house rule 8 wants a dash-free rendered PDF, and Szymborska's printed
English uses en dashes freely, so one passage worth having is unusable until Carlos settles the
exemption. `SOURCES.md` section 1a states it. **The Kubik credit on frame 1 is a licence condition**
and not a courtesy. And **all three cold opens are still on the earlier light Metropolis** while the
08:00 admin, 09:00 and 11:00 decks were restyled to Paper and Grid the same day, so as things stand
the first thing the room sees on Friday is in a theme nothing else that day uses.

### `cold-open-weekend1-popper`, "Guess, Check, Correct"

The alternative three minute opening for Friday 08:00, built 2026-08-31 to a slide list Carlos
gave: Popper with his portrait and "We do not know: we can only guess", then the tetradic schema
with a diagram, then one frame each for Turing and Whewell, then references. Same house skill, same
inherited preamble as its sibling plus one added macro.

Popper's `P1 TT EE P2` is Friday morning written as a formula: a problem you cannot answer directly,
a guess, an attempt to kill the guess, and a new problem, then round again. Turing says the same
thing about machines that learn in 1950, Whewell says it in 1858 and adds overshooting the mark,
which is what a step size does at 11:00. Where the Descartes deck has to say out loud that its text
argues the opposite way from the weekend, this one does not.

It carries `CLAUDE.md`, `README.md`, `SOURCES.md` and `slides/` with its own `CLAUDE.md`,
`.gitignore`, `beamer-preamble.tex`, `slides.tex`, `slides.pdf` and `img/`. Two subdirectories,
three CLAUDE.md files.

Its verification chain, all of it run and recorded in `README.md`:

```
cd slides && pdflatex slides.tex && pdflatex slides.tex   exit 0 twice, no errors, NO bad boxes
pdftotext slides.pdf - | grep -cP '\x{2014}'              0 em dashes in the rendered PDF
pdftotext slides.pdf - | grep -cP '\x{2013}'              0 en dashes in the rendered PDF
pdftoppm -png -r 130 slides.pdf /tmp/pop                  all 20 pages rendered AND read
```

plus a 300 DPI read of each frame's terminal overlay and a measured no-shift check on the animated
figure. Three defects were found by rendering and fixed.

Four things to know before touching it. **`SOURCES.md` is not decoration**: two of its quotation
slots are unresolved, and the deck points at that file by path from a slide. **The German original
of the frame 1 sentence could not be found**, so that slot draws a dashed marker via the added
`\origslot` macro; do not fill it from a quotation site. **The Popper photograph has a real rights
question** that nobody has settled, since Popper is protected in Switzerland until the end of 2064
and the Commons record carries only an institutional "no known copyright restrictions" statement.
And **`slides/img/` is empty on purpose**, like its sibling.

### `cold-open-weekend1`, "The Four Precepts"

The three minute philosophical opening for Friday 08:00, plus one frame at 16:00. A Beamer deck
rather than a visualization or a notebook, because the house precedent
(`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/`) is a deck and the
cold open has to live in the lecture deck. Built against
`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md`.

Descartes' four precepts map onto Friday's four lectures, the fourth is muted because it is the one
rule a learning machine cannot obey, and the mute is lifted at 16:00 in front of the statistical
learning theory lecture. That is the Kant recycling move performed inside one day, which is the only
version of it a first weekend can perform.

It carries `CLAUDE.md`, `README.md`, `COLD-OPEN-CANDIDATES.md` (the menu, copied in so it travels
with the deck, with a NOT DECIDED note at the top), and `slides/` with its own `CLAUDE.md`,
`.gitignore`, `beamer-preamble.tex`, `slides.tex`, `slides.pdf` and `img/`. Two subdirectories,
three CLAUDE.md files.

Its verification chain, all of it run and recorded in `README.md`:

```
cd slides && pdflatex slides.tex && pdflatex slides.tex   exit 0 twice, no errors, no bad boxes
pdftotext slides.pdf - | grep -cP '\x{2014}'              0 em dashes in the rendered PDF
pdftotext slides.pdf - | grep -cP '\x{2013}'              0 en dashes in the rendered PDF
pdftoppm -png -r 130 slides.pdf /tmp/co                   all 13 pages rendered AND read
```

Two things to know before touching it. **The menu is still a menu**: section 12 of
`COLD-OPEN-CANDIDATES.md` lists five decisions only Carlos can make, two of which would replace the
deck outright. And **`slides/img/` is empty on purpose**: no image was downloaded, and the deck
draws a dashed box naming the missing plate so the gap is visible rather than silent.

It ships no `issue-prompts/`, and that departure is argued in its own `CLAUDE.md`: it has one owner
and its remaining work is a list of decisions rather than parallel build tasks.

## Where the two viz slugs disagree with each other

`hs26-bmai-w1-opt-heron` documents `css/`, `data/`, `js/`, `js/scenes/`, `precompute/` and `vendor/`
through the annotated tree in its own `CLAUDE.md` plus a header comment in each file, and says so in
writing under its file tree. `hs26-bmai-w1-opt-genie-rm` gives each of those directories its own
`CLAUDE.md` instead. Both readings of the propagation rule are defensible, the root `CLAUDE.md`
sanctions the heron exception for the interior of a `course-viz` page, and neither slug should be
converted to the other shape without a reason better than tidiness. Whichever a new viz picks, it
states the choice in its own `CLAUDE.md`.

## What a TA-ready initial state has to contain

The FS26 definition, verified against `git_bmai_fs26_cx/adversarial_attacks/` and the
`coding-exercises` tree, and recorded in `docs/summaries/03` section 11. Reproduce all seven per
slug:

1. `CLAUDE.md` in the slug directory: what this is, the file tree one line per file, the design
   tokens or the mathematical conventions, the dependency graph between issues, the commands, and an
   explicit list of what not to do. That last section is what stops the next agent from
   re-litigating settled decisions.
2. `README.md` for humans: what it is, how to run it, keyboard shortcuts if it is interactive, and a
   done versus not-done statement.
3. `issue-prompts/` with one numbered file per unit of work, sized so a whole tier runs in parallel.
4. The dependency graph written down once, as ASCII tiers.
5. A seeded generator for any data, committed, with the data declared fictitious on its face.
6. For a notebook exercise, the student and solutions pair, same cells, differing only in the task
   bodies.
7. A verification story: for a notebook the sanity-check cell plus the builder assertions; for a
   visualization the per-issue Verification bullets plus a final integration issue.

FS26 ships no TA-facing instruction document anywhere in its tree. Weekend 1 treats that as a gap to
fill rather than a pattern to copy, which is why `hs26-bmai-w1-opt-rm-house` issue 01 is a printed TA
card, and heron and the genie carry one too.

## Layout conventions

A visualization slug follows the `course-viz` mandatory layout. It must open straight from `file://`
with no build step, no `fetch`, no CDN and no ES-module imports, with libraries vendored under
`vendor/`, light theme by default, dark on the `t` key, and hash-based scene routing so a TA can jump
straight to a scene.

```
<viz_slug>/
  index.html          the only HTML file. Script order is load-bearing
  css/                style.css plus one stylesheet per scene
  js/                 theme.js, the shared modules, main.js (engine and hash router)
  js/scenes/          sceneN.js, each one registering itself on window.scenes
  data/datasets.js    sets window.DATA. Loaded by <script src>, never fetched
  precompute/         the generator or verifier. Never loaded at runtime
  vendor/             d3, KaTeX and their fonts. No CDN anywhere
  docs/               design notes for this slug
  exercise/           the paired participant-facing task, if the slug has one
  issue-prompts/      one numbered file per unit of work
  CLAUDE.md, README.md, .gitignore
```

A notebook slug follows the FS26 shape: `README.md`, `requirements.txt`, a helper module or small
package the participant never edits, `notebooks/` with the student and solutions pair, `data/` with
the seeded generator beside its output, `precompute/` with the reference and the builder, and
`issue-prompts/`.

Each slug ships its own `.gitignore` covering its own artefacts (`__pycache__/`, the uncommitted
screenshot batch, `.ipynb_checkpoints/`). There is no `.gitignore` at the repository root, so a new
slug that skips this leaks build artefacts into the first `git add` that touches it.

## Standing cautions for every slug in the 10:00 block

1. **Notation is shared.** `alpha` is the step size and `eps` is the stopping tolerance. The 11:00
   lecture spends `eps` a third time on the width of a finite-difference window, so no exercise may
   use `eps` for a step size. The root `CLAUDE.md` has the full table.
2. **The sign conventions collide.** The genie writes `loss = Q - target` with
   `Q := Q - alpha * loss`; the deck and the house exercise write `l = y - y_hat` with
   `w := w + alpha * l`. Both move the estimate toward the target. Either normalise them, or say the
   flip out loud in both, which is what the house exercise currently does.
3. **The three `opt-` exercises are the same widget three times**: a guess, a computed target, a
   verdict, an update, repeated in a table. Building that widget once is Carlos's own handwritten
   TODO, "Come up with a scaffold of games and guide them", and `docs/summaries/05` section 4.1 calls
   it the highest-leverage decision of the weekend. It has not been done, and all three slugs shipped
   with their own private loop shape. If somebody builds it, the three folders adopt it and drop
   theirs.
4. **The block may run thirty minutes rather than an hour.** The sheet reads 10:00 CX and 10:30
   coffee for three exercises. Every proposal flags this and none can settle it. Each slug should
   know its minimum viable path.
5. **Never fabricate a number.** Every value quoted in a README, a notebook markdown cell or an issue
   prompt must be real output of a runnable reference file in that slug's `precompute/`.
6. **ASCII punctuation only**, in code and prose alike, including inside generated notebooks. The
   guard inside a builder script has to be written so it does not contain the characters it forbids;
   `hs26-bmai-w1-opt-rm-house` lost time to exactly that and records the fix.

## Creating a new slug directory

1. Name it exactly as the master schedule names it. The slug is the shared identifier across the
   spreadsheet, this directory and the TA assignments.
2. Create its `CLAUDE.md` in the same commit as the directory, carrying the maintenance contract
   below including the propagation rule.
3. Copy the shell rather than inventing one. For a visualization, the sanctioned start is
   `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/css/style.css` and `js/theme.js` with
   the localStorage key changed; `docs/summaries/06` section 0 is the fork decision table. The two
   built viz slugs here are closer starting points still.
4. Write the anti-collision table early: which ideas this exercise owns, and which belong to the
   exercise before or after it in the same block.
5. Add the slug to the table in this file and to the schedule table in the root `CLAUDE.md`.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a new
  exercise or visualization, a slug moving from scaffold to TA-ready, a renamed or moved directory, a
  changed build or run procedure, a changed data format, or a change in who owns the work, UPDATE
  THIS FILE IN THE SAME COMMIT. A CLAUDE.md that describes a layout the directory no longer has is
  worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time. The interior of a `course-viz` page may take
  the documented exception described above, and a slug that takes it says so in its own `CLAUDE.md`.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
