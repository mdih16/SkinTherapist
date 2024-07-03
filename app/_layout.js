import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    // Set navigation bar color on Android
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent />
      <Slot />
    </SafeAreaProvider>
  );
}
