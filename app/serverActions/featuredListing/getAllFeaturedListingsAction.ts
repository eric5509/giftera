"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import {
  FeaturedListing,
  GetAllFeaturedListingsParams,
} from "@/entities/featuredListing/types/types";

export const getAllFeaturedListingsAction = async (
  params: GetAllFeaturedListingsParams = {}
): Promise<FeaturedListing[]> => {
  const supabase = supabaseServer();
  let query = supabase.from("featuredListings").select("*");

  // Apply filters
  if (params.vendorId) query = query.eq("vendorId", params.vendorId);
  if (params.requestId) query = query.eq("requestId", params.requestId);
  if (params.status) query = query.eq("status", params.status);
  if (params.priorityLevel)
    query = query.eq("priorityLevel", params.priorityLevel);
  if (params.activeFrom) query = query.gte("activeUntil", params.activeFrom);
  if (params.activeUntil) query = query.lte("activeFrom", params.activeUntil);
  if (params.searchQuery)
    query = query.ilike("vendorId", `%${params.searchQuery}%`); // ideally join with vendor name

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
  return data as FeaturedListing[];
};
