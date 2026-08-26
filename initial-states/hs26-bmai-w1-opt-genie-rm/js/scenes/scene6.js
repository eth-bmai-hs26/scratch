/* ============================================================================
   scene6.js : The number. BUILT.

   THE ONLY SCENE ALLOWED TO REVEAL. It is the only file in the whole viz
   that reads DATA.reveal and the only caller of Trace.setTruthVisible(true).
   Grepping for either is therefore a complete audit of who can show the
   answer, which is what makes the course-viz rule "never display the answer
   before the student attempts it" enforceable rather than a matter of care.
   Verifier assertion (j) checks the same thing from the other side, by
   refusing any scene file numbered 0 to 5 that so much as mentions it.

   Four steps.
     1  run the shrinking schedule with the storm off and read the digits
     2  name it
     3  the algebra the genie was hiding, and the two roots
     4  the callback: the number the loop fled to in scene 3 was the other
        root, and the participant can go back by URL and check

   The digits are computed live from js/loop.js on the schedule pinned in
   DATA.reveal.revealRun, and verifier assertion (l) checks that the same run
   through the same modules prints 1.6180339887 to ten decimals. Nothing is
   typed into this file.

   ON LEAVING, THE TRUTH LINE STAYS ON. Scenes 7 and 8 come after the reveal,
   so hiding it again would be theatre. A participant who pages back to scene
   3 after the reveal sees the truth line there too, and that is the point of
   the callback: the number the loop fled to is now labelled.

   ?test hooks
     ?test=revealed   all four steps
   ============================================================================ */
(function () {
  "use strict";

  var STEPS = 4;

  window.scenes = window.scenes || {};
  window.scenes.scene6 = function (root) {
    var cursor = 0;
    var reveal = (window.DATA && window.DATA.reveal) || {};
    var spec = reveal.revealRun || { form: "A", q0: 1, n: 60, alpha0: 1, decayRate: 5 };
    var res = window.Loop.run({
      form: spec.form,
      q0: spec.q0,
      n: spec.n,
      schedule: window.Schedules.decay(spec.alpha0, spec.decayRate)
    });
    var trace = null;
    var els = {};

    build();
    render();

    function build() {
      var h = document.createElement("h2");
      h.textContent = "The number.";
      root.appendChild(h);

      var lede = document.createElement("p");
      lede.className = "scene-lede";
      lede.textContent =
        "The storm is off. The step shrinks on the schedule the loop earned. " +
        "Run it out and read what the loop is holding.";
      root.appendChild(lede);

      var cols = document.createElement("div");
      cols.className = "scene-cols";
      root.appendChild(cols);

      var left = document.createElement("div");
      cols.appendChild(left);

      var card = document.createElement("section");
      card.className = "card";
      card.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">Where the guesses went</span>' +
        '<span class="card-note">' + spec.n + " tests, storm off</span>" +
        "</div>";
      var body = document.createElement("div");
      body.className = "card-body";
      card.appendChild(body);
      left.appendChild(card);
      trace = window.Trace.create(body);

      els.digits = document.createElement("p");
      els.digits.className = "reveal-digits";
      left.appendChild(els.digits);

      els.digitsNote = document.createElement("p");
      els.digitsNote.className = "plot-caption";
      left.appendChild(els.digitsNote);

      var right = document.createElement("div");
      cols.appendChild(right);

      els.name = card2(right, "Its name", "step 2 of 4");
      var np = document.createElement("p");
      np.className = "body-line";
      np.style.marginTop = "0";
      np.textContent =
        "It is the golden ratio. It has been written down for two thousand " +
        "years and the loop found it with arithmetic alone.";
      els.name.appendChild(np);

      els.alg = card2(right, "What the genie was hiding", "step 3 of 4");
      var ap = document.createElement("p");
      ap.className = "body-line";
      ap.style.marginTop = "0";
      ap.textContent = "Multiply the bargain by Q and it is a quadratic:";
      els.alg.appendChild(ap);
      els.alg.appendChild(window.Katex.display("Q = 1 + \\frac{1}{Q} \\quad\\Longleftrightarrow\\quad Q^2 = Q + 1"));

      var roots = document.createElement("p");
      roots.className = "body-line";
      var r0 = (reveal.roots && reveal.roots[0]) || NaN;
      var r1 = (reveal.roots && reveal.roots[1]) || NaN;
      roots.textContent =
        "It has two roots, " + r0.toFixed(9) + " and " + r1.toFixed(9) +
        ". The bargain asked for a positive number, and that clause is the " +
        "whole reason the loop was looking for the first one.";
      els.alg.appendChild(roots);

      els.back = card2(right, "The other root", "step 4 of 4");
      var bp = document.createElement("p");
      bp.className = "body-line";
      bp.style.marginTop = "0";
      bp.textContent =
        "In scene 3, form B with the whole step walked out of the positive " +
        "numbers and kept going. It was walking to " + r1.toFixed(9) +
        ". The loop was solving the same equation the whole time and heading " +
        "for the answer the bargain forbids.";
      els.back.appendChild(bp);

      var link = document.createElement("a");
      link.className = "btn btn-ghost";
      link.href = "#scene=3&test=broken-b";
      link.textContent = "Go back and look";
      els.back.appendChild(link);

      var closing = document.createElement("p");
      closing.className = "body-line";
      closing.textContent =
        "You never solved the quadratic. On a real prediction loss you could " +
        "not have.";
      els.back.appendChild(closing);
    }

    function card2(host, title, note) {
      var sec = document.createElement("section");
      sec.className = "card";
      sec.style.marginBottom = "16px";
      var head = document.createElement("div");
      head.className = "card-head";
      var t = document.createElement("span");
      t.className = "card-title";
      t.textContent = title;
      var n = document.createElement("span");
      n.className = "card-note";
      n.textContent = note;
      head.appendChild(t);
      head.appendChild(n);
      var body = document.createElement("div");
      body.className = "card-body";
      sec.appendChild(head);
      sec.appendChild(body);
      host.appendChild(sec);
      return body;
    }

    function render() {
      /* the one call site in the whole viz */
      window.Trace.setTruthVisible(true);

      var truth = (reveal.roots && reveal.roots[0]);
      trace.render({
        series: [{
          points: res.rows.map(function (r) { return { x: r.t + 1, y: r.q }; }),
          cls: "series-guess",
          dots: false
        }],
        truth: truth,
        truthLabel: "the number the genie accepts",
        yLabel: "the number you handed over",
        xLabel: "test"
      });

      els.digits.textContent = res.last.toFixed(10);
      els.digitsNote.textContent =
        "After " + res.rows.length + " tests, with the step shrinking on " +
        "alpha = " + spec.alpha0 + "/(1 + t/" + spec.decayRate + ").";

      els.name.parentNode.style.display = cursor >= 1 ? "" : "none";
      els.alg.parentNode.style.display = cursor >= 2 ? "" : "none";
      els.back.parentNode.style.display = cursor >= 3 ? "" : "none";
    }

    function next() {
      if (cursor >= STEPS - 1) return false;
      cursor++;
      render();
      return true;
    }
    function prev() {
      if (cursor <= 0) return false;
      cursor--;
      render();
      return true;
    }

    if (window.GenieViz && window.GenieViz.param("test") === "revealed") {
      cursor = STEPS - 1;
      render();
    }

    return { onNextKey: next, onPrevKey: prev, onEnter: render };
  };
})();
