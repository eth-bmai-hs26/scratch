/* ============================================================================
   rng.js : the only source of randomness in this viz.

   Mulberry32 plus Box-Muller, the pair used by the AINIT minigolf cartridge
   (the one seeded game in that arcade). The course-viz never-do list forbids
   bare Math.random(), so nothing anywhere else in this folder may call it:
   every random number in scenes 4 and 5 comes through here.

   SEED is the weekend date, 2026-09-04, written as 20260904. It was pinned
   before any run was inspected and has never been tuned to make a schedule
   look better. Scene 4 recomputes its numbers live from this seed, so what
   is on screen is what this generator produced, not a transcribed constant.

   Exposes window.RNG.
   ============================================================================ */
(function () {
  "use strict";

  var SEED = 20260904;

  /* Mulberry32: 32-bit state, one multiply-xorshift round per draw.
     Returns a function producing floats in [0, 1). */
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Box-Muller. Draws two uniforms, returns one normal deviate with the given
     standard deviation. u is nudged off zero so log(0) cannot happen. */
  function gauss(rand, sd) {
    var u = 1 - rand();
    var v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * (sd === undefined ? 1 : sd);
  }

  window.RNG = {
    SEED: SEED,
    mulberry32: mulberry32,
    gauss: gauss,
    /* A fresh stream at the pinned seed. Call once per run so that a rerun of
       the same demonstration reproduces the same storm. */
    stream: function (seed) { return mulberry32(seed === undefined ? SEED : seed); }
  };
})();
