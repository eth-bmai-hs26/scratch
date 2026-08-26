/* ============================================================================
   scene3.js : Heron. STUB. Built by issue-prompts/03-scene3-heron.md.

   Names the algorithm, after the attempt and never before it. This is the
   first scene allowed to draw the square guide: call
   view.setOptions({ showSquare: true }).
   ============================================================================ */
(function () {
  "use strict";
  window.scenes = window.scenes || {};
  window.scenes.scene3 = function (root) {
    window.Stub.render(root, {
      title: "Average the two sides.",
      lede: "The correction stops being an arrow. You have two numbers and no"
        + " square root key. The cheapest thing you can do with two numbers is"
        + " average them, and that average is the algorithm.",
      job: "Build theta <- (theta + 2026/theta)/2 in three clicks, then state"
        + " the invariant as a claim scene 4 can test.",
      steps: [
        "Click 1: the two sides as two marks on the ruler.",
        "Click 2: the midpoint construction drawn between them.",
        "Click 3: the rectangle rebuilt with that midpoint as its width.",
        "Then the formula, rendered with the vendored KaTeX, one term at a time.",
        "Then the invariant: after the first correction the rectangle is never"
          + " tall again, so the residual changes sign once and never again.",
        "Then the honest caveat. The midpoint is not the best possible next"
          + " guess. The best possible next guess is the geometric mean of the"
          + " two sides, which IS the answer and is therefore unavailable. The"
          + " arithmetic mean is the best you can do with two numbers, addition"
          + " and division by two. Say this out loud rather than letting a"
          + " sharp participant catch it later."
      ],
      numbers: [
        "One step from 45 is 45.01111111111111 in doubles, pinned as"
          + " DATA.doubles.stepFrom45.",
        "The AM-GM invariant is verified over 39999 starts in"
          + " precompute/build_data.py, zero iterates below the root after one"
          + " correction.",
        "No date and no attribution goes on screen unless somebody pins it to"
          + " a primary source first. The exercise works with no history at all."
      ],
      issue: "issue-prompts/03-scene3-heron.md",
      owners: "Daniele, who also builds scene 4: naming and payoff are one voice"
    });
    return {};
  };
})();
