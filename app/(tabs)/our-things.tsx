import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { colors, spacing, typography, borderRadius, modeColor, modeBgColor } from "../../src/theme";
import { getJSON, STORAGE_KEYS } from "../../src/lib/storage";
import { getIdeaById, type IdeaSummary } from "../../src/data/ideas";

export default function OurThingsScreen() {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState<IdeaSummary[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    const savedActs = await getJSON<string[]>(STORAGE_KEYS.savedActivityIds) || [];
    const savedGames = await getJSON<string[]>(STORAGE_KEYS.savedGameIds) || [];
    const recent = await getJSON<string[]>(STORAGE_KEYS.recentActivityIds) || [];

    const items = [...new Set([...savedActs, ...savedGames])]
      .map((id) => getIdeaById(id))
      .filter((item): item is IdeaSummary => Boolean(item));

    setSavedItems(items);
    setRecentIds(recent);
  }

  const recentItems = recentIds
    .map((id) => getIdeaById(id))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {recentItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent</Text>
            {recentItems.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => {
                  router.push(`/activity/${item.id}`);
                }}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {item.materialCount === 0
                    ? "NO MATERIALS"
                    : `${item.durationMin}–${item.durationMax} MIN`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved</Text>
          {savedItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Nothing saved yet</Text>
              <Text style={styles.emptyText}>
                Tap the heart on any activity to save it here for quick access.
              </Text>
            </View>
          ) : (
            savedItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => {
                  router.push(`/activity/${item.id}`);
                }}
              >
                <View style={styles.cardHeader}>
                  {item.mode && (
                    <View style={[styles.modeBadge, { backgroundColor: modeBgColor(item.mode) }]}>
                      <Text style={[styles.modeBadgeText, { color: modeColor(item.mode) }]}>
                        {item.mode.toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.heartIcon}>♥</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardPromise} numberOfLines={1}>
                  {item.promise}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    ...typography.headline,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontSize: 13,
  },
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
  heartIcon: { fontSize: 16, color: colors.primary },
  cardTitle: { ...typography.headline, color: colors.text, marginBottom: 2 },
  cardSubtitle: { ...typography.caption, color: colors.textTertiary },
  cardPromise: { ...typography.callout, color: colors.textSecondary },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: { ...typography.headline, color: colors.text, marginBottom: spacing.sm },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: "center" },
});
