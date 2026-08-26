/* ============================================================================
   verify-genie.mjs : the rigor gate.

   Run it with `node precompute/verify-genie.mjs`. It does three jobs, in this
   order, and does not go on to the next one if the previous one failed:

     1. loads the REAL runtime modules (js/rng.js, js/genie.js,
        js/schedules.js, js/loop.js) under a fake window, so what is asserted
        here is exactly what the browser computes. It does not reimplement
        the arithmetic; a reimplementation can agree with itself and disagree
        with the page.
     2. asserts the invariants every scene relies on, lettered (a) to (k).
     3. writes data/datasets.js. A failed assertion exits non-zero and the
        data file is NOT written, so a broken build cannot ship numbers.

   Pass --print to dump the measured values as a table (used when writing the
   README, so the README quotes real output rather than a recollection).

   Pattern taken from rl-arcade/repair-or-replace/precompute/build-datasets.js.
   ============================================================================ */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const PRINT = process.argv.includes("--print");

/* --- load the runtime modules under a fake window ------------------------ */

const win = {};
for (const rel of ["js/rng.js", "js/genie.js", "js/schedules.js", "js/loop.js"]) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  // eslint-disable-next-line no-new-func
  new Function("window", src)(win);
}
const { RNG, Genie, Schedules, Loop } = win;

/* --- assertion plumbing -------------------------------------------------- */

let failures = 0;
const notes = [];

function ok(label, cond, detail) {
  if (cond) {
    notes.push(`  pass  ${label}${detail ? "   " + detail : ""}`);
  } else {
    failures++;
    notes.push(`  FAIL  ${label}${detail ? "   " + detail : ""}`);
  }
}
function close(label, got, want, tol) {
  ok(label, Math.abs(got - want) <= tol, `got ${got}, want ${want} (tol ${tol})`);
}

/* --- the two solutions, derived here and nowhere else -------------------- */

const SQRT5 = Math.sqrt(5);
const PHI = (1 + SQRT5) / 2;
const CONJ = (1 - SQRT5) / 2;

/* (a) both roots solve Q^2 = Q + 1, and phi is a fixed point of both forms */
close("(a) phi solves Q^2 = Q + 1", PHI * PHI - PHI - 1, 0, 1e-15);
close("(a) conjugate solves Q^2 = Q + 1", CONJ * CONJ - CONJ - 1, 1e-16, 1e-15);
close("(a) phi fixed under form A", Genie.ask(PHI, { form: "A" }).clean - PHI, 0, 1e-15);
close("(a) phi fixed under form B", Genie.ask(PHI, { form: "B" }).clean - PHI, 0, 1e-15);

/* (b) the deck's six rows, exactly, as rationals, from Q = 1 under the full
   step on form A. These are the six \uncover rows of rl-slides.tex. */
const DECK = [
  { q: [1, 1], target: [2, 1], loss: [-1, 1] },
  { q: [2, 1], target: [3, 2], loss: [1, 2] },
  { q: [3, 2], target: [5, 3], loss: [-1, 6] },
  { q: [5, 3], target: [8, 5], loss: [1, 15] },
  { q: [8, 5], target: [13, 8], loss: [-1, 40] },
  { q: [13, 8], target: [21, 13], loss: [1, 104] }
];
const deckRun = Loop.run({ form: "A", q0: 1, n: 6, schedule: Schedules.full() });
ok("(b) six rows produced", deckRun.rows.length === 6, `got ${deckRun.rows.length}`);
DECK.forEach((row, i) => {
  const r = deckRun.rows[i];
  close(`(b) row ${i + 1} guess`, r.q, row.q[0] / row.q[1], 1e-15);
  close(`(b) row ${i + 1} target`, r.clean, row.target[0] / row.target[1], 1e-15);
  close(`(b) row ${i + 1} loss`, r.loss, row.loss[0] / row.loss[1], 1e-15);
});

/* (c) the derivatives at the fixed point, and the swap at the other root.
   g'(Q) = -1/Q^2 for form A, h'(Q) = -1/(Q-1)^2 for form B. */
const dA = (q) => -1 / (q * q);
const dB = (q) => -1 / ((q - 1) * (q - 1));
close("(c) g'(phi)", dA(PHI), -0.381966011250105, 1e-12);
close("(c) h'(phi)", dB(PHI), -2.618033988749895, 1e-12);
close("(c) g'(conjugate)", dA(CONJ), -2.618033988749895, 1e-12);
close("(c) h'(conjugate)", dB(CONJ), -0.381966011250105, 1e-12);

/* (d) the two alpha thresholds. Damped iteration Q <- Q - alpha(Q - f(Q)) has
   multiplier 1 - alpha(1 - f'(phi)), so it settles for 0 < alpha < 2/(1 - f'(phi)). */
const threshA = 2 / (1 - dA(PHI));
const threshB = 2 / (1 - dB(PHI));
close("(d) form A threshold = 1 + 1/sqrt5", threshA, 1 + 1 / SQRT5, 1e-12);
close("(d) form B threshold = 1 - 1/sqrt5", threshB, 1 - 1 / SQRT5, 1e-12);

/* (e) slider behaviour, 60 iterations from Q = 2, criterion |Q - phi| < 1e-3.
   The bands straddling the true thresholds are deliberately not asserted. */
function settles(form, alpha, q0 = 2, n = 60) {
  const r = Loop.run({ form, q0, n, schedule: Schedules.constant(alpha) });
  if (r.stopped) return false;
  return Math.abs(r.last - PHI) < 1e-3;
}
[0.2, 0.5, 1.0, 1.3].forEach((a) =>
  ok(`(e) form A settles at alpha ${a}`, settles("A", a)));
[1.5, 1.6].forEach((a) =>
  ok(`(e) form A does not settle at alpha ${a}`, !settles("A", a)));
[0.2, 0.3, 0.5].forEach((a) =>
  ok(`(e) form B settles at alpha ${a}`, settles("B", a, 1.7)));
[0.6, 0.7, 1.0].forEach((a) =>
  ok(`(e) form B does not settle at alpha ${a}`, !settles("B", a, 1.7)));

/* (f) form B with the full step from Q = 1.7 flees to the conjugate root, and
   the conjugate root is refused by the positivity clause. */
const fledHalts = Loop.run({ form: "B", q0: 1.7, n: 40, schedule: Schedules.full() });
ok("(f) form B full step walks out of the bargain", fledHalts.stopped !== null,
   `halted after ${fledHalts.rows.length} rows: ${fledHalts.stopped}`);
const fled = Loop.run({ form: "B", q0: 1.7, n: 40, schedule: Schedules.full(), allowRefused: true });
close("(f) and, left running, reaches the conjugate root", fled.last, CONJ, 1e-6);
ok("(f) the conjugate root is refused", !Genie.accepts(CONJ, "B"),
   `reason: ${Genie.refuse(CONJ, "B")}`);

/* (g) the instrument panel under the sandstorm. Ordering, not magnitude: the
   pinned seed is one draw and the assertion has to survive being typical.
   Checked on the pinned seed AND on the mean of 200 consecutive seeds. */
const SIGMA = 0.15;
const ROUNDS = 400;
function panel(schedule, seed) {
  const r = Loop.run({
    form: "A", q0: 1, n: ROUNDS, schedule,
    sigma: SIGMA, rng: RNG.stream(seed)
  });
  return { spread: Loop.spread(r.rows), avg: Loop.avgHeardLoss(r.rows), last: r.last };
}
const SCHED = {
  full: Schedules.full(),
  constant: Schedules.constant(0.2),
  inverse: Schedules.inverse(1),
  inverseSquare: Schedules.inverseSquare(1)
};
const pinned = {};
for (const k of Object.keys(SCHED)) pinned[k] = panel(SCHED[k], RNG.SEED);

ok("(g) spread(full) > spread(constant)", pinned.full.spread > pinned.constant.spread,
   `${pinned.full.spread.toExponential(3)} > ${pinned.constant.spread.toExponential(3)}`);
ok("(g) spread(constant) > spread(inverse)", pinned.constant.spread > pinned.inverse.spread,
   `${pinned.constant.spread.toExponential(3)} > ${pinned.inverse.spread.toExponential(3)}`);
ok("(g) spread(inverse) > spread(inverseSquare)", pinned.inverse.spread > pinned.inverseSquare.spread,
   `${pinned.inverse.spread.toExponential(3)} > ${pinned.inverseSquare.spread.toExponential(3)}`);
/* factor 15: the measured gap is 24x on the pinned seed and 19x on the
   200-seed mean, so 15 leaves margin on both without being satisfied by a
   near miss. The threshold is calibrated to the code, never the seed to the
   threshold. */
ok("(g) |avg loss| of the fast-shrinking schedule dwarfs the good one",
   Math.abs(pinned.inverseSquare.avg) > 15 * Math.abs(pinned.inverse.avg),
   `${pinned.inverseSquare.avg.toExponential(3)} vs ${pinned.inverse.avg.toExponential(3)}`);

const SEEDS = 200;
const meanOver = {};
for (const k of Object.keys(SCHED)) {
  let s = 0, a = 0;
  for (let i = 0; i < SEEDS; i++) {
    const p = panel(SCHED[k], RNG.SEED + i);
    s += p.spread; a += Math.abs(p.avg);
  }
  meanOver[k] = { spread: s / SEEDS, avgAbs: a / SEEDS };
}
ok("(g) ordering holds on the mean of 200 seeds",
   meanOver.full.spread > meanOver.constant.spread &&
   meanOver.constant.spread > meanOver.inverse.spread &&
   meanOver.inverse.spread > meanOver.inverseSquare.spread);
ok("(g) the fast-shrinking schedule keeps a large average loss over 200 seeds",
   meanOver.inverseSquare.avgAbs > 15 * meanOver.inverse.avgAbs,
   `${meanOver.inverseSquare.avgAbs.toExponential(3)} vs ${meanOver.inverse.avgAbs.toExponential(3)}`);

/* (h) the fast-shrinking schedule rests somewhere the genie refuses: the loop
   is quiet but the bargain is not met. */
ok("(h) inverseSquare stops where the genie is not satisfied",
   Math.abs(pinned.inverseSquare.last - Genie.ask(pinned.inverseSquare.last, { form: "A" }).clean) > 0.1,
   `rest ${pinned.inverseSquare.last.toFixed(6)}, genie returns ${Genie.ask(pinned.inverseSquare.last, { form: "A" }).clean.toFixed(6)}`);

/* (i) the same point with no randomness at all: a far start, a clean genie.
   1/(t+1) travels the distance; 0.5/(t+1)^2 keeps a fixed fraction of its
   starting error forever. */
const farGood = Loop.run({ form: "A", q0: 8, n: 200, schedule: Schedules.inverse(1) });
const farStall = Loop.run({ form: "A", q0: 8, n: 200, schedule: Schedules.inverseSquare(0.5) });
ok("(i) 1/(t+1) from Q = 8 arrives", Math.abs(farGood.last - PHI) < 1e-3,
   `|err| ${Math.abs(farGood.last - PHI).toExponential(2)}`);
const kept = Math.abs(farStall.last - PHI) / Math.abs(8 - PHI);
ok("(i) 0.5/(t+1)^2 from Q = 8 stalls", kept > 0.25,
   `keeps ${(kept * 100).toFixed(1)} per cent of its initial error, rests at ${farStall.last.toFixed(6)}`);

/* (l) the run scene 6 prints. Clean genie, alpha = 1/(1 + t/5), 60 rounds
   from Q = 1. Scene 6 prints ten decimals of the last guess, so the digits
   it prints are pinned here rather than typed into the scene file. */
const revealRun = Loop.run({
  form: "A", q0: 1, n: 60, schedule: Schedules.decay(1, 5)
});
ok("(l) scene 6 run lands on the fixed point", Math.abs(revealRun.last - PHI) < 1e-9,
   `|err| ${Math.abs(revealRun.last - PHI).toExponential(3)}`);
ok("(l) and prints 1.6180339887 to ten decimals",
   revealRun.last.toFixed(10) === "1.6180339887",
   `prints ${revealRun.last.toFixed(10)}`);

/* (j) no scene numbered 0 to 5 may mention the answer or read DATA.reveal. */
for (let n = 0; n <= 5; n++) {
  const p = path.join(ROOT, "js", "scenes", `scene${n}.js`);
  if (!fs.existsSync(p)) { ok(`(j) scene${n}.js exists`, false); continue; }
  const src = fs.readFileSync(p, "utf8");
  ok(`(j) scene${n}.js does not name the answer`,
     !src.includes("1.618") && !src.includes("golden") && !src.includes("DATA.reveal"));
}

/* (k) the generated data file is byte-identical on a rerun. Compared against
   whatever is on disk before this run rewrites it. */
const dataPath = path.join(ROOT, "data", "datasets.js");
const previous = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, "utf8") : null;

const payload = {
  seed: RNG.SEED,
  sigma: SIGMA,
  rounds: ROUNDS,
  deckTable: DECK,
  demo: {
    fullStepA: { form: "A", q0: 1, n: 6, alpha: 1 },
    fleeB: { form: "B", q0: 1.7, n: 12, alpha: 1 },
    fixedB: { form: "B", q0: 1.7, n: 30, alpha: 0.3 },
    farStart: { form: "A", q0: 8, n: 200 }
  },
  reveal: {
    /* NOT read before scene 6. The namespace is the rule; assertion (j) is
       what enforces it. */
    roots: [PHI, CONJ],
    digits: revealRun.last.toFixed(10),
    revealRun: { form: "A", q0: 1, n: 60, alpha0: 1, decayRate: 5 },
    thresholdA: threshA,
    thresholdB: threshB,
    derivativeA: dA(PHI),
    derivativeB: dB(PHI)
  }
};

const banner = `/* ============================================================================
   datasets.js : GENERATED by precompute/verify-genie.mjs. Do not hand-edit.
   Regenerate with:  node precompute/verify-genie.mjs

   window.DATA holds three things and nothing else:
     deckTable  the six rows of the AINIT slide, as exact numerator and
                denominator pairs, so the page can print fractions.
     demo       the parameters each ?test= state replays. Not results:
                every run in this viz is computed live from js/loop.js.
     reveal     the two solutions and the two alpha thresholds. THIS
                NAMESPACE IS NOT READ BEFORE SCENE 6. The verifier asserts
                that no scene file numbered 0 to 5 mentions it.
   ============================================================================ */
`;
const out = banner + "window.DATA = " + JSON.stringify(payload, null, 2) + ";\n";

if (failures === 0) {
  fs.writeFileSync(dataPath, out, "utf8");
  if (previous !== null) {
    ok("(k) regenerating data/datasets.js is byte-identical", previous === out);
  } else {
    notes.push("  note  (k) data/datasets.js did not exist before this run; rerun to check byte equality");
  }
}

/* --- report -------------------------------------------------------------- */

console.log(notes.join("\n"));

if (PRINT) {
  console.log("\n--- measured, pinned seed " + RNG.SEED + ", sigma " + SIGMA + ", " + ROUNDS + " rounds, start Q = 1 ---");
  console.log("schedule          spread        avg heard loss   rests at");
  for (const k of ["full", "constant", "inverse", "inverseSquare"]) {
    console.log(
      k.padEnd(16) +
      pinned[k].spread.toExponential(3).padEnd(14) +
      pinned[k].avg.toFixed(4).padEnd(17) +
      pinned[k].last.toFixed(6)
    );
  }
  console.log("\n--- same four, mean over " + SEEDS + " consecutive seeds ---");
  console.log("schedule          mean spread   mean |avg heard loss|");
  for (const k of ["full", "constant", "inverse", "inverseSquare"]) {
    console.log(
      k.padEnd(16) +
      meanOver[k].spread.toExponential(3).padEnd(14) +
      meanOver[k].avgAbs.toExponential(3)
    );
  }
  console.log("\n--- clean genie, far start Q = 8, 200 rounds ---");
  console.log("alpha = 1/(t+1)        rests at " + farGood.last.toFixed(6) +
              "   |err| " + Math.abs(farGood.last - PHI).toExponential(2));
  console.log("alpha = 0.5/(t+1)^2    rests at " + farStall.last.toFixed(6) +
              "   keeps " + (kept * 100).toFixed(1) + " per cent of its initial error");
  console.log("\n--- form B, full step, from Q = 1.7 ---");
  console.log(fled.rows.slice(0, 8).map((r) => r.q.toFixed(6)).join("  ->  "));
  console.log("settles at " + fled.last.toFixed(9));
  console.log("\n--- thresholds ---");
  console.log("form A  alpha must stay below " + threshA.toFixed(12));
  console.log("form B  alpha must stay below " + threshB.toFixed(12));
}

const failed = notes.filter((n) => n.includes("FAIL")).length;
console.log(`\n${failed === 0 ? "ALL PASS" : failed + " FAILED"}  (${notes.filter(n => n.includes("pass")).length} assertions passed)`);
if (failures > 0) {
  console.error("data/datasets.js was NOT written.");
  process.exit(1);
}
