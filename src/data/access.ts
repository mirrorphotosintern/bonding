// A deliberately varied free sample: families can complete real activities
// before deciding whether the full library is worth buying.
const STARTER_IDEA_IDS = new Set([
  "act_shadow_doubles",
  "act_sock_knockdown",
  "act_mirror_hands",
  "act_adjective_faces",
  "talk_i_spy",
  "talk_twenty_questions",
  "talk_fortunately",
  "talk_would_you_rather",
  "talk_sound_chain",
  "source_c-freeze-statue",
  "source_c-animal-walks",
  "source_c-hot-cold",
  "source_c-secret-handshake",
  "new_sound_detective",
  "new_make_bed_mission",
]);

export function isStarterIdea(id: string): boolean {
  return STARTER_IDEA_IDS.has(id);
}
