#!/usr/bin/env python3
"""reference.py : every number the Heron notebook prints, computed and asserted.

Run it:

    python3 exercise/reference.py

It ends on "All assertions passed." and needs only the standard library.

WHY THIS FILE EXISTS. The notebook's markdown cells quote numbers, its sanity
cell asserts them, and its digit cell prints a column. If any of those were
typed from memory the exercise would be teaching a fabrication. Everything the
notebook says is produced here first, and the notebook builder imports this
module so the two cannot drift.

The four exercise functions below are also the solutions bodies:
build_notebooks.py reads their source out of this file, so there is one
implementation of Heron in this directory rather than two.

PRECISION. Two regimes, deliberately:

  * The four exercise functions are plain IEEE doubles, because that is what a
    participant writes in Colab and the sanity numbers have to match what their
    own code prints, bit for bit.
  * The digit column is decimal.Decimal at 220 digits, because after three
    corrections theta matches sqrt(2026) to 30 places and a double holds about
    16. Computing the column in floats gives 3, 6, 14, 16, 16 and hides the
    whole point, and this script prints that column too so the claim is
    checkable rather than asserted.

TWO TRAPS, both hit while writing this. Do not undo the fixes.

  1. "%.60f" % some_decimal SILENTLY CONVERTS THE DECIMAL TO A FLOAT, so it
     prints sixty digits of a sixteen-digit number and the digit column comes
     out reading 3, 6, 14, 62, 62. That looks like a discovery about
     convergence and is a formatting bug. Use Decimal.quantize and str().
  2. Comparing digit strings without padding UNDER-COUNTS THE FIRST ROW.
     str(Decimal(45)) is "45", which runs out after two characters against
     "4501110973...", so a naive comparison reports 2 where the honest answer
     is 3. Quantize both operands to the same number of places first.
"""

import math
import sys
from decimal import Decimal, getcontext

PREC = 220
getcontext().prec = PREC

AREA = 2026
DA = Decimal(AREA)
ROOT = DA.sqrt()


# === the four exercise functions =============================================
# These four are the solutions bodies. build_notebooks.py reads them from here.

def other_side(theta, A=AREA):
    """The rectangle has area A and width theta. Return its height."""
    return A / theta


def verdict(theta, A=AREA):
    """Return 'too small', 'too large' or 'exact'.

    Carlos's third column is A - theta**2, so a POSITIVE residual means the
    guess is too small. The genie exercise later today uses the opposite sign
    convention on purpose. This one follows his handwritten page.
    """
    r = A - theta * theta
    if r > 0:
        return "too small"
    if r < 0:
        return "too large"
    return "exact"


def heron_step(theta, A=AREA):
    """One correction: average the two sides of the rectangle."""
    return (theta + other_side(theta, A)) / 2


def heron(A=AREA, theta0=45.0, tol=1e-6, max_steps=50):
    """Correct until |A - theta**2| < tol. Return every width visited."""
    thetas = [theta0]
    while abs(A - thetas[-1] ** 2) >= tol and len(thetas) <= max_steps:
        thetas.append(heron_step(thetas[-1], A))
    return thetas


# === the digit column ========================================================

def heron_step_exact(theta):
    return (theta + DA / theta) / 2


def correct_digits(x, ref=None, places=150):
    """Leading decimal digits of x that agree with sqrt(2026).

    Both operands are quantized to the same number of places first. See trap 2
    in the module docstring.
    """
    if ref is None:
        ref = ROOT
    q = Decimal(1).scaleb(-places)
    a = str(x.quantize(q)).replace("-", "").replace(".", "")
    b = str(ref.quantize(q)).replace("-", "").replace(".", "")
    n = 0
    for ca, cb in zip(a, b):
        if ca != cb:
            break
        n += 1
    return n


def digit_column(theta0=45, rows=5):
    out = []
    th = Decimal(theta0)
    for _ in range(rows):
        out.append(correct_digits(th))
        th = heron_step_exact(th)
    return out


# === main ====================================================================

def main():
    print("hs26-bmai-w1-opt-heron, notebook reference numbers")
    print("area = %d, sqrt(area) = %s..." % (AREA, str(ROOT)[:22]))
    print("")

    print("The four functions, in IEEE doubles, which is what Colab prints:")
    print("  other_side(45.0)  = %r" % other_side(45.0))
    print("  other_side(15.0)  = %r" % other_side(15.0))
    print("  other_side(10.0)  = %r" % other_side(10.0))
    print("  verdict(45.0)     = %r    because 45**2 = %d" % (verdict(45.0), 45 ** 2))
    print("  verdict(46.0)     = %r    because 46**2 = %d" % (verdict(46.0), 46 ** 2))
    print("  heron_step(45.0)  = %r" % heron_step(45.0))
    print("  heron_step(10.0)  = %r" % heron_step(10.0))
    print("")

    runs = {t: heron(theta0=t) for t in (45.0, 10.0, 1.0, 100.0, 500.0, 2026.0)}
    print("heron() run lengths, theta0 plus its corrections:")
    for t in sorted(runs):
        print("  theta0 = %-8g len = %d   last = %r"
              % (t, len(runs[t]), runs[t][-1]))
    print("")

    print("The run from 45, every width visited:")
    for i, v in enumerate(runs[45.0]):
        print("  k=%d  theta = %-20r  2026 - theta**2 = % .6e"
              % (i, v, AREA - v * v))
    print("")

    col = digit_column()
    print("The digit column from 45, exact decimal arithmetic:")
    print("  %s" % " ".join(str(d) for d in col))
    print("")

    print("The same column computed in floats, which is what NOT to do:")
    fl = []
    th = 45.0
    for _ in range(5):
        s = "%.30f" % th
        r = "%.30f" % math.sqrt(AREA)
        n = 0
        for ca, cb in zip(s.replace(".", ""), r.replace(".", "")):
            if ca != cb:
                break
            n += 1
        fl.append(n)
        th = heron_step(th)
    print("  %s" % " ".join(str(d) for d in fl))
    print("  A double runs out near 16 digits. The exercise needs Decimal.")
    print("")

    print("The AM-GM invariant, which is the sanity check that teaches something:")
    xs = heron(theta0=10.0)
    below = [x for x in xs[1:] if x * x < AREA - 1e-9]
    print("  from theta0 = 10, iterates after the first correction that are")
    print("  still too small: %d" % len(below))
    print("")

    # === assertions ==========================================================
    checks = []

    def check(label, cond):
        checks.append((label, bool(cond)))
        print("  [%s] %s" % ("ok  " if cond else "FAIL", label))

    print("Assertions:")
    check("other_side(45.0) is 45.022222222222226",
          repr(other_side(45.0)) == "45.022222222222226")
    check("other_side(15.0) is 135.06666666666666",
          repr(other_side(15.0)) == "135.06666666666666")
    check("other_side(10.0) is 202.6", repr(other_side(10.0)) == "202.6")
    check("45 squared is 2025, so the first residual is exactly 1",
          45 ** 2 == 2025 and AREA - 45 ** 2 == 1)
    check("verdict(45.0) is 'too small'", verdict(45.0) == "too small")
    check("verdict(46.0) is 'too large'", verdict(46.0) == "too large")
    check("heron_step(45.0) is 45.01111111111111",
          repr(heron_step(45.0)) == "45.01111111111111")
    check("heron_step(10.0) is 106.3", repr(heron_step(10.0)) == "106.3")
    check("len(heron(theta0=45.0)) is 3", len(runs[45.0]) == 3)
    check("len(heron(theta0=10.0)) is 7", len(runs[10.0]) == 7)
    check("the digit column reads 3, 6, 14, 30, 61", col == [3, 6, 14, 30, 61])
    check("each digit count is at least 2n minus 1 of the previous",
          all(col[i] >= 2 * col[i - 1] - 1 for i in range(1, len(col))))
    check("the float digit column stalls at or below 17", max(fl) <= 17)
    check("AM-GM: from 10, no iterate after the first correction is too small",
          len(below) == 0)
    check("AM-GM: the same holds from 1, 100, 500 and 2026",
          all(not [x for x in runs[t][1:] if x * x < AREA - 1e-9]
              for t in (1.0, 100.0, 500.0, 2026.0)))
    check("the harmonic mean of the two sides is the OTHER side of the next"
          " rectangle",
          all(abs(2 / (1 / t + 1 / other_side(t)) - other_side(heron_step(t)))
              < 1e-9 * heron_step(t)
              for t in (10.0, 15.0, 45.0, 100.0, 202.6)))

    print("")
    bad = [label for label, ok in checks if not ok]
    if bad:
        print("%d ASSERTION(S) FAILED." % len(bad))
        for label in bad:
            print("  - %s" % label)
        return 1
    print("All assertions passed. (%d checks)" % len(checks))
    return 0


if __name__ == "__main__":
    sys.exit(main())
