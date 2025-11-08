"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { WishlistItem, GetWishlistItemsParams } from "@/entities/wishlist/types/types";

export const getAllWishlistItemsAction = async (params: GetWishlistItemsParams = {}): Promise<WishlistItem[]> => {
  const supabase = supabaseServer();
  let query = supabase.from("wishlist").select("*");

  if (params.userId) query = query.eq("userId", params.userId);
  if (params.category) query = query.eq("category", params.category);
  if (params.searchQuery) query = query.ilike("title", `%${params.searchQuery}%`);

  // Sorting
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error } = await query;
  if (error) throw error;
  return data as WishlistItem[];
};
