/* ============================================================================
   schedules.js : how big this round's step is.

   A schedule is a function of the round index t (0-based) returning alpha.
   Four of them, and the exercise is a comparison between them:

     full             alpha = 1                  move the whole way onto the target
     constant(c)      alpha = c                  move a fixed fraction of the way
     inverse(c)       alpha = c/(t + 1)          shrink, slowly
     inverseSquare(c) alpha = c/(t + 1)^2        shrink, fast
     decay(a0, d)     alpha = a0/(1 + t/d)       shrink, slowly, with a knob

   decay is the same shape as inverse and it is the one the coding exercise
   hands over already written (the AINIT darts cartridge uses exactly
   alpha_0 / (1 + t / decay_rate)). It is kept as its own entry so the page,
   the notebook and the verifier all name the schedule the same way. With
   a0 = 1 and d = 5 it is the schedule scene 6 runs.

   The names are deliberately about the shape of the number, not about which
   one is right. Which one is right is the thing the participant works out.

   Exposes window.Schedules.
   ============================================================================ */
(function () {
  "use strict";

  function full() {
    return { key: "full", label: "alpha = 1", alpha: function () { return 1; } };
  }

  function constant(c) {
    return {
      key: "constant",
      label: "alpha = " + c,
      alpha: function () { return c; }
    };
  }

  function inverse(c) {
    if (c === undefined) c = 1;
    return {
      key: "inverse",
      label: c === 1 ? "alpha = 1/(t + 1)" : "alpha = " + c + "/(t + 1)",
      alpha: function (t) { return c / (t + 1); }
    };
  }

  function inverseSquare(c) {
    if (c === undefined) c = 1;
    return {
      key: "inverseSquare",
      label: c === 1 ? "alpha = 1/(t + 1)^2" : "alpha = " + c + "/(t + 1)^2",
      alpha: function (t) { return c / ((t + 1) * (t + 1)); }
    };
  }

  /* alpha = a0 / (1 + t/d). The exercise's own schedule, given to the
     participant already written so that only the update line is blank. */
  function decay(a0, d) {
    if (a0 === undefined) a0 = 1;
    if (d === undefined) d = 5;
    return {
      key: "decay",
      label: "alpha = " + a0 + "/(1 + t/" + d + ")",
      alpha: function (t) { return a0 / (1 + t / d); }
    };
  }

  window.Schedules = {
    full: full,
    constant: constant,
    inverse: inverse,
    inverseSquare: inverseSquare,
    decay: decay
  };
})();
