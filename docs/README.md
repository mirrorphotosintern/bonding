# Handful — Planning Documentation

**Internal codename:** Bonding  
**Naming review:** See [NAMING_AND_DOMAIN_SHORTLIST.md](NAMING_AND_DOMAIN_SHORTLIST.md). **Bonding** is the internal codename and **Handful** remains only a provisional working name. No consumer name has been selected.

**Product scope:** This is a standalone, globally oriented family product. It is not a Kannada-learning product, an Indian-family product, or a Shaale extension. Its presence in the Shaale omnirepo is an organizational detail, not a market-positioning decision.
**Product line:** One small thing. Fully together.

Handful is a parent-first mobile app that turns a few available minutes, ordinary household materials, and a caregiver's current energy into one concrete activity to do with a child. The phone helps the family start, then gets out of the way.

This folder is a planning package, not an implementation. It was created from:

- a review of [Hearty](https://hearty-app.com/) and its current App Store positioning;
- a July 2026 scan of the parent-child activity market;
- a source-by-source review of all 81 URLs in `ParentLinks.csv`;
- a full review of the 13-page `Family Conversation Games Report.pdf`;
- a code and data audit of the existing 74-card `connectplay` static prototype;
- Shaale's React Native / Expo architecture and its production lessons;
- primary or research-led material on responsive interaction, guided play, and phone interruption.

## Documents

1. [PRODUCT_SPEC.md](PRODUCT_SPEC.md) — the product, audience, flows, requirements, roadmap, business model, and success measures.
2. [TECHNICAL_SPEC.md](TECHNICAL_SPEC.md) — the proposed Expo architecture, data model, services, offline behavior, safety, analytics, and delivery plan.
3. [RESEARCH_SYNTHESIS.md](RESEARCH_SYNTHESIS.md) — Hearty teardown, market map, evidence, source themes, and the complete link-audit ledger.
4. [CONTENT_SYSTEM.md](CONTENT_SYSTEM.md) — activity schema, safety workflow, source-link fallback policy, source-backed hands-on catalog, and editorial rules.
5. [CONVERSATION_GAMES.md](CONVERSATION_GAMES.md) — situation-first oral-game mechanics, the 36-game candidate index, cultural localization rules, and the Talk Now product flow.
6. [PLAYABLE_GAME_CARDS.md](PLAYABLE_GAME_CARDS.md) — exact playable instructions, examples, endings, adaptations, safety, and provenance for all 36 conversation games.
7. [CONNECTPLAY_IMPLEMENTATION_AUDIT.md](CONNECTPLAY_IMPLEMENTATION_AUDIT.md) — what the existing prototype implements, verified data counts, conflicts, and the migration plan.
8. [COMPETITIVE_VISUAL_STRATEGY.md](COMPETITIVE_VISUAL_STRATEGY.md) — current visual competitor audit, the proposed field-kit aesthetic, signature Handoff Strip, quality bar, and watch protocol.
9. [DESIGN_CONTEXT.md](DESIGN_CONTEXT.md) — shared design context for later interface work.

## Decision snapshot

| Decision | Choice |
| --- | --- |
| Customer | Time-poor parents/caregivers of children ages 3–10 |
| Core job | “Give me one thing we can genuinely do together right now.” |
| Primary loop | Choose the moment → receive one match → phone down → play → record whether it fit |
| Differentiator | The app optimizes for leaving the app and completing a shared challenge, not consuming ideas |
| Initial platforms | iOS and Android, portrait-first; tablet supported |
| Stack | Expo SDK 54, React Native 0.81, React 19, TypeScript, Expo Router, Cloudflare Workers/D1/R2/Durable Objects/Queues, RevenueCat |
| Content | Human-authored and safety-reviewed; AI may rank or adapt approved content but may not invent unsupervised activities |
| Privacy | Adult account only; child profiles are pseudonymous; no child social graph, ads, location history, or biometric analysis |
| MVP | Talk Now with 36 zero-prop games plus 84 vetted hands-on activities, contextual matching, Together Mode, favorites, and lightweight family recap |
| North star | Meaningful Together Sessions per active family per week |

## Name status

**Handful** is the recommended working name because it communicates:

- a small, manageable amount;
- hands-on activity;
- the affectionate truth that children can be “a handful”;
- a product that offers a curated handful, not an endless feed.

It is not legally cleared. An unrelated gratitude app currently uses “Handful” in the App Store, so trademark, domain, social-handle, and store-name clearance must happen before implementation or public branding. If clearance fails, retain **One small thing. Fully together.** as the positioning line and run a dedicated naming process.
