# The cold open of CAS BMAI HS26, weekend 1: "Guess, Check, Correct", Szymborska variant

A philosophical opening for **Friday 4 September 2026, 08:00**, inside the "Intro and onboarding"
block, in front of everything administrative. It opens on Wislawa Szymborska's 1996 Nobel lecture,
then runs Karl Popper's tetradic schema with Turing and Whewell as corroborating witnesses.

**This deck is `../cold-open-weekend1-popper/` with one frame added at the front.** Frames 2 to 6
are that deck apart from their banner numbers and three added lines on the references frame, so a
diff between the two directories is meaningful and worth keeping meaningful. Built 2026-09-01 on
Carlos's request, after a search for a literary cold open produced four candidates, Octavio Paz,
Rabindranath Tagore, Wislawa Szymborska and Samuel Beckett, and he chose Szymborska.

**Neither of the other two cold opens is replaced.** `../cold-open-weekend1/` holds the Descartes
deck and `../cold-open-weekend1-popper/` holds the Popper deck without the poet. All three are
alternatives for the same three minutes. See "Which of the three" below.

```
slides/slides.tex            the deck, 6 frames / 24 overlay pages
slides/slides.pdf            compiled, 24 pages
slides/beamer-preamble.tex   light projection-first Metropolis with the Libertinus serif,
                             inherited from the Descartes deck plus one added macro
slides/img/                  THREE OF FOUR PLATES PRESENT. IMAGE-SOURCES.txt has a block each
SOURCES.md                   provenance for every quotation, the rights table, the traps
CLAUDE.md                    the contract for this directory
```

Build: `cd slides && pdflatex slides.tex && pdflatex slides.tex` (twice, from inside `slides/`, so
that `\input{beamer-preamble}` resolves).

## The argument, in the order the deck makes it

Every algorithm on Friday morning is one loop. You cannot write the answer down, so you guess, you
check the guess against something you actually can compute, you read the signed miss, you correct,
and you go round again. Heron does it to `sqrt(2026)`, the genie does it to a number defined by an
equation containing itself, and the house-price exercise does it to a slope defined by a table that
never names it.

**Szymborska describes that loop from the inside**, as the thing a poet does to a poem: you finish
it, the final period hits the page, you start to doubt it, you find the answer was provisional, and
you try again. Then she names the state the whole thing starts from, a continuous "I don't know".

**Popper answers her in the same words.** His frame opens on "We do not know: we can only guess."
The room hears the same sentence twice inside twenty seconds, once from a poet and once from a
philosopher of science, and the second one adds the guess. Popper then writes the loop down as a
formula and spends a career arguing it is the whole method of science. Turing says the same thing
about machines that learn, in 1950, one year before Robbins and Monro. Whewell says it in 1858
about inventive minds in general, and throws in overshooting, which is what a step size does at
11:00.

One poet, three witnesses, one loop, and the room has agreed with all four before a line of code is
written.

**Why a poet first.** The three witnesses all make a claim ABOUT method, from outside it. Szymborska
makes no claim at all. She reports what it is like to finish something, read it back, and find that
it will not hold, which is an experience every person in that room has had and none of them calls a
method. The frame costs about forty seconds and it buys the other three an audience that is already
nodding.

**Why Popper rather than Descartes.** The Descartes deck's own design spec records the objection
against itself: Descartes wants certainty by deduction from ideas so clear that doubt is impossible,
and weekend 1 offers a guess, a step that can overshoot, and a bound rather than a proof. The
Descartes deck answers by saying the inversion out loud, which is clever and is still a repair.
Popper needs no repair, because Popper's method is this weekend's method.

## Frames

| # | Frame | PDF pages | Job |
|---|---|---|---|
| 1 | Szymborska, 1996: the answer that will not hold | 1 to 4 | One line of placement, then "born from a continuous I don't know", then the loop: an answer, doubt at the final period, and trying again. Polish above, the Baranczak and Cavanagh English below |
| 2 | Popper, 1934: conjecture and refutation | 5 to 8 | Two spoken lines of placement, the original-language slot, then "We do not know: we can only guess." Ends on the sentence |
| 3 | Popper's tetradic schema | 9 to 15 | The pinned *Conjectures and Refutations* sentence, then `P1 TT EE P2` one node per click, then the arrow that closes the loop, then Friday morning hung off each node in one wave |
| 4 | Turing, 1950: the child machine | 16 to 19 | The same loop about machines that learn, plus the sentence that is gradient descent with the words changed: learning as a search over behaviours, scored by a criterion |
| 5 | Whewell, 1858: trying wrong guesses | 20 to 23 | The same loop again, and overshooting the mark, in English, from 1858 |
| 6 | References | 24 | A handout page and a rights record. **Not part of the three minutes** |

About three and a half minutes for frames 1 to 5.

**The hand-off from frame 1 to frame 2 is the deck's best twenty seconds and it is fragile.**
Frame 1 ends on "rodzi sie z bezustannego nie wiem", born from a continuous "I don't know". Frame 2
opens on "We do not know: we can only guess." Do not put a frame between them and do not reorder
them. If the morning runs late, cut overlay 4 of frame 1, never its last overlay.

## What the schema slide actually says

Popper's four moves, and what each is on Friday morning:

| Popper | Friday morning |
|---|---|
| `P1`, a problem | You cannot write the answer down |
| `TT`, a tentative theory | A first guess, `theta = 45` |
| `EE`, attempted error elimination | Square it, compare with 2026 |
| `P2`, a new problem | A smaller miss, and a better question |

Then the arrow back to `P1`, labelled "and again".

The part worth saying out loud and not putting on the slide: Popper's own measure of progress is the
distance between `P1` and `P2`, so what the loop produces is a better question rather than a final
answer. And his own failure case is the null step. When `P2` turns out to be `P1` in disguise, he
says the theory has only managed to shift the problem a little, which is exactly a step that does
not move the loss.

## Verification, run on 2026-09-01

| Check | Result |
|---|---|
| `pdflatex` twice, exit code | 0 |
| LaTeX errors in the log | 0 |
| Overfull or underfull boxes | 0 |
| Em dashes in the rendered PDF | 0 |
| En dashes in the rendered PDF | 0 |
| Double hyphens in the rendered PDF | 0 |
| Pages | 24, from 6 frames. Ratio 4.0 |
| All pages rendered | Yes, 24 of 24, at 130 DPI |
| Pages READ in this build | **7 of 24**, and the distinction matters. Read here: 1, 2, 3, 4 (all four overlays of the new frame), 8 (the hand-off to Popper), 15 (the schema, to confirm the renumbering left it alone) and 24 (the rebuilt references frame). The other 17 pages are the Popper deck unchanged, and were read one by one in its own build of 2026-08-31 |
| Frame 1 read at 300 DPI | Yes, page 4 |
| Polish diacritics in the rendered PDF | Confirmed with `pdftotext`. All of `a-ogonek`, `c-acute`, `e-ogonek`, `l-stroke`, `n-acute`, `o-acute`, `z-dot` come out as proper Polish |
| No-shift on frame 1 | **Measured pixel by pixel**, not eyeballed. See below |
| Plate opened and inspected before use | Yes, and its EXIF cross-checked against the Commons record |

### The no-shift measurement on frame 1

Each region of the frame was cropped from the four rendered overlays and hashed. A band that never
moves has the same hash on every page where its content exists.

| Band | p1 | p2 | p3 | p4 |
|---|---|---|---|---|
| Left column, plate and caption | same | same | same | same |
| Placement line | blank | lands | same | same |
| Beat 1, Polish and gloss | blank | blank | lands | same |
| Beat 2, Polish and gloss | blank | blank | blank | lands |

Every band changes exactly once, at the overlay where its content arrives, and is byte-identical on
either side of that. Nothing moves as pieces land.

### Three defects found by rendering, and fixed

The clean compile showed none of these. All three came out of reading the PNGs.

1. **Frame 1 overflowed by 90.6pt on its first build.** Two quotations in two languages plus a two
   line placement plus a three line source line does not fit a 0.66 column. Fixed by reordering so
   the short "I don't know" line comes first, cutting the placement to one line, folding the repeat
   into the loop quotation, and tightening the inter-beat gaps.
2. **The plate caption split the licence across a line break as "CC / BY 3.0".** The 0.30 column is
   narrow and the automatic break landed badly. The break is now forced after the date.
3. **The references frame overflowed by 26pt** once Szymborska's text and image entries were added,
   and the first fix for it, a larger negative `\vspace`, pushed the "Texts" and "Images" headings
   into the frametitle panel. Backed off to `-3mm` and the points recovered from the right column,
   which is the taller of the two and therefore the one that sets the height.

## What is unverified

Everything Szymborska is pinned. The four items below are all inherited from the Popper deck and
none of them was resolved by this build.

1. **"We do not know: we can only guess" is located, not pinned.** Chapter 10, section 85, page 278
   of the 1959 English, through a secondary reference. A colon version and a semicolon version both
   circulate.
2. **The German original was not found**, so frame 2's original-language slot projects a dashed
   marker instead. Two German wordings circulate and it is not even settled whether that sentence
   has a 1934 counterpart, because Popper revised the 1959 English himself.
3. **`img/popper-lse.jpg` has not been downloaded** and its dashed box still projects on frame 2.
4. **The Popper photograph carries an unresolved rights question.** Commons records "no known
   copyright restrictions", which is an institutional statement rather than a licence, on a
   photograph taken about 1980 of a man who died in 1994.

`SOURCES.md` has all four in full, and section 1a there covers the Szymborska provenance.

## Which of the three, and what only Carlos can decide

1. **Which cold open runs at 08:00.** Three are now built: Descartes, Popper, and this one. Do not
   run two of them on the same morning.
2. **Whether the deck is restyled to Paper and Grid.** The HS26 house style changed on 2026-09-01
   and the 08:00 admin, 09:00 and 11:00 decks were restyled to it. All three cold opens are still on
   the earlier light Metropolis, so as it stands the first thing the room sees is in a theme nothing
   else that day uses. This is the largest open item in this directory.
3. **The Popper photograph.** Use it on the LSE statement, ask the LSE Library, or run frame 2 with
   no plate. `slides/img/IMAGE-SOURCES.txt` sets out all three.
4. **The dash exemption for pinned quotations.** House rule 4 wants a quotation character for
   character and house rule 8 wants a dash-free rendered PDF. Szymborska's printed English uses en
   dashes freely, and one passage worth having is unusable until this is settled. `SOURCES.md`
   section 1a states the collision and proposes the resolution. **Not decided.**
5. **The quotation-right judgement.** Szymborska is protected in Switzerland until the end of 2082
   and Popper until the end of 2064. The deck runs on Art. 25 URG. The extent is two short passages
   from one lecture plus four sentences of Popper, each marked and attributed. Whether that extent
   is justified by the purpose is his call.
6. **Whether the paraphrase lines stay** on frames 4 and 5, where the original is already English.
   Frame 1 does not have this problem, because its Polish original is pinned.
7. **Whether a 16:00 return frame is built**, the way the Descartes deck returns to lift its mute.
   Two candidates now. Popper on stopping: science does not rest on bedrock, and you stop driving
   the piles when they are firm enough to carry the structure, which is the tolerance every Friday
   exercise halts on. Or Szymborska's own Ecclesiastes passage, in which she predicts that no poet
   will ever say he has written everything down, which is non-termination said warmly. Neither is
   built, and the Popper one is in the unpinned group above while the Szymborska one is pinned.

## Anti-collision: what this artifact owns

| Idea | Owner |
|---|---|
| Szymborska, the poet's provisional answer, and "I don't know" | **This deck.** Do not spend the same passage at 16:00 |
| Popper, the tetradic schema, Turing's child machine, Whewell on guesses | **This deck**, and identically `../cold-open-weekend1-popper`. Do not run both |
| The four precepts as the map of Friday, and the muted fourth row | `../cold-open-weekend1`, the Descartes deck. Do not run it at 08:00 as well |
| Heron, *Metrica* I.8, and the averaging update | `../hs26-bmai-w1-opt-heron`. Do not put the averaging update on an 08:00 slide |
| The genie, `Q = 1 + 1/Q`, and the step-size conditions | `../hs26-bmai-w1-opt-genie-rm` |
| Training error against test error | The 16:00 lecture |
| Course branding, dates, rooms, people | The intro and onboarding deck, which this one is pasted in front of |

## The three other literary candidates, if Szymborska is dropped

All four were pinned against primary sources on 2026-09-01, so any of them can be built without
further research. Full text and provenance are in the session record; the one line each:

| Author | Text | Status |
|---|---|---|
| Octavio Paz | *Piedra de sol* (1957), the six opening lines, which are also its six closing lines, ending on a colon. `avanza, retrocede, da un rodeo / y llega siempre` | Spanish pinned against the UNAM *Material de Lectura* edition, from *Libertad bajo palabra*, FCE 1957. No English translation pinned |
| Rabindranath Tagore | *Gitanjali* 12 (1912), `that training is the most intricate which leads to the utter simplicity of a tune` | Pinned against Project Gutenberg 7164. Tagore's own English, and **public domain**, so it needs no clearance at all |
| Samuel Beckett | *Worstward Ho* (1983), `Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.` | First paragraph pinned against Hisgen, Leiden 1998. The famous paragraph is one book check short. Note that inside the book "fail better" sits in a project of failing WORSE on purpose |
