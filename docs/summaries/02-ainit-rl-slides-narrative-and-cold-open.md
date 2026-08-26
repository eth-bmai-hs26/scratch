# AINIT reinforcement-learning deck: narrative architecture and the Faust cold open

Forensic read of the AINIT "AI in Industry" RL lecture deck, for the BMAI HS26 weekend-1 build.
Everything below was read out of the LaTeX source or verified against the compiled PDF. Where a
thing is absent, this file says it is absent.

## 0. Provenance, and one version discrepancy you must know about

Ground truth read for this pass:

| Path | What it is |
|---|---|
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.tex` | 1212 lines, the deck. THE authority for wording, overlay pacing, credits. |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/beamer-preamble.tex` | the shared light Metropolis preamble, where the palette and `\takeaway` live |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/roadmap.tex` | the "you are here" arcade map, all six variants |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/CLAUDE.md` | the deck's own house rules and the image credits |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/slides/rl-slides.pdf` | 234 pages, 51 numbered frames, built 2026-06-20 |
| `/Users/carloscotrini/Documents/git_ainit/rl-arcade/lecture_notes/reinforcement_learning.tex` | the manager-facing notes the deck is distilled from |

**Discrepancy: the two PDFs in the scratch repo are an OLDER build.**
`scratch/ainit_rl-slides.pdf` is 191 pages / 43 numbered frames; the repo's current
`slides/rl-slides.pdf` is 234 pages / 51 numbered frames. The difference is the REINFORCE
policy-gradient coda (six frames), added in commit `6a5a0a2` on 2026-06-20. The text extract at
`scratch/docs/slide-text-extracts/ainit_rl-slides.txt` contains zero occurrences of "REINFORCE",
which confirms it. The Faust and genie material is identical in both, so nothing in this document
depends on the discrepancy, but do not size the deck off the scratch extract.

Build history (`git log`, `git_ainit/rl-arcade`): the whole deck is 2026-06-18 to 2026-06-20.
The genie story arrived in its own commit, `6201708 Add the genie story to the Robbins-Monro
section`, on 2026-06-20. This matters for the audit in section 6: every one of Carlos's later
taste rules (dry titles 2026-06-25, no punchline and no red/green 2026-08-11, capital letters
2026-08-12) POSTDATES this deck.

---

## 1. The Faust cold open, in full

Three `[plain]` frames, `rl-slides.tex` lines 58 to 123, immediately after the title page and
immediately before the `\roadmap` overview. No overlays: each frame is exactly one PDF page
(pages 2, 3 and 4 of the compiled deck). The whole cold open costs three clicks.

### 1.1 Frame 1 (lines 58 to 77): Rembrandt, the Greek, and the wavering

Two columns, `0.36` / `0.60`, vertically centred, wrapped in `\vfill ... \vfill`.

Left column, centred: `\includegraphics[height=6.2cm]{img/epigraph/rembrandt-faust}` then, on the
next line at `[3pt]`, the credit:

```latex
{\scriptsize\color{muted}Rembrandt, \emph{Faust} (etching, c.\,1652)}
```

Right column, centred, `\normalsize`, verbatim:

> Faust, alone in his study, is translating the opening of the Gospel of John, from the Greek:
>
> Ἐν ἀρχῇ ἦν ὁ λόγος
>
> "In the beginning was the *logos*."
>
> One Greek word, *logos*, with no single match: it can mean **Word**, and also **Thought**,
> Reason, Power, the **Deed**.
>
> So he writes a rendering, strikes it out, and tries again:

Typography, exactly: the Greek is `{\Large ...}`; the English gloss sits `[3pt]` under it in
`{\color{muted}...}` with `\emph{logos}`; `[14pt]` of air, then the candidate line; `[10pt]`, then
the hinge sentence. The bold above is `\alert{}`, which the preamble maps to `accent`, deep sky
blue `#0369A1`.

**The alert pattern on this frame is the whole device, and it is set two frames early.** Five
candidate meanings are named. Three are alerted: **Word**, **Thought**, **Deed**. Two are left in
plain body text: *Reason* and *Power*. Reason is then dropped and never mentioned again. Power
survives, unalerted, all the way to frame 3, where it is explicitly refused.

The source comment above the frame states why Rembrandt and not something else:

```
% Rembrandt's etching "Faust" (the scholar in his study, gazing at the disc of
% light) sits beside the text: it is the image historically tied to Goethe's
% Faust, and the light prefigures the poem's "now I see the light!".
```

### 1.2 Frame 2 (lines 80 to 109): Goethe's portrait and the whole passage

Two columns, `0.30` / `0.66`. Left: `\includegraphics[height=5.0cm]{img/epigraph/goethe}`, credit
at `[3pt]`:

```latex
{\scriptsize\color{muted}J.\,K.\ Stieler, \emph{Goethe} (1828)}
```

Right column, centred, `\small`, the fourteen lines verbatim (LaTeX quote marks in the source,
curly quotes in the render):

```
'Tis written: ``In the Beginning was the \alert{Word}.''
Here am I balked: who, now, can help afford?
The Word? Impossible so high to rate it;
And otherwise must I translate it,
If by the Spirit I am truly taught.
Then thus: ``In the Beginning was the \alert{Thought}.''
This first line let me weigh completely,
Lest my impatient pen proceed too fleetly.
Is it the Thought which works, creates, indeed?
``In the Beginning was the Power,'' I read.
Yet, as I write, a warning is suggested,
That I the sense may not have fairly tested.
The Spirit aids me: now I see the light!
``In the Beginning was the \alert{Act},'' I write.
```

Then `[10pt]` and the source line:

```latex
{\footnotesize\color{muted}Goethe, \emph{Faust\,I} (1808), trans.\ Bayard Taylor}
```

**Three of the four words Goethe tries are alerted: Word, Thought, Act. "Power" is the one word in
the passage left in plain body text.** The passage is quoted whole, uncut, with no ellipsis.

Note the seam: frame 1 says "the **Deed**"; frame 2 and 3 say "the **Act**". Taylor renders *die
Tat* as "Act", and the deck follows Taylor from frame 2 on. Frame 1's word is the deck's own gloss
of the Greek, not Taylor's. Nobody in a room will notice, but if you port this, keep the two
consistent or keep the seam deliberately.

### 1.3 Frame 3 (lines 111 to 123): the mapping table, and the muted row

The whole frame is one table. No title, no prose, no takeaway line, nothing else on the page.
Source, complete:

```latex
\begin{frame}[plain]
  \vfill
  \centering
  {\large
  \renewcommand{\arraystretch}{2.0}%
  \begin{tabular}{r@{\quad$\rightarrow$\quad}l}
    \alert{the Word} {\footnotesize\itshape\color{muted}(das Wort)} & \alert{week one: observing, LLMs}\\
    \alert{the Thought} {\footnotesize\itshape\color{muted}(der Sinn)} & \alert{week two: thinking}\\
    the Power {\footnotesize\itshape\color{muted}(die Kraft)} & {\color{muted}the false summit: raw compute}\\
    \alert{the Act} {\footnotesize\itshape\color{muted}(die Tat)} & \alert{week three: acting, today}\\
  \end{tabular}}
  \vfill
\end{frame}
```

Rendered, that is:

| left cell | | right cell |
|---|---|---|
| the Word *(das Wort)* | to | week one: observing, LLMs |
| the Thought *(der Sinn)* | to | week two: thinking |
| the Power *(die Kraft)* | to | the false summit: raw compute |
| the Act *(die Tat)* | to | week three: acting, today |

**How the muted row is actually made, precisely.** There is no `\muted` macro and no strikethrough.
The mechanism is two things at once:

1. **Absence of `\alert`.** The other three rows are `\alert{}` on BOTH sides. The Kraft row is the
   only row with no `\alert` anywhere. Its left cell is therefore ordinary body text at
   `black!87`, not accent blue.
2. **An explicit `{\color{muted}...}` on the right cell only.** `muted` is `black!55`, which the
   preamble calls "the legible floor" and forbids lightening ("NOTE on the muted color: keep it
   DARK enough on the light background. black!55 is the legible floor; anything lighter washes out
   under a projector. Do not raise it above black!55 toward white.").

So the muted row is **darker than the others on the left and greyer than the others on the right**.
It is still fully legible. It is not a joke, it is not crossed out, and it is not omitted. It is
the one row the eye reaches last.

The German glosses are NOT the differentiator: every row's parenthetical German is already
`{\footnotesize\itshape\color{muted}}`. The differentiator is purely the English term and the
course-side mapping.

The arrow column is a table-spec trick, not a drawn arrow:
`r@{\quad$\rightarrow$\quad}l`. `\arraystretch` is 2.0, so the rows breathe.

### 1.4 Mechanics, summarised

- Three frames, three clicks, three PDF pages. Zero overlays, zero `\pause`, zero `\only`.
- All three are `[plain]`: no frametitle, no footer, no progress bar, no page fraction.
- Two plates, both framed only by their own edges (no `\framedimg` in this deck), each with a
  one-line `\scriptsize\color{muted}` credit directly under it.
- The plates are in the LEFT column both times, at decreasing height (6.2cm then 5.0cm), and the
  third frame has no plate at all. The visual weight walks left to right and then evaporates,
  leaving the table alone on a white page.
- `\alert` appears exactly 13 times in the entire 1212-line deck. **Twelve of the 13 are in these
  three frames.** The thirteenth is one question on the frame "The return is random" (line 341).
  The cold open is where the deck spends nearly all of its accent colour.

### 1.5 The rhetorical shape: what each move does, and what breaks it

| Move | Work it does | What breaks it |
|---|---|---|
| Frame 1 names the problem as a TRANSLATION problem, not a philosophy problem | The audience is asked to do something they already know how to do: pick the right English word. No metaphysics is claimed. | Explaining who Faust is, or what the Gospel of John is. The frame carries zero plot summary: "Faust, alone in his study, is translating" is all the setup there is, and it is nine words. |
| Frame 1 lists FIVE candidates but alerts only THREE | The syllabus is silently pre-announced before anyone knows there is a syllabus. When frame 3 lands, it is a payoff, not an assertion. | Alerting all five. Alerting none. Either kills the frame-3 reveal, because the reveal IS the colour continuity. |
| Frame 2 quotes the passage WHOLE | It shows a mind failing three times in public. That is the emotional content: the deck about learning by correction opens with someone learning by correction. | Excerpting. If you cut to the first and last lines you get a maxim; the wavering is the point, and the wavering is the middle. |
| Frame 2 alerts three of Goethe's four tries | It carries the colour forward from frame 1 unchanged, so the eye has already learned the code by frame 3. | Changing which words are lit between frames 1 and 2. |
| Frame 3 has NO prose | The table is unarguable. There is nothing to agree or disagree with, only a correspondence to notice. | One sentence of explanation anywhere on that frame. It converts a noticing into a claim. |
| The muted row | The course names a fourth thing the source text offers, and declines it, in the same breath. It buys enormous credibility for two words ("false summit") at zero argumentative cost, because nothing is being argued. | Deleting the row (then the mapping is merely a coincidence of three, and Goethe's fourth word is an embarrassment on frame 2). Or striking it through, or greying it below `black!55`, or captioning it. The row must be legible and must be readable as a real option, or the refusal is not a refusal. |
| Nothing closes the cold open | Frame 3 ends on the last table row. The next thing on screen is the roadmap. | A closing line. There is none, and there must not be one: see section 6. |

**The single most transferable observation:** the muted row works because it is the ONLY row that
is not alerted, and that convention was established two frames earlier, on words that had not yet
been given any meaning. The device is not "grey text". The device is "the colour code was taught
to you before you knew it was a code".

### 1.6 Two errata against the FDD cold-open menu

`/Users/carloscotrini/Documents/git_fdd/projects/mandatory-weekends-opening/COLD-OPEN-CANDIDATES.md`
describes this deck as a precedent and calls the muted row "the sharpest device in any of the four
decks". Two details in that description do not match the source:

1. The menu renders the table's left column as the German (`das Wort`, `der Sinn`, `die Kraft`,
   `die Tat`). **The deck has the English first**, with the German in `\footnotesize\itshape` muted
   parentheses after it. If you copy from the menu you will invert the frame's language order and
   break house grammar rule 1 (original on top, gloss under).
2. The menu cites the frames as "lines 52 to 123". The actual ranges are 58 to 77, 80 to 109, and
   111 to 123; lines 48 to 50 are the title page.

The menu is right about everything else, including that frame 2 alerts Word, Thought and Act.

---

## 2. The genie game: "Learning a number in the dark: Robbins-Monro", in full

Section 8 of the deck, `\section{Learning a number in the dark: Robbins-Monro}` at line 530,
followed immediately by `\roadmapdarts`. Four frames: the plate, the table, the pseudocode, the
general iteration.

**This framing is deck-only.** The lecture notes at
`lecture_notes/reinforcement_learning.tex` section `\label{sec:rm}` have NO genie, NO lamp and NO
golden ratio: they go straight from "strip the fleet away and isolate the bare problem underneath"
to the darts game and equation (eq:rm). The genie was written for the slides, in one commit, on
2026-06-20. So there is no notes-side text to reconcile with when porting.

### 2.1 The plate frame (lines 536 to 557)

`[plain]`, no overlays, one PDF page. Two columns, `0.40` / `0.56`, `\vfill ... \vfill`.

Left: `\includegraphics[height=6.4cm]{img/epigraph/genie-parrish}`, then at `[3pt]`:

```latex
{\scriptsize\color{muted}Maxfield Parrish, \emph{The Arabian Nights} (1909)}
```

Right column, centred, `\normalsize`, verbatim:

> Lost in the desert, you rub a lamp. The genie will set you free, on one condition: solve
>
> Q = 1 + 1/Q
>
> No computer, no formula, only arithmetic.
> How do you even begin?
>
> Guess a number, then let the equation correct your guess.

Exact typography: the equation is `{\Large $Q = 1 + \dfrac{1}{Q}$}` with `[10pt]` above and below.
"No computer, no formula, only arithmetic." and "How do you even begin?" are one paragraph split by
`\\`, then `[12pt]`. The last line is the ONLY coloured text on the frame:
`{\color{accent}Guess a number, then let the equation correct your guess.}`

The source comment names the plate's job explicitly: "Parrish's plate (a man in the desert, a genie
of black smoke rising from the vessel) carries the analogy, the role the Rembrandt/Goethe/Machado
plates play at the opening."

### 2.2 The table frame: "Guess, check, correct" (lines 559 to 580)

Titled frame (so it carries the frametitle band and the page fraction). Seven overlays. The table
is hand-drawn as TikZ nodes at fixed coordinates inside a
`\useasboundingbox (-0.5,-2.25) rectangle (12.5,2.35);`, so nothing shifts as rows appear.

**Column headers, exact LaTeX** (all `\bfseries`, at x = 2.2, 5.9, 9.6, y = 1.95):

```latex
$Q$ (guess)          target $= 1 + \tfrac1Q$          loss $= Q - \text{target}$
```

A muted rule sits under them: `\draw[draw=muted] (0.7,1.62) -- (11.5,1.62);`

**The six rows, exact, in reveal order.** Each row is one `\uncover<n->`:

| overlay | Q (guess) | target = 1 + 1/Q | loss = Q - target | loss colour |
|---|---|---|---|---|
| 1 | 1 | 2 | -1 | `accent` |
| 2 | 2 | 3/2 | +1/2 | `accent2` |
| 3 | 3/2 | 5/3 | -1/6 | `accent` |
| 4 | 5/3 | 8/5 | +1/15 | `accent2` |
| 5 | 8/5 | 13/8 | -1/40 | `accent` |
| 6 | 13/8 | 21/13 | +1/104 | `accent2` |

Fractions are `\tfrac`, never decimals. The source comment states the reason: "Kept in fractions
(Fibonacci ratios) so no decimals appear until the reveal Q to phi."

**The loss column alternates colour by SIGN, not by good/bad**: negative losses in `accent`
(deep sky blue `#0369A1`), positive in `accent2` (dark amber `#B45309`). This is the one place in
the deck where a signed quantity is colour-coded, and it deliberately does NOT use the green/rose
`good`/`bad` pair. Carry this choice over; it is already colour-blind safe.

**The connecting arrow**, revealed with row 2, from the target cell of row 1 down-left to the guess
cell of row 2:

```latex
\uncover<2->{\draw[->, draw=muted, thick] (5.15,1.22) to[out=200, in=70] (2.45,0.66);
  \node[text=muted, font=\scriptsize, anchor=south east] at (4.4,0.7) {next guess $=$ the target};}
```

**The convergence and golden-ratio reveal**, overlay 7, inside a `\formulaslot{1.0cm}` below the
table so the table does not move when it lands:

```latex
\uncover<7->{\large the loss shrinks toward $0$, so $Q \to 1.618\ldots = \varphi$. \ {\color{muted}guess equals target: solved.}}
```

There is no plot, no error curve and no log axis. Convergence is shown ONLY by the shrinking
fractions in the loss column and by that one sentence.

**Arithmetic, verified.** Every row checks out: 1 - 2 = -1; 2 - 3/2 = +1/2; 3/2 - 5/3 = -1/6;
5/3 - 8/5 = +1/15; 8/5 - 13/8 = -1/40; 13/8 - 21/13 = +1/104. The structure is exact Fibonacci:
guess_k = F(k+1)/F(k), target_k = F(k+2)/F(k+1), and loss_k = (-1)^k / (F(k) F(k+1)) by Cassini's
identity, with F = 1, 1, 2, 3, 5, 8, 13, 21. Denominators 1, 2, 6, 15, 40, 104 are the products
F(k)F(k+1). **If you build the interactive version, this is your ground truth: an exact-rational
implementation reproduces these six rows byte for byte, and a float one will not print `13/8`.**

### 2.3 The pseudocode frame: "The same idea, written as an algorithm" (lines 582 to 601)

Three overlays. A `nodebox, fill=panel` holding an 8.6cm `minipage`, `\small`, `\texttt` on the
left of each line and a muted italic gloss flushed right with `\hfill`:

```
Q := 1                             any first guess
repeat:
  target := 1 + 1/Q                what the equation demands
  loss   := Q - target             how far off, with sign
  Q      := Q - loss               step onto the target
until loss is (almost) 0
```

Overlay 2 adds, to the right, a 3.5cm `\footnotesize` note:

> a full step lands on the target. Noisy or unsure? take only a fraction:

and under it, in an `accentbox` in `\ttfamily\small`:

```
Q := Q - $\alpha\cdot$loss
```

Overlay 3 adds the takeaway line:

> make the target a *noisy* sample and let the step alpha shrink: that is Robbins-Monro

**Sign convention, and why it is consistent.** loss = Q - target, and the update is Q := Q - loss,
so Q := Q - (Q - target) = target, which is exactly what "step onto the target" and "next guess =
the target" say. The damped version Q := Q - alpha loss equals Q + alpha (target - Q), which is
literally the Robbins-Monro form on the next frame. The three frames are one algebraic object seen
three ways. Do not "simplify" the loss column to target - Q when porting; it would flip every sign
in the table and break the `Q := Q - loss` line.

### 2.4 The bridge frame: "The Robbins-Monro iteration" (lines 603 to 627)

Seven overlays, no TikZ at all: six stacked `\formulaslot`s of fixed height, so the whole frame is
rigid while terms land.

Slot 1 (`1.3cm`), muted `\footnotesize`, shown from overlay 1, three lines:

> to value a call we must average noisy weekly evidence, but the average is
> never handed to us; it arrives one week at a time. Robbins and Monro (1951)
> gave the recipe, and the game "darts in the dark" is its picture.

Slot 2 (`0.8cm`), muted, also from overlay 1:

> find the number x* that equals the average of noisy samples, one at a time

Slot 3 (`1.9cm`):

```latex
\only<2>{\Large $x \leftarrow x + \alpha_n \, (\text{sample} - x)$}%
\only<3->{\Large $x \leftarrow x + \underbrace{\alpha_n}_{\text{step } n} \, \underbrace{(\text{sample} - x)}_{\text{the miss}}$}%
```

Slots 4, 5, 6 (`0.7cm` each), one condition per click:

```
<4-> alpha_1 + alpha_2 + alpha_3 + ... unbounded    (can travel from any start)
<5-> alpha_1^2 + alpha_2^2 + alpha_3^2 + ... finite (the noise eventually cancels)
<6-> alpha_n = 1/n satisfies both demands
```

Overlay 7, the takeaway:

> this is exactly the nudge SARSA will use next, cell by cell

**How the bridge works, structurally.** The genie's equation is DETERMINISTIC and the step is a
FULL step. The general iteration changes exactly two things, one at a time, and says so out loud on
the pseudocode frame's takeaway: make the target noisy, and let the step shrink. Nothing else is
altered: `x` is the genie's `Q`, `sample` is the genie's `target`, `(sample - x)` is the genie's
`-loss`. The audience is never asked to accept a new equation, only two amendments to one they
wrote themselves three minutes ago.

### 2.5 What the genie section does NOT contain

Recorded because BMAI's own plan may want them and they are not available to copy:

- No Heron's algorithm, no square roots, anywhere in the deck.
- No "verdict" column. Carlos's handwritten BMAI plan specifies `theta | 1 + 1/theta | verdict |
  update`; the AINIT deck has `Q (guess) | target | loss` with a SIGNED numeric loss and no verdict
  word. The AINIT table has three numeric columns; the BMAI plan has two numeric columns plus two
  word columns.
- No convergence plot, no error-versus-iteration chart, no proof.
- No derivation of the golden ratio (the quadratic Q^2 = Q + 1 is never written down).
- No mention of Fibonacci on the slide. The Fibonacci structure is in a source comment only.
- No "darts in the dark" slide. The phrase appears exactly twice in the deck: once as a roadmap
  card label, once in the muted lead of the iteration frame. The darts game itself is a separate
  browser cartridge (`rl-arcade/darts/index.html`, titled "Blind Bullseye" in the page).

---

## 3. The wider narrative architecture

### 3.1 The "you are here" navigation: a recurring full-page arcade map

Defined entirely in `roadmap.tex` (105 lines). One `\rmscene` frame macro, six entry points, six
appearances in the deck. It is NOT a strip along the top of every slide: it is a full-bleed
`[plain]` frame that recurs, always immediately after a `\section`.

Placement, verified against line numbers:

| line | trigger | where |
|---|---|---|
| 126 | `\roadmap` (every ride lit) | after the Faust mapping table, before section 1 |
| 155 | `\roadmapmdp` | after `\section{Markov decision processes}` |
| 370 | `\roadmapbandit` | after `\section{Exploration and exploitation}` |
| 414 | `\roadmapbellman` | after `\section{The $Q$-function and the Bellman equation}` |
| 531 | `\roadmapdarts` | after `\section{Learning a number in the dark: Robbins-Monro}` |
| 630 | `\roadmapsarsa` | after `\section{SARSA: learning from the logbook}` |

Two of the nine sections get NO map frame: "Policies and trajectories" and "The goal: accumulating
reward". Five cards therefore cover nine sections. The order of the cards on the page is the order
the map frames appear in the deck, so the spotlight marches monotonically.

Layout, exactly: a 16 by 9 TikZ canvas centred with `\noindent\makebox[\textwidth][c]` (the source
comment explains that a bare `\centering` overflows by 56.9pt). `park.png` sits behind everything at
`opacity=0.16`, height 9.2cm. Five cartridge PNGs on a U path:

- `mdp-maze` at (2.4, 6.2), labelled "MDP maze"
- `bandit-arcade` at (5.4, 6.2), labelled "bandit arcade"
- `bellman-house` at (8.4, 6.2), labelled "Bellman's house"
- `darts-dark` at (8.4, 2.5), labelled "darts in the dark"
- `sarsa-maze` at (5.2, 2.5), labelled "SARSA maze"

Labels are `\scriptsize\bfseries, text=black!70`, sitting below their card.

The spotlight itself:

```latex
\ifnum#4=1
  \node[inner sep=0pt, draw=spot, line width=2.8pt, rounded corners=2.5pt]
    at (#2,#3) {\includegraphics[height=3.15cm]{img/roadmap/#1}};%
\else
  \begin{scope}[transparency group, opacity=0.26]
    \node[inner sep=0pt] at (#2,#3) {\includegraphics[height=2.95cm]{img/roadmap/#1}};%
  \end{scope}
\fi
```

`spot` is `#F59E0B`, a bright amber defined only in `roadmap.tex`. The lit card is bigger (3.15cm
vs 2.95cm) AND ringed AND at full opacity; the dim cards are at 26 percent. Three redundant
channels for one state. Arrows between the cards are drawn AFTER the cards, in `accent!75` at 3pt,
so they always sit on top.

Right-hand column, spotlight variants: the words "you are here" in `\large\bfseries` amber at the
top, then exactly TWO bubbles, a question in a solid `accent` bubble with white text (4.4cm wide),
and an answer in a pale `good!18!white` bubble with `black!80` text (4.2cm wide). Both are
`\scriptsize`.

**The five question-and-answer pairs, verbatim:**

| card | question | answer |
|---|---|---|
| MDP maze | What are we deciding, and against what? | one call a week (run, service, replace) in a world that answers at random: a Markov decision process |
| bandit arcade | Which call do we try while still learning? | mostly the best one so far, but explore now and then, or you never learn what you skipped |
| Bellman's house | Which call wins in the long run? | the one with the highest cumulative reward; the Bellman equation pins down its value Q*(s,a) |
| darts in the dark | Why does nudging ever settle down? | it is a running average of noisy evidence; Robbins and Monro proved small shrinking steps find the truth |
| SARSA maze | What if nobody hands us the odds? | read the logbook: after each lived week, nudge one cell toward what it actually paid |

**The overview variant is different in kind, not just in lighting.** `\roadmap` lights all five
cards, replaces "you are here" with the heading "The plan" in `\large\bfseries` accent, and stacks
SIX bubbles: three questions (accent, white text) each answered by the bubble below it (pale green,
dark text):

> How do we pick the best call?
> the one with the largest long-run reward
>
> How do we know that reward?
> the Bellman equation gives Q*(s,a)
>
> And when the odds are hidden?
> learn it from experience: SARSA

Note the asymmetry: the overview asks THREE questions; the sections answer FIVE. The overview's
ladder is the argument; the five cards are the itinerary. They are not the same list and the deck
does not pretend they are.

### 3.2 The question-and-answer slide rhythm

The Q/A shape recurs inside content frames, not only on the map. The pattern is always: pose the
objection in the audience's own voice on an early overlay, in colour; answer it on a later overlay.

- **"The return is random"** (line 324). Overlay 2 is the deck's only non-Faust `\alert`:
  *"which G_1 is the policy's quality, if it changes every run?"* Answered on overlay 4.
- **"Price it from your own book"** (line 850). Overlay 1, in `text=bad`:
  *"wait: you price the leftover van with q, the very book you are still learning"* (with "wait:"
  in `\itshape`). Answered on overlay 3 in `accent2`: *"nobody refuses to price a car because the
  book is not final"*.
- **"The cash-only ledger lies"** then **"Why? A call also leaves you a van"** (lines 780, 799).
  A two-frame contradiction and resolution, with the question carried in the second frame's TITLE.
- **The genie plate**: *"How do you even begin?"* answered on the same frame by the one accent line.
- **"Explore or exploit?"** (line 372): the title itself is the question.

### 3.3 Every abstract idea has a concrete anchor

The deck never introduces a symbol without a physical referent first. The referents are reused, so
the deck coheres around one fleet.

| abstract | concrete anchor |
|---|---|
| MDP (S, A, T, gamma) | four wear levels, three calls, "how the world reacts", "how much the future counts" |
| T is random | the SAME pair (worn, run) giving (shaky, +72) one week and (failing, -208) another |
| policy pi | "the playbook", four icon rows |
| trajectory | "the tape", week cards 1 to 5 |
| return G, discounting | a bar chart of +95, -45, +76.95, +69.255 |
| E[G_1] | scattered dots on a line, with one vertical accent rule at the average |
| explore vs exploit | "always RUN the van, or now and then SERVICE or REPLACE just to learn" |
| Q* | a real 4 by 3 scorecard: 311.0, 229.9, 149.9, 203.4, 226.1, ... |
| the Bellman recursion | the Spooky House 5 by 5 board (a full `[plain]` frame of nothing but the board, to talk over) |
| Robbins-Monro | the genie, then "darts in the dark" |
| the SARSA update rule | "Three bookkeepers, one bad week": the Overwriter (verdict *hysterical*), the Filing cabinet (*right, but stores every card*), the Nudger (*calm, and no cabinet*) |
| the learning rate alpha | "The alpha knob": 0.9 is *whiplash*, 0.05 *barely notices*, 0.15 is *the calm middle* |
| exponential smoothing | "The planner's Monday": forecast 100, the week sells 80, the miss is -20, next Monday 97 |
| bootstrapping | "a dealer's price book, this month, still being revised" |
| SARSA vs Q-learning | "the road you walk, or the best road you can see" |
| a stochastic policy | a playbook of odds: RUN 50 percent, SERVICE 40 percent, REPLACE 10 percent, drawn as bars |
| learning without a model | the Machado epigraph, section 9 |

**Two structural devices worth stealing outright:**

1. **Icons replace the symbols inline, in text AND math mode.** `\van{healthy}` and `\act{run}` are
   `\mbox`ed `\includegraphics` with a `\raisebox` tuned to the x-height. The deck writes
   `(\van{worn}, \act{run})` where a normal deck writes `(s, a)`. 50 `\van` calls and 45 `\act`
   calls across the deck. The state and action words appear spelled out exactly once each, as a
   legend, and are icons thereafter.
2. **`\formulaslot{height}{content}`**, a fixed-height centred `minipage`, so a formula built by an
   `\only` chain cannot move the rest of the frame between clicks. Used 42 times across 19 frames.
   Twenty `\underbrace{...}_{\text{name}}` calls name terms as they land.

### 3.4 The second epigraph: Machado, mid-deck

Not part of the cold open, but the same grammar, and evidence that the house style tolerates a
SECOND plate later in one deck. `\begin{frame}[plain]{No map, only the walking}` at line 633: a
plain frame that nonetheless carries a title. Portrait of Machado at 4.6cm with the caption
`drawing by L.\ Oroz, 1925`, the couplet at `\LARGE`:

> Caminante, no hay camino,
> se hace camino al andar.

then, `[5mm]` under it in muted `\footnotesize`:

> (trans.) Wanderer, there is no road; the road is made by walking.
> Antonio Machado, Proverbios y cantares (1912)

Overlay 2 ties it to the section in `text=accent`:

> nobody prints the odds, so there is no map;
> a good policy is a road that exists only once we walk it.

Note it is TWO overlays, and the tie-in is the second one. Note also the source comment:
"one epigraph, week-2 restraint: the trajectory-coda idea lives as a quiet caption on the
trajectory frame". The deck deliberately declines a second Machado callback.

---

## 4. The register

### 4.1 Measured, not estimated

- **Words per rendered page** (all 234 overlay pages of the current build): median **41**, mean 46,
  25th percentile 25, 75th percentile 62, 90th percentile 80, max 123. The 123-word page is the
  Goethe passage, and it is the only page over 118.
- **Overlays per frame**: 234 pages over 51 numbered frames, ratio **4.6**.
- **Notation density**: 19 of 45 content frames carry a `\formulaslot`, so roughly 40 percent of
  frames show any displayed formula at all, and those show exactly one, built term by term. The
  other 60 percent are a diagram plus captions.
- **Operator shorthand**: zero. `argmax` and `max` appear nowhere in the deck except in a source
  comment that states the ban. The deck writes "read each row, keep the call with the largest
  value" and "a_{i+1}: the call you actually make, never a max".
- **Sentences**: overwhelmingly one clause, or two joined by a colon or a comma. Almost every
  takeaway line is a single clause with a colon in the middle.
- **Capitalisation**: sentence fragments almost always open LOWERCASE. Caps are reserved for
  diagram box labels (RUN, SERVICE, REPLACE, HEALTHY, WORN, SHAKY, FAILING, EXPLOIT, EXPLORE,
  START, EXIT), which is arcade register.
- **Vocabulary**: concrete trade nouns (van, week, call, shop, cash, logbook, card, book, forecast,
  ledger, trade-in, bookkeeper, playbook, tape, knob, dial). Abstract nouns appear only after their
  concrete twin has been introduced.

### 4.2 Five verbatim examples of the voice

1. > short-term cost against long-term payoff, chance at every step

   (`\takeaway`, "One van, one call a week", line 152)

2. > No computer, no formula, only arithmetic.
   > How do you even begin?

   (the genie plate, line 550)

3. > nudge, never overwrite: one bad week must not erase a year

   (`\takeaway`, "Three bookkeepers, one bad week", line 713)

4. > the book is wrong today, and that is fine: every nudge makes it less wrong

   (`\takeaway`, "Price it from your own book", line 873)

5. > nobody prints the odds, so there is no map;
   > a good policy is a road that exists only once we walk it.

   ("No map, only the walking", line 655)

Two more, for calibration of the register's upper and lower ends:

> the worst-paying calls are the best calls, so cash cannot be the whole story
> (line 797)

> you did not memorize SARSA: you wrote it
> (line 895)

---

## 5. What the deck is, in one paragraph

A 51-frame, 234-page light Metropolis deck in Libertinus, built in three days in June 2026,
compiled with `lualatex` (required only because the cold open shows a line of polytonic Greek that
Libertinus renders under no other engine). Nine sections, one running example (a delivery van you
RUN, SERVICE or REPLACE), one recurring full-page navigation map, three epigraph plates, and a
distilled REINFORCE coda bolted on at the end. Every diagram is hand-built TikZ. Every formula is
built term by term inside a fixed-height slot. Every state and action is an icon, not a letter.

---

## 6. Audit against `lecture-slides/SKILL.md`

Checked against `/Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/lecture-slides/SKILL.md`.
The deck was built 2026-06-18 to 2026-06-20; three of the rules below carry dates AFTER that, and
the report says so each time.

### 6.1 The dash rule: PASS, cleanly

```
pdftotext rl-slides.pdf - | grep -cP '\x{2014}'   ->  0
pdftotext rl-slides.pdf - | grep -cP '\x{2013}'   ->  0
```

The prose-dash grep over `rl-slides.tex` returns nothing outside TikZ line segments. Both
`beamer-preamble.tex` and `slides/CLAUDE.md` state the rule in their own comments, including the
"the ONLY allowed pair is a TikZ line segment" carve-out. This is the deck's strongest compliance.

### 6.2 The no-red/green rule: FAIL, systematically, at the palette level

The rule is dated 2026-08-11 in the skill ("red and green balls are a no go", roughly 1 in 12 men
affected) and mandates the Okabe-Ito pair `good = #0072B2` blue, `bad = #D55E00` vermillion.

This deck's preamble defines:

```latex
\definecolor{good}{HTML}{047857}      % dark green (success / positive state)
\definecolor{bad}{HTML}{BE123C}       % dark rose (failure / negative state)
```

and uses that pair heavily: 23 `good fill` and 6 `bad fill`, 13 `draw=good` and 7 `draw=bad`,
8 `text=good` and 6 `text=bad`, 5 `fill=good` and 3 `fill=bad`, 3 `\textcolor{good}` and 2
`\textcolor{bad}`, 2 `\color{good}` and 1 `\color{bad}`.

**Honest severity assessment.** In almost every case the colour is REDUNDANT with printed text or a
printed sign, so a colour-blind viewer loses emphasis but not information:

- "Playbook in, tape out": `\textcolor{good}{$+95$}` against `\textcolor{bad}{$-50$}`, but the sign
  is printed.
- "The scorecard Q*": `good fill` on the winning cell of each row, but every number is printed and
  overlay 7 additionally RINGS the kept calls.
- "Three bookkeepers": `text=bad` *hysterical* against `text=good` *calm, and no cabinet*, words.
- "The alpha knob": `text=bad` *whiplash* against `text=good` *the calm middle*, words.
- "REINFORCE: do more of what paid": `{\color{good}more}` against `{\color{bad}less}` inside one
  sentence that already says more and less.

The one place the contrast is closest to load-bearing is **"The cash-only ledger lies"**, where a
`bad fill` box and a `good fill` box sit side by side and the contrast IS the argument.

**The fix is two lines.** I checked: the deck hardcodes no hex for good or bad anywhere. The only
`\definecolor{...}{HTML}` calls in deck files are `spooky` (`#C084FC`, the Bellman board) and `spot`
(`#F59E0B`, the roadmap ring). Every good/bad element is styled through the shared colour names,
exactly as the preamble demands. Swapping the two `\definecolor` lines in `beamer-preamble.tex`
recolours the entire deck correctly. **Note the collision the skill warns about**: once `good`
becomes blue it clashes with `accent` (`#0369A1`, also blue), and this deck has several frames where
`accent` and `good` share an overlay (the Q* scorecard, the roadmap answer bubbles at
`good!18!white` next to accent question bubbles). Those need the neutral element moved to `muted`.

### 6.3 The no-closing-punchline rule: FAIL, by design, 30 times

The rule is dated 2026-08-11: *"No closing punchline. A frame ends on its final reveal. No big
centred line in the brand colour, ever."* The preamble defines exactly the forbidden thing:

```latex
% --- minimal-text helper: one big centered takeaway line ---
\newcommand{\takeaway}[1]{\vfill\begin{center}\Large\alert{#1}\end{center}\vfill}
```

`\takeaway` is used **30 times across 45 content frames**, roughly two thirds of them. Combined with
the 13 explicit `\alert` calls, the rendered deck has 43 accent-blue emphasis events, 30 of which
are exactly the centred closing line the rule forbids.

The FDD cold-open menu already flagged this exact macro as the vector
(`COLD-OPEN-CANDIDATES.md`, grammar rule 3: *"SKILL.md line 137 warns about exactly this: the
Weekend 1 preamble defines `\takeaway`, and copying it wholesale drags the punchline back in"*).
This deck is a second, independent instance of the same inheritance.

**Crucially for BMAI: the three Faust frames do NOT use `\takeaway`.** They are `[plain]`, they end
on the last table row, and they are fully compliant with the rule that the rest of the deck breaks.
The cold open can be lifted without importing the defect. The genie plate frame is likewise
takeaway-free; the genie TABLE frame ends on a `\formulaslot` sentence rather than a `\takeaway`, so
it is also clean; the pseudocode frame and the iteration frame both end on a `\takeaway` and would
need that line demoted to body text.

### 6.4 Other skill rules, checked

| rule | verdict | evidence |
|---|---|---|
| 3, minimal text | PASS | median 41 words per rendered page, p90 80. The two epigraph pages are deliberate exceptions. |
| 4, a diagram on essentially every content slide | PASS with a named exception | almost every content frame is one `tikzpicture`. Six frames are formula-only: "The Robbins-Monro iteration", "The dials, and the hill to climb", "The gradient trick", "REINFORCE: one episode, one step uphill", "Baselines", "The running average". Five of the six are in the REINFORCE coda and the appendix. |
| 5, every piece on its own click | PASS | overlay ratio 4.6, inside the skill's own calibration of "roughly 4 to 6 overlay steps per frame". |
| 6, at most one big formula per slide, built term by term | MOSTLY PASS | the `\only` chain plus `\underbrace` pattern is used exactly as prescribed, 20 underbraces. "The gradient trick" and "Baselines" each stack three different formulas in three slots, which is closer to a derivation on one slide than the rule allows. |
| 7, engine matches the fonts | DOCUMENTED DEVIATION | the skill says the light theme is plain `pdflatex`. This deck REQUIRES `lualatex`, solely for the polytonic Greek in the cold open, and both the file header and `slides/CLAUDE.md` say so. It also needs a surgical `\setmathfont{Latin Modern Math}[range={"23DE,"23DF}]` because LibertinusMath's extensible brace glyphs are broken under `luaotfload`. **If a BMAI cold open quotes Greek, budget for the same engine switch and the same brace workaround.** |
| 10, words before operator notation | PASS, enforced | zero `argmax`, zero `max`. `slides/CLAUDE.md` states the rule: "Manager audience: spell ideas out in words, never an argmax or max symbol." |
| Pattern F, no-shift on reveal | PASS via the FALLBACK | `visible on=<n->` is used ZERO times, and `overlay-beamer-styles` is never loaded. Instead the deck uses `\useasboundingbox` as the first line of 34 `tikzpicture`s (the skill's stated fallback) plus 42 fixed-height `\formulaslot`s for formulas. It achieves the goal by the second-choice route. |
| Section dividers carry the name and nothing else (2026-08-11) | PASS on the template, JUDGEMENT CALL on the roadmap | the Metropolis section pages carry only the section name (verified: page 6 is the word "Motivation" alone). But most sections are immediately followed by a roadmap frame carrying a question bubble and an answer bubble, which is the same "running question" register the taste rule kills, one frame later rather than on the divider itself. It is a navigation map rather than a tagline, so it is not the same defect, but a strict reading catches it. Flagging it rather than deciding it. |
| Dry, factual, never poetic titles (2026-06-25, POSTDATES the deck by five days) | MIXED | dry: "The Bellman equation", "The Robbins-Monro iteration", "The alpha knob", "The model: four ingredients". Figurative: "Playbook in, tape out", "Three bookkeepers, one bad week", "The planner's Monday", "The cash-only ledger lies", "Price it from your own book", "Grade the week like a trade-in", "Write the line yourself", "No map, only the walking", "Guess, check, correct". |
| Every bullet, caption and box label starts with a CAPITAL (2026-08-12, postdates) | FAIL, uniformly | the deck is lowercase-first by house style: "short-term cost against long-term payoff", "the goal: find the policy pi that maximizes E[G_1]", "one equation per cell: twelve equations pin down the table", "the loss shrinks toward 0". |
| Never write in ALL CAPS (postdates) | PARTIAL | RUN, SERVICE, REPLACE, HEALTHY, WORN, SHAKY, FAILING, EXPLOIT, EXPLORE, START, EXIT are diagram box labels in caps. The skill's rule targets chrome and column headers, which this deck does not uppercase. The caps here are deliberate arcade register and are redundant with the icons beside them. |
| Rights tracking for plates | GAP | there is no `IMAGE-SOURCES.txt` anywhere in `rl-arcade` (the FDD convention). `slides/CLAUDE.md` documents three plates with licences (`rembrandt-faust.jpg` Met Museum CC0, `goethe.jpg` PD, `machado-oroz.jpg` PD, all from Wikimedia Commons) and says "no attribution is legally required". **`genie-parrish.jpg` is documented nowhere.** It carries an on-slide credit line, "Maxfield Parrish, The Arabian Nights (1909)", and nothing else. The deck correctly makes no rights claim next to the Bayard Taylor translation, satisfying house grammar rule 6, but the Taylor rights status is also recorded nowhere. Both need checking before BMAI reuses either. |

---

## 7. What weekend 1 should copy

**From the cold open, the STRUCTURE, not the text.**

1. **Three frames, three clicks, no overlays, no titles, no takeaway.** The whole philosophical
   opening costs three pages and ends on its last line. Budget exactly that for BMAI.
2. **Teach the colour code before it means anything.** Alert the terms that will map to the course
   on the FIRST frame, while they are still just candidate translations, so the third frame is a
   payoff and not an assertion. This is the single mechanism that makes the muted row land.
3. **Quote the source's wavering whole.** The passage where a mind fails in public is the emotional
   content of a course about iterative correction. BMAI's whole weekend 1 is guess, check, correct.
4. **The mapping table is a whole frame and carries no prose.** `\arraystretch` 2.0, an
   `r@{\quad$\rightarrow$\quad}l` spec, nothing else on the page.
5. **Include one row the course refuses, and mute it by ABSENCE of alert plus one explicit
   `{\color{muted}}` on the right cell.** Not a strikethrough, not a deletion, not a caption.
   The refused option must remain legible and must read as a real option.
6. **One plate per text frame, `\scriptsize\color{muted}` credit on the line directly under it,
   shrinking as the argument advances, then no plate at all on the table frame.**
7. **Zero plot summary.** Nine words of setup ("Faust, alone in his study, is translating") is the
   ceiling.

**From the genie section, for `hs26-bmai-w1-opt-genie-rm` and `hs26-bmai-w1-opt-heron`.**

8. **The four-beat shape: plate, table, pseudocode, generalisation.** Story, then hand arithmetic,
   then the same arithmetic as code, then the two amendments that turn it into the real algorithm.
   Each beat changes exactly one thing.
9. **Exact rationals, no decimals until the reveal.** The Fibonacci table is the interactive
   exercise's correctness oracle: `1, 2, 3/2, 5/3, 8/5, 13/8` with losses
   `-1, +1/2, -1/6, +1/15, -1/40, +1/104`. Implement with exact rationals (Python `fractions.
   Fraction`) so a student's table matches the slide character for character; a float implementation
   will print 1.6 and break the analogy the deck spent a frame building.
10. **Colour the signed residual by SIGN, in accent versus accent2, never in good/bad.** The deck
    already does this and it is already colour-blind safe. Carry it into the interactive exercise's
    palette.
11. **Keep the sign convention `loss = current - target` and the update `x := x - loss`**, so that
    the damped form `x := x - alpha loss` is literally `x + alpha (target - x)` and the bridge to
    Robbins-Monro costs no algebra. Carlos's handwritten Heron table uses the opposite convention
    (`2026 - theta^2`); pick ONE across Heron, genie and gradient descent and hold it, or the
    weekend teaches two sign rules before lunch.
12. **The recurring full-page "you are here" map with one question bubble and one answer bubble.**
    Three redundant channels for the current position (ring, size, opacity). BMAI's weekend 1 has a
    natural five-stop itinerary already: Heron, genie/Robbins-Monro, RM for house prices,
    grasshopper/gradient descent, neural networks and validation.
13. **Icons replacing symbols inline, in text and math mode.** The `\van` / `\act` trick is the
    reason the deck can write `(\van{worn}, \act{run})` and stay readable to managers. BMAI's
    equivalent for weekend 1 is a house glyph and a slope glyph.
14. **`\formulaslot` fixed-height slots and `\useasboundingbox` on every picture.** The layout never
    jumps between clicks. Copy the two macro definitions verbatim.
15. **A second epigraph mid-deck is allowed.** Machado opens section 9 with two overlays, and the
    tie-in sentence is the second one. BMAI can open the Vapnik lecture the same way without it
    reading as a rerun of the cold open.

---

## 8. What weekend 1 must not copy

1. **Do not copy Goethe, and do not copy the Faust text.** Two reasons, both in the record.
   The FDD cold-open menu rules Faust the *runner up* for its own block partly because "it is the
   sibling course's opening, verbatim. Different audience, so nobody in the room will know, but
   Carlos will, and self repetition tends to show." The same objection applies here with more force:
   BMAI weekend 1 is a THIRD sibling. Copy the grammar, pick a different text.
2. **Do not copy the four-way mapping.** The Faust mapping earns its place because the AINIT course
   really does run three weeks that correspond to three of Goethe's four words and really does
   refuse the fourth. BMAI weekend 1 is one weekend on statistical learning theory. A four-way
   mapping onto a one-weekend syllabus is a device in search of content. If BMAI's cold open has a
   list at all, the list must be a real list the BMAI syllabus really has, and the refused row must
   be a thing BMAI really declines.
3. **Do not reuse "the false summit: raw compute"** as the refused row. That specific refusal is the
   AINIT deck's, and the FDD menu already notes that recycling it elsewhere means "promoting the row
   that deck struck out, which is either a beautiful callback or a contradiction". BMAI should refuse
   something BMAI actually refuses.
4. **Do not import `\takeaway`.** It is defined in the shared `beamer-preamble.tex` and it IS the
   forbidden centred brand-colour punchline, used 30 times. If you inherit that preamble, delete the
   macro definition before writing a single frame, per the skill's explicit warning about inherited
   chrome. Note again that the three Faust frames themselves never call it.
5. **Do not import the green/rose `good`/`bad` pair.** Swap `\definecolor{good}{HTML}{047857}` and
   `\definecolor{bad}{HTML}{BE123C}` for the Okabe-Ito `#0072B2` and `#D55E00` BEFORE the first
   build, and then re-check every frame where `good` sits next to `accent`, because both become
   blue.
6. **Do not copy the deck's lowercase-first captions or its ALL-CAPS state labels.** Both postdate
   into violations of Carlos's August taste rules. Title-case the box labels; capitalise the first
   letter of every caption, bullet and takeaway-turned-body-line.
7. **Do not copy the figurative frame titles.** "Playbook in, tape out", "The cash-only ledger lies",
   "Price it from your own book" and "No map, only the walking" all predate the 2026-06-25 dry-titles
   rule. Keep the worked example, name the frames factually.
8. **Do not present the genie as if it came from the notes.** It does not. The AINIT lecture notes'
   Robbins-Monro section has no genie, no lamp and no golden ratio. If BMAI ships lecture notes
   alongside, either write the genie into them or keep it a slides-and-exercise device, but do not
   cite the notes for it.
9. **Do not reuse `img/epigraph/genie-parrish.jpg` without checking its rights first.** It is the one
   plate in the repo with no licence record anywhere, and BMAI's brief is to port the genie game to
   an interactive exercise that will be published on GitHub Pages, which is a wider distribution
   than a lecture-hall PDF.
10. **Do not copy the deck's `\only`-plus-`\useasboundingbox` reveal idiom into a NEW build.** It
    works, but it is the skill's stated fallback; a new deck should use
    `visible on=<n->` with `overlay-beamer-styles`. Keep `\formulaslot`, which is orthogonal and
    genuinely good.
11. **Do not open with a closing line.** Neither the Faust cold open nor the Kant precedent ends on
    a punchline any more. Whatever BMAI's opening is, its last frame ends on its last ordinary
    reveal.

---

## 9. Gaps and open questions

- **Rights on `genie-parrish.jpg` are unrecorded.** The plate carries an on-slide credit only. No
  `IMAGE-SOURCES.txt` exists in `rl-arcade`, and `slides/CLAUDE.md` lists licences for the other
  three epigraph plates but not this one. Verify before any BMAI reuse, especially a web-published
  exercise.
- **Rights on the Bayard Taylor translation are unrecorded.** The deck names the translator and
  makes no rights claim, which is correct behaviour, but nothing in the repo records the status.
- **The scratch-repo PDFs are stale** (191 pages / 43 frames) relative to the repo build
  (234 pages / 51 frames). Anything sized off `scratch/docs/slide-text-extracts/` is missing the
  REINFORCE coda.
- **No Heron's algorithm exists anywhere in the AINIT material.** BMAI's `hs26-bmai-w1-opt-heron`
  has no sibling to port from; only the genie's four-beat SHAPE transfers.
- **There is no "darts in the dark" slide** to port. The phrase appears twice in the deck (a roadmap
  card label, and one muted lead line). The game is a separate vendored browser cartridge,
  `rl-arcade/darts/index.html`, titled "Blind Bullseye" in the page itself, and its own CLAUDE.md
  says not to deep-edit it but to re-vendor from `eth-ainit-fs26/coding-exercises` branch `week3`.
- **The roadmap-frame-versus-section-divider question is not decided here.** The recurring map
  carries a question and an answer bubble one frame after each section page. Whether that counts as
  the "running question" the 2026-08-11 taste rule kills is a call for Carlos, not for this file.
