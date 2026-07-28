import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { colors, spacing, typography, borderRadius, modeColor, modeBgColor } from "../../src/theme";
import { matchActivities } from "../../src/lib/matcher";
import { getJSON, STORAGE_KEYS } from "../../src/lib/storage";
import type { Moment, AgeBand, Energy, Place, Mess, Noise, DurationBucket } from "../../src/types";

const ENERGY_OPTIONS: { value: Energy; label: string; emoji: string }[] = [
  { value: "empty", label: "Running on empty", emoji: "🪫" },
  { value: "steady", label: "Steady", emoji: "☕" },
  { value: "energetic", label: "Energetic", emoji: "⚡" },
];

const PLACE_OPTIONS: { value: Place; label: string }[] = [
  { value: "home", label: "At home" },
  { value: "outside", label: "Outside" },
  { value: "travel", label: "In the car" },
  { value: "waiting", label: "Waiting" },
  { value: "bedtime", label: "Winding down" },
];

const DURATION_OPTIONS: { value: DurationBucket; label: string }[] = [
  { value: "2-5", label: "2–5 min" },
  { value: "5-10", label: "5–10 min" },
  { value: "10-20", label: "10–20 min" },
  { value: "20-45", label: "20–45 min" },
  { value: "45+", label: "45+ min" },
];

export default function TodayScreen() {
  const router = useRouter();
  const [ageBands, setAgeBands] = useState<AgeBand[]>([]);
  const [energy, setEnergy] = useState<Energy>("steady");
  const [place, setPlace] = useState<Place>("home");
  const [duration, setDuration] = useState<DurationBucket>("5-10");
  const [recommendation, setRecommendation] = useState<ReturnType<typeof matchActivities>[0] | null>(null);
  const [swapIndex, setSwapIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadAndMatch();
    }, [energy, place, duration])
  );

  async function loadAndMatch() {
    const bands = await getJSON<AgeBand[]>(STORAGE_KEYS.childAgeBands) || [];
    setAgeBands(bands);

    const moment: Moment = {
      childProfileIds: bands,
      adultCount: 1,
      durationBucket: duration,
      adultEnergy: energy,
      childState: "unspecified",
      place,
      messTolerance: energy === "empty" ? "none" : "contained",
      noiseTolerance: place === "bedtime" ? "quiet" : "normal",
    };

    const matches = matchActivities(moment);
    if (matches.length > 0) {
      setRecommendation(matches[swapIndex % matches.length]);
    } else {
      setRecommendation(null);
    }
  }

  const handleSwap = () => {
    setSwapIndex((i) => i + 1);
    loadAndMatch();
  };

  const handleStart = () => {
    if (!recommendation) return;
    router.push(`/activity/${recommendation.activity.id}`);
  };

  const handleTalkNow = () => {
    router.push("/talk-now");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Quick context selectors */}
        <View style={styles.contextSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
            {ENERGY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.chip, energy === opt.value && styles.chipActive]}
                onPress={() => setEnergy(opt.value)}
              >
                <Text style={styles.chipEmoji}>{opt.emoji}</Text>
                <Text style={[styles.chipText, energy === opt.value && styles.chipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
            {PLACE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.chip, place === opt.value && styles.chipActive]}
                onPress={() => setPlace(opt.value)}
              >
                <Text style={[styles.chipText, place === opt.value && styles.chipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
            {DURATION_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.chip, duration === opt.value && styles.chipActive]}
                onPress={() => setDuration(opt.value)}
              >
                <Text style={[styles.chipText, duration === opt.value && styles.chipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommendation card */}
        {recommendation ? (
          <View style={styles.cardContainer}>
            <View
              style={[
                styles.modeBadge,
                { backgroundColor: modeBgColor(recommendation.activity.mode) },
              ]}
            >
              <Text
                style={[
                  styles.modeBadgeText,
                  { color: modeColor(recommendation.activity.mode) },
                ]}
              >
                {recommendation.activity.mode.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.cardTitle}>{recommendation.activity.title}</Text>
            <Text style={styles.cardPromise}>{recommendation.activity.oneLinePromise}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {recommendation.activity.durationPlayMin}–{recommendation.activity.durationPlayMax} min
              </Text>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>
                {recommendation.activity.materials.length === 0
                  ? "No materials"
                  : `${recommendation.activity.materials.length} material${recommendation.activity.materials.length > 1 ? "s" : ""}`}
              </Text>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>
                {recommendation.activity.mess === "none" ? "No mess" : recommendation.activity.mess}
              </Text>
            </View>

            {recommendation.reasons.length > 0 && (
              <View style={styles.reasonsRow}>
                {recommendation.reasons.map((r, i) => (
                  <View key={i} style={styles.reasonChip}>
                    <Text style={styles.reasonText}>{r}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                <Text style={styles.startButtonText}>Let's do this</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
                <Text style={styles.swapButtonText}>Try another</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No perfect match right now</Text>
            <Text style={styles.emptyText}>
              Try adjusting your time or energy level, or check out Talk Now for zero-prop games.
            </Text>
          </View>
        )}

        {/* Talk Now shortcut */}
        <TouchableOpacity style={styles.talkNowCard} onPress={handleTalkNow}>
          <View style={styles.talkNowContent}>
            <Text style={styles.talkNowTitle}>Talk Now</Text>
            <Text style={styles.talkNowSubtitle}>
              Zero-prop conversation games — no materials needed
            </Text>
          </View>
          <Text style={styles.talkNowArrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.md,
  },
  contextSection: {
    marginBottom: spacing.lg,
  },
  chipRow: {
    marginBottom: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  chipEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  chipText: {
    ...typography.callout,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  modeBadgeText: {
    ...typography.caption,
    fontWeight: "700",
    letterSpacing: 1,
  },
  cardTitle: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardPromise: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  metaText: {
    ...typography.callout,
    color: colors.textSecondary,
  },
  metaDot: {
    ...typography.callout,
    color: colors.textTertiary,
    marginHorizontal: spacing.sm,
  },
  reasonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  reasonChip: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  reasonText: {
    ...typography.caption,
    color: colors.accent,
  },
  cardActions: {
    gap: spacing.sm,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  startButtonText: {
    ...typography.headline,
    color: "#FFFFFF",
  },
  swapButton: {
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  swapButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "500",
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
  talkNowCard: {
    backgroundColor: colors.talk,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  talkNowContent: {
    flex: 1,
  },
  talkNowTitle: {
    ...typography.title,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  talkNowSubtitle: {
    ...typography.callout,
    color: "rgba(255,255,255,0.8)",
  },
  talkNowArrow: {
    fontSize: 24,
    color: "#FFFFFF",
    marginLeft: spacing.md,
  },
});
