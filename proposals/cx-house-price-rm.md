# Proposal: hs26-bmai-w1-opt-rm-house

CX First-order optimization: Robbins-Monro scaffold for house-price prediction.

| | |
|---|---|
| Slug | `hs26-bmai-w1-opt-rm-house` |
| Slot | Friday 4 September, the 10:00 CX block, third of three exercises |
| TAs | Ghali, Suei-Wen |
| Schedule brief, verbatim | "Fit a model y = wx + b on a fictitious toy dataset of house measurements {(x1,y1),(x2,y2),...(xn,yn)}" |
| Format | One Google Colab notebook pair, one helper module, one seeded generator |
| Runs after | `hs26-bmai-w1-opt-heron`, `hs26-bmai-w1-opt-genie-rm` |
| Written | 2026-08-26. Revised 2026-08-26 after a second pass over the primary sources |

**One line.** The same guess, check, correct loop that found a square root and satisfied a genie now
fits a price model to data, and the last cell shows that the update the lecturer boxed on the board
is one step of stochastic gradient descent.

**Status.** This proposal has been built. The result is
`initial-states/hs26-bmai-w1-opt-rm-house/`, which is TA-ready and whose four recorded departures
from the FS26 house pattern are listed in that directory's `CLAUDE.md`. Read the built version
before changing this spec. Every number quoted below is real output of
`proposals/cx-house-price-rm-reference.py`, which asserts each one and ends on
`All assertions passed.`

---

## 1. Why this exercise is the hinge of the weekend

Heron and the genie both solve for a number that is defined by an equation. This exercise solves
for a number that is defined by data, and that is the whole of supervised learning.

The deck says so on its printed page 56, the "1982 / Today" table. I read that page and the
training-algorithm row reads:

```
Training algorithm     Robbins-Monro algorithm     Stochastic gradient descent
```

Pages 57, 58 and 59 then name the three upgrades that compose into that equality: use gradients,
use neural networks, use batches. This exercise delivers the first and the third. Universal
approximation, which is the second, belongs to the 14:30 slot.

The participant should leave able to say three sentences out loud:

1. A prediction that came out too low means the parameter has to move up, and the size of the miss
   says how far.
2. A step of fixed size can only circle the answer. A step proportional to the miss can land on it.
3. The rule from the board is gradient descent on the squared loss, using one house at a time. The
   name for that is stochastic gradient descent.

---

## 2. Honest budget

The master schedule (`docs/master-schedule-weekend1.csv`, read in full) lays the morning out as
`09:00 First-order approximation algorithms`, then `10:00 CX: First-order optimization algorithms`
carrying all three `opt-` slugs in one cell, then `10:30 Coffee break at Polysnack`, then
`11:00 Gradient descent`. Read literally that is a 30 minute CX block shared by three exercises.
The brief I was handed calls it one hour, which is the reading where the coffee break sits inside
the block and the room works through to 11:00.

I design for the pessimistic reading and say so plainly: **20 to 25 minutes of participant
hands-on time**, arriving third, after Heron and the genie have already taught the loop and the
vocabulary. Every minute of setup is a minute stolen from the punchline.

| Clock | Act | Participant does |
|---|---|---|
| 0:00 to 0:03 | Cell 0 and setup | Opens Colab, runs one cell |
| 0:03 to 0:05 | Act 0, the lecture house | Runs one prewritten cell, sees the blackboard numbers reproduced |
| 0:05 to 0:10 | Act 1, fixed step | Fills 4 blanks, watches the orbit |
| 0:10 to 0:14 | Act 2, the proportional step | Fills 1 blank, watches it land, sees it blow up |
| 0:14 to 0:20 | Act 3, w and b on 12 houses | Fills 3 blanks, sees the fit line move |
| 0:20 to 0:25 | Act 4, the shrinking step and the naming | Fills 2 blanks, reads the band table and the p56 table |
| after | Extensions A, B, C | For the fast half of the room only |

**The setup cost is not amortised across the block.** The two sibling proposals in this directory,
`viz-heron.md` and `viz-genie-robbins-monro.md`, both propose browser pages built to the course-viz
standard. If those ship as written, this exercise is the only Colab notebook of the 10:00 block, so
it pays the full cost of opening Colab and running the setup cell, and the room arrives with no
Python momentum. That is the reason for the design decision in section 12: the notebook carries its
own helper module and its own data inside the setup cell, so there is no clone, no API key, and no
network dependency of any kind.

**The collapse plan**, which belongs on the printed TA card. If the block runs short, Act 3 becomes
a "run this, do not type it" cell by setting `PREFILL_TASK3 = True` at the top of the notebook, and
the room goes straight from Act 2 to Act 4. Acts 0, 1, 2 and 4 are the minimum viable path.
Nothing outside that path may be required to reach the punchline.

---

## 3. Fidelity to the deck, page by page

Every claim in this section comes from a page of
`/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/bmai_w1_sml_annotated (1).pdf` that I
rendered with `pdftoppm -r 130` and read as an image, or from
`docs/slide-text-extracts/bmai_w1_sml_annotated__1_.txt` for the printed slides. Page numbers are
PDF page numbers, and I confirmed the printed ones by extracting each page individually.

| Deck page | What is actually on it | Where it lands |
|---|---|---|
| p28 | "House prediction". Features `area` kept, `age`, `#rooms`, `location` struck through in red. 1) Observe `(x_1,y_1) ... (x_n,y_n)`, 2) Hypothesize `y = wx + b` with a pink question mark under each of `w` and `b`, 3) Predict and validate | Cell 0 and the dataset cell |
| p29 | "First step". `Given (x,y) in R x R`, `Assume y = w x` with `w` circled and marked unknown. The Program box: guess feeds `w_hat`, data feeds `y_hat <- w_hat x`, which feeds the loss box `y - y_hat`, which feeds an `Update` box carrying a question mark. Right column: `x = 234`, `y = 198,789`, then `w_0 = 900`, `w_1 = 350`, `w_2 = 850`, and `w_3 = 849.5` | Act 0, prewritten |
| p30 | "Fixed-step algorithm". `Given x,y` / `Guess w_hat` / `do: y_hat = w_hat x; l = y - y_hat; if l < 0 then w_hat <- w_hat - alpha else w_hat <- w_hat + alpha` with the whole if/else struck through by a large X, and a red "you choose" arrow pointing at alpha / `until |l| < eps`. Boxed at the right, headed "Robbins-Monro update": `w_hat <- w_hat + alpha l` | Acts 1 and 2 |
| p31 | "Multi-dim RM", `y = wx + b` with red arrows labelling `w` as area and `b` as base. The body computes `y_hat` and `l`, updates `w_hat`, then **recomputes** `y_hat = w_hat x + b_hat` and `l = y - y_hat`, then updates `b_hat` | Act 3 |
| p32 | "Batch MD RM algo". `for j <= n: y_hat_j = w_hat x_j + b_hat; l_j = y_j - y_hat_j` boxed in orange, then `l = (1/n) sum_{j<=n} l_j`, then `update ...`, `until |l| < eps` | Extension A, as a discovery |
| p33 | "Multi-variate model". `x_i in R^d`, `x_i = (x_i1, ..., x_id)` labelled area and #rooms, `y_hat_i = w_1 x_i1 + ... + w_d x_id + b = w^T x_i + b`. Body reads "compute predictions / compute losses / update some w_j" | Extension C |
| p34 | "RM algorithm". `for j <= d: { for i <= n: ... ; l = (1/n) sum_i l_i ; w_hat_j <- w_hat_j + alpha l }` | Extension C, with the caveat below |
| p36 | Classification versus Regression. On the regression side, `(y - y_hat)^2` with the exponent circled in pink and "Squared error" underlined | Act 4, the loss that gets differentiated |
| p38 | "How to compute the window": `l = w_hat - eps/2`, `r = w_hat + eps/2`, `a = L(l)`, `b = L(r)`, `(b-a)/eps = grad_eps L(w_hat)`, with eps labelled "length of your window" | Not this exercise. It is the 11:00 lecture, and it is why section 4 matters |
| p51 (printed) | "Robbins-Monro algorithm": "1. Make a guess w~. 2. As long y1 - w~x1 is unacceptably large, repeat: 1. If y1 < w~x1, then decrease w~. 2. If y1 > w~x1, then increase w~." | See naming clash in section 4 |
| p56 (printed) | The 1982 / Today table | Act 4, the closing cell |
| p57 (printed) | "The Robbins-Monro update rule uses only the difference between target and estimation. A more efficient update rule uses the gradient of the loss function." | Act 4, quoted verbatim |
| p59 (printed) | "At each iteration of the update loop, don't recompute the loss on the entire data; use only a 'batch' (i.e., a subset of the dataset) ... Integrating all these improvements yields stochastic gradient descent, one of the most powerful modern algorithms for estimating dependencies on data." | Act 4, quoted verbatim |

Three things in the source that this exercise has to handle out loud rather than inherit silently.

**Observation 1, the arithmetic annotation on p32.** The pink margin note reads `x = 234`,
`y = 198789`, `w_0 = 850 -> y_hat = 190.000`, `y - y_hat = 8789` with the residual double
underlined. `850 * 234 = 198900`, so the stated residual is consistent with a prediction of
190,000 and inconsistent with the stated `w_0`. Page 29 itself writes `y_hat_2 = 198,900`. The
notebook uses 198,900 and the residual -111, which is what the arithmetic gives and what p29
writes. The TA card names the slide so that a participant who spots the mismatch gets a straight
answer within five seconds.

**Observation 2, the batch rule on p32 and p34.** The quantity driving the update is the mean
*signed* residual. Its zero set is one equation in two unknowns, so it pins down the centre of mass
of the data and leaves the slope free. Section 9 reports what that rule actually does on the
shipped dataset, with numbers from a run, and explains where it goes in the notebook. On p34 there
is a second point worth knowing: the outer loop runs over `j <= d` and updates `w_hat_j` with the
same `l` for every coordinate, and `b_hat` is never updated inside the loop at all.

**Observation 3, a scan ambiguity I could not resolve.** On p29 the middle prediction
`y_hat_1 = w_1 x` is written in a hand whose leading digit reads as either 8 or 9. Since
`350 * 234 = 81,900`, the intended value is 81,900 and the notebook prints that. I record this so
nobody later "corrects" the notebook to match a misread of the scan.

---

## 4. Notation pinned before a line of code is written

The room meets three different meanings of `eps` and two different meanings of `l` before lunch, and
two opposite sign conventions before 11:00. This has to be settled once, in writing, and the same
words used by all three `opt-` exercises.

| Symbol | Meaning here | Source |
|---|---|---|
| `x` | the feature, living area | p28 |
| `y` | the target, price | p28 |
| `y_hat` | the prediction, `w x + b` | p29, p30, p31 |
| `l` | the signed miss, `y - y_hat` | p30, written in red |
| `alpha` | the step size, the thing p30 labels "you choose" | p30 |
| `eps` | the stopping tolerance in `|l| < eps` | p30 |
| `w` | slope, price per unit area | p31, labelled "area" |
| `b` | base | p31, labelled "base" |

Four decisions follow, each of which somebody will otherwise get wrong.

1. **The step is `alpha` and the tolerance is `eps`.** The task brief handed to me calls the fixed
   step epsilon. The deck calls it alpha and reserves `eps` for the tolerance. Then the 11:00
   lecture spends `eps` a third time, on the width of the finite-difference window (p38, verified
   by reading the page). No exercise in the morning may use `eps` for a step size.
2. **`l` collides too.** It is the signed miss on p30 through p34 and the left endpoint of the
   window on p38. The notebook uses `l` only for the miss, and the TA card records that the 11:00
   lecture rebinds the letter.
3. **The miss is target minus prediction, and the update adds.** `l = y - y_hat`, and
   `w <- w + alpha * l`. That is p30 exactly. The AINIT genie deck writes the opposite pair,
   `loss = Q - target` with `Q := Q - alpha * loss`. Both mean "move toward the target". The genie
   exercise runs about 40 minutes before this one, so the notebook says the flip out loud in one
   boxed sentence in Act 2 instead of leaving the room to trip over it.
4. **Robbins-Monro names the proportional update.** Handwritten p30 strikes out the sign-only rule
   and boxes `w_hat <- w_hat + alpha l` under the heading "Robbins-Monro update". Printed p51 gives
   the same name to the sign-only rule. The notebook follows the handwriting, calls the sign-only
   rule "the fixed-step algorithm", and the TA card records that p51 disagrees so that a TA who is
   projecting the printed deck has an answer ready.

---

## 5. The dataset: twelve fictitious houses in Musterwil

**Framing.** An invented Swiss municipality, twelve houses that came on the market last year,
living area in square metres and asking price in Swiss francs.

**On the name.** "Musterwil" is built from *Muster* (specimen) plus the common *-wil* suffix, and
two web searches found it only inside Swiss official templates and specimen documents: a Canton
Solothurn municipal-finance handbook whose specimen audit report is headed "Gemeinde Musterwil",
and the Wikipedia project template for Swiss heritage lists. That is corroboration that the name
reads as a placeholder to a Swiss audience, which is a point in its favour for this room. It is
short of proof that no such municipality exists, because I did not check the federal register of
municipalities itself. Somebody should, before publication. Whatever the outcome the labelling
stays: the municipality, the houses and the prices are all invented, and the CSV header, cell 0,
the README and every figure title say so.

**Generator**, committed and runnable, in the built version at `data/generate_houses.py`:

```python
SEED    = 42
TRUE_W  = 9500.0     # CHF per square metre of living area
TRUE_B  = 120000.0   # CHF, the base
N       = 12
SIGMA   = 25000.0    # CHF, the spread around the line

def make_houses(seed=SEED, n=N):
    rng   = np.random.default_rng(seed)
    area  = np.sort(rng.integers(90, 221, size=n).astype(float))
    price = TRUE_W * area + TRUE_B + rng.normal(0.0, SIGMA, size=n)
    price = np.round(price / 1000.0) * 1000.0      # asking prices are round
    return area, price
```

**The data it produces**, real output, byte identical on every run:

| # | area (m2) | price (CHF) |
|---|---|---|
| 1 | 101 | 1,083,000 |
| 2 | 101 | 1,072,000 |
| 3 | 102 | 1,089,000 |
| 4 | 116 | 1,201,000 |
| 5 | 146 | 1,529,000 |
| 6 | 147 | 1,536,000 |
| 7 | 158 | 1,623,000 |
| 8 | 175 | 1,811,000 |
| 9 | 181 | 1,851,000 |
| 10 | 191 | 1,913,000 |
| 11 | 202 | 2,048,000 |
| 12 | 217 | 2,158,000 |

Twelve rows fit on one screen, they can be read aloud, and a participant can check any prediction
on a phone. Houses 1 and 2 have the same area and different prices, which is a free thirty-second
demonstration that no line can pass through every point. The true parameters are known to the
exercise author and are **withheld from the participant until Act 4**, on the principle the
course-viz skill lists among its things to never do (do not display the answer before the student
attempts it).

**Working units, and why they are load-bearing.** The notebook works in

```
x = area / 100      # units of 100 square metres, so x runs 1.01 to 2.17
y = price / 1000    # thousands of francs, so y runs 1083 to 2158
```

so the true parameters become `w = 950` kCHF per 100 m2 and `b = 120` kCHF. This is the single most
consequential engineering decision in the exercise, because the usable range of `alpha` is set by
the size of `x`:

| Rule | Stable while | In these units | In raw m2 |
|---|---|---|---|
| `w <- w + alpha * l` (p30, one house) | `alpha < 2 / x` | `alpha < 0.92` | `alpha < 0.0092` |
| `w <- w + alpha * l * x` (Act 4) | `alpha < 2 / (x^2 + 1)` | `alpha < 0.35` | `alpha < 0.000042` |

Evaluated at the largest house, `x = 2.17` or `area = 217`, computed and printed by the reference
script. In raw square metres a participant would be typing `alpha = 0.00002` and would have no
chance of feeling what the knob does. In the scaled units both rules live between 0.02 and 0.5, and
the knob can be turned by hand. The notebook states the scaling in one sentence and prints both
columns of the table, so nothing is concealed.

**Reference values on this data** (numpy `lstsq`, real output):

```
least squares    w = 948.8828   b = 123.5852   mean squared error = 281.1024
true parameters  w = 950        b = 120
mean(x) = 1.5308   mean(y) = 1576.1667
```

Every acceptance check in section 14 is written against these.

---

## 6. The five acts, with exact stubs

Stub style follows the FS26 shape verified in
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/rag_exercise/exercise.ipynb`: a
banner comment, a `COMPLETE THIS LINE` marker, `___` where the expression goes, and a `print` at the
end of the cell that is byte identical between the student and solutions files. I dumped both
notebooks and measured the sync rule: 34 cells each, differing in exactly five cells (11, 15, 21,
28, 31), all of them Task cells.

Two deliberate departures from that FS26 shape, both verified against the source. FS26 writes its
banners with box-drawing characters and an emoji (`# ── Task 1: ... ─────` and `# 🎯 COMPLETE THIS
LINE:`) and uses a Unicode arrow inside a print string. The HS26 ASCII-punctuation rule forbids all
three, so the banners here are plain hyphens and the marker carries no emoji. Second, every loop
takes a `max_steps` or `n_epochs` argument, so no cell can hang a projector.

### Act 0. The house from the lecture (prewritten, no blanks)

```python
# The house Carlos put on the board this morning.
x, y = 234.0, 198789.0
for w in (900.0, 350.0, 850.0, 849.5):
    print("w = %8.1f   y_hat = %10.1f   l = y - y_hat = %10.1f" % (w, w * x, y - w * x))
```

Real output, which reproduces p29 cell for cell:

```
w =    900.0   y_hat =   210600.0   l = y - y_hat =   -11811.0
w =    350.0   y_hat =    81900.0   l = y - y_hat =   116889.0
w =    850.0   y_hat =   198900.0   l = y - y_hat =     -111.0
w =    849.5   y_hat =   198783.0   l = y - y_hat =        6.0
```

Two minutes, no typing, and the notebook has earned the room's trust by reproducing the blackboard.
The markdown cell underneath asks the only question that matters: the lecturer found 849.5 by eye,
and a computer needs a rule.

### Act 1. The fixed-step algorithm, and the orbit

```python
# ---------------------------------------------------------------
# Task 1: the fixed-step algorithm (deck page 30, before the X)
# ---------------------------------------------------------------
def fixed_step(x, y, w, alpha, eps, max_steps=500):
    """Nudge w by a constant amount, in the direction the miss points."""
    history = [w]
    for step in range(max_steps):
        # COMPLETE THIS LINE: the prediction of the model y = w x
        y_hat = ___
        # COMPLETE THIS LINE: the signed miss, target minus prediction
        l = ___
        if abs(l) < eps:
            return history, True                  # stopped on its own
        if l < 0:
            # COMPLETE THIS LINE: the prediction came out too high
            w = ___
        else:
            # COMPLETE THIS LINE: the prediction came out too low
            w = ___
        history.append(w)
    return history, False                         # ran out of steps

house  = 0                       # the first house in the table
x1, y1 = x[house], y[house]      # x1 = 1.01, y1 = 1083.0
hist, stopped = fixed_step(x1, y1, w=900.0, alpha=10.0, eps=1.0, max_steps=400)
print("stopped on its own:", stopped, " steps taken:", len(hist) - 1)
print("last six values of w:", [round(v, 2) for v in hist[-6:]])
print("last six misses     :", [round(y1 - v * x1, 2) for v in hist[-6:]])
```

Solutions fill: `w * x`, `y - y_hat`, `w - alpha`, `w + alpha`.

Real output:

```
stopped on its own: False  steps taken: 400
last six values of w: [1070.0, 1080.0, 1070.0, 1080.0, 1070.0, 1080.0]
last six misses     : [2.3, -7.8, 2.3, -7.8, 2.3, -7.8]
```

The exact answer is `y1 / x1 = 1072.2772`. The loop never sees it, because `alpha = 10` confines it
to the grid `900, 910, ..., 1070, 1080` and the answer sits between two grid points. The radius of
the orbit is `alpha` in `w`, which is `alpha * x1 = 10.10` in thousands of francs. This is the beat
the task brief asks for, and it is exact and deterministic rather than anecdotal.

The follow-up cell makes the point quantitative:

```python
hist, stopped = fixed_step(x1, y1, w=900.0, alpha=10.0, eps=12.0, max_steps=400)
# stopped on its own: True  steps taken: 17   final w = 1070.0   final miss = 2.3
```

It stops only because the tolerance was widened past the radius of the orbit. The "What just
happened?" cell asks the room to say why that is a hollow kind of stopping.

### Act 2. Robbins-Monro on one house

```python
# ---------------------------------------------------------------
# Task 2: the update the lecturer boxed (deck page 30, after the X)
# ---------------------------------------------------------------
def robbins_monro(x, y, w, alpha, eps, max_steps=200):
    """Move by an amount proportional to the miss."""
    history = [w]
    for step in range(max_steps):
        y_hat = w * x
        l = y - y_hat
        if abs(l) < eps:
            return history, True
        # COMPLETE THIS LINE: the boxed update from the lecture
        w = ___
        history.append(w)
    return history, False
```

Solutions fill: `w + alpha * l`.

Real output at `w = 900.0, alpha = 0.5, eps = 1.0`:

```
stopped on its own: True   steps taken: 8   final w = 1071.6563   final miss = 0.6272
```

Eight steps against four hundred that never arrived. The margin note repeats the lecture: the
distance travelled shrinks by itself because the miss shrinks, while `alpha` stays where it was.

The second cell of Act 2 is the divergence demonstration, prewritten so that it always fires:

```python
for a in (0.5, 1.9, 2.2):
    hist, stopped = robbins_monro(x1, y1, w=900.0, alpha=a, eps=1.0, max_steps=60)
    print("alpha = %.1f   final w = %14.4f   stopped: %s" % (a, hist[-1], stopped))
```

Real output:

```
alpha = 0.5   final w =      1071.6563   stopped: True
alpha = 1.9   final w =      1071.1929   stopped: False
alpha = 2.2   final w = -28872480.7323   stopped: False
```

The threshold is exact and belongs on the whiteboard: the miss is multiplied by `(1 - alpha * x)`
every step, so the loop converges while `alpha < 2 / x`, which here is `2 / 1.01 = 1.9802`.

### Act 3. Two parameters, twelve houses, one house at a time

Page 31 gives the alternating sweep and writes the recomputation of `y_hat` and `l` between the `w`
update and the `b` update in full. That recomputation is the entire content of the word
"alternating", and it is the one thing participants drop.

```python
# ---------------------------------------------------------------
# Task 3: two parameters, alternating (deck page 31)
# ---------------------------------------------------------------
def rm_alternating(areas, prices, w, b, alpha, n_steps, seed=0):
    """One house at a time, drawn at random. Update w, then update b."""
    rng = np.random.default_rng(seed)
    history = [(w, b)]
    for step in range(n_steps):
        i = int(rng.integers(len(areas)))
        x_i, y_i = areas[i], prices[i]
        l = y_i - (w * x_i + b)
        # COMPLETE THIS LINE: update the slope
        w = ___
        # COMPLETE THIS LINE: recompute the miss, using the new w
        l = ___
        # COMPLETE THIS LINE: update the base
        b = ___
        history.append((w, b))
    return history
```

Solutions fill: `w + alpha * l`, `y_i - (w * x_i + b)`, `b + alpha * l`.

Real output at `w = 500.0, b = 0.0, alpha = 0.1, n_steps = 3600, seed = 1`:

```
w = 937.1679   b = 142.5066   mean squared error = 303.4612
```

against the least squares optimum `w = 948.8828, b = 123.5852, mse = 281.1024`. It fits. It gets
close. It plateaus a little short, and the plateau is the door into Act 4.

This is where the fit-line figure runs. See section 11.

### Act 4. The shrinking step, and the naming

The markdown cell writes one derivative and quotes two slides. The loss is the squared error, which
p36 writes on the regression side with the exponent circled:

```
L(w, b) = (1/2) (y - w x - b)^2

dL/dw = -(y - w x - b) * x = -l * x
dL/db = -(y - w x - b)     = -l
```

The stub:

```python
# ---------------------------------------------------------------
# Task 4: the same loop, with the derivative of the loss
# ---------------------------------------------------------------
def sgd(areas, prices, w, b, alpha, n_epochs, seed=0, decay=None):
    """One house at a time, both parameters updated from the same miss."""
    rng = np.random.default_rng(seed)
    history = [(w, b)]
    t = 0
    for epoch in range(n_epochs):
        for i in rng.permutation(len(areas)):        # shuffle every pass
            x_i, y_i = areas[i], prices[i]
            a_t = alpha if decay is None else alpha / (1.0 + t / decay)
            l = y_i - (w * x_i + b)
            # COMPLETE THIS LINE: the slope, moved down the loss
            w = ___
            # COMPLETE THIS LINE: the base, moved down the loss
            b = ___
            t += 1
            history.append((w, b))
    return history
```

Solutions fill: `w + a_t * l * x_i`, `b + a_t * l`.

Real output, all runs on the shipped data from `w = 500.0, b = 0.0, seed = 1`:

| Run | w | b | mean squared error |
|---|---|---|---|
| Act 3 rule, `alpha = 0.1`, 3600 steps | 937.1679 | 142.5066 | 303.4612 |
| Act 4 rule, `alpha = 0.05`, 300 passes | 947.8121 | 124.6350 | 281.6283 |
| Act 4 rule, `alpha_t = 0.3 / (1 + t/200)` | 948.6542 | 124.1379 | 281.1516 |
| Least squares optimum | 948.8828 | 123.5852 | 281.1024 |

Read downward and the story tells itself: the lecturer's rule gets you near, the derivative of the
loss gets you to the optimum, and the shrinking step gets you there to four significant figures.

Then the honest algebra, which the exercise has to state precisely, because "Robbins-Monro is SGD"
is true in a specific sense and loose in a general one:

```
   base:   Robbins-Monro says   b <- b + alpha * l
           the derivative says  b <- b + alpha * l
           these are the same line.

   slope:  Robbins-Monro says   w <- w + alpha * l
           the derivative says  w <- w + alpha * l * x
           these agree once the step size for w is read as alpha / x.
```

For the base, the lecturer's rule already *is* stochastic gradient descent on the squared loss. For
the slope, it is the same rule with the feature factor folded into the step size, which is why it
converges and why it settles slightly off the optimum on data whose areas differ. Restoring the
factor, and drawing one house at a time, gives the algorithm in the right-hand column of the p56
table. The name is the only new thing.

The closing markdown cell is the one place the exercise raises its voice, and it does so by quoting
the deck. Page 57, verbatim: "The Robbins-Monro update rule uses only the difference between target
and estimation. A more efficient update rule uses the gradient of the loss function." Page 59,
verbatim: "At each iteration of the update loop, don't recompute the loss on the entire data; use
only a 'batch' (i.e., a subset of the dataset) ... Integrating all these improvements yields
stochastic gradient descent."

---

## 7. The step that shrinks: two meanings, both of them shown

The brief asks for "the SHRINKING step which is Robbins-Monro". There are two shrinking steps in
play and the exercise names both, because conflating them is the most likely way for the room to
leave with a wrong idea.

**Meaning one, the deck's.** In `w <- w + alpha * l` the distance travelled is `alpha * l`, and it
shrinks by itself as `l` shrinks. `alpha` is constant. On one house this converges exactly, which
is Act 2. I checked the whole BMAI deck: `alpha` carries no index anywhere in it, so this is the
only shrinking the deck itself describes.

**Meaning two, the classical one.** Once the target is noisy, the step size itself has to go to
zero. This is the version in the AINIT deck, with the pair of conditions (the steps must add up
without bound, and their squares must add up to something finite). The exercise must attribute this
to the AINIT material, since the BMAI deck never writes it.

**Where the second meaning becomes necessary is visible in the data**, and this is the argument for
putting it inside the required path rather than in an extension. Drawing one house at a time makes
the target noisy, so a constant step size cannot settle: the iterate rattles inside a band. The
prewritten comparison cell at the end of Act 4 prints this. Real output, Act 4 rule, 300 passes,
seed 1, from `(500, 0)`, band measured as the spread of `w` over the last 600 iterates:

| Step schedule | final w | final b | mse | band of w |
|---|---|---|---|---|
| constant `alpha = 0.02` | 946.2087 | 128.0931 | 282.3882 | 5.01 |
| constant `alpha = 0.05` | 947.8121 | 124.6350 | 281.6283 | 10.67 |
| constant `alpha = 0.10` | 947.7907 | 125.6860 | 281.4722 | 17.81 |
| `alpha_t = 0.3 / (1 + t/200)` | 948.6542 | 124.1379 | 281.1516 | 4.07 |
| `alpha_t = 0.3 / (1 + t/50)` | 945.3790 | 129.2385 | 283.0991 | 1.19 |

The first three rows say that the band grows with `alpha`, which is the stochastic echo of Act 1's
orbit and is the reason the two acts rhyme. The fourth row says that letting `alpha` decay closes
the band and lands on the optimum. The fifth row is the honest counterweight and should be read
aloud: decaying too fast narrows the band to 1.19 and stalls the iterate slightly short, at mse
283.10, which is worse than the constant `alpha = 0.05` row. That is the whole content of the
classical conditions in one line of output, and it costs the room sixty seconds.

Cost to the participant: zero extra blanks. The `decay` argument is already in the Act 4 signature,
and the comparison cell is prewritten.

**A note on where this sits in the build, so that two sets of numbers do not look like a
contradiction.** The built notebook currently runs this comparison inside extension B, over 3000
passes with the band measured on the last 1200 iterates, where the contrast is sharper still:

| Step schedule | final w | final b | mse | band of w | band of b |
|---|---|---|---|---|---|
| constant `alpha = 0.05` | 950.6710 | 124.8282 | 297.4441 | 10.38 | 6.17 |
| `alpha_t = 0.3 / (1 + t/200)` | 948.8507 | 123.6332 | 281.1026 | 0.42 | 0.24 |

The second row sits within 0.0002 of the least squares mse of 281.1024, which is as close to "it
landed" as a stochastic method gets. Both tables are correct at their own stated parameters; the
longer run simply gives the noise more time to show itself. **My recommendation is to promote this
cell out of extension B and into the end of Act 4, at the build's own 3000 pass parameters**, since
the brief names the shrinking step as a required beat and the cell costs the room about sixty
seconds. That is a one-cell move in `precompute/build_notebooks.py`, and it is listed as a TA task.

---

## 8. Minimum viable path and extensions

**Minimum viable path**, which must fit in 20 minutes: Acts 0, 1, 2 and 4. Seven of the ten blanks.
A participant who does only this has seen the orbit, seen the proportional step land, seen the band
close, and seen the naming.

**Act 3 is the first thing to cut**, by flipping `PREFILL_TASK3 = True` at the top of the notebook.
It costs three blanks and buys the two-parameter model that the schedule brief explicitly asks for,
so it is cut only under time pressure and the TA says so out loud.

**Extension A: the lecture's batch rule, and why it stalls.** Page 32 sums the signed residuals and
divides by n. Prewritten, run by the participant, framed as a question rather than an explanation:

```python
def batch_deck(areas, prices, w, b, alpha, n_passes):
    """Deck page 32, exactly as written: l is the mean signed residual."""
    for _ in range(n_passes):
        l = float(np.mean(prices - (w * areas + b))); w = w + alpha * l
        l = float(np.mean(prices - (w * areas + b))); b = b + alpha * l
    return w, b
```

Real output, 20000 passes at `alpha = 0.05`:

| start (w, b) | ends at w | ends at b | mse | `w * mean(x) + b` |
|---|---|---|---|---|
| (500, 0) | 830.3397 | 305.0550 | 2470.5850 | 1576.1667 |
| (1200, 0) | 1093.7236 | -98.1418 | 3549.7660 | 1576.1667 |
| (950, 120) | 950.7640 | 120.7055 | 281.6538 | 1576.1667 |

`mean(y) = 1576.1667`. The rule converges to *some* line through the centre of mass of the data,
and which line depends entirely on where it started. One equation cannot pin down two numbers. The
per-house version in Act 3 escapes this because each house pushes in a slightly different
direction, and the mean of the signed residuals averages that information away. This is where a
curious participant learns something real, and it is the honest answer to "the slide says mean, so
why did the notebook not do that". The TA card carries this table.

**Extension B: the classical conditions, written down.** Section 7 already runs the schedules. This
extension states the pair of conditions in words and attributes them to the AINIT deck, where the
BMAI deck is silent.

**Extension C: more features.** Pages 33 and 34, `x_i = (area, rooms)`. This needs a second column
in the generator and a rewrite of the update as a loop over coordinates, which is exactly Carlos's
stage 4 and stage 5 for the 11:00 lecture and the natural bridge to the grasshopper block at 12:00.
Ship the generator hook (`make_houses(with_rooms=True)`) and leave the exercise as a stretch cell.
If it is written, it should update `b_hat` and weight each coordinate by its own feature, which
means departing from p34 in two places, and the cell should say so.

---

## 9. Decision: the deck's batch rule goes in the optional path

This is the one call that has to be made consciously, so it is recorded with its reasoning.

**The required path uses the per-house rule. The optional path runs the mean signed residual and
lets the participant find out what it does.**

Three reasons. First, the mean rule leaves the slope free, and the evidence is the table in
extension A: two starting points, two different answers, both of them satisfying the stopping test.
Shipping that as the required path would teach a loop that does not work. Second, the per-house rule
is the deck's own p30 and p31 update applied to one house, and p59 says in so many words that using
a subset of the data at each iteration is the upgrade that produces SGD, so the per-house route is
the shortest path from the handwriting to the punchline. Third, the failure is interesting, which
makes it good extension material.

The TA card states this in one line so that no TA improvises a defence of the slide: the slide's
batch rule leaves the slope undetermined, the exercise takes the per-house route, and the extension
shows the room exactly what happens.

---

## 10. Decision: no Gemini debrief coach here

**Verdict: overkill for this exercise. Keep the cheap half.**

The FS26 debrief coach exists and I read it:
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/agentic_ai_spy/the_hidden_layer_full_mission_solutions.ipynb`,
cell 11, the `_STATIC_CONTEXT` string, whose contract runs "You are a COACH, not a code generator"
then DIAGNOSE, GUIDE ("ask the student 1-2 targeted questions"), HINT ("suggest a *strategy* ...
without writing the full code"), IMPLEMENT TOGETHER ("help them write *that piece*"), closing on
"NEVER return a complete drop-in `think_llm` function unprompted."

That machinery earns its keep there because the artifact under construction is a system prompt,
which has no ground truth and fails in open-ended ways that only a language model can read back.

This exercise is a twenty line numeric loop with a checkable answer and a short, enumerable list of
failure modes, every one of which has a deterministic diagnosis. They are listed in section 15 and
implemented as `check_task_N` in section 13. Weighed against that, an API key costs the participant
a visit to AI Studio, a Colab secret and a notebook-access toggle, which is 4 to 5 minutes of a 20
minute budget, and it introduces a failure mode that has nothing to do with optimization. It would
also be the third key setup of the morning if the sibling exercises follow FS26.

**Keep**: the deterministic `check_task_N()` functions, the "What just happened?" markdown cells
with a code-free Discussion list (the `rag_exercise` pattern), and the paste block. The paste block
is the cheap half of the FS26 debrief: `generate_debrief_paste()` renders a read-only textarea plus
a copy button carrying the coaching contract text, the participant's own final numbers and their
current cell source, with the instruction to paste it into whatever assistant they already have
open. Zero setup, zero keys, zero network.

**Drop**: `google-genai`, the client cell, the API-key markdown cell, the log download cell.

Recorded in the exercise `CLAUDE.md` as a deliberate departure from the FS26 pattern with this
reason, so that the next agent leaves it alone.

---

## 11. Decision: inline matplotlib, not a course-viz page

**Verdict: three matplotlib figures in the helper module.** The exercise needs the fit line to move.
It does not need a browser page.

**What ships**, all driven by the history list the participant's own function returned:

1. `plot_orbit(history, x1, y1)`. Act 1 and Act 2 on the same axes convention: `w` against step,
   with the exact answer as a dashed horizontal line. The fixed-step run visibly bounces between two
   values either side of the line, and the Robbins-Monro run walks onto it.
2. `plot_fit_grid(history, x, y, picks=(0, 1, 2, 5, 20, -1))`. Six small panels, the twelve houses
   as points and the current line drawn across them, each panel titled with the step number, `w`,
   `b` and the mean squared error. This is the figure that runs at the end of Act 3, and on the Act
   3 history at `alpha = 0.1` the six panels read mse 688991.2, 405629.2, 234162.0, 45021.7, 3143.3,
   303.5 (real output, steps 0, 1, 2, 5, 20 and 3600). Driven by the Act 4 history at `alpha = 0.05`
   instead, the same six picks read 688991.2, 420760.3, 215120.1, 65257.6, 1273.9, 505.8. Both are
   monotone and both end with a line that visibly passes through the twelve points. Small multiples
   were chosen over an animation deliberately: `FuncAnimation` in Colab needs a writer or a
   JavaScript backend and fails differently on different runtimes, while a static grid cannot fail
   in front of a room.
3. `plot_loss_curve(history, x, y)`. Mean squared error against step on a log y axis. This is the
   figure that shows the fixed-step orbit as a flat line and the Robbins-Monro run as a staircase
   going down.
4. `plot_wb_path(history, x, y)`. The `(w, b)` path over a contour map of the mean squared error.
   Optional, and it is the best thirty seconds of preparation available for the 11:00 gradient
   descent lecture, because it draws the surface that lecture is about to descend.

**Why a course-viz page loses here.** The house standard
(`/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md`, hard
requirements 1 to 5, which I read) mandates the multi-file layout, `file://` operation with no
`fetch` and no CDN, vendored libraries, light and dark themes with the `t` shortcut, one folder per
viz, and a verification loop ending in headless screenshots. That is days of work and it buys a
ninety second animation. It would also have to reimplement the update rule in JavaScript, which puts
the same arithmetic in two places and breaks the single-source-of-truth convention the house method
insists on. And the point of the figure is that the participant's own function drives it, which a
prebuilt page cannot do.

The morning already ships browser pages: the grasshopper at 12:00 and the moonlander port in the
same slot, plus the two sibling `opt-` proposals. A fourth browser artifact before lunch competes
for attention with the ones that were commissioned.

**One scoped exception, named so the idea is not lost.** The fixed-step orbit is a lecturer demo
rather than a participant exercise, and it would work well as one extra grasshopper level with an
`alpha` that cannot shrink. That belongs to the `gd-grasshopper` work.

---

## 12. Decision: no repository clone, the notebook carries itself

FS26 setup cells run `git clone -b week3 https://github.com/eth-bmai-fs26/coding-exercises.git`. No
HS26 equivalent exists (open question 3), and a clone is a network dependency on a morning where the
room has 20 minutes.

The setup cell instead writes `housetools.py` and `houses.csv` from copies embedded in it, so the
notebook is one self-contained file that runs on a bare Colab runtime with no network at all. The
builder asserts that the embedded copies are byte identical to the files on disk, so the module on
disk stays the single source of truth and the two cannot drift.

This has already been built and it works. It is recorded as departure 2 in the built directory's
`CLAUDE.md`.

---

## 13. Sanity checks

One per task, all deterministic, each printing a named diagnosis. They run against a throwaway
problem with a known answer, so the twelve-house data is never spoiled, and none of them prints the
target `w` or `b` before Act 4.

```python
def check_task_1(fixed_step):
    """A one-house problem whose answer is exactly w = 10."""
    hist, stopped = fixed_step(2.0, 20.0, w=0.0, alpha=1.0, eps=0.5, max_steps=50)
    if len(hist) < 2:               return fail("The loop never took a step.")
    if hist[1] < hist[0]:           return fail("The first step went down from a prediction that "
                                                "came out too low. Check which branch subtracts.")
    if not stopped:                 return fail("Did not reach |l| < 0.5 in 50 steps. The correct "
                                                "loop arrives at w = 10 in 10 steps.")
    if abs(hist[-1] - 10.0) > 1e-9: return fail("Stopped at w = %r, expected 10.0." % hist[-1])
    return ok("Task 1 looks right: 10 steps of size 1.0, landing exactly on w = 10.")
```

`ok` and `fail` are two-line helpers that print a `PASS` or `FAIL` prefix and return a boolean, so a
task cell can be re-run until it prints `PASS`. I ran the check problem: the correct loop lands on
`w = 10.0` in exactly 10 steps of size 1.0, and swapping the two branches sends the first step to
`-1.0`, so the second guard fires on the first wrong answer a participant is likely to write.

What the four checks catch:

| Check | Fires when | The message names |
|---|---|---|
| `check_task_1` | the two branches are swapped | which branch subtracts |
| `check_task_1` | `l` is written `y_hat - y` | the direction of the first step |
| `check_task_2` | the update subtracts | "w is running away from the answer, check the sign" |
| `check_task_2` | `alpha` is above `2 / x` on the check problem | "the miss grew instead of shrinking" |
| `check_task_3` | `l` is not recomputed before `b` | compares against both variants and says which one was written |
| `check_task_3` | `b` is updated with `alpha * l * x` | "the base does not carry a factor of x" |
| `check_task_4` | the factor `x_i` is missing on `w` | "this is the task 3 rule again; the derivative of the squared loss carries a factor x" |
| `check_task_4` | the factor `x_i` is on `b` as well | "check the two derivatives separately" |
| `check_task_4` | `rng.permutation` is replaced by `range` | "the houses are being visited in size order" |

`check_task_3` is the interesting one, because two wrong answers both converge to plausible-looking
lines. It runs the participant's function and both reference variants on a fixed seed and compares
the returned histories element by element, so it can say which of the two the participant wrote
instead of guessing from the endpoint. The built version of this check works: running
`precompute/reference.py` prints its three demonstration failures, including
"You updated w and then reused the old miss for b. Page 31 measures the miss a second time, because
moving w changed the prediction."

There is also a `filled_in(fn)` guard, which inspects the function source for a remaining `___` and
says "there is still a blank in this cell" rather than letting Python raise a `NameError` whose
message means nothing to this audience.

---

## 14. Acceptance criteria

An exercise is done when a TA can run this list and see every line pass. All numbers are real output
of `proposals/cx-house-price-rm-reference.py`, seed 42 for the data and the seeds named below for
the loops. That file asserts all of them and ends on `All assertions passed.` The built copy is
`initial-states/hs26-bmai-w1-opt-rm-house/precompute/reference.py`, which additionally prints its
wall clock (1.02 s on this machine).

| # | Criterion | Expected |
|---|---|---|
| 1 | The generator is deterministic | Two runs of `generate_houses.py` give a byte identical CSV; first area 101, last area 217, first price 1083000 |
| 2 | Act 0 reproduces the slide | The four printed misses are exactly -11811.0, 116889.0, -111.0, 6.0 |
| 3 | Act 1 orbits | `fixed_step(1.01, 1083.0, 900.0, 10.0, 1.0, 400)` returns `stopped = False` and the last six `w` alternate 1070.0, 1080.0 |
| 4 | Act 1 stops only when told to | The same call with `eps = 12.0` returns `stopped = True` after 17 steps at `w = 1070.0` |
| 5 | Act 2 lands | `robbins_monro(1.01, 1083.0, 900.0, 0.5, 1.0)` returns `stopped = True`, 8 steps, `w = 1071.6563`, final miss 0.6272 |
| 6 | Act 2 diverges as predicted | `alpha = 2.2` reaches `w = -2.887e7` within 60 steps, and `alpha = 2/x = 1.9802` is the boundary |
| 7 | Act 3 fits | `rm_alternating(alpha=0.1, n_steps=3600, seed=1)` from (500, 0) gives `w = 937.1679`, `b = 142.5066`, mse 303.4612 |
| 8 | Act 4 reaches the optimum | `sgd(alpha=0.05, n_epochs=300, seed=1)` from (500, 0) gives `w = 947.8121`, `b = 124.6350`, mse 281.6283, within 0.53 of the least squares mse |
| 9 | The band grows with alpha | Act 4 rule, spread of `w` over the last 600 iterates: 5.01 at `alpha = 0.02`, 10.67 at 0.05, 17.81 at 0.10 |
| 10 | The shrinking step closes the band | `alpha_t = 0.3/(1 + t/200)` gives band 4.07 and mse 281.1516 against the optimum 281.1024; `t/50` gives band 1.19 and mse 283.0991 |
| 11 | Extension A shows the failure | `batch_deck` from (500, 0) and from (1200, 0) end at different `w`, and both satisfy `w * mean(x) + b = 1576.1667` |
| 12 | Student and solutions are in sync | Same cell count, same `NOTEBOOK_VERSION`, and the only differing cells are the four task cells. Measured on the built pair: 38 cells each, differing at indices 6, 11, 16, 23 |
| 13 | No cell can hang | Every loop takes `max_steps` or `n_epochs`; the whole reference run finishes in about 1 second |
| 14 | Every figure is labelled fictitious | The word appears in the CSV header, cell 0, the README and every figure title |
| 15 | Nothing gives the answer away early | `TRUE_W` and `TRUE_B` appear nowhere in the student notebook before Act 4 |
| 16 | ASCII punctuation | No em dash, no en dash, no double hyphen used as a dash, in any authored cell |
| 17 | It runs clean | Fresh Colab runtime, Run all on the solutions notebook, no errors and no warnings |

---

## 15. Participant mistakes the TAs should expect

Each row carries the symptom the TA will see over a shoulder, the cause, and the sentence to say.
All numbers come from real runs.

**1. Sign error in the update.** The participant writes `w = w - alpha * l`.

Symptom: `w` runs away immediately. From `w = 900, alpha = 0.5` the printed history is
`900.0, 813.0, 682.06, 485.01, 188.44, -257.9, -929.64, -1940.61, -3462.12, -5752.0, -9198.25`.
Cause: the miss is `y - y_hat`, so a positive miss means the prediction came out too low and `w` has
to go up. Say: "Your prediction came out too low and you made `w` smaller. Read the miss out loud
with its sign before you choose the direction." A participant who has just done the genie exercise
has a live memory of `Q := Q - alpha * loss`, which is correct there because that loss is
`guess - target`. Avoid telling them they misremembered. Tell them the two exercises define the miss
with opposite signs, and put the two lines side by side.

**2. A step so large it diverges.** The participant sets `alpha = 5` because 0.5 felt slow.

Symptom in Act 2: `w = -2.887e7` after 60 steps, or `inf`, or `nan`. Symptom in Act 4 at
`alpha = 1.0`: the mean squared error is 5.384e13 after a single pass and `nan` after 300, with a
numpy overflow warning, and the figure is a blank panel with the line off the axes. Cause: the miss
is multiplied by `(1 - alpha * x)` each step in Act 2 and by `(1 - alpha * (x^2 + 1))` in Act 4.
Say: "Every step multiplies the miss by a number. Work out what that number is at `alpha = 5` and
`x = 2`." Then have them compute the thresholds themselves: `2 / x = 0.92` and
`2 / (x^2 + 1) = 0.35` at the largest house. This is the best sixty seconds in the exercise, because
it is also the answer to "how do I choose the learning rate" for the rest of the course. The helper
catches a non-finite `w` and prints "the step size is too large for the largest house; try dividing
it by ten" instead of letting numpy print a `RuntimeWarning`.

**3. Forgetting to shuffle.** The participant replaces `rng.permutation(len(areas))` with
`range(len(areas))`.

Symptom: it still converges, and it converges to the wrong place, which is what makes this one hard
to catch by eye. Real numbers on the shipped data, 300 passes at `alpha = 0.10`, both from (500, 0):
with the shuffle `w = 947.79, b = 125.69, mse 281.47`; sweeping in index order
`w = 932.94, b = 143.55, mse 340.53`, a fifth worse than the optimum of 281.10. Cause: the data is
sorted by area, so the last house of every pass is always the largest and the estimate finishes
every pass leaning the same way. Act 3 draws a house at random with replacement, so this mistake can
only appear in Act 4, and `check_task_4` is the only check that tests for it. Say: "Look at the area
column. What is special about the house you always finish on?" This is also the honest reason the
dataset is sorted: a sorted table is easier to read aloud, and it makes this bug visible instead of
invisible.

**4. Reading the orbit as convergence.** The participant sees `w` settle to 1070, 1080, 1070, 1080
and reports that it converged.

Symptom: they say "it found it" and move on. Cause: two alternating values look stable in a printed
list, especially when the misses (2.3 and -7.8) are small beside a price of 1083. Say: "It is
visiting two values forever. Which one is the answer?" Then show `y1 / x1 = 1072.2772`, which is
neither of them. The follow-up question is the one that transfers: what would have to change for it
to stop, and the two honest answers are a smaller `alpha` (a narrower orbit) or a larger `eps` (a
lower bar). Both of those fall short of convergence. Act 1's second cell exists to make exactly this
point with the `eps = 12` run.

**5. Dropping the recomputation in Act 3.** The participant computes `l` once and uses it for both
updates.

Symptom: it converges, slightly differently, and nothing looks wrong. Cause: p31 writes
`y_hat = w x + b` and `l = y - y_hat` a second time between the two updates. Say: "You moved `w`, so
the miss changed. Measure it again before you move `b`." `check_task_3` catches this by comparing
against both variants and naming which one was written. Worth flagging to TAs that the simultaneous
version is a legitimate algorithm in its own right (it is what Act 4 does on purpose, and it is what
the 11:00 lecture will call one grasshopper per dimension), so the message is that the two are
different algorithms and Act 3 asked for the alternating one.

**6. `alpha` carried across from Act 2 into Act 4.** The participant keeps `alpha = 0.5`.

Symptom: `w = 962.7480, b = 105.7729, mse 322.704`, which is worse than `alpha = 0.05` and looks
like a bug in their code. Cause: the extra factor `x` multiplies the effective step by roughly
`x^2`, so a step that was fine in Act 2 is about five times too large in Act 4. Say: "You added a
factor of `x` to the update. What did that do to the size of the step?" Same lesson as mistake 2,
and the TA should link them out loud.

**7. Reading the band as a bug.** The participant sees `w` still moving after 3000 steps and
concludes that their code is broken.

Symptom: "it never stops". Cause: with a constant step size and a target that changes house to
house, the iterate cannot settle; it rattles in a band whose width grows with `alpha` (5.01, 10.67,
17.81 for `alpha` 0.02, 0.05, 0.10). Say: "It is doing the right thing. Look at how wide the
rattling is, then look at what happens when the step size shrinks." That hands the room the fourth
row of the section 7 table, which is the classical Robbins-Monro condition arrived at from a
complaint.

---

## 16. TA-ready initial state

Layout, following the FS26 exercise-directory shape and adding the two things the review found
missing there (a per-directory `CLAUDE.md` and a committed generator). This is what was built:

```
hs26-bmai-w1-opt-rm-house/
  CLAUDE.md                       contract for the next agent: conventions, the four
                                  departures and why, the anti-collision table, open decisions
  README.md                       what it is, how to run it, the honesty note
  .gitignore
  requirements.txt                numpy, matplotlib
  housetools.py                   load_houses, mse, least_squares, print_houses, the four
                                  figures, the four check_task_N, filled_in, generate_debrief_paste
  data/
    CLAUDE.md
    README.md
    generate_houses.py            the seeded generator
    houses.csv                    committed, 12 rows, header says fictitious
  notebooks/
    CLAUDE.md
    house_price_rm.ipynb          student, 38 cells
    house_price_rm_solutions.ipynb  solutions, 38 cells, differing at 6, 11, 16, 23
  precompute/
    CLAUDE.md
    reference.py                  every algorithm, prints every number quoted here, asserts each
    build_notebooks.py            generates BOTH notebooks and asserts the sync rule
  issue-prompts/
    CLAUDE.md                     the dependency graph as ASCII tiers
    01-ta-card.md
    02-figures-audit.md
    03-check-coverage.md
    04-second-feature.md
    05-colab-run-and-hosting.md
    06-readme-and-handover.md
```

**The rule that matters most in the built version: the two notebooks are generated, so edit
`precompute/build_notebooks.py` and never an `.ipynb`.** A hand edit to a notebook is destroyed
silently the next time the builder runs. This is how the student and solutions sync rule holds by
construction rather than by discipline.

The verification chain, all three of which end on an assertion:

```
python3 data/generate_houses.py        rewrites data/houses.csv, byte identical every time
python3 precompute/reference.py        prints every quoted number, then asserts each one
python3 precompute/build_notebooks.py  rewrites both notebooks, asserts the sync rule
```

Issue prompts follow the FS26 format verified in
`/Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/issue-prompts/`: `# Issue N:
Title`, then `## Goal`, `## Dependencies`, `## Context`, `## Deliverables` with one numbered
subsection per artifact, `## File Structure`, and `## Verification` as observable bullets.

**The TA card** is one printed page and carries: the seven mistakes above with the sentence to say;
the note that p51 and handwritten p30 give the name Robbins-Monro to different rules; the note that
the genie exercise uses the opposite sign convention deliberately; the `190.000` arithmetic slip on
p32; the batch-rule table from extension A; the band table from section 7; and the collapse plan.

---

## 17. Anti-collision with the rest of the morning

| This exercise owns | This exercise must not teach |
|---|---|
| The model `y = w x + b` fitted to data | Heron's averaging update, which belongs to `opt-heron` |
| The step that lands versus the step that orbits, on real residuals | The genie's fixed point `Q = 1 + 1/Q`, which belongs to `opt-genie-rm` |
| The band that a constant step leaves, and the schedule that closes it | The finite-difference window and the limit, which belong to the 11:00 lecture and the moonlander |
| The naming of stochastic gradient descent | The grasshopper's one grasshopper per dimension, which belongs to the 12:00 block |
| The per-coordinate view, as a stretch cell pointing forward only | Anything about validation or overfitting, which is Saturday |

---

## 18. Open questions for Carlos

1. **How long is the block really?** The sheet reads 10:00 CX, 10:30 coffee. If the CX block truly
   runs to 11:00 through the break, Act 3 stays required and extension A is reachable for most of
   the room. If it is 30 minutes for three exercises, this exercise gets 10 minutes and the minimum
   viable path has to shrink again, to Acts 0, 2 and 4.
2. **Sign convention across the three morning exercises.** This proposal follows the deck
   (`l = y - y_hat`, the update adds). The sibling proposal `viz-genie-robbins-monro.md` keeps the
   AINIT convention (`loss = Q - target`, the update subtracts) and marks it provisional, so the
   room meets both within two hours. Either normalise the genie to the deck, or keep the flip and
   make it explicit in both. This proposal is written for the second option and says the flip out
   loud in Act 2.
3. **Where do the notebooks live?** FS26 setup cells clone `eth-bmai-fs26/coding-exercises`. No HS26
   equivalent exists locally and the schedule points only at the scratch repository. Section 12
   removes the dependency, so this is now a distribution question rather than a blocker: somebody
   has to decide between an `eth-bmai-hs26/coding-exercises` repository, a Colab badge in the
   schedule, and shipping through Moodle the way the moonlander did.
4. **The name Musterwil.** Confirm against the federal register of municipalities, or pick another
   placeholder. See section 5 for what the searches did and did not establish.
5. **Notebook naming.** FS26 uses four different conventions across its tree. This proposal picks
   `<name>.ipynb` and `<name>_solutions.ipynb`. Worth fixing once for all of HS26.
6. **Does the room see the true parameters at all?** This proposal reveals `w = 950, b = 120` in Act
   4, after the fit. The alternative is to never reveal them and let the least squares line be the
   only reference. The reveal makes a better ending and it makes the noise visible, which is the
   first honest step toward the Saturday validation slot.
7. **Should the shrinking step be required?** Section 7 argues yes and costs no extra blanks to do
   it. If the 30 minute reading of the schedule wins, this is the second thing to cut after Act 3.

---

## 19. Provenance

What I read and ran, so that any claim above can be checked.

| Source | How it was read | What it settled |
|---|---|---|
| `bmai_w1_sml_annotated (1).pdf` pages 28 to 34, 36, 38 | Rendered at 120 to 130 dpi with `pdftoppm` and read as images | Every handwritten algorithm in section 3, the crossed-out branch, the boxed RM update, the recomputation on p31, the mean signed residual on p32 and p34, the squared error on p36, the window on p38 |
| the same deck, printed pages 47 to 60 | `pdftotext -layout` one page at a time | That p51 is the sign-only Robbins-Monro slide, p56 the 1982 / Today table, p57 "use gradients", p59 "use batches". The two verbatim quotations in Act 4 |
| `docs/master-schedule-weekend1.csv` | Read in full | The slug, the brief quoted verbatim in the header, the TA names Ghali and Suei-Wen, and the 10:00 CX with 10:30 coffee reading |
| `proposals/cx-house-price-rm-reference.py` | Run. It ends on `All assertions passed.` | Every number in sections 5, 6, 7, 8, 14 and 15 |
| additional runs of that module | Run in this session | The band table in section 7, the `check_task_1` toy problem behaviour, the fit-grid mse values, the `alpha = 1.0` divergence figures, and the swapped-branch first step |
| `rag_exercise/exercise.ipynb` and `solution.ipynb` | Cells dumped and compared programmatically | The stub shape, and the sync rule measured as 34 cells each differing in exactly 5. Also the emoji and box-drawing characters that HS26 has to drop |
| `agentic_ai_spy/the_hidden_layer_full_mission_solutions.ipynb` cell 11 | `_STATIC_CONTEXT` extracted and read | The coach contract quoted in section 10 |
| `/Users/carloscotrini/Documents/git_bmai/2026fs/lead_scoring_minimal/generate_data.py` and `README.md` | Read | The seeded-generator pattern (`SEED = 42` at module scope) and the disclaimer wording |
| `course-viz/SKILL.md` lines 16 to 44 | Read | The five hard requirements cited in section 11 |
| `initial-states/hs26-bmai-w1-opt-rm-house/` | Listed, `reference.py` run, notebook pair compared programmatically | That the build matches this spec: same data, 38-cell pair differing at 4 task cells, assertions passing in 1.02 s |
| two web searches for "Musterwil" | Run | That the name appears in Swiss official templates and specimen documents. See the limits stated in section 5 |

**Verified by computation**: every quoted number, the stability thresholds, the band widths, the
orbit arithmetic, the sync-rule cell counts.

**Read directly, quoted rather than inferred**: all deck content in section 3, the FS26 coach
contract, the course-viz hard requirements.

**Labelled unverified**: whether a municipality named Musterwil is absent from the federal register
(the searches found only template usages, which is corroboration and short of proof); whether the
10:00 block runs 30 or 60 minutes; whether an HS26 exercises repository exists remotely; and the
leading digit of `y_hat_1` on p29, where the scan is ambiguous and the arithmetic settles it at
81,900.

**Corrected against the previous revision of this file**: the claim that Act 4 at `alpha = 1.0`
prints a mean squared error of 1.08e25 does not reproduce. The real figures are 5.384e13 after one
pass and `nan` after 300. Section 15 now quotes those. Two smaller fixes: p28 hypothesizes
`y = wx + b` while p29 hypothesizes `y = wx`, and the phrase "first to go" on p36 belongs to
cross-entropy on the classification side rather than to the squared error.
