"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { CreateWishlistItemInput, WishlistItem } from "@/entities/wishlist/types/types";
import { keysToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const createWishlistItemAction = async (input: CreateWishlistItemInput): Promise<WishlistItem> => {
  const supabase = supabaseServer();

  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("wishlist")
    .insert([{ 
      ...payload, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    }])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<WishlistItem>(data);
};
