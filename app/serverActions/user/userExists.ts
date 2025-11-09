"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export const userExistsByEmail = async (email: string): Promise<boolean> => {
  const supabase = supabaseServer();
  const { data: existingUser, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found, not a real error
    console.error("Error checking user:", error);
    return false; // optionally throw or handle differently
  }
  return !!existingUser; // true if user exists, false otherwise
};

export const userExistsByPhone = async (phone: string): Promise<boolean> => {
  const supabase = supabaseServer();
  const { data: existingUser, error } = await supabase
    .from("users")
    .select("id")
    .eq("phone", phone)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found, not a real error
    console.error("Error checking user:", error);
    return false; // optionally throw or handle differently
  }
  return !!existingUser; // true if user exists, false otherwise
};
