"use server";

import { GetVendorsParams, Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getVendorsAction(params: GetVendorsParams = {}): Promise<Vendor[]> {
  const supabase = supabaseServer();
  let query = supabase
    .from("vendors")
    .select(`
      *,
      subscriptionPlan:subscriptionPlanId (
        id,
        name
      )
    `);
  // Apply filters
  if (params.businessType) {
    query = query.eq("businessType", params.businessType);
  }
  if (params.verified !== undefined) {
    query = query.eq("verified", params.verified);
  }
  if (params.subscriptionPlanId) {
    query = query.eq("subscriptionPlanId", params.subscriptionPlanId);
  }

  // Apply search query (businessName)
  if (params.searchQuery) {
    query = query.ilike("businessName", `%${params.searchQuery}%`);
  }

  // Apply sorting
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) throw error;
  return data as Vendor[];
}
