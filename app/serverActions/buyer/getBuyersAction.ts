"use server";

import { Buyer } from "@/entities/buyer/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getBuyersAction(params?: {
  userId?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Buyer;
  sortOrder?: "asc" | "desc";
}): Promise<Buyer[]> {
  const supabase = supabaseServer();
  const { userId, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = params || {};

  let query = supabase.from("buyers").select("*");

  if (userId) query = query.eq("userId", userId);

  query = query.order(sortBy, { ascending: sortOrder === "asc" })
               .range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw error;

  return data;
}
