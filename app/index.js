import { View, Text } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../services/supabase/AuthProvider";

export default Index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (session) {
    router.push("/Home");
  } else {
    router.push("/auth");
  }

  return <></>;
};
