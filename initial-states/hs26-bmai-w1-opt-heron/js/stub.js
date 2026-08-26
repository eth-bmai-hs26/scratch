/* ============================================================================
   stub.js : the honest placeholder used by scenes 2, 3, 4 and 5.

   WHY THIS EXISTS. Those four scenes are not built. A blank panel would say
   nothing and an invented panel would be worse, because it would show a TA a
   layout nobody designed and numbers nobody verified. So a stub renders the
   brief instead: the scene's job, its step plan, the numbers it will have to
   print, and the issue prompt that builds it. Opening #scene=4 therefore hands
   its owner exactly their work item.

   A stub NEVER draws a fake chart, a fake table of numbers, or a placeholder
   value dressed up as a result. Everything numeric on a stub is quoted from
   issue-prompts/ or from data/datasets.js and is labelled as a target.

   Delete the call to Stub.render from a scene file when you build that scene.
   ============================================================================ */
(function () {
  "use strict";

  function li(parent, str) {
    var n = document.createElement("li");
    n.textContent = str;
    parent.appendChild(n);
    return n;
  }

  /* spec: { title, lede, job, steps: [], numbers: [], issue, owners } */
  function render(root, spec) {
    var head = document.createElement("div");
    head.className = "scene-head";
    var h1 = document.createElement("h1");
    h1.textContent = spec.title;
    head.appendChild(h1);
    if (spec.lede) {
      var p = document.createElement("p");
      p.className = "lede";
      p.textContent = spec.lede;
      head.appendChild(p);
    }
    root.appendChild(head);

    var box = document.createElement("div");
    box.className = "stub";
    root.appendChild(box);

    var flag = document.createElement("span");
    flag.className = "stub-flag";
    flag.textContent = "Not built yet";
    box.appendChild(flag);

    var h2 = document.createElement("h2");
    h2.textContent = "What this scene has to do";
    box.appendChild(h2);

    var job = document.createElement("p");
    job.textContent = spec.job;
    box.appendChild(job);

    if (spec.steps && spec.steps.length) {
      var h3 = document.createElement("h2");
      h3.textContent = "Step plan";
      box.appendChild(h3);
      var ol = document.createElement("ol");
      box.appendChild(ol);
      spec.steps.forEach(function (s) { li(ol, s); });
    }

    if (spec.numbers && spec.numbers.length) {
      var h4 = document.createElement("h2");
      h4.textContent = "Numbers it must print, all already pinned in data/datasets.js";
      box.appendChild(h4);
      var ul = document.createElement("ul");
      box.appendChild(ul);
      spec.numbers.forEach(function (s) { li(ul, s); });
    }

    var owner = document.createElement("p");
    owner.className = "stub-owner";
    owner.textContent = "Built by " + spec.issue + ". Owner: " + spec.owners + ".";
    box.appendChild(owner);
  }

  window.Stub = { render: render };
})();
