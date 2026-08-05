import { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SymbolView } from "expo-symbols";
import { useFocusEffect, useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius } from "../../src/theme";
import { getJSON, STORAGE_KEYS } from "../../src/lib/storage";
import { IdeaArtwork } from "../../src/components/idea-artwork";
import { ideas, type IdeaSummary } from "../../src/data/ideas";
import { isStarterIdea } from "../../src/data/access";
import { getLifetimeStatus } from "../../src/services/purchases";
import type { ActivityMode, AgeBand } from "../../src/types";

type Intent = "surprise" | "move" | "make" | "talk" | "imagine" | "help";
type Setup = "none" | "some";
type Players = 2 | 3 | 4;

const INTENTS: {
  value: Intent;
  label: string;
  note: string;
  symbol: string;
  color: string;
  modes: ActivityMode[] | null;
}[] = [
  {
    value: "surprise",
    label: "Surprise us",
    note: "Anything goes",
    symbol: "sparkles",
    color: colors.sun,
    modes: null,
  },
  {
    value: "move",
    label: "Burn energy",
    note: "Get bodies moving",
    symbol: "figure.run",
    color: colors.coral,
    modes: ["move"],
  },
  {
    value: "make",
    label: "Make a thing",
    note: "Build, draw, fold",
    symbol: "scissors",
    color: colors.sun,
    modes: ["make"],
  },
  {
    value: "talk",
    label: "Talk & laugh",
    note: "Stories and games",
    symbol: "quote.bubble.fill",
    color: colors.mint,
    modes: ["talk"],
  },
  {
    value: "imagine",
    label: "Puzzle us",
    note: "Guess, think, perform",
    symbol: "lightbulb.fill",
    color: colors.lavender,
    modes: ["think", "perform"],
  },
  {
    value: "help",
    label: "Do a real job",
    note: "Help, but make it fun",
    symbol: "hands.sparkles.fill",
    color: colors.mint,
    modes: ["help"],
  },
];

function intentFor(value: Intent) {
  return INTENTS.find((intent) => intent.value === value) ?? INTENTS[0];
}

function shuffledIdeaIds(candidates: IdeaSummary[]) {
  const ids = candidates.map((idea) => idea.id);

  for (let index = ids.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[randomIndex]] = [ids[randomIndex], ids[index]];
  }

  return ids;
}

export default function TodayScreen() {
  const router = useRouter();
  const [ageBands, setAgeBands] = useState<AgeBand[]>([]);
  const [intent, setIntent] = useState<Intent>("surprise");
  const [setup, setSetup] = useState<Setup>("none");
  const [players, setPlayers] = useState<Players>(2);
  const [showResult, setShowResult] = useState(false);
  const [recommendationOrder, setRecommendationOrder] = useState<string[]>([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);

  useFocusEffect(
    useCallback(() => {
      void loadFamily();
      void getLifetimeStatus()
        .then((status) => setHasLifetimeAccess(status.unlocked))
        .catch(() => setHasLifetimeAccess(false));
    }, [])
  );

  async function loadFamily() {
    const bands =
      (await getJSON<AgeBand[]>(STORAGE_KEYS.childAgeBands)) || [];
    setAgeBands(bands);
  }

  const matches = useMemo(() => {
    const selectedIntent = intentFor(intent);
    const ageMatches = ideas.filter(
      (idea) =>
        ageBands.length === 0 ||
        ageBands.some((band) => idea.ageBands.includes(band))
    );
    const intentMatches = selectedIntent.modes
      ? ageMatches.filter((idea) => selectedIntent.modes?.includes(idea.mode))
      : ageMatches;
    const playerMatches = intentMatches.filter(
      (idea) => players >= idea.playerMin && players <= idea.playerMax
    );
    const setupMatches =
      setup === "none"
        ? playerMatches.filter((idea) => idea.materialCount === 0)
        : playerMatches;

    // If a rare combination is empty, honor the activity mood and relax only
    // the setup preference rather than presenting a dead end.
    return setupMatches.length > 0
      ? setupMatches
      : playerMatches.length > 0
        ? playerMatches
        : intentMatches;
  }, [ageBands, intent, players, setup]);

  const recommendation: IdeaSummary | null =
    showResult && recommendationOrder.length > 0
      ? ideas.find(
          (idea) =>
            idea.id ===
            recommendationOrder[
              recommendationIndex % recommendationOrder.length
            ]
        ) ?? null
      : null;

  function findIdea() {
    setRecommendationOrder(shuffledIdeaIds(matches));
    setRecommendationIndex(0);
    setShowResult(true);
  }

  function tryAnotherIdea() {
    const nextIndex = recommendationIndex + 1;

    if (nextIndex < recommendationOrder.length) {
      setRecommendationIndex(nextIndex);
      return;
    }

    // A finished deck is shuffled again, so repeated sessions never settle
    // into the catalog's source order.
    setRecommendationOrder(shuffledIdeaIds(matches));
    setRecommendationIndex(0);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.scroll,
          !showResult && styles.scrollWithFooter,
        ]}
      >
      {!showResult ? (
        <View style={styles.pickerCard}>
          <Text style={styles.pickerEyebrow}>RIGHT NOW</Text>
          <Text style={styles.pickerTitle}>What sounds good?</Text>
          <Text style={styles.pickerIntro}>
            Pick the kind of moment you want. We&apos;ll choose the activity.
          </Text>

          <View style={styles.intentGrid}>
            {INTENTS.map((option) => {
              const selected = intent === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  activeOpacity={0.8}
                  style={[
                    styles.intentCard,
                    selected && styles.intentCardSelected,
                  ]}
                  onPress={() => setIntent(option.value)}
                >
                  <View
                    style={[
                      styles.intentIconWrap,
                      { backgroundColor: option.color },
                    ]}
                  >
                    <SymbolView
                      name={option.symbol as never}
                      style={styles.intentIcon}
                      tintColor={colors.text}
                    />
                  </View>
                  <Text style={styles.intentLabel}>{option.label}</Text>
                  <Text style={styles.intentNote}>{option.note}</Text>
                  {selected && (
                    <SymbolView
                      name="checkmark.circle.fill"
                      style={styles.selectedIcon}
                      tintColor={colors.cobalt}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.setupQuestion}>How much setup?</Text>
          <View style={styles.setupRow}>
            <TouchableOpacity
              style={[
                styles.setupChoice,
                setup === "none" && styles.setupChoiceSelected,
              ]}
              onPress={() => setSetup("none")}
            >
              <Text
                style={[
                  styles.setupChoiceText,
                  setup === "none" && styles.setupChoiceTextSelected,
                ]}
              >
                Nothing, please
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.setupChoice,
                setup === "some" && styles.setupChoiceSelected,
              ]}
              onPress={() => setSetup("some")}
            >
              <Text
                style={[
                  styles.setupChoiceText,
                  setup === "some" && styles.setupChoiceTextSelected,
                ]}
              >
                A few things
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.setupQuestion}>How many are playing?</Text>
          <View style={styles.playersRow}>
            {([2, 3, 4] as Players[]).map((count) => {
              const selected = players === count;
              return (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.playerChoice,
                    selected && styles.playerChoiceSelected,
                  ]}
                  onPress={() => setPlayers(count)}
                >
                  <SymbolView
                    name={count === 2 ? "person.2.fill" : "person.3.fill"}
                    style={styles.playerIcon}
                    tintColor={colors.text}
                  />
                  <Text style={styles.playerChoiceText}>
                    {count === 4 ? "4+" : count}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : recommendation ? (
        <>
          <View style={styles.resultContext}>
            <View>
              <Text style={styles.resultEyebrow}>YOUR PICK</Text>
              <Text style={styles.resultContextText}>
                {intentFor(intent).label} ·{" "}
                {setup === "none" ? "nothing needed" : "some setup is fine"} ·{" "}
                {players === 4 ? "4+ players" : `${players} players`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => setShowResult(false)}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deckCard}>
            <IdeaArtwork id={recommendation.id} title={recommendation.title} />
            <View style={styles.cardBody}>
              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <SymbolView
                    name="clock.fill"
                    style={styles.metaIcon}
                    tintColor={colors.text}
                  />
                  <Text style={styles.metaPillText}>
                    {recommendation.durationMin}–{recommendation.durationMax} min
                  </Text>
                </View>
                <View style={styles.metaPill}>
                  <SymbolView
                    name={
                      recommendation.materialCount === 0
                        ? "checkmark.circle.fill"
                        : "shippingbox.fill"
                    }
                    style={styles.metaIcon}
                    tintColor={colors.text}
                  />
                  <Text style={styles.metaPillText}>
                    {recommendation.materialCount === 0
                      ? "Nothing needed"
                      : "A few things"}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardTitle}>{recommendation.title}</Text>
              <Text style={styles.cardPromise}>{recommendation.promise}</Text>

              <TouchableOpacity
                style={styles.openButton}
                onPress={() =>
                  hasLifetimeAccess || isStarterIdea(recommendation.id)
                    ? router.push(`/activity/${recommendation.id}`)
                    : router.push("/unlock" as never)
                }
              >
                <Text style={styles.openButtonText}>
                  {hasLifetimeAccess || isStarterIdea(recommendation.id)
                    ? "See how to play"
                    : "Unlock this idea"}
                </Text>
                <SymbolView
                  name="arrow.right"
                  style={styles.openArrow}
                  tintColor={colors.surface}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.swapButton}
                onPress={tryAnotherIdea}
              >
                <SymbolView
                  name="shuffle"
                  style={styles.swapIcon}
                  tintColor={colors.cobalt}
                />
                <Text style={styles.swapButtonText}>Not this one</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.pickerCard}>
          <Text style={styles.pickerTitle}>Let&apos;s try a different mix.</Text>
          <Text style={styles.pickerIntro}>
            Change one answer and we&apos;ll find another way in.
          </Text>
          <TouchableOpacity
            style={styles.findButton}
            onPress={() => setShowResult(false)}
          >
            <Text style={styles.findButtonText}>Change my answers</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>

      {!showResult && (
        <View style={styles.stickyFooter}>
          <TouchableOpacity style={styles.findButton} onPress={findIdea}>
            <Text style={styles.findButtonText}>Try this</Text>
            <SymbolView
              name="arrow.right"
              style={styles.openArrow}
              tintColor={colors.surface}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cobalt },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  scrollWithFooter: { paddingBottom: 104 },
  pickerCard: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.text,
    padding: spacing.lg,
    boxShadow: "7px 8px 0 rgba(24,34,59,0.95)",
  },
  pickerEyebrow: {
    ...typography.caption,
    color: colors.cobalt,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  pickerTitle: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -1.1,
    color: colors.text,
    marginTop: 3,
  },
  pickerIntro: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  intentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  intentCard: {
    width: "48.5%",
    minHeight: 104,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.sm,
    position: "relative",
  },
  intentCardSelected: {
    borderColor: colors.cobalt,
    borderWidth: 2.5,
    backgroundColor: "#EEF2FF",
  },
  intentIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    transform: [{ rotate: "-3deg" }],
  },
  intentIcon: { width: 20, height: 20 },
  intentLabel: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "900",
    color: colors.text,
  },
  intentNote: {
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  selectedIcon: {
    width: 19,
    height: 19,
    position: "absolute",
    right: 8,
    top: 8,
  },
  setupQuestion: {
    ...typography.headline,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: "900",
  },
  setupRow: { flexDirection: "row", gap: spacing.sm },
  setupChoice: {
    flex: 1,
    minHeight: 46,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  setupChoiceSelected: { backgroundColor: colors.sun },
  setupChoiceText: {
    ...typography.callout,
    color: colors.text,
    fontWeight: "700",
  },
  setupChoiceTextSelected: { fontWeight: "900" },
  playersRow: { flexDirection: "row", gap: spacing.sm },
  playerChoice: {
    flex: 1,
    minHeight: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.text,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  playerChoiceSelected: { backgroundColor: colors.sun, borderWidth: 2.5 },
  playerIcon: { width: 20, height: 20 },
  playerChoiceText: {
    ...typography.headline,
    color: colors.text,
    fontWeight: "900",
  },
  stickyFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  findButton: {
    minHeight: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  findButtonText: {
    ...typography.headline,
    color: colors.surface,
    fontWeight: "800",
  },
  resultContext: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
  },
  resultEyebrow: {
    ...typography.caption,
    color: "#DCE4FF",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  resultContextText: {
    ...typography.callout,
    color: colors.surface,
    fontWeight: "700",
    marginTop: 2,
  },
  changeButton: {
    paddingHorizontal: spacing.md,
    minHeight: 40,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.surface,
    justifyContent: "center",
  },
  changeButtonText: {
    ...typography.callout,
    color: colors.surface,
    fontWeight: "800",
  },
  deckCard: {
    overflow: "hidden",
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.text,
    boxShadow: "7px 8px 0 rgba(24,34,59,0.95)",
  },
  cardBody: { padding: spacing.lg },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceWarm,
  },
  metaIcon: { width: 14, height: 14 },
  metaPillText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 35,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1.4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardPromise: {
    fontSize: 17,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  openButton: {
    minHeight: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  openButtonText: {
    ...typography.headline,
    color: colors.surface,
    fontWeight: "800",
  },
  openArrow: { width: 18, height: 18 },
  swapButton: {
    minHeight: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  swapIcon: { width: 17, height: 17 },
  swapButtonText: {
    ...typography.body,
    color: colors.cobalt,
    fontWeight: "700",
  },
});
