/* ============================================================================
   scene7.js : Write the loop. BUILT.

   The stub is the AINIT darts exercise's three-way split, reskinned. darts
   (index.html lines 545 to 549) blanks exactly three lines and gives the
   schedule away:

       error  = target_score - current_score
       change = alpha_t * error
       update = current_pos + change

   That split is right and it is already tuned, so it is inherited. Three
   things are changed and each one is deliberate:

     1  the names. darts calls them target_score and current_score and then
        glosses them in code comments as positions. The genie keeps no score,
        so the names here are the ones the table already uses: current,
        target, loss, step, guess.
     2  the sign. This viz follows the AINIT deck's own convention,
        loss = Q - target and Q := Q - alpha * loss, because the live table's
        headers are the deck's and the headers fix the sign. darts writes the
        same rule the other way round. See CLAUDE.md, "Notation, pinned".
     3  no gate. darts hides the rest of its page behind .locked until the
        three blanks are right. A gate fights the mandatory hash routing,
        because a lecturer has to be able to jump to any scene by URL. Here a
        correct answer gives feedback and offers to advance, and every scene
        stays reachable.

   The checker is darts' own norm(): whitespace stripped, double quotes
   folded to single. The hint box is darts' contract, three bullets, one per
   blank, each naming a strategy in words with no code in it.

   THE QUIZ. Both questions are darts', both answers are B, and the wrong
   answers keep their tempting shape. Option C of question 1 is rewritten,
   because darts' original ("the bullseye drifts less over time") is about a
   moving target and this game's target does not move. A wrong answer shows
   the hint and never the answer.

   ?test hooks
     ?test=solved   the three blanks filled in correctly
   ============================================================================ */
(function () {
  "use strict";

  var EXPECTED = {
    loss: ["current-target"],
    step: ["alpha_t*loss", "loss*alpha_t"],
    guess: ["current-step"]
  };

  var HINTS = [
    "loss: how far off you are and which way, with a sign. Your number " +
      "against the genie's.",
    "step: do not move the whole way. Scale the loss down by this round's " +
      "alpha_t.",
    "guess: your new guess is the old one, corrected by the step you just " +
      "computed."
  ];

  var QUIZ = [
    {
      q: "Why does the step size alpha_t get smaller as the rounds go on?",
      correct: "B",
      hint: "Which size of step helps in each case?",
      opts: [
        ["A", "Because the loss shrinks on its own as you near the answer, " +
              "so the step gets smaller anyway."],
        ["B", "Big early steps close the gap quickly, and small later steps " +
              "stop you overshooting, so the guess can settle."],
        ["C", "Because the genie's answers get more accurate the longer you " +
              "play, so smaller corrections are enough."],
        ["D", "Because smaller steps make each round faster to compute."]
      ]
    },
    {
      q: "Suppose you kept alpha large and constant forever instead of " +
         "letting it shrink. What happens?",
      correct: "B",
      hint: "If alpha never gets smaller, what happens once the guess is " +
            "already in the neighbourhood of the answer?",
      opts: [
        ["A", "The guess converges perfectly onto the answer and stays there."],
        ["B", "The guess keeps jumping back and forth across the answer and " +
              "never settles."],
        ["C", "The genie refuses to answer any more questions."],
        ["D", "Nothing changes, because the step size has no effect on where " +
              "the loop ends up."]
      ]
    }
  ];

  /* darts' normalizer, verbatim in behaviour: whitespace stripped, double
     quotes folded to single. */
  function norm(s) {
    return (s || "").replace(/\s+/g, "").replace(/"/g, "'");
  }

  window.scenes = window.scenes || {};
  window.scenes.scene7 = function (root) {
    var els = { blanks: {} };

    build();

    function build() {
      var h = document.createElement("h2");
      h.textContent = "Write the loop.";
      root.appendChild(h);

      var lede = document.createElement("p");
      lede.className = "scene-lede";
      lede.textContent =
        "The schedule is given. Three lines are blank, and they are the " +
        "three you worked out: how far off you are, how much of that to " +
        "move, and where that puts you.";
      root.appendChild(lede);

      var cols = document.createElement("div");
      cols.className = "scene-cols";
      root.appendChild(cols);

      var left = document.createElement("div");
      cols.appendChild(left);

      var pre = document.createElement("pre");
      pre.className = "stub-code";
      left.appendChild(pre);

      /* Every line is kept under 62 characters. The block scrolls inside its
         own container, but a lecture-room projector should not have to
         scroll to read the stub, so the source is wrapped by hand instead.
         The notebook in exercise/ carries the same wrapping. */
      line(pre, "def robbins_monro(genie, n_rounds=60,");
      line(pre, "                  alpha_0=1.0, decay_rate=5.0):");
      line(pre, '    """Find the number the genie accepts, by testing."""');
      line(pre, "    guesses, losses, learning_rates = [], [], []");
      line(pre, "    genie.reset()");
      line(pre, "");
      line(pre, "    for t in range(n_rounds):");
      line(pre, "        # This round's step: large early, small later.");
      line(pre, "        alpha_t = alpha_0 / (1 + t / decay_rate)");
      line(pre, "        learning_rates.append(alpha_t)");
      line(pre, "");
      line(pre, "        # What do I currently believe the answer is?");
      line(pre, "        current = genie.guess");
      line(pre, "        guesses.append(current)");
      line(pre, "");
      line(pre, "        # Hand it over. In a storm the answer is blurred.");
      line(pre, "        target = genie.ask(current)");
      line(pre, "");
      line(pre, "        # How far off am I, and in which direction?");
      blank(pre, "        loss  = ", "loss");
      line(pre, "        losses.append(loss)");
      line(pre, "");
      line(pre, "        # Do not move the whole way.");
      blank(pre, "        step  = ", "step");
      line(pre, "");
      line(pre, "        # The new guess.");
      blank(pre, "        genie.guess = ", "guess");
      line(pre, "");
      line(pre, "    return guesses, losses, learning_rates");

      var row = document.createElement("div");
      row.className = "guess-row";
      left.appendChild(row);

      els.check = document.createElement("button");
      els.check.type = "button";
      els.check.className = "btn btn-primary";
      els.check.textContent = "Check the three lines";
      els.check.setAttribute("data-run-primary", "");
      row.appendChild(els.check);

      els.hintBtn = document.createElement("button");
      els.hintBtn.type = "button";
      els.hintBtn.className = "btn btn-ghost";
      els.hintBtn.textContent = "Show hint";
      row.appendChild(els.hintBtn);

      els.feedback = document.createElement("p");
      els.feedback.className = "genie-line";
      els.feedback.textContent = "Fill the three blanks, then press Check.";
      left.appendChild(els.feedback);

      els.hints = document.createElement("ul");
      els.hints.className = "hint-list";
      els.hints.style.display = "none";
      HINTS.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        els.hints.appendChild(li);
      });
      left.appendChild(els.hints);

      els.check.addEventListener("click", check);
      els.hintBtn.addEventListener("click", function () {
        var on = els.hints.style.display === "none";
        els.hints.style.display = on ? "" : "none";
        els.hintBtn.textContent = on ? "Hide hint" : "Show hint";
      });

      /* --- right: the quiz and the notebook pointer -------------------- */
      var right = document.createElement("div");
      cols.appendChild(right);
      QUIZ.forEach(function (item, i) { right.appendChild(quiz(item, i)); });

      var nb = document.createElement("section");
      nb.className = "card";
      nb.innerHTML =
        '<div class="card-head">' +
        '<span class="card-title">The full version</span>' +
        '<span class="card-note">Colab notebook</span>' +
        "</div>";
      var nbBody = document.createElement("div");
      nbBody.className = "card-body";
      var nbP = document.createElement("p");
      nbP.className = "body-line";
      nbP.style.marginTop = "0";
      nbP.textContent =
        "The notebook in exercise/ runs this loop against a Genie you can " +
        "put a storm on, and it ends on the same loop fitted to a price.";
      nbBody.appendChild(nbP);
      nb.appendChild(nbBody);
      right.appendChild(nb);
    }

    function line(pre, text) {
      var d = document.createElement("div");
      d.className = "code-line";
      d.textContent = text;
      pre.appendChild(d);
    }

    function blank(pre, prefix, key) {
      var d = document.createElement("div");
      d.className = "code-line";
      var span = document.createElement("span");
      span.textContent = prefix;
      d.appendChild(span);
      var input = document.createElement("input");
      input.type = "text";
      input.className = "code-blank";
      input.setAttribute("autocomplete", "off");
      input.setAttribute("spellcheck", "false");
      input.setAttribute("aria-label", "the " + key + " line");
      d.appendChild(input);
      pre.appendChild(d);
      els.blanks[key] = input;
    }

    function check() {
      var wrong = [];
      Object.keys(EXPECTED).forEach(function (key) {
        var input = els.blanks[key];
        var got = norm(input.value);
        var good = EXPECTED[key].some(function (want) { return norm(want) === got; });
        input.classList.remove("ok", "bad");
        input.classList.add(good ? "ok" : "bad");
        if (!good) wrong.push(key);
      });
      if (!wrong.length) {
        els.feedback.className = "genie-line accepted";
        els.feedback.textContent =
          "That is the loop. Press Next for what it is really for.";
      } else {
        els.feedback.className = "genie-line refused";
        els.feedback.textContent =
          "Not yet: " + wrong.join(", ") + ". Press Show hint for a " +
          "strategy on each line.";
      }
    }

    function quiz(item, i) {
      var sec = document.createElement("section");
      sec.className = "card quiz-card";
      sec.style.marginBottom = "16px";
      var head = document.createElement("div");
      head.className = "card-head";
      var t = document.createElement("span");
      t.className = "card-title";
      t.textContent = "Question " + (i + 1);
      head.appendChild(t);
      sec.appendChild(head);
      var body = document.createElement("div");
      body.className = "card-body";
      sec.appendChild(body);

      var q = document.createElement("p");
      q.className = "quiz-question";
      q.textContent = item.q;
      body.appendChild(q);

      var note = document.createElement("p");
      note.className = "quiz-note";
      body.appendChild(note);

      item.opts.forEach(function (pair) {
        var lab = document.createElement("label");
        lab.className = "quiz-opt";
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "s7-q" + i;
        radio.value = pair[0];
        var span = document.createElement("span");
        span.textContent = pair[0] + ") " + pair[1];
        lab.appendChild(radio);
        lab.appendChild(span);
        body.appendChild(lab);

        radio.addEventListener("change", function () {
          var labels = body.querySelectorAll("label.quiz-opt");
          for (var k = 0; k < labels.length; k++) {
            labels[k].classList.remove("is-correct", "is-wrong");
          }
          if (radio.value === item.correct) {
            lab.classList.add("is-correct");
            note.className = "quiz-note good";
            note.textContent = "Correct.";
          } else {
            lab.classList.add("is-wrong");
            note.className = "quiz-note warn";
            note.textContent = "Not that one. " + item.hint;
          }
        });
      });
      return sec;
    }

    if (window.GenieViz && window.GenieViz.param("test") === "solved") {
      els.blanks.loss.value = "current - target";
      els.blanks.step.value = "alpha_t * loss";
      els.blanks.guess.value = "current - step";
      check();
    }

    return {};
  };
})();
