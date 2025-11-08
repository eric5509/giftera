"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { CreateWishlistItemInput, WishlistItem } from "@/entities/wishlist/types/types";

export const createWishlistItemAction = async (input: CreateWishlistItemInput): Promise<WishlistItem> => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("wishlist")
    .insert([{ ...input, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }])
    .select()
    .single();
  if (error) throw error;
  return data as WishlistItem;
};
