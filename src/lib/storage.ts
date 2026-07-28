import { Platform } from "react-native";

// Lazy-loaded storage wrappers to avoid native module crashes on web

let AsyncStorageModule: any = null;
let SecureStoreModule: any = null;

async function getAsyncStorage() {
  if (!AsyncStorageModule) {
    AsyncStorageModule = await import("@react-native-async-storage/async-storage");
  }
  return AsyncStorageModule.default;
}

async function getSecureStore() {
  if (!SecureStoreModule) {
    SecureStoreModule = await import("expo-secure-store");
  }
  return SecureStoreModule;
}

// AsyncStorage helpers
export async function getItem(key: string): Promise<string | null> {
  const store = await getAsyncStorage();
  return store.getItem(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  const store = await getAsyncStorage();
  return store.setItem(key, value);
}

export async function removeItem(key: string): Promise<void> {
  const store = await getAsyncStorage();
  return store.removeItem(key);
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const raw = await getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  return setItem(key, JSON.stringify(value));
}

// SecureStore helpers (native only)
export async function secureGet(key: string): Promise<string | null> {
  if (Platform.OS === "web") return getItem(`secure_${key}`);
  const store = await getSecureStore();
  return store.getItemAsync(key);
}

export async function secureSet(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") return setItem(`secure_${key}`, value);
  const store = await getSecureStore();
  return store.setItemAsync(key, value);
}

export async function secureDelete(key: string): Promise<void> {
  if (Platform.OS === "web") return removeItem(`secure_${key}`);
  const store = await getSecureStore();
  return store.deleteItemAsync(key);
}

// Storage keys
export const STORAGE_KEYS = {
  onboardingComplete: "onboarding_complete",
  childAgeBands: "child_age_bands",
  childCount: "child_count",
  adultName: "adult_name",
  momentDefaults: "moment_defaults",
  recentActivityIds: "recent_activity_ids",
  savedActivityIds: "saved_activity_ids",
  savedGameIds: "saved_game_ids",
  sessions: "together_sessions",
  notificationEnabled: "notification_enabled",
} as const;
