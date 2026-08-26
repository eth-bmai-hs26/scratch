"""Reference implementation for the proposal proposals/cx-house-price-rm.md
(exercise hs26-bmai-w1-opt-rm-house).

Every number quoted in that proposal is printed by this file, and asserted at the
bottom. Run it with:  python3 proposals/cx-house-price-rm-reference.py

The municipality of Musterwil is invented. The houses are invented. The prices
are invented. Nothing here is real data.

When the exercise is built, this file becomes precompute/reference.py and the
generator half becomes precompute/generate_houses.py.
"""
import numpy as np

# ---------------------------------------------------------------- the data ---
SEED   = 42
TRUE_W = 9500.0      # CHF per square metre of living area
TRUE_B = 120000.0    # CHF, the base
N      = 12
SIGMA  = 25000.0     # CHF, the spread around the line


def make_houses(seed=SEED, n=N):
    rng   = np.random.default_rng(seed)
    area  = np.sort(rng.integers(90, 221, size=n).astype(float))
    price = TRUE_W * area + TRUE_B + rng.normal(0.0, SIGMA, size=n)
    price = np.round(price / 1000.0) * 1000.0
    return area, price


area, price = make_houses()
x = area / 100.0        # units of 100 square metres
y = price / 1000.0      # thousands of francs


def mse(w, b):
    return float(np.mean((y - (w * x + b)) ** 2))


A = np.vstack([x, np.ones_like(x)]).T
(W_LSQ, B_LSQ), *_ = np.linalg.lstsq(A, y, rcond=None)

# ---------------------------------------------------------- the algorithms ---
def fixed_step(x1, y1, w, alpha, eps, max_steps=500):
    """Deck page 30, before the X: a constant nudge in the direction of the miss."""
    history = [w]
    for _ in range(max_steps):
        l = y1 - w * x1
        if abs(l) < eps:
            return history, True
        w = w - alpha if l < 0 else w + alpha
        history.append(w)
    return history, False


def robbins_monro(x1, y1, w, alpha, eps, max_steps=200):
    """Deck page 30, boxed: a step proportional to the miss."""
    history = [w]
    for _ in range(max_steps):
        l = y1 - w * x1
        if abs(l) < eps:
            return history, True
        w = w + alpha * l
        history.append(w)
        if not np.isfinite(w):
            return history, False
    return history, False


def rm_alternating(areas, prices, w, b, alpha, n_steps, seed=0):
    """Deck page 31: update w, recompute the miss, update b. One house at a time."""
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
    """The same loop with the derivative of the squared loss: the factor x on w."""
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
    """Deck page 32, exactly as written: l is the mean signed residual."""
    for _ in range(n_passes):
        l = float(np.mean(prices - (w * areas + b)))
        w = w + alpha * l
        l = float(np.mean(prices - (w * areas + b)))
        b = b + alpha * l
    return w, b


# ------------------------------------------------------------------ report ---
if __name__ == "__main__":
    print("Musterwil, 12 fictitious houses, seed %d" % SEED)
    for i in range(N):
        print("  %2d  area %5.0f m2   price %10.0f CHF" % (i + 1, area[i], price[i]))
    print("least squares  w = %.4f  b = %.4f  mse = %.4f" % (W_LSQ, B_LSQ, mse(W_LSQ, B_LSQ)))
    print("true           w = %.1f  b = %.1f" % (TRUE_W / 10.0, TRUE_B / 1000.0))
    print("mean(x) = %.4f   mean(y) = %.4f" % (x.mean(), y.mean()))

    print("\nAct 0, the lecture house x = 234, y = 198789, model y = w x")
    for w in (900.0, 350.0, 850.0, 849.5):
        print("  w = %8.1f   y_hat = %10.1f   l = %10.1f" % (w, w * 234.0, 198789.0 - w * 234.0))

    x1, y1 = x[0], y[0]
    print("\nAct 1, house 1: x = %.2f, y = %.1f, exact answer w = %.4f" % (x1, y1, y1 / x1))
    h, stopped = fixed_step(x1, y1, 900.0, 10.0, 1.0, 400)
    print("  alpha 10, eps 1 : stopped %s, %d steps, last six w %s"
          % (stopped, len(h) - 1, [round(v, 2) for v in h[-6:]]))
    print("                    last six misses %s" % [round(y1 - v * x1, 2) for v in h[-6:]])
    h2, stopped2 = fixed_step(x1, y1, 900.0, 10.0, 12.0, 400)
    print("  alpha 10, eps 12: stopped %s, %d steps, final w %.1f, final miss %.1f"
          % (stopped2, len(h2) - 1, h2[-1], y1 - h2[-1] * x1))

    print("\nAct 2, Robbins-Monro, converges while alpha < 2/x = %.4f" % (2.0 / x1))
    for a in (0.5, 1.9, 2.2):
        h3, s3 = robbins_monro(x1, y1, 900.0, a, 1.0, 60)
        print("  alpha %.1f: stopped %s, %d steps, final w %.4f" % (a, s3, len(h3) - 1, h3[-1]))

    print("\nAct 3, alternating on 12 houses, from (500, 0)")
    for a in (0.1, 0.3):
        w3, b3 = rm_alternating(x, y, 500.0, 0.0, a, 3600, seed=1)[-1]
        print("  alpha %.2f, 3600 steps: w = %.4f  b = %.4f  mse = %.4f" % (a, w3, b3, mse(w3, b3)))

    print("\nAct 4, the derivative of the squared loss, from (500, 0)")
    w4, b4 = sgd(x, y, 500.0, 0.0, 0.05, 300, seed=1)[-1]
    print("  alpha 0.05, 300 passes           : w = %.4f  b = %.4f  mse = %.4f" % (w4, b4, mse(w4, b4)))
    w5, b5 = sgd(x, y, 500.0, 0.0, 0.3, 300, seed=1, decay=200.0)[-1]
    print("  alpha_t = 0.3/(1 + t/200)        : w = %.4f  b = %.4f  mse = %.4f" % (w5, b5, mse(w5, b5)))
    w6, b6 = sgd(x, y, 500.0, 0.0, 0.1, 300, seed=1)[-1]
    w7, b7 = sgd(x, y, 500.0, 0.0, 0.1, 300, seed=1, shuffle=False)[-1]
    print("  alpha 0.10 shuffled              : w = %.4f  b = %.4f  mse = %.4f" % (w6, b6, mse(w6, b6)))
    print("  alpha 0.10 in area order         : w = %.4f  b = %.4f  mse = %.4f" % (w7, b7, mse(w7, b7)))
    print("  stability: RM needs alpha < 2/x = %.4f, Act 4 needs alpha < 2/(x^2+1) = %.4f"
          % (2.0 / x.max(), 2.0 / (x.max() ** 2 + 1.0)))

    print("\nExtension A, the deck's batch rule, 20000 passes at alpha 0.05")
    for start in ((500.0, 0.0), (1200.0, 0.0), (950.0, 120.0)):
        wb, bb = batch_deck(x, y, start[0], start[1], 0.05, 20000)
        print("  from %-12s -> w = %9.4f  b = %9.4f  mse = %9.4f   w*mean(x)+b = %.4f"
              % (str(start), wb, bb, mse(wb, bb), wb * x.mean() + bb))
    print("  mean(y) = %.4f" % y.mean())

    print("\nThe sign error, w = w - alpha * l, alpha 0.5 from w = 900")
    w8, trace = 900.0, []
    for _ in range(10):
        w8 = w8 - 0.5 * (y1 - w8 * x1)
        trace.append(round(w8, 2))
    print("  %s" % trace)

    # -------------------------------------------------------------- asserts ---
    assert list(area[:3]) == [101.0, 101.0, 102.0] and area[-1] == 217.0
    assert price[0] == 1083000.0 and price[-1] == 2158000.0
    assert abs(W_LSQ - 948.8828) < 1e-4 and abs(B_LSQ - 123.5852) < 1e-4
    assert abs(mse(W_LSQ, B_LSQ) - 281.1024) < 1e-4
    assert stopped is False and h[-6:] == [1070.0, 1080.0, 1070.0, 1080.0, 1070.0, 1080.0]
    assert stopped2 is True and len(h2) - 1 == 17 and h2[-1] == 1070.0
    assert abs(robbins_monro(x1, y1, 900.0, 0.5, 1.0)[0][-1] - 1071.6563) < 1e-4
    assert len(robbins_monro(x1, y1, 900.0, 0.5, 1.0)[0]) == 9
    assert robbins_monro(x1, y1, 900.0, 2.2, 1.0, 60)[0][-1] < -2.8e7
    w3, b3 = rm_alternating(x, y, 500.0, 0.0, 0.1, 3600, seed=1)[-1]
    assert abs(w3 - 937.1679) < 1e-4 and abs(b3 - 142.5066) < 1e-4
    assert abs(mse(w3, b3) - 303.4612) < 1e-4
    assert abs(w4 - 947.8121) < 1e-4 and abs(mse(w4, b4) - 281.6283) < 1e-4
    assert abs(mse(w5, b5) - 281.1516) < 1e-4
    assert mse(w7, b7) > mse(w6, b6) * 1.15          # shuffling matters
    wa, ba = batch_deck(x, y, 500.0, 0.0, 0.05, 20000)
    wc, bc = batch_deck(x, y, 1200.0, 0.0, 0.05, 20000)
    assert abs(wa - 830.3397) < 1e-3 and abs(wc - 1093.7239) < 1e-3
    assert abs((wa * x.mean() + ba) - y.mean()) < 1e-6
    assert abs((wc * x.mean() + bc) - y.mean()) < 1e-6
    print("\nAll assertions passed.")
