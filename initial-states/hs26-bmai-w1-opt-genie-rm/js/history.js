/* Per-scene step history.

   Copied from /Users/carloscotrini/Documents/git_fdd/projects/bandits/js/history.js.
   The code is unchanged; this header was rewritten, because the original
   described a bandit's pulls and this viz has no bandit.

   A record is whatever the scene wants it to be, and this store never looks
   inside one. Scene 1 pushes a single number, the guess the participant just
   handed the genie.

   THE STEP-ENGINE RULE, from the course-viz skill: state is the source of
   truth, and prev is reset plus replay rather than an inverse mutation. So a
   scene keeps only WHAT WAS DONE, and rebuilds everything else by walking it
   again through the real modules. Scene 1 does exactly that: rewinding
   clears the table and replays every remaining guess through js/genie.js, so
   a rewound table and a freshly typed one are built by the same route.

   push() truncates any future records left over from a previous rewind,
   because the participant has just overwritten that history.

   ArrowLeft rewinds and ArrowRight replays. At the head, ArrowRight returns
   false and the driver moves on to the next scene. */
(function () {
  function create() {
    const records = [];   // arbitrary shape: the scene chooses it
    let cursor = 0;       // 0..records.length; cursor === records.length means "at the head"

    return {
      /* Record a fresh entry, discarding anything a previous rewind left in
         the future. */
      push(record) {
        records.length = cursor;
        records.push(record);
        cursor = records.length;
      },
      length() { return records.length; },
      cursor() { return cursor; },
      atHead() { return cursor === records.length; },
      atStart() { return cursor === 0; },
      list() { return records.slice(0, cursor); },
      all() { return records.slice(); },
      get(i) { return records[i]; },
      stepBack() {
        if (cursor === 0) return false;
        cursor--;
        return true;
      },
      stepForward() {
        if (cursor === records.length) return false;
        cursor++;
        return true;
      },
      reset() {
        records.length = 0;
        cursor = 0;
      },
    };
  }

  window.History = { create };
})();
