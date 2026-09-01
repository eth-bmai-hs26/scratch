# The cold open of CAS BMAI HS26, weekend 1: "Guess, Check, Correct"

A second philosophical opening for **Friday 4 September 2026, 08:00**, inside the "Intro and
onboarding" block, in front of everything administrative. Anchored on Karl Popper's tetradic schema,
with Turing and Whewell as corroborating witnesses.

Built 2026-08-31 to a slide list Carlos specified: Popper with his portrait and the sentence, then
the tetradic schema with a diagram, then one frame for Turing, then one for Whewell, each with the
thinker's image, the citation, and the gloss, plus references.

**This does not replace `../cold-open-weekend1/`.** That directory holds the built Descartes deck
and is Carlos's own. The two are alternatives for the same three minutes, and both should stay until
one is chosen. See "Which of the two" below.

```
slides/slides.tex            the deck, 5 frames / 20 overlay pages
slides/slides.pdf            compiled, 20 pages
slides/beamer-preamble.tex   light projection-first Metropolis with the Libertinus serif,
                             inherited from the sibling deck plus one added macro
slides/img/                  EMPTY. IMAGE-SOURCES.txt names the three plates the deck wants
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

Popper wrote that loop down as a formula and spent a career arguing it is the whole method of
science. Turing said the same thing about machines that learn, in 1950, one year before Robbins and
Monro. Whewell said it in 1858 about inventive minds in general, and threw in overshooting, which is
what a step size does at 11:00.

Three witnesses, one loop, and the room has agreed with all three before a line of code is written.

**Why Popper rather than Descartes.** The sibling deck's own design spec records the objection
against itself: Descartes wants certainty by deduction from ideas so clear that doubt is impossible,
and weekend 1 offers a guess, a step that can overshoot, and a bound rather than a proof. The
Descartes deck answers by saying the inversion out loud, which is clever and is still a repair.
Popper needs no repair, because Popper's method is this weekend's method.

## Frames

| # | Frame | PDF pages | Job |
|---|---|---|---|
| 1 | Popper, 1934: conjecture and refutation | 1 to 4 | Two spoken lines of placement, the original-language slot, then "We do not know: we can only guess." Ends on the sentence |
| 2 | Popper's tetradic schema | 5 to 11 | The pinned *Conjectures and Refutations* sentence, then `P1 TT EE P2` one node per click, then the arrow that closes the loop, then Friday morning hung off each node in one wave |
| 3 | Turing, 1950: the child machine | 12 to 15 | The same loop about machines that learn, plus the sentence that is gradient descent with the words changed: learning as a search over behaviours, scored by a criterion |
| 4 | Whewell, 1858: trying wrong guesses | 16 to 19 | The same loop again, and overshooting the mark, in English, from 1858 |
| 5 | References | 20 | A handout page and a rights record. **Not part of the three minutes** |

About three minutes for frames 1 to 4.

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

## Verification, run on 2026-08-31

| Check | Result |
|---|---|
| `pdflatex` twice, exit code | 0 |
| LaTeX errors in the log | 0 |
| Overfull or underfull boxes | 0 |
| Em dashes in the rendered PDF | 0 |
| En dashes in the rendered PDF | 0 |
| Pages | 20, from 5 frames. Ratio 4.0 |
| All pages rendered and read | Yes, 20 of 20 |
| Terminal overlays read at 300 DPI | Yes, pages 4, 11, 15, 19, 20 |
| No-shift on the animated figure | Measured. The `P1` node's ink starts at the same pixel on every overlay of frame 2 that shows it |

Three defects were found by rendering and fixed: frame 2 overflowed by 24.5pt, its "Compare"
caption hyphenated as "Com-pare" inside the node, and the fix for that leaked past the picture and
pushed the source line 4.45pt off the right margin.

## What is unverified

1. **"We do not know: we can only guess" is located, not pinned.** Chapter 10, section 85, page 278
   of the 1959 English, through a secondary reference. A colon version and a semicolon version both
   circulate.
2. **The German original was not found**, so frame 1's original-language slot projects a dashed
   marker instead. Two German wordings circulate and it is not even settled whether that sentence
   has a 1934 counterpart, because Popper revised the 1959 English himself.
3. **No plate has been downloaded, opened or inspected.** All three slots project a dashed box.
4. **The Popper photograph carries an unresolved rights question.** Commons records "no known
   copyright restrictions", which is an institutional statement rather than a licence, on a
   photograph taken about 1980 of a man who died in 1994.

`SOURCES.md` has all four in full. Everything else the deck projects was pinned against a complete
primary text.

## Which of the two, and what only Carlos can decide

1. **Popper or Descartes for the 08:00 slot.** Both are built. The Descartes deck has a muted fourth
   row that returns at 16:00 in front of the Vapnik lecture, which this deck has no equivalent of.
   This deck has a text that argues for the weekend instead of against it.
2. **The Popper photograph.** Use it on the LSE statement, ask the LSE Library, or run frame 1 with
   no plate. `slides/img/IMAGE-SOURCES.txt` sets out all three.
3. **The quotation-right judgement.** Popper is protected in Switzerland until the end of 2064, and
   the deck runs on Art. 25 URG. The extent quoted here is four sentences across two frames, each
   marked and attributed. Whether that extent is justified by the purpose is his call.
4. **Whether the paraphrase lines stay** on frames 3 and 4, where the original is already English.
5. **Whether the mapping deserves its own frame.** Right now Friday hangs off the schema nodes as
   one wave inside frame 2.
6. **Whether a 16:00 return frame is built**, the way the Descartes deck returns to lift its mute.
   The natural candidate is Popper on stopping: science does not rest on bedrock, and you stop
   driving the piles when they are firm enough to carry the structure, which is the tolerance every
   Friday exercise halts on. It is not built, and its passage is in the unpinned group above.

## Anti-collision: what this artifact owns

| Idea | Owner |
|---|---|
| Popper, the tetradic schema, Turing's child machine, Whewell on guesses | **This deck** |
| The four precepts as the map of Friday, and the muted fourth row | `../cold-open-weekend1`, the Descartes deck. Do not run both at 08:00 |
| Heron, *Metrica* I.8, and the averaging update | `../hs26-bmai-w1-opt-heron`. Do not put the averaging update on an 08:00 slide |
| The genie, `Q = 1 + 1/Q`, and the step-size conditions | `../hs26-bmai-w1-opt-genie-rm` |
| Training error against test error | The 16:00 lecture |
| Course branding, dates, rooms, people | The intro and onboarding deck, which this one is pasted in front of |
