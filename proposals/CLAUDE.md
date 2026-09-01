# CLAUDE.md, proposals/

Design specs for the weekend-1 exercises. One file per exercise, written before the build, against
the primary sources and against the FDD house skills.

Start at the repository root `CLAUDE.md` for the course, the schedule and the house rules.

## The standing rule of this directory

**Nothing in a proposal is decided.** Each file is a menu plus a build spec, and each ends on a
section listing what only Carlos can settle. A proposal states the reasoning so that a decision can
be revisited without re-deriving it. An agent building from one of these should read it in full,
then read the open-questions section again before choosing anything the spec leaves open.

All four proposals here have now been built. **Where a proposal and its built directory disagree,
the built directory binds**, and each proposal below names the recorded departures. A proposal stays
here after its build because it carries the reasoning and the open questions, which the built
directory does not repeat.

The relationship to the rest of the repository:

```
docs/summaries/   what the sources say          (evidence)
proposals/        what we propose to build      (design, undecided)
initial-states/   what is actually built        (code, TA-ready or in progress)
```

## What is here

```
proposals/
  CLAUDE.md                        this file
  COLD-OPEN-CANDIDATES.md          the philosophical opening for the weekend, a menu
  COLD-OPEN-FUNNY-CANDIDATES.md    the same slot in a comic register, a second menu
  LECTURE-DEMOS-MENTALISM.md       stage demos INSIDE the 09:00 and 11:00 lectures, a third menu
  lecture-demos-mentalism-reference.py   runnable reference for every number in that menu
  viz-heron.md                     hs26-bmai-w1-opt-heron
  viz-heron-reference.py           runnable reference for the numbers in viz-heron.md
  viz-genie-robbins-monro.md       hs26-bmai-w1-opt-genie-rm
  viz-genie-rm-reference.mjs       runnable reference for the numbers in viz-genie-robbins-monro.md
  cx-house-price-rm.md             hs26-bmai-w1-opt-rm-house
  cx-house-price-rm-reference.py   runnable reference for the numbers in cx-house-price-rm.md
  __pycache__/                     build artefact of running the .py scripts. Never commit it
```

| File | Lines | Slug | TAs | Proposed format | Built as |
|---|---|---|---|---|---|
| `COLD-OPEN-CANDIDATES.md` | 1106 | no slug, Friday 08:00 intro block | Carlos | Beamer cold open, 3 frames plus 1 at 16:00 | `initial-states/cold-open-weekend1/` |
| `COLD-OPEN-FUNNY-CANDIDATES.md` | 364 | no slug, Friday 08:00 intro block | Carlos | Eight comic openings, most of them projector-free | nothing built |
| `LECTURE-DEMOS-MENTALISM.md` | 739 | no slug, inside the 09:00 and 11:00 lectures | Carlos | Eight stage demos, every one a question-and-answer loop | nothing built. Act 3 has a home in `hs26-bmai-w1-opt-genie-rm` scenes 4 and 5 |
| `lecture-demos-mentalism-reference.py` | 627 | supports the above | | Python, standard library only | |
| `viz-heron.md` | 1153 | `hs26-bmai-w1-opt-heron` | Jinlei, Daniele, Ivan | Multi-file `course-viz` page, click-step, 6 scenes | `initial-states/hs26-bmai-w1-opt-heron/` |
| `viz-heron-reference.py` | 340 | supports the above | | Python, standard library only | |
| `viz-genie-robbins-monro.md` | 1212 | `hs26-bmai-w1-opt-genie-rm` | Jinlei, Suei-Wen | Multi-file `course-viz` page, click-step, 9 scenes | `initial-states/hs26-bmai-w1-opt-genie-rm/` |
| `viz-genie-rm-reference.mjs` | 306 | supports the above | | Node, no dependencies | |
| `cx-house-price-rm.md` | 1066 | `hs26-bmai-w1-opt-rm-house` | Ghali, Suei-Wen | Google Colab notebook pair with inline matplotlib | `initial-states/hs26-bmai-w1-opt-rm-house/` |
| `cx-house-price-rm-reference.py` | 193 | supports the above | | Python, numpy only | |

No proposal exists yet for `hs26-bmai-w1-gd-grasshopper` (either brief),
`hs26-bmai-w1-nn-universal-approx`, `hs26-bmai-w1-nn-pytorch`, `hs26-bmai-w1-validation` or
`hs26-bmai-w1-project`. For the grasshopper pair, `docs/summaries/06` section 5 already contains
most of what a proposal would say.

**There is no `.gitignore` in this directory and none at the repository root**, so
`proposals/__pycache__/` is tracked by nothing and will be staged by a bare `git add proposals/`.
Delete it before staging. The three slug directories under `initial-states/` each ignore their own
artefacts and do not have this problem.

## `COLD-OPEN-CANDIDATES.md`, the philosophical opening

The only file here that is not an exercise. It proposes the three minute philosophical opening for
Friday 08:00, in the house cold-open format used by the FDD menus at
`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md`
and `.../weekend-05-rag-research/carlos-lectures/rag-foundations/COLD-OPEN-CANDIDATES.md`.

Four fully worked candidates: Heron *Metrica* I.8, Descartes' four precepts, Aristotle on Zeno's
dichotomy, and Hume's two propositions. Section 9 recommends Descartes, because his four precepts
map onto Friday's four lectures with the fourth muted, and the mute is lifted at 16:00 in front of
the statistical learning theory lecture.

Sections worth knowing: 0 is the house grammar read off the built decks, including two costs the
written grammar does not mention (polytonic Greek forces lualatex, and a first weekend has nothing
to recycle); 1 is the argument stated with no philosophy in it; 7 answers the recycling question;
10 records the rejections including a full worked rejection of the blind men and the elephant, and
the wording and image traps found while checking; 11 is staging and timing; **12 is what only Carlos
can decide**; 13 is the verification ledger, which says exactly which four passages were pinned
character for character in the session and which nine things were not.

**Built as `initial-states/cold-open-weekend1/`**, which implements the section 9 recommendation as
a four-frame Beamer deck over 13 pages, compiled with plain `pdflatex`. A copy of this menu travels
with the deck, carrying a NOT DECIDED note at its head, because section 12 is still open and two of
its five decisions would replace the deck outright. Three things the build settled or exposed: the
mapping table needed its own frame width, the 16:00 Hume frame was not built because its muted row
depends on a passage the menu records as unread, and `slides/img/` was left empty on purpose so the
missing plate is visible as a dashed box rather than silently absent.

Two cautions carried by this proposal. Nothing in it may be projected until the items under "Not
verified" in section 13 are cleared, in particular the Greek of both ancient candidates. And the
Descartes candidate assumes the mapping table's rows are Friday's four lectures; if Carlos wants the
rows to be the course's weekends, the weekend list has to come from somewhere, because this
repository holds weekend 1 only.

## `COLD-OPEN-FUNNY-CANDIDATES.md`, the same slot in a comic register

Written 2026-09-01 on a one-line brief from Carlos: brainstorm funny ways to start the course, using
what is already here. It competes with `COLD-OPEN-CANDIDATES.md` for Friday 08:00 and it composes
with it, so section 9 gives the three arrangements and what each one costs.

Eight candidates, ranked, each scored on whether cutting the joke would also cut a piece of content.
Seven of the eight need **nothing built**. The five that matter:

1. **"You are my validation set."** Two philosophical decks are built and Carlos has to pick one, so
   the room votes and the winner is played. The vote is then named as model selection on a
   validation set of thirty, which is the Saturday 10:30 lecture arriving on Friday morning.
2. **The off-by-one year.** `45^2 = 2025` inside a box of area `2026`, so the first guess of the
   course misses by exactly one year. Verified arithmetic, forty seconds, from Carlos's own
   handwritten page 1.
3. **Crash the lander live.** Mission 1 of `Minimum Lander Exploration.html` flown by hand and
   crashed on purpose, then handed to gradient descent at 14:00.
4. **The worst genie in fiction.** The AINIT genie's terms read as a service-level agreement, with
   the golden ratio falling out of six rounds of arithmetic as an optional second beat.
5. **Higher, lower, then how much.** A guessing game played twice, where round two answers with the
   size of the miss and finishes in a third of the guesses. This stages the exact conflict recorded
   in `docs/summaries/04`, that the printed deck and the handwriting give the Robbins-Monro name to
   different rules and the handwriting boxes the proportional one.

Section 0 records the five constraints comedy has to survive at 08:00, including the standing house
ban on a centred punchline line and the rule that the target is always the lecturer, the material or
the schedule. Section 10 rejects five bits, among them the AI-generated-intro gag and a live model
failing at arithmetic. **Section 11 is what only Carlos can decide**, six items, three of which are
questions about his own comfort rather than about design. Section 12 is the verification ledger and
records that the handwritten JPGs were read through summary 04 rather than opened as images.

## `LECTURE-DEMOS-MENTALISM.md`, stage demos inside the lectures

Written 2026-09-01 on a brief from Carlos: a magic trick or surprising demo that follows the
first-order iterative methods, in the shape of a mentalist naming a secret number or card after a
few questions. **Different in kind from the two cold-open menus.** These go inside the 09:00 and
11:00 lectures rather than in front of them, and four of the five need no software at all.

The five acts, and the piece of lecture each one is the method for:

1. **Fourteen questions, then one.** Bisection on a secret number, escalated to the continuum, then
   collapsed to a single question once the answer carries the size of the miss. This is handwritten
   page 30's crossed-out rule against its boxed one, performed before the slide is shown.
2. **The six cards.** Six fixed yes-or-no questions, asked simultaneously by six people who never
   speak to each other, and the number falls out of an addition. This is stage 5, "Each grasshopper
   only needs to work on its own dimension", and it is the best pure effect on the page.
3. **Lie to me.** A blindfolded search where the volunteer may lie, converging anyway because the
   step shrinks as `c/n`, against a constant step that orbits forever and a `c/n^2` step that runs
   out of travel. Staged, this is the AINIT title "Learning a number in the dark".
4. **The sealed envelope.** Everyone picks two numbers freely, adds fourteen times, and reads out
   1.618, because the ratio recursion is the genie's own map. Then the dark twist: the same
   experiment with Heron on 2026 splits the room into `+45.011` and `-45.011` by starting sign,
   which is mission 7 of the lander performed on the audience.
5. **The mental square root.** One Heron step in the head, with the digit doubling shown afterwards.

**The second batch was written twice, and the first version was cut.** A first attempt offered four
self-working card principles, the Kruskal count, Kaprekar's 6174, Hummer's cut-and-turn-over and the
faro cycle. Carlos rejected them on 2026-09-01: in all four the spectator makes free choices and the
structure wins with **no question-and-answer loop anywhere**, so they demonstrate a property of the
map rather than a property of the algorithm. They survive in the menu's "Cut on the 2026-09-01
redirect" section with their verified numbers, so any of them can go on a slide without re-deriving
anything. **Do not restore one to the running order without reading why it went.**

The batch that replaced them keeps only the acts that ask, listen and revise:

6. **Twenty-one cards.** Three deals into three columns, three answers, and the card is eleventh
   from the top. Verified as a shrinking bracket: 21 possible positions, then 7 spanning `[8,14]`,
   then 3 spanning `[10,12]`, then 1. Also verified: it wastes 22 percent of the information it
   collects, since three ternary answers distinguish 27 things, and **one lie names the wrong card
   in 60 of 63 cases**. It exists to be broken by act 7.
7. **The liar.** The centrepiece. Three rounds with one volunteer on a row of 52 cards: bisection
   with honest answers, bisection with one lie, then the same search done by nudging a single guess
   with a step of `13/n`. Verified at 30 questions over 20000 trials per row: with honest answers
   both methods are perfect, at one lie in ten the excluding rule gets 0.540 and the correcting rule
   **0.852**, and at one lie in five the median error is 3 cards against **0**. **Read the median
   and worst-error columns**, which are where the argument actually lives.
8. **Warmer and colder.** The performer runs gradient ascent over a card spread on sign-only
   feedback, then reruns it with the magnitude restored and finishes in a quarter of the time.

**The most valuable paragraph in the file is act 7's last section**, and it exists because the
simulation refused to flatter Robbins-Monro. Majority voting over repeated bisection questions
**beats** the correcting rule at an equal budget, 0.956 against 0.852 at one lie in ten, and
designing the questioning for the lie in advance does better still: Berlekamp's bound gives 6
questions for no lies, 10 for one and 13 for two, and an exact game search confirms 10 suffices. So
the act states the honest reason the correcting rule exists at all: it needs no noise budget
declared in advance, it never excludes so no answer is fatal, and above all **you do not get to ask
the same question twice**, because training gives one noisy answer at a point already left behind.

Three further things a reader of that file must not miss. **Act 3 is a demonstration rather than a
guaranteed trick**, and its own honesty table shows twenty questions with occasional lies landing on
36.32 for a secret of 37; the projected staging is the recommended fix, and it has a home already,
because `initial-states/hs26-bmai-w1-opt-genie-rm/js/scenes/scene4.js` and `scene5.js` are
registered stubs titled "The sandstorm." and "Two demands on the step.", which are exactly this act
and its counter-demonstration. **Act 5 collides with an open decision**, item 3 of section 12 of
`COLD-OPEN-CANDIDATES.md`, because showing the averaging update gives away the discovery mechanic
that `viz-heron.md` is built around, so it goes after the exercise or not at all. And **every number in
the menu is output of `lecture-demos-mentalism-reference.py`**, which runs with `python3` and no
arguments; running it already caught one transcription error in act 3's honesty table, so re-run it
rather than trusting the prose. It takes a couple of minutes.

## `viz-heron.md`, "Squaring the rectangle"

Act 1 of Carlos's handwritten page 1. A rectangle of fixed area 2026 whose width the participant
owns, so that the height is forced to `2026/theta` and every column of Carlos's five-column table
becomes something visible: the verdict is the shape of the rectangle, and the update is the visible
act of averaging the two sides.

Rewritten 2026-08-26 by a second pass that recomputed every number and read the built scaffold.
Sections worth knowing: 1 is the handwritten page read as an image, including the detail that the
Update column carries arrows only, so the page gives the direction and withholds the distance;
3 is the anti-collision table for the three exercises sharing the 10:00 block; 4 maps each of
Carlos's columns onto the picture; 5 justifies click-step over scrollytelling; 6 is the six-scene
list, one scene per file; 7 states the three theorems the discovery mechanic stands on; 8 is the
loupe, which keeps the verdict physical after the mismatch goes sub-pixel; 10 is the data contract
and the seeded-RNG rule; 11 is the file tree and the fan-out; 13 is the coding half; 14 is the
TA-checkable acceptance list; **17 says what is already built and what is left, as issue prompts**;
**18 is the open questions for Carlos**; 19 separates what was verified from what was not.

All arithmetic in it was run with Python `Decimal` at 220 digits. The correct-digit column from
`theta = 45` reads 3, 6, 14, 30, 61, and the loupe power needed to see the mismatch is ten to that
same power, so the two double together.

Two findings from the second pass bind the build. The bracket width three corrections in from 45 is
`4.178407e-14`; the value `4.974e-14` that the first draft carried is what IEEE doubles print, and
it is off by 1.12 ulp because from that point on a double is measuring its own rounding error. It
is pinned as though it were the mathematics in `initial-states/hs26-bmai-w1-opt-heron/precompute/build_data.py`
lines 305 to 309 and repeated in that directory's `js/scenes/scene4.js` line 40. And the drawing
frame runs over `theta` in `[10, 202.6]`, which is closed under `theta -> 2026/theta` because
`10 * 202.6 = 2026`, so the frame never has to rescale itself behind the participant's back.

Built as `initial-states/hs26-bmai-w1-opt-heron/`: scenes 0 and 1 interactive and verified by
screenshot, scenes 2 to 5 shipped as stubs that render their own specification, the notebook pair
complete, eight issue prompts. One item from section 17 was completed during the build: the exact
gap column and the loupe ladder now ship in `data/datasets.js`, computed with `Decimal`, alongside
the double-precision readings they are often confused with.

## `viz-heron-reference.py`

Every number quoted in `viz-heron.md` is printed by this file and asserted at the bottom.

```
python3 proposals/viz-heron-reference.py
```

It ends on `All assertions passed.` and needs only the standard library. Heron itself uses no
randomness; the one sampled part is the three-theorem sweep, which runs 300000 samples through a
Mulberry32 port seeded with 2026 so that a Node re-implementation draws the same stream.

## `viz-genie-robbins-monro.md`, the genie game

Act 2 of the same handwritten page, plus page 2 in full: the participants must derive the
Robbins-Monro algorithm, see the AINIT slides for details. The genie frees you when you name
a positive number that its own test accepts, `Q = 1 + 1/Q`, and the loop the participant
invents breaks in two different ways until the step shrinks, which is Robbins-Monro.

The framing already exists as slides in the AINIT deck, quoted frame by frame in
`docs/summaries/02` section 2 and re-read from `rl-slides.tex` lines 530 to 630 for this
proposal. Sections worth knowing: 3 resolves the one conflict between the deck's three
column headers and Carlos's four; 4 is the mathematics, verified before any design;
6 says what to inherit from the AINIT `darts/` cartridge and what to rebuild; 7 is the
nine-scene list; 10 is the file tree; 11 covers seeded randomness and the rigor gate;
**14 is what only Carlos can decide**; 15 is the anti-collision table; 16 is the fan-out
and the issue prompts; 17 separates what was verified from what was not.

Three cautions carried by this proposal. Its sign convention is the AINIT one,
`loss = Q - target` with `Q := Q - alpha * loss`, which is the opposite of the deck
convention used by the house-price exercise 40 minutes later. The AINIT genie slide credits
a Maxfield Parrish plate, *The Arabian Nights* (1909), for which no rights record exists
anywhere in the AINIT repository, so the proposal assumes no photographic plate. And the
Python side of its coding part was unrun when the spec was written; the build has since pinned it.

Built as `initial-states/hs26-bmai-w1-opt-genie-rm/`, where seven of the nine scenes are
interactive and scenes 4 and 5 ship as stubs that render their own specification. Read the built
version before changing the spec. Four things the build settled that the spec left open, all
recorded under "Deliberate departures" in that directory's `CLAUDE.md`: d3 stays vendored for now
and its removal is an issue prompt; the notebook carries the helper module inline rather than
cloning; the three-blank stub keeps its Python names from the table rather than from darts; and the
alpha slider's guided steps are four presets that leave both controls live.

One number in the spec moved during the build. Section 7's scene 6 says to run "the shrinking
schedule" and print `1.6180339887`. Under `alpha = 1/(t+1)` that is false: 200 rounds from
`Q = 1` reach only `1.618235663`. The built scene runs `alpha = 1/(1 + t/5)`, which is the
schedule the coding exercise already hands over, and 60 rounds of it print the pinned digits.
The schedule was added to `js/schedules.js` as `decay(a0, d)` and pinned by a new verifier
assertion (l).

## `viz-genie-rm-reference.mjs`

Every number quoted in `viz-genie-robbins-monro.md` is printed by this file and asserted at
the bottom.

```
node proposals/viz-genie-rm-reference.mjs
```

It ends on `All assertions passed. (33 checks)` and needs nothing but node. Its RNG is
Mulberry32 plus Box-Muller, copied line for line from `rl-arcade/minigolf/index.html` lines
1541 and 1549, so the browser build and this file will draw the same numbers.

Writing it changed the proposal once, which is the reason it exists: an earlier draft
claimed the form B run "settles on -0.618033989". With the genie refusing non-positive
numbers it does not get there, it walks out of the allowed region at `Q = -4` after four
tests. The script now computes the guarded and the unguarded readings separately and
asserts both.

## `cx-house-price-rm.md`, the hinge of the weekend

Heron and the genie solve for a number defined by an equation. This one solves for a number defined
by data, and its last act names the result stochastic gradient descent, which is the last row of the
deck's printed page 56 table.

Sections worth knowing: 3 is a page-by-page fidelity check against the deck's handwritten pages 28
to 34 plus 36 and 38, every one of them read as a rendered image; 4 pins the notation for all three
morning exercises and records the three collisions (`eps` used three ways, `l` used two ways, and
the opposite sign conventions); 5 specifies the twelve fictitious houses and the working units;
6 is the five acts with exact stubs and real output; **7 is the one that carries the brief's
"shrinking step", and separates the deck's constant-`alpha` shrinking from the classical decaying
schedule, with a measured band table**; 8 is the minimum viable path and the three extensions;
9 to 12 are four recorded decisions with their reasoning, on the deck's batch rule, on dropping the
FS26 debrief coach, on inline matplotlib rather than a `course-viz` page, and on carrying the helper
module inside the setup cell so there is no clone; 13 is the sanity checks; 14 the acceptance
criteria; 15 the seven participant mistakes the TAs should expect; 16 the TA-ready initial state;
17 the anti-collision table; **18 is the open questions for Carlos**; 19 is the provenance, which
separates what was verified by computation from what was read and from what stays unverified.

Revised 2026-08-26 by a second pass that re-read every primary source rather than trusting the
first pass. Three corrections were carried in: the previously quoted mean squared error of 1.08e25
for `alpha = 1.0` in Act 4 does not reproduce (the real figures are 5.384e13 after one pass and
`nan` after 300); p28 hypothesizes `y = wx + b` while p29 hypothesizes `y = wx`; and the "first to
go" note on p36 belongs to cross-entropy rather than to the squared error. The Musterwil rights
question moved from "a light web check" to two recorded searches that found the name only inside
Swiss official templates, which is corroboration and still short of a register lookup.

Built as `initial-states/hs26-bmai-w1-opt-rm-house/`, which departs from the spec in four recorded
places, listed under "Deliberate departures from the FS26 house pattern" in that directory's
`CLAUDE.md`. Read the built version before changing the spec. The build was re-checked during the
revision: `precompute/reference.py` still ends on `All assertions passed.` and the notebook pair is
still 38 cells each differing at 4 task cells.

## `cx-house-price-rm-reference.py`

Every number quoted in `cx-house-price-rm.md` is printed by this file and asserted at the bottom.

```
python3 proposals/cx-house-price-rm-reference.py
```

It ends on `All assertions passed.` Requires numpy and nothing else. The Musterwil municipality, the
twelve houses and the prices are all invented, which the module docstring says on its face.

This file has a descendant: `initial-states/hs26-bmai-w1-opt-rm-house/precompute/reference.py`, and
the generator half became `.../data/generate_houses.py`. **The built copies are the ones that bind.**
If a number moves, fix it there first, then here.

`__pycache__/` appears the moment either Python script is imported. It belongs to no one; do not
commit it.

## Writing a new proposal here

1. Read the primary sources yourself. The handwritten JPGs are read as images, and the circulating
   transcription of them has ten known errors, listed in `docs/summaries/04` section 6.
2. Read the relevant house skill in `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/`
   in full before proposing a format.
3. Name the schedule row, the slug and the TAs at the top, with the brief quoted verbatim from
   `docs/master-schedule-weekend1.csv`.
4. Compute every number you quote, in the session, and ship the script that reproduces it.
5. Say what you verified and what you did not. An unverified claim gets labelled unverified.
6. End on a section listing what only Carlos can decide, and put the anti-collision table in:
   which ideas this exercise owns, and which belong to the exercise before or after it.
7. ASCII punctuation only.

## Maintenance contract

- This file is the working memory for this directory. After any major change here, meaning a new
  proposal, a proposal that has been built and superseded, a renamed or moved file, a changed way of
  running a reference script, or a change in who owns the work, UPDATE THIS FILE IN THE SAME COMMIT.
  A CLAUDE.md that describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule. When you create a
  subdirectory, create its CLAUDE.md at the same time. `__pycache__/` holds no work and gets deleted
  rather than documented.
- Keep it concrete: real file names, real identifiers, real commands. Record the gotchas that cost
  someone an hour. Do not restate what the code already says plainly.
