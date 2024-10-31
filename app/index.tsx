import { router } from "expo-router";
import { useAuth } from "../services/supabase/AuthProvider";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (session) {
    router.replace("/Home");
  } else {
    router.replace("/auth");
  }

  return <></>;
};

export default index;
