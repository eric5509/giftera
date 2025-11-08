"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const deleteWishlistItemAction = async (id: string) => {
  const supabase = supabaseServer();
  const { error } = await supabase.from("wishlist").delete().eq("id", id);
  if (error) throw error;
  return { success: true, message: "Wishlist item deleted successfully" };
};
