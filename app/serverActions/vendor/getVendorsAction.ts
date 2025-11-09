"use server";
import { GetVendorsParams, Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getVendorsAction(
  params: GetVendorsParams = {}
): Promise<Vendor[]> {
  const supabase = await supabaseServer();

  let query = supabase.from("vendors").select(`
      *,
      subscriptionPlan:subscriptionPlanId (
        id,
        name
      )
    `);

  if (params.businessType)
    query = query.eq("business_type", params.businessType);
  if (params.verified !== undefined)
    query = query.eq("verified", params.verified);
  if (params.subscriptionPlanId)
    query = query.eq("subscription_plan_id", params.subscriptionPlanId);
  if (params.searchQuery)
    query = query.ilike("business_name", `%${params.searchQuery}%`);

  const sortBy = params.sortBy ? camelToSnake(params.sortBy) : "created_at";
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  const page = params.page || 1;
  const limit = params.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<Vendor[]>(data);
}
