"use server";

import { Delivery, GetDeliveriesParams } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getDeliveriesAction(
  params: GetDeliveriesParams = {}
): Promise<Delivery[]> {
  const supabase = await supabaseServer();
  let query = supabase.from("deliveries").select("*");

  if (params.requestId) query = query.eq("request_id", params.requestId);
  if (params.vendorId) query = query.eq("vendor_id", params.vendorId);
  if (params.riderId) query = query.eq("rider_id", params.riderId);
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

  return keysToCamel<Delivery[]>(data);
}
