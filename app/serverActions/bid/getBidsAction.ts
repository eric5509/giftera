"use server";

import { GetBidsParams, Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getBidsAction(params: GetBidsParams = {}): Promise<Bid[]> {
  const supabase = supabaseServer();

  let query = supabase.from("bids").select("*");

  if (params.requestId) query = query.eq("requestId", params.requestId);
  if (params.vendorId) query = query.eq("vendorId", params.vendorId);
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
