"use server";

import { GetRequestsParams, Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getRequestsAction(params: GetRequestsParams = {}): Promise<Request[]> {
  const supabase = supabaseServer();

  let query = supabase.from("requests").select("*");

  if (params.userId) query = query.eq("userId", params.userId);
  if (params.status) query = query.eq("status", params.status);

  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = params.page * params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
