# Try This — Idea Tracker

A local, data-driven index of every activity & conversation-game idea for the
Try This (Bonding) app. **150 ideas already in the docs + 50 new ones = 200.**

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Local viewer. **Open this file** (double-click). Filter by source, mode, age group, video-call playability, situation, and free-text search. |
| `ideas.json` | Canonical data file (all ideas + taxonomy). This is the file to hand to a web/app build. |
| `ideas-data.js` | Same data wrapped for the viewer (`window.IDEA_DATA`). Generated — don't edit by hand. |
| `build.py` | Builder: reads the two data modules and writes `ideas.json` + `ideas-data.js`. |
| `existing_data.py` | Authoring source for all 150 existing ideas. |
| `new_data.py` | Authoring source for the 50 new ideas. |

## Add / edit an idea

1. Edit `existing_data.py` or `new_data.py` (copy an existing `i(...)` row).
2. Run `python3 build.py` from this folder.
3. Refresh `index.html`.

To move the same catalog into the app/website, point at `ideas.json` (fields
`mode`, `ages`, `situations`, `duration`, `materials` mirror the app's
`Activity`/`ConversationGame` types). `links`, `photos`, and `videos` are empty
arrays on every idea — fill them in `ideas.json` as media arrives.

## Every idea is tagged with

- **source** — `existing` (already in docs / `CONTENT_SYSTEM.md`, `PLAYABLE_GAME_CARDS.md`) vs `new` (this brainstorm)
- **mode** — `make | move | think | talk | help | perform` (matches app taxonomy)
- **ages** — subset of `3-4, 5-6, 7-8, 9-10`
- **videoCall** — true = works well over a video call (distance play with far grandparents/cousins)
- **situations** — `home, outside, travel, waiting, bedtime, car, restaurant, virtual`
- **description** — a real prose paragraph showing what the family actually does
- **howToPlay** — **every one of the 200 ideas** has a full playable card
  (You say / How to play / Turns / To end / Easier / Harder / Recovery / Safety).
  The 36 conversation games carry the verbatim card from `docs/PLAYABLE_GAME_CARDS.md`;
  all other ideas carry a hand-authored card, so the tracker holds playable detail
  for everything — parity, not a summary.
- **duration**, **materials**, **tags** (mechanics), and media placeholders

How the builder (`build.py`) assembles each idea:
- 36 conversation games → `howToPlay` pulled verbatim from `PLAYABLE_GAME_CARDS.md`
- every other idea → `howToPlay` from the hand-authored `play_*.py` modules
- `description` → from the card (conversation games), the app's `source-ideas.ts` /
  `activities.ts` where a title matches, else the hand-authored description

Add or edit cards in the matching `play_*.py` module (keyed by idea id), never in
`ideas.json`/`ideas-data.js` (generated).

## New-idea mix (the +50)

- 19 talk/conversation games
- 12 dedicated video-call / distance games (most of the ~name "NEW" cards with a 📹 badge)
- 7 Make, 8 Move, 8 Think, 6 Help, 2 Perform

All follow the docs' content rules: cooperative > elimination, a pass is always
allowed, consent before touch, safe materials, no copyrighted lyrics, and no
age-inappropriate hazards.
