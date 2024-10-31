import React, { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../services/supabase/AuthProvider";

export default function RootLayout() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.replace("/Home");
      } else {
        router.replace("/auth");
      }
    }
  }, [session, loading]);

  if (loading) {
    return <View style={{ flex: 1 }} />;
  }
}
