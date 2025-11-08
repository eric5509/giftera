"use server";

import { Transaction } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export interface GetTransactionsParams {
  buyerId?: string;
  vendorId?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getTransactionsAction(
  params: GetTransactionsParams = {}
): Promise<Transaction[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .match({
      ...(params.buyerId && { buyerId: params.buyerId }),
      ...(params.vendorId && { vendorId: params.vendorId }),
      ...(params.status && { status: params.status }),
    })
    .range(
      ((params.page || 1) - 1) * (params.limit || 10),
      (params.page || 1) * (params.limit || 10) - 1
    );

  if (error) throw error;

  return data;
}
