import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Sofia_400Regular } from "@expo-google-fonts/sofia";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Stack } from "expo-router";
import AuthProvider from "../services/supabase/AuthProvider";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Sofia_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent />
      <AuthProvider>
        <Stack options={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
