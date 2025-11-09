"use server";

import { VendorKYC } from "@/entities/vendorKYC/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getVendorKYCByIdAction(id: string): Promise<VendorKYC> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("vendor_kyc")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Vendor KYC not found");

  return keysToCamel<VendorKYC>(data);
}
