import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { colors, spacing, typography, borderRadius } from "../../src/theme";

export default function GrownUpsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Try This</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Try This helps families find one good thing to do together — right now, with what you already have.
            </Text>
            <Text style={styles.cardText}>
              No accounts required. Your data stays on your phone. No ads, no tracking, no feed.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Public beta</Text>
          <View style={styles.betaCard}>
            <Text style={styles.betaEyebrow}>EVERY IDEA IS INCLUDED</Text>
            <Text style={styles.betaTitle}>Free while we learn</Text>
            <Text style={styles.betaText}>
              Try the complete library and tell us what your family actually enjoys. No purchase or account required.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Notifications</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Accessibility</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Export your data</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Delete everything</Text>
            <Text style={[styles.menuArrow, { color: colors.danger }]}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Linking.openURL("mailto:support@mirror.photos")}
          >
            <Text style={styles.menuText}>Contact us</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Privacy policy</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Try This v1.0.0</Text>
          <Text style={styles.footerText}>trythis.fun</Text>
          <Text style={styles.footerText}>by Mirror Photos LLC</Text>
        </View>
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
  section: {
    marginBottom: spacing.lg,
  },
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardText: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  menuItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  betaCard: {
    backgroundColor: colors.sun,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.text,
  },
  betaEyebrow: {
    ...typography.caption,
    color: colors.cobalt,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  betaTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  betaText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  menuText: {
    ...typography.body,
    color: colors.text,
  },
  menuArrow: {
    fontSize: 16,
    color: colors.textTertiary,
  },
  footer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  footerText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
});
