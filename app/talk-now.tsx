import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius } from "../src/theme";
import { matchConversationGames } from "../src/lib/matcher";
import { getJSON, setJSON, STORAGE_KEYS } from "../src/lib/storage";
import type { ConversationGame, AgeBand, TogetherSession } from "../src/types";

const SITUATIONS = [
  { key: "car", label: "In the car", emoji: "🚗" },
  { key: "restaurant", label: "Waiting somewhere", emoji: "⏳" },
  { key: "bedtime", label: "Winding down", emoji: "🌙" },
];

export default function TalkNowScreen() {
  const router = useRouter();
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<ConversationGame | null>(null);
  const [ageBands, setAgeBands] = useState<AgeBand[]>([]);

  useEffect(() => {
    loadAgeBands();
  }, []);

  async function loadAgeBands() {
    const bands = await getJSON<AgeBand[]>(STORAGE_KEYS.childAgeBands) || [];
    setAgeBands(bands);
  }

  const handleSituationSelect = (situation: string) => {
    setSelectedSituation(situation);
    const matches = matchConversationGames(situation, ageBands);
    if (matches.length > 0) {
      setSelectedGame(matches[0].game);
    }
  };

  const handleAnother = () => {
    if (!selectedSituation) return;
    const matches = matchConversationGames(selectedSituation, ageBands);
    if (matches.length > 1) {
      const currentIndex = matches.findIndex((m: any) => m.game.id === selectedGame?.id);
      const next = matches[(currentIndex + 1) % matches.length];
      setSelectedGame(next.game);
    }
  };

  const handleStart = async () => {
    if (!selectedGame) return;

    const sessionId = `session_${Date.now()}`;
    const session: TogetherSession = {
      id: sessionId,
      activityId: null,
      conversationGameId: selectedGame.id,
      momentSnapshot: {
        childProfileIds: ageBands,
        adultCount: 1,
        durationBucket: "5-10",
        adultEnergy: "steady",
        childState: "unspecified",
        place: selectedSituation === "car" ? "travel" : selectedSituation === "bedtime" ? "bedtime" : "waiting",
        messTolerance: "none",
        noiseTolerance: "quiet",
      },
      startedAt: Date.now(),
      completedAt: null,
      fit: null,
      swapReason: null,
      completionMode: "completed",
    };

    const sessions = await getJSON<TogetherSession[]>(STORAGE_KEYS.sessions) || [];
    sessions.push(session);
    await setJSON(STORAGE_KEYS.sessions, sessions);

    router.push(`/together/${sessionId}`);
  };

  // Game selected view
  if (selectedGame) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gameContent}>
          <Text style={styles.gameTitle}>{selectedGame.title}</Text>

          <View style={styles.ruleCard}>
            <Text style={styles.ruleLabel}>Say this:</Text>
            <Text style={styles.ruleText}>"{selectedGame.oneBreathRule}"</Text>
          </View>

          <View style={styles.promptCard}>
            <Text style={styles.promptLabel}>First line:</Text>
            <Text style={styles.promptText}>"{selectedGame.firstPrompt}"</Text>
          </View>

          <View style={styles.modelCard}>
            <Text style={styles.modelText}>{selectedGame.adultModel}</Text>
          </View>

          <View style={styles.gameMeta}>
            <Text style={styles.gameMetaText}>
              {selectedGame.fit.volume} · {selectedGame.fit.cognitiveLoad} load
            </Text>
            {selectedGame.fit.driverSafe && (
              <Text style={styles.driverSafe}>Driver safe</Text>
            )}
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Start — Phone Down</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleAnother}>
              <Text style={styles.secondaryButtonText}>Another one</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setSelectedGame(null)}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Situation picker view
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContent}>
        <Text style={styles.pickerTitle}>Where are you?</Text>
        <Text style={styles.pickerSubtitle}>
          Pick your situation — we'll find a game that fits.
        </Text>

        {SITUATIONS.map((sit) => (
          <TouchableOpacity
            key={sit.key}
            style={styles.situationCard}
            onPress={() => handleSituationSelect(sit.key)}
          >
            <Text style={styles.situationEmoji}>{sit.emoji}</Text>
            <Text style={styles.situationLabel}>{sit.label}</Text>
            <Text style={styles.situationArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  pickerContent: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  pickerTitle: {
    ...typography.largeTitle,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  pickerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  situationCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  situationEmoji: { fontSize: 32, marginRight: spacing.md },
  situationLabel: { ...typography.headline, color: colors.text, flex: 1 },
  situationArrow: { fontSize: 20, color: colors.textTertiary },
  gameContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  gameTitle: {
    ...typography.largeTitle,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  ruleCard: {
    backgroundColor: colors.talk,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  ruleLabel: {
    ...typography.caption,
    color: "rgba(255,255,255,0.7)",
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ruleText: {
    ...typography.togetherBody,
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  promptCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promptLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  promptText: {
    ...typography.togetherBody,
    color: colors.text,
    fontWeight: "600",
  },
  modelCard: { padding: spacing.md, marginBottom: spacing.md },
  modelText: { ...typography.body, color: colors.textSecondary, textAlign: "center" },
  gameMeta: { alignItems: "center" },
  gameMetaText: { ...typography.caption, color: colors.textTertiary },
  driverSafe: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: "600",
    marginTop: spacing.xs,
  },
  controls: { padding: spacing.lg },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  startButtonText: { ...typography.headline, color: "#FFFFFF", fontSize: 18 },
  secondaryActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.lg,
  },
  secondaryButton: { paddingVertical: spacing.sm },
  secondaryButtonText: { ...typography.body, color: colors.primary, fontWeight: "500" },
});
