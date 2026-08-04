"""50 brand-new ideas (source="new") brainstormed for Try This.

Spans all six modes plus a dedicated distance/video-call play cluster
(these are marked videoCall=true). Age bands use the app's 3-4/5-6/7-8/9-10.
Each idea carries its own prose `description` (no existing doc text to inherit).
"""

def i(id, title, mode, ages, vc, situations, description, oneLiner=None, duration=(3, 10), materials="none", tags=()):
    return {
        "id": id, "title": title, "source": "new", "sourceFile": None,
        "mode": mode, "oneLiner": oneLiner or description,
        "description": description,
        "ages": sorted(set(a for a in ages if a in ["3-4", "5-6", "7-8", "9-10"])),
        "videoCall": vc,
        "situations": sorted(set(s for s in situations if s in ["home", "outside", "travel", "waiting", "bedtime", "car", "restaurant", "virtual"])),
        "duration": [duration[0], duration[1]], "materials": materials,
        "tags": list(tags), "links": [], "photos": [], "videos": [],
    }

NEW = []

# ---------------- New conversation / talk games ----------------
NEW += [
    i("new_emotion_charades", "Emotion Charades", "talk", ["3-4","5-6","7-8","9-10"], True, ["home","car","waiting","virtual"],
      "Act out a feeling using only your face and body. Everyone guesses which emotion it is; if easy, add a tiny story that goes with the feeling.",
      "Act out an emotion with only face and body; everyone guesses which one.", (3,10), "none", ["perform","imitate","emotion"]),
    i("new_yes_and_story", "Yes-And Story", "talk", ["5-6","7-8","9-10"], True, ["home","car","virtual"],
      "Build one story where every turn begins 'Yes, and…'. You must accept the last idea and add something new, so the story grows without blocking.",
      "Improvisation where every turn starts 'Yes, and…' to keep the story growing.", (5,10), "none", ["improv","story","alternate"]),
    i("new_word_at_a_time", "Word-at-a-Time Story", "talk", ["5-6","7-8","9-10"], True, ["car","waiting","virtual"],
      "Tell a story adding exactly one word per player per turn. The first to say a period ends the sentence; keep going to build a whole silly scene.",
      "Build a story adding exactly one word per player per turn.", (3,10), "none", ["story","alternate","language"]),
    i("new_sound_detective", "Sound Detective", "talk", ["3-4","5-6","7-8"], True, ["home","waiting","car","virtual"],
      "One player makes a sound with their voice, hands, or a safe object. Everyone guesses what made it; the guesser leads the next round.",
      "One player makes a sound; others name what they think it is.", (3,10), "none", ["listen","deduce","sound"]),
    i("new_guess_hummed_song", "Guess the Hummed Song", "talk", ["4-6","5-6","7-8","9-10"], True, ["car","home","virtual"],
      "Hum a well-known song without words and see who can name it first. Keep to tunes the family already knows; no singing, just the tune.",
      "Hum a well-known tune and see who can name it first.", (3,10), "none", ["music","rhythm","deduce"]),
    i("new_story_builder", "Story Builder Dice", "talk", ["5-6","7-8","9-10"], True, ["car","bedtime","restaurant","virtual"],
      "Pick a character, place, problem, and tool from a shared make-believe menu (or count fingers as dice), then weave them into a story together.",
      "Roll an imaginary menu of character, place, problem, and tool, then weave a story.", (5,15), "none", ["story","improv","sequence"]),
    i("new_family_rules_draft", "Draft One Family Rule", "talk", ["5-6","7-8","9-10"], True, ["dinner","home","car"],
      "Together write one playful new family rule, such as 'Friday is backwards-shirt day', then vote on whether to accept it.",
      "Together write one playful new family rule, then vote on it.", (5,10), "none", ["plan","talk","connection"]),
    i("new_emoji_story", "Emoji Story", "talk", ["5-6","7-8","9-10"], True, ["car","waiting","home","virtual"],
      "Line up a short string of emojis (on screen or on paper), then tell the story the sequence suggests; the next player reorders them for a fresh tale.",
      "Line up a short emoji sequence; a partner tells the story it suggests.", (3,10), "none", ["story","language","imagine"]),
    i("new_three_clues", "Three Clues to Guess", "talk", ["4-6","5-6","7-8"], True, ["car","restaurant","waiting","virtual"],
      "Describe a person, place, or object with exactly three clues, then stop. Everyone guesses; the finder chooses the next mystery.",
      "Describe a person or object with exactly three clues before the reveal.", (3,10), "none", ["observe","deduce","reveal"]),
    i("new_family_interview_show", "Family Interview Show", "talk", ["4-6","5-6","7-8","9-10"], True, ["home","virtual"],
      "The child hosts a talk show and interviews a family member with curious questions. Swap host between rounds and add applause.",
      "The child hosts a talk show and interviews a family member with great questions.", (5,15), "none", ["talk","perform","connection"]),
    i("new_guess_my_favorite", "Guess My Favorite", "talk", ["4-6","5-6","7-8"], True, ["car","waiting","virtual"],
      "Think of a favorite thing this week. Others ask yes/no questions to find it; the one who guesses picks the next favorite.",
      "Use yes/no questions to guess someone's favorite thing this week.", (3,10), "none", ["deduce","reveal"]),
    i("new_name_acrostic", "Name Acrostic Poem", "talk", ["6-8","7-8","9-10"], True, ["home","waiting","virtual"],
      "Take a name and write one line starting with each letter, describing that person or a made-up adventure. Read the poem aloud together.",
      "Build a poem where each line starts with a letter of a name.", (5,10), "none", ["language","poetry","wordplay"]),
    i("new_backwards_day", "Backwards Day Questions", "talk", ["3-4","5-6","7-8"], True, ["home","car","virtual"],
      "Answer everyday questions back-to-front for one minute, such as saying 'I eat breakfast before bed'. It is a silly rule, not an error.",
      "Answer everyday questions back-to-front or in playful reverse for a minute.", (3,10), "none", ["inhibit","improv","language"]),
]

# ---------------- New distance / video-call games ----------------
NEW += [
    i("new_virtual_scavenger", "Virtual Scavenger Hunt", "move", ["4-6","5-6","7-8","9-10"], True, ["home","virtual"],
      "On a video call, a list of items is read aloud; each home searches its own rooms to find them. First to hold one up wins that round, cooperatively.",
      "Across the call, race (gently) to find each item on a shared list in your own home.", (5,15), "household", ["observe","movement","cooperate"]),
    i("new_show_tell_mystery", "Show-and-Tell Mystery Box", "talk", ["3-4","5-6","7-8","9-10"], True, ["home","virtual"],
      "Hide an object, describe it without naming it (color, feel, use), then reveal it to the camera. Others guess before the reveal.",
      "Hide an object, describe it without naming it, then reveal it to the camera.", (3,10), "household", ["observe","deduce","reveal"]),
    i("new_guess_my_drawing", "Guess My Drawing", "make", ["3-4","5-6","7-8","9-10"], True, ["home","virtual"],
      "Draw something and hold it up to the camera while everyone guesses. Swap drawers each round and let the youngest go first.",
      "Draw something and hold it to the camera while everyone guesses.", (3,10), "household", ["draw","deduce","imagine"]),
    i("new_mirror_yoga", "Long-Distance Mirror Yoga", "move", ["4-6","5-6","7-8","9-10"], True, ["home","virtual"],
      "A far family member leads a simple stretch or pose on camera; everyone mirrors and breathes together. Swap leader and keep poses gentle.",
      "A far player leads a simple stretch or pose; everyone mirrors them.", (3,10), "none", ["imitate","movement","relax"]),
    i("new_recipe_together", "Recipe Together", "help", ["5-6","7-8","9-10"], True, ["home","virtual"],
      "Both households make the same simple, no-cook snack at the same time, counting out ingredients together on the call and comparing results.",
      "Far family makes the same simple snack at the same time, step by step.", (10,20), "household", ["help","measure","cooperate"]),
    i("new_read_together", "Read a Book Together", "talk", ["4-6","5-6","7-8","9-10"], True, ["home","bedtime","virtual"],
      "Take turns reading pages of a picture book aloud across the call, with the far reader holding the book to the camera or both having a copy.",
      "Take turns reading pages of a book aloud across the video call.", (5,15), "household", ["talk","listening","story"]),
    i("new_finger_puppet_show", "Finger Puppet Show", "perform", ["3-4","5-6","7-8"], True, ["home","virtual"],
      "Make quick finger puppets from paper or markers, then stage a tiny show for a far grandparent who is the audience on camera.",
      "Make quick finger puppets and stage a tiny show for a far grandparent.", (5,15), "household", ["perform","craft","story"]),
    i("new_virtual_playdate_qa", "Virtual Playdate Q&A", "talk", ["4-6","5-6","7-8","9-10"], True, ["home","virtual"],
      "Use a short list of friendship questions (favorite game, best day this week) to keep cousins or friends connected across a call.",
      "A structured set of fun friendship questions to keep cousins connected.", (5,15), "none", ["talk","connection","reveal"]),
    i("new_photo_story_share", "Long-Distance Photo Story", "talk", ["5-6","7-8","9-10"], True, ["home","virtual"],
      "Each player chooses one family photo and holds it up, telling the story behind it to the others on the call.",
      "Each player shares one family photo and tells its story to the others.", (5,15), "household", ["story","memory","connection"]),
    i("new_virtual_freeze_dance", "Virtual Freeze Dance", "move", ["4-6","5-6","7-8","9-10"], True, ["home","virtual"],
      "Play a shared song; everyone dances in their own home and freezes when the music pauses. No one sits out—a wobble just means a silly freeze.",
      "Dance to a shared song, then freeze the moment the music pauses.", (3,10), "none", ["movement","music","inhibit"]),
    i("new_guess_my_room", "Guess My Room", "talk", ["4-6","5-6","7-8"], True, ["home","virtual"],
      "Slowly pan the camera around a room and let others guess where this place is and what is in it, then point out surprises.",
      "Slowly pan the camera around a room and guess where this place is.", (3,10), "none", ["observe","deduce"]),
    i("new_together_blocks", "Together Blocks Build", "think", ["3-4","5-6","7-8"], True, ["home","virtual"],
      "Both players build the same simple block shape at the same time, checking in on camera, then compare the final builds.",
      "Both players build the same simple block shape and compare at the end.", (5,15), "household", ["build","sequence","cooperate"]),
]

# ---------------- New Make / craft ----------------
NEW += [
    i("new_cloud_dough", "Cloud Dough Sensory", "make", ["3-4","5-6","7-8"], False, ["home"],
      "Mix flour and a little oil into a soft, moldable dough. Adult mixes it and enforces no-tasting; the child forms, presses, and stamps shapes.",
      "Mix flour and oil into a soft moldable dough; adult-led, no tasting.", (10,20), "household", ["craft","sensory","build"]),
    i("new_calm_bottle", "Calm-Down Glitter Bottle", "make", ["4-6","5-6","7-8","9-10"], False, ["home","bedtime"],
      "Fill a clear bottle with water, glue, and glitter, then seal it. Shake it and watch the glitter settle slowly as a quieting pause.",
      "Make a sealed glitter-and-water bottle to shake and watch settle.", (10,20), "household", ["craft","sensory","relax"]),
    i("new_pasta_necklace", "Pasta Necklace Threading", "make", ["3-4","5-6","7-8"], False, ["home","waiting"],
      "Thread large pasta tubes onto a string to make a necklace, sorting by color as you go. Adult supervises small pieces for the youngest.",
      "Thread big pasta pieces onto a string for a handmade necklace.", (5,15), "household", ["craft","coordination","fine-motor"]),
    i("new_leaf_rubbings", "Leaf & Texture Rubbings", "make", ["4-6","5-6","7-8","9-10"], False, ["outside","home"],
      "Place a leaf under paper and rub a crayon's side over it to reveal the veins; try coins and bark too. Safe, found materials only.",
      "Place leaves under paper and rub crayon over them to reveal the veins.", (5,15), "household", ["craft","notice","nature"]),
    i("new_paper_plate_clock", "Paper Plate Clock", "think", ["5-6","7-8"], False, ["home"],
      "Turn a paper plate into a clock with movable hands, then practise setting and reading times together.",
      "Turn a paper plate into a movable clock and practice telling time.", (10,20), "household", ["craft","math","teach-back"]),
    i("new_handprint_art", "Handprint Family Art", "make", ["3-4","5-6","7-8","9-10"], False, ["home"],
      "Paint each person's hand (washable paint) and stamp prints into a family tree or garden scene, labelling who is who.",
      "Paint handprints into a family tree or garden scene.", (10,20), "household", ["craft","identity","family"]),
    i("new_cardboard_fort", "Cardboard Box Fort", "make", ["3-4","5-6","7-8","9-10"], False, ["home","outside"],
      "Build a fort or rocket from cardboard boxes and tape, then decorate it and play inside. Adult helps with cutting.",
      "Build a fort or rocket from cardboard boxes and tape.", (10,25), "household", ["build","craft","imagine"]),
]

# ---------------- New Move / physical ----------------
NEW += [
    i("new_soft_target_toss", "Soft-Object Target Toss", "move", ["4-6","5-6","7-8","9-10"], False, ["home","outside"],
      "Toss soft objects (beanbags or rolled socks) into a target and add the scores together as a family. Only soft, safe items below shoulder height.",
      "Toss soft objects into a target and add scores together.", (5,15), "household", ["target","coordination","cooperate"]),
    i("new_animal_freeze_dance", "Animal Freeze Dance", "move", ["3-4","5-6","7-8"], True, ["home","outside","virtual"],
      "Dance as a chosen animal, then freeze in that animal's pose when the music stops. The child picks the next animal each round.",
      "Dance as an animal, then freeze in that animal's pose when the music stops.", (3,10), "none", ["movement","music","imitate"]),
    i("new_body_letter_shapes", "Body-Letter Shapes", "move", ["3-4","5-6","7-8"], True, ["home","outside","waiting","virtual"],
      "Curve your whole body into letters or numbers and let everyone guess; a partner can join to make two-letter words.",
      "Shape your whole body into letters or numbers and guess them.", (3,10), "none", ["movement","imagine","coordination"]),
    i("new_simon_says_remix", "Simon-Says Remix", "move", ["3-4","5-6","7-8"], True, ["home","waiting","virtual"],
      "Play Simon Says as a team. If someone follows a cue without 'Simon says', everyone laughs and resets together—nobody sits out.",
      "Cooperative Simon Says where a slip just earns a silly reset, never exit.", (3,10), "none", ["inhibit","movement","listen"]),
    i("new_hallway_balance", "Hallway Balance Beam", "move", ["4-6","5-6","7-8","9-10"], False, ["home"],
      "Tape a straight line on the floor and walk it like a balance beam, forward and backward, arms out; try one hand holding a soft item.",
      "Walk a taped or imagined line like a balance beam, both directions.", (3,10), "none", ["balance","movement","coordination"]),
]

# ---------------- New Think ----------------
NEW += [
    i("new_house_sortathon", "Around-the-House Sort-a-thon", "think", ["3-4","5-6","7-8","9-10"], False, ["home"],
      "Gather a mixed pile of safe household objects and sort them by size, color, and use, agreeing on a category before each pass.",
      "Sort a mixed pile of household objects by size, color, and use.", (5,15), "household", ["sort","category","logic"]),
    i("new_guess_the_count", "Guess the Count", "think", ["5-6","7-8","9-10"], False, ["home","waiting"],
      "Look at a jar or handful of objects and estimate how many there are, then count together to check who came closest.",
      "Estimate how many objects are in a jar or handful, then count to check.", (3,10), "household", ["math","predict","estimate"]),
    i("new_paper_fold_fractions", "Paper-Fold Fractions", "think", ["6-8","7-8","9-10"], False, ["home"],
      "Fold a sheet of paper into halves, then fourths, then eighths, cutting notches to see how the pieces relate in size.",
      "Fold paper into halves and quarters to see fractions with your hands.", (5,10), "household", ["math","sequence","pattern"]),
    i("new_build_a_bridge", "Build a Bridge Challenge", "think", ["6-8","7-8","9-10"], False, ["home"],
      "Build a paper or cardboard bridge between two books that holds the most small objects, then change one design to improve it.",
      "Build a paper bridge that holds the most small objects, then improve it.", (10,20), "household", ["build","physics","remix"]),
    i("new_pattern_memory", "Pattern Memory", "think", ["4-6","5-6","7-8"], False, ["home","waiting"],
      "Watch a short sequence of colors or gestures, then copy it from memory; add one step each round and help each other out.",
      "Watch a short sequence of colors or gestures and copy it from memory.", (3,10), "household", ["memory","sequence","pattern"]),
]

# ---------------- New Help ----------------
NEW += [
    i("new_make_bed_mission", "Make-Bed Mission", "help", ["3-4","5-6","7-8","9-10"], False, ["home"],
      "Turn making the bed into a cooperative mission: each person pulls one corner or smooths one side, then admires the finish together.",
      "Turn making the bed into a cooperative tidy-up mission.", (3,10), "household", ["help","sequence","independence"]),
    i("new_grocery_put_away", "Grocery Sort & Put-Away", "help", ["3-4","5-6","7-8"], False, ["home"],
      "Sort the groceries into categories (cold, pantry, fruit) as you put them away, counting each group as it goes in.",
      "Sort the groceries into categories as you put them away.", (5,15), "household", ["help","sort","category"]),
    i("new_plant_pet_helper", "Plant & Pet Helper", "help", ["3-4","5-6","7-8"], False, ["home","outside"],
      "Take on one caring job for the week, such as watering a plant or giving a pet fresh water, with the adult checking first.",
      "Take on a caring job: water a plant or give a pet fresh water.", (3,10), "household", ["help","care","independence"]),
    i("new_thank_you_card", "Thank-You Card Maker", "help", ["4-6","5-6","7-8","9-10"], False, ["home"],
      "Make and decorate a thank-you card for someone who helped the family, then hand it over in person or by mail.",
      "Make and decorate a thank-you card for someone who helped you.", (5,15), "household", ["help","craft","connection"]),
    i("new_snack_server", "Snack Station Server", "help", ["4-6","5-6","7-8"], False, ["home"],
      "Be the snack server: hand each family member their snack politely and ask if they need anything else, like a real helper.",
      "Be the snack server and hand each family member their snack politely.", (3,10), "household", ["help","talk","independence"]),
]

# ---------------- New Perform + closing extras ----------------
NEW += [
    i("new_one_person_band", "One-Person Band Soundscape", "perform", ["5-6","7-8","9-10"], True, ["home","car","virtual"],
      "Build a short scene using only voice and body sounds—wind, footsteps, a door—like a one-person sound-effects band.",
      "Build a scene only with voice and body sounds, like a one-person band.", (5,10), "none", ["perform","sound","improv"]),
    i("new_grandparent_then_now", "Grandparent 'Then & Now'", "talk", ["5-6","7-8","9-10"], True, ["home","virtual"],
      "Ask a grandparent how one everyday thing—school, phones, sweets—was different when they were young, then compare with today.",
      "Ask a grandparent how one everyday thing was different when they were young.", (5,15), "none", ["story","intergenerational","connection"]),
    i("new_ice_melt_race", "Ice Melt Race", "think", ["5-6","7-8","9-10"], False, ["home"],
      "Put two or three ice cubes on different surfaces and predict which will melt first, then test the family's predictions and discuss why.",
      "Predict which ice cube melts first, then test the family's predictions.", (5,15), "household", ["predict","experiment","science"]),
]
