import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius, modeColor, modeBgColor } from "../../src/theme";
import { getActivityById } from "../../src/data/activities";
import { setJSON, getJSON, STORAGE_KEYS } from "../../src/lib/storage";
import type { TogetherSession } from "../../src/types";

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const activity = getActivityById(id || "");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkSaved();
  }, [id]);

  async function checkSaved() {
    const saved = await getJSON<string[]>(STORAGE_KEYS.savedActivityIds) || [];
    setIsSaved(saved.includes(id || ""));
  }

  async function toggleSave() {
    const saved = await getJSON<string[]>(STORAGE_KEYS.savedActivityIds) || [];
    const updated = isSaved
      ? saved.filter((s) => s !== id)
      : [...saved, id || ""];
    await setJSON(STORAGE_KEYS.savedActivityIds, updated);
    setIsSaved(!isSaved);
  }

  if (!activity) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Activity not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.errorLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartTogether = async () => {
    const sessionId = `session_${Date.now()}`;
    const session: TogetherSession = {
      id: sessionId,
      activityId: activity.id,
      conversationGameId: null,
      momentSnapshot: {
        childProfileIds: [],
        adultCount: 1,
        durationBucket: "5-10",
        adultEnergy: "steady",
        childState: "unspecified",
        place: "home",
        messTolerance: "contained",
        noiseTolerance: "normal",
      },
      startedAt: Date.now(),
      completedAt: null,
      fit: null,
      swapReason: null,
      completionMode: "completed",
    };

    // Save session
    const sessions = await getJSON<TogetherSession[]>(STORAGE_KEYS.sessions) || [];
    sessions.push(session);
    await setJSON(STORAGE_KEYS.sessions, sessions);

    router.push(`/together/${sessionId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.modeBadge,
              { backgroundColor: modeBgColor(activity.mode) },
            ]}
          >
            <Text
              style={[
                styles.modeBadgeText,
                { color: modeColor(activity.mode) },
              ]}
            >
              {activity.mode.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.promise}>{activity.oneLinePromise}</Text>
        </View>

        {/* Quick facts */}
        <View style={styles.factsRow}>
          <View style={styles.fact}>
            <Text style={styles.factValue}>
              {activity.durationPlayMin}–{activity.durationPlayMax}
            </Text>
            <Text style={styles.factLabel}>minutes</Text>
          </View>
          <View style={styles.fact}>
            <Text style={styles.factValue}>
              {activity.materials.length === 0 ? "None" : activity.materials.length}
            </Text>
            <Text style={styles.factLabel}>materials</Text>
          </View>
          <View style={styles.fact}>
            <Text style={styles.factValue}>
              {activity.mess === "none" ? "None" : activity.mess}
            </Text>
            <Text style={styles.factLabel}>mess</Text>
          </View>
          <View style={styles.fact}>
            <Text style={styles.factValue}>
              {activity.ageBands.join(", ")}
            </Text>
            <Text style={styles.factLabel}>ages</Text>
          </View>
        </View>

        {/* Plain-language activity concept */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The idea</Text>
          <Text style={styles.bodyText}>{activity.theIdea}</Text>
        </View>

        {/* Safety warning */}
        {activity.warning && (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>⚠ Safety note</Text>
            <Text style={styles.warningText}>{activity.warning}</Text>
            {activity.saferVariant && (
              <Text style={styles.saferText}>
                Safer option: {activity.saferVariant}
              </Text>
            )}
          </View>
        )}

        {/* Materials */}
        {activity.materials.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>You'll need</Text>
            {activity.materials.map((mat, i) => (
              <View key={i} style={styles.materialRow}>
                <Text style={styles.materialName}>
                  {mat.materialName}
                </Text>
                <Text style={styles.materialQty}>{mat.quantity}</Text>
              </View>
            ))}
            {activity.cleanupMinutes > 0 && (
              <Text style={styles.cleanupNote}>
                Cleanup: ~{activity.cleanupMinutes} min
              </Text>
            )}
          </View>
        )}

        {/* Prep checklist */}
        {activity.prepChecklist.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick prep</Text>
            {activity.prepChecklist.map((item, i) => (
              <View key={i} style={styles.checklistRow}>
                <Text style={styles.checklistBullet}>•</Text>
                <Text style={styles.checklistText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* How to start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to start</Text>
          <Text style={styles.introLine}>"{activity.introLine}"</Text>
          <View style={styles.rolesRow}>
            <View style={styles.roleCard}>
              <Text style={styles.roleLabel}>Your role</Text>
              <Text style={styles.roleText}>{activity.adultRole}</Text>
            </View>
            <View style={styles.roleCard}>
              <Text style={styles.roleLabel}>Their role</Text>
              <Text style={styles.roleText}>{activity.childRole}</Text>
            </View>
          </View>
        </View>

        {/* Steps preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Steps</Text>
          {activity.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>

        {/* If it flops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>If it flops</Text>
          <Text style={styles.bodyText}>{activity.ifItFlops}</Text>
        </View>

        {/* Remix prompts */}
        {activity.remixPrompts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Make it yours</Text>
            {activity.remixPrompts.map((prompt, i) => (
              <View key={i} style={styles.remixRow}>
                <Text style={styles.remixBullet}>↻</Text>
                <Text style={styles.remixText}>{prompt}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={toggleSave}
        >
          <Text style={styles.saveButtonText}>
            {isSaved ? "♥ Saved" : "♡ Save"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartTogether}
        >
          <Text style={styles.startButtonText}>Start Together Mode</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
  },
  errorLink: {
    ...typography.body,
    color: colors.primary,
  },
  header: {
    marginBottom: spacing.lg,
  },
  modeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  modeBadgeText: {
    ...typography.caption,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  promise: {
    ...typography.body,
    color: colors.textSecondary,
  },
  factsRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fact: {
    flex: 1,
    alignItems: "center",
  },
  factValue: {
    ...typography.headline,
    color: colors.text,
    fontSize: 14,
  },
  factLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bodyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  warningCard: {
    backgroundColor: colors.warningLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  warningTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  warningText: {
    ...typography.body,
    color: colors.text,
  },
  saferText: {
    ...typography.callout,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontStyle: "italic",
  },
  materialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  materialName: {
    ...typography.body,
    color: colors.text,
  },
  materialQty: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cleanupNote: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.sm,
  },
  checklistRow: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  checklistBullet: {
    ...typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  checklistText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  introLine: {
    ...typography.body,
    color: colors.primary,
    fontStyle: "italic",
    marginBottom: spacing.md,
  },
  rolesRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  roleText: {
    ...typography.callout,
    color: colors.text,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
    marginTop: 2,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  stepText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  remixRow: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  remixBullet: {
    fontSize: 16,
    color: colors.accent,
    marginRight: spacing.sm,
  },
  remixText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  spacer: {
    height: spacing.xl,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  saveButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
  },
  saveButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: "500",
  },
  startButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  startButtonText: {
    ...typography.headline,
    color: "#FFFFFF",
  },
});
