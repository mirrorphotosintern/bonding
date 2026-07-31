# ConnectPlay Implementation Audit and Try This Handoff

**Audited:** 2026-07-26  
**Implementation:** `/Users/lavanya/github/connectplay`

## Conclusion

ConnectPlay is a functioning static **idea-bank prototype**, not an implementation of the proposed Try This mobile product.

Preserve and reuse:

- its 74 seed cards;
- the explicit split between founder saves and researched additions;
- all verbatim founder notes and saved text;
- its 44 original URLs and 43-message audit trail;
- its source, age, category, and search controls as an editorial/research view.

Do not treat it as the foundation for local-first sessions, unified contextual matching, the playable idea page, safety-reviewed publication, family sync, subscriptions, or the Cloudflare backend.

```text
ConnectPlay static idea bank
        ↓ curate and validate
Try This content records
        ↓ publish versioned catalog
Try This Expo app + Cloudflare backend
```

Do not import `connectplay/data/ideas.json` directly into production. Accepted entries must be converted through Try This's content schema and safety workflow.

## Verified implementation

### Runtime

- Plain HTML, local CSS, and vanilla JavaScript
- No package manager, framework, compiler, or build step
- Loads `data/ideas.json` with `fetch()`
- Intended for Cloudflare Pages
- No external fonts or CDN assets

### Working interactions

- All / Yours / Claude's source toggle
- Multi-select age and category filters
- Text search
- Responsive card grid
- Original-link action on every founder-saved item
- Source link on researched additions when present
- Visible result counts

### Data inventory

| Measure | Actual |
| --- | ---: |
| Total cards | 74 |
| Founder-saved cards | 44 |
| Researched cards | 30 |
| Raw founder messages | 43 |
| Original founder links | 44 |
| Duplicate IDs | 0 |
| Founder cards missing a URL | 0 |
| Cards missing `howTo` | 0 |
| ParentLinks URLs represented | 44 of 81 |
| ParentLinks URLs absent | 37 |

All 44 ConnectPlay founder URLs occur in `ParentLinks.csv`. ConnectPlay is an older subset, not a competing corpus.

| Category | Cards |
| --- | ---: |
| Active game | 22 |
| Connect and talk | 9 |
| Reference | 9 |
| Craft | 8 |
| Philosophy | 8 |
| Recite and sing | 5 |
| Life skill | 4 |
| Ritual | 4 |
| Magic | 3 |
| Science | 1 |
| Drawing | 1 |

Seventeen cards are philosophy or reference material rather than playable activities. They belong in research/admin views, not the family catalog.

## What ConnectPlay got right

### Provenance

The explicit distinction between `source: "yours"` and `source: "claude"` is valuable. Founder notes and source text are retained rather than overwritten. Production should migrate that into a neutral model:

```ts
type ProvenanceKind =
  | "founder-save"
  | "editorial-original"
  | "traditional-game"
  | "licensed-source"
  | "research-inspiration";

interface Provenance {
  kind: ProvenanceKind;
  sourceUrls: string[];
  creatorHandle?: string;
  founderNoteVerbatim?: string;
  savedTextVerbatim?: string;
  capturedAt?: string;
  reviewedAt?: string;
  sourceAvailable?: boolean;
}
```

The family-facing app should say “Editorial addition,” not “Added by Claude,” while the internal record preserves true provenance.

### Immutable acquisition snapshot

Keep `connectplay/data/sources.json`, existing `origin.yourNote`, existing `origin.savedText`, and the original URLs unchanged. Future imports should be separate batches; do not silently broaden the old literal-`parenting` WhatsApp search.

### Editorial exploration

The current grid and filters are useful for a private source browser. They should not replace Try This's one-match Today experience.

## Gap matrix

| Area | ConnectPlay | Try This | Decision |
| --- | --- | --- | --- |
| Product form | Static idea bank | Native local-first companion | Keep prototype independent |
| Primary experience | Many-card grid | One context-matched idea | Do not port grid as Today |
| Content depth | Short `howTo` | Exact steps, variants, ending, safety, access | Enrich before release |
| Conversation games | A few classics/prompts | 36 complete cards | Use `PLAYABLE_GAME_CARDS.md` |
| Ages | 0–1 through 6+ | Initial focus 3–10 | Map accepted records; archive infant entries |
| Sources | 44-link subset | 81-link audit | Add 37 newer URLs as another batch |
| Safety/access | Not structured | Release-blocking fields | Add during conversion |
| Link state | Direct external links | Availability, adult gate, fallback rules | Add publication checks |
| Offline | Local assets but runtime JSON fetch | Installed catalog and offline sessions | Use Expo SQLite/files |
| Backend | Static Pages | Workers, D1, R2, Queues, Workflows | Build separately |

## Content findings

A non-empty `howTo` does not guarantee reproducible instructions.

Good conversion candidates include paper boomerangs, bat origami, jumping balloon toy, sound/listening game, bottle collection, laundry folding, jacket flip, alphabet conversation, I Spy, 20 Questions, mirror game, pass the clap, body percussion, secret handshake, and Special Time. Each still needs exact materials/steps, safety, accessibility, age review, and source availability.

Research-only or insufficient cards include “DIY build / repair hack,” “Japanese household-item craft,” “Mind-body-sight coordination game,” generic “Saved idea” placeholders, philosophy cards, and competitor references. Keep these in the idea bank until they can be understood and converted.

The newer Bonding audit also identifies risks the old JSON does not model: unsafe toddler setups, latex/fragments/string, unreliable flying crafts, shame or stigma, nationality/intelligence framing, exaggerated developmental claims, and removed or visually unclear posts. Bonding's safety rules supersede conflicting `why` copy.

## Migration plan

1. **Freeze the acquisition snapshot.** Preserve raw messages, URLs, founder notes, and saved text.
2. **Classify all 74 cards:** `convert-now`, `needs-source-review`, `research-only`, `reject-safety`, `duplicate-mechanic`, or `later-age-range`.
3. **Import the 37 additional ParentLinks URLs as a distinct batch.** Do not rewrite the old corpus history.
4. **Convert accepted entries:** preserve provenance; assign Try This ID; map age; add promise, materials, exact steps or allowed source fallback, safety, accessibility, variants, testing, and immutable version.
5. **Convert conversation games through the unified catalog adapter.** Preserve their specialized rule, opening-prompt, language, driver-safety, and interruptibility fields without creating a separate user-facing product lane.
6. **Retain ConnectPlay as an editorial/source browser.** It must never expose private notes, child data, or editorial credentials from the production backend.

## Changes to the Bonding plan

1. The project is not starting from zero: 74 seed cards and a 44-link provenance snapshot already exist.
2. Provenance has a concrete legacy model that must be migrated rather than reinvented.
3. The first hands-on corpus should come from qualified ConnectPlay entries plus the 37 newer ParentLinks—not an entirely invented list of 84 titles.
4. ConnectPlay's grid is an editorial tool; Today remains one recommendation.
5. Source-first alpha cards remain viable only when reproducible, available, adult-gated, and accompanied by Try This safety context.

## Verification performed

- Parsed both JSON files.
- Confirmed 74 unique IDs.
- Confirmed all 44 founder cards have URLs.
- Confirmed all cards have `howTo`.
- Confirmed all 44 ConnectPlay URLs occur in ParentLinks.
- Found 37 newer ParentLinks URLs.
- Confirmed `assets/app.js` passes syntax checking.
- Served the site locally and confirmed the page and 74-item JSON endpoint load.

This audit did not assert that every third-party social link remains viewable. Publication still requires the per-source availability check defined in `CONTENT_SYSTEM.md`.
