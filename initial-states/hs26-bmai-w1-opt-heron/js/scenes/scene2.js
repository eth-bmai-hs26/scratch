/* ============================================================================
   scene2.js : The bracket. STUB. Built by issue-prompts/02-scene2-bracket.md.

   This is the discovery scene and the one that carries the whole design, so it
   is deliberately NOT sketched here. A half built version of this scene would
   be worse than none, because the thing it has to get right is the feedback
   rule, and a wrong feedback rule teaches the wrong lesson silently.

   Everything it needs is already available and verified:
     window.Heron.bracket(theta)      the two sides, sorted
     window.Heron.bracketWidth(theta) what the participant is trying to shrink
     window.DATA.heron10              the pinned bracket trace from theta = 10
   ============================================================================ */
(function () {
  "use strict";
  window.scenes = window.scenes || {};
  window.scenes.scene2 = function (root) {
    window.Stub.render(root, {
      title: "You know two numbers, and the answer is between them.",
      lede: "The discovery scene. It restarts from a deliberately bad guess,"
        + " theta = 10, so the rectangle is 10 by 202.6 and the gap between the"
        + " two sides is wide enough to play with.",
      job: "Project the two sides onto a ruler as two marks with a bracket"
        + " between them. The participant types the next width. The only"
        + " feedback is the new bracket width. The target is never marked,"
        + " only the bracket, and the bracket is the two sides of the"
        + " rectangle they are already looking at.",
      steps: [
        "Show the rectangle at theta = 10 and project its two sides onto a ruler.",
        "Take a typed guess. Redraw the bracket. Report only its new width.",
        "A guess outside the current bracket makes it strictly wider, and the"
          + " scene says so. This is theorem 2 and it is verified over 300000"
          + " samples in precompute/build_data.py.",
        "A guess inside narrows it by an amount that is visible.",
        "After three guesses, show the running best and store it under"
          + " heron-best-bracket in localStorage.",
        "Close on the prompt: you know two numbers and you know the answer is"
          + " between them. Say what you would do with no square root key."
      ],
      numbers: [
        "From theta = 10 the bracket is [10, 202.6], width 192.6.",
        "Entering 106.3 gives bracket width 87.240734.",
        "The pinned Heron trace from 10 is DATA.heron10, seven rows.",
        "The midpoint of the bracket IS one Heron step. Theorem 3. Do not let"
          + " the scene say so: that is scene 3."
      ],
      issue: "issue-prompts/02-scene2-bracket.md",
      owners: "Jinlei, who also builds the ruler in issue 01"
    });
    return {};
  };
})();
