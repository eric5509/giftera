"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { WishlistItem } from "@/entities/wishlist/types/types";

export const getWishlistItemByIdAction = async (id: string): Promise<WishlistItem> => {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("wishlist").select("*").eq("id", id).single();
  if (error) throw error;
  return data as WishlistItem;
};
