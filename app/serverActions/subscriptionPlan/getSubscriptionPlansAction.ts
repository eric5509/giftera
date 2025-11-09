"use server";

import { GetAllSubscriptionPlansParams, SubscriptionPlan } from "@/entities/subscriptionPlan/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getSubscriptionPlansAction(
  params: GetAllSubscriptionPlansParams = {}
): Promise<SubscriptionPlan[]> {
  const supabase = supabaseServer();
  const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "asc" } = params;

  const sortBySnake = camelToSnake(sortBy);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("subscription_plans")
    .select("*")
    .order(sortBySnake, { ascending: sortOrder === "asc" })
    .range(from, to);

  if (error) throw error;
  return keysToCamel<SubscriptionPlan[]>(data);
}
