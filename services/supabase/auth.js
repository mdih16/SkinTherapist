import supabase from "./supabaseClient";

export const signUp = async (email, password) => {
  console.log(supabase);
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
};

export const login = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
};

export const resetPassword = async (email) => {
  const { user, error } = await supabase.auth.resetPasswordForEmail(email, {
    //redirectTo: "https://example.com/update-password",
  });
  if (error) throw error;
  return user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
