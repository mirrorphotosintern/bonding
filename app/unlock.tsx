import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SymbolView } from "expo-symbols";
import { colors, spacing, typography, borderRadius } from "../src/theme";
import {
  getLifetimeStatus,
  LIFETIME_PRICE_FALLBACK,
  purchaseLifetime,
  restoreLifetime,
} from "../src/services/purchases";

export default function UnlockScreen() {
  const [price, setPrice] = useState(LIFETIME_PRICE_FALLBACK);
  const [unlocked, setUnlocked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getLifetimeStatus()
      .then((status) => {
        setPrice(status.price);
        setUnlocked(status.unlocked);
      })
      .catch(() => undefined);
  }, []);

  async function buy() {
    setBusy(true);
    try {
      const success = await purchaseLifetime();
      setUnlocked(success);
      if (success) Alert.alert("You’re all set", "Every Try This idea is now unlocked on this store account.");
    } catch (error) {
      Alert.alert("Couldn’t complete purchase", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function restore() {
    setBusy(true);
    try {
      const success = await restoreLifetime();
      setUnlocked(success);
      Alert.alert(success ? "Purchase restored" : "Nothing to restore", success ? "Your full library is unlocked." : "We couldn’t find a lifetime purchase for this store account.");
    } catch (error) {
      Alert.alert("Couldn’t restore", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroIcon}>
          <SymbolView name="sparkles" style={styles.icon} tintColor={colors.text} />
        </View>
        <Text style={styles.eyebrow}>ONE-TIME FAMILY UNLOCK</Text>
        <Text style={styles.title}>{unlocked ? "Everything is yours." : "More good ideas. No subscription."}</Text>
        <Text style={styles.subtitle}>
          Keep the free starter collection, or unlock the complete Try This library with one purchase.
        </Text>

        <View style={styles.list}>
          {[
            "The complete, growing activity library",
            "Ideas for movement, making, talking, thinking, and real family jobs",
            "Clear steps, easier versions, and playful remixes",
            "No account, ads, recurring bill, or email required",
          ].map((item) => (
            <View key={item} style={styles.row}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.buyButton, (busy || unlocked) && styles.disabled]}
          onPress={buy}
          disabled={busy || unlocked}
        >
          {busy ? <ActivityIndicator color={colors.surface} /> : <Text style={styles.buyText}>{unlocked ? "Lifetime access unlocked" : `Unlock forever · ${price}`}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.restoreButton} onPress={restore} disabled={busy}>
          <Text style={styles.restoreText}>Restore purchase</Text>
        </TouchableOpacity>
        <Text style={styles.footnote}>Price is shown in your local App Store or Google Play currency. One purchase applies to this store account and platform.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl },
  heroIcon: { width: 72, height: 72, borderRadius: 22, backgroundColor: colors.sun, borderWidth: 2, borderColor: colors.text, justifyContent: "center", alignItems: "center", marginBottom: spacing.lg },
  icon: { width: 34, height: 34 },
  eyebrow: { ...typography.caption, color: colors.cobalt, fontWeight: "800", letterSpacing: 1.4, marginBottom: spacing.sm },
  title: { ...typography.largeTitle, color: colors.text, marginBottom: spacing.md },
  subtitle: { ...typography.body, color: colors.textSecondary, fontSize: 18, lineHeight: 27 },
  list: { marginVertical: spacing.xl, gap: spacing.md },
  row: { flexDirection: "row", alignItems: "flex-start" },
  check: { width: 30, fontSize: 20, fontWeight: "900", color: colors.cobalt },
  rowText: { ...typography.body, color: colors.text, flex: 1 },
  buyButton: { minHeight: 58, borderRadius: borderRadius.md, backgroundColor: colors.text, justifyContent: "center", alignItems: "center", paddingHorizontal: spacing.md },
  disabled: { opacity: 0.6 },
  buyText: { ...typography.headline, color: colors.surface },
  restoreButton: { minHeight: 50, justifyContent: "center", alignItems: "center" },
  restoreText: { ...typography.body, color: colors.cobalt, fontWeight: "700" },
  footnote: { ...typography.caption, color: colors.textTertiary, textAlign: "center", lineHeight: 18 },
});
