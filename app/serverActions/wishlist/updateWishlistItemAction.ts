"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { UpdateWishlistItemInput, WishlistItem } from "@/entities/wishlist/types/types";

export const updateWishlistItemAction = async (input: UpdateWishlistItemInput): Promise<WishlistItem> => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("wishlist")
    .update({ ...input, updatedAt: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();
  if (error) throw error;
  return data as WishlistItem;
};
