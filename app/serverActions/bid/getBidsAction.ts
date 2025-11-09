"use server";

import { GetBidsParams, Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getBidsAction(
  params: GetBidsParams = {}
): Promise<Bid[]> {
  const supabase = await supabaseServer();

  let query = supabase.from("bids").select("*");

  if (params.requestId) query = query.eq("request_id", params.requestId);
  if (params.vendorId) query = query.eq("vendor_id", params.vendorId);
  if (params.status) query = query.eq("status", params.status);

  const sortBy = params.sortBy
    ? params.sortBy.replace(/[A-Z]/g, (l) => `_${l.toLowerCase()}`)
    : "created_at";
  const sortOrder = params.sortOrder || "desc";

  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = params.page * params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<Bid[]>(data); // ✅ handles arrays and nested objects
}
