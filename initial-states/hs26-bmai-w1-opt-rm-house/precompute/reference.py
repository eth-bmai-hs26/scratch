"""Reference implementation and drift guard for hs26-bmai-w1-opt-rm-house.

This file is the single source of truth for every number quoted in the README,
in the two notebooks, in the TA card and in the issue prompts. It prints them
all and then asserts them, so a change to the generator or to an algorithm
fails here loudly instead of quietly disagreeing with the printed material.

Run it with:

    python3 precompute/reference.py

Requires numpy and the sibling module housetools.py. It reads the committed
data/houses.csv and checks it against a fresh run of data/generate_houses.py.

The municipality of Musterwil is invented. The houses are invented. The prices
are invented. Nothing here is real market data.
"""
import os
import sys
import time

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, ROOT)
sys.path.insert(0, os.path.join(ROOT, "data"))

import housetools as H                      # noqa: E402
from generate_houses import make_houses, TRUE_W, TRUE_B, SEED   # noqa: E402

area, price, x, y = H.load_houses(os.path.join(ROOT, "data", "houses.csv"))
W_LSQ, B_LSQ = H.least_squares(x, y)
TRUE_W_UNITS = TRUE_W / 10.0        # CHF per m2 becomes kCHF per 100 m2
TRUE_B_UNITS = TRUE_B / 1000.0      # CHF becomes kCHF


def mse(w, b):
    return H.mse(w, b, x, y)


# ------------------------------------------------------------ algorithms ---
# These five functions are the ones the notebook asks the participant to write.
# The notebook and this file must agree line for line.

def fixed_step(x1, y1, w, alpha, eps, max_steps=500):
    """Deck page 30, before the crossing out: a constant nudge."""
    history = [w]
    for _ in range(max_steps):
        y_hat = w * x1
        l = y1 - y_hat
        if abs(l) < eps:
            return history, True
        if l < 0:
            w = w - alpha
        else:
            w = w + alpha
        history.append(w)
    return history, False


def robbins_monro(x1, y1, w, alpha, eps, max_steps=200):
    """Deck page 30, boxed: a step proportional to the miss."""
    history = [w]
    for _ in range(max_steps):
        y_hat = w * x1
        l = y1 - y_hat
        if abs(l) < eps:
            return history, True
        w = w + alpha * l
        history.append(w)
        if not np.isfinite(w):
            return history, False
    return history, False


def rm_alternating(areas, prices, w, b, alpha, n_steps, seed=0):
    """Deck page 31: update w, measure the miss again, update b."""
    rng = np.random.default_rng(seed)
    history = [(w, b)]
    for _ in range(n_steps):
        i = int(rng.integers(len(areas)))
        x_i, y_i = areas[i], prices[i]
        l = y_i - (w * x_i + b)
        w = w + alpha * l
        l = y_i - (w * x_i + b)
        b = b + alpha * l
        history.append((w, b))
    return history


def sgd(areas, prices, w, b, alpha, n_epochs, seed=0, decay=None, shuffle=True):
    """The same loop with the derivative of the squared loss: a factor x on w."""
    rng = np.random.default_rng(seed)
    history = [(w, b)]
    t = 0
    for _ in range(n_epochs):
        order = rng.permutation(len(areas)) if shuffle else np.arange(len(areas))
        for i in order:
            x_i, y_i = areas[i], prices[i]
            a_t = alpha if decay is None else alpha / (1.0 + t / decay)
            l = y_i - (w * x_i + b)
            w = w + a_t * l * x_i
            b = b + a_t * l
            t += 1
            history.append((w, b))
    return history


def batch_deck(areas, prices, w, b, alpha, n_passes):
    """Deck page 32 as written: the loss is the mean signed residual."""
    for _ in range(n_passes):
        l = float(np.mean(prices - (w * areas + b)))
        w = w + alpha * l
        l = float(np.mean(prices - (w * areas + b)))
        b = b + alpha * l
    return w, b


def band(history, tail):
    """Width of the box the last `tail` iterates of (w, b) rattle inside."""
    h = np.asarray(history[-tail:], dtype=float)
    return float(h[:, 0].max() - h[:, 0].min()), float(h[:, 1].max() - h[:, 1].min())


# ---------------------------------------------------------------- report ---
if __name__ == "__main__":
    t0 = time.time()
    print("=" * 74)
    print("hs26-bmai-w1-opt-rm-house, reference implementation")
    print("Musterwil is invented, the houses are invented, the prices are invented.")
    print("=" * 74)

    print("\n-- 1. the data ------------------------------------------------")
    H.print_houses(area, price, x, y)
    fresh_area, fresh_price = make_houses()
    print("  the committed CSV matches a fresh run of the generator: %s"
          % bool(np.array_equal(fresh_area, area) and np.array_equal(fresh_price, price)))
    print("  seed %d, true line withheld until act 4: w = %.1f, b = %.1f"
          % (SEED, TRUE_W_UNITS, TRUE_B_UNITS))
    print("  least squares                             w = %.4f, b = %.4f, mse = %.4f"
          % (W_LSQ, B_LSQ, mse(W_LSQ, B_LSQ)))
    print("  the best line misses the true line by     dw = %.4f, db = %.4f"
          % (W_LSQ - TRUE_W_UNITS, B_LSQ - TRUE_B_UNITS))
    print("  mse of the true line on this sample: %.4f, which is above the best %.4f"
          % (mse(TRUE_W_UNITS, TRUE_B_UNITS), mse(W_LSQ, B_LSQ)))

    print("\n-- 2. act 0, the lecture house, x = 234, y = 198789 -----------")
    act0 = []
    for w0 in (900.0, 350.0, 850.0, 849.5):
        l0 = H.LECTURE_Y - w0 * H.LECTURE_X
        act0.append(l0)
        print("  w = %8.1f   y_hat = %10.1f   l = y - y_hat = %10.1f"
              % (w0, w0 * H.LECTURE_X, l0))

    x1, y1 = x[0], y[0]
    print("\n-- 3. act 1, the fixed step rule, house 1 ---------------------")
    print("  house 1: x = %.2f, y = %.1f, exact answer y/x = %.4f" % (x1, y1, y1 / x1))
    h1, s1 = fixed_step(x1, y1, 900.0, 10.0, 1.0, 400)
    print("  alpha 10, eps 1 : stopped %s after %d steps" % (s1, len(h1) - 1))
    print("                    last six w      %s" % [round(v, 2) for v in h1[-6:]])
    print("                    last six misses %s" % [round(y1 - v * x1, 2) for v in h1[-6:]])
    print("                    the tail visits exactly %d values: %s"
          % (len(set(h1[-40:])), sorted(set(h1[-40:]))))
    h1b, s1b = fixed_step(x1, y1, 900.0, 10.0, 12.0, 400)
    print("  alpha 10, eps 12: stopped %s after %d steps, w = %.1f, miss = %.1f"
          % (s1b, len(h1b) - 1, h1b[-1], y1 - h1b[-1] * x1))

    print("\n-- 4. act 2, robbins-monro on one house -----------------------")
    print("  the miss is multiplied by (1 - alpha * x) each step, so this")
    print("  loop converges while alpha < 2 / x = %.4f" % (2.0 / x1))
    h2, s2 = robbins_monro(x1, y1, 900.0, 0.5, 1.0)
    print("  alpha 0.5: stopped %s after %d steps, w = %.4f" % (s2, len(h2) - 1, h2[-1]))
    print("             trace %s" % [round(v, 2) for v in h2])
    for a in (1.9, 2.2):
        h, s = robbins_monro(x1, y1, 900.0, a, 1.0, 60)
        print("  alpha %.1f: stopped %s after %d steps, w = %.4f" % (a, s, len(h) - 1, h[-1]))

    print("\n-- 5. act 3, alternating on twelve houses, from (500, 0) ------")
    h3 = rm_alternating(x, y, 500.0, 0.0, 0.1, 3600, seed=1)
    w3, b3 = h3[-1]
    print("  alpha 0.1,   3600 steps: w = %.4f  b = %.4f  mse = %.4f"
          % (w3, b3, mse(w3, b3)))
    h3long = rm_alternating(x, y, 500.0, 0.0, 0.1, 20000, seed=1)
    w3l, b3l = h3long[-1]
    print("  alpha 0.1,  20000 steps: w = %.4f  b = %.4f  mse = %.4f"
          % (w3l, b3l, mse(w3l, b3l)))
    bw, bb = band(h3long, 1200)
    print("  more steps do not settle it. Over the last 1200 of those 20000 steps")
    print("  w rattles across a band of width %.2f and b across a band of width %.2f."
          % (bw, bb))

    print("\n-- 6. act 4, the derivative of the squared loss ----------------")
    h4 = sgd(x, y, 500.0, 0.0, 0.05, 300, seed=1)
    w4, b4 = h4[-1]
    print("  alpha 0.05, 300 passes : w = %.4f  b = %.4f  mse = %.4f"
          % (w4, b4, mse(w4, b4)))
    bw4, bb4 = band(h4, 1200)
    print("  a constant step still rattles: band widths %.2f and %.2f" % (bw4, bb4))
    h5 = sgd(x, y, 500.0, 0.0, 0.3, 300, seed=1, decay=200.0)
    w5, b5 = h5[-1]
    print("  alpha_t = 0.3 / (1 + t/200), 300 passes : w = %.4f  b = %.4f  mse = %.4f"
          % (w5, b5, mse(w5, b5)))
    h6 = sgd(x, y, 500.0, 0.0, 0.3, 3000, seed=1, decay=200.0)
    w6, b6 = h6[-1]
    bw6, bb6 = band(h6, 1200)
    print("  the same shrinking step, 3000 passes    : w = %.4f  b = %.4f  mse = %.6f"
          % (w6, b6, mse(w6, b6)))
    print("  it settles: band widths %.4f and %.4f, and it is %.4f away in w and"
          % (bw6, bb6, abs(w6 - W_LSQ)))
    print("  %.4f away in b from the best possible line." % abs(b6 - B_LSQ))
    hs = sgd(x, y, 500.0, 0.0, 0.1, 300, seed=1)
    hn = sgd(x, y, 500.0, 0.0, 0.1, 300, seed=1, shuffle=False)
    print("  alpha 0.10 shuffled       : w = %.4f  b = %.4f  mse = %.4f"
          % (hs[-1][0], hs[-1][1], mse(*hs[-1])))
    print("  alpha 0.10 in area order  : w = %.4f  b = %.4f  mse = %.4f"
          % (hn[-1][0], hn[-1][1], mse(*hn[-1])))
    print("  step size ceilings at the largest house x = %.2f:" % x.max())
    print("    the act 2 rule needs alpha < 2/x       = %.4f" % (2.0 / x.max()))
    print("    the act 4 rule needs alpha < 2/(x^2+1) = %.4f" % (2.0 / (x.max() ** 2 + 1.0)))

    print("\n-- 7. extension A, the batch rule of deck page 32 --------------")
    print("  20000 passes at alpha 0.05, three starting points")
    ext = {}
    for start in ((500.0, 0.0), (1200.0, 0.0), (950.0, 120.0)):
        wb, bb_ = batch_deck(x, y, start[0], start[1], 0.05, 20000)
        ext[start] = (wb, bb_)
        print("    from %-14s w = %9.4f  b = %9.4f  mse = %9.4f   w*mean(x)+b = %.4f"
              % (str(start), wb, bb_, mse(wb, bb_), wb * x.mean() + bb_))
    print("    mean(y) = %.4f. One equation cannot pin down two numbers."
          % y.mean())

    print("\n-- 8. the sign error a participant will make ------------------")
    w8, trace = 900.0, []
    for _ in range(10):
        w8 = w8 - 0.5 * (y1 - w8 * x1)
        trace.append(round(w8, 2))
    print("  w <- w - alpha * l at alpha 0.5 from w = 900: %s" % trace)

    print("\n-- 9. the four task checks, against right and wrong loops -----")
    print("  correct implementations, all four should print PASS:")
    c1 = H.check_task_1(fixed_step)
    c2 = H.check_task_2(robbins_monro)
    c3 = H.check_task_3(rm_alternating)
    c4 = H.check_task_4(sgd)

    def swapped_branches(x1_, y1_, w, alpha, eps, max_steps=500):
        history = [w]
        for _ in range(max_steps):
            l = y1_ - w * x1_
            if abs(l) < eps:
                return history, True
            w = w + alpha if l < 0 else w - alpha
            history.append(w)
        return history, False

    def subtracting_rm(x1_, y1_, w, alpha, eps, max_steps=200):
        history = [w]
        for _ in range(max_steps):
            l = y1_ - w * x1_
            if abs(l) < eps:
                return history, True
            w = w - alpha * l
            history.append(w)
            if not np.isfinite(w):
                return history, False
        return history, False

    def alt_no_recompute(areas, prices, w, b, alpha, n_steps, seed=0):
        return H._ref_alternating(areas, prices, w, b, alpha, n_steps,
                                  seed=seed, recompute=False)

    def sgd_without_x(areas, prices, w, b, alpha, n_epochs, seed=0, decay=None):
        return H._ref_sgd(areas, prices, w, b, alpha, n_epochs, seed=seed,
                          decay=decay, x_on_w=False)

    print("  wrong implementations, all four should print FAIL:")
    f1 = H.check_task_1(swapped_branches)
    f2 = H.check_task_2(subtracting_rm)
    f3 = H.check_task_3(alt_no_recompute)
    f4 = H.check_task_4(sgd_without_x)

    # ------------------------------------------------------------ asserts ---
    assert np.array_equal(fresh_area, area) and np.array_equal(fresh_price, price), \
        "the committed CSV disagrees with the generator"
    assert list(area[:3]) == [101.0, 101.0, 102.0] and area[-1] == 217.0
    assert price[0] == 1083000.0 and price[-1] == 2158000.0
    assert abs(W_LSQ - 948.8828) < 1e-4 and abs(B_LSQ - 123.5852) < 1e-4
    assert abs(mse(W_LSQ, B_LSQ) - 281.1024) < 1e-4
    assert abs(x.mean() - 1.5308) < 1e-4 and abs(y.mean() - 1576.1667) < 1e-4
    # the best line is near the true line without reaching it, because of noise
    assert abs(W_LSQ - TRUE_W_UNITS - (-1.1172)) < 1e-4
    assert abs(B_LSQ - TRUE_B_UNITS - 3.5852) < 1e-4
    assert mse(TRUE_W_UNITS, TRUE_B_UNITS) > mse(W_LSQ, B_LSQ)

    assert [round(v, 1) for v in act0] == [-11811.0, 116889.0, -111.0, 6.0]

    # act 1 orbits and never settles
    assert s1 is False and len(h1) - 1 == 400
    assert h1[-6:] == [1070.0, 1080.0, 1070.0, 1080.0, 1070.0, 1080.0]
    assert sorted(set(h1[-40:])) == [1070.0, 1080.0]
    assert h1[-1] != y1 / x1
    assert s1b is True and len(h1b) - 1 == 17 and h1b[-1] == 1070.0

    # act 2 converges on one house
    assert s2 is True and len(h2) - 1 == 8 and abs(h2[-1] - 1071.6563) < 1e-4
    assert abs(y1 / x1 - 1072.2772) < 1e-4
    assert robbins_monro(x1, y1, 900.0, 2.2, 1.0, 60)[0][-1] < -2.8e7
    assert robbins_monro(x1, y1, 900.0, 1.9, 1.0, 60)[1] is False

    # act 3 reaches the neighbourhood and rattles inside it
    assert abs(w3 - 937.1679) < 1e-4 and abs(b3 - 142.5066) < 1e-4
    assert abs(mse(w3, b3) - 303.4612) < 1e-4
    assert bw > 10.0 and bb > 10.0, "act 3 was expected to rattle, and it did not"
    assert mse(w3l, b3l) > mse(W_LSQ, B_LSQ)

    # act 4 with a constant step also rattles, and with a shrinking step settles
    assert abs(w4 - 947.8121) < 1e-4 and abs(mse(w4, b4) - 281.6283) < 1e-4
    assert bw4 > 5.0 and bb4 > 5.0
    assert abs(mse(w5, b5) - 281.1516) < 1e-4
    assert bw6 < 1.0 and bb6 < 1.0, "the shrinking step was expected to settle"
    assert abs(w6 - W_LSQ) < 0.05 and abs(b6 - B_LSQ) < 0.05
    assert mse(hn[-1][0], hn[-1][1]) > mse(hs[-1][0], hs[-1][1]) * 1.15

    # extension A: the batch rule of the deck does not identify the slope
    wa, ba = ext[(500.0, 0.0)]
    wc, bc = ext[(1200.0, 0.0)]
    assert abs(wa - 830.3397) < 1e-3 and abs(wc - 1093.7236) < 1e-3
    assert abs((wa * x.mean() + ba) - y.mean()) < 1e-6
    assert abs((wc * x.mean() + bc) - y.mean()) < 1e-6
    assert abs(wa - wc) > 100.0

    # the checks pass the right loops and catch the wrong ones
    assert c1 and c2 and c3 and c4, "a check rejected a correct implementation"
    assert not (f1 or f2 or f3 or f4), "a check accepted a wrong implementation"

    print("\nAll assertions passed. Wall clock %.2f s." % (time.time() - t0))
