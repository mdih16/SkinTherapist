import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useAuth } from "../../services/supabase/AuthProvider";
import { useEffect } from "react";

export default function TabLayout() {
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.replace("/Home");
    } else {
      router.replace("/auth");
    }
  }, [session]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5B7F7E",
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: 64 },
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Hem",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Scanner"
        options={{
          title: "Skanna",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="line-scan" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Min profil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-woman-profile"
              size={32}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="[Product]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
