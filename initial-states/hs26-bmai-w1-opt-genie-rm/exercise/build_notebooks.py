#!/usr/bin/env python3
"""Generate the student and solutions notebooks from one source.

THE ONE RULE THAT MATTERS IN THIS DIRECTORY: the two .ipynb files are
GENERATED. Edit this file and rerun it. A hand edit to a notebook is
destroyed silently the next time this runs.

That is how the FS26 student and solutions sync rule holds by construction
rather than by discipline. The rule, measured on FS26's own cleanest pair
(rag_exercise): the two notebooks have identical cell counts and differ only
in the bodies of the task cells, with banner comments, hint comments and
print statements byte identical. Here the builder asserts exactly that
before it writes anything.

    python3 exercise/build_notebooks.py

It ends on "All assertions passed." and rewrites both notebooks byte
identically on every run.

Every number quoted in a markdown cell is computed here, from genie.py, and
asserted. Nothing is typed from memory.
"""

import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import genie as G  # noqa: E402  (the sys.path line has to come first)

NOTEBOOK_VERSION = "v1.0"
STUDENT = os.path.join(HERE, "genie_robbins_monro.ipynb")
SOLUTIONS = os.path.join(HERE, "genie_robbins_monro_solutions.ipynb")


# ---------------------------------------------------------------------------
# every number the markdown quotes, computed here
# ---------------------------------------------------------------------------

def measure():
    m = {}

    deck_q, deck_l = G.sanity_1_deck_table()
    m["deck_q"] = "  ".join(f"{v:g}" for v in deck_q)
    m["deck_l"] = "  ".join(f"{v:+g}" for v in deck_l)

    m["clean"] = f"{G.sanity_2_clean_convergence():.10f}"

    s, a, last = G.sanity_3_noisy_convergence()
    m["storm_spread"] = f"{s:.3e}"
    m["storm_avg"] = f"{a:.3e}"
    m["storm_last"] = f"{last:.6f}"

    # form B with the whole step, from 1.7, until the genie refuses
    g = G.Genie(start=1.7, sigma=0.0, form="B")
    walk = []
    q = 1.7
    for _ in range(8):
        walk.append(q)
        if q <= 0:
            break
        q = q - 1.0 * (q - g.test(q))
    m["fleeB"] = " -> ".join(f"{v:.4f}" for v in walk[:5])
    m["fleeB_out"] = f"{walk[4]:.1f}"
    assert walk[4] < 0, walk

    # form B with a partial step, from the same start
    g2 = G.Genie(start=1.7, sigma=0.0, form="B")
    guesses, _, _ = G.robbins_monro(g2, n_rounds=200, alpha_0=0.3, decay_rate=1e18)
    m["fixedB"] = f"{g2.guess:.10f}"
    assert m["fixedB"].startswith("1.61803398"), m["fixedB"]

    # the fast shrinking schedule, storm on: quiet, and wrong
    g3 = G.Genie(start=1.0, sigma=0.15)
    g3.reset()
    q, gu, lo = g3.guess, [], []
    for t in range(400):
        alpha = 1.0 / ((t + 1) ** 2)
        gu.append(q)
        target = g3.ask(q)
        loss = q - target
        lo.append(loss)
        q = q - alpha * loss
    m["fast_spread"] = f"{G.spread(gu):.3e}"
    m["fast_avg"] = f"{G.average_heard_loss(lo):.3e}"
    m["fast_last"] = f"{q:.6f}"
    m["fast_returns"] = f"{G.Genie(form='A').test(q):.6f}"
    assert G.spread(gu) < G.spread(
        G.robbins_monro(G.Genie(start=1.0, sigma=0.15), 400)[0]
    ), "the fast schedule should look calmer than the good one"
    assert abs(G.average_heard_loss(lo)) > 0.1, "and it should still be wrong"

    return m


# ---------------------------------------------------------------------------
# cell helpers
# ---------------------------------------------------------------------------

def md(text):
    return {"cell_type": "markdown", "metadata": {}, "source": _lines(text)}


def code(text):
    return {"cell_type": "code", "execution_count": None, "metadata": {},
            "outputs": [], "source": _lines(text)}


def _lines(text):
    out = text.strip("\n").split("\n")
    return [ln + "\n" for ln in out[:-1]] + [out[-1]]


def setup_source():
    """genie.py, inlined, minus its command line block.

    Carrying the module inside the notebook rather than cloning a repository
    is the same call the house-price exercise made: one cell, no network, and
    a participant on a hotel connection is not stuck.
    """
    src = io.open(os.path.join(HERE, "genie.py"), encoding="utf-8").read()
    cut = src.index('if __name__ == "__main__":')
    body = src[:cut].rstrip()
    return ("# @title Setup: the genie. Run this cell, then leave it alone.\n"
            f"# NOTEBOOK_VERSION = \"{NOTEBOOK_VERSION}\"\n"
            "# This is exercise/genie.py, carried inline so the notebook needs\n"
            "# no clone and no network. Do not edit it here.\n\n"
            + body + "\n\nprint(\"The genie is ready.\")")


# ---------------------------------------------------------------------------
# the tasks. Each one is (banner, student body, solution body). Everything
# outside the body is byte identical between the two notebooks.
# ---------------------------------------------------------------------------

TASKS = [
    dict(
        n=1,
        title="Hear what the genie says",
        why=(
            "You may test any positive number. Testing is free. Nothing else "
            "is on offer: the genie will not tell you the answer, and there "
            "is no formula in front of you.\n\n"
            "Hand it three numbers of your own choosing and look at the third "
            "column. The loss is your number minus the number that came back."
        ),
        todo=[
            "Fill in the one blank so that `loss` is your number minus the target.",
            "Run the cell. Try three numbers you pick yourself before reading on.",
        ],
        banner=(
            "# ----- Task 1: hear what the genie says -----\n"
            "genie = Genie(start=1.0, sigma=0.0)\n"
            "\n"
            "for q in [1.0, 2.0, 1.5]:\n"
            "    target = genie.ask(q)"
        ),
        student=(
            "    # COMPLETE THIS LINE: your number minus what came back\n"
            "    loss = ___\n"
        ),
        solution=(
            "    # COMPLETE THIS LINE: your number minus what came back\n"
            "    loss = q - target\n"
        ),
        tail=(
            "    verdict = \"too big\" if loss > 0 else \"too small\"\n"
            "    print(f\"Q = {q:8.4f}   target = {target:8.4f}   \"\n"
            "          f\"loss = {loss:+8.4f}   {verdict}\")"
        ),
        after=(
            "Every row is three numbers you could have written on paper. The "
            "verdict is the sign of the loss and nothing more.\n\n"
            "Discussion, with no code:\n\n"
            "- What would it mean for a number to have a loss of exactly zero?\n"
            "- The genie never said which way to move. Where did the verdict "
            "come from?\n"
            "- You now have a number in front of you that you did not have "
            "before you asked. What is the cheapest thing to do with it?"
        ),
    ),
    dict(
        n=2,
        title="The whole step",
        why=(
            "The cheapest thing to do with the target is to hand it straight "
            "back. That move has two descriptions and they are the same "
            "instruction:\n\n"
            "```\n"
            "Q <- target          move onto the number that came back\n"
            "Q <- Q - loss        subtract the whole loss\n"
            "```\n\n"
            "They agree because the loss is Q minus the target. Write the "
            "second one, because it is the one with a dial on it."
        ),
        todo=[
            "Fill in the blank with the second description, in terms of "
            "`current` and `loss`.",
            "Run it. The six rows are the ones on the lecture slide.",
        ],
        banner=(
            "# ----- Task 2: the whole step -----\n"
            "genie = Genie(start=1.0, sigma=0.0)\n"
            "current = genie.guess\n"
            "\n"
            "for t in range(6):\n"
            "    target = genie.ask(current)\n"
            "    loss = current - target\n"
            "    print(f\"{t+1}   Q = {current:10.6f}   target = {target:10.6f}   \"\n"
            "          f\"loss = {loss:+10.6f}\")"
        ),
        student=(
            "    # COMPLETE THIS LINE: subtract the whole loss\n"
            "    current = ___\n"
        ),
        solution=(
            "    # COMPLETE THIS LINE: subtract the whole loss\n"
            "    current = current - loss\n"
        ),
        tail="",
        after=(
            "Expected, and this is the check that catches a wrong sign first:\n\n"
            "```\n"
            "guesses  {deck_q}\n"
            "losses   {deck_l}\n"
            "```\n\n"
            "Discussion, with no code:\n\n"
            "- The losses alternate in sign. What does the guess do as a "
            "result?\n"
            "- Writing `loss = target - current` while keeping "
            "`current = current - loss` sends the first update to exactly "
            "zero, and the genie cannot test zero. Why is that a useful way "
            "to fail?\n"
            "- Nothing here is named yet. What have you actually got?"
        ),
    ),
    dict(
        n=3,
        title="The same bargain, written the other way",
        why=(
            "Multiply the bargain by Q and it says `Q^2 = Q + 1`, so "
            "`Q(Q - 1) = 1`, so `Q = 1/(Q - 1)`. One equation, two ways of "
            "writing it, the same solutions.\n\n"
            "Nothing else changes. Same whole step, same genie, same rules. "
            "This cell is written for you: run it and watch."
        ),
        todo=[
            "Run the cell as it stands.",
            "Read the last line it prints before it stops.",
        ],
        banner=(
            "# ----- Task 3: form B, and the whole step -----\n"
            "genie = Genie(start=1.7, sigma=0.0, form=\"B\")\n"
            "current = genie.guess\n"
            "\n"
            "for t in range(8):\n"
            "    try:\n"
            "        target = genie.ask(current)\n"
            "    except ValueError as refusal:\n"
            "        print(f\"{t+1}   Q = {current:10.4f}   {refusal}\")\n"
            "        break\n"
            "    loss = current - target\n"
            "    print(f\"{t+1}   Q = {current:10.4f}   target = {target:10.4f}   \"\n"
            "          f\"loss = {loss:+10.4f}\")\n"
            "    current = current - loss"
        ),
        student="",
        solution="",
        tail="",
        after=(
            "The run goes\n\n"
            "```\n"
            "{fleeB}\n"
            "```\n\n"
            "and after four tests it has handed over {fleeB_out}, which the "
            "bargain refuses. The whole step did not fail because the bargain "
            "changed. It failed because the bargain was written differently.\n\n"
            "Discussion, with no code:\n\n"
            "- Task 2 and task 3 solve the same equation. Which one was lucky?\n"
            "- The loop is running away from something. What?\n"
            "- You have one dial you have not turned yet."
        ),
    ),
    dict(
        n=4,
        title="Move only part of the way",
        why=(
            "The whole step subtracts the whole loss. Subtract part of it "
            "instead, and call the fraction alpha:\n\n"
            "```\n"
            "Q <- Q - alpha * loss\n"
            "```\n\n"
            "With alpha = 1 this is task 2 again. Run the sweep and find "
            "where form B starts to behave."
        ),
        todo=[
            "Fill in the update, using `alpha`.",
            "Run it. Read which values of alpha settle and which do not.",
        ],
        banner=(
            "# ----- Task 4: a partial step -----\n"
            "def run(alpha, form, start, n=200):\n"
            "    genie = Genie(start=start, sigma=0.0, form=form)\n"
            "    current = genie.guess\n"
            "    for t in range(n):\n"
            "        if current <= 0 or (form == \"B\" and current == 1):\n"
            "            return None                # left the bargain\n"
            "        target = genie.ask(current)\n"
            "        loss = current - target"
        ),
        student=(
            "        # COMPLETE THIS LINE: subtract only alpha of the loss\n"
            "        current = ___\n"
        ),
        solution=(
            "        # COMPLETE THIS LINE: subtract only alpha of the loss\n"
            "        current = current - alpha * loss\n"
        ),
        tail=(
            "    return current\n"
            "\n"
            "for alpha in [0.2, 0.3, 0.5, 0.6, 0.7, 1.0]:\n"
            "    out = run(alpha, \"B\", 1.7)\n"
            "    print(f\"form B   alpha = {alpha:4.2f}   \"\n"
            "          + (\"left the bargain\" if out is None else f\"rests at {out:.9f}\"))"
        ),
        after=(
            "At alpha = 0.30 the loop on form B rests at {fixedB}, which is "
            "where task 2 arrived by the other route. Moving part of the way "
            "does more than tidy up: it changes which answer the loop reaches.\n\n"
            "Discussion, with no code:\n\n"
            "- There is a value of alpha above which form B stops settling. "
            "Between which two of the values you ran does it sit?\n"
            "- Try the same sweep on form A. Where is its edge, and why is it "
            "in a different place?\n"
            "- Nothing has been noisy yet. Every number the genie returned "
            "was exact."
        ),
    ),
    dict(
        n=5,
        title="The sandstorm",
        why=(
            "Now the wind rises. The genie's answer arrives blurred, so the "
            "same number handed over twice comes back differently.\n\n"
            "Two readouts, and both are computable from what you heard. "
            "Neither one uses the answer, because you still do not have it.\n\n"
            "- **spread**: the standard deviation of your guesses over the "
            "last third of the run. Did the loop settle?\n"
            "- **average heard loss**: the mean of the losses over the last "
            "third. Is the genie satisfied?"
        ),
        todo=[
            "Fill in the update, using this round's `alpha_t`.",
            "Run it. Compare the three schedules on both readouts.",
        ],
        banner=(
            "# ----- Task 5: three schedules under the storm -----\n"
            "def storm(alpha_of_t, n=400):\n"
            "    genie = Genie(start=1.0, sigma=0.15)\n"
            "    current, guesses, losses = genie.guess, [], []\n"
            "    for t in range(n):\n"
            "        alpha_t = alpha_of_t(t)\n"
            "        guesses.append(current)\n"
            "        target = genie.ask(current)\n"
            "        loss = current - target\n"
            "        losses.append(loss)"
        ),
        student=(
            "        # COMPLETE THIS LINE: the same update, with this round's step\n"
            "        current = ___\n"
        ),
        solution=(
            "        # COMPLETE THIS LINE: the same update, with this round's step\n"
            "        current = current - alpha_t * loss\n"
        ),
        tail=(
            "    return spread(guesses), average_heard_loss(losses), current\n"
            "\n"
            "for name, rule in [(\"alpha = 1\",         lambda t: 1.0),\n"
            "                   (\"alpha = 0.2\",       lambda t: 0.2),\n"
            "                   (\"alpha = 1/(t+1)\",   lambda t: 1.0 / (t + 1))]:\n"
            "    s, a, last = storm(rule)\n"
            "    print(f\"{name:18s} spread {s:9.3e}   avg heard loss {a:+9.3e}   \"\n"
            "          f\"rests at {last:.6f}\")"
        ),
        after=(
            "The constant step settles into a band and the band never closes, "
            "however long you run. Only the shrinking step closes it.\n\n"
            "Discussion, with no code:\n\n"
            "- Both readouts have to be small at once. What does a small "
            "spread with a large average loss describe?\n"
            "- The storm never gets weaker. What is it about a shrinking step "
            "that makes the wobble cancel?\n"
            "- Run the same three schedules a second time. Why is the answer "
            "identical?"
        ),
    ),
    dict(
        n=6,
        title="Stretch: why not shrink faster",
        why=(
            "If shrinking is good, shrink hard. Add `alpha = 1/(t+1)^2` and "
            "look at both readouts before you decide it wins.\n\n"
            "This cell is written for you."
        ),
        todo=[
            "Run it.",
            "Compare its spread with the shrinking schedule from task 5.",
        ],
        banner=(
            "# ----- Task 6: the schedule that stops too early -----\n"
            "s, a, last = storm(lambda t: 1.0 / (t + 1) ** 2)\n"
            "print(f\"alpha = 1/(t+1)^2  spread {s:9.3e}   avg heard loss {a:+9.3e}\")\n"
            "print(f\"it rests at {last:.6f}, and the genie returns \"\n"
            "      f\"{Genie(form='A').test(last):.6f} for that number\")"
        ),
        student="",
        solution="",
        tail="",
        after=(
            "It has the smallest spread of all four, {fast_spread}, and an "
            "average heard loss of {fast_avg}. It rests at {fast_last}, where "
            "the genie returns {fast_returns}. It settled beautifully, on a "
            "number the genie refuses, and it looks more settled than the row "
            "that is right.\n\n"
            "So the step sizes have to satisfy two demands at once, and this "
            "is Robbins-Monro:\n\n"
            "- they must add up without bound, so the loop can still travel "
            "from any start;\n"
            "- their squares must add up to something finite, so the wobble "
            "eventually cancels.\n\n"
            "`alpha_t = 1/t` satisfies both. `alpha_t = 1/t^2` fails the "
            "first, and the run above is what that failure looks like from "
            "the outside.\n\n"
            "Discussion, with no code:\n\n"
            "- Which of the two demands does a constant alpha fail?\n"
            "- The clean statement is that when the steps add up to something "
            "finite, a fixed fraction of the starting error survives forever. "
            "Check it: run the fast schedule from a start far away, with the "
            "storm off, and see how much of the distance it covers.\n"
            "- With the storm off and a shrinking step, the loop reaches "
            "{clean}. That number has a name. What is it?"
        ),
    ),
]


def build(solutions):
    m = measure()
    cells = [
        md(
            "# The genie game: deriving Robbins-Monro\n"
            "\n"
            "CAS BMAI HS26, weekend 1, Friday 10:00. Slug "
            "`hs26-bmai-w1-opt-genie-rm`. TAs Jinlei and Suei-Wen.\n"
            "\n"
            "Lost in the desert, you rub a lamp. The genie will set you free, "
            "on one condition:\n"
            "\n"
            "> Name me a positive number that my own test accepts.\n"
            "\n"
            "Its test is `Q -> 1 + 1/Q`. You are free when the number you hand "
            "in and the number that comes back are the same number. You may "
            "test as often as you like. You may not ask for the answer, and "
            "there is no computer algebra in this notebook.\n"
            "\n"
            "By the end you will have invented the Robbins-Monro algorithm, "
            "which is the loop the 11:00 session calls stochastic gradient "
            "descent.\n"
            "\n"
            + ("**Solutions notebook.** Every blank is filled in. Hand the "
               "student version to participants.\n"
               if solutions else
               "Six tasks. Each one has a cell with a blank marked `___`. "
               "Fill it in and run the cell.\n")
        ),
        code(setup_source()),
    ]

    for task in TASKS:
        body = task["solution"] if solutions else task["student"]
        todo = "\n".join(f"{i + 1}. {t}" for i, t in enumerate(task["todo"]))
        cells.append(md(
            "---\n"
            f"## Task {task['n']}: {task['title']}\n"
            "\n"
            f"{task['why']}\n"
            "\n"
            "**What you need to do**\n"
            "\n"
            f"{todo}"
        ))
        src = task["banner"]
        if body:
            src = src + "\n" + body.rstrip("\n")
        if task["tail"]:
            src = src + "\n" + task["tail"]
        cells.append(code(src))
        cells.append(md(
            "### What just happened?\n"
            "\n"
            + task["after"].format(**m)
        ))

    cells.append(md(
        "---\n"
        "## Where this goes next\n"
        "\n"
        "| the genie's loop | the model's loop |\n"
        "|---|---|\n"
        "| `Q`, your guess | `w`, the weight in the model |\n"
        "| the genie's test, `1 + 1/Q` | what one house's price demands of `w` |\n"
        "| `loss = Q - target` | the residual on that one house |\n"
        "| `Q <- Q - alpha_t * loss` | the same update |\n"
        "| the sandstorm | one house at a time instead of all of them |\n"
        "| `alpha_t` shrinking | the learning rate schedule |\n"
        "| solve it in closed form | there is no formula to solve |\n"
        "\n"
        "The last row is the one that matters. For the genie the quadratic "
        "formula genuinely would have worked. For a model it does not exist, "
        "and that is why the loop is the method rather than a curiosity.\n"
        "\n"
        "The browser page for this exercise is `../index.html`, opened "
        "straight from disk. Press `t` for dark mode and the arrow keys to "
        "step."
    ))

    return {
        "cells": cells,
        "metadata": {
            "kernelspec": {"display_name": "Python 3", "language": "python",
                           "name": "python3"},
            "language_info": {"name": "python"},
            "colab": {"provenance": [], "toc_visible": True},
        },
        "nbformat": 4,
        "nbformat_minor": 0,
    }


def write(path, nb):
    text = json.dumps(nb, indent=1, ensure_ascii=True) + "\n"
    io.open(path, "w", encoding="utf-8").write(text)
    return text


def main():
    student = build(solutions=False)
    solutions = build(solutions=True)

    # the FS26 sync rule, asserted rather than hoped for
    assert len(student["cells"]) == len(solutions["cells"]), "cell counts differ"
    differing = [i for i, (a, b) in enumerate(zip(student["cells"], solutions["cells"]))
                 if a["source"] != b["source"]]
    task_cells = [i for i, c in enumerate(student["cells"])
                  if c["cell_type"] == "code" and "----- Task" in "".join(c["source"])]
    blank_tasks = [t["n"] for t in TASKS if t["student"]]
    intro = [0]
    assert set(differing) - set(intro) <= set(task_cells), (
        f"cells {sorted(set(differing) - set(intro) - set(task_cells))} differ "
        "and are not task cells"
    )
    assert len(set(differing) & set(task_cells)) == len(blank_tasks), (
        f"{len(set(differing) & set(task_cells))} task cells differ, "
        f"expected {len(blank_tasks)}"
    )

    # nothing but the body may move inside a task cell
    for i in set(differing) & set(task_cells):
        a = "".join(student["cells"][i]["source"])
        b = "".join(solutions["cells"][i]["source"])
        for line in a.split("\n"):
            if "___" in line or line.strip() == "":
                continue
            assert line in b, f"task cell {i}: line moved or vanished: {line!r}"

    ts = write(STUDENT, student)
    tl = write(SOLUTIONS, solutions)

    print(f"{len(student['cells'])} cells each")
    print(f"{len(differing)} cells differ: the intro plus task cells "
          f"{sorted(t['n'] for t in TASKS if t['student'])}")
    print(f"student   {len(ts):7d} bytes  {STUDENT}")
    print(f"solutions {len(tl):7d} bytes  {SOLUTIONS}")
    print()
    print("All assertions passed.")


if __name__ == "__main__":
    main()
