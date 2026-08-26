/* ============================================================================
   scene0.js : The rectangle. BUILT.

   The job. Fix the area at 2026 and hand the participant one side. The other
   side is forced. Sweep it, and fail to find the square by eye. That failure
   is the scene's whole purpose: it is what makes the residual column of
   scene 1 feel necessary instead of arbitrary.

   Nothing on screen names sqrt(2026), and no tick, marker or guide sits at it.
   RectView is created with showSquare left off and stays that way.

   A KNOWING DEPARTURE FROM THE SPEC, recorded so nobody thinks it was an
   oversight. proposals/viz-heron.md gives the step plan as (1) rectangle, (2)
   the width control unlocks, (3) the trail accumulates. Here the control is
   live from step 0 and the three steps are the question, the readouts, and the
   trail. Reason: a disabled slider on the opening frame of the deck reads as a
   broken page rather than as an invitation, both to a participant and in the
   headless screenshot. The "look before you touch" intent survives in the step
   0 prompt, which asks for an observation and not for an action. Change it
   back if Carlos prefers the lock.

   Steps: 0 the question, 1 the side readouts, 2 the trail.

   ?test hooks
     ?test=swept      theta at 78 with a sweep already recorded, trail on
     ?test=looksquare theta at 45, where the shape has stopped being readable
   ============================================================================ */
(function () {
  "use strict";

  var STEPS = 3;
  var DEFAULT_THETA = 15;

  window.scenes = window.scenes || {};
  window.scenes.scene0 = function (root) {
    var cursor = 0;
    var view = null;
    var els = {};
    /* Declared HERE, above the three calls below, and nowhere else. A second
       `var state = null;` further down the builder is hoisted as a
       declaration but ASSIGNED where it is written, so it runs after
       resetState() and puts state back to null. The scene then builds and
       screenshots cleanly and throws on the first Next, which is how this
       shipped once: "Cannot set properties of null (setting showReadouts)". */
    var state = null;

    build();
    resetState();
    render();

    /* ------------------------------------------------------------ building */
    function build() {
      var head = document.createElement("div");
      head.className = "scene-head";
      head.innerHTML =
        '<h1>A rectangle of area 2026.</h1>' +
        '<p class="lede">You choose the width. The area is fixed, so the height' +
        ' is not yours to choose: it is whatever makes the area come out to' +
        ' 2026 again. The amount of ink on the screen never changes. Only the' +
        ' shape does.</p>';
      root.appendChild(head);

      var split = document.createElement("div");
      split.className = "split";
      root.appendChild(split);

      var main = document.createElement("div");
      main.className = "split-main";
      split.appendChild(main);
      view = window.RectView.create(main, { theta: DEFAULT_THETA });

      els.caption = document.createElement("p");
      els.caption.className = "caption";
      main.appendChild(els.caption);

      var side = document.createElement("div");
      side.className = "split-side";
      split.appendChild(side);

      /* --- the control card --- */
      var ctl = card(side, "The width is yours", "theta");
      var group = document.createElement("div");
      group.className = "control-group";
      ctl.appendChild(group);

      var row = document.createElement("div");
      row.className = "slider-row";
      group.appendChild(row);

      els.slider = document.createElement("input");
      els.slider.type = "range";
      els.slider.className = "slider";
      els.slider.min = String(window.RectView.THETA_MIN);
      els.slider.max = String(window.RectView.THETA_MAX);
      els.slider.step = "0.01";
      els.slider.value = String(DEFAULT_THETA);
      els.slider.setAttribute("aria-label", "Width of the rectangle");
      row.appendChild(els.slider);

      els.num = document.createElement("input");
      els.num.type = "number";
      els.num.className = "num-input";
      els.num.min = String(window.RectView.THETA_MIN);
      els.num.max = String(window.RectView.THETA_MAX);
      els.num.step = "0.0001";
      els.num.value = String(DEFAULT_THETA);
      els.num.setAttribute("aria-label", "Width of the rectangle, typed");
      row.appendChild(els.num);

      els.hint = document.createElement("p");
      els.hint.className = "control-hint";
      group.appendChild(els.hint);

      els.slider.addEventListener("input", function () {
        setTheta(parseFloat(els.slider.value), "slider");
      });
      els.num.addEventListener("input", function () {
        var v = parseFloat(els.num.value);
        if (isFinite(v)) setTheta(v, "num");
      });

      /* --- the readout card --- */
      var read = card(side, "What the two sides are", "");
      els.kpis = document.createElement("div");
      els.kpis.className = "kpi-row three";
      read.appendChild(els.kpis);
      els.kpis.appendChild(kpi("kpi-width", "width", "width-ink"));
      els.kpis.appendChild(kpi("kpi-height", "height", "height-ink"));
      els.kpis.appendChild(kpi("kpi-area", "width x height", ""));

      els.readNote = document.createElement("p");
      els.readNote.className = "control-hint";
      read.appendChild(els.readNote);

      /* --- the question --- */
      var q = card(side, "The question", "");
      els.question = document.createElement("div");
      els.question.className = "verdict warn";
      q.appendChild(els.question);
    }

    function card(parent, title, note) {
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

    function kpi(id, label, ink) {
      var d = document.createElement("div");
      d.className = "kpi";
      var v = document.createElement("div");
      v.className = "kpi-value" + (ink ? " " + ink : "");
      v.id = id;
      d.appendChild(v);
      var l = document.createElement("div");
      l.className = "kpi-label";
      l.textContent = label;
      d.appendChild(l);
      return d;
    }

    /* ------------------------------------------------------------ the step */
    /* State is the source of truth. resetState puts every field back to its
       opening value, applyStep mutates for exactly one step, render redraws
       everything from the state. Prev rewinds by reset and replay, never by
       an inverse mutation.

       state itself is declared at the top of the builder. Do not redeclare it
       here: see the comment there. */

    function resetState() {
      state = { theta: DEFAULT_THETA, showReadouts: false, showTrail: false };
      if (view) { view.clearTrail(); view.setOptions({ showTrail: false }); }
    }

    function applyStep(c) {
      if (c === 1) state.showReadouts = true;
      if (c === 2) state.showTrail = true;
    }

    function setCursor(c) {
      if (c < 0 || c >= STEPS) return false;
      if (c < cursor) {
        var theta = state.theta;
        resetState();
        state.theta = theta;
        cursor = 0;
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
      if (state.showTrail) view.recordVisit(t);
      if (source !== "slider") els.slider.value = String(t);
      if (source !== "num") els.num.value = window.Heron.fmt(t, 4);
      render(true);
    }

    /* --------------------------------------------------------------- paint */
    function render(skipInputs) {
      var theta = state.theta;
      var other = window.Heron.otherSide(theta);

      view.setOptions({ showTrail: state.showTrail });
      view.setTheta(theta);
      if (!skipInputs) {
        els.slider.value = String(theta);
        els.num.value = window.Heron.fmt(theta, 4);
      }

      els.kpis.style.visibility = state.showReadouts ? "visible" : "hidden";
      document.getElementById("kpi-width").textContent = window.Heron.fmt(theta, 4);
      document.getElementById("kpi-height").textContent = window.Heron.fmt(other, 4);
      /* the product is 2026 for every theta, by construction. Printing it is
         the honesty check a participant can run themselves. */
      document.getElementById("kpi-area").textContent = window.Heron.fmt(theta * other, 4);

      els.readNote.textContent = state.showReadouts
        ? "The third number never moves. That is what fixing the area means."
        : "";

      els.hint.textContent =
        "Drag, or type a width between " + window.RectView.THETA_MIN
        + " and " + window.RectView.THETA_MAX + ".";

      els.caption.textContent = state.showTrail
        ? "Faint outlines mark the tallest and the widest shape you have"
          + " visited. Each dot on the axis is a width you tried."
        : "The blue side is the one you set. The amber side is the one the"
          + " area gives back.";

      var q = els.question;
      q.className = "verdict warn";
      if (cursor === 0) {
        q.innerHTML = '<p class="verdict-title">Look first.</p>'
          + "Move the width from one end to the other and watch the shape."
          + " Tall and narrow at one end, wide and flat at the other.";
      } else if (cursor === 1) {
        q.innerHTML = '<p class="verdict-title">Somewhere in this sweep the'
          + " rectangle is a square.</p>Find it. You have the two side lengths"
          + " printed to four decimal places, so this should be easy.";
      } else {
        q.innerHTML = '<p class="verdict-title">It is not easy.</p>'
          + "Near the middle of the sweep every shape looks square and the two"
          + " numbers still disagree. The eye has run out. Something else has"
          + " to decide.";
      }
    }

    /* ---------------------------------------------------------- test hooks */
    var t = window.HeronViz && window.HeronViz.param("test");
    if (t === "swept") {
      setCursor(2);
      [12, 20, 33, 51, 78, 120, 170].forEach(function (v) {
        view.recordVisit(v);
      });
      setTheta(78);
    } else if (t === "looksquare") {
      setCursor(1);
      setTheta(45);
    }

    return {
      onEnter: function () { render(); },
      onNextKey: function () { return setCursor(cursor + 1); },
      onPrevKey: function () { return setCursor(cursor - 1); }
    };
  };
})();
