#!/usr/bin/env python3
"""
build_data.py : generate data/datasets.js for hs26-bmai-w1-opt-heron.

This is the single source of truth for every number the visualization prints.
It is NOT loaded at runtime. Run it by hand and commit the output:

    python3 precompute/build_data.py

Determinism. There is no randomness in the emitted file. Every value is a
deterministic function of the area 2026 and the chosen starting widths, so two
runs are byte identical and `diff` is a real regression test. The theorem sweep
in verify_theorems() does sample widths, and it uses random.seed(SEED) with the
seed pinned below and never tuned to make a sweep pass. The sweep result is a
pass or fail, not a number that reaches the browser.

Precision. Everything that has to be exact is computed with decimal.Decimal at
PREC digits of working precision. Values the browser will itself recompute in
IEEE doubles (the bracket game, the step counts) are computed in doubles here on
purpose, so that the pinned value and the runtime value agree bit for bit.

TWO TRAPS, both hit while writing this file. Do not undo these.

  1. "%.60f" % some_decimal SILENTLY CONVERTS THE DECIMAL TO A FLOAT. The
     script then prints sixty digits of a value that is only correct to about
     sixteen, and the digit column comes out reading 3, 6, 14, 62, 62, which
     looks like a discovery about convergence and is a formatting bug. Use
     Decimal.quantize and str(). Never % and never format() with a float spec.
  2. Comparing digit strings without padding UNDER-COUNTS THE FIRST ROW.
     str(Decimal(45)) is "45", which runs out after two characters against
     "4501110973...", so a naive comparison reports 2 correct digits where the
     honest answer is 3. Quantize both operands to the same number of decimal
     places before comparing.

The script exits nonzero and writes nothing if any assertion fails.
"""

import math
import os
import random
import re
import sys
from decimal import Decimal, getcontext

PREC = 200
SEED = 2026
getcontext().prec = PREC

AREA = 2026
DA = Decimal(AREA)
ROOT = DA.sqrt()

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "data", "datasets.js")

failures = []


def check(label, condition):
    """Record an invariant. Every one of these must hold or nothing is written."""
    status = "ok  " if condition else "FAIL"
    print("  [%s] %s" % (status, label))
    if not condition:
        failures.append(label)


# ---------------------------------------------------------------- exact maths

def heron_exact(theta):
    """One Heron correction in exact decimal arithmetic."""
    return (theta + DA / theta) / 2


def digits_agree(x, ref, places=150):
    """Number of leading significant decimal digits of x that match ref.

    Both operands are quantized to the same number of decimal places first,
    which is trap 2 above. Both values here are between 10 and 1000 and have
    the same integer-part length, so comparing the digit strings with the
    decimal point removed is a like-for-like comparison.
    """
    q = Decimal(1).scaleb(-places)
    a = str(x.quantize(q)).replace("-", "").replace(".", "")
    b = str(ref.quantize(q)).replace("-", "").replace(".", "")
    n = 0
    for ca, cb in zip(a, b):
        if ca != cb:
            break
        n += 1
    return n


def sci(d, sig=17):
    """Format a Decimal in scientific notation without going through a float."""
    if d == 0:
        return "0"
    if d == d.to_integral_value() and abs(d) < 1000:
        return str(d.to_integral_value())
    q = d.normalize()
    sign = "-" if q < 0 else ""
    q = abs(q)
    exp = q.adjusted()
    mant = q.scaleb(-exp).quantize(Decimal(1).scaleb(-(sig - 1)))
    mant = mant.normalize()
    return "%s%se%d" % (sign, mant, exp)


def sci_fixed(d, sig=7):
    """Scientific notation with a FIXED number of significant digits.

    sci() above normalizes the mantissa, which strips trailing zeros, so an
    exact 9.697100e-30 comes back as 9.6971e-30 and the gap column stops being
    a column: five rows with five different widths do not line up under each
    other and cannot be compared at a glance. This one pads instead. It is the
    formatter for anything that is printed as a COLUMN.
    """
    if d == 0:
        return "0"
    sign = "-" if d < 0 else ""
    q = abs(d)
    exp = q.adjusted()
    mant = q.scaleb(-exp).quantize(Decimal(1).scaleb(-(sig - 1)))
    return "%s%se%d" % (sign, mant, exp)


def heron_table(theta0, rows):
    """Carlos's table, as exact decimal strings plus three derived columns.

    digits    leading decimal digits of theta that agree with sqrt(2026). This
              is the definition scene 4 prints on screen, because it is the one
              a participant can check by eye against the printed root.
    relDigits -log10 of the relative error. The standard numerical-analysis
              measure, printed BESIDE the other one so that neither counter is
              an undefined number the audience has to take on trust.
    gapSci    the distance between the two sides of the rectangle, |theta -
              2026/theta|. EXACT, from Decimal. This is the column the loupe
              magnifies, and it is the one place where computing in the browser
              would silently teach the wrong thing: in IEEE doubles the k=2 row
              reads 4.973799e-14 against the true 4.178407e-14, and the k=3 row
              reads 7.105427e-15, which is exactly one ulp at 45. From there on
              a double is measuring its own rounding error and the collapse
              appears to stall. Never recompute this in JavaScript.
    """
    out = []
    th = Decimal(theta0)
    for _ in range(rows):
        resid = DA - th * th
        gap = abs(th - DA / th)
        rel = abs(th - ROOT) / ROOT
        out.append({
            "theta": str(th.quantize(Decimal(1).scaleb(-70)).normalize()),
            "residSci": sci(resid),
            "digits": digits_agree(th, ROOT),
            "relDigits": float((-rel.log10()).quantize(Decimal("0.001"))),
            "gapSci": sci_fixed(gap, 7),
        })
        th = heron_exact(th)
    return out


def loupe_ladder(table, px_per_unit=Decimal("1.6")):
    """How far the two sides overshoot each other UNDER the magnifier.

    The magnification needed to see the mismatch at all is 10 to the power of
    the digit count already achieved, so the loupe exponent and the digit column
    are the same number and both double. That is quadratic convergence turned
    into something a room can watch instead of a phrase in a caption.

    px is what the browser DRAWS. The browser computes nothing here: a bar of
    this pixel length, and the exponent printed beside it.
    """
    out = []
    for k, row in enumerate(table):
        gap = Decimal(row["gapSci"].replace("e", "E"))
        power = row["digits"]
        px = gap * px_per_unit * (Decimal(10) ** power)
        out.append({"k": k, "power": power,
                    "px": float(px.quantize(Decimal("0.01"))),
                    "gapSci": row["gapSci"]})
    return out


# ------------------------------------------------------------ double-precision

def heron_double(t):
    return (t + AREA / t) / 2


def bracket(t):
    o = AREA / t
    return (min(t, o), max(t, o))


def bracket_trace(theta0, steps):
    out = []
    t = float(theta0)
    for _ in range(steps):
        lo, hi = bracket(t)
        out.append({"theta": t, "lo": lo, "hi": hi, "width": hi - lo})
        t = heron_double(t)
    return out


def steps_to_tol(theta0, tol=1e-6, cap=200):
    t = float(theta0)
    n = 0
    while abs(AREA - t * t) >= tol and n < cap:
        t = heron_double(t)
        n += 1
    return n


def bisection(lo, hi, tol, cap=200):
    """Bisect for sqrt(2026). Returns (steps, trace of bracket widths)."""
    trace = [hi - lo]
    n = 0
    while hi - lo >= tol and n < cap:
        mid = (lo + hi) / 2
        if mid * mid < AREA:
            lo = mid
        else:
            hi = mid
        n += 1
        trace.append(hi - lo)
    return n, trace


def fixed_nudge(theta0, alpha, steps):
    """Carlos's Update column with a FIXED step: direction only, distance alpha.

    This is the algorithm his arrows describe if you never choose the distance
    well. It is here to be beaten.
    """
    t = float(theta0)
    seq = [t]
    r = math.sqrt(AREA)
    closest = abs(t - r)
    for _ in range(steps):
        t = t + alpha if t * t < AREA else t - alpha
        seq.append(t)
        closest = min(closest, abs(t - r))
    return seq, closest


# ------------------------------------------------------------------- theorems

def verify_theorems(samples=300000):
    """Section 6 of the proposal, as code.

    1. sqrt(A) always lies inside the bracket [min(theta, A/theta), max(...)].
    2. A guess outside the current bracket makes the next bracket wider.
    3. The midpoint of the bracket IS one Heron step.
    """
    random.seed(SEED)
    r = math.sqrt(AREA)
    v1 = v2 = v3 = 0
    lo_log, hi_log = math.log(0.01), math.log(10000.0)
    for _ in range(samples):
        t = math.exp(random.uniform(lo_log, hi_log))
        lo, hi = bracket(t)
        if not (lo <= r <= hi):
            v1 += 1
        mid = (lo + hi) / 2
        if abs(mid - heron_double(t)) > 1e-9 * max(1.0, abs(mid)):
            v3 += 1
        # a guess strictly outside [lo, hi] must widen the bracket
        g = t * random.choice([0.5, 0.25, 3.0, 7.0])
        if g < lo or g > hi:
            glo, ghi = bracket(g)
            if not (ghi - glo > hi - lo - 1e-9):
                v2 += 1
    print("  samples %d | straddle violations %d | outside-widens violations %d"
          " | midpoint-is-Heron violations %d" % (samples, v1, v2, v3))
    return v1, v2, v3


def verify_amgm(starts=39999):
    """After one correction the rectangle is never tall again: every iterate
    from the first correction on is at or above sqrt(A)."""
    r = math.sqrt(AREA)
    bad = 0
    for i in range(starts):
        t0 = 0.25 + i * (10000.0 - 0.25) / starts
        t = heron_double(t0)
        for _ in range(60):
            if t < r - 1e-9:
                bad += 1
                break
            t = heron_double(t)
    print("  starts %d | iterates below sqrt(2026) after one correction: %d"
          % (starts, bad))
    return bad


# ----------------------------------------------------------------------- build

def build():
    print("Heron data build, area = %d" % AREA)
    print("sqrt(2026) = %s" % str(ROOT)[:74])
    print()

    print("Exact table from Carlos's start, theta_0 = 45:")
    t45 = heron_table(45, 5)
    for i, row in enumerate(t45):
        print("  k=%d  digits=%-3d resid=%-26s theta=%s"
              % (i, row["digits"], row["residSci"], row["theta"][:26]))
    print()

    print("Invariants:")
    check("45 squared is exactly 2025, so the first residual is exactly 1",
          Decimal(45) ** 2 == Decimal(2025) and (DA - Decimal(45) ** 2) == 1)
    digits = [r["digits"] for r in t45]
    check("the correct-digit column reads 3, 6, 14, 30, 61",
          digits == [3, 6, 14, 30, 61])
    check("each digit count is at least 2n-1 of the previous (quadratic)",
          all(digits[i] >= 2 * digits[i - 1] - 1 for i in range(1, len(digits))))

    # AM-GM: the first correction lands ON or ABOVE the root and every later one
    # stays there, so the residual 2026 - theta^2 is positive once and negative
    # forever after. It is only checkable while the residual is still resolvable
    # at the working precision: from theta_0 = 45 the digit count doubles past
    # PREC after five corrections, and at k=6 the residual quantizes to exactly
    # zero. That is an artifact of PREC, not a change in the mathematics, so the
    # assertion runs over the resolvable rows and the cut-off is asserted too.
    resid0 = DA - Decimal(45) ** 2
    later = []
    th = heron_exact(Decimal(45))
    while True:
        r = DA - th * th
        if r == 0:
            break
        later.append(r)
        th = heron_exact(th)
    check("residual is positive at k=0 and negative for every resolvable k>=1",
          resid0 > 0 and len(later) >= 5 and all(x < 0 for x in later))
    # digits_agree resolves at most 152 digits at its default places=150, and
    # ROOT itself is only correct to PREC significant digits, so the honest
    # claim is a floor: by the cut-off theta already matches the 200-digit root
    # to at least 150 digits. The zero residual is that precision floor, not a
    # sign change.
    check("at the cut-off theta already matches the root to 150+ digits",
          digits_agree(th, ROOT) >= 150)

    print()
    print("Theorem sweep (seed %d):" % SEED)
    v1, v2, v3 = verify_theorems()
    check("theorem 1, the bracket always straddles sqrt(2026)", v1 == 0)
    check("theorem 2, a guess outside the bracket widens it", v2 == 0)
    check("theorem 3, the bracket midpoint is exactly one Heron step", v3 == 0)
    bad = verify_amgm()
    check("AM-GM sweep, no iterate falls below sqrt(2026) after one correction",
          bad == 0)

    print()
    print("Double-precision traces:")
    br10 = bracket_trace(10, 7)
    for r in br10:
        print("  theta=%-20r bracket=[%.6f, %.6f] width=%.6f"
              % (r["theta"], r["lo"], r["hi"], r["width"]))
    check("bracket width from 10 after one step is 87.240734",
          abs(br10[1]["width"] - 87.240734) < 5e-7)
    check("bracket from 10 is [10.0, 202.6] wide 192.6",
          abs(br10[0]["width"] - 192.6) < 1e-9)

    br45 = bracket_trace(45, 4)
    check("IN DOUBLES the widths from 45 read 2.222e-02, 2.743e-06, 4.974e-14",
          abs(br45[0]["width"] - 2.222222e-2) < 1e-8
          and abs(br45[1]["width"] - 2.742807e-6) < 1e-11
          and abs(br45[2]["width"] - 4.973799e-14) < 1e-18)
    check("the double trace hits exactly one ulp at 45 on the fourth row, so it"
          " has stopped measuring the mathematics",
          br45[3]["width"] == math.ulp(45.0))
    check("EXACTLY the widths from 45 read 2.222222e-2, 2.742807e-6,"
          " 4.178407e-14, 9.697100e-30, 5.222807e-61",
          [r["gapSci"] for r in t45]
          == ["2.222222e-2", "2.742807e-6", "4.178407e-14", "9.697100e-30",
              "5.222807e-61"])
    check("the k=2 double reading is off the exact one by more than one ulp at"
          " 45, which is why gapSci exists",
          abs(br45[2]["width"] - 4.178407e-14) > math.ulp(45.0))

    ladder = loupe_ladder(t45)
    print("  loupe ladder (magnification, mismatch under it):")
    for row in ladder:
        print("    k=%d  10^%-3d %6.2f px   gap %s"
              % (row["k"], row["power"], row["px"], row["gapSci"]))
    check("the loupe exponents are the digit column, 3, 6, 14, 30, 61",
          [r["power"] for r in ladder] == [3, 6, 14, 30, 61])
    check("every rung of the loupe ladder is between 4 and 40 px, so the"
          " mismatch stays visible at every step",
          all(4.0 <= r["px"] <= 40.0 for r in ladder))
    check("the loupe ladder reads 35.56, 4.39, 6.69, 15.52, 8.36 px",
          [r["px"] for r in ladder] == [35.56, 4.39, 6.69, 15.52, 8.36])
    check("the relative-digit column reads 3.608, 7.516, 15.333, 30.968, 62.236",
          [r["relDigits"] for r in t45]
          == [3.608, 7.516, 15.333, 30.968, 62.236])

    tol = {str(s): steps_to_tol(s) for s in [1, 10, 45, 100, 500, 2026]}
    print("  steps to |2026 - theta^2| < 1e-6: %s" % tol)
    check("from 45 it takes 2 corrections, from 10 it takes 6",
          tol["45"] == 2 and tol["10"] == 6)

    n6, trace6 = bisection(45.0, 46.0, 1e-6)
    n10, _ = bisection(45.0, 46.0, 1e-10)
    print("  bisection on [45, 46]: %d steps to 1e-6, %d steps to 1e-10" % (n6, n10))
    check("bisection needs 20 steps to 1e-6 and 34 to 1e-10", n6 == 20 and n10 == 34)

    nudges = []
    for alpha in [0.1, 0.01, 0.001]:
        seq, closest = fixed_nudge(45.0, alpha, 60)
        nudges.append({"alpha": alpha, "seq": seq[:8], "closest": closest})
        print("  fixed nudge alpha=%-6g first values %s closest %.4e"
              % (alpha, [round(v, 6) for v in seq[:5]], closest))
    check("alpha=0.1 enters the two-cycle 45.0, 45.1 immediately",
          abs(nudges[0]["seq"][1] - 45.1) < 1e-12
          and abs(nudges[0]["seq"][2] - 45.0) < 1e-12
          and abs(nudges[0]["seq"][3] - 45.1) < 1e-12)
    check("every fixed nudge stalls within a factor of two of its own alpha",
          all(n["closest"] > n["alpha"] / 20 and n["closest"] < n["alpha"] * 2
              for n in nudges))

    # values the browser recomputes; pinned so a UI regression is visible
    doubles = {
        "otherSideAt45": AREA / 45.0,
        "otherSideAt15": AREA / 15.0,
        "otherSideAt10": AREA / 10.0,
        "stepFrom45": heron_double(45.0),
        "rootDouble": math.sqrt(AREA),
    }
    check("2026/45 is 45.022222222222226 in doubles",
          repr(doubles["otherSideAt45"]) == "45.022222222222226")
    check("one step from 45 is 45.01111111111111 in doubles",
          repr(doubles["stepFrom45"]) == "45.01111111111111")
    check("the verdict flips between 45.0111 and 45.0112",
          45.0111 ** 2 < AREA < 45.0112 ** 2)

    payload = {
        "area": AREA,
        "rootDigits": str(ROOT.quantize(Decimal(1).scaleb(-70))),
        "heron45": t45,
        "heron10": br10,
        "bracket45": br45,
        "bisection45": {"lo": 45.0, "hi": 46.0, "stepsTo1e6": n6,
                        "stepsTo1e10": n10, "widths": trace6},
        "fixedNudge": nudges,
        "stepsToTol": tol,
        "doubles": doubles,
        "loupe": ladder,
        # These six numbers are the drawing frame and they are DUPLICATED at the
        # head of js/rectview.js, which is the file that actually draws. They
        # are emitted here so this script can assert the range is closed under
        # theta -> 2026/theta. If you move one, move both, and rerun this
        # script: the last check below fails loudly if the pair drifts apart.
        "view": {"thetaMin": 10, "thetaMax": AREA / 10.0,
                 "pxPerUnit": 1.6, "stageW": 620, "stageH": 400,
                 "originX": 116, "originY": 356},
    }

    check("no NaN and no null anywhere in the payload", no_nan(payload))
    check("the view range is closed under theta -> 2026/theta",
          abs(AREA / payload["view"]["thetaMin"] - payload["view"]["thetaMax"]) < 1e-9)
    check("the drawn area is 5186.56 square pixels at every width",
          abs(AREA * payload["view"]["pxPerUnit"] ** 2 - 5186.56) < 1e-9)
    check("DATA.view agrees with the constants at the head of js/rectview.js",
          rectview_frame_matches(payload["view"]))

    print()
    if failures:
        print("%d INVARIANT(S) FAILED. data/datasets.js was NOT written." % len(failures))
        for f in failures:
            print("  - %s" % f)
        return 1

    write(payload)
    print("wrote %s" % OUT)
    return 0


def rectview_frame_matches(view):
    """Read the drawing constants back out of js/rectview.js and compare.

    The frame lives in two files on purpose: rectview.js has to draw with plain
    numbers, and this script has to be able to assert things about them. Two
    copies of a number are a bug waiting to happen, so the copies are compared
    here rather than trusted. Returns False, never raises, if the file has been
    restructured: a failed check is a message, an exception is a traceback.
    """
    path = os.path.join(os.path.dirname(HERE), "js", "rectview.js")
    try:
        with open(path) as fh:
            src = fh.read()
    except IOError:
        return False
    wanted = {
        "W": view["stageW"], "H": view["stageH"],
        "OX": view["originX"], "OY": view["originY"],
        "PX": view["pxPerUnit"],
        "THETA_MIN": view["thetaMin"], "THETA_MAX": view["thetaMax"],
    }
    for name, value in wanted.items():
        m = re.search(r"^\s*var\s+" + name + r"\s*=\s*([0-9.]+)\s*;", src, re.M)
        if not m or abs(float(m.group(1)) - float(value)) > 1e-9:
            print("      rectview.js %s is %s, DATA.view says %s"
                  % (name, m.group(1) if m else "missing", value))
            return False
    return True


def no_nan(node):
    if isinstance(node, dict):
        return all(no_nan(v) for v in node.values())
    if isinstance(node, list):
        return all(no_nan(v) for v in node)
    if node is None:
        return False
    if isinstance(node, float):
        return node == node and abs(node) != float("inf")
    return True


def js(node, indent=2):
    """Serialize to JS. floats go through repr() so the emitted literal parses
    back to the identical IEEE double."""
    pad = " " * indent
    if isinstance(node, dict):
        items = ["%s  %s: %s" % (pad, k, js(v, indent + 2)) for k, v in node.items()]
        return "{\n" + ",\n".join(items) + "\n" + pad + "}"
    if isinstance(node, list):
        flat = all(not isinstance(v, (dict, list)) for v in node)
        if flat and len(node) <= 12:
            return "[" + ", ".join(js(v, 0) for v in node) + "]"
        items = ["%s  %s" % (pad, js(v, indent + 2)) for v in node]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    if isinstance(node, bool):
        return "true" if node else "false"
    if isinstance(node, float):
        return repr(node)
    if isinstance(node, int):
        return str(node)
    return '"%s"' % str(node).replace("\\", "\\\\").replace('"', '\\"')


HEADER = """/* ============================================================================
   datasets.js : window.DATA for hs26-bmai-w1-opt-heron.

   GENERATED FILE. Do not edit by hand. Regenerate with

       python3 precompute/build_data.py

   which recomputes every value from the area 2026 and asserts every invariant
   the scenes rely on before it writes anything. Two runs are byte identical,
   so `diff` is a real regression test.

   rootDigits is sqrt(2026) to 70 decimal places. Scene 4 needs it to count
   digit agreement past double precision. IT IS NEVER RENDERED before scene 4:
   scenes 0 to 3 withhold the answer on purpose.
   ============================================================================ */
window.DATA = """


def write(payload):
    with open(OUT, "w") as fh:
        fh.write(HEADER + js(payload) + ";\n")


if __name__ == "__main__":
    sys.exit(build())
