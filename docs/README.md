# Try This — Planning Documentation

**Internal codename:** Bonding  
**Brand decision:** **Try This** is the consumer name and **trythis.fun** is the public domain. **Bonding** remains the internal repository codename. See [NAMING_AND_DOMAIN_SHORTLIST.md](NAMING_AND_DOMAIN_SHORTLIST.md) for the decision history.

**Product scope:** This is a standalone, globally oriented family product. It is not a Kannada-learning product, an Indian-family product, or a Shaale extension. Its presence in the Shaale omnirepo is an organizational detail, not a market-positioning decision.
**Product line:** One small thing. Fully together.

Try This is a parent-first mobile app that turns a few available minutes, ordinary household materials, and a caregiver's current energy into one concrete activity to do with a child. The phone helps the family start, then gets out of the way.

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
5. [CONVERSATION_GAMES.md](CONVERSATION_GAMES.md) — situation-first oral-game mechanics, the 36-game candidate index, cultural localization rules, and unified-catalog behavior.
6. [PLAYABLE_GAME_CARDS.md](PLAYABLE_GAME_CARDS.md) — exact playable instructions, examples, endings, adaptations, safety, and provenance for all 36 conversation games.
7. [CONNECTPLAY_IMPLEMENTATION_AUDIT.md](CONNECTPLAY_IMPLEMENTATION_AUDIT.md) — what the existing prototype implements, verified data counts, conflicts, and the migration plan.
8. [COMPETITIVE_VISUAL_STRATEGY.md](COMPETITIVE_VISUAL_STRATEGY.md) — current visual competitor audit, the proposed field-kit aesthetic, signature Handoff Strip, quality bar, and watch protocol.
9. [DESIGN_CONTEXT.md](DESIGN_CONTEXT.md) — shared design context for later interface work.

## Decision snapshot

| Decision | Choice |
| --- | --- |
| Customer | Time-poor parents/caregivers of children ages 3–10 |
| Core job | “Give me one thing we can genuinely do together right now.” |
| Primary loop | Choose the moment → receive one match → open one complete playable page → begin naturally |
| Differentiator | The app optimizes for leaving the app and completing a shared challenge, not consuming ideas |
| Initial platforms | iOS and Android, portrait-first; tablet supported |
| Stack | Expo SDK 54, React Native 0.81, React 19, TypeScript, Expo Router, Cloudflare Workers/D1/R2/Durable Objects/Queues, RevenueCat |
| Content | Human-authored and safety-reviewed; AI may rank or adapt approved content but may not invent unsupervised activities |
| Privacy | Adult account only; child profiles are pseudonymous; no child social graph, ads, location history, or biometric analysis |
| MVP | One catalog with 36 zero-prop games plus 84 vetted hands-on activities, contextual matching, the playable idea page, favorites, and lightweight family recap |
| North star | Meaningful Together Sessions per active family per week |

## Name status

**Try This** works as both a name and the product's central instruction: the app
offers one concrete idea, the family tries it, and the phone gets out of the
way. Use **trythis.fun** in public-facing web and support copy.

The approved name and domain still require normal trademark and store-name due
diligence before public release.
