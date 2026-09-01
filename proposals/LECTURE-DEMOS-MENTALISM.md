<!-- Brainstorm, 2026-09-01. Nothing here is decided: this is a menu Carlos chooses from.
     Third menu in this directory. COLD-OPEN-CANDIDATES.md is the philosophical opening,
     COLD-OPEN-FUNNY-CANDIDATES.md is the comic one, and this one is different in kind: these are
     STAGE DEMOS for inside the Friday lectures, in the form of a mind-reading act whose method is
     the lecture. Every number in this file was computed in the session that wrote it. -->

# A mentalism act for the first-order lectures

Carlos asked for a magic trick, or a surprising demo, that follows the first-order iterative
approximation methods of the Friday lectures. Specifically the shape where a performer names a
secret number or card after asking only a few questions.

**That shape is already the syllabus.** A mentalist asks a question, gets an answer, and revises.
Handwritten page 1 asks for a guess, a check, a verdict and an update. They are the same four
columns. The reason the act is worth staging is that a room will accept "the machine corrects
itself" as a phrase and will not feel it, and a person on stage who names their secret number after
fourteen questions makes them feel it.

Eight acts below, each with the effect, the method, and the piece of the lecture that is the method.
Seven of the eight need **no software**, and none needs sleight of hand. **Every one of them is a
question-and-answer loop**, which is the property Carlos asked for on the second pass and the reason
four earlier candidates were cut, see the head of the second batch.

| Act | Slot | Needs building | What it makes felt |
|---|---|---|---|
| 1. Fourteen questions, then one | 09:00 | nothing | Direction against magnitude: the crossed-out rule against the boxed one |
| 2. The six cards | 11:00 | one printed sheet | Coordinate decomposition: stage 5, each grasshopper on its own dimension |
| 3. Lie to me | 09:00 or 12:00 | projector helps | Robbins-Monro: an exact answer out of unreliable answers |
| 4. The sealed envelope | 08:00 or 09:00 | an envelope | Contraction and the fixed point, then two basins and the trap |
| 5. The mental square root | 09:00 | nothing | Heron in one step, and the doubling of correct digits |
| 6. Twenty-one cards | 09:00 | a deck | The bracket that shrinks, and how one lie destroys it |
| 7. The liar | 09:00 or 11:00 | a deck | **Excluding against correcting**, under a spectator who lies |
| 8. Warmer and colder | 11:00 | a spread of cards | Gradient ascent performed by a person, on sign-only feedback |

**If you read one act, read Act 7.** It is the only one that puts two methods side by side against
the same unreliable answers, and the reason Robbins-Monro exists is in its last section.

---

## Act 1. Fourteen questions, then one

**Rank 1 for the 09:00 lecture.** The whole point of the morning arrives as a contrast between two
performances of the same effect.

### Effect, part one

A volunteer thinks of a whole number between 1 and 1000 and tells nobody. Carlos names it after ten
questions, each answered only "higher" or "lower". He then offers a million, and says it costs
twenty.

### Effect, part two, the escalation

Now the volunteer may think of **any** number between 0 and 100, decimals allowed, as many as they
like. There are infinitely many. Carlos names it to two decimal places after fourteen questions.

### Effect, part three, the collapse

Third volunteer, same infinite range, but this time the answer to each question is the actual
distance, "you are twelve point six too low". Carlos names the number after **one** question.

### The method, which is the lecture

Parts one and two are bisection: an answer that carries only a direction halves what is left, so the
cost is the number of halvings. Part three is the update `theta <- theta + l`, where `l` is the
signed miss, which is the pinned notation of the whole weekend.

**The line this act exists to earn.** The size of the miss was worth thirteen yes-or-no answers.

That is also the exact content of the conflict recorded in `docs/summaries/04`: printed deck slide
51 and handwritten page 30 give the name Robbins-Monro to different rules, and the handwriting
crosses out the direction-only rule and puts a box around the proportional one. Act 1 is that
crossing-out, performed, before the slide is shown.

### Verified

Worst case over every secret in the range, computed this session: 1 to 100 costs **7** questions,
1 to 1000 costs **10**, 1 to 1000000 costs **20**. The continuous case, secret `10*pi = 31.415927`
in `[0,100]`, was bracketed to a width of `0.0061` in **14** questions. The magnitude version
starting from a guess of 50 with secret 37.4 was told `-12.6` and was exact on the next guess.

### Clock and staging

Three to four minutes for all three parts. Carlos should write each guess on a flip chart so the
bracket is visible shrinking, and should count the questions out loud. The volunteer must write
their number down before starting, and show it at the end, or the effect is worthless.

### What kills it

Only one thing: a volunteer who answers a question wrong. The bracket then excludes the truth and
the reveal fails. Say in advance that an honest mistake ends the trick, which is itself a useful
thing for the room to know about data quality, and keep a second volunteer ready.

---

## Act 2. The six cards

**Rank 1 for the 11:00 lecture, and the best pure mind-reading effect on this page.** This is the
one an audience genuinely cannot see through.

### Effect

Six cards are handed out, each covered in numbers. A volunteer thinks of any number from 1 to 63.
Carlos asks six questions, each of the form "is your number on this card". He names the number.

**Then the effect that makes it a lecture.** He does it again, and this time hands the six cards to
six different people in six different parts of the room, who ask their question **simultaneously**,
in no particular order, without hearing one another. It still works. Carlos never asks a follow-up,
never adapts, and never hears an answer before deciding what to ask next.

### The method, which is the lecture

Card `k` carries every number whose `k`-th binary digit is 1, and the cards are headed 1, 2, 4, 8,
16 and 32. Add the headers of the cards the volunteer says yes to. The questions are fixed in
advance, so they do not depend on each other and can be asked in any order or all at once.

**This is handwritten stage 5, exactly.** "Each grasshopper only needs to work on its own
dimension." Every partial derivative is evaluated at the same old `w`, each one writes a single
coordinate, and the `d` answers are independent, which is why the whole thing parallelises. Act 1
was a sequential search where every question depended on the last answer. Act 2 is the same job done
by six independent questions that never speak to each other. The room feels the difference between
those two things in about ninety seconds.

**The line this act exists to earn.** Nobody ever computes the whole gradient. Six strangers each
answered about one digit, and the number fell out of the addition.

### Verified

Six cards over 1 to 63, 32 numbers each, headers 1, 2, 4, 8, 16, 32. Checked this session for
**every** `n` from 1 to 63: the sum of the headers of the cards containing `n` equals `n`. Order
independence follows from the sum being a sum, and was checked as such.

A playing-card variant also works and was verified: a 52-card deck needs **six** fixed yes-or-no
questions, with group sizes 26, 26, 24, 24, 20 and 20, and every card in the deck reconstructs
correctly from its six answers. Sequential bisection on 52 cards also costs six, so the playing-card
version loses the "sequential costs more" contrast. **Use the numbers, not the deck**, unless the
theatre of a deck is worth giving that up.

### What needs building

One printed sheet: six cards, 32 numbers each. A small LaTeX or HTML page, half an hour of work,
and the generator script gets committed alongside it so the cards can be regenerated.

### What kills it

Handing the cards out badly. The second performance is the whole point, so the six people must be
visibly far apart and must be told to answer at the same time.

---

## Act 3. Lie to me

**The biggest surprise on the page, and the only act that can fail on stage.** Read the honesty
paragraph before choosing it.

### Effect

Carlos turns his back, or is blindfolded. A volunteer thinks of a whole number. Carlos guesses,
repeatedly, and is told only "too high" or "too low". **And the volunteer is invited to lie**,
whenever they feel like it, as long as they lie less than about one answer in five. Carlos still
arrives.

### The method, which is the lecture

The step shrinks. Guess `n` moves by `alpha_n = c/n` in the direction he was told. A lie moves him
the wrong way, and the next several honest answers outweigh it, because they are still large early
and the lies do not accumulate. This is the whole content of the AINIT slide his own handwritten
page 2 points at, "Learning a number in the dark: Robbins-Monro". The blindfold is that title,
staged.

**The line this act exists to earn.** Individually unreliable answers, added up with a shrinking
step, give an exact answer. This is what a model does with a noisy quarter.

### The counter-demonstration, and it is the better half

Run it again with a step that **never** shrinks, a constant 1. With a perfectly honest volunteer it
still fails: it walks up to the number and then bounces around it forever, and never lands.

Verified this session, secret 37, start 50, forty questions, constant step 1: the final guess was
36.0 and the last ten guesses ranged over `[36.0, 37.0]` with an honest volunteer, and over
`[36.0, 38.0]` with a lying one. It orbits. It does not settle.

Then the third rule, the one that shrinks too fast. With `alpha_n = 9/n^2` the guess can travel at
most `9 * pi^2 / 6 = 14.804` units **in total, ever**. Verified: secret 88, start 5, so the guess
must cross 83 units. After 100 questions it reached 19.71, after 1000 it reached 19.80, and after
**one hundred thousand** questions it had reached 19.8043 and stopped. With `alpha_n = 9/n` the same
run reached 88.0001.

That is the AINIT deck's two conditions, made visible: the steps summed must be unbounded so the
guess can travel from any start, and their squares summed must be finite so the noise cancels. The
harmonic sum to a million is 14.3927 and still climbing; the sum of `1/n^2` is `pi^2/6 = 1.644934`
and stops.

### Honesty about the risk

This is the one act here that is a demonstration rather than a guaranteed trick, and it should be
staged as one. Verified, secret 37, start 50, `alpha_n = 9/n`, twelve independent runs per row:

| Volunteer lies | Questions | Mean final guess | Range across runs |
|---|---|---|---|
| never | 20 | 36.98 | 36.98 to 36.98 |
| 1 answer in 10 | 20 | 36.97 | 36.32 to 37.21 |
| 1 answer in 10 | 40 | 37.00 | 36.94 to 37.12 |
| 1 answer in 5 | 40 | 37.17 | 36.78 to 37.95 |
| 3 answers in 10 | 40 | 41.64 | 36.40 to 56.52 |

Twenty questions with occasional lies can land on 36.32, which rounds to the wrong integer. **Forty
questions is the honest budget for a clean reveal, and forty questions is too many to ask a room to
sit through.** Two ways out, and the second is better.

1. Cap the lies. "You may lie at most twice." Then twenty questions is enough.
2. **Project the running guess and let the convergence itself be the effect.** The audience watches
   the guess stagger, get lied to, and close in anyway. No reveal is needed, nothing can fail, and
   the picture is more convincing than a name.

Option 2 has a home already. `initial-states/hs26-bmai-w1-opt-genie-rm/js/scenes/scene4.js` is a
registered stub titled **"The sandstorm."** and `scene5.js` is a registered stub titled **"Two
demands on the step."** Those two stubs are this act and its counter-demonstration. Building them
gives Carlos the projected version and fills two of the exercise's two remaining gaps at once.

---

## Act 4. The sealed envelope

**The classic mentalism shape: free choice by everyone, one forced outcome.** Also the cheapest
thing here to run, and the only one where the whole room performs rather than one volunteer.

### Effect

An envelope goes on the table before anything starts. Everybody picks any two positive numbers they
like, privately, as strange as they wish. Write them down. Now add the last two to get the next one,
and keep going until you have fourteen numbers. Divide the last by the one before it. Read out what
you got. The room reads out the same number. The envelope says **1.618**.

### The method, which is the lecture

The ratio of consecutive terms obeys `r_{n+1} = 1 + 1/r_n`, which is **the genie's equation**, and
it is a contraction, so it has one attracting fixed point and every starting pair falls into it. The
room ran the genie's iteration without dividing once.

**The line this act exists to earn.** You each started somewhere different and you all arrived at
the same place, because the rule pulls everything towards one number. That is why the same training
run started twice gives the same answer.

### The dark twist, and it is worth more than the trick

Do it again with a different rule: start anywhere and repeat `theta <- (theta + 2026/theta)/2`.
Ask the room to read out their answers. **They split into two camps.** Everybody who started with a
positive number gets `45.011`, and everybody who started negative gets `-45.011`. Same rule, same
instructions, same number of steps. Where you started decided which answer you found.

That is mission 7 of `Minimum Lander Exploration.html`, "The Trap (Local vs Global Minima)",
performed on the audience instead of shown to it, and it is the honest counterweight to the first
half. Both answers are correct square roots of 2026, which makes it a better demonstration than a
contrived double well.

### Verified

Fourteen terms from various starting pairs, computed this session. `(1,1)` gave 1.618026, `(999,2)`
gave 1.617978, `(3,850)` gave 1.618055, `(17,17)` gave 1.618026, against
`phi = 1.6180339887`. The identity `F(n+1)/F(n) = 1 + 1/(F(n)/F(n-1))` was checked term by term and
holds exactly. The Heron map on 2026 was run from 45, 1, 1000, -3, -45 and -0.5: the first three
gave `45.01110974` and the last three gave `-45.01110974`.

### Clock and what kills it

Three minutes, most of it people adding. Twelve additions is the minimum for four correct decimals,
and the arithmetic must stay easy, so tell people to keep their two starting numbers under 100. One
person in twenty will make an addition slip and get a different answer, which is worth expecting out
loud rather than being surprised by.

---

## Act 5. The mental square root

**A mental-calculator act rather than mind reading**, included because it is one line of arithmetic
and it is Heron.

### Effect

Somebody names a number. Carlos gives its square root to five decimals, in his head, faster than the
room can unlock a phone. They check. He is right.

### The method, which is the lecture

`sqrt(N)` is about `a + (N - a*a) / (2a)`, where `a` is the nearest whole square root. That is
exactly one Heron step, written the way it is easiest to do in the head, and it is algebraically
identical to `(a + N/a)/2`.

For 2026: 45, remainder 1, so 45 plus 1 over 90, so 45.01111. The true value is 45.0111097.

**The second step is the surprise worth showing on a slide.** Verified in exact fractions: step one
is wrong by `1.4e-06`, step two by `1.4e-14`, and step three is exact to the last bit of a double.
The number of correct digits doubles each time. Three corrections is all there is.

### Honesty about the trick

The accuracy depends on how close the named number is to a perfect square, and the worst cases were
computed this session over the whole range. For a four-digit number the worst case is `N = 1056`,
where one step is off by `0.0038`. For a three-digit number the worst case is `N = 110`, off by
`0.0119`. So "five decimals" is true for a number near a square and false for a number sitting
between two of them.

Two honest ways to perform it. Ask for a number **near** a perfect square, which costs a little of
the effect. Or promise **three decimals**, which is always safe in four digits, and let the good
cases over-deliver.

### Open decision this collides with

`proposals/COLD-OPEN-CANDIDATES.md` section 12, item 3: whether Heron's averaging update may be
shown at 08:00 at all, because `proposals/viz-heron.md` builds the exercise's discovery mechanic
around the participants finding it. **Act 5 gives that answer away.** It belongs after the exercise
rather than before it, or it does not get performed.

---

# Second batch: tricks that ask, listen and narrow

**Written after a correction from Carlos on 2026-09-01.** A first attempt at this batch offered
self-working card principles, the Kruskal count, Kaprekar's 6174, Hummer's cut-and-turn-over and the
faro cycle. He rejected them, correctly: in all four the spectator makes free choices and the
structure wins **without any feedback loop at all**. The performer asks nothing and revises nothing.
They are demonstrations of invariants and fixed points, and they sit in "Considered and set aside"
below, with their verified numbers, in case a slide ever wants one.

What he asked for is the loop itself: **ask a question, hear the answer, revise, ask again.** That is
the actual shape of Robbins-Monro, and this batch is built on it. The three acts here take one
question-and-narrow routine and put it under increasing pressure, which is how the lecture's own
argument is built.

---

## Act 6. Twenty-one cards, and the bracket that shrinks

**The canonical ask-and-narrow trick**, and the cheapest way to put a shrinking bracket in front of a
room. It is the setup for Act 7 rather than an end in itself.

### Effect

Twenty-one cards are dealt face up into three columns of seven. A spectator thinks of one and says
only which column it is in. The columns are gathered with the named one in the middle, and dealt
again. Three questions, three deals, and the card is the eleventh from the top, every time.

### The method, which is the lecture

Each answer eliminates two thirds of the candidates, and the gathering rule drives the survivors
towards the middle of the packet. **The bracket is what shrinks, and it shrinks by a factor of three
per question.** Verified this session by tracking where the chosen card can possibly be:

| After | Possible positions | Range | Width |
|---|---|---|---|
| 0 deals | 21 | 1 to 21 | 21 |
| 1 deal | 7 | 8 to 14 | 7 |
| 2 deals | 3 | 10 to 12 | 3 |
| 3 deals | 1 | 11 to 11 | 1 |

That table is the same picture as Act 1's flip chart, in cards, and a room that has seen it will
accept "the interval halves each time" without argument.

### Why twenty-one is the wrong number, and why that is worth saying

Three questions with three answers each distinguish **27** things. The trick uses 21, so it wastes
about a fifth of the information it collects. Twenty-seven cards would be the exact fit. Magicians
use 21 because three columns of seven deal comfortably, which is a real constraint of a different
kind. A room of managers understands a design that trades efficiency for handling.

### What kills it, and it is the whole point of Act 7

**One wrong answer destroys it, permanently and silently.** Verified: with the spectator lying in any
one of the three rounds, for any of the 21 cards, the trick names the **wrong card in 60 of 63
cases**. The bracket excluded the true card, and no later answer can bring it back, because the
method's only move is to throw candidates away.

---

## Act 7. The liar

**The centrepiece of this batch, and the closest thing on the page to Robbins-Monro proper.** Three
rounds with the same volunteer, in front of the room.

### Round one, the honest spectator

Fifty-two cards in a row on the table. The spectator picks one secretly. Carlos points at a position
and is told only "left" or "right". He walks in, and names the card. With honest answers this takes
six questions and is certain.

### Round two, the same spectator, one lie

Carlos hands the spectator a slip of paper: *lie to me exactly once, whenever you like, and do not
tell me when.* He runs the same method. **He names the wrong card**, and usually a wildly wrong one.
Verified: bisection over 52 cards with a single lie at any of its six questions gets the wrong card
in **300 of 312 cases**.

This is the failure the room has to see, because everything after it is a response to it.

### Round three, the same spectator, still lying

Carlos changes his method and nothing else. Now, instead of ruling positions out, he keeps one guess
and moves it: point at position `g`, hear the direction, and step by `alpha_n = 13/n`, so the steps
get shorter as the questions go on. He allows himself thirty questions instead of six. **He arrives.**

### The method, which is the lecture

The two methods differ in one thing, and it is the thing the whole weekend turns on.

**Bisection excludes.** Every answer throws away candidates, and a discarded candidate is gone. One
bad answer is fatal and the method has no way of knowing it happened.

**Robbins-Monro corrects.** Every answer nudges a single guess. A lie moves it the wrong way, and the
honest answers that follow move it back, because the early steps are big enough to travel and the
later ones are small enough to settle.

**The line this act exists to earn.** The method that throws things away is faster and cannot survive
being wrong. The method that only ever nudges is slower and forgives every individual answer.

### Verified, and it includes how wrong each method is when it is wrong

Thirty questions for both methods, 20000 trials per row, secret card drawn uniformly, `alpha_n = 13/n`
for the correcting rule:

| Spectator lies | Method | Names it exactly | Within 1 card | Median error | Worst error |
|---|---|---|---|---|---|
| never | bisection | 1.000 | 1.000 | 0 | 0 |
| never | correcting | 1.000 | 1.000 | 0 | 0 |
| 1 answer in 10 | bisection | 0.540 | 0.657 | 0 | 48 |
| 1 answer in 10 | correcting | **0.852** | **0.935** | 0 | 31 |
| 1 answer in 5 | bisection | 0.278 | 0.406 | 3 | 51 |
| 1 answer in 5 | correcting | **0.618** | **0.796** | 0 | 44 |
| 3 answers in 10 | bisection | 0.133 | 0.238 | 7 | 51 |
| 3 answers in 10 | correcting | **0.331** | **0.541** | 1 | 48 |

**Read the last two columns out loud, because they carry more than the first two.** With an honest
spectator the two methods tie exactly. Once answers go wrong, the correcting rule misses by a card
or two and the excluding rule misses by twenty. A method that degrades into a near miss and a method
that degrades into a random card are different products, and the room will recognise which one they
would rather deploy.

### The other fix, and its price

A manager in the room will say: ask each question several times and take the majority. That works,
and it is worth showing that it works, because refusing to answer it damages the act.

Verified, same 20000 trials. Majority voting over repeated bisection questions, against the
correcting rule at the same question budget:

| Spectator lies | Bisection, 3 votes each, 18 questions | Bisection, 5 votes each, 30 questions | Correcting rule, 30 questions |
|---|---|---|---|
| 1 answer in 10 | 0.850 | **0.956** | 0.852 |
| 1 answer in 5 | 0.532 | **0.713** | 0.618 |
| 3 answers in 10 | 0.243 | **0.360** | 0.331 |

**Majority voting wins at equal budget, and the act must say so.** There is a third option that wins
too: design the questioning for the lie in advance. Berlekamp's counting bound, computed this
session, says 52 cards need at least **6** questions with no lies, at least **10** with one lie and
at least **13** with two, and an exact game search confirms **10 questions suffice** for one lie.
Ten questions and certainty beats thirty questions and 85 percent.

### So why does the correcting rule exist at all, and this is the honest answer

Three reasons, and the third is the real one.

1. **It needs no budget declared in advance.** Berlekamp's method has to be told how many lies to
   expect, and majority voting has to be told how many repeats to buy. The correcting rule is handed
   nothing and degrades smoothly across every row of both tables above.
2. **It never excludes, so no single answer is ever fatal.** There is no state to corrupt.
3. **You do not get to ask the same question twice.** Majority voting depends on asking one question,
   at one position, several times over. Training a model gives you one noisy answer, at a point you
   have already moved away from, and you never return to it. The quarter happened once. That is the
   circumstance Robbins and Monro wrote for, and it is why the shrinking step does the work that
   repetition would otherwise do.

There is a fourth, which is worth one sentence: the excluding methods all need a finite list of
candidates to shrink, and the genie's number and the house-price slope are real numbers, where there
is no list.

### Staging, clock, and what kills it

Eight minutes for all three rounds, which is a lot. **Round two is the one that cannot be cut**, and
if time is short, run rounds two and three only and describe round one in a sentence. Deal the 52
cards in a long row so the room can see the guess travel; the movement of a hand along a row is what
makes the difference between the two methods legible.

Round three is a demonstration rather than a guaranteed reveal, at 85 percent with one lie in ten.
Frame it as a race between two methods against the same liar, and neither outcome can embarrass
anybody. **Do not promise to name the card in round three.**

---

## Act 8. Warmer and colder

**The one act where the performer is visibly the algorithm.** It needs no props beyond a spread of
cards and it is the lander's mission 2 with a person in the cockpit.

### Effect

A spectator thinks of one card in a face-down spread of the whole deck. Carlos moves his hand slowly
along the spread. The spectator says only "warmer" or "colder", nothing else. Carlos closes in on
the card and names it.

Then he does it again, and this time the spectator is allowed to say how warm, on a scale of one to
ten. It takes a fraction of the time.

### The method, which is the lecture

The first version is gradient ascent with sign-only feedback: move, ask whether that helped, keep the
direction if it did and reverse it if it did not, and shorten the sweep as the answers start
alternating. The second version is the same search with the magnitude restored, and the room watches
it cost a quarter as much.

**This is the pair from Act 1 again, and that is deliberate.** Act 1 makes the point with numbers on
a flip chart. Act 9 makes it with a hand moving over a table, which some people in the room will
understand and the other version will not reach. It is also `Minimum Lander Exploration.html`
mission 2, "Navigating the Fog", performed by a human being: you cannot see the ground, you can only
be told whether the last thing you did helped.

### Honesty about what this act is

The classic version of this is contact mind reading, where the performer holds the spectator's wrist
and reads involuntary resistance, and that takes real practice. **Carlos should not attempt that.**
The honest version is the one above, where the spectator says the words out loud. It is not
mysterious, and it does not need to be, because the effect being demonstrated is the speed
difference between the two feedback types rather than a miracle.

### What kills it

Presenting it as mind reading and then explaining that the spectator was simply talking. Frame it
from the start as a demonstration of a search, and it is a good one.

---
## Which to pick

**If only one, pick Act 2, the six cards.** It is the one a room cannot reverse-engineer while
watching, the reveal is instant, and it carries the single stage of the weekend that most needs the
right mental model. It also costs one printed sheet.

**If two, add Act 1.** Acts 1 and 2 together are the two halves of the morning: a sequential
correcting loop, then the same job split across independent coordinates. They take six minutes
between them and need one flip chart and one sheet of paper.

**If the weekend gets one card routine, make it Act 7, the liar.** It is the only act that puts two
methods against the same unreliable spectator and lets the room watch one of them fall apart. It is
also the only place on this page where the question "why Robbins-Monro at all" gets an honest
answer, which is the last section of that act.

**Acts 6 and 7 are one routine and should be run as one.** Act 6 builds the shrinking bracket and
Act 7 breaks it. Running Act 7 without Act 6 costs the room the picture of what is being broken.

**The pairings with a specific slide**, which are the cheapest wins:

| Slide | Act | Why it is the same statement |
|---|---|---|
| The step must shrink | 3, lie to me, and 7 round three | A step that never shrinks straddles the answer forever |
| Direction against magnitude | 1, and 8 warmer and colder | The same search costs a quarter as much once the answer carries size |
| Each grasshopper on its own dimension | 2, the six cards | Six independent questions, asked at once, in any order |
| Noisy gradients | 7, the liar | Excluding methods die on one bad answer, correcting methods absorb it |

**The full running order**, if Carlos wants the act to carry the day. Eight acts is too many for one
morning, so this is a menu of a menu: the starred rows are the four that would survive a cut.

| When | Act | Minutes |
|---|---|---|
| 09:00, opening the first-order lecture | 1, fourteen questions then one **(*)** | 4 |
| 09:00, after the genie is introduced | 4, the sealed envelope, first half only | 3 |
| 09:00, on the noisy-feedback slide | 6 then 7, twenty-one cards and the liar **(*)** | 10 |
| 09:00, closing | 3, lie to me, projected version | 3 |
| 11:00, opening the gradient descent lecture | 2, the six cards **(*)** | 3 |
| 11:00, on the fog | 8, warmer and colder **(*)** | 3 |
| 11:00, before stage 5 | 4, the dark twist, the two camps | 2 |
| after the 10:00 exercise, never before | 5, the mental square root | 2 |

**Acts 6 and 7 together cost ten minutes, which is the single largest ask on this page.** They buy
the distinction between a method that throws candidates away and a method that nudges one guess,
which is the distinction the entire Friday morning is built on, and no slide delivers it as well.
If ten minutes cannot be found, run Act 7 rounds two and three only, which is five.

---

## Props, and what has to be built

- **Nothing** for acts 1, 4 and 5. A flip chart, an envelope, a pen.
- **One printed sheet** for act 2, six cards of 32 numbers, generated by a committed script.
- **One ordinary deck** for acts 6, 7 and 8. Act 6 uses 21 cards, act 7 lays all 52 in a row, and
  act 8 spreads them face down. No preparation, no stack, no setup.
- **One slip of paper** for act 7 round two, carrying the instruction to lie exactly once, so the
  room can see that the instruction was given without hearing when the lie lands.
- **Two scenes** for the projected version of act 3, already specified and stubbed as `scene4.js`
  ("The sandstorm.") and `scene5.js` ("Two demands on the step.") in
  `initial-states/hs26-bmai-w1-opt-genie-rm/`. Building them closes that exercise's last two gaps.
  **Act 7's two tables belong in the same pair of scenes.** The comparison between the excluding
  rule and the correcting rule under a lying spectator is the sandstorm scene's whole subject, and
  drawing it once serves both the lecture and the exercise.
- **A blindfold**, if act 3 is performed live rather than projected. His own slide title asks for it.

**One thing that is explicitly not needed anywhere on this page: sleight of hand.** The one
classical effect that would require real practice, contact mind reading in act 8, is named and
refused in that act.

---

## Cut on the 2026-09-01 redirect: the self-working card principles

These four were written up in full as acts 6 to 10 of a first attempt at the second batch, and cut
the same day when Carlos said he wanted tricks that **ask questions and use the feedback to narrow
down the card**. All four fail that test in the same way: the spectator makes free choices, the
performer asks nothing, and the structure delivers the result with no loop anywhere. They are
demonstrations of invariants and fixed points, which is a real thing to demonstrate and a different
thing from Robbins-Monro.

**Their numbers are still computed by the reference file**, so any of them can be restored to a
slide without re-deriving anything.

- **The Kruskal count.** Spectator and performer follow one counting rule from different starting
  cards and land together, because two chains under the same rule merge and stay merged. Verified at
  0.8538 with the performer starting at card 1, rising to **0.9425** when court cards count as 1
  rather than 5, over 200000 shuffled decks per row. **The best of the four, and worth keeping in
  mind for 16:00**, because its promise is a probability and so is Vapnik's.
- **Six one seven four.** Any four-digit number, sort the digits down and up, subtract, repeat.
  Verified: all 9990 non-repdigit strings reach Kaprekar's 6174 in at most **7** steps; the
  three-digit version reaches 495 in at most **6**.
- **Cut and turn over.** Hummer's principle: however often the volunteer cuts and turns the top two
  over, the two alternate piles still hold equally many face-up cards. Verified as an invariant,
  **20000 of 20000 trials** at packet sizes 10, 20 and 52.
- **Eight perfect shuffles.** A 52-card deck returns to its original order after **8** out-faros, so
  it walks a closed loop rather than converging. Verified, along with 3, 4, 5 and 6 shuffles for
  packets of 8, 16, 32 and 64. A faro is a genuine sleight, so this one was already marked
  project-it-rather-than-perform-it before the redirect.

**What the redirect is worth keeping in writing.** A trick where the spectator freely chooses and the
mathematics wins demonstrates a *property of the map*. A trick where the performer asks, listens and
revises demonstrates a *property of the algorithm*. Friday morning is about algorithms, so the second
kind is the right kind, and Act 7 is the one that earns it.

---

## Considered and set aside

- **Twenty questions with a lie allowed, played as a puzzle.** The error-correcting version of act 3
  is a real and beautiful subject, and explaining it costs more than the weekend has.
- **Guess two thirds of the average**, played with the room. It converges to zero over rounds and it
  is a genuine published experiment, so it is tempting. Set aside because the convergence is a fact
  about the players learning rather than about an algorithm correcting, which puts the wrong
  mechanism on stage. **Its published results were also not verified in this session**, and nothing
  from it may be quoted until they are.
- **Everyone presses the cosine key until the display stops changing.** It works, verified: from
  starts of 0, 1, -5, 100, 42 and 3.14159 all reach 0.7390851332, and about 35 presses are needed
  from 1. Set aside in favour of act 4, which needs no device and whose fixed point is the genie's
  own answer. **Hazard if it is ever used**: a calculator in degrees mode converges to 0.9998477
  instead, so a room in mixed modes destroys the effect.
- **A large language model failing at arithmetic on stage.** Needs a network, may succeed, and makes
  the subject of the course the butt of the demonstration on day one.
- **Card tricks whose method is a memorised stack or a force.** They are magic with no lecture inside
  them, and the room will feel the difference.
- **The Gilbreath principle**, where a deck in a repeating red-black pattern survives a riffle
  shuffle so that every pair still holds one of each. A beautiful invariant, and it falls to the same
  redirect as the four acts cut above: the spectator shuffles, the performer asks nothing.
- **Running act 6 and act 2 in the same lecture.** Act 6 is the adaptive base-three cousin of act 2,
  and putting them side by side blunts act 2's whole point, which is that its six questions are
  fixed in advance and can be asked in any order. Act 6 belongs at 09:00 with act 7, and act 2 at
  11:00. **Keep them in different lectures.**
- **Seven riffle shuffles randomise a deck.** The famous result, and structurally the mirror of
  everything here: an iteration converging to a distribution rather than to a number. Tempting for
  the afternoon. **Not verified in this session at all**, neither the count nor the distances behind
  it, so nothing about it may be said out loud until it is checked against the paper.
- **Collatz.** Iterative, astonishing, and unproven, so a lecture cannot claim it converges.

---

## Verification ledger

Every number in this file is real output of `lecture-demos-mentalism-reference.py`, in this
directory, standard library only, no arguments, deterministic. Run it and diff against the figures
below:

```
cd proposals && python3 lecture-demos-mentalism-reference.py
```

**It takes a couple of minutes and prints nothing until the first section finishes.** Act 7 runs
20000 searches per row across eight rows plus the majority-vote comparison, and finishes with an
exhaustive Renyi-Ulam game search; the cut Kruskal section simulates 800000 shuffled decks. It has
not hung. Sections named CUT ON THE REDIRECT belong to the four acts Carlos rejected, and are kept
because the menu still quotes their numbers where it records why they went.

Its sections are named for the acts, so any figure quoted here can be traced to the line that
produced it. **One correction was made this way**: the last row of act 3's honesty table originally
carried the twenty-question figures under a forty-question heading, and the reference run caught it.

**Computed by that file:**

- Bisection worst cases 7, 10 and 20 for ranges of 100, 1000 and 1000000, by exhausting every secret
  in the first two ranges and sampling 5000 secrets in the third.
- The continuous bisection: 14 questions to a bracket of width 0.0061 for the secret `10*pi`.
- The six-card reconstruction, for all 63 numbers, and the 52-card variant with group sizes 26, 26,
  24, 24, 20, 20.
- Act 3's table, twelve runs per row, and the constant-step orbit `[36.0, 37.0]`.
- The `9/n^2` travel cap `14.804` and the run stuck at 19.8043 after 100000 questions; the `9/n` run
  reaching 88.0001; the harmonic sum 14.3927 at a million terms; `pi^2/6 = 1.644934`.
- Act 4's ratios from four starting pairs, the genie identity term by term, and the two Heron basins
  at plus and minus 45.01110974.
- Act 5's one-step errors, the exact-fraction digit doubling `1.4e-06`, `1.4e-14`, exact, and the
  worst cases `N = 1056` at 0.0038 and `N = 110` at 0.0119.
- The cosine fixed point 0.7390851332 and the degrees-mode hazard 0.9998477.
- Act 6's bracket table, 21 to 7 to 3 to 1 with ranges `[1,21]`, `[8,14]`, `[10,12]` and `[11,11]`,
  by tracking every one of the 21 cards through every sequence of answers; the 22 percent of
  information the trick wastes; and the 60 wrong reveals out of 63 single-lie cases.
- Act 7's two tables in full, 20000 trials per row at 30 questions with `alpha_n = 13/n`, including
  the median and worst errors, which are the columns that carry the argument.
- Act 7's Berlekamp bound of 6, 10 and 13 questions for 0, 1 and 2 lies over 52 candidates, and the
  exact game search confirming that 10 questions suffice for one lie.
- The four cut acts, under their own headings: the Kruskal rates 0.8435, 0.8203, 0.8538 and 0.9425
  over 200000 decks each; Kaprekar reaching 6174 in at most 7 steps and 495 in at most 6; Hummer's
  invariant at 20000 of 20000 trials over three packet sizes; the faro orders 8, 3, 4, 5 and 6 and
  the down-under survivors 8, 16, 10, 40 and 64.

**Not verified, and flagged in place.** Two things, both named where they appear. The published
results of the two-thirds-of-the-average experiment, and **the seven-riffle-shuffles result and
every number behind it**. Nothing from either may be said out loud until it is checked against the
primary source.

**A note on what "verified" means for act 7.** Every rate in its two tables comes from simulation
under stated conventions: a secret card drawn uniformly, a spectator who lies independently at the
stated rate, a fixed budget of 30 questions and `alpha_n = 13/n`. All four move if any of those
move, and the step constant matters more than it looks. At 30 questions and one lie in ten, `c = 13`
gives 0.852 exactly and 0.936 within one card, while `c = 18` gives only 0.556 exactly and 0.967
within one, which is a bias-and-variance trade sitting in plain sight inside a card trick. **Quote
these in a room at one significant figure**, as about 85 percent against about 55, and keep the
tables for the slide rather than the sentence.

---

## Maintenance contract

- This file is a menu. Nothing in it is decided. If an act is chosen, record the choice at the head
  of this file and leave the ones not taken in place.
- **`lecture-demos-mentalism-reference.py` is the authority for every number here.** If a figure in
  this file changes, change it there first and re-run, in the pattern of `viz-heron-reference.py`.
- If act 3 is built as scenes, it belongs to `initial-states/hs26-bmai-w1-opt-genie-rm/` and that
  directory's `CLAUDE.md` is the authority, so update it and the root `CLAUDE.md` in the same
  session.
- Keep it concrete: real file names, real identifiers, real numbers that a runnable file produced.
