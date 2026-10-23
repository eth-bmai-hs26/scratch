# CLAUDE.md, eth-bmai-hs26/scratch

The front door for CAS BMAI HS26, weekend 1. Read this before touching anything here.

## What this is

| | |
|---|---|
| Course | CAS "Building ML/AI Applications" (BMAI), ETH Zurich |
| Iteration | HS26, the autumn 2026 run. GitHub org `eth-bmai-hs26` |
| Weekend | Weekend 1, Friday 4 and Saturday 5 September 2026. Theme: Vapnik's statistical learning theory |
| Audience | Working professionals and managers. Little formal mathematics. Nothing may assume calculus, and every abstraction needs a concrete anchor before it is named |
| Lecturer | Carlos Cotrini |
| Repository | https://github.com/eth-bmai-hs26/scratch |
| Local clone | /Users/carloscotrini/Documents/git_bmai/2026hs/scratch |
| Role | The shared drop point for the whole weekend-1 effort |

Three rows of the master schedule send TAs here by URL, which is why this file exists:

- `hs26-bmai-w1-opt-genie-rm`: "See AINIT slides for RL here: https://github.com/eth-bmai-hs26/scratch"
- `hs26-bmai-w1-opt-rm-house`: "See BMAI slides on SLT here: https://github.com/eth-bmai-hs26/scratch"
- `hs26-bmai-w1-gd-grasshopper`, second brief: "See handwritten notes and moonlander games here: https://github.com/eth-bmai-hs26/scratch"

A TA arriving from the spreadsheet lands at the repository root with no other context. Everything
below is written for that person.

## Status, 2026-08-31

- Committed (`a674fd7`, the only commit): the nine source files at the repository root.
- Untracked working state: `CLAUDE.md`, `docs/`, `proposals/`, `initial-states/`. Nothing in them
  has been committed yet.
- Eight exercise slugs sit on the schedule, across nine rows, because the grasshopper slug carries
  two briefs. Three of the eight have a TA-ready initial state (`hs26-bmai-w1-opt-heron`,
  `hs26-bmai-w1-opt-genie-rm`, `hs26-bmai-w1-opt-rm-house`). The remaining five have neither a
  proposal nor a directory. For the grasshopper pair, `docs/summaries/06` section 5 already holds
  most of what a proposal would say.
- Two further built directories, `initial-states/cold-open-weekend1/` and
  `initial-states/cold-open-weekend1-popper/`, are not schedule slugs. Both are the Friday 08:00
  philosophical opening and both belong to Carlos. **They are two alternatives for the same three
  minutes**, one anchored on Descartes' four precepts and one on Popper's tetradic schema with
  Turing and Whewell as corroborating witnesses. Carlos picks one; until then both stay.
- There is no root `.gitignore`. `proposals/__pycache__/` is therefore not ignored by anything;
  delete it before staging that directory. The three slug directories each carry their own
  `.gitignore` and handle their own build artefacts.
- No `.github/` workflow and no publishing site. Nothing here is deployed anywhere.

## Weekend 1, session by session

The master spreadsheet is the authority. The tables below are a reading of its weekend-1 tab, taken
on 2026-08-26 and mirrored at `docs/master-schedule-weekend1.csv`.

Spreadsheet:
https://docs.google.com/spreadsheets/d/1mj_x2bMAsewSArA8nGNBlYWBLNXVQk8H3dCGei4aMA0/edit?gid=502536148

Teaching plan (Overleaf, linked from the same sheet):
https://www.overleaf.com/6246534572rhwckvrwdzgz#c494bd

### Friday 4 September

| Time | Session | Slug | TAs |
|---|---|---|---|
| 08:00 | Intro and onboarding | (cold open, no slug) | Carlos |
| 09:00 | First-order approximation algorithms (lecture) | | |
| 10:00 | CX: First-order optimization algorithms | `hs26-bmai-w1-opt-heron` "Heron's algorithm" | Jinlei, Daniele, Ivan |
| | | `hs26-bmai-w1-opt-genie-rm` "Genie game and Robbins-Monro" | Jinlei, Suei-Wen |
| | | `hs26-bmai-w1-opt-rm-house` "Robbins-Monro scaffold for house-price prediction" | Ghali, Suei-Wen |
| 10:30 | Coffee break at Polysnack | | |
| 11:00 | Gradient descent (lecture) | | |
| 12:00 | CX gradient descent | `hs26-bmai-w1-gd-grasshopper` "Grasshopper game" | Christina, Suei-Wen, Ivan |
| | | `hs26-bmai-w1-gd-grasshopper` "Moonlander games as grasshopper games, extending these games with the new ideas" | Sanziana, Suei-Wen |
| 13:00 | Lunch break at Dozentenfoyer | | |
| 14:00 | Neural networks and universal approximation (lecture) | | |
| 14:30 | CX: Neural networks | `hs26-bmai-w1-nn-universal-approx` | Joel, Suei-Wen, Mattia |
| 15:30 | Coffee break at Polysnack | | |
| 16:00 | Vapnik's statistical learning theory (lecture) | no CX slot | |

### Saturday 5 September

| Time | Session | Slug | TAs |
|---|---|---|---|
| 08:00 | Training neural networks with PyTorch (lecture) | | |
| 09:00 | CX Neural networks with PyTorch | `hs26-bmai-w1-nn-pytorch` | Christina, Daniele, Mattia |
| 10:00 | Coffee break at Cafebar | | |
| 10:30 | Validation and overfitting (lecture) | | |
| 11:00 | CX Validation and overfitting | `hs26-bmai-w1-validation` | Sanziana, Ivan, Ghali |
| 12:00 | Project intro: LLM routing | `hs26-bmai-w1-project` | Christina, Suei-Wen, Elisej, Joel |

### Briefs and reference links carried on the schedule rows

| Slug | What the sheet says |
|---|---|
| `hs26-bmai-w1-opt-rm-house` | "Fit a model y = wx + b on a fictitious toy dataset of house measurements {(x1,y1),(x2,y2),...(xn,yn)}" |
| `hs26-bmai-w1-gd-grasshopper` (first brief) | https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html |
| `hs26-bmai-w1-nn-universal-approx` | "Implementation of a forward pass. Visualizations of how NNs are universal approximators. Visualizations of how GD trains NNs." Reference: https://sml-fs26.github.io/neuralnetworks/ |
| `hs26-bmai-w1-nn-pytorch` | https://github.com/eth-bmai-fs26/coding-exercises/blob/week1/cx_minimal_nn/notebooks/iris_nn.ipynb and https://github.com/eth-bmai-fs26/coding-exercises/tree/week1/cx3-intro-to-nns |
| `hs26-bmai-w1-validation` | "Detecting overfitting with a validation test set. Cross-validation with neural networks in Pytorch. Equipping loss functions with regularization." Reference: https://sml-fs26.github.io/un-regression-validation/ , with the note "I'll show an improved version of this in the lecture" |

**Timing conflict, unresolved.** The sheet puts the CX block at 10:00 and the coffee break at
10:30, which gives thirty minutes for three exercises. Several proposals were written against a
one-hour reading. Every proposal flags this. Only Carlos can settle it, and it is the single input
that most changes what gets built.

**How to re-read the sheet.** It holds all four weekends side by side: weekend 1 is column B with
its slugs in column C. The TA names are not on the timetable rows. From about line 40 the same
sheet carries one stanza per exercise, giving the slug, the brief, the reference URLs and then the
TA names one per line with no header. `docs/CLAUDE.md` says this again where the CSV lives.

## What is in this repository

```
CLAUDE.md                     this file
<nine source files>           the PDFs, the four handwritten JPGs, the lander page
docs/                         the read-only reference layer. Schedule mirror, PDF extracts, summaries
proposals/                    one design spec per exercise, plus runnable reference implementations
initial-states/               the buildable material, one directory per slug
```

### Root, the source material (committed)

| File | What it is |
|---|---|
| `bmai_w1_sml_annotated (1).pdf` | 60 pages. Carlos's annotated BMAI week-1 SLT deck. Printed slides plus handwritten pages 27 to 46 and 49 to 51. The house-price worked example lives on handwritten pages 28 to 34. Footer date 19.02.2026, so this is the FS26 deck carried into HS26 |
| `bmai_w1_robbins_monro_gradient_descent (1).pdf` | 1 page, hand diagram. The whole weekend on one sheet: the scientific method mapped onto observe, hypothesize, loss, model, training algorithm, predict and validate |
| `ainit_rl-slides.pdf` | 191 pages, the AINIT reinforcement-learning deck. Source of the genie game, "Learning a number in the dark: Robbins-Monro" |
| `ainit_annotated_rl_slides (1).pdf` | 205 pages, the annotated version of the same deck |
| `bmai_w1_notes_first_order_optimization_p1.jpg` | Handwritten plan page 1. Title "First-order optimization". Act 1 Heron's algorithm: a box of area 2026, `theta = sqrt(2026)`, and the five-column table `theta`, `theta^2`, `2026 - theta^2`, verdict, update, with `theta = 45` as the only filled row. Act 2 the genie game, `theta = 1 + 1/theta`. At the foot, underlined: "TODO: Come up with a scaffold of games & guide them" |
| `bmai_w1_notes_first_order_optimization_p2.jpg` | Handwritten plan page 2, in full: "They must derive the Robbins-Monro algo. See AINIT slides for details." |
| `bmai_w1_notes_gradient_descent_stages_p1.jpg` | Handwritten plan page 3. "Gradient descent", stages 1 to 3: compute the finite-difference gradient for `w` in R, understand it as the limit as `eps` goes to zero, implement gradient descent |
| `bmai_w1_notes_gradient_descent_stages_p2.jpg` | Handwritten plan page 4. Stages 4 and 5: the finite-difference gradient in R^d, and the per-coordinate decomposition, "Each grasshopper only needs to work on its own dimension" |
| `Minimum Lander Exploration.html` | 1154 lines, 74 KB, single file. Carlos's own gradient-descent game: 7 missions, manual landing, navigating the fog, the mathematics of slope, the precision limit, engaging autopilot, the 2D world, the trap. Its mission 3 and 4 table headers are literally the deck's page 38, `eps`, `a = f(l)`, `b = f(r)`, `b - a`, `(b - a)/eps`. **It is single-file and the `course-viz` skill mandates a multi-file layout. Resolving that is part of the `gd-grasshopper` work, and papering over it is not an option.** `docs/summaries/05` and `06` both dissect it |

The handwritten JPGs are the spine of the Friday morning. Read them as images. Their OCR is
worthless and the circulating transcription of them contains ten errors, all listed in
`docs/summaries/04-bmai-w1-slt-deck-and-lesson-plan.md` section 6.

### `docs/`

The read-only reference layer: the schedule mirror, `pdftotext -layout` extracts of the four PDFs,
and seven long summaries (`00` to `06`, 7473 lines) written during the review phase that read the
primary sources in full. `docs/CLAUDE.md` has the detail. Read the summaries before designing
anything: they are what stops the same source being re-read from scratch.

### `proposals/`

One design spec per exercise, plus one runnable reference implementation per spec, plus the
cold-open menu. There are now **two** cold-open menus for the same Friday 08:00 slot,
`COLD-OPEN-CANDIDATES.md` (philosophical, built twice) and `COLD-OPEN-FUNNY-CANDIDATES.md` (comic,
written 2026-09-01, nothing built, seven of its eight candidates need nothing built), plus
`LECTURE-DEMOS-MENTALISM.md`, which is a different thing again: eight stage demos for **inside** the
09:00 and 11:00 lectures, in the form of a mind-reading act whose method is the lecture. Every act is
a question-and-answer loop, which is the property Carlos insisted on after a first draft offered
self-working card principles instead; those four are kept in the menu with the reason they went.
**None of the eight needs sleight of hand.** Its centrepiece, act 7, runs bisection and
Robbins-Monro against the same lying spectator and reports honestly that majority voting beats both
at equal cost, which is what forces the real answer: you never get to ask the same question twice.
Its act 3 is already specified as the two stub scenes of `hs26-bmai-w1-opt-genie-rm`, and every
number in it is output of `lecture-demos-mentalism-reference.py`, which takes a couple of minutes to
run. Nothing in a proposal is decided; each ends on a section listing what only Carlos can settle. All four exercise proposals have now been built, and the built version binds where the two
disagree. `proposals/CLAUDE.md` has the detail.

### `initial-states/`

The buildable material, one directory per schedule slug. One line each, as of 2026-08-31:

| Directory | Format | State |
|---|---|---|
| `hs26-bmai-w1-opt-heron` | Multi-file `course-viz` page, click-step, 6 scenes, vendored KaTeX, plus a Colab notebook pair | **TA-ready initial state.** Scenes 0 and 1 interactive and verified by screenshot, scenes 2 to 5 stubs that render their own specification. 8 issue prompts |
| `hs26-bmai-w1-opt-genie-rm` | Multi-file `course-viz` page, click-step, 9 scenes, vendored d3 and KaTeX, plus a Colab notebook pair | **TA-ready initial state.** Scenes 0, 1, 2, 3, 6, 7, 8 built and verified, scenes 4 and 5 stubs. 62 assertions in the rigor gate. 8 issue prompts |
| `hs26-bmai-w1-opt-rm-house` | Colab notebook pair plus helper module, seeded generator and reference implementation | **TA-ready.** Built, run, verified, then independently re-verified by a second agent. 6 issue prompts |
| `cold-open-weekend1` | Beamer deck, 4 frames over 13 pages, plain `pdflatex` | **Built and verified.** Not a schedule slug: the Friday 08:00 opening, Carlos's own. `slides/img/` is empty on purpose and the deck draws a dashed placeholder box naming the plate it wants |
| `cold-open-weekend1-popper` | Beamer deck, 5 frames over 20 pages, plain `pdflatex` | **Built and verified**, no bad boxes, all 20 pages read, no-shift measured. Not a schedule slug: **the alternative Friday 08:00 opening**, on Popper, Turing and Whewell. `slides/img/` is empty, one quotation slot is a marker, and `SOURCES.md` carries the provenance and an unresolved rights question on the Popper photograph |

The per-slug `CLAUDE.md` is the authority for its own directory and overrides the line above.
`initial-states/CLAUDE.md` has the pickup procedure and the standing cautions for the 10:00 block.

Five schedule slugs have no directory yet: `hs26-bmai-w1-gd-grasshopper` (both briefs),
`hs26-bmai-w1-nn-universal-approx`, `hs26-bmai-w1-nn-pytorch`, `hs26-bmai-w1-validation` and
`hs26-bmai-w1-project`.

## The four sibling course families

All are cloned locally. Read across them before inventing anything: the unbuilt slugs start from
zero code, and several of them have a working relative in another family that should be forked
rather than rewritten.

| Family | What it is | Org | Local clones |
|---|---|---|---|
| **eth-bmai-hs26** | This iteration. This repository | https://github.com/eth-bmai-hs26 | /Users/carloscotrini/Documents/git_bmai/2026hs/scratch |
| **eth-ainit-fs26** | Sibling course "AI in Industry" (AINIT). Home of the genie game and of a two-pattern visualization arcade | https://github.com/eth-ainit-fs26 | /Users/carloscotrini/Documents/git_ainit/rl-arcade , /Users/carloscotrini/Documents/git_ainit/exercises , /Users/carloscotrini/Documents/git_ainit/exercises-ainit , /Users/carloscotrini/Documents/git_ainit/2026_internal |
| **eth-bmai-fs26** | The previous BMAI iteration, spring FS26. Source of the notebook conventions, the student and solutions sync rule, and the issue-prompt format | https://github.com/eth-bmai-fs26 | /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises , .../adversarial_attacks , .../viz_basic_manifold , .../visualization_manifolds , .../stable_diffusion_carlos , .../vae_sunrises , .../lecture_notes_week4 |
| **eth-fdd-fs26** | Sibling workshop "From Data to Decisions" (FDD), weekends W0 to W7. **Carries the written house method.** Home of the grasshopper game and of the cold-open grammar | https://github.com/eth-fdd-fs26 | /Users/carloscotrini/Documents/git_fdd/projects , /Users/carloscotrini/Documents/git_fdd/FDD-Page |
| gitlab bmai/cx/2026fs | The FS26 coding-exercise GitLab repository | https://gitlab.ethz.ch/bmai/cx/2026fs | /Users/carloscotrini/Documents/git_bmai/2026fs |

Live sites worth knowing:
https://eth-fdd-fs26.github.io/FDD-Page/grasshopper/index.html
https://eth-ainit-fs26.github.io/rl-arcade/
https://sml-fs26.github.io/neuralnetworks/
https://sml-fs26.github.io/un-regression-validation/

## The house skills. READ THEM BEFORE YOU BUILD ANYTHING

The written standard lives in the FDD repository, at

    /Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/

| Skill | Path | Binding on |
|---|---|---|
| `course-viz` | `.../.claude/skills/course-viz/SKILL.md` , 629 lines | **Every** new visualization |
| `lecture-slides` | `.../.claude/skills/lecture-slides/SKILL.md` , 579 lines | **Every** beamer deck |
| `lecture-notes` | `.../.claude/skills/lecture-notes/SKILL.md` , 309 lines | Written lecture notes |

These are files on disk. They are not skills installed in any session, so no tool will surface
them. Open them and read them.

Any new visualization or deck built for this weekend must follow them. `course-viz` fixes the
mandatory directory layout, the `file://` hard requirement, the editorial palette down to the hex
values, the choice between scrollytelling and click-step, the scene engine and its registration
contract, hash-based scene routing, the `&run` flag, the KaTeX conventions, the verification
checklist and a long list of things never to do. `lecture-slides` fixes the light projection-first
theme, the Modern Editorial system, the rule against a closing punchline, the ban on red and green
as an accessibility measure, and the dash rule checked on the rendered PDF.

`docs/summaries/00-fdd-house-method-and-skills.md` is a 2578-line faithful extraction of all three,
written so an agent can work from it without opening the originals. Use it as the index. Where a
rule's exact wording matters, go to the source file.

Two further FDD documents govern any philosophical cold open. Do not improvise one:

    /Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md
    /Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/README.md

The grammar in them is numbered: original language on top with an English gloss under it and a
muted source line; one public domain plate, framed, captioned in one line; a frame ends on its
final reveal, with no centred closing line in the brand colour; a mapping table if the text carries
a list, occupying a whole frame with no prose; no candidate that needs plot summary; rights checked
per item, because the original is usually public domain while the translation usually is not
(Switzerland is 70 years post mortem auctoris); and dry, factual frame titles. Quotations get pinned
character for character against a primary scan and recorded in a provenance table. The weekend-1
answer to that menu is `proposals/COLD-OPEN-CANDIDATES.md`, built as
`initial-states/cold-open-weekend1/`. A second opening, `initial-states/cold-open-weekend1-popper/`,
was built on 2026-08-31 from a candidate the menu never considered: it has no entry in
`COLD-OPEN-CANDIDATES.md`, and its own `SOURCES.md` is the provenance record for it.

## House style, binding

1. **Visualizations are browser-only with no build step.** They must work opened straight from
   `file://` on a lecturer's laptop with no network. No `fetch`, no CDN, no ES-module imports.
   Libraries are vendored under `vendor/`. Light and dark themes, light by default, with the `t`
   keyboard shortcut.
2. **ASCII punctuation only in authored prose.** No em dash, no en dash, and never a double hyphen
   used as a dash. Write with commas, colons and full stops. This is enforced by a machine hook,
   see below.
3. **Every directory that holds work of its own carries its own CLAUDE.md**, and that file carries
   the maintenance contract at the foot of this one, including the propagation rule. The one
   sanctioned exception is the interior of a `course-viz` page: `css/`, `js/`, `js/scenes/`,
   `data/`, `precompute/` and `vendor/` may be documented by the annotated tree in the slug's own
   `CLAUDE.md` rather than by nested files. Where a slug takes that exception it says so in writing,
   as `hs26-bmai-w1-opt-heron` does.
4. **Coding exercises are Google Colab notebooks**, shipped as a student version and a solutions
   version kept in sync, with TODO stubs the participant fills in. The FS26 convention is documented
   in `docs/summaries/03-bmai-fs26-coding-exercise-and-viz-conventions.md`. The strongest available
   mechanism is to generate both notebooks from one builder script and assert that only the task
   cells differ, which is what all three `opt-` slugs do. **Edit the builder, never the `.ipynb`.**
5. **Never fabricate data or numbers.** A synthetic stand-in presented as real is fabrication. A toy
   dataset must be declared synthetic on its face, generated by a committed script with a pinned
   seed, and shipped with that script. Every number quoted in prose must be real output of a
   runnable reference file.
6. **Voice.** The audience is managers. Anchor before you abstract, and name the mathematics only
   after the room has felt it. `docs/summaries/02` section 4 records the register with five verbatim
   examples.

## The two write hooks, and the hour they will cost you

Both are global user hooks in `/Users/carloscotrini/.claude/settings.json`, matched on
`Write|Edit|MultiEdit`, so they apply in this repository exactly as they apply in FDD.

- `no-em-dashes.pl` guards the rendered document and branches on file type. In a markdown file it
  blocks raw Unicode dash bytes, the HTML dash entities, and a whitespace-flanked run of two or more
  hyphens **anywhere in the file, code fences included**. A bare markdown thematic break stays
  exempt. In LaTeX a triple-hyphen run is a hard block and a double-hyphen run is a soft warning.
  Consequence: `--headless` is safe because the detector needs whitespace on both sides. A shell
  end-of-options separator standing alone between spaces is blocked, so write `grep -e PATTERN`.
- `no-ai-tells.pl` blocks contrastive negation in prose files. The three hard-blocked shapes, in a
  fence because writing them in prose trips the hook:

  ```text
  1. a copula plus a sentence-final ", not <phrase>" tail
  2. "is not <phrase>, but <phrase>"
  3. "isn't <phrase>, it's <phrase>"
  ```

  Code regions inside prose files are stripped before the check, so a quoted snippet cannot trip it.
  When restating a house rule in your own prose, rephrase it or put it in a fence.

`docs/summaries/00-fdd-house-method-and-skills.md` section 1 has both in full.

## How a TA picks up work

1. Find your slug in the schedule table above.
2. Go to `initial-states/<slug>/`.
3. Read that directory's `CLAUDE.md` first. It carries the status, the layout with one line per
   file, the pinned notation, the deliberate departures from house pattern, the verification
   commands and the open decisions.
4. Then read `initial-states/<slug>/issue-prompts/`. Each numbered file is one self-contained unit
   of work, written so that one agent or one person can be handed exactly one of them and produce a
   mergeable result. The heading order is fixed: Goal, Dependencies, Context, Deliverables, optional
   Implementation Notes, File Structure, Verification. Every issue ends on a command that must pass.
   The issue-prompts `CLAUDE.md` carries the dependency graph, including which issues touch the same
   file and therefore cannot run in parallel.
5. Read the matching design spec in `proposals/` before changing any pedagogy.
6. Before writing a visualization or a deck, read the relevant house skill in
   `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/`.

If your slug has no directory under `initial-states/` yet, it has not been scaffolded. Start from
its proposal if one exists, from `docs/summaries/` if not, and create the directory together with
its `CLAUDE.md`.

## Notation, pinned across the Friday morning

Taken from the annotated deck, handwritten pages 28 to 34. All three `opt-` exercises use these
words, and `docs/summaries/04` section 2 gives the source page for each.

| Symbol | Meaning |
|---|---|
| `x`, `y` | the feature (living area) and the target (asking price) |
| `y_hat` | the prediction, `w * x + b` |
| `l` | the signed miss, `y - y_hat` |
| `alpha` | the step size |
| `eps` | the stopping tolerance in `abs(l) < eps` |
| `w`, `b` | slope and base |

Three traps that have already been hit:

1. The step is `alpha` and the tolerance is `eps`. The 11:00 lecture spends `eps` a third time, on
   the width of a finite-difference window. No exercise may use `eps` for a step size.
2. The genie exercise and the house exercise carry opposite sign conventions, both correct. The
   genie writes `loss = Q - target` with `Q := Q - alpha * loss`; the deck writes `l = y - y_hat`
   with `w := w + alpha * l`. Either normalise them or state the flip out loud in both.
3. Printed deck slide 51 and handwritten page 30 give the name "Robbins-Monro" to different rules.
   The handwriting crosses out the sign-only rule and boxes the proportional one.

## What is undecided, and belongs to Carlos

1. The real length of the 10:00 block, thirty minutes or an hour.
2. Whether the three `opt-` exercises share one guess, check, correct widget. Carlos's own
   handwritten TODO asks for it: "Come up with a scaffold of games and guide them." It has not been
   built, and `docs/summaries/05` section 4.1 calls it the highest-leverage decision of the weekend.
3. Whether `Minimum Lander Exploration.html` is rebuilt into the multi-file layout, and which of its
   seven missions survive next to the grasshopper.
4. The sign convention across the three morning exercises.
5. Which repository the notebooks clone from. No `eth-bmai-hs26/coding-exercises` exists.
6. The five decisions in section 12 of `proposals/COLD-OPEN-CANDIDATES.md`, two of which would
   replace the built cold open outright, plus the plate for its frame 1.
7. The register of the Friday 08:00 opening: philosophical, comic, or one then the other.
   `proposals/COLD-OPEN-FUNNY-CANDIDATES.md` section 9 gives the three arrangements and section 11
   the six decisions that are his. Its first candidate would settle item 6 by letting the room vote
   between the two built decks.
8. Rights for the Maxfield Parrish plate on the AINIT genie slide. No `IMAGE-SOURCES.txt` exists in
   the AINIT repository, so there is no rights record for it anywhere that was read.

## Root index entry (moved from the root CLAUDE.md, 2026-10-23)

The former root index described this repository as follows, verbatim: `scratch/` github.com/eth-bmai-hs26/scratch, all the teaching material

## 2026hs/scratch is the live iteration

*Moved verbatim from the root `git_bmai/CLAUDE.md` on 2026-10-23. Where it differs from an older passage of this file, the later date wins.*

`/Users/carloscotrini/Documents/git_bmai/2026hs/scratch` (remote
`https://github.com/eth-bmai-hs26/scratch.git`, org `eth-bmai-hs26`) is the shared drop point the
master schedule points TAs to. **All new teaching work goes there.** The other three things under
`2026hs/` are `w1-lecture-material/`, the lecture decks, `BMAI-PAGE/`, the official course website,
and `lecturers/`, the roster repo, all described below.

Weekend 1 is Sep 4/5 2026, theme "Vapnik's statistical learning theory". What is already in the
repo:

- Source material at the top level: `bmai_w1_sml_annotated (1).pdf` (60pp, the annotated week-1
  SLT deck), `ainit_rl-slides.pdf` and `ainit_annotated_rl_slides (1).pdf` (the AINIT RL deck),
  `bmai_w1_robbins_monro_gradient_descent (1).pdf`, four `bmai_w1_notes_*.jpg` photos of the
  handwritten lesson plan, and `Minimum Lander Exploration.html`, a single-file 7-mission
  gradient-descent visualization Carlos wrote himself.
- `docs/` : `master-schedule-weekend1.csv`, `slide-text-extracts/` (pdftotext -layout dumps of the
  four PDFs) and `summaries/`. Has its own CLAUDE.md.
- `proposals/` : design proposals per exercise. Has its own CLAUDE.md.
- `initial-states/` : the TA-ready starting repos, one directory per Code Expert slug
  (`hs26-bmai-w1-opt-heron`, `hs26-bmai-w1-opt-genie-rm`, `hs26-bmai-w1-opt-rm-house`), each laid
  out to the course-viz multi-file standard with `issue-prompts/` for the units of work. It also
  holds TWO built beamer cold opens for the weekend, `cold-open-weekend1/` (Descartes' four
  precepts) and `cold-open-weekend1-popper/` (Popper's tetradic schema, with Turing and Whewell),
  both following the FDD cold-open grammar. **They are alternatives for the same three minutes at
  Friday 08:00**, and Carlos picks one. Each deck is `slides/slides.tex`, compiles with plain
  `pdflatex`, and is deliberately incomplete in ways recorded in its own CLAUDE.md: `slides/img/`
  is empty in both so the plate slots project placeholder boxes, the Descartes English gloss is a
  working draft, and the Popper deck has one unpinned quotation slot plus an unresolved rights
  question on its Popper photograph.

Note the standing tension to resolve rather than paper over: `Minimum Lander Exploration.html` is
single-file, and the course-viz standard requires the multi-file layout.

## Sibling course families

*Moved verbatim from the root `git_bmai/CLAUDE.md` on 2026-10-23. Where it differs from an older passage of this file, the later date wins.*

- `/Users/carloscotrini/Documents/git_bmai_fs26_cx` : previous BMAI iteration, org
  `eth-bmai-fs26`. HS26 reuses its `adversarial_attacks/` repo as the pattern reference for the
  "beat" structure and the one-issue-prompt-per-unit-of-work format, and its `coding-exercises/`
  as the source of the Colab student plus solutions convention.
- `/Users/carloscotrini/Documents/git_ainit` : the sibling course "AI in Industry" (AINIT), org
  `eth-ainit-fs26`. **HS26 weekend 1 is porting material out of it.** Specifically, out of
  `git_ainit/rl-arcade/slides/rl-slides.tex`: the genie game and the Robbins-Monro sequence
  (section 8, "Learning a number in the dark: Robbins-Monro", from line 530, with the Maxfield
  Parrish plate `slides/img/epigraph/genie-parrish.jpg`), which becomes the Code Expert exercise
  `hs26-bmai-w1-opt-genie-rm`; and the Faust cold open as a reusable grammar (lines 52 onward,
  three frames, the third a mapping table with the `die Kraft` row muted). Both are forks, not
  live includes. `git_ainit/CLAUDE.md` records the same link from the other side.
- `/Users/carloscotrini/Documents/git_fdd/projects` : the sibling workshop "From Data to
  Decisions" (FDD), org `eth-fdd-fs26`. **This repo carries the written house method and is the
  most authoritative source.** Read before designing or building anything:
  `.claude/skills/course-viz/SKILL.md` (browser-only visualizations: multi-file layout, `file://`
  with no fetch and no CDN, vendored libraries, the editorial palette, hash-based scene routing,
  the "things to never do" list), `.claude/skills/lecture-slides/SKILL.md` (the beamer standard,
  including "no closing punchline" and "no red/green ever"), and
  `.claude/skills/lecture-notes/SKILL.md`. The cold-open grammar is written down in
  `mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md`. HS26 also forks
  `git_fdd/projects/grasshopper` for the exercise `hs26-bmai-w1-gd-grasshopper`.

## Git workflow: commit and push without asking

*Moved verbatim from the root `git_bmai/CLAUDE.md` on 2026-10-23. The root now carries a short form of this section; this is the original text.*

Carlos's standing instruction, 2026-09-08: once a change in any of these repositories is ready to
commit, commit it and push it, without stopping to ask for confirmation first, the way the general
safety guidance on hard-to-reverse or externally visible actions would otherwise call for before a
`git push`. This note is that advance authorization. It covers every repository nested under
`git_bmai/`: `2026hs/scratch`, `2026hs/w1-lecture-material`, `2026hs/w2-lecture-material`,
`2026hs/w3-lecture-material`, `2026hs/w4-lecture-material`, `2026hs/w4-cx-private`, `2026hs/BMAI-PAGE`, `2026hs/lecturers`, and `2026fs`. It does not reach outside this tree; a sibling
course family (`git_bmai_fs26_cx`, `git_ainit`, `git_fdd/projects`) needs the same instruction
written into its own CLAUDE.md before it applies there too.

This authorizes an ordinary commit and push, nothing more. Still stop and ask before anything
actually destructive on these repos: a force push, a history rewrite, deleting a branch, or
overwriting someone else's unpushed work.

## Maintenance contract

- History, decisions, gotchas and publication records (commits, sha256 sums, "on Carlos's word")
  stay in THIS file. The root `git_bmai/CLAUDE.md` is an index of about 8 KB: it gets at most one
  line per change, and only when the map of repositories changes.
- This file is the working memory for this directory. After any major change here, meaning a new
  exercise or visualization, a renamed or moved directory, a changed build or run procedure, a
  changed data format, or a change in who owns the work, UPDATE THIS FILE IN THE SAME COMMIT.
  A CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
