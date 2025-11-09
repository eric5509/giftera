"use server";

import { Buyer } from "@/entities/buyer/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getBuyersAction(params?: {
  userId?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Buyer;
  sortOrder?: "asc" | "desc";
}): Promise<Buyer[]> {
  const supabase = await supabaseServer();
  const {
    userId,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params || {};

  let query = supabase.from("buyers").select("*");

  if (userId) query = query.eq("user_id", userId); // db uses snake_case

  const sortBySnake = camelToSnake(sortBy); // convert camelCase to snake_case for DB
  query = query
    .order(sortBySnake, { ascending: sortOrder === "asc" })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<Buyer[]>(data); // convert all keys back to camelCase
}
