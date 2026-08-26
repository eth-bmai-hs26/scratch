/* ============================================================================
   rectview.js : the rectangle panel. Shared by scenes 0, 1, 2 and 3.

   THE ONE IDEA. The area is fixed at 2026. The participant owns the width
   theta. The height is then FORCED to 2026/theta. So the ink area on screen is
   constant for every theta, by construction, and the only thing that changes
   is the shape. That constancy is the first thing a participant notices and is
   the reason the picture can be trusted.

   FIXED SCALE, NEVER AUTO-FIT. 1.6 px per unit, always. This is the rule
   grasshopper's localview.js follows and for the same reason: if the drawing
   rescaled itself to fit, a tall sliver and a flat slab would look the same
   and the shape would stop carrying the verdict. The cost is a bounded theta
   range, and the range is chosen so that it is closed under theta -> 2026/theta:

       theta in [10, 202.6],  and  2026/10 = 202.6,  2026/202.6 = 10

   so the tallest shape and the widest shape are mirror images and both fit.

   WHAT THIS FILE MUST NEVER DRAW. No tick, marker, dashed line or label at
   sqrt(2026), and no printed value of it, unless showSquare is explicitly
   turned on by the caller. Scenes 0 to 3 leave it off. That is the withholding
   rule from proposals/viz-heron.md section 7, and it is the whole pedagogy:
   the participant has to fail to find the square by eye.

   Exposes window.RectView. No colour literals: every stroke and fill goes
   through a class defined in css/style.css.
   ============================================================================ */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  /* Geometry, pinned. These numbers are also in DATA.view so that
     precompute/build_data.py asserts the range is closed under the map. */
  var W = 620;          /* svg width, matches the CSS lock in style.css   */
  var H = 400;          /* svg height, matches the CSS lock              */
  var OX = 116;         /* origin x. Wide enough that a right-anchored    */
                        /* height label never runs off the left edge.     */
  var OY = 356;         /* origin y, the baseline the rectangle sits on   */
  var PX = 1.6;         /* pixels per unit, FIXED                         */
  var TOP = 20;         /* top of the plot area                           */

  var THETA_MIN = 10;
  var THETA_MAX = 202.6;

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
          n.setAttribute(k, attrs[k]);
        }
      }
    }
    if (parent) parent.appendChild(n);
    return n;
  }

  function text(parent, x, y, str, cls, anchor) {
    var t = el("text", { x: x, y: y, "class": cls }, parent);
    if (anchor) t.setAttribute("text-anchor", anchor);
    t.textContent = str;
    return t;
  }

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function create(host, opts) {
    opts = opts || {};

    var state = {
      theta: opts.theta === undefined ? 15 : opts.theta,
      showTrail: !!opts.showTrail,
      showSquare: !!opts.showSquare,   /* off for scenes 0 to 3 */
      visits: []
    };

    var svg = el("svg", {
      width: W,
      height: H,
      viewBox: "0 0 " + W + " " + H,
      "class": "rect-stage",
      role: "img"
    });
    host.appendChild(svg);

    var gStatic = el("g", null, svg);
    var gTrail = el("g", null, svg);
    var gRect = el("g", null, svg);
    var gLabels = el("g", null, svg);

    drawStatic();

    /* ---------------------------------------------------------- static ink */
    function drawStatic() {
      el("rect", {
        x: OX, y: TOP, width: W - OX - 20, height: OY - TOP, "class": "paper"
      }, gStatic);

      /* gridlines every 50 units, no numeric labels: the precise numbers live
         in the readout panel, and unlabelled gridlines still give scale
         without adding a second place for a number to disagree with itself */
      for (var u = 50; u <= 300; u += 50) {
        var gx = OX + u * PX;
        if (gx < W - 20) {
          el("line", { x1: gx, y1: TOP, x2: gx, y2: OY, "class": "gridline" }, gStatic);
        }
        var gy = OY - u * PX;
        if (gy > TOP) {
          el("line", { x1: OX, y1: gy, x2: W - 20, y2: gy, "class": "gridline" }, gStatic);
        }
      }

      el("line", { x1: OX, y1: OY, x2: W - 20, y2: OY, "class": "axis-line" }, gStatic);
      el("line", { x1: OX, y1: OY, x2: OX, y2: TOP, "class": "axis-line" }, gStatic);

      text(gStatic, W - 20, OY + 30, "width", "axis-title", "end");
      var vt = text(gStatic, 0, 0, "height", "axis-title", "middle");
      vt.setAttribute("transform", "translate(" + (OX - 62) + "," + (TOP + 30) + ") rotate(-90)");
    }

    /* -------------------------------------------------------------- render */
    function render() {
      var theta = state.theta;
      var other = window.Heron.otherSide(theta);
      var wpx = theta * PX;
      var hpx = other * PX;

      while (gRect.firstChild) gRect.removeChild(gRect.firstChild);
      while (gLabels.firstChild) gLabels.removeChild(gLabels.firstChild);
      while (gTrail.firstChild) gTrail.removeChild(gTrail.firstChild);

      if (state.showTrail) drawTrail();

      el("rect", {
        x: OX, y: OY - hpx, width: wpx, height: hpx, "class": "rect-body"
      }, gRect);
      el("rect", {
        x: OX, y: OY - hpx, width: wpx, height: hpx, "class": "rect-edge"
      }, gRect);

      /* the two sides, drawn thick in their identity colours. Blue is the one
         you chose. Amber is the one the area handed back. */
      el("line", {
        x1: OX, y1: OY, x2: OX + wpx, y2: OY, "class": "side-width"
      }, gRect);
      el("line", {
        x1: OX, y1: OY, x2: OX, y2: OY - hpx, "class": "side-height"
      }, gRect);

      /* the square guide is opt in and stays OFF for scenes 0 to 3 */
      if (state.showSquare) {
        var s = Math.sqrt(window.Heron.AREA) * PX;
        el("rect", {
          x: OX, y: OY - s, width: s, height: s, "class": "square-guide"
        }, gRect);
      }

      drawLabels(theta, other, wpx, hpx);
    }

    function drawTrail() {
      if (!state.visits.length) return;
      var widest = state.visits[0];
      var tallest = state.visits[0];
      var i;
      for (i = 1; i < state.visits.length; i++) {
        if (state.visits[i] > widest) widest = state.visits[i];
        if (state.visits[i] < tallest) tallest = state.visits[i];
      }
      /* ghost outlines of the two extremes visited so far. Drawing every visit
         would be noise; these two are the ones that say "you swept this far". */
      [widest, tallest].forEach(function (t) {
        var w = t * PX;
        var h = window.Heron.otherSide(t) * PX;
        el("rect", { x: OX, y: OY - h, width: w, height: h, "class": "trail-rect" }, gTrail);
      });
      /* one dot per visited width, on the axis */
      for (i = 0; i < state.visits.length; i++) {
        el("circle", {
          cx: OX + state.visits[i] * PX, cy: OY + 6, r: 2.2, "class": "trail-dot"
        }, gTrail);
      }
    }

    function drawLabels(theta, other, wpx, hpx) {
      /* width label: its own lane under the axis, centred on the blue edge,
         nudged right so a very narrow rectangle does not push it off canvas */
      var wx = clamp(OX + wpx / 2, OX + 4, W - 70);
      text(gLabels, wx, OY + 18,
           window.Heron.fmt(theta, 4), "side-width-ink", "middle");

      /* height label: right aligned into the left margin, level with the top
         of the amber edge. The margin is 116px wide, which is why OX is 116. */
      var hy = clamp(OY - hpx + 5, TOP + 11, OY - 4);
      text(gLabels, OX - 10, hy,
           window.Heron.fmt(other, 4), "side-height-ink", "end");

      /* the area label. Inside the rectangle when it fits, otherwise just
         outside its right edge. 2026 never changes: that is the point. */
      var label = String(window.Heron.AREA);
      if (wpx >= 58 && hpx >= 30) {
        text(gLabels, OX + wpx / 2, OY - hpx / 2 + 6, label, "area-ink", "middle");
      } else {
        var ax = clamp(OX + wpx + 12, OX + 12, W - 70);
        var ay = clamp(OY - hpx / 2 + 6, TOP + 14, OY - 6);
        text(gLabels, ax, ay, label, "area-ink", "start");
      }
    }

    /* ----------------------------------------------------------------- api */
    function setTheta(t) {
      state.theta = clamp(Number(t), THETA_MIN, THETA_MAX);
      render();
      return state.theta;
    }

    function recordVisit(t) {
      state.visits.push(clamp(Number(t), THETA_MIN, THETA_MAX));
      if (state.visits.length > 400) state.visits.shift();
    }

    render();

    return {
      node: svg,
      setTheta: setTheta,
      getTheta: function () { return state.theta; },
      recordVisit: recordVisit,
      clearTrail: function () { state.visits = []; render(); },
      setOptions: function (o) {
        if (o.showTrail !== undefined) state.showTrail = !!o.showTrail;
        if (o.showSquare !== undefined) state.showSquare = !!o.showSquare;
        render();
      },
      render: render,
      THETA_MIN: THETA_MIN,
      THETA_MAX: THETA_MAX
    };
  }

  window.RectView = {
    create: create,
    THETA_MIN: THETA_MIN,
    THETA_MAX: THETA_MAX,
    PX_PER_UNIT: PX,
    W: W,
    H: H
  };
})();
