import type { Activity, ConversationGame, Moment, DurationBucket, Energy, Place, AgeBand } from "../types";
import { activities } from "../data/activities";
import { conversationGames } from "../data/conversation-games";
import { activityToIdea, conversationToIdea, type IdeaSummary } from "../data/ideas";

// Deterministic local scoring matcher (TECHNICAL_SPEC §9)
// No LLM — pure constraint satisfaction + scoring

const durationBucketMinutes: Record<DurationBucket, [number, number]> = {
  "2-5": [2, 5],
  "5-10": [5, 10],
  "10-20": [10, 20],
  "20-45": [20, 45],
  "45+": [45, 120],
};

const energyScore: Record<Energy, Record<Energy, number>> = {
  // activityEnergy: { adultEnergy: score }
  empty: { empty: 10, steady: 5, energetic: 0 },
  steady: { empty: 3, steady: 10, energetic: 7 },
  energetic: { empty: 0, steady: 5, energetic: 10 },
};

function ageBandMatches(moment: Moment, activityBands: string[]): boolean {
  // If no child profiles specified, assume match
  if (moment.childProfileIds.length === 0) return true;
  // For now, we don't have per-profile age data in Moment; use a broad match
  return activityBands.length > 0;
}

function placeMatches(momentPlace: Place, activityPlaces: Place[]): boolean {
  return activityPlaces.includes(momentPlace);
}

function durationMatches(moment: Moment, actMin: number, actMax: number): number {
  const [bucketMin, bucketMax] = durationBucketMinutes[moment.durationBucket];
  // Full overlap = best score
  if (actMin >= bucketMin && actMax <= bucketMax) return 10;
  // Partial overlap
  if (actMax >= bucketMin && actMin <= bucketMax) return 5;
  return 0;
}

function messMatches(tolerance: string, activityMess: string): number {
  if (tolerance === "fine") return 10;
  if (tolerance === "contained") {
    return activityMess === "none" || activityMess === "contained" ? 10 : 2;
  }
  // none
  return activityMess === "none" ? 10 : 0;
}

function noiseMatches(tolerance: string, activityNoise: string): number {
  if (tolerance === "loud") return 10;
  if (tolerance === "normal") {
    return activityNoise === "quiet" || activityNoise === "normal" ? 10 : 2;
  }
  // quiet
  return activityNoise === "quiet" ? 10 : 0;
}

export interface ScoredActivity {
  activity: Activity;
  score: number;
  reasons: string[];
}

export function matchActivities(moment: Moment): ScoredActivity[] {
  const scored: ScoredActivity[] = [];

  for (const activity of activities) {
    if (activity.status !== "published") continue;

    // Hard constraints
    if (!ageBandMatches(moment, activity.ageBands)) continue;
    if (!placeMatches(moment.place, activity.places)) continue;

    // Soft scoring
    let score = 0;
    const reasons: string[] = [];

    // Duration fit
    const dScore = durationMatches(moment, activity.durationPlayMin, activity.durationPlayMax);
    score += dScore;
    if (dScore >= 10) reasons.push("fits your time");

    // Energy match
    const eScore = energyScore[activity.adultEnergy]?.[moment.adultEnergy] ?? 5;
    score += eScore;
    if (eScore >= 10) reasons.push("matches your energy");

    // Mess tolerance
    const mScore = messMatches(moment.messTolerance, activity.mess);
    score += mScore;
    if (mScore >= 10 && activity.mess === "none") reasons.push("no mess");

    // Noise tolerance
    const nScore = noiseMatches(moment.noiseTolerance, activity.noise);
    score += nScore;

    // Child state match
    if (moment.childState !== "unspecified" && activity.childStates.includes(moment.childState)) {
      score += 5;
      reasons.push(`good for ${moment.childState} kids`);
    }

    // No materials bonus
    if (activity.materials.length === 0) {
      score += 3;
      reasons.push("no materials needed");
    }

    // Household baseline bonus
    if (activity.householdBaselineEligible) {
      score += 2;
    }

    // Low prep bonus
    if (activity.durationPrepMinutes === 0) {
      score += 2;
    }

    if (score > 0) {
      scored.push({ activity, score, reasons });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  return scored;
}

export interface ScoredIdea {
  idea: IdeaSummary;
  score: number;
  reasons: string[];
}

function conversationSituationsForPlace(place: Place): string[] {
  switch (place) {
    case "travel":
      return ["car"];
    case "waiting":
      return ["queue", "restaurant"];
    case "bedtime":
      return ["bedtime"];
    case "home":
      return ["dinner", "bedtime"];
    default:
      return [];
  }
}

/**
 * One matcher for every idea. Conversation is an implementation detail, not a
 * separate choice the parent has to make.
 */
export function matchIdeas(
  moment: Moment,
  ageBands: AgeBand[] = [],
): ScoredIdea[] {
  const results: ScoredIdea[] = matchActivities(moment).map((match) => ({
    idea: activityToIdea(match.activity),
    score: match.score,
    reasons: match.reasons,
  }));

  const situations = conversationSituationsForPlace(moment.place);
  if (situations.length > 0) {
    for (const game of conversationGames) {
      const situationMatch = game.fit.situations.some((situation) =>
        situations.includes(situation)
      );
      if (!situationMatch) continue;

      const hasAgeMatch =
        ageBands.length === 0 ||
        ageBands.some((band) => game.ageBands.includes(band));
      if (!hasAgeMatch) continue;

      let score = 28;
      const reasons = ["right for this moment", "no materials needed"];

      const dScore = durationMatches(
        moment,
        game.durationMinutes[0],
        game.durationMinutes[1],
      );
      score += dScore;
      if (dScore >= 10) reasons.unshift("fits your time");

      if (game.fit.volume === "quiet") {
        score += 6;
        if (moment.noiseTolerance === "quiet") reasons.push("keeps things quiet");
      }
      if (game.fit.cognitiveLoad === "low") score += 4;
      if (moment.place === "travel" && game.fit.driverSafe) score += 8;

      results.push({
        idea: conversationToIdea(game),
        score,
        reasons,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// Conversation game matching
export interface ScoredGame {
  game: ConversationGame;
  score: number;
}

export function matchConversationGames(
  situation: string,
  ageBands: string[],
): ScoredGame[] {
  const scored: ScoredGame[] = [];

  for (const game of conversationGames) {
    let score = 0;

    // Situation match is primary
    if (game.fit.situations.includes(situation as any)) {
      score += 20;
    } else {
      continue; // hard filter
    }

    // Age band overlap
    const hasAgeMatch = ageBands.some((ab) => game.ageBands.includes(ab as any));
    if (hasAgeMatch) {
      score += 10;
    } else if (ageBands.length > 0) {
      score -= 5; // slight penalty for no age match but still show
    }

    // Low cognitive load bonus for quick starts
    if (game.fit.cognitiveLoad === "low") {
      score += 5;
    }

    // Driver safe bonus for car
    if (situation === "car" && game.fit.driverSafe) {
      score += 8;
    }

    // Quiet bonus for restaurant/bedtime
    if ((situation === "restaurant" || situation === "bedtime") && game.fit.volume === "quiet") {
      score += 5;
    }

    scored.push({ game, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
