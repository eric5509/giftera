"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const deleteFeaturedListingAction = async (id: string) => {
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("featured_listings")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return { success: true, message: "Featured listing deleted successfully" };
};
