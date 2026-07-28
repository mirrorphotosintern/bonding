# Handful — Content System

Handful's long-term product quality depends more on its activity system than on the number of activities. A viral clip is not an activity specification. It usually omits setup, age fit, failure modes, accessibility, cleanup, supervision, and licensing.

This document turns inspiration into publishable, safe, reusable content.

## 1. Content promise

Every activity must answer, at a glance:

- Can we do this here?
- Can we do this in the time we have?
- Do we already have what it needs?
- Can this adult manage it at their current energy level?
- Does every participant have a role?
- What could go wrong?
- How do we start?
- When are we done?
- How can the child change it?

## 2. Activity modes

### Make

The family creates a tangible thing.

Examples:

- origami snake;
- paper boomerang;
- flower bouquet frame;
- shadow tracing;
- tissue bunny;
- balloon-string toy, with latex warnings.

### Move

The activity uses whole-body play, rhythm, balance, targeting, or coordination.

Examples:

- learn a family dance;
- colored-limb reaction game;
- soft target toss;
- bottle collection relay;
- mirror movement;
- home movement circuit.

### Think

The family solves, observes, predicts, experiments, remembers, or debugs.

Examples:

- reverse the forks in one move;
- mirror-dot drawing;
- sound-sequence memory;
- modified tic-tac-toe;
- household science;
- sort → sequence → remix → teach.

### Talk

Conversation itself is the play mechanic.

Examples:

- alphabet conversation;
- sentence charades;
- “what do you wish grown-ups understood?”;
- strengths list;
- family story prompts;
- describe-and-draw.

The conversation-games report materially strengthens this mode. Talk should be the MVP's fastest activation path, with a dedicated lightweight schema and situation-first selection. See `CONVERSATION_GAMES.md`.

### Help

The child participates in meaningful family life and gains practical competence.

Examples:

- fold and sort laundry;
- order for the family at a restaurant;
- wrap a gift;
- put on a jacket independently;
- make a simple bouquet;
- prepare a table or snack.

### Perform

The family learns, rehearses, presents, or judges a playful performance.

Examples:

- no-prep hand magic;
- one-minute juggling path;
- adjective face-off, judged by family;
- silly charades;
- teach-back show;
- family talent minute.

## 3. Design mechanics

An activity is stronger when it uses one or more reusable mechanics:

- **Imitate:** Copy a movement, shape, rhythm, or sound.
- **Take turns:** Alternate roles with a visible handoff.
- **Predict:** Say what will happen before trying.
- **Transform:** Turn an ordinary object into something else.
- **Constrain:** Add a playful limit: one hand, one color, no words.
- **Sequence:** Remember or build an ordered pattern.
- **Teach back:** The child explains the method to the adult or a toy.
- **Remix:** Change one rule and observe the effect.
- **Cooperate:** Win together against time or a shared constraint.
- **Perform:** Prepare a tiny reveal for another person.
- **Contribute:** Complete real family work with ownership.
- **Notice:** Search the environment for color, sound, shadow, shape, or texture.

The content library should diversify mechanics, not merely titles.

## 4. Activity schema

Every published activity is a versioned record.

```yaml
id: string
slug: string
schemaVersion: 1
status: draft | review | published | retired

editorial:
  title: string
  oneLinePromise: string
  mode: make | move | think | talk | help | perform
  mechanics: [string]
  theIdea: string
  provenance:
    inspirationUrls: [url]
    author: string
    originalInstructions: boolean
    mediaLicenseId: string | null
    sourceDemo:
      url: url | null
      platform: x | reddit | youtube | website | null
      availability: verified | login-required | removed | unavailable | unknown
      checkedAt: datetime | null
      creatorHandle: string | null
      userVisibleCredit: string | null
      allowedAsInstructionFallback: boolean
  reviewers:
    editorial: [reviewerId]
    safety: [reviewerId]
  claims:
    practices: [skillId]
    prohibitedOutcomeClaimCheck: true

fit:
  ageBands: ["3-4", "5-6", "7-8", "9-10"]
  duration:
    prepMinutes: number
    playMin: number
    playMax: number
  adultEnergy: empty | steady | energetic
  childStates: [calm | wiggly | frustrated | curious | unspecified]
  places: [home | outside | travel | waiting | bedtime]
  participants:
    childMin: number
    childMax: number
    adultMin: number
  mess: none | contained | fine
  noise: quiet | normal | loud
  repeatability: low | medium | high

materials:
  required:
    - materialId: string
      quantity: string
      substitutionIds: [string]
  optional: []
  householdBaselineEligible: boolean
  cleanupMinutes: number

safety:
  riskLevel: 0 | 1 | 2 | 3
  supervision: nearby | active | adult-led
  hazards: [small-parts | latex | scissors | heat | food | water | impact | fall | string | allergy]
  warning: string | null
  saferVariant: string | null
  rejectionChecksPassed: [string]

accessibility:
  motorDemand: low | medium | high
  visualDemand: low | medium | high
  auditoryDemand: low | medium | high
  readingDemand: none | low | medium
  sensoryIntensity: low | medium | high
  positions: [seated | standing | moving]
  adaptations:
    limitedMobility: string | null
    lowVision: string | null
    hardOfHearing: string | null
    fineMotor: string | null
    sensorySensitive: string | null
    mixedAges: string | null

experience:
  prepChecklist: [string]
  introLine: string
  childRole: string
  adultRole: string
  steps:
    - text: string
      cueSeconds: number | null
      mediaId: string | null
  ifItFlops: string
  remixPrompts: [string]
  endingPrompt: string
  closePrompts: [string]
  togetherMode:
    type: one-card | glance | audio | turns
    wakeLock: boolean
    audioCueIds: [string]
```

## 5. Editorial voice

### Sound like

- a resourceful friend who has actually tried it;
- brief and concrete;
- relaxed about imperfect outcomes;
- interested in what the child changes;
- honest about mess and effort.

### Avoid

- “boost,” “supercharge,” “genius,” or “brain hack”;
- “Mom hack” as the default frame;
- moralizing about screens;
- “good kids,” “bad behavior,” or obedience as the goal;
- guaranteed developmental outcomes;
- gendered assumptions;
- excessive exclamation points;
- guilt: “Make memories before it’s too late.”

### Copy pattern

**Title:** object or action, not outcome hype  
**Promise:** what the family will actually do  
**Intro:** one inviting sentence  
**Steps:** verbs first, one action per line  
**Exit:** normalize stopping or changing it

Example:

> **Shadow Doubles**  
> Trace the stretched shadows of toys, hands, or leaves, then invent what they become.  
> Put one object where the sun makes a clear shadow. One person holds it still; the other traces. Swap before adding details.

## 6. Safety workflow

### Level 0

Editorial review.

### Level 1

Editorial review plus automated hazard checks.

### Level 2

Independent second reviewer. Physical playtest with the youngest supported age. Specific warning and safer variant required.

### Level 3

Adult-led only. Subject-matter review where relevant. Strong justification for inclusion. Default recommendation should prefer a lower-risk alternative.

### Automatic rejection

- throwing footwear or hard objects at people;
- string/cord setups around a toddler's body or neck;
- open flame;
- unsupervised water;
- ingesting non-food materials;
- breath-holding;
- sharp-tool use by unsupported ages;
- public embarrassment or punishment;
- shame-based “consequences”;
- appearance or intelligence scoring;
- copied copyrighted video/instructions without permission;
- claims that an activity treats or diagnoses a condition.

## 7. Handling source inspiration

For each social source:

1. identify the underlying mechanic, not the exact execution;
2. note hazards and missing context;
3. create an original activity with original wording;
4. use original diagrams, licensed media, or no media;
5. test with the supported age;
6. record the inspiration URL internally;
7. never imply endorsement by the source creator.

### Source-first alpha behavior

For the private alpha, a hands-on activity may ship before Handful has produced its own diagram or demonstration **only when the original source visibly demonstrates enough of the activity to reproduce it**.

The activity detail screen then shows:

> **Watch the original demonstration ↗**  
> Opens X, Reddit, YouTube, or the source website. The source may require an account or may become unavailable.

Product rules:

- The source URL is a secondary action, never an autoplaying embed.
- Show platform and creator handle when known.
- Do not download, proxy, crop, transcribe, or rehost a creator's video without permission.
- Handful must still supply its own title, material list, safety warning, and a one-line explanation of what the family will attempt.
- Mark `allowedAsInstructionFallback: false` when a post is removed, blank, ambiguous, unsafe as shown, or merely a parenting opinion.
- Check link availability during publication and periodically afterward.
- If a source disappears, keep the activity only when Handful's own reviewed instructions are sufficient; otherwise unpublish it.
- Never send children directly to a social feed. Opening an external source requires an adult gate and leaves Together Mode.
- A disclaimer cannot make an unsafe activity acceptable. Adapt or reject the activity before linking it.

This is an alpha shortcut, not the long-term content strategy. Original tested instructions should replace source dependency for the strongest activities.

### Source-backed hands-on starter set

These candidate activities already have a recoverable original link in `ParentLinks.csv`. Link status reflects the research pass and must be rechecked before publication.

| Handful activity | Original demonstration/source | Current use |
| --- | --- | --- |
| Family Bus Stop Dance | [X source](https://x.com/kumoriRaver/status/2058050360548237450?s=20) | Demonstration fallback |
| Rubber-Band Reveal | [X source](https://x.com/QueenAnticommie/status/2058294143122579664?s=20) | Adult-led; elastic safety warning |
| Secret Gift Wrap | [X source](https://x.com/mondaystufx/status/2056937661726904694?s=20) | Inspiration/demonstration |
| Sock Knockdown | [Original slipper/bottle source](https://x.com/omoelerinjare1/status/2056023404512489628?s=20) | Link with a note that socks and paper cups replace the unsafe framing |
| Hands-Faster-Than-Eyes Trick | [X source](https://x.com/jaamilaresti/status/2055901935979676066?s=20) | Demonstration fallback after reproducibility check |
| Order for the Table | [X source](https://x.com/EstieMaddie/status/2055261185621074128?s=20) | Context source; Handful supplies role-play instructions |
| Color Photo Hunt | [X source](https://x.com/vlucasrocha/status/2051344525969240364?s=20) | Demonstration fallback; camera optional |
| Color Limb Callout | [X source](https://x.com/naw_AlRamah/status/2045924599003496825?s=20) | Demonstration fallback with mobility/color alternatives |
| Shadow Doubles | [X source](https://x.com/Sarahhuniverse/status/2046102716712456320?s=20) | Demonstration fallback |
| Reverse the Forks | [X source](https://x.com/Dorthi226/status/2044659460602540393?s=20) | Puzzle reveal; do not show the solution before an attempt |
| One-Minute Juggle Path | [X source](https://x.com/DP0STS/status/2041050181853155767?s=20) | Demonstration fallback; remove mastery promise |
| Mirror Dot Drawing | [X source](https://x.com/GodswillChemist/status/2039056684136468803?s=20) | Demonstration fallback with one-hand option |
| Found-Flower Frame/Bouquet | [X source](https://x.com/TheFigen_/status/2038339356486766982?s=20) | Fallen/permit-safe plants only |
| Paper Claw Costume | [X source](https://x.com/5min__crafts/status/2037060502850068781?s=20) | Demonstration fallback after bluntness test |
| Penetrating Palm / Growing Thumb | [X source](https://x.com/madaomoshiroi/status/2037250736338461108?s=20) | Demonstration fallback |
| Tissue Twist Bunny | [X source](https://x.com/5min__crafts/status/2037115780194853071?s=20) | Demonstration fallback |
| Wiggly Paper Snake | [X source](https://x.com/5min__crafts/status/2037180470862242142?s=20) | Demonstration fallback |
| Synchronous Finger Wave | [X source](https://x.com/cooltechtipz/status/2036656886293184911?s=20) | Demonstration fallback |
| Returning Paper Disk | [X source](https://x.com/5min__crafts/status/2035198044720046114?s=20) | Must pass repeatability and safe-throw testing |
| Bat Fold | [X source](https://x.com/5min__crafts/status/2034872159253012928?s=20) | Demonstration fallback |
| Simple Magic Tricks | [X source](https://x.com/LangmanVince/status/2034783897452478671?s=20) | Index each reproducible trick separately |
| Blow-to-Move Paper Creature | [X source](https://x.com/EstieMaddie/status/2034582546940318123?s=20) | Individual straw only; age/sanitation review |
| Jumping Balloon Toy | [X source](https://x.com/5min__crafts/status/2030125338458738800?s=20) | Adult-led; latex, fragments, and string warnings |
| Grandpa's Signature Trick | [X source](https://x.com/IndianaGPA/status/2029648579246129645?s=20) | Intergenerational demonstration format |
| Modified Tic-Tac-Toe | [X source](https://x.com/Tofikshop/status/2027516369986851155?s=20) | Clarify rules independently before using as instructions |
| Laundry Match Team | [X source](https://x.com/Bro_Code_x/status/2024898399489638749?s=20) | Context/demonstration; no perfection framing |
| Cross Boomerang | [X source](https://x.com/5min__crafts/status/2022556195941421291?s=20) | Must pass flight and safe-space tests |
| Jacket Flip | [X source](https://x.com/iyashichannel_/status/2009780682135085446?s=20) | Demonstration fallback; comfort/mobility alternative |
| Three-Bottle Relay | [X source](https://x.com/itsme_urstruly/status/2008523685020553678?s=20) | Use clean, empty, unbreakable bottles |
| Sound Sequence | [X source](https://x.com/CadioArena/status/2008228411123347890?s=20) | Demonstration fallback with visual/tactile version |
| Alphabet Conversation | [X source](https://x.com/The_Chidimma/status/2007443426279575762?s=20) | Source-backed Talk activity |

The complete 81-link audit—including removed, blank, unsafe, opinion-only, and non-activity sources—remains in `RESEARCH_SYNTHESIS.md`. Those excluded links must not silently become activity instructions.

Example:

```text
Source: slipper hits bottle
Do not copy: footwear throw, discipline framing
Mechanic: familiar object + distant target + surprising family skill
Handful version: Sock Knockdown
Materials: two rolled socks, three empty paper cups
Safety: clear floor, throw below shoulder height, never aim at people
Cooperative rule: family gets six throws to knock down all cups
Child agency: child chooses cup formation and throwing line
```

## 8. Seed catalog

Seed selection begins with the existing ConnectPlay corpus rather than invented titles alone. Its 74 cards comprise 44 founder saves and 30 researched additions, but 17 are philosophy/reference cards and several others are too vague to play. Every record must pass the classification and conversion workflow in `CONNECTPLAY_IMPLEMENTATION_AUDIT.md`; presence in ConnectPlay is provenance, not publication approval.

The first 120 activities should be balanced rather than filled in source order.

| Mode | MVP count | Low-energy | 5–10 min | Multi-age | No materials |
| --- | ---: | ---: | ---: | ---: | ---: |
| Make | 17 | 5 | 8 | 9 | 1 |
| Move | 17 | 3 | 11 | 12 | 7 |
| Think | 17 | 7 | 11 | 10 | 5 |
| Talk | 36 | 30 | 34 | 30 | 36 |
| Help | 16 | 7 | 9 | 10 | 3 |
| Perform | 17 | 6 | 11 | 11 | 8 |

Coverage requirements:

- at least 30 “running on empty” activities;
- at least 40 activities that fit 5–10 minutes;
- at least 30 travel/waiting activities;
- at least 30 seated or limited-mobility variants;
- at least 24 mixed-age variants;
- no more than 15% requiring purchased special materials;
- no more than 10% at Risk Level 3.

## 9. Candidate starter activities

These are concepts to author and test, not ready-to-publish instructions.

### Make

1. Shadow Doubles
2. Wiggly Paper Snake
3. Tissue Twist Animal
4. Paper Claw Costume
5. Returning Paper Disk
6. Cross Boomerang
7. Jumping Balloon Toy
8. Found-Flower Frame
9. Secret Gift Wrap
10. Blow-to-Move Paper Creature
11. Color Collage Walk
12. One-Sheet Bunny
13. Bat Fold
14. Family Flag
15. Cardboard Marble Path
16. Sock Puppet Interview
17. Fold-and-Fly Lab
18. Paper Chain Machine
19. Nature Crown
20. Toy Shadow City

### Move

1. Family Bus Stop Dance
2. Color Limb Callout
3. Sock Knockdown
4. Three-Bottle Relay
5. Mirror Hands
6. Two-Hand Dot Trail
7. Listen-and-Land
8. Home Obstacle Remix
9. One-Minute Juggle Path
10. Slow-Motion Leader
11. Rhythm Copycat
12. Floor-Is-a-Pattern
13. Cup Transfer Race
14. Back-to-Back Stand
15. Animal Movement Chain
16. Freeze-and-Explain
17. Hallway Target Curling
18. Grandparent Move-and-Teach
19. Seated Balloon Keep-Up
20. Family Movement Dice

### Think

1. Reverse the Forks
2. Sound Sequence
3. Mirror Dot Drawing
4. Modified Tic-Tac-Toe
5. Which Rule Changed?
6. Household Sorting Machine
7. Human Algorithm
8. Debug My Instructions
9. Pattern Under Cups
10. Mystery Object by Sound
11. Color Photo Hunt
12. Predict the Paper Flight
13. Floating Pepper Lab
14. Sink-or-Float Kitchen Set
15. One-Move Puzzle
16. Memory Tray
17. Build, Remix, Teach
18. Opposite-Hand Drawing
19. Shape Detective
20. Secret Rule Game

### Talk

1. Alphabet Conversation
2. Sentence Charades
3. Seven Real Questions
4. Things I’m Good At
5. Boredom Menu
6. Good-Deed Draft
7. Adjective Faces
8. Describe-and-Draw
9. Two Truths and a Silly
10. Finish My Story
11. Restaurant Reporter
12. Toy Press Conference
13. Family “Would You Rather?”
14. What Should Grown-Ups Know?
15. Rose, Thorn, Seed
16. Memory by Color
17. Change One Ending
18. Compliment Detective
19. One-Minute Family News
20. The Question Jar Without a Jar

The launch set should replace or supplement this shortlist with the 36 candidates in `CONVERSATION_GAMES.md`, including I Spy, Veo Veo, Twenty Questions, Fortunately/Unfortunately, Pass-a-Story, I'm Going on a Picnic, Shiritori, Jielong, Antakshari, Bait Bazi, Chidiya Udd, This Is Not a Spoon, and Finger Dance Party.

Conversation-game rules:

- Explain the game in one spoken breath.
- Default to cooperative recovery instead of elimination.
- Add Easier, Harder, Mixed ages, and Child's rule variants.
- Allow a player to pass on personal questions.
- Preserve traditional names and language-specific mechanics.
- Do not distribute copyrighted song lyrics.
- Never ask a driver to read or interact while a vehicle is moving.
- Ask consent for touch games and provide an air-drawing alternative.

### Help

1. Laundry Match Team
2. Fold-and-Teach
3. Order for the Table
4. Jacket Flip
5. Gift-Wrap Partner
6. Flower Finder Bouquet
7. Set-the-Table Pattern
8. Snack Assembly Line
9. Grocery Color Hunt
10. Toy Repair Inspector
11. Sock Sorting Speed Round
12. Water the Right Amount
13. Pack the Outing Bag
14. Wipe-and-Notice
15. Pick Tomorrow’s Clothes
16. Thank-You Delivery
17. Family Lost-and-Found
18. Measure the Recipe
19. Quiet Cleanup Mission
20. Teach a Household Skill

### Perform

1. Penetrating Palm
2. Growing Thumb Illusion
3. Missing Finger Trick
4. Rubber-Band Escape
5. Adjective Face-Off
6. One-Minute Family Talent
7. Teach Back to a Toy
8. No-Words Restaurant
9. Synchronous Finger Wave
10. Mini Magic Show
11. Sound-Effect Story
12. Dance from Another Decade
13. Reverse Roles
14. Three-Prop Charades
15. Family News Broadcast
16. Slowest Race Announcer
17. Mystery Voice
18. Copy My Hands
19. Trick Explanation Challenge
20. Grandparent's Signature Skill

## 10. Skill paths

Handful should not become a curriculum, but related activities can build visible competence.

### Example: Family magician

1. Learn one no-prep hand illusion.
2. Practice the reveal.
3. Explain how misdirection works.
4. Invent a presentation line.
5. Perform for another caregiver.
6. Teach the trick to a younger child.

### Example: Helpful host

1. Set the table.
2. Make a simple menu.
3. Practice greeting.
4. Order for the family.
5. Ask a server one respectful question.
6. Thank the people who helped.

### Example: Build and debug

1. Sort objects.
2. Create a sequence.
3. Give the adult instructions.
4. Find the bug.
5. Remix one rule.
6. Teach it to a toy or sibling.

Paths should celebrate capability, not compare the child to age norms.

## 11. Multi-age design

Every multi-age variant should assign differentiated roles.

Example:

| Activity | Younger child | Older child | Adult |
| --- | --- | --- | --- |
| Shadow Doubles | Chooses and holds object | Traces and adds details | Manages sun/position and takes a turn |
| Sound Sequence | Makes one sound | Builds and remembers sequence | Keeps pace and invites remix |
| Gift Wrap | Places tape/stickers | Measures, folds, and cuts | Handles sharp tools and supports |
| Magic Show | Audience and judge | Learns performer role | Practices with child and models mistakes |

Avoid “older child helps younger child” as the only pattern; it can turn the older child into an assistant parent.

## 12. Accessibility adaptations

Adapt the mechanic, not merely the wording.

Examples:

- Replace a running relay with a seated reach-and-sort race.
- Replace color-only matching with shape or texture.
- Replace audio-only sequences with taps, lights, or cards.
- Replace fine paper folds with larger fabric or cardstock folds.
- Replace verbal charades with gesture, drawing, or object choice.
- Allow turn timers to be removed.
- Allow cooperative play instead of winner/loser structures.

## 13. Content metrics

Track by activity and version:

- recommendation impressions;
- acceptance;
- swap reason;
- starts;
- completions;
- fit;
- repeat;
- time mismatch;
- material mismatch;
- age mismatch;
- safety report;
- accessibility report;
- retirement reason.

Do not interpret low completion as proof the child lacks a skill. First investigate unclear instructions, hidden prep, bad time estimates, crashes, and inaccessible mechanics.

## 14. Retirement and incident response

Retire an activity version immediately when:

- a safety concern is credible;
- licensed media expires;
- instructions are materially misleading;
- a legal complaint is received;
- outcome data shows a repeated unexpected hazard;
- editorial standards change.

The app syncs a kill list separately from the normal catalog. A retired downloaded activity is hidden on the next launch, even before a full content sync. If the risk is severe, send a targeted notice to families who recently used or downloaded it without revealing child information.
