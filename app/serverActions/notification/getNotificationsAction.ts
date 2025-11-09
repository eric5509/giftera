"use server";

import { GetNotificationsParams } from "@/entities/notification/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getNotificationsAction(params: GetNotificationsParams) {
  const supabase = await supabaseServer();

  const userIdFilter = camelToSnake("userId");
  const createdAtSort = camelToSnake("createdAt");

  const page = params.page || 1;
  const limit = params.limit || 10;

  let query = supabase.from("notifications").select("*");

  if (params.userId) query = query.eq(userIdFilter, params.userId);

  query = query
    .order(createdAtSort, { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel(data);
}
