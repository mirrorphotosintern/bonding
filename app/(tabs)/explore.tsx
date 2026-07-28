import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius, modeColor, modeBgColor } from "../../src/theme";
import { activities } from "../../src/data/activities";
import type { ActivityMode } from "../../src/types";

const MODES: { value: ActivityMode | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: colors.primary },
  { value: "make", label: "Make", color: colors.make },
  { value: "move", label: "Move", color: colors.move },
  { value: "think", label: "Think", color: colors.think },
  { value: "talk", label: "Talk", color: colors.talk },
  { value: "help", label: "Help", color: colors.help },
  { value: "perform", label: "Perform", color: colors.perform },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ActivityMode | "all">("all");

  const filtered = selectedMode === "all"
    ? activities.filter((a) => a.status === "published")
    : activities.filter((a) => a.mode === selectedMode && a.status === "published");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {MODES.map((mode) => (
            <TouchableOpacity
              key={mode.value}
              style={[
                styles.filterChip,
                selectedMode === mode.value && { backgroundColor: mode.color, borderColor: mode.color },
              ]}
              onPress={() => setSelectedMode(mode.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedMode === mode.value && styles.filterTextActive,
                ]}
              >
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filtered.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.card}
            onPress={() => router.push(`/activity/${activity.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.modeBadge, { backgroundColor: modeBgColor(activity.mode) }]}>
                <Text style={[styles.modeBadgeText, { color: modeColor(activity.mode) }]}>
                  {activity.mode.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.cardDuration}>
                {activity.durationPlayMin}–{activity.durationPlayMax} min
              </Text>
            </View>
            <Text style={styles.cardTitle}>{activity.title}</Text>
            <Text style={styles.cardPromise} numberOfLines={2}>
              {activity.oneLinePromise}
            </Text>
            <View style={styles.cardMeta}>
              <Text style={styles.cardMetaText}>
                {activity.materials.length === 0 ? "No materials" : `${activity.materials.length} materials`}
              </Text>
              <Text style={styles.cardMetaDot}>·</Text>
              <Text style={styles.cardMetaText}>
                {activity.mess === "none" ? "No mess" : activity.mess}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  filterRow: { marginBottom: spacing.md },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  filterText: { ...typography.callout, color: colors.text },
  filterTextActive: { color: "#FFFFFF", fontWeight: "600" },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  modeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  modeBadgeText: { ...typography.caption, fontWeight: "700", letterSpacing: 1 },
  cardDuration: { ...typography.caption, color: colors.textTertiary },
  cardTitle: { ...typography.headline, color: colors.text, marginBottom: spacing.xs },
  cardPromise: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm },
  cardMeta: { flexDirection: "row", alignItems: "center" },
  cardMetaText: { ...typography.caption, color: colors.textTertiary },
  cardMetaDot: { ...typography.caption, color: colors.textTertiary, marginHorizontal: spacing.sm },
});
