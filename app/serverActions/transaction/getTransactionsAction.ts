"use server";
import { Transaction } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export interface GetTransactionsParams {
  buyerId?: string;
  vendorId?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Transaction;
  sortOrder?: "asc" | "desc";
}

export async function getTransactionsAction(
  params: GetTransactionsParams = {}
): Promise<Transaction[]> {
  const supabase = supabaseServer();
  const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = params;

  let query = supabase.from("transactions").select("*");

  if (params.buyerId) query = query.eq("buyer_id", params.buyerId);
  if (params.vendorId) query = query.eq("vendor_id", params.vendorId);
  if (params.status) query = query.eq("status", params.status);

  const sortBySnake = camelToSnake(sortBy as string);
  query = query.order(sortBySnake, { ascending: sortOrder === "asc" });
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw error;
  return keysToCamel<Transaction[]>(data);
}
