/* ============================================================================
   scene2.js : The full step. BUILT.

   Scene 1 let the participant choose freely. Almost everyone converges on the
   same move without being told, and this scene names it. The move is written
   TWICE, and the equivalence is the hinge:

       Q  <-  target        move onto the number that came back
       Q  <-  Q - loss      subtract the whole loss

   They are the same instruction, because loss = Q - target. Writing it the
   second way is what makes scene 3 possible, since only the second way has a
   dial on it.

   Then the deck's own six rows, one per click, as EXACT FRACTIONS:

       1, 2, 3/2, 5/3, 8/5, 13/8      losses -1, +1/2, -1/6, +1/15, -1/40, +1/104

   The guesses are consecutive ratios of Fibonacci numbers and the losses are
   the Cassini identity, which is why the denominators run 1, 2, 6, 15, 40,
   104 and the signs alternate. The fractions come from DATA.deckTable, which
   precompute/verify-genie.mjs asserts against a live run of js/loop.js to
   1e-15 (assertion b). The page prints fractions; the verifier checks that
   the arithmetic behind them is the page's own.

   Carlos's "verdict" and "update" columns are promoted onto the deck's three
   here, which completes his five-column table from handwritten page 1.

   NOTHING IS NAMED IN THIS SCENE. The number has no name here and no line
   is drawn for it. The only convergence signal is the size of the loss on a
   log strip, which says how far the participant's own two numbers are from
   each other and nothing about where the answer is. Assertion (j) of the
   verifier checks the same thing from the other side, by refusing this file
   if it so much as mentions the answer.

   ?test hooks
     ?test=full   all six rows laid in
   ============================================================================ */
(function () {
  "use strict";

  window.scenes = window.scenes || {};
  window.scenes.scene2 = function (root) {
    var rows = (window.DATA && window.DATA.deckTable) || [];
    var cursor = 0;
    var table = null;
    var spark = null;
    var els = {};

    build();
    render();

    function frac(pair) {
      var n = pair[0], d = pair[1];
      if (d === 1) return String(n);
      return n + "/" + d;
    }
    function signedFrac(pair) {
      var n = pair[0], d = pair[1];
      var sign = n < 0 ? "-" : "+";
      var body = d === 1 ? String(Math.abs(n)) : Math.abs(n) + "/" + d;
      return sign + body;
    }

    function build() {
      var h = document.createElement("h2");
      h.textContent = "The move you kept making.";
      root.appendChild(h);

      var lede = document.createElement("p");
      lede.className = "scene-lede";
      lede.textContent =
        "You handed the genie a number, it handed one back, and you handed " +
        "back the one it gave you. That move has two descriptions and they " +
        "are the same instruction.";
      root.appendChild(lede);

      var cols = document.createElement("div");
      cols.className = "scene-cols";
      root.appendChild(cols);

      var left = document.createElement("div");
      cols.appendChild(left);

      var tableHost = document.createElement("div");
      left.appendChild(tableHost);
      table = window.Table.create(tableHost, {
        emptyText: "Press Next to run the move from Q = 1.",
        extra: [
          { key: "verdict", text: "verdict", tex: null, cls: "col-verdict" },
          { key: "update", text: "update", tex: null, cls: "col-update" }
        ]
      });

      var ctl = document.createElement("div");
      ctl.className = "guess-row";
      left.appendChild(ctl);

      els.step = document.createElement("button");
      els.step.type = "button";
      els.step.className = "btn btn-primary";
      els.step.textContent = "Take the step";
      els.step.setAttribute("data-run-primary", "");
      ctl.appendChild(els.step);

      els.reset = document.createElement("button");
      els.reset.type = "button";
      els.reset.className = "btn btn-ghost";
      els.reset.textContent = "Start over";
      ctl.appendChild(els.reset);

      els.count = document.createElement("span");
      els.count.className = "run-summary";
      ctl.appendChild(els.count);

      els.step.addEventListener("click", function () { next(); });
      els.reset.addEventListener("click", function () { cursor = 0; render(); });

      /* --- right: the move, written twice ------------------------------ */
      var right = document.createElement("div");
      cols.appendChild(right);

      var card = document.createElement("section");
      card.className = "card";
      card.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">The move you kept making</span>' +
        '<span class="card-note">two descriptions, one instruction</span>' +
        "</div>";
      var body = document.createElement("div");
      body.className = "card-body";
      card.appendChild(body);
      right.appendChild(card);

      var a = document.createElement("p");
      a.className = "step-note";
      a.textContent = "Move onto the number that came back";
      body.appendChild(a);
      body.appendChild(window.Katex.display("Q \\;\\leftarrow\\; \\text{target}"));

      var b = document.createElement("p");
      b.className = "step-note";
      b.style.marginTop = "12px";
      b.textContent = "Subtract the whole loss";
      body.appendChild(b);
      body.appendChild(window.Katex.display("Q \\;\\leftarrow\\; Q - \\text{loss}"));

      var why = document.createElement("p");
      why.className = "body-line";
      why.textContent =
        "They agree because the loss is Q minus the target. Subtracting the " +
        "whole loss lands exactly on the target. The second way of writing " +
        "it is the one with a dial on it, and scene 3 turns that dial.";
      body.appendChild(why);

      var sparkCard = document.createElement("section");
      sparkCard.className = "card";
      sparkCard.style.marginTop = "16px";
      sparkCard.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">How far off</span>' +
        '<span class="card-note">one point per step</span>' +
        "</div>";
      var sparkBody = document.createElement("div");
      sparkBody.className = "card-body";
      sparkCard.appendChild(sparkBody);
      right.appendChild(sparkCard);
      spark = window.Trace.spark(sparkBody);

      els.sparkNote = document.createElement("p");
      els.sparkNote.className = "plot-caption";
      els.sparkNote.textContent = "Two steps are needed before this says anything.";
      sparkBody.appendChild(els.sparkNote);
    }

    function render() {
      table.clear();
      var losses = [];
      for (var i = 0; i < cursor && i < rows.length; i++) {
        var r = rows[i];
        var lossVal = r.loss[0] / r.loss[1];
        losses.push(lossVal);
        table.addRow({
          round: String(i + 1),
          q: frac(r.q),
          target: frac(r.target),
          loss: signedFrac(r.loss),
          verdict: lossVal > 0 ? "too big" : (lossVal < 0 ? "too small" : "accepted"),
          update: "Q <- " + frac(r.target)
        });
      }
      els.count.textContent = cursor + " of " + rows.length + " steps";
      els.step.disabled = cursor >= rows.length;

      if (losses.length < 2) {
        spark.render([]);
        els.sparkNote.textContent = "Two steps are needed before this says anything.";
      } else {
        spark.render(losses);
        els.sparkNote.textContent =
          "Every step, the gap shrinks and changes sign. The guesses close in " +
          "from alternating sides.";
      }
    }

    function next() {
      if (cursor >= rows.length) return false;
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

    if (window.GenieViz && window.GenieViz.param("test") === "full") {
      cursor = rows.length;
      render();
    }

    return { onNextKey: next, onPrevKey: prev, onEnter: render };
  };
})();
