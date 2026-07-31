export type SourceIdeaCategory =
  | "magic"
  | "craft"
  | "science"
  | "active-game"
  | "life-skill"
  | "drawing"
  | "connection-question"
  | "ritual"
  | "recite-sing";

export interface SourceIdea {
  id: string;
  title: string;
  howTo: string;
  category: SourceIdeaCategory;
  sourceUrl: string | null;
}

export interface SourceIdeaPlaybook {
  summary: string;
  steps: string[];
  remix: string;
}

// Qualified from the original ConnectPlay research bank. These cards preserve
// the source demonstration when the written research is not yet enough to
// reproduce a craft or trick reliably without it.
export const sourceIdeas: SourceIdea[] = [
  { id: "source_y-anakbebek", title: "The Secret Magic Trick", howTo: "Watch the short sleight reveal, learn it once, perform it for your child, then teach them the secret.", category: "magic", sourceUrl: "https://x.com/anakbebek12345/status/2041323866702922050?s=20" },
  { id: "source_y-langmanvince", title: "Silly Tricks Revealed", howTo: "Choose one easy no-prop illusion, practise it together, then take turns being the magician and audience.", category: "magic", sourceUrl: "https://x.com/LangmanVince/status/2034783897452478671?s=20" },
  { id: "source_y-indianagpa", title: "Your Signature Trick", howTo: "Choose one trick to perform the same way each time until it becomes your family's thing. Let the child invent the presentation line.", category: "magic", sourceUrl: "https://x.com/IndianaGPA/status/2029648579246129645?s=20" },
  { id: "source_y-5min-boomerang", title: "Paper Boomerang Disk", howTo: "Follow the folding demonstration to make a paper disk, then test different throwing angles and see which one returns best.", category: "craft", sourceUrl: "https://x.com/5min__crafts/status/2035198044720046114?s=20" },
  { id: "source_y-5min-bat", title: "Fold a Paper Bat", howTo: "Follow the paper-folding demonstration together. Pause after each fold and let the child press every crease.", category: "craft", sourceUrl: "https://x.com/5min__crafts/status/2034872159253012928?s=20" },
  { id: "source_y-5min-cross", title: "Cross Paper Boomerang", howTo: "Make the cross-shaped paper flier from the demonstration, then test it in a clear indoor space away from faces and breakables.", category: "craft", sourceUrl: "https://x.com/5min__crafts/status/2022556195941421291?s=20" },
  { id: "source_y-5min-jump", title: "Jumping Balloon Toy", howTo: "Build the simple balloon-powered toy shown in the demonstration. An adult handles small pieces and uninflated balloons.", category: "craft", sourceUrl: "https://x.com/5min__crafts/status/2030125338458738800?s=20" },
  { id: "source_y-doityourself", title: "Build-and-Repair Challenge", howTo: "Watch the short making technique together, gather the same safe materials, then let the child narrate each step while the adult handles tools.", category: "craft", sourceUrl: "https://x.com/_Do_ityourself/status/2035183367243932136?s=20" },
  { id: "source_y-coolpan", title: "Kitchen-Drawer Toy", howTo: "Use the demonstration to turn ordinary household items into a surprising toy. An adult chooses only clean, blunt, unbreakable materials.", category: "craft", sourceUrl: "https://x.com/coolpan967/status/2008330805035024890?s=20" },
  { id: "source_y-totalbodyiq", title: "Kitchen Science Surprise", howTo: "Choose one simple demonstration, predict what will happen, try it together, then ask what the child would change for a second test.", category: "science", sourceUrl: "https://x.com/TotalBodyIQ/status/2029890738277015803?s=20" },
  { id: "source_y-arteymas", title: "Look, Move, React", howTo: "Copy the coordination pattern in the demonstration slowly. Swap leader after three clean rounds and let the child invent a new pattern.", category: "active-game", sourceUrl: "https://x.com/Arteymas_/status/2028140420761272518?s=20" },
  { id: "source_y-tofikshop", title: "Tic-Tac-Toe Remix", howTo: "Try the demonstrated twist on tic-tac-toe, then change one rule together: the board, the pieces, or what counts as a line.", category: "active-game", sourceUrl: "https://x.com/Tofikshop/status/2027516369986851155?s=20" },
  { id: "source_y-cadioarena", title: "Listen and Land", howTo: "Copy the listening game from the demonstration. Begin slowly, repeat the signal once when needed, and swap who gives the cues.", category: "active-game", sourceUrl: "https://x.com/CadioArena/status/2008228411123347890?s=20" },
  { id: "source_y-goalloaded", title: "Indoor Movement Pick", howTo: "Watch the collection and let the child choose one movement game. Clear the floor, play for five minutes, then let them remix one rule.", category: "active-game", sourceUrl: "https://x.com/GoalLoaded/status/2008913572143759390?s=20" },
  { id: "source_y-thrivingkids", title: "Move-and-Solve Challenge", howTo: "Choose one movement puzzle from the demonstration. Work as one team and adjust the distance or speed until it feels achievable.", category: "active-game", sourceUrl: "https://x.com/thriving__kids/status/2007490721054691703?s=20" },
  { id: "source_y-itsme", title: "Collect Three Bottles", howTo: "Place three empty plastic bottles in a clear area. Race to collect them one at a time, then reset the course and let the child redesign it.", category: "active-game", sourceUrl: "https://x.com/itsme_urstruly/status/2008523685020553678?s=20" },
  { id: "source_y-perseverare", title: "Toddler Busy-Play Hack", howTo: "Watch the demonstration first, recreate it only with age-safe household materials, and stay close while the child explores it.", category: "active-game", sourceUrl: "https://x.com/perseverare1776/status/2005731434666103258?s=20" },
  { id: "source_y-iyashi", title: "The Jacket Flip", howTo: "Lay a jacket open on the floor with the hood or collar near the child's feet. Put arms into the sleeves and flip the jacket overhead.", category: "life-skill", sourceUrl: "https://x.com/iyashichannel_/status/2009780682135085446?s=20" },
  { id: "source_y-nofilter", title: "Choose a Real Family Job", howTo: "Offer two useful jobs that genuinely help, do your job alongside theirs, and thank them for the specific contribution without grading it.", category: "life-skill", sourceUrl: "https://x.com/NoFilterSkin/status/2025896015841165603?s=20" },
  { id: "source_y-mindful", title: "Sensory Drawing Pause", howTo: "Follow the demonstrated drawing setup with washable materials. Take turns adding marks and naming the texture or movement each mark suggests.", category: "drawing", sourceUrl: "https://x.com/MindfulL205/status/2033602735065403831?s=20" },
  { id: "source_y-kintsuzuike", title: "Cross-Body Copycat", howTo: "Copy the movement sequence slowly and without forcing range of motion. Swap sides, then let the child create a comfortable sequence.", category: "active-game", sourceUrl: "https://x.com/kintsuzuike/status/2033150959283814553?s=20" },
  { id: "source_y-ninnikinene", title: "Grandparent Movement Play", howTo: "Try the gentle grasp-and-connect movements from the demonstration while seated. The older adult and child each get a turn leading.", category: "active-game", sourceUrl: "https://x.com/ninnikinene/status/2009979078728921092?s=20" },
  { id: "source_y-minds", title: "One Real Question", howTo: "Choose one question from the source, answer it yourself too, and listen without correcting, teaching, or immediately solving the answer.", category: "connection-question", sourceUrl: "https://x.com/minds_eminent/status/2024774671896654222?s=20" },
  { id: "source_y-manifest", title: "What's On Your Mind?", howTo: "Choose one open question from the source. Ask whether the child wants listening or ideas before responding.", category: "connection-question", sourceUrl: "https://x.com/Manifest_Lord/status/2012883889723756934?s=20" },
  { id: "source_y-chidimma", title: "Alphabet Conversation", howTo: "Start a conversation with A. Each reply begins with the next letter. Help each other and skip difficult letters without ending the game.", category: "connection-question", sourceUrl: "https://x.com/The_Chidimma/status/2007443426279575762?s=20" },
  { id: "source_y-tomerlondon", title: "Make a Family Boredom Menu", howTo: "Together list one two-minute idea, one quiet idea, one energetic idea, and one good deed. Save only the ideas your family actually likes.", category: "connection-question", sourceUrl: "https://x.com/tomerlondon/status/2008392339308552605?s=20" },
  { id: "source_c-freeze-statue", title: "Freeze Statues", howTo: "Move while someone hums. When they stop and call freeze, hold a pose and give it a silly name. Swap callers.", category: "active-game", sourceUrl: null },
  { id: "source_c-pass-clap", title: "Pass the Clap", howTo: "Make eye contact and clap once toward the next person. They receive it and pass it back. Speed up only when the rhythm feels easy.", category: "active-game", sourceUrl: null },
  { id: "source_c-yes-and", title: "Yes, And… Story", howTo: "Build one story a sentence at a time. Every turn accepts what came before and adds something new with “Yes, and…”", category: "connection-question", sourceUrl: null },
  { id: "source_c-emotion-charades", title: "Emotion Charades", howTo: "Act a feeling without words. Everyone guesses, then the actor may share a harmless time they felt that way or simply choose the next actor.", category: "connection-question", sourceUrl: null },
  { id: "source_c-animal-walks", title: "Animal Walks", howTo: "Call an animal and move like it together: heavy elephant, bouncy bunny, sneaky cat. The child chooses the next animal.", category: "active-game", sourceUrl: null },
  { id: "source_c-blind-trust", title: "Slow Trust Walk", howTo: "In a clear familiar room, one person closes their eyes while the other gently guides one step at a time. Stop immediately if either person is unsure.", category: "active-game", sourceUrl: null },
  { id: "source_c-freeze-dance", title: "Shape Freeze Dance", howTo: "Dance or move while music plays. On pause, freeze in a big, tiny, wide, or wobbly shape. Take turns choosing the next shape.", category: "active-game", sourceUrl: null },
  { id: "source_c-scarf-play", title: "Scarf Swirl Copycat", howTo: "Float a light scarf and copy each other's slow swirls, waves, and loops. Use a tea towel if no scarf is handy.", category: "active-game", sourceUrl: null },
  { id: "source_c-pouring", title: "Pouring Partner", howTo: "Place two bowls on a towel. Take turns pouring a small amount of water between them while the other person narrates what they notice.", category: "life-skill", sourceUrl: null },
  { id: "source_c-finger-knitting", title: "Finger Knitting Together", howTo: "Loop thick yarn around fingers and pull each loop through. Work side by side and turn the finished strands into bracelets or decorations.", category: "craft", sourceUrl: null },
  { id: "source_c-circle-ritual", title: "Two-Minute Morning Circle", howTo: "Sit together, say good morning to each person by name, hum a short tune, and each choose one word for the day.", category: "ritual", sourceUrl: null },
  { id: "source_c-nature-table", title: "Three-Thing Wonder Walk", howTo: "Collect three safe fallen nature objects, arrange them together at home, and let each person say what they notice.", category: "ritual", sourceUrl: null },
  { id: "source_c-peekaboo", title: "Peek-a-Boo Remix", howTo: "Hide your face or a toy under a cloth and reveal it. Change the sound, speed, or hiding place and let the child lead.", category: "active-game", sourceUrl: null },
  { id: "source_c-simon-says", title: "Simon Says Together", howTo: "Give simple movement cues. If a cue comes without “Simon says,” laugh and reset together—nobody sits out.", category: "active-game", sourceUrl: null },
  { id: "source_c-hot-cold", title: "Hot and Cold", howTo: "Hide a familiar toy in one safe room. Guide the search with colder and warmer clues, then swap who hides it.", category: "active-game", sourceUrl: null },
  { id: "source_c-thumb-war", title: "Gentle Thumb War", howTo: "Hook fingers loosely, say the familiar count-in, and try to gently cover the other thumb. Stop if anyone dislikes the contact.", category: "active-game", sourceUrl: null },
  { id: "source_c-cats-cradle", title: "String Figure Lab", howTo: "Use one loop of thick string to make and transfer simple patterns. Name every shape, including the accidental ones.", category: "craft", sourceUrl: null },
  { id: "source_c-hand-clapping", title: "Clapping Pattern Remix", howTo: "Make a four-beat pattern with your own hands and optional partner claps. Copy it slowly, then let the child replace one beat.", category: "recite-sing", sourceUrl: null },
  { id: "source_c-call-response", title: "Call-and-Response Song", howTo: "Sing, hum, or clap one short phrase. The other person echoes it and changes one part for the next round.", category: "recite-sing", sourceUrl: null },
  { id: "source_c-body-percussion", title: "Body Beat Builder", howTo: "Start with clap-clap-tap-stomp. Copy it together, then take turns replacing one sound while keeping four beats.", category: "recite-sing", sourceUrl: null },
  { id: "source_c-lullaby", title: "Family Humming Turn", howTo: "Hum a familiar calming tune together. Let the child choose when it gets softer, slower, or becomes a new made-up melody.", category: "recite-sing", sourceUrl: null },
  { id: "source_c-roughhousing", title: "Catch My Hands", howTo: "One person slowly tries to tap the other's open hands; the other pulls away. Keep it gentle, predictable, and easy to stop.", category: "active-game", sourceUrl: null },
  { id: "source_c-knee-bounce", title: "Knee-Bounce Rhythm", howTo: "For a child who enjoys it and fits safely, bounce gently to a family rhyme and pause before the final beat for them to complete it.", category: "recite-sing", sourceUrl: null },
  { id: "source_c-pillow-fort", title: "Pillow-Fort Mission", howTo: "Build a low cushion cave in a clear floor space. Crawl through it, deliver a toy, then let the child redesign the entrance.", category: "active-game", sourceUrl: null },
  { id: "source_c-mutual-gaze", title: "I Never Noticed That!", howTo: "Look closely at each other for twenty seconds, then reveal one tiny thing you have somehow never noticed before.", category: "connection-question", sourceUrl: null },
  { id: "source_c-secret-handshake", title: "Invent a Secret Handshake", howTo: "Create a three-step greeting such as high-five, clap, thumbs-up. Practise it slowly, then use it whenever you reunite.", category: "ritual", sourceUrl: null },
  { id: "source_c-special-time", title: "Child-Leads Five", howTo: "Set aside five minutes where the child chooses the play and the adult follows, notices, and enjoys without directing or teaching.", category: "ritual", sourceUrl: null },
];

export function getSourceIdeaById(id: string): SourceIdea | undefined {
  return sourceIdeas.find((idea) => idea.id === id);
}

const summaries: Record<string, string> = {
  "source_y-anakbebek": "Learn a tiny sleight-of-hand secret, perform it, then turn your child into the magician.",
  "source_y-langmanvince": "A no-prop magic swap where each person performs and reveals one simple illusion.",
  "source_y-indianagpa": "Choose one repeatable trick and turn it into a recognizable family ritual.",
  "source_y-5min-boomerang": "Fold, throw, observe, and adjust a paper disk designed to curve back toward you.",
  "source_y-5min-bat": "A side-by-side paper-folding project that ends with a bat the child can decorate.",
  "source_y-5min-cross": "Build a four-armed paper flier and experiment with safe indoor launches.",
  "source_y-5min-jump": "Make a small balloon-powered toy, then test what changes its jump.",
  "source_y-doityourself": "Copy a short build technique together, with the child narrating and the adult handling tools.",
  "source_y-coolpan": "Turn an ordinary kitchen-drawer object into a toy using a demonstrated construction trick.",
  "source_y-totalbodyiq": "A predict-test-change science round built around one surprising household demonstration.",
  "source_y-arteymas": "A quick coordination challenge that links watching, moving, and reacting.",
  "source_y-tofikshop": "Play a visual twist on tic-tac-toe, then redesign one rule together.",
  "source_y-cadioarena": "A listening-and-response challenge where players copy cues and take turns leading.",
  "source_y-goalloaded": "Let the child choose one short indoor movement challenge from a collection.",
  "source_y-thrivingkids": "Solve a physical challenge together by changing distance, speed, or strategy.",
  "source_y-itsme": "A simple bottle-collection relay the child can rearrange into a new course.",
  "source_y-perseverare": "Recreate one supervised toddler exploration setup using age-safe household materials.",
  "source_y-iyashi": "Practise the floor-to-overhead jacket method until the child can do the sequence independently.",
  "source_y-nofilter": "Turn one real household contribution into a short side-by-side family job.",
  "source_y-mindful": "A washable sensory drawing round focused on marks, textures, and taking turns.",
  "source_y-kintsuzuike": "Copy a gentle cross-body movement pattern, swap sides, then invent a comfortable sequence.",
  "source_y-ninnikinene": "A seated intergenerational movement game where grandparent and child alternate leading.",
  "source_y-minds": "One genuine question, answered by both people, with listening instead of fixing.",
  "source_y-manifest": "A low-pressure conversation opener that begins by asking whether the child wants listening or ideas.",
  "source_y-chidimma": "A conversation game where each reply begins with the next letter of the alphabet.",
  "source_y-tomerlondon": "Build a small family menu of realistic things to do when boredom arrives.",
  "source_c-freeze-statue": "Move, freeze, and give every unexpected pose a ridiculous name.",
  "source_c-pass-clap": "Send one clap back and forth through eye contact, timing, and turn-taking.",
  "source_c-yes-and": "Build one shared story by accepting every contribution and adding the next event.",
  "source_c-emotion-charades": "Act a feeling without words, guess it, then decide whether to share a related moment.",
  "source_c-animal-walks": "Take turns choosing animals and moving through the room like them.",
  "source_c-blind-trust": "One person becomes the guide and talks the other through a tiny, familiar route.",
  "source_c-freeze-dance": "Dance until the music pauses, then freeze in the shape the caller names.",
  "source_c-scarf-play": "Mirror slow waves, loops, and swirls using a light scarf or tea towel.",
  "source_c-pouring": "A careful water-transfer activity where one person pours and the other notices.",
  "source_c-finger-knitting": "Make simple yarn chains side by side using only fingers.",
  "source_c-circle-ritual": "A two-minute family check-in using names, a tune, and one word for the day.",
  "source_c-nature-table": "Collect three fallen nature objects and arrange a tiny changing display.",
  "source_c-peekaboo": "A familiar hide-and-reveal game remixed through sound, speed, and role reversal.",
  "source_c-simon-says": "Follow only the movement cues that begin with “Simon says,” with funny resets instead of elimination.",
  "source_c-hot-cold": "Hide one familiar object and guide the search using warmer and colder clues.",
  "source_c-thumb-war": "A brief, gentle hand game with a clear count-in and easy stop rule.",
  "source_c-cats-cradle": "Make, transfer, and name string patterns—including the accidental ones.",
  "source_c-hand-clapping": "Copy a four-beat clapping pattern, then replace one beat at a time.",
  "source_c-call-response": "Echo a short sung, hummed, or clapped phrase and change one part.",
  "source_c-body-percussion": "Build a four-beat rhythm from claps, taps, snaps, and stomps.",
  "source_c-lullaby": "Share control of a familiar tune by choosing when it softens, slows, or changes.",
  "source_c-roughhousing": "A predictable hand-tapping chase that stays gentle and stops the moment either person wants.",
  "source_c-knee-bounce": "A gentle lap-rhythm game with a pause that lets the child complete the final beat.",
  "source_c-pillow-fort": "Build a low cushion tunnel, complete a toy-delivery mission, then redesign it.",
  "source_c-mutual-gaze": "Become face detectives and spot one funny, lovely, or surprising detail you have never noticed before.",
  "source_c-secret-handshake": "Invent and practise a three-part greeting that belongs to your family.",
  "source_c-special-time": "Five minutes of child-led play where the adult follows without teaching or redirecting.",
};

const categoryRemix: Record<SourceIdeaCategory, string> = {
  magic: "Let the child invent the magician name, opening line, and reveal.",
  craft: "Change one safe material, size, or decoration and compare the result.",
  science: "Change one variable, predict the result, and run one more test.",
  "active-game": "Let the child change the distance, speed, movement, or winning condition.",
  "life-skill": "Swap roles: the child teaches the sequence back to the adult or a toy.",
  drawing: "Change hands, tools, scale, or texture for a second round.",
  "connection-question": "Swap who asks first, or let the child replace the prompt entirely.",
  ritual: "Let the child choose one gesture, phrase, or object that stays part of the ritual.",
  "recite-sing": "Change the tempo, volume, or final beat and copy the child's version.",
};

function openingStep(idea: SourceIdea): string {
  if (idea.sourceUrl) {
    return "Open the original demonstration and watch it once from beginning to end before gathering anything.";
  }
  if (idea.category === "active-game") {
    return "Clear a little space, choose the first leader, and begin with the easiest version of the movement.";
  }
  if (idea.category === "connection-question") {
    return "Answer the first prompt yourself, then hand the question over. If it feels flat, make up a better one together.";
  }
  if (idea.category === "ritual" || idea.category === "recite-sing") {
    return "Sit or stand comfortably together and let the child choose who leads the first round.";
  }
  return "Gather the simple materials mentioned below and do the first attempt side by side.";
}

function closingStep(category: SourceIdeaCategory): string {
  if (category === "connection-question") {
    return "Take one turn each, listen without correcting, and end with thanks rather than a lesson.";
  }
  if (category === "active-game") {
    return "Swap who leads, try one child-created change, and stop while it is still fun.";
  }
  if (category === "craft" || category === "science" || category === "drawing") {
    return "Compare what happened with the prediction, then let the child choose one change for a second attempt.";
  }
  if (category === "life-skill") {
    return "Swap roles so the child can teach the sequence back, then use the result for its real purpose.";
  }
  return "Swap leader for one final round and let the child's version become the new rule.";
}

const stepOverrides: Partial<Record<string, string[]>> = {
  "source_c-mutual-gaze": [
    "Face each other and say, “Okay, detective—find one thing about me you never noticed before.”",
    "Take twenty seconds to investigate. Squinting, eyebrow raising, and extremely serious detective faces are encouraged.",
    "Reveal your discoveries: “You have a tiny mole on your shoulder,” “one eyebrow curls up,” “that freckle looks like a comma,” or “your hair is making an antenna.”",
    "Do one silly round: find something that makes the other person look like an animal, superhero, pirate, or long-lost relative.",
  ],
  "source_c-blind-trust": [
    "Clear a short path in a familiar room and agree on a stop word.",
    "One person may close their eyes or simply look down while holding the guide's hand.",
    "The guide narrates one slow step at a time. Stop immediately if either person feels unsure.",
    "Swap only if both people actively want another round.",
  ],
  "source_c-special-time": [
    "Set a visible five-minute timer and say, “You choose the play; I'll follow.”",
    "Join what the child chooses. Describe what you notice without asking teaching questions or improving the game.",
    "Follow their rules unless something is unsafe. Give a simple boundary and offer a nearby alternative when needed.",
    "When time ends, thank them for letting you join and name one thing you enjoyed.",
  ],
};

export function getSourceIdeaPlaybook(idea: SourceIdea): SourceIdeaPlaybook {
  return {
    summary:
      summaries[idea.id] ??
      `A short ${idea.category.replaceAll("-", " ")} idea to try together.`,
    steps: stepOverrides[idea.id] ?? [
      openingStep(idea),
      idea.howTo,
      closingStep(idea.category),
    ],
    remix:
      idea.id === "source_c-mutual-gaze"
        ? "Try it from memory: turn around, describe one detail, then spin back and see how close you were."
        : categoryRemix[idea.category],
  };
}
