# Issue 7: The printed TA card

## Goal

Write a one-page card that a TA can hold while running the room. FS26 ships no TA-facing
instruction document anywhere in its tree, and weekend 1 is treating that as a gap to fill
rather than a pattern to copy. Two TAs, roughly thirty participants, and a block that may be
sixty minutes or may be thirty.

## Dependencies

None. Everything the card describes is already built.

## Context

The sibling exercise `hs26-bmai-w1-opt-rm-house` has the same issue as its number 01, and its
card is the model to match for shape. Read it before writing this one.

What the card has to survive: a TA who has not read `README.md`, a projector at 1280x800, and
a participant who asks what the answer is in the first three minutes.

The three things a TA most needs and cannot get from the page itself:

1. **The two alpha edges**, which are deliberately absent from every screen:
   form A stays below `1.447213595500`, form B stays below `0.552786404500`. Print them.
2. **Every scene has a URL.** `index.html#scene=N`, N from 0 to 8. A TA who loses the room
   can jump. So can a TA who is running out of time.
3. **Scenes 4 and 5 are stubs today.** If they are still stubs on the day, the running order
   is 0, 1, 2, 3, then 6, 7, 8, and the storm is described in words rather than shown. The
   card has to say which version of itself it is describing.

## Deliverables

### 1. `TA-CARD.md`

One page. Sections, in this order:

- **The bargain, in one sentence**, so a TA can restate it without reading the screen.
- **Running order and minutes.** Two columns: the sixty-minute version and the thirty-minute
  version. The thirty-minute path is scenes 0, 1, 2, 3 and 8, which is the whole argument
  without the storm.
- **What to say at each scene.** One line per scene. Not a script; a prompt.
- **The three questions participants actually ask**, with an answer for each:
  "what is the answer", "why does it work at all", "is this just Newton's method".
- **The two alpha edges**, marked plainly as not for the screen.
- **Every URL**, as a table.
- **What is a stub today**, and what to do instead.
- **The handoff.** One line naming what the 11:00 session picks up: the same loop on a
  prediction loss, one example at a time, which is stochastic gradient descent.

### 2. `TA-CARD.pdf`

Rendered to one side of A4. No build chain is needed for one page: any markdown to PDF route
is fine, and the route used goes in `docs/CLAUDE.md`.

## Implementation Notes

- ASCII punctuation only. No em dash, no en dash, no `--` used as a dash.
- Do not put the answer, the golden ratio, or either root on the card's first page in a place
  a participant reading over a shoulder would see. Put them in the last section under a
  heading that says so.

## File Structure

```
TA-CARD.md
TA-CARD.pdf
docs/CLAUDE.md    (updated, the render route)
```

## Verification

- The card is one page in the rendered PDF. Open it and count.
- `grep -cP '\x{2014}|\x{2013}' TA-CARD.md` prints 0.
- Every URL on the card resolves: click all nine.
- The thirty-minute path is walkable in thirty minutes. Time it once, out loud, alone.
- A second person who has not built this can run scene 3 from the card alone.
