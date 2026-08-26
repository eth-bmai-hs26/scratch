/* ============================================================================
   main.js : the click-step scene engine and the hash router.

   Six scenes, 0 indexed everywhere: in the hash, in the arrays, and in the
   builder names. Each scene file at js/scenes/sceneN.js registers

       window.scenes.sceneN = function (root) {
         return { onEnter?, onLeave?, onNextKey?, onPrevKey? };
       };

   onNextKey and onPrevKey return true to CONSUME the keystroke, which advances
   a step inside the scene, and false to let the driver change scene.

   Pattern taken from the course-viz skill and from bandits/js/main.js.

   URL HOOKS. The first is a real deep link a lecturer uses mid lecture. The
   rest are DEV AFFORDANCES that exist so headless Chrome can reach states a
   plain screenshot cannot, and they are not user features.

     #scene=N        deep link, jump straight to scene N
     ?theme=dark     force a theme (handled in js/theme.js, query or hash)
     &instant        skip the fade, so a screenshot cannot catch a mid fade
     &run            click the scene's single [data-run-primary] control
     &step=K         fire onNextKey K times, to reach a mid scene state
     ?test=NAME      per scene named state, see each scene's header comment

   The hash is rewritten with replaceState so that stepping through the deck
   never fills the browser history, and so that copying the address bar always
   yields a link back to what is on screen.
   ============================================================================ */
(function () {
  "use strict";

  /* Titles are the contract with the dot pager and the topbar. A scene that is
     still a stub keeps its real title, so the shape of the finished piece is
     visible from the pager on day one. */
  var SCENES = [
    { key: "scene0", title: "The rectangle" },
    { key: "scene1", title: "The table" },
    { key: "scene2", title: "The bracket" },
    { key: "scene3", title: "Heron" },
    { key: "scene4", title: "The digits" },
    { key: "scene5", title: "The bridge" }
  ];
  var TITLES = SCENES.map(function (s) { return s.title; });

  var sceneNodes = [];
  var sceneState = [];
  var current = -1;

  function hashAndQuery() {
    return (window.location.search || "") + (window.location.hash || "");
  }

  function readHashScene() {
    var m = (window.location.hash || "").match(/[#&?]scene=(\d+)/);
    if (!m) return null;
    var n = parseInt(m[1], 10);
    return (isFinite(n) && n >= 0 && n < TITLES.length) ? n : null;
  }

  function syncHash(idx) {
    var cur = window.location.hash || "";
    var next;
    if (/[#&?]scene=\d+/.test(cur)) {
      next = cur.replace(/([#&?])scene=\d+/, "$1scene=" + idx);
    } else if (cur.length > 1) {
      next = cur + "&scene=" + idx;
    } else {
      next = "#scene=" + idx;
    }
    if (next !== cur) {
      try { history.replaceState(null, "", next); } catch (e) { /* file:// */ }
    }
  }

  function flag(name) {
    return new RegExp("[#&?]" + name + "\\b").test(hashAndQuery());
  }

  function param(name) {
    var m = hashAndQuery().match(new RegExp("[#&?]" + name + "=([^&#]+)"));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function updateDots(idx) {
    var dots = document.querySelectorAll(".dot-pager .dot");
    for (var i = 0; i < dots.length; i++) {
      if (i === idx) {
        dots[i].classList.add("active");
        dots[i].setAttribute("aria-current", "true");
      } else {
        dots[i].classList.remove("active");
        dots[i].removeAttribute("aria-current");
      }
    }
  }

  function updateChrome(idx) {
    var prev = document.getElementById("prev-btn");
    var next = document.getElementById("next-btn");
    if (prev) prev.disabled = idx <= 0;
    if (next) next.disabled = idx >= TITLES.length - 1;
    var t = document.getElementById("scene-title");
    if (t) t.textContent = "Scene " + idx + ". " + TITLES[idx];
    document.title = TITLES[idx] + " : squaring the rectangle";
  }

  function goTo(idx) {
    if (idx < 0 || idx >= TITLES.length) return;
    if (idx === current) { syncHash(idx); return; }

    if (current >= 0) {
      var oldNode = sceneNodes[current];
      if (oldNode) oldNode.classList.remove("active", "mounted");
      var oldState = sceneState[current];
      if (oldState && typeof oldState.onLeave === "function") {
        try { oldState.onLeave(); } catch (e) { console.error(e); }
      }
    }

    var stage = document.getElementById("stage");
    if (!sceneNodes[idx]) {
      var node = document.createElement("div");
      node.className = "scene";
      node.dataset.scene = String(idx);
      stage.appendChild(node);
      sceneNodes[idx] = node;
      var builder = window.scenes && window.scenes[SCENES[idx].key];
      if (builder) {
        try {
          sceneState[idx] = builder(node) || {};
        } catch (e) {
          /* an error boundary: one broken scene must not take the deck down,
             because a TA mid lecture needs the other five */
          console.error("Scene builder failed:", e);
          node.textContent = "Scene " + idx + " failed to build: " + (e && e.message);
          sceneState[idx] = {};
        }
      } else {
        node.textContent = "Scene " + idx + " is not registered.";
        sceneState[idx] = {};
      }
    } else {
      var st = sceneState[idx];
      if (st && typeof st.onEnter === "function") {
        try { st.onEnter(); } catch (e) { console.error(e); }
      }
    }

    current = idx;
    sceneNodes[idx].classList.add("mounted");
    /* CSS transitions run on the compositor and do not follow
       --virtual-time-budget, so a headless screenshot otherwise lands mid
       fade. &instant is the dev escape hatch. */
    if (flag("instant")) {
      sceneNodes[idx].style.transition = "none";
      sceneNodes[idx].classList.add("active");
    } else {
      window.setTimeout(function () {
        if (sceneNodes[idx]) sceneNodes[idx].classList.add("active");
      }, 20);
    }

    updateDots(idx);
    updateChrome(idx);
    syncHash(idx);
    applyDevHooks(idx);
  }

  /* &run and &step are applied AFTER the scene is mounted, once, on the scene
     the URL asked for. They are deliberately not re-applied on later
     navigation, so that a lecturer who deep links with &run and then clicks
     Next does not get every following scene auto-played. */
  var devHooksDone = false;
  function applyDevHooks(idx) {
    if (devHooksDone) return;
    devHooksDone = true;
    var node = sceneNodes[idx];
    var st = sceneState[idx];

    if (flag("run") && node) {
      var primary = node.querySelector("[data-run-primary]");
      if (primary) window.setTimeout(function () { primary.click(); }, 180);
    }

    var k = parseInt(param("step"), 10);
    if (isFinite(k) && k > 0 && st && typeof st.onNextKey === "function") {
      window.setTimeout(function () {
        for (var i = 0; i < k; i++) {
          if (!st.onNextKey()) break;
        }
      }, 200);
    }
  }

  function init() {
    if (!window.DATA) {
      console.error("DATA missing. Did data/datasets.js load? "
                    + "Regenerate it with python3 precompute/build_data.py");
    }

    var pager = document.getElementById("dot-pager");
    if (pager) {
      TITLES.forEach(function (title, i) {
        var dot = document.createElement("button");
        dot.className = "dot";
        dot.type = "button";
        dot.setAttribute("aria-label", "Scene " + i + ", " + title);
        dot.title = "Scene " + i + ". " + title;
        dot.addEventListener("click", function () { goTo(i); });
        pager.appendChild(dot);
      });
    }

    var prev = document.getElementById("prev-btn");
    var next = document.getElementById("next-btn");
    /* Prev and Next delegate to the scene's own step engine first, exactly as
       the arrow keys do, so a participant on a trackpad gets the same
       within-scene stepping a keyboard user gets. */
    if (prev) prev.addEventListener("click", function () {
      var st = sceneState[current];
      var handled = st && typeof st.onPrevKey === "function" && st.onPrevKey();
      if (!handled) goTo(current - 1);
    });
    if (next) next.addEventListener("click", function () {
      var st = sceneState[current];
      var handled = st && typeof st.onNextKey === "function" && st.onNextKey();
      if (!handled) goTo(current + 1);
    });

    window.addEventListener("keydown", function (e) {
      if (e.target && e.target.tagName && /^(input|textarea|select)$/i.test(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var st = sceneState[current];
      if (e.key === "ArrowRight") {
        var handledN = st && typeof st.onNextKey === "function" && st.onNextKey();
        if (!handledN) goTo(current + 1);
      } else if (e.key === "ArrowLeft") {
        var handledP = st && typeof st.onPrevKey === "function" && st.onPrevKey();
        if (!handledP) goTo(current - 1);
      }
    });

    window.addEventListener("hashchange", function () {
      var n = readHashScene();
      if (n != null) goTo(n);
    });

    var start = readHashScene();
    goTo(start != null ? start : 0);
  }

  if (!window.scenes) window.scenes = {};

  /* exposed for headless verification and for a lecturer's console */
  window.HeronViz = {
    goTo: goTo,
    current: function () { return current; },
    titles: TITLES,
    flag: flag,
    param: param
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
