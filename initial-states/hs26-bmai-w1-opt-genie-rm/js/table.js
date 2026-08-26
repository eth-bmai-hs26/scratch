/* ============================================================================
   table.js : the guess / target / loss widget.

   One widget, three scenes. Scene 1 fills it a row at a time from what the
   participant types, scene 2 fills it from the full step, and scene 3 fills
   it from a scripted run. The headers are the AINIT deck's own, character
   for character, so a participant who has seen the slide recognises the
   table:

     Q (guess)        target = 1 + 1/Q        loss = Q - target

   The widget holds no arithmetic. It is handed formatted strings, which is
   what lets scene 2 print exact fractions where scene 1 prints decimals.

   Exposes window.Table.
   ============================================================================ */
(function () {
  "use strict";

  /* fixed decimals, tabular, with the sign always shown on the loss so a
     column of losses reads as a column of signed numbers */
  function num(x, digits) {
    if (!isFinite(x)) return "undefined";
    return x.toFixed(digits === undefined ? 6 : digits);
  }
  function signed(x, digits) {
    if (!isFinite(x)) return "undefined";
    var s = Math.abs(x).toFixed(digits === undefined ? 6 : digits);
    return (x < 0 ? "-" : "+") + s;
  }

  /* headers carry a formula, so they are rendered through KaTeX. The plain
     text version stays in the aria-label for a screen reader. */
  var HEADERS = [
    { key: "round", text: "round", tex: null, cls: "col-round" },
    { key: "q", text: "Q (guess)", tex: "Q \\;\\text{(guess)}", cls: "col-q" },
    { key: "target", text: "target = 1 + 1/Q", tex: "\\text{target} = 1 + \\tfrac{1}{Q}", cls: "col-target" },
    { key: "loss", text: "loss = Q - target", tex: "\\text{loss} = Q - \\text{target}", cls: "col-loss" }
  ];

  /* opts:
       targetTex   overrides the target header, used when the bargain is
                   written in its other form
       emptyText   what to show before the first row
       maxHeight   css max-height for the scrolling body, in px
       extra       further columns appended after the loss column, each
                   { key, text, tex, cls }. Scene 2 uses this to promote
                   Carlos's own "verdict" and "update" columns onto the
                   deck's three, once the move has a name. The deck's three
                   headers are never edited: they are only ever added to. */
  function create(host, opts) {
    opts = opts || {};
    host.textContent = "";

    var wrap = document.createElement("div");
    wrap.className = "gtable-wrap";
    if (opts.maxHeight) wrap.style.maxHeight = opts.maxHeight + "px";

    var table = document.createElement("table");
    table.className = "gtable";

    var thead = document.createElement("thead");
    var htr = document.createElement("tr");
    var headers = HEADERS.map(function (h) {
      if (h.key === "target" && opts.targetTex) {
        return { key: h.key, text: opts.targetText || h.text, tex: opts.targetTex, cls: h.cls };
      }
      return h;
    }).concat(opts.extra || []);
    headers.forEach(function (h) {
      var th = document.createElement("th");
      th.className = h.cls;
      th.setAttribute("aria-label", h.text);
      if (h.tex && window.Katex) {
        window.Katex.render(h.tex, th, false);
      } else {
        th.textContent = h.text;
      }
      htr.appendChild(th);
    });
    thead.appendChild(htr);

    var tbody = document.createElement("tbody");

    var empty = document.createElement("div");
    empty.className = "gtable-empty";
    empty.textContent = opts.emptyText || "No numbers tested yet.";

    table.appendChild(thead);
    table.appendChild(tbody);
    wrap.appendChild(table);
    wrap.appendChild(empty);
    host.appendChild(wrap);

    function syncEmpty() {
      empty.style.display = tbody.childElementCount ? "none" : "block";
      table.style.display = tbody.childElementCount ? "table" : "none";
    }
    syncEmpty();

    /* cells: { round, q, target, loss } as strings already formatted.
       meta:  { refused: bool } */
    function addRow(cells, meta) {
      meta = meta || {};
      var tr = document.createElement("tr");
      if (meta.refused) tr.className = "refused";
      headers.forEach(function (h) {
        var td = document.createElement("td");
        td.className = h.cls;
        var v = cells[h.key];
        td.textContent = v === undefined || v === null ? "" : String(v);
        tr.appendChild(td);
      });
      var prev = tbody.querySelector("tr.fresh");
      if (prev) prev.classList.remove("fresh");
      tr.classList.add("fresh");
      tbody.appendChild(tr);
      syncEmpty();
      wrap.scrollTop = wrap.scrollHeight;
      return tr;
    }

    function clear() {
      tbody.textContent = "";
      syncEmpty();
    }

    function removeLast() {
      if (!tbody.lastElementChild) return false;
      tbody.removeChild(tbody.lastElementChild);
      if (tbody.lastElementChild) tbody.lastElementChild.classList.add("fresh");
      syncEmpty();
      return true;
    }

    return {
      addRow: addRow,
      clear: clear,
      removeLast: removeLast,
      count: function () { return tbody.childElementCount; },
      node: wrap
    };
  }

  window.Table = { create: create, num: num, signed: signed, HEADERS: HEADERS };
})();
