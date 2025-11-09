"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { FeaturedListing, GetAllFeaturedListingsParams } from "@/entities/featuredListing/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export const getFeaturedListingsAction = async (
  params: GetAllFeaturedListingsParams = {}
): Promise<FeaturedListing[]> => {
  const supabase = supabaseServer();
  let query = supabase.from("featured_listings").select("*");

  // Filters
  if (params.vendorId) query = query.eq("vendor_id", params.vendorId);
  if (params.requestId) query = query.eq("request_id", params.requestId);
  if (params.status) query = query.eq("status", params.status);
  if (params.priorityLevel) query = query.eq("priority_level", params.priorityLevel);
  if (params.activeFrom) query = query.gte("active_from", params.activeFrom);
  if (params.activeUntil) query = query.lte("active_until", params.activeUntil);
  if (params.searchQuery) query = query.ilike("vendor_id", `%${params.searchQuery}%`);

  // Sorting
  const sortBy = camelToSnake(params.sortBy || "createdAt");
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<FeaturedListing[]>(data);
};
