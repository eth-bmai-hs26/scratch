# Issue 1: The TA card

## Goal

Produce the one page printed card that Ghali and Suei-Wen hold while walking the room. It
carries the six participant mistakes with the exact sentence to say, the three places where the
source material disagrees with itself, and the collapse plan. Without it the two TAs will
improvise a defence of a slide that is wrong, and the room will get two different answers to the
sign question within the same hour.

## Dependencies

None. Every fact this issue needs is already in the repository. It can start immediately and it
is the highest value remaining item.

## Context

The exercise runs third in the 10:00 block, after Heron and the genie. Participants arrive
carrying the genie's sign convention, which is the opposite of this one, and they arrive tired
of setup. The TAs have roughly 20 minutes of floor time with about 12 to 20 people.

Three disagreements in the source material that a participant may notice, and that a TA must not
be caught out by:

1. **Printed deck slide 51 and handwritten page 30 give the name "Robbins-Monro" to different
   rules.** Slide 51 names the sign-only rule. Handwritten page 30 crosses that rule out with a
   large X and boxes the proportional one, and this exercise follows the handwriting.
2. **The genie exercise uses the opposite sign convention on purpose.** It writes
   `loss = Q - target` with `Q := Q - alpha * loss`. This one writes `l = y - y_hat` with
   `w <- w + alpha * l`. Both move the estimate toward the target.
3. **Deck page 32 contains an arithmetic slip.** The annotation reads
   `w_0 = 850 -> y_hat = 190.000` with `y - y_hat = 8789`, but `850 * 234 = 198900`. The stated
   residual is consistent with a prediction of 190,000 and not with the stated `w_0`. The
   notebook uses 198900 and the residual -111, which is what page 29 itself writes.

The six mistakes, with symptoms observed in real runs, are written out in full in section 13 of
`proposals/cx-house-price-rm.md`. Use that as the source text. The numbers in it are real output
of the reference implementation.

## Deliverables

### 1. The card (`TA-CARD.md`)

One page when printed at A4. Six sections in this order.

1. **The collapse plan.** Three lines. Minimum viable path is acts 0, 1, 2, 4. Under time
   pressure set `PREFILL_TASK3 = True` in the setup cell and say out loud that act 3 was
   prefilled. If the block is only 30 minutes, drop to acts 0, 2 and 4.
2. **The six mistakes.** A three column table: what the TA sees over a shoulder, the cause, and
   the sentence to say. The six are: the sign error in the update, a step so large it diverges,
   forgetting to shuffle in act 4, reading the orbit as convergence, dropping the recomputation
   in act 3, and carrying `alpha = 0.5` from act 2 into act 4. Every symptom must be a real
   number from `precompute/reference.py`, for example the sign error trace
   `[813.0, 682.06, 485.01, 188.44, -257.9, ...]` and the act 4 stability ceiling
   `2 / (x^2 + 1) = 0.3503`.
3. **The three disagreements**, as listed in Context above, one line each.
4. **The extension A table**, copied from the reference output:

   | start | ends at w | ends at b | mse | `w*mean(x)+b` |
   |---|---|---|---|---|
   | (500, 0) | 830.3397 | 305.0550 | 2470.5850 | 1576.1667 |
   | (1200, 0) | 1093.7236 | -98.1418 | 3549.7660 | 1576.1667 |
   | (950, 120) | 950.7640 | 120.7055 | 281.6538 | 1576.1667 |

   with `mean(y) = 1576.1667` underneath and the one line explanation that one equation cannot
   pin down two numbers.
5. **The numbers to have in your head.** The exact answer for house 1 is `1072.2772`. Act 1
   orbits between 1070 and 1080. Act 2 lands in 8 steps. The best line for this data is
   `w = 948.8828, b = 123.5852` with mse 281.1024. The generating line is `w = 950, b = 120`
   and the algorithm is not supposed to find it.
6. **The one sentence to close on.** Taken from the deck, not invented.

### 2. A rendered PDF (`TA-CARD.pdf`)

Whatever route is convenient. It must be one page and readable at arm's length.

## File Structure

```
hs26-bmai-w1-opt-rm-house/
  TA-CARD.md      (new)
  TA-CARD.pdf     (new)
  README.md       (updated) the "Not done" list loses its first item
```

## Verification

- `TA-CARD.pdf` is exactly one page.
- Every number on the card appears in the output of `python3 precompute/reference.py`. Check
  this by running the reference, saving its output, and grepping for each number on the card.
- The card names all three disagreements and attributes each to a specific slide.
- The six mistake rows each contain a sentence in quotation marks that a TA can say verbatim.
- No em dash, no en dash, no double hyphen used as a dash.
- `python3 precompute/reference.py` still ends on `All assertions passed.`
