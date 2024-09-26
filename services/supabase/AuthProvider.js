import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import supabase from "./supabaseClient";

const AuthContext = createContext({ session: null, loading: true, user: null });

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }, []);

  const updateUserState = useCallback(
    async (session) => {
      if (session?.user) {
        const userData = await fetchUser(session.user.id);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    },
    [fetchUser]
  );

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          setSession(session);
          await updateUserState(session);
        }
      } catch (error) {
        console.error("Error in initializeAuth:", error);
        if (mounted) setLoading(false);
      }
    }

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setSession(session);
          await updateUserState(session);
        }
      }
    );

    return () => {
      mounted = false;
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [updateUserState]);

  const value = {
    session,
    loading,
    user,
    refetchUser: () => updateUserState(session),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
