# hs26-bmai-w1-opt-heron: "Squaring the rectangle"

Proposal for the visualization and the paired coding exercise.

- Slug: `hs26-bmai-w1-opt-heron`
- Schedule row: Friday 10:00, "CX: First-order optimization algorithms", first of three slugs
- TAs: Jinlei, Daniele, Ivan
- Status: proposal. Nothing here is decided. Section 18 lists what only Carlos can decide.
- Written against `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md`, read in full in this session, 629 lines.
- Every number quoted here is printed and asserted by `proposals/viz-heron-reference.py`, which is shipped alongside and ends on `All assertions passed.`

```
python3 proposals/viz-heron-reference.py
```

**Revision note, 2026-08-26.** This file supersedes an earlier draft of itself. Two things changed
because they were recomputed rather than carried over: the bracket width three steps in from
`theta = 45` (section 10.4), and the drawing scale, which now matches the scaffold that has since
been built (section 12). Section 17 says exactly what is already built and what is left.

---

## 1. The source, verified

I read the primary sources rather than the digest.

**Carlos's handwritten page 1**, `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/bmai_w1_notes_first_order_optimization_p1.jpg`, opened as an image in this session. What is on it:

- Title "First-order optimization".
- "Act 1) Heron's algorithm".
- A drawing: a vertical and a horizontal axis, with a box in the corner and `2026` written inside it. Above and to the right, `theta = ?`. Under the bottom edge, `theta = sqrt(2026)`.
- A five column table header: `theta | theta^2 | 2026 - theta^2 | Verdict | Update`. One row is begun: `45  ...  ...`, the Verdict cell holds `too large` stacked over `too small`, and the Update cell holds a left arrow stacked over a right arrow.
- "Act 2) Robbins-Monro algorithm", `theta = 1 + 1/theta`, labelled "The genie game", with the table `theta | 1 + 1/theta | verdict | update`.
- At the bottom, underlined: `TODO: Come up with a scaffold of games & guide them`.

Two things follow from reading the page instead of a summary of it.

First, the Update column carries **arrows only**. Carlos's table hands the participant the
direction and withholds the distance. That is the hole the whole weekend is built to fill, and the
same hole the grasshopper game names as its two levers: `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/js/explain.js` line 434 reads
"In the game you set both levers yourself, the direction and the distance", and lines 435 to 439
say the update rule takes over the first lever completely and most of the second.

Second, the box on the page is a **square** of area 2026 with side `sqrt(2026)`. The rectangle
framing in the brief is therefore an addition to what is on the page. It is the right addition,
because a rectangle of fixed area 2026 with sides `theta` and `2026/theta` turns every column of
Carlos's table into something visible, and it makes the averaging update a physical act.
Section 4 makes that concrete. Section 18 puts the addition to Carlos as an explicit question.

**The schedule.** `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/docs/master-schedule-weekend1.csv`, read in this session, carries the row

```
10:00,CX: First-order optimization algorithms,"hs26-bmai-w1-opt-heron
hs26-bmai-w1-opt-genie-rm
hs26-bmai-w1-opt-rm-house",...
10:30,Coffee break at Polysnack,...
```

and further down

```
,CX First-order optimization: Heron's algorithm,hs26-bmai-w1-opt-heron,,CX Theory,...
,Jinlei,...
,Daniele,...
,Ivan,...
```

So the CX block runs 10:00 to 10:30 and holds three slugs. **The task brief calls this a one hour
slot. The spreadsheet says thirty minutes.** I have designed for the thirty minute reading, which
gives Heron about ten minutes of participant time. Section 16 says what to add if the hour is real.
This is the single input that most changes the build, and it is open question 1.

---

## 2. The one sentence design

A rectangle of area 2026 that you deform by choosing one side, where the verdict is the shape you
are looking at, the correction is the visible act of averaging the two sides, and the payoff is a
digit counter that reads 3, 6, 14, 30, 61.

---

## 3. What this exercise owns, and what it must leave alone

Three exercises share the 10:00 block and the same guess, check, correct skeleton. They collide
unless each is told what to keep its hands off. This table is the anti-collision contract.

| Idea | Owner |
|---|---|
| A target defined by an equation you can evaluate exactly | Heron, this exercise |
| The correction computed in closed form, with no step size at all | Heron, this exercise |
| Quadratic convergence, and what a doubling digit count looks like | Heron, this exercise |
| A step size `alpha`, and a schedule that shrinks it | `hs26-bmai-w1-opt-genie-rm` |
| Noise in the measurement, and averaging it away | `hs26-bmai-w1-opt-genie-rm` |
| A target defined by data rather than by an equation | `hs26-bmai-w1-opt-rm-house` |
| A loss surface, a gradient, a learning rate | the 11:00 lecture and the grasshopper |

Consequences for this build, stated as rules a reviewer can grep for:

- The words `alpha`, `learning rate`, `gradient`, `loss` and `derivative` appear nowhere in scenes
  0 to 4. They appear once each, in the scene 5 bridge table, as the names of what the next two
  exercises add.
- Heron has no tunable step. A participant looking for a knob should find none, because the point
  of Act 1 is that when you can evaluate the target you do not need one.
- Nothing here uses randomness at runtime. The genie owns noise.

---

## 4. Why a rectangle carries every column of Carlos's table

Fix the area at 2026. Let the participant own the width `theta`. The height is then forced to
`2026/theta`. Carlos's five columns are read off the picture:

| Carlos's column | What it is on screen |
|---|---|
| `theta` | the width you chose |
| `theta^2` | the area of the square you would get if the height matched the width |
| `2026 - theta^2` | how much area that square is missing |
| Verdict | the shape: tall and narrow, or wide and flat |
| Update | move the width toward the height |

The verdict stops being a sign. `theta < sqrt(2026)` holds exactly when `theta < 2026/theta`, which
holds exactly when the rectangle is taller than it is wide. A participant who has never met an
inequality can call this one from across the room.

The update stops being an arrow. The two sides are two numbers, the target sits between them
always (section 7, theorem 1), and the cheapest thing anyone can do with two numbers and no square
root key is average them. That average is

```
theta <- (theta + 2026/theta) / 2
```

which is Heron. Geometrically it is the rectangle being squared up: take the mean of the two sides
and rebuild the rectangle with that mean as its width. **The heart of the exercise is that "average
the two sides" and "correct your guess" are one gesture.**

The picture is trustworthy for a reason that is checkable on screen: the drawn area is constant.
`theta * (2026/theta) = 2026` for every `theta`, and at the pinned drawing scale of 1.6 pixels per
unit the rectangle always covers 5186.56 square pixels, whatever shape it is in. Only the shape
moves.

---

## 5. Decision: click-step, and why

**Click-step. Six scenes, one file per scene.**

The skill states the choice at lines 71 to 90: pick one and commit, scrollytelling is for linear
hero narratives and is unidirectional, click-step is for math-heavy didactic content and is
bidirectional with rewind. Line 81 is decisive here: scrollytelling "can't have 'click Next within
scene 4 to walk through the assignment-step math.'"

Every load-bearing moment in Heron is a decision point the participant has to be able to make, get
wrong, and rewind:

1. Choose a width and read the shape off it.
2. Choose the next width and find out whether the bracket got wider.
3. Step Carlos's table one row at a time, and step back when someone asks what just happened.

A scroll position cannot hold "the participant typed 60 and it made things worse". A rewindable
step cursor can. The TA needs the rewind, because with three exercises in one block the TA will
demonstrate a row, undo it, and hand the mouse over.

There is a live counter-precedent, and I would rather name it than paper over it. The house
flagship for this same weekend, `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/index.html`, picks neither pattern: it is a
topbar, a hero, a `#game-root`, an `#explain-root` and a footer on one scrolling page, with levels
chosen inside the game. It is a good page. I depart from it for three reasons. The skill says to
pick one pattern and commit. Grasshopper has no hash routing at all, and the skill calls hash
routing non-negotiable at line 153. And a lecturer with ten minutes needs `#scene=4` to jump
straight to the payoff. The grasshopper shape survives in spirit: scenes 0 to 2 are the game,
scenes 3 to 5 are the explanation, and the seam between them is a Next click rather than a scroll.

---

## 6. Scene list

Six scenes, `js/scenes/scene0.js` through `js/scenes/scene5.js`, each registering
`window.scenes.sceneN(root)` and returning `{ onEnter, onLeave, onNextKey, onPrevKey }` per the
skill's contract at line 133. Titles are the ones already wired into `js/main.js` in the built
scaffold.

### Scene 0. The rectangle. `scene0.js`

Opens on the rectangle. Area 2026, width `theta`, height `2026/theta`. A slider and a number input
both drive `theta`. The skill's keyboard guard at line 122 already exempts form fields from scene
navigation, and the built `js/theme.js` guards the `t` shortcut the same way at its lines 61 to 66.

- The area label `2026` sits inside the rectangle and never changes.
- Both side lengths are printed on their edges.
- Domain: `theta` runs over `[10, 202.6]`. That interval is closed under `theta -> 2026/theta`,
  because `10 * 202.6 = 2026` exactly, so both sides are always drawable and the frame never has to
  rescale itself behind the participant's back.
- No target. No `sqrt(2026)`. No tick at 45.011. Nothing on screen names the answer.
- Steps: (1) the rectangle at the opening width, (2) the width control unlocks, (3) a ghost outline
  of the widest and the tallest shape visited so far accumulates, so sweeping leaves a trace.

The one question on screen: "Somewhere in this sweep the rectangle is a square. Find it."

Nobody finds it by eye. That failure is the scene's job.

### Scene 1. The table. `scene1.js`

Carlos's five columns, starting at `theta = 45`. The rectangle stays live above the table.

Why 45 is the right start and has to stay: `45^2 = 2025`, so the very first residual is exactly 1.
Carlos chose a number whose miss is a single unit. It also delivers the point scene 0 set up. At
`theta = 45` the rectangle is 45 wide by 45.022222222222226 tall, and the gap between the two sides
is 0.0222 units, which at 1.6 pixels per unit is 0.036 pixels. **The shape is square to the eye and
the eye is now useless.** The residual column is what is left, and that is the moment arithmetic
takes over from looking.

- Step 1 fills `theta = 45`.
- Step 2 computes `theta^2 = 2025`.
- Step 3 computes `2026 - theta^2 = 1`.
- Step 4 asks for the Verdict and shows why the picture cannot supply it: the loupe appears here
  for the first time (section 8), at power `10^3`, and the mismatch that was 0.036 pixels wide
  becomes 35.6 pixels wide. The verdict stays physical. It just needs magnification.
- Step 5 opens the Update cell, which is an empty input. The scene stops. This is the gate.

### Scene 2. The bracket. `scene2.js`

The discovery scene, and the one that carries the design. Full mechanic in section 7.

Restarts from a deliberately bad guess, `theta = 10`, so the rectangle is 10 by 202.6 and the two
sides are far apart. Both sides are projected down onto a ruler as two marks with a bracket drawn
between them. The participant types the next width. The feedback is the new bracket width and
nothing else.

- A guess outside the current bracket: the bracket gets strictly wider, and the scene says so.
- A guess inside: the bracket narrows by an amount that is visible.
- A three guess counter with the running bracket width, and a best-of-three record in
  `localStorage` under `heron-best-bracket`.
- The constraint is printed on screen and it is what makes the scene work: your next guess has to
  be something you can compute from the two numbers in front of you using only `+`, `-`, `*`, `/`.
  There is no square root key. This is Carlos's genie framing ("No computer, no formula, only
  arithmetic") applied one act earlier.

The ruler is **linear**, and that is a load-bearing choice rather than a default. On a logarithmic
ruler the two sides would sit symmetrically about `sqrt(2026)`, so the answer would be the visible
midpoint of the bracket and the scene would hand over what it is asking for. It would also point at
the geometric mean, which no participant can compute without the square root they do not have. On a
linear ruler the target sits off centre (from `theta = 10` it sits at 18 percent of the bracket),
the midpoint is the arithmetic mean, and the arithmetic mean is exactly one Heron step.

The scene never marks the target. It marks the bracket, and the bracket is the two sides of the
rectangle the participant is already looking at.

Closing prompt: "You know two numbers, and you know the answer is between them. Say what you would
do with no square root key."

### Scene 3. Heron. `scene3.js`

Names it, after the attempt. One formula, built in three clicks:

```
theta <- (theta + 2026/theta) / 2
```

- Click 1: the two sides as two marks on the ruler.
- Click 2: the midpoint construction drawn between them.
- Click 3: the rectangle rebuilt with that midpoint as its width.

Then the invariant, stated as a claim the participant can test in scene 4: after the first
correction the rectangle is never tall again. Every later rectangle is wide and flat, and the
residual column changes sign once and then never again. This is AM-GM, verified in section 7.

Two honest asides belong here, because a sharp participant raises both.

1. The midpoint is not the best conceivable next guess. The best conceivable next guess is the
   geometric mean of the two sides, which is the answer itself and is therefore unavailable. The
   arithmetic mean is the best you can do with two numbers, addition, and division by two. That
   limitation is the reason the algorithm exists, and saying it out loud beats letting somebody
   catch it later.
2. A participant who proposes the harmonic mean `2/(1/lo + 1/hi)` instead has proposed the same
   rectangle. Because `lo * hi = 2026`, the harmonic mean of the two sides equals `2026` divided by
   their arithmetic mean, so it is the **other side** of the very same next rectangle. Verified over
   20000 sampled widths in the reference script, worst relative mismatch 4.529e-16. This is worth a
   sentence on screen, because it turns a wrong-looking answer into the same answer seen from the
   other side.

The in-page code panel lives here. See section 13.

### Scene 4. The digits. `scene4.js`

The payoff. Runs Carlos's table from 45 to convergence and adds one column: how many leading digits
of `theta` are correct.

| k | theta | 2026 - theta^2 | correct digits |
|---|---|---|---|
| 0 | 45 | 1 | 3 |
| 1 | 45.011111111111111111111... | -1.234568e-04 | 6 |
| 2 | 45.011109739707616775008... | -1.880748e-12 | 14 |
| 3 | 45.011109739707595882970... | -4.364772e-28 | 30 |
| 4 | 45.011109739707595882970... | -2.350843e-59 | 61 |

Three, six, fourteen, thirty, sixty one. The count doubles. Watching a number double five times in
five clicks is the astonishing part, and it is real.

**The definition of "correct digits" is on screen**, because two reasonable definitions disagree
here and an undefined counter is a fabricated counter. The column counts leading decimal digits of
`theta` that agree with `sqrt(2026)`, which is what the participant can check by eye against the
printed root. The standard numerical-analysis measure, `-log10` of the relative error, reads
3.608, 7.516, 15.333, 30.968, 62.236 on the same five rows. Both double. The reference script
prints both columns side by side so nobody has to trust either.

Three more things in this scene, in order:

**The loupe ladder.** The magnification needed to see the mismatch between the two sides is
`10^d`, where `d` is the digit count already achieved. So the loupe powers read 10^3, 10^6, 10^14,
10^30, 10^61, and the mismatch under the loupe stays between 4 and 36 pixels at every step
(computed values 35.56, 4.39, 6.69, 15.52, 8.36 px). The digit count doubling and the loupe power
doubling are the same fact, and the loupe is the one the room can watch.

**Where the computer runs out.** After three corrections `theta` matches the root to 30 digits, and
a double holds about 16. If scene 4 computed its own numbers in JavaScript the collapse would
appear to stall, because in IEEE doubles the gap between the two sides reads 4.973799e-14 at k=2
where the mathematics says 4.178407e-14, and at k=3 it reads 7.105427e-15, which is exactly one ulp
at 45. The algorithm passes double precision at step 3 and keeps going. This is a real beat, worth
one line on screen and worth an entry in section 10.4, since the built precompute currently pins the
double artifact as though it were the mathematics.

**Two comparisons on the same axes**, because doubling means nothing without something to double
against.

- **Bisection** on `[45, 46]`: 20 steps to a bracket of width `1e-6`, 34 steps to `1e-10`. Its
  digit column over the first twenty steps reads 2, 2, 3, 3, 4, 3, 5, 3, 4, 5, 4, 7, 6, 6, 6, 6, 6,
  6, 8, 8. It buys about a third of a digit per step, and it is not even monotone. After two
  corrections Heron has 14 digits and bisection has 2.
- **A fixed nudge**, which is Carlos's arrow update with a fixed step size. From 45 with
  `alpha = 0.1` the sequence is 45.0, 45.1, 45.0, 45.1 immediately and forever, and it never gets
  closer than 1.1110e-02. With `alpha = 0.01` the floor is 1.1097e-03, with `alpha = 0.001` it is
  1.0974e-04. The orbit radius is set by alpha. That is the bridge to Act 2, and it arrives as a
  measured fact rather than as a promise.

### Scene 5. The bridge. `scene5.js`

A mapping table as the whole scene, in the shape the AINIT deck uses for its Faust frame and that
grasshopper uses for its REINFORCE hand-off (`/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/js/explain.js`, the `exp-table`
at lines 513 to 529, whose rows are `theta`, `J(theta)`, `grad J(theta)`, `alpha`, and a local
maximum).

| | Heron, this exercise | The genie, Act 2 | Gradient descent, 11:00 |
|---|---|---|---|
| the guess | `theta`, a width | `theta` | `w`, a weight |
| what you can measure | the other side, `2026/theta` | `1 + 1/theta` | the slope under your feet |
| the verdict | too wide or too tall | too large or too small | uphill or downhill |
| how far to move | the average of the two sides | `alpha` times the gap, with `alpha` shrinking | `alpha` times the slope |
| what it costs | 2 corrections from 45 | many, and noisy | many, and noisy |

The last row is where the three separate. The closing line of the scene, written as the last
ordinary line of body text and not as a centred slogan: Heron can compute its correction exactly
because it can evaluate the target. Once the target is only visible through noise the exact
correction is unavailable and the step size becomes a knob, which is Act 2. Once the thing being
corrected is a loss surface, that knob is the learning rate, which is 11:00.

Three answers to the one question Carlos's Update column leaves open. The arrow gives the
direction. These three give the distance.

---

## 7. The discovery mechanic, and the three theorems it stands on

The brief requires the participant to discover averaging before it is named, with no HUD showing
`sqrt(2026)`. That is the skill's never-do list at line 581: "Display the answer before the student
attempts it." The bracket does this, and its honesty rests on three statements, each verified by
sweep rather than asserted.

**Theorem 1. The bracket always straddles the answer.** For any width `theta > 0`, `sqrt(2026)`
lies between `min(theta, 2026/theta)` and `max(theta, 2026/theta)`. So the viz can draw a region
that provably contains the target without drawing the target.

**Theorem 2. Any guess outside the current bracket makes the next bracket strictly wider.** The
bracket width is `|theta - 2026/theta|`, which decreases on `(0, sqrt(2026))` and increases above
it, and the two endpoints of a bracket have equal width. So the viz can truthfully tell a
participant "that made it worse" while revealing nothing beyond what the shape already shows.

**Theorem 3. The midpoint of the bracket is exactly one Heron step.** `(lo + hi)/2` equals
`(theta + 2026/theta)/2`. The participant who reasons "I know nothing except that it is in here, so
I will take the middle" has derived the algorithm.

Verification run, Mulberry32 seeded with 2026, 300000 log-uniform widths over `(0.01, 10000]`:

```
samples 300000 | straddle violations 0 | outside-widens violations 0 | midpoint-is-Heron violations 0
```

A separate sweep of 40000 starts spaced 0.25 apart over `(0.25, 10000]` confirms the AM-GM
invariant scene 3 claims: after one correction, zero iterates fall below `sqrt(2026)`.

Bracket widths under Heron from `theta = 10`, the scene 2 start, pinned:

```
k=0  theta=10.0                bracket=[10.000000, 202.600000]  width=192.600000
k=1  theta=106.3               bracket=[19.059266, 106.300000]  width=87.240734
k=2  theta=62.679633113828786  bracket=[32.323099,  62.679633]  width=30.356534
k=3  theta=47.501366165227359  bracket=[42.651405,  47.501366]  width=4.849961
k=4  theta=45.076385515600775  bracket=[44.945928,  45.076386]  width=0.130457
k=5  theta=45.011157003112478  bracket=[45.011062,  45.011157]  width=0.000095
```

Read that column in the room: the first correction from a terrible start still cuts the bracket by
55 percent, and the participant can see it happen. The correct-digit count on the same six rows
reads 0, 0, 0, 1, 3, 6, so early Heron looks slow in digits while the bracket is already collapsing.
Scene 2 shows the bracket. Scene 4 shows the digits. Neither scene shows the other's column.

---

## 8. The loupe, and why the verdict stays physical

The brief asks for a verdict that is physical and never merely a sign. Between `theta = 10` and
`theta = 44` that is free: the rectangle is visibly tall. From `theta = 45` onward the mismatch is
sub-pixel and the requirement would quietly lapse into a printed minus sign, which is the thing the
brief rules out.

The loupe keeps the promise. It is a second, small panel showing the top right corner of the
rectangle at magnification `M`, where the two sides overshoot each other by
`|theta - 2026/theta|`. `M` is printed at all times, and the ladder is a power of ten the
participant steps through.

| after k corrections from 45 | gap in units | gap at 1.6 px per unit | loupe | gap under the loupe |
|---|---|---|---|---|
| 0 | 2.222222e-02 | 0.035556 px | 10^3 | 35.56 px |
| 1 | 2.742807e-06 | 0.0000044 px | 10^6 | 4.39 px |
| 2 | 4.178407e-14 | below 1e-13 px | 10^14 | 6.69 px |
| 3 | 9.697100e-30 | below 1e-29 px | 10^30 | 15.52 px |
| 4 | 5.222807e-61 | below 1e-60 px | 10^61 | 8.36 px |

The loupe power required is `10^d` with `d` the digit count, so **the magnification exponent and
the digit count are the same number**, and both double. That is quadratic convergence stated as
something the room watches rather than as a phrase in a caption.

Two implementation consequences, both binding:

- The loupe is participant driven and its factor is always on screen. This is a knowing departure
  from the fixed-scale rule that makes grasshopper's local view work
  (`/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/js/localview.js`, header comment at line 5: "The scales are fixed for the
  whole level"). There the fixed scale is the lesson, because it makes a flat shelf look flat. Here
  the collapse across scales is the lesson, so the scale change has to be visible and deliberate.
- **JavaScript cannot compute these numbers.** `theta - 2026/theta` in doubles is 0 from the third
  correction on. Every value in the table above is pre-rendered by the Python precompute as a
  string, and the browser only draws a bar of a pinned pixel length. See section 10.

---

## 9. What is withheld, and until when

| Withheld | Until |
|---|---|
| The value `sqrt(2026) = 45.011...` anywhere on screen | scene 4, after the participant has run the update themselves |
| A tick, marker or dashed line at the target on any ruler | scene 4 |
| The word "average" and the formula | scene 3, after the scene 2 gate |
| The phrase "quadratic convergence" | scene 4, and only after the digit column has doubled twice on screen |
| The words `alpha`, learning rate, gradient, loss | scene 5, as names of what comes next |
| A colour legend explaining the palette | never. Skill line 582 |

`sqrt(2026)` to 70 places does live in `data/datasets.js`, because scene 4's digit counter has to
compare past double precision. That is a data file a curious participant could open, and it is the
same trade grasshopper makes by pinning its summit heights in `js/landscapes.js`. The rule is about
the interface.

---

## 10. Data

### 10.1 `data/datasets.js`

Loaded by a plain `<script src>` per the skill's inline data convention at lines 289 to 298.
Everything below is generated. Nothing is typed by hand.

```js
window.DATA = {
  area: 2026,

  // sqrt(2026) to 70 decimal places. Used ONLY by scene 4's digit counter and
  // never rendered before it. Scenes 0 to 3 withhold the answer on purpose.
  rootDigits: "45.0111097397075958829704972725289687211458720691022705493224167496535911",

  // Carlos's table from his start. Exact decimal strings, produced by Python
  // Decimal at 220 digits. digits is the leading-digit agreement with
  // rootDigits; relDigits is -log10 of the relative error, printed beside it
  // so the definition on screen is checkable.
  heron45: [
    { theta: "45",                      residSci: "1",                digits: 3,  relDigits: 3.608,  gapSci: "2.222222e-2"  },
    { theta: "45.0111111111111111...",  residSci: "-1.2345679e-4",    digits: 6,  relDigits: 7.516,  gapSci: "2.742807e-6"  },
    { theta: "45.0111097397076167...",  residSci: "-1.8807475e-12",   digits: 14, relDigits: 15.333, gapSci: "4.178407e-14" },
    { theta: "45.0111097397075958...",  residSci: "-4.3647721e-28",   digits: 30, relDigits: 30.968, gapSci: "9.697100e-30" },
    { theta: "45.0111097397075958...",  residSci: "-2.3508435e-59",   digits: 61, relDigits: 62.236, gapSci: "5.222807e-61" }
  ],

  // scene 4's loupe ladder. power is the exponent of ten; px is how wide the
  // mismatch is under that loupe at view.pxPerUnit. The browser draws px and
  // computes nothing.
  loupe: [
    { k: 0, power: 3,  px: 35.56 }, { k: 1, power: 6,  px: 4.39 },
    { k: 2, power: 14, px: 6.69 },  { k: 3, power: 30, px: 15.52 },
    { k: 4, power: 61, px: 8.36 }
  ],

  // scene 2's start and the bracket trace it produces
  heron10: [ { theta: 10.0, lo: 10.0, hi: 202.6, width: 192.6 }, /* six rows */ ],

  // scene 4's comparisons
  bisection: { interval: [45, 46], stepsTo1e6: 20, stepsTo1e10: 34,
               digitColumn: [2,2,3,3,4,3,5,3,4,5,4,7,6,6,6,6,6,6,8,8] },
  fixedNudge: [
    { alpha: 0.1,   cycle: [45.0, 45.1],     closest: 0.01110973970759943 },
    { alpha: 0.01,  cycle: [45.01, 45.02],   closest: 0.0011097397076014204 },
    { alpha: 0.001, cycle: [45.011, 45.012], closest: 0.00010973970762506724 }
  ],

  // the "does the start matter" aside: corrections to |2026 - theta^2| < 1e-6
  stepsToTol: { 1: 10, 10: 6, 45: 2, 100: 5, 500: 7, 2026: 10 },

  // what the participant's own Python prints, so the page and the notebook agree
  doubles: { otherSideAt45: 45.022222222222226, otherSideAt15: 135.06666666666666,
             otherSideAt10: 202.6, stepFrom45: 45.01111111111111,
             rootDouble: 45.0111097397076,
             widthsFrom45: [2.222222e-2, 2.742807e-6, 4.973799e-14, 7.105427e-15],
             ulpAt45: 7.105427357601002e-15 },

  // one fixed drawing frame, so nothing auto-fits. thetaMin * thetaMax = 2026
  // exactly, which is what makes the domain closed under theta -> 2026/theta.
  view: { thetaMin: 10, thetaMax: 202.6, pxPerUnit: 1.6,
          stageW: 620, stageH: 400, originX: 56, originY: 360 }
};
```

### 10.2 `precompute/build_data.py`

Python, `decimal.Decimal`, `getcontext().prec = 220`. Emits `data/datasets.js` byte identically on
every run, so `diff` is a regression test. It asserts, in code, with a nonzero exit that skips
writing the file:

- `45**2 == 2025`, so Carlos's first residual is exactly 1.
- The digit column reads `[3, 6, 14, 30, 61]`.
- Each digit count is at least `2 * previous - 1`, which is the quadratic claim written as code.
- The residual is positive at `k = 0` and negative for every `k >= 1`, the AM-GM invariant.
- Theorems 1, 2 and 3 of section 7 over 300000 samples, zero violations.
- The AM-GM sweep over 40000 starts, zero iterates below the root after one correction.
- The harmonic mean of the two sides equals `2026` over their arithmetic mean, worst relative
  mismatch under `1e-12` over 20000 samples.
- The exact gap column reads `2.222222e-02, 2.742807e-06, 4.178407e-14, 9.697100e-30, 5.222807e-61`.
- Every loupe pixel width lands between 4 and 40 px, so the ladder is usable at every step.
- Bisection needs 20 steps to `1e-6` and 34 to `1e-10`.
- Every fixed nudge enters a two cycle whose closest approach is within a factor of two of alpha.
- `view.thetaMin * view.thetaMax == 2026`, so the frame is closed under the reciprocal map.
- No NaN and no null anywhere in the emitted payload.

### 10.3 On the seeded RNG

The skill forbids `Math.random()` in a precompute script and requires a seeded RNG with the seed
pinned at the top of the file (line 300 and line 592). **Heron needs no randomness at all.** Every
value in `data/datasets.js` is a deterministic function of 2026 and the chosen starts, which is the
strongest form of compliance available: the file reproduces because there is nothing to reproduce.

Randomness enters in exactly one place, the theorem sweep, and the rule there is:

- Use **Mulberry32 seeded with 2026**. `proposals/viz-heron-reference.py` ships a Python port of
  Mulberry32 so that the sweep can be re-run in Node against the same stream and give the same
  answer. The built `precompute/build_data.py` currently uses Python's `random.seed(2026)`, which is
  seeded and pinned and therefore honest, and which no Node re-implementation can reproduce. Section
  17 lists the swap as a small piece of work.
- The seed is pinned once at the top of the file and is never tuned to make a sweep pass.
- If a later revision adds a noisy-target teaser to scene 5 to foreshadow Robbins-Monro, that jitter
  is generated in precompute with the same seeded stream and shipped as a fixed array. No
  `Math.random()` at runtime either, because a demo that differs between the rehearsal and the
  lecture has stopped being a demo.

### 10.4 The double-precision trap, and a correction to the built code

This one is worth its own subsection because it is already in the tree and it teaches the wrong
thing silently.

The bracket width three corrections in from 45 is **4.178407e-14**. Computed in IEEE doubles the
same quantity reads **4.973799e-14**, a discrepancy of 7.954e-15, which is 1.12 ulp at 45. One step
later the double trace reads 7.105427e-15, which is exactly `math.ulp(45.0)`: from there on the
double computation is measuring its own rounding error.

Two places in the built scaffold pin the double artifact as though it were the mathematics, and
both need the exact value instead:

```
initial-states/hs26-bmai-w1-opt-heron/precompute/build_data.py:305-309
initial-states/hs26-bmai-w1-opt-heron/js/scenes/scene4.js:40
```

The general rule for this viz, which belongs in the directory CLAUDE.md: any quantity below about
`1e-14` comes from `Decimal`, is shipped as a string, and is never recomputed in the browser. This
is the skill's own debugging discipline at lines 334 to 367 applied before the bug rather than
after it: when a number looks wrong, check the data layer first.

---

## 11. Files and fan-out

One sibling folder, per hard requirement 4. Nothing in grasshopper is edited.

```
initial-states/hs26-bmai-w1-opt-heron/
  CLAUDE.md                     contract for the next agent            MISSING, see section 17
  README.md                     what it is and how a TA runs it        MISSING, see section 17
  index.html                    script order load-bearing and commented
  css/
    style.css                   copied from grasshopper, colour identities re-pinned
    scene0.css .. scene5.css    one per scene
  js/
    theme.js                    copied from grasshopper, KEY changed to "heron-theme"
    main.js                     scene engine, hash router, dot pager, prev/next
    heron.js                    the mathematics, single source of truth
    rectview.js                 the rectangle panel, fixed scale, locked box
    rulerview.js                the bracket ruler for scene 2          TO BUILD
    loupe.js                    the magnifier for scenes 1, 3 and 4    TO BUILD
    katex-helpers.js            copied from bandits/js/katex-helpers.js
    stub.js                     renders an unbuilt scene as its own spec
    scenes/
      scene0.js .. scene5.js
  data/
    datasets.js                 window.DATA, generated
  vendor/
    katex.min.css, katex.min.js, fonts/
  precompute/
    build_data.py               generator plus verifier, exits nonzero on failure
  issue-prompts/                one markdown file per unit of work     EMPTY, see section 17
  exercise/                     the coding half, see section 13        EMPTY, see section 17
  docs/                         screenshots kept for the handover      EMPTY
```

`vendor/d3.min.js` is deliberately absent. Grasshopper vendors d3 and KaTeX; two rectangles, a
ruler and a table need neither, and a smaller folder travels better through Moodle. KaTeX is
vendored because scenes 3, 4 and 5 set formulas.

**Fan-out.** Six scenes is the skill's threshold at line 228. Bundle for tonal coherence and not for
parallelism (line 239):

- Agent A: scenes 0, 1, 2 with `rectview.js`, `rulerview.js` and `loupe.js`. This is the tonal
  triplet and the skill forbids splitting it. It is also the pedagogically load-bearing block.
- Agent B: scenes 3 and 4, plus the in-page code panel. Naming and payoff, one voice.
- Agent C: scene 5, the README and the CLAUDE.md. Light work, similar register.
- Phase 0.5, parallel with all of it: `precompute/build_data.py`. Its first job is the section 7
  validation, its second is emitting the file, its third is the assertion list in section 10.2. Its
  invariant claims have to be checkable from the produced file, and the aggregator spot-checks them
  rather than trusting the report (skill line 589).

Phase 0, sequential and done before any fan-out: `index.html`, `css/style.css`, `js/theme.js`,
`js/main.js`, `js/heron.js`, and six scene stubs that register and render their own specification.
This phase is already complete. See section 17.

---

## 12. Theme, palette, colour identities

Copy `css/style.css` and `js/theme.js` from `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/`. `js/theme.js` needs exactly one
edit: `var KEY = "grasshopper-theme"` at line 11 becomes `"heron-theme"`. Everything else in that
file is already correct. It stamps `data-theme` on `<html>`, defaults to light, persists to
`localStorage`, binds `t` with a guard against typing in a form field (lines 61 to 66), and accepts
a `?theme=` override from query or hash (lines 43 to 46). That override is what makes the dark
screenshots in section 15 possible. This is the same one-line copy that
`/Users/carloscotrini/Documents/git_fdd/projects/lunar-lander-game/` made.

Tokens, read from `grasshopper/css/style.css` in this session. Light at lines 17 to 39, dark at
lines 91 to 107. Both blocks are quoted here because a build should not have to re-open the file:

```
light   --bg #f9f7f1  --panel #fffdf8  --ink #1a1a1a  --muted #6b6b6b  --rule #d8d4ca
        --blue #2f6cb1  --red #b8323a  --amber #c08a3e  --purple #7a5c8c
        --green #4a8b6b  --orange #a05a2c

dark    --bg #181612  --panel #201d18  --ink #ece7d9  --muted #8a8579  --rule #383530
        --blue #6fa3d8  --red #d97b80  --amber #d1a04c  --purple #a98cc0
        --green #6cae8b  --orange #c9824f
```

The light values match the skill's palette at lines 48 to 52 exactly. The skill gives no dark
categorical values, only "lighter, less saturated companions" at line 57; the dark hexes above are
grasshopper's, which is the house's only worked answer to that instruction.

Colour identities, fixed once at the head of `style.css` in the same comment-block style
grasshopper uses at its lines 8 to 13, so nothing cross-talks (skill line 67):

- **blue** the width you control, and the update arrow
- **amber** the height that follows from the area, and the bracket
- **purple** the trail of widths already tried
- **green** the converged square, and only once it has converged
- **red** a guess that widened the bracket

No inline fills anywhere. Every stroke routes through a class, so the theme swap is free.

**One trap specific to this viz.** The rectangle panel and the loupe are boxes inside a flex
container, which is the exact case the never-do list closes on at line 593: the layout box gets
stretched by `align-items: stretch`, it renders correctly in the browser and captures as a thin
slice under headless. Lock both:

```css
.rect-stage { width: 620px; height: 400px; flex: 0 0 auto; }
.loupe-stage { width: 240px; height: 160px; flex: 0 0 auto; }
```

with the HTML `width` and `height` attributes matching those numbers exactly.

---

## 13. The coding part

### 13.1 Decision: in-page blanks in the room, one shared notebook for the block

The house convention for BMAI coding exercises is a Colab notebook with a student version and a
solutions version kept in sync. The constraint pushing the other way is section 1: three exercises
inside a thirty minute block. Opening Colab, signing in, and running a setup cell costs a few
minutes, and paying that three times inside thirty minutes spends a large fraction of the block on
boot. I have not timed a Colab boot for this cohort, so treat the size of that cost as an estimate.

The recommendation has two halves.

1. **The viz carries the code in page, and this is the primary deliverable for the room.** A
   read-only Python-shaped block with three blanks, checked by normalized string match against an
   allowlist. The pattern is already proven in this course family:
   `/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/index.html` lines 416 to 418 hold three
   `<input class="inline" data-e1="...">` blanks inside a syntax-coloured `<pre class="template">`,
   line 533 defines `norm()` as strip-all-whitespace plus quote normalization, and lines 547 to 548
   hold the accepted-answer allowlist. A participant who never reaches Colab still writes the
   update, and the ten minute path stays intact.
2. **The 10:00 block ships one Colab notebook rather than three**, `hs26-bmai-w1-opt.ipynb`, with
   Part 1 Heron, Part 2 the genie and Robbins-Monro, Part 3 the house-price fit. One setup cell, one
   boot, three exercises. Jinlei, Daniele and Ivan own Part 1. This needs agreement from the other
   two TA teams, so it is open question 2 rather than a technical call I can make here.

One departure from the darts precedent, made deliberately: darts locks the next chapter until every
blank is right. Here the blanks do **not** gate scene 4. With ten minutes and a TA holding the room
together, a lock screen turns a discovery into a queue. The blanks give feedback and record
completion, and the TA decides when the room moves on.

### 13.2 Stub

```python
AREA = 2026

def other_side(theta, A=AREA):
    """The rectangle has area A and width theta. Return its height."""
    # TODO: one line. The area has to come out to A.
    return ___

def verdict(theta, A=AREA):
    """Return 'too small', 'too large', or 'exact'."""
    # TODO: compare theta squared against A
    ...

def heron_step(theta, A=AREA):
    """One correction. Return the next width."""
    # TODO: average the two sides of the rectangle
    return ___

def heron(A=AREA, theta0=45.0, tol=1e-6, max_steps=50):
    """Correct until |A - theta**2| < tol. Return every width visited,
    starting with theta0."""
    thetas = [theta0]
    # TODO: the loop. Stop on the tolerance or on max_steps.
    return thetas
```

The three in-page blanks are `other_side`'s return, `heron_step`'s return, and the stopping test.
Accepted answers after normalization, which strips all whitespace and lowercases:

- `a/theta`, `2026/theta`
- `(theta+a/theta)/2`, `(theta+2026/theta)/2`, `(a/theta+theta)/2`, `0.5*(theta+a/theta)`
- `abs(a-theta*theta)<tol`, `abs(a-theta**2)<tol`, `abs(theta*theta-a)<tol`, `abs(theta**2-a)<tol`

The harmonic-mean form `2/(1/theta+1/(a/theta))` is a correct answer to a different question, since
by section 6 it returns the height rather than the width. Accept it with a one-line message saying
so, which turns the most interesting wrong answer into the scene 3 aside.

### 13.3 Sanity checks

One cell before anything expensive, in the FS26 shape: build a tiny case, call the student function
once, print pass or the exception type and message, and say to fix it before continuing. Every
expected value below is an IEEE double printed by the reference script.

```python
assert abs(other_side(45.0) - 45.022222222222226) < 1e-12
assert abs(other_side(10.0) - 202.6)              < 1e-12
assert verdict(45.0) == 'too small'      # 45**2 = 2025
assert verdict(46.0) == 'too large'      # 46**2 = 2116
assert abs(heron_step(45.0) - 45.01111111111111) < 1e-12
assert len(heron(theta0=45.0)) == 3      # theta0 plus two corrections
assert len(heron(theta0=10.0)) == 7      # theta0 plus six corrections
```

Then the invariant check, which is the one that teaches something:

```python
xs = heron(theta0=10.0)
assert all(x * x >= AREA - 1e-9 for x in xs[1:]), \
    "after the first correction the rectangle should never be tall again"
```

A participant who trips that assertion has usually written `theta - A/theta` somewhere. The message
points at the geometry rather than at the algebra, which is the whole design.

### 13.4 The digit cell

A given cell with no TODO, which prints the scene 4 table from the student's own `heron`, using
`decimal.Decimal` at 220 digits for the reference root. It ends by printing the digit column:
`3 6 14 30 61`. The participant watches their own code produce the doubling.

This cell also carries two warnings as comments, because a participant who edits it hits both:

```
#  "%.60f" % some_decimal converts the Decimal to a float first, so it prints
#  sixty digits of a sixteen-digit number. Use Decimal.quantize and str().
#  Comparing str(45) against the root under-counts: pad both to the same number
#  of decimal places before comparing.
```

Both were hit while writing this proposal. The first produced a digit column reading 3, 6, 14, 62,
62, which looked like a discovery about convergence and was a formatting bug.

### 13.5 Debrief

The FS26 paste-to-LLM debrief machinery is built for a forty minute agent game and is too heavy for
a ten minute exercise. Use the lighter spine the same repository uses for its non-agent exercises: a
`### What just happened?` markdown cell with a code-free discussion list.

Three questions, all answerable from what is on screen:

1. The residual column changes sign once and then never again. Which step is the sign change, and
   what does it say about the shape of every rectangle after it?
2. Bisection needed 20 corrections to reach a bracket of width `1e-6`. Heron needed 2 from the same
   start. Where does the extra information come from, given that both of them can only evaluate
   `theta**2`?
3. Heron computes its correction exactly. Name the thing you would have to stop knowing for that to
   become impossible. This is the question Act 2 answers.

If a group finishes early and wants an LLM to take them further, the notebook prints the coach
contract that the FS26 solutions notebooks use: diagnose, ask one or two targeted questions, hint at
a strategy, implement one piece together, and never hand back a complete drop-in function. Two FS26
v1.5 notebooks disagree with each other about that contract, so this exercise states in its own
CLAUDE.md which side it is on.

### 13.6 Solutions notebook

`hs26-bmai-w1-opt_solutions.ipynb`, differing from the student version **only in the TODO cell
bodies**. Banner comments, hint comments, print statements and cell count stay byte identical, which
is the measurable sync rule from the FS26 repository. A `/sync-notebooks` style check should report
zero structural drift.

---

## 14. Acceptance criteria a TA can check

Each of these is observable in under a minute with no reading of source.

**Runs at all**

1. `open index.html` straight from `file://`, with no server. The rectangle draws. The console is
   empty.
2. `grep -rn "fetch(\|cdn\|https://" index.html js/ css/` returns nothing outside comments.

**The withholding rule**

3. Screenshot scenes 0, 1, 2 and 3. The string `45.011` appears in none of them.
4. Screenshot scene 4. It appears there.
5. No ruler in scenes 0 to 3 carries a tick, dash or marker at the target.
6. `grep -rn "alpha\|learning rate\|gradient" js/scenes/scene0.js js/scenes/scene1.js js/scenes/scene2.js js/scenes/scene3.js js/scenes/scene4.js` returns nothing in participant-facing strings.

**The rectangle is honest**

7. Set `theta = 15`, then `theta = 100`. The drawn rectangle covers the same pixel area both times
   to within 1 square pixel, and the sides read `15 x 135.0667` and `100 x 20.26`.
8. At `theta = 45.0111` the verdict reads too small. At `theta = 45.0112` it reads too large.
   (`45.0111**2 = 2025.9991232099999`, `45.0112**2 = 2026.0081254400002`.)
9. The width control cannot leave `[10, 202.6]`, and both endpoints draw a rectangle that fits the
   frame.

**The bracket**

10. In scene 2 from `theta = 10`, entering `300` reports a wider bracket. Entering `50` reports a
    narrower one.
11. Entering `106.3` gives bracket width `87.240734`.
12. Scene 2 never draws a mark at 45.011, at any zoom level.

**The payoff**

13. Scene 4's digit column reads `3, 6, 14, 30, 61`.
14. Scene 4's loupe ladder reads `10^3, 10^6, 10^14, 10^30, 10^61`, and the mismatch stays visible
    at every rung.
15. Scene 4's bisection comparison reads 20 steps and 34 steps, and its digit column is visibly not
    monotone.
16. Scene 4's fixed nudge with `alpha = 0.1` shows the cycle `45.0, 45.1, 45.0, 45.1`.
17. The gap column three steps in reads `4.178407e-14`. If it reads `4.973799e-14` the scene is
    computing in doubles and section 10.4 has not been applied.

**Engine and theme**

18. `index.html#scene=4` loads directly into the digits scene. Editing the hash to `#scene=2` moves
    there with no reload.
19. `t` toggles the theme from any scene. Both themes are legible in all six.
20. Arrow keys step within a scene first, and change scene only when the internal cursor is
    exhausted.
21. Entering scene 5 through the dot pager without visiting scenes 0 to 4 renders correctly, which
    is the cold-entry rule at skill line 207.

**Data**

22. `python3 precompute/build_data.py` run twice produces byte identical `data/datasets.js`,
    checkable with `diff`.
23. Corrupting one pinned digit in the script makes it exit nonzero and leave `data/datasets.js`
    unwritten.

**Coding**

24. The solutions notebook has the same cell count as the student notebook, and the differing cells
    are exactly the TODO cells.
25. Every sanity assertion in section 13.3 passes against the solutions notebook.

---

## 15. Verification, in the skill's order

The checklist at skill lines 564 to 574 is: edit, parse-check, screenshot, **read the PNG**, add a
`?test=` hook for states a screenshot cannot reach, walk both themes, then commit.

**0. Data first.** Recipe step 0 at skill line 605 says validate that the data tells the story
before any UI code. Run `precompute/build_data.py` and read its invariant report. If the digit
column does not read 3, 6, 14, 30, 61, stop and fix the data before touching a line of UI.

**1. Parse check** every JS file with the `new Function(code)` loop at skill lines 398 to 405.

**2. Headless screenshots**, both viewports, both themes, all six scenes:

```bash
CHROME="$(command -v google-chrome || command -v chromium \
  || echo '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')"
DIR=/abs/path/to/hs26-bmai-w1-opt-heron
PROFILE="$SCRATCH/heron-chrome"          # its own profile, always
for n in 0 1 2 3 4 5; do
  for w in "1280,800" "1920,1080"; do
    for th in light dark; do
      "$CHROME" --headless --disable-gpu --virtual-time-budget=4000 \
        --user-data-dir="$PROFILE" --window-size=$w \
        --screenshot=/tmp/heron_${n}_${w%%,*}_${th}.png \
        "file://$DIR/index.html#scene=$n&theme=$th&instant"
    done
  done
done
```

Give headless Chrome its own `--user-data-dir` under the scratchpad and clean up with a `pkill`
scoped to that path. A bare `pkill -f "Google Chrome"` takes down the operator's real browser, which
has cost this project a session before.

**3. Read every PNG.** Skill line 445: "Open the PNG. Don't skip this." The scenes most likely to
fail, and what to look for:

- Scene 0 at `theta = 10`: the rectangle is 16 px wide and 324 px tall at the pinned scale. Check
  that both edge labels are legible instead of colliding at the corner.
- Scene 1 at 1280x800: five columns plus the live rectangle plus the loupe. This is the densest
  layout in the viz.
- Scene 4: the digit column, the loupe ladder and the two comparison traces on one screen.
- Every scene in dark. A scene that reads weakly in one theme gets redesigned instead of shipped
  (skill line 410).

**4. `?test=` hooks**, baked in from day 1 per skill lines 469 to 493, and named in the `js/main.js`
header comment. The built engine already documents these:

| Hook | Kind | Effect |
|---|---|---|
| `#scene=N` | deep link | the lecturer jumps mid-lecture |
| `?theme=dark` | dev | forces a theme, handled in `theme.js` |
| `&instant` | dev | skips the fade so a capture cannot land mid-fade |
| `&run` | dev | clicks the scene's single `[data-run-primary]` control |
| `&step=K` | dev | fires `onNextKey` K times to reach a mid-scene state |
| `?test=swept` | dev | scene 0 with the ghost trail accumulated |
| `?test=table` | dev | scene 1 with all five steps filled |
| `?test=widened` | dev | scene 2 after a guess outside the bracket |
| `?test=narrowed` | dev | scene 2 after three good guesses |
| `?test=magnified` | dev | scene 4 at the top of the loupe ladder |

Without `?test=widened` and `?test=narrowed` the two most important states in the viz cannot be
screenshotted at all, because they exist only after typed input.

**5. Both themes by hand**, light first, since light is the lecture default.

---

## 16. Timing

Ten minutes, on the thirty minute reading of the schedule.

| | |
|---|---|
| 0:00 to 0:02 | Scene 0. Sweep the rectangle. Fail to find the square by eye. |
| 0:02 to 0:04 | Scene 1. Carlos's table, one row, start 45. The eye runs out, the residual does not. |
| 0:04 to 0:07 | Scene 2. The bracket game, three guesses. The discovery happens here and this is the one scene that must not be rushed. |
| 0:07 to 0:08 | Scene 3. The TA names it and draws the midpoint. |
| 0:08 to 0:09 | Scene 4. The digit column. This is the moment of the exercise. |
| 0:09 to 0:10 | Scene 5. The bridge table, and the sentence that sets up Act 2. |

The in-page blanks are filled during scene 3 by the participants who work fast, while the TA is
still with the rest of the room.

**If the block is really sixty minutes**, add in this order: the in-page blanks become mandatory
rather than optional; scene 2 gains a second start (`theta = 500`, 7 corrections to tolerance) so
groups can race; scene 4 gains the "does the start matter" panel driven by `DATA.stepsToTol`; and
Part 1 of the notebook is done in the room instead of at home. No seventh scene is added, because
six is already at the fan-out threshold.

---

## 17. Relationship to the scaffold that is already built

A partial build exists at `initial-states/hs26-bmai-w1-opt-heron/`. Read it before changing this
spec. Line counts are from this session.

| Built | Lines | State |
|---|---|---|
| `index.html` | 67 | complete, script order commented |
| `js/main.js` | 270 | complete: scene engine, hash router, dot pager, `&instant`, `&run`, `&step=K` |
| `js/theme.js` | 76 | complete, grasshopper copy |
| `js/heron.js` | 170 | complete: `otherSide`, `residual`, `verdict`, `shape`, `bracket`, `bracketWidth`, `step`, `run`, `fixedNudge`, `correctDigits` |
| `js/rectview.js` | 251 | complete |
| `js/katex-helpers.js` | 29 | complete, bandits copy |
| `js/stub.js` | 84 | renders an unbuilt scene as its own specification |
| `css/style.css` | 661 | complete |
| `data/datasets.js` | 186 | generated |
| `precompute/build_data.py` | 439 | generator plus 20 invariant checks |
| `js/scenes/scene0.js` | 283 | built |
| `js/scenes/scene1.js` | 341 | built |
| `js/scenes/scene2.js` | 52 | stub, deliberately unsketched |
| `js/scenes/scene3.js` | 47 | stub |
| `js/scenes/scene4.js` | 53 | stub |
| `js/scenes/scene5.js` | 47 | stub |

What is left, in the order it should be done. Each row is one issue-prompt file in the FS26 format
(`# Issue N: Title`, `## Goal`, `## Dependencies`, `## Context`, `## Deliverables`,
`## File Structure`, `## Verification`), and `issue-prompts/` is currently an empty directory:

1. **Fix the double-precision pin.** `precompute/build_data.py:305-309` and
   `js/scenes/scene4.js:40` carry `4.974e-14`. The exact value is `4.178407e-14`. Add the exact gap
   column and the loupe ladder to the emitted payload while there, and swap the sweep's
   `random.seed` for Mulberry32 so a Node re-run reproduces the stream. Section 10.
2. **`js/rulerview.js` and `js/loupe.js`.** Two shared views, no scene logic. Sections 6 and 8.
3. **Scene 2, the bracket.** One TA, and it must not be split from scene 3.
4. **Scene 3, Heron named**, including the in-page code panel. Sections 6 and 13.
5. **Scene 4, the digits**, including the loupe ladder, the double-precision beat and the two
   comparisons.
6. **Scene 5, the bridge table.**
7. **`CLAUDE.md` and `README.md`.** Both are missing, and the house rule is that every directory
   carries a CLAUDE.md. The CLAUDE.md records: the withholding contract from section 9, the colour
   identities, the `Decimal`-only rule from section 10.4, the anti-collision table from section 3,
   and the debrief contract chosen in section 13.5.
8. **`exercise/`.** Currently empty. It holds Part 1 of the block notebook plus its solutions twin,
   or the whole notebook if open question 2 resolves that way.
9. **Full verification pass** per section 15, with the PNGs kept in `docs/`.

---

## 18. Open questions, for Carlos only

1. **Thirty minutes or sixty?** The spreadsheet says the CX block runs 10:00 to 10:30. The task
   brief says an hour. Everything in section 16 hangs on this.
2. **One notebook for the 10:00 block, or three?** One notebook pays the Colab boot once and needs
   all three TA teams to agree. Three notebooks are simpler to own and cost the block three boots.
3. **Does the residual keep Carlos's sign?** His page writes `2026 - theta^2`, so positive means
   the guess is too small. The AINIT genie writes `loss = Q - target`, so positive means too large.
   Participants meet both inside two hours. This proposal follows Carlos's page. Somebody has to
   decide whether the two exercises are reconciled or whether the difference is taught on purpose.
4. **`alpha` or `eta`?** Carlos's handwriting says alpha. `Minimum Lander Exploration.html` prints
   eta on screen. Heron itself has no step size, so this exercise can go either way and should match
   whatever the other two choose.
5. **Is the rectangle framing approved?** Carlos's page draws a square of side `sqrt(2026)`. The
   rectangle of fixed area with sides `theta` and `2026/theta` is an addition that makes the
   averaging update physical. It is faithful to the mathematics and it is still an addition.
6. **Does Heron get named as Heron?** The exercise works with no history at all, and a date or an
   attribution would need pinning against a primary source before it goes on screen. Nothing here
   currently claims one.
7. **Does the double-precision beat stay?** Section 6, scene 4. It is true, it is one line, and it
   costs perhaps thirty seconds of a ten minute exercise. It also introduces a second idea into the
   payoff scene.

---

## 19. What I verified, and what I did not

**Verified by reading the primary source in this session**

- Carlos's handwritten page 1, opened as an image: the five column table, the start at 45, the
  arrows-only Update column, the `2026` box, the `theta = sqrt(2026)` label, the Act 2 genie table,
  and the TODO line.
- `docs/master-schedule-weekend1.csv`: the 10:00 CX row with three slugs, the 10:30 coffee break,
  the 11:00 gradient descent lecture, the exercise title "CX First-order optimization: Heron's
  algorithm", and the TA names Jinlei, Daniele and Ivan.
- `course-viz/SKILL.md` in full, including the never-do list, the two interaction patterns, the
  scene contract, hash routing, the fan-out rules, the inline data convention, and the verification
  checklist. Every line number cited above was checked against the file.
- `grasshopper/js/theme.js` (74 lines; `KEY` at line 11, `?theme=` at 43 to 46, `t` at 61 to 66),
  `grasshopper/js/main.js` header (the deep-link versus dev-affordance split),
  `grasshopper/index.html` (shell and script order), `grasshopper/css/style.css` light block at 17
  to 39 and dark block at 91 to 107, `grasshopper/js/explain.js` (the two-levers passage at 434 to
  440 and the mapping table at 513 to 529), `grasshopper/js/localview.js` header (fixed scale).
- `bandits/js/katex-helpers.js`, 29 lines, the shim to copy.
- `rl-arcade/darts/index.html`: the three inline blanks at 416 to 418, `norm()` at 533, the accepted
  answer allowlist at 547 to 548.
- The built scaffold at `initial-states/hs26-bmai-w1-opt-heron/`: every file listed in section 17,
  the `SCENES` array in `js/main.js` at lines 37 to 44, the `view` block emitted by
  `precompute/build_data.py` at lines 360 to 362, and the check labels at lines 249 to 366.

**Verified by computation in this session**, all reproduced by `proposals/viz-heron-reference.py`

- `sqrt(2026) = 45.0111097397075958829704972725289687211458720691022705493224167496535911` to 70
  places, at 220 digits of working precision.
- `45**2 = 2025`, so Carlos's first residual is exactly 1.
- The digit column from 45 under the leading-digit definition: 3, 6, 14, 30, 61. Under `-log10` of
  the relative error: 3.608, 7.516, 15.333, 30.968, 62.236.
- The exact gap column from 45: 2.222222e-02, 2.742807e-06, 4.178407e-14, 9.697100e-30,
  5.222807e-61.
- The same column in IEEE doubles: 2.222222e-02, 2.742807e-06, 4.973799e-14, 7.105427e-15, where
  the last value is exactly `math.ulp(45.0) = 7.105427357601002e-15`.
- The loupe pixel widths at 1.6 px per unit under `10^d`: 35.56, 4.39, 6.69, 15.52, 8.36.
- Bracket widths from 10: 192.6, 87.240734, 30.356534, 4.849961, 0.130457, 0.000095, with digit
  counts 0, 0, 0, 1, 3, 6.
- Theorems 1, 2 and 3 over 300000 Mulberry32 samples seeded 2026: zero violations each.
- AM-GM over 40000 starts spaced 0.25 apart on `(0.25, 10000]`: zero iterates below the root after
  one correction.
- Harmonic mean equals `2026` over the arithmetic mean: worst relative mismatch 4.529e-16 over
  20000 samples.
- Doubles: `2026/45 = 45.022222222222226`, `2026/15 = 135.06666666666666`, `2026/10 = 202.6`,
  `(45 + 2026/45)/2 = 45.01111111111111`, `math.sqrt(2026) = 45.0111097397076`.
- Corrections to `|2026 - theta**2| < 1e-6`: from 1, ten; from 10, six; from 45, two; from 100,
  five; from 500, seven; from 2026, ten. So `len(heron(45.0)) == 3` and `len(heron(10.0)) == 7`.
- Bisection on `[45, 46]`: 20 steps to `1e-6`, 34 to `1e-10`, digit column
  2, 2, 3, 3, 4, 3, 5, 3, 4, 5, 4, 7, 6, 6, 6, 6, 6, 6, 8, 8.
- Fixed nudge from 45: `alpha = 0.1` enters the cycle 45.0, 45.1 immediately with closest approach
  1.1110e-02; `alpha = 0.01` gives 1.1097e-03; `alpha = 0.001` gives 1.0974e-04.
- Verdict flip: `45.0111**2 = 2025.9991232099999` reads too small, `45.0112**2 =
  2026.0081254400002` reads too large.
- The drawing frame: `10 * 202.6 = 2026`, so the domain is closed under `theta -> 2026/theta`, and
  the drawn area is `2026 * 1.6**2 = 5186.56` square pixels at every width.

**Not verified, and labelled as such**

- No screenshot was taken and no page was opened in a browser during this pass. Every statement
  about the built scaffold comes from reading its source. In particular the pixel geometry in
  sections 8 and 12 is arithmetic on `view`, and the aggregator should confirm it against a real
  screenshot before treating it as final.
- The claim that a Colab boot costs a few minutes for this cohort is an estimate from the shape of
  the FS26 setup cells rather than a timed measurement.
- Anything about Heron of Alexandria's dates or the history of the method. No primary source was
  consulted and none is cited anywhere in this proposal.
- I did not read the genie or house-price proposals in this pass, so section 3's anti-collision
  table is written from the schedule briefs and Carlos's page rather than from those specs. The
  authors of those two exercises should check the table against what they actually built.
- Whether `proposals/CLAUDE.md` has been updated to list `viz-heron-reference.py`. That file's own
  maintenance contract requires it, and the update belongs in the same commit as this one.
