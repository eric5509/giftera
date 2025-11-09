"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import {
  UpdateWishlistItemInput,
  WishlistItem,
} from "@/entities/wishlist/types/types";
import { keysToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const updateWishlistItemAction = async (
  input: UpdateWishlistItemInput
): Promise<WishlistItem> => {
  const supabase = await supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("wishlist")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<WishlistItem>(data);
};
