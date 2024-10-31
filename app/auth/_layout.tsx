import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../services/supabase/AuthProvider";

export default function AuthLayout() {
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.replace("/Home");
    } else {
      router.replace("/auth");
    }
  }, [session]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="Signup" />
    </Stack>
  );
}
