/* ============================================================================
   loop.js : one run of guess, check, correct.

   run(opts) walks the loop and returns one record per round. Every number in
   a record is something the participant could have written down while
   playing: the guess handed over, what came back, the loss between them, and
   the step size used. Nothing here knows the answer, so nothing downstream
   can leak it.

     Q <- Q - alpha * (Q - target)

   The two readouts are the instrument panel of scenes 4 and 5. Both are
   computed from the record list alone:

     spread(rows)      standard deviation of the guesses in the last third
     avgHeardLoss(rows) mean of the losses in the last third

   Exposes window.Loop.
   ============================================================================ */
(function () {
  "use strict";

  /* opts: { form, q0, n, schedule, sigma, rng, allowRefused }
     rng is a function returning [0,1); required when sigma > 0.

     By default the run HALTS the first time the loop lands on a number the
     genie refuses, which is what the bargain says happens. Pass
     allowRefused: true to keep walking anyway and mark those rows; scene 3
     needs that, because the point it makes is that the loop under form B
     walks out of the bargain and then settles, with total confidence, on a
     number that will never buy your freedom.

     Returns { rows, stopped, last }; stopped is a reason string in words. */
  function run(opts) {
    opts = opts || {};
    var formKey = opts.form || "A";
    var q = opts.q0 === undefined ? 1 : opts.q0;
    var n = opts.n === undefined ? 6 : opts.n;
    var sched = opts.schedule || window.Schedules.full();
    var sigma = opts.sigma || 0;
    var rng = opts.rng || null;
    var rows = [];
    var stopped = null;

    for (var t = 0; t < n; t++) {
      var why = window.Genie.refuse(q, formKey);
      if (why && !opts.allowRefused) { stopped = why; break; }
      /* even with allowRefused, a pole is a division by zero and there is
         nothing to continue with */
      if (why && q === window.Genie.form(formKey).pole) { stopped = why; break; }
      if (why && !stopped) stopped = why;
      var noise = 0;
      if (sigma > 0 && rng) noise = window.RNG.gauss(rng, sigma);
      var answer = window.Genie.ask(q, { form: formKey, noise: noise });
      var alpha = sched.alpha(t);
      var loss = window.Genie.loss(q, answer.heard);
      var next = q - alpha * loss;
      rows.push({
        t: t,
        q: q,
        refused: !!why,
        clean: answer.clean,
        heard: answer.heard,
        loss: loss,
        alpha: alpha,
        next: next
      });
      q = next;
    }
    return { rows: rows, stopped: stopped, last: q };
  }

  function lastThird(values) {
    if (!values.length) return [];
    var from = Math.floor((values.length * 2) / 3);
    return values.slice(from);
  }

  function mean(values) {
    if (!values.length) return NaN;
    var s = 0;
    for (var i = 0; i < values.length; i++) s += values[i];
    return s / values.length;
  }

  function sd(values) {
    if (values.length < 2) return NaN;
    var m = mean(values);
    var s = 0;
    for (var i = 0; i < values.length; i++) s += (values[i] - m) * (values[i] - m);
    return Math.sqrt(s / values.length);
  }

  /* Does the loop settle? Spread of the guesses over the last third of the run. */
  function spread(rows) {
    return sd(lastThird(rows.map(function (r) { return r.q; })));
  }

  /* Is the genie satisfied? Mean of the losses actually heard, last third. */
  function avgHeardLoss(rows) {
    return mean(lastThird(rows.map(function (r) { return r.loss; })));
  }

  window.Loop = {
    run: run,
    spread: spread,
    avgHeardLoss: avgHeardLoss,
    lastThird: lastThird,
    mean: mean,
    sd: sd
  };
})();
