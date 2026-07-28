import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius } from "../../src/theme";
import { getActivityById } from "../../src/data/activities";
import { getGameById } from "../../src/data/conversation-games";
import { getJSON, setJSON, STORAGE_KEYS } from "../../src/lib/storage";
import type { TogetherSession, Fit } from "../../src/types";

export default function TogetherModeScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const router = useRouter();
  const [session, setSession] = useState<TogetherSession | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  async function loadSession() {
    const sessions = await getJSON<TogetherSession[]>(STORAGE_KEYS.sessions) || [];
    const found = sessions.find((s) => s.id === sessionId);
    if (found) {
      setSession(found);
    }
  }

  const activity = session?.activityId ? getActivityById(session.activityId) : null;
  const game = session?.conversationGameId ? getGameById(session.conversationGameId) : null;

  if (!session || (!activity && !game)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Session not found</Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.back()}
          >
            <Text style={styles.doneButtonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const title = activity?.title || game?.title || "";
  const steps = activity?.steps || [];
  const isGame = !!game;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const handleComplete = async (fit: Fit) => {
    // Update session
    const sessions = await getJSON<TogetherSession[]>(STORAGE_KEYS.sessions) || [];
    const updated = sessions.map((s) =>
      s.id === sessionId
        ? { ...s, completedAt: Date.now(), fit, completionMode: "completed" as const }
        : s
    );
    await setJSON(STORAGE_KEYS.sessions, updated);

    // Add to recent
    const recent = await getJSON<string[]>(STORAGE_KEYS.recentActivityIds) || [];
    const actId = activity?.id || game?.id || "";
    if (actId && !recent.includes(actId)) {
      recent.unshift(actId);
      if (recent.length > 20) recent.pop();
      await setJSON(STORAGE_KEYS.recentActivityIds, recent);
    }

    router.back();
  };

  if (showCompletion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completionContainer}>
          <Text style={styles.completionTitle}>How was that?</Text>

          <TouchableOpacity
            style={[styles.fitButton, { backgroundColor: colors.accent }]}
            onPress={() => handleComplete("yes")}
          >
            <Text style={styles.fitButtonText}>That was great</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fitButton, { backgroundColor: colors.warning }]}
            onPress={() => handleComplete("almost")}
          >
            <Text style={styles.fitButtonText}>Almost worked</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fitButton, { backgroundColor: colors.textTertiary }]}
            onPress={() => handleComplete("no")}
          >
            <Text style={styles.fitButtonText}>Not for us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.back()}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.modeLabel}>
            {isGame ? "TALK" : activity?.mode.toUpperCase()}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Game content */}
        {isGame && game && (
          <View style={styles.gameContent}>
            <View style={styles.ruleCard}>
              <Text style={styles.ruleLabel}>Say this:</Text>
              <Text style={styles.ruleText}>"{game.oneBreathRule}"</Text>
            </View>

            <View style={styles.promptCard}>
              <Text style={styles.promptLabel}>First line:</Text>
              <Text style={styles.promptText}>"{game.firstPrompt}"</Text>
            </View>

            <View style={styles.modelCard}>
              <Text style={styles.modelText}>{game.adultModel}</Text>
            </View>

            <View style={styles.gameMeta}>
              <Text style={styles.gameMetaText}>
                {game.fit.volume} · {game.fit.interruptibility} · {game.fit.cognitiveLoad} load
              </Text>
            </View>
          </View>
        )}

        {/* Activity steps */}
        {!isGame && steps.length > 0 && (
          <View style={styles.stepsContent}>
            <View style={styles.stepIndicator}>
              {steps.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.stepDot,
                    i === currentStep && styles.stepDotActive,
                    i < currentStep && styles.stepDotDone,
                  ]}
                />
              ))}
            </View>

            <ScrollView style={styles.stepScroll}>
              <Text style={styles.stepText}>
                {steps[currentStep]?.text}
              </Text>
            </ScrollView>

            {currentStep === 0 && activity && (
              <View style={styles.introCard}>
                <Text style={styles.introText}>"{activity.introLine}"</Text>
              </View>
            )}
          </View>
        )}

        {/* Phone down prompt */}
        <View style={styles.phoneDownCard}>
          <Text style={styles.phoneDownText}>
            Put the phone down and play
          </Text>
        </View>
      </View>

      {/* Bottom controls */}
      <View style={styles.controls}>
        {!isGame && steps.length > 1 && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep < steps.length - 1 ? "Next step" : "We did it"}
            </Text>
          </TouchableOpacity>
        )}

        {isGame && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setShowCompletion(true)}
          >
            <Text style={styles.nextButtonText}>We played</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.endButton}
          onPress={() => router.back()}
        >
          <Text style={styles.endButtonText}>End</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.togetherBg,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    ...typography.title,
    color: colors.togetherText,
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  modeLabel: {
    ...typography.caption,
    color: colors.togetherAccent,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.togetherTitle,
    color: colors.togetherText,
  },
  gameContent: {
    flex: 1,
    gap: spacing.lg,
  },
  ruleCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  ruleLabel: {
    ...typography.caption,
    color: colors.togetherAccent,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ruleText: {
    ...typography.togetherBody,
    color: colors.togetherText,
    fontStyle: "italic",
  },
  promptCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  promptLabel: {
    ...typography.caption,
    color: colors.togetherAccent,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  promptText: {
    ...typography.togetherBody,
    color: colors.togetherText,
    fontWeight: "600",
  },
  modelCard: {
    padding: spacing.md,
  },
  modelText: {
    ...typography.body,
    color: colors.togetherAccent,
    textAlign: "center",
  },
  gameMeta: {
    alignItems: "center",
  },
  gameMetaText: {
    ...typography.caption,
    color: colors.togetherAccent,
  },
  stepsContent: {
    flex: 1,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  stepDotActive: {
    backgroundColor: colors.togetherText,
    width: 24,
  },
  stepDotDone: {
    backgroundColor: colors.accent,
  },
  stepScroll: {
    flex: 1,
  },
  stepText: {
    ...typography.togetherBody,
    color: colors.togetherText,
    textAlign: "center",
    lineHeight: 32,
  },
  introCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  introText: {
    ...typography.body,
    color: colors.togetherAccent,
    textAlign: "center",
    fontStyle: "italic",
  },
  phoneDownCard: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  phoneDownText: {
    ...typography.callout,
    color: colors.togetherAccent,
    letterSpacing: 1,
  },
  controls: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  nextButton: {
    backgroundColor: colors.togetherText,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  nextButtonText: {
    ...typography.headline,
    color: colors.togetherBg,
    fontSize: 18,
  },
  endButton: {
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  endButtonText: {
    ...typography.body,
    color: colors.togetherAccent,
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  doneButtonText: {
    ...typography.headline,
    color: "#FFFFFF",
  },
  completionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.md,
  },
  completionTitle: {
    ...typography.togetherTitle,
    color: colors.togetherText,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  fitButton: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  fitButtonText: {
    ...typography.headline,
    color: "#FFFFFF",
    fontSize: 18,
  },
  skipButton: {
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  skipButtonText: {
    ...typography.body,
    color: colors.togetherAccent,
  },
});
