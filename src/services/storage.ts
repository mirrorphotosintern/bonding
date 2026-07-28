import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingState, MomentDefaults, TogetherSession } from "../types";

const KEYS = {
  onboarding: "@handful/onboarding",
  momentDefaults: "@handful/moment-defaults",
  recentActivityIds: "@handful/recent-activities",
  sessions: "@handful/sessions",
  savedActivityIds: "@handful/saved-activities",
  savedGameIds: "@handful/saved-games",
} as const;

// Onboarding
export async function getOnboarding(): Promise<OnboardingState | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.onboarding);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setOnboarding(state: OnboardingState): Promise<void> {
  await AsyncStorage.setItem(KEYS.onboarding, JSON.stringify(state));
}

// Moment defaults
export async function getMomentDefaults(): Promise<MomentDefaults | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.momentDefaults);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setMomentDefaults(defaults: MomentDefaults): Promise<void> {
  await AsyncStorage.setItem(KEYS.momentDefaults, JSON.stringify(defaults));
}

// Recent activities
export async function getRecentActivityIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.recentActivityIds);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addRecentActivityId(id: string): Promise<void> {
  const recent = await getRecentActivityIds();
  const filtered = recent.filter((r) => r !== id);
  filtered.unshift(id);
  await AsyncStorage.setItem(
    KEYS.recentActivityIds,
    JSON.stringify(filtered.slice(0, 20))
  );
}

// Sessions
export async function getSessions(): Promise<TogetherSession[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.sessions);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveSession(session: TogetherSession): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.push(session);
  }
  await AsyncStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

// Saved activities (Our Things)
export async function getSavedActivityIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.savedActivityIds);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleSavedActivity(id: string): Promise<boolean> {
  const saved = await getSavedActivityIds();
  const idx = saved.indexOf(id);
  if (idx >= 0) {
    saved.splice(idx, 1);
  } else {
    saved.push(id);
  }
  await AsyncStorage.setItem(KEYS.savedActivityIds, JSON.stringify(saved));
  return idx < 0; // true if now saved
}

// Saved conversation games
export async function getSavedGameIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.savedGameIds);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleSavedGame(id: string): Promise<boolean> {
  const saved = await getSavedGameIds();
  const idx = saved.indexOf(id);
  if (idx >= 0) {
    saved.splice(idx, 1);
  } else {
    saved.push(id);
  }
  await AsyncStorage.setItem(KEYS.savedGameIds, JSON.stringify(saved));
  return idx < 0;
}
