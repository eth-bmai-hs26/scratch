/* ============================================================================
   scene8.js : The same loop, on a price. BUILT.

   A mapping table as the whole scene, with no prose around it. The device is
   the AINIT deck's own: rl-slides.tex lines 111 to 123 are a [plain] frame
   that is nothing but a two-column table, and the sharpest thing in it is
   that ONE ROW IS MUTED, because it names a term the material offers and the
   course refuses.

   Here the muted row is "solve it in closed form". For the genie the
   quadratic formula genuinely would have worked, which the participant has
   just been shown in scene 6. For a model it does not exist. That is why the
   loop is the method rather than a curiosity, and it is why the row is muted
   rather than deleted: the participant has to see the option being declined.

   MUTING IS DONE THE DECK'S WAY: no emphasis on either side, and the right
   cell alone drops to the secondary token. Never a strikethrough, never a
   deletion, never a caption explaining it.

   The closing thought is the last ordinary line in body text, at body size,
   in the body colour. The house rule is that a scene ends on its final
   reveal and never on a big centred line in a brand colour.

   ANTI-COLLISION. This scene points at three things it does not teach:
   the dataset and the residual belong to hs26-bmai-w1-opt-rm-house at the
   same 10:00 block, and the derivative belongs to the 11:00 gradient descent
   session. Naming them is the whole job here.
   ============================================================================ */
(function () {
  "use strict";

  var ROWS = [
    ["Q, your guess", "w, the weight in the model"],
    ["the genie's test, 1 + 1/Q", "what one house's price demands of w"],
    ["loss = Q - target", "the residual on that one house"],
    ["Q <- Q - alpha_t * loss", "w <- w - alpha_t * (the step that residual asks for)"],
    ["the sandstorm", "one house at a time instead of all of them"],
    ["alpha_t shrinking", "the learning rate schedule"]
  ];
  var MUTED_ROW = ["solve it in closed form", "there is no formula to solve"];

  window.scenes = window.scenes || {};
  window.scenes.scene8 = function (root) {
    var h = document.createElement("h2");
    h.textContent = "The same loop, on a price.";
    root.appendChild(h);

    var table = document.createElement("table");
    table.className = "map-table";

    var thead = document.createElement("thead");
    var htr = document.createElement("tr");
    ["the genie's loop", "the model's loop"].forEach(function (t) {
      var th = document.createElement("th");
      th.textContent = t;
      htr.appendChild(th);
    });
    thead.appendChild(htr);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    ROWS.forEach(function (pair) {
      tbody.appendChild(row(pair[0], pair[1], false));
    });
    tbody.appendChild(row(MUTED_ROW[0], MUTED_ROW[1], true));
    table.appendChild(tbody);

    var wrap = document.createElement("div");
    wrap.className = "map-wrap";
    wrap.appendChild(table);
    root.appendChild(wrap);

    var last = document.createElement("p");
    last.className = "body-line";
    last.textContent =
      "This loop, run on a prediction loss with one example at a time, is " +
      "stochastic gradient descent. That is the 11:00 session.";
    root.appendChild(last);

    function row(leftText, rightText, muted) {
      var tr = document.createElement("tr");
      if (muted) tr.className = "muted-row";
      var td1 = document.createElement("td");
      td1.className = "map-left";
      td1.textContent = leftText;
      var td2 = document.createElement("td");
      td2.className = "map-right";
      td2.textContent = rightText;
      tr.appendChild(td1);
      tr.appendChild(td2);
      return tr;
    }

    return {};
  };
})();
