/* ============================================================================
   heron.js : the mathematics, and the single source of truth for it.

   Every scene calls into this module. No scene reimplements a formula, so
   there is exactly one place where the sign convention lives and exactly one
   place a bug can hide.

   SIGN CONVENTION, matching Carlos's handwritten page 1 and not the AINIT
   genie slide. His third column is

       2026 - theta^2

   so the residual is POSITIVE when the guess is too small. The genie deck in
   the same morning writes loss = Q - target, which is the opposite sign.
   Participants meet both inside two hours. That clash is recorded as open
   question 3 in proposals/viz-heron.md and is a decision for Carlos. Until it
   is decided this file follows his page, and residual() is the only function
   that has to change if the decision goes the other way.

   Exposes window.Heron. No DOM, no colours, no strings the participant reads.
   ============================================================================ */
(function () {
  "use strict";

  var AREA = (window.DATA && window.DATA.area) || 2026;

  /* The rectangle has area AREA and width theta. This is its height. */
  function otherSide(theta, area) {
    return (area === undefined ? AREA : area) / theta;
  }

  /* Carlos's third column. Positive means the guess is too small. */
  function residual(theta, area) {
    var A = area === undefined ? AREA : area;
    return A - theta * theta;
  }

  /* Carlos's fourth column. The verdict is readable off the SHAPE: the guess
     is too small exactly when the rectangle is taller than it is wide. */
  function verdict(theta, area) {
    var r = residual(theta, area);
    if (r > 0) return "too small";
    if (r < 0) return "too large";
    return "exact";
  }

  /* The same verdict said as a shape, which is what is on screen. */
  function shape(theta, area) {
    var h = otherSide(theta, area);
    if (h > theta) return "taller than it is wide";
    if (h < theta) return "wider than it is tall";
    return "a square";
  }

  /* The two sides, sorted. Theorem 1: the answer is always inside this, for
     every theta > 0. Verified over 300000 samples in precompute/build_data.py.
     Nothing in scenes 0 to 3 may draw the answer; drawing THIS is allowed,
     because it is just the two sides of the rectangle already on screen. */
  function bracket(theta, area) {
    var h = otherSide(theta, area);
    return theta < h ? { lo: theta, hi: h } : { lo: h, hi: theta };
  }

  function bracketWidth(theta, area) {
    var b = bracket(theta, area);
    return b.hi - b.lo;
  }

  /* One Heron correction: average the two sides. Theorem 3 says this is
     exactly the midpoint of the bracket, which is why a participant who
     reasons "it is somewhere in here, so I take the middle" has derived it. */
  function step(theta, area) {
    var A = area === undefined ? AREA : area;
    return (theta + A / theta) / 2;
  }

  /* Run until |residual| < tol. Returns every width visited, theta0 first. */
  function run(theta0, tol, maxSteps, area) {
    tol = tol === undefined ? 1e-6 : tol;
    maxSteps = maxSteps === undefined ? 50 : maxSteps;
    var out = [theta0];
    var t = theta0;
    var n = 0;
    while (Math.abs(residual(t, area)) >= tol && n < maxSteps) {
      t = step(t, area);
      out.push(t);
      n++;
    }
    return out;
  }

  /* Carlos's Update column with the distance held FIXED: direction only.
     This is the algorithm his arrows describe if the step size never adapts,
     and scene 4 exists to beat it. */
  function fixedNudge(theta0, alpha, steps, area) {
    var out = [theta0];
    var t = theta0;
    for (var i = 0; i < steps; i++) {
      t = residual(t, area) > 0 ? t + alpha : t - alpha;
      out.push(t);
    }
    return out;
  }

  /* Number of leading significant decimal digits of theta that agree with the
     pinned 70 place root in DATA. Doubles run out near 16, so scene 4 has to
     compare against a string. Returns 0 if the root is unavailable.

     Both operands are padded to the same length before comparing, which is the
     trap recorded in precompute/build_data.py: without the padding "45" runs
     out after two characters against "4501110973" and the honest answer 3 is
     reported as 2. */
  function correctDigits(thetaStr) {
    var ref = window.DATA && window.DATA.rootDigits;
    if (!ref || typeof thetaStr !== "string") return 0;
    var a = normalizeDigits(thetaStr);
    var b = normalizeDigits(ref);
    var len = Math.max(a.length, b.length);
    while (a.length < len) a += "0";
    while (b.length < len) b += "0";
    var n = 0;
    for (var i = 0; i < len; i++) {
      if (a.charAt(i) !== b.charAt(i)) break;
      n++;
    }
    return n;
  }

  /* Strip the sign and the decimal point. Every value this is used on lies
     between 10 and 1000 and has a two digit integer part, so the resulting
     strings are aligned and comparing them is like for like. */
  function normalizeDigits(s) {
    return String(s).replace("-", "").replace(".", "");
  }

  /* Formatting helpers. Kept here so every scene prints a number the same way. */
  function fmt(x, places) {
    return Number(x).toFixed(places === undefined ? 4 : places);
  }

  /* Scientific notation with an ASCII exponent marker, for the residual column
     once it leaves the readable range. */
  function fmtResidual(x) {
    var a = Math.abs(x);
    if (a === 0) return "0";
    if (a >= 1e-4 && a < 1e6) return trimZeros(x.toFixed(a < 1 ? 8 : 4));
    return x.toExponential(4);
  }

  function trimZeros(s) {
    if (s.indexOf(".") < 0) return s;
    return s.replace(/0+$/, "").replace(/\.$/, "");
  }

  window.Heron = {
    AREA: AREA,
    otherSide: otherSide,
    residual: residual,
    verdict: verdict,
    shape: shape,
    bracket: bracket,
    bracketWidth: bracketWidth,
    step: step,
    run: run,
    fixedNudge: fixedNudge,
    correctDigits: correctDigits,
    fmt: fmt,
    fmtResidual: fmtResidual
  };
})();
