import { Tabs } from "expo-router";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../src/theme";

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>{symbol}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="◉" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="◈" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="our-things"
        options={{
          title: "Our Things",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="♡" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="grown-ups"
        options={{
          title: "Grown-ups",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="⚙" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    color: colors.textTertiary,
  },
  iconFocused: {
    color: colors.primary,
  },
});
