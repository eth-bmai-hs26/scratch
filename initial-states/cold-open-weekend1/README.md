# The cold open of CAS BMAI HS26, weekend 1: "The Four Precepts"

The philosophical opening for **Friday 4 September 2026, 08:00**, inside the "Intro and onboarding"
block, in front of everything administrative. Anchored on Descartes' four precepts, *Discours de la
methode*, seconde partie (1637), chosen from the menu in `COLD-OPEN-CANDIDATES.md`, which is still a
menu: see "What only Carlos can decide" at the foot of this file.

Built 2026-08-26. Four frames, thirteen overlay pages, about three and a half minutes in total,
split across two moments of the same day.

```
slides/slides.tex            the deck, 4 frames / 13 overlay pages
slides/slides.pdf            compiled, 13 pages
slides/beamer-preamble.tex   light projection-first Metropolis with the Libertinus serif,
                             copied from the lecture-slides skill template and diffed
                             against the skill before a frame was written
slides/img/                  EMPTY. IMAGE-SOURCES.txt names the one plate the deck wants
COLD-OPEN-CANDIDATES.md      the menu this was chosen from, with the rejected options
CLAUDE.md                    the contract for this directory
```

Build: `cd slides && pdflatex slides.tex && pdflatex slides.tex` (twice, from inside `slides/`, so
that `\input{beamer-preamble}` resolves).

## The argument, in the order the deck makes it

**The hinge is the fourth row of frame 3.** Descartes writes down four rules of method. Friday runs
four lectures. The room agrees with all four rules on frame 2, because on their face they are simply
good advice, and then on frame 3 three of them map onto the morning and the fourth loses its colour.
The fourth precept is to check everything, and it is the one rule a learning machine cannot obey: a
model is fitted on the cases somebody happened to collect and is then sold to customers who bring
cases nobody collected. Every single thing in the 16:00 lecture is what you do instead of obeying
it.

**And then the mute is lifted, four hours later, on the same day.** Frame 4 is frame 3 with the
alert moved: rows 1 to 3 go muted, row 4 takes the accent, and row 4's right cell finally names a
time. The room saw this table in the morning, and recognising it is free.

That is the Kant recycling move performed inside one day. `COLD-OPEN-CANDIDATES.md` section 7 works
out why that is the only version of the move a first weekend can perform: the move runs on
recognition, Weekend 2 of FDD reused Weekend 1's frame and the room felt it, and on the first
morning of a new course nobody has seen anything at all.

| # | Frame | PDF pages | Job |
|---|---|---|---|
| 1 | Descartes, 1637: four rules of method | 1 | The plate and the placement. Static, one page, spoken over. The only image in the deck, which is also why this is the frame to cut if the morning runs late. |
| 2 | The four precepts | 2 to 6 | The quotation, French above the gloss, one precept per click. It also **teaches the colour code**: exactly one clause of each precept is alerted, on words that carry no meaning yet, and those four clauses are the four left-hand cells of frames 3 and 4. Overlay 1 shows four numbered but empty rules, so the room can count them before it can read them. Ends on the fourth precept. |
| 3 | Friday, read against the four precepts | 7 to 11 | **The frame the opening exists for.** A whole frame, no prose, no closing line, one row per click. Rows 1 to 3 keep the accent, row 4 loses it and its right cell goes muted. Row 4 names no time, so the room supplies 16:00 by itself. |
| 4 | The fourth precept | 12 to 13 | **Shown at 16:00, in front of the statistical learning theory lecture.** The same table with the alert moved. Ends on one line of ordinary body text: "This morning we could obey three of them. This hour is about the fourth." |

**Do not run past page 11 on Friday morning.**

**No punchlines.** The two closing thoughts in the deck, "He settled on four." on frame 1 and the
line at the foot of frame 4, are ordinary body text at `\footnotesize`, left aligned, in ink, with
no rule above them and no centring. `\takeaway` is deliberately left undefined in the preamble, and
the reason is written at the foot of that file. See
`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md`, "No
closing punchline" (Carlos, 2026-08-11). An earlier build of frame 4 let `\centering` catch the
closing line and it read as a centred punchline; it now sits outside that group.

## How the muted row works, and why it is the reason to choose this text

The mute is done by **absence of `\alert` on both cells, plus one explicit `{\color{muted}}` on the
right cell**. Never a strikethrough, never a deletion, never a caption. Row 4's left cell is
ordinary ink, so it is darker than the alerted rows on one side and greyer on the other, and it
stays fully legible.

That only reads as a loss if the room has already learned what the colour means, which is what frame
2 is quietly for. This is the AINIT *Faust* device, where three of five candidate senses of *logos*
are alerted two frames before *die Kraft* is refused. The forensic account of it is in
`../../docs/summaries/02-ainit-rl-slides-narrative-and-cold-open.md`, which calls the muted row
"colour continuity" rather than "grey text".

**Where this deck differs from its two ancestors, and it is a small real difference.** In Faust the
refused row is refused permanently. In Kant the alert moves once per weekend across three weekends.
Here the row is muted and the mute is lifted before the room goes home. It is also the first of the
three where the text is a method rather than a metaphysics, which suits a weekend whose whole
subject is an algorithm.

## The inversion, which is spoken and never projected

Descartes is after certainty, by deduction, from ideas so clear that doubt is impossible. Weekend 1
offers a guess to start with and a bound rather than a proof at the end. A philosopher in the room
can say that the mapping inverts its own source, and would be right.

**Say it out loud, because it is the content.** Descartes' first precept names its two enemies as
*la precipitation et la prevention*, haste and prejudgement. The algorithm taught at 09:00 begins
with a prejudgement (`theta = 45`, chosen because it is close) and proceeds in haste (a step that
may overshoot), and the entire art of the morning is choosing how much haste. A method built out of
the two things Descartes forbids, which nevertheless arrives, is a better opening claim than a
method that agrees with him.

This costs one spoken sentence and no extra frame. It is written here rather than on a slide because
it is the reasoning the frame depends on. Rehearse it before trusting it.

## Row 1 is the softest row

"Accept nothing you do not evidently know" reads as a general epistemic caution rather than as the
09:00 lecture. The spoken repair is one sentence: the morning's whole method is that a guess is
never accepted, it is squared and compared.

If that does not land in rehearsal, the honest fix is to drop to a three-row table (precepts 2, 3
and 4 against 11:00, 14:00 and 16:00) and let the 09:00 lecture live under the placement line on
frame 1. Repairing it by adding prose to frame 3 would break the house grammar, which gives the
mapping table a whole frame that carries no prose.

## What was cut, and where it went

- **The sentence that introduces the four precepts**, *"je crus que j'aurais assez des quatre
  suivants"*, which would have been the natural content of frame 1's right column. It was read in
  the proposal's locus section and never re-pinned, and the house rule is that unpinned material is
  cut rather than projected. The FDD opening cut its Jaesche fourth question for exactly this
  reason. **Frame 1 carries this deck's own prose instead.** If somebody re-pins the sentence
  against the source PDF, it belongs on frame 1 above the placement line.
- **The *precipitation et prevention* clause.** Spoken, never projected. See the section above.
- **The right-cell explainers on the mapping table**, which the proposal's draft carried ("every
  guess is checked against something computable" and its siblings). Dropped on width: the table with
  them overflowed the slide by 74pt. The mapping is the content, and the explainers are what a
  lecturer says while a row lands.
- **Precepts 2 and 3 are ABRIDGED on frame 2**, each cut marked with an ellipsis. The full pinned
  French of both sits in a comment beside them in `slides.tex`, and the English gloss under each is
  the gloss of the WHOLE precept, so nothing is silently lost.
- **A title frame.** The cold open is pasted in front of the intro and onboarding block, which
  already carries the course title page, and weekend 1 has no earlier title photograph to recycle.
- **The Hume frame** that `COLD-OPEN-CANDIDATES.md` section 8 recommends for 16:00, after the mute
  is lifted. It is genuinely good and it is not built here, because its muted row depends on
  *Custom, or habit* from Section V of the *Enquiry*, which the proposal records as unread and
  unpinned. Pin that first. Its plate is already recorded in `slides/img/IMAGE-SOURCES.txt`.
- **Heron and Zeno**, the two Greek candidates. Both are worked in full in the menu, both would have
  forced `lualatex` on the whole deck or a pre-rendered image of the Greek line, and both have an
  unpinned Greek passage. The menu also places them: Heron belongs at 09:00, spoken, and Zeno
  belongs at 11:00 or inside the genie exercise.

## Provenance

| Quotation | Locus | Status |
|---|---|---|
| The four precepts, in French: *Le premier etait de ne recevoir jamais aucune chose pour vraie ...* through *... que je fusse assure de ne rien omettre.* | *Discours de la methode*, seconde partie (1637) | **Pinned character for character** during the proposal pass against the modernised critical text at `philo-labo.fr` ("Discours de la methode (A.T)"), downloaded and converted with `pdftotext -layout`. The four precepts were extracted as one contiguous string and its character set was checked: no dashes, no smart quotes, nothing outside the accented Latin set. **NOT re-pinned during the build session.** |
| Precepts 2 and 3 as they appear ON THE SLIDE | same | **Abridged**, each cut marked with an ellipsis. Precept 2 drops *", et qu'il serait requis pour les mieux resoudre"*; precept 3 drops *"et les plus aises a connaitre"*. Precepts 1 and 4 are whole. The unabridged French of both is in a comment in `slides.tex`, frame 2. |
| The English gloss under each precept | none | **This deck's own working draft**, written for the proposal. It is labelled on frame 2 as this deck's own so that nobody mistakes it for a published translation. **Carlos approves it or replaces it before this is projected.** |
| The Adam and Tannery page reference, conventionally AT VI, 18 to 19 | *Discours*, seconde partie | **NOT confirmed.** The PDF used in the proposal pass carries only one AT marker, at VI, 1. The slide's source line therefore names the work, the part, the year and the spelling convention and makes no AT claim. |
| *je crus que j'aurais assez des quatre suivants* | the sentence immediately before the four precepts | **Read in the proposal, never pinned. CUT rather than projected.** |
| *c'est-a-dire, d'eviter soigneusement la precipitation et la prevention* | the continuation of precept 1 | Quoted in the proposal from the same file. **Spoken, never projected.** |

**The orthography is a decision, and it is recorded on the slide.** The text projected is in
MODERNISED spelling and frame 2's source line says so. The 1637 Ian Maire first edition prints *ie*
for *je*, long *s*, *estoit* and *connoistre*, and looks nothing like it. This is the same trap the
FDD Kant pass hit with *tun* against *thun*. If Carlos wants the 1637 orthography instead, the
Gallica scan of the Ian Maire printing is where to pin it, and that was not done.

**Rights.** The French is public domain; Descartes died in 1650. The gloss owes nobody anything
because it is ours. Two published alternatives were considered and neither is used: John Veitch
(1850, died 1894) is public domain everywhere and his exact wording was never pinned, and Haldane
and Ross (1911) is a joint work, so Swiss protection runs 70 years from the later death and neither
death year was established. Switzerland is 70 years *post mortem auctoris*. Treat 1911 as a date
rather than as a licence.

**Images.** See `slides/img/IMAGE-SOURCES.txt`. One plate is wanted, Frans Hals' *Portrait of Rene
Descartes* (1649), public domain, and it has NOT been downloaded, opened or inspected. The deck
compiles and projects without it: `\plateh` draws a dashed box naming the missing file, so the gap
is visible on the slide. The recorded trap is that Commons carries at least six variants of this
portrait under similar names, one of them a digitally modified derivative, and the attribution
history is contested in the art literature.

## Verification

Every command below was run on 2026-08-26 from inside `slides/`, and this is what it printed.

| Check | Command | Result |
|---|---|---|
| Compile, twice | `pdflatex slides.tex` | exit 0 both times |
| LaTeX errors and boxes | `grep -nE '^!\|Overfull\|Underfull' slides.log` | no output |
| Page count | `pdfinfo slides.pdf` | `Pages: 13` |
| Em dashes in the RENDERED PDF | `pdftotext slides.pdf - \| grep -cP '\x{2014}'` | `0` |
| En dashes in the RENDERED PDF | `pdftotext slides.pdf - \| grep -cP '\x{2013}'` | `0` |
| Prose dash runs in source | `grep -nE -- '---\|[^-]--[^-]' slides.tex beamer-preamble.tex` | 13 hits, every one of them inside a LaTeX comment; zero on a line that renders |
| Source is ASCII | `LC_ALL=C grep -c '[^ -~]' slides.tex beamer-preamble.tex` | `0` and `0` |
| Animation | 4 frames, 13 overlay pages | ratio 3.25, deliberately below the 4 to 6 teaching band; see below |
| No-shift, frame 3 | four 130 DPI crops of row 1 on pages 8, 9, 10, 11 | four identical MD5 hashes |
| No-shift, frame 2 | four crops of precept 1 on pages 3, 4, 5, 6 | four identical MD5 hashes |
| No-shift, frame 4 | crops of the table on pages 12 and 13 | two identical MD5 hashes |
| Style critic | `pdftoppm -png -r 130 slides.pdf` then read all 13 | done, page by page |
| High-DPI read | pages 6, 11 and 13 at 300 DPI | done |

**The animation ratio is 3.25 and that is on purpose.** The `lecture-slides` skill calibrates a
teaching deck at 4 to 6 overlay steps per frame. A cold open is calibrated differently: the AINIT
Faust opening is three frames, three clicks and zero overlays, a ratio of exactly 1.0, and
`COLD-OPEN-CANDIDATES.md` section 3 predicted 3.7 here and called it "correct for an opening whose
frames are quotations". Frame 1 is static because it is placement and the placement is spoken.

**Three defects were found by looking at rendered PNGs, and all three compiled clean.** The mapping
table ran 74pt off the right edge of the slide. Frame 2's numerals floated about 5pt above their own
precepts, because beamer's `\onslide` shifts a `p{}` cell's first baseline. Frame 3's early overlays
showed four bare arrows pointing at nothing, because the arrow was a column separator and therefore
present before its row. Exit 0 proved nothing about any of them.

## What is unverified

Written last and deliberately unflattering.

- **No quotation was re-pinned in the build session.** The French on frame 2 is trusted from the
  proposal pass. Nothing was downloaded and no primary source was opened while the deck was written.
- **The English gloss is a draft** and is Carlos's to approve or replace.
- **No image exists**, so frame 1 has never been seen with its plate in place. The real portrait is
  about 3.0cm wide at the height the deck uses, and the placeholder box is a little wider, so the
  frame will shift slightly when the file lands. Re-render frame 1 and look at it.
- **The deck has never been shown to a room**, so the two spoken repairs (the inversion, and row 1)
  are untested. Both are one sentence and both need a rehearsal.
- **The 16:00 frame has never been shown four hours after frame 3**, which is the only thing that
  can confirm the recycling move works at that timescale. The FDD evidence is for weeks, not hours.
- **The theme is the light Metropolis from the skill template.** The FDD opening this README is
  modelled on uses the Modern Editorial theme (ETH blue, Biolinum display, brand stripe, branded
  footer). Switching is a real option and it is Carlos's call; it costs a different preamble and a
  re-render of every frame, because the editorial frametitle is taller and eats body height.

## Timing

| Time | What | Frames | Overlay pages | Minutes |
|---|---|---|---|---|
| 08:00 | Descartes, 1637: four rules of method | 1 | 1 | 0.5 |
| | The four precepts | 1 | 5 | 1.5 |
| | Friday, read against the four precepts | 1 | 5 | 1.0 |
| | *then the ordinary onboarding: people, rooms, the project, the tools* | | | |
| 16:00 | The fourth precept, the mute lifted | 1 | 2 | 0.5 |

**Three minutes at 08:00 and half a minute at 16:00.** The 08:00 block is 60 minutes and mostly
administrative, so three minutes of it is cheap.

**The cut, if the morning runs late.** Drop frame 1 and keep frames 2 and 3. The four precepts work
without Descartes' face, frame 3 is the frame the opening exists for, and cutting frame 1 also
removes the deck's only image dependency. Two frames is still a real opening.

## Recycling at 16:00

The 16:00 frame is page 12 and 13 of this PDF and can simply be shown from here. If you would rather
drop it into the statistical learning theory deck, this is the frame, paste-ready. It needs
`\alert`, `muted`, and nothing from `img/`.

```latex
% ==== Friday 16:00, in front of the statistical learning theory lecture ====
% The morning's mapping table with the alert moved to row 4. The room saw this
% four hours ago; recognising it is free.
\begin{frame}{The fourth precept}
  \vfill
  {\centering
  \renewcommand{\arraystretch}{2.1}%
  \begin{tabular}{r@{\enskip}c@{\enskip}l}
    \shortstack[r]{%
      {\color{muted}Never accept anything as true}\\[2pt]
      {\scriptsize\itshape\color{muted}ne recevoir jamais aucune chose pour vraie}} &
    \raisebox{2.1ex}{$\rightarrow$} &
    \shortstack[l]{%
      {\color{muted}09:00}\\[2pt]
      {\footnotesize\color{muted}First-order approximation algorithms}}\\
    \shortstack[r]{%
      {\color{muted}Into as many parts as possible}\\[2pt]
      {\scriptsize\itshape\color{muted}en autant de parcelles qu'il se pourrait}} &
    \raisebox{2.1ex}{$\rightarrow$} &
    \shortstack[l]{%
      {\color{muted}11:00}\\[2pt]
      {\footnotesize\color{muted}Gradient descent}}\\
    \shortstack[r]{%
      {\color{muted}Climb little by little, by degrees}\\[2pt]
      {\scriptsize\itshape\color{muted}monter peu \`a peu, comme par degr\'es}} &
    \raisebox{2.1ex}{$\rightarrow$} &
    \shortstack[l]{%
      {\color{muted}14:00}\\[2pt]
      {\footnotesize\color{muted}Neural networks and universal approximation}}\\
    \shortstack[r]{%
      \alert{Be assured of omitting nothing}\\[2pt]
      {\scriptsize\itshape\color{muted}que je fusse assur\'e de ne rien omettre}} &
    \raisebox{2.1ex}{$\rightarrow$} &
    \shortstack[l]{%
      \alert{16:00}\\[2pt]
      {\footnotesize\color{accent}Vapnik's statistical learning theory}}\\
  \end{tabular}\par}

  \vspace{4mm}
  {\footnotesize\onslide<2->{\hspace*{0.2cm}This morning we could obey three of
   them. This hour is about the fourth.}}
  \vfill
\end{frame}
```

The closing line is plain body text at the foot of the frame. Do not put it under an amber rule and
do not centre it.

## What only Carlos can decide

`COLD-OPEN-CANDIDATES.md` section 12 has the full list. Five things bind this build:

1. **Whether it is Descartes at all.** The menu recommends him and nothing in it is decided. Hume at
   three frames is the zero-build-risk fallback, and it opens a different course.
2. **Whether the table's rows are Friday's four lectures or the course's weekends.** Descartes has
   exactly four precepts, so a course with five or six weekends breaks this candidate outright. This
   repository holds weekend 1 only, so the weekend list has to come from somewhere else.
3. **Whose English.** This deck's own gloss, labelled on the slide as it is now, or Veitch 1850.
   Decide once and hold it across every frame.
4. **Whether 16:00 gets the lifted mute, or Hume, or both.** Both is two minutes and is the menu's
   recommendation. This build ships the lifted mute alone.
5. **Whether the deck keeps the light Metropolis theme or moves to Modern Editorial**, which is what
   the FDD opening uses.
