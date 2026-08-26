/* ============================================================================
   genie.js : the bargain itself.

   The genie frees you when you name a POSITIVE number that its own test
   accepts. The test is a function of the number you hand over:

     form A   g(Q) = 1 + 1/Q        the way the bargain is first written
     form B   h(Q) = 1/(Q - 1)      the same bargain, rearranged in one line

   Both forms have the same two solutions, because Q = 1 + 1/Q, Q^2 = Q + 1
   and Q(Q - 1) = 1 are the same equation. They do NOT behave the same under
   the loop, and that difference is the whole of scene 3. Nothing in this file
   knows what the solutions are: it only evaluates the test and applies the
   positivity clause. The solutions live in data/datasets.js under DATA.reveal
   and are not read before scene 6.

   Exposes window.Genie.
   ============================================================================ */
(function () {
  "use strict";

  var FORMS = {
    A: {
      key: "A",
      label: "1 + 1/Q",
      tex: "1 + \\frac{1}{Q}",
      test: function (q) { return 1 + 1 / q; },
      /* the point the test is undefined at */
      pole: 0
    },
    B: {
      key: "B",
      label: "1/(Q - 1)",
      tex: "\\frac{1}{Q - 1}",
      test: function (q) { return 1 / (q - 1); },
      pole: 1
    }
  };

  function form(key) { return FORMS[key === "B" ? "B" : "A"]; }

  /* The positivity clause, and the only guard the viz needs. A number the
     genie refuses gets a reason in words, so colour is never the only channel
     saying that something was rejected. */
  function refuse(q, formKey) {
    var f = form(formKey);
    if (typeof q !== "number" || !isFinite(q)) return "The genie wants a number.";
    if (q <= 0) return "The genie wants a positive number.";
    if (q === f.pole) return "The genie cannot divide by zero. Try another number.";
    return null;
  }

  function accepts(q, formKey) { return refuse(q, formKey) === null; }

  /* Hand the genie a number and hear what its test returns. `noise` is the
     sandstorm: a draw already made by the caller, added to the clean answer.
     Returns { clean, heard } so a scene can show what was heard while the
     verifier checks the clean value. */
  function ask(q, opts) {
    opts = opts || {};
    var f = form(opts.form);
    var clean = f.test(q);
    var heard = clean + (opts.noise || 0);
    return { clean: clean, heard: heard };
  }

  /* loss = your number minus what came back. The AINIT deck's convention,
     kept character for character so the table headers match the slide. */
  function loss(q, target) { return q - target; }

  window.Genie = {
    FORMS: FORMS,
    form: form,
    refuse: refuse,
    accepts: accepts,
    ask: ask,
    loss: loss
  };
})();
