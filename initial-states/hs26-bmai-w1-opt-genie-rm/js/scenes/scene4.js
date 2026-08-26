/* ============================================================================
   scene4.js : The sandstorm. STUB, and registered, titled and reachable.

   Owner Suei-Wen. Specified in issue-prompts/03-scene4-sandstorm.md.

   What it will do. The wind rises and the genie's answer arrives blurred:
   the same Q handed over twice comes back as two different numbers, and the
   losses stop shrinking. The instrument panel appears here, two readouts
   BOTH computable from what the participant heard and NEITHER using the
   answer: the spread of the guesses over the last third of the run, and the
   average of the heard losses over the last third. Three runs on one click
   each, same seed and same start, alpha = 1, alpha = 0.2, alpha = 1/(t+1).

   The reading the scene has to earn: a constant step settles into a band and
   the band never closes, however long the loop runs.

   Everything it needs is already built and verified. js/loop.js takes sigma
   and an rng and returns the heard loss per row; js/loop.js also exposes
   spread() and avgHeardLoss(); js/rng.js is the seeded stream; and
   precompute/verify-genie.mjs assertion (g) already pins the ordering of the
   three spreads on the pinned seed AND on the mean of 200 seeds. What is
   missing is js/panel.js and this scene.

   THE MEASURED NUMBERS ARE IN THE README, printed by
   `node precompute/verify-genie.mjs --print`. Do not retype them into this
   file: the scene computes them live from the same modules the verifier
   loaded, which is what keeps the page and the verifier from drifting apart.
   ============================================================================ */
(function () {
  "use strict";
  window.scenes = window.scenes || {};
  window.scenes.scene4 = function (root) {
    window.Stub.render(root, {
      n: 4,
      title: "The sandstorm.",
      lede: "Hand the genie the same number twice and hear two different " +
            "answers. Everything learned so far has to survive that.",
      owner: "Suei-Wen",
      issue: "issue-prompts/03-scene4-sandstorm.md",
      does: [
        "Turn on the storm: the genie's answer arrives as its test plus a " +
          "Gaussian draw of standard deviation 0.15, from the pinned seed 20260904.",
        "Show the instrument panel: spread of the guesses over the last third " +
          "of the run, and the average of the heard losses over the last third.",
        "Run three schedules on one click each, same seed and same start: " +
          "alpha = 1, alpha = 0.2, alpha = 1/(t + 1).",
        "Hold all three traces on one axis so the bands are comparable.",
        "Earn one reading: the constant step settles into a band, and the " +
          "band never closes."
      ],
      built: [
        "js/loop.js run({ sigma, rng }) already returns the heard loss per row.",
        "js/loop.js spread() and avgHeardLoss() are the two panel readouts.",
        "js/rng.js is the seeded Mulberry32 stream, seed 20260904.",
        "js/trace.js create() holds several series on one axis already.",
        "Verifier assertion (g) pins the ordering of the three spreads."
      ]
    });
    return {};
  };
})();
