"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { WishlistItem, GetWishlistItemsParams } from "@/entities/wishlist/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export const getWishlistItemsAction = async (params: GetWishlistItemsParams = {}): Promise<WishlistItem[]> => {
  const supabase = supabaseServer();
  let query = supabase.from("wishlist").select("*");

  if (params.userId) query = query.eq("user_id", params.userId);
  if (params.category) query = query.eq("category", params.category);
  if (params.searchQuery) query = query.ilike("title", `%${params.searchQuery}%`);

  const sortBy = params.sortBy ? camelToSnake(params.sortBy) : "created_at";
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = from + params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<WishlistItem[]>(data);
};
