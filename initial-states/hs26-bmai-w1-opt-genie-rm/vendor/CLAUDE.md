# CLAUDE.md, vendor/

Third-party libraries, vendored. **No CDN reference exists anywhere in this folder tree**,
and that is a course-viz hard requirement: the page has to open from `file://` on a
lecturer's laptop in flight mode.

## Inventory

| path | what | size | used by |
|---|---|---|---|
| `katex.min.js` | KaTeX 0.17 | 271 KB | `js/katex-helpers.js`, every scene with a formula |
| `katex.min.css` | its stylesheet | 24 KB | `index.html` |
| `fonts/` | 60 files, woff2 plus woff plus ttf | 1.1 MB | KaTeX |
| `d3.min.js` | d3 7.9 | 280 KB | `js/trace.js`, **for two scale functions only** |

Copied from `/Users/carloscotrini/Documents/git_fdd/projects/grasshopper/vendor/`.

## Never deep-edit a vendored file

To update, re-vendor: copy the fresh file over this one and rerun the verification. A hand
patch to a minified library is invisible to the next person and survives no upgrade.

## d3 is on the way out

`grep -rn 'd3\.' ../js/` finds four call sites, all in `js/trace.js`: three
`d3.scaleLinear` and one `d3.scaleLog`, plus `scale.ticks(n)` on the results. That is 280 KB
for about twenty lines of arithmetic. `../issue-prompts/06-drop-d3.md` replaces them with `js/scale.js` and deletes
this file. Update this inventory in the same commit.

## The font tree could be trimmed

KaTeX ships woff2, woff and ttf for every face. Every browser this page will meet takes
woff2. `/Users/carloscotrini/Documents/git_fdd/projects/bandits/vendor/katex/` carries woff2
only, 20 files and 592 KB against 60 files and 1.4 MB here. Trimming it has not been done,
and it is not urgent: nothing is being downloaded.

## Maintenance contract

- This file is the working memory for this directory. After any re-vendor, addition or
  removal, UPDATE THIS FILE IN THE SAME COMMIT, including the sizes. A CLAUDE.md that
  describes a layout the directory no longer has is worse than none.
- Every subdirectory that holds work of its own carries its own CLAUDE.md, and that file must
  itself carry this same maintenance contract, including this propagation rule.
- Keep it concrete: real file names, real identifiers, real commands.
