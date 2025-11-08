"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const deleteFeaturedListingAction = async (id: string) => {
  const supabase = supabaseServer();
  const { error } = await supabase.from("featuredListings").delete().eq("id", id);

  if (error) throw error;
  return { success: true, message: "Featured listing deleted successfully" };
};
