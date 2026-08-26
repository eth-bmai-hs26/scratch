#!/usr/bin/env python3
"""build_notebooks.py : generate the student and solutions notebooks.

    python3 exercise/build_notebooks.py

writes exercise/heron.ipynb and exercise/heron_solutions.ipynb, then asserts
that they satisfy the FS26 sync rule.

EDIT THIS FILE, NEVER AN .ipynb. Both notebooks are generated, so a hand edit
to either one is destroyed silently the next time anybody runs this script.
That is how the sync rule holds by construction instead of by discipline: every
cell is written once, here, and a task cell carries a student body and a
solutions body that share their banner, their signature, their docstring and
their closing print. The only bytes that differ between the two files are the
filled-in expressions.

The four solutions bodies are READ OUT OF reference.py with inspect.getsource,
so there is exactly one implementation of Heron in this directory. Change the
mathematics there and it arrives here on the next run.

What the script asserts before it declares success:

  a. both files are valid JSON, and valid nbformat when nbformat is importable
  b. both have the same number of cells and the same NOTEBOOK_VERSION
  c. exactly the four task cells differ, at the expected indices
  d. every sanity number quoted in a cell is the real output of the solutions
     code, checked by running it here
  e. every byte written is ASCII, so no em dash, en dash or smart quote can
     reach a participant

Two runs are byte identical, so `diff` is a real regression test.
"""

import inspect
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import reference as R  # noqa: E402  the four functions, and the digit column

STUDENT = os.path.join(HERE, "heron.ipynb")
SOLUTIONS = os.path.join(HERE, "heron_solutions.ipynb")

NOTEBOOK_VERSION = "v1.0"

EM_DASH = chr(0x2014)
EN_DASH = chr(0x2013)


def body_of(fn):
    """The source of fn from reference.py, trailing blank lines removed."""
    return inspect.getsource(fn).rstrip("\n")


# === the cells ===============================================================
# A cell is ("md", text), ("code", text) or ("task", student, solutions).

INTRO = """# Squaring the rectangle

**CAS BMAI, weekend 1. Friday 10:00, first-order optimization algorithms.**
Exercise `hs26-bmai-w1-opt-heron`. TAs: Jinlei, Daniele, Ivan.

A rectangle has area 2026. You choose its width. The area is fixed, so the
height is whatever makes the area come out to 2026 again.

Somewhere between a tall sliver and a flat slab that rectangle is a square, and
its side is the square root of 2026. You are going to find it without a square
root key, using nothing but plus, minus, times and divide.

You will write four functions:

| | |
|---|---|
| `other_side` | given the width, the height the fixed area forces |
| `verdict` | too small, too large, or exact |
| `heron_step` | one correction |
| `heron` | the loop |

Then a cell you do not have to write prints how many leading digits of your
answer are correct after each correction. It reads **3, 6, 14, 30, 61**. The
count doubles.

Nothing in this notebook needs the network, an API key, or a repository to
clone. It runs offline from the first cell to the last."""

SETUP = '''# @title Setup. Run this cell first, then leave it alone.
# There is no pip install, no clone, no API key and no network call anywhere in
# this notebook. Everything below is the Python standard library.
NOTEBOOK_VERSION = "%s"

from decimal import Decimal, getcontext

AREA = 2026

print("hs26-bmai-w1-opt-heron, notebook %%s" %% NOTEBOOK_VERSION)
print("The area is %%d." %% AREA)
print("45 squared is %%d, so a width of 45 misses the area by exactly %%d."
      %% (45 ** 2, AREA - 45 ** 2))''' % NOTEBOOK_VERSION

MD_TASK1 = """## Task 1. The other side

The rectangle has area `A` and width `theta`. Return its height.

Whatever you return, multiplying it by `theta` has to give `A` back. That is
the only constraint, and it is the whole of this function."""

TASK1_STUDENT = '''# TASK 1 of 4 : other_side
def other_side(theta, A=AREA):
    """The rectangle has area A and width theta. Return its height."""
    # TODO: one line. The area has to come out to A.
    raise NotImplementedError("fill in other_side")


print("other_side(45.0) should be 45.022222222222226")'''

TASK1_SOLUTION = '''# TASK 1 of 4 : other_side
%s


print("other_side(45.0) should be 45.022222222222226")''' % body_of(R.other_side)

MD_TASK2 = """## Task 2. The verdict

Carlos's third column is `2026 - theta**2`. It is **positive when the guess is
too small**, because then the square you would build is smaller than the area
you were given.

Return the string `'too small'`, `'too large'` or `'exact'`.

The verdict is also readable off the picture, with no arithmetic at all: the
guess is too small exactly when the rectangle is taller than it is wide."""

TASK2_STUDENT = '''# TASK 2 of 4 : verdict
def verdict(theta, A=AREA):
    """Return 'too small', 'too large' or 'exact'."""
    # TODO: compare theta squared against A, using the sign convention above.
    raise NotImplementedError("fill in verdict")


print("verdict(45.0) should be 'too small', because 45 squared is 2025")'''

TASK2_SOLUTION = '''# TASK 2 of 4 : verdict
%s


print("verdict(45.0) should be 'too small', because 45 squared is 2025")''' % body_of(R.verdict)

MD_TASK3 = """## Task 3. One correction

You now know two numbers: the width you guessed and the height the area handed
back. The answer is always between them.

With two numbers, no square root key, and the knowledge that the answer sits
somewhere in between, the cheapest thing anybody can do is take the middle.

Return the next width."""

TASK3_STUDENT = '''# TASK 3 of 4 : heron_step
def heron_step(theta, A=AREA):
    """One correction: average the two sides of the rectangle."""
    # TODO: average the two sides. Use other_side from task 1.
    raise NotImplementedError("fill in heron_step")


print("heron_step(45.0) should be 45.01111111111111")'''

TASK3_SOLUTION = '''# TASK 3 of 4 : heron_step
%s


print("heron_step(45.0) should be 45.01111111111111")''' % body_of(R.heron_step)

MD_TASK4 = """## Task 4. The loop

Keep correcting until the square of your width is within `tol` of the area.
Return every width you visited, starting with `theta0`.

Two things to get right, and they are the two places this goes wrong:

1. The stopping test uses the **absolute value** of `A - theta**2`, because the
   residual changes sign after the first correction.
2. `max_steps` is a guard. Without one, a typo in the update turns a ten second
   cell into a hung runtime."""

TASK4_STUDENT = '''# TASK 4 of 4 : heron
def heron(A=AREA, theta0=45.0, tol=1e-6, max_steps=50):
    """Correct until |A - theta**2| < tol. Return every width visited."""
    thetas = [theta0]
    # TODO: the loop. Stop on the tolerance or on max_steps.
    raise NotImplementedError("fill in heron")


print("heron(theta0=45.0) should have length 3: the start plus two corrections")'''

TASK4_SOLUTION = '''# TASK 4 of 4 : heron
%s


print("heron(theta0=45.0) should have length 3: the start plus two corrections")''' % body_of(R.heron)

MD_SANITY = """## Check yourself before the interesting part

Run this. It is cheap, it takes a second, and it tells you which of the four
functions is wrong before you go looking in the wrong one.

Every expected value in it is real output of `exercise/reference.py`, which you
can run yourself: it prints each number and then asserts it."""

SANITY = '''# Sanity check. Nothing here is yours to edit.
def _sanity():
    assert abs(other_side(45.0) - 45.022222222222226) < 1e-12, "other_side(45.0)"
    assert abs(other_side(10.0) - 202.6) < 1e-12, "other_side(10.0)"
    assert verdict(45.0) == "too small", "verdict(45.0), since 45**2 = 2025"
    assert verdict(46.0) == "too large", "verdict(46.0), since 46**2 = 2116"
    assert abs(heron_step(45.0) - 45.01111111111111) < 1e-12, "heron_step(45.0)"
    assert len(heron(theta0=45.0)) == 3, "heron from 45 takes two corrections"
    assert len(heron(theta0=10.0)) == 7, "heron from 10 takes six corrections"

    # The one that teaches something. After the FIRST correction the rectangle
    # is never tall again: every later width is at or above the square root, so
    # every later square is at or above the area. If this trips, you have most
    # likely written a subtraction somewhere the average belongs.
    xs = heron(theta0=10.0)
    assert all(x * x >= AREA - 1e-9 for x in xs[1:]), \\
        "after the first correction the rectangle should never be tall again"


try:
    _sanity()
    print("All four functions pass. Go on to the digit column.")
except NotImplementedError as exc:
    print("Still to do: %s" % exc)
except AssertionError as exc:
    print("AssertionError: %s" % exc)
    print("Fix that one before continuing.")
except Exception as exc:
    print("%s: %s" % (type(exc).__name__, exc))
    print("Fix that one before continuing.")'''

MD_DIGITS = """## The digit column

Now the part worth staying for.

Your `heron` runs in ordinary Python floats, which hold about sixteen digits.
Two corrections from 45 is already past that. So this cell reruns your own
update in exact decimal arithmetic at 220 digits and counts, after each
correction, how many leading digits agree with the true square root.

You do not have to write any of it. Run it and read the last line.

Two warnings live in the code as comments, because anybody who edits this cell
hits both:

- `"%.60f" % some_decimal` converts the Decimal to a float first, so it prints
  sixty digits of a sixteen digit number. Use `Decimal.quantize` and `str()`.
- Comparing `str(45)` against the root undercounts. Pad both to the same number
  of decimal places before comparing."""

DIGITS = '''# The digit column. Given, and not a task. It reruns YOUR update rule in exact
# decimal arithmetic, so what you are watching is your own algorithm.
getcontext().prec = 220
DA = Decimal(AREA)
ROOT = DA.sqrt()


def _digits_agree(x, ref, places=150):
    # TRAP: quantize BOTH operands to the same number of places first. Without
    # this, str(Decimal(45)) is "45", runs out after two characters, and the
    # honest answer of 3 is reported as 2.
    q = Decimal(1).scaleb(-places)
    a = str(x.quantize(q)).replace("-", "").replace(".", "")
    b = str(ref.quantize(q)).replace("-", "").replace(".", "")
    n = 0
    for ca, cb in zip(a, b):
        if ca != cb:
            break
        n += 1
    return n


# TRAP: never "%.60f" % theta here. That converts to float and prints sixty
# digits of a sixteen digit number, and the column comes out 3, 6, 14, 62, 62.
theta = Decimal(45)
column = []
print("  k   correct digits   theta")
for k in range(5):
    d = _digits_agree(theta, ROOT)
    column.append(d)
    print("  %d   %-14d   %s" % (k, d, str(theta.quantize(Decimal(1).scaleb(-40)))))
    theta = heron_step(theta, DA)      # your function, on Decimals

print("")
print("digit column: %s" % " ".join(str(d) for d in column))
print("sqrt(2026)  = %s" % str(ROOT.quantize(Decimal(1).scaleb(-40))))'''

MD_DISCUSS = """## What just happened?

Talk about these. No code.

1. The residual `2026 - theta**2` changes sign once and then never again. Which
   step is the sign change, and what does it say about the shape of every
   rectangle after it?

2. Bisection on the interval from 45 to 46 needs 20 corrections to pin the
   answer to a width of 1e-6. Yours needed 2 from the same start. Both of them
   can only ever evaluate `theta**2`. Where does the extra information come
   from?

3. Your correction was computed exactly. Name the one thing you would have to
   stop knowing for that to become impossible.

Question 3 is the one the next exercise answers. In the genie game the target
can only be sampled through noise, the exact correction stops being available,
and how far to move becomes a number you have to choose. At 11:00 that number
gets its name."""

MD_COACH = """## If you finish early and want to go further with an LLM

Paste this into a new conversation with ChatGPT, Gemini or Claude, followed by
your own code:

> You are a coach for a beginner working on a numerical exercise. Do not write
> the function for me. First diagnose what my code actually does. Then ask me
> one or two targeted questions about the part that is wrong. Then hint at a
> strategy without giving the line. If I am still stuck, implement one small
> piece together with me, that piece only. Never return a complete drop-in
> function unprompted.

That contract is deliberate. A model that hands back the finished function has
answered the question you were supposed to answer, and the exercise takes ten
minutes precisely because the answer is short."""

MD_NEXT = """## What is next

You are about to meet the same loop twice more this morning, both times with
something taken away.

| | The target | How far to move |
|---|---|---|
| Heron, just now | a number you can evaluate exactly | the average of the two sides |
| The genie, next | visible only through noise | a step size, and it has to shrink |
| House prices, after that | defined by data rather than by an equation | the same step size, renamed |

At 11:00 the thing being corrected becomes a loss surface, and that step size
gets the name it keeps for the rest of the weekend."""


CELLS = [
    ("md", INTRO),
    ("code", SETUP),
    ("md", MD_TASK1),
    ("task", TASK1_STUDENT, TASK1_SOLUTION),
    ("md", MD_TASK2),
    ("task", TASK2_STUDENT, TASK2_SOLUTION),
    ("md", MD_TASK3),
    ("task", TASK3_STUDENT, TASK3_SOLUTION),
    ("md", MD_TASK4),
    ("task", TASK4_STUDENT, TASK4_SOLUTION),
    ("md", MD_SANITY),
    ("code", SANITY),
    ("md", MD_DIGITS),
    ("code", DIGITS),
    ("md", MD_DISCUSS),
    ("md", MD_COACH),
    ("md", MD_NEXT),
]

TASK_INDICES = [i for i, c in enumerate(CELLS) if c[0] == "task"]


# === emitting ================================================================

def as_lines(text):
    """Notebook source is a list of lines, each keeping its newline."""
    lines = text.split("\n")
    return [ln + "\n" for ln in lines[:-1]] + [lines[-1]]


def cell(kind, text):
    if kind == "md":
        return {"cell_type": "markdown", "metadata": {}, "source": as_lines(text)}
    return {"cell_type": "code", "execution_count": None, "metadata": {},
            "outputs": [], "source": as_lines(text)}


def notebook(solutions):
    cells = []
    for c in CELLS:
        if c[0] == "task":
            cells.append(cell("code", c[2] if solutions else c[1]))
        else:
            cells.append(cell(c[0], c[1]))
    return {
        "cells": cells,
        "metadata": {
            "colab": {"provenance": [], "toc_visible": True},
            "kernelspec": {"display_name": "Python 3", "name": "python3"},
            "language_info": {"name": "python"},
        },
        "nbformat": 4,
        "nbformat_minor": 0,
    }


def write(path, payload):
    with io.open(path, "w", encoding="ascii") as fh:
        json.dump(payload, fh, indent=1, sort_keys=True, ensure_ascii=True)
        fh.write("\n")


# === checks ==================================================================

failures = []


def check(label, cond):
    print("  [%s] %s" % ("ok  " if cond else "FAIL", label))
    if not cond:
        failures.append(label)


def main():
    print("Building the Heron notebook pair from %d cells." % len(CELLS))
    write(STUDENT, notebook(False))
    write(SOLUTIONS, notebook(True))
    print("  wrote %s" % STUDENT)
    print("  wrote %s" % SOLUTIONS)
    print("")

    with io.open(STUDENT, encoding="ascii") as fh:
        raw_s = fh.read()
    with io.open(SOLUTIONS, encoding="ascii") as fh:
        raw_x = fh.read()
    nb_s = json.loads(raw_s)
    nb_x = json.loads(raw_x)

    print("The sync rule:")
    check("both files are valid JSON", True)
    check("both have %d cells" % len(CELLS),
          len(nb_s["cells"]) == len(CELLS) and len(nb_x["cells"]) == len(CELLS))
    check("both carry NOTEBOOK_VERSION %s" % NOTEBOOK_VERSION,
          NOTEBOOK_VERSION in "".join(nb_s["cells"][1]["source"])
          and NOTEBOOK_VERSION in "".join(nb_x["cells"][1]["source"]))
    differing = [i for i in range(len(CELLS))
                 if nb_s["cells"][i]["source"] != nb_x["cells"][i]["source"]]
    check("exactly the four task cells differ, at indices %s" % TASK_INDICES,
          differing == TASK_INDICES)
    check("every cell type matches between the two files",
          [c["cell_type"] for c in nb_s["cells"]]
          == [c["cell_type"] for c in nb_x["cells"]])
    check("every task cell keeps its banner in both files",
          all("TASK %d of 4" % (n + 1) in "".join(nb_s["cells"][i]["source"])
              and "TASK %d of 4" % (n + 1) in "".join(nb_x["cells"][i]["source"])
              for n, i in enumerate(TASK_INDICES)))
    check("every task cell keeps its closing print in both files",
          all("".join(nb_s["cells"][i]["source"]).rstrip().splitlines()[-1]
              == "".join(nb_x["cells"][i]["source"]).rstrip().splitlines()[-1]
              for i in TASK_INDICES))
    check("no student task cell contains a working implementation",
          all("NotImplementedError" in "".join(nb_s["cells"][i]["source"])
              for i in TASK_INDICES))

    print("")
    print("Punctuation and encoding:")
    check("both files are pure ASCII", raw_s.isascii() and raw_x.isascii())
    check("no em dash and no en dash anywhere",
          EM_DASH not in raw_s and EN_DASH not in raw_s
          and EM_DASH not in raw_x and EN_DASH not in raw_x)
    check("no whitespace-flanked double hyphen in any cell",
          not any((" " + "--" + " ") in "".join(c["source"])
                  for c in nb_s["cells"] + nb_x["cells"]))

    print("")
    print("The numbers the cells quote, checked against the solutions code:")
    quoted = "".join("".join(c["source"]) for c in nb_x["cells"])
    check("other_side(45.0) really is 45.022222222222226",
          repr(R.other_side(45.0)) == "45.022222222222226"
          and "45.022222222222226" in quoted)
    check("heron_step(45.0) really is 45.01111111111111",
          repr(R.heron_step(45.0)) == "45.01111111111111"
          and "45.01111111111111" in quoted)
    check("heron from 45 really has length 3", len(R.heron(theta0=45.0)) == 3)
    check("heron from 10 really has length 7", len(R.heron(theta0=10.0)) == 7)
    check("45 squared really is 2025 and 46 squared really is 2116",
          45 ** 2 == 2025 and 46 ** 2 == 2116)
    check("the digit column really reads 3, 6, 14, 30, 61",
          R.digit_column() == [3, 6, 14, 30, 61]
          and "3, 6, 14, 30, 61" in quoted)
    check("bisection is quoted as 20 corrections, matching build_data.py",
          "20 corrections" in quoted)

    print("")
    print("nbformat:")
    try:
        import nbformat
        nbformat.read(STUDENT, as_version=4)
        nbformat.read(SOLUTIONS, as_version=4)
        check("nbformat validates both files", True)
    except ImportError:
        print("  [skip] nbformat is not installed here. The JSON checks above")
        print("         still ran, and Colab opens both files.")

    print("")
    if failures:
        print("%d CHECK(S) FAILED." % len(failures))
        for f in failures:
            print("  - %s" % f)
        return 1
    print("All assertions passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
