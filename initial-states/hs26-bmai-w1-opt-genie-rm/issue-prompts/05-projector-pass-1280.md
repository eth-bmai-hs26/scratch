# Issue 5: The projector pass at 1280x800

## Goal

Walk all nine scenes at 1280x800 in both themes and fix what breaks. Every capture so far was
taken at 1400x1000, and a lecture-hall projector is likely to be the smaller one. A scene
that is weak at the size the room will actually see is not shipped.

## Dependencies

- **Issue 3** (Scene 4) and **Issue 4** (Scene 5), because a pass over eight of nine scenes
  would have to be repeated.

## Context

`css/style.css` sets `.scene-cols` to
`grid-template-columns: minmax(320px, 1fr) minmax(320px, 1.1fr)` with a 26px gap, collapsing
to one column below 900px. At a 1400px viewport the two columns come out at about 523 and
575 pixels. At 1280 they come out at about 466 and 512, and the plot boxes are locked at
470px wide by `css/trace.css`. **470 does not fit inside 466 minus the card's 32px of
padding.** The plots will scroll inside their `.plot-scroll` containers, which is correct
behaviour and may still look wrong.

Four specific things the design spec's own verification section names:

1. Scene 1 with eight or more rows: does the table scroll inside its own box, or does it push
   the Check button below the fold?
2. Scene 3 at the moment the run flees: the trace has to hold `+2.33` and `-4.0` in one frame
   without the axis rescaling so violently that the earlier rows collapse onto a line.
3. Scenes 4 and 5: three or four traces on one axis, with the smallest band still visible
   rather than pinned flat.
4. Scene 8: the muted last row has to read as legibly muted in **both** themes, and dark is
   the harder one, where the pair is `--secondary` on `--bg`.

## Deliverables

### 1. A capture pass at the projector size

`docs/capture.sh` takes the window size as its second argument. Run:

```
bash docs/capture.sh light 1280,800
bash docs/capture.sh dark  1280,800
```

Then **read every PNG**. Twenty-two images. The skill says this twice and gives the reason:
an agent has no eyes, and a screenshot nobody opens is a file rather than a verification.

### 2. Fixes, in CSS only where possible

Prefer adjusting `.scene-cols`, a card's padding, or a plot box size over restructuring a
scene. If a plot box changes, **change `css/trace.css` and `js/trace.js` in the same edit**,
for the reason recorded in the header comment of `css/trace.css`.

### 3. A room rehearsal, written down

Walk the deck three times at 1280x800: once with the arrow keys only, once with the mouse
only, and once in dark. Record what you found in `docs/CLAUDE.md` under a dated heading,
including anything you decided to leave alone and why.

### 4. `docs/screenshot-table.png` (updated)

Recapture it at whichever size the README ends up describing, and update the README's
"what was actually observed" paragraph if what you see differs.

## File Structure

```
docs/CLAUDE.md               (updated, a dated section)
docs/screenshot-table.png    (updated)
css/*.css                    (updated as needed)
js/trace.js                  (updated only alongside css/trace.css)
README.md                    (updated if the observation changed)
```

## Verification

- Twenty-two PNGs exist and each one has been read.
- At 1280x800, no scene scrolls the page body horizontally. A plot may scroll inside its own
  `.plot-scroll` container; the body may not.
- Scene 1 at eight rows: the Check button is visible without scrolling the page.
- Scene 8's muted row is legible and visibly muted in both themes.
- `node precompute/verify-genie.mjs` still ends on `ALL PASS`.
- No console errors on any of the nine scenes in either theme.
