<!-- Copied verbatim from proposals/COLD-OPEN-CANDIDATES.md on 2026-08-26, so that the menu travels
     with the built deck. The only edit is the NOT DECIDED note immediately below; every word after
     it is the original file. If the proposal is revised, re-copy it and re-apply the note. -->

> **NOT DECIDED, 2026-08-26.** There is no `DECIDED` stamp here because Carlos has not chosen. This
> file is still a menu, in the house sense: four fully worked candidates, one worked rejection, and
> a section listing what only he can settle.
>
> `slides/` in this same directory implements section 9's RECOMMENDATION, Descartes' four precepts
> with the fourth muted and the mute lifted at 16:00, as a buildable, projectable draft. Building
> the recommendation is how the menu gets a fair hearing: a deck that exists can be rehearsed,
> looked at and thrown away, and a deck that does not exist can only be argued about. **It does not
> make the recommendation the decision.**
>
> Two of the five open questions in section 12 could replace the deck outright. If the mapping
> table's rows should be the course's WEEKENDS rather than Friday's four lectures, Descartes has
> exactly four precepts and a course with five or six weekends breaks this candidate. And if Carlos
> prefers Hume, section 5 is the zero-build-risk fallback and it is the only candidate on this page
> pinned character for character with clean rights and no engine question.
>
> When a decision is made, stamp it here in the house style: a dated blockquote at the top that
> records what changed against this file's own assumptions, leaving every rejected option intact
> below. Do not delete the options that lost.

<!-- Brainstorm, 2026-08-26. Nothing here is decided: this is the menu Carlos chooses from.
     Same job and same shape as
       /Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md
       /Users/carloscotrini/Documents/git_fdd/projects/weekend-05-rag-research/carlos-lectures/rag-foundations/COLD-OPEN-CANDIDATES.md
     but for CAS BMAI HS26, weekend 1 (Friday 4 and Saturday 5 September 2026).

     Every quotation below carries a provenance line saying what was checked in this session and
     what was not. Four passages were pinned character for character against a machine-readable
     primary or near-primary text in this session; one was not, and says so in bold. -->

# Cold open for CAS BMAI HS26, weekend 1: a menu

Four fully worked candidates, one worked rejection, a recycling question that has a real answer,
and a staging section. **Nothing here is decided.** Each candidate is written so that it can be
built the same day it is chosen, and each ends on the objection most likely to be raised in the
room.

The slot is **Friday 4 September, 08:00, "Intro and onboarding"** (60 minutes, no exercise slug).
The budget assumed throughout is **three to four minutes**, which is what the built FDD opening
costs (4 frames, 14 overlay pages, about 3 minutes, per
`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/README.md`).

---

## 0. What the house pattern actually is

Read off the built decks and the written skill, in this session, with file paths.

**Weekend 1 of FDD, "The Island of Truth".** Kant, *Kritik der reinen Vernunft* A235/B294, German
above, English gloss below, beside Friedrich's *Wanderer über dem Nebelmeer*. Two clauses muted, one
alerted, and a three row legend under the quotation turning the passage into a course map.
Frame source read this session:
`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/slides.tex`,
frame 2.

**Weekend 2 recycles the identical frame with the alert moved.** Weekend 1 alerted the *Nebelbank*,
Weekend 2 the *Eis*, and the mandatory block alerts *das Land der Wahrheit* itself. The menu that
records this calls it "the most distinctive move in the house style, and it has been used exactly
once", and the built mandatory deck then used it a second time.

**The AINIT RL deck: a canonical text whose internal list is the syllabus.** Three `[plain]` frames,
three clicks, zero overlays, at
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex` lines 58 to 123, read this
session. Frame 1 is Rembrandt's *Faust* etching beside the Greek of John 1:1 and the sentence
naming five candidate senses of *logos*, of which three are alerted. Frame 2 is Stieler's Goethe
beside the whole Bayard Taylor passage. Frame 3 is nothing but a table:

```
    the Word    (das Wort)   ->   week one: observing, LLMs
    the Thought (der Sinn)   ->   week two: thinking
    the Power   (die Kraft)  ->   the false summit: raw compute      <- muted
    the Act     (die Tat)    ->   week three: acting, today
```

The muted row works by **absence of `\alert` on both cells plus one explicit `{\color{muted}}` on the
right cell**, and the colour code was taught two frames earlier on words that had no meaning yet.
Read the LaTeX before copying it: the deck puts the **English first** with the German in
`\footnotesize\itshape` muted parentheses, and the FDD menu's rendering of that table has the two
languages the other way round.

**The bandits deck: one story that opens and closes.** Borges' *Funes* as a full page epigraph at
scene 2, returning at scene 27.

**The FDD mandatory opening: Kant's three questions.** A805/B833, pinned against Project Gutenberg
ebook 6343, one question per click, the `ich` alerted, and a hinge line at the foot of the frame in
plain body text: the questions are asked of the machine instead. Then the mapping table in `es` form.

### The grammar, as rules

1. **Original language on top, English gloss under it**, source line in muted small type.
2. **One public domain plate**, framed, captioned in one line.
3. **No closing punchline.** A frame ends on its final reveal. No big centred line in the brand
   colour, ever. If a closing thought is real content, it is the last ordinary bullet, in body text.
   Verified this session at
   `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md` line 124.
   Do not define `\takeaway` in an inherited preamble; diff the preamble and strip it before writing
   a frame.
4. **A mapping table** if the text has a list in it. The table is a whole frame and carries no prose.
5. **No plot summary.** A candidate that needs background exposition before anything lands is dead.
   This killed Plato's *Phaedrus* and Cicero's Simonides in the FDD sweeps.
6. **Rights are not automatic.** The original is usually public domain, and the translation is
   usually still protected. Switzerland is 70 years *post mortem auctoris*.
7. **Dry, factual frame titles.** The deck may have a name; the frames are titled factually.
   Every bullet, caption and box label starts with a capital, and nothing is set in capitals.

### Two things the grammar does not say, which this weekend forces

**Polytonic Greek costs an engine change.** The AINIT deck required lualatex for the one Greek line
in its cold open, plus a surgical `\setmathfont{Latin Modern Math}[range={"23DE,"23DF}]` because
LibertinusMath's extensible brace glyphs break under luaotfload. Any candidate whose original is
Greek therefore buys either lualatex for the whole deck or a pre-rendered image of the line. French,
German and English cost nothing beyond the standard pdflatex preamble. This separates the four
candidates below more sharply than any aesthetic consideration does.

**Weekend 1 has nothing to recycle, by construction.** The recycling move works because the room
recognises a frame it has already seen. On the first morning of a new course nobody has seen
anything. Section 7 works this through and reaches a usable answer.

---

## 1. The argument this opening has to carry

Written before any text was chosen, with no philosophy in it. If a candidate does not carry this,
it does not matter how good the passage is.

### The day, in one line

Friday runs four lectures: **first order approximation algorithms (09:00), gradient descent (11:00),
neural networks and universal approximation (14:00), Vapnik's statistical learning theory (16:00)**.
Saturday adds PyTorch and validation.

### The premise, in one line

**You cannot write the answer down.**
`sqrt(2026)` has no decimal you can produce by thinking about it. The genie's number is defined by an
equation that contains itself. The slope `w` that best fits a table of house prices is defined by the
table, and the table does not tell you the number. A neural network's weights have no formula at all.

### The loop, in four lines

1. Guess.
2. Check the guess against something you actually can compute: the square, the right hand side of the
   equation, the prediction, the loss.
3. The check returns a **signed** discrepancy. The sign says which way. The size says roughly how far.
4. Do it again.

**That loop is the whole morning.** Heron, the genie and gradient descent are one idea in three
costumes. Carlos's own handwritten page 1 gives Heron and the genie the same five column table on
purpose: `theta`, a computed check, a verdict, an update. The correction is the learning.

### The two facts about the loop that are not obvious, and are the actual content

- **The step has to shrink, and it has to shrink at the right rate.** A step that never shrinks
  orbits the answer forever. A step that shrinks too fast stops short of it and stays there. The
  AINIT deck already prints both conditions on one slide, in words: the steps summed must be
  `unbounded (can travel from any start)`, their squares summed must be
  `finite (the noise eventually cancels)`, and `alpha_n = 1/n satisfies both demands`.
- **The loop can be run one coordinate at a time.** Carlos's handwritten stage 5: "Each grasshopper
  only needs to work on its own dimension." Every partial derivative is evaluated at the same old
  `w`, each update writes one coordinate, so the `d` updates are independent and the whole thing
  parallelises.

### The afternoon asks a different question

The loop only ever saw the data it was given. It drove the error on that data down. **Nobody paid
for the error on that data.** The question at 16:00 is when a rule fitted by correction on a sample
is entitled to hold on cases nobody has seen, and Vapnik's answer is a price rather than a promise.

### The two lines the opening has to earn

> **Every algorithm on Friday is the same loop: guess, check, correct.**
>
> **Friday afternoon is about what that loop is entitled to claim.**

Everything below is a way of earning those two sentences in three minutes.

---

## 2. Candidate 1: Heron of Alexandria, *Metrica* I.8

The algorithm at 10:00, in the words of the man it is named after. This is Act 1 of Carlos's
handwritten lesson plan quoting itself.

### Slide text

English body, at the length it would appear (Heath's wording, see the provenance warning below):

> Since 720 has not a rational square root, we shall make a close approximation to the root in this
> manner. Since the square nearest to 720 is 729, having a root 27, divide 27 into 720; this gives
> 26 2/3; add 27; this gives 53 2/3. Take half of this; this gives 26 5/6. Therefore the square root
> of 720 will be very nearly 26 5/6. For 26 5/6 multiplied by itself gives 720 1/36; so that the
> difference is 1/36. If we wish to make the difference still less, we shall take 720 1/36 instead
> of 729, and by the same method we shall find a difference much less than 1/36.
>
> Heron of Alexandria, *Metrica* I.8, first century

The Greek ornament, one line, never read aloud, is the clause that carries the whole thing: **that
720 has no rational side.** The exact Greek is a verification debt (below).

### Locus

*Metrica*, Book I, proposition 8: the general rule for the area of a triangle from its three sides,
worked on the sides 7, 8, 9, giving `12 * 5 * 4 * 3 = 720` and then the square root of 720.

### Provenance

- **Verified in this session.** The whole passage in Hermann Schöne's Teubner edition, *Heronis
  Alexandrini opera quae supersunt omnia*, vol. III (Leipzig, 1903), Greek on the even pages with a
  facing German translation on the odd ones. The plain text of the Internet Archive copy
  `heronisalexandri03hero` was downloaded and read: proposition VIII begins on German page 19, and
  the square root passage runs to German page 21, so **the Greek sits on printed pages 18 and 20**.
  Schöne's German reads, verbatim from that scan: *"Da nun 720 eine rationale Wurzel nicht besitzt,
  so werden wir mit kleinster Differenz die Wurzel folgendermafsen ziehen."*
- **Verified in this session.** Henry Mendel's English of the same proposition, at
  `web.calstatela.edu/faculty/hmendel/Ancient Mathematics/HeroAlexandrinus/Metrica.i.1-9/`, reads
  *"And so, since 720 do not have its side as rational, we will take the side with a least difference
  in this way."* Mendel is a living scholar and his translation is in copyright; it is quoted here as
  evidence about the passage rather than as slide text.
- **NOT verified: the Greek itself.** The Internet Archive OCR of the 1903 Teubner contains **zero
  Greek characters** (checked with a codepoint count: the OCR engine read the Greek font as Latin
  and produced garbage such as `Eoti udoLov Ag`). The Greek is absent from Perseus as well: the
  canonical Perseus repository has no `tlg031`, the *Physics* and the *Metrica* both being missing.
  **The Greek line must be transcribed by eye from the page images of `heronisalexandri03hero`,
  pages 18 and 20, before it is projected.**
- **NOT verified: the Heath wording quoted above.** Two different Heath wordings circulate and both
  were seen this session. The widely reproduced one is the block above. MacTutor, crediting Heath,
  prints instead *"Since 720 has not its side [rational], we can obtain its side within a very small
  difference as follows"*. Heath's *A History of Greek Mathematics*, vol. II (Oxford: Clarendon,
  1921) was not obtainable in full text this session (three Internet Archive identifiers tried, all
  404 or 503). **Pin the wording against the printed page or replace it with Carlos's own English.**
- **Verified by computation in this session.** Every number in the passage is exact:
  `720/27 = 80/3 = 26 2/3`; `80/3 + 27 = 161/3 = 53 2/3`; half is `161/6 = 26 5/6`;
  `(161/6)^2 = 25921/36 = 720 + 1/36` exactly. One further application gives `51841/1932`, whose
  square misses 720 by about `2.7e-7`.
- **Reported rather than verified.** That the *Metrica* was found in Constantinople in 1896 by R.
  Schöne comes from search results, and no source read this session says it.

### Rights

- **The Greek is public domain.** Heron, first century.
- **Schöne's 1903 German is a translation and its status was not checked.** Hermann Schöne's death
  year was not established in this session. Do not put "public domain" beside it.
- **Heath's English is public domain in Switzerland.** Sir Thomas Little Heath died **16 March 1940**
  (verified this session), so 70 years *post mortem auctoris* expired on 31 December 2010. Heath is
  therefore the one free English on the table, which makes pinning his exact wording worth the
  half hour.
- **Mendel's English is in copyright.** Keep it off the slide.

### The plate

There is no portrait of Heron, and the *Metrica* manuscript (Codex Constantinopolitanus) has no
Commons image that this pass could find. **Use the printed page itself.** Project page 20 of Schöne
1903 from `https://archive.org/details/heronisalexandri03hero`, framed, captioned in one line. A
1903 Teubner page is public domain by age, it needs no engine change because the Greek arrives as an
image, and projecting the printed page is the strongest provenance gesture available. The leaf number
inside the Internet Archive reader was not determined this session; the printed page numbers were.

Commons alternatives, all of them of **other** works by Heron and therefore wrong for this frame:
`File:Hero of Alexandria, Pneumatica, Venice, Gr. 516.jpg`,
`File:Hero of Alexandria, Automata, Venice, Gr. 516.jpg`,
`File:Hero of Alexandria, Belopoiika, Paris, Graec. 2442.jpg`.

### Frames

- **F1, "Heron of Alexandria, first century: the area of a triangle".** One spoken sentence of
  placement (an engineer in Roman Alexandria, writing a surveying manual). The arithmetic only:
  sides 7, 8, 9, then `12`, `5`, `4`, `3`, then `720`. Four clicks, one number each. No plate.
- **F2, "Since 720 has not a rational square root".** The printed page framed on the left; the
  English on the right, revealed in three clicks: the refusal, the recipe, the repetition. The
  source line under the plate in muted small type. This frame ends on the word "again".
- **F3, "The same five columns".** The mapping table alone, no prose, no title beyond the factual
  one, four clicks.

Overlay pacing: about 4 plus 4 plus 5 pages over 3 frames. Roughly two and a half minutes.

### The mapping

Onto Carlos's own five column table from handwritten page 1 (`theta`, `theta^2`,
`2026 - theta^2`, verdict, update):

| Heron's paragraph | Friday morning |
|---|---|
| The side of 720 | `theta`, the number nobody can write down |
| *A rational side* | *(muted) the closed form, which is unavailable* |
| The nearest square, 729, whose side is 27 | The first guess, `theta = 45` |
| 26 5/6 multiplied by itself gives 720 1/36 | `theta^2`, the check |
| The difference is 1/36 | `2026 - theta^2`, the loss |
| By the same method, a difference much less | The update, and the next row |

**One row should be muted, and it is row 2.** Heron names a rational side and immediately says 720
has none. That is exactly the Faust device: a term the text offers and then walks away from, and the
course walks away from it too, for the whole weekend. It earns the mute better than any other row on
this page, because the refusal of the closed form is the premise of the entire day rather than a
decoration.

### Why it lands, and what kills it

**It lands** because the room implements this paragraph ninety minutes later and knows it. Nobody
has to be told the opening is relevant. It also gives the audience a fact they can carry to dinner:
the thing they are about to do to a neural network was done to a triangle in Roman Egypt.

**Three things kill it, and the third is close to fatal.**

1. It opens the day on the morning only. It says nothing about neural networks and nothing about
   Vapnik, so the 14:00 and 16:00 lectures arrive unannounced. An opening whose reach is one lecture
   is an introduction to an exercise.
2. Greek costs lualatex or an image. The image route is fine and is recommended above, at the price
   of a frame that carries a photograph of a page where the Kant and Faust frames carry set type.
3. **Heron's update is second order.** `theta <- (theta + a/theta)/2` is Newton's method applied to
   `x^2 - a`; it doubles the correct digits every step, and the verified digit sequence from
   `theta = 45` is 3, 6, 14, 30, 61 (from `proposals/viz-heron.md`, computed there with `Decimal`).
   The 09:00 lecture is titled **first order** approximation algorithms. Any numerically literate
   participant can point this out, and more importantly **Carlos's own handwritten table leaves the
   averaging update out**: the Update column carries only a left arrow and a right arrow, which gives
   the direction and withholds the distance. Putting Heron's averaging step on a slide at 08:00 would
   pre-empt, and possibly contradict, a design decision that the 10:00 exercise appears to have made
   deliberately. **Check with Carlos before building this one.**

### The strongest objection

The passage is a worked calculation rather than an argument, and it has no list in it. The mapping
table above is real, and what it maps the paragraph onto is a table Carlos drew, which means the
frame is telling the room about the course's own materials rather than about the world. Faust and
Kant both work because the text was written by somebody with no stake in the syllabus. Heron has a
stake: he is on the syllabus.

---

## 3. Candidate 2: Descartes, *Discours de la methode*, seconde partie

Four numbered rules, in the text, in the author's own hand. Friday has four lectures. Three of the
rules a learning machine can obey, and the fourth is the reason the fourth lecture exists.

### Slide text

French above, English gloss below, the four precepts one per click. Verified verbatim in this
session (see provenance):

> Le premier était de ne recevoir jamais aucune chose pour vraie, que je ne la connusse évidemment
> être telle.
>
> Le second, de diviser chacune des difficultés que j'examinerais, en autant de parcelles qu'il se
> pourrait, et qu'il serait requis pour les mieux résoudre.
>
> Le troisième, de conduire par ordre mes pensées, en commençant par les objets les plus simples et
> les plus aisés à connaître, pour monter peu à peu, comme par degrés, jusques à la connaissance des
> plus composés.
>
> Et le dernier, de faire partout des dénombrements si entiers, et des revues si générales, que je
> fusse assuré de ne rien omettre.
>
> René Descartes, *Discours de la methode*, seconde partie (1637)

English gloss, in muted type under each:

> The first: never to accept anything as true that I did not evidently know to be such.
>
> The second: to divide each of the difficulties I was examining into as many parts as I could, and
> as would be required to resolve them better.
>
> The third: to conduct my thoughts in order, beginning with the objects that are simplest and
> easiest to know, and climbing little by little, as by degrees, to the knowledge of the most
> composite.
>
> And the last: everywhere to make enumerations so complete, and reviews so general, that I could be
> assured of omitting nothing.

The full first precept continues past what is quoted above with *"c'est-à-dire, d'éviter
soigneusement la précipitation et la prévention"*. That clause is worth having in reserve and is
discussed under the objections.

### Locus

*Discours de la methode pour bien conduire sa raison et chercher la vérité dans les sciences* (Leyde:
Ian Maire, 1637), **seconde partie**, the four precepts, immediately after the sentence
*"je crus que j'aurais assez des quatre suivants"*. The conventional Adam and Tannery reference is
AT VI, 18 to 19; **that page reference was not confirmed in this session** (the PDF used carries only
one AT marker, at VI, 1).

### Provenance

- **Pinned character for character in this session** against the modernised critical text at
  `https://philo-labo.fr/fichiers/Descartes - Discours de la methode (A.T).pdf`, downloaded and
  converted with `pdftotext -layout`. The four precepts were extracted as one contiguous string and
  checked: it contains no dashes and no characters outside the accented Latin set
  (`à ç è é ê î`), so it can go on a slide unaltered.
- **Orthography trap, flagged rather than resolved.** The text above is in **modernised** spelling.
  The 1637 first edition prints *ie* for *je*, long *s*, *estoit*, *connoistre* and so on. This is
  the same trap the FDD Kant pass hit with *tun* against *thun*. Pick one convention, say which
  edition it comes from in the source line, and stay in it. If Carlos wants the 1637 orthography,
  the Gallica scan of the Ian Maire printing is the place to pin it, and that was **not** done here.
- The continuation *"Ces longues chaînes de raisons, toutes simples et faciles, dont les géomètres
  ont coutume de se servir"* sits immediately after the fourth precept and was read in the same file.

### Rights

- **The French is public domain.** Descartes died 1650.
- **The gloss must be chosen deliberately.** Two clean options.
  - **John Veitch, 1850.** Veitch died 1894, so his English is public domain everywhere with no
    argument. His wording was **not** pinned in this session.
  - **Carlos's own English, labelled as such on the slide**, which is what the built FDD deck does
    for Kant and owes nobody anything. The gloss above is a working draft written for this file and
    should be treated as a draft.
- **Haldane and Ross (1911) is a trap.** It is a joint work, so Swiss protection runs 70 years from
  the death of the last surviving translator, and neither death year was established here. Avoid
  reaching for it merely because it is the familiar one.

### The plate

**Frans Hals, *Portrait of René Descartes*, 1649.** Verified on Commons in this session: artist Frans
Hals, date 1649, licence "Public domain", 2178 x 2958 pixels, credited to RKD image 181019.

https://commons.wikimedia.org/wiki/File%3AFrans_Hals%2C_Portrait_of_Ren%C3%A9_Descartes.jpg

Open and inspect it before promising it. Commons carries at least six variants under similar names
(a Statens Museum for Kunst version, a "cleaned up" version, a "digitally modified derivative"), and
the attribution history of the Hals Descartes portraits is contested in the art literature. Caption
it in one line and make no claim about which museum holds which.

### Frames

- **F1, "Descartes, 1637: four rules of method".** The Hals portrait framed on the left, captioned in
  one line. On the right, two sentences of placement, spoken rather than projected: a man who
  distrusted everything he had been taught, writing down the smallest set of rules he thought he
  could get somewhere with. Static frame, one page.
- **F2, "The four precepts".** French above, muted gloss below, **one precept per click**, four
  clicks. The frame ends on the fourth precept. Five overlay pages.
- **F3, "Friday, read against the four precepts".** The mapping table alone. No prose, no closing
  line. Four clicks, one row each. Five overlay pages.

Total: 3 frames, about 11 overlay pages, a ratio near 3.7, just under the skill's 4 to 6 calibration
band, which is correct for an opening whose frames are quotations. **About three minutes.**

Then **one frame at 16:00**, at the front of the statistical learning theory lecture, which is where
this candidate stops being a cold open and becomes structure. See section 7.

### The mapping

| Precept | Friday |
|---|---|
| 1. Accept nothing you do not evidently know | **09:00, first order approximation algorithms.** Every guess is squared, every prediction is compared. Nothing is believed because it looks right |
| 2. Divide each difficulty into as many parts as possible | **11:00, gradient descent.** One coordinate at a time. Each grasshopper works on its own dimension |
| 3. Begin with the simplest, climb by degrees to the most composite | **14:00, neural networks and universal approximation.** One unit, one bend, composed until the shape is anything you like |
| *4. Make enumerations so complete that nothing is omitted* | *(muted) the one precept a learning machine cannot obey* |

**Row 4 is muted, and this is the whole reason to choose this candidate.** Descartes' fourth rule is
to check everything. A model is fitted on the cases you happened to collect and is then sold to
customers who bring cases nobody collected. The fourth precept is unavailable, permanently, and every
single thing in the 16:00 lecture is what you do instead of obeying it.

**And then the mute is lifted.** At 16:00 the same table returns with rows 1 to 3 muted and row 4
alerted, and the line under it is that the lecture about to start is the price of the precept the
morning could not obey. That is the Kant recycling move (the alert moves, the frame stays) performed
**inside one day** rather than across three weekends, and it costs one extra frame.

### Why it lands for managers with little formal mathematics

Nobody has to be told who Descartes is, and nobody has to be told anything about his philosophy: the
frame quotes four rules of procedure, which is a register working professionals live in. There is no
myth, no character, no plot, and therefore no exposition. The four rules are also, on their face,
good advice, so the room agrees with all four before it is shown that one of them is impossible.
Being shown that a rule you just agreed with cannot be followed is a much better first three minutes
than being told a fact, and it gives the onboarding block the right shape: an invitation.

### The failure modes that kill it

1. **Row 1 is the softest row.** "Accept nothing you do not evidently know" reads as a general
   epistemic caution rather than as the 09:00 lecture. The repair is to make the frame's spoken line
   concrete: the morning's whole method is that a guess is never accepted, it is squared and
   compared. If that line does not land in rehearsal, the honest fix is to drop to a three row table
   (precepts 2, 3 and 4 against 11:00, 14:00 and 16:00) and let the 09:00 lecture live under the
   premise line instead of in the table.
2. **It can slide into management cliché.** "Break the problem into pieces" is a consulting slogan,
   and row 2 is one careless sentence away from being one. The defence is the technical content:
   row 2 is a claim about parallelism, that each coordinate update reads all of `w` and writes only
   `w_j`, which is why the work splits at all. Say that, and the row is engineering rather than
   sloganeering.
3. **Four precepts against four lectures is suspiciously neat**, and a room that senses a
   coincidence has been manufactured stops trusting the frame. The mitigation is that the table is
   revealed one row at a time and the fourth row does not fit, which is the opposite of neat.

### The strongest objection

**Descartes' method and this weekend's method are opposites.** He is after certainty, by deduction,
from ideas so clear that doubt is impossible. Weekend 1 offers no certainty, no deduction, a guess to
start with, and a bound rather than a proof at the end. A philosopher in the room can say that the
mapping inverts its own source, and would be right.

There are two answers and only the second is honest enough to use.

- The weak answer: the frame quotes rules of procedure and makes no claim about Cartesian
  epistemology. True, and it sounds like a lawyer.
- The answer to use: **say the inversion out loud, because it is the content.** Descartes' first
  precept names its two enemies as *la précipitation et la prévention*, haste and prejudgement. The
  algorithm taught at 09:00 begins with a prejudgement (`theta = 45`, chosen because it is close) and
  proceeds in haste (a step that may overshoot), and the entire art of the morning is choosing how
  much haste. A method built out of the two things Descartes forbids, which nevertheless arrives, is
  a better opening claim than a method that agrees with him. This costs one spoken sentence and no
  extra frame, and it should be rehearsed before it is trusted.

---

## 4. Candidate 3: Aristotle on Zeno's first argument, *Physics* VI.9

The sharpest single piece of mathematics available in a cold open anywhere in this course, and the
one that turns the room's objection into the payload.

### Slide text

English body, verified verbatim in this session:

> Zeno's arguments about motion, which cause so much disquietude to those who try to solve the
> problems that they present, are four in number. The first asserts the non-existence of motion on
> the ground that that which is in locomotion must arrive at the half-way stage before it arrives at
> the goal.
>
> Aristotle, *Physics* VI.9, 239b11, trans. R. P. Hardie and R. K. Gaye (1930)

The Greek ornament, one line, is the clause *that which is in locomotion must arrive at the half-way
stage before the goal*. **The Greek was not obtained in this session** (see provenance) and is a
verification debt.

### Locus

*Physics*, Book VI (Zeta), chapter 9, Bekker 239b11 to 239b13, the first of the four arguments,
conventionally the Dichotomy. Aristotle's own answer is earlier, at VI.2, 233a21 following, and again
at VIII.8, 263a4 following, so the frame should stop at 239b13 and let the room supply the objection.

### Provenance

- **Pinned character for character in this session** against the Hardie and Gaye text served by the
  Logos Virtual Library at `http://www.logoslibrary.org/aristotle/physics/609.html`, downloaded and
  read. The English above is that text verbatim, including "half-way stage".
- **Corroborated.** Independent search results attribute the same wording to Hardie and Gaye (1930)
  and place it at 239b11.
- **NOT verified: the Greek.** The Perseus canonical Greek repository does **not** carry the
  *Physics* (checked this session: `data/tlg0086` contains `tlg003, tlg009, tlg010, tlg025, tlg029,
  tlg034, tlg035, tlg038, tlg045`, and `tlg031` is absent). The Greek must be pinned against Ross's
  Oxford Classical Text of the *Physics* or the Bekker Prussian Academy edition of 1831, page 239b,
  before it is projected.
- **NOT verified: the death years of the translators.** R. P. Hardie and R. K. Gaye are commonly
  given as dying in 1942 and 1909 respectively, which would put their joint 1930 translation into
  the Swiss public domain at the end of 2012. **Neither date was checked in this session.** Until it
  is, either check it or use Carlos's own English of a passage that is one sentence long.

### Rights

- **The Greek is public domain.** Aristotle, fourth century BCE.
- **The Hardie and Gaye English is probably public domain in Switzerland, and this was not
  confirmed.** See above. Since the quotable part is a single sentence, Carlos's own English removes
  the question entirely and costs nothing.

### The plate

There is no portrait of Zeno of Elea and no image of the argument. Two options, and a trap.

- **Pellegrino Tibaldi (or Bartolomé Carducho), *Zeno of Elea shows Youths the Doors to Truth and
  Falsity*, El Escorial library, between 1588 and 1595.** Verified on Commons in this session:
  licence "Public domain", artist recorded as "Pellegrini Tiballdi", dated 1588 to 1595, described
  as *Zeno of Elea shows Youths the Doors to Truth and False (Veritas et Falsitas)*.
  https://commons.wikimedia.org/wiki/File%3AZeno_of_Elea_Tibaldi_or_Carducci_Escorial.jpg
  The attribution is contested, which the Commons filename itself records. Caption it as El Escorial,
  late sixteenth century, and name no painter.
- **No plate at all**, and a TikZ step ladder instead: a row of jumps each half the last, with the
  total marked. This is the better frame, because the diagram is the argument.

**The trap.** Most Commons images filed under "Zeno" show **Zeno of Citium**, the Stoic, a different
man three generations later. Open every candidate file and read its description before promising it.

### Frames

- **F1, "Aristotle on Zeno: the first argument".** The sentence, two clicks. Optionally the Escorial
  plate, framed, captioned in one line.
- **F2, "Halving".** No quotation. A step ladder drawn in TikZ: first jump `c`, then `c/2`, then
  `c/4`, with the accumulating total shown beside it and converging visibly on `2c`. Five clicks.
  The last click writes `2c` and stops. **The frame ends there**, and the room says the next thing
  out loud.
- **F3, "Two demands on the step".** The two Robbins-Monro conditions, in the AINIT deck's own
  English, one per click, and `alpha_n = 1/n` on the third.

### The mapping

| Aristotle's report of Zeno | Weekend 1 |
|---|---|
| Must arrive at the half-way stage before the goal | The step that shrinks |
| Halving, then halving again | A step schedule whose total is finite |
| *Therefore motion is impossible* | *(muted) the conclusion the course refuses* |
| A step schedule that can travel from any start | `alpha_1 + alpha_2 + alpha_3 + ...` unbounded |
| A step schedule whose noise cancels | `alpha_1^2 + alpha_2^2 + alpha_3^2 + ...` finite |

**Row 3 is the muted one, and it is exactly the die Kraft shape.** Zeno offers a conclusion, the
course declines it, and the declining is the content: the steps do have to shrink, and halving fails
because its total is finite, with slowness having nothing to do with it. **This is a real theorem
rather than an analogy.** Steps `c/2^n` sum to `2c`, so a schedule that halves cannot move the
estimate further than twice its first step, whatever the answer is. Steps `1/n` sum to infinity, so
they can reach anything, and their squares sum to `pi^2/6`, so the noise still cancels. Both sums
were computed in this session. The AINIT deck already glosses the first condition, on the slide, as
`can travel from any start`, which is Zeno's dichotomy stated in the course's own words by somebody
who was thinking about something else.

### Why it lands, and what kills it

**It lands** because the objection every quantitative person in the room is waiting to make ("but the
halves add up to one, so of course he arrives") **is the answer**. The frame hands the room its own
smartest thought and then shows that the thought is the theorem. For an audience of professionals
who suspect that a philosophy slide is decoration, converting their scepticism into the payload in
ninety seconds is worth a great deal.

**Three things kill it.**

1. **It covers one of the two non-obvious facts and nothing else.** No coordinates, no networks, no
   Vapnik. As an opening for the whole weekend it is a fragment.
2. **It is a bad first note.** The first thing a new cohort hears at 08:00 on day one of a CAS is a
   philosopher proving you can never get anywhere. The mute repairs it in ninety seconds, and ninety
   seconds is a long time to leave a room in that position.
3. **Greek again means lualatex or an image**, and here there is no printed page worth projecting.

### The strongest objection

**Zeno's dichotomy is about dividing a fixed distance, and a step schedule is about choosing step
lengths.** They agree in arithmetic and differ in what is doing the choosing: Zeno's halves are forced
by the geometry of the interval, while `alpha_n` is a knob the engineer turns. A careful listener can
say that the frame borrows the sum and drops the argument. The repair is to claim only the sum, in
one sentence, and to claim it as a warning rather than as a derivation: a step rule that halves has a
finite budget, and a finite budget cannot reach an answer that lies outside it. That claim is true,
it is checkable in three lines of arithmetic, and it survives whatever one thinks about motion.

---

## 5. Candidate 4: Hume, *An Enquiry Concerning Human Understanding*, Section IV, Part II

The model and reality gap, for the 16:00 block. This is the text Vapnik is answering, and it is the
only candidate on this page written in English with no translation layer at all.

### Slide text

Verbatim, verified in this session, at the length it would appear:

> The bread, which I formerly eat, nourished me; that is, a body of such sensible qualities was, at
> that time, endued with such secret powers: but does it follow, that other bread must also nourish
> me at another time, and that like sensible qualities must always be attended with like secret
> powers?

and, on the next click, the two propositions, which are the whole frame:

> These two propositions are far from being the same, *I have found that such an object has always
> been attended with such an effect*, and *I foresee, that other objects, which are, in appearance,
> similar, will be attended with similar effects*.
>
> David Hume, *An Enquiry Concerning Human Understanding* (1748), Section IV, Part II

The italics are Hume's own, as printed in the source used.

### Locus

Section IV, *Sceptical Doubts concerning the Operations of the Understanding*, **Part II**,
**paragraph 29** in the Selby-Bigge numbering. Verified this session by walking the section and part
headings and the numbered paragraphs of the source text: `SECTION IV` at line 701 of the file,
`PART II` at line 922, paragraph `29.` at line 933, and the bread passage at line 980.

### Provenance

- **Pinned character for character in this session** against Project Gutenberg ebook **9662**, *An
  Enquiry Concerning Human Understanding*, David Hume, edited by Sir L. A. Selby-Bigge. Downloaded
  and read. Both quoted blocks above are that text verbatim, including the spelling "eat" for the
  past tense and "endued".
- The Gutenberg text is Selby-Bigge's edition. Anyone checking against the Beauchamp or the Norton
  numbering will find this passage cited as EHU 4.16 and as SBN 33 to 34. **Neither of those two
  cross references was checked here**; the Selby-Bigge paragraph number 29 was.

### Rights

- **Public domain, with no translation layer.** Hume died 1776, the text is English, and the frame
  needs no gloss, no foreign script and no engine change. This is the cleanest rights position of the
  four candidates by a wide margin.
- The consequence for the house grammar is that **rule 1 does not apply**: there is no original
  above a gloss, because the original is already in the room's working language. The FDD sweeps
  accepted exactly this for Putnam and for Swift. It does cost the bilingual device, which is part of
  what makes the Kant and Faust frames feel like the house.

### The plate

**Allan Ramsay, *David Hume, 1711 to 1776. Historian and philosopher*, 1766.** Verified on Commons in
this session: artist Allan Ramsay, date 1766, licence "Public domain", 3365 x 4001 pixels.

https://commons.wikimedia.org/wiki/File%3AAllan_Ramsay_-_David_Hume%2C_1711_-_1776._Historian_and_philosopher_-_Google_Art_Project.jpg

National Galleries of Scotland hold the painting and Commons carries several scans of it under
near-identical names with different accession numbers (PG 1057, PG 3521). Pick one, record the
accession number in `slides/img/IMAGE-SOURCES.txt`, and open it before promising it.

### Frames

- **F1, "Hume, 1748: the bread".** The Ramsay portrait framed on the left, captioned in one line. The
  bread sentence on the right, two clicks.
- **F2, "Two propositions".** The two propositions alone, one per click, with the second one set so
  that *I have found* and *I foresee* are the only alerted words on the frame. This is the frame the
  candidate exists for.
- **F3, "What a bound buys".** The mapping table, four rows, no prose.

### The mapping

| Hume | Weekend 1 |
|---|---|
| *I have found that such an object has always been attended with such an effect* | The training error. What the correcting loop actually measured |
| *I foresee that other objects, which are in appearance similar, will be attended with similar effects* | The test error. What the customer actually gets |
| There is required a medium, which may enable the mind to draw such an inference | The generalisation bound: what the gap costs |
| *Custom, or habit* | *(muted) "it has always worked", the answer the course refuses* |

**Row 4 is the muted one, and it is Hume's own resolution**, from Section V of the same *Enquiry*.
Hume's answer to his own problem is that we make the inference from custom rather than from reason.
The course refuses that answer, because putting a number on the gap is precisely the difference
between an engineering discipline and a habit. **Note that the mute must be honest about what it
mutes:** Section V was not re-read in this session, and the phrase *Custom, or habit* should be pinned
before it goes on a slide.

### Why it lands, and what kills it

**It lands** because *I have found* against *I foresee* is the single cleanest statement of training
error against test error ever written, it is 278 years old, and it fits on one line each. A manager
who has ever signed off on a pilot that worked and a rollout that did not already owns this
distinction, and Hume gives them the words for it.

**What kills it as the 08:00 opener** is the register. Opening a professional certificate course by
telling the room that inductive inference has no rational foundation is a heavy first three minutes,
and it says nothing at all about the morning's loop. This is a 16:00 text.

### The strongest objection

**Vapnik does not answer Hume, and a careful person in the room will say so.** A generalisation bound
is conditional on the sample being drawn independently from the same distribution as the future,
which is Hume's supposition of resemblance restated in probability. The bound prices the inference
given the assumption. Licensing the assumption is beyond it.

Do not paper over this: **make it the content**. Weekend 1's honest claim is that the assumption
cannot be removed, that it can be written down explicitly, and that once it is written down a number
follows from it. That is a genuinely useful thing to tell people who will be signing off on
deployments, and it is a much better sentence than any triumphal reading. If the frame is built to
claim that statistical learning theory solves the problem of induction, the frame is wrong and will
be corrected from the third row.

---

## 6. Comparison table

| Candidate | Job it does | Frames and time | Engine cost | Verification verdict | Pick this if ... |
|---|---|---|---|---|---|
| Heron, *Metrica* I.8 | The loop, in the words of the man on the 10:00 exercise | 3 frames, about 2.5 min | Greek: an image of the 1903 page, or lualatex | **Passage located and arithmetic verified. The Greek and the Heath wording are both unpinned** | ... you want the opening and the first exercise to be the same object, and Carlos is happy to show the averaging update at 08:00 |
| Descartes, *Discours* II | The whole of Friday, with the fourth lecture as a muted row that is later un-muted | 3 frames plus 1 at 16:00, about 3 min | None. pdflatex sets French | **Pinned character for character. The AT page reference is unconfirmed** | ... you want one frame to carry all four lectures and to set up a recycling move inside the day |
| Aristotle on Zeno, *Physics* VI.9 | The step size, as a theorem rather than as an image | 3 frames, about 2.5 min | Greek: lualatex or a pre-rendered line | **English pinned. Greek unpinned. Translator death dates unchecked** | ... you want the room's own objection to be the punchline and are willing to open on "you can never arrive" |
| Hume, *Enquiry* IV.ii | Training error against test error, for the 16:00 lecture | 3 frames, about 2.5 min | None. English original | **Pinned character for character, locus walked** | ... you want the sharpest sentence on the page and are placing it at 16:00 rather than at 08:00 |

---

## 7. The recycling question, answered

The brief asks whether weekend 1 should recycle an existing frame with the alert moved. Here is the
honest answer, in three parts.

**Weekend 1 cannot recycle, because nothing precedes it.** The move works on recognition. Weekend 2
of FDD reused Weekend 1's frame and the room felt it. The mandatory block reused it a third time and
the built deck's own comment says so: *"The room has seen this image before, and recognising it is
free."* On the first morning of HS26 nobody has seen anything, so a recycled frame delivers the
aesthetic and none of the payload.

**Recycling across courses is available and should be declined.** Carlos could lift the Faust frames
from `git_ainit/rl-arcade/slides/rl-slides.tex` or the Kant frames from
`git_fdd/projects/mandatory-weekends-opening/slides/slides.tex`. Both are built, both are his, and
both would compile in an evening. The reasons to decline are that no BMAI participant has seen
either, so the callback is invisible; that Faust's four words are already spent on a syllabus with
three weeks and a false summit, and re-spending them on a different syllabus in the same season means
one of the two mappings is wrong; and that a third Kant outing in a fourth course starts to look like
a house tic rather than a house style.

**What weekend 1 should do instead is build the recyclable frame.** That is the choosing criterion,
and it is why section 3 is the recommendation. A cold open that produces a mapping table with more
rows than the current session needs is an asset for every later session; a cold open that produces
one perfect frame is an expense. Two ways to build for it, and the first is available now:

- **Recycle inside the day.** Descartes' fourth precept is muted at 08:00 and alerted at 16:00, at
  the front of the statistical learning theory lecture, with rows 1 to 3 muted. One extra frame,
  no new asset, and the room recognises it four hours later on the same day it first saw it. This is
  the Kant move at one tenth the calendar scale, and it is the only version of the move that a first
  weekend can actually perform.
- **Recycle across weekends, which needs information this file does not have.** If the table's rows
  are to be the course's weekends rather than Friday's lectures, somebody has to know what weekends 2
  and onwards are. `docs/master-schedule-weekend1.csv` and the repository root `CLAUDE.md` carry
  weekend 1 only. **This is an open question for Carlos and it changes the mapping table.**

A paste-ready 16:00 frame, in the shape the FDD README uses for its recycling snippets:

```latex
% ==== Friday 16:00, in front of the statistical learning theory lecture ====
\begin{frame}{The fourth precept}
  \vfill
  \centering
  {\large
  \renewcommand{\arraystretch}{2.0}%
  \begin{tabular}{r@{\enskip$\rightarrow$\enskip}l}
    {\color{muted}Ne recevoir jamais aucune chose pour vraie \ldots} & {\color{muted}09:00}\\
    {\color{muted}Diviser chacune des difficult\'es \ldots}          & {\color{muted}11:00}\\
    {\color{muted}Commencer par les objets les plus simples \ldots}  & {\color{muted}14:00}\\
    \alert{Des d\'enombrements si entiers \ldots}                    & \alert{now}\\
  \end{tabular}}

  \vspace{6mm}
  {\footnotesize\hspace*{0.2cm}This morning we could obey three of them. This hour is about the
   fourth.}
\end{frame}
```

The closing line is plain body text at the foot of the frame, per rule 3. Keep it out of an amber
rule and out of the brand colour.

---

## 8. How they compose

These four can be combined, and the best use of the material puts more than one of them to work.

**The recommended thread: two texts, four frames plus one.**

1. **Open the day with Descartes**, three frames, about three minutes, at 08:00 inside the intro and
   onboarding block. It maps all four Friday lectures and mutes the fourth.
2. **Lift the mute at 16:00**, one frame, at the front of the statistical learning theory lecture.
3. **Spend Hume inside that 16:00 lecture**, one frame, after the mute is lifted rather than before.
   *I have found* against *I foresee* is the definition of the gap the lecture is about to bound, and
   it lands much harder at minute five of a lecture on generalisation than it would at minute two of
   a course. This is the same displacement the FDD RAG menu recommends for Putnam.

**Heron belongs at 09:00, spoken, without a frame.** The 09:00 lecture opens on the first order
approximation algorithms and the 10:00 exercise is Heron by name. One sentence at the top of that
lecture, that the paragraph you are about to implement was written in Roman Alexandria and ends with
its author saying "and by the same method, again", costs nothing and does the job the cold open
version of this candidate was trying to do. If Carlos wants a frame for it, use the printed 1903 page
as the plate, and settle the second order question in section 2 first.

**Zeno belongs at 11:00 or inside the genie exercise**, where the step size is the subject. Two
frames: the halving ladder, then the two Robbins-Monro conditions. It is the wrong opening for a
course and the right opening for a lecture on how far to step, and `proposals/viz-genie-robbins-monro.md`
already owns the fixed step against shrinking step comparison that the second frame would set up.

**Do not compose Heron with Descartes at 08:00.** Both are about method, both are about doing the
thing in stages, and the second to arrive will feel like the first one again.

---

## 9. Recommendation

**Open with Descartes' four precepts, three frames, and lift the mute at 16:00.**

Five reasons, in order of weight.

1. **It is the only candidate that reaches all four Friday lectures.** Heron reaches the morning,
   Zeno reaches one lecture, Hume reaches the afternoon. An opening whose reach is one block is an
   introduction to an exercise.
2. **The muted row is earned rather than decorative, and it is the agenda of a lecture.** In the
   AINIT deck *die Kraft* is muted and never returns. Here the muted row is the reason the last
   lecture of the day exists, and the same frame returns four hours later with the mute lifted. That
   is the Faust device and the Kant device performed on one text in one day, which is the best answer
   available to "how is this a sibling rather than a rerun".
3. **The rights and the engine are both clean.** The French is public domain, the gloss is Carlos's
   own and labelled so, pdflatex sets everything, and the plate is a verified public domain Hals.
   Nothing on the critical path needs a download beyond one portrait, and nothing needs lualatex.
   Compare Heron and Zeno, both of which need a Greek line pinned by eye off a scan and an engine
   decision.
4. **It needs zero plot summary**, which is rule 5, the rule that has killed more candidates in this
   house than any other. There is no story, no character and no myth. Four rules of procedure, which
   an audience of working professionals reads as a checklist.
5. **The room agrees with all four rules before it is shown that one is impossible.** That is a
   better first three minutes than being told something, and it is the right emotional register for
   an onboarding block.

**How it stands beside Faust and Kant.** It is the same family and a different specimen. Faust is a
text whose internal list is the syllabus, with one row muted because the course refuses the term.
Kant is a text whose internal list is the syllabus, with a substitution at the hinge (`ich` becomes
`es`) and the alert moved once per weekend afterwards. Descartes is a text whose internal list is the
syllabus, with one row muted **and the mute lifted later the same day**. The novelty is small and
real: in Faust the refused row is refused permanently, and here the refusal is a promise that gets
kept before the room goes home. It is also the first of the three where the text is a **method**
rather than a metaphysics, which suits a weekend whose whole subject is an algorithm.

**If Carlos wants zero build risk**, Hume at three frames is the fallback: it is the only candidate
pinned character for character with clean rights and no engine question, and it is a genuinely good
opening. It just opens a different course, one about validation, and it leaves the morning unmapped.

---

## 10. Considered and rejected

### The blind men and the elephant: worked, and rejected

The brief named this one, so it gets the full anatomy rather than a line.

**Locus.** *Udāna* 6.4, the *Tittha Sutta*, in the *Jaccandhavagga* (the sixth chapter, "Blind from
Birth"), *Khuddaka Nikāya*, Pali Canon. The chapter title and the sutta number were confirmed by
search this session; **the PTS page reference was not**.

**Rights.** The Pali is public domain. The translations are the problem. F. L. Woodward's *The Minor
Anthologies of the Pali Canon, Part II* (Sacred Books of the Buddhists, 1935) would be public domain
in Switzerland if Woodward died in 1952 as commonly stated, and **that date was not checked here**.
John D. Ireland's (Buddhist Publication Society) and Thanissaro Bhikkhu's are both modern and
restricted. Carlos's own English of a Pali original is not a realistic option.

**Plate.** *Blind monks examining an elephant*, verified on Commons this session: licence "Public
domain", 4030 x 2920 pixels, held by the Library of Congress Prints and Photographs division, digital
ID cph.3g08725. https://commons.wikimedia.org/wiki/File%3ABlind_monks_examining_an_elephant.jpg
**Metadata trap, found this session:** the Commons record gives the artist as Hanabusa Itchō and the
date as 1888, and those two facts are incompatible, because Hanabusa Itchō died in 1724. The 1888
date is a printing date. Do not caption it "Hanabusa Itchō, 1888" without resolving which is which.

**The mapping it would want.**

| The parable | Stage 5 |
|---|---|
| Each man touches one part | Each partial derivative sees one coordinate |
| Each man is right about what he touched | Each partial derivative is correct on its own axis |
| *They quarrel, each holding to one side* | *(muted) the conclusion the course refuses* |
| Nobody has touched the elephant | Nobody computes the whole gradient at once |

**Why it is rejected, three reasons and the second is fatal.**

1. **It needs the story retold**, which is rule 5. Everyone has heard of it, which is a different
   thing from everyone remembering how it goes, and the version people half remember is John Godfrey
   Saxe's 1872 poem rather than the *Udāna*.
2. **The source argues against the lecture.** The parable's conclusion is that partial views produce
   error and quarrelling. Stage 5's claim is that partial views, added, are exactly right: the whole
   point of the Bernstein condition is that each grasshopper working only on its own dimension is
   sufficient. A cold open whose own text has to be contradicted one frame later is the failure mode
   the FDD RAG sweep flagged twice, once for Otlet and once for the *isnād*.
3. **It is a keynote cliché.** The elephant is a standard slide in ensemble learning and multi-modal
   talks, which puts it in the same bin as Prometheus, Icarus and Babel.

**What to keep.** The picture, without the parable, inside the 11:00 lecture or the grasshopper
exercise: several agents each feeling one axis, and the surprise that adding their answers gives the
right joint step. That is a diagram rather than a quotation, it costs no rights and no exposition,
and it is what the parable was being asked to do anyway.

### Rejected with reasons

- **Borges, *Del rigor en la ciencia*, the map on the scale of the empire.** The perfect model and
  reality text, and unavailable: Borges died 1986, so the Spanish is protected in Switzerland until
  the end of 2056 and every English translation with it. Carlos has also already used Borges
  (*Funes*) to open the bandits lecture in a sibling course.
- **Lewis Carroll, *Sylvie and Bruno Concluded* (1893), the map a mile to the mile.** Public domain
  and free of every rights problem Borges has. Rejected because it needs Mein Herr introduced before
  the joke lands, and because a course that opens on "the model is not the territory" has told the
  room the punchline of the last lecture in the first three minutes.
- **Machado, *Caminante, no hay camino*.** Already spent: it is the second epigraph of the AINIT RL
  deck (`git_ainit/rl-arcade/slides/rl-slides.tex`, the Machado frames, with the Oroz portrait).
  Reusing it in a sibling course in the same season is self repetition that Carlos would see even if
  the room did not.
- **Plato, *Meno* 80d to 81a, the paradox of enquiry.** The strongest untaken candidate, and it was
  cut for two reasons. The paradox is stated by Meno rather than by Socrates, so the frame has to
  attribute it correctly and that costs a sentence, and Socrates' answer is recollection, which is a
  worse muted row than any of the four above because the course has nothing to say about it.
- **Sextus Empiricus, *Outlines of Pyrrhonism* II.204, on induction by review of all or of some.**
  Genuinely excellent for 16:00: he says in two lines that you must review either all the particulars
  or some, that reviewing some is insecure and reviewing all is impossible, which is the
  generalisation problem stated as a dichotomy. Cut in favour of Hume on three grounds: the passage
  was **not** retrievable in this session (searched, and found in no free full text), Greek costs an
  engine change, and R. G. Bury's Loeb English is likely still protected in Switzerland. **If Carlos
  prefers a dichotomy to Hume's two propositions, this is the one to go and pin.**
- **Francis Bacon, *Novum Organum* I.19, the two ways of searching into truth.** *Gradatim*, step by
  step, is the correcting loop, and the Latin and Spedding's English are both public domain. Cut only
  because Descartes does the same job with a numbered list that maps one to one onto the timetable,
  and because Bacon's Aphorism 95 is already earmarked for the FDD RAG block, so the two courses would
  be quoting the same book one weekend apart.
- **Adam Smith, *Wealth of Nations* I.i, the pin factory.** Considered seriously for the coordinate
  split because it is a list, it is public domain, and managers own it. Rejected because Smith's
  eighteen operations are a **pipeline**, each worker handing the pin to the next, whereas the
  Bernstein condition is about **independence**, every coordinate reading the same old `w` and
  writing only its own. Using it would put the wrong mental model on the screen for the one stage of
  the weekend that most needs the right one.
- **Prometheus, Icarus, Babel, the Sorcerer's Apprentice.** Every AI keynote since 2015, and the
  Zauberlehrling specifically is already claimed by the FDD Weekend 6 brainstorm.
- **Any Vapnik epigraph.** Vapnik's own books open on quotations, and *The Nature of Statistical
  Learning Theory* is in copyright in every direction. Quoting the lecturer's own subject at himself
  is also a different genre from a cold open.

### Wordings and images that are traps

These are the point of the exercise. Each was found in this session.

- **Two different Heath wordings for Heron's sentence circulate**, and one of them is on MacTutor
  crediting Heath. Whichever is used must be pinned against a printed Heath page.
- **The Internet Archive OCR of the 1903 Teubner Heron has no Greek in it at all.** A codepoint count
  of the whole file returned zero Greek characters. Anyone who copies "Greek" out of that text file
  will paste garbage that looks like transliteration.
- **Perseus does not carry Aristotle's *Physics*.** The canonical Greek repository has nine Aristotle
  works and `tlg031` is absent, so the usual "just get it from Perseus" reflex fails here.
- **The Descartes text in general circulation is modernised**, and the 1637 Ian Maire printing looks
  nothing like it. Pick an edition and name it in the source line.
- **Haldane and Ross is the familiar Descartes English and is a joint work**, so Swiss protection runs
  from the later death. Treat 1911 as a date rather than as a licence.
- **Most Commons images filed under "Zeno" show Zeno of Citium**, the Stoic, three generations after
  Zeno of Elea.
- **The Commons record for the elephant print gives an artist who died in 1724 and a date of 1888.**
- **The Hals Descartes exists in at least six Commons variants**, including one labelled "digitally
  modified derivative". Filenames lie; open the file.

---

## 11. Staging and timing

**The slot is uncontested.** Friday 08:00 is "Intro and onboarding" with no exercise slug and no
competing cold open, which is a much easier position than the FDD mandatory block was in (there the
arc opener collided with an existing four frame chronological opening and the resolution consumed a
whole section of that menu). Weekend 1 has no cold open at all today: the annotated deck
`bmai_w1_sml_annotated (1).pdf` begins on the Vapnik framing with no epigraph.

**The recommended shape, with a running clock.**

| Time | What | Frames | Overlay pages | Minutes |
|---|---|---|---|---|
| 08:00 | F1 Descartes, 1637: four rules of method | 1 | 1 | 0.5 |
| | F2 The four precepts | 1 | 5 | 1.5 |
| | F3 Friday, read against the four precepts | 1 | 5 | 1.0 |
| | *then the ordinary onboarding: people, rooms, the project, the tools* | | | |
| 16:00 | F4 The fourth precept (the mute lifted) | 1 | 2 | 0.5 |
| 16:0x | Hume, two propositions | 2 | 5 | 1.5 |

**Three minutes at 08:00, two at 16:00.** The 08:00 block is 60 minutes and mostly administrative, so
three minutes of it is cheap. The 16:00 lecture is the last of Friday and the one the whole day has
been walking towards, which is the right place to spend the other two.

**The cut, if the morning runs late.** Drop F1 and keep F2 and F3. The portrait is the most
expendable thing in the deck, because the four precepts work without Descartes' face, and F3 is the
frame the opening exists for. Two frames is still a real opening.

**Build order and the preamble warning.** The editorial preamble at
`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/beamer-preamble.tex`
is the right thing to copy, because it is a working house conformant instance and it ends with a
comment block explaining why `\takeaway` is deliberately left undefined. Copy it, retune
`\eyebrowtext` and the footer wordmark for BMAI, keep the "deliberately not defined" comment, and
**diff the `section page` and `title page` templates before writing a frame**. The skill records that
the punchline macro and the section subtitle both crept back into decks by wholesale preamble
copying, twice.

**Verification, before anything is projected.** Compile twice with pdflatex. Then, on the rendered
PDF rather than on the source:

```
pdftotext slides.pdf - | grep -cP '\x{2014}'     # must print 0
pdftotext slides.pdf - | grep -cP '\x{2013}'     # must print 0
```

Then render every page to PNG at 130 DPI and look at it. The French accents, the muted grey against
the projector, and the table alignment are all things that compile clean and look wrong.

**Image bookkeeping.** Create `slides/img/IMAGE-SOURCES.txt` before the first image is used, one
block per image with filename, subject, creator, licence, Commons URL, and the line "opened and
inspected before use" once that is actually true. The FDD instance of this file is at
`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/slides/img/IMAGE-SOURCES.txt`
and it also records an inherited licence problem as a problem, which is the convention to copy.

---

## 12. What only Carlos can decide

1. **Which text.** Section 9 recommends Descartes. Heron is the sentimental favourite and section 2's
   third objection has to be settled before it can be built.
2. **Whether the mapping table's rows are Friday's four lectures or the course's weekends.** If it is
   the weekends, somebody has to supply the list, because nothing in this repository has it.
   Descartes has exactly four precepts, so a course with five or six weekends breaks this candidate
   and the choice moves back to Heron or to a text nobody on this page has proposed.
3. **Whether Heron's averaging update may be shown at 08:00.** The handwritten table withholds it,
   `proposals/viz-heron.md` builds the discovery mechanic around it, and a cold open that prints it
   would give the exercise's answer away two hours early.
4. **Whose English.** Carlos's own, labelled on the slide as the built FDD deck does, or a public
   domain translator (Veitch 1850 for Descartes, Heath 1921 for Heron). This decision has to be made
   once and held across every frame.
5. **Whether the 16:00 lecture gets the lifted mute, or Hume, or both.** Both is two minutes and is
   the recommendation. One of them is one minute and loses the callback.

---

## 13. Verification ledger

Written last, and deliberately unflattering.

**Pinned character for character in this session, against a machine readable text:**

- Descartes, the four precepts, against `philo-labo.fr` "Discours de la methode (A.T)" converted with
  `pdftotext`. Character set checked; no dashes, no smart quotes.
- Hume, the bread sentence and the two propositions, against Project Gutenberg ebook 9662. Section,
  part and paragraph number walked in the file.
- Aristotle, the Hardie and Gaye English of 239b11, against the Logos Virtual Library text.
- The AINIT Faust cold open, the AINIT Robbins-Monro step size conditions, and the built FDD Kant
  deck, all against their `.tex` and text extract sources on disk.

**Verified by computation in this session:**

- Heron's arithmetic, exactly, in `Fraction`: `80/3`, `161/3`, `161/6`, and `(161/6)^2 - 720 = 1/36`.
- The geometric and harmonic sums behind the Zeno mapping: `sum c/2^n = 2c`, the harmonic partial
  sums at 10, 100 and 1000, and `sum 1/n^2 = pi^2/6`.
- Carlos's own Heron example from `theta = 45`: `45^2 = 2025`, first residual exactly 1, and
  `sqrt(2026) = 45.011109739707595...`.

**Verified on Wikimedia Commons in this session** (artist, date, licence and pixel size read from the
API):

- Frans Hals, *Portrait of René Descartes*, 1649, public domain.
- Allan Ramsay, *David Hume*, 1766, public domain.
- *Blind monks examining an elephant*, public domain, with the artist and date discrepancy recorded.
- The Escorial Zeno of Elea fresco, 1588 to 1595, public domain, attribution contested.

**Not verified, and must be before anything is projected:**

- **The Greek of Heron *Metrica* I.8.** Must be transcribed by eye from the page images of
  `heronisalexandri03hero`, printed pages 18 and 20. The OCR is useless for this.
- **Heath's exact English wording for that passage.** Two variants circulate.
- **The Greek of Aristotle *Physics* 239b11.**
- **The death years of Hardie, Gaye, Hermann Schöne, Woodward, and the Haldane and Ross pair.** Every
  rights sentence that depends on them is flagged in place.
- **The Adam and Tannery page reference for the Descartes precepts** (commonly AT VI, 18 to 19).
- **Veitch's 1850 English of the four precepts.** The gloss in section 3 is a draft written for this
  file.
- **Hume's *Custom, or habit*** from Section V, which the muted row in section 5 depends on.
- **The Sextus Empiricus passage at II.204**, which could not be retrieved at all this session.
- **That the *Metrica* was found in Constantinople in 1896 by R. Schöne.** Reported by search results
  only.

**Not attempted:** no deck was compiled, no frame was rendered, and no image file was downloaded and
opened. Every plate above is promised on the strength of its Commons metadata. The house rule is that
filenames lie, so open each one before it goes into `img/`.
