"use server";

import { Dispute, GetAllDisputesParams } from "@/entities/dispute/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export const getDisputesAction = async (params: GetAllDisputesParams = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    filters = {},
  } = params;

  const supabase = supabaseServer();

  let query = supabase.from("disputes").select("*", { count: "exact" });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.complainantId) query = query.eq("complainant_id", filters.complainantId);
  if (filters.transactionId) query = query.eq("transaction_id", filters.transactionId);

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const sortBySnake = camelToSnake(sortBy);
  const { data, error, count } = await query.order(sortBySnake, { ascending: sortOrder === "asc" }).range(from, to);

  if (error) throw error;

  return {
    data: keysToCamel<Dispute[]>(data),
    pagination: {
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 1,
    },
  };
};
