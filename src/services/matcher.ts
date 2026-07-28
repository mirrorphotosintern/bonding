// Deterministic local matching engine — TECHNICAL_SPEC.md section 9
// No LLM. Score activities against a Moment.

import { Activity, Moment, ConversationGame, Situation, DurationBucket } from "../types";
import { activities } from "../data/activities";
import { conversationGames } from "../data/conversation-games";

const durationBucketMap: Record<DurationBucket, [number, number]> = {
  "2-5": [2, 5],
  "5-10": [5, 10],
  "10-20": [10, 20],
  "20-45": [20, 45],
  "45+": [45, 120],
};

function durationOverlap(
  bucket: DurationBucket,
  actMin: number,
  actMax: number
): boolean {
  const [bucketMin, bucketMax] = durationBucketMap[bucket];
  return actMin <= bucketMax && actMax >= bucketMin;
}

export function matchActivities(moment: Moment): Activity[] {
  const published = activities.filter((a) => a.status === "published");

  const scored = published.map((activity) => {
    let score = 0;

    // Hard filters — must pass
    if (!activity.places.includes(moment.place)) return { activity, score: -1 };

    // Age fit — at least one band must match (soft, using childStates proxy)
    // For MVP: if no child ages specified, don't filter

    // Duration must overlap
    if (
      !durationOverlap(
        moment.durationBucket,
        activity.durationPlayMin,
        activity.durationPlayMax
      )
    )
      return { activity, score: -1 };

    // Adult energy compatibility
    const energyRank = { empty: 0, steady: 1, energetic: 2 };
    if (energyRank[activity.adultEnergy] > energyRank[moment.adultEnergy])
      return { activity, score: -1 };

    // Mess tolerance
    const messRank = { none: 0, contained: 1, fine: 2 };
    if (messRank[activity.mess] > messRank[moment.messTolerance])
      return { activity, score: -1 };

    // Noise tolerance
    const noiseRank = { quiet: 0, normal: 1, loud: 2 };
    if (noiseRank[activity.noise] > noiseRank[moment.noiseTolerance])
      return { activity, score: -1 };

    // Scoring
    // Prefer lower energy when adult is empty
    if (moment.adultEnergy === "empty" && activity.adultEnergy === "empty")
      score += 3;
    if (moment.adultEnergy === "steady" && activity.adultEnergy === "steady")
      score += 2;

    // Child state matching
    if (activity.childStates.includes(moment.childState)) score += 2;
    if (moment.childState === "frustrated" && activity.mess === "none")
      score += 1;
    if (moment.childState === "wiggly" && activity.mode === "move") score += 2;
    if (moment.childState === "curious" && activity.mode === "think") score += 2;

    // No materials preferred
    if (activity.materials.length === 0) score += 2;
    if (activity.householdBaselineEligible) score += 1;

    // Low prep preferred
    if (activity.durationPrepMinutes === 0) score += 2;
    else if (activity.durationPrepMinutes <= 2) score += 1;

    // Low risk preferred
    score += 3 - activity.riskLevel;

    // High repeatability
    if (activity.repeatability === "high") score += 1;

    // Place bonus
    if (activity.places.length === 1 && activity.places[0] === moment.place)
      score += 1;

    return { activity, score };
  });

  return scored
    .filter((s) => s.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.activity);
}

export function matchConversationGames(
  situation: Situation,
  ageBands?: string[]
): ConversationGame[] {
  const filtered = conversationGames.filter((g) =>
    g.fit.situations.includes(situation)
  );

  // Sort: prefer driver-safe, lower cognitive load, more age bands covered
  return filtered.sort((a, b) => {
    // Driver-safe first for car
    if (situation === "car") {
      if (a.fit.driverSafe && !b.fit.driverSafe) return -1;
      if (!a.fit.driverSafe && b.fit.driverSafe) return 1;
    }

    // Lower cognitive load first
    const loadRank = { low: 0, medium: 1, high: 2 };
    const loadDiff =
      loadRank[a.fit.cognitiveLoad] - loadRank[b.fit.cognitiveLoad];
    if (loadDiff !== 0) return loadDiff;

    // More age bands = more versatile
    return b.ageBands.length - a.ageBands.length;
  });
}

export function getTopMatch(moment: Moment): Activity | null {
  const matches = matchActivities(moment);
  return matches.length > 0 ? matches[0] : null;
}

export function getSwaps(moment: Moment, excludeId: string): Activity[] {
  const matches = matchActivities(moment);
  return matches.filter((a) => a.id !== excludeId).slice(0, 3);
}
