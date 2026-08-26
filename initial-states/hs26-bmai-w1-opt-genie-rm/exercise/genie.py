"""The genie's bargain, as a Python object the notebooks program against.

    The bargain: name a positive Q with Q = 1 + 1/Q.
    You may test as often as you like. You may not ask for the answer.

WHY THIS FILE EXISTS AT ALL. The AINIT darts cartridge hands its participants
an exercise written against a class called DartsInTheDark, and that class is
not in the arcade repository: its browser game returns nothing to Python and
shares no code with the exercise. So this one is written from scratch, once,
and both the notebook and the page's scene 7 stub program against it.

WHY THE RANDOM NUMBERS ARE NOT random.gauss. The browser page draws its
sandstorm from Mulberry32 plus Box-Muller (js/rng.js). If this file used the
standard library, a participant running the notebook would see a different
storm from the one the room watched. So both generators are ported here line
for line, and _assert_stream_matches_browser() checks the port against six
draws taken from the running JavaScript at seed 20260904. That assert runs at
import time: a broken port fails immediately rather than quietly producing
plausible numbers.

    python3 exercise/genie.py        runs the three sanity checks and prints them

Sign convention, pinned for the whole exercise and matching the lecture slide:

    loss = Q - target                your number minus what came back
    Q    = Q - alpha * loss          subtract part of the loss

The house-price exercise 40 minutes later writes the same rule the other way
round, l = y - y_hat with w = w + alpha * l. Both move the estimate toward
the target. See ../CLAUDE.md, "Notation, pinned".
"""

import math

SEED = 20260904          # the weekend date. Pinned in js/rng.js as well.


# --------------------------------------------------------------------------
# The two generators, ported from js/rng.js
# --------------------------------------------------------------------------

def _imul(a, b):
    """JavaScript Math.imul: multiply the low 32 bits and keep 32 bits.

    Multiplication modulo 2^32 depends only on the residues, so working with
    unsigned values here gives the same bit pattern JavaScript gets from its
    signed 32 bit result.
    """
    return ((a & 0xFFFFFFFF) * (b & 0xFFFFFFFF)) & 0xFFFFFFFF


def mulberry32(seed):
    """One multiply-xorshift round per draw. Returns floats in [0, 1)."""
    state = seed & 0xFFFFFFFF

    def rand():
        nonlocal state
        state = (state + 0x6D2B79F5) & 0xFFFFFFFF
        t = state
        t = _imul(t ^ (t >> 15), t | 1)
        t = (t ^ (t + _imul(t ^ (t >> 7), t | 61))) & 0xFFFFFFFF
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296

    return rand


def gauss(rand, sd=1.0):
    """Box-Muller. Two uniforms in, one normal deviate out.

    u is drawn as 1 - rand() so that it is never exactly zero and log(u)
    cannot blow up. That detail is inherited from the browser code and it
    has to stay, because it changes which numbers come out.
    """
    u = 1 - rand()
    v = rand()
    return math.sqrt(-2 * math.log(u)) * math.cos(2 * math.pi * v) * sd


# Six draws taken from the running JavaScript, js/rng.js, at seed 20260904.
# Reproduce them with:
#     node -e 'const fs=require("fs");const w={};
#              new Function("window",fs.readFileSync("js/rng.js","utf8"))(w);
#              const r=w.RNG.stream();for(let i=0;i<6;i++)console.log(r());'
_BROWSER_UNIFORMS = [
    0.28361130738630891,
    0.70026570325717330,
    0.26360480696894228,
    0.12938253255560994,
    0.45396000216715038,
    0.40642114332877100,
]
_BROWSER_GAUSS_015 = [
    -0.03766342680316412,
    0.08065835197867159,
    -0.13729813445080333,
    -0.21030241155996920,
    -0.01691869574573623,
    0.19891862125225321,
]


def _assert_stream_matches_browser():
    r = mulberry32(SEED)
    for i, want in enumerate(_BROWSER_UNIFORMS):
        got = r()
        assert abs(got - want) < 1e-15, (
            f"uniform {i}: python {got!r} against browser {want!r}. "
            "The Mulberry32 port has drifted from js/rng.js."
        )
    r = mulberry32(SEED)
    for i, want in enumerate(_BROWSER_GAUSS_015):
        got = gauss(r, 0.15)
        assert abs(got - want) < 1e-15, (
            f"gauss {i}: python {got!r} against browser {want!r}. "
            "The Box-Muller port has drifted from js/rng.js."
        )


_assert_stream_matches_browser()


# --------------------------------------------------------------------------
# The bargain
# --------------------------------------------------------------------------

class Genie:
    """The genie. Hand it a number with ask(); it hands one back.

    form "A" is the bargain as it is first written, Q = 1 + 1/Q, so the test
    is 1 + 1/Q. form "B" is the same bargain rearranged, Q = 1/(Q - 1), so
    the test is 1/(Q - 1). Same equation, same solutions, and the loop does
    not behave the same on the two. That is the whole point of scene 3.

    sigma is the sandstorm. With sigma = 0 the genie answers cleanly; above
    zero its answer arrives blurred by a Gaussian draw, so the same number
    handed over twice comes back differently.
    """

    def __init__(self, start=1.0, sigma=0.0, seed=SEED, form="A"):
        self.start = start
        self.sigma = sigma
        self.seed = seed
        self.form = form
        self.reset()

    def reset(self):
        self.guess = self.start
        self.t = 0
        self._rng = mulberry32(self.seed)

    def test(self, q):
        """What the bargain demands of q, with no storm. Not for the loop."""
        return 1.0 + 1.0 / q if self.form == "A" else 1.0 / (q - 1.0)

    def ask(self, q):
        """Test a number. This is the only thing the genie will do for you."""
        if q <= 0:
            raise ValueError("The genie wants a positive number.")
        if self.form == "B" and q == 1:
            raise ValueError("The genie cannot divide by zero. Try another number.")
        clean = self.test(q)
        self.t += 1
        if self.sigma:
            return clean + gauss(self._rng, self.sigma)
        return clean


def schedule(t, alpha_0=1.0, decay_rate=5.0):
    """This round's step size: large early, small later."""
    return alpha_0 / (1 + t / decay_rate)


def robbins_monro(genie, n_rounds=60, alpha_0=1.0, decay_rate=5.0):
    """The reference solution. The notebook blanks the three lines marked."""
    guesses, losses, learning_rates = [], [], []
    genie.reset()

    for t in range(n_rounds):
        alpha_t = schedule(t, alpha_0, decay_rate)
        learning_rates.append(alpha_t)

        current = genie.guess
        guesses.append(current)

        target = genie.ask(current)

        loss = current - target                       # blank 1
        losses.append(loss)

        step = alpha_t * loss                         # blank 2

        genie.guess = current - step                  # blank 3

    return guesses, losses, learning_rates


# --------------------------------------------------------------------------
# The two readouts of the instrument panel. Both computable from what the
# participant heard, and neither one uses the answer.
# --------------------------------------------------------------------------

def last_third(values):
    return values[(len(values) * 2) // 3:] if values else []


def spread(guesses):
    """Does the loop settle? Standard deviation over the last third."""
    tail = last_third(guesses)
    if len(tail) < 2:
        return float("nan")
    m = sum(tail) / len(tail)
    return math.sqrt(sum((v - m) ** 2 for v in tail) / len(tail))


def average_heard_loss(losses):
    """Is the genie satisfied? Mean of the losses over the last third."""
    tail = last_third(losses)
    return sum(tail) / len(tail) if tail else float("nan")


# --------------------------------------------------------------------------
# Sanity checks. The FS26 convention is that a cheap check precedes the
# expensive run, and that the check catches a wrong SIGN first of all: writing
# loss = target - current while keeping guess = current - step sends the first
# update to exactly Q = 0, which the genie cannot even test.
# --------------------------------------------------------------------------

def sanity_1_deck_table():
    """Storm off, whole step, six rounds from Q = 1: the lecture slide."""
    g = Genie(start=1.0, sigma=0.0)
    guesses, losses, _ = robbins_monro(g, n_rounds=6, alpha_0=1.0, decay_rate=1e18)
    want_q = [1, 2, 1.5, 5 / 3, 1.6, 1.625]
    want_l = [-1, 0.5, -1 / 6, 1 / 15, -0.025, 1 / 104]
    for i, (a, b) in enumerate(zip(guesses, want_q)):
        assert abs(a - b) < 1e-12, f"row {i + 1} guess {a} against {b}"
    for i, (a, b) in enumerate(zip(losses, want_l)):
        assert abs(a - b) < 1e-12, f"row {i + 1} loss {a} against {b}"
    return guesses, losses


def sanity_2_clean_convergence():
    """Storm off, the shrinking step, sixty rounds. This is scene 6's run."""
    g = Genie(start=1.0, sigma=0.0)
    robbins_monro(g, n_rounds=60, alpha_0=1.0, decay_rate=5.0)
    assert f"{g.guess:.10f}" == "1.6180339887", f"{g.guess!r}"
    return g.guess


def sanity_3_noisy_convergence():
    """Storm on, sigma 0.15, 400 rounds, at the pinned seed."""
    g = Genie(start=1.0, sigma=0.15)
    guesses, losses, _ = robbins_monro(g, n_rounds=400, alpha_0=1.0, decay_rate=5.0)
    s = spread(guesses)
    a = average_heard_loss(losses)
    # generous on purpose: these thresholds exist to catch a wrong sign, and
    # not to grade the seed
    assert s < 0.02, f"spread {s}"
    assert abs(a) < 0.05, f"average heard loss {a}"
    return s, a, g.guess


if __name__ == "__main__":
    q, l = sanity_1_deck_table()
    print("sanity 1, the lecture slide's six rows")
    print("  guesses  " + "  ".join(f"{v:.6f}" for v in q))
    print("  losses   " + "  ".join(f"{v:+.6f}" for v in l))
    print()
    print("sanity 2, clean convergence")
    print(f"  after 60 rounds the loop holds {sanity_2_clean_convergence():.10f}")
    print()
    s, a, last = sanity_3_noisy_convergence()
    print("sanity 3, convergence under the storm, seed 20260904")
    print(f"  spread of the last third        {s:.3e}")
    print(f"  average heard loss, last third  {a:.3e}")
    print(f"  resting at                      {last:.6f}")
    print()
    print("All assertions passed.")
