/* ============================================================================
   scene5.js : Two demands on the step. STUB, and registered, titled and
   reachable.

   Owner Suei-Wen. Specified in issue-prompts/04-scene5-two-demands.md.

   What it will do. If shrinking the step is good, why not shrink it very
   fast? Add a fourth schedule, alpha = 1/(t + 1)^2. It has the SMALLEST
   spread of all four and a large average heard loss: it settles hard on a
   number the genie refuses, and it looks more settled than the row that is
   right. That is the trap, and it is the reason both Robbins-Monro
   conditions exist rather than one.

   Then the same point with the storm switched off and a far start, so the
   argument does not rest on a lucky draw. Then the two conditions in the
   AINIT deck's own words, with both running sums live on screen: the steps
   must add up without bound, so the loop can still travel from any start,
   and their squares must add up to something finite, so the wobble
   eventually cancels.

   Verifier assertions (h) and (i) already pin both halves of this scene.
   (h) checks that the fast-shrinking schedule rests where the genie is NOT
   satisfied; (i) checks the clean far start, where 1/(t+1) arrives and
   0.5/(t+1)^2 keeps more than a quarter of its initial error forever.

   PRECISION WARNING FOR WHOEVER WRITES THE PROSE. The correct statement is
   that when the steps add up to something finite, the per-step contraction
   factors multiply out to a nonzero limit, so a fixed fraction of the
   starting error survives. Avoid the loose phrasing "it runs out of distance
   to travel", which is a heuristic dressed as a reason.
   ============================================================================ */
(function () {
  "use strict";
  window.scenes = window.scenes || {};
  window.scenes.scene5 = function (root) {
    window.Stub.render(root, {
      n: 5,
      title: "Two demands on the step.",
      lede: "If shrinking is good, shrink fast. That breaks it in a way " +
            "which is much harder to see, because the loop looks calm.",
      owner: "Suei-Wen",
      issue: "issue-prompts/04-scene5-two-demands.md",
      does: [
        "Add a fourth schedule, alpha = 1/(t + 1)^2, to the panel of scene 4.",
        "Show that it has the smallest spread of all four and the largest " +
          "average heard loss: quiet, confident, and resting on a number the " +
          "genie refuses.",
        "Repeat the point with the storm off and a far start, so the argument " +
          "does not rest on one draw of the noise.",
        "State the two conditions in the AINIT deck's own words, with both " +
          "running sums live on screen."
      ],
      built: [
        "js/schedules.js already carries inverseSquare(c).",
        "Verifier assertion (h): the fast-shrinking schedule rests where the " +
          "genie is not satisfied.",
        "Verifier assertion (i): the clean far start from Q = 8, where " +
          "0.5/(t+1)^2 keeps 31.5 per cent of its initial error."
      ]
    });
    return {};
  };
})();
