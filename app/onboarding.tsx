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
import { colors, spacing, typography, borderRadius } from "../src/theme";
import { setJSON, STORAGE_KEYS } from "../src/lib/storage";
import type { AgeBand } from "../src/types";

const AGE_BANDS: { value: AgeBand; label: string }[] = [
  { value: "1-2", label: "1–2 years" },
  { value: "3-4", label: "3–4 years" },
  { value: "5-6", label: "5–6 years" },
  { value: "7-8", label: "7–8 years" },
  { value: "9-10", label: "9–10 years" },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedAges, setSelectedAges] = useState<AgeBand[]>([]);
  const [childCount, setChildCount] = useState(1);

  const toggleAge = (age: AgeBand) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const handleStart = async () => {
    await setJSON(STORAGE_KEYS.onboardingComplete, true);
    await setJSON(STORAGE_KEYS.childAgeBands, selectedAges);
    await setJSON(STORAGE_KEYS.childCount, childCount);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.logo}>Try This</Text>
          <Text style={styles.tagline}>
            One good thing to do together, right now.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How many kids?</Text>
          <View style={styles.countRow}>
            {[1, 2, 3, 4].map((n) => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.countButton,
                  childCount === n && styles.countButtonActive,
                ]}
                onPress={() => setChildCount(n)}
              >
                <Text
                  style={[
                    styles.countText,
                    childCount === n && styles.countTextActive,
                  ]}
                >
                  {n}{n === 4 ? "+" : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ages?</Text>
          <Text style={styles.sectionSubtitle}>
            Choose at least one age range
          </Text>
          <View style={styles.ageGrid}>
            {AGE_BANDS.map(({ value, label }) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.ageButton,
                  selectedAges.includes(value) && styles.ageButtonActive,
                ]}
                onPress={() => toggleAge(value)}
              >
                <Text
                  style={[
                    styles.ageText,
                    selectedAges.includes(value) && styles.ageTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[
            styles.startButton,
            selectedAges.length === 0 && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={selectedAges.length === 0}
        >
          <Text style={styles.startButtonText}>
            {selectedAges.length === 0
              ? "Choose an age to continue"
              : "Find something to do"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.privacyNote}>
          No account needed. Everything stays on your phone.
        </Text>
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
    padding: spacing.lg,
    flexGrow: 1,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.largeTitle,
    fontSize: 36,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 17,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    ...typography.callout,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  countRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  countButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  countButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  countText: {
    ...typography.headline,
    color: colors.text,
  },
  countTextActive: {
    color: colors.primary,
  },
  ageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  ageButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  ageButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  ageText: {
    ...typography.body,
    fontWeight: "500",
    color: colors.text,
  },
  ageTextActive: {
    color: colors.primary,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  startButtonDisabled: {
    opacity: 0.4,
  },
  startButtonText: {
    ...typography.headline,
    color: "#FFFFFF",
    fontSize: 18,
  },
  privacyNote: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
});
