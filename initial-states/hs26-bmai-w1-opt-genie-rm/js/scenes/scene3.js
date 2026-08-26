/* ============================================================================
   scene3.js : Breaking it. BUILT. This is the scene the exercise exists for.

   Two controls, and the participant causes both failures with their own hand.

     the step size    a slider from 0.05 to 1.60
     the form         the same bargain, written two ways

   FORM A and FORM B are the same equation. The switch carries its own one
   line proof, because a participant who does not believe they are the same
   equation learns nothing from the difference:

       Q = 1 + 1/Q      multiply by Q       Q^2 = Q + 1
                        rearrange           Q(Q - 1) = 1
                        divide by (Q - 1)   Q = 1/(Q - 1)

   Four guided steps, one per click, and the controls stay live between them:

     1  form A, alpha = 1.00, from Q = 2      it settles
     2  form A, alpha = 1.60, from Q = 2      the swings grow and it escapes
     3  form B, alpha = 1.00, from Q = 1.7    the same full step, and it flees
     4  form B, alpha = 0.30, from Q = 1.7    it settles again

   Step 3 is the moment. The full step was never safe. It happened to be safe
   for the way the bargain was first written down.

   THE TWO EXACT THRESHOLDS ARE NOT ON SCREEN, and they are not in this file.
   There is one for each form, they are stored in the reveal namespace of
   data/datasets.js, the README prints both for the TA, and in the room the
   slider is what finds them. Verifier assertion (d) pins them, and assertion
   (j) refuses this file if it has been tempted to quote them.

   Everything here is computed live by js/loop.js. Nothing is a transcript.

   ?test hooks
     ?test=broken-a   step 2, form A at 1.60
     ?test=broken-b   step 3, form B at 1.00
     ?test=fixed-b    step 4, form B at 0.30
   ============================================================================ */
(function () {
  "use strict";

  var N = 40;
  var DIGITS = 4;

  var PRESETS = [
    { form: "A", alpha: 1.00, q0: 2,
      note: "Form A, and the whole step. This is scene 2 again, from a different start." },
    { form: "A", alpha: 1.60, q0: 2,
      note: "Same bargain, same form. Now push the step past the edge and watch the swings grow." },
    { form: "B", alpha: 1.00, q0: 1.7,
      note: "The same bargain, written the other way. Same whole step. Nothing else changed." },
    { form: "B", alpha: 0.30, q0: 1.7,
      note: "Same form B, same start. Move only part of the way each time." }
  ];

  window.scenes = window.scenes || {};
  window.scenes.scene3 = function (root) {
    var step = 0;
    var form = PRESETS[0].form;
    var alpha = PRESETS[0].alpha;
    var q0 = PRESETS[0].q0;
    var table = null;
    var trace = null;
    var tableHost = null;
    var els = {};

    build();
    apply(0);

    /* ---------------------------------------------------------- building */
    function build() {
      var h = document.createElement("h2");
      h.textContent = "Break it on purpose.";
      root.appendChild(h);

      var lede = document.createElement("p");
      lede.className = "scene-lede";
      lede.textContent =
        "The whole step worked. Two controls are enough to make it fail, and " +
        "the same two controls put it right again.";
      root.appendChild(lede);

      var cols = document.createElement("div");
      cols.className = "scene-cols";
      root.appendChild(cols);

      /* left: table and trace */
      var left = document.createElement("div");
      cols.appendChild(left);

      tableHost = document.createElement("div");
      left.appendChild(tableHost);
      makeTable();

      els.genie = document.createElement("p");
      els.genie.className = "genie-line";
      left.appendChild(els.genie);

      var traceCard = document.createElement("section");
      traceCard.className = "card";
      traceCard.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">Where the guesses went</span>' +
        '<span class="card-note">one point per test</span>' +
        "</div>";
      var traceBody = document.createElement("div");
      traceBody.className = "card-body";
      traceCard.appendChild(traceBody);
      left.appendChild(traceCard);
      trace = window.Trace.create(traceBody);

      /* right: the controls */
      var right = document.createElement("div");
      cols.appendChild(right);

      var ctlCard = document.createElement("section");
      ctlCard.className = "card";
      ctlCard.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">Two controls</span>' +
        '<span class="card-note">both stay live</span>' +
        "</div>";
      var ctl = document.createElement("div");
      ctl.className = "card-body break-controls";
      ctlCard.appendChild(ctl);
      right.appendChild(ctlCard);

      /* form switch */
      var g1 = document.createElement("div");
      g1.className = "control-group";
      ctl.appendChild(g1);
      var l1 = document.createElement("div");
      l1.className = "control-label";
      l1.textContent = "How the bargain is written";
      g1.appendChild(l1);

      var seg = document.createElement("div");
      seg.className = "seg";
      seg.setAttribute("role", "group");
      g1.appendChild(seg);
      els.formBtns = {};
      ["A", "B"].forEach(function (key) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "seg-btn";
        b.textContent = key === "A" ? "Q = 1 + 1/Q" : "Q = 1/(Q - 1)";
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { setForm(key); });
        seg.appendChild(b);
        els.formBtns[key] = b;
      });

      var proof = document.createElement("p");
      proof.className = "form-proof";
      proof.textContent =
        "Multiply the first by Q and you get Q^2 = Q + 1, so Q(Q - 1) = 1, " +
        "so Q = 1/(Q - 1). One equation, two ways of writing it, the same " +
        "solutions.";
      g1.appendChild(proof);

      /* alpha slider */
      var g2 = document.createElement("div");
      g2.className = "control-group";
      ctl.appendChild(g2);
      var l2 = document.createElement("div");
      l2.className = "control-label";
      l2.textContent = "How much of the loss to subtract";
      g2.appendChild(l2);

      els.alphaVal = document.createElement("div");
      els.alphaVal.className = "control-value";
      g2.appendChild(els.alphaVal);

      var srow = document.createElement("div");
      srow.className = "slider-row";
      g2.appendChild(srow);
      els.slider = document.createElement("input");
      els.slider.type = "range";
      els.slider.className = "slider";
      els.slider.min = "0.05";
      els.slider.max = "1.60";
      els.slider.step = "0.05";
      els.slider.value = "1.00";
      els.slider.setAttribute("aria-label", "The fraction of the loss to subtract each step");
      srow.appendChild(els.slider);
      els.slider.addEventListener("input", function () {
        alpha = parseFloat(els.slider.value);
        run();
      });

      var hint = document.createElement("p");
      hint.className = "control-hint";
      hint.textContent =
        "At 1.00 you subtract the whole loss and land on the target. Below " +
        "1.00 you move part of the way. Above 1.00 you overshoot it.";
      g2.appendChild(hint);

      /* start */
      var g3 = document.createElement("div");
      g3.className = "control-group";
      ctl.appendChild(g3);
      var l3 = document.createElement("div");
      l3.className = "control-label";
      l3.textContent = "Where the loop starts";
      g3.appendChild(l3);
      var srow2 = document.createElement("div");
      srow2.className = "script-row";
      g3.appendChild(srow2);
      els.start = document.createElement("input");
      els.start.type = "text";
      els.start.className = "num-input";
      els.start.value = "2";
      els.start.setAttribute("aria-label", "The first number handed to the genie");
      srow2.appendChild(els.start);
      els.rerun = document.createElement("button");
      els.rerun.type = "button";
      els.rerun.className = "btn btn-primary";
      els.rerun.textContent = "Run it";
      els.rerun.setAttribute("data-run-primary", "");
      srow2.appendChild(els.rerun);
      els.rerun.addEventListener("click", function () {
        var v = parseFloat(els.start.value);
        if (isFinite(v)) q0 = v;
        run();
      });
      els.start.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); els.rerun.click(); }
      });

      /* the guided step */
      var guide = document.createElement("section");
      guide.className = "card";
      guide.style.marginTop = "16px";
      guide.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">Guided</span>' +
        '<span id="s3-step-count" class="card-note"></span>' +
        "</div>";
      var gbody = document.createElement("div");
      gbody.className = "card-body";
      guide.appendChild(gbody);
      right.appendChild(guide);
      els.stepCount = guide.querySelector("#s3-step-count");

      els.stepNote = document.createElement("p");
      els.stepNote.className = "body-line";
      els.stepNote.style.marginTop = "0";
      gbody.appendChild(els.stepNote);

      els.verdict = document.createElement("div");
      els.verdict.className = "verdict";
      gbody.appendChild(els.verdict);

      els.summary = document.createElement("p");
      els.summary.className = "run-summary";
      gbody.appendChild(els.summary);

      els.close = document.createElement("p");
      els.close.className = "body-line";
      els.close.style.display = "none";
      els.close.textContent =
        "The whole step was never safe. It was lucky. Moving only part of " +
        "the way is what makes the loop safe on both ways of writing the " +
        "same bargain.";
      gbody.appendChild(els.close);
    }

    function makeTable() {
      table = window.Table.create(tableHost, {
        maxHeight: 250,
        emptyText: "Press Run it.",
        targetTex: form === "B"
          ? "\\text{target} = \\tfrac{1}{Q - 1}"
          : "\\text{target} = 1 + \\tfrac{1}{Q}",
        targetText: form === "B" ? "target = 1/(Q - 1)" : "target = 1 + 1/Q"
      });
    }

    /* ---------------------------------------------------------- the runs */
    function setForm(key) {
      if (form === key) return;
      form = key;
      makeTable();
      run();
    }

    function apply(i) {
      var p = PRESETS[i];
      step = i;
      form = p.form;
      alpha = p.alpha;
      q0 = p.q0;
      makeTable();
      els.slider.value = String(p.alpha);
      els.start.value = String(p.q0);
      run();
    }

    function run() {
      els.alphaVal.textContent = "alpha = " + alpha.toFixed(2);
      ["A", "B"].forEach(function (k) {
        els.formBtns[k].setAttribute("aria-pressed", form === k ? "true" : "false");
      });
      els.stepCount.textContent = "step " + (step + 1) + " of " + PRESETS.length;
      els.stepNote.textContent = PRESETS[step].note;
      els.close.style.display = step >= PRESETS.length - 1 ? "" : "none";

      var res = window.Loop.run({
        form: form,
        q0: q0,
        n: N,
        schedule: window.Schedules.constant(alpha)
      });

      table.clear();
      res.rows.forEach(function (r, i) {
        table.addRow({
          round: String(i + 1),
          q: window.Table.num(r.q, DIGITS),
          target: window.Table.num(r.clean, DIGITS),
          loss: window.Table.signed(r.loss, DIGITS)
        });
      });

      /* the number the loop walked to, which the bargain refuses */
      if (res.stopped) {
        table.addRow({
          round: "refused",
          q: window.Table.num(res.last, DIGITS),
          target: "no answer",
          loss: ""
        }, { refused: true });
      }

      drawTrace(res);
      verdict(res);
    }

    function drawTrace(res) {
      var pts = res.rows.map(function (r) { return { x: r.t + 1, y: r.q }; });
      var series = [{ points: pts, cls: "series-guess" }];
      if (res.stopped && pts.length) {
        var lastPt = pts[pts.length - 1];
        series.push({
          points: [lastPt, { x: lastPt.x + 1, y: res.last }],
          cls: "series-refused"
        });
      }
      trace.render({
        series: series,
        yClamp: [-6, 6],
        yLabel: "the number you handed over",
        xLabel: "test"
      });
    }

    function verdict(res) {
      var n = res.rows.length;
      var lastLoss = n ? Math.abs(res.rows[n - 1].loss) : NaN;

      if (res.stopped) {
        els.verdict.className = "verdict bad";
        els.verdict.innerHTML = "";
        addVerdict("The loop walked out of the bargain",
          "After " + n + " tests it handed over " +
          window.Table.num(res.last, 4) +
          ". " + res.stopped + " There is nothing left to correct.");
        els.genie.className = "genie-line refused";
        els.genie.textContent = res.stopped;
      } else if (isFinite(lastLoss) && lastLoss < 1e-3) {
        els.verdict.className = "verdict good";
        els.verdict.innerHTML = "";
        addVerdict("The loop settled",
          "After " + n + " tests the gap is " + lastLoss.toExponential(2) +
          ". The number you hand over and the number that comes back have " +
          "stopped disagreeing.");
        els.genie.className = "genie-line accepted";
        els.genie.textContent = "The genie has nothing left to correct.";
      } else {
        els.verdict.className = "verdict warn";
        els.verdict.innerHTML = "";
        addVerdict("Still swinging",
          "After " + n + " tests the gap is still " +
          (isFinite(lastLoss) ? lastLoss.toExponential(2) : "undefined") +
          ". The loop has not settled and it has not escaped.");
        els.genie.className = "genie-line";
        els.genie.textContent = "The genie is still answering.";
      }

      els.summary.textContent =
        "form " + form + ", alpha = " + alpha.toFixed(2) +
        ", start " + q0 + ", " + n + " tests shown";
    }

    function addVerdict(title, text) {
      var t = document.createElement("div");
      t.className = "verdict-title";
      t.textContent = title;
      var p = document.createElement("div");
      p.textContent = text;
      els.verdict.appendChild(t);
      els.verdict.appendChild(p);
    }

    /* ------------------------------------------------------ step engine */
    function next() {
      if (step >= PRESETS.length - 1) return false;
      apply(step + 1);
      return true;
    }
    function prev() {
      if (step <= 0) return false;
      apply(step - 1);
      return true;
    }

    if (window.GenieViz) {
      var t = window.GenieViz.param("test");
      if (t === "broken-a") apply(1);
      if (t === "broken-b") apply(2);
      if (t === "fixed-b") apply(3);
    }

    return { onNextKey: next, onPrevKey: prev, onEnter: run };
  };
})();
