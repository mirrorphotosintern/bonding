import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet } from "react-native";
import { colors } from "../../src/theme";

function TabIcon({ symbol, color }: { symbol: string; color: string }) {
  return (
    <SymbolView name={symbol as never} style={styles.icon} tintColor={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.cobalt,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 84,
          paddingTop: 8,
        },
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "800" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="sparkles" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="our-things"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="heart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grown-ups"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="person.crop.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: { width: 23, height: 23 },
});
