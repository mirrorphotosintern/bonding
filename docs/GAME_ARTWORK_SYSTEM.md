# Original game artwork system

Try This Fun’s 98 original games use three generated 6×6 sprite sheets. Native
and web share the same row-major ID mapping in
`src/data/game-artwork-manifest.ts`.

## Art direction

The illustrations extend the product UI instead of introducing a second visual
language:

- ink: `#18223B`
- canvas: `#F2F1E8`
- paper: `#FFFDF7`
- cobalt: `#3157D5`
- sun: `#FFD452`
- coral: `#FF6B5E`
- mint: `#69D3A7`
- lavender: `#A88BE8`

Every tile uses flat editorial shapes, imperfect navy outlines, rounded forms,
minimal scenery, and one crop-safe action. People represent varied family
structures, ages, skin tones, and hair without tying the app to one culture.
Generated prose and decorative labels are avoided because the rule screen
already supplies the game’s name and instructions.

## Generation prompt

The three sheets were generated with ChatGPT Image using this common prompt,
followed by the ordered title and one-line rule for each group of games:

> Create one perfectly square 6 by 6 sprite sheet containing exactly 36 equal
> family-game tiles. Each tile must visually explain the assigned game’s central
> action at a glance. Preserve exact row-major order. Match the Try This Fun
> design system: flat editorial vector-like scenes, chunky warm-paper cards,
> slightly imperfect hand-inked deep navy outlines, rounded silhouettes, simple
> joyful faces, clever visual storytelling, and ample negative space. Use only
> #18223B, #F2F1E8, #FFFDF7, #3157D5, #FFD452, #FF6B5E, #69D3A7, and #A88BE8.
> Show hands, bodies, props, motion arcs, transformations, or simple before/after
> states that make the rule understandable without reading. Use globally
> relatable, diverse families without stereotypes. Keep backgrounds minimal.
> Use exactly six columns and six rows with equal cells and consistent cream
> gutters. Nothing may cross a gutter. No title strip or outer caption. No
> typography, labels, logos, coordinates, or watermark. Avoid photorealism, 3D,
> gradients, generic confetti, dense scenery, repeated compositions, and
> decorative-only poses.

For sheet three, cells 27–36 were explicitly requested as sparse abstract brand
shapes, not pretend games. The source sheets are retained as 1200×1200 WebP
files. Each product reveals one cell through sprite positioning, so only three
assets are downloaded or bundled.

## Files

- Native sheets: `assets/game-art/`
- Web sheets: `web/public/game-art/`
- Stable mapping: `src/data/game-artwork-manifest.ts`
- Native renderer: `src/components/idea-artwork.tsx`
- Web renderer: `web/components/play-deck.tsx`

When promoting a new game, generate a new coordinated sheet rather than
inserting it into these positions. Existing indices are permanent.
