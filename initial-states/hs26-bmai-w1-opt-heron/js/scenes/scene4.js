/* ============================================================================
   scene4.js : The digits. STUB. Built by issue-prompts/04-scene4-digits.md.

   The payoff, and the first scene in the deck allowed to print the value of
   sqrt(2026). Everything it needs is already pinned and verified in
   data/datasets.js: heron45, bisection45, fixedNudge, stepsToTol, rootDigits.
   ============================================================================ */
(function () {
  "use strict";
  window.scenes = window.scenes || {};
  window.scenes.scene4 = function (root) {
    window.Stub.render(root, {
      title: "Three, six, fourteen, thirty, sixty one.",
      lede: "Carlos's table run from 45 to convergence, with one column added:"
        + " how many leading digits of the width are correct. The count"
        + " doubles. Watching a number double five times in five clicks is the"
        + " astonishing part, and it is real.",
      job: "Run the table, add the correct-digit column, and put two"
        + " comparisons on the same axes so that doubling has something to"
        + " double against.",
      steps: [
        "Step the table one row per click, using DATA.heron45.",
        "Reveal the correct-digit column. It reads 3, 6, 14, 30, 61.",
        "Only now may the phrase quadratic convergence appear, and only after"
          + " the column has already doubled twice on screen.",
        "Comparison A, bisection on [45, 46]: 20 steps to a bracket of width"
          + " 1e-6, 34 steps to 1e-10. About a third of a digit per step,"
          + " forever.",
        "Comparison B, Carlos's arrow with a FIXED distance: from 45 with"
          + " alpha = 0.1 the sequence is 45.0, 45.1, 45.0, 45.1 immediately"
          + " and forever, and never gets closer than 1.111e-2. The orbit"
          + " radius is set by alpha. This is the bridge, and it arrives as a"
          + " measured fact rather than as a promise.",
        "A participant driven magnify control, 10^4 per click, drawing the"
          + " previous frame as a labelled inset, with the factor printed at"
          + " all times."
      ],
      numbers: [
        "Digit column 3, 6, 14, 30, 61, asserted in precompute/build_data.py."
          + " Print the definition next to it: this counts leading decimal"
          + " digits of theta agreeing with the root. The standard measure,"
          + " -log10 of the relative error, is DATA.heron45[k].relDigits and"
          + " reads 3.608, 7.516, 15.333, 30.968, 62.236. Both double. Show"
          + " both, because an undefined counter is a fabricated counter.",
        "The gap between the two sides, EXACTLY: 2.222222e-2, 2.742807e-6,"
          + " 4.178407e-14, 9.697100e-30, 5.222807e-61. DATA.heron45[k].gapSci."
          + " This collapse across scales is why the loupe has to exist: a"
          + " linear ruler shows one step and then nothing.",
        "Do not recompute that column in JavaScript. In IEEE doubles the third"
          + " row reads 4.973799e-14 and the fourth reads 7.105427e-15, which"
          + " is exactly one ulp at 45, so from there on the browser is"
          + " measuring its own rounding error and the collapse appears to"
          + " stall. Both readings are pinned: DATA.heron45[k].gapSci is the"
          + " mathematics, DATA.bracket45[k].width is what a double says.",
        "The loupe ladder, DATA.loupe: 10^3, 10^6, 10^14, 10^30, 10^61, with"
          + " the mismatch under it staying between 4 and 36 px at every rung"
          + " (35.56, 4.39, 6.69, 15.52, 8.36). The loupe exponent and the"
          + " digit count are the same number, and both double.",
        "Bisection: 20 and 34 steps, DATA.bisection45.",
        "Fixed nudge closest approach: 1.1110e-02 at alpha 0.1, 1.1097e-03 at"
          + " 0.01, 1.0974e-04 at 0.001. DATA.fixedNudge.",
        "sqrt(2026) = 45.011109739707595882970... DATA.rootDigits, 70 places."
      ],
      issue: "issue-prompts/04-scene4-digits.md",
      owners: "Daniele, the same TA as scene 3"
    });
    return {};
  };
})();
