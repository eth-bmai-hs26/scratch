#!/usr/bin/env python3
"""Reference numbers for proposals/viz-heron.md (hs26-bmai-w1-opt-heron).

Every number quoted in that proposal is printed by this file and asserted at
the bottom. Nothing here is recalled or estimated.

    python3 proposals/viz-heron-reference.py

It ends on "All assertions passed." Requires only the standard library.

The mathematics: a rectangle of area A = 2026 with width theta has height
A/theta. Heron's correction replaces the width by the mean of the two sides,
theta <- (theta + A/theta)/2, which is Newton's method on theta^2 - A and
converges quadratically. High-precision work uses decimal.Decimal at 220
digits; anything the participant's Python will actually produce is computed in
IEEE doubles and labelled as such.

TRAP, hit while writing this file: "%.60f" % some_decimal silently converts the
Decimal to a float, so it prints sixty digits of a sixteen-digit value. Use
Decimal.quantize and str(), never the % operator or a float format spec.
"""

from decimal import Decimal, getcontext
import math

getcontext().prec = 220

AREA = Decimal(2026)
AREA_F = 2026.0
ROOT = AREA.sqrt()
# The drawing scale, taken from the built scaffold's data/datasets.js "view"
# block so that the proposal and the code agree:
#   thetaMin 10, thetaMax 202.6, pxPerUnit 1.6, stage 620 x 400, origin (56, 360)
PX_PER_UNIT = Decimal("1.6")
THETA_MIN = Decimal(10)
THETA_MAX = AREA / THETA_MIN                 # 202.6, so the domain is closed
                                             # under theta -> 2026/theta

# ---------------------------------------------------------------- helpers ---

def heron_seq(theta0, n):
    """n Heron corrections from theta0, exact, first element is theta0."""
    t = Decimal(theta0)
    out = [t]
    for _ in range(n):
        t = (t + AREA / t) / 2
        out.append(t)
    return out


def prefix_digits(t, places=140):
    """Leading decimal digits of t that agree with sqrt(2026).

    This is the on-screen definition: the participant can check it by eye
    against the printed root. It is NOT the same as -log10(relative error),
    which is also printed below for comparison.
    """
    q = Decimal(1).scaleb(-places)
    st, sr = str(t.quantize(q)), str(ROOT.quantize(q))
    n = 0
    for a, b in zip(st, sr):
        if a != b:
            break
        if a.isdigit():
            n += 1
    return n


def rel_digits(t):
    if t == ROOT:
        return float("inf")
    return float(-(abs(t - ROOT) / ROOT).ln() / Decimal(10).ln())


def gap(t):
    """|theta - A/theta|, the width of the bracket the two sides form."""
    return abs(t - AREA / t)


def mulberry32(seed):
    """The seeded RNG the course-viz skill requires in precompute (JS port
    parity). Returns a function yielding floats in [0, 1)."""
    state = seed & 0xFFFFFFFF

    def rnd():
        nonlocal state
        state = (state + 0x6D2B79F5) & 0xFFFFFFFF
        t = state
        t = (t ^ (t >> 15)) * (t | 1) & 0xFFFFFFFF
        t = (t ^ (t + ((t ^ (t >> 7)) * (t | 61) & 0xFFFFFFFF))) & 0xFFFFFFFF
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296.0

    return rnd


# ------------------------------------------------------- 1. the root ---------
print("1. THE TARGET (never rendered before scene 4)")
print("   sqrt(2026) =", str(ROOT)[:73])
print("   45^2 =", 45 ** 2, "so Carlos's first residual is exactly", 2026 - 45 ** 2)
print()

# ------------------------------------- 2. Carlos's table, start theta = 45 ---
print("2. CARLOS'S TABLE FROM theta = 45 (exact, Decimal at 220 digits)")
print("   k | theta                     | 2026 - theta^2 | digits | -log10(relerr) | gap")
seq45 = heron_seq(45, 4)   # four corrections. A fifth row would need
                           # prefix_digits(places=...) raised past 140; the count
                           # there is capped by that argument, not by the maths.
digits45 = []
gaps45 = []
for k, t in enumerate(seq45):
    r = AREA - t * t
    d = prefix_digits(t)
    g = gap(t)
    digits45.append(d)
    gaps45.append(g)
    print("   %d | %-25s | %14s | %6d | %14.3f | %.6e"
          % (k, str(t)[:25], "%.6e" % float(r), d, rel_digits(t), float(g)))
print("   digit column:", digits45)
print("   residuals   :", ["%.6e" % float(AREA - t * t) for t in seq45])
print()

# --------------------------------- 3. the loupe: seeing the gap at all -------
print("3. THE LOUPE. Magnification 10^d (d = the digit count) puts the gap on screen.")
print("   Base scale 1.6 px per unit, from data/datasets.js view.pxPerUnit.")
print("   k | gap (units)  | gap at base scale (px) | 10^d loupe | gap under loupe (px)")
loupe_px = []
for k, t in enumerate(seq45):
    g = gaps45[k]
    d = digits45[k]
    base_px = g * PX_PER_UNIT
    lens_px = base_px * (Decimal(10) ** d)
    loupe_px.append(float(lens_px))
    print("   %d | %.6e | %20.6f | 10^%-7d | %10.2f"
          % (k, float(g), float(base_px), d, float(lens_px)))
print()

# ------------------------------------------- 4. the bracket game, start 10 ---
print("4. SCENE 2, THE BRACKET GAME FROM theta_0 = 10")
seq10 = heron_seq(10, 6)
brackets10 = []
for k, t in enumerate(seq10):
    lo, hi = min(t, AREA / t), max(t, AREA / t)
    brackets10.append((float(lo), float(hi), float(hi - lo)))
    print("   k=%d theta=%-24s bracket=[%.6f, %.6f] width=%.6f digits=%d"
          % (k, str(t)[:24], float(lo), float(hi), float(hi - lo), prefix_digits(t)))
print()

# ------------------------------------------------- 5. the three theorems -----
print("5. THE THREE THEOREMS THE DISCOVERY MECHANIC STANDS ON (Mulberry32, seed 2026)")
rnd = mulberry32(2026)
N = 300000
straddle = widen = midpoint = 0
lo_ln, hi_ln = math.log(0.01), math.log(10000.0)
for _ in range(N):
    theta = math.exp(lo_ln + (hi_ln - lo_ln) * rnd())
    other = AREA_F / theta
    lo, hi = min(theta, other), max(theta, other)
    r = math.sqrt(AREA_F)
    # T1 the bracket straddles the target
    if not (lo <= r <= hi):
        straddle += 1
    # T2 a guess strictly outside the bracket has a strictly wider bracket
    span = hi - lo
    for g in (lo * (1.0 - 0.5 * rnd() - 1e-9), hi * (1.0 + 0.5 * rnd() + 1e-9)):
        if g > 0 and not (abs(g - AREA_F / g) > span):
            widen += 1
    # T3 the midpoint of the bracket is exactly one Heron step
    if abs((lo + hi) / 2 - (theta + AREA_F / theta) / 2) > 1e-9 * theta:
        midpoint += 1
print("   samples %d | straddle violations %d | outside-widens violations %d | "
      "midpoint-is-Heron violations %d" % (N, straddle, widen, midpoint))

below = 0
starts = 0
t0 = 0.25
while t0 <= 10000.0:
    starts += 1
    t = (t0 + AREA_F / t0) / 2
    for _ in range(60):
        if t * t < AREA_F - 1e-9:
            below += 1
            break
        t = (t + AREA_F / t) / 2
    t0 += 0.25
print("   AM-GM sweep: %d starts over (0.25, 10000], iterates below sqrt(2026) "
      "after one correction: %d" % (starts, below))
print()

# --------------------------------- 5b. the two means give the same rectangle --
print("5b. THE HARMONIC MEAN OF THE TWO SIDES IS THE OTHER SIDE OF THE NEXT RECTANGLE")
print("    (a participant who proposes 2/(1/lo + 1/hi) instead of (lo+hi)/2 gets the")
print("     SAME rectangle, mirrored, because lo * hi = 2026 exactly.)")
rnd2 = mulberry32(2026)
worst = 0.0
for _ in range(20000):
    theta = math.exp(lo_ln + (hi_ln - lo_ln) * rnd2())
    lo, hi = min(theta, AREA_F / theta), max(theta, AREA_F / theta)
    am = (lo + hi) / 2
    hm = 2.0 / (1.0 / lo + 1.0 / hi)
    worst = max(worst, abs(hm - AREA_F / am) / (AREA_F / am))
print("    worst relative mismatch between HM and 2026/AM over 20000 samples: %.3e" % worst)
print()

# ------------------------------------------------ 6. what doubles produce ----
print("6. IEEE DOUBLES, i.e. what the participant's Python actually prints")


def other_side_f(theta):
    return AREA_F / theta


def heron_step_f(theta):
    return (theta + AREA_F / theta) / 2


def heron_f(theta0, tol=1e-6, max_steps=50):
    ts = [theta0]
    for _ in range(max_steps):
        if abs(AREA_F - ts[-1] ** 2) < tol:
            break
        ts.append(heron_step_f(ts[-1]))
    return ts


print("   other_side(45.0) = %r" % other_side_f(45.0))
print("   other_side(10.0) = %r" % other_side_f(10.0))
print("   other_side(15.0) = %r" % other_side_f(15.0))
print("   heron_step(45.0) = %r" % heron_step_f(45.0))
print("   math.sqrt(2026)  = %r" % math.sqrt(2026))
print("   45.0111^2 = %r   45.0112^2 = %r" % (45.0111 ** 2, 45.0112 ** 2))
steps_to_tol = {}
for t0 in [1, 10, 45, 100, 500, 2026]:
    ts = heron_f(float(t0))
    steps_to_tol[str(t0)] = len(ts) - 1
    print("   from %-6s: %d corrections to |2026 - theta^2| < 1e-6, list length %d"
          % (t0, len(ts) - 1, len(ts)))
print("   drawing: 2026/210 = %r, 40/21 = %r, constant drawn area = %.4f px^2"
      % (2026 / 210, 40 / 21, 2026 * (40 / 21) ** 2))
print()

# ------------------------------------------- 6b. where IEEE doubles run out --
print("6b. THE DOUBLE-PRECISION FLOOR. Scene 4 must NOT read this column from doubles.")
td = 45.0
double_widths = []
for k in range(4):
    lo_d, hi_d = min(td, AREA_F / td), max(td, AREA_F / td)
    double_widths.append(hi_d - lo_d)
    print("   k=%d theta=%-20r double width=%.6e | exact width=%.6e"
          % (k, td, hi_d - lo_d, float(gaps45[k])))
    td = heron_step_f(td)
print("   ulp at 45.0 = %r" % math.ulp(45.0))
print("   From k=2 on, the double trace is measuring its own rounding error:")
print("   it reads 4.973799e-14 where the mathematics says 4.178407e-14, a gap of")
print("   %.3e, which is %.2f ulp, and at k=3 it reads exactly one ulp."
      % (abs(double_widths[2] - float(gaps45[2])),
         abs(double_widths[2] - float(gaps45[2])) / math.ulp(45.0)))
print()

# ------------------------------------------------------- 7. comparisons ------
print("7. SCENE 4 COMPARISONS")
n, w = 0, 1.0
while w >= 1e-6:
    w /= 2
    n += 1
bisect_1e6 = n
n2, w2 = 0, 1.0
while w2 >= 1e-10:
    w2 /= 2
    n2 += 1
bisect_1e10 = n2
print("   bisection on [45, 46]: %d steps to width < 1e-6, %d steps to width < 1e-10"
      % (bisect_1e6, bisect_1e10))
lo_b, hi_b = Decimal(45), Decimal(46)
bis_digits = []
for i in range(1, 21):
    mid = (lo_b + hi_b) / 2
    if mid * mid > AREA:
        hi_b = mid
    else:
        lo_b = mid
    bis_digits.append(prefix_digits((lo_b + hi_b) / 2))
print("   bisection digit column, steps 1..20:", bis_digits)
print("   after 2 corrections: Heron %d digits, bisection %d digits"
      % (digits45[2], bis_digits[1]))

nudge = {}
for al in (0.1, 0.01, 0.001):
    t = 45.0
    seen, best = [], float("inf")
    for _ in range(400):
        best = min(best, abs(t - math.sqrt(AREA_F)))
        seen.append(round(t, 6))
        t = t + al if t * t < AREA_F else t - al
    tail = sorted(set(seen[-10:]))
    nudge[al] = (tail, best)
    print("   fixed nudge alpha=%-6s first six: %s  two-cycle %s  closest approach %.4e"
          % (al, seen[:6], tail, best))
print()

# ------------------------------------------------------- 8. assertions -------
assert 45 ** 2 == 2025
assert str(ROOT).startswith("45.011109739707595882970497272528968721145872069102270549322416749653591")
assert digits45 == [3, 6, 14, 30, 61], digits45
for i in range(1, len(digits45)):
    assert digits45[i] >= 2 * digits45[i - 1] - 1, (i, digits45)
assert AREA - seq45[0] ** 2 == 1
for t in seq45[1:]:
    assert AREA - t * t < 0                       # AM-GM: never tall again
assert "%.6e" % float(gaps45[0]) == "2.222222e-02"
assert "%.6e" % float(gaps45[1]) == "2.742807e-06"
assert "%.6e" % float(gaps45[2]) == "4.178407e-14"
assert "%.6e" % float(gaps45[3]) == "9.697100e-30"
assert "%.6e" % float(gaps45[4]) == "5.222807e-61"
for px in loupe_px:
    assert 4.0 <= px <= 40.0, px                  # the loupe rule is usable at every step
assert straddle == 0 and widen == 0 and midpoint == 0
assert below == 0 and starts == 40000, (below, starts)
assert "%.6f" % brackets10[1][2] == "87.240734"
assert "%.6f" % brackets10[2][2] == "30.356534"
assert "%.6f" % brackets10[5][2] == "0.000095"
assert other_side_f(45.0) == 45.022222222222226
assert other_side_f(10.0) == 202.6
assert heron_step_f(45.0) == 45.01111111111111
assert len(heron_f(45.0)) == 3 and len(heron_f(10.0)) == 7
assert steps_to_tol == {"1": 10, "10": 6, "45": 2, "100": 5, "500": 7, "2026": 10}
assert 45.0111 ** 2 < 2026 < 45.0112 ** 2
assert bisect_1e6 == 20 and bisect_1e10 == 34
assert bis_digits[1] == 2 and bis_digits[19] == 8
assert bis_digits != sorted(bis_digits)          # bisection's digit count wobbles
assert worst < 1e-12, worst                     # HM(lo, hi) == 2026 / AM(lo, hi)
assert nudge[0.1][0] == [45.0, 45.1]
assert "%.4e" % nudge[0.1][1] == "1.1110e-02"
assert "%.4e" % nudge[0.01][1] == "1.1097e-03"
assert "%.4e" % nudge[0.001][1] == "1.0974e-04"
assert float(THETA_MAX) == 202.6 and float(AREA / THETA_MAX) == 10.0   # domain closed
assert abs(2026 * 1.6 ** 2 - 5186.56) < 1e-9        # constant drawn area, px^2
assert "%.6e" % double_widths[2] == "4.973799e-14"  # what doubles print
assert double_widths[3] == math.ulp(45.0)           # and where they stop
assert abs(double_widths[2] - float(gaps45[2])) > math.ulp(45.0)
print("All assertions passed.")
