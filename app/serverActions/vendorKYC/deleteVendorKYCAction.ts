"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteVendorKYCAction(id: string) {
  const supabase = await supabaseServer();

  const { error } = await supabase.from("vendor_kyc").delete().eq("id", id);
  if (error) throw error;
  return { id };
}
