"use server";

import { VendorKYC } from "@/entities/vendorKYC/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getVendorKYCsAction(params?: {
  status?: string;
  search?: string;
  sortBy?: keyof VendorKYC;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}): Promise<VendorKYC[]> {
  const supabase = await supabaseServer();
  let query = supabase.from("vendor_kyc").select("*");

  if (params?.status) query = query.eq("status", params.status);
  if (params?.search) query = query.ilike("id_number", `%${params.search}%`);
  if (params?.sortBy) {
    const sortBy = camelToSnake(params.sortBy);
    query = query.order(sortBy, { ascending: params.sortOrder === "asc" });
  }

  if (params?.page && params?.limit) {
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit - 1;
    query = query.range(start, end);
  }

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<VendorKYC[]>(data);
}
