# Issue 3: Scene 3, Heron named, with the in-page code panel

## Goal

Name the algorithm, after the attempt and never before it. Build
`theta <- (theta + 2026/theta)/2` in three clicks, each click being a physical act on the picture
rather than a line of algebra, then state the invariant that scene 4 will test, then carry the two
honest caveats a sharp participant will raise anyway. This scene also holds the in-page Python
blanks, which are the primary coding deliverable for the room.

## Dependencies

- **Issue 1** (The ruler and the loupe): `window.RulerView` for the midpoint construction,
  `window.Loupe` for the caveat about what the eye can still see.

## Context

Read `../CLAUDE.md` first. **This is the first scene allowed to draw the square guide**:
`view.setOptions({ showSquare: true })` on `RectView`. Scenes 0 to 2 leave it off.

The current `js/scenes/scene3.js` is a 47-line stub that renders this brief. Delete the
`Stub.render` call when you build.

The pedagogical order matters and is the whole reason this scene exists at all. The participant has
just spent three guesses in scene 2 discovering that the bracket narrows fastest from the middle.
This scene says: what you did has a name, here is the formula, and here is why the middle is the best
you could have done.

## Deliverables

### 1. The three-click construction

| Click | What is drawn |
|---|---|
| 1 | The two sides as two marks on the ruler, blue at `theta` and amber at `2026/theta` |
| 2 | The midpoint construction between them, drawn as a caliper: two arcs or two tick marks meeting at `(lo + hi)/2` |
| 3 | The rectangle rebuilt with that midpoint as its new width, with the previous rectangle left as a purple ghost |

The construction is a drawing, and the formula appears after it.

### 2. The formula, click 4, built term by term with KaTeX

Rendered through `window.Katex.display` into a `.formula-block`:

```
\theta \leftarrow \frac{\theta + \frac{2026}{\theta}}{2}
```

Build it in the reveal order: the two sides first, then the sum, then the division by two. One
`\htmlClass` or one wrapping span per term, revealed by adding a class, so that the terms arrive in
the order the construction drew them.

Beside it, in ordinary body text: the average of the two sides is the new width, and the new height
is whatever the area gives back. The rectangle has been squared up.

### 3. The invariant, click 5

Stated as a claim scene 4 can test, in body text:

> After the first correction the rectangle is never tall again. Every later rectangle is wide and
> flat, and the residual column changes sign once and then never again.

This is AM-GM. It is verified in `precompute/build_data.py` over 39999 starts spaced evenly on
`(0.25, 10000]`, with zero iterates falling below the root after one correction. Cite that count on
screen or leave it out entirely; do not round it to "40000".

### 4. Two honest caveats, click 6

Both belong here, because a sharp participant raises both and catching them later is worse.

1. **The midpoint is not the best conceivable next guess.** The best conceivable next guess is the
   geometric mean of the two sides, which equals the answer itself and is therefore unavailable. The
   arithmetic mean is the best you can do with two numbers, addition, and division by two. That
   limitation is the reason the algorithm exists.
2. **The harmonic mean is the same rectangle, mirrored.** A participant who proposes
   `2/(1/lo + 1/hi)` has proposed the **other side** of the very same next rectangle, because
   `lo * hi = 2026` makes the harmonic mean equal to `2026` divided by the arithmetic mean. This was
   checked over 20000 sampled widths with worst relative mismatch 4.529e-16. One sentence on screen
   turns the most interesting wrong answer into the same answer seen from the other side.

### 5. The in-page code panel

A read-only Python block with three blanks, checked by normalized string match against an allowlist.
The pattern is proven at `/Users/carloscotrini/Documents/git_ainit/rl-arcade/darts/index.html`, lines
416 to 418 (three `<input class="inline" data-e1="...">` blanks inside a syntax-coloured
`<pre class="template">`), line 533 (`norm()`, which strips all whitespace and normalizes quotes),
and lines 547 to 548 (the accepted-answer allowlist).

The block shows, with the blanks marked:

```python
AREA = 2026

def other_side(theta, A=AREA):
    return ____________          # blank 1

def heron_step(theta, A=AREA):
    return ____________          # blank 2

def heron(A=AREA, theta0=45.0, tol=1e-6, max_steps=50):
    thetas = [theta0]
    while ____________ and len(thetas) <= max_steps:    # blank 3
        thetas.append(heron_step(thetas[-1], A))
    return thetas
```

Accepted answers, after normalization that strips all whitespace and lowercases:

| Blank | Accepted |
|---|---|
| 1 | `a/theta`, `2026/theta` |
| 2 | `(theta+a/theta)/2`, `(theta+2026/theta)/2`, `(a/theta+theta)/2`, `0.5*(theta+a/theta)`, `0.5*(theta+2026/theta)` |
| 3 | `abs(a-theta*theta)>=tol`, `abs(a-theta**2)>=tol`, `abs(theta*theta-a)>=tol`, `abs(theta**2-a)>=tol` |

One special case, and it is worth the code: the harmonic-mean form
`2/(1/theta+1/(a/theta))` entered into blank 2 is accepted with a one-line message saying it returns
the **height** of the same next rectangle rather than its width, which is exactly the caveat above.

**The blanks do not gate anything.** Scene 4 is reachable whether they are filled or not. This is a
deliberate departure from the darts cartridge, which does lock the next chapter: with ten minutes and
a TA holding the room together, a lock screen turns a discovery into a queue. Record the departure in
the file header.

### 6. `css/scene3.css`

The code panel needs its own rules: a monospace block on `--panel-2`, `input.inline` sized to its
content, a correct state using `--good` and an incorrect state using `--warn`. **Not red.** Red is
already spent on a widened bracket.

## Implementation Notes

- The scene must render correctly on cold entry at `#scene=3`, with no earlier scene ever built. It
  starts from `theta = 45` for the construction, because that is where scene 1 left off, and the
  three-click construction is drawn on the ruler where the two marks are 0.0222 apart. Use the loupe
  beside the ruler to make those two marks separable, at power 10^3, where the mismatch is 35.56 px.
- Do not print `sqrt(2026)`. Even here. Scene 4 is the first scene that may.
- Named states to add: `&test=formula` (the formula fully revealed) and `&test=code` (the code panel
  with all three blanks filled correctly).

## File Structure

```
js/scenes/scene3.js    (updated) the stub is replaced by the built scene
css/scene3.css         (updated) the code panel rules replace the placeholder comment
```

## Verification

- `node --check js/scenes/scene3.js` exits 0.
- `index.html#scene=3` opens cold and renders correctly.
- Six clicks walk the construction, the formula, the invariant and the two caveats, in that order,
  and Prev walks back through all six.
- Typing `2026/theta` into blank 1 marks it correct. Typing `theta/2026` marks it incorrect.
- Typing `(theta + 2026/theta)/2` into blank 2 marks it correct, with the spaces stripped by `norm`.
- Typing `2/(1/theta+1/(a/theta))` into blank 2 shows the harmonic-mean message.
- `grep -n "45.011" js/scenes/scene3.js` returns nothing.
- `grep -n "alpha\|learning rate\|gradient" js/scenes/scene3.js` returns nothing in a participant
  string.
- Screenshot `#scene=3&instant&test=formula` and `&test=code`, both themes, at 1280 by 800, and read
  all four PNGs. The formula renders through the vendored KaTeX with no missing glyph box, and the
  code panel's blanks are visibly blanks rather than collapsed to zero width.
- No console errors.
