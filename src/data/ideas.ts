import { activities, getActivityById } from "./activities";
import { conversationGames, getGameById } from "./conversation-games";
import {
  sourceIdeas,
  getSourceIdeaById,
  getSourceIdeaPlaybook,
  type SourceIdea,
} from "./source-ideas";
import type {
  Activity,
  ActivityMode,
  AgeBand,
  ConversationGame,
  Place,
} from "../types";

export interface IdeaSummary {
  id: string;
  title: string;
  promise: string;
  mode: ActivityMode;
  ageBands: AgeBand[];
  durationMin: number;
  durationMax: number;
  playerMin: number;
  playerMax: number;
  materialCount: number;
  mess: "none" | "contained" | "fine";
  places: Place[];
  kind: "activity" | "conversation" | "source";
  activity: Activity | null;
  conversationGame: ConversationGame | null;
  sourceIdea: SourceIdea | null;
}

function conversationPlaces(game: ConversationGame): Place[] {
  const places = new Set<Place>();

  for (const situation of game.fit.situations) {
    if (situation === "car") places.add("travel");
    if (situation === "queue" || situation === "restaurant") {
      places.add("waiting");
    }
    if (situation === "bedtime") places.add("bedtime");
    if (situation === "dinner") places.add("home");
  }

  return [...places];
}

export function activityToIdea(activity: Activity): IdeaSummary {
  return {
    id: activity.id,
    title: activity.title,
    promise: activity.oneLinePromise,
    mode: activity.mode,
    ageBands: activity.ageBands,
    durationMin: activity.durationPlayMin,
    durationMax: activity.durationPlayMax,
    playerMin: activity.participantChildMin + activity.participantAdultMin,
    playerMax: activity.participantChildMax + activity.participantAdultMin,
    materialCount: activity.materials.length,
    mess: activity.mess,
    places: activity.places,
    kind: "activity",
    activity,
    conversationGame: null,
    sourceIdea: null,
  };
}

export function conversationToIdea(game: ConversationGame): IdeaSummary {
  return {
    id: game.id,
    title: game.title,
    promise: game.oneBreathRule,
    mode: "talk",
    ageBands: game.ageBands,
    durationMin: game.durationMinutes[0],
    durationMax: game.durationMinutes[1],
    playerMin: 2,
    playerMax: 8,
    materialCount: 0,
    mess: "none",
    places: conversationPlaces(game),
    kind: "conversation",
    activity: null,
    conversationGame: game,
    sourceIdea: null,
  };
}

export function sourceToIdea(source: SourceIdea): IdeaSummary {
  const playbook = getSourceIdeaPlaybook(source);
  const isQuiet =
    source.category === "connection-question" ||
    source.category === "ritual" ||
    source.category === "recite-sing";
  const mode: ActivityMode =
    source.category === "craft" || source.category === "drawing"
      ? "make"
      : source.category === "active-game"
        ? "move"
        : source.category === "life-skill"
          ? "help"
          : source.category === "magic"
            ? "perform"
            : source.category === "science"
              ? "think"
              : "talk";

  return {
    id: source.id,
    title: source.title,
    promise: playbook.summary,
    mode,
    ageBands: ["3-4", "5-6", "7-8", "9-10"],
    durationMin: 5,
    durationMax: 15,
    playerMin: 2,
    playerMax: 8,
    // Be conservative when the source record does not contain a normalized
    // materials list: never promise "nothing needed" unless the format is
    // inherently spoken or sung.
    materialCount:
      source.category === "connection-question" ||
      source.category === "recite-sing"
        ? 0
        : 1,
    mess:
      source.category === "craft" ||
      source.category === "science" ||
      source.category === "drawing"
        ? "contained"
        : "none",
    places: isQuiet
      ? ["home", "waiting", "travel", "bedtime"]
      : ["home"],
    kind: "source",
    activity: null,
    conversationGame: null,
    sourceIdea: source,
  };
}

export const ideas: IdeaSummary[] = [
  ...activities
    .filter((activity) => activity.status === "published")
    .map(activityToIdea),
  ...conversationGames.map(conversationToIdea),
  ...sourceIdeas.map(sourceToIdea),
];

export function getIdeaById(id: string): IdeaSummary | undefined {
  const activity = getActivityById(id);
  if (activity) return activityToIdea(activity);

  const game = getGameById(id);
  if (game) return conversationToIdea(game);

  const source = getSourceIdeaById(id);
  if (source) return sourceToIdea(source);

  return undefined;
}
