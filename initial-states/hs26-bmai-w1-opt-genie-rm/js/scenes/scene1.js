/* ============================================================================
   scene1.js : Guess, check, correct. BUILT. This is the scene the exercise
   stands on, and it is genuinely live: nothing in it is scripted.

   The three headers are the AINIT deck's own, character for character
   (rl-slides.tex, the frame titled "Guess, check, correct"):

       Q (guess)        target = 1 + 1/Q        loss = Q - target

   Carlos's handwritten page 1 has four columns instead, with "verdict" and
   "update" where the deck has a signed loss. Both are right for their medium:
   the deck shows a number, the handwriting shows what the participant DOES
   with it. So the deck's three headers stay on the table, and Carlos's two
   acts sit under it as two controls. Scene 2 promotes them into columns once
   the move has a name. That resolution is recorded in
   proposals/viz-genie-robbins-monro.md section 3.

   NOTHING ON SCREEN SUGGESTS WHAT TO TYPE. The input starts empty, the
   participant picks any positive number, and the only feedback is what the
   genie said. The quiet "use the target" button appears only after three
   manual rows, so a participant has had three chances to invent the move
   before the page offers it, and it copies a number they already have on
   screen rather than a new one.

   The genie refuses a non-positive number by restating its condition. That is
   the positivity clause from scene 0 doing work, and it is why this viz needs
   no error dialog anywhere.

   REWIND. js/history.js holds the list of guesses. Prev rewinds by reset and
   replay: the table is cleared and every remaining guess is walked through
   js/genie.js again. There are no inverse mutations anywhere, which is the
   course-viz step-engine rule.

   ?test hooks
     ?test=filled   lays in the six guesses of the deck's own table
   ============================================================================ */
(function () {
  "use strict";

  var DIGITS = 6;
  var OFFER_AFTER = 3;

  window.scenes = window.scenes || {};
  window.scenes.scene1 = function (root) {
    var hist = window.History.create();
    var table = null;
    var spark = null;
    var els = {};
    var lastTarget = null;

    build();
    replay();

    /* ---------------------------------------------------------- building */
    function build() {
      var h = document.createElement("h2");
      h.textContent = "Test a number. See what comes back.";
      root.appendChild(h);

      var lede = document.createElement("p");
      lede.className = "scene-lede";
      lede.textContent =
        "Type any positive number and press Check. The genie runs its test " +
        "and hands back what the bargain demands of that number. The third " +
        "column is the gap between the two. You are free when the gap is zero.";
      root.appendChild(lede);

      var cols = document.createElement("div");
      cols.className = "scene-cols";
      root.appendChild(cols);

      /* --- left: the table and the input ------------------------------- */
      var left = document.createElement("div");
      cols.appendChild(left);

      var tableHost = document.createElement("div");
      left.appendChild(tableHost);
      table = window.Table.create(tableHost, {
        emptyText: "No numbers tested yet. Type one below."
      });

      var row = document.createElement("div");
      row.className = "guess-row";
      left.appendChild(row);

      var lab = document.createElement("label");
      lab.textContent = "your guess";
      lab.setAttribute("for", "s1-guess");
      row.appendChild(lab);

      els.input = document.createElement("input");
      els.input.type = "text";
      els.input.className = "num-input";
      els.input.id = "s1-guess";
      els.input.setAttribute("inputmode", "decimal");
      els.input.setAttribute("autocomplete", "off");
      els.input.setAttribute("aria-label", "The number you hand the genie");
      row.appendChild(els.input);

      els.check = document.createElement("button");
      els.check.type = "button";
      els.check.className = "btn btn-primary";
      els.check.textContent = "Check";
      els.check.setAttribute("data-run-primary", "");
      row.appendChild(els.check);

      els.useTarget = document.createElement("button");
      els.useTarget.type = "button";
      els.useTarget.className = "btn btn-ghost";
      els.useTarget.textContent = "use the target";
      els.useTarget.style.display = "none";
      row.appendChild(els.useTarget);

      els.reset = document.createElement("button");
      els.reset.type = "button";
      els.reset.className = "btn btn-ghost";
      els.reset.textContent = "Start over";
      row.appendChild(els.reset);

      els.genie = document.createElement("p");
      els.genie.className = "genie-line";
      els.genie.textContent = "The genie is waiting.";
      left.appendChild(els.genie);

      /* --- right: the two acts, and the only convergence signal --------- */
      var right = document.createElement("div");
      cols.appendChild(right);

      var acts = document.createElement("section");
      acts.className = "card";
      acts.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">Your two acts</span>' +
        '<span class="card-note">verdict, then update</span>' +
        "</div>";
      var actsBody = document.createElement("div");
      actsBody.className = "card-body";
      acts.appendChild(actsBody);
      right.appendChild(acts);

      var vLab = document.createElement("p");
      vLab.className = "step-note";
      vLab.textContent = "Verdict";
      actsBody.appendChild(vLab);

      els.chip = document.createElement("span");
      els.chip.className = "chip chip-none";
      els.chip.textContent = "no number tested yet";
      actsBody.appendChild(els.chip);

      els.chipWhy = document.createElement("p");
      els.chipWhy.className = "chip-why";
      els.chipWhy.textContent =
        "The sign of the loss says which way you missed.";
      actsBody.appendChild(els.chipWhy);

      var uLab = document.createElement("p");
      uLab.className = "step-note";
      uLab.style.marginTop = "16px";
      uLab.textContent = "Update";
      actsBody.appendChild(uLab);

      els.update = document.createElement("p");
      els.update.className = "chip-why";
      els.update.textContent =
        "Your call. Type the next number in the box on the left.";
      actsBody.appendChild(els.update);

      var sparkCard = document.createElement("section");
      sparkCard.className = "card";
      sparkCard.style.marginTop = "16px";
      sparkCard.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">How far off</span>' +
        '<span class="card-note">one point per test</span>' +
        "</div>";
      var sparkBody = document.createElement("div");
      sparkBody.className = "card-body";
      sparkCard.appendChild(sparkBody);
      right.appendChild(sparkCard);
      spark = window.Trace.spark(sparkBody);

      els.sparkNote = document.createElement("p");
      els.sparkNote.className = "plot-caption";
      els.sparkNote.textContent =
        "Two tests are needed before this says anything.";
      sparkBody.appendChild(els.sparkNote);

      /* --- wiring ------------------------------------------------------- */
      els.check.addEventListener("click", submit);
      els.input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); submit(); }
      });
      els.useTarget.addEventListener("click", function () {
        if (lastTarget === null) return;
        els.input.value = lastTarget.toFixed(DIGITS);
        els.input.focus();
      });
      els.reset.addEventListener("click", function () {
        hist.reset();
        lastTarget = null;
        els.input.value = "";
        replay();
        say("The genie is waiting.", "");
      });
    }

    /* ---------------------------------------------------------- the loop */
    function submit() {
      var raw = (els.input.value || "").trim();
      var q = parseFloat(raw);
      if (raw === "" || !isFinite(q)) {
        say("The genie wants a number.", "refused");
        return;
      }
      var why = window.Genie.refuse(q, "A");
      if (why) {
        say(why + " Name me a positive number that my own test accepts.", "refused");
        return;
      }
      hist.push(q);
      els.input.value = "";
      replay();
    }

    /* State is the source of truth. Every render walks the whole guess list
       through js/genie.js again, so a rewind and a fresh entry produce the
       same table by the same route. */
    function replay() {
      table.clear();
      var guesses = hist.list();
      var losses = [];
      lastTarget = null;

      guesses.forEach(function (q, i) {
        var answer = window.Genie.ask(q, { form: "A" });
        var loss = window.Genie.loss(q, answer.clean);
        losses.push(loss);
        lastTarget = answer.clean;
        table.addRow({
          round: String(i + 1),
          q: window.Table.num(q, DIGITS),
          target: window.Table.num(answer.clean, DIGITS),
          loss: window.Table.signed(loss, DIGITS)
        });
      });

      renderVerdict(losses.length ? losses[losses.length - 1] : null);
      renderSpark(losses);

      els.useTarget.style.display =
        (guesses.length >= OFFER_AFTER && lastTarget !== null) ? "" : "none";

      if (guesses.length === 1) {
        say("Tested. The gap is in the third column.", "");
      } else if (guesses.length > 1) {
        say("Tested. Test another one.", "");
      }
    }

    function renderVerdict(loss) {
      if (loss === null) {
        els.chip.className = "chip chip-none";
        els.chip.textContent = "no number tested yet";
        els.chipWhy.textContent =
          "The sign of the loss says which way you missed.";
        return;
      }
      if (loss > 0) {
        els.chip.className = "chip chip-big";
        els.chip.textContent = "too big";
        els.chipWhy.textContent =
          "The loss is positive, so your number is larger than the one that " +
          "came back.";
      } else if (loss < 0) {
        els.chip.className = "chip chip-small";
        els.chip.textContent = "too small";
        els.chipWhy.textContent =
          "The loss is negative, so your number is smaller than the one that " +
          "came back.";
      } else {
        els.chip.className = "chip chip-exact";
        els.chip.textContent = "accepted";
        els.chipWhy.textContent =
          "The loss is zero. The genie has nothing left to correct.";
      }
    }

    function renderSpark(losses) {
      var vals = losses.filter(function (v) { return isFinite(v) && v !== 0; });
      if (vals.length < 2) {
        spark.render([]);
        els.sparkNote.textContent =
          "Two tests are needed before this says anything.";
        return;
      }
      spark.render(vals);
      els.sparkNote.textContent =
        "Down is closer. Every test, the gap shrinks and changes sign.";
    }

    function say(text, kind) {
      els.genie.textContent = text;
      els.genie.className = "genie-line" + (kind ? " " + kind : "");
    }

    /* ------------------------------------------------------ step engine */
    /* Next replays a guess that a rewind put in the future. With nothing in
       the future it returns false and the driver changes scene, so a lecturer
       paging forward is never trapped inside a table. */
    function next() {
      if (hist.atHead()) return false;
      hist.stepForward();
      replay();
      return true;
    }
    function prev() {
      if (hist.atStart()) return false;
      hist.stepBack();
      replay();
      return true;
    }

    /* ?test= state, for headless capture only. The six guesses are the ones
       the deck's own table walks, so the screenshot shows the slide. */
    if (window.GenieViz && window.GenieViz.param("test") === "filled") {
      [1, 2, 1.5, 5 / 3, 1.6, 1.625].forEach(function (q) { hist.push(q); });
      replay();
    }

    return {
      onNextKey: next,
      onPrevKey: prev,
      onEnter: function () { if (els.input) els.input.focus(); }
    };
  };
})();
