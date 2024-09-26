import supabase from "./supabaseClient";

export const signUp = async (email, password, first_name, skinConditions) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        //skinConditions: JSON.stringify(skinConditions),
      },
    },
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
};

export const resetPassword = async (email) => {
  const { user, error } = await supabase.auth.resetPasswordForEmail(email, {
    //redirectTo: "https://example.com/update-password",
  });
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
