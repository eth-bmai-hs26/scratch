# Issue 6: The printed TA card

## Goal

Write the one page a TA holds while running this exercise in the room: the ten-minute timing, the
three URLs to have open, the two questions to ask, the four wrong answers to expect and what each one
means, and the minimum viable path if the block runs short. FS26 ships no TA-facing instruction
document anywhere in its tree, and weekend 1 is treating that as a gap to fill rather than a pattern
to copy.

## Dependencies

None. Everything it needs is in the built scenes, the design spec and the schedule. It can be written
before scenes 2 to 5 exist, and updated once by issue 07.

## Context

The Friday 10:00 slot is "CX: First-order optimization algorithms" and it holds three slugs. The
master schedule at `../../../docs/master-schedule-weekend1.csv` reads 10:00 CX and 10:30 coffee
break, which is thirty minutes for three exercises, so Heron gets about ten minutes. The task brief
that commissioned this build calls the block an hour. **That contradiction is unresolved and is open
question 1 for Carlos.** Write the card for ten minutes and add a clearly marked block for the hour.

The TAs are Jinlei, Daniele and Ivan. This exercise is the first of the three, so the card also has to
say what to hand off: the participants walk from here into `hs26-bmai-w1-opt-genie-rm`, which owns
the step size and the noise this exercise deliberately has none of.

The audience is working professionals and managers with little formal mathematics. A TA card written
for a mathematician will not survive contact with the room.

## Deliverables

### 1. `docs/ta-card.md`

One page. Markdown, printable, ASCII only. Sections in this order:

**Header.** Slug, session, TAs, the one-sentence description, and the deep link
`index.html#scene=0`.

**The ten-minute run.** A table, one row per minute band, taken from the design spec's section 16 and
adjusted to what is actually built:

| | |
|---|---|
| 0:00 to 0:02 | Scene 0. Sweep the rectangle. Fail to find the square by eye |
| 0:02 to 0:04 | Scene 1. Carlos's table, one row, start 45. The eye runs out and the residual does not |
| 0:04 to 0:07 | Scene 2. The bracket game, three guesses. The discovery happens here and this is the one scene that must not be rushed |
| 0:07 to 0:08 | Scene 3. Name it, draw the midpoint |
| 0:08 to 0:09 | Scene 4. The digit column. This is the moment of the exercise |
| 0:09 to 0:10 | Scene 5. The bridge table, and the sentence that sets up the genie |

**What to say, and what to withhold.** The single rule: nothing in scenes 0 to 3 names or marks
`sqrt(2026)`, and a TA who says the answer out loud in scene 2 has ended the exercise. Give the TA
two sentences they can say instead when a participant asks what the answer is.

**Two questions to ask the room.** Written out verbatim, so a nervous TA can read them:

1. At scene 0, step 2: "The two numbers are on the screen to four decimal places. Why can nobody find
   the square?"
2. At scene 2, before revealing anything: "You know two numbers, and you know the answer is between
   them. With no square root key, what do you do?"

**Four answers to expect at scene 2, and what each one means.** Write the response for each:

| A participant says | What it is | What to say |
|---|---|---|
| "Take the middle" | Heron, derived | Nothing. Go to scene 3 and name it |
| "Take the smaller one and add a bit" | The fixed nudge | Ask how big a bit. Scene 4 answers it with a measured orbit |
| "Take the geometric mean" | The answer itself | It is the answer, so it is unavailable. Scene 3's first caveat |
| "Take 2 over (1/lo + 1/hi)" | The harmonic mean | The same rectangle, mirrored. Scene 3's second caveat |

**The three numbers to have in your head.** `45^2 = 2025`, so the first residual is exactly 1. From
45 it takes 2 corrections to reach a tolerance of 1e-6. The digit column reads 3, 6, 14, 30, 61.

**If the block runs short.** The minimum viable path is scenes 0, 2 and 4: the failure, the
discovery, the payoff. Scenes 1, 3 and 5 can be read at home.

**If the block really is sixty minutes.** Add, in this order: make the in-page blanks mandatory rather
than optional; give scene 2 a second start at `theta = 500`, which needs 7 corrections, so groups can
race; open the notebook in `exercise/` in the room instead of at home.

**Hand-off.** One line: the participants go next to `hs26-bmai-w1-opt-genie-rm`, which adds the step
size and the noise this exercise deliberately has none of, and the bridge table in scene 5 is the
sentence that gets them there.

**What to do when something breaks.** The page is a folder of files with no server and no network. If
a scene throws, the engine catches it and prints the error in place rather than taking the deck down,
so the other five scenes still work and the TA can jump past with the dots. Reloading is safe: the
theme is the only thing that persists.

### 2. `docs/CLAUDE.md` (updated)

Add one line for the new file.

## Implementation Notes

- Every number quoted on the card must be real output of `precompute/build_data.py` or a value
  already in `data/datasets.js`. Do not round 87.240734 to "about 87" on a card a TA will read aloud.
- Keep it to one printed page at 11 point. If it does not fit, cut the sixty-minute block first.

## File Structure

```
docs/ta-card.md      new
docs/CLAUDE.md       (updated) one line
```

## Verification

- The card fits on one page when printed or exported to PDF at 11 point.
- Every scene number and title on the card matches `SCENES` in `js/main.js`.
- Every number on the card appears in the output of `python3 precompute/build_data.py` or in
  `data/datasets.js`. Check each one by grep, one at a time.
- A person who has never seen the viz can run the ten-minute block from the card alone. Test this on
  one of the other two TAs before calling it done.
- `python3 precompute/build_data.py` still exits 0.
