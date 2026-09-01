"""Runnable reference for every number quoted in LECTURE-DEMOS-MENTALISM.md.

House rule 5: every number quoted in prose must be real output of a runnable reference file.
This is that file. Standard library only, no arguments, no input, deterministic.

    python3 lecture-demos-mentalism-reference.py

Sibling of viz-heron-reference.py and cx-house-price-rm-reference.py in this directory.
Each section prints the act it belongs to, so an output line can be traced to the sentence
in the menu that quotes it.

Every random draw is seeded, so the output is byte-for-byte reproducible. The run takes a
couple of minutes: act 7 simulates 20000 searches per row across eight rows plus the majority-vote
comparison, and the Renyi-Ulam game search at the end is exhaustive.

Sections named CUT ON THE REDIRECT are the self-working card principles Carlos rejected on
2026-09-01 because they contain no question-and-answer loop. Their numbers are kept here because
the menu still quotes them where it records why they were cut.
"""

import math
import random
import statistics
from fractions import Fraction
from functools import lru_cache

RULE = "=" * 78


# ---------------------------------------------------------------------------
# Act 1. Fourteen questions, then one
# ---------------------------------------------------------------------------

def bisect_questions(lo, hi, secret):
    """Questions needed to pin an integer secret in [lo, hi] with direction-only answers."""
    q = 0
    while lo < hi:
        mid = (lo + hi) // 2
        q += 1
        if secret <= mid:
            hi = mid
        else:
            lo = mid + 1
    return q


def act1():
    print(RULE)
    print("ACT 1. Fourteen questions, then one")
    print(RULE)

    for hi in (100, 1000, 10 ** 6):
        if hi <= 1000:
            worst = max(bisect_questions(1, hi, s) for s in range(1, hi + 1))
            how = "exhaustive over every secret"
        else:
            secrets = random.Random(0).sample(range(1, hi + 1), 5000)
            worst = max(bisect_questions(1, hi, s) for s in secrets)
            how = "sampled, 5000 secrets, seed 0"
        print(f"  1..{hi:<9d} worst case {worst:2d} questions   "
              f"(ceil(log2 n) = {math.ceil(math.log2(hi))})   [{how}]")

    # The continuous escalation: a real secret in [0, 100], bisected to two decimals.
    lo, hi, secret, q = 0.0, 100.0, 10 * math.pi, 0
    while hi - lo > 0.01:
        mid = (lo + hi) / 2
        q += 1
        if secret <= mid:
            hi = mid
        else:
            lo = mid
    print(f"  continuous [0,100], secret 10*pi = {secret:.6f}: {q} questions, "
          f"bracket width {hi - lo:.4f}")

    # The collapse: the answer now carries the size of the miss, not only its direction.
    guess, secret = 50.0, 37.4
    miss = secret - guess
    guess = guess + miss
    print(f"  magnitude version: guess 50.0, told miss {miss:+.4f}, next guess {guess:.6f}")
    print()


# ---------------------------------------------------------------------------
# Act 2. The six cards
# ---------------------------------------------------------------------------

def act2():
    print(RULE)
    print("ACT 2. The six cards")
    print(RULE)

    cards = {2 ** k: [n for n in range(1, 64) if (n >> k) & 1] for k in range(6)}
    for header, members in sorted(cards.items()):
        print(f"  card headed {header:2d}: {len(members)} numbers, "
              f"first six {members[:6]}, last {members[-1]}")

    ok = all(sum(h for h, m in cards.items() if n in m) == n for n in range(1, 64))
    print(f"  sum of headers of the cards containing n equals n, for all n in 1..63: {ok}")

    # The playing-card variant, offered in the menu and then argued against.
    suits = ["clubs", "diamonds", "hearts", "spades"]
    ranks = ["A"] + [str(i) for i in range(2, 11)] + ["J", "Q", "K"]
    deck = [(r, s) for s in suits for r in ranks]
    index = {c: i for i, c in enumerate(deck)}
    groups = [[c for c in deck if (index[c] >> k) & 1] for k in range(6)]
    deck_ok = all(
        sum(2 ** k for k in range(6) if c in groups[k]) == index[c] for c in deck
    )
    print(f"  52-card variant: {len(groups)} fixed questions, group sizes "
          f"{[len(g) for g in groups]}, every card reconstructs: {deck_ok}")
    print(f"  sequential bisection on 52 cards also costs {math.ceil(math.log2(52))}, "
          f"which is why the menu prefers the numbers to the deck")
    print()


# ---------------------------------------------------------------------------
# Act 3. Lie to me
# ---------------------------------------------------------------------------

def search(secret, p_lie, step, n_questions, seed, start=50.0):
    """One volunteer, direction-only answers, free to lie. `step` maps question number to size."""
    rng = random.Random(seed)
    guess, tail = start, []
    for n in range(1, n_questions + 1):
        truth = 1 if secret > guess else -1
        answer = truth if rng.random() > p_lie else -truth
        guess += step(n) * answer
        tail.append(guess)
    return guess, tail


def act3():
    print(RULE)
    print("ACT 3. Lie to me")
    print(RULE)

    print("  the honesty table, secret 37, start 50, alpha_n = 9/n, 12 runs per row")
    rows = [(0.0, 20), (0.1, 20), (0.1, 40), (0.2, 40), (0.3, 40)]
    for p_lie, n_q in rows:
        finals = [search(37.0, p_lie, lambda n: 9.0 / n, n_q, sd)[0] for sd in range(12)]
        print(f"    lies {p_lie:.0%} of the time, {n_q:2d} questions: "
              f"mean {statistics.mean(finals):6.2f}, "
              f"range {min(finals):6.2f} to {max(finals):6.2f}")

    print("  the counter-demonstration, a constant step of 1, 40 questions")
    for p_lie in (0.0, 0.2):
        final, tail = search(37.0, p_lie, lambda n: 1.0, 40, 0)
        print(f"    lies {p_lie:.0%}: final {final:5.1f}, last ten guesses range "
              f"[{min(tail[-10:]):.1f}, {max(tail[-10:]):.1f}], it orbits and never settles")

    print("  the third rule, a step that shrinks too fast: secret 88, start 5, 83 units to travel")
    cap = 9.0 * (math.pi ** 2) / 6
    print(f"    alpha_n = 9/n^2 can travel at most 9*pi^2/6 = {cap:.3f} units in total, ever")
    for n_q in (100, 1000, 100000):
        stuck, _ = search(88.0, 0.0, lambda n: 9.0 / n ** 2, n_q, 0, start=5.0)
        moving, _ = search(88.0, 0.0, lambda n: 9.0 / n, n_q, 0, start=5.0)
        print(f"    {n_q:6d} questions: alpha=9/n^2 reaches {stuck:8.4f}   "
              f"alpha=9/n reaches {moving:8.4f}")

    harmonic = sum(1.0 / n for n in range(1, 1000001))
    print(f"    harmonic sum to a million = {harmonic:.4f} and still climbing; "
          f"sum of 1/n^2 = pi^2/6 = {(math.pi ** 2) / 6:.6f} and stops")
    print()


# ---------------------------------------------------------------------------
# Act 4. The sealed envelope
# ---------------------------------------------------------------------------

def act4():
    print(RULE)
    print("ACT 4. The sealed envelope")
    print(RULE)

    phi = (1 + 5 ** 0.5) / 2
    print(f"  fourteen terms, that is twelve additions, from various freely chosen pairs")
    for a, b in [(1, 1), (999, 2), (3, 850), (17, 17)]:
        seq = [a, b]
        while len(seq) < 14:
            seq.append(seq[-1] + seq[-2])
        print(f"    start ({a:3d}, {b:3d}) -> last ratio {seq[-1] / seq[-2]:.6f}")
    print(f"    phi = {phi:.10f}")

    # Why it works: the ratio recursion IS the genie's map.
    seq = [7, 3]
    while len(seq) < 12:
        seq.append(seq[-1] + seq[-2])
    identity = all(
        abs(seq[n + 1] / seq[n] - (1 + 1 / (seq[n] / seq[n - 1]))) < 1e-12
        for n in range(2, 9)
    )
    print(f"  identity F(n+1)/F(n) = 1 + 1/(F(n)/F(n-1)), the genie's map, holds term by term: "
          f"{identity}")

    print("  the dark twist: Heron on 2026, 40 steps, the starting sign decides the answer")
    for start in (45.0, 1.0, 1000.0, -3.0, -45.0, -0.5):
        t = start
        for _ in range(40):
            t = (t + 2026 / t) / 2
        print(f"    start {start:9.2f} -> {t:.8f}")
    print()


# ---------------------------------------------------------------------------
# Act 5. The mental square root
# ---------------------------------------------------------------------------

def nearest_int_sqrt(n):
    a = math.isqrt(n)
    return a + 1 if (a + 1) ** 2 - n < n - a * a else a


def act5():
    print(RULE)
    print("ACT 5. The mental square root")
    print(RULE)

    a = 45
    print(f"  sqrt(2026): a = {a}, remainder {2026 - a * a}, so {a} + "
          f"{2026 - a * a}/{2 * a} = {a + (2026 - a * a) / (2 * a):.7f}")
    print(f"  true value {math.sqrt(2026):.10f}")

    print("  the digit doubling, in exact fractions, from 45")
    t = Fraction(45)
    for k in range(1, 4):
        t = (t + Fraction(2026) / t) / 2
        err = abs(float(t) - math.sqrt(2026))
        print(f"    step {k}: {float(t):.17f}  error {err:.3e}")

    print("  worst case of one step over whole ranges, from the nearest whole square root")
    for lo, hi in ((100, 999), (1000, 9999)):
        worst = (0.0, None, None)
        for n in range(lo, hi + 1):
            a = nearest_int_sqrt(n)
            err = abs(a + (n - a * a) / (2 * a) - math.sqrt(n))
            if err > worst[0]:
                worst = (err, n, a)
        print(f"    N in [{lo}, {hi}]: worst error {worst[0]:.4f} at N = {worst[1]} "
              f"(nearest whole root {worst[2]})")
    print()


# ---------------------------------------------------------------------------
# Set aside in the menu, kept here because the menu quotes its numbers
# ---------------------------------------------------------------------------

def set_aside():
    print(RULE)
    print("SET ASIDE. The cosine fixed point, and its degrees-mode hazard")
    print(RULE)

    for x0 in (0.0, 1.0, -5.0, 100.0, 42.0, 3.14159):
        x = x0
        for _ in range(60):
            x = math.cos(x)
        print(f"  start {x0:8.4f} -> after 60 presses {x:.10f}")

    x, presses = 1.0, 0
    while abs(x - math.cos(x)) > 5e-7:
        x = math.cos(x)
        presses += 1
    print(f"  presses needed from 1.0 to settle to six decimals: {presses}")

    xd = 50.0
    for _ in range(200):
        xd = math.cos(math.radians(xd))
    print(f"  a calculator left in DEGREES mode converges to {xd:.10f} instead, "
          f"which destroys the effect in a mixed room")

    print()


# ---------------------------------------------------------------------------
# Cut on the redirect: the Kruskal count
# ---------------------------------------------------------------------------

KRUSKAL_TRIALS = 200000


def shuffled_values(rng, court=5):
    """A shuffled deck as jump lengths. Ace is 1, pips are face value, court cards are `court`."""
    values = []
    for _ in range(4):
        values += [1] + list(range(2, 11)) + [court, court, court]
    rng.shuffle(values)
    return values


def final_landing(values, start):
    """Follow the chain from `start`, return the last index actually landed on."""
    i, last = start, start
    while i < len(values):
        last = i
        i += values[i]
    return last


def cut_kruskal():
    print(RULE)
    print("CUT ON THE REDIRECT. The Kruskal count")
    print(RULE)
    print(f"  {KRUSKAL_TRIALS} shuffled decks per row, ace 1, pips face value")

    rng = random.Random(20260904)
    cases = [
        ("two random starts among the first ten", 5, lambda r: (r.randrange(10), r.randrange(10))),
        ("starts at card 1 and card 10, widest spread", 5, lambda r: (0, 9)),
        ("Carlos at card 1, spectator anywhere in 1..10", 5, lambda r: (0, r.randrange(10))),
        ("same, but court cards count as 1", 1, lambda r: (0, r.randrange(10))),
    ]
    for label, court, pick in cases:
        hits = 0
        for _ in range(KRUSKAL_TRIALS):
            values = shuffled_values(rng, court)
            a, b = pick(rng)
            if final_landing(values, a) == final_landing(values, b):
                hits += 1
        print(f"    {label:<46s} coalesce {hits / KRUSKAL_TRIALS:.4f}")
    print()


# ---------------------------------------------------------------------------
# Cut on the redirect: six one seven four
# ---------------------------------------------------------------------------

def kaprekar_step(n, width=4):
    s = f"{n:0{width}d}"
    return int("".join(sorted(s, reverse=True))) - int("".join(sorted(s)))


def cut_kaprekar():
    print(RULE)
    print("CUT ON THE REDIRECT. Six one seven four")
    print(RULE)

    for width, constant in ((4, 6174), (3, 495)):
        excluded, arrived, worst, dist = 0, 0, (0, None), {}
        for n in range(10 ** width):
            if len(set(f"{n:0{width}d}")) == 1:
                excluded += 1
                continue
            x, k = n, 0
            while x != constant and k <= 20:
                x = kaprekar_step(x, width)
                k += 1
            if x == constant:
                arrived += 1
                dist[k] = dist.get(k, 0) + 1
                if k > worst[0]:
                    worst = (k, n)
        print(f"  {width}-digit: {excluded} repdigits excluded, all other {arrived} reach "
              f"{constant}, worst case {worst[0]} steps (e.g. {worst[1]:0{width}d})")
        print(f"    kaprekar({constant}) = {kaprekar_step(constant, width)}, so it is a fixed point")
        if width == 4:
            print(f"    step-count distribution: {dict(sorted(dist.items()))}")
    print()


# ---------------------------------------------------------------------------
# Cut on the redirect: cut and turn over
# ---------------------------------------------------------------------------

def cato(packet, rng):
    """Cut anywhere, then turn the top two cards over as one block. True means face up."""
    c = rng.randrange(len(packet))
    packet = packet[c:] + packet[:c]
    packet[0], packet[1] = (not packet[1]), (not packet[0])
    return packet


def cut_cato():
    print(RULE)
    print("CUT ON THE REDIRECT. Cut and turn over")
    print(RULE)

    rng = random.Random(7)
    trials = 20000
    for n in (10, 20, 52):
        equal = 0
        for _ in range(trials):
            packet = [False] * n
            for _ in range(rng.randrange(5, 40)):
                packet = cato(packet, rng)
            if sum(packet[0::2]) == sum(packet[1::2]):
                equal += 1
        print(f"  packet of {n:2d}: the two alternate piles hold equally many face-up cards in "
              f"{equal}/{trials} trials")
    print()


# ---------------------------------------------------------------------------
# Cut on the redirect: eight perfect shuffles, and the down-under deal
# ---------------------------------------------------------------------------

def out_faro(d):
    half = len(d) // 2
    top, bottom = d[:half], d[half:]
    return [c for pair in zip(top, bottom) for c in pair]


def down_under_survivor(n):
    """Deal the top card away, put the next on the bottom, repeat. Return the starting position."""
    from collections import deque
    d = deque(range(1, n + 1))
    while len(d) > 1:
        d.popleft()
        if d:
            d.append(d.popleft())
    return d[0]


def cut_faro():
    print(RULE)
    print("CUT ON THE REDIRECT. Eight perfect shuffles, and the down-under deal")
    print(RULE)

    for n in (52, 8, 16, 32, 64):
        d, k = list(range(n)), 0
        while True:
            d = out_faro(d)
            k += 1
            if d == list(range(n)):
                break
        print(f"  {n:2d} cards: {k} perfect out-faro shuffles restore the original order")

    print("  the down-under deal, a cheaper relative:")
    for n in (8, 16, 21, 52, 64):
        print(f"    {n:2d} cards: survivor started at position {down_under_survivor(n):2d}   "
              f"(largest power of two at or below {n} is {2 ** (n.bit_length() - 1)})")
    print()


# ---------------------------------------------------------------------------
# Set aside in the menu, kept here because the menu quotes its numbers
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Act 6. Twenty-one cards, and the bracket that shrinks
# ---------------------------------------------------------------------------

def deal_round(cards, secret, lie=False):
    """Deal into three columns, spectator names a column, gather it into the middle."""
    cols = [cards[0::3], cards[1::3], cards[2::3]]
    named = next(i for i, c in enumerate(cols) if secret in c)
    if lie:
        named = (named + 1) % 3
    return cols[(named + 1) % 3] + cols[named] + cols[(named + 2) % 3]


def act6():
    print(RULE)
    print("ACT 6. Twenty-one cards, and the bracket that shrinks")
    print(RULE)

    for deals in range(4):
        positions = set()
        for secret in range(21):
            cards = list(range(21))
            for _ in range(deals):
                cards = deal_round(cards, secret)
            positions.add(cards.index(secret) + 1)
        lo, hi = min(positions), max(positions)
        print(f"  after {deals} deals: {len(positions):2d} possible positions, "
              f"range {lo} to {hi}, width {hi - lo + 1}")

    print(f"  three answers of three options distinguish {3 ** 3} things, so 21 cards waste "
          f"{1 - 21 / 27:.0%} of what they collect")

    wrong = 0
    for secret in range(21):
        for lie_round in range(3):
            cards = list(range(21))
            for r in range(3):
                cards = deal_round(cards, secret, lie=(r == lie_round))
            if cards[10] != secret:
                wrong += 1
    print(f"  one lie in any of the 3 rounds, any of the 21 cards: names the WRONG card in "
          f"{wrong}/{21 * 3} cases")
    print()


# ---------------------------------------------------------------------------
# Act 7. The liar. Excluding against correcting, on a row of 52 cards
# ---------------------------------------------------------------------------

DECK = 52


def exclude(secret, p_lie, n_questions, seed):
    """Bisection: every answer throws candidates away, and a discarded card never comes back."""
    rng = random.Random(seed)
    lo, hi = 1, DECK
    for _ in range(n_questions):
        if lo >= hi:
            break
        mid = (lo + hi) // 2
        truth = secret <= mid
        answer = truth if rng.random() > p_lie else (not truth)
        if answer:
            hi = mid
        else:
            lo = mid + 1
    return lo


def correct(secret, p_lie, n_questions, seed, c=13.0, start=26.0):
    """Robbins-Monro: one guess, nudged by a step that shrinks as c/n."""
    rng = random.Random(seed)
    guess = start
    for n in range(1, n_questions + 1):
        truth = 1 if secret > guess else -1
        answer = truth if rng.random() > p_lie else -truth
        guess = min(float(DECK), max(1.0, guess + (c / n) * answer))
    return round(guess)


def exclude_majority(secret, p_lie, votes, seed):
    """The fix a manager proposes: ask each bisection question several times and take the majority."""
    rng = random.Random(seed)
    lo, hi = 1, DECK
    while lo < hi:
        mid = (lo + hi) // 2
        truth = secret <= mid
        tally = 0
        for _ in range(votes):
            tally += 1 if (truth if rng.random() > p_lie else (not truth)) else -1
        if tally > 0:
            hi = mid
        else:
            lo = mid + 1
    return lo


def act7():
    print(RULE)
    print("ACT 7. The liar")
    print(RULE)

    trials, n_q = 20000, 30
    print(f"  {n_q} questions per method, {trials} trials per row, alpha_n = 13/n")
    print(f"  {'lies':>16} {'method':>11} {'exact':>7} {'within 1':>9} "
          f"{'median err':>11} {'worst err':>10}")
    labels = [(0.0, "never"), (0.1, "1 answer in 10"), (0.2, "1 answer in 5"),
              (0.3, "3 answers in 10")]
    for p_lie, label in labels:
        for name, fn in (("excluding", exclude), ("correcting", correct)):
            errors = []
            for t in range(trials):
                secret = random.Random(t).randrange(1, DECK + 1)
                errors.append(abs(fn(secret, p_lie, n_q, t) - secret))
            n = len(errors)
            print(f"  {label:>16} {name:>11} {sum(e == 0 for e in errors) / n:7.3f} "
                  f"{sum(e <= 1 for e in errors) / n:9.3f} "
                  f"{statistics.median(errors):11.1f} {max(errors):10d}")

    print()
    print("  the fix a manager proposes, against the correcting rule at the same budget:")
    for p_lie, label in labels[1:]:
        row = []
        for votes, budget in ((3, 18), (5, 30)):
            hits = sum(
                1 for t in range(trials)
                if exclude_majority(random.Random(t).randrange(1, DECK + 1), p_lie, votes, t)
                == random.Random(t).randrange(1, DECK + 1)
            )
            row.append(f"x{votes} votes ({budget} questions) {hits / trials:.3f}")
        hits = sum(
            1 for t in range(trials)
            if correct(random.Random(t).randrange(1, DECK + 1), p_lie, 30, t)
            == random.Random(t).randrange(1, DECK + 1)
        )
        print(f"    {label:>16}: {row[0]} | {row[1]} | correcting (30 questions) {hits / trials:.3f}")

    print()
    print("  how much the step constant matters, at 30 questions and one lie in ten:")
    for c in (9.0, 13.0, 18.0, 26.0):
        errors = []
        for t in range(5000):
            secret = random.Random(t).randrange(1, DECK + 1)
            errors.append(abs(correct(secret, 0.1, 30, t, c=c) - secret))
        n = len(errors)
        print(f"    c={c:5.1f}: exact {sum(e == 0 for e in errors) / n:.3f}  "
              f"within 1 {sum(e <= 1 for e in errors) / n:.3f}")

    print()
    print("  the third option, designing the questioning for the lie (Berlekamp's counting bound):")
    for k in range(3):
        q = 1
        while DECK * sum(math.comb(q, i) for i in range(k + 1)) > 2 ** q:
            q += 1
        print(f"    {DECK} cards with at most {k} lie(s): at least {q:2d} questions")
    for q in range(8, 13):
        if _ulam_winnable(DECK, 0, q):
            print(f"    exact game search: {q} questions suffice for {DECK} cards with one lie")
            break
    print()


@lru_cache(maxsize=None)
def _ulam_winnable(a0, a1, q):
    """Renyi-Ulam game. State: candidates consistent with 0 lies and with 1 lie so far."""
    if a0 + a1 <= 1:
        return a0 + a1 == 1
    if q == 0:
        return False
    for y0 in range(a0 + 1):
        for y1 in range(a1 + 1):
            if (_ulam_winnable(y0, y1 + (a0 - y0), q - 1)
                    and _ulam_winnable(a0 - y0, (a1 - y1) + y0, q - 1)):
                return True
    return False


if __name__ == "__main__":
    act1()
    act2()
    act3()
    act4()
    act5()
    act6()
    act7()
    # Act 8, warmer and colder, is a live demonstration with nothing to compute.
    cut_kruskal()
    cut_kaprekar()
    cut_cato()
    cut_faro()
    set_aside()
