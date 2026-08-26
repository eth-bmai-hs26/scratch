# The twelve houses of Musterwil

**All of this data is fictitious.** Musterwil is an invented municipality. The twelve houses do
not exist. The prices are invented. Nothing in this directory is real market data, and nothing
derived from it may be presented as a fact about Swiss housing. The exercise notebook, every
figure title and the CSV header all repeat that statement.

The name was built the way Swiss cantonal template documents build placeholders, from *Muster*
(specimen) plus the common *-wil* suffix. **This is unverified**: nobody has yet checked the
name against the federal register of municipalities. Do that before publication, or pick
another placeholder. The fictitious labelling stays either way.

## Files

| File | What it is |
|---|---|
| `generate_houses.py` | The generator. Seeded at 42. Run it to rewrite the CSV |
| `houses.csv` | The committed output of that generator. 12 rows plus a header note |

## The generating process

```
area   drawn uniformly from the integers 90 through 220, then sorted
price  TRUE_W * area + TRUE_B + noise, with noise Gaussian of standard deviation 25000 CHF,
       then rounded to the nearest 1000 francs, because asking prices are round numbers
```

with

```
SEED    = 42
TRUE_W  = 9500.0      CHF per square metre of living area
TRUE_B  = 120000.0    CHF, the base price
N       = 12
SIGMA   = 25000.0     CHF, the spread around the line
```

Twelve rows fit on one screen, they can be read aloud, and a participant can check any
prediction on a phone.

## The true parameters

**In raw units, as the CSV stores them:** `w = 9500` francs per square metre and `b = 120000`
francs.

**In the working units of the notebook,** which are `x = area / 100` and `y = price / 1000`:

```
w = 950.0     thousands of francs per 100 square metres
b = 120.0     thousands of francs
```

These two numbers are **withheld from the participant until act 4**, on the principle that the
answer is not shown before the attempt. They appear in no student cell before that point, and
no `check_task_N` prints them at any point. The checks run against a separate throwaway problem
whose answer is exactly `w = 10`.

## What the data actually looks like

Real content of `houses.csv`, in both unit systems. This is the output of
`python3 precompute/reference.py`, section 1.

```
  id   area (m2)    price (CHF)      x = area/100    y = price/1000
   1        101        1083000              1.01            1083.0
   2        101        1072000              1.01            1072.0
   3        102        1089000              1.02            1089.0
   4        116        1201000              1.16            1201.0
   5        146        1529000              1.46            1529.0
   6        147        1536000              1.47            1536.0
   7        158        1623000              1.58            1623.0
   8        175        1811000              1.75            1811.0
   9        181        1851000              1.81            1851.0
  10        191        1913000              1.91            1913.0
  11        202        2048000              2.02            2048.0
  12        217        2158000              2.17            2158.0

  mean(x) = 1.5308     mean(y) = 1576.1667
```

## The line the exercise can actually find

This distinction is the whole of Saturday morning, so it is recorded here precisely. Real
output, same section:

```
  seed 42, true line withheld until act 4: w = 950.0, b = 120.0
  least squares                             w = 948.8828, b = 123.5852, mse = 281.1024
  the best line misses the true line by     dw = -1.1172, db = 3.5852
  mse of the true line on this sample: 284.8125, which is above the best 281.1024
```

The generator added noise to every price, so the twelve houses are not on the line they came
from. **The best line an algorithm can find on this sample is the least squares line
`w = 948.8828, b = 123.5852`, and it is not the generating line.** The true line scores 284.8125
on this sample, which is worse than the least squares line's 281.1024. No optimizer should be
expected to reach `w = 950, b = 120`, and the notebook says so in act 4 rather than pretending
otherwise.

## Determinism

`generate_houses.py` uses `numpy.random.default_rng(42)` and writes the CSV with an explicit
column order, `%.0f` formatting and an explicit LF line terminator, so two runs produce a byte
identical file on any platform. Verified on 2026-08-26 with numpy 1.26.4: consecutive runs of
the generator all gave MD5 `1ecea12797b452eb1968c4acf54edb2d`, and `file houses.csv` reports
`ASCII text`, with no CR bytes anywhere.

The explicit `lineterminator="\n"` is load bearing and is not decoration. The `csv` module
defaults to CRLF, which left the header note on LF and the twelve rows on CRLF, so the file had
mixed endings. The notebook embeds a copy of this file in its setup cell and writes it back out
at run time, and mixed endings inside that embedded copy are a trap on a Windows runtime.

`precompute/reference.py` reloads the committed CSV and compares it against a fresh call to
`make_houses()`, so a change to the generator that moves the data fails loudly instead of
leaving the CSV and the printed material quietly disagreeing.

## Regenerating

```
python3 data/generate_houses.py
```

It prints the twelve rows and the true line to stdout, and rewrites `houses.csv` in place.
After regenerating, run `python3 precompute/reference.py`. If the data moved, the reference
fails on its first assertion and every number in the README and in the notebooks has to be
updated from its new output.
