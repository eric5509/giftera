"use server";

import { UpdateVendorKYCInput, VendorKYC } from "@/entities/vendorKYC/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateVendorKYCAction(
  input: UpdateVendorKYCInput
): Promise<VendorKYC> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("vendor_kyc")
    .update({
      ...input,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
