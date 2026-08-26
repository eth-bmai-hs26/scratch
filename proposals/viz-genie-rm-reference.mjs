// Reference implementation for proposals/viz-genie-robbins-monro.md
// (hs26-bmai-w1-opt-genie-rm, CAS BMAI HS26, Weekend 1).
//
// Every number quoted in that proposal is printed by this file and asserted at
// the bottom. Run it with:   node proposals/viz-genie-rm-reference.mjs
// It ends on "All assertions passed." and needs nothing but node.
//
// The bargain: name a positive Q with Q = 1 + 1/Q.
// Form A writes the bargain as   g(Q) = 1 + 1/Q.
// Form B writes the SAME bargain as h(Q) = 1/(Q - 1), from Q^2 = Q + 1.
//
// The RNG is Mulberry32 + Box-Muller, copied line for line from
// /Users/carloscotrini/Documents/git_ainit/rl-arcade/minigolf/index.html
// lines 1541 to 1558, so the browser build and this file draw the same numbers.

// ---------- RNG (minigolf/index.html:1541 and :1549) ----------
function rng(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(r, std) {
  let u = 0, v = 0;
  while (u === 0) u = r();
  while (v === 0) v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * std;
}

// ---------- the bargain ----------
const PHI  = (1 + Math.sqrt(5)) / 2;
const CONJ = (1 - Math.sqrt(5)) / 2;
const SEED = 20260904;          // the weekend date. Pinned once, never tuned.
const QMIN = 1e-9;              // domain guard: the genie refuses Q <= 0

const forms = {
  A: { g: (q) => 1 + 1 / q,    dg: (q) => -1 / (q * q),          bad: 0 },
  B: { g: (q) => 1 / (q - 1),  dg: (q) => -1 / ((q - 1) * (q - 1)), bad: 1 },
};

// ---------- schedules ----------
const SCHED = {
  full:        () => 1,
  constant02:  () => 0.2,
  inverse:     (t) => 1 / (t + 1),
  invSquare:   (t) => 1 / ((t + 1) * (t + 1)),
  invSqHalf:   (t) => 0.5 / ((t + 1) * (t + 1)),
  decay: (a0, d) => (t) => a0 / (1 + t / d),
};

// One run of the loop.  loss = Q - heard,  Q <- Q - alpha_t * loss.
function run({ form = "A", Q0 = 1, n = 60, alpha = SCHED.full, sigma = 0, seed = SEED }) {
  const f = forms[form];
  const r = rng(seed);
  let q = Q0;
  const rows = [];
  let guarded = false;
  for (let t = 0; t < n; t++) {
    if (!Number.isFinite(q) || q <= QMIN || Math.abs(q - f.bad) < QMIN) { guarded = true; break; }
    const clean = f.g(q);
    const heard = sigma ? clean + gauss(r, sigma) : clean;
    const loss  = q - heard;
    const a     = alpha(t);
    const next  = q - a * loss;
    rows.push({ t, q, clean, heard, loss, alpha: a, next });
    q = next;
  }
  return { rows, final: q, guarded };
}

const tail = (xs) => xs.slice(Math.floor((2 * xs.length) / 3));   // last third
const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
const std  = (xs) => { const m = mean(xs); return Math.sqrt(mean(xs.map((x) => (x - m) * (x - m)))); };
const panel = (rows) => ({
  spread:  std(tail(rows.map((d) => d.q))),          // does the loop settle?
  avgLoss: mean(tail(rows.map((d) => d.loss))),      // is the genie satisfied?
});
const e = (x, k = 3) => x.toExponential(k);
const f6 = (x) => x.toFixed(6);

const checks = [];
const ok = (label, cond, shown) => { checks.push({ label, cond }); console.log(`   ${cond ? "ok  " : "FAIL"}  ${label}${shown === undefined ? "" : "  ->  " + shown}`); };

console.log("=".repeat(78));
console.log("1. THE BARGAIN");
console.log("=".repeat(78));
console.log(`   phi        = ${PHI.toFixed(12)}`);
console.log(`   conjugate  = ${CONJ.toFixed(12)}`);
ok("phi is a fixed point of form A", Math.abs(forms.A.g(PHI) - PHI) < 1e-15);
ok("phi is a fixed point of form B", Math.abs(forms.B.g(PHI) - PHI) < 1e-15);
ok("both roots satisfy Q^2 = Q + 1", Math.abs(PHI*PHI - PHI - 1) < 1e-15 && Math.abs(CONJ*CONJ - CONJ - 1) < 1e-15);

console.log("");
console.log("=".repeat(78));
console.log("2. THE DECK TABLE (rl-slides.tex lines 558 to 585), full step, form A, Q0 = 1");
console.log("=".repeat(78));
const deck = run({ form: "A", Q0: 1, n: 6, alpha: SCHED.full });
const deckExpect = [
  ["1", "2", "-1", 1, 2, -1],
  ["2", "3/2", "+1/2", 2, 1.5, 0.5],
  ["3/2", "5/3", "-1/6", 1.5, 5 / 3, -1 / 6],
  ["5/3", "8/5", "+1/15", 5 / 3, 1.6, 1 / 15],
  ["8/5", "13/8", "-1/40", 1.6, 1.625, -1 / 40],
  ["13/8", "21/13", "+1/104", 1.625, 21 / 13, 1 / 104],
];
console.log("   Q (guess)   target = 1 + 1/Q   loss = Q - target        (computed)");
let deckOk = true;
deck.rows.forEach((d, i) => {
  const [sq, st, sl, q, tg, ls] = deckExpect[i];
  const good = Math.abs(d.q - q) < 1e-12 && Math.abs(d.clean - tg) < 1e-12 && Math.abs(d.loss - ls) < 1e-12;
  if (!good) deckOk = false;
  console.log(`   ${sq.padEnd(11)} ${st.padEnd(18)} ${sl.padEnd(10)}  ${f6(d.q)}  ${f6(d.clean)}  ${d.loss >= 0 ? "+" : ""}${f6(d.loss)}`);
});
ok("all six deck rows reproduce to 1e-12", deckOk);

console.log("");
console.log("=".repeat(78));
console.log("3. WHY THE FULL STEP WORKS ON FORM A AND FAILS ON FORM B");
console.log("=".repeat(78));
console.log(`   g'(phi)  = ${forms.A.dg(PHI).toFixed(12)}     g'(conj)  = ${forms.A.dg(CONJ).toFixed(12)}`);
console.log(`   h'(phi)  = ${forms.B.dg(PHI).toFixed(12)}     h'(conj)  = ${forms.B.dg(CONJ).toFixed(12)}`);
ok("|g'(phi)| < 1  (form A: the full step contracts)", Math.abs(forms.A.dg(PHI)) < 1);
ok("|h'(phi)| > 1  (form B: the full step is repelled)", Math.abs(forms.B.dg(PHI)) > 1);
ok("the two derivatives are swapped at the two roots",
   Math.abs(forms.A.dg(PHI) - forms.B.dg(CONJ)) < 1e-12 && Math.abs(forms.B.dg(PHI) - forms.A.dg(CONJ)) < 1e-12);

// Two readings of the same run.  WITH the positivity guard the genie refuses to
// test a number that is not positive, so the loop walks out of the region the
// bargain allows.  WITHOUT the guard (pure arithmetic, no genie) the same
// recursion converges to the root the bargain forbids.
function runUnguarded({ form, Q0, n, alpha }) {
  const f = forms[form];
  let q = Q0;
  const seq = [q];
  for (let t = 0; t < n; t++) { q = q - alpha(t) * (q - f.g(q)); seq.push(q); }
  return { seq, final: q };
}
const flee = run({ form: "B", Q0: 1.7, n: 60, alpha: SCHED.full });
const fleeRaw = runUnguarded({ form: "B", Q0: 1.7, n: 60, alpha: SCHED.full });
console.log("   form B, full step, from Q = 1.7, as the genie sees it:");
console.log("      " + flee.rows.map((d) => d.q.toFixed(4)).join(" -> ") + " -> " + flee.final.toFixed(4));
console.log(`      the loop left the positive numbers after ${flee.rows.length} tests; the genie has nothing to answer`);
console.log("   the same recursion continued as bare arithmetic:");
console.log("      " + fleeRaw.seq.slice(0, 10).map((x) => x.toFixed(4)).join(" -> ") + " -> ...");
console.log(`      after 60 steps it rests at ${fleeRaw.final.toFixed(9)}, the root the bargain forbids`);
ok("form B with the full step leaves the positive numbers within 5 tests", flee.guarded && flee.rows.length <= 5);
ok("the first non-positive guess it produces is exactly -4", Math.abs(flee.final + 4) < 1e-12);
ok("unguarded, the same recursion converges to the forbidden root", Math.abs(fleeRaw.final - CONJ) < 1e-9);
ok("the forbidden root is negative, so the genie could never accept it", CONJ < 0);
const fleeSteps = fleeRaw.seq.findIndex((x) => Math.abs(x - CONJ) < 1e-6);
console.log(`      first within 1e-6 of the forbidden root at step ${fleeSteps}`);

// form A pushed past its threshold: the other break, and the one the brief asks for first
const bigA = run({ form: "A", Q0: 2, n: 60, alpha: () => 1.6 });
const bigARaw = runUnguarded({ form: "A", Q0: 2, n: 40, alpha: () => 1.6 });
console.log("   form A, alpha = 1.60 (past the threshold), from Q = 2:");
console.log("      " + bigARaw.seq.slice(0, 12).map((x) => x.toFixed(4)).join(" -> ") + " -> ...");
console.log(`      swings grow: |Q - phi| goes ${bigARaw.seq.slice(0, 8).map((x) => Math.abs(x - PHI).toFixed(4)).join(", ")}`);
console.log(`      with the genie enforcing positivity the run stops after ${bigA.rows.length} tests, at Q = ${bigA.final.toFixed(4)}`);
ok("alpha = 1.60 on form A makes the error grow over the first six tests",
   Math.abs(bigARaw.seq[6] - PHI) > Math.abs(bigARaw.seq[0] - PHI));
ok("alpha = 1.60 on form A eventually leaves the positive numbers", bigA.guarded);
const clean1 = run({ form: "A", Q0: 1, n: 40, alpha: SCHED.full });
const nTo3 = clean1.rows.findIndex((d) => Math.abs(d.loss) < 1e-3);
console.log(`   for contrast, form A at alpha = 1 from Q = 1 reaches |loss| < 1e-3 at test ${nTo3}`);

console.log("");
console.log("=".repeat(78));
console.log("4. THE PARTIAL STEP: TWO EXACT THRESHOLDS");
console.log("=".repeat(78));
const thrA = 2 / (1 - forms.A.dg(PHI)), thrB = 2 / (1 - forms.B.dg(PHI));
console.log(`   form A: settles for 0 < alpha < ${thrA.toFixed(12)}   ( = 1 + 1/sqrt 5 ),  fastest at ${(thrA / 2).toFixed(12)}`);
console.log(`   form B: settles for 0 < alpha < ${thrB.toFixed(12)}   ( = 1 - 1/sqrt 5 ),  fastest at ${(thrB / 2).toFixed(12)}`);
ok("form A threshold equals 1 + 1/sqrt(5)", Math.abs(thrA - (1 + 1 / Math.sqrt(5))) < 1e-12);
ok("form B threshold equals 1 - 1/sqrt(5)", Math.abs(thrB - (1 - 1 / Math.sqrt(5))) < 1e-12);
ok("the full step alpha = 1 is inside form A's window and outside form B's", thrA > 1 && thrB < 1);

const settles = (form, a, Q0 = 2, n = 60) => {
  const out = run({ form, Q0, n, alpha: () => a });
  return !out.guarded && Number.isFinite(out.final) && Math.abs(out.final - PHI) < 1e-3;
};
const gridA = [0.2, 0.5, 1.0, 1.2, 1.3, 1.35, 1.4, 1.45, 1.5, 1.6];
const gridB = [0.2, 0.3, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.9, 1.0];
console.log("   slider sweep, 60 iterations from Q = 2, criterion |Q - phi| < 1e-3:");
console.log("      form A settles: " + gridA.filter((a) => settles("A", a)).join(", "));
console.log("      form A fails  : " + gridA.filter((a) => !settles("A", a)).join(", "));
console.log("      form B settles: " + gridB.filter((a) => settles("B", a)).join(", "));
console.log("      form B fails  : " + gridB.filter((a) => !settles("B", a)).join(", "));
ok("form A settles at 1.00 and fails at 1.60", settles("A", 1.0) && !settles("A", 1.6));
ok("form B fails at 1.00 and settles at 0.30", !settles("B", 1.0) && settles("B", 0.3));
const starts = [1.2, 1.5, 1.7, 2, 3, 5, 10];
const bAll = starts.every((s) => { const o = run({ form: "B", Q0: s, n: 200, alpha: () => 0.3 }); return Math.abs(o.final - PHI) < 1e-3; });
ok("form B at alpha = 0.30 settles from every tested start " + JSON.stringify(starts), bAll);
// The sweep criterion is a practical one, "within 1e-3 after 60 tests", and it does
// not coincide with the exact threshold: alpha = 1.40 is inside form A's window and
// still misses the criterion at 60 tests because the contraction is slow near the edge.
const slowEdge60  = run({ form: "A", Q0: 2, n: 60,   alpha: () => 1.4 });
const slowEdge2k  = run({ form: "A", Q0: 2, n: 2000, alpha: () => 1.4 });
console.log(`   alpha = 1.40 (inside the window): |Q - phi| is ${e(Math.abs(slowEdge60.final - PHI))} after 60 tests and ${e(Math.abs(slowEdge2k.final - PHI))} after 2000`);
ok("alpha = 1.40 does converge, slowly, so the sweep criterion is practical rather than exact",
   Math.abs(slowEdge60.final - PHI) > 1e-3 && Math.abs(slowEdge2k.final - PHI) < 1e-6);

console.log("");
console.log("=".repeat(78));
console.log("5. THE SANDSTORM: 400 rounds, sigma = 0.15, Q0 = 1, form A, seed " + SEED);
console.log("=".repeat(78));
const SIGMA = 0.15, NROUNDS = 400;
const runs = {
  "alpha = 1 (full step)":   SCHED.full,
  "alpha = 0.2 (constant)":  SCHED.constant02,
  "alpha = 1/(t+1)":         SCHED.inverse,
  "alpha = 1/(t+1)^2":       SCHED.invSquare,
};
const pinned = {};
console.log("   schedule                 spread of last third   average heard loss");
for (const [name, sch] of Object.entries(runs)) {
  const out = run({ form: "A", Q0: 1, n: NROUNDS, alpha: sch, sigma: SIGMA, seed: SEED });
  const p = panel(out.rows);
  pinned[name] = { ...p, final: out.final, guarded: out.guarded, rows: out.rows.length };
  console.log(`   ${name.padEnd(24)} ${e(p.spread).padStart(12)}       ${(p.avgLoss >= 0 ? "+" : "") + e(p.avgLoss)}`);
}
const stall = pinned["alpha = 1/(t+1)^2"];
console.log(`   the 1/(t+1)^2 run rests at Q = ${stall.final.toFixed(6)}, where the genie returns ${forms.A.g(stall.final).toFixed(6)}`);
console.log(`   so its standing loss is ${(stall.final - forms.A.g(stall.final)).toFixed(6)} and |Q - phi| = ${Math.abs(stall.final - PHI).toFixed(6)}`);

// the same four, averaged over 200 seeds, so the reader can see the pinned seed is typical
const NSEEDS = 200;
console.log(`   the same four rows, averaged over ${NSEEDS} seeds:`);
const across = {};
for (const [name, sch] of Object.entries(runs)) {
  let s = 0, l = 0;
  for (let k = 0; k < NSEEDS; k++) {
    const p = panel(run({ form: "A", Q0: 1, n: NROUNDS, alpha: sch, sigma: SIGMA, seed: SEED + k }).rows);
    s += p.spread; l += p.avgLoss;
  }
  across[name] = { spread: s / NSEEDS, avgLoss: l / NSEEDS };
  console.log(`   ${name.padEnd(24)} ${e(across[name].spread).padStart(12)}       ${(across[name].avgLoss >= 0 ? "+" : "") + e(across[name].avgLoss)}`);
}
ok("the ordering spread(full) > spread(constant) > spread(1/(t+1)) holds on the pinned seed",
   pinned["alpha = 1 (full step)"].spread > pinned["alpha = 0.2 (constant)"].spread &&
   pinned["alpha = 0.2 (constant)"].spread > pinned["alpha = 1/(t+1)"].spread);
ok("the same ordering holds on the 200-seed mean",
   across["alpha = 1 (full step)"].spread > across["alpha = 0.2 (constant)"].spread &&
   across["alpha = 0.2 (constant)"].spread > across["alpha = 1/(t+1)"].spread);
ok("1/(t+1)^2 has the smallest spread of all four (pinned seed)",
   Object.values(pinned).every((p) => p.spread >= pinned["alpha = 1/(t+1)^2"].spread));
ok("and the largest standing loss, by more than a factor of 10 over 1/(t+1) (pinned seed)",
   Math.abs(pinned["alpha = 1/(t+1)^2"].avgLoss) > 10 * Math.abs(pinned["alpha = 1/(t+1)"].avgLoss));
ok("1/(t+1)^2 rests where the genie is NOT satisfied: |Q - g(Q)| > 0.1",
   Math.abs(stall.final - forms.A.g(stall.final)) > 0.1);
ok("no run tripped the domain guard", Object.values(pinned).every((p) => !p.guarded && p.rows === NROUNDS));

console.log("");
console.log("=".repeat(78));
console.log("6. THE SAME POINT WITH NO RANDOMNESS: clean genie, far start Q0 = 8, 200 steps");
console.log("=".repeat(78));
const far1 = run({ form: "A", Q0: 8, n: 200, alpha: SCHED.inverse });
const far2 = run({ form: "A", Q0: 8, n: 200, alpha: SCHED.invSqHalf });
let s1 = 0, s2 = 0;
for (let t = 0; t < 200; t++) { s1 += SCHED.inverse(t); s2 += SCHED.invSqHalf(t); }
console.log(`   alpha = 1/(t+1)      -> ${far1.final.toFixed(6)}   |err| ${e(Math.abs(far1.final - PHI))}   sum of steps ${s1.toFixed(4)} (grows without bound)`);
console.log(`   alpha = 0.5/(t+1)^2  -> ${far2.final.toFixed(6)}   |err| ${e(Math.abs(far2.final - PHI))}   sum of steps ${s2.toFixed(4)} (bounded by 0.5*pi^2/6 = ${(0.5 * Math.PI * Math.PI / 6).toFixed(6)})`);
const kept = Math.abs(far2.final - PHI) / Math.abs(8 - PHI);
console.log(`   the second keeps ${(100 * kept).toFixed(1)} per cent of its initial error, forever`);
ok("1/(t+1) from Q0 = 8 lands within 1e-3 of phi", Math.abs(far1.final - PHI) < 1e-3);
ok("0.5/(t+1)^2 from Q0 = 8 keeps more than 25 per cent of its initial error", kept > 0.25);
ok("the bounded schedule's steps sum to less than 0.5*pi^2/6", s2 < 0.5 * Math.PI * Math.PI / 6);

console.log("");
console.log("=".repeat(78));
console.log("7. SANITY CHECKS FOR THE NOTEBOOK");
console.log("=".repeat(78));
const s2run = run({ form: "A", Q0: 1, n: 60, alpha: SCHED.decay(1.0, 5.0) });
console.log(`   sanity 2, clean, alpha_0 = 1.0, decay_rate = 5.0, 60 rounds: |final - phi| = ${e(Math.abs(s2run.final - PHI))}`);
for (const d of [3, 10, 20]) {
  const o = run({ form: "A", Q0: 1, n: 60, alpha: SCHED.decay(1.0, d) });
  console.log(`      decay_rate ${String(d).padStart(2)}: |final - phi| = ${e(Math.abs(o.final - PHI))}`);
}
ok("sanity 2 converges below 1e-6", Math.abs(s2run.final - PHI) < 1e-6);

const s3run = run({ form: "A", Q0: 1, n: 400, alpha: SCHED.decay(1.0, 5.0), sigma: SIGMA, seed: SEED });
const p3 = panel(s3run.rows);
console.log(`   sanity 3, noisy, same schedule, 400 rounds, seed ${SEED}: spread ${e(p3.spread)}, average heard loss ${e(p3.avgLoss)}`);
let s3s = 0, s3l = 0;
for (let k = 0; k < NSEEDS; k++) {
  const p = panel(run({ form: "A", Q0: 1, n: 400, alpha: SCHED.decay(1.0, 5.0), sigma: SIGMA, seed: SEED + k }).rows);
  s3s += p.spread; s3l += p.avgLoss;
}
console.log(`      over ${NSEEDS} seeds: spread ${e(s3s / NSEEDS)}, average heard loss ${e(s3l / NSEEDS)}`);
ok("sanity 3 spread below 0.02 and |average heard loss| below 0.05 on the pinned seed", p3.spread < 0.02 && Math.abs(p3.avgLoss) < 0.05);
ok("sanity 3 thresholds also hold on the 200-seed mean", s3s / NSEEDS < 0.02 && Math.abs(s3l / NSEEDS) < 0.05);

// the wrong-sign failure the sanity check is there to catch
let wrong = 1;
const wrongSeq = [wrong];
for (let t = 0; t < 3; t++) { const g = forms.A.g(wrong); wrong = wrong - 1 * (g - wrong); wrongSeq.push(wrong); }
console.log(`   wrong sign (loss = target - guess, kept guess = guess - step), clean, from Q = 1: ${wrongSeq.map((x) => String(x)).join(" -> ")}`);
console.log("      the first update lands on Q = 0, which the genie cannot test at all");
ok("the wrong sign leaves the deck table on the very first update", Math.abs(wrongSeq[1] - 2) > 1e-9 && wrongSeq[1] === 0);

console.log("");
const failed = checks.filter((c) => !c.cond);
if (failed.length) { console.log(`${failed.length} ASSERTION(S) FAILED:`); failed.forEach((c) => console.log("   " + c.label)); process.exit(1); }
console.log(`All assertions passed. (${checks.length} checks)`);
