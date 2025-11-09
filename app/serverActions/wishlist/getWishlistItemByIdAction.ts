"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { WishlistItem } from "@/entities/wishlist/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const getWishlistItemByIdAction = async (
  id: string
): Promise<WishlistItem> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel<WishlistItem>(data);
};
