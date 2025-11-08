"use server";

import { GetAllSubscriptionsParams, Subscription } from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const getAllSubscriptionsAction = async (
  params: GetAllSubscriptionsParams = {}
) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
    filters = {},
  } = params;

  const supabase = supabaseServer();

  // Apply filters dynamically
  let query = supabase.from("subscriptions").select("*", { count: "exact" });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.userId) query = query.eq("userId", filters.userId);
  if (filters.planId) query = query.eq("planId", filters.planId);

  // Pagination logic
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Apply pagination and sorting
  const { data, error, count } = await query
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range(from, to);

  if (error) throw error;

  return {
    data: data as Subscription[],
    pagination: {
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 1,
    },
  };
};
