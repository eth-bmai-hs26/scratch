/* ============================================================================
   scene0.js : The bargain. BUILT.

   The framing is the AINIT deck's, quoted from rl-slides.tex lines 537 to 555:
   lost in the desert, you rub a lamp, and the genie will set you free on one
   condition. The deck shows a Maxfield Parrish plate. This page draws the
   lamp in SVG instead, because no rights record for that plate exists in the
   AINIT repository (proposals/viz-genie-robbins-monro.md, section 14
   question 4). If Carlos clears the rights, the plate replaces the drawing
   and the licence goes in an IMAGE-SOURCES.txt in both repositories.

   THE POSITIVITY CLAUSE IS PLANTED HERE ON PURPOSE. Scene 3 cashes it in
   (the loop under form B walks out of the positive numbers and the genie has
   nothing left to answer) and scene 6 cashes it in again (the bargain has two
   solutions and positivity is what picks one). A participant who has not read
   it in scene 0 experiences both as arbitrary.

   Two steps and no numbers: (0) the condition, (1) the rules of the bargain.

   ?test hooks
     ?test=rules   both steps revealed
   ============================================================================ */
(function () {
  "use strict";

  var STEPS = 2;

  window.scenes = window.scenes || {};
  window.scenes.scene0 = function (root) {
    var cursor = 0;
    var els = {};

    build();
    render();

    function build() {
      var h = document.createElement("h2");
      h.textContent = "A genie offers you a bargain.";
      root.appendChild(h);

      var lede = document.createElement("p");
      lede.className = "scene-lede";
      lede.textContent =
        "Lost in the desert, you rub a lamp. The genie will set you free, " +
        "on one condition. No computer, no formula, only arithmetic. " +
        "How do you even begin?";
      root.appendChild(lede);

      var cols = document.createElement("div");
      cols.className = "scene-cols";
      root.appendChild(cols);

      /* left: the lamp */
      var left = document.createElement("div");
      cols.appendChild(left);
      left.appendChild(lamp());
      var cap = document.createElement("p");
      cap.className = "caption";
      cap.textContent =
        "The lamp is drawn here rather than photographed. The plate the " +
        "lecture slide uses has no licence record, so this page does not " +
        "carry it.";
      left.appendChild(cap);

      /* right: the condition, then the rules */
      var right = document.createElement("div");
      cols.appendChild(right);

      els.step0 = card(right, "The condition", "step 1 of 2");
      var says = document.createElement("p");
      says.className = "genie-line";
      says.textContent =
        "Name me a positive number that my own test accepts, and you go free.";
      els.step0.appendChild(says);

      var t1 = document.createElement("p");
      t1.className = "body-line";
      t1.textContent = "You hand the genie a number Q. It hands back:";
      els.step0.appendChild(t1);
      els.step0.appendChild(window.Katex.display("Q \\;\\longmapsto\\; 1 + \\frac{1}{Q}"));

      var t2 = document.createElement("p");
      t2.className = "body-line";
      t2.textContent =
        "You are free the moment the number you hand in and the number that " +
        "comes back are the same number:";
      els.step0.appendChild(t2);
      els.step0.appendChild(window.Katex.display("Q = 1 + \\frac{1}{Q}, \\qquad Q > 0"));

      els.step1 = card(right, "The rules", "step 2 of 2");
      var ul = document.createElement("ul");
      ul.className = "rule-list";
      [
        "You may test as many numbers as you like. Testing is free.",
        "You may not ask the genie for the answer. It will not say.",
        "The number you name has to be positive. The genie refuses anything else, " +
          "and it refuses anything it cannot divide by."
      ].forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
      els.step1.appendChild(ul);

      var close = document.createElement("p");
      close.className = "body-line";
      close.textContent =
        "That is the whole game. Guess a number, then let the genie's own " +
        "test correct your guess.";
      els.step1.appendChild(close);
    }

    function card(host, title, note) {
      var sec = document.createElement("section");
      sec.className = "card";
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

    /* The lamp, in the shared SVG class vocabulary. No colour is written here:
       every fill and stroke is a class defined in css/scene0.css. */
    function lamp() {
      var NS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(NS, "svg");
      svg.setAttribute("width", "460");
      svg.setAttribute("height", "300");
      svg.setAttribute("viewBox", "0 0 460 300");
      svg.setAttribute("class", "lamp-svg");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label",
        "An oil lamp on desert sand, with smoke curling out of its spout.");

      function add(name, attrs) {
        var n = document.createElementNS(NS, name);
        for (var k in attrs) {
          if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
        }
        svg.appendChild(n);
        return n;
      }

      add("rect", { x: 0, y: 0, width: 460, height: 300, class: "lamp-sky" });
      /* dunes */
      add("path", {
        class: "lamp-sand-far",
        d: "M0 214 C 90 186, 170 224, 262 200 C 330 182, 396 206, 460 192 L460 300 L0 300 Z"
      });
      add("path", {
        class: "lamp-sand",
        d: "M0 244 C 96 224, 168 258, 258 240 C 340 224, 400 250, 460 238 L460 300 L0 300 Z"
      });
      /* smoke, three curls, rising from the spout tip at about (294, 152) */
      add("path", { class: "lamp-smoke", d: "M294 150 C 283 130, 309 120, 297 100" });
      add("path", { class: "lamp-smoke", d: "M297 100 C 285 80, 313 70, 301 50" });
      add("path", { class: "lamp-smoke lamp-smoke-faint", d: "M301 50 C 291 34, 315 26, 307 14" });
      /* lamp body */
      add("ellipse", { cx: 196, cy: 248, rx: 74, ry: 9, class: "lamp-shadow" });
      add("path", {
        class: "lamp-body",
        d: "M136 244 C 136 214, 160 200, 196 200 C 232 200, 256 214, 256 244 Z"
      });
      /* the spout starts INSIDE the dome, at x = 232, so it reads as part of
         the lamp. Starting it on the silhouette edge left it floating. */
      add("path", { class: "lamp-spout", d: "M232 202 L288 152 L300 166 L244 216 Z" });
      add("circle", { cx: 196, cy: 198, r: 9, class: "lamp-knob" });
      add("path", { class: "lamp-handle", d: "M136 232 C 106 226, 106 198, 132 206" });
      add("path", { class: "lamp-rim", d: "M136 244 L256 244" });
      return svg;
    }

    function render() {
      els.step0.parentNode.style.display = cursor >= 0 ? "" : "none";
      els.step1.parentNode.style.display = cursor >= 1 ? "" : "none";
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

    /* ?test= state, for headless capture only */
    if (window.GenieViz && window.GenieViz.param("test") === "rules") {
      cursor = STEPS - 1;
      render();
    }

    return {
      onNextKey: next,
      onPrevKey: prev,
      onEnter: render
    };
  };
})();
