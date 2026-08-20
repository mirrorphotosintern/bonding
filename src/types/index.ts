// Core domain types from TECHNICAL_SPEC.md section 5

export type AgeBand = "1-2" | "3-4" | "5-6" | "7-8" | "9-10";
export type ActivityMode = "make" | "move" | "think" | "talk" | "help" | "perform";
export type Energy = "empty" | "steady" | "energetic";
export type ChildState = "calm" | "wiggly" | "frustrated" | "curious" | "unspecified";
export type Place = "home" | "outside" | "travel" | "waiting" | "bedtime";
export type Mess = "none" | "contained" | "fine";
export type Noise = "quiet" | "normal" | "loud";
export type RiskLevel = 0 | 1 | 2 | 3;
export type Fit = "yes" | "almost" | "no";
export type Supervision = "nearby" | "active" | "adult-led";

export type DurationBucket = "2-5" | "5-10" | "10-20" | "20-45" | "45+";

export interface Moment {
  childProfileIds: string[];
  adultCount: number;
  durationBucket: DurationBucket;
  adultEnergy: Energy;
  childState: ChildState;
  place: Place;
  messTolerance: Mess;
  noiseTolerance: Noise;
  availableMaterialIds?: string[];
}

// Conversation game types
export type OralMechanic =
  | "observe"
  | "deduce"
  | "chain"
  | "accumulate"
  | "transform"
  | "alternate"
  | "inhibit"
  | "reveal"
  | "rhythm"
  | "quiet-movement";

export type Situation = "car" | "restaurant" | "queue" | "bedtime" | "dinner";

export interface ConversationGameFit {
  situations: Situation[];
  volume: "silent" | "quiet" | "normal";
  interruptibility: "immediate" | "end-of-turn" | "end-of-round";
  cognitiveLoad: "low" | "medium" | "high";
  driverSafe: boolean;
  languageCodes: string[];
}

export interface ConversationGame {
  id: string;
  title: string;
  traditionalNames: string[];
  originNotes: string;
  mechanic: OralMechanic;
  fit: ConversationGameFit;
  ageBands: AgeBand[];
  durationMinutes: [number, number];
  oneBreathRule: string;
  firstPrompt: string;
  adultModel: string;
  cooperativeDefault: boolean;
  passAllowed: boolean;
  easier: string;
  harder: string;
  mixedAges: string;
  childRemix: string;
  noVision: string;
  lowSpeech: string;
  closeLine: string;
}

// Activity (full content schema)
export interface ActivityMaterial {
  materialId: string;
  materialName: string;
  quantity: string;
  required: boolean;
  substitutions: string[];
}

export interface ActivityStep {
  text: string;
  cueSeconds: number | null;
}

export interface Activity {
  id: string;
  slug: string;
  schemaVersion: number;
  status: "draft" | "review" | "published" | "retired";

  title: string;
  oneLinePromise: string;
  mode: ActivityMode;
  mechanics: string[];
  theIdea: string;

  ageBands: AgeBand[];
  durationPrepMinutes: number;
  durationPlayMin: number;
  durationPlayMax: number;
  adultEnergy: Energy;
  childStates: ChildState[];
  places: Place[];
  participantChildMin: number;
  participantChildMax: number;
  participantAdultMin: number;
  mess: Mess;
  noise: Noise;
  repeatability: "low" | "medium" | "high";

  materials: ActivityMaterial[];
  householdBaselineEligible: boolean;
  cleanupMinutes: number;

  riskLevel: RiskLevel;
  supervision: Supervision;
  hazards: string[];
  warning: string | null;
  saferVariant: string | null;

  motorDemand: "low" | "medium" | "high";
  visualDemand: "low" | "medium" | "high";
  auditoryDemand: "low" | "medium" | "high";
  readingDemand: "none" | "low" | "medium";
  sensoryIntensity: "low" | "medium" | "high";
  positions: Array<"seated" | "standing" | "moving">;

  prepChecklist: string[];
  introLine: string;
  childRole: string;
  adultRole: string;
  steps: ActivityStep[];
  ifItFlops: string;
  remixPrompts: string[];
  endingPrompt: string;
  closePrompts: string[];

  togetherModeType: "one-card" | "glance" | "audio" | "turns";
  togetherModeWakeLock: boolean;

  sourceDemoUrl: string | null;
  sourceDemoPlatform: string | null;
  sourceDemoCreator: string | null;

  heritage?: {
    collection: "kannada";
    languageCode: "kn";
    lyricsKannada: string;
    transliteration: string;
    versionNote: string;
    demoVideoPath?: string;
    demoPosterPath?: string;
  };
}

// Session recording
export interface TogetherSession {
  id: string;
  activityId: string | null;
  conversationGameId: string | null;
  momentSnapshot: Moment;
  startedAt: number;
  completedAt: number | null;
  fit: Fit | null;
  swapReason: string | null;
  completionMode: "completed" | "abandoned" | "interrupted";
}

// Onboarding state
export interface OnboardingState {
  completed: boolean;
  childAgeBands: AgeBand[];
  childCount: number;
  adultName: string;
}

// Preferences
export interface MomentDefaults {
  adultEnergy: Energy;
  place: Place;
  messTolerance: Mess;
  noiseTolerance: Noise;
}
