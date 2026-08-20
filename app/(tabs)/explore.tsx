import { useMemo, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { SymbolView } from "expo-symbols";
import { useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius } from "../../src/theme";
import { IdeaArtwork } from "../../src/components/idea-artwork";
import { ideas, type IdeaSummary } from "../../src/data/ideas";
import type { ActivityMode } from "../../src/types";

type Filter =
  | "all"
  | "no-materials"
  | "move"
  | "make"
  | "talk"
  | "imagine"
  | "help"
  | "kannada";

const FILTERS: {
  value: Filter;
  label: string;
  matches: (idea: IdeaSummary) => boolean;
}[] = [
  { value: "all", label: "All ideas", matches: () => true },
  {
    value: "no-materials",
    label: "No materials",
    matches: (idea) => idea.materialCount === 0,
  },
  {
    value: "move",
    label: "Get moving",
    matches: (idea) => idea.mode === "move",
  },
  {
    value: "make",
    label: "Make something",
    matches: (idea) => idea.mode === "make",
  },
  {
    value: "talk",
    label: "Talk, sing & tell",
    matches: (idea) => idea.mode === "talk",
  },
  {
    value: "imagine",
    label: "Imagine & guess",
    matches: (idea) => idea.mode === "think" || idea.mode === "perform",
  },
  {
    value: "help",
    label: "Do a family job",
    matches: (idea) => idea.mode === "help",
  },
  {
    value: "kannada",
    label: "ಕನ್ನಡ · Kannada games",
    matches: (idea) => idea.activity?.heritage?.collection === "kannada",
  },
];

const markerByMode: Record<ActivityMode, { color: string; symbol: string }> = {
  make: { color: colors.sun, symbol: "scissors" },
  move: { color: colors.coral, symbol: "figure.run" },
  think: { color: colors.lavender, symbol: "lightbulb.fill" },
  talk: { color: colors.mint, symbol: "quote.bubble.fill" },
  help: { color: colors.sun, symbol: "hands.sparkles.fill" },
  perform: { color: colors.cobalt, symbol: "wand.and.stars" },
};

function IdeaMarker({ mode }: { mode: ActivityMode }) {
  const marker = markerByMode[mode];
  return (
    <View style={[styles.marker, { backgroundColor: marker.color }]}>
      <SymbolView
        name={marker.symbol as never}
        style={styles.markerIcon}
        tintColor={mode === "perform" ? colors.surface : colors.text}
      />
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const active = FILTERS.find((filter) => filter.value === selectedFilter);
    return active ? ideas.filter(active.matches) : ideas;
  }, [selectedFilter]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.introBlock}>
        <Text style={styles.eyebrow}>PICK YOUR OWN</Text>
        <Text style={styles.intro}>What fits the moment?</Text>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => {
          const selected = selectedFilter === filter.value;
          return (
            <TouchableOpacity
              key={filter.value}
              style={[styles.filterChip, selected && styles.filterChipActive]}
              onPress={() => setSelectedFilter(filter.value)}
            >
              <Text style={[styles.filterText, selected && styles.filterTextActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedFilter === "kannada" && (
        <View style={styles.heritageIntro}>
          <Text style={styles.heritageEyebrow}>FOR LITTLE HANDS · 18 MONTHS AND UP</Text>
          <Text style={styles.heritageTitle}>ಕನ್ನಡ ಆಟಗಳು</Text>
          <Text style={styles.heritageCopy}>Rhymes to carry, tap, wiggle, serve, and tickle—each with Kannada words and an easy reading guide.</Text>
        </View>
      )}

      {filtered.map((idea) => (
        <TouchableOpacity
          key={idea.id}
          activeOpacity={0.82}
          style={styles.card}
          onPress={() => router.push(`/activity/${idea.id}`)}
        >
          {idea.activity?.heritage ? (
            <View style={styles.heritageArt}><IdeaArtwork id={idea.id} title={idea.title} compact /></View>
          ) : (
            <IdeaMarker mode={idea.mode} />
          )}
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardDuration}>
                {idea.durationMin}–{idea.durationMax} MIN
              </Text>
              {idea.materialCount === 0 && (
                <Text style={styles.zeroPrep}>NOTHING NEEDED</Text>
              )}
            </View>
            <Text style={styles.cardTitle}>{idea.title}</Text>
            <Text style={styles.cardPromise} numberOfLines={2}>
              {idea.promise}
            </Text>
            <View style={styles.cardAction}>
              <Text style={styles.cardActionText}>See the idea</Text>
              <SymbolView
                name="arrow.up.right"
                style={styles.arrow}
                tintColor={colors.cobalt}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  introBlock: { marginBottom: spacing.md },
  eyebrow: {
    ...typography.caption,
    color: colors.cobalt,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  intro: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.text,
    marginTop: 3,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingLeft: spacing.md,
    paddingRight: 8,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.text,
  },
  filterChipActive: {
    backgroundColor: colors.text,
  },
  filterText: { ...typography.callout, color: colors.text, fontWeight: "700" },
  filterTextActive: { color: colors.surface },
  filterCount: {
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    overflow: "hidden",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "900",
    color: colors.text,
    backgroundColor: colors.surfaceWarm,
  },
  filterCountActive: {
    color: colors.text,
    backgroundColor: colors.sun,
  },
  resultCount: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  heritageIntro: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.text,
    backgroundColor: colors.sun,
  },
  heritageEyebrow: {
    ...typography.caption,
    color: "#9C281D",
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  heritageTitle: {
    fontSize: 32,
    lineHeight: 39,
    color: colors.text,
    fontWeight: "900",
    marginBottom: spacing.xs,
  },
  heritageCopy: {
    ...typography.callout,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.text,
    flexDirection: "row",
    gap: spacing.md,
  },
  marker: {
    width: 72,
    height: 72,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    transform: [{ rotate: "-3deg" }],
  },
  markerIcon: { width: 32, height: 32 },
  heritageArt: {
    width: 96,
    height: 104,
    overflow: "hidden",
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.text,
    alignSelf: "center",
  },
  cardBody: { flex: 1, paddingVertical: 5, paddingRight: 4 },
  cardHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 5,
  },
  cardDuration: {
    fontSize: 10,
    color: colors.textTertiary,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  zeroPrep: {
    fontSize: 10,
    color: colors.cobalt,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 23,
    fontWeight: "900",
    letterSpacing: -0.5,
    color: colors.text,
    marginBottom: 3,
  },
  cardPromise: {
    fontSize: 13,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },
  cardActionText: { fontSize: 12, color: colors.cobalt, fontWeight: "800" },
  arrow: { width: 11, height: 11 },
});
