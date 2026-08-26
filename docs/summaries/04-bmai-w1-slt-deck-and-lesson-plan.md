# BMAI HS26 weekend 1: the lecture arc that the coding exercises must serve

Reconstructed on 2026-08-26 from primary sources only. Everything below is either quoted from a
source or explicitly marked as inference. Where a source is silent I say so.

## 0. Sources actually read

| Source | What was read | Confidence |
|---|---|---|
| `/Users/carloscotrini/Documents/git_bmai/2026hs/scratch/bmai_w1_sml_annotated (1).pdf` | 60 pages. Pages 27 to 46 and 49 to 51 rendered at 150 dpi and read as images, because they are handwritten and the OCR is unusable. Printed pages read from the text extract. | High. The handwriting is clean at 150 dpi. |
| `.../docs/slide-text-extracts/bmai_w1_sml_annotated__1_.txt` | Full. Used only for the printed slides. | High for printed, worthless for handwritten. |
| `.../bmai_w1_robbins_monro_gradient_descent (1).pdf` | 1 page, rendered and read as an image. | High. This is the single best summary of the whole arc. |
| The four handwritten lesson-plan JPGs | All four read as images. | High, except two struck-through words. |
| `.../docs/slide-text-extracts/ainit_rl-slides.txt` | Genie game and Robbins-Monro slides (deck pages 24 to 27 of 43). | High. |
| `.../docs/master-schedule-weekend1.csv` | Full. | High. |
| `.../Minimum Lander Exploration.html` | Structure only: mission titles and table headers. | Sufficient for the mapping table. |
| `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/README.md` | Full. | High. |

Deck provenance: the footers read `19.02.2026` and the title page authors are Carlos Cotrini,
Konstantinos Chasiotis, Dimitrios Dekas, Alper Karadeniz, Mattia de Martino. This is the FS26 deck
being carried into HS26, not a deck written for HS26.

## 1. Section-by-section outline of the deck's argument

The deck is one 60-page file. The master schedule splits Friday into four lectures. The deck's
physical order is **not** the timetable order: the Vapnik framing opens the file but the SLT lecture
is the last Friday slot. My reading of the correspondence is at the end of this section, and it is
labelled as inference.

### 1.1 Frame: the scientific method as a pipeline (pages 1 to 11)

Page 3 names it "The scientific method". Pages 4 to 11 are one build of a single vertical loop:

```
Knowledge discovery
    Observe
    Hypothesize
    Loss function
    Model / Hypothesis class
    Training algorithm
    Predict and validate
```

Numbered blocks are laid over the loop, one page at a time, in this order:

1. Knowledge discovery (the loop itself)
2. AI
3. ML
4. Vapnik's statistical learning
5. Gradient descent as the training algorithm
6. Neural networks as models
7. Mini travel agent
8. Mini meeting assistant

Page 11 repeats the finished picture with the numbers removed. Blocks 7 and 8 are the two BMAI
capstone applications and are never developed further in this deck.

### 1.2 Evidence: ML finds dependencies people did not see (pages 12 to 24)

- p12 divider: "(Surprising) dependencies on data".
- p13 "Human learning (the scientific method)": Observe, Hypothesize, Validate.
- p14 "The main goal of machine learning": the same three, plus a side note, "Agentic AI follows
  from this pipeline extended with a fourth step: Act".
- p15 "The first ML application in history": J. A. C. Brown, H. S. Houthakker and S. J. Prais
  (1953), "Electronic Computation in Economic Statistics", JASA 48(263): 414 to 428. A computer was
  used to discover an equation explaining how families spend money on specific goods from income,
  age, location.
- p16 "A leap forward: the machine discovers trackers on its own": predicting CDC flu surveillance
  weeks in advance; the model discovered on its own the search terms people type before getting flu.
- p17 and p18: title says "diagnosing Alzheimer before visible symptoms appear", body says a machine
  learning algorithm that tells if a person has **Parkinson** disease from their interactions with a
  website. Paper link on the slide:
  `https://onlinelibrary.wiley.com/doi/full/10.1002/acn3.50945`. Features: mouse pointer location,
  keyboard features (number of typos, time between results shown and keyboard use). The slide's own
  punchline: "These features are not related to Parkinson nor to Bing." **The title and body
  disagree about the disease.** This is in the source, not a transcription error on my part.
- p19 "So what is an ML application?": any computer application that consumes data, computes a model
  from that data, and makes predictions using that model.
- p20 to p22 "(large) language models": the four sentences "Alice likes oranges / Bob likes fruits /
  Bob likes cake / Bob eats cake" become a transition graph with edge probabilities 1/4, 3/4, 1/2,
  and then a one-hot input matrix mapped to a next-token probability matrix over columns
  A B L E C F O.
- p23: a full-bleed "ML Classification Pipeline" infographic (five stages: Understand and Visualize,
  Prepare Data, Select Model, Train and Optimize, Evaluate Performance). It names "Optimize via
  gradient descent" and lists binary and categorical cross entropy, and the evaluation metrics.
  Stylistically foreign to the rest of the deck.
- p24 "What about agentic AI?": book flights, car rental, book hotel. "Agentic AI requires to
  decompose a plan into concrete actions and those actions need to be translated into syntactically
  correct calls to specialized computer applications. This translation is a specialized ML
  application."

### 1.3 Vapnik and empirical risk minimisation, informally (pages 25 to 34)

- p25 divider "Vapnik's statistical learning theory"; p26 the loop again with overlays 1 to 4.
- p27 "ML as dependence estimation": the cover of Vapnik, *Estimation of Dependences Based on
  Empirical Data*, Second Edition, plus the book's opening paragraphs and the claim, "In 1982,
  Vladimir Vapnik established empirical risk minimization: the main strategy behind many modern ML
  applications."
- p28 to p34: **the handwritten house price worked example.** This is section 2 below, in full.

### 1.4 Loss functions (pages 35 and 36)

p35 "About loss functions" writes a zoo, all in terms of `y` and `y_hat`:

```
l = y - y_hat            (the signed residual, the one the algorithms use)
l = |y - y_hat|
l = (y - y_hat)^2        (underlined in orange on the slide)
l = (y - y_hat)^3
l = (y - y_hat)^4
Huber loss, with parameter delta:
    (1/2)(y - y_hat)^2                     if |y - y_hat| <= delta
    delta * (|y - y_hat| - (1/2) delta)    if |y - y_hat| >  delta
```

p36 splits the world in two:

- Classification: `x -> y in {0,1}`. Annotated "My first-to-go": the cross entropy loss function.
  `x -> P_y -> y`, where `P_y` is "prob. that label is y", and `loss = -log P_y_hat`.
- Regression: `x -> y in R`. `(y - y_hat)^2`, with the exponent 2 circled, labelled "Squared error".

### 1.5 Gradient descent, derived from a finite window (pages 37 to 42)

This is the 11:00 Friday lecture and it is the exact content the handwritten stage plan points at.

- **p37 "How to optimize any loss function?"** Two examples. Top: `L(w) = w^2 - 6w + 10`, a parabola,
  `w* = 3`, with `w` circled and annotated "one single parameter". Bottom: `L(w) = w^2 - 4w + 7`
  with a table of probe values:

  | w_hat | L(w_hat) as written on the slide |
  |---|---|
  | 12 | 103 |
  | -1 | 12 |
  | 3 | 9 |

  The first two are correct. `L(3) = 9 - 12 + 7 = 4`, so **the third row's value 9 is wrong as
  written on the slide.** Flagged because a coding exercise that reproduces this table will disagree
  with the slide.

- **p38 "How to compute the window".** The definition the whole GD story rests on:

  ```
  eps  = the length of your window (annotated "length of your window")
  l    = w_hat - eps/2
  r    = w_hat + eps/2
  a    = L(l)
  b    = L(r)
  grad_eps L(w_hat) = (b - a) / eps
  ```

  Drawn as a box spanning `l` to `r`, with the chord from `(l, a)` to `(r, b)`, annotated "slope!".

- **p39: sign and magnitude.** Four windows side by side, each with a chord of a different slope,
  and two annotated rows underneath:

  | slope of the chord | desired update |
  |---|---|
  | big negative | big step to the right (`+`) |
  | small negative | small step to the right (`+`) |
  | small positive | small step to the left (`-`) |
  | big positive | big step to the left (`-`) |

  Then, written and then partly struck through: `w_hat <- w_hat - alpha * slope`, with "slope"
  crossed out and replaced by `grad_eps L(w_hat)`, under the caption "Gradient descent update".

- **p40 "Warning!"** A wiggly curve with nested windows `eps_1 > eps_2 > eps_3 > ...` drawn around
  the same `w_hat`. The chord slope changes as the window shrinks, so
  `grad_eps1 L(w_hat)`, `grad_eps2 L(w_hat)`, `grad_eps3 L(w_hat)`, ... are all different. At
  `eps = 0` you get "THE Gradient", written `grad L(w_hat)`.

- **p41 "Gradient descent".** The loop, with the body written as a squiggle placeholder:

  ```
  guess ...
  do
      ...
      w_hat <- w_hat - alpha * grad L(w_hat)
  until |l| < eps
  ```

  Top right: a multimodal curve with a ball sitting on a slope, i.e. the local-minimum warning,
  drawn but not commented.

- **p42 "In practice"**, `w_hat in R^d`, `w_hat = (w_hat_1, ..., w_hat_d)`. One table row per
  coordinate, columns `l_i | r_i | a_i | b_i | slope_i | grad_i L(w_hat)`, and at the bottom
  `grad L(w_hat) = (grad_1 L(w_hat), ..., grad_d L(w_hat))`. The per-coordinate window construction,
  one row per dimension.

### 1.6 Models, and why a neural network (pages 43 to 46)

- p43 "Models". A scatter with three candidate straight lines and `y = wx + b`. A population curve
  fitted by `y = e^(wx)`, with `e^(wx) = sum_{i in N} (wx)^i / i!` written above it. A stock price
  random walk against time, labelled `y = ???`. Then, under a lightbulb, "Universal model":
  1. Polynomial, `y = w0 + w1 x + w2 x^2 + w3 x^3 + w4 x^4 + ...`
  2. NNs
- p44 "What is NN": `x = (x_1, ..., x_d)`, layers `1, 2, 3, ..., L`, number of neurons
  `d_1, d_2, d_3, ..., 1`, neurons `z_11 ... z_1d1` in layer 1 all feeding `z_21`.
- p45 is a blank grid page.
- p46: the neuron. `a_ij = w_1 z'_1 + w_2 z'_2 + ... + w_d z'_d`, then `z_ij = phi(a_ij)`, with
  "what is this?" pointing at `phi`, answered by a ReLU plot.

### 1.7 Empirical risk minimisation, formally (pages 47 to 54)

These printed slides restate, in Vapnik's language, exactly what pages 28 to 34 did by hand.

- p47: a phenomenon is governed by an unknown `f*` mapping features `x` to a target `y`, with
  `y = f*(x) + epsilon` and `epsilon ~ N(0, sigma^2)`, `sigma^2` unknown. We have only
  `(x_1,y_1), ..., (x_n,y_n)`. How do we build an estimator `f_hat` of `f*`?
- p48: Vapnik's recipe. 1. Collect observations. 2. Propose a model `H` of all functions of a
  particular form (linear `y_i = f(x_i) = w x_i + b`; polynomial `w_0 + w_1 x_i + w_2 x_i^2 + ...`).
  3. Compute the empirical risk minimiser
  `f_hat = argmin_{f in H} sum_{i<=n} L(y_i, f(x_i))`.
  "Vapnik elaborates in his book why this is the most reasonable approach. As of today, this remains
  the best strategy for estimating dependencies from data!"
- p49 and p50 "Example": one house, area `x_1`, price `y_1`; hypothesise `y = f(x) = wx`;
  `L(y, y_hat) = |y - y_hat|`;
  `f_hat = argmin_{f in H} L(y_1, f(x_1)) = argmin_{w in R} |y_1 - w x_1|`.
  p50 adds: "This can be solved using the Robbins-Monro algorithm!"
- p51 "Robbins-Monro algorithm", printed, in full:

  > Given `x_1` and `y_1`, find `w` such that `y_1 - w x_1 = 0`. That is, such that `y_1 = w x_1`.
  > 1. Make a guess `w~`.
  > 2. As long `y_1 - w~ x_1` is unacceptably large, repeat the following:
  >    1. If `y_1 < w~ x_1`, then decrease `w~`.
  >    2. If `y_1 > w~ x_1`, then increase `w~`.

  **This printed slide gives the sign rule the name "Robbins-Monro", while the handwritten page 30
  crosses the sign rule out and defines Robbins-Monro as `w_hat <- w_hat + alpha * l`.** See
  section 2.5. This is a real inconsistency inside one deck and an exercise must pick a side.
- p52: `y = wx + b`, still one house, `L(y, y_hat) = |y - y_hat|`,
  `f_hat = argmin |y_1 - w x_1 - b|`. "This can be solved using the Robbins-Monro algorithm! The
  loop alternates between updating `w` and `b`."
- p53: many houses, `f_hat = argmin_{f in H} sum_{i<=n} L(y_i, f(x_i)) = sum_{i<=n} |y_i - w x_i - b|`.
  "This can be solved using the alternating Robbins-Monro algorithm!"
- p54: `x_i = (x_i1, ..., x_id)` is a vector, `y_i = w_1 x_i1 + ... + w_d x_id + b = w^T x + b`,
  `f_hat = argmin sum_{i<=n} |y_i - w^T x - b|`. "This can be solved using the altenating [sic]
  Robbins-Monro algorithm!"

### 1.8 ERM today, and the punchline (pages 55 to 60)

- p55 divider "ERM today".
- p56, the table that is the punchline of the whole weekend:

  | | 1982 | Today |
  |---|---|---|
  | Learning strategy | Empirical risk minimization | Empirical risk minimization |
  | Data | Dozens of low-dimensional observations | Thousands of high-dimensional observations |
  | Loss function | Simple loss functions | Additive combinations of loss functions |
  | Model / hypothesis | Linear models | Deep neural networks |
  | Training algorithm | **Robbins-Monro algorithm** | **Stochastic gradient descent** |

- p57 "Use gradients": "The Robbins-Monro update rule uses only the difference between target and
  estimation. A more efficient update rule uses the gradient of the loss function."
- p58 "Use neural networks instead of linear models": "Neural networks are universal approximators.
  They can approximate arbitrarily well any continuous function on a compact domain!"
- p59 "Use batches instead of the entire dataset": "At each iteration of the update loop, don't
  recompute the loss on the entire data; use only a 'batch'. Integrating all these improvements
  yields stochastic gradient descent, one of the most powerful modern algorithms for estimating
  dependencies on data."
- p60: Kahoot contest, `https://create.kahoot.it/details/46f33a94-f324-419d-8c59-5bd9248d8b4d`
  (this is the author view of the Kahoot, not a play link).

### 1.9 The one-page hand diagram is the whole arc on one sheet

`bmai_w1_robbins_monro_gradient_descent (1).pdf` is a single table. Two header rows:

```
Scientific method:   Observe    |        Hypothesize            |  Validate
ML component:        Train data | Model  |  Loss  |  Algorithm  |  Test Data
```

and three horizontal bands, separated by two flowing blue lines and one red line, each band being
one stage of the story:

| band | Train data | Model | Loss | Algorithm |
|---|---|---|---|---|
| (top, unlabelled) | `(x,y) in R x R` | `y_hat = w_hat x` | `l = y - y_hat` | Fixed-step, `w_hat <- w_hat +/- alpha` |
| **Robbins-Monro** (blue label) | `(x_1,y_1) ... (x_n,y_n)` | `y_hat_i = w_hat^T x_i` | `l = (1/n) sum_{i<=n} (y_i - y_hat_i)` | Robbins-Monro, `w_hat <- w_hat + alpha l` |
| **Modern ML** (red label) | many features, `x_i = (x_i1, ..., x_id)` | Neural networks | zoo of loss functions | Gradient descent, `w_hat <- w_hat - alpha grad l` |

Arrows run down each column, so the diagram reads as "each column evolves independently, one row at
a time". If one asset has to carry the weekend, this is it.

### 1.10 How the deck maps onto the four Friday lectures (my inference, not stated in any source)

| Master-schedule slot | Deck pages |
|---|---|
| 09:00 First-order approximation algorithms | 28 to 34 (plus the Heron act, which is not in the deck at all) |
| 11:00 Gradient descent | 35 to 42 |
| 14:00 Neural networks and universal approximation | 43 to 46, plus 58 |
| 16:00 Vapnik's statistical learning theory | 1 to 27 and 47 to 60 |

The 16:00 slot therefore *recapitulates* formally what the 09:00 slot did by hand. Nothing in the
sources says this; it is the only assignment consistent with both the deck's content and the
timetable's titles.

## 2. The house price worked example, in full

This is the section a coding exercise is built directly on, so every line below is either quoted
from a specific page or flagged as a gap.

### 2.1 The phenomenon and the features (page 28, "House prediction")

A house icon feeds a circled `f` which outputs `$`, `$$`, `$$$`. Under the house, four candidate
features are written and **three are struck out in red**:

```
area   age(struck)   #rooms(struck)   location(struck)
```

So the lecture deliberately collapses to a single feature, `x = area`, and re-expands to `d`
features only at pages 33 and 34, where the first two coordinates are annotated `area` and `#rooms`.

Then the three-step scientific method, instantiated:

```
1) Observe      (house, $) (house, $$) ... (house, $$$)
                 x_1  y_1   x_2  y_2       x_n  y_n

2) Hypothesize   y = w x + b
                     ^     ^        both annotated with a pink "?"
                 orange note pointing at the model: "later replace w/ sth better"

3) Predict & validate
```

The "later replace with something better" note is the promise that pages 43 to 46 keep: the linear
model is later swapped for a neural network. Same `w`, same loss, same loop.

### 2.2 The numbers (pages 29 and 32)

The deck uses exactly one house, twice:

```
x = 234          (area)
y = 198,789      (price, circled in red on page 29)
```

The exact solution of `y = w x` is `w* = 198789 / 234 = 849.5256...`

Page 29 shows the guess/check/correct trace as the lecturer would run it live:

| step | `w` | `y_hat = w x` | verdict |
|---|---|---|---|
| 0 | 900 | 210,600 (circled red) | too high |
| 1 | 350 | 81,900 | too low |
| 2 | 850 | 198,900 (circled) | just above |
| 3 | 849.5 | not written on the slide | |

All three products are arithmetically exact. `849.5 * 234 = 198,783`, which the slide does not write.

Page 32 carries a second, pink annotation which is **not arithmetically consistent**:

```
x = 234
y = 198,789
w_0 = 850  ->  y_hat = 190.000
y - y_hat  =  8789      (double underlined)
```

`198789 - 190000 = 8789` exactly, so the residual is consistent with `y_hat = 190,000`, but
`850 * 234 = 198,900`, not `190,000`. Treat `190.000` as a live-lecture round number. Do not
reproduce it in an exercise without correcting it.

### 2.3 The loop, as a picture (page 29, "First step")

```
Given   (x, y) in R x R
Assume  y = w x        with w circled and annotated "unknown"
```

and then, inside an orange box labelled "Program":

```
        data (x,y)  ->  y_hat <- w_hat * x  ->  [ y - y_hat ]   (labelled "loss", in red)
                            ^                        |
                      guess |                        v
                        w_hat  <-----------------  Update      (in cyan, with a "?" under it)
```

The "?" under Update is the question the next three pages answer.

### 2.4 The fixed-step algorithm (page 30), exactly as written

```
FIXED-STEP ALGORITHM
Given x, y
Guess w_hat  <-  $                     # guess a price per unit area
do
    y_hat = w_hat * x
    l     = y - y_hat                  # signed residual, in red on the slide
    if l < 0 then
        w_hat <- w_hat - alpha         # alpha annotated "you choose"
    else
        w_hat <- w_hat + alpha
until |l| < eps
```

Two things to get right and easy to get wrong:

- The step size is `alpha`, a constant of your choosing. The tolerance is `eps`. They are different
  letters and different objects. Later, in the gradient descent lecture, `eps` is reused for the
  window width. An exercise that calls the fixed step `eps` will collide with pages 38 to 42.
- The branch is on the sign of `l = y - y_hat`. `l < 0` means the prediction was too high, so `w`
  goes down.

**On the slide, the entire `if / else` block is crossed out with a large X**, and an arrow from the
right-hand margin replaces it with the Robbins-Monro update. The fixed-step algorithm exists on this
slide only to be killed.

### 2.5 The Robbins-Monro update (page 30, boxed on the right)

```
w_hat  <-  w_hat + alpha * l
```

Written on its own, in a box, under the heading "Robbins-Monro update", with an arrow pointing into
the crossed-out branch. So the full algorithm is:

```
ROBBINS-MONRO, ONE HOUSE, ONE PARAMETER
Given x, y
Guess w_hat
do
    y_hat = w_hat * x
    l     = y - y_hat
    w_hat <- w_hat + alpha * l
until |l| < eps
```

What changed: the fixed-step rule moves by a constant amount and only reads the *sign* of the miss.
The Robbins-Monro rule moves by an amount *proportional to the miss*, so the correction shrinks
automatically as the estimate improves, and the loop can settle instead of oscillating around the
answer by +/- alpha forever.

Three cautions for whoever builds the exercise:

1. **The deck does not write a shrinking step size.** `alpha` carries no index anywhere in the BMAI
   deck. The step shrinks only because `l` shrinks. The classical Robbins-Monro conditions
   (`sum alpha_n` unbounded, `sum alpha_n^2` finite, `alpha_n = 1/n` satisfies both) appear in the
   **AINIT** deck, not here. If the exercise wants the shrinking-step story, it has to be imported
   from AINIT and it should be labelled as such.
2. For the one-house one-parameter case, `w_hat <- w_hat + alpha l` with `l = y - w_hat x` is a
   linear recursion whose error multiplies by `(1 - alpha x)` each step. With `x = 234` it diverges
   for any `alpha > 2/234 = 0.00855`. An exercise using the deck's own numbers must either scale the
   features or pick a very small `alpha`, and the deck says nothing about this.
3. Printed page 51 calls the *sign rule* "Robbins-Monro". Handwritten page 30 crosses the sign rule
   out and calls `w + alpha l` "Robbins-Monro". Pick one, say which, and be consistent.

### 2.6 Multi-dimensional (alternating) Robbins-Monro, two parameters (page 31)

Heading "Multi-dim RM". Model at the top right, `y = w x + b`, with red arrows labelling `w` as
**area** and `b` as **base**.

```
MULTI-DIM RM (two parameters, one house)
Given (x, y)
Guess w_hat, b_hat
do
    y_hat = w_hat * x + b_hat
    l     = y - y_hat
    update w_hat based on l                # i.e. w_hat <- w_hat + alpha * l

    y_hat = w_hat * x + b_hat              # recomputed, with the NEW w_hat
    l     = y - y_hat                      # recomputed
    update b_hat based on l                # i.e. b_hat <- b_hat + alpha * l
until |l| < eps
```

The recomputation of `y_hat` and `l` between the two updates is written out explicitly on the slide
and is the entire content of the word "alternating". This is a Gauss-Seidel sweep, not a
simultaneous update. Keep it: it is what stage 5 of the gradient descent plan later contrasts
against.

The slide writes "update w_hat based on l" in words, not as a formula. Substituting the page 30
update is the obvious completion and is what I have written above, but note that the slide itself
leaves it in words.

### 2.7 Batch multi-dimensional Robbins-Monro (page 32)

Heading "Batch MD RM algo". The new part, the inner loop over the dataset, is boxed in orange.

```
BATCH MD RM
Given (x_1,y_1) ... (x_n,y_n)
Guess w_hat, b_hat
do
    for j <= n:                            # boxed in orange on the slide
        y_hat_j = w_hat * x_j + b_hat
        l_j     = y_j - y_hat_j
    l = (1/n) * sum_{j<=n} l_j             # the MEAN SIGNED residual
    update ...                             # written literally as "update ..."
until |l| < eps
```

**A substantive problem with the algorithm as literally written** (my analysis, the deck does not
say this): `l` is the mean *signed* residual. Its zero set is one equation, and for the model
`w x + b` that equation pins down `b` only. Any `w` whatsoever has some `b` making the mean residual
zero, so `|l| < eps` can be met by a line with the wrong slope. As written, the loop does not
identify `w`. The gradient of the mean squared error with respect to `w_j` is proportional to
`mean(l_i * x_ij)`, not to `mean(l_i)`; that per-coordinate weighting is what makes the update
identify the slope, and **the deck never writes it**. Whoever builds `hs26-bmai-w1-opt-rm-house`
must decide consciously: reproduce the deck literally and let participants discover the failure (a
good exercise), or silently fix it (and diverge from the lecture).

### 2.8 The multivariate model (page 33)

Heading "Multi-variate model". Right-hand side, in green and pink:

```
x_i in R^d,  x_i = (x_i1, x_i2, ..., x_id)
              ^        ^
             area   #rooms
y_hat_i = w_1 x_i1 + w_2 x_i2 + ... + w_d x_id + b
        = w^T x_i + b
w = (w_1, w_2, ..., w_d)
```

Left-hand side, the loop skeleton in words only:

```
Given (x_1,y_1) ... (x_n,y_n)
Guess w_hat, b_hat
do
    compute predictions
    compute losses
    update some w_j
until |l| < eps
```

"update **some** `w_j`" is the tell: one coordinate per pass.

### 2.9 The full Robbins-Monro algorithm (page 34), exactly as written

Heading "RM algorithm". Top right: `w_hat = (w_hat_1, w_hat_2, w_hat_3, ..., w_hat_d)` and
`Model: y_hat = w_hat^T x + b_hat`. Under the data, `(x_11, x_12, x_13, ..., x_1d)` with `d`
circled.

```
RM ALGORITHM (full, d features, n houses)
Given (x_1,y_1) (x_2,y_2) ... (x_n,y_n),   x_i = (x_i1, ..., x_id)
Model  y_hat = w_hat^T x + b_hat
Guess  w_hat, b_hat
do
    for j <= d:                            # outer loop over COORDINATES
        for i <= n:                        # inner loop over DATA
            y_hat_i = w_hat^T x_i + b_hat
            l_i     = y_i - y_hat_i
        l = (1/n) * sum_{i<=n} l_i         # boxed on the slide: "compute loss l"
        w_hat_j <- w_hat_j + alpha * l     # in red on the slide
until |l| < eps
```

Two observations:

- The outer loop runs `j <= d` over the coordinates of `w` only. **`b_hat` is never updated in this
  loop as written.** The two-parameter version on page 31 does alternate `w` and `b`, so the natural
  completion is to let the outer loop run over `d + 1` slots with `b` as slot 0. The slide does not
  do this.
- The mean-signed-residual issue of section 2.7 applies here unchanged, and more sharply: with
  `w_hat_j <- w_hat_j + alpha * l` and the same `l` for every `j`, all `d` coordinates receive the
  *identical* increment on every pass, so `w_hat` only ever moves along the diagonal direction
  `(1,1,...,1)` from its initial guess. Again: the deck does not say this, it is what the written
  algorithm does.

### 2.10 The punchline: Robbins-Monro is stochastic gradient descent

Three printed slides and one table make the claim, and the claim is a *composition* of three
independent upgrades, not one identity:

```
Robbins-Monro           w  <-  w + alpha * l                 (page 30)
  + use gradients       w  <-  w - alpha * grad L(w)         (page 57, page 39, page 41)
  + use neural networks instead of linear models             (page 58)
  + use batches instead of the entire dataset                (page 59)
  = stochastic gradient descent                              (page 59, page 56)
```

The last row of the page 56 table states it as a two-column identity:
`Training algorithm: 1982 = Robbins-Monro algorithm | Today = Stochastic gradient descent`.

Page 57 says why the swap is an upgrade in one line: "The Robbins-Monro update rule uses only the
difference between target and estimation. A more efficient update rule uses the gradient of the loss
function." Note the sign flip that comes with it: RM adds `alpha * l`, gradient descent subtracts
`alpha * grad L`. `l = y - y_hat` points toward the target; `grad L` points uphill in the loss.

**Absent from the deck:** there is no handwritten or printed SGD pseudocode, no mini-batch loop, and
no slide sampling a batch at random. "Batch" is defined in words on page 59 and nowhere else. If a
weekend-1 exercise is to end on SGD, that pseudocode has to be written from scratch.

## 3. Heron's algorithm as Carlos frames it (Act 1)

**Source: the handwritten lesson plan, page 1, only.** I grepped the full deck text for "Heron",
"sqrt" and "square root" and there are no hits. Heron is not in the SLT deck and not in the AINIT
deck. It exists on one sheet of paper.

### 3.1 What is actually on the page

Heading, with the word "optimization" written over a scribble:

```
First-order optimization

Act 1)  Heron's algorithm
```

A box drawn on a pair of axes, with `2026` written inside it, and under the base edge, with the
theta boxed:

```
[theta] = sqrt(2026)
```

Above the table, to the right of the box: `theta = ?`

The table, with only one row started:

| theta | theta^2 | 2026 - theta^2 | Verdict | Update |
|---|---|---|---|---|
| 45 | ... | ... | too large / too small | (left arrow) / (right arrow) |

`T.ODO: Come up with a scaffold of games & guide them.` (written at the bottom of the page,
underlined)

Then, on the same sheet:

```
Act 2)  Robbins-Monro algorithm
        theta = 1 + 1/theta
        "The genie game"
```

| theta | 1 + 1/theta | verdict | update |
|---|---|---|---|

### 3.2 Corrections to the circulating transcription

- The page says "a box of area 2026 whose side is `theta = sqrt(2026)`". **The word "rectangle" does
  not appear anywhere on the page**, and the shape as drawn reads as a square. The circulating
  transcription's "a rectangle of area 2026" is an interpretation, not a quotation.
- The verdict cell contains *both* options, "too large" and "too small", stacked, and the update
  cell contains *both* arrows. The table is a blank template with the two possible verdicts and the
  two possible moves written in as a legend. It is not a filled trace. Only `theta = 45` is filled
  in, and the `theta^2` and `2026 - theta^2` cells are literally "...".
- `45^2 = 2025`, so `2026 - 45^2 = 1` and `sqrt(2026) = 45.0111...`. The start at 45 is chosen so
  that the very first residual is exactly 1 and the very first verdict is unambiguous ("too small").
  Nothing on the page says this, but it is clearly why 45 was picked, and any exercise should
  preserve it.

### 3.3 Does the deck make the geometric point? No. It is left implicit.

Heron's actual update is the arithmetic mean:

```
theta  <-  (theta + 2026/theta) / 2
```

which is exactly "the rectangle `theta` by `2026/theta` has area 2026; average its two sides and it
gets closer to being a square".

**None of that is on the page.** The quantity `2026/theta` does not appear. The second side of the
rectangle is not drawn. The averaging update is not written. The Update column shows only a left
arrow and a right arrow, i.e. a *direction*, not a formula. So as Carlos has framed it, Act 1 is a
guess/check/correct loop with a signed residual and a direction, structurally identical to the
fixed-step algorithm of deck page 30, and the mean update is an open design decision for the
exercise. That is worth stating plainly to the TAs: **the geometric "rectangle becomes a square"
reading is available in the drawing but the notes do not make it, and adding it would be an
addition, not a reconstruction.**

If the exercise does add it, the honest framing is that Heron's mean update is the *quadratically
convergent* special case (it is Newton's method on `theta^2 - 2026`), whereas the deck's fixed-step
and Robbins-Monro updates are first-order. That is exactly why the section is titled "First-order
optimization" and why the mean update might have been left out on purpose.

### 3.4 Why Heron and the genie are Act 1 and Act 2 of one idea

Both are scalar fixed-point problems solved by the same three moves, and the two tables have the
same shape:

| | Act 1, Heron | Act 2, the genie |
|---|---|---|
| the demand | `theta^2 = 2026` | `theta = 1 + 1/theta` |
| what you compute from a guess | `theta^2` | `1 + 1/theta` |
| the signed miss | `2026 - theta^2` | `theta - (1 + 1/theta)` |
| the correct answer | `sqrt(2026) = 45.0111...` | the golden ratio, `1.618... = phi` |
| what carries forward | a *direction* to move | a *target* to move onto |

Act 1 establishes the loop and the verdict. Act 2 supplies the update rule, and it is the update
rule that carries into the house price lecture: "next guess = the target", then "take only a
fraction of the way", then `w <- w + alpha * l`. That is the whole reason the two acts sit on one
page.

### 3.5 The genie game already exists, in the AINIT deck

Handwritten lesson plan page 2 is one sentence: "They must derive the Robbins-Monro algo. See AINIT
slides for details." That page contains nothing else. The AINIT slides it points to are deck pages
24 to 27 of 43:

- "Learning a number in the dark: Robbins-Monro". Lost in the desert, you rub a lamp. The genie will
  set you free, on one condition: solve `Q = 1 + 1/Q`. No computer, no formula, only arithmetic. How
  do you even begin? Guess a number, then let the equation correct your guess. Art credit on the
  slide: Maxfield Parrish, *The Arabian Nights* (1909).
- "Guess, check, correct", built row by row:

  | `Q` (guess) | target = `1 + 1/Q` | loss = `Q - target` |
  |---|---|---|
  | 1 | 2 | -1 |
  | 2 | 3/2 | +1/2 |
  | 3/2 | 5/3 | -1/6 |
  | 5/3 | 8/5 | +1/15 |
  | 8/5 | 13/8 | -1/40 |
  | 13/8 | 21/13 | +1/104 |

  with the annotation "next guess = the target" and the closing line, "the loss shrinks toward 0, so
  `Q -> 1.618... = phi`. guess equals target: solved."
- "The same idea, written as an algorithm":

  ```
  Q := 1                        any first guess
  repeat:
      target := 1 + 1/Q         what the equation demands
      loss   := Q - target      how far off, with sign
      Q      := Q - loss        step onto the target
  until loss is (almost) 0
  ```

  then, in the margin: "a full step lands on the target. Noisy or unsure? take only a fraction:
  `Q := Q - alpha * loss`", and then "make the target a noisy sample and let the step `alpha`
  shrink: that is Robbins-Monro".
- "The Robbins-Monro iteration": find `x*` that equals the average of noisy samples, one at a time.
  `x <- x + alpha_n (sample - x)`, with `alpha_n` labelled "step n" and `(sample - x)` labelled "the
  miss". Conditions: `alpha_1 + alpha_2 + ... unbounded` ("can travel from any start"),
  `alpha_1^2 + alpha_2^2 + ... finite` ("the noise eventually cancels"), and `alpha_n = 1/n`
  satisfies both demands.

**Sign convention clash to resolve.** AINIT writes `loss = guess - target` and updates with a minus:
`Q := Q - alpha * loss`. BMAI writes `l = target - prediction` (`l = y - y_hat`) and updates with a
plus: `w <- w + alpha * l`. Both are "move toward the target", but a participant doing
`hs26-bmai-w1-opt-genie-rm` and then `hs26-bmai-w1-opt-rm-house` in the same morning will hit both
in the space of two hours. Whoever writes the pair should either normalise the convention or make
the flip explicit and deliberate.

Also note Carlos's own genie table on the handwritten sheet is `theta | 1 + 1/theta | verdict |
update`, which drops AINIT's numeric `loss` column and replaces it with a categorical `verdict`, to
match the Heron table of Act 1. The two table schemas need reconciling.

## 4. The five gradient descent stages, expanded

Transcribed from the two handwritten pages. Corrections to the circulating transcription are marked.

### Stage 1

> Compute `grad_eps L(w_hat)` for `w_hat in R` [the phrase `w_hat in R` is underlined], several
> examples and gain intuition on `grad_eps L(w_hat)`.
> See BMAI slides for details.
> Todo: Have participants implement an algo for computing `grad_eps L(w_hat)`.

The "See BMAI slides for details" line is missing from the circulating transcription. It points at
deck pages 37 and 38.

**What it demands of a participant.** Given a loss function they can *evaluate but not
differentiate*, and given a point `w_hat` and a window width `eps`, produce a number:

```
def grad_eps(L, w_hat, eps):
    l = w_hat - eps/2
    r = w_hat + eps/2
    a = L(l)
    b = L(r)
    return (b - a) / eps
```

Three probes, one subtraction, one division. The point of "several examples" is that the participant
should see, before any calculus, that the *sign* tells you which way to go and the *magnitude* tells
you how far, which is exactly the page 39 table. The deck hands them `L(w) = w^2 - 6w + 10` and
`L(w) = w^2 - 4w + 7` to work with (and the second one has a wrong table entry, see section 1.5).

### Stage 2

> ~~Approximate~~ Understand `grad L(w_hat)` as `lim_{eps -> 0} grad_eps L(w_hat)`.
> See BMAI slides for details.

The word "Approximate" is written and struck through, replaced by "Understand". That edit is the
whole pedagogical decision of the stage: the derivative is not introduced as an approximation to be
computed, it is introduced as the thing the window computation converges to.

**What it demands.** Run stage 1's function at `eps_1 > eps_2 > eps_3 > ...` on the same `w_hat` and
watch the number stabilise. On a wiggly function (deck page 40, headed "Warning!") the number does
not merely stabilise, it can change *sign* as the window shrinks, because a wide window straddles
features of the curve that a narrow one resolves. That is what the "Warning!" is warning about, and
it is the strongest single argument in the lecture for why you eventually want the true derivative
and not a window.

### Stage 3

> Stage 3:
> Todo: Have participants implement gradient descent.

**The statement line under "Stage 3:" is blank in the notes.** Only the Todo is written. The
circulating transcription is right about the content but the blank line is worth knowing: Carlos
left himself room and did not fill it.

**What it demands.** The loop of deck page 41, with the update of deck page 39:

```
GRADIENT DESCENT, one parameter
Guess w_hat
do
    g = grad_eps L(w_hat)          # or grad L(w_hat) if you have it in closed form
    w_hat <- w_hat - alpha * g
until |g| < tol
```

Note that page 41 writes the stopping test as `|l| < eps`, reusing `l` and `eps` from the
Robbins-Monro pages even though on this page `eps` is already the window width. This collision is in
the source and an exercise has to rename something.

### Stage 4

> Have participants understand and implement an algo that computes `grad_eps L(w)` when `w in R^d`.

**What it demands.** Deck page 42 supplies the answer as a table with one row per coordinate:

```
def grad_eps_vec(L, w_hat, eps):          # w_hat is a vector of length d
    g = [0] * d
    for j in 1..d:
        l_j = w_hat with coordinate j replaced by w_hat[j] - eps/2
        r_j = w_hat with coordinate j replaced by w_hat[j] + eps/2
        a_j = L(l_j)
        b_j = L(r_j)
        g[j] = (b_j - a_j) / eps
    return g                              # = (grad_1 L(w_hat), ..., grad_d L(w_hat))
```

`2d` evaluations of `L`. Every other coordinate is held fixed while one is probed. The deck's table
columns are literally `l_j | r_j | a_j | b_j | slope_j | grad_j L(w_hat)`, so a participant who
fills in that table has implemented the function.

### Stage 5, the Bernstein conditions and the grasshoppers

> ~~[struck-out word]~~ Let participants understand that GD fulfill the Bernstein **conditions**
> ["conditions" is underlined].
> Each grasshopper only needs to work on its own dimension.
> For example, if `w = (w_1, w_2) in R^2` then
>
> ```
> w <- w - alpha grad L(w)      {  w_1 <- w_1 - alpha * dL/dw_1 (w)
>                               {  w_2 <- w_2 - alpha * dL/dw_2 (w)
> ```

The brace is drawn on the slide: the single vector update on the left, the two scalar updates on the
right, joined by one large curly brace.

**"Bernstein conditions" appears nowhere in either deck.** I grepped all four slide-text extracts:
zero hits. It is a term from the lesson plan alone. In the standard sense (Bernstein 1966), two
statements may be executed in parallel when neither writes what the other reads and they do not
write the same location. Applied here: each coordinate update *reads* the whole of `w` and *writes*
only `w_j`, so if every partial derivative is evaluated at the same old `w`, the `d` updates are
mutually independent and can run simultaneously. One grasshopper per dimension, each looking only
along its own axis, all jumping at once.

**The caveat an exercise must respect (my reading, not stated in the notes).** The independence holds
only for the *simultaneous* update, where every `dL/dw_j` is evaluated at the same pre-update `w`.
The deck's own Robbins-Monro algorithms are the opposite: pages 31 and 34 explicitly recompute the
prediction and the loss *between* coordinate updates, which creates exactly the read-after-write
dependence Bernstein's conditions forbid. So stage 5 is precisely the contrast between the
alternating sweep of the 09:00 lecture and the simultaneous update of the 11:00 lecture. That
contrast is, in my view, the real payload of the stage, and it is what makes "each grasshopper works
on its own dimension" a claim rather than a metaphor.

**The grasshopper reference is to a built asset.** `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper`
is a finished, browser-only, five-level game whose README states its purpose in the same terms:
"Go the way the slope points. Go further when it is steeper", for the update
`theta <- theta + alpha * grad J(theta)`. Its five levels are one hill (sign of the slope), the long
shelf (near-zero slope), two hills (local maximum), the narrow summit (overshoot and oscillation),
rough ground (noisy measured slope). It is gradient **ascent**, so every sign flips when it is
ported to a loss.

## 5. Mapping table: lecture moment to exercise slug to asset forked

| # | Lecture moment | Source | Slug | Asset it forks | Notes |
|---|---|---|---|---|---|
| 1 | Fri 09:00, Act 1: guess, check, correct on `theta^2 = 2026` | handwritten notes p1 only | `hs26-bmai-w1-opt-heron` | **Nothing exists.** Closest structural precedent is the AINIT "Guess, check, correct" table slide | Deck has no Heron slide. TAs Jinlei, Daniele, Ivan |
| 2 | Fri 09:00, Act 2: the genie game and the derivation of the RM update | handwritten notes p1 and p2; AINIT deck pages 24 to 27 | `hs26-bmai-w1-opt-genie-rm` | `.../scratch/ainit_rl-slides.pdf`, the four slides quoted in section 3.5. Art: Maxfield Parrish, *The Arabian Nights* (1909) | Notes p2 says only "They must derive the Robbins-Monro algo. See AINIT slides for details." Sign convention clash, section 3.5. TAs Jinlei, Suei-Wen |
| 3 | Fri 09:00, the house price example, fixed step to RM to alternating RM to batch | deck pp. 28 to 34, and printed pp. 47 to 54 | `hs26-bmai-w1-opt-rm-house` | **No code asset exists.** The deck's own numbers (`x = 234`, `y = 198,789`) and the six pseudocode blocks in section 2 | Schedule brief: "Fit a model `y = wx + b` on a fictitious toy dataset of house measurements". Toy data must be generated, declared synthetic, seeded, and shipped with its generator. Read section 2.7 and 2.9 before writing it. TAs Ghali, Suei-Wen |
| 4 | Fri 11:00, sign and magnitude of the slope drive the step | deck pp. 37, 39, 41 | `hs26-bmai-w1-gd-grasshopper` | `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper` (five levels, multi-file, vendored d3 and KaTeX, no build step) | Flip ascent to descent. Level 3 is the deck's p41 multimodal warning; level 4 is overshoot; level 5 is the noisy gradient. TAs Christina, Suei-Wen, Ivan |
| 5 | Fri 11:00, the window, the limit, and the per-coordinate table | deck pp. 38, 40, 42 | `hs26-bmai-w1-gd-grasshopper` (second brief) | `.../scratch/Minimum Lander Exploration.html` | The lander's Mission 3 and 4 table headers are **literally** the deck's page 38: `eps`, `a = f(l)`, `b = f(r)`, `b - a`, `(b - a)/eps`. Mission 5 is `Step, w, f'(w), delta w`. Mission 6 is `Step, w1, w2, f(w1,w2)`, which is stage 4 and stage 5. Mission 7 is p41's local vs global. **Conflict: it is a single 74 KB file and course-viz mandates the multi-file layout.** TAs Sanziana, Suei-Wen |
| 6 | Fri 14:00, models and universal approximation | deck pp. 43, 44, 46, and printed p58 | `hs26-bmai-w1-nn-universal-approx` | `https://sml-fs26.github.io/neuralnetworks/` (named in the schedule) | The deck gives the neuron (`a_ij = sum w_k z'_k`, `z_ij = phi(a_ij)`, ReLU) and the "Universal model" list (polynomial, NNs), and nothing more. TAs Joel, Suei-Wen, Mattia |
| 7 | Fri 16:00, ERM formally, and the 1982 vs today table | deck pp. 1 to 27 and 47 to 60 | no CX slot | the deck itself; the assessment is the Kahoot on p60 | This slot recapitulates slot 1 in Vapnik's language. No exercise attached in the master schedule. |
| 8 | Sat 09:00, training neural networks with PyTorch | not in this deck | `hs26-bmai-w1-nn-pytorch` | `github.com/eth-bmai-fs26/coding-exercises`, branch `week1`: `cx_minimal_nn/notebooks/iris_nn.ipynb`, and `cx3-intro-to-nns` (Mattia's) | Both URLs are in the master schedule. TAs Christina, Daniele, Mattia |
| 9 | Sat 10:30, validation and overfitting | **not in this deck at all** | `hs26-bmai-w1-validation` | `https://sml-fs26.github.io/un-regression-validation/` | Schedule note: "I'll show an improved version of this in the lecture" and "Would be great if the coding exercises ask participants to implement sth in this direction". TAs Sanziana, Ivan, Ghali |
| 10 | Sat 12:00, project intro: LLM routing | deck pp. 20 to 24 are the only related content | `hs26-bmai-w1-project` | nothing named in the schedule | TAs Christina, Suei-Wen, Elisej, Joel |

## 6. Corrections to the circulating transcription

1. **Features.** The house price slide lists `area, age, #rooms, location` and strikes out all but
   `area` in red. The example runs on one feature until page 33.
2. **Fixed step letters.** The circulating text says "if the prediction is too low `w += eps`, else
   `w -= eps`". The deck branches on the sign of `l = y - y_hat` and steps by `alpha`; `eps` is the
   stopping tolerance in `|l| < eps`. Getting this backwards collides with the window `eps` of
   pages 38 to 42.
3. **"Then Robbins-Monro (the step shrinks) so it converges."** The deck never writes a shrinking
   step size. `alpha` is constant and carries no index. What shrinks is `l`, hence the increment
   `alpha * l`. The classical shrinking-step conditions are in the AINIT deck, not this one.
4. **Heron.** "A rectangle of area 2026" is an interpretation. The page says a box of area 2026 with
   side `theta = sqrt(2026)`, draws it as a square, and never uses the word rectangle.
5. **The Heron table** is a blank template, not a filled trace. The verdict cell holds both verdicts
   and the update cell holds both arrows, as a legend. Only `theta = 45` is filled in.
6. **Stage 2** was first written "Approximate" and then struck through and rewritten "Understand".
7. **Stage 3** has no statement line at all, only the Todo.
8. **Stages 1 and 2** each carry a "See BMAI slides for details" pointer, which the circulating
   transcription omits.
9. **Stage 5** begins with a struck-out word before "Let", writes "GD fulfill" (sic), and underlines
   "conditions".
10. **The punchline** "Robbins-Monro algorithm | Stochastic gradient descent" is a printed slide
    (p56), the last row of the 1982 vs Today table. It is not a handwritten slide.

## 7. Gaps: what is genuinely absent

- **Heron's algorithm is absent from both decks.** One handwritten sheet is the entire source.
- **The genie game is absent from the BMAI deck.** It exists only in AINIT.
- **The Robbins-Monro step-size conditions are absent from the BMAI deck.**
- **Heron's averaging update `theta <- (theta + 2026/theta)/2` is absent**, as is the second side of
  the rectangle and any "rectangle becomes a square" statement.
- **There is no SGD pseudocode anywhere**, handwritten or printed. No mini-batch loop, no random
  sampling of a batch. "Batch" is defined in one English sentence on p59.
- **`b_hat` is never updated in the page 34 algorithm.**
- **The batch loss is the mean signed residual** on pages 32 and 34, which does not identify `w`
  (section 2.7 and 2.9).
- **There is no validation, overfitting or regularisation content** in this deck.
- **There is no proof, picture or intuition for universal approximation**, only the claim on p58 and
  the two-item "Universal model" list on p43.
- **There is no cold open.** Nothing in this deck follows the FDD cold-open grammar: no original
  language plus gloss, no framed public domain plate, no provenance table, no mapping frame. If
  weekend 1 is to get a philosophical opening, it must be written from scratch against
  `/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md`.
- **No dataset and no code ship with the deck.** The only numbers in the entire house price story
  are `x = 234` and `y = 198,789`, plus the four guesses `900, 350, 850, 849.5`.
- **Arithmetic to fix before reuse:** the `L(3) = 9` cell on p37 (should be 4), and the
  `w_0 = 850 -> y_hat = 190.000` annotation on p32 (`850 * 234 = 198,900`).
- **One naming inconsistency to resolve:** printed p51 calls the sign rule "Robbins-Monro";
  handwritten p30 crosses the sign rule out and gives the name to `w <- w + alpha * l`.
- **Slide 17 and 18** say Alzheimer in the title and Parkinson in the body.
