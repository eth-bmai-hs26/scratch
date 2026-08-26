/* ============================================================================
   stub.js : the card a scene shows while it is still an initial state.

   A stub scene is REGISTERED, TITLED and REACHABLE by #scene=N. It appears in
   the dot pager in its final position and it carries its real title, so the
   shape of the finished piece is legible on day one and a later scene does
   not renumber the deep links a TA has already written down.

   The card states four things, because a TA who lands on it mid lecture needs
   all four: what the scene will do, who owns it, which issue prompt specifies
   it, and what already works that the scene will be built on top of.

   Exposes window.Stub.
   ============================================================================ */
(function () {
  "use strict";

  /* spec: { n, title, lede, owner, issue, does: [string], built: [string] } */
  function render(root, spec) {
    spec = spec || {};

    var h = document.createElement("h2");
    h.textContent = spec.title || "Not built yet";
    root.appendChild(h);

    if (spec.lede) {
      var p = document.createElement("p");
      p.className = "scene-lede";
      p.textContent = spec.lede;
      root.appendChild(p);
    }

    var card = document.createElement("section");
    card.className = "card stub-card";

    var head = document.createElement("div");
    head.className = "card-head";
    var title = document.createElement("span");
    title.className = "card-title";
    title.textContent = "Initial state";
    var note = document.createElement("span");
    note.className = "card-note";
    note.textContent = "scene " + (spec.n === undefined ? "?" : spec.n) + " is registered and reachable";
    head.appendChild(title);
    head.appendChild(note);
    card.appendChild(head);

    var body = document.createElement("div");
    body.className = "card-body";

    if (spec.does && spec.does.length) {
      var lab1 = document.createElement("p");
      lab1.className = "step-note";
      lab1.textContent = "What this scene will do";
      body.appendChild(lab1);
      body.appendChild(list(spec.does));
    }

    if (spec.built && spec.built.length) {
      var lab2 = document.createElement("p");
      lab2.className = "step-note";
      lab2.style.marginTop = "14px";
      lab2.textContent = "What it will be built on, already working";
      body.appendChild(lab2);
      body.appendChild(list(spec.built));
    }

    var owner = document.createElement("p");
    owner.className = "stub-owner";
    owner.style.marginTop = "14px";
    owner.textContent = "owner: " + (spec.owner || "unassigned") +
      "   spec: " + (spec.issue || "see issue-prompts/");
    body.appendChild(owner);

    card.appendChild(body);
    root.appendChild(card);
    return card;
  }

  function list(items) {
    var ul = document.createElement("ul");
    ul.className = "stub-list";
    items.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    return ul;
  }

  window.Stub = { render: render };
})();
