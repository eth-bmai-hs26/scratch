/* ============================================================================
   scene1.js : The table. BUILT.

   Carlos's five columns from his handwritten page 1, in his order and with his
   wording:

       theta | theta^2 | 2026 - theta^2 | Verdict | Update

   The rectangle stays live above the table, so every cell has a picture.

   WHY THE START IS 45 AND MUST STAY 45. 45 squared is 2025, so the very first
   residual is exactly 1. Carlos picked a number whose miss is a single unit.
   It also finishes the job scene 0 started: at theta = 45 the rectangle is
   45 by 45.0222 and LOOKS square. The eye has run out. The residual column is
   what is left.

   THE UPDATE CELL IS THE GATE. Carlos's own Update column carries arrows and
   nothing else: it gives the direction and withholds the distance. That hole
   is what the whole weekend is built to fill. The cell here is an empty input
   and nothing grades it. Scene 2 is where the answer gets tested.

   The residual sign follows Carlos's page: 2026 - theta^2, so POSITIVE means
   the guess is too small. See the note at the top of js/heron.js about the
   clash with the genie deck.

   Steps: 0 theta, 1 theta squared, 2 the residual, 3 the verdict, 4 the gate.

   ?test hooks
     ?test=table  all five steps filled
     ?test=drag   all five steps filled, theta moved off 45 to 60
   ============================================================================ */
(function () {
  "use strict";

  var STEPS = 5;
  var START = 45;

  var COLS = [
    { key: "theta",  tex: "\\theta",          plain: "theta" },
    { key: "sq",     tex: "\\theta^2",        plain: "theta^2" },
    { key: "resid",  tex: "2026 - \\theta^2", plain: "2026 - theta^2" },
    { key: "verdict", tex: null,              plain: "Verdict" },
    { key: "update",  tex: null,              plain: "Update" }
  ];

  window.scenes = window.scenes || {};
  window.scenes.scene1 = function (root) {
    var cursor = 0;
    var view = null;
    var els = { cells: {} };
    var state = null;

    build();
    resetState();
    render();

    /* ------------------------------------------------------------ building */
    function build() {
      var head = document.createElement("div");
      head.className = "scene-head";
      head.innerHTML =
        '<h1>The eye has run out. Write it down instead.</h1>' +
        '<p class="lede">These are the five columns from Carlos\'s page: the' +
        ' width you' +
        ' guessed, its square, how far that square is from 2026, the verdict,' +
        ' and what you do about it. It starts at 45, because 45 squared is' +
        ' 2025 and the miss is exactly one.</p>';
      root.appendChild(head);

      var split = document.createElement("div");
      split.className = "split";
      root.appendChild(split);

      var main = document.createElement("div");
      main.className = "split-main";
      split.appendChild(main);
      view = window.RectView.create(main, { theta: START });

      els.caption = document.createElement("p");
      els.caption.className = "caption";
      main.appendChild(els.caption);

      var side = document.createElement("div");
      side.className = "split-side";
      split.appendChild(side);

      var ctl = cardBody(side, "The width is still yours", "theta");
      var row = document.createElement("div");
      row.className = "slider-row";
      ctl.appendChild(row);

      els.slider = document.createElement("input");
      els.slider.type = "range";
      els.slider.className = "slider";
      els.slider.min = String(window.RectView.THETA_MIN);
      els.slider.max = String(window.RectView.THETA_MAX);
      els.slider.step = "0.01";
      els.slider.value = String(START);
      els.slider.setAttribute("aria-label", "Width of the rectangle");
      row.appendChild(els.slider);

      els.num = document.createElement("input");
      els.num.type = "number";
      els.num.className = "num-input";
      els.num.min = String(window.RectView.THETA_MIN);
      els.num.max = String(window.RectView.THETA_MAX);
      els.num.step = "0.0001";
      els.num.value = String(START);
      els.num.setAttribute("aria-label", "Width of the rectangle, typed");
      row.appendChild(els.num);

      els.reset = document.createElement("button");
      els.reset.type = "button";
      els.reset.className = "btn btn-ghost";
      els.reset.textContent = "Back to 45";
      els.reset.style.marginTop = "10px";
      ctl.appendChild(els.reset);

      els.slider.addEventListener("input", function () {
        setTheta(parseFloat(els.slider.value), "slider");
      });
      els.num.addEventListener("input", function () {
        var v = parseFloat(els.num.value);
        if (isFinite(v)) setTheta(v, "num");
      });
      els.reset.addEventListener("click", function () { setTheta(START); });

      els.shapeBox = document.createElement("div");
      els.shapeBox.className = "verdict warn";
      cardBody(side, "What the shape says", "").appendChild(els.shapeBox);

      /* --- the table, full width under both columns --- */
      var wrapCard = document.createElement("div");
      wrapCard.className = "card";
      wrapCard.style.marginTop = "20px";
      root.appendChild(wrapCard);

      var wh = document.createElement("div");
      wh.className = "card-head";
      var wt = document.createElement("h3");
      wt.className = "card-title";
      wt.textContent = "Guess, check, correct";
      wh.appendChild(wt);
      els.progress = document.createElement("span");
      els.progress.className = "card-note";
      wh.appendChild(els.progress);
      wrapCard.appendChild(wh);

      var wb = document.createElement("div");
      wb.className = "card-body table-scroll";
      wrapCard.appendChild(wb);

      var table = document.createElement("table");
      table.className = "data-table";
      wb.appendChild(table);

      var thead = document.createElement("thead");
      var htr = document.createElement("tr");
      COLS.forEach(function (c) {
        var th = document.createElement("th");
        if (c.tex) {
          window.Katex.render(c.tex, th, false);
        } else {
          th.textContent = c.plain;
        }
        htr.appendChild(th);
      });
      thead.appendChild(htr);
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      var tr = document.createElement("tr");
      COLS.forEach(function (c) {
        var td = document.createElement("td");
        td.className = "pending";
        if (c.key === "verdict" || c.key === "update") td.className += " text-cell";
        els.cells[c.key] = td;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
      table.appendChild(tbody);

      els.gate = document.createElement("p");
      els.gate.className = "control-hint";
      wb.appendChild(els.gate);
    }

    function cardBody(parent, title, note) {
      var c = document.createElement("div");
      c.className = "card";
      var h = document.createElement("div");
      h.className = "card-head";
      var t = document.createElement("h3");
      t.className = "card-title";
      t.textContent = title;
      h.appendChild(t);
      if (note) {
        var n = document.createElement("span");
        n.className = "card-note";
        n.textContent = note;
        h.appendChild(n);
      }
      c.appendChild(h);
      var b = document.createElement("div");
      b.className = "card-body";
      c.appendChild(b);
      parent.appendChild(c);
      return b;
    }

    /* ------------------------------------------------------------ the step */
    function resetState() {
      state = { theta: START, revealed: 0, updateText: "" };
    }

    function applyStep(c) { state.revealed = c + 1; }

    function setCursor(c) {
      if (c < 0 || c >= STEPS) return false;
      if (c < cursor) {
        var theta = state.theta;
        var typed = state.updateText;
        resetState();
        state.theta = theta;
        state.updateText = typed;
        cursor = 0;
        state.revealed = 1;
        while (cursor < c) { cursor++; applyStep(cursor); }
      } else {
        while (cursor < c) { cursor++; applyStep(cursor); }
      }
      render();
      return true;
    }

    function setTheta(t, source) {
      t = view.setTheta(t);
      state.theta = t;
      if (source !== "slider") els.slider.value = String(t);
      if (source !== "num") els.num.value = window.Heron.fmt(t, 4);
      render(true);
    }

    /* --------------------------------------------------------------- paint */
    function render(skipInputs) {
      var theta = state.theta;
      var other = window.Heron.otherSide(theta);
      var sq = theta * theta;
      var resid = window.Heron.residual(theta);

      view.setTheta(theta);
      if (!skipInputs) {
        els.slider.value = String(theta);
        els.num.value = window.Heron.fmt(theta, 4);
      }

      var shown = state.revealed;
      els.progress.textContent = "column " + Math.min(shown, COLS.length)
        + " of " + COLS.length;

      fill("theta", shown >= 1, window.Heron.fmt(theta, 4), "width-ink");
      fill("sq", shown >= 2, window.Heron.fmt(sq, 4), "");
      fill("resid", shown >= 3, window.Heron.fmtResidual(resid), "");
      fill("verdict", shown >= 4, window.Heron.verdict(theta), "");

      var uc = els.cells.update;
      if (shown >= 5) {
        if (!els.updateInput) {
          uc.className = "text-cell";
          uc.textContent = "";
          els.updateInput = document.createElement("input");
          els.updateInput.type = "text";
          els.updateInput.className = "num-input";
          els.updateInput.style.width = "220px";
          els.updateInput.style.textAlign = "left";
          els.updateInput.placeholder = "what do you do to 45?";
          els.updateInput.setAttribute("aria-label", "Your update rule");
          els.updateInput.addEventListener("input", function () {
            state.updateText = els.updateInput.value;
          });
          uc.appendChild(els.updateInput);
        }
        els.updateInput.value = state.updateText;
      } else if (els.updateInput) {
        uc.removeChild(els.updateInput);
        els.updateInput = null;
        fill("update", false, "", "");
      } else {
        fill("update", false, "", "");
      }

      els.gate.textContent = shown >= 5
        ? "Carlos's page has an arrow in this cell and nothing else. An arrow"
          + " is a direction. Write down how far you would move, then go to"
          + " scene 2 and find out whether it was any good."
        : "";

      var shape = window.Heron.shape(theta);
      els.shapeBox.className = "verdict " + (shown >= 4 ? "warn" : "warn");
      els.shapeBox.innerHTML = '<p class="verdict-title">The rectangle is '
        + shape + ".</p>"
        + (shown >= 4
            ? "Which is the same statement as the verdict column: the guess is "
              + window.Heron.verdict(theta) + "."
            : "Read the shape, then read the numbers, and check they agree.");

      els.caption.textContent = Math.abs(theta - START) < 1e-9
        ? "At 45 the sides are 45 and 45.0222. The picture cannot separate"
          + " them. The third column can."
        : "Move the width and every revealed cell moves with it.";
    }

    function fill(key, on, value, ink) {
      var td = els.cells[key];
      if (!td) return;
      var base = (key === "verdict" || key === "update") ? "text-cell" : "";
      if (on) {
        td.className = base + (ink ? " " + ink : "");
        td.textContent = value;
      } else {
        td.className = (base ? base + " " : "") + "pending";
        td.textContent = ".";
      }
    }

    /* ---------------------------------------------------------- test hooks */
    var t = window.HeronViz && window.HeronViz.param("test");
    if (t === "table") {
      setCursor(4);
    } else if (t === "drag") {
      setCursor(4);
      setTheta(60);
    }

    return {
      onEnter: function () { render(); },
      onNextKey: function () { return setCursor(cursor + 1); },
      onPrevKey: function () { return setCursor(cursor - 1); }
    };
  };
})();
