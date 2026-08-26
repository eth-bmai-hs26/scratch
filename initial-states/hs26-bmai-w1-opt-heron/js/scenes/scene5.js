/* ============================================================================
   scene5.js : The bridge. STUB. Built by issue-prompts/05-scene5-bridge.md.

   A mapping table as the whole scene, in the shape the AINIT deck uses for its
   Faust frame and grasshopper uses for its REINFORCE hand off. No prose on the
   frame beyond the closing line, and no closing punchline: the last thought is
   an ordinary line of body text.
   ============================================================================ */
(function () {
  "use strict";
  window.scenes = window.scenes || {};
  window.scenes.scene5 = function (root) {
    window.Stub.render(root, {
      title: "The arrow gives the direction. Three answers give the distance.",
      lede: "One table, three columns, five rows. It hands the symbols over to"
        + " the genie game at 10:00 and to gradient descent at 11:00.",
      job: "Render the mapping table as the whole scene. Rows: the guess, what"
        + " you can measure, the verdict, how far to move, what it costs. Columns:"
        + " Heron here, the genie in Act 2, gradient descent at 11:00.",
      steps: [
        "Row 1, the guess: theta a width, theta, w a weight.",
        "Row 2, what you can measure: the other side 2026/theta, 1 + 1/theta,"
          + " the slope under your feet.",
        "Row 3, the verdict: too wide or too tall, too large or too small,"
          + " uphill or downhill.",
        "Row 4, how far to move: the average of the two sides, alpha times the"
          + " gap with alpha shrinking, alpha times the slope.",
        "Row 5, what it costs: 2 steps from 45, many and noisy, many and noisy.",
        "Then the closing line as ordinary body text, never as a centred"
          + " punchline: Heron computes its correction exactly because the"
          + " target is a number it can evaluate. Once the target is only"
          + " observable through noise the exact correction is unavailable and"
          + " the step size becomes a knob, which is Act 2. Once the thing you"
          + " are correcting is a loss surface, that knob is the learning rate,"
          + " which is 11:00."
      ],
      numbers: [
        "2 steps from 45 to |2026 - theta^2| < 1e-6, DATA.stepsToTol.",
        "Nothing else on this scene is numeric. It is a mapping table and it"
          + " carries no prose."
      ],
      issue: "issue-prompts/05-scene5-bridge.md",
      owners: "Ivan, bundled with issues 06 and 07"
    });
    return {};
  };
})();
