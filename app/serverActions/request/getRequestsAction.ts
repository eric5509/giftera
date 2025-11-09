"use server";

import { GetRequestsParams, Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getRequestsAction(params: GetRequestsParams = {}): Promise<Request[]> {
  const supabase = supabaseServer();

  let query = supabase.from("requests").select("*");

  if (params.userId) query = query.eq("user_id", params.userId);
  if (params.status) query = query.eq("status", params.status);

  const sortBy = params.sortBy ? camelToSnake(params.sortBy) : "created_at";
  const sortOrder = params.sortOrder || "desc";

  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = params.page * params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<Request[]>(data);
}
