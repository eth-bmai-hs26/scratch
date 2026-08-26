# BMAI FS26: coding exercise and TA handoff conventions

What the previous BMAI iteration (eth-bmai-fs26) actually does, extracted by reading the files,
so that the HS26 weekend 1 material can match it. Every claim below is sourced from a file I
opened. Where something the shared brief expects is missing, this document says it is missing.

Prose here uses ASCII punctuation only. The FS26 sources themselves use em dashes heavily; the
HS26 house rule forbids them, so the copy-ready skeletons at the end are pure ASCII.

---

## 1. What I read

Exercises and meta tooling
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/CLAUDE.md
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/README.md
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/.claude/settings.json
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/.claude/commands/{review-exercise,update-debrief,sync-notebooks}.md
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/agentic_ai_spy/ (README.md, all 8 notebooks outlined, micro and full opened cell by cell)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/fridge_chef/ (README.md, all 3 notebooks, TODO cells diffed against solutions)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/rag_exercise/{exercise.ipynb,solution.ipynb} (full cell diff)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/RAG TA CX/CityLens_Student_TODO.ipynb (outline)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/agentic_ai_hero/claude_code_prompt.md
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/pro_forma/claude_code_prompt (1).md (headings)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/slides/CLAUDE.md
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/coding-exercises/exercise-factory/{run_pipeline.sh,run_iterate.sh,prompts/*.md,inputs/*}

Visualization repos
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/{CLAUDE.md,README.md,.gitignore}
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/issue-prompts/ (all 18 files: heading census on all, full read of 01, 04, 10)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/adversarial_attacks/skill_spec/{SKILL-preview.md,pipeline-stages-preview.md}
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/viz_basic_manifold/ (README.md, orchestrate.sh, orchestration/run.sh, orchestration/prompts/*, viz_spec/manifold-explorer-spec.md, converged-concept-detailed.txt, manifold-explorer/CLAUDE.md)
- /Users/carloscotrini/Documents/git_bmai_fs26_cx/visualization_manifolds/ (README.md, skill_spec/, manifold-output/converged-concept.md)

Minimal app
- /Users/carloscotrini/Documents/git_bmai/2026fs/lead_scoring_minimal/ (README.md, generate_data.py, requirements.txt, git ls-files)

---

## 2. The FS26 coding-exercises repo in one paragraph

`coding-exercises/` is a flat repo of independent exercise directories (14 of them plus
`exercise-factory/`), remote https://github.com/eth-bmai-fs26/coding-exercises.git. Six of them are
agent games sharing one engine architecture; the rest are RAG, clustering, interpretability, a CVAE,
an HTML attention game, and a JS business case builder. `CLAUDE.md` at the repo root is the real
documentation. `README.md` at the repo root is NOT: it is the unmodified GitLab "Getting started"
template, byte identical (md5 c49502709ce8904c765fb851b4b73161) to /Users/carloscotrini/Documents/git_bmai/2026fs/README.md.
Do not copy that README pattern into HS26.

---

## 3. The student notebook layout

The spine documented in `coding-exercises/CLAUDE.md` is real and I verified it cell by cell in
`agentic_ai_spy/the_hidden_layer_micro_mission.ipynb` (16 cells):

| Cell | Type | Content |
|---|---|---|
| 0 | markdown | Title, ASCII-art briefing box, "What is this?", the mission and win condition |
| 1 | code | Setup. `NOTEBOOK_VERSION = "v2.1"`, Colab detection, `git clone -b <branch>` or `git pull`, `os.chdir`, `sys.path.insert(0, ".")`, `pip install google-genai --quiet` |
| 2 | code | Build the world (subclassed engine objects defined inline for the small missions) |
| 3 | markdown | "Play the Game Yourself!" |
| 4 | code | `InteractiveGame(...).play()` (ipywidgets manual play) |
| 5 | markdown | API Key Setup: 3 numbered steps, link to https://aistudio.google.com/app/api-keys, Colab Secrets named `GEMINI_API_KEY`, "Toggle Notebook access to ON" |
| 6 | code | Read the key from `google.colab.userdata` with an `os.environ` fallback, build `genai.Client` |
| 7 | markdown | The task statement |
| 8 | code | The TODO cell (`SYSTEM_PROMPT` plus `think_llm`) |
| 9 | code | Quick sanity check: builds a throwaway game, calls the student function once, parses the output, prints pass or the exception, tells the student to fix it before running |
| 10 | code | Run the mission, print result line (won, dossiers, health, turns, log file) |
| 11 | markdown | Debrief instructions (new conversation the first time, same conversation afterwards) |
| 12 | code | `# @title` collapsed debrief helpers: `_STATIC_CONTEXT`, `_analyze_log`, `_get_think_llm_source`, `generate_debrief_paste` |
| 13 | code | Debrief render: ipywidgets Copy to Clipboard button plus a read-only Textarea with the paste block |
| 14 | code | `# @title` download the game log via `google.colab.files` |
| 15 | markdown | "What's Next?" pointing at the next mission tier |

The full mission (18 cells) adds, before the TODO: an "Exploring the Base" tool tour, an
"Understanding the Tool Call Format" cell, and a "Test the parser" cell; and after the run: a
"Reflection" markdown cell with 4 questions and one "The Big Insight" block quote. The three tiers
are micro 3x3 / 3 dossiers / 30 turns, training 5x5 / 5 / 50, full 8x8 / 10 / 100.

Conventions that recur in every notebook I opened:
- `# @title` on a code cell makes it collapsible in Colab. Used for setup, world building, debrief
  helpers, and the log download, never for the cell the student edits.
- Cells the student edits are NOT `# @title` and open with a banner comment: a hash, the section
  name, then a rule of box-drawing characters out to the right margin.
- Section separators are a markdown cell whose first line is `---`.
- Everything is Colab first: clone the repo, `pip install`, read the key from Colab Secrets.
- No exercise directory in this repo carries its own CLAUDE.md. Only 4 CLAUDE.md files exist in the
  whole eth-bmai-fs26 tree (coding-exercises/, coding-exercises/slides/, adversarial_attacks/,
  viz_basic_manifold/manifold-explorer/). The "every directory carries a CLAUDE.md" house rule is
  not met in FS26.

Non-agent exercises use a different but equally consistent spine, seen in `rag_exercise/exercise.ipynb`
(34 cells): setup, API key, then a repeating unit of {markdown "## Task N: <name>" with a long plain
language explanation and a "What you need to do" list} -> {code cell with blanks} -> {optional
visualisation cell} -> {markdown "### What just happened?" with a Discussion sub-list of questions
that need no code}. It ends on "### Final Discussion". This is the shape closest to what weekend 1
needs for Heron and Robbins-Monro, because there is no game engine involved.

---

## 4. The student / solutions synchronisation rule

Stated in `coding-exercises/CLAUDE.md` as "Each notebook has student + solutions versions, keep them
in sync". What that means operationally, measured:

- `rag_exercise/exercise.ipynb` and `solution.ipynb`: 34 cells each, and exactly 5 cells differ
  (indices 11, 15, 21, 28, 31). Every differing cell is a Task cell. The banner comment, the hint
  comment, and the trailing `print(...)` inside those cells are byte identical between the two files.
  The solution only fills the blank.
- `fridge_chef_secondTask.ipynb` (29 cells) vs `fridge_chef_secondTaskSol.ipynb` (26 cells): the TODO
  cells are the same cells with the body filled in and a docstring added; the student file carries 3
  extra scratch cells that the solutions file does not.
- `NOTEBOOK_VERSION` matches exactly across each student/solutions pair in `agentic_ai_spy`
  (full v1.5 / v1.5, micro v2.1 / v2.1, training v1.5 / v1.5, micro_local v2.2-flexible on both).
- The agent-game solutions notebooks legitimately drop cells: `the_hidden_layer_full_mission.ipynb`
  has 18 cells, `..._solutions.ipynb` has 14. The solutions file drops the parser tour, the sanity
  check, and the Reflection cell, and replaces the TODO cell with the full solution.

So the rule in practice is: identical scaffolding, identical setup cell, identical version string,
identical debrief plumbing, and the ONLY intended difference is the body of the TODO cells.

The maintenance loop is three slash commands in `coding-exercises/.claude/commands/`:
- `/sync-notebooks <exercise>`: reports structural drift between the pair (cells present in one and
  not the other, diverging setup cells, diverging debrief cells, version mismatches). Explicitly
  "Do NOT modify files, just report the differences."
- `/review-exercise <exercise>`: reads all sources and notebooks, reports findings grouped by
  severity (bugs, consistency, robustness, pedagogy). "Do NOT modify files unless asked."
- `/update-debrief <exercise>`: re-derives the debrief `_STATIC_CONTEXT` from the engine when the
  game changes. Its closing line: "The _STATIC_CONTEXT must use the coaching format (DIAGNOSE ->
  GUIDE -> HINT -> IMPLEMENT TOGETHER). Never revert to code-generator mode."

---

## 5. The TODO stub: three shapes, all in use

Shape A, fill in the blank (`rag_exercise`). For students who have never written Python.

```python
# -- Task 1: Create the text splitter and split documents ----

# COMPLETE THIS LINE:
text_splitter = RecursiveCharacterTextSplitter(chunk_size=___, chunk_overlap=___)

# COMPLETE THIS LINE:
chunks = text_splitter.create_documents(___)

print(f"Split {len(documents)} documents -> {len(chunks)} chunks")
```

The literal marker in the source is `# 🎯 COMPLETE THIS LINE:` and the blank is three underscores
`___`. For a prose blank the marker is `# 🎯 WRITE YOUR INSTRUCTIONS:` and the blank is
`___WRITE YOUR INSTRUCTIONS HERE___` inside a triple-quoted string. The preceding markdown cell tells
the student exactly which values to type ("Set the chunk size to 500 and overlap to 50").

Shape B, signature given, body empty (`fridge_chef`). Markdown cell titled
`#### 🎯 TODO 2 - Format parse_action Output into ACTION String` with Objective, Requirements and
Hints; then a code cell:

```python
# -- TODO 2 ----
# Convert parse_action's output into a proper ACTION: string.
# Hint: use ", ".join(f'{k}="{v}"' for k, v in args.items()) for the args
#       and return "ACTION: check_fridge()" as fallback if tool_name is empty
# ----

def build_action_string(thinker_raw: str) -> str:
    tool_name, args = parse_action(thinker_raw)
    # TODO: build and return the action string from tool_name and args
    pass
```

The solutions cell keeps the banner and the hint comment verbatim, adds a docstring, and replaces
`pass` with 4 lines.

Shape C, working code, improve the prompt (`agentic_ai_spy` micro). The Python is already correct and
the markdown says so in bold: "You don't need to change the Python code. Your job is to improve
SYSTEM_PROMPT so the agent makes smarter decisions." The deliberately weak starting prompt is 6 lines
and is expected to fail.

For weekend 1 (Heron, genie, Robbins-Monro on house prices) Shape A and Shape B are the right ones.
Shape C only makes sense when there is an LLM in the loop.

---

## 6. The debrief coach pattern, and the drift inside it

The mechanism, identical in every agent notebook:
1. The run writes a JSON game log to the working directory (gitignored as `*_log_*.json`).
2. `_analyze_log(log_path)` extracts at most 5 failure-pattern bullets by pure Python inspection of
   the log. In the micro notebook the six detectors are: same action repeated 3+ times in a row,
   cells never visited, item picked up but never delivered, `talk()` never used (and per-NPC checks),
   entered the robot cell without the weapon, cache never collected.
3. `_get_think_llm_source()` recovers the student's current cell text out of IPython's `In` history.
4. `generate_debrief_paste(result)` concatenates `_STATIC_CONTEXT` (first call only) with a dynamic
   block: outcome, score lines, "WHAT WENT WRONG" bullets, and the current cell source.
5. The next cell renders a Copy to Clipboard ipywidgets button plus a disabled Textarea, and switches
   the instruction line between "FIRST TIME, paste into a NEW conversation" and "FOLLOW-UP, paste into
   the SAME conversation".
6. The student pastes into ChatGPT or Gemini outside the notebook. No extra API key is needed for this.

There are TWO different coaching contracts in the repo, and they contradict each other:

Contract 1, the coach, documented in `coding-exercises/CLAUDE.md` and in `/update-debrief`. It lives
only in `the_hidden_layer_full_mission_solutions.ipynb` and
`the_hidden_layer_training_mission_solutions.ipynb` (verified by grep for "DIAGNOSE" across the repo):

> You are a COACH, not a code generator. ... 1. DIAGNOSE ... 2. GUIDE: Ask the student 1-2 targeted
> questions ... 3. HINT: Suggest a *strategy* ... without writing the full code. 4. IMPLEMENT
> TOGETHER: ... help them write *that piece*, not the whole function. ...
> NEVER return a complete drop-in `think_llm` function unprompted. The student learns by building it
> themselves.

Contract 2, the two-part reply, is what the STUDENT notebooks actually ship (micro v2.1 and full
v1.5): "You are coaching a non-programmer student ... Every response has exactly TWO parts: PART 1
REFLECTION (2-3 sentences max) ... PART 2 UPDATED CODE (always required): Output the COMPLETE cell
code ... The student will copy-paste this ENTIRE block to replace their notebook cell. No partial
snippets." with rules "NEVER output partial code snippets. ALWAYS output the full cell." and "Keep
the Python code simple. ... The intelligence is in the SYSTEM_PROMPT text, not in Python code."

This is real drift, not a version lag: `the_hidden_layer_full_mission.ipynb` and its solutions file are
both `NOTEBOOK_VERSION v1.5` and carry opposite contracts. The likely history is that the task moved
from "write the Python" to "improve the system prompt" and the student notebooks were updated while
the solutions notebooks and CLAUDE.md were not.

Decision this forces on HS26 weekend 1: pick one contract per exercise and state it in the exercise's
own CLAUDE.md. For weekend 1 the task is mathematical reasoning, not prompt engineering, so
Contract 1 (diagnose, guide, hint, implement together, never a drop-in function) is the right one,
and the weekend-1 debrief should say so in its own words rather than being copied from a v1.5 cell.

---

## 7. exercise-factory: what it produces, and whether weekend 1 should use it

Contents (there is no `artifacts/` directory committed; it is gitignored via
`exercise-factory/artifacts/` in `.gitignore`):

```
exercise-factory/
├── run_pipeline.sh                 design -> build -> (test -> critique -> improve) x N
├── run_iterate.sh                  the test -> critique+guard -> improve loop only, non-interactive
├── prompts/
│   ├── designer.md    critic.md    builder.md
│   ├── improver.md    tester.md    guard.md
└── inputs/
    ├── domain_choice.txt           one line, currently "supply chain coordinator"
    ├── exercise_ideas.md           a menu of candidate domains with audience fit notes
    ├── hero_quest_pattern.md       the structural template it clones
    ├── metal_gear_agent_prompt.md
    └── audience.xlsx               participant profiles, read with openpyxl into the designer prompt
```

Both scripts drive `claude --print` in a loop. `run_pipeline.sh` writes `artifacts/concept.md`, then
stops at a human checkpoint (`read -p "Approve concept? (y/n/edit)"`), then builds, then loops test /
critique / improve up to `--max-iterations` (default 5), breaking when `issues.md` contains `NO_ISSUES`
or `Verdict: PASS`. The artifacts it produces are: `concept.md`, `game_log.json`,
`test_report.md`, `issues.md`, `improvement_log_iterN.md`.

What each agent is for:
- designer.md: writes `concept.md` against a fixed 10-section contract (Theme and Setting, Win
  Condition with exact numbers, 6-8 Task Types, The Boss Fight, Chain Tasks, Knowledge Base of 10-15
  articles, 6-8 Templates, 8-10 Characters, Penalty Token Scenarios, and a Mapping Table from Hero
  Quest concepts to the new domain) plus a checkbox Quality Criteria list ("a naive always-escalate
  strategy must lose", "the rule-based solution should win in 60-80 turns").
- builder.md: prescribes the exact file tree and, per file, what must be in it, including a
  cell-by-cell student notebook layout and a solutions notebook with the 4-layer LLM architecture.
- tester.md, critic.md, improver.md: run the rule-based solution, review it against a 7-part framework
  (winnability, balance, boss fight quality, difficulty calibration, stuck detection, deadlock
  detection, educational value) and apply fixes. The critic's key principle is "Be specific", with a
  worked example of a good finding.
- guard.md: rejects over-automation. It defines the three-layer architecture (Autopilot, LLM,
  Guardrails) and lists what must NOT be in the autopilot. Its judgment call: "A solution that scores
  85-95% quality with the LLM making real decisions is BETTER than a 100% solution where the autopilot
  does everything."

Verdict for weekend 1: do not use it. Everything the factory encodes is specific to turn-based agent
games with tokens, escalation, a boss fight and a queue. Weekend 1 has none of those: Heron's
algorithm, the genie game and Robbins-Monro on `y = wx + b` are 20-line numeric loops with a table.
There is no game engine to build, no rule-based solution to run, no win condition to balance. Two
things from the factory are still worth transplanting by hand:
1. The designer's habit of pinning exact numbers before any code exists (starting theta, step sizes,
   number of rows in the table, what "converged" means numerically).
2. The critic's and guard's separation between "the machine does the mechanical part" and "the
   student does the deciding part". For weekend 1 that maps to: the notebook prints the table, the
   student supplies the update rule.

---

## 8. The issue-prompt-per-unit-of-work format

This is the single most transferable artifact. `adversarial_attacks/issue-prompts/` holds 18 files,
`01-precompute-standard.md` through `18-integration-polish.md`, sizes 5.9 KB to 12.8 KB, all committed
to git. One file equals one agent invocation equals one unit of work.

Heading census over all 18 files:

| Heading | Count |
|---|---|
| `# Issue N: <Title>` (h1, always line 1) | 18/18 |
| `## Goal` (always the first h2) | 18/18 |
| `## Dependencies` | 17/18 |
| `## Context` | 16/18 |
| `## Deliverables` | 18/18 |
| `## File Structure` | 15/18 |
| `## Verification` | 18/18 |
| `## Mock Data for Development` | 4/18 |
| `## Implementation Notes` | 1/18 |
| `## Responsive Behavior` | 1/18 |

Order is stable: Goal, Dependencies, Context, [domain-specific sections], Deliverables,
[Implementation Notes], File Structure, Verification. The domain-specific slot is where a data issue
puts `## Model`, `## Image Curation`, `## Output Format`, `## Size Budget`, `## Numerical Precision`,
`## Edge Cases to Handle`, and a scaffold issue puts `## Tech Stack`, `## Color Palette`,
`## Typography`, `## Responsive Breakpoints`.

How each section is written:

- `## Goal`: one paragraph, 2 to 4 sentences, present tense, says what to build and why it matters to
  the audience. Example (issue 10): "Build the opening beat of the visualization: a cinematic,
  non-interactive 8-second sequence ... This hooks the audience and establishes the visual language
  (label shatter = classification broke) that Beat 1 will call back to."

- `## Dependencies`: a bullet per upstream issue, in the exact form
  `- **Issue 4** (Beat Navigation): \`useBeatNavigation\` hook, beat container system`, that is,
  bold issue number, parenthesised short name, colon, then the named symbols or files this issue
  consumes. Never a bare number. Negative dependencies are stated too: issue 16 adds
  "Note: This issue does NOT depend on the precomputation pipeline (#1, #2). ... It CAN be built in
  parallel with the precomputation work." Issue 18 declares "**All previous issues:** #1-#17. This
  issue is the final integration layer." The whole graph is then repeated once, as ASCII art under
  "## Issue Dependency Graph" in the project CLAUDE.md, grouped into Tier 0 through Tier 3.

- `## Context`: 1 to 3 short paragraphs of why, including what the lecturer will do with it and what
  the issue must NOT worry about. Issue 10: "The panda images are static JPEGs, no live computation.
  This beat has zero data dependencies on the precomputation pipeline."

- `## Deliverables`: numbered h3 subsections, `### 1. <Thing> (\`path/to/file.tsx\`)`. Each one is
  specified to the point where there is nothing to invent:
  - component contracts as a literal TypeScript interface block;
  - timed sequences as a table with a Time column, an Action column and a Visual column carrying exact
    hex colours, font names, px sizes and easing ("1.5s | Fade in label | \`\"Giant Panda - 99.3%\"\`
    in Syne 52px Bold, sky blue #38bdf8. Fade: opacity 0->1, 400ms ease-out");
  - layouts as an ASCII box drawing of the screen;
  - keyboard maps as a two-column table;
  - data schemas as a fenced JSON literal with representative values;
  - three named responsive tiers (Default >=1440px, Compact 768-1439px, Mobile <768px) with the exact
    sizes at each.
  Numbers are never left vague. Issue 1 specifies the dead-pixel threshold as
  "tau = 0.01 x max_i |dJ/dx_i|", the fallback ("adjust tau to approximately percentile 55, retaining
  ~350 of 784 active pixels"), and the sanity target ("sign disagreement ~0.10-0.15").

- `## File Structure`: a fenced tree of only the files this issue creates or edits, with
  `(updated)` or `(modifications)` marking files it touches but does not own.

- `## Verification`: the acceptance criteria, as a flat bullet list of observable statements, written
  so a human or an agent can tick them off by running the thing. They are behavioural, never "the code
  is clean". Issue 4 ends with "Transitions don't allow double-navigation (clicking fast doesn't break
  state)" and "No console errors". Almost every file ends on "No console errors". Data issues instead
  print a literal expected summary block (issue 1 shows the exact 10-line stdout the script must
  produce, with plausible numbers).

Two more properties worth copying:
- Each prompt is self-contained enough that an agent with no other context can execute it, but it
  never repeats the shared design tokens: those live once in the project CLAUDE.md, which every agent
  is told to read.
- Issues are sized so that a tier can run in parallel. Tier 0 is data plus scaffold, Tier 1 is
  reusable components built against mock data (hence `## Mock Data for Development` in 4 files),
  Tier 2 composes them into beats, Tier 3 is integration and polish.

The sibling repo `viz_basic_manifold/orchestration/prompts/` uses a leaner variant of the same idea
(8 files, 68 to 549 lines): a one-line preamble naming the app, then `## Project Context` (which
points at the project CLAUDE.md and the shared constants file), `## Your Task` (one sentence, one
file), `## Component Interface` (the literal props signature), `## Specification` (h3 per panel or
per mechanic), and no Verification section. The adversarial_attacks form is the stronger one because
it carries acceptance criteria; prefer it.

---

## 9. The multi-agent design process and the converged concept

Process, from `viz_basic_manifold/orchestrate.sh` and `adversarial_attacks/skill_spec/SKILL-preview.md`:

- Phase 1, discussion. A bash script runs 3 or 4 agent personas by repeatedly shelling out to
  `claude -p`, each seeing the whole transcript so far. adversarial_attacks used Pedagogy, Design and
  Math. viz_basic_manifold used Pedagogy, Design, Math and Simplifier, and its README explains the
  swap: the earlier `visualization_manifolds` session had a Manager Advocate "who killed math
  teaching", replaced by a Simplifier "who finds simpler ways to teach the same math".
- The rounds are phased by round number, with a different instruction injected each phase: rounds 1-3
  diverge, rounds 4-6 stress test ("Now ATTACK them. Where would a manager get lost?"), rounds 7-9
  refine, round 10+ converge. `MIN_ROUNDS=10`, default `MAX_ROUNDS=20`.
- Every second round one agent is assigned Devil's Advocate by rotation and is told "Your SOLE JOB is
  to argue AGAINST the current teaching approach. Even if you secretly like it ... Do NOT be polite
  about it."
- Every agent prompt ends with the same discipline rules: be concise (2-4 paragraphs), respond
  directly to what other agents said, when you raise a concern propose an alternative, explicitly
  state what you are NOT YET satisfied with, and do not say CONVERGED in the first 9 rounds.
- A separate convergence judge is called each round and must answer only CONVERGED or NOT_CONVERGED
  plus a one-line reason. Its bar is explicit: all four agents (not three of four) must have written
  CONVERGED, no agent has an open concern, and every concept has a plain-language introduction, an
  interactive discovery moment and a verification moment.
- Phase 2, a Moderator synthesises `converged-concept.md` against a fixed section list.
- Phase 3, decompose into tiered issue prompts and run agents in parallel; `orchestration/run.sh`
  shows the concrete version, launching 5 component agents with `claude -p ... &`, collecting PIDs,
  `wait`ing, then running an app-shell agent and a polish agent in series, logging each to
  `orchestration/logs/NN-name.log` and finally running `npm run build`.

What a converged-concept document contains. The best surviving example is
`visualization_manifolds/manifold-output/converged-concept.md`, 211 lines, sections: Core Idea,
Target Audience (who they are, what they already know, what they don't know, what they fear), The
"Aha" Moment, Key Analogies, Teaching Sequence, Mathematical Foundation, Interaction Design, Visual
Design, Narrative Script (3-minute demo), Bridge to Machine Learning, Scope Boundaries, Unresolved
Tensions. The Aha Moment section is written as a single described frame with a caption.

The moderator prompt in `viz_basic_manifold/orchestrate.sh` asks for a slightly different list: Core
Idea, Target Audience, Prerequisite Knowledge, Concept Progression, Mathematical Foundation,
Interaction Design, Visual Design, Pacing and Absorption, Verification Strategy, The Klein Bottle
Challenge, Bridge to ML, Scope Boundaries, Unresolved Tensions. That run's
`brainstorm-output/converged-concept.md` is one line long and reads `Error: Reached max turns (1)`;
the synthesis failed. It was reconstructed by hand as `converged-concept-detailed.txt`, 1081 lines,
24 numbered sections, with a header stating "The formal synthesis document failed to generate due to
an infrastructure error; this document reconstructs the complete converged design from the
transcript" and recording that convergence was reached at round 12 across 11,025 lines of debate.
`adversarial_attacks/viz-output/converged-concept.md` referenced by its CLAUDE.md is ABSENT: the
directory is gitignored and holds only a 12-line `discussion-transcript.md` and a state file.

Downstream of the concept sits a separate implementation-ready spec. The template is in
`skill_spec/pipeline-stages-preview.md` (Overview, Pedagogical Goals, Mathematical Model, Narrative
Arc as Beat 0 hook through Beat 4 implication, Layout and Composition, 3D Scene Specification,
Components, Controls, Keyboard Shortcuts, Animations, Visual Design, Responsive Breakpoints, Data
Schema, Precomputation Pipeline, Scope Boundaries, Unresolved Tensions, Demo Script). Its key
principles are worth quoting into HS26 work: "Be exact about numbers", "Be exact about positions",
"Name colors by hex", "Describe animations", "Anticipate edge cases", "Specify keyboard shortcuts".
A filled-in example is `viz_basic_manifold/viz_spec/manifold-explorer-spec.md`, 435 lines.

Two cautions before reusing any of this for HS26.
1. Both viz repos build React plus Vite plus npm apps. `adversarial_attacks` also uses TypeScript,
   Tailwind, TF.js and React Three Fiber. That is directly incompatible with the HS26 house rule that
   visualizations are browser-only, have no build step and open from file:// (that rule comes from
   /Users/carloscotrini/Documents/git_fdd/projects/.claude/skills/course-viz/SKILL.md, which I did not
   open in this pass). Treat these repos as sources for the PROCESS and the issue-prompt FORMAT, not
   for the stack.
2. Their palettes are dark-only (canvas #0f172a), and `skill_spec/SKILL-preview.md` states the reason:
   "Projector-first, dark backgrounds, high contrast". The HS26 house rule requires light AND dark with
   a "t" toggle, so do not carry over the dark-only assumption.

---

## 10. lead_scoring_minimal, and the synthetic data rule

`/Users/carloscotrini/Documents/git_bmai/2026fs/lead_scoring_minimal/` is a 5-file end-to-end demo:
`model.py` (shared PyTorch MLP definition), `generate_data.py`, `train.py`, `app.py` (Streamlit),
`requirements.txt` with pinned versions, and a README. `git ls-files` confirms that `data/` and
`artifacts/` are NOT committed: they are produced by the scripts.

It is the house model for honest synthetic data, and matches the HS26 rule exactly:
- `SEED = 42` and `np.random.seed(SEED)` at module scope in `generate_data.py`.
- The generator is committed, so any number in the exercise can be reproduced.
- The label is generated by an explicit logistic model with named coefficients and a comment on the
  one negative weight ("Negative: newer leads score higher"), plus `np.random.normal(0, 0.5)` noise,
  then `np.random.binomial`.
- The README says, in bold near the top: "Note: All data is fictitious and for demonstration purposes
  only."
- The README lists every expected column and what it means, and states the runtime constraints ("No
  internet connection required", "Runs on CPU (no GPU needed)").

For the weekend-1 house price exercise (`hs26-bmai-w1-opt-rm-house`, brief: "Fit a model y = wx + b on
a fictitious toy dataset of house measurements"), copy this pattern verbatim: a committed
`generate_data.py` with a fixed seed, a one-line disclaimer in the notebook's first markdown cell and
in the README, and no committed CSV that anyone could mistake for real ETH or Zurich housing data.
The only committed CSV I found anywhere in the exercise repo is
`RAG TA CX/zurich_restaurants.csv`, which ships with no generator and no provenance note; do not
repeat that.

---

## 11. What a TA-ready initial state looks like in this course family

Two answers, because there are two kinds of deliverable, and weekend 1 needs both.

### 11a. A notebook coding exercise (the CX slots)

Directory shape, from `exercise-factory/prompts/builder.md` and confirmed against `agentic_ai_spy/`,
`fridge_chef/`, `the_supply_line/`, `the_support_desk/`, `metal_gear_agent/`:

```
<exercise_slug>/
├── README.md                         what it is, how it works, table of package files
├── requirements.txt                  pinned deps (present in agentic_ai_spy, metal_gear_agent, agentic_ai_hero)
├── <package_name>/                   the engine the student never edits
│   ├── __init__.py                   re-exports so the notebook can do `from pkg import *`
│   ├── data.py                       dataclasses and enums for state
│   ├── scenario.py                   the data: the world, the tasks, the text
│   ├── game.py                       the world wrapper and its lookup methods
│   ├── tools.py                      the action space, every tool returns a result object
│   ├── agent.py                      the loop, TOOLS_DESCRIPTION, parse_*() output parser
│   ├── display.py                    HTML rendering for the notebook
│   ├── interactive.py                ipywidgets manual play
│   └── main.py                       create_game(), play_*() convenience wrappers
├── <exercise_slug>.ipynb             student notebook, TODO stubs
└── <exercise_slug>_solutions.ipynb   solutions notebook, same cells, bodies filled
```

Naming is not consistent across FS26: `agentic_ai_spy` uses `the_hidden_layer_*_mission.ipynb` and
`*_solutions.ipynb`, `agentic_ai_hero` uses `quest_hero_student.ipynb` and `quest_hero_solutions.ipynb`,
`rag_exercise` uses `exercise.ipynb` and `solution.ipynb`, `RAG TA CX` uses
`CityLens_Student_TODO.ipynb` and `CityLens_Master_Solution.ipynb`, `interpretability` has 6 notebooks
with per-TA suffixes (`_fra`, `_san`). Pick one convention for HS26 and hold it.

For weekend 1 the Python package is mostly unnecessary. Heron and Robbins-Monro need at most a small
`<package_name>/` with a table printer and a plotting helper, or a single `helper.py` next to the
notebook, which is what `rag_exercise/` does.

### 11b. A visualization (the grasshopper and moonlander line)

Directory shape, from `adversarial_attacks/` (the fullest example that actually shipped issue prompts):

```
<viz_slug>/
├── CLAUDE.md            shared context every agent reads before its issue
├── README.md            human quick start, keyboard shortcuts table
├── .gitignore
├── issue-prompts/       01-*.md .. NN-*.md, one file per unit of work, committed
├── skill_spec/          reference docs the orchestrator feeds to the agents
├── orchestrate.sh       the multi-agent discussion driver
├── viz-output/          gitignored: discussion-transcript.md, converged-concept.md
├── precompute/          seeded generators, requirements.txt, models/
├── public/data/         generated JSON, gitignored
└── src/                 the app
```

`viz_basic_manifold/` is the same idea with the orchestration split out:
`orchestration/{run.sh,prompts/NN-name.md,logs/NN-name.log}`, plus `viz_spec/<name>-spec.md` and
`brainstorm-output/`.

### 11c. The minimum a TA can actually be handed

Combining both, the initial state that FS26 treats as complete, and that HS26 weekend 1 should
reproduce per master-schedule slug:

1. `CLAUDE.md` in the exercise directory. What this is, the file tree with one line per file, the
   design tokens or the maths conventions, the dependency graph between issues, a Commands block, and
   a "What NOT to Do" list. The adversarial_attacks CLAUDE.md ends with 7 explicit prohibitions and
   that section is what stops agents from re-litigating settled decisions.
2. `README.md` for humans: what it is, quick start commands, keyboard shortcuts if interactive.
3. `issue-prompts/` with one numbered markdown file per unit of work, each carrying Goal,
   Dependencies, Context, Deliverables, File Structure and Verification, sized so that a whole tier
   can be run in parallel.
4. The dependency graph written down once, as ASCII tiers in CLAUDE.md.
5. The seeded generator for any data, committed, plus a "this data is fictitious" line.
6. For notebook exercises: the student and solutions notebook pair, same cells, same
   `NOTEBOOK_VERSION`, differing only in TODO bodies.
7. A verification story: for notebooks the in-notebook sanity-check cell plus `/sync-notebooks` and
   `/review-exercise`; for visualizations the per-issue Verification bullets plus a final integration
   issue.

What is NOT part of a TA-ready initial state in FS26, judging by what is absent: there are no GitHub
issue templates, no CI, no tests directory, no per-exercise CLAUDE.md, and no TA-facing instruction
document anywhere in `coding-exercises/`. The only teacher-facing document I found in the whole tree
is `CVAE CX/teacher_guide.pdf` with its `.tex` source. If HS26 wants TAs briefed, that is a gap to
fill, not a pattern to copy.

---

## 12. Gaps, drift and traps found while reading

- `coding-exercises/README.md` is the stock GitLab template, identical to the 2026fs one. No course
  content.
- `coding-exercises/CLAUDE.md` says "All notebooks clone from branch `no-bfs`". False. The string
  `no-bfs` appears only in CLAUDE.md itself. The notebooks clone `-b week3` (13 occurrences) and
  `-b week3-agentic-ai-spy-v1` (8 occurrences). Any HS26 setup cell must pin a branch that exists.
- The debrief contract contradiction described in section 6.
- `the_hidden_layer_full_mission.ipynb` cells 3 and 4 begin with a literal
  `<cell_type>markdown</cell_type>` string that renders as visible junk. A notebook-writing tool leaked
  it. Check for it before shipping any generated notebook.
- `coding-exercises/CLAUDE.md` lists 4 known gotchas of its own, including a `hide()` tool documented
  but not implemented, and a solutions `think_llm` whose arity differs from the student one.
- `fridge_chef/README.md` contains an unresolved design argument in the middle of a bullet: Phase 3
  "skeleton for think_classifier ... <-- This is a bad idea... Its better to provide a syntetic
  dataset". Honest, but it means Phase 3 is not shippable as written.
- Game logs are committed in two places (`agentic_ai_spy/game_log_mission_complete_*.json`,
  `agentic_ai_hero/game_log_*.json`) despite `*_log_*.json` being in `.gitignore`.
- `adversarial_attacks/node_modules/` is committed to the working tree (275 entries) even though
  `.gitignore` lists it.
- Both viz repos need `npm install` and a build. That conflicts with the FDD course-viz no-build,
  file:// rule. Take the process and the prompt format, not the stack.

---

## 13. Copy-ready skeleton A: an issue prompt

Save as `issue-prompts/NN-short-slug.md`. ASCII only. Replace every angle-bracket placeholder.
Delete the optional sections that do not apply; keep Goal, Dependencies, Deliverables and
Verification always.

````markdown
# Issue N: <Short title of this unit of work>

## Goal

<Two to four sentences. What gets built, and why it matters to the participant or the lecturer.
Name the one thing this issue is responsible for. Do not describe the whole project.>

## Dependencies

- **Issue X** (<short name>): <the exact symbols, files or data this issue consumes>
- **Issue Y** (<short name>): <same>

<Optional negative dependency, one line: "Note: this issue does NOT depend on #Z. It can be built in
parallel with <other work>.">

## Context

<One to three short paragraphs. Where this sits in the participant's hour, what the lecturer will do
with it live, and what this issue explicitly does not have to worry about because another issue
owns it.>

## Deliverables

### 1. <Thing> (`path/to/file.ext`)

<The contract. For a function or component, give the literal signature or interface in a fenced
block. For a data file, give a fenced schema with representative values. For a UI element, give
exact hex colours, px sizes, font names and easing.>

### 2. <Thing> (`path/to/other.ext`)

<Tables are the house form for anything sequenced or keyed:>

| Time | Action | Visual |
|------|--------|--------|
| 0s   | <what happens> | <exact colours, sizes, easing> |

| Key | Action |
|-----|--------|
| `->` | <what it does> |

<ASCII box drawings are the house form for layout:>

```
+-------------------------------------------+
|  <header>                                 |
|                                           |
|            <main area>                    |
|                                           |
|  <controls>                               |
+-------------------------------------------+
```

### 3. <Numbers and edge cases>

<Pin every threshold. State the fallback if the threshold does not hold. State what to do at the
boundaries and when data is missing.>

## Implementation Notes

<Optional. Only non-obvious mechanics: cleanup on unmount, why a timer instead of a CSS chain,
retina scaling, ordering constraints.>

## File Structure

```
<dir>/
├── <file this issue creates>
└── <file this issue edits>   (updated)
```

## Verification

- <Observable statement a person can check by running it>
- <Observable statement>
- <Boundary case behaves as specified>
- Works when opened directly from file:// with no build step and no network
- Light and dark themes both correct, "t" toggles
- No console errors
````

---

## 14. Copy-ready skeleton B: an exercise directory tree

For a weekend-1 CX slot. The slug is the master-schedule slug, for example
`hs26-bmai-w1-opt-heron`. The Python package is optional and should be dropped when the exercise is a
20-line numeric loop; in that case keep only `helper.py` next to the notebooks.

```
hs26-bmai-w1-opt-heron/
├── CLAUDE.md                                what this is, file tree, maths conventions,
│                                            issue dependency graph, Commands, What NOT to Do
├── README.md                                human quick start: what it teaches, how to open it,
│                                            which notebook the participant opens
├── requirements.txt                         pinned, minimal (numpy, matplotlib)
├── issue-prompts/
│   ├── 01-scaffold-and-notebook-spine.md
│   ├── 02-heron-table-printer.md
│   ├── 03-todo-update-rule.md
│   ├── 04-convergence-plot.md
│   └── 05-integration-and-debrief.md
├── helper.py                                table printer and plotting helper, imported by
│                                            both notebooks, never edited by the participant
├── generate_data.py                         ONLY if the exercise needs data. Seeded:
│                                            SEED = 42 at module scope. Commits the generator,
│                                            not the CSV.
├── hs26-bmai-w1-opt-heron.ipynb             STUDENT notebook
│      cell 0  markdown  title, the story, what you will build, the win condition
│      cell 1  code      # @title Setup: colab detect, git clone -b <branch>, chdir,
│                        sys.path.insert, pip install, NOTEBOOK_VERSION = "v1.0"
│      cell 2  markdown  --- Play it by hand first
│      cell 3  code      interactive or by-hand table cell, no TODO
│      cell 4  markdown  --- Task 1: <name>. Why, then "What you need to do", numbered
│      cell 5  code      TODO stub: banner comment, Hint comment, signature, `pass` or ___
│      cell 6  code      sanity check: call the student function once, print pass or the
│                        exception, tell them to fix it before continuing
│      cell 7  code      run it, print the result line
│      cell 8  markdown  ### What just happened?  plus a Discussion list, no coding
│      cell 9  markdown  --- Debrief: paste block instructions
│      cell 10 code      # @title debrief helpers: _STATIC_CONTEXT, _analyze_log,
│                        generate_debrief_paste
│      cell 11 code      render the copy button and the textarea
│      cell 12 markdown  Reflection, then What's Next
└── hs26-bmai-w1-opt-heron_solutions.ipynb   SOLUTIONS notebook
       same cells, same order, same NOTEBOOK_VERSION, same banners and hints,
       bodies of the TODO cells filled in
```

Rules that make this state TA-ready, all of them observed in FS26:

- The participant opens exactly one file. Say so in the README, as `fridge_chef/README.md` does:
  "Students only ever open `fridge_chef.ipynb`. Everything else is infrastructure."
- Student and solutions differ ONLY in the TODO bodies. Same cell count where the exercise has no
  engine, same `NOTEBOOK_VERSION`, byte-identical banners, hints and prints.
- Every TODO cell has: a banner comment naming the task, a `# Hint:` line that names the function or
  idiom to use, the signature already written, and one `pass` or one `___` per blank.
- The sanity-check cell exists and runs before the expensive cell.
- The debrief `_STATIC_CONTEXT` states one coaching contract and the exercise's CLAUDE.md says which
  one it is.
- Any data is generated by a committed seeded script and labelled fictitious.
