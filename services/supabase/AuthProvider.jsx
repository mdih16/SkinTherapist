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

  useEffect(() => {
    const setupAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const userData = await fetchUser(session.user.id);
        setUser(userData);
      }

      setLoading(false);
    };

    setupAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user) {
        const userData = await fetchUser(session.user.id);
        setUser(userData);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
