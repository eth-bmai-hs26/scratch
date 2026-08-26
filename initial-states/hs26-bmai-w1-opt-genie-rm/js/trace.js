/* ============================================================================
   trace.js : the two plots, and the only place the answer can be drawn.

   Trace.create(host, opts)      the guesses against the round number
   Trace.spark(host, opts)       the size of the loss, on a log strip

   THE TRUTH LINE. A horizontal line at the number the genie would accept is
   the one piece of information the participant is not allowed to have before
   they have worked for it. It is drawn by this module and nowhere else, it is
   off by default, and it turns on through exactly one function:

       Trace.setTruthVisible(true)

   Scene 6 is the only caller. Grepping for setTruthVisible is therefore a
   complete audit of who can reveal the answer, which is what makes the rule
   enforceable rather than a matter of care. precompute/verify-genie.mjs
   assertion (j) checks the same thing from the other side, by asserting that
   no scene numbered 0 to 5 mentions the value or reads DATA.reveal.

   Colours are CSS classes in css/trace.css. Nothing here writes a colour.
   Uses the vendored d3 for scales only; the drawing is plain SVG.

   Exposes window.Trace.
   ============================================================================ */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var truthVisible = false;

  function el(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
      }
    }
    return n;
  }

  function text(x, y, str, cls, anchor) {
    var t = el("text", { x: x, y: y, class: cls });
    if (anchor) t.setAttribute("text-anchor", anchor);
    t.textContent = str;
    return t;
  }

  /* --- the guess trace ---------------------------------------------------
     opts: { width, height, cls }  cls is the CSS class that locks the box.
     render(spec) with spec:
       series : [{ points: [{x, y}], cls, dots }]
       yLabel, xLabel
       yClamp : [lo, hi] to keep one wild excursion from flattening the rest
       truth  : the value of the truth line, drawn only when visible
  */
  function create(host, opts) {
    opts = opts || {};
    /* 470 by 250 is the box css/trace.css locks for .trace-svg. The two
       have to agree exactly: a mismatch scales the viewBox instead of
       resizing the box, which renders acceptably and captures wrong. */
    var W = opts.width || 470;
    var H = opts.height || 250;
    var M = { top: 14, right: 16, bottom: 30, left: 46 };

    host.textContent = "";
    var scroller = document.createElement("div");
    scroller.className = "plot-scroll";
    var svg = el("svg", {
      width: W, height: H, viewBox: "0 0 " + W + " " + H,
      class: opts.cls || "trace-svg", role: "img"
    });
    scroller.appendChild(svg);
    host.appendChild(scroller);

    function render(spec) {
      spec = spec || {};
      svg.textContent = "";
      var series = spec.series || [];
      var xs = [], ys = [];
      series.forEach(function (s) {
        s.points.forEach(function (p) {
          if (isFinite(p.x)) xs.push(p.x);
          if (isFinite(p.y)) ys.push(p.y);
        });
      });
      if (!xs.length) { xs = [0, 1]; ys = [0, 1]; }

      var xExtent = [Math.min.apply(null, xs), Math.max.apply(null, xs)];
      if (xExtent[0] === xExtent[1]) xExtent[1] = xExtent[0] + 1;
      var yLo = Math.min.apply(null, ys);
      var yHi = Math.max.apply(null, ys);
      if (spec.yClamp) {
        yLo = Math.max(yLo, spec.yClamp[0]);
        yHi = Math.min(yHi, spec.yClamp[1]);
      }
      if (truthVisible && isFinite(spec.truth)) {
        yLo = Math.min(yLo, spec.truth);
        yHi = Math.max(yHi, spec.truth);
      }
      if (yLo === yHi) { yLo -= 0.5; yHi += 0.5; }
      var pad = (yHi - yLo) * 0.12;
      yLo -= pad; yHi += pad;

      var x = window.d3.scaleLinear().domain(xExtent).range([M.left, W - M.right]);
      var y = window.d3.scaleLinear().domain([yLo, yHi]).range([H - M.bottom, M.top]);

      svg.appendChild(el("rect", {
        x: M.left, y: M.top,
        width: W - M.right - M.left, height: H - M.bottom - M.top,
        class: "trace-plot-frame"
      }));

      /* gridlines and tick labels */
      y.ticks(5).forEach(function (v) {
        svg.appendChild(el("line", {
          x1: M.left, x2: W - M.right, y1: y(v), y2: y(v), class: "gridline"
        }));
        svg.appendChild(text(M.left - 7, y(v) + 4, String(+v.toFixed(3)), "axis-ink", "end"));
      });
      /* The x axis title sits in the bottom right corner, so the last tick
         would stack on top of it. Drop any tick inside 44px of that corner
         rather than letting two labels share the space. */
      var titleZone = spec.xLabel ? (W - M.right - 44) : W;
      x.ticks(6).forEach(function (v) {
        if (Math.round(v) !== v) return;
        if (x(v) > titleZone) return;
        svg.appendChild(text(x(v), H - M.bottom + 16, String(v), "axis-ink", "middle"));
      });

      /* zero line, when the window straddles it */
      if (yLo < 0 && yHi > 0) {
        svg.appendChild(el("line", {
          x1: M.left, x2: W - M.right, y1: y(0), y2: y(0), class: "trace-zero"
        }));
      }

      /* the truth line, drawn only when a scene has asked for it */
      if (truthVisible && isFinite(spec.truth)) {
        svg.appendChild(el("line", {
          x1: M.left, x2: W - M.right, y1: y(spec.truth), y2: y(spec.truth), class: "trace-truth"
        }));
        svg.appendChild(text(W - M.right - 4, y(spec.truth) - 6,
          spec.truthLabel || "the number the genie accepts", "trace-truth-ink", "end"));
      }

      series.forEach(function (s) {
        var pts = s.points.filter(function (p) { return isFinite(p.x) && isFinite(p.y); });
        if (!pts.length) return;
        var d = pts.map(function (p, i) {
          var yy = Math.max(yLo, Math.min(yHi, p.y));
          return (i ? "L" : "M") + x(p.x).toFixed(2) + " " + y(yy).toFixed(2);
        }).join(" ");
        svg.appendChild(el("path", { d: d, class: "trace-line " + (s.cls || "series-guess") }));
        if (s.dots !== false) {
          pts.forEach(function (p) {
            var yy = Math.max(yLo, Math.min(yHi, p.y));
            svg.appendChild(el("circle", {
              cx: x(p.x).toFixed(2), cy: y(yy).toFixed(2), r: 2.6,
              class: "trace-dot " + (s.cls || "series-guess")
            }));
          });
        }
      });

      if (spec.yLabel) {
        svg.appendChild(text(M.left, M.top - 3, spec.yLabel, "axis-title", "start"));
      }
      if (spec.xLabel) {
        svg.appendChild(text(W - M.right, H - 6, spec.xLabel, "axis-title", "end"));
      }
    }

    return { render: render, node: svg };
  }

  /* --- the loss strip ----------------------------------------------------
     |loss| on a log scale. The only convergence signal scenes 1 to 5 get,
     and it says nothing about where the answer is: it says how far off the
     participant's own two numbers are from each other. */
  function spark(host, opts) {
    opts = opts || {};
    /* 470 by 130 is the box css/trace.css locks for .spark-svg. */
    var W = opts.width || 470;
    var H = opts.height || 130;
    var M = { top: 12, right: 16, bottom: 20, left: 52 };

    host.textContent = "";
    var scroller = document.createElement("div");
    scroller.className = "plot-scroll";
    var svg = el("svg", {
      width: W, height: H, viewBox: "0 0 " + W + " " + H,
      class: opts.cls || "spark-svg", role: "img"
    });
    scroller.appendChild(svg);
    host.appendChild(scroller);

    function render(values) {
      svg.textContent = "";
      var vals = (values || []).map(function (v) { return Math.abs(v); })
        .filter(function (v) { return isFinite(v) && v > 0; });
      if (vals.length < 1) return;

      var lo = Math.min.apply(null, vals);
      var hi = Math.max.apply(null, vals);
      if (lo === hi) { lo = lo / 2; hi = hi * 2; }
      var y = window.d3.scaleLog().domain([lo, hi]).range([H - M.bottom, M.top]);
      var x = window.d3.scaleLinear().domain([0, Math.max(1, vals.length - 1)])
        .range([M.left, W - M.right]);

      svg.appendChild(el("rect", {
        x: M.left, y: M.top,
        width: W - M.right - M.left, height: H - M.bottom - M.top,
        class: "trace-plot-frame"
      }));

      [hi, lo].forEach(function (v) {
        svg.appendChild(el("line", {
          x1: M.left, x2: W - M.right, y1: y(v), y2: y(v), class: "gridline"
        }));
        svg.appendChild(text(M.left - 7, y(v) + 4, v.toExponential(1), "axis-ink", "end"));
      });

      var d = vals.map(function (v, i) {
        return (i ? "L" : "M") + x(i).toFixed(2) + " " + y(v).toFixed(2);
      }).join(" ");
      svg.appendChild(el("path", { d: d, class: "trace-line series-loss" }));
      vals.forEach(function (v, i) {
        svg.appendChild(el("circle", {
          cx: x(i).toFixed(2), cy: y(v).toFixed(2), r: 2.6, class: "trace-dot series-loss"
        }));
      });
      svg.appendChild(text(M.left, M.top - 2, "size of the loss, log scale", "axis-title", "start"));
    }

    return { render: render, node: svg };
  }

  window.Trace = {
    create: create,
    spark: spark,
    setTruthVisible: function (v) { truthVisible = !!v; },
    truthVisible: function () { return truthVisible; }
  };
})();
