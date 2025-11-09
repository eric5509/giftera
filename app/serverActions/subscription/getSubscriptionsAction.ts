"use server";

import {
  GetAllSubscriptionsParams,
  Subscription,
} from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { camelToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const getSubscriptionsAction = async (
  params: GetAllSubscriptionsParams = {}
) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
    filters = {},
  } = params;
  const supabase = await supabaseServer();

  let query = supabase.from("subscriptions").select("*", { count: "exact" });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.vendorId) query = query.eq("user_id", filters.vendorId);
  if (filters.subscriptionPlanId)
    query = query.eq("plan_id", filters.subscriptionPlanId);

  const sortBySnake = camelToSnake(sortBy);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query
    .order(sortBySnake, { ascending: sortOrder === "asc" })
    .range(from, to);

  if (error) throw error;

  return {
    data: keysToCamel<Subscription[]>(data),
    pagination: {
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 1,
    },
  };
};
