# Issue 6: Handover to Ghali and Suei-Wen

## Goal

Bring the written record back into agreement with the code after the other five issues have
moved it, and hand the exercise to the two TAs who will run it. This issue is last on purpose:
it records what the others did. Its output is the state in which a TA who has never read this
directory can pick the exercise up, run it, and teach it.

## Dependencies

- **Issue 1** (TA card): the card is the artifact this handover is built around.
- **Issue 2** (Figures audit): the fate of `plot_houses` is decided there and must be recorded here.
- **Issue 3** (Check coverage): the coverage table it writes is quoted here.
- **Issue 4** (Second feature): if it has run, every number in the printed material moved.
- **Issue 5** (Colab and hosting): the hosting answer and the Colab run belong in the README.

Run this issue after all five. If one of them has not been done, say so in the README under
`Not done` rather than quietly dropping it from the list.

## Context

Six documents in this directory make claims about the code, and every one of them can go stale:
`README.md`, `CLAUDE.md`, `data/README.md`, `data/CLAUDE.md`, `notebooks/CLAUDE.md` and
`precompute/CLAUDE.md`. The house rule they all follow is that a number appearing in prose is
real output of `precompute/reference.py`, copied from a run, and that a claim about behaviour
names what was run and what was seen.

Two failure modes to watch for, both already caught once in this directory:

1. **A quoted number that is measured, not pinned.** The README and `precompute/CLAUDE.md` both
   quoted a wall clock of `0.94 s` as though it were an expected value. It is timed on the run
   and it differs on every machine. A measured quantity is described, never pinned.
2. **A document naming a file that does not exist.** The README referred to issues 04, 05 and 06
   before those files were written. Grep every path a document names and confirm it resolves.

The audience for `README.md` is a TA who has not read the design spec. The audience for a
`CLAUDE.md` is the next agent, and it is a contract, not a description: it says what may not be
changed and why, and it records decisions with their reasons so that the next agent does not
undo one by accident.

## Deliverables

### 1. `README.md`, re-verified line by line

Every claim in the `What was verified, and what was actually observed` section is re-run and the
output re-pasted. Not spot checked. Re-run:

```
python3 data/generate_houses.py
python3 precompute/reference.py
python3 precompute/build_notebooks.py
```

then execute both notebooks and paste the real result. The `Done` and `Not done` lists are
rewritten against the tree as it then stands. An item moves from `Not done` to `Done` only when
somebody has run the thing and looked at the result.

Keep the section that states the narrow convergence claim. It is the most important paragraph in
the file and it is easy to lose in a rewrite: the fixed step rule orbits and never settles; the
act 3 rule and the act 4 rule with a constant step both rattle in a band forever; only the
shrinking step settles; and what it settles on is the least squares line for the sample,
`w = 948.8828, b = 123.5852`, not the generating line `w = 950, b = 120`. If issue 4 has run,
these numbers are unchanged, because the room count is drawn last and the twelve prices do not
move.

### 2. The TA handover, as a section of `README.md`

Written for Ghali and Suei-Wen, and for whoever covers if one of them is ill:

- what a TA does in the ten minutes before the block starts, as a numbered list;
- where the TA card is, printed and digital;
- the collapse plan, in one paragraph: `PREFILL_TASK3 = True` in the setup cell, and the room
  goes from act 2 straight to act 4, which is the minimum viable path;
- the one sentence to open with and the one sentence to close with, so that two TAs walking two
  halves of a room say the same thing;
- who to ask when something is wrong, and by what channel.

### 3. The five `CLAUDE.md` files, reconciled

Each is read against the code and corrected. Specifically:

- the layout tree in the root `CLAUDE.md` lists every file that exists and nothing that does not;
- the departures list still gives a reason for each departure, and gains any new one;
- the anti-collision table still holds after the other exercises of the block were built. Read
  the sibling directories `hs26-bmai-w1-opt-heron` and `hs26-bmai-w1-opt-genie-rm` and confirm
  that no two of the three teach the same thing under different names, and that the sign
  convention question has one answer written in all three;
- the open decisions list carries only decisions that are still open, each with its date;
- `issue-prompts/CLAUDE.md` records which issues are done, with the date each was closed.

### 4. A statement of what is not done, and what that costs

The honest list, with a consequence per item, not a bare list of missing things. An item that
nobody will do before 4 September is marked as such, with the sentence a TA should say if a
participant hits it.

## File Structure

```
hs26-bmai-w1-opt-rm-house/
  README.md                 (updated) re-verified, plus the TA handover section
  CLAUDE.md                 (updated) layout, departures, anti-collision, open decisions
  data/README.md            (updated) any number that moved
  data/CLAUDE.md            (updated) its Not done list
  notebooks/CLAUDE.md       (updated) cell count and task indices if issue 4 ran
  precompute/CLAUDE.md      (updated) the assertion list, the check coverage table
  issue-prompts/CLAUDE.md   (updated) which issues are closed, and when
```

## Verification

- Every command quoted in `README.md` was run during this issue, and its pasted output is from
  that run. No output is inherited from an earlier one.
- `python3 precompute/reference.py` ends on `All assertions passed.`
- `python3 precompute/build_notebooks.py` ends on `All assertions passed.`
- Both notebooks load with `json.load` and validate with `nbformat.validate`, and the solutions
  notebook executes with zero errors.
- Every file path named in any document in this directory resolves. Check it with a grep for
  backticked paths, and open each one.
- No document quotes a measured quantity as a pinned expected value.
- Every directory still carries its own `CLAUDE.md`, and each names the owning TAs and the
  lecture moment or points at the file that does.
- No file contains an em dash, an en dash or a whitespace flanked double hyphen. Verify on the
  whole tree, including the two generated notebooks.
- A person who has not read the design spec can follow `README.md` from the top and run the
  exercise. Ask somebody, and record who read it and what they stumbled on.
