import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { SymbolView } from "expo-symbols";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, typography, borderRadius } from "../../src/theme";
import { getActivityById } from "../../src/data/activities";
import { getGameById } from "../../src/data/conversation-games";
import {
  getSourceIdeaById,
  getSourceIdeaPlaybook,
} from "../../src/data/source-ideas";
import { setJSON, getJSON, STORAGE_KEYS } from "../../src/lib/storage";
import { IdeaArtwork } from "../../src/components/idea-artwork";
import { isStarterIdea } from "../../src/data/access";
import { getLifetimeStatus } from "../../src/services/purchases";

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const activity = getActivityById(id || "");
  const game = getGameById(id || "");
  const sourceIdea = getSourceIdeaById(id || "");
  const sourcePlaybook = sourceIdea
    ? getSourceIdeaPlaybook(sourceIdea)
    : null;
  const [isSaved, setIsSaved] = useState(false);
  const [accessLoaded, setAccessLoaded] = useState(false);
  const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);

  useEffect(() => {
    checkSaved();
  }, [id]);

  useEffect(() => {
    if (isStarterIdea(id || "")) {
      setAccessLoaded(true);
      return;
    }
    getLifetimeStatus()
      .then((status) => setHasLifetimeAccess(status.unlocked))
      .catch(() => setHasLifetimeAccess(false))
      .finally(() => setAccessLoaded(true));
  }, [id]);

  async function checkSaved() {
    const savedIdeas =
      (await getJSON<string[]>(STORAGE_KEYS.savedActivityIds)) || [];
    const legacySavedGames =
      (await getJSON<string[]>(STORAGE_KEYS.savedGameIds)) || [];
    setIsSaved(
      savedIdeas.includes(id || "") || legacySavedGames.includes(id || "")
    );
  }

  async function toggleSave() {
    const saved = await getJSON<string[]>(STORAGE_KEYS.savedActivityIds) || [];
    const updated = isSaved
      ? saved.filter((s) => s !== id)
      : [...saved, id || ""];
    await setJSON(STORAGE_KEYS.savedActivityIds, updated);
    setIsSaved(!isSaved);
  }

  if (!activity && !game && !sourceIdea) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Idea not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.errorLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!isStarterIdea(id || "") && (!accessLoaded || !hasLifetimeAccess)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.lockedContainer}>
          {!accessLoaded ? (
            <Text style={styles.lockedEyebrow}>CHECKING ACCESS…</Text>
          ) : (
            <>
              <View style={styles.lockedArt}>
                <IdeaArtwork
                  id={id || "locked-idea"}
                  title={activity?.title ?? game?.title ?? sourceIdea?.title ?? "Try This"}
                />
              </View>
              <Text style={styles.lockedEyebrow}>PART OF THE FULL LIBRARY</Text>
              <Text style={styles.lockedTitle}>
                {activity?.title ?? game?.title ?? sourceIdea?.title}
              </Text>
              <Text style={styles.lockedText}>
                Unlock every current and future idea with one purchase. No subscription or account.
              </Text>
              <TouchableOpacity
                style={styles.unlockButton}
                onPress={() => router.push("/unlock" as never)}
              >
                <Text style={styles.unlockButtonText}>See lifetime unlock</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (sourceIdea) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.artFrame}>
            <IdeaArtwork id={sourceIdea.id} title={sourceIdea.title} />
          </View>
          <View style={styles.header}>
            <Text style={styles.quickLabel}>TRY THIS</Text>
            <Text style={styles.title}>{sourceIdea.title}</Text>
            <Text style={styles.promise}>{sourcePlaybook?.summary}</Text>
            <TouchableOpacity style={styles.inlineSave} onPress={toggleSave}>
              <SymbolView
                name={isSaved ? "heart.fill" : "heart"}
                style={styles.saveIcon}
                tintColor={colors.cobalt}
              />
              <Text style={styles.inlineSaveText}>{isSaved ? "Saved" : "Save"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to play</Text>
            {sourcePlaybook?.steps.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {sourceIdea.sourceUrl && (
            <View style={styles.sourceCard}>
              <Text style={styles.sourceEyebrow}>ORIGINAL DEMONSTRATION</Text>
              <Text style={styles.sourceTitle}>Watch how it&apos;s done</Text>
              <Text style={styles.sourceText}>
                This idea depends on a visual technique, so the original
                demonstration is part of the instructions.
              </Text>
              <TouchableOpacity
                style={styles.sourceButton}
                onPress={() => void Linking.openURL(sourceIdea.sourceUrl!)}
              >
                <Text style={styles.sourceButtonText}>Open demonstration</Text>
                <SymbolView
                  name="arrow.up.right"
                  style={styles.sourceIcon}
                  tintColor={colors.surface}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Try another way</Text>
            <Text style={styles.bodyText}>{sourcePlaybook?.remix}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (game) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.artFrame}>
            <IdeaArtwork id={game.id} title={game.title} />
          </View>
          <View style={styles.header}>
            <Text style={styles.quickLabel}>TRY THIS</Text>
            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.promise}>{game.oneBreathRule}</Text>
            <TouchableOpacity style={styles.inlineSave} onPress={toggleSave}>
              <SymbolView
                name={isSaved ? "heart.fill" : "heart"}
                style={styles.saveIcon}
                tintColor={colors.cobalt}
              />
              <Text style={styles.inlineSaveText}>{isSaved ? "Saved" : "Save"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to start</Text>
            <Text style={styles.introLine}>&quot;{game.firstPrompt}&quot;</Text>
            <Text style={styles.bodyText}>{game.adultModel}</Text>
          </View>

          <View style={styles.rolesRow}>
            <View style={styles.roleCard}>
              <Text style={styles.roleLabel}>Make it easier</Text>
              <Text style={styles.roleText}>{game.easier}</Text>
            </View>
            <View style={styles.roleCard}>
              <Text style={styles.roleLabel}>Make it harder</Text>
              <Text style={styles.roleText}>{game.harder}</Text>
            </View>
          </View>

          <View style={[styles.section, { marginTop: spacing.lg }]}>
            <Text style={styles.sectionTitle}>Make it yours</Text>
            <View style={styles.remixRow}>
              <Text style={styles.remixBullet}>↻</Text>
              <Text style={styles.remixText}>{game.childRemix}</Text>
            </View>
            <View style={styles.remixRow}>
              <Text style={styles.remixBullet}>↻</Text>
              <Text style={styles.remixText}>{game.mixedAges}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>When you&apos;re done</Text>
            <Text style={styles.bodyText}>{game.closeLine}</Text>
          </View>

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!activity) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.artFrame}>
          <IdeaArtwork id={activity.id} title={activity.title} />
        </View>
        <View style={styles.header}>
          <Text style={styles.quickLabel}>TRY THIS</Text>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.promise}>{activity.oneLinePromise}</Text>
          <TouchableOpacity style={styles.inlineSave} onPress={toggleSave}>
            <SymbolView
              name={isSaved ? "heart.fill" : "heart"}
              style={styles.saveIcon}
              tintColor={colors.cobalt}
            />
            <Text style={styles.inlineSaveText}>{isSaved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  artFrame: {
    overflow: "hidden",
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.text,
    marginBottom: spacing.lg,
    boxShadow: "5px 6px 0 rgba(24,34,59,0.95)",
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
    marginBottom: spacing.xl,
  },
  quickLabel: {
    ...typography.caption,
    color: colors.cobalt,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 38,
    lineHeight: 41,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  promise: {
    fontSize: 18,
    lineHeight: 25,
    color: colors.textSecondary,
  },
  inlineSave: {
    alignSelf: "flex-start",
    minHeight: 42,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.text,
    borderRadius: borderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: colors.surface,
  },
  saveIcon: { width: 17, height: 17 },
  inlineSaveText: {
    ...typography.callout,
    color: colors.primary,
    fontWeight: "600",
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "900",
    letterSpacing: -0.5,
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
  sourceCard: {
    backgroundColor: colors.cobalt,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.text,
  },
  sourceEyebrow: {
    ...typography.caption,
    color: "#DCE4FF",
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  sourceTitle: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "900",
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  sourceText: {
    ...typography.body,
    color: "#DCE4FF",
    marginBottom: spacing.md,
  },
  sourceButton: {
    minHeight: 52,
    borderRadius: borderRadius.md,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  sourceButtonText: {
    ...typography.headline,
    color: colors.surface,
    fontWeight: "800",
  },
  sourceIcon: { width: 17, height: 17 },
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
    backgroundColor: colors.surfaceWarm,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.text,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.sun,
    borderWidth: 1.5,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
    marginTop: 2,
  },
  stepNumberText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
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
  lockedContainer: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
  },
  lockedArt: {
    height: 190,
    borderRadius: borderRadius.xl,
    overflow: "hidden",
    marginBottom: spacing.xl,
  },
  lockedEyebrow: {
    ...typography.caption,
    color: colors.cobalt,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  lockedTitle: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  lockedText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 25,
    marginBottom: spacing.lg,
  },
  unlockButton: {
    minHeight: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  unlockButtonText: {
    ...typography.headline,
    color: colors.surface,
  },
  spacer: {
    height: spacing.xl,
  },
});
