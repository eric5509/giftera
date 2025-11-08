"use server";

import { VendorKYC } from "@/entities/vendorKYC/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getVendorKYCsAction(params?: {
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}): Promise<VendorKYC[]> {
  const supabase = supabaseServer();
  let query = supabase.from("vendor_kyc").select("*");
  if (params?.status) query = query.eq("status", params.status);
  if (params?.search)
    query = query.ilike("idNumber", `%${params.search}%`);
  if (params?.sortBy)
    query = query.order(params.sortBy, { ascending: params.sortOrder === "asc" });
  if (params?.page && params?.limit) {
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit - 1;
    query = query.range(start, end);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
