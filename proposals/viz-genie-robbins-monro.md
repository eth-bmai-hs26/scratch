<!--
  Proposal for hs26-bmai-w1-opt-genie-rm, CAS BMAI HS26, Weekend 1 (Sep 4/5 2026).
  Rewritten 2026-08-26 against the primary sources. NOTHING IN THIS FILE IS DECIDED.
  It is a menu plus a build spec. Section 14 lists what only Carlos can settle.

  Every number in sections 4, 7, 9 and 11 is printed by
  proposals/viz-genie-rm-reference.mjs and asserted at the bottom of that file:

      node proposals/viz-genie-rm-reference.mjs      ends on "All assertions passed. (33 checks)"

  Sources actually opened while writing are listed in section 17.1. Where an
  earlier draft of this file and the reference script disagreed, the script won:
  section 4.3 records one such correction.
-->

# CX First-order optimization: Genie game and Robbins-Monro

Slug `hs26-bmai-w1-opt-genie-rm`. Friday 10:00 block. TAs Jinlei, Suei-Wen.

The schedule row was read at
`/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/docs/master-schedule-weekend1.csv`
lines 42 to 45. Verbatim, the cell spans two lines:

```
CX First-order optimization:
Genie game and Robbins-Monro
```

and the row carries `hs26-bmai-w1-opt-genie-rm`, the note
`See AINIT slides for RL here: https://github.com/eth-bmai-hs26/scratch`,
the two TA names, and in the right-hand column
`Teaching plan: https://www.overleaf.com/6246534572rhwckvrwdzgz#c494bd`.
The Overleaf plan was not opened for this proposal (section 14, question 2).

## 1. One-line pitch

A genie frees you the moment you name a positive number that its own test accepts,
you may test any number you like and never ask for the answer, and the loop you
invent to find it breaks in two different ways until you learn to move only part of
the way, which is Robbins-Monro.

## 2. What this exercise has to deliver

Read off Carlos's handwritten page 1, which I opened as an image at
`/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/bmai_w1_notes_first_order_optimization_p1.jpg`:

- The heading is `First-order optimization`. `Act 1)` is Heron's algorithm. `Act 2)` is
  `Robbins-Monro algorithm`, with `theta = 1 + 1/theta` written out and the label
  `"The genie game"` in quotation marks beside it.
- The table Carlos drew for act 2 has four columns: `theta`, `1 + 1/theta`, `verdict`,
  `update`. There is no numeric loss column. The Heron table above it has five:
  `theta`, `theta^2`, `2026 - theta^2`, `Verdict` (`too large` / `too small`), `Update`
  (two arrows, one left and one right, and no formula).
- The page ends on an underlined `TODO: Come up with a scaffold of games & guide them.`
- Page 2 of the same notebook reads, in full, that the participants must derive the
  Robbins-Monro algorithm and points at the AINIT slides.

So the deliverable is a scaffold, and the update rule has to be a thing the participant
arrives at. Everything below is built around that one constraint.

The AINIT slides carry the framing already. From
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex`, section
`Learning a number in the dark: Robbins-Monro` (line 530 onward), verbatim from the plate
frame at lines 537 to 555:

> Lost in the desert, you rub a lamp. The genie will set you free, on one condition: solve
> `Q = 1 + 1/Q`. No computer, no formula, only arithmetic. How do you even begin?
> *Guess a number, then let the equation correct your guess.*

The table frame is titled `Guess, check, correct` and its three column headers are, exactly:

```
$Q$ (guess)        target $= 1 + \tfrac1Q$        loss $= Q - \text{target}$
```

with a muted curved arrow from the first target back to the second guess, captioned
`next guess $=$ the target`. Then a pseudocode frame that writes `Q := Q - loss` with the
gloss *step onto the target*, reveals `Q := Q - alpha . loss` in a box, and closes on
*make the target a noisy sample and let the step alpha shrink: that is Robbins-Monro*.
Then the Robbins-Monro iteration frame: `x <- x + alpha_n (sample - x)`, the sum of the
steps unbounded *(can travel from any start)*, the sum of their squares finite
*(the noise eventually cancels)*, and `alpha_n = 1/n` satisfying both.

The exercise turns those five frames into a thing a participant drives.

## 3. The one tension between the two sources, and how this proposal resolves it

Carlos's handwritten table has `verdict` and `update` where the deck has
`loss = Q - target`. Both are correct for their medium: the deck shows a signed number,
the handwriting shows what the participant *does* with it.

Proposed resolution, recorded here so the build does not have to reopen it:

- The live table's three headers are the deck's three, character for character, because
  the brief requires it and because the deck is what participants will have seen at 09:00.
- `verdict` and `update` are the participant's two acts, and they sit as two controls
  under the table in scene 1. In scene 2, once the move has a name, they are promoted into
  two extra columns, so the participant finishes the scene looking at Carlos's own
  five-column table with the deck's three headers preserved on the left.

Section 14, question 3, offers Carlos the alternative.

## 4. The mathematics, verified before any design

The course-viz recipe puts data validation at step 0, before any UI code: check that the
numbers tell the intended story. Every value below was computed in this session and is
reproduced by `proposals/viz-genie-rm-reference.mjs`.

### 4.1 The bargain and its two roots

The genie's condition is `Q = 1 + 1/Q` with `Q > 0`. Write `g(Q) = 1 + 1/Q` for the
genie's test. A number satisfies the bargain exactly when testing it returns it.

`Q = 1 + 1/Q` is the same as `Q^2 = Q + 1`, whose two roots are

```
phi       =  1.618033988750      ( = (1 + sqrt 5)/2 )
conjugate = -0.618033988750      ( = (1 - sqrt 5)/2 )
```

The positivity clause in the bargain is what selects `phi`. That clause does load-bearing
work in scene 3 and pays off in scene 6, so it belongs in the story from the first frame.

### 4.2 The deck's table reproduces exactly

Full step `Q <- g(Q)` from `Q = 1`, verified to 1e-12 against the deck's six overlay rows:

| Q (guess) | target = 1 + 1/Q | loss = Q - target |
|---|---|---|
| 1 | 2 | -1 |
| 2 | 3/2 | +1/2 |
| 3/2 | 5/3 | -1/6 |
| 5/3 | 8/5 | +1/15 |
| 8/5 | 13/8 | -1/40 |
| 13/8 | 21/13 | +1/104 |

The guesses are consecutive ratios of Fibonacci numbers and the losses are the Cassini
identity, which is why the denominators run 1, 2, 6, 15, 40, 104 and the signs alternate.
The interactive table must produce these from arithmetic, and the verifier must assert
them. Continuing on the same schedule, `|loss|` first drops below 1e-3 at test 8.

### 4.3 Why the full step works here, and why that is luck

`g'(Q) = -1/Q^2`, so `g'(phi) = -0.381966011250`. The magnitude sits below 1, so the full
step contracts, and the sign is negative, which is why the deck's loss column alternates.

Now write the same bargain the other way. Multiply by `Q`: `Q^2 = Q + 1`, so
`Q(Q - 1) = 1`, so `Q = 1/(Q - 1)` whenever `Q` differs from 1. Call this form B and write
`h(Q) = 1/(Q - 1)`. Same equation, same two roots, and:

```
form A   g(Q) = 1 + 1/Q       g'(phi) = -0.381966011250    g'(conjugate) = -2.618033988750
form B   h(Q) = 1/(Q - 1)     h'(phi) = -2.618033988750    h'(conjugate) = -0.381966011250
```

The stability is exactly swapped. Under form A the full step is drawn to `phi`. Under
form B the full step is pushed away from `phi` and drawn toward the conjugate, which the
bargain forbids.

Verified run, form B, full step, from `Q = 1.7`, with the genie enforcing positivity:

```
1.7000 -> 1.4286 -> 2.3333 -> 0.7500 -> -4.0000
```

after four tests the loop has walked out of the positive numbers and the genie has
nothing left to answer. The same recursion continued as bare arithmetic, with no genie to
refuse anything, goes on:

```
1.7000 -> 1.4286 -> 2.3333 -> 0.7500 -> -4.0000 -> -0.2000 -> -0.8333 -> -0.5455 -> -0.6471 -> -0.6071 -> ...
```

and rests on `-0.618033989`, the root the bargain forbids, first landing within 1e-6 of it
at step 19.

**Correction against an earlier draft of this file.** That draft stated flatly that the
form B run "settles on -0.618033989". With the positivity guard in place it does not get
there: it exits the allowed region at `Q = -4` after four tests. Both readings are true of
different objects, and the scene needs both, so the reference script now computes and
asserts each separately. This is the one place where writing the verifier changed the
story rather than confirming it.

This is the heart of the exercise. The full step was never safe. It happened to be safe
for the way the bargain was first written down.

### 4.4 The partial step, and two exact thresholds

Damped iteration `Q <- Q - alpha (Q - g(Q))` has multiplier `1 - alpha (1 - g'(phi))` at
the fixed point, so it settles exactly when `0 < alpha < 2/(1 - g'(phi))`:

```
form A threshold  = 1 + 1/sqrt(5) = 1.447213595500      fastest alpha = 0.723606797750
form B threshold  = 1 - 1/sqrt(5) = 0.552786404500      fastest alpha = 0.276393202250
```

Both verified. The full step `alpha = 1` sits comfortably inside form A's window and
comfortably outside form B's, which is the whole story in one line.

Slider sweep, 60 tests from `Q = 2`, criterion `|Q - phi| < 1e-3`:

| form | settles | does not settle within 60 tests |
|---|---|---|
| A | 0.20, 0.50, 1.00, 1.20, 1.30, 1.35 | 1.40, 1.45, 1.50, 1.60 |
| B | 0.20, 0.30, 0.40, 0.45, 0.50 | 0.55, 0.60, 0.70, 0.90, 1.00 |

**Read that table carefully, because the build will be tempted to overclaim.** The
criterion is practical, meaning "close enough after 60 tests", and it does not coincide
with the exact threshold. `alpha = 1.40` lies inside form A's window and still misses:
`|Q - phi|` is `6.922e-3` after 60 tests and `2.887e-15` after 2000. So the on-screen
wording is about what happens in the room, and the exact thresholds stay off screen
(section 8).

Under form B with `alpha = 0.30`, every starting point tested (1.2, 1.5, 1.7, 2, 3, 5, 10)
reaches `phi`. The partial step does more than tidy up: it changes which answer the loop
arrives at.

Form A pushed the other way, `alpha = 1.60` from `Q = 2`, verified:

```
2.0000 -> 1.2000 -> 2.2133 -> 0.9949 -> 2.6113 -> 0.6460 -> 3.6894 -> -0.1799 -> ...
|Q - phi|  0.3820, 0.4180, 0.5953, 0.6231, 0.9932, 0.9721, 2.0713, 1.7980
```

The swings grow, and after seven tests the run leaves the positive numbers at `-0.1799`.
This is the oscillate-then-diverge break the brief asks the participant to cause first.

### 4.5 The sandstorm, and why shrinking becomes necessary

Turn on the storm: the genie's answer arrives as `g(Q) + xi`, with `xi` Gaussian of
standard deviation `0.15`. The same `Q` now comes back different every time. The clean
loss is already down to 0.0096 by row 6, so noise of 0.15 swamps the signal completely.

**The instrument panel.** Two readouts, both computable from what the participant heard,
neither of which uses `phi`. This is what makes the no-answer rule enforceable rather than
aspirational.

- **spread** = standard deviation of the guesses over the last third of the run. Does the
  loop settle?
- **average heard loss** = mean of the losses over the last third. Is the genie satisfied?

400 rounds, start `Q = 1`, sigma 0.15, seed 20260904, form A, all four verified:

| schedule | spread | average heard loss | reading |
|---|---|---|---|
| `alpha = 1` (full step) | 1.628e-1 | -1.854e-3 | never settles, centred right |
| `alpha = 0.2` (constant) | 4.200e-2 | +1.041e-3 | settles into a band, the band never closes |
| `alpha = 1/(t+1)` | 1.261e-3 | +1.326e-2 | settles, and the genie accepts |
| `alpha = 1/(t+1)^2` | 6.313e-5 | +1.878e-1 | settles hard on a number the genie refuses |

The same four averaged over 200 seeds, so a reader can see that the pinned run is typical:

| schedule | spread, 200-seed mean | average heard loss, 200-seed mean |
|---|---|---|
| `alpha = 1` | 1.619e-1 | -8.906e-5 |
| `alpha = 0.2` | 4.212e-2 | +8.933e-5 |
| `alpha = 1/(t+1)` | 1.909e-3 | +5.475e-4 |
| `alpha = 1/(t+1)^2` | 6.762e-5 | +1.870e-1 |

That pair of tables is the exercise. The two Robbins-Monro conditions fall straight out:

- Steps whose squares do not add up to something finite leave a permanent wobble. Rows 1
  and 2 fail this way, and their spread stays large forever.
- Steps that add up to something finite stop early. Row 4 fails this way: it rests at
  `Q = 1.747141`, where the genie returns `1.572364`, a standing loss of `0.174777` and a
  distance from `phi` of `0.129107`. It settled beautifully, on the wrong number, with
  total confidence.
- Row 3 satisfies both demands and is the only row where both readouts are small.

Note honestly where the pinned seed differs from the mean: on `alpha = 1/(t+1)` the pinned
spread (1.261e-3) is smaller than the 200-seed mean (1.909e-3) and its average heard loss
(1.326e-2) is larger than the mean (5.475e-4). That is why the verifier asserts an
*ordering* rather than a value (section 11.3, assertion g).

**Display note.** Print the average heard loss to two decimals, so the column reads
`0.00, 0.00, 0.01, 0.19`, and render a value whose absolute value rounds to zero as
`0.00` with no sign. Three decimals invites a false ranking between rows 1 and 3.

### 4.6 The same point with no randomness at all

The cleanest demonstration of the first condition needs no noise. Clean genie, far start
`Q = 8`, 200 iterations, verified:

```
alpha = 1/(t+1)        ->  1.617875   |err| 1.591e-4    sum of steps over 200 terms 5.8780, and it grows without bound
alpha = 0.5/(t+1)^2    ->  3.626966   |err| 2.009       sum of steps 0.8200, bounded by 0.5 * pi^2/6 = 0.822467
```

The second keeps 31.5 per cent of its initial error, forever.

Precision matters in the on-screen wording. The correct statement is that when the steps
add up to something finite, the per-step contraction factors multiply out to a nonzero
limit, so a fixed fraction of the starting error survives. Avoid the loose phrasing "it
runs out of distance to travel", which is a heuristic dressed as a reason.

### 4.7 Domain guards

`g(0)` is undefined, `h(1)` is undefined, and `g(0.001)` returns 1001. The positivity
clause handles every one of these in story: the genie refuses a number that is not
positive, refuses a number it cannot divide by, and restates its condition. No error
dialog is needed anywhere in this viz.

## 5. Design decisions

### 5.1 Click-step, and why scrollytelling is ruled out

The course-viz skill says to pick one pattern and commit, and it draws the line at whether
the content has explicit decision points that need rewind (SKILL.md lines 71 to 90). Three
reasons put this exercise on the click-step side:

1. The pedagogical core is a participant deliberately breaking a loop and then walking the
   break backwards to see where it went wrong. Scrollytelling is unidirectional by
   construction, which the skill names as its own limitation.
2. Scenes 1, 3, 4 and 5 each host per-step math with a rewind: one table row per click,
   one schedule per click. The skill says in as many words that a scene needing
   "click Next within scene 4 to walk through the math" belongs to click-step.
3. Both AINIT sources for this material are scroll-driven pages with
   `window._slideNav.advance()` and zero `location.hash` use (verified: `grep -c
   location.hash darts/index.html` returns 0). A lecturer cannot deep-link into them
   mid-lecture and a TA cannot rewind a demonstration. In a 60 minute room with two TAs
   and roughly 30 participants, that is the most expensive property to inherit.

So: click-step, with per-scene internal step engines, mandatory `#scene=N` hash routing,
a dot pager, and the `&run`, `&instant` and `?test=` dev affordances baked in from day 1.

### 5.2 Multi-file, and how the single-file precedent is handled

Multi-file, per course-viz hard requirement 1. The single-file AINIT games belong to the
other documented lane (the skill names `teaching-viz` as the sibling casual single-file
pattern at line 12), with different rules.

The concrete cost of the single-file lane, measured on `darts/index.html` in this session:
27 U+2014 em dashes and 6 U+2013 en dashes (all six inside the string "Robbins-Monro" in
headings), zero `location.hash`, zero `data-theme`, zero `localStorage`, 5 raw
`Math.random()` calls, zero `type="range"` controls. It does pass the `file://`
requirement cleanly: zero `<script src>`, zero `fetch(`, zero KaTeX.

### 5.3 Shell provenance, and no d3

Copy the shell from two verified house artifacts rather than writing one:

| piece | source | change |
|---|---|---|
| `css/style.css` | `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/css/style.css`, 648 lines | verbatim, then append the colour-identity comment block for this viz |
| `js/theme.js` | grasshopper `js/theme.js`, 74 lines | one line: `var KEY = "genie-rm-theme"` |
| `js/main.js` | `/Users/carloscotrini/Documents/git_fdd/projects/bandits/js/main.js`, 182 lines | the scene list, plus `&run` and `?test=` handling |
| `js/chart.js` | bandits `js/chart.js`, 233 lines | verbatim. Pure DOM and SVG multi-series line chart, per-trace CSS classes, `Chart.mount({host, T, yMax, label})` returning `setTrace(id, points, klass)`, `removeTrace`, `clear`, `setHighlight` |
| `js/history.js` | bandits, 51 lines | verbatim. Record-and-cursor store, `push` truncates the future after a rewind |
| `js/katex-helpers.js` | bandits, 29 lines | verbatim. `Katex.render(tex, host, displayMode)`, `Katex.inline`, `Katex.display`, never throws |
| `vendor/katex/` | bandits, 592K, woff2 only | verbatim |

`lunar-lander-game` was created from `grasshopper` by copying `css/style.css` byte for byte
and changing one line of `theme.js`, so this route is sanctioned by precedent.

**No d3.** An earlier draft of this file vendored `d3.min.js` (279706 bytes). Everything
this viz draws is a table, two or three line traces, and a two-number panel, and
`bandits/js/chart.js` already draws multi-series traces with pure DOM and SVG and per-trace
CSS classes. Vendoring d3 for that is 280 KB of dependency for nothing. If a later scene
turns out to need an axis d3 would give for free, add d3 then and record the reason.

### 5.4 Colour identities, fixed once

Reusing grasshopper's token file means inheriting the course-viz palette. Fix the
identities in this viz's `CLAUDE.md` and never let them cross-talk:

```
purple  #7a5c8c   the trail of guesses the participant has made
blue    #2f6cb1   the genie's answer, meaning the target
amber   #c08a3e   revealed truth. Appears from scene 6 onward and never before
green   #4a8b6b   the genie accepts
red     #b8323a   the bargain refuses this number
```

Red and green both appear. The no-red-green accessibility rule in the house belongs to the
`lecture-slides` skill and governs beamer decks; the course-viz palette carries both hues.
This viz keeps them under one condition: colour is never the only channel. A refused number
carries the word `refused` and a struck row; an accepted one carries the word `accepted`.
Section 14, question 5, offers Carlos the stricter option.

## 6. What to inherit from darts, and what to rebuild

The brief asks for this precisely. Everything below was read in
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/index.html` (718 lines) and
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/minigolf/index.html` (1759 lines).

### 6.1 Inherit from darts

1. **The three-blank decomposition of the update, and the answer-checking machinery.**
   Verified at `darts/index.html` lines 545 to 549 and 533:

   ```js
   const e1Expected = {
     error:  ["target_score-current_score"],
     change: ["alpha_t*error","error*alpha_t"],
     update: ["current_pos+change","change+current_pos"]
   };
   function norm(s){ return (s||'').replace(/\s+/g,'').replace(/"/g,"'"); }
   ```

   Splitting the rule into the error, the step it produces, and the new position is exactly
   the right three-way split, and it is already tuned. Inherit the split, the normalizer,
   and the per-input `ok` / `bad` class feedback. Rewrite the strings (section 9.1).

2. **The schedule is given, the update is blank.** darts hands over
   `alpha_t = alpha_0 / (1 + t / decay_rate)` already written and blanks only the three
   lines of the update. That is the correct division of labour: the participant derives the
   rule, and the schedule arrives as a gift that the next scene then interrogates.

3. **The hint contract.** darts' hint box is three bullets, one per blank, each naming the
   quantity in words with no code in it, behind a `Show hint` toggle that flips its own
   label (`bindHint`, line 537). Inherit the shape and the discipline verbatim.

4. **The two quiz questions and their distractors.** "Why does the learning rate get
   smaller as the rounds go on?" and "Suppose you kept alpha large and constant forever.
   What happens?", both answer B, both with four options whose wrong answers are genuinely
   tempting (option A of question 1 is the one a strong participant picks). Inherit both
   questions and the wrong-answer behaviour, which shows `data-hint` and never the answer.

   **The upgrade that matters.** `darts/CLAUDE.md` claims the page teaches that "a large,
   fixed step keeps overshooting and orbits the target forever" while "a decaying step
   lets the aim fine-tune and settle". The page never demonstrates it: there is no alpha
   control at all (verified, zero `type="range"`), no comparison and no convergence plot.
   The claim lives in prose and in the quiz explanation. Here, scenes 3, 4 and 5 make both
   answers demonstrable with numbers on screen, so the quiz stops being an assertion and
   becomes recall of something the participant watched happen.

5. **The four-device order for exposing the mathematics.** Play first and name nothing;
   then a concept card headed "The move you kept making" that describes the move in quoted
   plain language; then one line of algebra with a three-item glossary; then a code fill-in
   with everything except the taught line given. Inherit the order. Scene 2 is the concept
   card, scene 7 is the fill-in.

6. **The step-by-step "A natural strategy" list.** darts numbers the strategy in seven
   plain steps before any symbol appears. Scene 1 does the same job with the table.

### 6.2 Take from minigolf instead of darts

darts uses raw `Math.random()` in `gauss` and `randStart` (5 call sites, verified at lines
638 and 639). minigolf is the only seeded game in the arcade:

1. **Mulberry32** at `minigolf/index.html:1541` and **Box-Muller** `gauss(r, std)` at
   `:1549`. Copy both into `js/rng.js`, seed pinned in one place. The reference script for
   this proposal already uses these two functions verbatim, so the browser build and the
   proposal's numbers come from the same stream.
2. **The auto-step button that narrates its own alpha.** minigolf line 1598 computes
   `alpha = 5 / (1 + st.round / 20)` and line 1620 prints
   `Robbins-Monro used alpha 2.50 and updated the next force.` Inherit the narration.
   Change the constants: `alpha_0 = 5` is tuned to a 0-to-100 position scale and would be
   catastrophic on a quantity near 1.618.
3. **The reveal toggle** (`revealBtn`, line 1134, "Reveal hole"), which withholds the truth
   until the participant asks for it. This viz needs the same discipline under a stricter
   rule (section 8).
4. **The expectation argument, in ASCII names.** minigolf builds `E[landing] = hole`,
   `error = landing - hole`, `E[error] = 0`, and lands on "Robbins-Monro doesn't chase the
   last putt. It chases the average putt." That last line is the best one-sentence
   statement of the idea anywhere in the two repos. Scene 5 should carry its own version.

### 6.3 Do not inherit

1. **The shell.** Scroll-snap, `IntersectionObserver` staged reveals, `.locked` sections,
   `window._slideNav.advance()` and the dark-only palette all go. See 5.1 and 5.2.
2. **The drifting target.** darts moves the bullseye every round
   (`st.bull = clamp(st.bull + clamp(gauss(0,1), -2.5, 2.5), 10, 90)`, line 677). That is a
   nonstationary tracking problem. The genie's answer is a fixed point that stays put, and
   mixing the two blurs which property the shrinking step is buying. Drop the drift.
3. **The score framing.** `score = clamp(max(0, 100 - 2*dist), 0, 100)` and the win
   condition `Math.round(score) >= 97` have no counterpart in the bargain: the genie keeps
   no score. Drop `target_score` and `current_score` with it, whose names say score and
   whose in-code glosses say position (`# where a perfect aim would be`,
   `# where the aim is now`). That inconsistency would go straight into the notebook.
4. **The hard gate.** darts hides later pages behind `.locked` until the three blanks are
   right, and unlocks them from the answer handler. That fights mandatory hash routing,
   because a lecturer has to be able to jump to any scene by URL. Replace it with feedback
   plus an automatic advance on success, and leave every scene reachable. Record the
   departure in this viz's `CLAUDE.md`.
5. **The punctuation.** 27 em dashes and 6 en dashes, verified. ASCII only here.
6. **The sign convention, provisionally.** darts writes
   `y(t+1) = y(t) + alpha(t) x error` with `error = target - current`; minigolf writes
   `theta_next = theta - alpha * signed_error` with `error = landing - hole`. Those are the
   same rule. This proposal takes the AINIT deck's own convention, `loss = Q - target` with
   `Q := Q - alpha * loss`, because the brief requires the deck's exact column headers and
   the headers fix the sign. Section 14, question 1, is the weekend-wide ruling.

### 6.4 What neither file has, and this one must build

- An alpha control of any kind, in either file.
- Any comparison of schedules that the participant can run.
- Any convergence readout beyond a list of past rounds.
- Any fixed-point iteration, any equation to solve, any golden ratio. Verified absent from
  the whole rl-arcade repository; the genie exists there only in `slides/rl-slides.tex`.
- Any light theme, hash routing, or rewind.

## 7. Scene list

Nine scenes, 0-indexed, click-step, `#scene=N` on every one.

### scene0 The bargain

The desert, the lamp, the genie, drawn in CSS and SVG in the house palette (section 14,
question 4, covers the Parrish plate). The condition is staged as a bargain: the genie
frees you when you name a **positive** number that its own test accepts. You hand it a
number, it hands back `1 + 1/Q`. You are free when the number you hand in and the number
that comes back are the same. You may test as often as you like. You may not ask for the
answer.

Two steps: the condition, then the rules of the bargain. No numbers on screen, no plot.
KaTeX renders the test `Q \mapsto 1 + \frac{1}{Q}` and the condition `Q = 1 + \frac{1}{Q}`.
The positivity clause sits in body text beside them, because scene 3 and scene 6 both
depend on the participant having read it.

### scene1 Guess, check, correct

The live table. Headers exactly as the deck writes them:

```
Q (guess)        target = 1 + 1/Q        loss = Q - target
```

An input and a Check button. Type a number, press Check, a row appears with all three
cells filled. Type the next guess. Free choice, and nothing on screen suggests what to
type. Under the table sit the participant's two acts from Carlos's handwriting: a
**verdict** chip that fills itself from the sign of the loss (`too big` / `too small`) and
an **update** control, initially a bare number input.

After three manual rows, a quiet secondary button appears reading `use the target`, which
copies the last target into the input. It appears only after three rows, so the participant
has had the chance to invent the move first, and it copies a number they already have.

A non-positive or non-numeric entry gets the genie restating its condition and refusing.

Step engine: one row per step, `ArrowLeft` rewinds by reset and replay via
`js/history.js`. Dev hook `?test=filled` lays in the six pinned rows.

### scene2 The full step

Name the move. Written twice, and the equivalence is the hinge:

```
Q  <-  target                move onto the target
Q  <-  Q - loss              subtract the whole loss
```

Above them, darts' concept card, retitled for this game: *the move you kept making*.

Then run it from `Q = 1`, one row per click, six clicks, matching the deck's six overlays.
Values as exact fractions: `1, 2, 3/2, 5/3, 8/5, 13/8` with losses
`-1, +1/2, -1/6, +1/15, -1/40, +1/104`, and the verdict and update columns now filled in,
which completes Carlos's five-column table. Nothing is named. No `phi`, no truth line. A
`|loss|` trace on a log axis, labelled `how far off`, is the only convergence signal.

### scene3 Breaking it. The core scene

Two controls: an alpha slider (0.05 to 1.60, step 0.05) and a form switch.

The form switch carries its own one-line proof that the two forms are the same bargain:
`Q = 1 + 1/Q` gives `Q^2 = Q + 1` gives `Q(Q - 1) = 1` gives `Q = 1/(Q - 1)`.

Four internal steps, in this order:

1. Form A, `alpha = 1`. The recap of scene 2. It settles.
2. Form A, push the slider past 1.40. The swings grow, and at 1.60 from `Q = 2` the run
   crosses into negative numbers after seven tests, where the genie refuses to answer
   (numbers in section 4.4). The participant caused this. Pulling the slider back undoes it.
   That is the brief's "break it with a step that oscillates or diverges", and the fix is
   already visible in the same control: move only part of the way.
3. Form B, `alpha = 1`. Same bargain, same full step, and the run flees:
   `1.7, 1.4286, 2.3333, 0.75, -4.0` and out of the allowed numbers in four tests. This is
   the moment the exercise exists for.
4. Form B, pull alpha down to 0.30. It settles on the number the genie accepts, from every
   start tested.

The scene's last line, in body text with no styling of any kind: the full step was never
safe, it was lucky, and moving only part of the way is what makes the loop safe on both
ways of writing the same bargain.

Dev hooks `?test=broken-a`, `?test=broken-b`, `?test=fixed-b`.

Nothing on screen names the numbers `1.447213595500` and `0.552786404500`. The slider finds
them. They live in `DATA.reveal` and are asserted by the verifier, and the README prints
them for the TA.

### scene4 The sandstorm

The wind rises and the genie's answer arrives blurred: the same `Q` comes back different
every time. Run the same full step. The losses stop shrinking. Nothing the participant
learned so far survives contact with the storm.

The instrument panel appears here (section 4.5): spread of the last third of the guesses,
average of the last third of the heard losses. Three runs, same seed, same start, one per
click: `alpha = 1`, then `alpha = 0.2`, then `alpha = 1/(t+1)`. Pinned values in section
4.5. The trace panel holds all three at once so the bands are comparable.

The reading the scene has to earn: the constant step settles into a band and the band never
closes, however long you run. Only the shrinking step closes it.

### scene5 Two demands on the step

Why not shrink very fast, then? Add the fourth schedule, `alpha = 1/(t+1)^2`. Its spread is
the smallest of all four (6.313e-5) and its average heard loss is 0.19. It rests at
`Q = 1.747141`, where the genie returns `1.572364`. It settled on a number the genie
refuses, and it looks more settled than the row that is right.

Then the same point with the storm switched off and a far start (section 4.6), so the
argument does not depend on a lucky draw.

Then the two demands, in the AINIT deck's own words: the steps must add up without bound,
so the loop can still travel from any start, and their squares must add up to something
finite, so the wobble eventually cancels. `alpha_t = 1/t` satisfies both. Both running sums
are on screen, live.

### scene6 The number

Only here. Run the shrinking schedule with the storm off, to convergence, and print the
digits: `1.6180339887`. Name it: the golden ratio. Then the algebra the genie was hiding:
`Q = 1 + 1/Q` is `Q^2 = Q + 1`, whose roots are `1.618033989` and `-0.618033989`. The
positivity clause is what picked the first. The number the loop fled to in scene 3 was the
other root all along, which the participant can go back and check by URL.

The truth line appears on the traces for the first time in this scene, and stays visible in
scenes 7 and 8.

Closing thought as the last ordinary bullet, in body text: you never solved the quadratic,
and on a real prediction loss you could not have.

### scene7 Write the loop

The Python stub with three blanks (section 9.1), the allowlist check, the hint box, the two
inherited quiz questions. On three correct blanks: feedback, then advance. No gate. One
line pointing at the Colab notebook for the full version.

### scene8 The same loop, on a price

A mapping table as the whole scene, with no prose around it. This is the AINIT deck's own
device (`rl-slides.tex` lines 111 to 123 are a `[plain]` frame that is nothing but a
two-column table), transposed into a scene.

| the genie's loop | the model's loop |
|---|---|
| `Q`, your guess | `w`, the model's weight |
| the genie's test `1 + 1/Q` | what one house's price demands of `w` |
| `loss = Q - target` | the residual on that one house |
| `Q <- Q - alpha_t * loss` | `w <- w - alpha_t * (the step that residual asks for)` |
| the sandstorm | one house at a time instead of all of them |
| `alpha_t` shrinking | the learning-rate schedule |
| solve it in closed form | there is no formula to solve |

The last row is **muted**: rendered in the secondary token with no emphasis on either side.
That is the deck's sharpest device, borrowed from its Faust mapping frame, where one row is
muted because it names a term the material offers and the course refuses. Here the refused
term is the closed form. For the genie the quadratic formula genuinely would have worked.
For a model it does not exist, and that is why the loop is the method rather than a
curiosity.

Last ordinary line of the scene, body text: this loop, run on a prediction loss with one
example at a time, is stochastic gradient descent, and that is the 11:00 session.

## 8. Rules this viz must not break

### 8.1 No answer before the attempt

The course-viz never-do list forbids displaying the answer before the student attempts it,
and names a HUD pill showing the optimal value as the example. Enforce it structurally
rather than by care:

- Every readout in scenes 1 to 5 is computable from what the genie said. The instrument
  panel measures the spread of the guesses and the average of the heard losses, both
  observable. Distance to `phi` appears nowhere before scene 6.
- `phi`, both roots and both alpha thresholds live under `DATA.reveal` in
  `data/datasets.js`. That namespace is the rule, and it is stated in the data file's own
  header comment.
- `js/trace.js` owns the truth line and exposes `setTruthVisible(bool)`, default false.
  Only `scene6.js` ever calls it with true. One call site, one place to audit.
- The verifier asserts that the string `1.618` and the identifier `DATA.reveal` appear in
  no file under `js/scenes/` numbered 0 through 5 (section 11.3, assertion j).

### 8.2 The rest of the never-do list

No inline categorical colours in JS: every fill and stroke routes through a CSS class. No
`<style>` injection from JS. No auto-run on `onEnter`; `&run` is the only exception and it
is labelled a dev affordance in the `main.js` header. No fixed-position widget without
reserved layout space, so the instrument panel sits inline inside scenes 4 and 5. No
`Math.random()` anywhere: `js/rng.js` is the only source of randomness. Every `<canvas>`
and `<svg>` carries explicit CSS `width`, `height` and `flex: 0 0 auto` matching its HTML
attributes exactly.

## 9. The coding part

### 9.1 In-page stub, scene 7

```python
def robbins_monro(genie, n_rounds=60, alpha_0=1.0, decay_rate=5.0):
    """Find the number the genie accepts, by testing and correcting."""
    guesses, losses, learning_rates = [], [], []
    genie.reset()

    for t in range(n_rounds):
        # Step size for this round: large early, small later. Given.
        alpha_t = alpha_0 / (1 + t / decay_rate)
        learning_rates.append(alpha_t)

        # What do I currently believe the answer is?
        current = genie.guess
        guesses.append(current)

        # Hand the genie the guess. In a storm, what comes back is blurred.
        target = genie.ask(current)      # returns 1 + 1/current, plus noise

        # How far off am I, and in which direction?
        loss  = ______________________
        losses.append(loss)

        # Do not move the whole way.
        step  = ______________________

        # The new guess.
        genie.guess = ______________________

    return guesses, losses, learning_rates
```

Accepted answers, checked with darts' `norm()` (whitespace stripped, double quotes folded
to single):

```js
const expected = {
  loss:  ["current-target"],
  step:  ["alpha_t*loss", "loss*alpha_t"],
  guess: ["current-step"]
};
```

Hints, one per blank, naming a strategy and never the answer:

- **loss**: how far off you are and which way, with a sign. Your number against the
  genie's.
- **step**: do not move the whole way. Scale the loss down by this round's `alpha_t`.
- **guess**: your new guess is the old one, corrected by the step you just computed.

### 9.2 The environment class

The `DartsInTheDark` class that darts' exercise programs against does not exist in the
arcade repository (verified: the JS `shoot()` returns nothing to Python, and there is no
`target_score` anywhere outside the HTML), so this class has to be written. Write it once
and use the same file in the page's notebook link and in the notebook itself:

```python
class Genie:
    """The bargain: name a positive Q with Q = 1 + 1/Q. You may test. You may not ask."""

    def __init__(self, start=1.0, sigma=0.0, seed=20260904, form="A"):
        self.start, self.sigma, self.seed, self.form = start, sigma, seed, form
        self.reset()

    def reset(self):
        self.guess = self.start
        self.t = 0
        self._rng = mulberry32(self.seed)      # section 9.3

    def ask(self, q):
        """Test a number. Returns what the bargain demands of it, blurred by the storm."""
        if q <= 0:
            raise ValueError("The genie asked for a positive number.")
        if self.form == "B" and q == 1:
            raise ValueError("The genie cannot divide by zero. Try another number.")
        clean = 1.0 + 1.0 / q if self.form == "A" else 1.0 / (q - 1.0)
        self.t += 1
        return clean + (gauss(self._rng, self.sigma) if self.sigma else 0.0)
```

`ask` refusing a non-positive number is the positivity clause of the bargain doing its
work in code, which is what makes scene 3's ending honest.

### 9.3 One RNG for the page and the notebook

The page draws its noise from Mulberry32 plus Box-Muller, copied from minigolf. The
notebook must draw the same stream, so **port those two functions to Python** rather than
calling `random.gauss`. Six lines each, and it means a participant who runs the notebook
sees the same run the room saw.

Label, so nobody over-reads this proposal: the values in section 4.5 were produced by the
JavaScript stream. The Python port must be run once and its output pinned into the notebook
before the notebook quotes any number. That has **not** been done in this session.

### 9.4 Sanity checks

The FS26 convention is that a sanity-check cell always precedes the expensive run.

**Sanity 1, the deck table.** Storm off, constant `alpha = 1`, 6 rounds from `Q = 1`.
Assert to 1e-12:

```
guesses  1, 2, 1.5, 5/3, 1.6, 1.625
losses  -1, +0.5, -1/6, +1/15, -0.025, +1/104
```

This check contains no randomness, so it transfers to Python exactly.

**Sanity 2, clean convergence.** Storm off, `alpha_0 = 1.0`, `decay_rate = 5.0`, 60 rounds
from `Q = 1`. Verified `|final - 1.618033988750| = 5.813e-13`. Assert below 1e-6. For
reference, `decay_rate` 3, 10 and 20 give `6.262e-9`, `4.441e-16` and `0.000e+0`. No
randomness here either.

**Sanity 3, noisy convergence.** `sigma = 0.15`, seed `20260904`, `alpha_0 = 1.0`,
`decay_rate = 5.0`, 400 rounds. On the JavaScript stream, spread over the last third is
`6.576e-3` and the average heard loss is `1.606e-2`; over 200 seeds, `7.859e-3` and
`5.666e-4`. Assert spread below `0.02` and `|average heard loss|` below `0.05`. Keep the
thresholds generous on purpose: they exist to catch a wrong sign, and not to grade the
seed. Both thresholds hold across all 200 seeds tested.

**What sanity 1 actually catches.** A wrong sign. Writing `loss = target - current` while
keeping `guess = current - step` sends the first update to `Q = 0` exactly, which the genie
cannot even test, and the run then reads `1 -> 0 -> -Infinity`. The failure is immediate and
legible, which is why sanity 1 comes first.

### 9.5 The Colab notebook pair

Per the FS26 convention recorded in
`docs/summaries/03-bmai-fs26-coding-exercise-and-viz-conventions.md`: two notebooks with
identical cell counts, differing only in the Task cell bodies, `NOTEBOOK_VERSION` matching,
banner and hint comments byte identical, and a `### What just happened?` markdown cell
carrying a code-free Discussion list after every task.

| # | task | stub shape | what it lands |
|---|---|---|---|
| 1 | Implement `Genie.ask` | fill in the blank | the bargain is a test you may run |
| 2 | The full step, reproduce the deck's table | fill in the blank | guess, check, correct |
| 3 | Switch to form B, run the full step | given, run it | the same bargain, and the loop flees |
| 4 | Sweep alpha on form B, print settles or not | fill in the loop body | a partial step rescues it |
| 5 | Turn on the storm, compare three schedules | fill in the blank (the update) | the instrument panel |
| 6 | Add `alpha = 1/(t+1)^2` | given, run it | it settles on the wrong number |
| 7 | Stretch: the same loop on `y = w x`, one house at a time | fill in the blank | the bridge to SGD |

Names: `genie_robbins_monro.ipynb` and `genie_robbins_monro_solutions.ipynb`. FS26 uses at
least five naming schemes (a documented gap); `_solutions` is the most common there.
Section 14, question 6, asks for a course-wide ruling.

For any debrief helper, adopt the coach contract from
`the_hidden_layer_full_mission_solutions.ipynb` cell 11: DIAGNOSE, GUIDE with one or two
targeted questions, HINT that names a strategy, IMPLEMENT TOGETHER for that one piece, and
"NEVER return a complete drop-in function unprompted". The competing contract in the
student notebook of the same version pair hands over the complete cell; leave that one
alone.

## 10. File tree

```
genie-robbins-monro/
  CLAUDE.md                     contract for the next agent, 13-section spine
  README.md                     for a lecturer or TA: what it is, the URL hooks, what is exact
  index.html                    load-order manifest only
  css/
    style.css                   grasshopper's 648 lines, verbatim, plus the colour block
    table.css                   the guess/target/loss widget and the two participant columns
    trace.css                   the guess trace and the loss panel
    panel.css                   the two-number instrument panel
    scene0.css ... scene8.css   only where a scene needs its own rules
  js/
    theme.js                    grasshopper's, KEY = "genie-rm-theme"
    rng.js                      Mulberry32 and Box-Muller, from minigolf 1541 and 1549
    genie.js                    formA, formB, the domain guard, ask(q, {form, sigma, rng})
    schedules.js                full, constant(c), inverse(c), inverseSquare(c), decay(a0, d)
    loop.js                     run(oracle, schedule, Q0, n) -> [{t, Q, target, heard, loss, alpha}]
    table.js                    the widget with the deck's exact headers
    trace.js                    plots on top of Chart; owns setTruthVisible(bool), default false
    panel.js                    spread and average heard loss, both from observables
    chart.js                    bandits', verbatim
    history.js                  bandits', verbatim
    katex-helpers.js            bandits', verbatim
    main.js                     bandits' scene engine, plus &run and ?test=
    scenes/scene0.js ... scene8.js
  data/
    datasets.js                 window.DATA: deckTable, demoScripts, reveal
  vendor/
    katex/                      bandits', 592K, woff2 only
  precompute/
    verify-genie.mjs            the rigor gate, section 11
  notebook/
    genie_robbins_monro.ipynb
    genie_robbins_monro_solutions.ipynb
```

## 11. Data, seeded randomness, and the rigor gate

### 11.1 What is precomputed and what is live

Scenes 3, 4 and 5 recompute as the participant moves a slider, so the arithmetic is live in
`js/loop.js`. A 400-round run of a three-line recurrence is instant, and precomputing it
would only create a second place for the numbers to live. `data/datasets.js` therefore
holds three small things:

- `DATA.deckTable`: the six rows as numerator and denominator pairs, so the table renders
  fractions rather than decimals.
- `DATA.demoScripts`: the guess sequences that the `?test=` states replay.
- `DATA.reveal`: `phi`, both roots, both alpha thresholds. Untouched before scene 6.

This is a smaller data file than the course-viz examples carry, and the reason belongs in
the file's header comment so a later agent does not "fix" it.

### 11.2 Seeded randomness

Mulberry32 with Box-Muller, copied from minigolf. The seed is pinned once at the top of
`js/rng.js` as `20260904`, the weekend date. It was not tuned: section 4.5 prints the
pinned-seed values beside 200-seed means precisely so a reader can check that the pinned
run is ordinary, and the one place the pinned run is unusual is called out there.

### 11.3 The rigor gate

`precompute/verify-genie.mjs` follows
`/Users/carloscotrini/Documents/git_ainit/rl-arcade/repair-or-replace/precompute/build-datasets.js`:
set `global.window = {}` and `require()` the real runtime files `js/rng.js`, `js/genie.js`,
`js/schedules.js` and `js/loop.js`, so what is asserted is exactly what the browser
computes. Exit non-zero on any failure and refuse to write `data/datasets.js`.

`proposals/viz-genie-rm-reference.mjs` is the working draft of this file: it already
computes and asserts (a) through (i) with 33 checks, against its own copy of the recurrence.
The build's job is to repoint it at the runtime modules and add (j) and (k).

- (a) `phi` is a fixed point of both forms to 1e-15, and both roots satisfy `Q^2 = Q + 1`.
- (b) The six deck rows, to 1e-12, from `Q = 1` under the full step on form A.
- (c) Derivatives at the fixed point: `-0.381966011250` for A, `-2.618033988750` for B, and
      the two are swapped at the conjugate root.
- (d) Thresholds `1 + 1/sqrt(5)` and `1 - 1/sqrt(5)` to 1e-12, with `alpha = 1` inside the
      first window and outside the second.
- (e) Slider behaviour, 60 tests from `Q = 2`: form A settles at 0.20, 0.50, 1.00, 1.20,
      1.30, 1.35 and misses at 1.40, 1.45, 1.50, 1.60; form B settles at 0.20, 0.30, 0.40,
      0.45, 0.50 and misses at 0.55, 0.60, 0.70, 0.90, 1.00. Plus the honesty check that
      `alpha = 1.40` does converge given 2000 tests, so the sweep criterion is practical.
- (f) Form B with the full step from `Q = 1.7` leaves the positive numbers within five
      tests, its first non-positive guess is exactly `-4`, and the unguarded recursion
      converges to the conjugate root.
- (g) The instrument panel at 400 rounds, sigma 0.15, seed 20260904: the **ordering**
      spread(full) > spread(constant) > spread(inverse), on the pinned seed and on the mean
      of 200 seeds; `|avgLoss(inverseSquare)|` more than ten times `|avgLoss(inverse)|`; and
      inverseSquare having the smallest spread of the four.
- (h) The stalled schedule rests where the genie refuses it: `|Q - g(Q)| > 0.1`.
- (i) The clean far-start demonstration: `1/(t+1)` from `Q = 8` lands within 1e-3 of `phi`
      in 200 steps, `0.5/(t+1)^2` keeps more than 25 per cent of its initial error, and the
      second schedule's steps sum to less than `0.5 * pi^2/6`.
- (j) No file under `js/scenes/` numbered 0 to 5 contains the substring `1.618` or the
      identifier `DATA.reveal`.
- (k) Re-running the generator produces a byte-identical `data/datasets.js`.

## 12. Acceptance criteria

Structural:

1. Opens from `file://` with no build step. Zero `fetch(`, zero CDN URL, zero `import`
   statement, zero `type="module"`. Verified by grep.
2. Light and dark themes both complete, `t` toggles, the choice persists, `?theme=dark`
   forces. Light is the default.
3. `#scene=N` deep-links to all nine scenes, `hashchange` is honoured, and the hash updates
   as the participant pages. `&instant`, `&run` and `?test=` all work.
4. Zero inline categorical colours in JS, zero `<style>` injection from JS, zero
   `Math.random()`. Verified by grep.
5. Every canvas and SVG has CSS `width`, `height` and `flex: 0 0 auto` matching its HTML
   attributes.
6. ASCII punctuation only: `grep -cP '\x{2014}'` and `grep -cP '\x{2013}'` both print 0
   across every authored file.
7. `precompute/verify-genie.mjs` exits 0 with every assertion group passing.
8. `CLAUDE.md` and `README.md` both present, and the README prints the two alpha thresholds
   for the TA.

Pedagogical:

9. Nothing on screen names, prints or plots `phi`, the golden ratio, or any distance to
   either, before scene 6. Assertion (j) covers the code; a human walkthrough covers what
   renders.
10. A participant can break the loop in both ways, by pushing alpha past the edge and by
    switching the form, and can undo each break by moving one control.
11. The live table reproduces the deck's six rows as fractions, under the deck's exact
    three headers, and ends the scene with Carlos's verdict and update columns filled.
12. Both numbers on the instrument panel are computable from what the participant heard.
13. The three-blank stub accepts the listed strings, rejects a sign flip, and every hint
    names a strategy with no code in it.
14. Scene 8's last row reads as a deliberate refusal in both themes.

Room:

15. A TA can run scenes 0 to 6 in 25 minutes with participants driving, leaving 20 minutes
    for the notebook and 10 for the wrap.
16. Every scene is reachable by URL, so a TA who loses the room can jump.

## 13. Verification

### 13.1 Build-time verification, in the skill's own order

```bash
VIZ=/path/to/genie-robbins-monro

# 1. the rigor gate first. No UI work until the numbers hold.
node "$VIZ/precompute/verify-genie.mjs" || exit 1

# 2. parse-check every JS file
for f in "$VIZ"/js/*.js "$VIZ"/js/scenes/*.js; do
  node -e "const c=require('fs').readFileSync('$f','utf8');
           try{new Function(c);console.log('OK: $f');}
           catch(e){console.log('ERR: $f',e.message);process.exit(1);}" || exit 1
done

# 3. house-rule greps
grep -rn 'fetch(\|cdn\.\|unpkg\|jsdelivr\|type="module"\|Math.random' "$VIZ"/js "$VIZ"/index.html
grep -rnP '\x{2014}|\x{2013}' "$VIZ" --include=*.js --include=*.css --include=*.html --include=*.md
grep -rn 'fill="#\|stroke="#\|style="[^"]*color:' "$VIZ"/js

# 4. headless screenshots: nine scenes, two themes, two viewports
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SHOT=/private/tmp/genie-shots; mkdir -p "$SHOT"
for n in 0 1 2 3 4 5 6 7 8; do
  for th in light dark; do
    for w in 1280,800 1920,1080; do
      "$CHROME" --headless --disable-gpu --virtual-time-budget=5000 \
        --user-data-dir="$SHOT/profile" --window-size=$w \
        --screenshot="$SHOT/s${n}_${th}_${w%,*}.png" \
        "file://$VIZ/index.html#scene=${n}&instant&theme=${th}"
    done
  done
done

# 5. the interactive states a plain screenshot cannot reach
for t in filled broken-a broken-b fixed-b; do
  "$CHROME" --headless --disable-gpu --virtual-time-budget=6000 \
    --user-data-dir="$SHOT/profile" --window-size=1400,900 \
    --screenshot="$SHOT/test_${t}.png" \
    "file://$VIZ/index.html?test=${t}#instant"
done
```

Then **Read every PNG**. The skill states this twice and gives the reason: the agent has no
eyes, and a screenshot nobody opens is a file rather than a verification. 40 images is the
real cost of a nine-scene viz, and it is not optional.

Never write a bare `pkill -f "Google Chrome"`. Scope any cleanup to
`pkill -f "user-data-dir=$SHOT/profile"`. The global note in `~/.claude/CLAUDE.md` records a
session lost to exactly that command.

### 13.2 What the screenshots must be checked for specifically

- Scene 1 with eight or more rows: does the table scroll inside its own box, or does it push
  the Check button below the fold at 1280x800?
- Scene 3 at the moment the run flees: the trace has to hold `+2.33` and `-4.0` in one frame
  without the axis rescaling so violently that the earlier rows collapse onto a line. If it
  does, clamp the y range and mark the escape rather than plotting it.
- Scenes 4 and 5: three or four traces on one axis with a log-scaled loss panel. Check that
  the smallest spread (6.313e-5) is still visible rather than pinned flat on the axis.
- Scene 8: the muted last row must read as legibly muted in **both** themes. Check dark
  especially, where the pair is `--secondary #8a8579` on `--bg #181612`.
- Every scene in dark: grasshopper's token file was tuned for a landscape drawing, and a
  table-heavy scene may need a second panel token where a card currently sits.

### 13.3 Room rehearsal

Walk it once at 1280x800 in light with the arrow keys only, then once with the mouse only,
then once in dark. A scene that is weak in one theme gets redesigned rather than shipped.

## 14. What only Carlos can decide

1. **The sign convention for the whole weekend.** The AINIT genie writes `loss = Q - target`
   and `Q := Q - alpha * loss`. Carlos's handwritten BMAI deck writes `l = y - y_hat` and
   `w <- w + alpha * l`. These are the same rule with `l = -loss`, and participants meet both
   between 10:00 and 12:00 on the Friday. This proposal keeps the deck's convention because
   the brief requires the deck's exact column headers and the headers fix the sign, and it
   proposes one explicit bridging row in scene 8. A ruling would let all three 10:00
   exercises be written to one convention.
2. **The Overleaf teaching plan** at `https://www.overleaf.com/6246534572rhwckvrwdzgz#c494bd`,
   named on the schedule row. It was not opened for this proposal and may already settle
   several questions below.
3. **The verdict and update columns.** Section 3 proposes deck headers with Carlos's two
   columns promoted in scene 2. The alternative is Carlos's four columns throughout, with
   the numeric loss shown only as the verdict's tooltip. That would match the handwriting
   and the Heron exercise more closely and would depart from the brief.
4. **The Maxfield Parrish plate.** The AINIT slide credits "Maxfield Parrish, The Arabian
   Nights (1909)" and the file exists at
   `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/img/epigraph/genie-parrish.jpg`
   (727108 bytes). Verified in this session: there is no `IMAGE-SOURCES.txt` anywhere in the
   rl-arcade repository, and `slides/CLAUDE.md` lines 24 to 27 record licences for the other
   three epigraph plates (Rembrandt CC0, Stieler PD, Oroz PD) and omit this one. Switzerland
   runs 70 years post mortem auctoris. This proposal therefore assumes **no photographic
   plate**, with the genie drawn in CSS and SVG. If Carlos wants the plate, the rights need
   checking first and an `IMAGE-SOURCES.txt` needs writing in both repositories.
5. **Red and green in a viz.** Section 5.4 keeps both, always paired with a word. The
   stricter option is to retire the pair and use green for accepted with burnt orange
   `#a05a2c` for refused. That costs nothing except the association.
6. **Notebook naming across HS26.** FS26 uses at least five schemes. This proposal assumes
   `<name>.ipynb` and `<name>_solutions.ipynb`.
7. **Whether the two breaks are one scene or two.** Scene 3 carries both the alpha break and
   the form break. Splitting them gives ten scenes and more air; keeping them together makes
   the point once, harder. The recommendation is to keep them together, because the second
   break only lands against the first.
8. **`alpha` or `eta`.** Carlos's handwriting says alpha, the AINIT deck says alpha, and the
   Minimum Lander UI says eta. This proposal assumes alpha throughout.

## 15. Anti-collision: what this exercise owns

The three 10:00 exercises run in the same room within one hour, and the same participants
see all three.

| idea | owned by |
|---|---|
| guess, check, correct as a loop with a verdict and an update | `opt-heron`, first |
| a five-column table the participant fills in | `opt-heron`, first |
| the fixed-point form: the answer is the number its own test returns | **this exercise** |
| a step size that can be too big, and the loop breaking because of it | **this exercise** |
| the same problem written two ways, with different stability | **this exercise** |
| noise, and convergence under noise | **this exercise** |
| the two Robbins-Monro conditions on the step sizes | **this exercise** |
| the golden ratio | **this exercise** |
| data, residuals on examples, `y = wx + b` | `opt-rm-house`, after |
| more than one parameter, and alternating updates | `opt-rm-house`, after |
| the name stochastic gradient descent | `opt-rm-house` and the 11:00 lecture |
| derivatives, finite differences, gradients | the 11:00 gradient-descent block |

Must not teach here: any derivative, any loss defined over a dataset, any second parameter.
Scene 8 points at all three and teaches none of them.

## 16. Fan-out plan and issue prompts

Nine scenes is past the course-viz threshold of six, so fan out. Bundle for tonal coherence
and never for parallelism, and never split a tonal triplet.

**Phase 0, sequential, the lead.** Shell, theme, scene engine with hash routing, `js/rng.js`,
`js/genie.js`, `js/schedules.js`, `js/loop.js`, `js/table.js`, `js/trace.js`, `js/panel.js`,
the vendored KaTeX, and nine registered scene stubs. Nothing else starts until
`verify-genie.mjs` is green, because every scene reads its numbers from these modules.

**Phase 0.5, parallel with Phase 0.** `precompute/verify-genie.mjs` and `data/datasets.js`.
Its first job is the section 4 validation, its second is the data file, its third is
assertions (a) through (k) written as code rather than claimed in a report.

**Phase 1, parallel after Phase 0.**

| lane | scenes | why bundled |
|---|---|---|
| Jinlei | 0, 1, 2 | the setup and the deck's own table: one voice, one widget |
| Suei-Wen | 3, 4, 5 | break, noise, conditions. The pedagogical core, and the one triplet the skill would name explicitly |
| lead | 6, 7, 8 | reveal, code, bridge. Bookends plus the stub, light work in a similar register |

Each lane gets the scene-agent prompt template from the course-viz skill with the bracketed
fields filled: file location, the `window.scenes.sceneN(root)` contract, the allowed globals
(`katex`, `Theme`, `DATA`, `Genie`, `Schedules`, `Loop`, `Table`, `Trace`, `Panel`, `Chart`,
`History`, `Katex`), the CSS class allowlist, the hard rules, the scene narrative, the step
plan, and the verification instruction.

**Phase 2, the lead.** Link scene CSS in `index.html`, parse-check everything, screenshot
all nine scenes in both themes at both viewports, read every PNG, and spot-check each lane's
invariant claims against the produced files rather than against its report.

Issue prompts follow the FS26 format, one numbered markdown file per unit of work, with the
headings `# Issue N: Title`, `## Goal`, `## Dependencies`, `## Context`, `## Deliverables`,
`## File Structure`, `## Verification`. Reference implementation:
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/issue-prompts/`.

| # | issue | depends on | owner |
|---|---|---|---|
| 01 | Shell, theme, scene engine, hash routing, nine stubs | none | lead |
| 02 | `rng.js`, `genie.js`, `schedules.js`, `loop.js` | 01 | lead |
| 03 | `verify-genie.mjs` and `data/datasets.js`, assertions (a) to (k) | 02 | lead |
| 04 | `table.js`: the widget, deck headers exactly, verdict and update columns | 02 | Jinlei |
| 05 | `trace.js` and `panel.js` on top of `chart.js`, `setTruthVisible` default false | 02, 03 | Suei-Wen |
| 06 | Scenes 0, 1, 2 | 04 | Jinlei |
| 07 | Scenes 3, 4, 5 | 05 | Suei-Wen |
| 08 | Scenes 6, 7, 8, including the stub and the allowlist | 05 | lead |
| 09 | The Python `Genie`, the RNG port, the notebook pair, sanity checks 1 to 3 | 03 | Jinlei |
| 10 | `CLAUDE.md`, `README.md`, integration, screenshot pass in both themes | 06, 07, 08, 09 | lead |

Dependency graph, as ASCII tiers for the project `CLAUDE.md`:

```
tier 0    01
tier 1    02
tier 2    03        04
tier 3    05        06
tier 4    07   08   09
tier 5    10
```

## 17. Provenance

### 17.1 Sources opened while writing this proposal

| file | what was taken |
|---|---|
| `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md` | all 629 lines: hard requirements, both interaction patterns, the scene and step engines, hash routing, the never-do list, the verification loop |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/index.html` | 718 lines, read in the sections that matter: the strategy list and concept card (300 to 380), the exercise (380 to 440), the quiz (445 to 490), the handlers (530 to 600), the game (600 to 690) |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/CLAUDE.md` | the vendoring rule and the claim examined in 6.1 |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/minigolf/index.html` | the RNG at 1541 and 1549, the auto-step at 1594 to 1625, the reveal toggle at 1134, the expectation argument at 1190 to 1215 |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex` | lines 530 to 630: the plate frame, the table frame, the pseudocode frame, the Robbins-Monro iteration frame |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/CLAUDE.md` | lines 24 to 27, the three recorded plate licences |
| `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/bmai_w1_notes_first_order_optimization_p1.jpg` | read as an image: act 2, the four columns, the quoted phrase "The genie game", the TODO |
| `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/docs/master-schedule-weekend1.csv` | rows 6 to 11 and 42 to 45: the slot, the slug, the TAs, the Overleaf link |
| `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/` | `css/style.css` (648 lines), `js/theme.js` (74 lines, `var KEY`), the file inventory |
| `/Users/carloscotrini/Documents/git_fdd/projects/bandits/` | `js/main.js` (182), `js/chart.js` (233), `js/history.js` (51), `js/katex-helpers.js` (29), `index.html`, `vendor/katex` (592K) |
| `docs/summaries/01`, `02`, `03`, `06` | the review phase's forensics on rl-arcade, the AINIT deck, the FS26 notebook conventions, and the FDD viz |

### 17.2 What was verified by computation

All 33 checks in `proposals/viz-genie-rm-reference.mjs`, covering every number in sections
4.2 through 4.6 and 9.4. Run it to reproduce them.

### 17.3 What was verified by reading, and what was not

Verified by reading the file and counting: the darts constants, hint text, quiz answers,
`e1Expected`, `norm`, the five `Math.random()` sites, the 27 em dashes and 6 en dashes, the
zero `location.hash` and zero `type="range"`; the minigolf RNG, alpha schedule and reveal
toggle; the AINIT slide wording and the three column headers; the grasshopper and bandits
file inventories and line counts.

**Not verified.** The Overleaf teaching plan (not opened). The rights status of the Parrish
plate (its absence from the repository's records is what was verified). The Python side of
section 9: no Python was run in this session, so the ported RNG's stream and any number the
notebook will print remain to be pinned by running it. Nothing here has been rendered in a
browser, because nothing has been built yet; every screenshot claim in section 13 is an
instruction rather than a result.
