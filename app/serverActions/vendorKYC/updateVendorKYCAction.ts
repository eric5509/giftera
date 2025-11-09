"use server";

import {
  UpdateVendorKYCInput,
  VendorKYC,
} from "@/entities/vendorKYC/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateVendorKYCAction(
  input: UpdateVendorKYCInput
): Promise<VendorKYC> {
  const supabase = await supabaseServer();

  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("vendor_kyc")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;

  return keysToCamel<VendorKYC>(data);
}
