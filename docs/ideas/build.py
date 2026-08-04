#!/usr/bin/env python3
"""
Try This (Bonding) — Idea Tracker builder.

Authoring source for every idea (existing + new). Running this script emits:
  - ideas.json      : canonical, human-readable data file (for app/website integration)
  - ideas-data.js   : same data wrapped for the local HTML viewer (window.IDEA_DATA)

Edit ideas here by adding to EXISTING or NEW, then run:
    python3 build.py
and refresh index.html.

Schema per idea:
  id          : unique slug
  title       : short name
  source      : "existing" (already in docs) | "new" (this brainstorm)
  sourceFile  : which docs file the "existing" idea came from
  mode        : make | move | think | talk | help | perform   (matches app Activity.mode)
  oneLiner    : one sentence on what the family actually does
  ages        : subset of ["3-4","5-6","7-8","9-10"]
  videoCall   : bool — does it work well over a video call (distance play)?
  situations  : subset of [home, outside, travel, waiting, bedtime, car, restaurant, virtual]
  duration    : [min, max] minutes
  materials   : none | household | special
  tags        : mechanic/adjective descriptors
  links/photos/videos : placeholder arrays — filled in later
"""

import json, os

AGEBANDS = ["3-4", "5-6", "7-8", "9-10"]
SITUATIONS = ["home", "outside", "travel", "waiting", "bedtime", "car", "restaurant", "virtual"]
MODES = ["make", "move", "think", "talk", "help", "perform"]

A = lambda *xs: sorted(set(x for x in xs if x in AGEBANDS))
S = lambda *xs: sorted(set(x for x in xs if x in SITUATIONS))

def idea(id, title, mode, ages, vc, situations, oneLiner, source="new",
         sourceFile=None, duration=(3, 10), materials="none", tags=()):
    return {
        "id": id, "title": title, "source": source, "sourceFile": sourceFile,
        "mode": mode, "oneLiner": oneLiner,
        "ages": A(*ages), "videoCall": vc, "situations": S(*situations),
        "duration": [duration[0], duration[1]], "materials": materials,
        "tags": list(tags),
        "links": [], "photos": [], "videos": [],
    }

FILE = "CONTENT_SYSTEM.md"
PLAY = "PLAYABLE_GAME_CARDS.md"
CONV = "CONVERSATION_GAMES.md"

# Data is authored in the sibling modules so each stays small and reviewable.
import existing_data, new_data
EXISTING = existing_data.EXISTING
NEW = new_data.NEW

# Hand-authored how-to-play cards for every non-conversation-game idea.
import play_talk_extra, play_make, play_move, play_think, play_help, play_perform, play_new
PLAY_CARDS = {}
for _m in (play_talk_extra, play_make, play_move, play_think, play_help, play_perform, play_new):
    PLAY_CARDS.update(_m.CARDS)


def _norm(s):
    """Lowercase + strip non-alphanumerics (ASCII only) for robust title matching."""
    return "".join(c for c in s.lower() if c.isalnum() and ord(c) < 128)


# Tracker titles that diverge from the docs' canonical card titles.
# Key = normalized IDEA title, value = canonical docs card title.
TITLE_ALIASES = {
    "wouldyouratherfamily": "Would You Rather?",  # docs: "Would You Rather?"
}


def _parse_bullet(line):
    """Split one '- **Label:** value **Label2:** value2' line into (label, text) pairs."""
    import re
    body = re.sub(r"^-\s+", "", line).strip()
    parts = re.split(r"\*\*([^:]+):\*\*", body)  # '', label, text, label, text, …
    out = []
    for i in range(1, len(parts), 2):
        label = parts[i].strip().lower().replace("/", " ").replace(" ", "_")
        text = parts[i + 1].strip() if i + 1 < len(parts) else ""
        if text:
            out.append((label, text))
    return out


def parse_game_cards(md_path):
    """Parse PLAYABLE_GAME_CARDS.md into {normalized_title: {label: text}}.

    Each card is a '### N. Title' block whose body is a list of
    '- **Label:** value' lines. Every label/value pair is preserved verbatim
    so the tracker holds the exact same 'how to play' content the app shows.
    """
    import re
    cards = {}
    current = None
    with open(md_path, encoding="utf-8") as f:
        for line in f:
            h = re.match(r"^###\s+\d+\.\s+(.+)$", line.strip())
            if h:
                current = _norm(h.group(1))
                cards.setdefault(current, {})
                continue
            if current is None or not re.match(r"^-\s+\*\*", line):
                continue
            for label, text in _parse_bullet(line):
                cards[current][label] = text
    return cards


def load_source_howto(ts_path):
    """Pull {title: howTo} from source-ideas.ts for rich descriptions."""
    import re
    out = {}
    if not os.path.exists(ts_path):
        return out
    with open(ts_path, encoding="utf-8") as f:
        for m in re.finditer(r'title:\s*"([^"]+)"[^}]*?howTo:\s*"((?:[^"\\]|\\.)*)"', f.read(), re.S):
            out[_norm(m.group(1))] = m.group(2).replace('\\"', '"')
    return out


def load_activity_idea(ts_path):
    """Pull {title: theIdea} from activities.ts."""
    import re
    out = {}
    if not os.path.exists(ts_path):
        return out
    with open(ts_path, encoding="utf-8") as f:
        for m in re.finditer(r'title:\s*"([^"]+)"[^}]*?theIdea:\s*"((?:[^"\\]|\\.)*)"', f.read(), re.S):
            out[_norm(m.group(1))] = m.group(2).replace('\\"', '"')
    return out


def card_description(card):
    """Compose a readable 'what you do' description from a playable card."""
    parts = []
    if "what_it_is" in card:
        parts.append(card["what_it_is"])
    if "say" in card:
        parts.append("You say: %s" % card["say"])
    if "first_round" in card:
        parts.append("First round: %s" % card["first_round"])
    return " ".join(parts)


def validate(ideas):
    """Sanity-check every idea so a bad row fails the build loudly."""
    ids = set()
    for x in ideas:
        assert x["id"] not in ids, f"duplicate id: {x['id']}"
        ids.add(x["id"])
        for f in ("id", "title", "source", "mode", "oneLiner", "description",
                  "ages", "videoCall", "situations", "duration", "materials",
                  "tags", "links", "photos", "videos", "sourceFile", "howToPlay"):
            assert f in x, f"{x['id']} missing field {f}"
        assert x["mode"] in MODES, f"{x['id']} bad mode {x['mode']}"
        for a in x["ages"]:
            assert a in AGEBANDS, f"{x['id']} bad age {a}"
        for s in x["situations"]:
            assert s in SITUATIONS, f"{x['id']} bad situation {s}"


def main():
    here = os.path.dirname(os.path.abspath(__file__))   # <repo>/docs/ideas
    repo = os.path.dirname(os.path.dirname(here))       # <repo>
    src_data = os.path.join(repo, "src", "data")

    cards = parse_game_cards(os.path.join(repo, "docs", "PLAYABLE_GAME_CARDS.md"))
    source_howto = load_source_howto(os.path.join(src_data, "source-ideas.ts"))
    activity_idea = load_activity_idea(os.path.join(src_data, "activities.ts"))

    for idea in EXISTING + NEW:
        # 1) description: real prose showing what the idea actually is
        if idea["source"] == "existing" and idea["mode"] == "talk":
            key = _norm(TITLE_ALIASES.get(_norm(idea["title"]), idea["title"]))
            if key in cards:
                idea["description"] = card_description(cards[key])
            else:
                idea["description"] = idea["oneLiner"]
        else:
            key = _norm(idea["title"])
            if key in source_howto:
                idea["description"] = source_howto[key]
            elif key in activity_idea:
                idea["description"] = activity_idea[key]
            else:
                idea["description"] = idea["oneLiner"]

        # 2) howToPlay: full playable card for EVERY idea.
        #    - the 36 conversation games -> verbatim card from PLAYABLE_GAME_CARDS.md
        #    - every other idea         -> hand-authored card keyed by id
        key = _norm(TITLE_ALIASES.get(_norm(idea["title"]), idea["title"]))
        if key in cards:
            idea["howToPlay"] = cards[key]
        else:
            idea["howToPlay"] = PLAY_CARDS.get(idea["id"])
        if not idea["howToPlay"]:
            raise SystemExit(f"Missing howToPlay card for: {idea['id']} ({idea['title']})")

    all_ideas = EXISTING + NEW
    validate(all_ideas)

    payload = {
        "generated": "Try This (Bonding) — Idea Tracker",
        "counts": {
            "total": len(all_ideas),
            "existing": len(EXISTING),
            "new": len(NEW),
            "withHowToPlay": sum(1 for i in all_ideas if i["howToPlay"]),
        },
        "taxonomy": {
            "ageBands": AGEBANDS,
            "modes": MODES,
            "situations": SITUATIONS,
            "videoCall": "true = playable over a video call (distance play)",
        },
        "ideas": all_ideas,
    }

    with open(os.path.join(here, "ideas.json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
        f.write("\n")

    with open(os.path.join(here, "ideas-data.js"), "w", encoding="utf-8") as f:
        f.write("// Generated by build.py from ideas.json/idea data. Do not edit by hand.\n")
        f.write("window.IDEA_DATA = ")
        json.dump(payload, f, indent=2, ensure_ascii=False)
        f.write(";\n")

    print(f"OK  {len(all_ideas)} ideas  ({len(EXISTING)} existing + {len(NEW)} new)")
    print(f"    with full 'how to play' cards: {payload['counts']['withHowToPlay']}")
    print(f"    wrote ideas.json and ideas-data.js in {here}")


if __name__ == "__main__":
    main()
