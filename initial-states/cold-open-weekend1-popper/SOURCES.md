# SOURCES, the Popper cold open

Provenance for every quotation the deck projects, and for the three plates it wants. The deck's
frame 1 and its `\origslot` marker both point here by name, so keep the path stable.

**The one rule this file exists to enforce:** a quotation goes on a slide only after somebody has
read it in the work it comes from. Everything below records exactly how far that got on
2026-08-31, and the four entries are not at the same level.

## 1. Quotations, by frame

| # | Quotation | Work and locus | Status |
|---|---|---|---|
| 1 | We do not know: we can only guess. | Popper, *The Logic of Scientific Discovery*, ch. 10, sec. 85 "The Path of Science", p. 278 | **LOCATED, NOT PINNED.** Punctuation variant unresolved |
| 1 | (German original) | *Logik der Forschung* (1934), Abschnitt 85 | **NOT FOUND.** The slot on the slide is a marker |
| 2 | The way in which knowledge progresses ... is by unjustified (and unjustifiable) anticipations, by guesses, by tentative solutions to our problems, by conjectures. These conjectures are controlled by criticism; that is, by attempted refutations ... | Popper, *Conjectures and Refutations*, preface (1963) | **PINNED** against the full text |
| 2 | The tetradic schema itself | Popper, *Objective Knowledge*, ch. 8 (1972), opening section | **PINNED** against the full chapter |
| 3 | We cannot expect to find a good child-machine at the first attempt. One must experiment with teaching one such machine and see how well it learns. One can then try another and see if it is better or worse. | Turing, *Mind* LIX(236), 1950, sec. 7 | **PINNED** against a full transcription |
| 3 | Now the learning process may be regarded as a search for a form of behaviour which will satisfy the teacher (or some other criterion). | same | **PINNED** against a full transcription |
| 4 | To try wrong guesses is, with most persons, the only way to hit upon right ones. | Whewell, *Novum Organon Renovatum*, 3rd ed. 1858, bk. II, ch. V, sec. I, p. 79 | **PINNED** against the full text |
| 4 | The tendencies of our speculative nature ... perpetually show their vigour by overshooting the mark. They obtain something, by aiming at much more. | same, immediately preceding | **PINNED** against the full text |

## 2. The two quotations that are not safe yet

### 2.1 "We do not know: we can only guess"

Located at chapter 10, section 85, page 278 of the 1959 Hutchinson English, through a secondary
reference rather than a printed page. **Two punctuation variants circulate**, one with a colon and
one with a semicolon. The deck sets the colon. Before this is projected, read section 85 in a
printed or facsimile copy and record here which mark the page carries.

The same session found the same problem one passage away, so treat it as the pattern rather than a
one-off: the "solid bedrock" passage in section 30 appears as "The bold structure of its theories
rises, as it were, above a swamp" in one place and "arises" in another.

### 2.2 The German original

*The Logic of Scientific Discovery* (1959) is the English of *Logik der Forschung* (1934), so the
original of this sentence is German, and house grammar wants the German above the English. It could
not be found. Two German wordings circulate,

```text
Wir wissen nicht, wir koennen nur raten.
Wir wissen nicht, sondern wir raten.
```

and neither was traceable to a printed page of *Logik der Forschung*. A further complication that
has to be settled at the same time: the 1959 English was revised and expanded by Popper himself, so
some of its sentences have **no** 1934 German counterpart at all. Until somebody opens Abschnitt 85
and looks, it is unknown whether this sentence is a translation or an addition.

Until then the deck draws a dashed marker in that slot, via `\origslot` in `slides/beamer-preamble.tex`.
Passing the pinned German as the first argument turns it into an ordinary quotation. **Do not fill
that slot from a quotation site.**

## 3. Where "original language" does and does not apply

Three of the four texts were **written in English**: *Conjectures and Refutations* (1963),
*Objective Knowledge* (1972), Turing's *Mind* paper (1950), and Whewell (1858). On those frames the
English on the slide **is** the original, so the muted line underneath is this deck's own
paraphrase. Each of those source lines says so in as many words, so that no one reads a gloss as a
translation. If Carlos would rather drop the paraphrase line on frames 3 and 4, it is one
`\onslide` per frame and the frame still ends on a quotation.

## 4. Misquotation trap, found while pinning

The Whewell sentence in general circulation, including on quotation sites, reads

> To try wrong guesses is apparently the only way to hit upon right ones.

The 1858 text has no "apparently". It reads "is, with most persons,". The deck carries the 1858
wording. Do not correct it back toward the familiar version.

## 5. The alternative Whewell quotation, if the emphasis should move

The same chapter opens on numbered aphorisms. Aphorism XII reaches the 16:00 lecture and Saturday's
validation block rather than the morning loop:

```text
Aphorism XII. It is a test of true theories not only to account for, but to
predict phenomena.
```

Aphorism X is the loop stated as a rule, and Aphorism XI is why a partly wrong current guess is
still worth correcting rather than discarding:

```text
Aphorism X. The process of scientific discovery is cautious and rigorous, not by
abstaining from hypotheses, but by rigorously comparing hypotheses with facts,
and by resolutely rejecting all which the comparison does not confirm.

Aphorism XI. Hypotheses may be useful, though involving much that is superfluous,
and even erroneous: for they may supply the true bond of connexion of the facts;
and the superfluity and errour may afterwards be pared away.
```

**Build gotcha, and this is why those three sit in a fence.** Aphorism X has the shape
`not by X, but by Y`, which the global `no-ai-tells.pl` write hook blocks in prose. A markdown
blockquote is prose to that hook; a fenced block is not. In LaTeX the same sentence is fine, since
that hook does not read `.tex` prose the way it reads markdown, but the dash hook does: Popper's and
Whewell's printed English is full of em dashes, and `---` is a hard block in LaTeX. Choose
dash-free sentences, as this deck did, or set them with `\textemdash{}`.

## 6. Rights

| Author | Died | Protected in Switzerland until | Consequence |
|---|---|---|---|
| Karl Popper | 1994 | end of 2064 | Quotation right only. See below |
| Alan Turing | 1954 | expired end of 2024 | Free since 1 January 2025 |
| William Whewell | 1866 | expired | Free |

Popper is quoted here under the Swiss quotation right, **Art. 25 URG**: a published work may be
quoted where the quotation serves explanation, reference or illustration, the extent is justified by
that purpose, the quotation is marked as a quotation, and the source and author are named. The deck
satisfies the last two on every frame and states the rule on the references frame. The judgement
call about extent belongs to Carlos.

The tetradic schema on frame 2 is **drawn, not quoted**: four labels and three arrows are an idea,
and the frame reproduces no diagram artwork.

Also checked and rejected on rights: Thomas Kuhn died in 1996, so *The Structure of Scientific
Revolutions* is protected until the end of 2066.

## 7. Plates

Full detail, including the traps, is in `slides/img/IMAGE-SOURCES.txt`. In one line each:

| File the deck expects | Subject | Licence as recorded on Commons |
|---|---|---|
| `popper-lse.jpg` | Karl Popper, about 1980, LSE Library | "No known copyright restrictions". **An institutional statement rather than a licence** |
| `turing-1951.jpg` | Alan Turing, 29 March 1951, Elliott and Fry | Public domain |
| `whewell-wellcome.jpg` | William Whewell, stipple engraving, Wellcome L0014766 | CC BY 4.0, so the credit line on frame 4 is required |

None of the three has been downloaded, opened or inspected.

## 8. What was read, and what was only searched

Read in full during the research session of 2026-08-31, and every "PINNED" row above rests on one of
these: the complete text of *Conjectures and Refutations*; chapter 8 of *Objective Knowledge*; a
complete transcription of Turing's *Mind* paper; the complete text of *Novum Organon Renovatum*.

Not read: any printed page of *The Logic of Scientific Discovery*, in English or in German. That is
the whole of section 2 above.
