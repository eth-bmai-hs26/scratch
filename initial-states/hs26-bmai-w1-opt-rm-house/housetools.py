"""Helper module for hs26-bmai-w1-opt-rm-house.

Loads the twelve fictitious Musterwil houses, draws the three figures, and runs
the four deterministic task checks. Import it, or let the notebook write it to
disk from the copy embedded in its setup cell.

The municipality of Musterwil is invented. The houses are invented. The prices
are invented. Every figure title says so.

Notation, fixed for all three opt- exercises of the 10:00 block and taken from
the annotated deck, handwritten pages 28 to 34:

    x       the feature, living area, in units of 100 square metres
    y       the target, asking price, in thousands of francs
    y_hat   the prediction, w * x + b
    l       the signed miss, y - y_hat
    alpha   the step size
    eps     the stopping tolerance in abs(l) < eps

The step size is called alpha and the tolerance is called eps. The 11:00
gradient descent lecture reuses eps a third time for the width of the finite
difference window, so an exercise must never spend eps on a step size.

Dependencies: numpy for everything, matplotlib for the figures only.
"""
import csv
import os

import numpy as np

# Okabe-Ito, colour blind safe. Red and green are never used as a pair anywhere
# in this course, so the two levels are blue and vermillion, with ink for a
# neutral third and amber reserved for chrome.
BLUE = "#0072B2"
VERMILLION = "#D55E00"
INK = "#1a1a1a"
AMBER = "#B45309"
GREY = "#6b6b6b"

FICTITIOUS = "Musterwil, 12 fictitious houses"

# The lecture house from the annotated deck, handwritten page 29. Raw francs and
# raw square metres, so it reproduces the blackboard exactly.
LECTURE_X = 234.0
LECTURE_Y = 198789.0


# ------------------------------------------------------------------- data ---
def _find_csv(path=None):
    if path is not None:
        return path
    here = os.path.dirname(os.path.abspath(__file__))
    for candidate in ("houses.csv",
                      os.path.join("data", "houses.csv"),
                      os.path.join(here, "houses.csv"),
                      os.path.join(here, "data", "houses.csv"),
                      os.path.join(here, "..", "data", "houses.csv")):
        if os.path.exists(candidate):
            return candidate
    raise IOError("houses.csv was not found. Run data/generate_houses.py, or "
                  "run the setup cell of the notebook, which writes it.")


def load_houses(path=None):
    """Return (area, price, x, y) as float arrays, sorted by area.

    area is square metres and price is francs, as they appear in the CSV.
    x is area / 100 and y is price / 1000, which are the working units of the
    notebook. The scaling is stated in the notebook and it is the reason a
    participant can turn the alpha knob by hand.
    """
    rows = []
    with open(_find_csv(path)) as fh:
        for line in fh:
            if line.startswith("#") or not line.strip():
                continue
            rows.append(line)
    reader = csv.DictReader(rows)
    area, price = [], []
    for row in reader:
        area.append(float(row["area_m2"]))
        price.append(float(row["price_chf"]))
    area = np.array(area)
    price = np.array(price)
    order = np.argsort(area, kind="stable")
    area, price = area[order], price[order]
    return area, price, area / 100.0, price / 1000.0


def mse(w, b, x, y):
    """Mean squared error of the line y = w x + b on the twelve houses."""
    return float(np.mean((y - (w * x + b)) ** 2))


def least_squares(x, y):
    """The best line by ordinary least squares. Closed form, no iteration."""
    n = len(x)
    sx, sy = float(np.sum(x)), float(np.sum(y))
    sxx, sxy = float(np.sum(x * x)), float(np.sum(x * y))
    w = (n * sxy - sx * sy) / (n * sxx - sx * sx)
    b = (sy - w * sx) / n
    return w, b


def print_houses(area, price, x, y):
    """Print the twelve houses in both unit systems."""
    print("%s. Nothing below is real market data." % FICTITIOUS)
    print("")
    print("  id   area (m2)    price (CHF)      x = area/100    y = price/1000")
    for i in range(len(area)):
        print("  %2d      %5.0f      %9.0f            %6.2f          %8.1f"
              % (i + 1, area[i], price[i], x[i], y[i]))
    print("")
    print("  mean(x) = %.4f     mean(y) = %.4f" % (x.mean(), y.mean()))


# ---------------------------------------------------------------- figures ---
def _axes(ax):
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.tick_params(labelsize=8, colors=GREY)
    for side in ("left", "bottom"):
        ax.spines[side].set_color(GREY)


def plot_houses(x, y):
    """The twelve houses as points, with no line through them yet."""
    import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(6.4, 4.0), dpi=110)
    ax.scatter(x, y, s=42, color=BLUE, zorder=3)
    ax.set_xlabel("living area x, in units of 100 square metres", fontsize=9)
    ax.set_ylabel("asking price y, in thousands of francs", fontsize=9)
    ax.set_title("%s. Find the line." % FICTITIOUS, fontsize=10, color=INK)
    ax.grid(True, color="#d8d4ca", linewidth=0.6, zorder=0)
    _axes(ax)
    fig.tight_layout()
    return fig


def plot_orbit(history, x1, y1, title="One house", show=60):
    """Acts 1 and 2. The estimate against the step number, and the miss.

    history is the list of w values a task function returned. The dashed line is
    the exact solution of the one house equation, y1 / x1.

    Only the first `show` steps are drawn. The act 1 run is 400 steps long, and
    painted whole it collapses into a solid band in which the alternation the act
    is about cannot be seen at all. Sixty steps is enough to show the climb and
    then the sawtooth. The label sits in a legend rather than on the axes,
    because on the long run it landed on top of the data.
    """
    import matplotlib.pyplot as plt
    hist_all = np.asarray(history, dtype=float)
    hist = hist_all[:show + 1]
    exact = y1 / x1
    steps = np.arange(len(hist))
    trimmed = len(hist_all) > len(hist)
    note = (" (first %d of %d steps)" % (len(hist) - 1, len(hist_all) - 1)
            if trimmed else "")

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9.0, 3.4), dpi=110)
    ax1.plot(steps, hist, color=BLUE, linewidth=1.4, marker="o", markersize=2.6,
             label="estimate w")
    ax1.axhline(exact, color=AMBER, linewidth=1.2, linestyle="--",
                label="exact answer y/x = %.4f" % exact)
    ax1.legend(loc="lower right", fontsize=8, frameon=False)
    ax1.set_xlabel("step", fontsize=9)
    ax1.set_ylabel("estimate w", fontsize=9)
    ax1.set_title("%s: the estimate%s" % (title, note), fontsize=10, color=INK)
    _axes(ax1)

    miss = y1 - hist * x1
    ax2.axhline(0.0, color=GREY, linewidth=0.8)
    ax2.plot(steps, miss, color=VERMILLION, linewidth=1.4, marker="o",
             markersize=2.6)
    ax2.set_xlabel("step", fontsize=9)
    ax2.set_ylabel("miss l = y - y_hat", fontsize=9)
    ax2.set_title("%s: the miss%s" % (title, note), fontsize=10, color=INK)
    _axes(ax2)
    fig.suptitle(FICTITIOUS, fontsize=9, color=GREY)
    fig.tight_layout()
    return fig


def plot_fit_grid(history, x, y, picks=(0, 1, 2, 5, 20, -1)):
    """Act 3 and act 4. Six small panels showing the line as it moves.

    history is the list of (w, b) pairs a task function returned. Small
    multiples are used so that nothing depends on an animation writer being
    available in the runtime.
    """
    import matplotlib.pyplot as plt
    hist = [(float(w), float(b)) for w, b in history]
    idx = [i if i >= 0 else len(hist) + i for i in picks]
    idx = [min(i, len(hist) - 1) for i in idx]
    fig, axes = plt.subplots(2, 3, figsize=(9.0, 5.2), dpi=110)
    grid = np.linspace(float(x.min()) * 0.9, float(x.max()) * 1.05, 20)
    for ax, i in zip(axes.ravel(), idx):
        w, b = hist[i]
        ax.scatter(x, y, s=18, color=BLUE, zorder=3)
        ax.plot(grid, w * grid + b, color=VERMILLION, linewidth=1.6, zorder=2)
        ax.set_ylim(0, 2400)
        ax.set_title("step %d\nw = %.1f  b = %.1f  mse = %.0f"
                     % (i, w, b, mse(w, b, x, y)), fontsize=8, color=INK)
        ax.grid(True, color="#d8d4ca", linewidth=0.5, zorder=0)
        _axes(ax)
    fig.suptitle("%s. The line as the loop moves it." % FICTITIOUS,
                 fontsize=10, color=INK)
    fig.tight_layout()
    return fig


def plot_loss_curve(history, x, y, label="mean squared error"):
    """Act 3 and act 4. Mean squared error against step, on a log axis."""
    import matplotlib.pyplot as plt
    losses = [mse(float(w), float(b), x, y) for w, b in history]
    fig, ax = plt.subplots(figsize=(6.6, 3.6), dpi=110)
    ax.plot(np.arange(len(losses)), losses, color=BLUE, linewidth=1.1)
    w_lsq, b_lsq = least_squares(x, y)
    floor = mse(w_lsq, b_lsq, x, y)
    ax.axhline(floor, color=AMBER, linewidth=1.2, linestyle="--")
    ax.annotate("best possible line, mse = %.2f" % floor,
                xy=(len(losses) * 0.35, floor * 1.30), fontsize=8, color=AMBER)
    ax.set_yscale("log")
    ax.set_xlabel("step", fontsize=9)
    ax.set_ylabel(label, fontsize=9)
    ax.set_title("%s. How far the line still is from the houses." % FICTITIOUS,
                 fontsize=10, color=INK)
    _axes(ax)
    fig.tight_layout()
    return fig


def plot_wb_path(history, x, y, every=1):
    """The path of (w, b) over a contour map of the mean squared error.

    This is the surface the 11:00 gradient descent lecture is about to descend.
    """
    import matplotlib.pyplot as plt
    hist = np.asarray([(float(w), float(b)) for w, b in history])
    ws = np.linspace(min(400.0, hist[:, 0].min()), max(1100.0, hist[:, 0].max()), 120)
    bs = np.linspace(min(-50.0, hist[:, 1].min()), max(320.0, hist[:, 1].max()), 120)
    WW, BB = np.meshgrid(ws, bs)
    ZZ = np.zeros_like(WW)
    for i in range(WW.shape[0]):
        for j in range(WW.shape[1]):
            ZZ[i, j] = mse(WW[i, j], BB[i, j], x, y)
    fig, ax = plt.subplots(figsize=(6.6, 4.6), dpi=110)
    levels = np.logspace(np.log10(max(ZZ.min(), 1.0)), np.log10(ZZ.max()), 14)
    cs = ax.contour(WW, BB, ZZ, levels=levels, colors=GREY, linewidths=0.6)
    ax.clabel(cs, inline=True, fontsize=6, fmt="%.0f")
    ax.plot(hist[::every, 0], hist[::every, 1], color=BLUE, linewidth=1.0,
            label="the path the loop took")
    ax.scatter([hist[0, 0]], [hist[0, 1]], s=40, color=INK, zorder=4,
               label="where it started")
    ax.scatter([hist[-1, 0]], [hist[-1, 1]], s=40, color=VERMILLION, zorder=4,
               label="where it ended")
    w_lsq, b_lsq = least_squares(x, y)
    ax.scatter([w_lsq], [b_lsq], s=90, marker="+", color=AMBER, zorder=5,
               linewidths=1.6, label="the best line for this data")
    leg = ax.legend(loc="upper left", fontsize=8, frameon=True)
    # a white patch, because the legend otherwise sits over the contour lines
    leg.get_frame().set_facecolor("white")
    leg.get_frame().set_edgecolor("none")
    ax.set_xlabel("w, the slope", fontsize=9)
    ax.set_ylabel("b, the base", fontsize=9)
    ax.set_title("%s. The loss surface, and the path across it."
                 % FICTITIOUS, fontsize=10, color=INK)
    _axes(ax)
    fig.tight_layout()
    return fig


# ----------------------------------------------------------------- checks ---
def ok(message):
    print("PASS  " + message)
    return True


def fail(message):
    print("FAIL  " + message)
    return False


def _has_blank(fn):
    """True when the participant left a ___ marker in the body of `fn`.

    IPython pre-binds the names _, __ and ___ to the last three results, so a
    leftover ___ evaluates to the empty string instead of raising NameError.
    That produces a baffling message about a str operand. Reading the source is
    the reliable way to catch it, so every check calls this first.
    """
    try:
        import inspect
        src = inspect.getsource(fn)
    except Exception:
        return False
    for line in src.splitlines():
        stripped = line.strip()
        if stripped.startswith("#"):
            continue
        if "___" in stripped:
            return True
    return False


def filled_in(fn):
    """True when the participant has replaced every ___ in `fn`.

    Cells that are downstream of a task use this so that an unfilled notebook
    prints a sentence instead of a traceback.
    """
    return not _has_blank(fn)


BLANK_MESSAGE = ("There is still a ___ in the cell above. Fill in every line "
                 "marked COMPLETE THIS LINE, then run both cells again.")


def _ref_alternating(areas, prices, w, b, alpha, n_steps, seed=0,
                     recompute=True, x_on_b=False):
    rng = np.random.default_rng(seed)
    history = [(w, b)]
    for _ in range(n_steps):
        i = int(rng.integers(len(areas)))
        x_i, y_i = areas[i], prices[i]
        l = y_i - (w * x_i + b)
        w = w + alpha * l
        if recompute:
            l = y_i - (w * x_i + b)
        b = b + alpha * l * (x_i if x_on_b else 1.0)
        history.append((w, b))
    return history


def _ref_sgd(areas, prices, w, b, alpha, n_epochs, seed=0, decay=None,
             shuffle=True, x_on_w=True, x_on_b=False):
    rng = np.random.default_rng(seed)
    history = [(w, b)]
    t = 0
    for _ in range(n_epochs):
        order = rng.permutation(len(areas)) if shuffle else np.arange(len(areas))
        for i in order:
            x_i, y_i = areas[i], prices[i]
            a_t = alpha if decay is None else alpha / (1.0 + t / decay)
            l = y_i - (w * x_i + b)
            w = w + a_t * l * (x_i if x_on_w else 1.0)
            b = b + a_t * l * (x_i if x_on_b else 1.0)
            t += 1
            history.append((w, b))
    return history


def _same(a, b):
    a = np.asarray(a, dtype=float)
    b = np.asarray(b, dtype=float)
    if a.shape != b.shape:
        return False
    return bool(np.allclose(a, b, rtol=1e-12, atol=1e-9))


# A throwaway problem for the checks: one house of size 2 that sold for 20, so
# the answer is exactly w = 10. The shipped twelve houses are never used here,
# and no check prints the true w or the true b of the shipped data.
CHECK_X, CHECK_Y, CHECK_ANSWER = 2.0, 20.0, 10.0

# A throwaway four house table for the two parameter checks. The numbers are
# invented for the check and have nothing to do with Musterwil.
CHECK_AREAS = np.array([1.0, 2.0, 3.0, 4.0])
CHECK_PRICES = np.array([12.0, 21.0, 29.0, 41.0])


def check_task_1(fixed_step):
    """A one house problem whose answer is exactly w = 10, reached in 10 steps."""
    if _has_blank(fixed_step):
        return fail(BLANK_MESSAGE)
    try:
        history, stopped = fixed_step(CHECK_X, CHECK_Y, w=0.0, alpha=1.0,
                                      eps=0.5, max_steps=50)
    except Exception as exc:
        return fail("The function raised %s: %s" % (type(exc).__name__, exc))
    if len(history) < 2:
        return fail("The loop never took a step. Check that the first "
                    "prediction is wrong by more than eps.")
    if history[0] != 0.0:
        return fail("The first entry of the history should be the starting w.")
    if history[1] < history[0]:
        return fail("The first step went down, from a prediction that was too "
                    "low. Read the miss out loud with its sign, then check "
                    "which branch subtracts alpha.")
    if not stopped:
        return fail("The loop did not reach abs(l) < 0.5 within 50 steps. The "
                    "correct loop arrives in 10 steps of size 1.0.")
    if abs(history[-1] - CHECK_ANSWER) > 1e-9:
        return fail("The loop stopped at w = %r. On this check problem the "
                    "answer is exactly %.1f." % (history[-1], CHECK_ANSWER))
    return ok("Task 1 looks right: 10 steps of size 1.0, landing on w = 10.0.")


def check_task_2(robbins_monro):
    """The same throwaway house. A proportional step should land in a few steps."""
    if _has_blank(robbins_monro):
        return fail(BLANK_MESSAGE)
    try:
        history, stopped = robbins_monro(CHECK_X, CHECK_Y, w=0.0, alpha=0.2,
                                         eps=1e-6, max_steps=200)
    except Exception as exc:
        return fail("The function raised %s: %s" % (type(exc).__name__, exc))
    if len(history) < 2:
        return fail("The loop never took a step.")
    if not np.all(np.isfinite(np.asarray(history, dtype=float))):
        return fail("w became infinite or not a number. The miss is being "
                    "multiplied by (1 - alpha * x) at every step, so it grows "
                    "whenever alpha is above 2 / x.")
    if history[1] < history[0]:
        return fail("w is running away from the answer. The miss is positive "
                    "here, so the update has to add.")
    if not stopped:
        return fail("The loop did not reach abs(l) < 1e-06 within 200 steps. "
                    "The correct loop arrives in 33 steps.")
    if abs(history[-1] - CHECK_ANSWER) > 1e-5:
        return fail("The loop stopped at w = %r. On this check problem the "
                    "answer is %.1f." % (history[-1], CHECK_ANSWER))
    return ok("Task 2 looks right: 33 steps, landing on w = 10.0 to six decimals.")


def check_task_3(rm_alternating):
    """Run the participant function beside three variants and name the match."""
    args = (CHECK_AREAS, CHECK_PRICES, 5.0, 0.0, 0.05, 40)
    if _has_blank(rm_alternating):
        return fail(BLANK_MESSAGE)
    try:
        got = rm_alternating(*args, seed=3)
    except Exception as exc:
        return fail("The function raised %s: %s" % (type(exc).__name__, exc))
    correct = _ref_alternating(*args, seed=3, recompute=True)
    if len(got) != len(correct):
        return fail("The history has %d entries and it should have %d. Append "
                    "one (w, b) pair per step." % (len(got), len(correct)))
    if _same(got, correct):
        return ok("Task 3 looks right: w is updated, the miss is measured "
                  "again, then b is updated.")
    if _same(got, _ref_alternating(*args, seed=3, recompute=False)):
        return fail("You updated w and then reused the old miss for b. Page 31 "
                    "measures the miss a second time, because moving w changed "
                    "the prediction.")
    if _same(got, _ref_alternating(*args, seed=3, recompute=True, x_on_b=True)):
        return fail("The update for b carries a factor x. The base does not "
                    "multiply the area, so its update has no x in it.")
    return fail("The history does not match the alternating rule of page 31. "
                "Check the order: miss, update w, miss again, update b.")


def check_task_4(sgd):
    """Run the participant function beside four variants and name the match."""
    args = (CHECK_AREAS, CHECK_PRICES, 5.0, 0.0, 0.02, 12)
    if _has_blank(sgd):
        return fail(BLANK_MESSAGE)
    try:
        got = sgd(*args, seed=4)
    except Exception as exc:
        return fail("The function raised %s: %s" % (type(exc).__name__, exc))
    correct = _ref_sgd(*args, seed=4)
    if len(got) != len(correct):
        return fail("The history has %d entries and it should have %d. Append "
                    "one (w, b) pair per house visited." % (len(got), len(correct)))
    if _same(got, correct):
        return ok("Task 4 looks right: the slope carries the factor x and the "
                  "base does not.")
    if _same(got, _ref_sgd(*args, seed=4, x_on_w=False)):
        return fail("This is the task 3 rule again. The derivative of the "
                    "squared loss with respect to w carries a factor x.")
    if _same(got, _ref_sgd(*args, seed=4, x_on_b=True)):
        return fail("Both updates carry a factor x. Take the two derivatives "
                    "separately: only the slope multiplies the area.")
    if _same(got, _ref_sgd(*args, seed=4, shuffle=False)):
        return fail("The houses are being visited in area order. Keep the "
                    "shuffle: the table is sorted, so a fixed order ends every "
                    "pass on the largest house.")
    return fail("The history does not match the update taken from the "
                "derivative of the squared loss. Check both lines.")


# ---------------------------------------------------------------- debrief ---
COACH_CONTRACT = """You are coaching a participant of a course for working
professionals. They are filling in a small numerical loop. Follow this contract.
DIAGNOSE: say what their numbers show, in one sentence.
GUIDE: ask one or two targeted questions.
HINT: give a strategy, never a line of code.
IMPLEMENT TOGETHER: if they ask, work on the one line they are stuck on.
Never return a complete drop in function unprompted."""


def _recover_source(name):
    """Return the participant's most recent cell that defines `name`, if any."""
    try:
        from IPython import get_ipython
        shell = get_ipython()
        if shell is None:
            return ""
        history = shell.user_ns.get("In", [])
        for cell in reversed(history):
            if isinstance(cell, str) and ("def %s" % name) in cell:
                return cell
    except Exception:
        return ""
    return ""


def generate_debrief_paste(task_name, numbers, function_name=None):
    """Build a text block the participant pastes into an assistant they use.

    No API key, no client, no network call. The block carries the coaching
    contract, the numbers their loop produced, and their own cell if the
    notebook can recover it.
    """
    lines = [COACH_CONTRACT, "",
             "EXERCISE: hs26-bmai-w1-opt-rm-house, %s." % task_name,
             "The data is twelve fictitious houses. The model is y = w x + b.",
             "The miss is l = y - y_hat and the update adds.",
             "", "WHAT MY LOOP PRODUCED:"]
    for key in sorted(numbers):
        lines.append("  %s = %s" % (key, numbers[key]))
    source = _recover_source(function_name) if function_name else ""
    if source:
        lines += ["", "MY CURRENT CELL:", source]
    lines += ["", "Please start with DIAGNOSE."]
    return "\n".join(lines)
